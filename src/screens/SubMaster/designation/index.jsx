import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {useNavigate} from 'react-router';
import {getDesignation} from '../../../@app/subMaster/subMasterSlice';
import CustomTable from '../../../components/CustomTable';
import {column} from './column';
export default function Designation({setTopTitle}) {
  setTopTitle('Designation');
  const navigate = useNavigate();

  const onClickAdd = () => {
    navigate('/designation/addForm', {
      state: {}
    });
  };

  const handleEditClick = (data) => {
    navigate('/designation/addForm', {
      state: {data, isEdit: true}
    });
  };

  const {
    gettingDesignation,
    getDesignationResponse: {data: dataSource}
  } = useSelector((state) => {
    return state.subMaster;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDesignation());
  }, [dispatch]);

  return <CustomTable handleEditClick={handleEditClick} loading={gettingDesignation} dataSource={dataSource} column={column} onClickAdd={onClickAdd} title={'Designation'} />;
}
