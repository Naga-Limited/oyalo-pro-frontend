import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router';
import {getRenewal} from '../../../@app/subMaster/subMasterSlice';
import CustomTable from '../../../components/CustomTable';
import {column} from './column';
export default function RenewalMaster({setTopTitle}) {
  setTopTitle('License Renewal');
  const navigate = useNavigate();

  // const onClickAdd = () => {
  //   navigate('/renewalMaster/addForm', {  
  //     state: {}
  //   });
  // };

  const handleEditClick = (data) => {
    navigate('/renewalMaster/addForm', {
      state: {data, isEdit: true}
    });
  };
  const {
    gettingRenewal,
    getRenewalResponse: {data: dataSource}    
  } = useSelector((state) => {
    return state.subMaster;
  });

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getRenewal());
  }, []);

  return <CustomTable handleEditClick={handleEditClick} loading={gettingRenewal} dataSource={dataSource} column={column}  title={'License Renewal'} />;
}
