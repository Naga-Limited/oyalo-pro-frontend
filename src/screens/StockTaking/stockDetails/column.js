
//import { format } from 'date-fns';

// function getEntryDate(params) {
//   return `${format(new Date(params.row.date), 'dd-MM-yyyy') }`;
// }
export const column = [
  { key: '1', headerName: 'S.No',  field: 'S.No', hide: false, width: 100 },
  // { key: '2', headerName: 'Outlet Code', field: 'outlet_code', hide: false, width: 120 },
  // { key: '3', headerName: 'Outlet Name', field: 'outlet_name', hide: false, width: 250 },
  // { key: '4', headerName: 'Date', field: 'date', hide: false, width: 120,
  // valueGetter:getEntryDate    },
  { key: '5', headerName: 'Category Name', field: 'category_name', hide: false, width: 180 },
  // { key: '6', headerName: 'Item Type', field: 'item_type', hide: false, width: 130 },
  { key: '7', headerName: 'Item Name', field: 'item_name', hide: false, width: 280 },
  // {
  //   key: '8', headerName: 'MOU', field: 'measuring_unit', hide: false, width: 100,  
  // }, 
  { key: '9', headerName: 'Count', field: 'closing_balance', hide: false, width: 100 }, 
  ];
