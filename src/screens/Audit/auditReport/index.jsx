import {differenceInDays, format} from 'date-fns';
import {flatten} from 'ramda';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getApprovalReport} from '../../../@app/entry/entrySlice';
import CustomTable from '../../../components/CustomTable';
import {column} from './column';

export default function AuditReport({setTopTitle}) {
  setTopTitle('Report');
  const {
    gettingApprovalReport,
    getApprovalReport: {data: dataSource}
  } = useSelector((state) => state.entry);
  const {type, userData} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const empId = userData.data?.id;

  const gridData = flatten(dataSource ?? []).map((e) => {
    const agingDays = `${differenceInDays(new Date(), new Date(e?.created_ate?.created_at ?? new Date())) ?? 0} day(s)`;
    const auditType = e?.audit_type === '1' ? 'Full Audit' : 'Category Wise';
    const Status = 'Reported';
    return {...e, auditType, agingDays, Status, agentName: 'Admin', created_at: format(new Date(e?.created_at ?? new Date()), 'dd/MM/yyyy')};
  });

  useEffect(() => {
    if (type === 1) dispatch(getApprovalReport({path: 'get-approval-report', data: {limit: 400, offset: 0}}));
    else dispatch(getApprovalReport({path: 'get-employee-approval-report', data: {limit: 400, offset: 0, employee: empId}}));
  }, []);

  return <CustomTable loading={gettingApprovalReport} dataSource={gridData} column={column} title={'Audit Report'} />;
}
