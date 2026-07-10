import React from "react";
import { colorName } from "../../../components/formComponents/CommonFunctions";
import { Badge } from "antd";

// Utility function to convert a string to Title Case

export const column = [
  { key: "1", headerName: "S.No", field: "S.No", hide: false, width: 80 }, 
  {
    key: "2",
    headerName: "Check List Type",
    field: "check_list_type",
    hide: false,
    width: 150
  },
  {
    key: "3",
    headerName: "Time Lot",
    field: "time_lot",
    hide: false,
    width: 150
  },
  {
    key: "4",
    headerName: "Functional Type",
    field: "functional_type",
    hide: false,
    width: 150
  },
  {
    key: "5",
    headerName: "Particulars Name",
    field: "equipment_name",
    hide: false,
    width: 350
  },
  {
    key: "6",
    headerName: "Time",
    field: "time",
    hide: false,
    width: 150
  },
  {
    key: "7",
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
