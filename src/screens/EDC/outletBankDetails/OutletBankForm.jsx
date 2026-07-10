import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import messageToast from "../../../components/messageToast/messageToast";
import { useLocation, useNavigate } from "react-router";
import {
  addOutletBankDetails,
  updateOutletBankDetails
} from "../../../@app/master/masterSlice";
import { Controller, useForm } from "react-hook-form";
import {
  Input,
  Card,
  Button,
  Radio,
  Col,
  Row,
  Form,
  Select,
  Descriptions,
  message
  // Upload, Modal, Image
} from "antd";
import { transStatus } from "../../../util/transStatus";
import { map } from "ramda";
import { getOutletMasternotsubzone } from "../../../@app/master/masterSlice";

function OutletBankForm(mode) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [apiError, setApiError] = useState("");
  const { Option } = Select;
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(true);
  }, []);

  const [messageApi, contextHolder] = message.useMessage();
  const [selectedOutlet, setSelectedOutlet] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    control
    //formState: { errors }
  } = useForm();

  useEffect(() => {
    dispatch(getOutletMasternotsubzone());
  }, [dispatch]);

  const {
    getOutletMasterResponse: { data: outletData }
  } = useSelector((state) => {
    return state.master;
  });
  const outletList = outletData?.map((o) => ({
    ...o,
    outlet_code: `${o?.outlet_code} - ${o?.name}`
  }));

  const loginType = useSelector((state) => state.auth.type);
  const emp_map = useSelector(
    (state) =>
      state.auth.userData.data && state.auth.userData.data.employee_mapping
  );

  const onClickBack = () => {
    navigate("/outletBankDetails");
  };

  const { state } = useLocation();

  console.log(state, "state");
  const isEdit = state?.isEdit || false;
  let defaultValue = state?.data;

  if (defaultValue?.id) {
    form.setFieldsValue({ employee_image: defaultValue?.image ?? "No image" });
  }

  let newMid;
  const [mid, setMid] = useState("");
  const onChangeMid = (e) => {
    newMid = e.target.value;
    setMid(newMid);
  };

  let newMerchantid;
  const [merchant_id, setMerchantId] = useState("");
  const onChangeMerchantId = (e) => {
    newMerchantid = e.target.value;
    setMerchantId(newMerchantid);
  };

  const [status, setStatus] = useState(defaultValue?.status ?? 1);

  //const [name] = useState(`${state?.outlet_code} - ${state?.outlet_name}`);

  const onFinish = (data) => {
    let outlet_id = selectedOutlet.id;
    setApiError("");
    let id;
    if (defaultValue?.id) {
      id = defaultValue?.id;
    }
    dispatch(
      defaultValue?.id
        ? updateOutletBankDetails({
            data: {
              ...data,
              status: transStatus({ status }),
              mid: mid ? mid : state?.mid,
              merchant_id : merchant_id ? merchant_id : state?.merchant_id,
              id: id,
              outlet_id: outlet_id ? outlet_id : state?.outlet_id
            }
          })
        : addOutletBankDetails({
            data: {
              ...data,
              outlet_id: outlet_id,
              mid: mid,
              merchant_id : merchant_id,
              status: transStatus({ status })
            }
          })
    ).then(({ message, status, statusText }) => {
      if (status === 200) {
        messageToast({
          message: message ?? statusText,
          status,
          title: "Outlet Bank Details Status"
        });
        navigate("/outletBankDetails");
        form.resetFields();
      }
      if (status == 400) {
        messageApi.open({
          type: "warning",
          content: "Outlet Bank Details already exists",
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
                // employee_code: defaultValue?.employee_code,
                // emp_vendor_code:defaultValue?.emp_vendor_code,
                // name: defaultValue?.name,
                // division: defaultValue?.division_id,

                status: defaultValue?.status === "Active" ? "1" : "0"
              }}
              onFinish={onFinish}
              form={form}
              autoComplete="off"
            >
              <Row gutter={[15, 0]}>
                <Descriptions bordered size="small">
                  {state?.outlet_name ? (
                    <Descriptions.Item
                      label={"Outlet Name"}
                      className={`custom-background ${show ? "show" : ""}`}
                    >
                      <Input
                        defaultValue={state?.outlet_name}
                        readOnly
                        style={{ width: "300px", background: "#DDFAAE" }}
                      />
                    </Descriptions.Item>
                  ) : null}
                  <Descriptions.Item
                    label={"Outlet Name"}
                    className={`custom-background ${show ? "show" : ""}`}
                  >
                    <Controller
                      control={control}
                      name="outlet_id"
                      render={({ field: { onChange } }) => (
                        <Select
                          {...register("outlet_id", {
                            required: mode === "add"
                          })}
                          disabled={mode === "edit"}
                          style={{ width: "300px" }}
                          //defaultValue={name ? name : null}
                          placeholder="Select"
                          showSearch
                          onChange={(e) => {
                            onChange(e);
                            setSelectedOutlet(
                              (outletList ?? [])?.find(
                                (outlet) => outlet.id === e
                              )
                            );
                          }}
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {map(
                            (outlet) => {
                              return (
                                <Option key={outlet?.id} value={outlet?.id}>
                                  {outlet?.outlet_code}
                                </Option>
                              );
                            },
                            outletList
                              ? outletList.filter((e) => {
                                  if (loginType === 2) {
                                    let fid =
                                      emp_map &&
                                      emp_map.outlet.findIndex(
                                        (x) => Number(x.id) === Number(e.id)
                                      );
                                    if (fid !== -1 && e.status == "1")
                                      return true;
                                    else return false;
                                  } else return e.status == "1";
                                })
                              : []
                          )}
                        </Select>
                      )}
                    />
                    {apiError?.outlet_id && (
                      <p style={{ color: "red" }}>Please select Outlet</p>
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={"Zone Name"}
                    className={`custom-background ${show ? "show" : ""}`}
                  >
                    <Controller
                      control={control}
                      name="zone_id"
                      render={({ field: { onChange } }) => (
                        <Input
                          onChange={onChange}
                          value={selectedOutlet?.zone_name}
                          readOnly
                          style={{ width: "300px" }}
                        />
                      )}
                    />
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={"ORL Name"}
                    className={`custom-background ${show ? "show" : ""}`}
                  >
                    <Controller
                      control={control}
                      name="orl_name"
                      render={({ field: { onChange } }) => (
                        <Input
                          onChange={onChange}
                          value={selectedOutlet?.orl_name}
                          readOnly
                          style={{ width: "300px" }}
                        />
                      )}
                    />
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={"MID No"}
                    className={`custom-background ${show ? "show" : ""}`}
                  >
                    <Input
                      name="mid"
                      onChange={onChangeMid}
                      defaultValue={defaultValue?.mid}
                      style={{ width: "300px" }}
                    />
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={"Merchant Id"}
                    className={`custom-background ${show ? "show" : ""}`}
                  >
                    <Input
                      name="merchant_id"
                      onChange={onChangeMerchantId}
                      defaultValue={defaultValue?.merchant_id}
                      style={{ width: "300px" }}
                    />
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={"* Status"}
                    className={`custom-background ${show ? "show" : ""}`}
                    name="status"
                  >
                    <Radio.Group
                      buttonStyle="solid"
                      onChange={(e) => {
                        setStatus(e?.target?.value);
                      }}
                      size="small"
                      defaultValue={
                        defaultValue?.status === "In Active" ? 0 : 1
                      }
                    >
                      <Radio.Button className="active" value={1}>
                        Active
                      </Radio.Button>
                      <Radio.Button className="in-active" value={0}>
                        In-Active
                      </Radio.Button>
                    </Radio.Group>
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

export default OutletBankForm;
