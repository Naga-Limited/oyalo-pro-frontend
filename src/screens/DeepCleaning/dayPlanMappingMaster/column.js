import React from "react";
import { colorName } from "../../../components/formComponents/CommonFunctions";
import { Badge } from "antd";

// Utility function to convert a string to Title Case

export const column = [
  { key: "1", headerName: "S.No", field: "S.No", hide: false, width: 80 },
  {
    key: "2",
    headerName: "Equipment",
    field: "equipment_name",
    hide: false,
    width: 100
  },
  {
    key: "3",
    headerName: "Outlet Count",
    field: "outlet_count",
    hide: false,
    width: 100
  },
  {
    key: "4",
    headerName: "Outlet Name",
    field: "outlet_name",
    hide: false,
    width: 250
  },
  {
    key: "5",
    headerName: "Day",
    field: "day_name",  
    hide: false,
    width: 150
  },
 
  {
    key: "6",
    headerName: "Type",
    field: "type_name",
    hide: false,
    width: 200
  },
  {
    key: "7",
    headerName: "Status",
    field: "status",
    hide: false,
    width: 200,
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
