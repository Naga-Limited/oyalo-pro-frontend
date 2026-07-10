import {differenceInDays, format} from 'date-fns';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router';
import {getAuditEntry} from '../../../@app/entry/entrySlice';
import CustomTable from '../../../components/CustomTable';
import {column} from './column';

export default function AuditEntry({setTopTitle}) {
  setTopTitle('Entry');
  const {
    getAuditEntry: {data: dataSource},
    gettingAuditEntry
  } = useSelector((state) => state.entry);
  const {type, userData} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClickAdd = () => {
    navigate('/auditEntry/addForm');
  };

  const handleEditClick = (e) => {
    navigate('/auditEntry/editForm', {
      state: e
    });
  };
  const {
    userData: {data: authData}
  } = useSelector((state) => {
    return state.auth;
  });

  const gridData = (dataSource ?? [])
    .map((e) => {
      const agingDays = `${differenceInDays(new Date().getTime(), new Date(e?.created_at).getTime()) ?? 0} day(s)`;
      const auditType = e?.audit_type === '1' ? 'Full Audit' : 'Category Wise';
      return {
        ...e,
        auditType,
        agingDays,
        waitingFor: 'Recheck',
        agentName: authData?.name ?? 'Admin',
        waiting: 'Approval',
        created_at: format(new Date(e?.created_at), 'dd/MM/yyyy')
      };
    })
    ?.filter((e) => e.status === '3');

  const empId = userData.data?.id;

  useEffect(() => {
    if (type === 1) dispatch(getAuditEntry({path: 'get-audit-entry', data: {limit: 400, offset: 0}}));
    else dispatch(getAuditEntry({path: 'get-employee-audit-entry', data: {limit: 400, offset: 0, employee: empId}}));
  }, []);

  return <CustomTable loading={gettingAuditEntry} dataSource={gridData} handleEditClick={handleEditClick} column={column} onClickAdd={onClickAdd} title={'Entry List'} />;
}
