import React from "react";
import { deepCleanStatus } from "../../../components/formComponents/CommonFunctions";
import { Badge } from "antd";
import { format } from 'date-fns';
// Utility function to convert a string to Title Case
function getEntryDate(params) {
  return `${format(new Date(params.row.created_at), 'dd-MM-yyyy') }`;
}

export const column = [
  { key: "1", headerName: "S.No", field: "S.No", hide: false, width: 80 },
 
  {
    key: "2",
    headerName: "Date", // Keep the original header name
    field: "created_at",
    hide: false,
    width: 100,  
    valueGetter:getEntryDate 
  },
  {
    key: "3",
    headerName: "Outlet Name", // Keep the original header name
    field: "outlet_name",
    hide: false,
    width: 250,
   
  },
  {
    key: "5",
    headerName: "Equipment",
    field: "equipment_name",
    hide: false,
    width: 150
  },
  {
    key: "6",
    headerName: "Check List Type",
    field: "check_list_type",
    hide: false,
    width: 150
  },
  {
    key: "7",
    headerName: "Time Lot",
    field: "time_lot",
    hide: false,
    width: 150
  },
  {
    key: "8",
    headerName: "Functiional Type",
    field: "functional_type",
    hide: false,
    width: 150
  },
  {
    key: "9",
    headerName: "Type",
    field: "type_name",
    hide: false,
    width: 150
  },

  {
    key: "10",
    headerName: "Day",
    field: "day_name",
    hide: false,
    width: 150
  },
  {
    key: "11",
    headerName: "Status",
    field: "deep_clean_status",
    hide: false,
    width: 230,
    renderCell: (params) => {
      return (
        <Badge
          style={{ backgroundColor: deepCleanStatus(params.row.deep_clean_status) }}
          count={params.row.deep_clean_status}
        ></Badge>
      );
    }
  }
];
