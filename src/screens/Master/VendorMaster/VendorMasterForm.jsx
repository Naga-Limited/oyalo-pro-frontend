/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Input,
  Card,
  Select,
  Button,
  Radio,
  Col,
  Row,
  Form,
  Space,
} from "antd";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { map } from "ramda";
import {
  getServiceFor,
  saveVendorMaster,
  updateVendorMaster,
} from "../../../@app/service/serviceSlice";
import ConfirmOnExit from "../../../components/confirmOnExit/ConfirmOnExit";
import messageToast from "../../../components/messageToast/messageToast";
import { transStatus } from "../../../util/transStatus";

const { Option } = Select;

function VendorMasterForm() {
  const {
    state: { data: defaultValue, isEdit = false },
  } = useLocation();

  const [status, setStatus] = useState(defaultValue?.status ?? 1);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const {
    savingVendorMaster,
    getServiceForResponse: { data: serviceFor },
  } = useSelector((state) => {
    return state.service;
  });

  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    dispatch(getServiceFor());
  }, [dispatch]);

  const handleClickBack = () => {
    navigate("/VendorMaster");
  };

  const onFinish = (data) => {
    setShowDialog(false);
    dispatch(
      defaultValue?.mode === "edit"
        ? updateVendorMaster({
            data: {
              ...data,
              status: transStatus({ status }),
              id: defaultValue.id,
            },
          })
        : saveVendorMaster({ data, status: transStatus({ status }) })
    ).then(({ status, message, statusText }) => {
      if (status === 200) {
        form.resetFields();
        navigate("/VendorMaster");
        messageToast({
          message: message ?? statusText,
          status,
          title: "Vendor Master",
        });
      }
    });
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };
  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 20, offset: 0 },
    },
  };

  return (
    <>
      <Card>
        <ConfirmOnExit showModel={showDialog} />
        <Row style={{ justifyContent: "center" }}>
          <Col span={24}>
            <Form
              onFieldsChange={() => setShowDialog(true)}
              name="basic"
              labelCol={{ span: 24 }}
              form={form}
              wrapperCol={{ span: 24 }}
              initialValues={{
                ...defaultValue,
                status: defaultValue?.status == "In-Active" ? 0 : 1,
              }}
              onFinish={onFinish}
              autoComplete="off">
              <Row gutter={[15, 0]}>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item
                    name="vendor_type"
                    label="Vendor Type"
                    rules={[
                      { required: true, message: "Please select vendor type" },
                    ]}
                    disabled={savingVendorMaster}>
                    <Select
                      name="vendor_type"
                      placeholder="select Vendor Type"
                      disabled={savingVendorMaster}
                      showSearch
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }>
                      <Option value={"internal"}>internal</Option>
                      <Option value={"External"}>External</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item name="service_for" label="Service For">
                    <Select
                      service
                      placeholder="Select Service For"
                      disabled={savingVendorMaster}
                      showSearch
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }>
                      {map(
                        (data) => {
                          return (
                            <Option key={data.id} value={data.id}>
                              {data.name}
                            </Option>
                          );
                        },
                        serviceFor ? serviceFor : []
                      )}
                    </Select>
                  </Form.Item>
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item name="vendor_for" label="Vendor For">
                    <Select
                      placeholder="Select Vendor For"
                      disabled={savingVendorMaster}
                      showSearch
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }>
                      <Option value={"Supplier"}>Supplier</Option>
                      <Option value={"Service"}>Service</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item
                    name="vendor_code"
                    label="Vendor Code"
                    rules={[
                      { required: true, message: "Please enter vendor code" },
                    ]}>
                    <Input name="vendor_code" placeholder="Enter Vendor Code" />
                  </Form.Item>
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true, message: "Please enter name" }]}>
                    <Input name="name" placeholder="Enter Name" />
                  </Form.Item>
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item name="address" label="Address">
                    <Input placeholder="Enter  Address" name="address" />
                  </Form.Item>
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item name="country" label="Country">
                    <Input placeholder="Enter  Country" name="country" />
                  </Form.Item>
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item name="pin_code" label="Pincode">
                    <Input placeholder="Enter  Pincode" name="pin_code" />
                  </Form.Item>
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item name="city" label="City">
                    <Input placeholder="Enter  City" name="city" />
                  </Form.Item>
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item name="state" label="State">
                    <Input placeholder="Enter  State" name="state" />
                  </Form.Item>
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item name="gst_number" label="GST Number">
                    <Input placeholder="Enter GST Number" name="gst_number" />
                  </Form.Item>
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item name="company_code" label="Company Code">
                    <Input
                      placeholder="Enter Company Code"
                      name="company_code"
                    />
                  </Form.Item>
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item name="payment_terms" label="Payment Terms">
                    <Input
                      placeholder="Enter Payment Terms"
                      name="payment_terms"
                    />
                  </Form.Item>
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item name="pan_number" label="Pan Number">
                    <Input placeholder="Enter GST  PAN Number" />
                  </Form.Item>
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item name="pan_name" label="Pan Name">
                    <Input placeholder="Enter Pan Name" name="pan_number" />
                  </Form.Item>
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item name="type_of_service" label="Type Of Service">
                    <Input
                      placeholder="Enter Type Of Service"
                      name="type_of_service"
                    />
                  </Form.Item>
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item name="rate_of_tds" label="Rate Of TDS">
                    <Input placeholder="Enter Rate Of TDS" name="rate_of_tds" />
                  </Form.Item>
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item name="msme_number" label="MSME Number">
                    <Input placeholder="Enter MSME Number" name="msme_number" />
                  </Form.Item>
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item name="phone_number" label="Phone Number">
                    <Input
                      type="number"
                      placeholder="Enter Phone Number"
                      name="phone_number"
                    />
                  </Form.Item>
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item name="mail_id" label="Mail ID">
                    <Input placeholder="Enter Mail ID" name="mail_id" />
                  </Form.Item>
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item name="bank_address" label="Bank Address">
                    <Input
                      placeholder="Enter Bank Address"
                      name="bank_address"
                    />
                  </Form.Item>
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item name="bank_ifsc_code" label="Bank Ifsc Code">
                    <Input
                      placeholder="Enter Bank Ifsc Code"
                      name="bank_ifsc_code"
                    />
                  </Form.Item>
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item
                    name="bank_account_number"
                    label="Bank Account Number">
                    <Input
                      placeholder="Enter Bank Account Number"
                      name="bank_account_number"
                    />
                  </Form.Item>
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item name="rec_account" label="Reconciliaton Account">
                    <Input
                      placeholder="Enter Reconciliaton Account"
                      name="rec_account"
                    />
                  </Form.Item>
                </Col>

                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item name="sort_key" label="Sort Key">
                    <Input placeholder="Enter Sort Key" name="sort_key" />
                  </Form.Item>
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item name="purchase_org" label="Purchase Org">
                    <Input
                      placeholder="Enter Purchase ORG"
                      name="purchase_org"
                    />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    name="status"
                    label="Status "
                    rules={[
                      { required: true, message: "Please slect your status" },
                    ]}>
                    <Col span={24}>
                      <Radio.Group
                        buttonStyle="solid"
                        onChange={(e) => {
                          setStatus(e?.target?.value);
                        }}
                        size="small"
                        defaultValue={
                          defaultValue?.status === "In Active" ? 0 : 1
                        }>
                        <Radio.Button className="active" value={1}>
                          Active
                        </Radio.Button>
                        <Radio.Button className="in-active" value={0}>
                          In-Active
                        </Radio.Button>
                      </Radio.Group>
                    </Col>
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Row gutter={[15, 15]} style={{ justifyContent: "end" }}>
                    <Col
                      span={12}
                      style={{ textAlign: "right" }}
                      className="d-flex justify-content-end align-items-center">
                      <Form.Item className="mx-2">
                        <Button
                          className="orangeFactory"
                          type="primary"
                          htmlType="submit"
                          loading={savingVendorMaster}
                          disabled={savingVendorMaster}>
                          Save
                        </Button>
                      </Form.Item>

                      <Form.Item>
                        <Button
                          disabled={savingVendorMaster}
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

export default VendorMasterForm;
