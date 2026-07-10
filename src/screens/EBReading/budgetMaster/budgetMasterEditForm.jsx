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
  updateBudgetMaster,
  getDefinitions
} from "../../../@app/subMaster/subMasterSlice";
import dayjs from "dayjs";
import { transStatus } from "../../../util/transStatus";
import { useLocation } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import messageToast from "../../../components/messageToast/messageToast";
import { getOutlet } from "../../../@app/subMaster/subMasterSlice";
import moment from "moment";

const { Option } = Select;
function budgetMasterEditForm({ mode }) {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { state } = useLocation();

  const dispatch = useDispatch();
  const format = "HH:mm";
  const [loading, setLoading] = useState(false);
  const [timeRange, setTimeRange] = useState([]);
  const [timeRangePeak, setTimeRangePeak] = useState([]);
  const [timeRangeClosed, setTimeRangeClosed] = useState([]);
  const [totalTime, setTotalTime] = useState({ hours: 0, minutes: 0 });
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

  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  var changedate = new Date();
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

  const onDurationChange = (value) => {
    // Calculate time difference
    if (value.length === 2) {
      const startTime = value[0];
      const endTime = value[1];
      const diffInMinutes = endTime.diff(startTime, "minutes");
      const hours = Math.floor(diffInMinutes / 60);
      const minutes = diffInMinutes % 60;
      // Set time difference state
      setTimeDifference({ hours, minutes });
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

  const [openingUnits, setOpeningUnits] = useState("");

  let openingUnitsValue;
  const onOpeningUnits = (e) => {
    openingUnitsValue = e.target.value;
    setOpeningUnits(openingUnitsValue);
  }


  const [totalLeanBudget, setTotalLeanBudget] = useState(0);
  const [totalPeakBudget, setTotalPeakBudget] = useState(0);
  const [totalClosedBudget, setTotalClosedBudget] = useState(0);

  const totalBudgetUpdate =
    totalLeanBudget + totalPeakBudget + totalClosedBudget;

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
    if (state?.lean_time) {
      const parsedTimeRange = JSON.parse(state.lean_time).map((time) =>
        moment(time, format)
      );
      setTimeRange(parsedTimeRange);
    }
  }, [state, format]);

  useEffect(() => {
    if (state?.peak_time) {
      const parsedTimePeakRange = JSON.parse(state.peak_time).map((time) =>
        moment(time, format)
      );
      setTimeRangePeak(parsedTimePeakRange);
    }
  }, [state, format]);

  useEffect(() => {
    if (state?.closed_time) {
      const parsedTimeClosedRange = JSON.parse(state.closed_time).map((time) =>
        moment(time, format)
      );
      setTimeRangeClosed(parsedTimeClosedRange);
    }
  }, [state, format]);

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

  const [selectedOutlets, setselectedOutlets] = useState([]);

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

  const onFinish = () => {
    const outlet = selectedOutlets.id;      
    const formattedTimes =timeRange ? timeRange.map((obj) => {
      const hours = obj["$H"].toString().padStart(2, "0");
      const minutes = obj["$m"].toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    }) : (null);  
    const formattedTimesPeak =timeRangePeak ? timeRangePeak.map((obj) => {
      const hoursPeak = obj["$H"].toString().padStart(2, "0");
      const minutesPeak = obj["$m"].toString().padStart(2, "0");
      return `${hoursPeak}:${minutesPeak}`;
    }): (null);  
    const formattedTimesClosed = timeRangeClosed ? timeRangeClosed.map((obj) => {
      const hoursClosed = obj["$H"].toString().padStart(2, "0");
      const minutesClosed = obj["$m"].toString().padStart(2, "0");
      return `${hoursClosed}:${minutesClosed}`;
    }): (null);  
    setLoading(false);
    dispatch(
      updateBudgetMaster({
        data: {
          id: defaultValue.id,
          outlet_id: outlet ? outlet : state?.outlet_id,       
          lean_time_start: formattedTimes[0] === '' ? state?.lean_time_start : formattedTimes[0],
          lean_time_end: formattedTimes[1] === '' ? state?.lean_time_end : formattedTimes[1],
          peak_time_start: formattedTimesPeak[0] === '' ? state?.peak_time_start : formattedTimesPeak[0],
          peak_time_end: formattedTimesPeak[1] === '' ? state?.peak_time_end : formattedTimesPeak[1],
          closed_time_start:formattedTimesClosed[0] === '' ? state?.closed_time_start : formattedTimesClosed[0],
          closed_time_end: formattedTimesClosed[1] === '' ? state?.closed_time_end : formattedTimesClosed[1],
          date_from: dateFrom === '' ? state?.date_from : dateFrom,
          date_to: dateTo === '' ? state?.date_to : dateTo,
          opening_units : openingUnits ? openingUnits : state?.opening_units,
          total_hrs: totalTime === '' ? state?.total_hrs : totalTime,
          lean_budget: totalLeanBudget === 0 ? state?.lean_budget : totalLeanBudget,
          peak_budget:  totalPeakBudget === 0 ? state?.peak_budget : totalPeakBudget,
          closed_budget: totalClosedBudget === 0 ? state?.closed_budget : totalClosedBudget,
          total_budget:  totalBudgetUpdate === 0 ? state?.total_budget : totalBudgetUpdate,
          status: transStatus({ status })
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
                <Col>
                  <Form.Item name="outlet_id" label="Outlet Code">
                    <Controller
                      control={control}
                      name="outlet_id"
                      render={({ field: { onChange } }) => (
                        <Select
                          {...register("outlet_id", {
                            required: mode === "add"
                          })}
                          disabled={mode === "edit"}
                          style={{ width: "280px" }}
                          defaultValue={state.outlet_name}
                          placeholder="Select"
                          showSearch
                          onChange={(e) => {
                            onChange(e);
                            setselectedOutlets(
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
                                    if (fid !== -1) return true;
                                    else return false;
                                  } else return true;
                                })
                              : []
                          )}
                        </Select>
                      )}
                    />
                    {errors?.outlet_id && (
                      <p style={{ color: "red" }}>Please select Outlet</p>
                    )}
                  </Form.Item>
                </Col>
                {errors?.outlet_id && (
                  <p style={{ color: "red" }}>Please select Outlet</p>
                )}
                <Form.Item name="date_from" label="Date From">
                  {/* <Descriptions.Item name='date_from' label = 'Date From'>  */}
                  <Input
                    type="date"
                    // selected={dateFrom}
                    defaultValue={state?.date_from}
                    name="date_from"
                    style={{
                      width: "250px",
                      height: "34px",
                      border: "2px solid #f5a60b",
                      borderRadius: "10px"
                    }}
                    placeholder="DOB"
                    min={changedate}
                    onChange={onchangedateFrom}
                  />
                  {/* </Descriptions.Item> */}
                </Form.Item>
                <Form.Item name="date_to" label="Date From">
                  {/* <Descriptions.Item name='date_to' label = 'Date To'>  */}
                  <Input
                    type="date"
                    // selected={dateTo}
                    name="date_to"
                    defaultValue={state?.date_to}
                    style={{
                      width: "250px",
                      height: "34px",
                      border: "2px solid #f5a60b",
                      borderRadius: "10px"
                    }}                    
                    min={changedate}
                    onChange={onchangedateTo}
                  />                
                </Form.Item>
                <Form.Item name="opening_units" label="Opening Units">              
                    <Input
                      type="text"                      
                      name="opening_units"
                      style={{
                        width: "250px",
                        height: "34px",
                        border: "2px solid #f5a60b",
                        borderRadius: "10px"
                      }}
                      defaultValue={state?.opening_units}
                      placeholder="opening_units"                    
                      onChange={onOpeningUnits}
                    />
                 </Form.Item>
              </Row>
              <Row>
                <Descriptions bordered size="small">
                  <Typography>Time 
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  From
                    &nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    --
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;To
                  </Typography>
                  <Typography>Hours</Typography>
                  <Typography>Unit Budget</Typography>

                  <Form.Item name="lean_time" label="Lean Hrs">
                    <Input
                      style={{ width: "70px", backgroundColor: "#573F6F", color:"#ffffff", fontWeight:"bold" }}
                      name="lean_time_start"
                      readOnly
                      defaultValue={defaultValue.lean_time_start}
                    />
                    <Input
                      style={{ width: "40px", backgroundColor: "#573F6F", color:"#ffffff", fontWeight:"bold" }}
                      value={"to"}
                    />
                    <Input
                      style={{ width: "70px", backgroundColor: "#573F6F", color:"#ffffff", fontWeight:"bold" }}
                      name="lean_time_end"
                      readOnly
                      defaultValue={defaultValue.lean_time_end}
                    />
                    <TimePicker.RangePicker
                      style={{ backgroundColor: "#a0b8de" }}
                      placeholder="Select Time Range"
                    //  defaultValue={timeRange}
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
                      //onBlur={onBudget}
                      defaultValue={state?.lean_budget}
                      style={{ width: "70px", backgroundColor: "#573F6F", color:"#ffffff", fontWeight:"bold" }}
                      readOnly
                    />
                    <Input
                      name="budgetUpdate"
                      onBlur={onBudget}
                      //defaultValue = {state?.lean_budget}
                      style={{ width: "70px", backgroundColor: "#a0b8de" }}
                    />
                  </Descriptions.Item>
                  <Form.Item label="Peak Hrs" name="peak_time">
                    <Input
                      readOnly
                      style={{ width: "70px", backgroundColor: "#573F6F", color:"#ffffff", fontWeight:"bold" }}
                      name="peak_time_start"
                      defaultValue={defaultValue.peak_time_start}
                    />
                    <Input
                      style={{ width: "40px", backgroundColor: "#573F6F", color:"#ffffff", fontWeight:"bold" }}
                      value={"to"}
                    />
                    <Input
                      style={{ width: "70px", backgroundColor: "#573F6F", color:"#ffffff", fontWeight:"bold" }}
                      name="peak_time_end"
                      readOnly
                      defaultValue={defaultValue.peak_time_end}
                    />
                    <TimePicker.RangePicker
                      style={{ backgroundColor: "#97f0c5" }}
                      placeholder="Select Time Range"
                     // defaultValue={timeRangePeak}
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
                      readOnly
                      defaultValue={state?.peak_budget}
                      style={{ width: "70px", backgroundColor: "#573F6F", color:"#ffffff", fontWeight:"bold" }}
                    />
                    <Input
                      name="budgetPeakUpdate"
                      onBlur={onBudgetPeak}
                      style={{ width: "70px", backgroundColor: "#97f0c5" }}
                    />
                  </Descriptions.Item>

                  <Form.Item label="Closed Hrs" name="closed_time">
                    <Input
                      style={{ width: "70px", backgroundColor: "#573F6F", color:"#ffffff", fontWeight:"bold" }}
                      name="closed_time_start"
                      readOnly
                      defaultValue={defaultValue.closed_time_start}
                    />
                    <Input
                      style={{ width: "40px", backgroundColor: "#573F6F", color:"#ffffff", fontWeight:"bold" }}
                      value={"to"}
                    />
                    <Input
                      style={{ width: "70px", backgroundColor: "#573F6F", color:"#ffffff", fontWeight:"bold" }}
                      name="closed_time_end"
                      readOnly
                      defaultValue={defaultValue.closed_time_end}
                    />
                    <TimePicker.RangePicker
                      placeholder="Select Time Range"
                      style={{ backgroundColor: "#f0d3a8" }}
                     // defaultValue={timeRangeClosed}
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
                      defaultValue={state?.closed_budget}
                      // onBlur={onBudgetClosed}
                      readOnly
                      style={{ width: "70px", backgroundColor: "#573F6F", color:"#ffffff", fontWeight:"bold" }}
                    />
                    <Input
                      name="budgetClosedUpdate"
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
                      defaultValue={state?.total_budget}
                      // value={`${totalBudget}`}
                    />
                    <Input
                      style={{ width: "70px" }}
                      name="budgetTotalUpdate"
                      value={`${totalBudgetUpdate}`}
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
                          loading={loading}
                        >
                          {
                            isEdit ? "Mapping" : "Update"
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

export default budgetMasterEditForm;
