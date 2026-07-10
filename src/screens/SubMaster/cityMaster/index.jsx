import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {useNavigate} from 'react-router';
import {getCity} from '../../../@app/subMaster/subMasterSlice';
import CustomTable from '../../../components/CustomTable';
import {column} from './column';
export default function CityMaster({setTopTitle}) {
  setTopTitle('City Master');
  const navigate = useNavigate();

  const onClickAdd = () => {
    navigate('/cityMaster/addForm', {
      state: {}
    });
  };

  const handleEditClick = (data) => {
    navigate('/cityMaster/addForm', {
      state: {data, isEdit: true}
    });
  };
  const {
    gettingCity,
    getCityResponse: {data: dataSource}
  } = useSelector((state) => {
    return state.subMaster;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCity());
  }, [dispatch]);

  return <CustomTable handleEditClick={handleEditClick} loading={gettingCity} dataSource={dataSource} column={column} onClickAdd={onClickAdd} title={'City Master'} />;
}
