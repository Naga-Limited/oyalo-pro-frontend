// import { format } from "date-fns";
// import React from "react";
// import { stockStatus } from "../../../components/formComponents/CommonFunctions";
// import { Badge } from "antd";

// function getExpiryDate(params) {
//   return `${format(new Date(params.row.expiry_date), "dd-MM-yyyy")}`;
// }
// export const column = [
//   { key: "1", headerName: "S.No", field: "id", hide: false, width: 80 },
//   {
//     key: "2",
//     headerName: "Outlet Code",
//     field: "outlet_code",
//     hide: false,
//     width: 110
//   },
//   {
//     key: "3",
//     headerName: "Outlet Name",
//     field: "outlet_name",
//     hide: false,
//     width: 250
//   },
//   {
//     key: "4",
//     headerName: "Category",
//     field: "category",
//     hide: false,
//     width: 180
//   },
//   {
//     key: "5",
//     headerName: "Product Name",
//     field: "name",
//     hide: false,
//     width: 200
//   },
//   { 
//     key: "6",
//     headerName: "SKU",
//     field: "sku", 
//     hide: false, 
//     width: 120 
//   },
//   {
//     key: "7",
//     headerName: "Batch No",
//     field: "batch_number",
//     hide: false,
//     width: 120
//   },
//   {
//     key: "8",
//     headerName: "Measuring Unit",
//     field: "measuring_unit",
//     hide: false,
//     width: 130
//   },
//   {
//     key: "9",
//     headerName: "Qty",
//     field: "qty_per_batch",
//     hide: false,
//     width: 80
//   },
//   {
//     key: "10",
//     headerName: "Expiry Date",
//     field: "expiry_date",
//     hide: false,
//     width: 120,
//     valueGetter: getExpiryDate
//   },
//   {
//     key: "11",
//     headerName: "Outlet Status",
//     field: "outlet_status",
//     hide: false,
//     width: 140,
//     renderCell: (params) => {
//       const status = params.row.outlet_status;
//       const statusText = status == "1" ? "Active" : "In Active";
//       const backgroundColor = stockStatus(status);

//       return <Badge style={{ backgroundColor }} count={statusText}></Badge>;
//     }
//   }
// ];


import { format } from "date-fns";
import React from "react";
// import { stockStatus } from "../../../components/formComponents/CommonFunctions";
// import { Badge } from "antd";

function getFormattedExpiryDate(date) {
  return format(new Date(date), "dd-MM-yyyy");
}

function ExpiryDateCell(params) {
  const expiryDate = new Date(params.row.expiry_date);
  const formattedDate = getFormattedExpiryDate(expiryDate);
  const isExpired = expiryDate < new Date();

  const cellStyle = {
    color: isExpired ? "red" : "inherit"
  };

  return <span style={cellStyle}>{formattedDate}</span>;
}

export const column = [
  // { key: "1", headerName: "S.No", field: "id", hide: false, width: 80 },
  // {
  //   key: "2",
  //   headerName: "Outlet Code",
  //   field: "outlet_code",
  //   hide: false,
  //   width: 110
  // },
  // {
  //   key: "3",
  //   headerName: "Outlet Name",
  //   field: "outlet_name",
  //   hide: false,
  //   width: 250
  // },
  {
    key: "1",
    headerName: "Category",
    field: "category",
    hide: false,
    width: 180
  },
  {
    key: "2",
    headerName: "Product Name",
    field: "name",
    hide: false,
    width: 200
  },
  // {
  //   key: "6",
  //   headerName: "SKU",
  //   field: "sku",
  //   hide: false,
  //   width: 120
  // },
  // {
  //   key: "7",
  //   headerName: "Batch No",
  //   field: "batch_number",
  //   hide: false,
  //   width: 120
  // },
  // {
  //   key: "8",
  //   headerName: "Measuring Unit",
  //   field: "measuring_unit",
  //   hide: false,
  //   width: 130
  // },

  {
    key: "3",
    headerName: "Expiry Date",
    field: "expiry_date",
    hide: false,
    width: 120,
    renderCell: ExpiryDateCell
  },
    {
    key: "4",
    headerName: "Qty",
    field: "qty_per_batch",
    hide: false,
    width: 80
  },
  // {
  //   key: "11",
  //   headerName: "Outlet Status",
  //   field: "outlet_status",
  //   hide: false,
  //   width: 140,
  //   renderCell: (params) => {
  //     const status = params.row.outlet_status;
  //     const statusText = status == '1' ? 'Active' : 'In Active';
  //     const backgroundColor = stockStatus(status);

  //     return <Badge style={{ backgroundColor }} count={statusText}></Badge>;
  //   }
  // }
];
