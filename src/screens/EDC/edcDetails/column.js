
import { format } from 'date-fns';

function getEntryDate(params) {
  return `${format(new Date(params.row.tran_date), 'dd-MM-yyyy') }`;
}
function getProcessDate(params) {
  return `${format(new Date(params.row.process_date), 'dd-MM-yyyy') }`;
}
export const column = [
  { key: '1', headerName: 'S.No', field: 'id', hide: false, width: 100 },
  { key: '2', headerName: 'Outlet Name', field: 'outlet_name', hide: false, width: 250 },
  { key: '3', headerName: 'Trans Date', field: 'tran_date', hide: false, width: 160,
  valueGetter:getEntryDate    },
  { key: '4', headerName: 'Process Date', field: 'process_date', hide: false, width: 160,
  valueGetter:getProcessDate    },
  { key: '5', headerName: 'MID', field: 'mid', hide: false, width: 180 },
  {
    key: '6', headerName: 'RRN', field: 'rrn', hide: false, width: 180,  
  }, 
  { key: '7', headerName: 'Gross Amt', field: 'gross_amt', hide: false, width: 200 },
  { key: '8', headerName: 'Net Amt', field: 'net_amt', hide: false, width: 200 }, 
  
];
