import React, {useEffect} from 'react';
import {useNavigate} from 'react-router';
import CustomTable from '../../../components/CustomTableReport';
import {column} from './column';
import {getCustomerMaster} from '../../../@app/subMaster/subMasterSlice';
import {useDispatch, useSelector} from 'react-redux';

export default function CustomerMaster({setTopTitle}) {
  setTopTitle('Customer Master');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClickAdd = () => {
    navigate('/customerMaster/addForm');
  };

  // const handleEditClick = (data) => {
  //   navigate('/customerMaster/addForm', {
  //     state: {data, isEdit: true}
  //   });
  // };


  const handleEditClick = (e) => {
    navigate("/customerMaster/addForm", {
      state: e
    });
  };

  useEffect(() => {
    dispatch(getCustomerMaster());
  }, []);

  const {
    gettingCustomerMaster,
    getCustomerMasterResponse: {data: dataSource}
  } = useSelector((state) => {
    return state.subMaster;
  });

  return <CustomTable 
              loading={gettingCustomerMaster} 
              dataSource={dataSource} 
              column={column} 
              handleEditClick={handleEditClick} 
              onClickAdd={onClickAdd} 
              title={'Customer Master'} 
        />;
}
