import React, {useEffect} from 'react';
    import {useDispatch, useSelector} from 'react-redux';
    import {
      useNavigate
    } from 'react-router';
    import {getAuditIncentiveAC} from '../../../@app/entry/entrySlice';
    import CustomTable from '../../../components/CustomTableNew';
    import {column} from './column';    
    
    export default function AuditIncentiveACFormView ({setTopTitle}) {
      setTopTitle('Incentive Account Approval');
      const navigate = useNavigate();
       const {
        gettingAuditIncentiveAC,
        getAuditIncentiveACResponse: {data: outletlist}
      } = useSelector((state) => {
          return state.entry;
      });
     // let docID = ''
    const gridDatanew = (outletlist ?? []).map((e) => {
         return {            
         ...e, 
         docID:e.id,   
         outletID:e.outlet_id,          
       };          
      }
      );
      const handleViewClick = (data) => {
        navigate("/auditIncentiveACApproveView/", {
          state: { ...data,docID:data?.id
          },      
        }
        );
      };
           
      const {type, userData} = useSelector((state) => state.auth);
      const empId = userData.data?.id;
        
     const dispatch = useDispatch();
      useEffect((data) => {
        if (type === 1) 
        dispatch(getAuditIncentiveAC({path: 'get-incentive-ac-screen',  data: { limit: 400, offset: 0, docID:data?.id}}));
        else 
        dispatch(getAuditIncentiveAC({path: 'get-incentive-ac-screen', data: {limit: 400, offset: 0,employee: empId,docID:data?.id}}));
      }, []);
    

      return ( 
         <CustomTable
          dataSource={gridDatanew}
          loading={gettingAuditIncentiveAC}
          column={column}
          handleViewClick={handleViewClick}
          title={'Incentive Account View Outlet List'}    
        /> 
      ); 
              
    }
    