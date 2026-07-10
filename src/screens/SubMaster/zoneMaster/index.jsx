import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router';
import {getZonal} from '../../../@app/subMaster/subMasterSlice';
import CustomTable from '../../../components/CustomTable';
import {column} from './column';
export default function ZoneMaster({setTopTitle}) {
  setTopTitle('Zone Master');
  const navigate = useNavigate();

  const handleEditClick = (data) => {
    navigate('/zoneMaster/addForm', {
      state: {data, isEdit: true}
    });
  };

  const onClickAdd = () => {
    navigate('/zoneMaster/addForm', {
      state: {}
    });
  };
  const {
    gettingZonal,
    getZonalResponse: {data: dataSource}
  } = useSelector((state) => {
    return state.subMaster;
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getZonal());
  }, [dispatch]);

  return <CustomTable handleEditClick={handleEditClick} loading={gettingZonal} dataSource={dataSource} column={column} onClickAdd={onClickAdd} title={'Zone Master'} />;
}
