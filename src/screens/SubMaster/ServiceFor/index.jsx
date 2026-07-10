import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router';
import {getServiceFor} from '../../../@app/service/serviceSlice';
import CustomTable from '../../../components/CustomTable';
import {column} from './column';
export default function ServiceFor() {
  const navigate = useNavigate();

  const onClickAdd = () => {
    navigate('/serviceFor/addForm', {
      state: {}
    });
  };

  const handleEditClick = (data) => {
    navigate('/serviceFor/addForm', {
      state: {data, isEdit: true}
    });
  };

  const {
    gettingServiceFor,
    getServiceForResponse: {data: dataSource}
  } = useSelector((state) => {
    return state.service;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getServiceFor());
  }, [dispatch]);

  return <CustomTable handleEditClick={handleEditClick} loading={gettingServiceFor} dataSource={dataSource} column={column} onClickAdd={onClickAdd} title={'Service For'} />;
}
