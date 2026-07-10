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
  Modal
} from "antd";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { map } from "ramda";
import { getOutletMasternotsubzone } from "../../../@app/master/masterSlice";
import { useNavigate, useLocation } from "react-router";
import CustomTable from "../../../components/CustomTableHistory";
import { column } from "./columnhistory";
import { columnSale } from "./columnSale";
import {
 updateCallBackEntry,
  getDefinitionsList,
  getCalldefStatus,
  getAllSalesCustomer
} from "../../../@app/subMaster/subMasterSlice";
import messageToast from "../../../components/messageToast/messageToast";

const { Option } = Select;
function CallEntryEditForm() {
  const dispatch = useDispatch();
  const format = "HH:mm:ss";
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { state } = useLocation();
  const {
    state: { data: defaultValue }
  } = useLocation();
  const current = new Date();
  const year = current.getFullYear();
  const month = String(current.getMonth() + 1).padStart(2, "0");
  const day = String(current.getDate()).padStart(2, "0");
  const currentdate = [year, month, day].join("-");
  const [date, setDate] = useState(currentdate);
  const [dateDOB, setDateDOB] = useState("");
  const [dateAnniversary, setDateAnniversary] = useState("");
  const [loading, setLoading] = useState(false);
  var changedate = new Date(); // today!

  var x = 5; // go back 5 days!
  var fifthday = [year, month, "05"].join("-"); //To Restrict Date before 5th of everymonth

  changedate.setDate(changedate.getDate() - x);
  const cyear = changedate.getFullYear();
  const cmonth = String(changedate.getMonth() + 1).padStart(2, "0");
  const cday = String(changedate.getDate()).padStart(2, "0");
  const previous = [cyear, cmonth, cday].join("-");

  useEffect(() => {
    dispatch(getDefinitionsList());
  }, []);

  useEffect(()=> {
    dispatch(getCalldefStatus());
  },[]);

  const { type, userData } = useSelector((state) => state.auth);

  const empId = userData.data?.id;
 
  const {
    gettingDefinitionsList,
    getDefinitionsListResponse: { data: def }
  } = useSelector((state) => {
    return state.subMaster;
  });

   
  const {
    gettingCalldefStatus,
    getCalldefStatusResponse: { data: call }
  } = useSelector((state) => {
    return state.subMaster;
  });

  // const {
  //   gettingCallStatus,
  //   getCallStatusResponse: { data }
  // } = useSelector((state) => {
  //   return state.subMaster;
  // });  

  const {
    gettingCallBackEntry,
    getCallBackEntryResponse: { data : CallHistory }
  } = useSelector((state) => {
    return state.subMaster;
  });

  const [viewStatusModal, setViewStatusModal] = useState([CallHistory]);

  const {
    getAllSalesCustomerResponse: { data: dataSource },
    gettingAllSalesCustomer
  } = useSelector((state) => {
    return state.subMaster;
  });

  const { handleSubmit, control } = useForm();

  useEffect(() => {
    dispatch(getOutletMasternotsubzone());
  }, [dispatch]);

  const handleClickBack = () => {
    navigate("/CallEntry");
  };

  const [selectedTime, setSelectedTime] = useState('');
  const onDurationChange = (e) => {   
    setSelectedTime(e);
  };

 // const format = 'HH:mm:ss'; // Define your desired time format
  const onFinish = (data) => {
    // setShowDialog(false);
    setLoading(false);
    dispatch(      
        //?
         updateCallBackEntry({
            data: {            
              id: defaultValue.id,
              call_make_by: userData.data?.id ?? "0",
              date_of_calling: currentdate,
              outlet_id: state?.outlet_id,
              zone_id: state?.zone_id,
              subzone_id: state?.subzone_id,
              orl_emp_id: state?.emp_id,
              customer_name: formattedName,
              customer_code: state?.customer_code,
              phone_number: state?.phone_number,
              billing_value: state?.invoice_value,
              invoice_number:state?.invoice_number,
              billing_date: state?.invoice_date,
              call_status: callStatus?.id ?? state?.call_status_id ,
              call_status_def_title_id:callStatus?.def_title_id ?? state?.def_title_id,
              dob: dateDOB,
              anniversary: dateAnniversary,
              rating: state?.rating ?? rating ,
              service_rating:state?.service_rating ?? servicerating,
              product_rating : state?.product_rating ?? productrating,
              price_rating : state?.price_rating ?? pricerating ,
              duration_of_call: selectedTime,
              remarks: remarksone ?? state?.remarks ,
              feedback: feedback ?? state?.feedback_id,
              status: data?.status
            }
          })
      ).then(({ message, status, statusText }) => {
      if (status === 200) {
        setLoading(true);
        messageToast({
          message: message ?? statusText,
          status,
          title: "Call Entry Edit Status"
        });    
        navigate("/editcallBackEntry");
        form.resetFields();
      }
      else{
      messageToast({
        message: message ?? statusText,
        status,
        title: "Call Entry Made Status"
      });  }  
    });
  };

  const [time, setTime] = useState(0);
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

  let newDate;
  const onchangedate = (e) => {
    newDate = e.target.value;
    setDate(newDate);
  };

  let newDateDob;
  const onchangedateDOB = (e) => {
    newDateDob = e.target.value;
    setDateDOB(newDateDob);
  };



  let newDateAnniversary;
  const onchangedateAnniversary = (e) => {
    newDateAnniversary = e.target.value;
    setDateAnniversary(newDateAnniversary);
  };

  const [callStatus, setCallStatus] = useState();
  const [feedback,setFeedback] = useState();
  const [rating, setRating] = useState([]);
  const [servicerating, setServiceRating] = useState([]);
  const [productrating, setProductRating] = useState([]);
  const [pricerating, setPriceRating] = useState([]);
  const [remarksone, setRemarks] = useState("");

  const onremarks = (e) => {
    setRemarks(e.target.value);
    return remarksone;
  };

  

  const [inputValue, setInputValue] = useState("Rs");
  const [inputValueNew, setInputValueNew] = useState("/-");

  const handleChange = (event) => {
    setInputValue(event.target.value);
    setInputValueNew(event.target.value);
  };

  let customerName = state.customer_name;
  if (customerName.endsWith("null")) {
    customerName = customerName.slice(0, -4);
  }
  const formattedValue =
    customerName.charAt(0).toUpperCase() +
    customerName.slice(1).toLowerCase() +
    " - " +
    state.customer_code;
  const formattedName =
    customerName.charAt(0).toUpperCase() + customerName.slice(1).toLowerCase();
    const [show, setShow] = useState(false);

    useEffect(() => {
      setShow(true);
    }, []);


  useEffect(() => {
    if (type === 1)
      dispatch(getAllSalesCustomer({ path: "get-all-sales-customer", data: { customer_code: state?.customer_code}}));
    else
      dispatch(
        getAllSalesCustomer({
          path: "get-all-sales-customer",
          data: { employee: empId, customer_code: state?.customer_code }
        })
      );
  }, []);  
 
  return (
    <>
      <Card>
        <Row style={{ justifyContent: "center" }}>
          <Col span={24}>
            <Form
              name="basic"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              initialValues={{
                zone_id: defaultValue?.zone_id,
                calling_date: defaultValue?.calling_date,
                outlet_name: defaultValue?.outlet_name,
                subzone_id: defaultValue?.subzone_id,
                customer_name: defaultValue?.customer_name,
                invoice_value: defaultValue?.invoice_value,
                phone_number: defaultValue?.phone_number,
                call_status: defaultValue?.call_status,
                dob: defaultValue?.dob_date,
                duration_of_call:defaultValue?.call_duration,
                feedback: defaultValue?.definition_list,
                remarks: defaultValue?.remarks,
                remember: true
              }}
              autoComplete="off"
            >
              {/* <Row gutter={[15, 0]}></Row> */}
              <Row>
                <Descriptions bordered size="small">
                  <Descriptions.Item label={"Call Make By"}  className={`custom-background ${show ? 'show' : ''}`}>                 
                    {type == 2 ? (
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
                         {userData.data?.name}            
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
                  <Descriptions.Item label={"Date of Calling"}  className={`custom-background ${show ? 'show' : ''}`}>
                    <Input
                      type="date"
                      style={{width: "250px",background:'#cdd4cf',color:'#000000' }}
                      selected={date}
                      name="calling_date"
                      placeholder="Select date"
                      defaultValue={currentdate}
                      max={currentdate >= fifthday ? currentdate : previous}
                      min={changedate}
                      onChange={onchangedate}
                      value={date}
                      //format={dateFormat}
                    />
                  </Descriptions.Item>
                  <Descriptions.Item label={"Outlet Name"} className={`custom-background ${show ? 'show' : ''}`}>
                    <Input
                      name="outlet_name"
                      placeholder="Outlet Name"
                      defaultValue={state.outlet_name}
                      readOnly
                      style={{width: "250px",background:'#cdd4cf',color:'#000000' }}
                    />
                  </Descriptions.Item>
                  <Descriptions.Item label={"Zone"} 
                   className={`custom-background ${show ? 'show' : ''}`}
                   style={{ width: "150px" }}>
                    <Controller
                      control={control}
                      name="zone_id"
                      render={({ field: { onChange } }) => (
                        <Input
                          onChange={onChange}
                          placeholder="Zone"
                          name="zone_id"
                          defaultValue={state?.zone_name}
                          readOnly
                          style={{width: "250px",background:'#cdd4cf',color:'#000000' }}
                        />
                      )}
                    />
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={"SubZone"}
                    style={{ width: "150px" }}
                    className={`custom-background ${show ? 'show' : ''}`}
                  >
                    <Controller
                      control={control}
                      name="subzone_id"
                      render={({ field: { onChange } }) => (
                        <Input
                          onChange={onChange}
                          placeholder="SubZone"
                          name="zone_id"
                          value={state?.subzone_name}
                          readOnly
                          style={{width: "250px",background:'#cdd4cf',color:'#000000'}}
                        />
                      )}
                    />
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={"ORL Name"}
                    style={{ width: "150px" }}
                    className={`custom-background ${show ? 'show' : ''}`}
                  >
                    <Controller
                      control={control}
                      name="orl_name"
                      render={({ field: { onChange } }) => (
                        <Input
                          onChange={onChange}
                          placeholder="ORL Name"
                          value={state?.ORL_name}
                          readOnly
                          style={{width: "100%",background:'#cdd4cf',color:'#000000' }}
                        />
                      )}
                    />
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={"Customer Name"}
                    style={{ width: "150px" }}
                    className={`custom-background ${show ? 'show' : ''}`}
                  >                  
                    <Input
                      placeholder="Customer Name"
                      name="customer_name"
                      defaultValue={formattedValue}
                      readOnly
                      style={{width: "250px",background:'#cdd4cf',color:'#000000' }}
                    />
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={"Phone No"}
                    style={{ width: "150px", height: "30px" }}
                    className={`custom-background ${show ? 'show' : ''}`}
                  >
                    <Input
                      // onChange={onChange}
                      placeholder="ORL Name"
                      name="phone_number"
                      defaultValue={state?.phone_number}
                      readOnly
                      style={{width: "100%",background:'#cdd4cf',color:'#000000' }}
                    />
                    {/* </Form.Item> */}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={"Invoice Number"}
                    style={{ width: "150px", height: "30px" }}
                    className={`custom-background ${show ? 'show' : ''}`}
                  >
                    <Input
                      // onChange={onChange}
                      placeholder="Invoice Number"
                      style={{width: "100%",background:'#cdd4cf',color:'#000000' }}
                      name="invoice_number"
                      defaultValue={state?.invoice_number}
                      readOnly                   
                    />
                    {/* </Form.Item> */}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={"Bill Value"}
                    style={{ width: "150px" }}
                    className={`custom-background ${show ? 'show' : ''}`}
                  >
                    <Input
                      type="text"
                      name="invoice_value"
                      defaultValue={state.invoice_value}
                      style={{width: "250px",background:'#cdd4cf',color:'#000000' }}
                      value={
                        inputValue +
                        "." +
                        state.invoice_value +
                        " " +
                        inputValueNew
                      }
                      onChange={handleChange}
                    />
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={"Billing Date"}
                    style={{ width: "250px", height: "34px", borderRadius: '10px' }}
                    className={`custom-background ${show ? 'show' : ''}`}
                  >
                    <Input
                      //onChange={onChange}
                      placeholder="Billing Date"
                      value={dayjs(state?.invoice_date).format("DD-MM-YYYY")}
                      readOnly
                      style={{width: "250px",background:'#cdd4cf',color:'#000000' }}
                    />
                  </Descriptions.Item>
                  <Descriptions.Item className={`custom-background ${show ? 'show' : ''}`} label={"Call Duration"} style={{ width: "150px" }}>
                  {state?.duration_of_call != null ?
                  <Input                   
                      style={{width: "250px",background:'#cdd4cf',color:'#000000' }}
                      value={state?.duration_of_call}
                    /> :
                  <TimePicker
                    placeholder='Call Duration'
                    style={{ width: '170px' }}
                    defaultValue={state?.duration_of_call}
                    value={selectedTime}
                    onChange={onDurationChange}
                    format={format}
                    name='call_duration'
                  />}
                  </Descriptions.Item>
                  <Descriptions.Item  className={`custom-background ${show ? 'show' : ''}`}
                   label={"DOB"} style={{ width: "150px" }}>
                    {state?.dob != null ?
                    <Input                   
                      name="dob_date"
                      style={{width: "250px",background:'#cdd4cf',color:'#000000' }}
                      placeholder="DOB"
                      value={dayjs(state?.dob).format("DD-MM-YYYY")}
                    />:
                    <Input
                    type="date"
                    selected={dateDOB}
                    name="dob_date"
                    style={{ width: "250px", height: "34px", border:'2px solid #f5a60b', borderRadius: '10px' }}
                    placeholder="DOB"
                    //defaultValue={dob}
                    max={currentdate >= fifthday ? currentdate : previous}
                    min={changedate}
                    onChange={onchangedateDOB}
                    //value={date}
                    format={"DD-MM-YYYY"}
                  />}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={"Anniversary"}
                    className={`custom-background ${show ? 'show' : ''}`}
                    style={{ width: "150px" }}
                  >
                    {state?.anniversary != null ?
                    <Input                   
                      name="anniversay_date"
                      style={{width: "250px",background:'#cdd4cf',color:'#000000' }}
                      placeholder="Anniversary date"
                      value={dayjs(state?.anniversary).format("DD-MM-YYYY")}
                    />:
                    <Input
                      type="date"
                      selected={dateAnniversary}
                      name="anniversay_date"
                      style={{ width: "250px", height: "34px", border:'2px solid #f5a60b', borderRadius: '10px' }}
                      placeholder="Anniversary date"
                      value={state.anniversay}
                      max={currentdate >= fifthday ? currentdate : previous}
                      min={changedate}
                      onChange={onchangedateAnniversary}
                      // value={date}
                      //format={dateFormat}
                    />}
                  </Descriptions.Item>
                  <Descriptions.Item
                    className={`custom-background ${show ? 'show' : ''}`}
                    label={"Overall Rating"}
                    style={{ width: "150px" }}
                  >
                    <Rate
                      name={rating}
                      defaultValue={state?.rating}
                      onChange={(e) => setRating(e)}
                      style={{  display: 'flex', justifyContent: 'center', alignItems: 'center',
                                width: "250px", height: "34px", border:'2px solid #f5a60b', 
                                borderRadius: '10px',padding:'2px' }}
                      allowHalf
                      //value={2.5}
                    />
                  </Descriptions.Item>
                  <Descriptions.Item
                    className={`custom-background ${show ? 'show' : ''}`}
                    label={"Service Rating"}
                    style={{ width: "150px" }}
                  >
                    <Rate
                      name={servicerating}
                      defaultValue={state?.service_rating}
                      onChange={(e) => setServiceRating(e)}
                      style={{  display: 'flex', justifyContent: 'center', alignItems: 'center',
                                width: "250px", height: "34px", border:'2px solid #f5a60b', 
                                borderRadius: '10px',padding:'2px' }}
                      allowHalf
                      //value={2.5}
                    />
                  </Descriptions.Item>
                  <Descriptions.Item
                    className={`custom-background ${show ? 'show' : ''}`}
                    label={"Product Rating"}
                    style={{ width: "150px" }}
                  >
                    <Rate
                      name={productrating}
                      defaultValue={state?.product_rating}
                      onChange={(e) => setProductRating(e)}
                      style={{  display: 'flex', justifyContent: 'center', alignItems: 'center',
                                width: "250px", height: "34px", border:'2px solid #f5a60b', 
                                borderRadius: '10px',padding:'2px' }}
                      allowHalf
                      //value={2.5}
                    />
                  </Descriptions.Item>
                  <Descriptions.Item
                    className={`custom-background ${show ? 'show' : ''}`}
                    label={"Price Rating"}
                    style={{ width: "150px" }}
                  >
                    <Rate
                      name={pricerating}
                      defaultValue={state?.price_rating}
                      onChange={(e) => setPriceRating(e)}
                      style={{  display: 'flex', justifyContent: 'center', alignItems: 'center',
                                width: "250px", height: "34px", border:'2px solid #f5a60b', 
                                borderRadius: '10px'}}
                      allowHalf
                      //value={2.5}
                    />
                  </Descriptions.Item>
                 
                  <Descriptions.Item
                    name="call_status"
                    label={"Call Status *"}
                    className={`custom-background ${show ? 'show' : ''}`}
                    style={{ width: "150px",color:"#f70707"}}
                  >   
                    <Controller
                      control={control}
                      name="def_title_id"
                      render={({ field: { onChange } }) => (           
                    <Select
                    placeholder="Select"
                    style={{ width: "250px", height: "34px", border:'2px solid #f5a60b', borderRadius: '10px' }}
                    //disabled={savingZonal}
                    name="call_status"
                    loading={gettingCalldefStatus}    
                    defaultValue={state?.call_status_name}       
                    onChange={(e) => {
                      onChange(e);
                      setCallStatus(
                        (call ?? [])?.find(
                          (outlet) => outlet.id === e
                        )
                      );
                    }}
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
                      call ? call?.filter((e) => e.status === '1') : []
                    )}
                   </Select>               
                 )}                  
                  />                  
                  {callStatus ? (
                   <Input                                     
                   style={{width: "250px",background:'#34b1aa',color:'#ffffff' }}
                   value = {callStatus?.def_title_name} 
                 />        
                    ) : (
                      <Input                                     
                      style={{width: "250px",background:'#34b1aa',color:'#ffffff' }}
                      value = {state?.def_title_name}
                    />
                 
                    )}     
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={"Feedback"}
                    style={{ width: "150px" }}
                    className={`custom-background ${show ? 'show' : ''}`}
                  >
                    <Select
                      placeholder="Select"
                      style={{ width: "250px", height: "34px", border:'2px solid #f5a60b', borderRadius: '10px' }}
                      //disabled={savingZonal}
                      name="definition_list"
                      loading={gettingDefinitionsList}
                      onChange={(e) => setFeedback(e)}
                      defaultValue={state?.feedback}
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
                          ? def?.filter((e) => e.def_title == "Feedback")
                          : []
                      )}
                    </Select>
                  </Descriptions.Item>
                 <Descriptions.Item 
                          rules={[{required: true, message: 'Please enter Remarks name'}]}
                          className={`custom-background ${show ? 'show' : ''}`} 
                          label={"Remarks * "} style={{ width: "150px",color:"#f70707"}}>                  
                    <Input                    
                      name="remarks"
                      style={{ width: "250px", height: "34px", border:'2px solid #f5a60b', borderRadius: '10px' }}
                      defaultValue={defaultValue?.remarks}
                      onChange={onremarks}
                      placeholder=" Enter Remarks"
                    />              
                  </Descriptions.Item>
                 
                 
                </Descriptions>             
              </Row>
              <div
                className="d-flex justify-content-end align-items-center"
                style={{ width: "96%", padding: "15px" }}
              >
                <Col span={24}>
                  <Row gutter={[15, 15]} style={{ justifyContent: "center" }}>
                    <Col md={{ span: 12 }} xs={{ span: 24 }}>
                      <Form.Item >
                        <Button
                         className={`custom-background ${show ? 'show' : ''}`}
                          onClick={handleClickBack}
                          style={{ backgroundColor: "#f5a60b", color: "white" }}
                          type="info"
                          htmlType="button"
                        >
                          Back
                        </Button>
                      </Form.Item>
                    </Col>
                    {/* <Col md={{ span: 5 }} xs={{ span: 24 }}>                    
                         <Typography  style={{ fontWeight:'bold',color: "#34b1aa" }}>{callStatus?.def_title_name}</Typography>                    
                    </Col> */}
                    <Col span={10} style={{ textAlign: "right" }}>
                      <Form.Item
                        wrapperCol={{ offset: 8, span: 16, padding: "15px" }}
                      >
                        <Button
                          className={`custom-background ${show ? 'show' : ''}`}
                          style={{ backgroundColor: "#34b1aa" }}
                          type="primary"
                          onClick={handleSubmit(onFinish)}
                          loading={loading}
                          //disabled={!submitStatus}
                        >
                          {"Call Updated"}
                        </Button>
                      </Form.Item>
                    </Col>
                   
                    <CustomTable
                        className={`custom-background ${show ? 'show' : ''}`}
                        loading={gettingAllSalesCustomer}
                        dataSource={dataSource}
                       // handleEditClick={handleEditClick}
                        column={columnSale}
                      //  getRowStyle={getRowStyle}       
                        title={"Customer Call Back History List"}
                      />
                   {viewStatusModal?.show && (
                    <Modal                    
                      open={viewStatusModal?.show} 
                      onOk={() => setViewStatusModal({...viewStatusModal, show: false})}
                      onCancel={() => setViewStatusModal({...viewStatusModal, show: false})}>
                    {/* // {showTable && ( */}
                      <>                  
                     <CustomTable                   
                        loading={gettingCallBackEntry}
                        dataSource={CallHistory}
                       // handleEditClick={handleEditClick}
                        column={column}
                      //  getRowStyle={getRowStyle}       
                        title={"Customer Call Back History List"}
                      />
                      </>                     
                      </Modal>
                       )}
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

export default CallEntryEditForm;
