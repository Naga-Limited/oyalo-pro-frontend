import React from "react";
import dayjs from "dayjs";
import { callEntryStatus } from "../../../components/formComponents/CommonFunctions";
import { Badge, Tooltip } from "antd";
import { FaPizzaSlice } from "react-icons/fa";
// Utility function to convert a string to Title Case
const textColor = "#8c82a1";
const textColorletter = "#000000";
const itemcolor = "#f5a927";
export const columnSale = [
  { key: "1", headerName: "S.No", field: "S.No", hide: false, width: 60 },
  {
    key: "2",
    headerName: "Call Made By",
    field: "call_make_by",
    hide: false,
    width: 150,
    renderCell: (params) => {
      if (params.row.call_make_by == "0") {
        return "Admin";
      } else {
        return params.row.call_make_by;
      }
    }
  },
  {
    key: "3",
    headerName: "Bill Date",
    field: "invoice_date",
    hide: false,
    width: 100,
    valueGetter: (params) => {
      const shortdate = dayjs(params.row.invoice_date).format("DD-MM-YYYY");
      return shortdate;
    }
  },

  {
    key: "4",
    headerName: "Outlet Name", // Keep the original header name
    field: "outlet_name",
    hide: false,
    width: 200,
    valueGetter: (params) => {
      const outlet_name = params.row.outlet_name;
      const branchCode = params.row.outlet_code;
      if (typeof outlet_name === "string") {
        const words = outlet_name.split("-");
        const capitalizedWords = words.map((word) => {
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        });
        return capitalizedWords.join("-");
      }
      return outlet_name + "-" + branchCode; // Return the input as-is if it's not a valid string
    }
  },
  {
    key: "5",
    headerName: "Bill Value",
    field: "invoice_value",
    hide: false,
    width: 100
  },
  {
    key: "7",
    headerName: "Feedback",
    field: "feedback",
    hide: false,
    width: 130
  },
  {
    key: "8",
    headerName: "Call Status",
    field: "call_status",
    hide: false,
    width: 180,
    renderCell: (params) => {
      return (
        <Badge
          style={{ backgroundColor: callEntryStatus(params.row.call_status) }}
          count={params.row.call_status}
        ></Badge>
      );
    }
  },
 
  {
    key: "9",
    headerName: "Coupon Details",
    field: "coupon_code",
    hide: false,
    width: 150,
    renderCell: (params) => {
      const couponCode = params.row.coupon_code;
      let tooltipContent = "";

      try {
        const couponData = JSON.parse(couponCode);
        if (couponData.coupon) {
          tooltipContent = couponData.coupon;
        }
      } catch (error) {
        // Handle the case when JSON parsing fails
        tooltipContent = "Invalid Coupon Data";
      }

      return (
        <Tooltip title={tooltipContent} arrow>
          <span>{tooltipContent}</span>
        </Tooltip>
      );
    }
  },
  {
    key: "11",
    headerName: "Prod Name",
    field: "item_name",
    hide: false,
    width: 100,
    renderCell: (params) => {
      const categories = Array.isArray(params.row.item_name)
      ? params.row.item_name
      : [params.row.item_name];

    const tooltipContent = categories.map((category, index) => (
      <div key={index}>{`${category.trim()}`}</div>
    ));
    return (
      <Tooltip title={tooltipContent} placement="top">
        <span
          style={{
            width: "30px",
            backgroundColor: textColor,
            color: textColorletter,
            padding: "7px",
            borderRadius: "5px"
          }}
        >
          <FaPizzaSlice>{params.row.item_name}</FaPizzaSlice>
        </span>
      </Tooltip>
    );
  }
},
  {
    key: "10",
    headerName: "Items",
    field: "category_name",
    hide: false,
    width: 80,
    renderCell: (params) => {
      const categories = Array.isArray(params.row.category_name)
        ? params.row.category_name
        : [params.row.category_name];

      const tooltipContent = categories.map((category, index) => (
        <div key={index}>{`${category.trim()}`}</div>
      ));

      return (
        <Tooltip title={tooltipContent} placement="top">
          <span
            style={{
              width: "30px",
              backgroundColor: itemcolor,
              color: textColorletter,
              padding: "7px",
              borderRadius: "5px"
            }}
          >
            <FaPizzaSlice></FaPizzaSlice>
          </span>
        </Tooltip>
      );
    }
  },
  {
    key: "11",
    headerName: "Rating",
    field: "rating",
    hide: false,
    width: 70
  }
];
