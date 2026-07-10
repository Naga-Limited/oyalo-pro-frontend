
import { format } from 'date-fns';

function getEntryDate(params) {
  return `${format(new Date(params.row.tran_date), 'dd-MM-yyyy')}`;
}

export const column = [
  { key: '1', headerName: 'S.No', field: 'id', hide: false, width: 100 },
  { key: '2', headerName: 'Outlet Code', field: 'outlet_code', hide: false, width: 100 },
  { key: '3', headerName: 'Outlet Name', field: 'outlet_name', hide: false, width: 270 }, 
  { key: '4', headerName: 'Trans Date', field: 'tran_date', hide: false, width: 140,
    valueGetter: getEntryDate },
  { key: '5', headerName: 'Merchant Id', field: 'merchant_id', hide: false, width: 180 },
  { key: '6', headerName: 'Transaction Id', field: 'tran_id', hide: false, width: 180 },
  { key: '7', headerName: 'UTR', field: 'utr', hide: false, width: 180 },
  { key: '8', headerName: 'Closed Date', field: 'closed_date', hide: false, width: 180 },
  { key: '8', headerName: 'Order Status', field: 'order_status', hide: false, width: 180 },
  { key: '9', headerName: 'Cancel Reason', field: 'cancel_reason', hide: false, width: 180 },
  { key: '10', headerName: 'Gross Amt', field: 'gross_order_amt', hide: false, width: 150 },
];
