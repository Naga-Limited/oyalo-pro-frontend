import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {differenceInDays, format} from 'date-fns';
import {useNavigate} from 'react-router';
import {getApproval} from '../../../@app/entry/entrySlice';
import CustomTable from '../../../components/CustomTable';
import {column} from './column';
export default function AuditApproval({setTopTitle}) {
  setTopTitle('Approval');
  const {
    getApprovalList: {data: dataSource}
  } = useSelector((state) => state.entry);
  const {type, userData} = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const empId = userData.data?.id;

  const onClickAdd = () => {
    navigate('/auditApproval/addForm', {
      state: {}
    });
  };

  const handleEditClick = (data) => {
    navigate('/auditApproval/addForm', {
      state: {data}
    });
  };

  const gridData = (dataSource ?? []).map((e) => {
    const agingDays = `${differenceInDays(new Date(), new Date(e?.created_at)) ?? 0} day(s)`;
    return {...e, agingDays, agentName: 'Admin', waiting: e?.status === '1' ? 'Waiting for approval' : 'CAPA Submitted', created_at: format(new Date(e?.created_at), 'MM/dd/yyyy')};
  });

  useEffect(() => {
    if (type === 1) dispatch(getApproval({path: 'get-approval-audit', data: {limit: 400, offset: 0}}));
    else dispatch(getApproval({path: 'get-employee-approval-audit', data: {limit: 400, offset: 0, employee: empId}}));
  }, []);

  return <CustomTable handleEditClick={handleEditClick} dataSource={gridData} column={column} onClickAdd={onClickAdd} title={'Approval List'} />;
}
