
import React, {useEffect } from 'react';
  import {useDispatch, useSelector} from 'react-redux';
  import { useNavigate} from "react-router";
  import {getAuditIncentiveOH} from '../../../@app/entry/entrySlice';
  import CustomTable from '../../../components/CustomTableNew';
  import {column} from './column';    
  export default function AuditIncentiveHRSubmitFormView ({setTopTitle}) {
    setTopTitle('Incentive OH Approval');
   const navigate = useNavigate();
   const {
      gettingAuditIncentiveOH,
      getAuditIncentiveOHResponse: {data: outletlist}
    } = useSelector((state) => {
        return state.entry;
    });
  const dispatch = useDispatch();
    let docID = ''

    const gridDatanew = (outletlist ?? []).map((e) => {
       return {            
       ...e, 
       docID:e.id,   
      };   
    }
   );

   const handleViewClick = (data) => {
    navigate("/auditIncentiveOHApproveView/", {
      state: { ...data,entryID:data?.audit_entry_table_id
      },      
    }
    );

   };

     
    const {type, userData} = useSelector((state) => state.auth);
    const empId = userData.data?.id;
   
    useEffect(() => {
      if (type === 1)
        dispatch(
          getAuditIncentiveOH({
            path: "get-incentive-oh-screen",
            data: { limit: 400, offset: 0, docID:docID }
          })
        );
      else
        dispatch(
          getAuditIncentiveOH({
            path: "get-incentive-oh-screen",
            data: { limit: 400, offset: 0, employee: empId, docID:docID, }
          })
        );
     }, []);
  
  

    return ( 
      <CustomTable
                key={column.id}
                loading={gettingAuditIncentiveOH}
                dataSource={gridDatanew}
                column={column}
                handleViewClick={handleViewClick}
                title={"Audit 2.0 Report"}
              />
      
    ); 
            
  }
  
