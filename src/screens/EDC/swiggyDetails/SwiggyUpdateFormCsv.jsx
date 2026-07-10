/* eslint-disable no-unused-vars */
import axios from "axios";
import * as XLSX from "xlsx";
import React, { useState } from "react";
import { UploadOutlined,} from "@ant-design/icons";
import {Card, Button, Col,Row,Form, Upload} from "antd";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {saveUploadCsvSwiggy} from "../../../@app/master/masterSlice";
import ConfirmOnExit from "../../../components/confirmOnExit/ConfirmOnExit";
import messageToast from "../../../components/messageToast/messageToast";

function SwiggyUpdateFormCsv() {
  const {
    state: { data: defaultValue = {}, isEdit = false },
  } = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [showDialog, setShowDialog] = useState(false);
  const [data, setData] = useState({});
  const {
    savingUploadCsvSwiggy,
    getUploadedSwiggyResponse: {data:newCSV}
  } = useSelector((state) => {
    return state.master;
  });
  
  const handleClickBack = () => {
    navigate("/swiggyDetails");
  };

const onFinish = () => {
  try {
      let i = 0;
      let payload = [];
      data?.forEach((e) => {
          let innerdata = {};       
          if (i !== 0) {
              if (e && e.length > 0) {             
                  innerdata = {
                      rid: e[0],                  
                      tran_date : e[1],                        
                      order_no: e[2],
                      order_status: e[3],
                      order_category: e[4],
                      gross_amt: e[9],
                      gst: e[10],
                      swiggy_platform_service_fee: e[14],
                      total_swiggy_service_fee: e[23],
                      net_payable_bf_tcs_deduction: e[33],
                      tds_u2: e[35],
                      net_payable_after_tds_tcs_deduction: e[36],
                      utr: e[49],
                      last_mile: e[51],
                      settlement_date: e[53],
                      cancelled_by:e[5],
                      items_total_A: e[6],
                      packing_service_charges_B: e[7],
                      merchant_discount_C: e[8],
                      customer_payable_net_bill_value_after_taxes_discount:e[11],
                      swiggy_platform_service_fee_chargeable_on_D_or_F_free_del_dis: e[12],
                      swiggy_platform_service_fee_percentage : e[13],
                      discount_on_swiggy_platform_service_fee : e[15],
                      total_long_distance_subscription_fees : e[16],
                      total_discount_on_long_distance_subscription_fees : e[17],
                      total_effective_long_distance_subscription_fees : e[18],
                      collection_charges: e[19],
                      access_charges : e[20],
                      merchant_cancellation_charges: e[21],
                      call_center_service_fees: e[22],
                      delivery_fee_sponsored_by_merchant_R1_w_o_tax: e[24],
                      taxes_on_swiggy_fee_Including_cess: e[25],
                      total_swiggy_fee_including_taxes : e[26],
                      cash_repayment_to_merchant : e[27],
                      merchant_share_of_cancelled_orders : e[28],
                      GST_deduction : e[29],
                      refund_for_disputed_order : e[30],
                      disputed_order_remarks : e[31],
                      total_of_order_level_adjustments : e[32],
                      tcs_U1: e[34],
                      MFR_pressed : e[37],
                      cancellation_policy_applied : e[38],
                      coupon_code_sourced : e[39],
                      discount_campaign_ID : e[40],
                      is_replicated : e[41],
                      base_order_ID : e[42],
                      MRP_items : e[43],
                      order_payment_type: e[44],
                      cancellation_time : e[45],
                      pick_up_status : e[46],
                      coupon_code_applied_by_customer : e[47],
                      nodal_UTR : e[48],
                      long_distance_applicable : e[50],
                      parent_order_id : e[52]
                  };
                  payload.push(innerdata);
              }
          }
          i++;
      });
      dispatch(saveUploadCsvSwiggy({ data: payload })).then(
          ({ message, status, statusText }) => {
              if (status === 200) {
                  navigate("/swiggyDetails");
                  messageToast({
                      message: message ?? statusText,
                      status: 200,
                      title: "Swiggy Details Upload",
                  });
              } else {
                  messageToast({
                      message: message ?? statusText,
                      status: 400,
                      title: "Swiggy Details Upload",
                  });
              }
          }
      ).catch((error) => {
          console.error('Dispatch error:', error);
          messageToast({
              message: "something went wrong",
              status: 400,
              title: "Swiggy Details",
          });
      });
  } catch (err) {
      console.error('Processing error:', err);
      messageToast({
          message: "something went wrong",
          status: 400,
          title: "Swiggy Details",
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
              disabled={savingUploadCsvSwiggy}
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
                        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
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
                          loading={savingUploadCsvSwiggy}
                          disabled={savingUploadCsvSwiggy}>
                          {isEdit ? "Update" : "Add"}
                        </Button>
                      </Form.Item>
                      <Form.Item>
                        <Button
                          disabled={savingUploadCsvSwiggy}
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

export default SwiggyUpdateFormCsv;
