import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router';
import {getActiveLicense} from '../../../@app/subMaster/subMasterSlice';
import CustomTable from '../../../components/CustomTable';
import {column} from './column';
export default function ActiveLicense({setTopTitle}) {
  setTopTitle('Add License Details');
  const navigate = useNavigate();

  const onClickAdd = () => {
    navigate('/license/addForm', {
      state: {}
    });
  };

  const handleEditClick = (data) => {
    navigate('/license/addForm', {
      state: {data, isEdit: true}
    });
  };
  const {
    gettingActiveLicense,
    getActiveLicenseResponse: {data: dataSource}    
  } = useSelector((state) => {
    return state.subMaster;
  });

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getActiveLicense());
  }, []);

  return <CustomTable handleEditClick={handleEditClick} loading={gettingActiveLicense} dataSource={dataSource} column={column}  onClickAdd={onClickAdd}  title={'Add License Details'} />;
}
