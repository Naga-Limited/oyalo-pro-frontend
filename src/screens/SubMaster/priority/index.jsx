import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router';
import {getPriority} from '../../../@app/service/serviceSlice';
import CustomTable from '../../../components/CustomTable';
import {column} from './column';
export default function Priority() {
  const navigate = useNavigate();

  const onClickAdd = () => {
    navigate('/priority/addForm', {
      state: {}
    });
  };

  const handleEditClick = (data) => {
    navigate('/priority/addForm', {
      state: {data, isEdit: true}
    });
  };

  const {
    gettingPriority,
    getPriorityResponse: {data: dataSource}
  } = useSelector((state) => {
    return state.service;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPriority());
  }, [dispatch]);

  return <CustomTable handleEditClick={handleEditClick} loading={gettingPriority} dataSource={dataSource} column={column} onClickAdd={onClickAdd} title={'Priority'} />;
}
