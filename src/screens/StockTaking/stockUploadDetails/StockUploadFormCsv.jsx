/* eslint-disable no-unused-vars */
import axios from "axios";
import * as XLSX from "xlsx";
import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Card, Button, Col, Row, Form, Upload } from "antd";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { saveUploadCsvStock } from "../../../@app/subMaster/subMasterSlice";
//import ConfirmOnExit from "../../../components/confirmOnExit/ConfirmOnExit";
import messageToast from "../../../components/messageToast/messageToast";

function StockUploadFormCsv() {
  const {
    state: { data: defaultValue = {}, isEdit = false }
  } = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  // const [showDialog, setShowDialog] = useState(false);
  const [data, setData] = useState({});

  const {
    savingStockUpload,
    getStockUploadResponse: { data: newCSV }
  } = useSelector((state) => {
    return state.subMaster;
  });

  const handleClickBack = () => {
    navigate("/stockUploadDetails");
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
          const milliseconds = Math.round(
            (excelDate - offsetDays) * millisecondsPerDay
          );
          const date = new Date(
            excelEpoch + offsetDays * millisecondsPerDay + milliseconds
          );
          return date;
        };
        let innerdata = {};
        if (i != 0) {
          if (e && e.length > 0) {
            innerdata = {
              outlet_name: e[0],
              outlet_code: e[1],
              sku: e[2],
              type: e[3],
              category: e[4],
              name: e[6],
              measuring_unit: e[7],
              qty_per_batch: e[8],
              batch_number: e[9],
              expiry_date: e[10],
              expired: e[11]
            };
            payload.push(innerdata);
          }
        }
        i++;
      });
      dispatch(saveUploadCsvStock({ data: payload })).then(
        ({ message, status, statusText }) => {
          if (status === 200) {
            navigate("/stockUploadDetails");
            messageToast({
              message: message ?? statusText,
              status: 200,
              title: "Stock Upload Details"
            });
          } else {
            messageToast({
              message: message ?? statusText,
              status: 400,
              title: "Stock Upload Details"
            });
          }
        }
      );
    } catch (err) {
      messageToast({
        message: "something went wrong",
        status: 400,
        title: "Stock Upload Details"
      });
    }
  };

  return (
    <>
      <Card>
        {/* <ConfirmOnExit showModel={showDialog} /> */}
        <Row style={{ justifyContent: "center" }}>
          <Col span={24}>
            <Form
              name="basic"
            //  onFieldsChange={() => setShowDialog(true)}
              labelCol={{ span: 24 }}
              form={form}
              disabled={savingStockUpload}
              wrapperCol={{ span: 24 }}
              onFinish={onFinish}
              autoComplete="off"
            >
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
                          header: 1
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
                      className="d-flex justify-content-end align-items-center"
                    >
                      <Form.Item className="mx-2">
                        <Button
                          className="orangeFactory"
                          type="primary"
                          htmlType="submit"
                          loading={savingStockUpload}
                          disabled={savingStockUpload}
                        >
                          {isEdit ? "Update" : "Add"}
                        </Button>
                      </Form.Item>

                      <Form.Item>
                        <Button
                          disabled={savingStockUpload}
                          onClick={handleClickBack}
                        >
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

export default StockUploadFormCsv;
