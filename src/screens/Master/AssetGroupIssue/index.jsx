import {filter, head} from 'ramda';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router';
import {getAssetGroupIssue} from '../../../@app/service/serviceSlice';
import CustomTable from '../../../components/CustomTable';
import {column} from './column';

export default function AssetGroupIssue() {
  const navigate = useNavigate();

  const onClickAdd = () => {
    navigate('/AssetGroupIssue/addForm', {
      state: {}
    });
  };

  const {
    gettingAssetGroupIssue,
    getAssetGroupIssueResponse: {
      data: dataSource
    }
  } = useSelector((state) => {
    return state.service;
  });

  const gridData = (dataSource ?? []).map((data) => {
    const {groupissues, ...restOfData} = data;
    const x = (groupissues ?? [])?.map((n) => {
      return n.name;
    });
    return {groupissues: x, ...restOfData};
  });

  const handleEditClick = (data) => {
    const editingData = filter((e) => e?.asset_group_id === data?.asset_group_id, dataSource);
    const {groupissues, asset_group_id, asset_group_status} = head(editingData);
    const processedGroupIssues = (groupissues ?? [])?.map((e) => {
      return {name: e.name, status: e.status};
    });
    navigate('/AssetGroupIssue/addForm', {
      state: {data: {id: data?.id, asset_group_issues: processedGroupIssues, asset_group_id, asset_group_status, mode: 'edit'}}
    });
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAssetGroupIssue());
  }, [dispatch]);

  return (
    <CustomTable handleEditClick={handleEditClick} loading={gettingAssetGroupIssue} dataSource={gridData} column={column} onClickAdd={onClickAdd} title={'Asset Group Issue'} />
  );
}
