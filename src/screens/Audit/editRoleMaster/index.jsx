import React, {useState} from 'react';
import CustomTable from '../../../components/CustomTable';
import {column} from './column';

export default function AuditReport() {
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

  return <CustomTable dataSource={dataSource} column={column} title={'Audit Report'} />;
}
