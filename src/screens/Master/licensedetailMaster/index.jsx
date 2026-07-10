
// import React, {useEffect} from 'react';
// import {useDispatch, useSelector} from 'react-redux';
// //import {Card, Button, Radio, Col, Row, Form, Input} from 'antd';
// import {useNavigate} from 'react-router';
// import {getLicenseDetails} from '../../../@app/master/masterSlice';
// import CustomTable from '../../../components/CustomTable';
// import {column} from './column';


// export default function licenseDetails({setTopTitle}) {
//   setTopTitle('License Details');
//   const navigate = useNavigate();

//   const onClickAdd = () => {
//     navigate('/licenseDetails/addForm', {
//       state: {}
//     });
//   };

//   const {
//     gettingLicenseDetails,
//     getLicenseDetailsResponse: {data: dataSource}
//   } = useSelector((state) => {
//     return state.master;
//   });

//   const handleEditClick = (data) => {
//     navigate('/licenseDetails/addForm', {
//       state: {data, isEdit: true}
//     });
//   };

//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(getLicenseDetails());
//   }, []);

//   // eslint-disable-next-line no-unused-vars

//   return (
//     <> 
//     <CustomTable loading={gettingLicenseDetails} handleEditClick={handleEditClick} dataSource={dataSource} column={column} onClickAdd={onClickAdd} title={'License Details'} />
//      </>
//   );
// }
// import {find} from 'ramda';
// import React, {useEffect} from 'react';
// import {useDispatch, useSelector} from 'react-redux';

// import {useNavigate} from 'react-router';
// import {getLicenseDetails} from '../../../@app/master/masterSlice';
// import CustomTable from '../../../components/CustomTable';
// import {column} from './column';

// export default function licenseDetails({setTopTitle}) {
//   setTopTitle('License Details ');
//   const navigate = useNavigate();

//   const onClickAdd = () => {
//     navigate('/licensedetailMaster/addForm', {
//       state: {}
//     });
//   };

//   const {
//     gettingLicenseDetails,
//     getLicenseDetailsResponse: {data: dataSource}
//   } = useSelector((state) => {
//     return state.master;
//   });

//   const gridData = (dataSource ?? []).map((data) => {
//     const {license, ...restOfData} = data;
//     const x = (license ?? [])?.map((n) => {
//       return n.value;
//     });
//     return {license: x, ...restOfData};
//   });

//   const handleEditClick = (data) => {
//     const editingData = find((e) => e?.zone_id === data?.zone_id, dataSource);

//     const {license, outlet_id,zone_id, outlet_status} = editingData;
//     const processedSubCat = (license ?? [])?.map((e) => {
//       return {name: e.value, status: e.status, id: e?.id};
//     });

//     navigate('/licensedetailMaster/addForm', {
//       state: {data: {outlet_id,zone_id, license: processedSubCat, mode: 'edit', outlet_status}, isEdit: true}
//     });
//   };

//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(getLicenseDetails());
//   }, []);

//   // eslint-disable-next-line no-unused-vars

//   return (
//     <CustomTable handleEditClick={handleEditClick} loading={gettingLicenseDetails} dataSource={gridData} column={column} onClickAdd={onClickAdd} title={'License Details'} />
//   );
// }


import {find} from 'ramda';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {useNavigate} from 'react-router';
import {getLicenseDetails} from '../../../@app/master/masterSlice';
import CustomTable from '../../../components/CustomTable';
import {column} from './column';

export default function LicenseDetails({setTopTitle}) {
  setTopTitle('Add License');
  const navigate = useNavigate();

  const onClickAdd = () => {
    navigate('/licensedetailMaster/addForm', {
      state: {}
    });
  };

  const {
    gettingLicenseDetails,
    getLicenseDetailsResponse: {data: dataSource}
  } = useSelector((state) => {
    return state.master;
  });

  const gridData = (dataSource ?? []).map((data) => {
    const {license, ...restOfData} = data;
    const x = (license ?? [])?.map((n) => {
      return n.value;
    });
    return {license: x, ...restOfData};
  });

  const handleEditClick = (data) => {
    const editingData = find((e) => e?.outlet_id === data?.outlet_id, dataSource);

    const {license,zone_id,subzone_id,outlet_id, outlet_status} = editingData;
    const processedSubCat = (license ?? [])?.map((e) => {
      return {name: e.value, status: e.status, id: e?.id,license_start_date: e.license_start_date,license_reg_no: e.license_reg_no,license_app_no: e.license_app_no,license_end_date: e.license_end_date,license_type_id: e.license_type_id,remarks: e.remarks,license_renewal_date:e.license_renewal_date};
    });

    navigate('/licensedetailMaster/addForm', {
      state: {data: {outlet_id,zone_id,subzone_id,license: processedSubCat, mode: 'edit', outlet_status}, isEdit: true}
    });
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLicenseDetails());
  }, []);

  // eslint-disable-next-line no-unused-vars

  return (
    <CustomTable handleEditClick={handleEditClick} loading={gettingLicenseDetails} dataSource={gridData} column={column} onClickAdd={onClickAdd} title={'License Details Master'} />
  );
}