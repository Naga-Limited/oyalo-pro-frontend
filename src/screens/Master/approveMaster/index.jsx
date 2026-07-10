import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router';
import {getApprove} from '../../../@app/subMaster/subMasterSlice';
import CustomTable from '../../../components/CustomTable';
import {column} from './column';
export default function ApproveMaster({setTopTitle}) {
  setTopTitle('License Approve');
  const navigate = useNavigate();

  // const onClickAdd = () => {
  //   navigate('/renewalMaster/addForm', {  
  //     state: {}
  //   });
  // };

  const handleEditClick = (data) => {
    navigate('/approveMaster/addForm', {
      state: {data, isEdit: true}
    });
  };
  const {
    gettingApprove,
    getApproveResponse: {data: dataSource}    
  } = useSelector((state) => {
    return state.subMaster;
  });

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getApprove());
  }, []);

  return <CustomTable handleEditClick={handleEditClick} loading={gettingApprove} dataSource={dataSource} column={column}  title={'Approve License'} />;
}
