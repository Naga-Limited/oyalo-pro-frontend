import React, {useEffect} from 'react';
import {useDispatch , useSelector} from 'react-redux';
import {useNavigate} from 'react-router';
import {getGlAccount} from '../../../@app/service/serviceSlice';
import CustomTable from '../../../components/CustomTable';
import {column} from './column';
export default function Glaccount() {
  const navigate = useNavigate();

  const onClickAdd = () => {
    navigate('/glaccountForm', {
      state: {}
    });
  };

  const handleEditClick = (data) => {
    navigate('/glaccountForm', {
      state: {data, isEdit: true}
    });
  };

  const {
    gettingGlAccount,
    getGlAccountResponse: {data: dataSource}
  } = useSelector((state) => {
    return state.service;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGlAccount());
  }, [dispatch]);


  return <CustomTable handleEditClick={handleEditClick} loading={gettingGlAccount} dataSource={dataSource} column={column} onClickAdd={onClickAdd} title={'Type Of Service'} />;

}
