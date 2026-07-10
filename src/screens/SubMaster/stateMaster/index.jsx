import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router';
import {getStates} from '../../../@app/subMaster/subMasterSlice';
import CustomTable from '../../../components/CustomTable';
import {column} from './column';
export default function StateMaster({setTopTitle}) {
  setTopTitle('State Master');
  const navigate = useNavigate();

  const {
    gettingState,
    getStatesResponse: {data: dataSource}
  } = useSelector((state) => {
    return state.subMaster;
  });

  const handleEditClick = (data) => {
    navigate('/stateMaster/addForm', {
      state: {data, isEdit: true}
    });
  };

  const onClickAdd = () => {
    navigate('/stateMaster/addForm', {
      state: {}
    });
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStates());
  }, [dispatch]);

  return <CustomTable handleEditClick={handleEditClick} loading={gettingState} dataSource={dataSource} column={column} onClickAdd={onClickAdd} title={'State Master'} />;
}
