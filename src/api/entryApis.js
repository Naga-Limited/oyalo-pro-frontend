import client from './client';

const limit = 400;
const offset = 0;

//Entry
const getEntryType = ( { data } ) => client.post( 'audit-type', data, {} );
const uploadEntryImage = ( form, { headers } ) => client.post( 'audit-entry-imageupload', form, { headers } );
const addAuditEntry = ( { data } ) => client.post( 'audit-entry', data, {} );

const getAuditEntry = ( { path, data } ) => client.post( path, data, {} );
const getApproval = ( { path, data } ) => client.post( path, data, {} );
const getCapa = ( { path, data } ) => client.post( path, data, {} );
const getApprovalReport = ( { path, data } ) => client.post( path, data, {} );

const entryCheck = ( { data } ) => client.post( 'add-approval-status', data, {} );

const capaSubmit = ( { data } ) => client.post( 'capa-submit', data, {} );
const editAuditEntry = ( { data } ) => client.post( 'edit-audit-entry', data, {} );
const editApproval = ( { data } ) => client.post( 'edit-approval', data, {} );

const viewRecheck = ({ data }) => client.post("gets-audit-entries", data, {});

const addAuditNewEntry = ( { data } ) => client.post( 'audit-newentry', data, {} );
const getAuditDepCapa = ( { path, data } ) => client.post( path, data, {} );
const getAuditNewCapa = ( { path, data } ) => client.post( path, data, {} );
const getAuditNewApproval = ( { path, data } ) => client.post( path, data, {} );
const addAuditNewOutletApproveSubmit = ( data ) =>  client.post( 'audit-outlet-approval', data, {} );
const addAuditNewOutletRecheckSubmit = (data) => client.post('audit-outlet-recheck', data, {});
const addAuditDepCAPASubmit = (data) => client.post( 'audit-dep-capa-submit', data, {} );
const getAuditDepApproval = ( { path, data } ) => client.post( path, data, {} );
const getAuditReport = ( { path, data } ) => client.post( path, data, {} );
const addAuditDepApproveSubmit = ( data ) =>  client.post( 'audit-department-capa-approval', data, {} );
const addAuditDepRecheckSubmit = (data) => client.post('audit-department-recheck', data, {});
const getsNewAuditRecheck_msg = (data) => client.post('gets_new_audit_recheck_msg', data ,{});

const getAuditIncentiveHR = ( { path, data } ) => client.post( path, data, {} );

const getAuditIncentiveHRsubmitted = ( { path, data } ) => client.post( path, data, {} );

const getAuditCateWiseReport = ( { path, data } ) => client.post( path, data, {} );

const auditApproveIncentiveSubmit = ( data ) =>  client.post( 'audit-incentive-approval-hr', data, {} );
const auditRejectIncentiveSubmit = ( data ) =>  client.post( 'audit-incentive-reject-hr', data, {} );
const auditHoldIncentiveSubmit = ( data ) =>  client.post( 'audit-incentive-hold-hr', data, {} );

const getAuditApproveIncentive = ( { path, data } ) => client.post( path, data, {} );

const getAuditIncentiveSubmitDetails = ( { path, data } ) => client.post( path, data, {} );
const auditApproveIncentiveOH = ( data ) =>  client.post( 'incentive-OH-approval', data, {} );
const auditRejectIncentiveOH = ( data ) =>  client.post( 'incentive-OH-reject', data, {} );

const getByMonthAudit = ( { path, data } ) => client.post( path, data, {} );

const getAuditIncentiveOH = ( { path, data } ) => client.post( path, data, {} );
const getAuditIncentiveAC = ( { path, data } ) => client.post( path, data, {} );

const auditApproveIncentiveAC  = ( data ) =>  client.post( 'incentive-AC-approval', data, {} );
const auditRejectIncentiveAC  = ( data ) =>  client.post( 'incentive-AC-reject', data, {} );

const getAuditIncentiveBH =  ( { path, data } ) => client.post( path, data, {} );
const auditApproveIncentiveBH  = ( data ) =>  client.post( 'incentive-BH-approval', data, {} );
const auditRejectIncentiveBH  = ( data ) =>  client.post( 'incentive-BH-reject', data, {} );


const hrStatusUpdate = ( data ) =>  client.post( 'hr-status-update', data, {} );

const hrHoldRelease = ( data ) =>  client.post( 'hr-status-hold-release', data, {} );


const getAuditEntryDetails = ( { path, data } ) => client.post( path, data, {} );

const getAuditPayment = ( { path, data } ) => client.post( path, data, {} );

const getPaymentCurrentStatus = ( { path, data } ) => client.post( path, data, {} );

const getAuditIncentiveReject = ( { path, data } ) => client.post( path, data, {} );

const rejectOutletIncentive =  ( data ) =>  client.post( 'incentive-reject', data, {} );

const auditReSubmitHR = ( data ) =>  client.post( 'incentive-reapprove', data, {} );

const accPaymentRelease = ( data ) =>  client.post( 'incentive-FinalAC-approval', data, {} );

const auditOrlChangeHr = ( data ) =>  client.post( 'audit-incentive-orl-change-hr', data, {} );
const getAuditIncentiveHoldRejectHr = ( { path, data } ) => client.post( path, data, {} );
const getPaymentReport = ( { path, data } ) => client.post( path, data, {} );
const getPaymentOutletwiseReport = ( { path, data } ) => client.post( path, data, {} );
const hrRejectRelease = ( data ) =>  client.post( 'hr-status-reject-release', data, {} );
const hrRemoveRelease = ( data ) =>  client.post( 'hr-status-remove-release', data, {} );

const getEmployeeMasterOnlyORL  =  () => client.get('get-employeemaster-only-ORL', { limit, offset }, {} );

const auditOrlChangeAddHr =  ( data ) =>  client.post( 'audit-incentive-orl-change-add-hr', data, {} );

const auditOrlAddHr =  ( data ) =>  client.post( 'audit-incentive-orl-add-hr', data, {} );

const getBackOfficeclosureDetails = ( { path, data } ) => client.post( path, data, {} );
const getBackOfficeReport = ( { path, data } ) => client.post( path, data, {} );

const getOutletDayClosureDetails = ( {path, data} ) => client.post( path, data,{} );
const getSalesReport = ( {path, data} ) => client.post( path, data,{} );

const getPaymentRequest = (emp_code) =>
  client.get("get-payment-request-ms", { limit, offset, emp_code }, {});

const postPaymentRequest = (val) =>
  client.post(
    "post-payment-request-ms",

    val?.data,

    {}
  );

const getPaymentOHRequest = () =>
  client.get("get-ticket-oh-claimlist", { limit, offset }, {});

const getPaymentAHRequest = () =>
  client.get("get-ticket-ah-claimlist", { limit, offset }, {});

const postPaymentOHRequest = (val) =>
  client.post(
    "get-ticket-oh-update",

    val,

    {}
  );
const postPaymentAHUpdate = (val) =>
  client.post(
    "get-ticket-ah-update",

    val,

    {}
  );

const postPaymentAHRequest = (val) =>
  client.post(
    "get-ticket-ah-update",

    val,

    {}
  );

const postPaymentAHClaimRequest = (val) =>
  client.post(
    "get-ticket-ah-payment-update",

    val,

    {}
  );

const cancelPaymentRequest = (val) =>
  client.post(
    "post-ticket-cancel-claimlist",

    val,

    {}
  );

const forgetpasswordApi = (val) => {
  return client.post(
    "forget-password",
    {
      email: val.employee_code,
      employee_code: val.employee_code,
    },
    {}
  );
};
const getUserReport = () =>
  client.get("get-employeeMaster1", { limit, offset }, {});

const logincheckApi = (val) =>
  client.post(
    "chck_time",
    {
      employee_code: val.emp_date,
    },
    {}
  );
const getEmailMappingRequest = () =>
  client.get("get-email-mapping-list", { limit, offset }, {});

const addEmailMapping = ({ data }) =>
  client.post("post-email-mapping-list", JSON.stringify(data), {
    headers: { "content-type": "application/json" },
  });

const updateEmailMApping = ({ data }) =>
  client.post("update-email-mapping-list", JSON.stringify(data), {
    headers: { "content-type": "application/json" },
  });

const getEmployeeUnapproveAmount = (val) =>
  client.post(
    "get-employee-unapprove-amount",

    val,

    {}
  );

const updatePaymentApprove = (val) =>
  client.post(
    "update-cash-received",

    val,

    {}
  );

const updatePaymentQuotation = (val) =>
  client.post(
    "update-reject-ticket-quotation",

    val,

    {}
  );

const updateSapPaymentQuotation = (val) =>
  client.post(
    "update-sap-petty-cash",

    val,

    {}
  );

const updatePoPayment = (val) =>
  client.post(
    "update-po-proccessed",

    val,

    {}
  );

const getBalRequest = (val) => client.get("get-admin-balance", val, {});

const addEntryForm =  ({ data }) =>  client.post( 'add-Entry-Form', data, {} );
const getEntryForm = ( {path, data} ) => client.post( path, data,{} );
const updateEntryForm = ({ data }) =>  client.post( 'update-Entry-Form', data, {} );


const entryApis = {
  getEntryType,
  uploadEntryImage,
  addAuditEntry,
  getApproval,
  getCapa,
  entryCheck,
  getAuditEntry,
  getApprovalReport,
  capaSubmit,
  editAuditEntry,
  editApproval,
  viewRecheck,
  addAuditNewEntry,
  getAuditNewCapa,
  getAuditNewApproval,
  addAuditNewOutletApproveSubmit,
  addAuditNewOutletRecheckSubmit,
  getAuditDepCapa,
  addAuditDepCAPASubmit,
  getAuditDepApproval,
  addAuditDepApproveSubmit,
  addAuditDepRecheckSubmit,
  getAuditReport,
  getsNewAuditRecheck_msg,
  getAuditIncentiveHR,
  getAuditIncentiveHRsubmitted,
  getAuditCateWiseReport,
  auditApproveIncentiveSubmit,
  auditRejectIncentiveSubmit,
  auditHoldIncentiveSubmit,
  getAuditApproveIncentive,
  getAuditIncentiveSubmitDetails,
  auditApproveIncentiveOH,
  auditRejectIncentiveOH,
  hrStatusUpdate,
  getByMonthAudit,
  getAuditIncentiveOH,
  getAuditIncentiveAC,
  auditApproveIncentiveAC,
  auditRejectIncentiveAC,
  getAuditIncentiveBH,
  getAuditEntryDetails,
  auditApproveIncentiveBH,
  auditRejectIncentiveBH,
  getAuditPayment,
  getPaymentCurrentStatus,
  getAuditIncentiveReject,
  rejectOutletIncentive,
  auditReSubmitHR,
  hrHoldRelease,
  accPaymentRelease,
  getAuditIncentiveHoldRejectHr,
  auditOrlChangeHr,
  getPaymentReport,
  getPaymentOutletwiseReport,
  hrRejectRelease,
  hrRemoveRelease,
  getEmployeeMasterOnlyORL,
  auditOrlChangeAddHr,
  auditOrlAddHr,
  getBackOfficeclosureDetails,
  getBackOfficeReport,
  getOutletDayClosureDetails,   //for to post day sales closure details
  getSalesReport,  //for to update day sales closure details like denomination deposit
  
  getPaymentRequest,
  postPaymentRequest,
  getPaymentOHRequest,
  getPaymentAHRequest,
  postPaymentOHRequest,
  postPaymentAHUpdate,
  postPaymentAHRequest,
  cancelPaymentRequest,
  postPaymentAHClaimRequest,
  getUserReport,
  forgetpasswordApi,
  logincheckApi,
  getEmailMappingRequest,
  addEmailMapping,
  updateEmailMApping,

  getEmployeeUnapproveAmount,
  updatePaymentApprove,
  updatePaymentQuotation,
  updateSapPaymentQuotation,
  updatePoPayment,
  getBalRequest,

  addEntryForm,
  getEntryForm,
  updateEntryForm

};

export default entryApis;
