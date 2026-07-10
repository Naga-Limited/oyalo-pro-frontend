import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router';
//import {getAuditCategory} from '../../../@app/master/masterSlice';
import {getAuditType} from '../../../@app/master/masterSlice';
import CustomTable from '../../../components/CustomTable';
import {column} from './column';
export default function AuditTypeMaster({setTopTitle}) {
  setTopTitle('Audit Category Type Master');
  const navigate = useNavigate();
  const onClickAdd = () => {
    navigate('/AuditFileType/addForm', {
      state: {}
    });
  };
  const {
    gettingAuditType,
    getAuditTypeResponse: {data:dataSource}
   } = useSelector((state) => {
    return state.master;
  });
  const handleEditClick = (data) => {
    navigate('/AuditFileType/addForm', {
      state: {data, isEdit: true}
    });
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAuditType());
  }, []);

  // eslint-disable-next-line no-unused-vars
  return <CustomTable 
           loading={gettingAuditType} 
           handleEditClick={handleEditClick} 
           dataSource={dataSource} 
           column={column} 
           onClickAdd={onClickAdd} 
           title={'Audit Category Type Master'} />;
}
