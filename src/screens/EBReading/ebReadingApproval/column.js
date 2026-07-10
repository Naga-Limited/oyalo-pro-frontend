import React from "react";
import { format } from 'date-fns';
import { ebReadingStatus } from "../../../components/formComponents/CommonFunctions";
import { Badge, Image } from "antd";
function getEntryDate(params) {
  return `${format(new Date(params.row.entry_date), 'dd-MMM-yy') }`;
}
export const column = [
  { key: "1", headerName: "S.No", field: "S.No", hide: false, width: 80 },

  {
    key: "2",
    headerName: "Outlet Name", // Keep the original header name
    field: "outlet_name",
    hide: false,
    width: 250,   
  },
 
  {
    key: "3",
    headerName: "Date", // Keep the original header name
    field: "entry_date",
    hide: false,
    width: 100,  
    valueGetter:getEntryDate 
  },
  {
    key: "3",
    headerName: "Lean", // Keep the original header name
    field: "lean_budget",
    hide: false,
    width: 100,
    valueGetter: (params) => {
      if((params.row.lean_actual) === undefined){
        return ( '/ '+params.row.lean_budget);
      }
      else
      return (params.row.lean_actual +' / '+  params.row.lean_budget);
    }
   
  },

  {
    key: "4",
    headerName: "Lean Image",
    field: "lean_image",
    hide: false,
    width: 120,
    renderCell: (params) => (
      <Image
        style={{ paddingLeft: "10px" }}
        width={50}
        src={params?.row?.lean_image ?? ""}
        alt="No Image"
      />
    )
  },   
  {
    key: "4",
    headerName: "Peak", // Keep the original header name
    field: "peak_budget",
    hide: false,
    width: 100,
    valueGetter: (params) => {
      if((params.row.peak_actual) === undefined){
        return ( '/ '+params.row.peak_budget);
      }
      else
      return (params.row.peak_actual +' / '+  params.row.peak_budget);
    }
  },
  {
    key: "4",
    headerName: "Peak Image",
    field: "peak_image",
    hide: false,
    width: 120,
    renderCell: (params) => (
      <Image
        style={{ paddingLeft: "10px" }}
        width={50}
        src={params?.row?.peak_image ?? ""}
        alt="No Image"
      />
    )
  },  
  {
    key: "5",
    headerName: "Closed", // Keep the original header name
    field: "closed_budget",
    hide: false,
    width: 100,
    valueGetter: (params) => {
      if((params.row.close_actual) === undefined){
        return ( '/ '+params.row.closed_budget);
      }
    else
      return (params.row.close_actual +' / '+  params.row.closed_budget);
    }
  },
  {
    key: "4",
    headerName: "Close Image",
    field: "close_image",
    hide: false,
    width: 120,
    renderCell: (params) => (
      <Image
        style={{ paddingLeft: "10px" }}
        width={50}
        src={params?.row?.close_image ?? ""}
        alt="No Image"
      />
    )
  },  
  {
    key: "4",
    headerName: "Actual / Budget", // Keep the original header name
    field: "total_actual",
    hide: false,
    width: 150,
    valueGetter: (params) => {
      if((params.row.total_actual) === undefined){
        return ( '/ '+params.row.total_budget);
      }
    else
      return (params.row.total_actual +' / '+  params.row.total_budget);
    }
   
  },
  {
    key: "4",
    headerName: "Status", // Keep the original header name
    field: "entry_status",
    hide: false,
    width: 150,
    renderCell: (params) => {
      return (
        <Badge
          style={{ backgroundColor: ebReadingStatus(params.row.entry_status) }}
          count={params.row.entry_status}
        ></Badge>
      );
    }
   
  },
];

