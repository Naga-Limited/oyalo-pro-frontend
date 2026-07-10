/* eslint-disable no-unused-labels */
import React, { useEffect, useState } from "react";
import {
  Input,
  Card,
  Button,
  Col,
  Row,
  Form,
  Select,
  Typography,
  Descriptions,
  TimePicker,
  Rate,
  //Spin
} from "antd";
//import PageLoading from '@antdp/page-loading';
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { map } from "ramda";
import { getOutletMasternotsubzone } from "../../../@app/master/masterSlice";
import { useNavigate, useLocation } from "react-router";
import ConfirmOnExit from "../../../components/confirmOnExit/ConfirmOnExit";
import {getCallStatus} from '../../../@app/subMaster/subMasterSlice';

const { Option } = Select;
function CustomerMasterForm() {
  const dispatch = useDispatch();
  
  const navigate = useNavigate();
  const { state } = useLocation();
  const {
    state: {data: defaultValue}
  } = useLocation();

 const { TextArea } = Input;
 // const [selectedOutlet, setSelectedOutlet] = useState(false);

  // const loginType = useSelector((state) => state.auth.type);
  // const emp_map = useSelector(
  //   (state) =>
  //     state.auth.userData.data && state.auth.userData.data.employee_mapping
  // );
  const { savingAuditNewEntry } = useSelector((state) => {
    return state.master;
  });
  const current = new Date();
  const year = current.getFullYear();
  const month = String(current.getMonth() + 1).padStart(2, "0");
  const day = String(current.getDate()).padStart(2, "0");
  const currentdate = [year, month, day].join("-");
  const [date, setDate] = useState(currentdate);

  var changedate = new Date(); // today!

  var x = 5; // go back 5 days!
  var fifthday = [year, month, "05"].join("-"); //To Restrict Date before 5th of everymonth

  changedate.setDate(changedate.getDate() - x);

  const cyear = changedate.getFullYear();

  const cmonth = String(changedate.getMonth() + 1).padStart(2, "0");

  const cday = String(changedate.getDate()).padStart(2, "0");

  const previous = [cyear, cmonth, cday].join("-");

  const userData = useSelector((state) => state.auth);


  useEffect(() => {
    dispatch(getCallStatus());
  }, []);


  const {
    gettingCallStatus,
    getCallStatusResponse: {data}
  } = useSelector((state) => {
    return state.subMaster;
  });

  const {
    control
  } = useForm();

  useEffect(() => {
    dispatch(getOutletMasternotsubzone());
  }, [dispatch]);

  const handleClickBack = () => {
    navigate("/CallEntry");
  };


  const [time, setTime] = useState(0);
  //const [intervalId, setIntervalId] = useState(null);
  const [pageLoadTime, setPageLoadTime] = useState(Date.now());
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isActive) {
        setTime(Date.now() - pageLoadTime);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isActive, pageLoadTime]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsActive(!document.hidden);
      if (!document.hidden) {
        setPageLoadTime(Date.now() - time);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [time]);


  const onchangedate = (e) => {
    const newDate = e.target.value;
    setDate(newDate);
  };
  return (
    <>
      <Card>
        {/* <PageLoading /> */}
         {/* <Spin size="large" />  */}
        <ConfirmOnExit />
        <Row style={{ justifyContent: "center" }}>
          <Col span={24}>
            <Form
              name="basic"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              initialValues={{ remember: true }}
              autoComplete="off"
            >
              <Row gutter={[15, 0]}>
              
              </Row>
              <Row>
                <Descriptions bordered size="small">
                <Descriptions.Item label={"Call Make By"}>
                {userData.type == 2 ? (
                      <Typography>
                        <Card
                          style={{
                            fontWeight: "bold",
                            width: "250px",
                            height: "40px",
                            background: "#34b1aa",
                            color: "#ffffff"
                          }}
                        >
                          {userData.userData.data?.name}
                        </Card>
                      </Typography>
                    ) : (
                      <Typography>
                        <Card
                          style={{
                            fontWeight: "bold",
                            width: "250px",
                            height: "40px",
                            background: "#34b1aa",
                            color: "#ffffff"
                          }}
                        >
                          Admin
                        </Card>
                      </Typography>
                    )}
                     </Descriptions.Item>
                     <Descriptions.Item label={"Date of Calling"}>
                     <Input
                      type="date"
                      selected={date}
                      name="audit_date"
                      placeholder="Add Add From date"
                      defaultValue={currentdate}
                      max={currentdate >= fifthday ? currentdate : previous}
                      min={changedate}
                      onChange={onchangedate}
                      value={date}
                      //format={dateFormat}
                    />

                  </Descriptions.Item>

                 <Descriptions.Item label={"Outlet Name"}>
                  <Input
                         // onChange={onChange}
                          placeholder="Outlet"
                          value={state.branchCode +' - '+state.branchName}
                          
                          readOnly
                          style={{ width: "250px" }}
                        />
                
                  </Descriptions.Item>
                  <Descriptions.Item label={"Zone"} style={{ width: "150px" }}>
                    <Controller
                      control={control}
                      name="zone_id"
                      render={({ field: { onChange } }) => (
                        <Input
                          onChange={onChange}
                          placeholder="Zone"
                          //value={selectedOutlet?.zone_name}
                          readOnly
                          style={{ width: "250px" }}
                        />
                      )}
                    />
                  </Descriptions.Item>
                  <Descriptions.Item label={"SubZone"} style={{ width: "150px" }}>
                    <Controller
                      control={control}
                      name="subzone_id"
                      ORL Name     render={({ field: { onChange } }) => (
                        <Input
                          onChange={onChange}
                          placeholder="SubZone"
                       //   value={selectedOutlet?.subzone_name}
                          readOnly
                          style={{ width: "250px" }}
                        />
                      )}
                    />
                  </Descriptions.Item>
                  <Descriptions.Item label={"ORL Name"} style={{ width: "150px" }}>
                    <Controller
                      control={control}
                      name="orl_name"
                      render={({ field: { onChange } }) => (
                        <Input
                          onChange={onChange}
                          placeholder="ORL Name"
                         // value={selectedOutlet?.orl_name}
                          readOnly
                          style={{ width: "100%" }}
                        />
                      )}
                    />
                  </Descriptions.Item>
                  <Descriptions.Item label={"Select Customer"} style={{ width: "150px" }}>
                  <Input
                         // onChange={onChange}
                          placeholder="Customer Name"
                        //  value={state?.customerName} - {state?.customerId}
                          value={state.customerName +' - '+state.customerId}
                          readOnly
                          style={{ width: "250px" }}
                        />
                

                  </Descriptions.Item>
                  <Descriptions.Item label={"Phone No"} style={{ width: "150px",height:"30px" }}>               
                    <Input placeholder='Enter Contact Number' onKeyPress={(e) => {
                              if (!/[0-9]/.test(e.key)) {
                                e.preventDefault();                               
                              }
                              // else if(/^[5-9][0-9]{9}$/g.test(e.key))
                              // {
                              //   message: 'Invalid Phone Number'
                              // }
                  }}/>
                  {/* </Form.Item> */}
                  </Descriptions.Item>
                  <Descriptions.Item label={"Customer Status"} style={{ width: "150px" }}>
                  <Select
                      placeholder='Select'
                      style={{ width: "250px",height:"30px" }}
                      //disabled={savingZonal}
                      loading={gettingCallStatus}
                      defaultValue={defaultValue?.state_id}
                      showSearch
                      filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                      {map(
                        (state) => {
                          return (
                            <Option key={state.id} value={state.id}>
                              {state.name}
                            </Option>
                          );
                        },
                        data ? data?.filter((e) => e.status === '1') : []
                      )}
                    </Select>
                  </Descriptions.Item>

                  <Descriptions.Item label={"Billing Date"} style={{ width: "150px" }}>                 
                        <Input
                          //onChange={onChange}
                          placeholder="Billing Date"
                          value={state?.invoiceDate}
                          readOnly
                          style={{ width: "250px" }}
                        />                  
                  </Descriptions.Item>

                  <Descriptions.Item label={"Call Status"} style={{ width: "150px" }}>
                    <Controller
                      control={control}
                      name="call_status"
                      render={({ field: { onChange } }) => (
                        <Input
                          onChange={onChange}
                          placeholder="Call Status"
                          //value={selectedOutlet?.zone_name}
                          readOnly
                          style={{ width: "250px" }}
                        />
                      )}
                    />
                  </Descriptions.Item>

                  <Descriptions.Item label={"DOB"} style={{ width: "150px" }}>
                  <Input
                      type="date"
                      selected={date}
                      name="dob_date"
                      placeholder="DOB"
                      //defaultValue={currentdate}
                      max={currentdate >= fifthday ? currentdate : previous}
                      min={changedate}
                      onChange={onchangedate}
                      //value={date}
                      //format={dateFormat}
                    />
                  </Descriptions.Item>
                  <Descriptions.Item label={"Anniversary"} style={{ width: "150px" }}>
                  <Input
                      type="date"
                      selected={date}
                      name="anniversay_date"
                      placeholder="Anniversary date"
                      //defaultValue={currentdate}
                      max={currentdate >= fifthday ? currentdate : previous}
                      min={changedate}
                     // onChange={onchangedate}
                     // value={date}
                      //format={dateFormat}
                    />
                  </Descriptions.Item>
                  <Descriptions.Item label={"Rating"} style={{ width: "150px" }}>
                  <Rate allowHalf defaultValue={2.5} />
                  </Descriptions.Item>
                  <Descriptions.Item label={"Call Duration"} style={{ width: "150px" }}>
                  <TimePicker placeholder='Call Duration' style={{width: '170px'}} name='call_duration' />
                  </Descriptions.Item>
                  <Descriptions.Item label={"Remarks"} style={{ width: "150px" }}>
                  <TextArea rows={4} placeholder="" />
                  </Descriptions.Item>
                  <Descriptions.Item label={"Feedback"} style={{ width: "150px" }}>
                 
                  </Descriptions.Item>
                </Descriptions>
              </Row>

              <div
                className="d-flex justify-content-end align-items-center "
                style={{ width: "96%", padding: "15px" }}
              >
                <Col span={24}>
                  <Row gutter={[15, 15]} style={{ justifyContent: "center" }}>
                    <Col span={5}>
                      <Form.Item>
                        <Button
                          disabled={savingAuditNewEntry}
                          onClick={handleClickBack}
                          style={{ backgroundColor: "#f5a60b", color: "white" }}
                          type="info"
                          htmlType="button"
                        >
                          Back
                        </Button>
                      </Form.Item>
                    </Col>
                    <Col span={12} style={{ textAlign: "right" }}>
                      <Form.Item
                        wrapperCol={{ offset: 8, span: 16, padding: "15px" }}
                      >
                        <Button
                          style={{ backgroundColor: "#34b1aa" }}
                          type="primary"
                        >
                          {"Add"}
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
              </div>
            </Form>
          </Col>
        </Row>
        <Row gutter={[15, 15]} style={{ justifyContent: "çenter" }}>
          <Col span={12} style={{ textAlign: "right" }}></Col>
        </Row>
      </Card>
    </>
  );
}

export default CustomerMasterForm;
