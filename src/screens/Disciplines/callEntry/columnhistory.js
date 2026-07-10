import React from "react";
import dayjs from "dayjs";
import { callStatus } from "../../../components/formComponents/CommonFunctions";
import { Badge } from "antd";
import { Rate } from "antd";
// Utility function to convert a string to Title Case

export const column = [
  // { key: '1', headerName: 'S.No', field: 'S.No', hide: false, width: 80 },
  {
    key: "1",
    headerName: "Called By",
    field: "call_make_by",
    hide: false,
    width: 150,
    renderCell: (params) => {
      if (params.row.call_make_by == 0) return "Admin";
    }
  },
  {
    key: "2",
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
    key: "5",
    headerName: "FeedBack",
    field: "feedback_name",
    hide: false,
    width: 120
  },
  // { key: '5', headerName: 'Rating', field: 'rating', hide: false, width: 150 },
  {
    key: "5",
    headerName: "Rating",
    field: "rating",
    hide: false,
    width: 170,
    renderCell: (params) => {
      return <Rate allowHalf defaultValue={params.row.rating} disabled />;
    }
  },

  {
    key: "5",
    headerName: "Purchased_Value",
    field: "billing_value",
    hide: false,
    width: 150
  },
  {
    key: "5",
    headerName: "Phone Number",
    field: "phone_number",
    hide: false,
    width: 150
  },
  {
    key: "6",
    headerName: "Status",
    field: "payment_status",
    hide: false,
    width: 150,
    renderCell: (params) => {
      return (
        <Badge
          style={{ backgroundColor: callStatus(params.row.payment_status) }}
          count={params.row.payment_status}
        ></Badge>
      );
    }
  }
];
