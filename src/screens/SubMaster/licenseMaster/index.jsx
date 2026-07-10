import React, {useEffect} from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router';
import {getLicense} from '../../../@app/subMaster/subMasterSlice';
import CustomTable from '../../../components/CustomTable';
import {column} from './column';

export default function LicenseMaster({setTopTitle}) {
  setTopTitle('License Master');
  const navigate = useNavigate();
  
  const onClickAdd = () => {
    navigate('/licenseMaster/addForm', {
      state: {}
    });
  };

  const handleEditClick = (data) => {
    navigate('/licenseMaster/addForm', {
      state: {data, isEdit: true}
    });
  };
  const {
    gettingLicense,
    getLicenseResponse: {data: dataSource}    
  } = useSelector((state) => {
    return state.subMaster;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLicense());
  }, []);

  return <CustomTable handleEditClick={handleEditClick} loading={gettingLicense} dataSource={dataSource} column={column} onClickAdd={onClickAdd} title={'License Master'} />;
}
