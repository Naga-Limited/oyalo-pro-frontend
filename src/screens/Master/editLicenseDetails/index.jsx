import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router';
import {getEditLicense} from '../../../@app/subMaster/subMasterSlice';
import CustomTable from '../../../components/CustomTable';
import {column} from './column';
export default function EditLicenseDetails({setTopTitle}) {
  setTopTitle('Edit License Details');
  const navigate = useNavigate();

  

  const handleEditClick = (data) => {
    navigate('/editLicense/editForm', {
      state: {data, isEdit: true}
    });
  };
  const {
    gettingEditLicense,
    getEditLicenseResponse: {data: dataSource}    
  } = useSelector((state) => {
    return state.subMaster;
  });
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getEditLicense());
  }, []);

  return <CustomTable handleEditClick={handleEditClick} loading={gettingEditLicense} dataSource={dataSource} column={column}  title={'Edit License Details'} />;
}
