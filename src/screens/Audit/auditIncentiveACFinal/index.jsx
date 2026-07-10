
import React,{useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router';
import {getAuditPayment} from '../../../@app/entry/entrySlice';
import CustomTable from '../../../components/CustomTableNew';
import {column} from './column';
// import { Form,Button } from 'antd';
export default function AuditIncentiveACFinal({setTopTitle}) {
  setTopTitle('Incentive AM Approval');
  const navigate = useNavigate();

  const {
    gettingAuditPayment,
    getAuditPaymentResponse: {data: dataSource}
  } = useSelector((state) => {
    return state.entry;
  });

  const gridData = (dataSource ?? []).map((e) => {
    return {
      ...e,
    };
  });

  const handleViewClick = (data) => {
    navigate('/auditIncentiveACApproveFullView/', {
      state: {...data}
    });
  };

  const dispatch = useDispatch();
 

  const {type, userData} = useSelector((state) => state.auth);
  const empId = userData.data?.id;
 
  useEffect(() => {
    if (type === 1) dispatch(getAuditPayment({path: 'get-incentive-pmt-screen', data: {limit: 400, offset: 0}}));
    else dispatch(getAuditPayment({path: 'get-incentive-pmt-screen', data: {limit: 400, offset: 0, employee: empId}}));
  }, []);

  return (
    <>
    <CustomTable
      dataSource={gridData}
      loading={gettingAuditPayment}
      column={column}
      // onClickAdd={onClickAdd}
      // handleEditClick={handleEditClick}
      handleViewClick={handleViewClick}
      title={'Audit Outlet Approval List'}
    />
    
 
</>
  );
}
