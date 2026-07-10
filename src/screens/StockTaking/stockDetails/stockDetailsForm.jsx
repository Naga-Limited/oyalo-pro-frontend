import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import messageToast from "../../../components/messageToast/messageToast";
import { useLocation, useNavigate } from "react-router";
import { addPaymentDiffRemarks } from "../../../@app/master/masterSlice";

import {
  Input,
  Card,
  Button,
  Col,
  Row,
  Form,
  Descriptions,
  message
  // Upload, Modal, Image
} from "antd";

import TextArea from "antd/es/input/TextArea";
import { getOutletMasternotsubzone } from "../../../@app/master/masterSlice";

function stockDetails() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(true);
  }, []);

  const [messageApi, contextHolder] = message.useMessage();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getOutletMasternotsubzone());
  }, [dispatch]);

  const onClickBack = () => {
    navigate("/edcSalesReport");
  };

  const { state } = useLocation();
  const isEdit = state?.isEdit || false;
  let defaultValue = state?.data;

  const [name] = useState(`${state?.outlet_code} - ${state?.outlet_name}`);

    const [remarks,setRemarks] = useState();
 
    const onChangeRemarks = (e) => {
      setRemarks(e.target.value);
      return remarks;
    };
  const onFinish = (data) => {
    let outlet_code = state?.outlet_code;   
    dispatch(
      addPaymentDiffRemarks({
            data: {
              ...data,
              id:defaultValue?.id,
              outlet_code: outlet_code,
              outlet_name :state?.outlet_name,
              mode : state?.mode,
              sale_date : state?.date,
              bank_payment_date :state?.payment_date,
              rista_amount : state?.rista_payment_amt,
              bank_amount : state?.bank_gross_amt,
              remarks : remarks,             
            }
          })
    ).then(({ message, status, statusText }) => {
      if (status === 200) {
        messageToast({
          message: message ?? statusText,
          status,
          title: "EDC Sales Remarks Status"
        });
        navigate("/edcSalesReport");
        form.resetFields();
      }
      if (status == 400) {
        messageApi.open({
          type: "warning",
          content: "Edc Sales Remarks already added",
          className: "custom-class",
          style: {
            marginTop: "28vh",
            color: "#d91616",
            fontWeight: "bold"
          }
        });
        return false;
      }
    });
  };

  const { savingEmployeeMaster } = useSelector((state) => {
    return state.master;
  });

  return (
    <>
      <Card>
        {contextHolder}
        <Row style={{ justifyContent: "center" }}>
          <Col span={24}>
            <Form
              name="basic"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              initialValues={{
                status: defaultValue?.status === "Active" ? "1" : "0"
              }}
              onFinish={onFinish}
              form={form}
              autoComplete="off"
            >
              <Row gutter={[15, 0]}>
                <Descriptions bordered size="small">
                  <Descriptions.Item
                    label={"Outlet Name"}
                    className={`custom-background ${show ? "show" : ""}`}
                  >
                    <Input
                      defaultValue={name}
                      readOnly
                      style={{ width: "250px", background: "#DDFAAE", }}
                    />
                  </Descriptions.Item>

                  <Descriptions.Item
                    label={"Mode"}
                    className={`custom-background ${show ? "show" : ""}`}
                  >
                    <Input
                      name="mode"
                      readOnly
                      defaultValue={defaultValue?.mode}
                      style={{ width: "250px", background: "#DDFAAE", }}
                    />
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={"Bank Payment Date"}
                    className={`custom-background ${show ? "show" : ""}`}
                  >
                    <Input
                      name="payment_date"
                      readOnly
                      defaultValue={defaultValue?.payment_date}
                      style={{ width: "250px", background: "#DDFAAE", }}
                    />
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={"Rista Payment Date"}
                    className={`custom-background ${show ? "show" : ""}`}
                  >
                    <Input
                      name="date"
                      readOnly
                      defaultValue={defaultValue?.date}
                      style={{ width: "250px", background: "#DDFAAE", }}
                    />
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={"Rista Payment Amount"}
                    className={`custom-background ${show ? "show" : ""}`}
                  >
                    <Input
                      name="rista_payment_amt"
                      defaultValue={defaultValue?.rista_payment_amt}
                      style={{ width: "250px", background: "#DDFAAE", }}
                    />
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={"Bank Payment Amount"}
                    className={`custom-background ${show ? "show" : ""}`}
                  >
                    <Input
                      name="bank_gross_amt"
                      readOnly
                      defaultValue={defaultValue?.bank_gross_amt}
                      style={{ width: "250px", background: "#DDFAAE", }}
                    />
                  </Descriptions.Item>

                  <Descriptions.Item
                    label={"Remarks"}
                    className={`custom-background ${show ? "show" : ""}`}
                    style={{ width: "250px" }}
                  >
                    <TextArea
                      type="text"
                      defaultValue={defaultValue?.remarks}
                      onChange={onChangeRemarks}
                      placeholder="Enter Remarks"
                      name="remarks"
                    />
                  </Descriptions.Item>
                </Descriptions>
                <Col span={24}>
                  <Row gutter={[15, 15]} style={{ justifyContent: "end" }}>
                    <Col
                      span={12}
                      style={{ textAlign: "right" }}
                      className="d-flex align-items-center justify-content-end mt-3"
                    >
                      <Form.Item className="mx-2">
                        <Button
                          loading={savingEmployeeMaster}
                          className="orangeFactory"
                          type="primary"
                          htmlType="submit"
                        >
                          {isEdit ? "Update" : "Add"}
                        </Button>
                      </Form.Item>
                      {/* </Col>
                    <Col span={12}> */}
                      <Form.Item>
                        <Button onClick={onClickBack}>Back</Button>
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

export default stockDetails;
