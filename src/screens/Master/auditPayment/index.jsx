import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router';
import {getAuditPayment} from '../../../@app/master/masterSlice';
import CustomTable from '../../../components/CustomTable';
import {column} from './column';

export default function AuditPayment({setTopTitle}) {
  setTopTitle('Audit Payment Master');
  const navigate = useNavigate();

  const onClickAdd = () => {
    navigate('/auditPayment/addForm', {
      state: {}
    });
  };

  const {
    gettingAuditPayment,
    getAuditPaymentResponse: {data: dataSource}
  } = useSelector((state) => {
    return state.master;
  });

  const handleEditClick = (data) => {
    navigate('/auditPayment/addForm', {
      state: {data, isEdit: true}
    });
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAuditPayment());
  }, []);

  // eslint-disable-next-line no-unused-vars

  return <CustomTable 
          loading={gettingAuditPayment} 
          handleEditClick={handleEditClick} 
          dataSource={dataSource} 
          column={column} 
          onClickAdd={onClickAdd} 
          title={'Audit'} />;
}
