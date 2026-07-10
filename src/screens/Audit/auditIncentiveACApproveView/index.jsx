import React, {useEffect,useState} from 'react';
    import {useDispatch, useSelector} from 'react-redux';
    import {useLocation,
      //useNavigate
    } from 'react-router';
    import messageToast from "../../../components/messageToast/messageToast";
    import {getAuditIncentiveSubmitDetails,getAuditReport} from '../../../@app/entry/entrySlice';
    import { Form, Button } from "antd";
    import CustomTable from '../../../components/CustomTableNew';
    import {column} from './column';    
    import ConfirmOnExit from "../../../components/confirmOnExit/ConfirmOnExit";
    import apis from "../../../api/entryApis";
    import { useNavigate} from "react-router";
    import { Modal,Input,Col,Card } from 'antd';
    import { useForm } from "react-hook-form";
 
    export default function AuditIncentiveACApproveFormView ({setTopTitle}) {
      setTopTitle('Incentive - Outlet List');
      const {TextArea} = Input;
     const navigate = useNavigate();
     const { state } = useLocation();
     const [loading, setLoading] = useState(false);
     const [gridLoading,setGridLoading] =  useState(false);
     const [rejectloading,setrejectLoading] =useState(false);
     const [buttonApprove, setButtonApprove] = useState(true);     
     const [buttonReject, setButtonReject] = useState(true);
     const [showDialog, setShowDialog] = useState(false);
     const [rejectModal, setRejectModal] = useState({});
    const {
       gettingAuditIncentiveSubmitDetails,
       getAuditIncentiveSubmitDetailsResponse: {data: outletlist}
      } = useSelector((state) => {
          return state.entry;
      });
      const { handleSubmit } = useForm();
      let docID = ''
      const handleReject = () => {
        setrejectLoading(true);
        setGridLoading(true);
        setRejectModal(false);
        setButtonApprove(false);
        apis.auditRejectIncentiveAC(
          {
            // ...gridDatanew,
            // ...gridData,
         //   auditentry_id: (state?.audit_id ?? '').toString(),
            docID:state?.id || state?.docID,
            status: state?.capa_status,
            incentive_detail_id:state?.process_detail,
            incentive_process_id:state?.process_details_id,
            remarks: rejectModal?.data
            }).then((data) => {
          const {
            data: {status}
          } = data;
          messageToast({message: 'Audit Incentive Rejected', status, title: 'Incentive Reject'});
          navigate('/auditIncentiveReport');
        });
      };

  useEffect(() => {
    if (type === 1)
      dispatch(
        getAuditReport({
          path: "get-incentive-hr-screen",
          data: { limit: 400, offset: 0, docID:docID , }
        })
      );
    else
      dispatch(
        getAuditReport({
          path: "get-incentive-hr-screen",
          data: { limit: 400, offset: 0, employee: empId, docID:docID , }
        })
      );
  }, []);
      const onFinish = () => {
        setShowDialog(false);
        setButtonReject(false);
          let submitted = {
           docID:state?.id || state?.docID,
           approved_by: userData.data?.id ?? "0",
          };
        // setSelectedArray(true);
         setLoading(true);
         setGridLoading(true);
         apis.auditApproveIncentiveAC(submitted).then((res) => {
           if (res.data.status === 200) {
             setTimeout(() => {
               messageToast({
                 message: res.data.statusText,
                 statusText: res.data.statusText,
                 title: "Incentive AH Approve Status"
               });
               navigate("/auditIncentiveReport");
               setLoading(false);
               setGridLoading(false);
             }, 2000);
           } else if (res.data.status === 300) {
             messageToast({
               message: res.data.statusText,
               statusText: res.data.statusText,
               title: "Not Initiate"
             });
             setLoading(false);
             setGridLoading(false);
           } else {
             setLoading(false);
             setGridLoading(false);
           }
         });
       };
     
    
const handleViewClick = (data) => {
  navigate("/auditIncentiveACApproveView/view", {
    state: { ...data,
      outletID:data.outlet_id,
      entryID:data?.audit_entry_table_id, 
      incentive_detail_id:data?.docID,
      incentive_process_id:state?.id
      }
  });
};


      const gridDatanew = (outletlist ?? []).map((e) => {
         return {            
         ...e, 
         docID:e.id,   
         outletID:e.outlet_id,          
       };          
      }
      );
     
 
       
      const {type, userData} = useSelector((state) => state.auth);
      const empId = userData.data?.id;
         
     const dispatch = useDispatch();
      useEffect(() => {
        if (type === 1) 
        dispatch(getAuditIncentiveSubmitDetails({path: 'get-incentive-process-details', data: {limit: 400, offset: 0,docID:state?.docID}}));
        else 
        dispatch(getAuditIncentiveSubmitDetails({path: 'get-incentive-process-details', data: {limit: 400, offset: 0,employee: empId,docID:state?.docID}}));
      }, []);
    
      let divStyle = {
        color: '#34b1aa',
        fontWeight:'bold',
        fontSize:'20px',
        padding: '550px',
        width:'250px',
        height:'50px',        
      };
      return ( 
        <>
         <ConfirmOnExit showModel={showDialog} />
         <Col md={{span: 34}} xs={{span: 24}} >
         <Card>
        {/* <Form.Item name='submit' label='Document No' style={{fontWeight:'bold',align:'center'}}>      */}
        <span style={divStyle}>      
          Document No : {state?.payment_document_no} {state?.DocumentNo}     
       </span>
      {/* </Form.Item> */}
      </Card>
          </Col>
        <CustomTable
          dataSource={gridDatanew}
          loading={gridLoading || gettingAuditIncentiveSubmitDetails}
          column={column}
          handleViewClick={handleViewClick}
          title={'Incentive OH View Outlet List'}    
        />
        <div
        className="d-flex justify-content-center align-items-center "
        style={{ width: "100%", padding: "1px" }}
      >
        {buttonApprove == true && (
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
            Approve
          </Button>
        </Form.Item> 
        )}
        {buttonReject == true && (
        <Form.Item>
              <Button
                   // disabled={savingAuditNewEntry}
                    loading={rejectloading}
                    onClick={() => setRejectModal({...rejectModal, show: true})} 
                    style={{ backgroundColor:"#ed0748", color: "white" }}
                    type="info"
                    htmlType="button"
                  >
                    Reject
             </Button>
         </Form.Item>
        )}
      </div>
      {rejectModal?.show && (
        <Modal title='Reject Remarks' open={rejectModal?.show} onOk={handleReject} onCancel={() => setRejectModal({...rejectModal, show: false})}>
         <TextArea rows={4} style={{resize: 'none'}} value={rejectModal?.data || ''} onChange={(e) => setRejectModal({...rejectModal, data: e.target.value})} />
        </Modal>
      )}
      </>
      ); 
              
    }
    