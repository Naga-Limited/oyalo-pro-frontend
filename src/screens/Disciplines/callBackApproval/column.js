import React from "react";
import dayjs from "dayjs";
import { callEntryStatus } from "../../../components/formComponents/CommonFunctions";
import { Badge } from "antd";
import { Rate } from "antd";
// Utility function to convert a string to Title Case

export const column = [
  { key: "1", headerName: "S.No", field: "S.No", hide: false, width: 80 },
  {
    key: "2",
    headerName: "Called By",
    field: "call_make_by",
    hide: false,
    width: 150,
    renderCell: (params) => {
      if (params.row.call_make_by == 0) return "Admin";
    }
  },
  {
    key: "3",
    headerName: "Bill Date",
    field: "invoice_date",
    hide: false,
    width: 150,
    valueGetter: (params) => {
      const shortdate = dayjs(params.row.invoice_date).format("DD-MM-YYYY");
      return shortdate;
    }
  },
  {
    key: "4",
    headerName: "Outlet Name",
    field: "outlet_name",
    hide: false,
    width: 150
  },
  {
    key: "5",
    headerName: "Customer Name",
    field: "customer_name",
    hide: false,
    width: 120
  },
  {
    key: "6",
    headerName: "FeedBack",
    field: "feedback",
    hide: false,
    width: 120
  },

  {
    key: "7",
    headerName: "Rating",
    field: "rating",
    hide: false,
    width: 170,
    renderCell: (params) => {
      return <Rate allowHalf defaultValue={params.row.rating} disabled />;
    }
  },

  {
    key: "8",
    headerName: "Purchased_Value",
    field: "billing_value",
    hide: false,
    width: 150
  },
  {
    key: "9",
    headerName: "Phone Number",
    field: "phone_number",
    hide: false,
    width: 150
  },
  {
    key: "10",
    headerName: "Status",
    field: "call_status",
    hide: false,
    width: 150,
    renderCell: (params) => {
      return (
        <Badge
          style={{ backgroundColor: callEntryStatus(params.row.call_status) }}
          count={params.row.call_status}
        ></Badge>
      );
    }
  }
];
