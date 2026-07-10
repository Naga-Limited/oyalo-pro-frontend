import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {useNavigate} from 'react-router';
import {getDivision} from '../../../@app/subMaster/subMasterSlice';
import CustomTable from '../../../components/CustomTable';
import {column} from './column';
export default function Division({setTopTitle}) {
  setTopTitle('Division');
  const navigate = useNavigate();

  const onClickAdd = () => {
    navigate('/division/addForm', {
      state: {}
    });
  };

  const handleEditClick = (data) => {
    navigate('/division/addForm', {
      state: {data, isEdit: true}
    });
  };

  const {
    gettingDivision,
    getDivisionResponse: {data: dataSource}
  } = useSelector((state) => {
    return state.subMaster;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDivision());
  }, [dispatch]);

  return <CustomTable handleEditClick={handleEditClick} loading={gettingDivision} dataSource={dataSource} column={column} onClickAdd={onClickAdd} title={'Division'} />;
}
