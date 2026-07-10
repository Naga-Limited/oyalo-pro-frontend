    import React, {useEffect} from 'react';
    import {useDispatch, useSelector} from 'react-redux';
    import {
     
      useNavigate
    } from 'react-router';
    import {getAuditIncentiveBH} from '../../../@app/entry/entrySlice';
    import CustomTable from '../../../components/CustomTableNew';
    import {column} from './column';    
    
    export default function AuditIncentiveBHFormView ({setTopTitle}) {
      setTopTitle('Incentive BH Approval');
      const navigate = useNavigate();
     // const { state } = useLocation();
   
     const {
        gettingAuditIncentiveBH,
        getAuditIncentiveBHResponse: {data: outletlist}
      } = useSelector((state) => {
          return state.entry;
      });
  
    const gridDatanew = (outletlist ?? []).map((e) => {
         return {            
         ...e, 
         entryID:e.id,   
         outletID:e.outlet_id,          
       };          
      }
      );

      const handleViewClick = (data) => {
        navigate("/auditIncentiveBHApproveView/", {
          state: {  ...data,docID:data?.id
          },      
        }
        );
      };
           
      const {type, userData} = useSelector((state) => state.auth);
      const empId = userData.data?.id;
   
     const dispatch = useDispatch();
      useEffect((data) => {
        if (type === 1) 
        dispatch(getAuditIncentiveBH({path: 'get-incentive-bh-screen',  data: { limit: 400, offset: 0, entryID:data?.id,docID:data?.docID}}));
        else 
        dispatch(getAuditIncentiveBH({path: 'get-incentive-bh-screen', data: {limit: 400, offset: 0,employee: empId,entryID:data?.id,docID:data?.docID}}));
      }, []);
    

      return ( 
         <CustomTable
          dataSource={gridDatanew}
          loading={gettingAuditIncentiveBH}
          column={column}
          handleViewClick={handleViewClick}
          title={'Incentive Account View Outlet List'}    
        /> 
      ); 
              
    }
    