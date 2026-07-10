import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router';
import {getModeOfPayment} from '../../../@app/service/serviceSlice';
import CustomTable from '../../../components/CustomTable';
import {column} from './column';
export default function ModeOfPayment() {
  const navigate = useNavigate();

  const onClickAdd = () => {
    navigate('/modeOfPayment/addForm', {
      state: {}
    });
  };

  const handleEditClick = (data) => {
    navigate('/modeOfPayment/addForm', {
      state: {data, isEdit: true}
    });
  };

  const {
    gettingModeOfPayment,
    getModeOfPaymentResponse: {data: dataSource}
  } = useSelector((state) => {
    return state.service;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getModeOfPayment());
  }, [dispatch]);

  return <CustomTable handleEditClick={handleEditClick} loading={gettingModeOfPayment} dataSource={dataSource} column={column} onClickAdd={onClickAdd} title={'Mode of Payment'} />;
}
