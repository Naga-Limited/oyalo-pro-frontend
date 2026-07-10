import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Col,
  Row,
  Form,
  Input,
  Radio,
  TimePicker,
  message,
  Select,
  Descriptions
} from "antd";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  addEquipmentMaster,
  updateEquipmentMaster
} from "../../../@app/subMaster/subMasterSlice";
import { transStatus } from "../../../util/transStatus";
import { useLocation } from "react-router-dom";
import messageToast from "../../../components/messageToast/messageToast";
import { getDefinitionsList } from "../../../@app/subMaster/subMasterSlice";

import { map } from "ramda";

const { Option } = Select;

function equipmentMasterForm() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    state: { data: defaultValue, isEdit = false }
  } = useLocation();

  const [status, setStatus] = useState(defaultValue?.status ?? 1);

  const [messageApi, contextHolder] = message.useMessage();
  const { savingEquipmentMaster } = useSelector((state) => {
    return state.subMaster;
  });
  const [show, setShow] = useState(false);
  const format = "HH:mm:ss";

  useEffect(() => {
    setShow(true);
  }, []);

  const [selectedTime, setSelectedTime] = useState("");

  let formattedTime;
  const onDurationChange = (e) => {
    const hours = e["$d"].getHours();
    const minutes = e["$d"].getMinutes();
    const seconds = e["$d"].getSeconds();
    // Format the time as HH:MM:SS
    formattedTime = `${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    setSelectedTime(formattedTime);
  };


  const {
    userData: { data: datanew },    
  } = useSelector((state) => {
    return state.auth;
  });

  const onFinish = (data) => {
    dispatch(
      defaultValue?.id
        ? updateEquipmentMaster({
            data: {
              ...data,
              status: transStatus({ status }),
              id: defaultValue.id
            }
          })
        : addEquipmentMaster({
            data: {
              time: selectedTime,
              equipment_name: data?.equipment_name,
              check_list_type: data?.check_list_type,
              time_lot: data?.time_lot,
              functional_type:data?.functional_type,
              status: data?.status,
              entry_by: datanew?.id ?? '0',
            }
          })
    ).then(({ status }) => {
      if (status === 200) {
        messageToast({
          message: data?.statusText,
          status: status,
          title: "Equipment Master"
        });
        form.resetFields();
        navigate("/equipmentMaster");
      }
      if (status === 400) {
        messageApi.open({
          type: "warning",
          content: "Equipment already exists",
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

  const handleClickBack = () => {
    navigate("/equipmentMaster");
  };

  useEffect(() => {
    dispatch(getDefinitionsList());
  }, []);

  const {
    gettingDefinitionsList,
    getDefinitionsListResponse: { data: def }
  } = useSelector((state) => {
    return state.subMaster;
  });

  return (
    <>
      {contextHolder}
      <Card>
        {/* <ConfirmOnExit showModel={showDialog} /> */}
        <Row style={{ justifyContent: "center" }}>
          <Col span={24}>
            <Form
              //onFieldsChange={() => setShowDialog(true)}
              name="basic"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              onFinish={onFinish}
              disabled={savingEquipmentMaster}
              form={form}
              initialValues={{
                equipment_name: defaultValue?.equipment_name,
                time: defaultValue?.time,
                status: defaultValue?.status ?? 1,
                ...defaultValue
              }}
              autoComplete="off"
            >
              <Row gutter={[15, 0]}>
                <Descriptions bordered size="small">
                  <Descriptions.Item
                    label={"Check List Type"}
                    style={{ width: "150px" }}
                    className={`custom-background ${show ? "show" : ""}`}
                  >
                    <Col>
                      <Form.Item name="check_list_type">
                        <Select
                          placeholder="Select"
                          style={{
                            width: "250px",
                            height: "34px",
                            border: "2px solid #f5a60b",
                            borderRadius: "10px",
                          //  padding:"2px"
                          }}
                          name="type"
                          loading={gettingDefinitionsList}
                          // onChange={(e) => setType(e)}
                          defaultValue={defaultValue?.definition_list}
                          showSearch
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {map(
                            (state) => {
                              return (
                                <Option key={state.id} value={state.id}>
                                  {state.def_list_name}
                                </Option>
                              );
                            },
                            def
                              ? def?.filter(
                                  (e) => e.def_title == "Check List Type" && e.status == 1
                                )
                              : []
                          )}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={"Time Lot"}
                    style={{ width: "150px" }}
                    className={`custom-background ${show ? "show" : ""}`}
                  >
                    <Col>
                      <Form.Item name="time_lot">
                        <Select
                          placeholder="Select"
                          style={{
                            width: "250px",
                            height: "34px",
                            border: "2px solid #f5a60b",
                            borderRadius: "10px"
                          }}
                          name="type"
                          loading={gettingDefinitionsList}
                          // onChange={(e) => setType(e)}
                          defaultValue={defaultValue?.definition_list}
                          showSearch
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {map(
                            (state) => {
                              return (
                                <Option key={state.id} value={state.id}>
                                  {state.def_list_name}
                                </Option>
                              );
                            },
                            def
                              ? def?.filter(
                                  (e) => e.def_title == "Time Lot" && e.status == 1
                                )
                              : []
                          )}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={"Functional Type"}
                    style={{ width: "150px" }}
                    className={`custom-background ${show ? "show" : ""}`}
                  >
                    <Col>
                      <Form.Item name="functional_type">
                        <Select
                          placeholder="Select"
                          style={{
                            width: "250px",
                            height: "34px",
                            border: "2px solid #f5a60b",
                            borderRadius: "10px"
                          }}
                          name="type"
                          loading={gettingDefinitionsList}
                          // onChange={(e) => setType(e)}
                          defaultValue={defaultValue?.definition_list}
                          showSearch
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {map(
                            (state) => {
                              return (
                                <Option key={state.id} value={state.id}>
                                  {state.def_list_name}
                                </Option>
                              );
                            },
                            def
                              ? def?.filter(
                                  (e) => e.def_title == "Functional Type" && e.status == 1
                                )
                              : []
                          )}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={"Particulars Name"}
                    style={{ width: "150px" }}
                    className={`custom-background ${show ? "show" : ""}`}
                  >
                    <Col md={{ span: 6 }} xs={{ span: 24 }}>
                      <Form.Item
                        name="equipment_name"
                        //label="Particulars Name"
                        rules={[
                          {
                            required: true,
                            message: "Please enter Equipment name"
                          }
                        ]}
                      >
                        <Input
                          style={{ width: "250px" }}
                          placeholder="Enter Equipment Name"
                        />
                      </Form.Item>
                    </Col>
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={"Time"}
                    style={{ width: "150px" }}
                    className={`custom-background ${show ? "show" : ""}`}
                  >
                    <Col md={{ span: 6 }} xs={{ span: 24 }}>
                      <Form.Item
                        name="time"
                        rules={[
                          { required: true, message: "Please enter Time" }
                        ]}
                      >
                        {/* <Input placeholder='Enter time' /> */}
                        <TimePicker
                          placeholder="Time"
                          style={{ width: "170px" }}
                          defaultValue={defaultValue?.time}
                          value={formattedTime}
                          onChange={onDurationChange}
                          format={format}
                          name="call_duration"
                        />
                      </Form.Item>
                    </Col>
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={" * Status"}
                    style={{ width: "150px", color: "#f70707" }}
                    className={`custom-background ${show ? "show" : ""}`}
                  >
                    <Col span={24}>
                      <Form.Item
                        name="status"
                        //label="Status"
                        rules={[
                          {
                            required: true,
                            message: "Please select your status"
                          }
                        ]}
                      >
                        <Col span={24}>
                          <Col span={24}>
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
                          </Col>
                        </Col>
                      </Form.Item>
                    </Col>
                  </Descriptions.Item>
                </Descriptions>
                <Col span={24}>
                  <Form.Item>
                    <Button
                      onClick={handleClickBack}
                      disabled={savingEquipmentMaster}
                    >
                      Back
                    </Button>
                  </Form.Item>
                  <Row gutter={[15, 15]} style={{ justifyContent: "end" }}>
                    <Col>
                      <Form.Item className="mx-2">
                        <Button
                          className="orangeFactory"
                          type="primary"
                          htmlType="submit"
                          disabled={savingEquipmentMaster}
                          loading={savingEquipmentMaster}
                        >
                          {isEdit ? "Update" : "Add"}
                        </Button>
                      </Form.Item>
                      {/* </Col>
                    <Col span={12}> */}
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

export default equipmentMasterForm;
