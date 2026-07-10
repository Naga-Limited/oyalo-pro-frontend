/* eslint-disable no-unused-vars */
import axios from "axios";
import * as XLSX from "xlsx";
import React, { useState } from "react";
import { UploadOutlined,} from "@ant-design/icons";
import {Card, Button, Col,Row,Form, Upload} from "antd";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {saveUploadCsvZomato} from "../../../@app/master/masterSlice";
import ConfirmOnExit from "../../../components/confirmOnExit/ConfirmOnExit";
import messageToast from "../../../components/messageToast/messageToast";

function ZomatoUpdateFormCsv() {
  const {
    state: { data: defaultValue = {}, isEdit = false },
  } = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [showDialog, setShowDialog] = useState(false);
  const [data, setData] = useState({});

 
  const {
    savingUploadCsvZomato,
    getUploadedZomatoResponse: {data:newCSV}
  } = useSelector((state) => {
    return state.master;
  });
  
  const handleClickBack = () => {
    navigate("/zomatoDetails");
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
              zomato_id: e[5],
              tran_date:e[2],              
              order_id: e[1],
              order_status: e[8],
              mode_payment: e[7],
              gross_amt: e[22],    
              service_fees: e[24],   
              taxes_on_service_payment_mechanisum_fees: e[29],  
              tcs_amt:e[31],
              tds_amt:e[32],
              settlement_date:e[49],
              utr:e[50],  
              week_no:e[3],
              res_name:e[4],
              discount_construct:e[6],
              cancellation_policy:e[9],
              cancellation_rejection_reason:e[10],
              cancelled_rejected_state:e[11],
              order_type:e[12],
              delivery_state_code:e[13],
              subtotal:e[14],
              packaging_charge:e[15],
              delivery_charge_for_restaurants_on_self_logistics:e[16],
              restaurant_discount_promo:e[17],
              restaurant_discount_bogo_freebies_gold_brand_pack_others:e[18],
              brand_pack_subscription_fee:e[19],
              delivery_charge_discount_relisting_discount:e[20],
              total_gst_collected_from_customers:e[21],
              commissionable_value:e[23],
              service_fee_value:e[25],
              payment_mechanism_fee:e[26],
              service_fee_payment_mechanism_fees:e[27],
              applicable_amount_for_TCS:e[29],
              applicable_amount_for_9:e[30],
              tax_collected_at_source:e[31],
              gst_paid_by_zomato_on_behalf_of_restaurant	:e[34],
              gst_to_be_paid_by_restaurant_partner_to_govt: e[35],
              government_charges: e[36],
              customer_compensation_recoupment:e[37],
              delivery_charges_recovery: e[38],
              amount_received_in_cash_on_self_delivery_orders:e[39],
              credit_note_debit_note_adjustment:e[40],
              promo_recovery_adjustment:e[41],
              extra_inventory_ads_and_misc_order_level_deduction:e[42],
              brand_loyalty_points_redemption:e[43],
              other_order_level_deductions:e[44],
              net_deductions:e[45],
              net_additions:e[46],
              order_level_payout:e[47],
              settlement_status:e[48],
              unsettled_amount:e[51],
              customer_id:e[52]
            };
            payload.push(innerdata);
          }
        }
        i++;
      });   
     dispatch(saveUploadCsvZomato({ data: payload })).then(
           ({ message, status, statusText }) => {
          if (status === 200) {
            navigate("/zomatoDetails");
            messageToast({
              message: message ?? statusText,
              status:200,
              title: "Zomato Details Upload",
            });
          } else {
            messageToast({
              message: message ?? statusText,
              status: 400,
              title: "Zomato Details Upload",
            });
          }
        }
      );
    } catch (err) {
      messageToast({
        message: "something went wrong",
        status: 400,
        title: "Zomato Details",
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
              disabled={savingUploadCsvZomato}
              wrapperCol={{ span: 24 }}
              onFinish={onFinish}
              autoComplete="off">
              <Row gutter={[25, 0]}>
                <Col md={{ span: 4 }} xs={{ span: 16 }}>
                  <Upload
                    beforeUpload={() => false}
                    accept=".xlsx, .xls"
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
                          loading={savingUploadCsvZomato}
                          disabled={savingUploadCsvZomato}>
                          {isEdit ? "Update" : "Add"}
                        </Button>
                      </Form.Item>
                      <Form.Item>
                        <Button
                          disabled={savingUploadCsvZomato}
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

export default ZomatoUpdateFormCsv;
