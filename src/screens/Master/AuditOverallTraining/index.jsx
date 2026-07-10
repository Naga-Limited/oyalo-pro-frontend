import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router';
//import {getAuditCategory} from '../../../@app/master/masterSlice';
import {getAuditfile} from '../../../@app/master/masterSlice';
import CustomTable from '../../../components/CustomTable';
import {column} from './column';
export default function AuditOverallTraining({setTopTitle}) {
  setTopTitle('Audit Overall Training Master');
  const navigate = useNavigate();
  const onClickAdd = () => {
    navigate('/AuditOverallTraining/addForm', {
      state: {}
    });
  };
  const {
    gettingAuditfile,
    getAuditfileResponse: {data:dataSource}
   } = useSelector((state) => {
    return state.master;
  });
  const handleEditClick = (data) => {
    navigate('/AuditOverallTraining/addForm', {
      state: {data, isEdit: true}
    });
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAuditfile());
  }, []);

  // eslint-disable-next-line no-unused-vars
  return <CustomTable 
           loading={gettingAuditfile} 
           handleEditClick={handleEditClick} 
           dataSource={dataSource} 
           column={column} 
           onClickAdd={onClickAdd} 
           title={'Audit Overall Training'} />;
}
