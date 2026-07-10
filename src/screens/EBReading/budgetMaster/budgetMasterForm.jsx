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
  TimePicker,
  Input,
  Typography
} from "antd";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { map } from "ramda";
import {
  getStates,
  getSubZonal,
  EmployeeZone
} from "../../../@app/master/masterSlice";
import {
  addBudgetMaster,
  updateBudgetMaster,
  getDefinitions
} from "../../../@app/subMaster/subMasterSlice";
import dayjs from "dayjs";
import { transStatus } from "../../../util/transStatus";
import { useLocation } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import messageToast from "../../../components/messageToast/messageToast";
import { getOutlet } from "../../../@app/subMaster/subMasterSlice";

const { Option } = Select;
function budgetMasterForm({ mode }) {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const format = "HH:mm";

  const [timeRange, setTimeRange] = useState([]);
  const [timeRangePeak, setTimeRangePeak] = useState(null);
  const [timeRangeClosed, setTimeRangeClosed] = useState([]);
  const [totalTime, setTotalTime] = useState({ hours: 0,minutes:0 });
  const [budgetArray, setBudgetArray] = useState([]);
 
  const [timeDifference, setTimeDifference] = useState({
    hours: 0,
    minutes: 0
  });
  const [timeDifferencePeak, setTimeDifferencePeak] = useState({
    hours: 0,
   minutes: 0
  });
  const [timeDifferenceClosed, setTimeDifferenceClosed] = useState({
    hours: 0,
    minutes: 0
  });

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

  const onDurationChange = (value) => {
    // Calculate time difference
    if (value.length === 2) {
      const startTime = value[0];
      const endTime = value[1];
      const diffInMinutes = endTime.diff(startTime);
      const hours = Math.floor(diffInMinutes / 60);
      //const minutes = diffInMinutes % 60;
      // Set time difference state
      setTimeDifference({ hours });
      // Update timeRange
      setTimeRange(value);
      // Automatically set the start time of timeRangePeak to the end time of timeRange
      const newStartTime = endTime;
      const newEndTime = timeRangePeak ? timeRangePeak[1] : null;
      setTimeRangePeak([newStartTime, newEndTime]);
    }
  };

  const onDurationChangePeak = (value) => {
    // Calculate time difference
    if (value.length === 2) {
      const startTime = value[0];
      const endTime = value[1];
      const diffInMinutes = endTime.diff(startTime, "minutes");
      const hours = Math.floor(diffInMinutes / 60);
      const minutes = diffInMinutes % 60;
      // Set time difference state
      setTimeDifferencePeak({ hours, minutes });
      // Update timeRangePeak
      setTimeRangePeak(value);
      const newStartTime = endTime;
      const newEndTime = timeRangeClosed ? timeDifferenceClosed[1] : null;
      setTimeRangeClosed([newStartTime, newEndTime]);
    }
  };

  const onDurationChangeClosed = (value) => {
    // Calculate time difference
    if (value.length === 2) {
      let originalStartTime = value[0];
      let originalEndTime = value[1];
      // Create variables for calculation, initially set to original values
      let startTime = originalStartTime;
      let endTime = originalEndTime;
      // Check if the end time is earlier than the start time
      if (endTime.isBefore(startTime)) {
        // Swap start and end times for calculation purposes
        [startTime, endTime] = [endTime, startTime];
      }
      const diffInMinutes = endTime.diff(startTime, "minutes");
      const hours = Math.floor(diffInMinutes / 60);
      const minutes = diffInMinutes % 60;
      // Set time difference state
      setTimeDifferenceClosed({ hours, minutes });
      // Update timeRangeClosed with original start and end times
      setTimeRangeClosed([originalStartTime, originalEndTime]);
    }
  };

  const onBudget = (e) => {
    const budgetValue = parseFloat(e.target.value) || 0;
    updateBudgetArray("lean", budgetValue);
  };

  const onBudgetPeak = (e) => {
    const budgetValue = parseFloat(e.target.value) || 0;
    updateBudgetArray("peak", budgetValue);
  };

  const onBudgetClosed = (e) => {
    const budgetValue = parseFloat(e.target.value) || 0;
    updateBudgetArray("closed", budgetValue);
  };

  const [totalLeanBudget, setTotalLeanBudget] = useState(0);
  const [totalPeakBudget, setTotalPeakBudget] = useState(0);
  const [totalClosedBudget, setTotalClosedBudget] = useState(0);
  // ... rest of your component code

  const totalBudget = totalLeanBudget + totalPeakBudget + totalClosedBudget;

  const updateBudgetArray = (budgetType, budgetValue) => {
    setBudgetArray((prevBudgetArray) => {
      const updatedArray = [
        ...prevBudgetArray,
        { type: budgetType, value: budgetValue }
      ];

      const sumLeanBudget = updatedArray
        .filter((item) => item.type === "lean")
        .reduce((acc, item) => acc + parseFloat(item.value), 0);

      const sumPeakBudget = updatedArray
        .filter((item) => item.type === "peak")
        .reduce((acc, item) => acc + parseFloat(item.value), 0);

      const sumClosedBudget = updatedArray
        .filter((item) => item.type === "closed")
        .reduce((acc, item) => acc + parseFloat(item.value), 0);

      setTotalLeanBudget(sumLeanBudget);
      setTotalPeakBudget(sumPeakBudget);
      setTotalClosedBudget(sumClosedBudget);

      return updatedArray;
    });
  };

  useEffect(() => {
    // Calculate time difference when the time range changes
    if (timeRange.length === 2) {
      const startTime = timeRange[0];
      const endTime = timeRange[1];
      // Calculate time difference in minutes
      const diffInMinutes = endTime.diff(startTime, "minutes");
      // Calculate hours and remaining minutes
      const hours = Math.floor(diffInMinutes / 60);
      const minutes = diffInMinutes % 60;
      // Update state with the calculated time difference
      setTimeDifference({ hours, minutes });
    }
  }, [timeRange]);

  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(true);
  }, []);

  useEffect(() => {
    // Extract hours and minutes from time differences
    const { hours: hoursClosed, minutes: minutesClosed } = timeDifferenceClosed;
    const { hours: hoursPeak, minutes: minutesPeak } = timeDifferencePeak;
    const { hours: hours, minutes: minutes } = timeDifference;
    // Calculate total time
    const totalHours = hoursClosed + hoursPeak + hours;
    const totalMinutes =
      minutesClosed + minutesPeak + minutes + totalHours * 60;
    // Update total time state
    setTotalTime({
      hours: Math.floor(totalMinutes / 60)
      // minutes: totalMinutes % 60,
    });
    // Calculate total budget
  }, [timeDifferenceClosed, timeDifferencePeak, timeDifference, budgetArray]);

  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [openingUnits, setOpeningUnits] = useState("");

  let newDateFrom;
  const onchangedateFrom = (e) => {
    newDateFrom = e.target.value;
    setDateFrom(newDateFrom);
  };

  let newDateTo;
  const onchangedateTo = (e) => {
    newDateTo = e.target.value;
    setDateTo(newDateTo);
  };

  let openingUnitsValue;
  const onOpeningUnits = (e) => {
    openingUnitsValue = e.target.value;
    setOpeningUnits(openingUnitsValue);
  }

  var changedate = new Date(); // today!

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

  useEffect(() => {
    dispatch(getOutlet());
  }, []);

  const {
    getOutletResponse: { data: outletMasterList }
  } = useSelector((state) => {
    return state.subMaster;
  });

  useEffect(() => {
    dispatch(getDefinitions());
  }, []);

  const [status, setStatus] = useState(defaultValue?.status ?? 1);

  const outletList = outletMasterList?.map((o) => ({
    ...o,
    outlet_code: `${o?.outlet_code} - ${o?.name}`
  }));

  const { savingEquipmentMaster } = useSelector((state) => {
    return state.subMaster;
  });

  const onFinish = (data) => {
    const outlet = selectedOutlets;
    const formattedTimes = timeRange.map((obj) => {
      const hours = obj["$H"].toString().padStart(2, "0");
      const minutes = obj["$m"].toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    });
    const formattedTimesPeak = timeRangePeak.map((obj) => {
      const hoursPeak = obj["$H"].toString().padStart(2, "0");
      const minutesPeak = obj["$m"].toString().padStart(2, "0");
      return `${hoursPeak}:${minutesPeak}`;
    });
    const formattedTimesClosed = timeRangeClosed.map((obj) => {
      const hoursClosed = obj["$H"].toString().padStart(2, "0");
      const minutesClosed = obj["$m"].toString().padStart(2, "0");
      return `${hoursClosed}:${minutesClosed}`;
    });
    // if (totalTime != 24) {
    //   messageApi.open({
    //     type: "warning",
    //     content: "Budget Total must be 24Hrs",
    //     className: "custom-class",
    //     style: {
    //       marginTop: "28vh",
    //       color: "#d91616",
    //       fontWeight: "bold"
    //     }
    //   });
    // } else {
      dispatch(
        defaultValue?.id
          ? updateBudgetMaster({
              data: {
                ...data,
                status: transStatus({ status }),
                // time: selectedTime,
                id: defaultValue.id
              }
            })
          : addBudgetMaster({
              data: {
                ...data,
                outlet_id: outlet,
                lean_time_start: formattedTimes[0],
                lean_time_end: formattedTimes[1],
                peak_time_start: formattedTimesPeak[0],
                peak_time_end: formattedTimesPeak[1],
                closed_time_start: formattedTimesClosed[0],
                closed_time_end: formattedTimesClosed[1],
                date_from: dateFrom,
                date_to: dateTo,
                opening_units :openingUnits,
                total_hrs: totalTime,
                lean_budget: totalLeanBudget,
                peak_budget: totalPeakBudget,
                closed_budget: totalClosedBudget,
                total_budget: totalBudget
              }
            })
      ).then(({ message, status, statusText }) => {
        if (status === 200) {
          messageToast({
            message: message ?? statusText,
            status,
            title: "Budget Master Status"
          });
          navigate("/budgetMaster");
          form.resetFields();
        }
        if (status == 400) {
          messageApi.open({
            type: "warning",
            content: "Budget Master already exists",
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
   // }
  };

  const handleClickBack = () => {
    navigate("/budgetMaster");
  };

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
                outlet_id: defaultValue?.outlet_id,
                lean_time:
                  defaultValue && dayjs(defaultValue?.lean_time, "HH:mm"),
                peak_time:
                  defaultValue && dayjs(defaultValue?.peak_time, "HH:mm"),
                closed_time:
                  defaultValue && dayjs(defaultValue?.closed_time, "HH:mm"),
                ...defaultValue
              }}
              autoComplete="off"
            >
              <Row gutter={[15, 0]}>
                <Descriptions bordered size="small">
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
                  <Descriptions.Item name="date_from" label="Date From"
                   className={`custom-background ${show ? "show" : ""}`}>
                    <Input
                      type="date"
                      selected={dateFrom}
                      name="date_from"
                      style={{ width: "250px" }}
                      placeholder="DOB"
                      min={changedate}
                      onChange={onchangedateFrom}
                    />
                  </Descriptions.Item>
                  <Descriptions.Item name="date_to" label="Date To"
                   className={`custom-background ${show ? "show" : ""}`}>
                    <Input
                      type="date"
                      selected={dateTo}
                      name="date_to"
                      style={{ width: "250px" }}
                      placeholder="DOB"
                      //max={currentdate >= fifthday ? currentdate : previous}
                      min={changedate}
                      onChange={onchangedateTo}
                    />
                  </Descriptions.Item>
                  <Descriptions.Item name="opening_units" label="Opening Units"
                   className={`custom-background ${show ? "show" : ""}`}>
                    <Input
                      type="text"                      
                      name="opening_units"
                      style={{ width: "250px" }}
                      placeholder="opening_units"                    
                      onChange={onOpeningUnits}
                    />
                  </Descriptions.Item>
                </Descriptions>
              </Row>
              <Row ><Descriptions></Descriptions></Row>
              <Row>
                <Descriptions bordered size="small">
                  <Typography>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;From
                    &nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    --
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;To
                  </Typography>
                  <Typography>Hours</Typography>
                  <Typography>Unit Budget</Typography>
                  <Form.Item name="lean_time" label="Lean Hrs">
                    <TimePicker.RangePicker
                      style={{ backgroundColor: "#a0b8de" }}
                      placeholder="Select Time Range"
                      defaultValue={state?.lean_time}
                      value={timeRange}
                      onChange={onDurationChange}
                      format={format}
                      name="lean_time"
                    />
                  </Form.Item>
                  <Descriptions.Item>
                    <Input
                      style={{ width: "70px", backgroundColor: "#a0b8de" }}
                      value={`${timeDifference.hours}`}
                    />
                  </Descriptions.Item>
                  <Descriptions.Item>
                    <Input
                      name="budget"
                      onBlur={onBudget}
                      style={{ width: "70px", backgroundColor: "#a0b8de" }}
                    />
                  </Descriptions.Item>

                  <Form.Item label="Peak Hrs" name="peak_time">
                    <TimePicker.RangePicker
                      style={{ backgroundColor: "#97f0c5" }}
                      placeholder="Select Time Range"
                      defaultValue={defaultValue?.peak_time}
                      value={timeRangePeak}
                      onChange={onDurationChangePeak}
                      format={format}
                      name="peak_time"
                    />
                  </Form.Item>

                  <Descriptions.Item>
                    <Input
                      style={{ width: "70px", backgroundColor: "#97f0c5" }}
                      value={`${timeDifferencePeak.hours}`}
                    />
                  </Descriptions.Item>
                  <Descriptions.Item>
                    <Input
                      name="budgetPeak"
                      onBlur={onBudgetPeak}
                      style={{ width: "70px", backgroundColor: "#97f0c5" }}
                    />
                  </Descriptions.Item>

                  <Form.Item label="Closed Hrs" name="closed_time">
                    <TimePicker.RangePicker
                      placeholder="Select Time Range"
                      style={{ backgroundColor: "#f0d3a8" }}
                      defaultValue={defaultValue?.closed_time}
                      value={timeRangeClosed}
                      onChange={onDurationChangeClosed}
                      format={format}
                      name="closed_time"
                    />
                  </Form.Item>
                  <Descriptions.Item>
                    <Input
                      style={{ width: "70px", backgroundColor: "#f0d3a8" }}
                      value={`${timeDifferenceClosed.hours}`}
                    />
                  </Descriptions.Item>
                  <Descriptions.Item>
                    <Input
                      name="budgetClosed"
                      onBlur={onBudgetClosed}
                      style={{ width: "70px", backgroundColor: "#f0d3a8" }}
                    />
                  </Descriptions.Item>
                  <Typography>Total Hrs & Total Budget</Typography>
                  <Typography>
                    <Input
                      style={{ width: "70px" }}
                      value={`${totalTime.hours}`}
                    />
                  </Typography>
                  <Typography>
                    <Input
                      style={{ width: "70px" }}
                      name="budgetTotal"
                      value={`${totalBudget}`}
                    />
                  </Typography>
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
                      // className="d-flex align-items-center justify-content-end mt-3"
                    >
                      <Form.Item>
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
                          }const
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

export default budgetMasterForm;
