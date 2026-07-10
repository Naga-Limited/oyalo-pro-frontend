import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router';
import CustomTable from '../../../components/CustomTable';
import {getServiceCategory} from '../../../@app/service/serviceSlice';

import {column} from './column';
export default function ServiceCategory() {
  const navigate = useNavigate();

  const onClickAdd = () => {
    navigate('/serviceCategory/addForm', {
      state: {}
    });
  };

  const handleEditClick = (data) => {
    navigate('/serviceCategory/addForm', {
      state: {data, isEdit: true}
    });
  };

  const {
    gettingServiceCategory,
    getServiceCategoryResponse: {data: dataSource}
  } = useSelector((state) => {
    return state.service;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getServiceCategory());
  }, [dispatch]);

  return (
    <CustomTable handleEditClick={handleEditClick} loading={gettingServiceCategory} dataSource={dataSource} column={column} onClickAdd={onClickAdd} title={'Service Category'} />
  );
}
