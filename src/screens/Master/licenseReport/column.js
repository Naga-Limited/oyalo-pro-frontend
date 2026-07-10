import React from 'react';
import {FaFilePdf} from 'react-icons/fa';
import {message, } from "antd";
import { isEmpty } from "ramda";
import { Badge } from 'antd';
import {colorName} from '../../../components/formComponents/CommonFunctions';

const incidentalDetails = (params) => {
  let incidentalCostArray = [];

  try {
    incidentalCostArray = params.row.incidental_cost ? JSON.parse(params.row.incidental_cost) : [];
  } catch (error) {
    message.error('Error parsing incidental_cost:', error);
  }

  // Check if incidentalCostArray is an array before mapping
  if (Array.isArray(incidentalCostArray)) {
    // Display the incidental cost in the column
    return incidentalCostArray.map((item) => (
      <div key={item.rowNumber}>
        <div>Incidental Cost: {item[`incidental_cost-${item.rowNumber}`]}</div>
        <div>Incidental Remark: {item[`incidental_remark-${item.rowNumber}`]}</div>
      </div>
    ));
  } else {
    // You can display a default value or handle the case in another way
    return <div>Default Value or Handling for Non-Array Incidental Cost</div>;
  }
};


export const column = [
  { key: '1', headerName: 'S.No', field: 'S.No', hide: false, width: 80 },
  { key: '2', headerName: 'Outlet Name', field: 'OutletName', hide: false, width: 300 },
  {
    key: '9', headerName: 'Outlet Status', field: 'outlet_status', hide: false, width: 200,
    renderCell: (params) => {
      return (
        <Badge
          style={{ backgroundColor: colorName(params.row.outlet_status) }} count={params.row.outlet_status}>
        </Badge>
      );
    }
  },
  { key: '3', headerName: 'License', field: 'License', hide: false, width: 300 },
  { key: '4', headerName: 'License Reg no', field: 'license_reg_no', hide: false, width: 180 },
  { key: '5', headerName: 'Validity Start Date', field: 'license_start_date', hide: false, width: 180 },
  { key: '6', headerName: 'Validity End Date', field: 'license_end_date', hide: false, width: 180 },
  { key: '7', headerName: 'Renewal Date', field: 'license_renewal_date', hide: false, width: 180 },
  {
    key: '8', headerName: 'Status', field: 'current_status', hide: false, width: 250,
    renderCell: (params) => {
      return (
        <Badge
          style={{ backgroundColor: colorName(params.row.current_status) }} count={params.row.current_status}>
        </Badge>
      );
    }
  },
  {
    key: '10', headerName: 'License Attachement', field: 'license_attachment', hide: false, width: 180,
    renderCell: (params) => (
      !isEmpty(params?.row?.license_attachment) ?

        <a href={params?.row?.license_attachment ?? ''} target="_blank" rel="noopener noreferrer"><FaFilePdf size={27} /></a>

        : 'No Attachement'
    )
  },
  { key: '11', headerName: 'Incidental Cost', field: 'incidental_cost', hide: false, width: 580, renderCell: incidentalDetails },
  // { key: '10', headerName: 'Status Reason', field: 'reject_status', hide: false, width: 200 },
];