import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router';
import {getPeriod} from '../../../@app/subMaster/subMasterSlice';
import CustomTable from '../../../components/CustomTable';
import {column} from './column';
export default function PeriodMaster({setTopTitle}) {
  setTopTitle('Period Master');
  const navigate = useNavigate();

  const onClickAdd = () => {
    navigate('/periodMaster/addForm', {  
      state: {}
    });
  };

  const handleEditClick = (data) => {
    navigate('/periodMaster/addForm', {
      state: {data, isEdit: true}
    });
  };
  const {
    gettingPeriod,
    getPeriodResponse: {data: dataSource}    
  } = useSelector((state) => {
    return state.subMaster;
  });

  const dispatch = useDispatch();


  
  useEffect(() => {
    dispatch(getPeriod());
  }, []);

  return <CustomTable handleEditClick={handleEditClick} loading={gettingPeriod} dataSource={dataSource} column={column} onClickAdd={onClickAdd} title={'Period Master'} />;
}
