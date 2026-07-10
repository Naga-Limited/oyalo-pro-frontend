import {filter, head} from 'ramda';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router';
import {getAssetGroupSpare} from '../../../@app/service/serviceSlice';
import CustomTable from '../../../components/CustomTable';
import {column} from './column';

export default function AssetGroupSpare() {
  const navigate = useNavigate();

  const onClickAdd = () => {
    navigate('/AssetGroupSpare/addForm', {
      state: {}
    });
  };

  const {
    gettingAssetGroupSpare,
    getAssetGroupSpareResponse: {data: dataSource}
  } = useSelector((state) => {
    return state.service;
  });

  const gridData = (dataSource ?? []).map((data) => {
    const {asset_group_name, assetspares, ...restOfData} = data;
    const x = (assetspares ?? [])?.map((n) => {
      return n.name;
    });
    return {processedAssetSpares: x, asset_group_name, ...restOfData};
  });

  const handleEditClick = (data) => {
    const editingData = filter((e) => e?.asset_group_id === data?.asset_group_id, dataSource ?? []);
    const {assetspares, asset_group_id, asset_group_status} = head(editingData);
    const processedGroupSpare = (assetspares ?? [])?.map((e) => {
      return {name: e.name, status: e.status};
    });
    navigate('/AssetGroupSpare/addForm', {
      state: {data: {id: data?.id, asset_group_spares: processedGroupSpare, asset_group_id, asset_group_status, mode: 'edit'}}
    });
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAssetGroupSpare());
  }, [dispatch]);

  return (
    <CustomTable handleEditClick={handleEditClick} loading={gettingAssetGroupSpare} dataSource={gridData} column={column} onClickAdd={onClickAdd} title={'Asset Group Spare'} />
  );
}
