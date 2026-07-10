import React, {useState} from 'react';

import {useNavigate} from 'react-router';
import CustomTable from '../../../components/CustomTable';
import {column} from '../../constant/column';

export default function EditRoleMaster({setTopTitle}) {
  setTopTitle('Edit Role Master');

  const navigate = useNavigate();

  const onClickAdd = () => {
    navigate('/editRoleMaster/addForm');
  };
  // eslint-disable-next-line no-unused-vars
  const [dataSource, setDataSource] = useState([
    {
      sno: 1,
      id: 1,
      state: 'TN',
      zone: 'd',
      subZone: 'd',
      city: 'ER',
      outletC: 'd',
      outletN: 'a',
      zomato: 'a',
      zId: 'd',
      zLiveDate: 'asd',
      swiggy: 'ad'
    }
  ]);

  return <CustomTable dataSource={dataSource} column={column} onClickAdd={onClickAdd} title={'Role Edit'} />;
}
