import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router';
import {getRoleMaster} from '../../../@app/master/masterSlice';
import CustomTable from '../../../components/CustomTable';
import {column} from './column';

export default function RoleMaster({setTopTitle}) {
  setTopTitle('Role Master');
  // getRoleMaster;
  const navigate = useNavigate();

  const onClickAdd = () => {
    navigate('/roleMaster/addForm', {
      state: {}
    });
  };

  const {
    gettingRoleMaster,
    getRoleMasterResponse: {data: dataSource}
  } = useSelector((state) => {
    return state.master;
  });

  const gridData = (dataSource ?? []).map((data) => {
    const {role_response, ...restOfData} = data;
    const processedRole = (role_response ?? [])?.map((n) => {
      return n.name;
    });
    return {role_response: processedRole, ...restOfData};
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRoleMaster());
  }, [dispatch]);

  return <CustomTable loading={gettingRoleMaster} dataSource={gridData} column={column} onClickAdd={onClickAdd} title={'Role Master'} />;
}
