
import React, { useEffect,useState } from 'react';
import { useDispatch, } from 'react-redux';
// import { Badge } from 'antd';
// import {auditStatus} from '../../../components/formComponents/CommonFunctions';
import { get_Outlet_Name } from '../../../@app/master/masterSlice';

const dispatch = useDispatch();
const [outletMapping, setOutletMapping] = useState({}); // Initialize it in state

useEffect(() => {
  dispatch(get_Outlet_Name())
    .then((result) => {
      const data = result.data;
      const formattedData = {};

      // Check if data is an object and not empty
      if (typeof data === 'object' && Object.keys(data).length > 0) {
        for (const key in data) {
          if (data[key] !== undefined) {
            formattedData[key] = data[key].name;
          }
        }
        // Set the formatted data in state
        setOutletMapping(formattedData);
      } 
    })
}, [dispatch]);

export const column = [
  { key: '1', headerName: 'S.No', field: 'S.No', hide: false, width: 50, },
  {
    key: '9', headerName: 'Outlet', field: 'outlet_code', hide: false, width: 180,
    renderCell: (params) => {
      const outletName = outletMapping[params.value] || 'Unknown Outlet';
      return <span>{outletName}</span>;
    },
  },
  {
    key: '2', headerName: ' Closure Date', field: 'sales_closure_date', hide: false, width: 180, renderCell: (params) => {
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
    width: 200,
  },
  { key: '4', headerName: 'Closure Value', field: 'closure_amount', hide: false, width: 180, 'data-tip': 'Closure Value Tooltip', },
  { key: '5', headerName: 'Closure By', field: 'closureby', hide: false, width: 180, },
  { key: '6', headerName: 'Deposit Value', field: 'deposit_amount', hide: false, width: 180, },
  { key: '7', headerName: 'Deposited By', field: 'depositby', hide: false, width: 180, },
  {
    key: '8', headerName: 'Status', field: 'status', hide: false, width: 180, pinned: 'right'
  },
];
