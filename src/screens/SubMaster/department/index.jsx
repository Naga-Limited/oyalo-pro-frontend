import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {useNavigate} from 'react-router';
import {getDepartment} from '../../../@app/subMaster/subMasterSlice';
import CustomTable from '../../../components/CustomTable';
import {column} from './column';
export default function Department({setTopTitle}) {
  setTopTitle('Department');
  const navigate = useNavigate();

  const onClickAdd = () => {
    navigate('/department/addForm', {
      state: {}
    });
  };

  const handleEditClick = (data) => {
    navigate('/department/addForm', {
      state: {data, isEdit: true}
    });
  };

  const {
    gettingDepartment,
    getDepartmentResponse: {data: dataSource}
  } = useSelector((state) => {
    return state.subMaster;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDepartment());
  }, [dispatch]);

  return <CustomTable handleEditClick={handleEditClick} loading={gettingDepartment} dataSource={dataSource} column={column} onClickAdd={onClickAdd} title={'Department'} />;
}
