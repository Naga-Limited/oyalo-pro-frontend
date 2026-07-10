import {find} from 'ramda';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {useNavigate} from 'react-router';
import {getAuditPointList} from '../../../@app/master/masterSlice';
import CustomTable from '../../../components/CustomTable';
import {column} from './column';

export default function AuditPointList({setTopTitle}) {
  setTopTitle('Audit Point List');
  const navigate = useNavigate();

  const {
    gettingAuditPointList,
    getAuditPointListResponse: {data: dataSource}
  } = useSelector((state) => {
    return state.master;
  });

  const onClickAdd = () => {
    navigate('/auditPointList/addForm', {
      state: {}
    });
  };

  const handleEditClick = (data) => {
    const editingData = find((e) => e?.auditsubcategory_id === data?.auditsubcategory_id, dataSource?.pointlist ?? []);

    const {pointlist, ...restOfData} = editingData;
    const processedSubCat = (pointlist ?? [])?.map((e) => {
      return {name: e.name, status: e.status, id: e?.id};
    });
    navigate('/auditPointList/addForm', {
      state: {data: {...restOfData, audit_pointlists: processedSubCat, mode: 'edit'}, isEdit: true}
    });
  };

  const gridData = (dataSource?.pointlist ?? []).map((data) => {
    const {pointlist, ...restOfData} = data;
    const processedPointList = (pointlist ?? [])?.map((n) => {
      return n.name;
    });
    return {
      audit_pointlist: processedPointList,
      ...restOfData
    };
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAuditPointList());
  }, [dispatch]);

  return <CustomTable dataSource={gridData} loading={gettingAuditPointList} handleEditClick={handleEditClick} column={column} onClickAdd={onClickAdd} title={'Audit Point List'} />;
}
