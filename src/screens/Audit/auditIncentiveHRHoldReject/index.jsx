
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../../../src/screens/App/stylenew.css";
import { useNavigate,
  //useLocation
} from "react-router";
import {getAuditReport,getAuditIncentiveHR,getByMonthAudit,getPaymentCurrentStatus,getAuditIncentiveReject,getAuditIncentiveHoldRejectHr} from "../../../@app/entry/entrySlice";
import CustomTable from "../../../components/CustomTableNew";
import ConfirmOnExit from "../../../components/confirmOnExit/ConfirmOnExit";
import { useForm } from "react-hook-form";
import apis from "../../../api/entryApis";
import { Form, Tabs, Col, Button, Input,Row,DatePicker,Modal,message } from "antd";
import messageToast from "../../../components/messageToast/messageToast";
import { Badge } from 'antd';
import {auditStatus} from '../../../components/formComponents/CommonFunctions';
import {FaEye} from 'react-icons/fa';


const { TabPane } = Tabs;
const { MonthPicker } = DatePicker;

export default function AuditIncentiveHRHoldReject({ setTopTitle }) {
  setTopTitle("Incentive HR");
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [showDialog, setShowDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
  //  gettingAuditReport,
    getAuditReportResponse: { data: dataSource }
  } = useSelector((state) => {
    return state.entry;
  });


 useEffect(() => {
  if (type === 1) 
  dispatch(getByMonthAudit({path: 'get-audit-incentive-month', data: {limit: 400, offset: 0,month:startDate,year:year}}));
  else 
  dispatch(getByMonthAudit({path: 'get-audit-incentive-month', data: {limit: 400, offset: 0,employee: empId,month:startDate,year:year}}));
}, []);
 
  const {
   // gettingByMonthAudit,
    getByMonthAuditResponse: { data: dataSourcemonth }
  } = useSelector((state) => {   
    return state.entry;
  });

  const gridDatamonth = (dataSourcemonth ?? []).map((e) => {
    return {
      ...e,
      month:e?.monthvalue,
    };});
 const [startDate, setStartDate] = useState(new Date().getMonth() + 1);
 const [year,setYear] =useState(new Date().getFullYear());

 function getNumericMonth(startDate) {
  return (String(['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].indexOf(startDate) + 1).padStart(1, '0'))
}
  const monthnewone = startDate.toLocaleString({ month: 'numeric' });
  var arr1 = monthnewone.split(' ');
  const monthvalue = getNumericMonth(arr1[2]);
  const yearvalue = arr1[3];

  const {
    // gettingAuditReport,
    getAuditRejectResponse: { data: dataSourcereject }
  } = useSelector((state) => {
    return state.entry;
  });


  const handleFormSubmit = () => {
    if (startDate) {
      dispatch(getByMonthAudit({path: 'get-audit-incentive-month',data: { month: monthvalue, year:yearvalue },
        }));}
    else {
      apis.open({message: "Please choose and Month",type: "error",});
    }
    handleSubmit();
  };

   const {
    // gettingAuditIncentiveApprove,
    getAuditIncentiveApproveResponse: { data: dataSourceapprove }
  } = useSelector((state) => {
    return state.entry;
  });

  const gridData = (dataSource ?? []).map((e) => {
    return {
      ...e,
      docIDnew : e?.id,   
    };});


  const gridDatanew = (dataSourceapprove ?? []).map((e) => {
    return {
      ...e,
      docID : e?.id,    
    };});

  let docID = ''
   gridDatanew.map((v1) => {
  docID=v1.id;
    });
    let docIDnew = ''
      gridData.map((v1) => {
      docIDnew =v1.id;
   });

  const { type, userData } = useSelector((state) => state.auth);
  const empId = userData.data?.id;
  const dispatch = useDispatch();
  const [selectedArray, setSelectedArray] = useState([]);
  const onFinish = () => {
   setShowDialog(false);
   setLoading(true);
     let approve_incentive = gridData.filter((value) =>
      inArray(value.id, selectedArray)
    );
    let submitted = {
      approve_incentive,
      initiated_by: userData.data?.id ?? "0",
      };
    setSelectedArray(true);
    setLoading(true);
    apis.auditApproveIncentiveSubmit(submitted).then((res) => {
      if (res.data.status === 200) {
        setTimeout(() => {
          messageToast({
            message: res.data.statusText,
            statusText: res.data.statusText,
            title: "Incentive Initiate"
          });
          navigate("/auditIncentiveReport");
          setLoading(false);
        }, 2000);
      } else if (res.data.status === 300) {
        messageToast({
          message: res.data.statusText,
          statusText: res.data.statusText,
          title: "Not Initiate"
        });
        setLoading(false);
      } else {
        setLoading(false);
      }});
  };

const handleViewClick = (data) => {
    navigate("/auditIncentiveHR/view", {
      state: { ...data }
});};

const handleViewHoldRejectClick  = (data) => {
  navigate("/auditIncentiveHR/view", {
    state: { ...data }
});};


  const handleViewClickView = (data) => {
    navigate("/auditIncentiveHRSubmitView/", {
      state: { ...data,
      },});};

 
   const handleViewRejectClick = (data) => {
     navigate("/auditIncentiveHRRejectionView/", {
      state: { ...data,remarks:data?.reject_remarks
      },      
    }
    );
   };


  useEffect(() => {
    if (type === 1)
      dispatch(getAuditReport({path: "get-incentive-hr-screen",data: { limit: 400, offset: 0, docID:docID , }
        }));
    else
      dispatch(getAuditReport({path: "get-incentive-hr-screen",data: { limit: 400, offset: 0, employee: empId, docID:docID , }
        }));
  }, []);

  useEffect(() => {
    if (type === 1)
      dispatch(
        getAuditIncentiveHR({
          path: "get-incentive-hr-submitted",
          data: { limit: 400, offset: 0, docIDnew:docIDnew, }
        })
      );
    else
      dispatch(
        getAuditIncentiveHR({
          path: "get-incentive-hr-submitted",
          data: { limit: 400, offset: 0, employee: empId, docIDnew:docIDnew, }
        })
      );
   }, []);

 

   useEffect(() => {
    if (type === 1)
      dispatch(
        getAuditIncentiveReject({
          path: "get-incentive-rejected",
          data: { limit: 400, offset: 0, docIDnew:docIDnew, }
        })
      );
    else
      dispatch(
        getAuditIncentiveReject({
          path: "get-incentive-rejected",
          data: { limit: 400, offset: 0, employee: empId, docIDnew:docIDnew, }
        })
      );
   }, []);

   useEffect(() => {
    if (type === 1)
      dispatch(
        getPaymentCurrentStatus({
          path: "get-incentive-current-status",
          data: { limit: 400, offset: 0,}
        })
      );
    else
      dispatch(
        getPaymentCurrentStatus({
          path: "get-incentive-current-status",
          data: { limit: 400, offset: 0, employee: empId,}
        })
      );
   }, []); 

   const {
    // gettingAuditReport,
    getAuditIncentiveHoldRejectHrResponse: { data: dataSourceholdrejecthr }
  } = useSelector((state) => {
    return state.entry;
  });

  const gridDataHr = (dataSourceholdrejecthr ?? []).map((e) => {
    return {
      ...e,
      docID1 : e?.id,    
    };});

    useEffect(() => {
      if (type === 1)
        dispatch(
          getAuditIncentiveHoldRejectHr({
            path: "get-incentive-holdrejectbyhr",
            data: { limit: 400, offset: 0 }
          })
        );
      else
        dispatch(
          getAuditIncentiveHoldRejectHr({
            path: "get-incentive-holdrejectbyhr",
            data: { limit: 400, offset: 0, employee: empId }
          })
        );
     }, []);
  
   const {
     gettingPaymentCurrentStatus,
     getPaymentCurrentStatusResponse: { data: currentstatus }
  } = useSelector((state) => {
   
    return state.entry;
  });
//  setViewStatusModal(currentstatus);
const [viewStatusModal, setViewStatusModal] = useState([currentstatus]);
 // const value = currentstatus;


   //setViewStatusModal(da)
  // const dataSourcenew = (currentstatus ?? []).map((e) => {
  //   return {
  //     ...e,
  // };});


  const { handleSubmit } = useForm();

  function inArray(needle, haystack) {
    var length = haystack.length;
    for (var i = 0; i < length; i++) {
      if (haystack[i] == needle) return true;
    }
    return false;
  }

  const onClick111 = (e, e1) => {
    inArray(e1.row.id, selectedArray);
    let condition_to_not_click = 0
    gridDatamonth.map((v1)=>{
      if(v1.id === e1.row.id && v1.payment_status == 'Incentive Hold'){
        condition_to_not_click = 1
      }
    })
    if(condition_to_not_click == '1'){
    e.target.checked=false;
    let pointerror ='Audit Incentive Hold by HR';
    messageApi.open({
    type: 'warning',
    content: 'Warning --- '+pointerror,
    className: 'custom-class',
    style: {
      marginTop: '20vh',
      color:'#d91616',
      fontWeight:'bold'}})
    }
 
    if (inArray(e1.row.id, selectedArray)) {
     let k1 = "";
      selectedArray.map((value, key) => {
        if (value == e1.row.id) {
          k1 = key;
        }
      });
      selectedArray.splice(1, k1);
     } else {
      selectedArray.push(e1.row.id);
    }
   };

  const onChangeSelectAll = () => {
    const checkboxes = document.querySelectorAll("input[type=checkbox]");
    checkboxes.forEach((e) => {
      e.checked = true;
    });
    gridData.map((k1) => {
      selectedArray.push(k1.id);
    });
  };

   const column = [
  
    {
      key: "0",
      headerName: "Select",
      hide: false,
      width: 70,
      renderCell: (e1) => {
        return (
          <Input
            type="checkbox"
            id="field"
            value=""
             onChange={(e) => {
              onClick111(e, e1);
            }}
          />
        );
      }
    },
    {
      key: "1",
      headerName: "Zone",
      field: "zone_name",
      hide: false,
      width: 100
    },
    {
      key: "2",
      headerName: "Outlet Name",
      field: "outlet_name",
      hide: false,
      width: 250
    },
    // {
    //   key: "3",
    //   headerName: "ORL Name",
    //   field: "outlet_ORL",
    //   hide: false,
    //   width: 150
    // },
    // {
    //   key: "4",
    //   headerName: "ORL V_Code",
    //   field: "emp_vendor_code",
    //   hide: false,
    //   width: 130
    // },

    { key: '3', headerName: 'ORL Name', field: 'outlet_ORL', hide: false, width: 250,
    renderCell: (params) => {
      return (params.row.outlet_ORL +' - '+  params.row.emp_vendor_code);
    }
   },
    // {
    //   key: "5",
    //   headerName: "Audit Number",
    //   field: "audit_id",
    //   hide: false,
    //   width: 150
    // },
    // {
    //   key: "6",
    //   headerName: "Month",
    //   field: "audit_month",
    //   hide: false,
    //   width: 80
    // },
    {
      key: "7",
      headerName: "Approved_Date",
      field: "approved_date",
      hide: false,
      width: 120
    },
    {
      key: "8",
      headerName: "Score",
      field: "total_mark",
      hide: false,
      width: 90,
      renderCell: (params) => {
        return (params.row.total_mark +' / '+  params.row.fullmarks);
      }
    },
    {
      key: "9",
      headerName: "Amount",
      field: "incentive_amount",
      hide: false,
      width: 90
    },
    // {
    //   key: "9",
    //   headerName: "Payment Status",
    //   field: "payment_status",
    //   hide: false,
    //   width: 150
    // },
    {
      key: '10', headerName: 'Waiting At', field: 'payment_status', hide: false, width: 180,
      renderCell: (params) => {
        return (
         <Badge
            style={{ backgroundColor: auditStatus(params.row.payment_status) }} count={params.row.payment_status}>
          </Badge>
        );
      }
    },
      
  ];
  
     const [newStatusData,setViewStatusData] = useState({});
  
 
  return (
    <>
    {contextHolder}
      <ConfirmOnExit showModel={showDialog} />
      <div style={{ padding: "10px" }}>
        <Col span={"24"}>
          <Tabs
            centered                     
            type='card'
            defaultActiveKey="1"
          >
            <TabPane
              style={{ width: "100%", color: "#38d963" }}
              tab="Initiate"
              key="1"
              className="ant-tabs-tab-active-btn"
            >
               <Row gutter={[45, 0]}>
                <Col md={{span: 1}} xs={{span: 24}}></Col>
                    <Col md={{span: 4}} xs={{span: 24}} >
                    <Form.Item name='month' label='Month' >                     
                      <MonthPicker
                      loading={(e) => e.monthvalue}
                      selected={startDate}
                     // onChange={(date) => setStartDate(date)}
                     onChange = {(e) => setStartDate(e)}
                      dateFormat="MM/YYYY"
                      required
                      form="external-form"
                      showMonthYearPicker
                    />
                   </Form.Item>
                      </Col>
                      <Col md={{span: 4}} xs={{span: 24}} >
                      <Form.Item name='submit'>     
                      <button
                      onClick={handleFormSubmit}
                      style={{background:'#34b1aa',color: "#ffffff"}}
                      className="btn btn col-lg-2 col-m-2 col-sm-2 h-100 w-auto align-items-center">
                      {" "}
                      Submit
                    </button>
                    </Form.Item>
                        </Col>
                    <Col md={{span: 7}} xs={{span: 24}} >
                      <Form.Item name='submit'>     
                      <button
                     onClick={() => {                   
                      setViewStatusModal({show: true}
                        )
                        setViewStatusData(viewStatusModal[0])
                      } }
                
                      style={{color: "#F5A60B",fontWeight:'bold'}}
                      className="btn btn col-lg-2 col-m-2 col-sm-2 h-100 w-auto align-items-center">
                     <FaEye /> View Status
                    </button>
                    </Form.Item>
                        </Col>
                      </Row>
              <CustomTable
               // key={column.id}
                column={column}
                //density="standard"
               // loading={gettingByMonthAudit}
                handleViewClick={handleViewClick}
                monthvalue={monthvalue}
                setStartDate={setStartDate}
                year={year}
                setYear={setYear}
                title={"Audit 2.0 Report"}
                handleSubmit={handleFormSubmit}
                dataSource={gridDatamonth}
             
              />
            <div
                className="d-flex justify-content-center align-items-center "
                style={{ width: "100%", padding: "1px" }}
              >
                <Form.Item>
                  <Button
                    key={column.id}
                    // disabled={savingAuditNewEntry}
                    onClick={onChangeSelectAll}
                    //loading={loading}
                    style={{
                      backgroundColor: "#3557bd",
                      color: "white",
                      marginRight: "6px",
                      fontWeight: "bold"
                    }}
                    type="info"
                    htmlType="button"
                  >
                    Select All
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button
                    // disabled={savingAuditNewEntry}
                    onClick={handleSubmit(onFinish)}
                    loading={loading}
                    style={{
                      backgroundColor: "#34b1aa",
                      color: "white",
                      marginRight: "6px",
                      fontWeight: "bold"
                    }}
                    type="info"
                    htmlType="button"
                  >
                    Submit
                  </Button>
                </Form.Item>            
              </div>
            </TabPane>
            <TabPane
             tab="Submitted"
              key="2"
            >             
              <CustomTable
                key={column.id}
                loading={loading}
                dataSource={gridDatanew}
                //column={columnsubmit}
                handleViewClick={handleViewClickView}
                title={"Audit 2.0 Report"}
              />
            </TabPane>
            <TabPane
             tab="Hold / Reject by HR"
              key="3"
            >
              <CustomTable
                key={column.id}
                dataSource={gridDataHr}
             //   column={columnsubmittedholdrejectHR}
                handleViewClick={handleViewHoldRejectClick}
                title={"Audit 2.0 Report"}
              />
            </TabPane>

            <TabPane
             tab="Rejected"
              key="4"
            >
              <CustomTable
                key={column.id}
                dataSource={dataSourcereject}
               // column={columnsubmitreject}
                handleViewClick={handleViewRejectClick}
                title={"Audit 2.0 Report"}
              />
            </TabPane>
          </Tabs>
        </Col>      
      </div>
      {viewStatusModal?.show && (
        <Modal 
          title='Current Status' 
          open={viewStatusModal?.show} 
          onOk={() => setViewStatusModal({...viewStatusModal, show: false})}
          onCancel={() => setViewStatusModal({...viewStatusModal, show: false})}>
       
          <div>
        
          <table loading={gettingPaymentCurrentStatus} style={{width:'450px',backgroundColor:'#a1f0ed',borderRadius:'10px',border:'2px',textalign:'right',borderWidth:'2px'}}>
                <thead>
                <th style={{width:'150px',backgroundColor:'#d7dbdb',borderRadius:'5px',border:'2px',textalign:'right'}}>Current Status</th> <th style={{width:'150px',backgroundColor:'#d7dbdb',borderRadius:'5px',border:'2px',textalign:'right'}}>Count</th></thead>
                <tr><td> Waiting at HR</td><td style={{align:'right'}}> {newStatusData ? newStatusData.waiting_at_hr : ' '} </td></tr>
                <tr style={{width:'150px',backgroundColor:'#d7dbdb',borderRadius:'5px',border:'2px',textalign:'right'}}><td> Waiting at OH</td><td> {newStatusData ? newStatusData.waiting_at_oh : ' '} </td></tr>
                <tr><td> Waiting at AH</td><td> {newStatusData ? newStatusData.waiting_at_ac : ' '} </td></tr>
                <tr style={{width:'150px',backgroundColor:'#d7dbdb',borderRadius:'5px',border:'2px',textalign:'right'}}><td> Waiting at BH</td><td> {newStatusData ? newStatusData.waiting_at_bh : ' '} </td></tr>
                <tr><td> Waiting at AM</td><td> {newStatusData ? newStatusData.final_ac_approve : ' '} </td></tr>
                <tr style={{width:'150px',backgroundColor:'#d7dbdb',borderRadius:'5px',border:'2px',textalign:'right'}}><td> Waiting at Payment</td><td> {newStatusData ? newStatusData.incentive_sap : ' '} </td></tr>
                <tr><td> Rejected by HR</td><td> {newStatusData ? newStatusData.reject_by_hr : ' '} </td></tr>
                <tr style={{width:'150px',backgroundColor:'#d7dbdb',borderRadius:'5px',border:'2px',textalign:'right'}}><td> Rejected by OH</td><td> {newStatusData ? newStatusData.reject_by_oh : ' '} </td></tr>
                <tr><td> Rejected by AH</td><td> {newStatusData ? newStatusData.reject_by_ac : ' '} </td></tr>
                <tr style={{width:'150px',backgroundColor:'#d7dbdb',borderRadius:'5px',border:'2px',textalign:'right'}}><td> Rejected by BH</td><td> {newStatusData ? newStatusData.reject_by_bh : ' '} </td></tr>
                <tr><td> Hold by HR</td><td> {newStatusData ? newStatusData.hold_by_hr : ' '} </td></tr>
               </table> 
           </div>
        </Modal>
      )}
    </>
  );
}