
import React from 'react';

import { Badge } from 'antd';
import {auditStatus} from '../../../components/formComponents/CommonFunctions';

export const column = [
  { key: '1', headerName: 'S.No', field: 'S.No', hide: false, width: 30 },
  {
    key: '2', headerName: 'Outlet Name', field: 'outlet_name', hide: false, width: 250
  },
  {
    key: '3', headerName: 'Audit Number', field: 'audit_id', hide: false, width: 150
  },
  { key: '4', headerName: 'Audit Date', field: 'audit_date', hide: false, width: 100 },
  {
    key: '5', headerName: 'Audit Score', field: 'total_mark', hide: false, width: 100,
    valueGetter: (params) => {
      return (params.row.total_mark +' / '+  params.row.fullmarks);
    }
  },
//   { key: '7', headerName: 'Final Score', field: 'updated_mark', hide: false, width: 100,
//   renderCell: (params) => {
//     return (params.row.updated_mark +' / '+  params.row.fullmarks);
//   }
//  },
  // { key: '8', headerName: 'Aging Days', field: 'agingDays', hide: false, width: 110 },
  { key: '9', headerName: 'Agent Name', field: 'entry_by', hide: false, width: 150 },
  { key: '10', headerName:'CAPA Date', field:'updated_at', hide:false, width:120 },
  {
    key: '11', headerName: 'Outlet Status', field: 'outlet_status', hide: false, width: 150,
    renderCell: (params) => {
      return (


        <Badge
          style={{ backgroundColor: auditStatus(params.row.outlet_status) }} count={params.row.outlet_status} offset={[10, 10]}>
        </Badge>


      );
    }
  },
  {
    key: '12', headerName: 'Dept Status', field: 'batch_status', hide: false, width: 150,
    renderCell: (params) => {
      return (


        <Badge
          style={{ backgroundColor: auditStatus(params.row.batch_status) }} count={params.row.batch_status} offset={[10, 10]}>
        </Badge>


      );
    }
  },
  {
    key: '13', headerName: 'Audit Status', field: 'payment_status', hide: false, width: 180,
    renderCell: (params) => {
      return (


        <Badge
          style={{ backgroundColor: auditStatus(params.row.payment_status) }} count={params.row.payment_status} offset={[10, 10]}>
        </Badge>


      );
    }
  },

  //{ key: '8', headerName: 'Waiting At', field: 'waiting_at', hide: false, width: 150 },
 
];