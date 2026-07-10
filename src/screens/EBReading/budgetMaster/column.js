import React from "react";
import { colorName } from "../../../components/formComponents/CommonFunctions";
import { Badge } from "antd";
import { format } from 'date-fns';
function getEntryDateFrom(params) {
  return `${format(new Date(params.row.date_from), 'dd-MM-yyyy') }`;
}
function getEntryDateTo(params) {
  return `${format(new Date(params.row.date_to), 'dd-MM-yyyy') }`;
}

export const column = [
  { key: "1", headerName: "S.No", field: "S.No", hide: false, width: 80 },
  {
    key: "2",
    headerName: "Outlet Name", // Keep the original header name
    field: "outlet_name",
    hide: false,
    width: 250
  },
  // {
  //   key: "3",
  //   headerName: "Lean Time", // Keep the original header name
  //   field: "lean_time",
  //   hide: false,
  //   width: 150,   
  // },
  {
    key: "3",
    headerName: "Date From", // Keep the original header name
    field: "date_from",
    hide: false,
    width: 150,
    valueGetter:getEntryDateFrom 
  },
  {
    key: "4",
    headerName: "Date To", // Keep the original header name
    field: "date_to",
    hide: false,
    width: 150,
    valueGetter:getEntryDateTo
  },
  {
    key: "5",
    headerName: "Lean Budget", // Keep the original header name
    field: "lean_budget",
    hide: false,
    width: 120,   
  },
  {
    key: "6",
    headerName: "Peak Budget", // Keep the original header name
    field: "peak_budget",
    hide: false,
    width: 120
  },
  {
    key: "7",
    headerName: "Closed Budget", // Keep the original header name
    field: "closed_budget",
    hide: false,
    width: 120
  },
  {
    key: "8",
    headerName: "Total Budget", // Keep the original header name
    field: "total_budget",
    hide: false,
    width: 150
  },

  {
    key: "9",
    headerName: "Status",
    field: "status",
    hide: false,
    width: 150,
    renderCell: (params) => {
      return (
        <Badge
          style={{ backgroundColor: colorName(params.row.status) }}
          count={params.row.status}
        ></Badge>
      );
    }
   
  }
];
