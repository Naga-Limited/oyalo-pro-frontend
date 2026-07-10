import React, {useEffect,
      useState
    } from 'react';
    import {useDispatch, useSelector} from 'react-redux';
    import {useLocation,useNavigate} from 'react-router';
    import {getAuditIncentiveSubmitDetails} from '../../../@app/entry/entrySlice';
    import CustomTable from '../../../components/CustomTableNew';
    import {column} from './column';   
    import apis from "../../../api/entryApis";
    import {Form, Card}  from 'antd';
    import messageToast from "../../../components/messageToast/messageToast";
    import { useForm } from "react-hook-form";
    import ConfirmOnExit from "../../../components/confirmOnExit/ConfirmOnExit";
    import {Button} from 'antd';
    export default function AuditIncentiveHRRejectionFormView ({setTopTitle}) {
      setTopTitle('Incentive - Outlet List');
     const navigate = useNavigate();
     const [showDialog, setShowDialog] = useState(false);
   
     const [loading, setLoading] = useState(false);
     const { handleSubmit } = useForm();
     const { state } = useLocation();
       
      const {
       gettingAuditIncentiveSubmitDetails,
       getAuditIncentiveSubmitDetailsResponse: {data: outletlist}
      } = useSelector((state) => {
          return state.entry;
      });
 
      const gridDatanew = (outletlist ?? []).map((e) => {
         return {            
         ...e, 
         docID:e.id,
         remarks:e.remarks,             
       };   
      }
     );

     const handleViewClick = (data) => {
      navigate("/auditIncentiveHRRejectionView/view",
     {
        state: { ...data,
          incentive_detail_id:data?.id,
          incentive_process_id:state?.id,
        },      
      }
      );
     };
  
     const handleClickBack = () => {
    navigate("/auditIncentiveHR");
  };
    
      const {type, userData} = useSelector((state) => state.auth);
      const empId = userData.data?.id;
     
     const dispatch = useDispatch();
      useEffect((e) => {
        if (type === 1) 
        dispatch(getAuditIncentiveSubmitDetails({path: 'get-incentive-process-details', data: {limit: 400, offset: 0,docID:state?.id,remarks:e?.remarks}}));
        else 
        dispatch(getAuditIncentiveSubmitDetails({path: 'get-incentive-process-details', data: {limit: 400, offset: 0,employee: empId,docID:state?.id,remarks:e?.remarks}}));
      }, []);
      const onFinish = (data) => {
        setShowDialog(false);
          // let approve_incentive = gridDatanew;
          let submitted = {
         // incentive_detail_id:state?.process_details_id,
          audit_entry_id:state?.audit_entry_id,
        //  incentive_process_id:state?.incentive_process_id,
          incentive_detail_id:data?.id,
          incentive_process_id:state?.id,
          initiated_by: userData.data?.id ?? "0"
         };
         //setSelectedArray(true);
         setLoading(true);
         apis.auditReSubmitHR(submitted).then((res) => {
           if (res.data.status === 200) {
             setTimeout(() => {
               messageToast({
                 message: res.data.statusText,
                 statusText: res.data.statusText,
                 title: "Incentive Resubmitted"
               });
               navigate("/auditIncentiveHR");
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
       let divStyle = {
        color: '#34b1aa',
        fontWeight:'bold',
        fontSize:'20px',
        padding: '400px',
        width:'350px',
        height:'50px',        
      };
      return ( 
        <>
      <ConfirmOnExit showModel={showDialog} />
        {/* <Col md={{span: 20}} xs={{span: 14}} > */}
        <Card>
        {/* <Form.Item name='submit' label='Document No' style={{fontWeight:'bold',align:'center'}}>      */}
        <span style={divStyle}>      
          Document No : {state?.payment_document_no}
       </span>
     
      {/* </Form.Item> */}
      </Card>
          {/* </Col> */}
      <CustomTable
          dataSource={gridDatanew}
          loading={gettingAuditIncentiveSubmitDetails}
          column={column}
          handleViewClick={handleViewClick}
          title={'Audit 2.0 Report'}    
        />
             <div
                className="d-flex justify-content-start align-items-center "
                style={{ width: "90%",padding:'5px' }}>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button
                    //disabled={savingAuditNewEntry}
                    onClick={handleClickBack}
                    style={{ backgroundColor: "#f5a60b", color: "white" }}
                    type="info"
                    htmlType="button"
                  >
                    Back
                  </Button>
                </Form.Item>
                <div
                className="d-flex justify-content-end align-items-center "
                style={{ width: "90%",padding:'1px' }}>
                <Form.Item wrapperCol={{ offset: 8, span: 6 }}>
                  <Button
                    //disabled={savingAuditNewEntry}
                    //onClick={handleClickBack}
                    onClick={handleSubmit(onFinish)}
                      loading={loading}
                    style={{ backgroundColor: "#34b1aa", color: "ffffff" }}
                    type="info"
                    htmlType="button"
                  >
                    Re-Initiate
                  </Button>
                </Form.Item>
                </div>
                </div>
            
        </>
      ); 
              
    }
    