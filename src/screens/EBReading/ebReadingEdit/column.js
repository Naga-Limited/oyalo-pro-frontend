import React from "react";
// import { deepCleanStatus } from "../../../components/formComponents/CommonFunctions";
// import { Badge } from "antd";
import { format } from 'date-fns';
import { ebReadingStatus } from "../../../components/formComponents/CommonFunctions";
import { Badge, Image } from "antd";
function getDate(params) {
  return `${format(new Date(params.row.created_at), 'dd-MMM-yy') }`;
}

function getEntryDate(params) {
  if(params.row.entry_date != null){
    return `${format(new Date(params.row.entry_date), 'dd-MMM-yy') }`;
    }
    else{
      return "-";
    }
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
    headerName: "Entry Date", // Keep the original header name
    field: "entry_date",
    hide: false,
    width: 100,  
    valueGetter:getEntryDate 
  }, 
  {
    key: "4",
    headerName: "Date", // Keep the original header name
    field: "created_at",
    hide: false,
    width: 100,  
    valueGetter:getDate 
  }, 
  {
    key: "5",
    headerName: "Lean",
    field: "lean_actual",
    width: 100,
    renderCell: (params) => {
      const actual = params.row.lean_actual;
      const budget = params.row.lean_budget;
      let formattedValue = '';
      let textColor = 'inherit';      
      if (actual !== undefined && budget !== undefined) {
        formattedValue = `${actual}`;
        if (actual > budget) {
          textColor = 'red';
        } else if (actual < budget) {
          textColor = 'green';
        }
        else if (actual == budget) {
          textColor = 'orange';
        }
      } else if (budget !== undefined) {
        formattedValue = `/ ${budget}`;
      }      
      return <span style={{ color: textColor }}>{formattedValue} / {budget}</span>;
    }
  },
  {
    key: "6",
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
    key: "7",
    headerName: "Peak",
    field: "peak_actual",
    width: 100,
    renderCell: (params) => {
      const actual = params.row.peak_actual;
      const budget = params.row.peak_budget;
      let formattedValue = '';
      let textColor = 'inherit';      
      if (actual !== undefined && budget !== undefined) {
        formattedValue = `${actual}`;
        if (actual > budget) {
          textColor = 'red';
        } else if (actual < budget) {
          textColor = 'green';
        }
        else if (actual == budget) {
          textColor = 'orange';
        }
      } else if (budget !== undefined) {
        formattedValue = `/ ${budget}`;
      }      
      return <span style={{ color: textColor }}>{formattedValue} / {budget}</span>;
    }
  },
  {
    key: "8",
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
    key: "9",
    headerName: "Closed",
    field: "close_actual",
    width: 100,
    renderCell: (params) => {
      const actual = params.row.close_actual;
      const budget = params.row.closed_budget;
      let formattedValue = '';
      let textColor = 'inherit';      
      if (actual !== undefined && budget !== undefined) {
        formattedValue = `${actual}`;
        if (actual > budget) {
          textColor = 'red';
        } else if (actual < budget) {
          textColor = 'green';
        }
        else if (actual == budget) {
          textColor = 'orange';
        }
      } else if (budget !== undefined) {
        formattedValue = `/ ${budget}`;
      }      
      return <span style={{ color: textColor }}>{formattedValue} / {budget}</span>;
    }
  }, 
  {
    key: "10",
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
    key: "11",
    headerName: "Actual / Budget",
    field: "total_actual",
    width: 130,
    renderCell: (params) => {
      const actual = params.row.total_actual;
      const budget = params.row.total_budget;
      let formattedValue = '';
      let textColor = 'inherit';      
      if (actual !== undefined && budget !== undefined) {
        formattedValue = `${actual}`;
        if (actual > budget) {
          textColor = 'red';
        } else if (actual < budget) {
          textColor = 'green';
        }
        else if (actual == budget) {
          textColor = 'orange';
        }
      } else if (budget !== undefined) {
        formattedValue = `/ ${budget}`;
      }      
      return <span style={{ color: textColor }}>{formattedValue} / {budget}</span>;
    }
  },
  {
    key: "12",
    headerName: "Status", // Keep the original header name
    field: "entry_status",
    hide: false,
    width: 130,
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

