// export const column = [
//   { key: '1', headerName: 'S.No', field: 'S.No', hide: false, width: 100 },
//   {
//     key: '2', headerName: 'Outlet Name', field: 'outlet_name', hide: false, width: 200
//   },
//   {
//     key: '3', headerName: 'Audit Number', field: 'audit_id', hide: false, width: 200
//   },
//   { key: '4', headerName: 'Audit Date', field: 'audit_date', hide: false, width: 180 },
//   { key: '5', headerName: 'Score', field: 'total_mark', hide: false, width: 150 },
//   { key: '6', headerName: 'Aging Days', field: 'agingDays', hide: false, width: 150 },
//   // { key: '7', headerName: 'Agent Name', field: 'emp_name', hide: false, width: 150 },
//  // { key: '8', headerName: 'Waiting At', field: 'waiting_at', hide: false, width: 150 },
//    { key: '6', headerName: 'Status', field: 'current_status', hide: false, width: 250 }
// ];

import React from 'react';

import { Badge } from 'antd';
import {auditStatus} from '../../../components/formComponents/CommonFunctions';

export const column = [
  { key: '1', headerName: 'S.No', field: 'S.No', hide: false, width: 100 },
  {
    key: '2', headerName: 'Outlet Name', field: 'outlet_name', hide: false, width: 250
  },
  {
    key: '3', headerName: 'Audit Number', field: 'audit_id', hide: false, width: 200
  },
  { key: '4', headerName: 'Audit Date', field: 'audit_date', hide: false, width: 200 },
  { key: '5', headerName: 'Score', field: 'total_mark', hide: false, width: 150 },
  { key: '6', headerName: 'Aging Days', field: 'agingDays', hide: false, width: 150 },
   { key: '7', headerName: 'Agent Name', field: 'entry_by', hide: false, width: 150 },
  {
    key: '9', headerName: 'Status', field: 'outlet_status', hide: false, width: 250,
    renderCell: (params) => {
      return (
       <Badge
          style={{ backgroundColor: auditStatus(params.row.outlet_status) }} count={params.row.outlet_status}>
        </Badge>
      );
    }
  },
  //{ key: '8', headerName: 'Waiting At', field: 'waiting_at', hide: false, width: 150 },
 
];