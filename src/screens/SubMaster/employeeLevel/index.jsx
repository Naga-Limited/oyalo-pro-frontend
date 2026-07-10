import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router';
import {getEmployeeLevel} from '../../../@app/subMaster/subMasterSlice';
import CustomTable from '../../../components/CustomTable';
import {column} from './column';
export default function EmployeeLevel({setTopTitle}) {
  setTopTitle('Employee Level');
  const navigate = useNavigate();

  const onClickAdd = () => {
    navigate('/employeeLevel/addForm', {
      state: {}
    });
  };

  const handleEditClick = (data) => {
    navigate('/employeeLevel/addForm', {
      state: {data, isEdit: true}
    });
  };

  const {
    gettingEmployeeLevel,
    getEmployeeLevelResponse: {data: dataSource}
  } = useSelector((state) => {
    return state.subMaster;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEmployeeLevel());
  }, [dispatch]);

  return <CustomTable handleEditClick={handleEditClick} loading={gettingEmployeeLevel} dataSource={dataSource} column={column} onClickAdd={onClickAdd} title={'EmployeeLevel'} />;
}
