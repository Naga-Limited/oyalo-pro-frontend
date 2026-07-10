/* eslint-disable no-unused-vars */
import axios from "axios";
import * as XLSX from "xlsx";
import React, { useState } from "react";
import { UploadOutlined,} from "@ant-design/icons";
import {Card, Button, Col,Row,Form, Upload} from "antd";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {saveUploadCsvDotpe} from "../../../@app/master/masterSlice";
import ConfirmOnExit from "../../../components/confirmOnExit/ConfirmOnExit";
import messageToast from "../../../components/messageToast/messageToast";

function DotpeUpdateFormCsv() {
  const {
    state: { data: defaultValue = {}, isEdit = false },
  } = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [showDialog, setShowDialog] = useState(false);
  const [data, setData] = useState({});

 
  const {
    savingUploadCsvDotpe,
    getUploadedDotpeResponse: {data:newCSV}
  } = useSelector((state) => {
    return state.master;
  });
  
  const handleClickBack = () => {
    navigate("/dotpeDetails");
  };

  // const onFinish = () => {
  //   try {     
  //     let i = 0;
  //     let payload = [];    
  //     data?.map((e) => {
  //       const formatExcelDate = (excelDate) => {
  //         const millisecondsPerDay = 24 * 60 * 60 * 1000;
  //         const excelEpoch = Date.UTC(1899, 11, 30);      
  //         const offsetDays = Math.floor(excelDate);
  //         const milliseconds = Math.round((excelDate - offsetDays) * millisecondsPerDay);      
  //         const date = new Date(excelEpoch + (offsetDays * millisecondsPerDay) + milliseconds);
  //         return date;
  //     };
  //       let innerdata = {};
  //       if (i != 0) {
  //         if (e && e.length > 0) {          
  //             innerdata = {
  //             settlment_id: e[0],
  //             dot_transaction_id:e[1],
  //             payment_method: e[2],
  //             store_name: e[3],
  //             merchant_id: e[4],
  //             store_id: e[5],
  //             tran_date: formatExcelDate(e[6]).toLocaleDateString('en-GB'),
  //             tran_type: e[7],
  //             order_status: e[8],
  //             child_order_id: e[9],
  //             sales_type: e[10],
  //             service_sub_type: e[11],
  //             order_id: e[12],
  //             store_code: e[13],
  //             company_code: e[14],
  //             franchise_code: e[15],
  //             invoice_number: e[16],   
  //             gross_amt : e[17],
  //             final_net_amt:e[26],
  //             amt_paid :e[35],
  //             settlement_date :formatExcelDate(e[36]).toLocaleDateString('en-GB'),
  //             utr:e[37],
  //           };
  //           payload.push(innerdata);
  //         }
  //       }
  //       i++;
  //     });   
  //    dispatch(saveUploadCsvDotpe({ data: payload })).then(
  //          ({ message, status, statusText }) => {
  //         if (status === 200) {
  //           navigate("/dotpeDetails");
  //           messageToast({
  //             message: message ?? statusText,
  //             status:200,
  //             title: "Dotpe Details Upload",
  //           });
  //         } else {
  //           messageToast({
  //             message: message ?? statusText,
  //             status: 400,
  //             title: "Dotpe Details Upload",
  //           });
  //         }
  //       }
  //     );
  //   } catch (err) {
  //     messageToast({
  //       message: "something went wrong",
  //       status: 400,
  //       title: "Dotpe Details",
  //     });
  //   }
  // };

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
          const year = date.getFullYear();
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const day = date.getDate().toString().padStart(2, '0');
          return `${year}-${month}-${day}`;
        };
        let innerdata = {};
        if (i != 0) {
          if (e && e.length > 0) {          
              innerdata = {
              settlment_id: e[0],
              dot_transaction_id:e[1],
              payment_method: e[2],
              store_name: e[3],
              merchant_id: e[4],
              store_id: e[5],
              tran_date: e[6],
              tran_type: e[7],
              order_status: e[8],
              child_order_id: e[9],
              sales_type: e[10],
              service_sub_type: e[11],
              order_id: e[12],
              store_code: e[13],
              company_code: e[14],
              franchise_code: e[15],
              invoice_number: e[16],   
              gross_amt : e[17],
              final_net_amt:e[26],
              amt_paid :e[35],
              settlement_date :formatExcelDate(e[36]),
              utr:e[37],
            };
            payload.push(innerdata);
          }
        }
        i++;
      });   
     dispatch(saveUploadCsvDotpe({ data: payload })).then(
           ({ message, status, statusText }) => {
          if (status === 200) {
            navigate("/dotpeDetails");
            messageToast({
              message: message ?? statusText,
              status:200,
              title: "Dotpe Details Upload",
            });
          } else {
            messageToast({
              message: message ?? statusText,
              status: 400,
              title: "Dotpe Details Upload",
            });
          }
        }
      );
    } catch (err) {
      messageToast({
        message: "something went wrong",
        status: 400,
        title: "Dotpe Details",
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
              disabled={savingUploadCsvDotpe}
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
                          loading={savingUploadCsvDotpe}
                          disabled={savingUploadCsvDotpe}>
                          {isEdit ? "Update" : "Add"}
                        </Button>
                      </Form.Item>
                      <Form.Item>
                        <Button
                          disabled={savingUploadCsvDotpe}
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

export default DotpeUpdateFormCsv;
