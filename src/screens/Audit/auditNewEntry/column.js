

import React from 'react';
import { Image } from "antd";
import { isEmpty } from "ramda";
import { Badge } from 'antd';
import {auditStatus} from '../../../components/formComponents/CommonFunctions';

export const column = [
  { key: '1', headerName: 'S.No', field: 'S.No', hide: false, width: 50 },
  {
    key: '2', headerName: 'Outlet Name', field: 'outlet_name', hide: false, width: 260
  },
  {
    key: '3', headerName: 'Audit Number', field: 'audit_id', hide: false, width: 160
  },
  { key: '4', headerName: 'Audit Date', field: 'audit_date', hide: false, width: 130 },
  { key: '5', headerName: 'Score', field: 'total_mark', hide: false, width: 100 },
 
   { key: '6', headerName: 'Agent Name', field: 'entry_by', hide: false, width: 180 },
   {
    key: '7', headerName: 'Agent Image', field: 'audit_agent_image', hide: false, width: 100,
    renderCell: ( params ) => (
      !isEmpty( params?.row?.audit_agent_image ) ? <Image style={{ paddingLeft: "10px",borderRadius: "50%" }} width={50} src={params?.row?.audit_agent_image ?? ''} /> : 'No Image'
    )
  },
  { key: '8', headerName: 'Duration Time', field: 'spent_time', hide: false, width: 150 },
  { key: '9', headerName: 'Aging Days', field: 'agingDays', hide: false, width: 130 },
  {
    key: '10', headerName: 'Audit Status', field: 'payment_status', hide: false, width: 250,
    renderCell: (params) => {
      return (
        <Badge
          style={{ backgroundColor: auditStatus(params.row.payment_status) }} count={params.row.payment_status}>
        </Badge>
      );
    }
  },
  //{ key: '8', headerName: 'Waiting At', field: 'waiting_at', hide: false, width: 150 },
 
];