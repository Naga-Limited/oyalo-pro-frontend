
import React from 'react';
// import { Badge } from 'antd';
// import {auditStatus} from '../../../components/formComponents/CommonFunctions';

export const column = [
  { key: '1', headerName: 'S.No', field: 'S.No', hide: false, width: 50 },
  {
    key: '2', headerName: ' Closure Date', field: 'sales_closure_date', hide: false, width: 120, renderCell: (params) => {
      // Assuming params.value contains the date in 'yyyy-mm-dd' format
      const dateParts = params.value.split('-');
      const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0].substring(2)}`;
      return (
        <span>{formattedDate}</span>
      );
    },
  },
  {
    key: '3',
    headerName: 'Closure On',
    field: 'act_sales_closure',
    hide: false,
    width: 130,
    renderCell: (params) => {
      // Assuming params.value contains the date and time in 'yyyy-mm-dd HH:mm:ss' format
      const dateTimeParts = params.value.split(' ');
      const dateParts = dateTimeParts[0].split('-');
      const timeParts = dateTimeParts[1].split(':');
      const formattedDate = ` ${dateParts[2]}-${dateParts[1]}-${dateParts[0].substring(2)} ${timeParts[0]}:${timeParts[1]}`;

      return (
        <span>{formattedDate}</span>
      );
    },
  },
  { key: '4', headerName: 'Closure Value', field: 'closure_amount', hide: false, width: 130 },
  { key: '5', headerName: 'Closure By', field: 'closureby', hide: false, width: 170 },
  { key: '6', headerName: 'Deposit Value', field: 'deposit_amount', hide: false, width: 130 },
  { key: '7', headerName: 'Deposited By', field: 'depositby', hide: false, width: 170 },
  { key: '8', headerName: 'Status', field: 'status', hide: false, width: 200  },
];
