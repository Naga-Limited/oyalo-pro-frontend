import React from "react";
import { colorName } from "../../../components/formComponents/CommonFunctions";
import { Badge } from "antd";
export const column = [
  { key: '1', headerName: 'S.No', field: 'id', hide: false, width: 100 },
  { key: '2', headerName: 'Outlet Code', field: 'outlet_code', hide: false, width: 160 },
  { key: '3', headerName: 'Outlet Name', field: 'outlet_name', hide: false, width: 230 },
  { key: '4', headerName: 'MID', field: 'mid', hide: false, width: 280,},   
  { key: '5', headerName: 'Merchant ID', field: 'merchant_id', hide: false, width: 280,},   
  { key: '6', headerName: 'Status', field: 'status', hide: false, width: 180,
  renderCell: (params) => {
    return (
      <Badge
        style={{ backgroundColor: colorName(params.row.status) }}
        count={params.row.status}
      ></Badge>
    );
  }},   
];
