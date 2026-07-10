import React from "react";
import { callStatus } from "../../../components/formComponents/CommonFunctions";
import { Badge } from "antd";
import { format } from 'date-fns';
// Utility function to convert a string to Title Case

function getInvoiceDate(params) {

  return `${format(new Date(params.row.invoice_date), 'dd-MM-yyyy') }`;
}
function toTitleCase(str) {
  return str.toLowerCase().replace(/\b\w/g, (match) => match.toUpperCase());
}
export const column = [
  { key: "1", headerName: "S.No", field: "S.No", hide: false, width: 80 },
  {
    key: "2",
    headerName: "Customer Name",
    field: "customer_name", // Make sure the field name matches your data
    hide: false,
    width: 250,
    renderCell: (params) => {
      const isNil = !params.row.customer_name;
      let customerName = params.row.customer_name;
      if (customerName && customerName.endsWith("null")) {
        customerName = customerName.slice(0, -4);
      }
      const customerID = params.row.customer_code;
      const outletID = params.row.outlet_code;
      const isFiveDigits = /^(\d{5})$/.test(customerID); // Check if customer_id has 5 digits

      const cellText = isNil
        ? "Customer Name - Nil"
        : toTitleCase(customerName) + " - " + customerID; // Append the customer ID
      const cellClassName = isNil
        ? "custom-nil-text"
        : isFiveDigits
        ? "custom-five-digits" // Define a CSS class for rows with 5-digit customer_id
        : "";
      const cellStyle = isNil
        ? {}
        : outletID === customerID
        ? { background: "red" } // Set the background color to red if customer_id and outlet_id are the same
        : {};

      return (
        <div className={cellClassName} style={cellStyle} title={cellText}>
          {cellText}
        </div>
      );
    }
  },
  {
    key: "3",
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
    key: "4",
    headerName: "Invoice Date",
    field: "invoice_date",
    hide: false,
    width: 150,
    valueGetter:getInvoiceDate
  },
  {
    key: "5",
    headerName: "Invoice Count",
    field: "invoice_count",
    hide: false,
    width: 150
  },
  {
    key: "6",
    headerName: "Phone Number",
    field: "phone_number",
    hide: false,
    width: 150
  },
  {
    key: "7",
    headerName: "Status",
    field: "call_status",
    hide: false,
    width: 150,
    renderCell: (params) => {
      return (
        <Badge
          style={{ backgroundColor: callStatus(params.row.call_status) }}
          count={params.row.call_status}
        ></Badge>
      );
    }
  }
];
