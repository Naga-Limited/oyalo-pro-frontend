import React from "react";

import { format } from 'date-fns';
import { consumableStatus } from "../../../components/formComponents/CommonFunctions";
import { Badge } from "antd";
function getEntryDate(params) {
  return `${format(new Date(params.row.created_at), 'dd-MMM-yy') }`;
}
export const column = [
  { key: "1", headerName: "S.No", field: "S.No", hide: false, width: 80 },
  {
    key: "2",
    headerName: "Outlet Code", // Keep the original header name
    field: "outlet_code",
    hide: false,
    width: 120,   
  },
  {
    key: "3",
    headerName: "Outlet Name", // Keep the original header name
    field: "outlet_name",
    hide: false,
    width: 250,   
  },
  {
    key: "4",
    headerName: "Date", // Keep the original header name
    field: "created_at",
    hide: false,
    width: 150, 
    valueGetter:getEntryDate   
  },   

  {
    key: "5",
    headerName: "Status", // Keep the original header name
    field: "consumstatus",
    hide: false,
    width: 150,
    renderCell: (params) => {
      return (
        <Badge
          style={{ backgroundColor: consumableStatus(params.row.consumstatus) }}
          count={params.row.consumstatus}
        ></Badge>
      );
    }
   
  },
];

