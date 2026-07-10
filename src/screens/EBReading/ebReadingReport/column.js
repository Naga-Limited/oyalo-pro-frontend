import React from "react";
import { format } from 'date-fns';
import { ebReadingStatus } from "../../../components/formComponents/CommonFunctions";
import { Badge} from "antd";
function getEntryDate(params) {
  if(params.row.entry_date != null){
  return `${format(new Date(params.row.entry_date), 'dd-MMM-yy') }`;
  }
  else{
    return "-";
  }
}

function getDate(params) { 
  return `${format(new Date(params.row.created_at), 'dd-MMM-yy') }`;
}

export const column = [
  { key: "1", headerName: "S.No", field: "S.No", hide: false, width: 80 },
  {
    key: "2",
    headerName: "Outlet Code", // Keep the original header name
    field: "outlet_code",
    hide: false,
    width: 100,   
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
    headerName: "Entry Date", // Keep the original header name
    field: "entry_date",
    hide: false,
    width: 100,  
    valueGetter:getEntryDate 
  },

  {
    key: "5",
    headerName: "Date", // Keep the original header name
    field: "created_at",
    hide: false,
    width: 100,  
    valueGetter:getDate 
  },
 
  {
    key: "6",
    headerName: "L Actual",
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
      return <span style={{ color: textColor }}>{formattedValue}</span>;
    }
  },
  {
    key: "7",
    headerName: "L Budget",
    field: "lean_budget",
    width: 100,   
  },

  {
    key: "8",
    headerName: "P Actual",
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
      return <span style={{ color: textColor }}>{formattedValue}</span>;
    }
  },
  {
    key: "9",
    headerName: "P Budget",
    field: "peak_budget",
    width: 100,   
  },
 
  {
    key: "10",
    headerName: "C Actual",
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
      return <span style={{ color: textColor }}>{formattedValue}</span>;
    }
  }, 
  {
    key: "11",
    headerName: "C Budget",
    field: "closed_budget",
    width: 100,   
  },
  
  {
    key: "12",
    headerName: "T Actual",
    field: "total_actual",
    width: 100,
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
      return <span style={{ color: textColor }}>{formattedValue}</span>;
    }
  },
  {
    key: "13",
    headerName: "T Budget",
    field: "total_budget",
    width: 100,   
  },

  {
    key: "14",
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
  {
    key: "15",
    headerName: "Approve Remarks", // Keep the original header name
    field: "approve_remarks",
    hide: false,
    width: 250, 
   },
];

