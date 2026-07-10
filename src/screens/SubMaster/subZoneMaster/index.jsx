import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {useNavigate} from 'react-router';
import {getSubZonal} from '../../../@app/subMaster/subMasterSlice';
import CustomTable from '../../../components/CustomTable';
import {column} from './column';
export default function SubZoneMaster({setTopTitle}) {
  setTopTitle('Sub Zone Master');
  const navigate = useNavigate();

  const onClickAdd = () => {
    navigate('/subZoneMaster/addForm', {
      state: {}
    });
  };

  const handleEditClick = (data) => {
    navigate('/subZoneMaster/addForm', {
      state: {data, isEdit: true}
    });
  };

  const {
    gettingSubZonal,
    getSubZonalResponse: {data: dataSource}
  } = useSelector((state) => {
    return state.subMaster;
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSubZonal());
  }, [dispatch]);

  return <CustomTable handleEditClick={handleEditClick} loading={gettingSubZonal} dataSource={dataSource} column={column} onClickAdd={onClickAdd} title={'SubZone Master'} />;
}
