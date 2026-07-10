import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router';
//import {getAuditCategory} from '../../../@app/master/masterSlice';
import {getAuditPointsImage} from '../../../@app/master/masterSlice';
import CustomTable from '../../../components/CustomTable';
import {column} from './column';
export default function AuditPointsImage({setTopTitle}) {
  setTopTitle('Audit Points Training');
  const navigate = useNavigate();
  const onClickAdd = () => {
    navigate('/auditPointsImage/addForm', {
      state: {}
    });
  };
  const {
    gettingAuditPointsImage,
   // gettingAuditCategoryPointList,
    getAuditPointsImageResponse: {data: dataSource}
  // getAuditCategoryPointListResponse: {data: dataSource}
  } = useSelector((state) => {
    return state.master;
  });
  const handleEditClick = (data) => {
    navigate('/auditPointsImage/addForm', {
      state: {data, isEdit: true}
    });
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAuditPointsImage());
  }, []);
  // eslint-disable-next-line no-unused-vars
  return <CustomTable 
           loading={gettingAuditPointsImage} 
           handleEditClick={handleEditClick} 
           dataSource={dataSource} 
           column={column} 
           onClickAdd={onClickAdd} 
           title={'Audit Points Image'} />;
}
