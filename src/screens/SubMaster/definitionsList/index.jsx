import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router';
import {getDefinitionsList} from '../../../@app/subMaster/subMasterSlice';
import CustomTable from '../../../components/CustomTable';
import {column} from './column';
export default function DefinitionsList({setTopTitle}) {
  setTopTitle('DefinitionsList');
  const navigate = useNavigate();

  const handleEditClick = (data) => {
    navigate('/definitionsList/addForm', {
      state: {data, isEdit: true}
    });
  };

  const onClickAdd = () => {
    navigate('/definitionsList/addForm', {
      state: {}
    });
  };
  const {
    gettingDefinitionsList,
    getDefinitionsListResponse: {data: dataSource}
  } = useSelector((state) => {
    return state.subMaster;
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDefinitionsList());
  }, []);

  return <CustomTable loading={gettingDefinitionsList} dataSource={dataSource} column={column} onClickAdd={onClickAdd} handleEditClick={handleEditClick} title={'Zone Master'} />;
}
