import React from "react";
import { deepCleanStatus } from "../../../components/formComponents/CommonFunctions";
import { Badge } from "antd";

// Utility function to convert a string to Title Case
import { Image } from "antd";

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
    headerName: "Equipment",
    field: "equipment_name",
    hide: false,
    width: 150
  },
  {
    key: "4",
    headerName: "Check List Type",
    field: "check_list_type",
    hide: false,
    width: 150
  },
  {
    key: "5",
    headerName: "Time Lot",
    field: "time_lot",
    hide: false,
    width: 150
  },
  {
    key: "6",
    headerName: "Functiional Type",
    field: "functional_type",
    hide: false,
    width: 150
  },

  {
    key: "7",
    headerName: "Remarks",
    field: "remarks_name",
    hide: false,
    width: 200
  },
  {
    key: "8",
    headerName: "Schedule Time",
    field: "schedule_time",
    hide: false,
    width: 200
  },

  {
    key: "9",
    headerName: "Clean Time",
    field: "clean_time",
    hide: false,
    width: 200
  },


  {
    key: "10",
    headerName: "Deviation Time",
    field: "time_difference",
    hide: false,
    width: 200
  },

  {
    key: "11",
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
    key: "12",
    headerName: "Status",
    field: "deep_clean_status",
    hide: false,
    width: 150,
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
