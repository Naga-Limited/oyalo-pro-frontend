import React from 'react';
import { Image } from "antd";
import { isEmpty } from "ramda";

export const column = [
  { key: '1', headerName: 'S.No', field: 'id', hide: false, width: 100 },
  // { key: '2', headerName: 'ID/code', field: 'id', hide: false, width: 300 },
  // { key: '3', headerName: 'State Name', field: 'state', hide: false, width: 160 },
  { key: '4', headerName: 'Employee Code', field: 'employee_code', hide: false, width: 160 },
  { key: '5', headerName: 'Name', field: 'name', hide: false, width: 180 },
  {
    key: '3', headerName: 'Employee Image', field: 'image', hide: false, width: 180,
    renderCell: ( params ) => (
      !isEmpty( params?.row?.image ) ? <Image style={{ paddingLeft: "10px" }} width={50} src={params?.row?.image ?? ''} /> : 'No Image'
    )
  },
  { key: '7', headerName: 'Division', field: 'division_name', hide: false, width: 180 },
  { key: '8', headerName: 'Department', field: 'department_name', hide: false, width: 180 },
  { key: '9', headerName: 'Location', field: 'location', hide: false, width: 200 },
  { key: '10', headerName: 'Designation', field: 'designation_name', hide: false, width: 200 },
  { key: '11', headerName: 'Level', field: 'level_name', hide: false, width: 200 },
  { key: '12', headerName: 'Contact', field: 'contact', hide: false, width: 200 },
  { key: '13', headerName: 'Email', field: 'email', hide: false, width: 300 },
  { key: '14', headerName: 'Reporting Manager Code', field: 'report_id', hide: false, width: 200 },
  { key: '15', headerName: 'Reporting Manager Name', field: 'report_to', hide: false, width: 200 },
  {
    key: '16', headerName: 'Reporting Manager Designation', field: 'report_name', hide: false, width: 200
  },
  { key: '17', headerName: 'Status', field: 'status', hide: false, width: 200 },
];
