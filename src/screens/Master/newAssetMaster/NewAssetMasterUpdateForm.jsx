/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
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
  DatePicker,
} from "antd";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { transStatus } from "../../../util/transStatus";
import {
  addAuditSubCategory,
  getAuditCategory,
  getOutletMaster,
  updateAuditSubCategory,
} from "../../../@app/master/masterSlice";
import { map } from "ramda";
import {
  getAssetGroup,
  getAssetMaster,
  saveAssetMaster,
  saveNewAssetMaster,
  updateAssetMaster,
  updateNewAssetMaster,
} from "../../../@app/service/serviceSlice";
import dayjs from "dayjs";
import ConfirmOnExit from "../../../components/confirmOnExit/ConfirmOnExit";
import messageToast from "../../../components/messageToast/messageToast";

const { Option } = Select;

function NewAssetMasterUpdateForm() {
  const {
    state: { data: defaultValue = {}, isEdit = false },
  } = useLocation();

  const [status, setStatus] = useState(defaultValue?.status ?? 1);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [showDialog, setShowDialog] = useState(false);
  const [selectedOutlet, setSelectedOutlet] = useState();

  const {
    gettingAssetGroup,
    savingAssetMaster,
    getAssetGroupResponse: { data: assetGroups },
  } = useSelector((state) => {
    return state.service;
  });

  const {
    getOutletMasterResponse: { data: outletData },
  } = useSelector((state) => {
    return state.master;
  });

  const outletList = outletData?.map((o) => ({
    ...o,
    outlet_code: `${o?.outlet_code} - ${o?.name}`,
  }));

  useEffect(() => {
    dispatch(getAssetGroup());
    dispatch(getOutletMaster());
  }, [dispatch]);

  const handleClickBack = () => {
    navigate("/assetMaster");
  };
  const dateFormat = ["DD/MM/YYYY", "DD/MM/YY"];
  const onFinish = (data) => {
    setShowDialog(false);
    const outletCode = defaultValue?.id
      ? defaultValue.outlet_code
      : (outletData ?? []).find(
          (outletData) => outletData?.id === selectedOutlet
        )?.outlet_code;
    const asset_warranty_end_date =
      data["asset_warranty_end_date"]?.format("YYYY-MM-DD");
    const spares_list = (data.spares_list ?? []).map((spares_list) => {
      return {
        ...spares_list,
        spare_warranty_end_date:
          spares_list.spare_warranty_end_date?.format("YYYY-MM-DD"),
      };
    });

    let payload = {
      assets: data.assets?.map((_) => ({
        company_code: data.company_code,
        plant_code: data.plant_code,
        outlet_code: outletCode,
        asset_warranty_end_date,
        spares_list,
        asset_group: data?.asset_group,
        ..._,
      })),
    };

    dispatch(
      defaultValue?.id
        ? updateNewAssetMaster({
            data: {
              ...payload,
              id: defaultValue.id,
            },
          })
        : saveNewAssetMaster({
            data: payload,
          })
    ).then(({ message, status, statusText }) => {
      if (status === 200) {
        form.resetFields();
        navigate("/assetMaster");
        messageToast({
          message: message ?? statusText,
          status,
          title: "Asset group Master",
        });
      } else {
        messageToast({
          message: message ?? statusText,
          status,
          title: "Asset Group Master",
        });
      }
    });
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
              disabled={savingAssetMaster}
              wrapperCol={{ span: 24 }}
              initialValues={{
                ...defaultValue,
                asset_warranty_end_date:
                  defaultValue && dayjs(defaultValue?.asset_warranty_end_date),
                spares_list: (defaultValue?.spares_list ?? []).map((list) => {
                  return {
                    ...list,
                    spare_warranty_end_date: dayjs(
                      list?.spare_warranty_end_date
                    ),
                  };
                }),
              }}
              onFinish={onFinish}
              autoComplete="off">
              <Row gutter={[25, 0]}>
                <Col md={{ span: 4 }} xs={{ span: 16 }}>
                  <Form.Item
                    name="company_code"
                    label="Company code"
                    rules={[
                      {
                        pattern: /^[a-zA-Z0-9' '  ]*$/,
                        message: "Invalid value",
                      },
                      { required: true, message: "Please enter company code" },
                    ]}
                    disabled={savingAssetMaster}>
                    <Input name="company_code" placeholder="Asset No in SAP" />
                  </Form.Item>
                </Col>
                <Col md={{ span: 4 }} xs={{ span: 16 }}>
                  <Form.Item
                    name="plant_code"
                    label="Plant code"
                    rules={[
                      {
                        pattern: /^[a-zA-Z0-9' '  ]*$/,
                        message: "Invalid value",
                      },
                      { required: true, message: "Please add Plant code" },
                    ]}>
                    <Input name="plant_code" placeholder="Plant Code" />
                  </Form.Item>
                </Col>

                <Col md={{ span: 6 }} xs={{ span: 24 }} lg={4}>
                  <Form.Item
                    name="asset_group"
                    label="Asset Group "
                    rules={[
                      { required: true, message: "Please select Asset Group" },
                    ]}
                    disabled={savingAssetMaster}>
                    <Select
                      placeholder="select Asset Group"
                      disabled={gettingAssetGroup}
                      showSearch
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }>
                      {map(
                        (assetGroup) => {
                          return (
                            <Option key={assetGroup.id} value={assetGroup.id}>
                              {assetGroup.name}
                            </Option>
                          );
                        },
                        assetGroups ? assetGroups : []
                      )}
                    </Select>
                  </Form.Item>
                </Col>

                {false && (
                  <Col md={{ span: 4 }} xs={{ span: 16 }}>
                    <Form.Item
                      name="asset"
                      label="Asset"
                      rules={[
                        {
                          pattern: /^[a-zA-Z0-9' '  ]*$/,
                          message: "Invalid value",
                        },
                        { required: true, message: "Please enter asset" },
                      ]}>
                      <Input name="asset" placeholder="Asset Name" />
                    </Form.Item>
                  </Col>
                )}

                {false && (
                  <Col span={24}>
                    <Form.Item name="status" label="Status ">
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
                )}

                <Col md={{ span: 24 }} xs={{ span: 24 }} lg={12}>
                  <Form.Item name="asset_no_sap" label="Add Asset">
                    <Form.List
                      name="assets"
                      rules={[
                        {
                          validator: async (_, names) => {
                            if (!names || names.length < 1) {
                              return Promise.reject(
                                new Error("At least add 1 Add Asset")
                              );
                            }
                          },
                        },
                      ]}>
                      {(fields, { add, remove }, { errors }) => (
                        <div>
                          {fields.map((field, index) => (
                            <Space
                              key={index}
                              disabled={
                                defaultValue?.auditcategory_status === "0"
                              }
                              style={{
                                display: "flex",
                                ///flexDirection: "column",
                                justifyContent: "space-between",
                                alignItems: "baseline",
                              }}>
                              <Form.Item
                                {...field}
                                name={[field.name, "id"]}
                                initialValue={0}
                              />

                              <Form.Item
                                {...field}
                                name={[field.name, "asset_no_sap"]}
                                validateTrigger={["onChange", "onBlur"]}
                                rules={[
                                  {
                                    required: true,
                                    whitespace: true,
                                    message:
                                      "Please input Add Asset No Sap or delete this field.",
                                  },
                                ]}>
                                <Input
                                  style={{
                                    width: "100% ",
                                  }}
                                  placeholder="Asset No Sap"
                                  disabled={false}
                                />
                              </Form.Item>
                              {/* <Form.Item
                                {...field}
                                name={[field.name, "asset_name_sap"]}
                                validateTrigger={["onChange", "onBlur"]}
                                rules={[
                                  {
                                    required: true,
                                    whitespace: true,
                                    message:
                                      "Please input Add Asset Name Sap or delete this field.",
                                  },
                                ]}>
                                <Input
                                  style={{
                                    width: "100% ",
                                  }}
                                  placeholder="Asset Name Sap"
                                  disabled={false}
                                />
                              </Form.Item> */}

                              <Form.Item
                                {...field}
                                name={[field.name, "name"]}
                                validateTrigger={["onChange", "onBlur"]}
                                rules={[
                                  {
                                    required: true,
                                    whitespace: true,
                                    message:
                                      "Please input Add Asset or delete this field.",
                                  },
                                ]}>
                                <Input
                                  style={{
                                    width: "100% ",
                                  }}
                                  placeholder="Asset Name"
                                  disabled={false}
                                />
                              </Form.Item>

                              <Form.Item
                                {...field}
                                name={[field.name, "status"]}
                                initialValue={1}
                                rules={[
                                  {
                                    required: true,
                                    message: "Missing Status",
                                  },
                                ]}>
                                <Radio.Group
                                  defaultValue={1}
                                  disabled={
                                    defaultValue?.auditcategory_status === "0"
                                  }
                                  buttonStyle="solid"
                                  style={{
                                    display: "flex",
                                  }}>
                                  <Radio.Button
                                    value={
                                      defaultValue?.mode === "edit" ? "1" : 1
                                    }
                                    className="active">
                                    Active
                                  </Radio.Button>
                                  <Radio.Button
                                    value={
                                      defaultValue?.mode === "edit" ? "0" : 0
                                    }
                                    className="in-active">
                                    InActive
                                  </Radio.Button>
                                </Radio.Group>
                              </Form.Item>

                              <MinusCircleOutlined
                                onClick={() => remove(field.name)}
                              />
                            </Space>
                          ))}
                          <Form.Item>
                            <Button
                              type="dashed"
                              onClick={() => add()}
                              style={{
                                width: "40%",
                                paddingLeft: "5px",
                                backgroundColor: "green",
                                color: "white",
                              }}
                              icon={<PlusOutlined style={{}} />}
                              disabled={false}>
                              Add field
                            </Button>

                            <Form.ErrorList errors={errors} />
                          </Form.Item>
                        </div>
                      )}
                    </Form.List>
                  </Form.Item>
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
                          loading={savingAssetMaster}
                          disabled={savingAssetMaster}>
                          {isEdit ? "Update" : "Add"}
                        </Button>
                      </Form.Item>

                      <Form.Item>
                        <Button
                          disabled={savingAssetMaster}
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

export default NewAssetMasterUpdateForm;
