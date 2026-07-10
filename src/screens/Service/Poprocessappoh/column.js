/* eslint-disable no-unused-vars */
import React from 'react';
import { parseISO, format } from 'date-fns';

export let column = (handleUpdate = () => false) => ([
  { key: '1', headerName: 'S.No', field: 'S.No', hide: false, width: 70 },
  { key: '2', headerName: 'Outlet Name', field: 'outlet_name', hide: false, width: 150 },
  { key: '3', headerName: 'Ticket Creation Date', field: 'created_at', hide: false, width: 180, valueGetter: (params) => format(parseISO(params.row.created_at), 'dd-MM-yyyy hh:mm aa') },
  { key: '4', headerName: 'ORL Name', field: 'orl_name', hide: false, width: 150 },
  { key: '5', headerName: 'ORL Number', field: 'contact_no', hide: false, width: 150 },
  { key: '6', headerName: 'Ticket No', field: 'ticket_no', hide: false, width: 200 },
  { key: '7', headerName: 'Workdone', field: 'workdone', hide: false, width: 160 },
  { key: '8', headerName: 'Value for Spare Material', field: 'spend_amount', hide: false, width: 180 },
  { key: '9', headerName: 'Advance', field: 'advance', hide: false, width: 180, valueGetter: (params) => params.row?.advance ?? "No" },
  { key: '10', headerName: 'Aging Days', field: 'aging_days', hide: false, width: 130 },
  {
    key: '11', headerName: 'Actions', field: 'btnfields', hide: false, width: 180, renderCell: (params) => {
      return <button className='orangeFactory btn' onClick={() => handleUpdate(params.row)}>
        Update
      </button>
    },
  },
  { key: '12', headerName: 'Remarks', field: 'remarks', hide: false, width: 130 },
]);