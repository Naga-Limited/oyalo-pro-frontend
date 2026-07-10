import React from "react";
import { Image } from "antd";
import { format } from 'date-fns';
// Utility function to convert a string to Title Case

function getInvoiceDate(params) {

  return `${format(new Date(params.row.date), 'dd-MM-yyyy') }`;
}
export const column = [
  { key: "1", headerName: "S.No", field: "S.No", hide: false, width: 80 },
  {
    key: "2",
    headerName: "Name",
    field: "name",
    hide: false,
    width: 150
  },
  {
    key: "3",
    headerName: "Date",
    field: "date",
    hide: false,
    width: 100,
    valueGetter:getInvoiceDate
  },
  {
    key: "4",
    headerName: "Company Name",
    field: "company_name",
    hide: false,
    width: 250
  },
  {
    key: "5",
    headerName: "Segment",
    field: "segment",  
    hide: false,
    width: 150
  },
 
  {
    key: "6",
    headerName: "Type",
    field: "type",
    hide: false,
    width: 200
  },

  {
    key: "7",
    headerName: "Attachement",
    field: "image",
    hide: false,
    width: 200,
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
    key: "8",
    headerName: "Address",
    field: "address",
    hide: false,
    width: 200
  },

  {
    key: "9",
    headerName: "State",
    field: "state",
    hide: false,
    width: 200
  },

  {
    key: "10",
    headerName: "Country",
    field: "country",
    hide: false,
    width: 200
  },

  {
    key: "11",
    headerName: "Pincode",
    field: "pincode",
    hide: false,
    width: 150
  },
  {
    key: "12",
    headerName: "Website",
    field: "website",
    hide: false,
    width: 150
  },  
  {
    key: "13",
    headerName: "Contact Person Name",
    field: "contact_person_name",
    hide: false,
    width: 190
  },
  {
    key: "14",
    headerName: "Designation",
    field: "designation",
    hide: false,
    width: 150
  },
  {
    key: "15",
    headerName: "Mobile No",
    field: "mobile_number",
    hide: false,
    width: 150
  },
  {
    key: "16",
    headerName: "Landline No",
    field: "landline_number",
    hide: false,
    width: 150
  },
  {
    key: "17",
    headerName: "Mail ID",
    field: "mail_id",
    hide: false,
    width: 150
  },
  {
    key: "18",
    headerName: "Intersested in Sample / Order",
    field: "intersested_in_sample_or_order",
    hide: false,
    width: 200
  },
  {
    key: "19",
    headerName: "Product Name",
    field: "product_name",
    hide: false,
    width: 150
  },
  {
    key: "20",
    headerName: "Product Category",
    field: "product_category",
    hide: false,
    width: 150
  },
  {
    key: "21",
    headerName: "UOM",
    field: "uom",
    hide: false,
    width: 150
  },
  {
    key: "22",
    headerName: "Quantity",
    field: "quantity",
    hide: false,
    width: 150
  },
  {
    key: "23",
    headerName: "Timeline for Purchase",
    field: "timeline_for_purchase",
    hide: false,
    width: 150
  },
  {
    key: "24",
    headerName: "Special Requirements or Specifications",
    field: "spe_req_or_specifications",
    hide: false,
    width: 150
  },
  {
    key: "25",
    headerName: "Delivery Destination",
    field: "delivery_destination",
    hide: false,
    width: 150
  },
];
