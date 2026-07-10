import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router';
import {getCrewMaster} from '../../../@app/subMaster/subMasterSlice';
import CustomTable from '../../../components/CustomTable';
import {column} from './column';
export default function StateMaster({setTopTitle}) {
  setTopTitle('Crew Master');
  const navigate = useNavigate();

  const {
    gettingCrewMaster,
    getCrewMasterResponse: {data: dataSource}
  } = useSelector((state) => {
    return state.subMaster;
  });

  const handleEditClick = (data) => {
    navigate('/crewMaster/addForm', {
      state: {data, isEdit: true}
    });
  };

  const onClickAdd = () => {
    navigate('/crewMaster/addForm', {
      state: {}
    });
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCrewMaster());
  }, []);

  return <CustomTable 
          handleEditClick={handleEditClick} 
          loading={gettingCrewMaster} 
          dataSource={dataSource} 
          column={column} 
          onClickAdd={onClickAdd} 
          title={'Crew Master'} />;
}
