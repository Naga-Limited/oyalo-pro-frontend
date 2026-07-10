import React, {useEffect} from 'react';
    import {useDispatch, useSelector} from 'react-redux';
    import {useLocation,
      //useNavigate
    } from 'react-router';
    import {getAuditIncentiveSubmitDetails,getAuditReport} from '../../../@app/entry/entrySlice';
    import CustomTable from '../../../components/CustomTableNew';
    import {column} from './column';    

    export default function AuditIncentiveReportFormView ({setTopTitle}) {
      setTopTitle('Incentive Report Outlet List');
      const { state } = useLocation();          
      const {
       gettingAuditIncentiveSubmitDetails,
       getAuditIncentiveSubmitDetailsResponse: {data: outletlist}
      } = useSelector((state) => {
          return state.entry;
      });     
      let docID = ''
      // const {
      //   // gettingAuditReport,
      //   getAuditReportResponse: { data: dataSource }
      // } = useSelector((state) => {
      //   return state.entry;
      // });

  // const gridData = (dataSource ?? []).map((e) => {
  //   return {
  //     ...e,
  //     docIDnew : e?.id,   
  //   };
  // });


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
     
    
// const handleViewClick = (data) => {
//   navigate("/auditIncentiveOHApproveView/view", {
//     state: { ...data,outletID:data.outlet_id, }
//   });
// };


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
        dispatch(getAuditIncentiveSubmitDetails({path: 'get-incentive-process-details', data: {limit: 400, offset: 0,docID:state?.id}}));
        else 
        dispatch(getAuditIncentiveSubmitDetails({path: 'get-incentive-process-details', data: {limit: 400, offset: 0,employee: empId,docID:state?.id}}));
      }, []);
    

      return ( 
        <>
      
        <CustomTable
          dataSource={gridDatanew}
          loading={gettingAuditIncentiveSubmitDetails}
          column={column}
        //  handleViewClick={handleViewClick}
          title={'Incentive OH View Outlet List'}    
        />
      
    
      </>
      ); 
              
    }
    