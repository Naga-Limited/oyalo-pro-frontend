import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router';
import {getTypeOfService} from '../../../@app/service/serviceSlice';
import CustomTable from '../../../components/CustomTable';
import {column} from './column';
export default function TypeOfService() {
  const navigate = useNavigate();

  const onClickAdd = () => {
    navigate('/typeOfService/addForm', {
      state: {}
    });
  };

  const handleEditClick = (data) => {
    navigate('/typeOfService/addForm', {
      state: {data, isEdit: true}
    });
  };

  const {
    gettingTypeOfService,
    getTypeOfServiceResponse: {data: dataSource}
  } = useSelector((state) => {
    return state.service;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTypeOfService());
  }, [dispatch]);

  return <CustomTable handleEditClick={handleEditClick} loading={gettingTypeOfService} dataSource={dataSource} column={column} onClickAdd={onClickAdd} title={'Type Of Service'} />;
}
