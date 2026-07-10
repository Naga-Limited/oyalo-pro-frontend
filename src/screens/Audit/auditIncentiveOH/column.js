import React from 'react';

import { Badge } from 'antd';
import {auditStatus} from '../../../components/formComponents/CommonFunctions';

export const column = [
 
  { key: '1', headerName: 'S.No', field: 'S.No', hide: false, width: 60 },
  { key: '2', headerName: 'Document No', field: 'payment_document_no', hide: false, width: 200 },
  { key: '3', headerName: 'Month', field: 'process_month', hide: false, width: 100 }, 
  { key: '4', headerName: 'Incentive Value', field: 'incentive_value', hide: false, width: 150 },
  { key: '5', headerName: 'Initiated Date', field: 'process_date', hide: false, width: 150 },
  { key: '6', headerName: 'Initiated Outlet Count', field: 'incentive_outlet_count', hide: false, width: 180 },
  {
      key: '9', headerName: 'Waiting At', field: 'inc_status', hide: false, width: 200,
      renderCell: (params) => {
        return (
         <Badge
            style={{ backgroundColor: auditStatus(params.row.inc_status) }} count={params.row.inc_status}>
          </Badge>
        );
      }
    },
  //{ key: '8', headerName: 'Waiting At', field: 'waiting_at', hide: false, width: 150 },
 
];