import React from 'react';
import { Badge,
  //Button
 } from 'antd';
import {auditStatus} from '../../../components/formComponents/CommonFunctions';
//import {FaListUl} from 'react-icons/fa';

export const columnsubmittedholdrejectHR = [ 
  {
    key: "0",
    headerName: "S.No",
    field: "S.No",
    hide: false,
    width: 70
  },
  // {
  //   key: "1",
  //   headerName: "Zone",
  //   field: "zone_name",
  //   hide: false,
  //   width: 100
  // },
  {
    key: "2",
    headerName: "Outlet Name",
    field: "outlet_name",
    hide: false,
    width: 250
  },
  // {
  //   key: "3",
  //   headerName: "ORL Name",
  //   field: "outlet_ORL",
  //   hide: false,
  //   width: 150
  // },
  // {
  //   key: "4",
  //   headerName: "ORL V_Code",
  //   field: "emp_vendor_code",
  //   hide: false,
  //   width: 130
  // },

   
  { key: '3', headerName: 'ORL Name', field: 'outlet_ORL', hide: false, width: 250,
  valueGetter: (params) => {
    return (params.row.outlet_ORL +' - '+  params.row.emp_vendor_code);
  }
 },
  // {
  //   key: "5",
  //   headerName: "Audit Number",
  //   field: "audit_id",
  //   hide: false,
  //   width: 150
  // },
  {
    key: "6",
    headerName: "Month",
    field: "audit_month",
    hide: false,
    width: 80
  },
  {
    key: "7",
    headerName: "Date",
    field: "audit_date",
    hide: false,
    width: 120
  },
  {
    key: "8",
    headerName: "Score",
    field: "total_mark",
    hide: false,
    width: 90,
    valueGetter: (params) => {
      return (params.row.total_mark +' / '+  params.row.fullmarks);
    }
  },
  {
    key: "9",
    headerName: "Amount",
    field: "incentive_amount",
    hide: false,
    width: 90
  },
    {
    key: '10', headerName: 'Waiting At', field: 'payment_status', hide: false, width: 180,
    renderCell: (params) => {
      return (
       <Badge
          style={{ backgroundColor: auditStatus(params.row.payment_status) }} count={params.row.payment_status}>
        </Badge>
      );
    }
  },
//   { key: '1', headerName: 'S.No', field: 'S.No', hide: false, width: 100 },
//   // { key: '2', headerName: 'Document No', field: 'payment_document_no', hide: false, width: 200 },
//   { key: '3', headerName: 'Month', field: 'process_month', hide: false, width: 120 }, 
//   { key: '4', headerName: 'Incentive Value', field: 'incentive_value', hide: false, width: 150 },
//   { key: '5', headerName: 'Initiated Date', field: 'process_date', hide: false, width: 150 },
//   { key: '6', headerName: 'Incentive Outlet Count', field: 'incentive_outlet_count', hide: false, width: 180
//  },
//  { key: '6', headerName: 'Reject Remarks', field: 'remarks', hide: false, width: 280
// },
//   {
//     key: '9', headerName: 'Waiting At', field: 'inc_status', hide: false, width: 150,
//     renderCell: (params) => {
//       return (
//        <Badge
//           style={{ backgroundColor: auditStatus(params.row.inc_status) }} count={params.row.inc_status}>
//         </Badge>
//       );
//     }
//   },
//   // {
//   //   key: '9', headerName: 'View Status', field: '', hide: false, width: 100,
//   //   renderCell: () => {
//   //     return (
//   //     //  <Badge
//   //     //     style={{ backgroundColor: auditStatus(params.row.inc_status) }} count={params.row.inc_status}>
//   //     //   </Badge>
//   //    <Button style={{ backgroundColor: '#21819e' }}><FaListUl /></Button>
//   //     );
//   //   }
//   // },
];

