import {find} from 'ramda';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {useNavigate} from 'react-router';
import {getAuditSubCategory} from '../../../@app/master/masterSlice';
import CustomTable from '../../../components/CustomTable';
import {column} from './column';

export default function AuditSubCategory({setTopTitle}) {
  setTopTitle('Audit Sub Category');
  const navigate = useNavigate();

  const onClickAdd = () => {
    navigate('/auditSubCategory/addForm', {
      state: {}
    });
  };

  const {
    gettingAuditSubCategory,
    getAuditSubCategoryResponse: {data: dataSource}
  } = useSelector((state) => {
    return state.master;
  });

  const gridData = (dataSource ?? []).map((data) => {
    const {audit_subcategory, ...restOfData} = data;
    const x = (audit_subcategory ?? [])?.map((n) => {
      return n.value;
    });
    return {audit_subcategory: x, ...restOfData};
  });

  const handleEditClick = (data) => {
    const editingData = find((e) => e?.auditcategory_id === data?.auditcategory_id, dataSource);

    const {audit_subcategory, auditcategory_id, auditcategory_status} = editingData;
    const processedSubCat = (audit_subcategory ?? [])?.map((e) => {
      return {name: e.value, status: e.status, id: e?.id};
    });

    navigate('/auditSubCategory/addForm', {
      state: {data: {auditcategory_id, audit_subcategory: processedSubCat, mode: 'edit', auditcategory_status}, isEdit: true}
    });
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAuditSubCategory());
  }, [dispatch]);

  // eslint-disable-next-line no-unused-vars

  return (
    <CustomTable handleEditClick={handleEditClick} loading={gettingAuditSubCategory} dataSource={gridData} column={column} onClickAdd={onClickAdd} title={'Audit Sub Category'} />
  );
}
