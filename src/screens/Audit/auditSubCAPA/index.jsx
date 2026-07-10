import {differenceInDays, format} from 'date-fns';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getCapa} from '../../../@app/entry/entrySlice';
import CustomTable from '../../../components/CustomTable';
import {column} from './column';

export default function AuditCAPA({setTopTitle}) {
  setTopTitle('CAPA');
  const {
    getCapaList: {data: dataSource}
  } = useSelector((state) => state.entry);
  const {type, userData} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const empId = userData.data?.id;

  const gridData = (dataSource ?? []).map((e) => {
    const agingDays = `${differenceInDays(new Date(), new Date(e?.created_at)) ?? 0} day(s)`;
    return {...e, agingDays, agentName: 'Admin', waiting: 'CAPA Failed', created_at: format(new Date(e?.created_at), 'dd/MM/yyyy')};
  });

  useEffect(() => {
    if (type === 1) dispatch(getCapa({path: 'get-capa-audit', data: {limit: 400, offset: 0}}));
    else dispatch(getCapa({path: 'get-employee-capa-audit', data: {limit: 400, offset: 0, employee: empId}}));
  }, []);

  return <CustomTable dataSource={gridData} column={column} title={'CAPA Submission List'} />;
}
