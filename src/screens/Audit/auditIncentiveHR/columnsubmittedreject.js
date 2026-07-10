import React from 'react';
import { Badge,
  //Button
 } from 'antd';
import {auditStatus} from '../../../components/formComponents/CommonFunctions';
//import {FaListUl} from 'react-icons/fa';

export const columnsubmitreject = [ 
  { key: '1', headerName: 'S.No', field: 'S.No', hide: false, width: 100 },
  { key: '2', headerName: 'Document No', field: 'payment_document_no', hide: false, width: 200 },
  { key: '3', headerName: 'Month', field: 'process_month', hide: false, width: 120 }, 
  { key: '4', headerName: 'Incentive Value', field: 'incentive_value', hide: false, width: 150 },
  { key: '5', headerName: 'Initiated Date', field: 'process_date', hide: false, width: 150 },
  { key: '6', headerName: 'Incentive Outlet Count', field: 'incentive_outlet_count', hide: false, width: 180
 },
 { key: '6', headerName: 'Reject Remarks', field: 'remarks', hide: false, width: 280
},
  {
    key: '9', headerName: 'Waiting At', field: 'inc_status', hide: false, width: 150,
    renderCell: (params) => {
      return (
       <Badge
          style={{ backgroundColor: auditStatus(params.row.inc_status) }} count={params.row.inc_status}>
        </Badge>
      );
    }
  },
];

