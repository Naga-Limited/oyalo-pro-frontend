/* eslint-disable no-unused-vars */
import axios from "axios";
import * as XLSX from "xlsx";
import React, { useState } from "react";
import { UploadOutlined,} from "@ant-design/icons";
import {Card, Button, Col,Row,Form, Upload} from "antd";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {saveUploadCsvEdc} from "../../../@app/master/masterSlice";
import ConfirmOnExit from "../../../components/confirmOnExit/ConfirmOnExit";
import messageToast from "../../../components/messageToast/messageToast";

function EDCUpdateFormCsv() {
  const {
    state: { data: defaultValue = {}, isEdit = false },
  } = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [showDialog, setShowDialog] = useState(false);
  const [data, setData] = useState({});

 
  const {
    savingEDCDetails,
    getEDCDetailsResponse: {data:newCSV}
  } = useSelector((state) => {
    return state.master;
  });
  
  const handleClickBack = () => {
    navigate("/edcDetails");
  };

  const onFinish = () => {
    try {     
      let i = 0;
      let payload = [];    
      data?.map((e) => {
        const formatExcelDate = (excelDate) => {
          const millisecondsPerDay = 24 * 60 * 60 * 1000;
          const excelEpoch = Date.UTC(1899, 11, 30);      
          const offsetDays = Math.floor(excelDate);
          const milliseconds = Math.round((excelDate - offsetDays) * millisecondsPerDay);      
          const date = new Date(excelEpoch + (offsetDays * millisecondsPerDay) + milliseconds);
          return date;
      };
        let innerdata = {};
        if (i != 0) {
          if (e && e.length > 0) {          
              innerdata = {
              term_id: e[0],
              tran_date: formatExcelDate(e[1]).toLocaleDateString('en-GB'),
              tran_time: e[2],
              batch_no: e[3],
              card_type: e[4],
              card_no: e[5],
              approve_code: e[6],
              gross_amt: e[7],
              mdr: e[8],
              gst: e[9],
              net_amt: e[10],
              mid: e[11],
              intl_flag: e[12],
              cash_type: e[13],
              cash_amount: e[14],
              rrn: e[15],
              process_date: formatExcelDate(e[16]).toLocaleDateString('en-GB'),           
            };
            payload.push(innerdata);
          }
        }
        i++;
      });   
     dispatch(saveUploadCsvEdc({ data: payload })).then(
           ({ message, status, statusText }) => {
          if (status === 200) {
            navigate("/edcDetails");
            messageToast({
              message: message ?? statusText,
              status:200,
              title: "EDC Details Upload",
            });
          } else {
            messageToast({
              message: message ?? statusText,
              status: 400,
              title: "EDC Details Upload",
            });
          }
        }
      );
   
    } catch (err) {
      messageToast({
        message: "something went wrong",
        status: 400,
        title: "EDC Details",
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
              disabled={savingEDCDetails}
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
                          loading={savingEDCDetails}
                          disabled={savingEDCDetails}>
                          {isEdit ? "Update" : "Add"}
                        </Button>
                      </Form.Item>

                      <Form.Item>
                        <Button
                          disabled={savingEDCDetails}
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

export default EDCUpdateFormCsv;
