export const column = [

  {
    key: "1",
    headerName: "S.No",
    field: "S.No",
    hide: false,
    width: 60
  },
  {
    key: "2",
    headerName: "Outlet Name",
    field: "outlet",
    hide: false,
    width: 250
  },
  {
    key: '5', headerName: 'ORL Name', field: 'outlet_ORL', hide: false, width: 250,
    valueGetter: (params) => {
      if(params.row.add_outlet_ORL != null){
      return (params.row.outlet_ORL +' & '+  params.row.add_outlet_ORL);}
      else{
        return params.row.outlet_ORL; 
      }
    }
  },
 {
    key: '5', headerName: 'ORL Vendor Code', field: 'emp_vendor_code', hide: false, width: 150,
    valueGetter: (params) => {
      if(params.row.add_vendor_code != null){       
        return (params.row.emp_vendor_code +' & '+  params.row.add_vendor_code);
      }
      else
      {
        return params.row.emp_vendor_code;        
      }
    }
  },
  {
    key: '5', headerName: 'Amount', field: 'incentive_amount', hide: false, width: 150,
    valueGetter: (params) => {
    if(params.row.add_orl_incentive_amount != null){
        return (params.row.incentive_amount +' & '+  params.row.add_orl_incentive_amount);}
        else{
          return params.row.incentive_amount; 
        }
    }
  },
  {
    key: "6",
    headerName: "Score",
    field: "total_marks",
    hide: false,
    width: 120
  },
{
  key: '5', headerName: 'Payment_No', field: 'sap_payment_doc_no', hide: false, width: 150,
  valueGetter: (params) => {
  if(params.row.add_orl_sap_payment_doc_no != null){
      return (params.row.sap_payment_doc_no +' & '+  params.row.add_orl_sap_payment_doc_no);}
      else{
        return params.row.sap_payment_doc_no; 
      }
  }
},

{
  key: '6', headerName: 'Expense_No', field: 'sap_exp_doc_no', hide: false, width: 150,
  valueGetter: (params) => {
  if(params.row.add_orl_sap_exp_doc_no != null){
      return (params.row.sap_exp_doc_no +' & '+  params.row.add_orl_sap_exp_doc_no);}
      else{
        return params.row.sap_exp_doc_no; 
      }
  }
},

{
  key: '6', headerName: 'UTR', field: 'sap_payment_utr_no', hide: false, width: 150,
  valueGetter: (params) => {
  if(params.row.add_orl_sap_payment_utr_no != null){
      return (params.row.sap_payment_utr_no +' & '+  params.row.add_orl_sap_payment_utr_no);}
      else{
        return params.row.sap_payment_utr_no; 
      }
  }
},
{
  key: "11",
  headerName: "Payment_Process_date",
  field: "process_date",
  hide: false,
  width: 150
},

];
