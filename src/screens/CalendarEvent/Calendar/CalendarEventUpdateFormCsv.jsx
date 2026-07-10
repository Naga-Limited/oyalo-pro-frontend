/* eslint-disable no-unused-vars */
import axios from "axios";
import * as XLSX from "xlsx";
import React, { useState } from "react";
import { UploadOutlined,} from "@ant-design/icons";
import {Card, Button, Col,Row,Form, Upload} from "antd";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {saveUploadCsvCalendarEvent} from "../../../@app/subMaster/subMasterSlice";
import ConfirmOnExit from "../../../components/confirmOnExit/ConfirmOnExit";
import messageToast from "../../../components/messageToast/messageToast";
import { v4 as uuidv4 } from "uuid";

function CalendarEventUpdateFormCsv() {
  const {
    state: { data: defaultValue = {}, isEdit = false },
  } = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [showDialog, setShowDialog] = useState(false);
  const [data, setData] = useState({});
  const {
    savingUploadCsvCalendarEvent,
    getUploadCsvCalendarEventResponse: {data:newCSV}
  } = useSelector((state) => {
    return state.subMaster;
  });
  
  const handleClickBack = () => {
    navigate("/calendarEvent");
  };

  const { userData } = useSelector((state) => state.auth);
  
const onFinish = () => {
  try {
      let i = 0;
      let payload = [];

      data?.forEach((e) => {
          let innerdata = {};       
          if (i !== 0) {
              if (e && e.length > 0) {             
                  innerdata = {
                      event_id: uuidv4(),
                      outlet_id:e[1],                      
                      event_name : e[2] ? e[2] : null,
                      event_date_from:e[3], 
                      event_date_to:e[4],
                      reason_for_event:e[5],
                      employee_email:e[6],
                      remarks:e[7],
                      physical_marketing_status:e[8],
                      physical_marketing_id:e[9],
                      physical_marketing_budget:e[10],
                      physical_marketing_actual:e[11],
                      digital_marketing_status:e[12],
                      digital_marketing_id:e[13],
                      digital_marketing_budget:e[14],
                      digital_marketing_actual:e[15],
                      monitoring_status:e[16],
                      monitoring_id:e[17],
                      monitoring_budget:e[18] ,
                      monitoring_actual:e[19],
                      product_discount_status:e[20],
                      product_discount_id:e[21],
                      product_discount_budget:e[22],
                      product_discount_actual:e[23],
                      event_type:e[24],                      
                      budget_expenses_food_truck:e[25],
                      rent_food_truck:e[26],
                      man_power_food_truck:e[27],
                      cost_food_truck:e[28],
                      driver_food_truck:e[29],
                      petrol_food_truck:e[30],
                      mem_food_truck:e[31],
                      transport_cost_FG_equipements_food_truck:e[32],
                      mp_travel_expenses_food_truck:e[33],
                      budget_expenses_ODC:e[34],
                      transport_cost_ODC:e[35],
                      rent_ODC:e[36],
                      mem_ODC:e[37],
                      eb_petrol_ODC:e[38],
                      food_expenses_ODC:e[39],
                      budget_expenses_InStore:e[40],
                      whatsapp_campaign_InStore:e[41],
                      initiator_name:e[43],
                      initiator_phone_no:e[44],
                      organizer_name:e[45],
                      organizer_company_name:e[46],
                      organizer_phone_no:e[47],
                      targeted_audience:e[48],
                      no_of_audience:e[49],
                      expected_convertion_ratio:e[50],
                      execution_plan:e[51],
                      offer_details:e[52],
                      budgeted_ROI:e[53],
                      budgeted_sales:e[54],
                      budgeted_AOV:e[55],
                      expected_AOV:e[56],
                      expected_sales:e[57],
                      event_nature:e[58],
                      recurring_period:e[59],
                      status:e[60],
                      day_type:e[61],
                      event_status:e[62], 
                      entry_by:userData.data?.id ?? "0",   
                    };
                  payload.push(innerdata);
              }
          }
          i++;
      });
      dispatch(saveUploadCsvCalendarEvent({ data: payload })).then(
          ({ message, status, statusText }) => {
              if (status === 200) {
                  navigate("/calendarEvent");
                  messageToast({
                      message: message ?? statusText,
                      status: 200,
                      title: "Calendar Event Upload",
                  });
              } else {
                  messageToast({
                      message: message ?? statusText,
                      status: 400,
                      title: "Calendar Event Upload",
                  });
              }
          }
      ).catch((error) => {
          console.error('Dispatch error:', error);
          messageToast({
              message: "something went wrong",
              status: 400,
              title: "Calendar Event Upload",
          });
      });
  } catch (err) {
      console.error('Processing error:', err);
      messageToast({
          message: "something went wrong",
          status: 400,
          title: "Calendar Event Upload",
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
              disabled={savingUploadCsvCalendarEvent}
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
                          loading={savingUploadCsvCalendarEvent}
                          disabled={savingUploadCsvCalendarEvent}>
                          {isEdit ? "Update" : "Add"}
                        </Button>
                      </Form.Item>
                      <Form.Item>
                        <Button
                          disabled={savingUploadCsvCalendarEvent}
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

export default CalendarEventUpdateFormCsv;
