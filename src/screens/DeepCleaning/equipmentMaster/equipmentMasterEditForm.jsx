import React, { useState,useEffect } from "react";
import { Card, Button, Col, Row, Form, Input, Radio, TimePicker,Descriptions,Select } from "antd";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { updateEquipmentMaster } from "../../../@app/subMaster/subMasterSlice";
import { useLocation } from "react-router-dom";
import messageToast from "../../../components/messageToast/messageToast";
import {transStatus} from '../../../util/transStatus';
import { getDefinitionsList } from "../../../@app/subMaster/subMasterSlice";

import { map } from "ramda";

const { Option } = Select;

function equipmentMasterEditForm() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    state: { data: defaultValue }
  } = useLocation();

  const { state } = useLocation();
  const [status, setStatus] = useState(defaultValue?.status ?? 1);
  const [loading, setLoading] = useState(false);
  const { savingEquipmentMaster } = useSelector((state) => {
    return state.subMaster;
  });

  const format = "HH:mm:ss";

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

  useEffect(() => {
    dispatch(getDefinitionsList());
  }, []);

  const {
    gettingDefinitionsList,
    getDefinitionsListResponse: { data: def }
  } = useSelector((state) => {
    return state.subMaster;
  });

  
  const [checkListType, setCheckListType] = useState();
  const [timeLot, setTimeLot] = useState();
  const [functionalType, setFunctionalType] = useState();

  const {
    userData: { data: datanew },    
  } = useSelector((state) => {
    return state.auth;
  });

  const onFinish = (data) => {
   setLoading(false);
    dispatch(
      //?
      updateEquipmentMaster({
        data: {
          id: state?.id,
          time: selectedTime,
          status: transStatus({status}) || status,         
          equipment_name: data?.equipment_name || state?.equipment_name,
          check_list_type: checkListType || state?.check_list_type,
          time_lot: timeLot || state?.time_lot,
          functional_type:functionalType || state?.functional_type,
          updated_by : datanew?.id ?? '0',
       }
      })
    ).then(({ message, status, statusText }) => {
      if (status === 200) {
        setLoading(true);
        messageToast({
          message: message ?? statusText,
          status,
          title: "EquipmentMaster Edit Status"
        });
        navigate("/equipmentMaster");
        form.resetFields();
      } else {
        messageToast({
          message: message ?? statusText,
          status,
          title: "EquipmentMaster Status"
        });
      }
    });
  };
  const handleClickBack = () => {
    navigate("/equipmentMaster");
  };

  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);


  return (
    <>
      <Card>      
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
                status: defaultValue?.status ?? 1,
                ...defaultValue
              }}
              autoComplete="off"
            >
              <Row gutter={[15, 0]}>
                {/* <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item name="equipment_name" label="Equipment Name">
                    <Input defaultValue={state?.equipment_name} />
                  </Form.Item>
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item name="timeold" label="Time">
                    <Input
                      style={{
                        width: "170px",
                        background: "#cdd4cf",
                        color: "#000000"
                      }}
                      defaultValue={state?.time}
                    />
                  </Form.Item>
                  <Form.Item
                    name="time"
                    label="Updated Time"
                   // rules={[{ required: true, message: "Please enter Time" }]}
                  >
                    <TimePicker
                      placeholder="Time"
                      style={{ width: "170px" }}
                      //defaultValue={state?.time}
                      value={formattedTime}
                      onChange={onDurationChange}
                      format={format}
                      name="call_duration"
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="status"
                    label="Status"
                    rules={[
                      { required: true, message: "Please select your status" }
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
                </Col> */}
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
                          onChange={(e) => setCheckListType(e)}
                          defaultValue={state?.check_list_type}
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
                          onChange={(e) => setTimeLot(e)}
                          defaultValue={state?.time_lot}
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
                          onChange={(e) => setFunctionalType(e)}
                          defaultValue={state?.functional_type}
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
                      >
                        <Input
                          style={{ width: "250px" }}
                          placeholder="Enter Equipment Name"
                          defaultValue={state?.equipment_name}
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
                  <Form.Item name="timeold">
                    <Input
                      style={{
                        width: "170px",
                        background: "#cdd4cf",
                        color: "#000000"
                      }}
                      defaultValue={state?.time}
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
                  
                   // rules={[{ required: true, message: "Please enter Time" }]}
                  >
                    <TimePicker
                      placeholder="Time"
                      style={{ width: "170px" }}
                      //defaultValue={state?.time}
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
                    <Col
                      span={12}
                      style={{ textAlign: "right" }}
                      className="d-flex align-items-center justify-content-end mt-3"
                    >
                      <Form.Item className="mx-2">
                        <Button
                          className="orangeFactory"
                          type="primary"
                          htmlType="submit"
                          loading={loading}
                          disabled={savingEquipmentMaster}
                        >
                          {"Update"}
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

export default equipmentMasterEditForm;
