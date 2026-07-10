import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router';
import {getWorkDone} from '../../../@app/service/serviceSlice';
import CustomTable from '../../../components/CustomTable';
import {column} from './column';
export default function WorkDone() {
  const navigate = useNavigate();

  const onClickAdd = () => {
    navigate('/workDone/addForm', {
      state: {}
    });
  };

  const handleEditClick = (data) => {
    navigate('/workDone/addForm', {
      state: {data, isEdit: true}
    });
  };

  const {
    gettingWorkDone,
    getWorkDoneResponse: {data: dataSource}
  } = useSelector((state) => {
    return state.service;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWorkDone());
  }, [dispatch]);

  return <CustomTable handleEditClick={handleEditClick} loading={gettingWorkDone} dataSource={dataSource} column={column} onClickAdd={onClickAdd} title={'Work Done'} />;
}
