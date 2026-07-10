import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
//import {useNavigate} from 'react-router';
import {getLicenseReport} from '../../../@app/subMaster/subMasterSlice';
import CustomTable from '../../../components/CustomTable';
import {column} from './column';
export default function LicenseReport({setTopTitle}) {
  setTopTitle('License Report');
  //const navigate = useNavigate();


  const {
    gettingLicenseReport,
    getLicenseReportResponse: {data: dataSource}    
  } = useSelector((state) => {
    return state.subMaster;
  });

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getLicenseReport());
  }, []);

  return <CustomTable  loading={gettingLicenseReport} dataSource={dataSource} column={column}  title={'License Report'} />;
}
