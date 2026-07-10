import {isPast, isFuture} from 'date-fns';
import {format} from 'date-fns';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {useNavigate} from 'react-router';
import {getAuditPointListMark} from '../../../@app/master/masterSlice';
import CustomTable from '../../../components/CustomTable';
import {column} from './column';
export default function AuditPointImageTrain({setTopTitle}) {
  setTopTitle('Audit point Marks');
  const navigate = useNavigate();

  const {
    gettingAuditPointListMark,
    getAuditPointListMarkResponse: {data: dataSource}
  } = useSelector((state) => {
    return state.master;
  });

  const gridData = (dataSource ?? []).map((e) => {
    let currentDate = format(new Date(e?.currentDate), 'dd/MM/yyyy');
    let from_date = format(new Date(e?.from_date), 'dd/MM/yyyy');
    let to_date = format(new Date(e?.to_date), 'dd/MM/yyyy');
    let status = isPast(new Date(e?.from_date)) && isFuture(new Date(e?.to_date));
    return {
      ...e,
      currentDate,
      from_date,
      to_date,
      status
    };
  });

  const onClickAdd = () => {
    navigate('/auditTraining/addForm');
  };

  const handleViewClick = (data) => {
    navigate('/auditTraining/view', {
      state: {...data}
    });
  };

  const handleEditClick = (data) => {
    navigate('/auditTraining/addForm', {
      state: {...data, edit: true}
    });
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAuditPointListMark());
  }, []);

  return (
    <CustomTable
      dataSource={gridData}
      loading={gettingAuditPointListMark}
      column={column}
      onClickAdd={onClickAdd}
      handleEditClick={handleEditClick}
      handleViewClick={handleViewClick}
      title={'Audit Points'}
    />
  );
}
