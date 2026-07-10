import React from "react";

import { format } from 'date-fns';
import { ebReadingStatus } from "../../../components/formComponents/CommonFunctions";
import { Badge } from "antd";
function getEntryDate(params) {
  return `${format(new Date(params.row.created_at), 'dd-MMM-yy') }`;
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
    field: "created_at",
    hide: false,
    width: 150, 
    valueGetter:getEntryDate   
  },   
  {
    key: "4",
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
    key: "5",
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
    key: "6",
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
    key: "7",
    headerName: "Actual / Budget",
    field: "total_actual",
    width: 200,
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
    key: "8",
    headerName: "Waiting At", // Keep the original header name
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

