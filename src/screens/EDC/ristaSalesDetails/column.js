import { format } from 'date-fns';

function getSalesDate(params) {
  return `${format(new Date(params.row.sale_date), 'dd-MM-yyyy') }`;
}
export const column = [
  { key: '1', headerName: 'S.No', field: 'id', hide: false, width: 100 },
  { key: '2', headerName: 'Outlet Code', field: 'outlet_code', hide: false, width: 130 },
  { key: '3', headerName: 'Outlet Name', field: 'outlet_name', hide: false, width: 250 },
  
  { key: '4', headerName: 'Invoice No', field: 'invoice_number', hide: false, width: 180 },
  {
    key: '5', headerName: 'Invoice Date', field: 'sale_date', hide: false, width: 180,  valueGetter:getSalesDate   
  }, 
  { key: '6', headerName: 'Payment Mode', field: 'payment_mode', hide: false, width: 200 },
  { key: '7', headerName: 'Payment Amount', field: 'payment_amount', hide: false, width: 200 }, 
  
];
