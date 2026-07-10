import React from "react";
import { colorName } from "../../../components/formComponents/CommonFunctions";
import { Badge } from "antd";
export const column = [
  { key: '1', headerName: 'S.No', field: 'id', hide: false, width: 60 },
  { key: '2', headerName: 'Outlet Code', field: 'outlet_code', hide: false, width: 110 },
  { key: '3', headerName: 'Outlet Name', field: 'outlet_name', hide: false, width: 250 },
  { key: '4', headerName: 'Group', field: 'material_group', hide: false, width: 180 },
  { key: '5', headerName: 'Material', field: 'material_code', hide: false, width: 130 },
  { key: '6', headerName: 'Description', field: 'material_description', hide: false, width: 280,},   
  { key: '7', headerName: 'UOM', field: 'uom', hide: false, width: 80,},   
  { key: '8', headerName: 'MOQ', field: 'moq', hide: false, width: 80,},  
  { key: '9', headerName: 'Stock Minimum Qty 7 days', field: 'stock_qty', hide: false, width: 120,},  
  { key: '10', headerName: 'Status', field: 'status', hide: false, width: 120,
  renderCell: (params) => {
    return (
      <Badge
        style={{ backgroundColor: colorName(params.row.status) }}
        count={params.row.status}
      ></Badge>
    );
  }},   
];
