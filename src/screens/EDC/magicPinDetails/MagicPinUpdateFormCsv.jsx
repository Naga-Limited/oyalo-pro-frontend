/* eslint-disable no-unused-vars */
import axios from "axios";
import * as XLSX from "xlsx";
import React, { useState,useEffect } from "react";
import { UploadOutlined,} from "@ant-design/icons";
import {Card, Button, Col,Row,Form, Upload} from "antd";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {saveUploadCsvMagicPin,getUploadedMagicPin} from "../../../@app/master/masterSlice";
import ConfirmOnExit from "../../../components/confirmOnExit/ConfirmOnExit";
import messageToast from "../../../components/messageToast/messageToast";

function MagicPinUpdateFormCsv() {
  const {
    state: { data: defaultValue = {}, isEdit = false },
  } = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [showDialog, setShowDialog] = useState(false);
  const [data, setData] = useState({});

 
  const {
    savingUploadCsvMagicPin,
    getUploadedMagicPinResponse: {data:newCSV}
  } = useSelector((state) => {
    return state.master;
  });
  
  const handleClickBack = () => {   
    navigate("/magicPinDetails");
  };

  const onFinish = () => {
    try {     
      let i = 0;
      let payload = [];    
      data?.map((e) => {    
        let innerdata = {};
        if (i != 0) {
          if (e && e.length > 0) {          
              innerdata = {             
              tran_date:e[0],
              merchant_id: e[2],
              outlet_code: e[47],  
              outlet_name: e[48],            
              tran_type: e[5],
              tran_id: e[6],   
              utr: e[31],
              order_status: e[7],
              cancel_reason : e[8],
              gross_order_amt : e[13],      
              closed_date : e[37] ? e[37] : null,
            };
            payload.push(innerdata);
          }
        }
        i++;
      });   
     dispatch(saveUploadCsvMagicPin({ data: payload })).then(
           ({ message, status, statusText }) => {
          if (status === 200) {
            navigate("/magicPinDetails");
            messageToast({
              message: message ?? statusText,
              status:200,
              title: "MagicPin Details Upload",
            });
          } else {
            messageToast({
              message: message ?? statusText,
              status: 400,
              title: "MagicPin Details Upload",
            });
          }
        }
      );
    } catch (err) {
      messageToast({
        message: "something went wrong",
        status: 400,
        title: "MagicPin Details",
      });
    }
  };

  return (
    <>
      <Card>
        <ConfirmOnExit showModel={showDialog} />
        <Row style={{ justifyContent: "center" }}>
          <Col span={24}>
            <Form
              name="basic"
              onFieldsChange={() => setShowDialog(true)}
              labelCol={{ span: 24 }}
              form={form}
              disabled={savingUploadCsvMagicPin}
              wrapperCol={{ span: 24 }}
              onFinish={onFinish}
              autoComplete="off">
              <Row gutter={[25, 0]}>
                <Col md={{ span: 4 }} xs={{ span: 16 }}>
                  <Upload
                    beforeUpload={() => false}
                    // accept=".xlsx, .xls"
                    name="logo"
                    multiple=""
                    showUploadList={{ showPreviewIcon: false }}                   
                    onChange={async (filesData) => {
                      let fileList = [];

                      try {
                        var file = filesData?.file;

                        const data = await file.arrayBuffer();
                        const workbook = XLSX.read(data);
                        const worksheet =
                          workbook.Sheets[workbook.SheetNames[0]];
                        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
                          header: 1,
                        });
                        setData(jsonData);
                        return false;
                      } catch (err) {
                        //console.log(err, "err");
                      }                     
                   
                    }}
                    listType="xlsx"
                    maxCount={1}
                    withCredentials //this is what limits the number of files uploaded
                  >
                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                  </Upload>
                </Col>
               
                <Col span={24}>
                  <Row gutter={[15, 15]} style={{ justifyContent: "end" }}>
                    <Col
                      span={12}
                      className="d-flex justify-content-end align-items-center">
                      <Form.Item className="mx-2">
                        <Button
                          className="orangeFactory"
                          type="primary"
                          htmlType="submit"
                          loading={savingUploadCsvMagicPin}
                          disabled={savingUploadCsvMagicPin}>
                          {isEdit ? "Update" : "Add"}
                        </Button>
                      </Form.Item>
                      <Form.Item>
                        <Button
                          disabled={savingUploadCsvMagicPin}
                          onClick={handleClickBack}>
                          Back
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Card>
    </>
  );
}

export default MagicPinUpdateFormCsv;
