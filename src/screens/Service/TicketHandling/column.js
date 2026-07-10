import React from 'react';
import { parseISO, format } from "date-fns";

export let column = (handleUpdate = () => false) => [
  { key: "1", headerName: "S.No", field: "S.No", hide: false, width: 40 },
  {
    key: "2",
    headerName: "Ticket No",
    field: "ticket_no",
    hide: false,
    width: 250,
  },
  {
    key: "3",
    headerName: "Outlet Name",
    field: "outlet_name",
    hide: false,
    width: 150,
  },
  {
    key: "4",
    headerName: "ORL Name",
    field: "orl_name",
    hide: false,
    width: 150,
  },
  {
    key: "5",
    headerName: "ORL Number",
    field: "contact_no",
    hide: false,
    width: 150,
  },
  {
    key: "6",
    headerName: "Service For",
    field: "service_for",
    hide: false,
    width: 130,
  },
  {
    key: "7",
    headerName: "Ticket Description",
    field: "problem_description",
    hide: false,
    width: 180,
  },
  {
    key: "8",
    headerName: "Asset Group",
    field: "asset_group",
    hide: false,
    width: 180,
  },
  {
    key: "9",
    headerName: "Ticket Status",
    field: "ticket_status",
    hide: false,
    width: 220,
  },
  {
    key: "10",
    headerName: "Payment status",
    field: "payment_status",
    hide: false,
    width: 180,
  },
  {
    key: "11",
    headerName: "Ticket Date",
    field: "created_at",
    hide: false,
    width: 180,
    valueGetter: (params) =>
      format(parseISO(params.row.created_at), "dd-MM-yyyy"),
  },
  {
    key: "12",
    headerName: "Aging",
    field: "aging_days",
    hide: false,
    width: 130,
  },
  {
    key: "13",
    headerName: "Actions",
    field: "btnfields",
    hide: false,
    width: 180,
    renderCell: (params) => {
      if((params.row.payment_status =='Ticket Closed') || ((params.row.ticket_status == 'Ticket Closed ORL') 
          && (params.row.service_for =='POS') || (params.row.cost_involved === "No"))){
        return (
        <button
          className="orangeFactory btn"
          onClick={() => handleUpdate(params.row)
          }>
          View
        </button>
      );
    }
    else{
      return (
        <button
          className="orangeFactory btn"
          onClick={() => handleUpdate(params.row)
          }>
          Update
        </button>
      );
    }
  }
  },
];
