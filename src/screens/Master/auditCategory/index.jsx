import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router';
import {getAuditCategory} from '../../../@app/master/masterSlice';
import CustomTable from '../../../components/CustomTable';
import {column} from './column';

export default function AuditCategory({setTopTitle}) {
  setTopTitle('Audit Category');
  const navigate = useNavigate();

  const onClickAdd = () => {
    navigate('/auditCategory/addForm', {
      state: {}
    });
  };

  const {
    gettingAuditCategory,
    getAuditCategoryResponse: {data: dataSource}
  } = useSelector((state) => {
    return state.master;
  });

  const handleEditClick = (data) => {
    navigate('/auditCategory/addForm', {
      state: {data, isEdit: true}
    });
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAuditCategory());
  }, [dispatch]);

  // eslint-disable-next-line no-unused-vars

  return <CustomTable loading={gettingAuditCategory} handleEditClick={handleEditClick} dataSource={dataSource} column={column} onClickAdd={onClickAdd} title={'Audit'} />;
}
