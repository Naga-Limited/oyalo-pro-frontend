import React from "react";
import { deepCleanStatus } from "../../../components/formComponents/CommonFunctions";
import { Badge } from "antd";

// Utility function to convert a string to Title Case
import { Image } from "antd";
import { format } from 'date-fns';
function getEntryDate(params) {
  return `${format(new Date(params.row.created_at), 'dd-MM-yyyy') }`;
}

export const column = [
  { key: "1", headerName: "S.No", field: "S.No", hide: false, width: 80 },
  {
    key: "2",
    headerName: "Outlet Code",
    field: "outlet_code",
    hide: false,
    width: 100
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
    width: 100,  
    valueGetter:getEntryDate 
  },
 
  {
    key: "5",
    headerName: "Equipment",
    field: "equipment_name",
    hide: false,
    width: 150,
    valueGetter: (params) => {
      const value = params.value;
      if (typeof value === 'string') {    
        const values = value.split(',').map((item) => item.trim());
        return values.join('\n');
      } else if (Array.isArray(value)) {
           return value.join('\n');
      }
      return value;
    },
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
    headerName: "Remarks",
    field: "remarks_name",
    hide: false,
    width: 200
  },
  {
    key: "10",
    headerName: "Schedule Time",
    field: "schedule_time",
    hide: false,
    width: 200
  },

  {
    key: "11",
    headerName: "Clean Time",
    field: "clean_time",
    hide: false,
    width: 200
  },


  {
    key: "12",
    headerName: "Deviation Time",
    field: "time_difference",
    hide: false,
    width: 200
  },

  {
    key: "13",
    headerName: "Image",
    field: "image",
    hide: false,
    width: 120,
    renderCell: (params) => (
      <Image
        style={{ paddingLeft: "10px" }}
        width={50}
        src={params?.row?.image ?? ""}
        alt="No Image"
      />
    )
  },
  {
    key: "14",
    headerName: "Status",
    field: "deep_clean_status",
    hide: false,
    width: 220,
    renderCell: (params) => {
      return (
        <Badge
          style={{ backgroundColor: deepCleanStatus(params.row.deep_clean_status) }}
          count={params.row.deep_clean_status}
        ></Badge>
      );
    }
  },
  {
    key: "15",
    headerName: "Entry Status",
    field: "remarks_name",
    hide: false,
    width: 220,
    renderCell: (params) => {
      return (
        <Badge
          style={{ backgroundColor: deepCleanStatus(params.row.remarks_name) }}
          count={params.row.remarks_name}
        ></Badge>
      );
    }
  },
  {
    key: "16",
    headerName: "Approve Remarks",
    field: "approve_remarks",
    hide: false,
    width: 220,
    renderCell: (params) => {
      return (
        <Badge
          style={{ backgroundColor: deepCleanStatus(params.row.approve_remarks) }}
          count={params.row.approve_remarks}
        ></Badge>
      );
    }
  }
];
