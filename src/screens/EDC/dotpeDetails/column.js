
import { format } from 'date-fns';

function getEntryDate(params) {
  return `${format(new Date(params.row.tran_date), 'dd-MM-yyyy') }`;
}
function getSettlmentDate(params) {
  return `${format(new Date(params.row.settlement_date), 'dd-MM-yyyy') }`;
}
export const column = [
  { key: '1', headerName: 'S.No', field: 'id', hide: false, width: 100 },
  { key: '2', headerName: 'Outlet Code', field: 'outlet_code', hide: false, width: 100 },
  { key: '3', headerName: 'Outlet Name', field: 'outlet_name', hide: false, width: 180 },
  { key: '4', headerName: 'Settlment Date', field: 'settlement_date', hide: false, width: 140,
  valueGetter:getSettlmentDate    },
  { key: '5', headerName: 'Trans Date', field: 'tran_date', hide: false, width: 140,
  valueGetter:getEntryDate    },
  { key: '6', headerName: 'Invoice Number', field: 'invoice_number', hide: false, width: 180 },
  {
    key: '7', headerName: 'Payment Method', field: 'payment_method', hide: false, width: 180,  
  }, 
  {
    key: '8', headerName: 'Order Id', field: 'order_id', hide: false, width: 180,  
  },   
  {
    key: '9', headerName: 'utr', field: 'utr', hide: false, width: 180,  
  }, 
  { key: '10', headerName:'Final Amt', field: 'final_net_amt', hide: false, width:150},
];
