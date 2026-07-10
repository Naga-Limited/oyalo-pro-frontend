import React from 'react';
import { format } from 'date-fns';
import { Badge,message } from 'antd';
import {colorName} from '../../../components/formComponents/CommonFunctions';
function getstartDate(params) {

  return `${format(new Date(params.row.license_start_date), 'dd-MM-yyyy') }`;
}
function getendDate(params) {

  return `${format(new Date(params.row.license_start_date), 'dd-MM-yyyy') }`;
}
function getrenewalDate(params) {

  return `${format(new Date(params.row.license_renewal_date), 'dd-MM-yyyy') }`;
}

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
  { key: '3', headerName: 'License', field: 'License', hide: false, width: 300 },
  { key: '4', headerName: 'License Reg no', field: 'license_reg_no', hide: false, width: 180 },
  { key: '5', headerName: 'Validity Start Date', field: 'license_start_date', hide: false, width: 180 ,valueGetter:getstartDate },
  { key: '6', headerName: 'Validity End Date', field: 'license_end_date', hide: false, width: 180 ,valueGetter:getendDate},
  { key: '7', headerName: 'Renewal Date', field: 'license_renewal_date', hide: false, width: 180,valueGetter:getrenewalDate },
  { key: '8', headerName: 'Days to go', field: 'Days to go', hide: false, width: 180 },
 
  {
    key: '9', headerName: 'Status', field: 'currentstatus', hide: false, width: 200,
    renderCell: (params) => {
      return (


        <Badge
          style={{ backgroundColor: colorName(params.row.currentstatus) }} count={params.row.currentstatus} offset={[10, 10]}>
        </Badge>


      );
    }
  },
  { key: '11', headerName: 'Incidental Cost', field: 'incidental_cost', hide: false, width: 580, renderCell: incidentalDetails },
];