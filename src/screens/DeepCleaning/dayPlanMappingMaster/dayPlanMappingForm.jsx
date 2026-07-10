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
  Input
} from "antd";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  addDayPlanMapping,
  updateEquipmentMaster,
  getEquipmentMaster,
  getDefinitionsList
} from "../../../@app/subMaster/subMasterSlice";
import {
  getStates,
  getSubZonal,
  EmployeeZone
} from "../../../@app/master/masterSlice";
import dayjs from "dayjs";
import { transStatus } from "../../../util/transStatus";
import { useLocation } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import messageToast from "../../../components/messageToast/messageToast";
import { getOutlet } from "../../../@app/subMaster/subMasterSlice";

import { map } from "ramda";

const { Option } = Select;
function dayPlanMappingForm({ mode }) {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  //const { state } = useLocation();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStates());
  }, [dispatch]);

  const {
    getStatesResponse: { data: states },
    zoneEmp: { data: Zonals },
    getSubZonalResponse: { data: SubZonals }
  } = useSelector((state) => {
    return state.master;
  });

  const [messageApi, contextHolder] = message.useMessage();
  const loginType = useSelector((state) => state.auth.type);
  const emp_map = useSelector(
    (state) =>
      state.auth.userData.data && state.auth.userData.data.employee_mapping
  );
  const {
    state: { data: defaultValue, isEdit = false }
  } = useLocation();

  const {
    register,
    control,
    formState: { errors }
  } = useForm();

  //let endDate;

  const [startDate, setStartDate] = useState();

  //const [monthDate, setMonthDate] = useState("");
  const disabledStartDate = (current) => {
    return current && current <= dayjs().startOf("day");
  };

 
  const [endnewDate,setEnddate] =useState();
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
  useEffect(() => {
    dispatch(getEquipmentMaster());
  }, []);

  const stateID = Form.useWatch("state_id", form);
  const zoneID = Form.useWatch("zone_id", form);
  const subZoneID = Form.useWatch("subzone_id", form);
  useEffect(() => {
    dispatch(EmployeeZone(stateID));
  }, [dispatch, stateID]);

  const [selectedOutlets, setselectedOutlets] = useState([]);

  useEffect(() => {
    dispatch(getSubZonal(zoneID));
  }, [dispatch, zoneID]);

  useEffect(() => {
    dispatch(getOutlet(subZoneID));
  }, [dispatch, subZoneID]);

  const {
    getOutletResponse: { data: outletMasterList }
  } = useSelector((state) => {
    return state.subMaster;
  });

  useEffect(() => {
    dispatch(getDefinitionsList());
  }, []);

  const [status, setStatus] = useState(defaultValue?.status ?? 1);

  const [show, setShow] = useState(false);

  const [type, setType] = useState();

  const {
    gettingDefinitionsList,
    getDefinitionsListResponse: { data: def }
  } = useSelector((state) => {
    return state.subMaster;
  });

  const [daily, setDaily] = useState([]);
 
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



  const [weekly, setWeekly] = useState();

  //  const [equipment, setEquipment] = useState();

  const {
    gettingEquipmentMaster,
    getEquipmentMasterResponse: { data: equi }
  } = useSelector((state) => {
    return state.subMaster;
  });

  const outletList = outletMasterList?.map((o) => ({
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
    if(type==55){
    formattedStartDate = startDate.format("YYYY-MM-DD");
    }
    dispatch(
      defaultValue?.id
        ? updateEquipmentMaster({
            data: {
              ...data,
              status: transStatus({ status }),
              id: defaultValue.id
            }
          })
        : addDayPlanMapping({
            data: {
        ...data,
        outlet_id: selectedOutlets,
         type: type, // Commented out to conditionally include day     
         ...(type === 54 && { day: daily }),
         ...(type === 55 && { day: `${formattedStartDate},${endnewDate}` }),
         ...(type === 57 && { day: weekly }),
        //  zone_id: zone,
        //  subzone_id: subzone,
         equipment: checklistType.id,
         check_list_Type:checklistType.check_list_type,
         time_lot : checklistType.time_lot,
         functional_type:checklistType.functional_type,
        // outlet_id: selectedOutlets,
         status: data?.status
              // ...data,
              // outlet_id: selectedOutlets,
              // // type: type,
              // day: daily,
               // zone_id: zone,
              // // subzone_id: subzone,
              // // equipment: equipment,
              // // outlet_id: selectedOutlets,
              // // status: data?.status
            }
          })
    ).then(({ message, status, statusText }) => {
      if (status === 200) {
        messageToast({
          message: message ?? statusText,
          status,
          title: "Day Plan Mapping Status"
        });
        navigate("/dayPlanMappingMaster");
        form.resetFields();
      }
      if (status == 400) {
        // setApiError("Please fill all values");
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
  // const setDaily = (selectedValues) => {
  //   setDailyState(selectedValues);
  // };
  const handleClickBack = () => {
    navigate("/dayPlanMappingMaster");
  };

  const [checklistType, setCheckListType] = useState();
  
  return (
    <>
      {contextHolder}
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
                <Descriptions bordered size="small">
                  <Descriptions.Item
                    label={"Particulars Name"}
                    style={{ width: "150px" }}
                    className={`custom-background ${show ? "show" : ""}`}
                  >
                    <Col>
                      <Form.Item name="equipment">                       
                        <>
                    <Controller
                      control={control}
                      name="equipement_name"
                      render={({ field: { onChange } }) => (
                        <Select
                          placeholder="Select"
                          style={{
                            width: "250px",
                            height: "34px",
                            border: "2px solid #f5a60b",
                            borderRadius: "10px"
                          }}
                          //name="call_status"
                          loading={gettingEquipmentMaster}
                          onChange={(e) => {
                            onChange(e);
                            setCheckListType(
                              (equi ?? [])?.find((outlet) => outlet.id === e)
                            );
                          }}
                          defaultValue={defaultValue?.equipment_name}
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
                            equi ? equi?.filter((e) => e.status == "1") : []
                          )}
                        </Select>
                      )}
                    />
                  
                    </>
                    </Form.Item>
                    </Col>
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={"Check ListType"}
                    style={{ width: "150px" }}
                    className={`custom-background ${show ? "show" : ""}`}
                  >
                    <Col>
                    <Form.Item name="check_list_type">                 
                     <Controller
                      control={control}
                      name="outlet_name"
                      render={({ field: { onChange } }) => (
                        <Input
                          onChange={onChange}
                        //  defaultValue={state?.outlet_name}
                          value={checklistType?.check_list_type}
                          disabled
                          style={{
                            width: "250px",
                            background: "#34b1aa",
                            color: "#ffffff"
                          }}
                        />
                      )}
                    />
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
                     <Controller
                      control={control}
                      name="time_lot"
                      render={({ field: { onChange } }) => (
                        <Input
                          onChange={onChange}                       
                          value={checklistType?.time_lot}
                          disabled
                          style={{
                            width: "250px",
                            background: "#34b1aa",
                            color: "#ffffff"
                          }}
                        />
                      )}
                    />
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
                     <Controller
                      control={control}
                      name="functional_type"
                      render={({ field: { onChange } }) => (
                        <Input
                          onChange={onChange}                       
                          value={checklistType?.functional_type}
                          disabled
                          style={{
                            width: "250px",
                            background: "#34b1aa",
                            color: "#ffffff"
                          }}
                        />
                      )}
                    />
                    </Form.Item>
                    </Col>
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={"Type"}
                    style={{ width: "150px" }}
                    className={`custom-background ${show ? "show" : ""}`}
                  >
                    <Col>
                      <Form.Item name="type">
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
                          onChange={(e) => setType(e)}
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
                            def ? def?.filter((e) => e.def_title == "Type" && e.status == 1) : []
                          )}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Descriptions.Item>

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
                    label={"State"}
                    style={{ width: "150px" }}
                    className={`custom-background ${show ? "show" : ""}`}
                  >
                    <Col>
                      <Form.Item name="state_id">
                        <Select
                          // disabled={!roleSelected.includes('State')}
                          mode="multiple"
                          placeholder="select"
                          showSearch
                          filterOption={(input, option) =>
                            option.children
                              .toString()
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {map(
                            (state) => {
                              return (
                                <Option key={state.id} value={state.id}>
                                  {state.name}
                                </Option>
                              );
                            },
                            states
                              ? states?.filter((e) => e.status === "1")
                              : []
                          )}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Descriptions.Item>
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
                          showSearch
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
                          //  onChange={(e) => setSubzone(e)}
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
                    <Col>
                      <Form.Item name="outlet_id">
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
                              value={selectedOutlets}
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
                      </Form.Item>
                    </Col>
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
                            isEdit ? "Update" : "Mapping"
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
