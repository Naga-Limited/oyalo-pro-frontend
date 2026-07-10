import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Col,
  Row,
  Form,
  Radio,
  Descriptions,
  Select,
  message,
  DatePicker,
  Input,
  //Tooltip
} from "antd";
import dayjs from "dayjs";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  updateDayPlanMapping,
  getEquipmentMaster,
  getZonal,
  getSubZonal,
  getDefinitionsList
} from "../../../@app/subMaster/subMasterSlice";
import { useLocation } from "react-router-dom";
import { map } from "ramda";
import { useForm, Controller, useWatch } from "react-hook-form";
import messageToast from "../../../components/messageToast/messageToast";
import { getOutlet } from "../../../@app/subMaster/subMasterSlice";
import { transStatus } from "../../../util/transStatus";

const { Option } = Select;
function dayPlanMappingForm({ mode }) {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const loginType = useSelector((state) => state.auth.type);
  const emp_map = useSelector(
    (state) =>
      state.auth.userData.data && state.auth.userData.data.employee_mapping
  );
  const {
    state: { data: defaultValue, isEdit = false }
  } = useLocation();

  const [startDate, setStartDate] = useState();

  //const [monthDate, setMonthDate] = useState("");
  const [daily, setDaily] = useState([]);
  const [weekly, setWeekly] = useState();
  const [endnewDate, setEnddate] = useState();

  const handleDateChange = (date) => {
    setStartDate(date);
    if (date) {
      const endDate = dayjs(date).add(15, "days");
      // Format the endDate as per your requirement
      const formattedEndDate = endDate.format("YYYY-MM-DD");
      // Update the value in the Input component
      form.setFieldsValue({ Diff_date: formattedEndDate });
      setEnddate(formattedEndDate);
    } else {
      // Clear the value in the Input component if no date is selected
      form.setFieldsValue({ Diff_date: "" });
    }
  };
  const [type, setType] = useState();
  const [zone, setZone] = useState();
  const [subzone, setSubzone] = useState();
  const [equipment, setEquipment] = useState();
  const {
    gettingDefinitionsList,
    getDefinitionsListResponse: { data: def }
  } = useSelector((state) => {
    return state.subMaster;
  });

  useEffect(() => {
    // Check if the type is equal to 54
    if (type === 54) {
      // Set the initial values for daily based on def
      setDaily(
        def
          ? def.filter((e) => e.def_title === "Day").map((state) => state.id)
          : []
      );
    }
  }, [type, def]); // Run the effect when type or def changes

  const {
    register,
    control,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    dispatch(getEquipmentMaster());
  }, []);

  useEffect(() => {
    dispatch(getZonal());
  }, []);

  const zone_id = useWatch({
    control,
    name: "zone_id"
  });

  const subzone_id = useWatch({
    control,
    name: "subzone_id"
  });

  useEffect(() => {
    dispatch(getSubZonal(zone_id));
  }, [dispatch, zone_id]);

  useEffect(() => {
    dispatch(getOutlet(subzone_id));
  }, [dispatch, subzone_id]);

  const {
    getOutletResponse: { data: outlet }
  } = useSelector((state) => {
    return state.subMaster;
  });

  useEffect(() => {
    dispatch(getDefinitionsList());
  }, []);

  const [selectedOutlets, setselectedOutlets] = useState([]);
  const [status, setStatus] = useState(defaultValue?.status ?? 1);

  const disabledStartDate = (current) => {
    return current && current <= dayjs().startOf("day");
  };

  const [show, setShow] = useState(false);

  const {
    gettingEquipmentMaster,
    getEquipmentMasterResponse: { data: equi }
  } = useSelector((state) => {
    return state.subMaster;
  });

  const {
    getZonalResponse: { data: Zonals },
    getSubZonalResponse: { data: SubZonals }
  } = useSelector((state) => {
    return state.subMaster;
  });

  const outletList = outlet?.map((o) => ({
    ...o,
    outlet_code: `${o?.outlet_code} - ${o?.name}`
  }));

  useEffect(() => {
    setShow(true);
  }, []);

  const { savingEquipmentMaster } = useSelector((state) => {
    return state.subMaster;
  });
  let formattedStartDate;

  const onFinish = (data) => {
    // Store the initial type value
    const initialType = state?.type;
    if (type === 55) {
      formattedStartDate = startDate.format("YYYY-MM-DD");
    }
    dispatch(
      updateDayPlanMapping({
        data: {
          ...data,
          id: state?.id,
          status: transStatus({ status }) || status,
          type: type || state?.type,
          ...(type === 54 && { day: daily }),
          ...(type === 55 && { day: `${formattedStartDate},${endnewDate}` }),
          ...(type === 57 && { day: weekly }),
          zone_id: zone || state?.zone_id,
          subzone_id: subzone || state?.subzone_id,
          equipment: equipment || state?.equipment,
          outlet_id: selectedOutlets || state?.outlet_id,
          // Update day only if type is not changed
          ...(type === initialType ? { day: state?.day } : {})
        }
      })
    ).then(({ message, status, statusText }) => {
      if (status === 200) {
        messageToast({
          message: message ?? statusText,
          status,
          title: "Day Plan Edit Status"
        });
        navigate("/dayPlanMappingMaster");
        form.resetFields();
      } else {
        messageToast({
          message: message ?? statusText,
          status,
          title: "Day Plan Status"
        });
      }
      if (status == 400) {
        messageApi.open({
          type: "warning",
          content: "Day Plan Mapping already exists",
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
    navigate("/dayPlanMappingMaster");
  };

  return (
    <>
      {contextHolder}
      <Card>
        <Row style={{ justifyContent: "center" }}>
          <Col span={24}>
            <Form
             // onFieldsChange={() => setShowDialog(true)}
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
                <Descriptions bordered size="small">
                  <Descriptions.Item
                    label={"Equipment"}
                    style={{ width: "150px" }}
                    className={`custom-background ${show ? "show" : ""}`}
                  >
                    <Form.Item>
                      <Select
                        placeholder="Select"
                        style={{
                          width: "250px",
                          height: "34px",
                          border: "2px solid #f5a60b",
                          borderRadius: "10px"
                        }}
                        name="equipment"
                        loading={gettingEquipmentMaster}
                        onChange={(e) => setEquipment(e)}
                        disabled={mode === "edit"}
                        defaultValue={state?.equipment_name}
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
                                {state.equipment_name}
                              </Option>
                            );
                          },
                          equi ? equi?.filter((e) => e.status === "1") : []
                        )}
                      </Select>
                    </Form.Item>
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={"Type"}
                    style={{ width: "150px" }}
                    className={`custom-background ${show ? "show" : ""}`}
                  >
                    <Form.Item>
                      <Select
                        placeholder="Select"
                        style={{
                          width: "250px",
                          height: "34px",
                          border: "2px solid #f5a60b",
                          borderRadius: "10px"
                        }}
                        name="type"
                        disabled={mode === "edit"}
                        loading={gettingDefinitionsList}
                        // onChange={(e) => setType(e)}
                        onChange={(e) => {
                          setType(e);

                          // Check if the selected value is different from the initial type
                          if (e !== state?.type) {
                            // Update day only if type is not changed
                            dispatch(
                              updateDayPlanMapping({
                                data: {
                                  // ...data,
                                  ...(type !== 55 && { day: state?.day })
                                }
                              })
                            );
                          }
                        }}
                        defaultValue={state?.type_name}
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
                          def ? def?.filter((e) => e.def_title == "Type"  && e.status == 1) : []
                        )}
                      </Select>
                    </Form.Item>
                  </Descriptions.Item>
                  {/* <Descriptions.Item
                    label={"Day Details"}
                    style={{ width: "150px" }}
                    className={`custom-background ${show ? "show" : ""}`}
                  >
                    <Form.Item>
                      {state?.day_name != "" ? (
                        <Tooltip title={state?.day_name} placement="top">
                          <Input
                            readOnly
                            style={{
                              //width: "270px",
                              background: "#cdd4cf",
                              color: "#000000"
                            }}
                            defaultValue={state?.day_name}
                          />
                        </Tooltip>
                      ) : (
                        []
                      )} */}
                      {/* {state?.day_name == "" ? (
                        <Tooltip title={state?.daynew} placement="top">
                          <Input
                            readOnly
                            style={{
                              //width: "270px",
                              background: "#cdd4cf",
                              color: "#000000"
                            }}
                            defaultValue={state?.daynew}
                          />
                        </Tooltip>
                      ) : (
                        []
                      )}
                    </Form.Item>
                  </Descriptions.Item> */}
                  {type === 54 ? (
                    <Descriptions.Item
                      label={"Day"}
                      style={{ width: "150px" }}
                      className={`custom-background ${show ? "show" : ""}`}
                    >
                      <Col>
                        <Form.Item name="day">
                          <Select
                            placeholder="Select"
                            style={{
                              width: "250px",
                              height: "34px",
                              border: "2px solid #f5a60b",
                              borderRadius: "10px"
                            }}
                            name="day"
                            //disabled
                            loading={gettingDefinitionsList}
                            maxTagCount={0}
                            mode="multiple"
                            onLoad={(e) => setDaily(e)}
                            value={daily}
                            defaultValue={
                              def
                                ? def
                                    .filter((e) => e.def_title === "Day")
                                    .map((state) => state.id)
                                : []
                            }
                            showSearch
                            filterOption={(input, option) =>
                              option.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            {def
                              ? def
                                  .filter((e) => e.def_title === "Day")
                                  .map((state) => (
                                    <Option key={state.id} value={state.id}>
                                      {state.def_list_name}
                                    </Option>
                                  ))
                              : null}
                          </Select>
                        </Form.Item>
                      </Col>
                    </Descriptions.Item>
                  ) : null}
                  {type === 57 ? (
                    <Descriptions.Item
                      label={"Select Day"}
                      style={{ width: "150px" }}
                      className={`custom-background ${show ? "show" : ""}`}
                    >
                      <Col>
                        <Form.Item name="day">
                          <Select
                            placeholder="Select"
                            style={{
                              width: "250px",
                              height: "34px",
                              border: "2px solid #f5a60b",
                              borderRadius: "10px"
                            }}
                            name="day"
                            loading={gettingDefinitionsList}
                            onChange={(e) => setWeekly(e)}
                            maxTagCount={0}
                            mode="multiple"
                            disabled={mode === "edit"}
                            value={weekly}
                            showSearch
                            filterOption={(input, option) =>
                              option.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            {map(
                              (state) => (
                                <Option key={state.id} value={state.id}>
                                  {state.def_list_name}
                                </Option>
                              ),
                              def
                                ? def?.filter((e) => e.def_title === "Day")
                                : []
                            )}
                          </Select>
                        </Form.Item>
                      </Col>
                    </Descriptions.Item>
                  ) : null}
                  {/* {type === 56 ? (
                    <Descriptions.Item
                      label={"Day"}
                      style={{ width: "150px" }}
                      className={`custom-background ${show ? "show" : ""}`}
                    >
                      <Col>
                        <Form.Item name="day">
                          <Input
                            type="date"
                            value={
                              monthDate
                                ? dayjs(monthDate).format("YYYY-MM-DD")
                                : ""
                            }
                            onChange={(e) => setMonthDate(e.target.value)}
                          ></Input>
                        </Form.Item>
                      </Col>
                    </Descriptions.Item>
                  ) : null} */}
                  {type === 55 ? (
                    <Descriptions.Item
                      label={"Day"}
                      style={{ width: "150px" }}
                      className={`custom-background ${show ? "show" : ""}`}
                    >
                      <Col>
                        <Form.Item name="day">
                          <DatePicker
                            onSelect={handleDateChange}
                            disabledDate={(e) => disabledStartDate(e)}
                            format="DD-MM-YYYY"
                            style={{ width: "120px" }}
                          />

                          <Input
                            //  className="mx-3"
                            type="text"
                            readOnly
                            name="endDate"
                            // style={{ width: "50px" }}
                            placeholder=""
                            value={
                              startDate
                                ? dayjs(form.getFieldValue("Diff_date")).format(
                                    "DD-MM-YYYY"
                                  )
                                : ""
                            }
                            // name="Diff_date"
                          />
                        </Form.Item>
                      </Col>
                    </Descriptions.Item>
                  ) : null}

                  <Descriptions.Item
                    label={"Zone"}
                    style={{ width: "150px" }}
                    className={`custom-background ${show ? "show" : ""}`}
                  >
                    <Col>
                      <Form.Item name="zone_id">
                        <Select
                          placeholder="select"
                          //  disabled={!roleSelected.includes('Zone')}
                          mode="multiple"
                          readOnly
                          onChange={(e) => setZone(e)}
                          showSearch
                          defaultValue={state?.zone_id}
                          // onChange={(e) => setZone(e)}
                          filterOption={(input, option) =>
                            option.children
                              .toString()
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {map(
                            (Zonal) => {
                              return (
                                <Option key={Zonal.id} value={Zonal.id}>
                                  {Zonal.zonal_name}
                                </Option>
                              );
                            },
                            Zonals
                              ? Zonals?.filter((e) => e.status === "1")
                              : []
                          )}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={"Sub Zone"}
                    style={{ width: "150px" }}
                    className={`custom-background ${show ? "show" : ""}`}
                  >
                    <Col>
                      <Form.Item name="subzone_id">
                        <Select
                          placeholder="select"
                          //  disabled={!roleSelected.includes('Sub Zone')}
                          mode="multiple"
                          showSearch
                          onChange={(e) => setSubzone(e)}
                          defaultValue={state?.subzone_id}
                          filterOption={(input, option) =>
                            option.children
                              .toString()
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {map(
                            (SubZonal) => {
                              return (
                                <Option key={SubZonal.id} value={SubZonal.id}>
                                  {SubZonal.name}
                                </Option>
                              );
                            },
                            SubZonals
                              ? SubZonals?.filter((e) => e.status === "1")
                              : []
                          )}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Descriptions.Item>

                  <Descriptions.Item
                    label={"Outlet Name"}
                    style={{ width: "150px" }}
                    className={`custom-background ${show ? "show" : ""}`}
                  >
                   <Controller
                      control={control}
                      name="outlet_id"
                      render={({ field }) => (
                        <Select
                          {...register("outlet_id", {
                            required: mode === "add"
                          })}
                          disabled={mode === "edit"}
                          mode="multiple"
                          placeholder="Select"
                          maxTagCount={0}
                          style={{ width: "250px" }}
                          showSearch
                          defaultValue={state?.outlet_id}
                          {...field}
                          onChange={(selectedOutlets) => {
                            if (selectedOutlets.includes("select_all")) {
                              // Select All logic
                              field.onChange(
                                outletList.map((outlet) => outlet.id)
                              );
                              //  field.onChange(selectedOutlets);
                              setselectedOutlets(
                                outletList.map((outlet) => outlet.id)
                              );
                            } else if (
                              selectedOutlets.includes("unselect_all")
                            ) {
                              // Unselect All logic
                              field.onChange([]);
                            } else {
                              // Regular selection logic
                              field.onChange(selectedOutlets);
                              setselectedOutlets(selectedOutlets);
                            }
                          }}
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {/* Add "Select All" and "Unselect All" options */}
                          <Option key="select_all" value="select_all">
                            Select All
                          </Option>
                          <Option key="unselect_all" value="unselect_all">
                            Unselect All
                          </Option>
                          {outletList &&
                            outletList
                              .filter((e) => {
                                if (loginType === 2) {
                                  let fid =
                                    emp_map &&
                                    emp_map.outlet.findIndex(
                                      (x) => Number(x.id) === Number(e.id)
                                    );
                                  return fid !== -1;
                                } else {
                                  return true;
                                }
                              })
                              .map((outlet) => (
                                <Option key={outlet?.id} value={outlet?.id}>
                                  {outlet?.outlet_code}
                                </Option>
                              ))}
                        </Select>
                      )}
                    />
                    {errors?.outlet_id && (
                      <p style={{ color: "red" }}>Please select Outlet</p>
                    )}
                  </Descriptions.Item>
                </Descriptions>
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
                </Col>
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
                          disabled={savingEquipmentMaster}
                          loading={savingEquipmentMaster}
                        >
                          {
                            isEdit ? "add" : "Update"
                            //
                          }
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

export default dayPlanMappingForm;
