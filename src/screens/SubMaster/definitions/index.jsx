import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router';
import {getDefinitions} from '../../../@app/subMaster/subMasterSlice';
import CustomTable from '../../../components/CustomTableReport';
import {column} from './column';
export default function Definitions({setTopTitle}) {
  setTopTitle('Definitions Master');
  const navigate = useNavigate();

  const onClickAdd = () => {
    navigate('/definitions/addForm', {
      state: {}
    });
  };

  const handleEditClick = (data) => {
    navigate('/definitions/addForm', {
      state: {data, isEdit: true}
    });
  };

  const {
    gettingDefinitions,
    getDefinitionsResponse: {data: dataSource}
  } = useSelector((state) => {
    return state.subMaster;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDefinitions());
  }, []);

  return <CustomTable 
           handleEditClick={handleEditClick} 
           loading={gettingDefinitions} 
           dataSource={dataSource} 
           column={column} 
           onClickAdd={onClickAdd} 
           title={'Definitions Master'} />;
}
