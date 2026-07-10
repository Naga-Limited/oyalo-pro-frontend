import client from './client';

const limit = 400;
const offset = 0;

//subMaster
const addState = ( { data } ) => client.post( 'add-state', data, {} );
const updateState = ( { data } ) => client.post( 'update-state', data, {} );
const getStates = () => client.get( 'getstate', { limit, offset }, {} );

const addZonal = ( { data } ) => client.post( 'add-zonal', data, {} );
const updateZonal = ( { data } ) => client.post( 'update-zonal', data, {} );
const getZonal = () => client.get( 'getzonal', { limit, offset }, {} );

const addSubZonal = ( { data } ) => client.post( 'add-subzonal', data, {} );
const getSubZonal = () => client.get( 'getsubzonal', { limit, offset }, {} );
const updateSubZonal = ( { data } ) => client.post( 'update-subzonal', data, {} );

const setCity = ( { data } ) => client.post( 'add-city', data, {} );
const getCity = () => client.get( 'getcity', { limit, offset }, {} );
const updateCity = ( { data } ) => client.post( 'update-city', data, {} );

const addDivision = ( { data } ) => client.post( 'add-division', data, {} );
const getDivision = () => client.get( 'getdivision', { limit, offset }, {} );
const updateDivision = ( { data } ) => client.post( 'update-division', data, {} );

const getDepartment = () => client.get( 'getdepartment', { limit, offset }, {} );
const addDepartment = ( { data } ) => client.post( 'add-department', data, {} );
const updateDepartment = ( { data } ) => client.post( 'update-department', data, {} );

const addDesignation = ( { data } ) => client.post( 'add-degignation', data, {} );
const getDesignation = () => client.get( 'getdegignation', { limit, offset }, {} );
const updateDesignation = ( { data } ) => client.post( 'update-degignation', data, {} );

const getEmployeeLevel = () => client.get( 'getlevel', { limit, offset }, {} );
const addEmployeeLevel = ( { data } ) => client.post( 'add-level', data, {} );
const updateEmployeeLevel = ( { data } ) => client.post( 'update-level', data, {} );

const addOutletMaster = ( { data } ) => client.post( 'add-outletMaster', data, {} );
const updateOutletMaster = ( { data } ) => client.post( 'update-outletMaster', data, {} );
const getOutletMaster = (empId) => client.get("get-outletMaster?employee_id=" + empId, { limit, offset }, {});

const getORLName = () => client.get( "get-orl-employees", { limit, offset }, {} )


const addEmployeeMaster = ( { data } ) => client.post( "add-employeeMaster", data, {} )
const updateEmployeeMaster = ( { data } ) => client.post( "update-employeeMaster", data, {} )
const getEmployeeMaster = () => client.get( "get-employeeMaster", { limit, offset }, {} )

const getModulesList = () => client.get( "get-module", { limit, offset }, {} )
const getSubModulesList = () => client.get( "get-submodule", { limit, offset }, {} )
const getModulesScreenList = () => client.get( "get-modulescreen", { limit, offset }, {} )
const getReport = () => client.get( "get-report", { limit, offset }, {} )
const getEmployeeMapping = () => client.get( "get-employee-mapping", { limit, offset }, {} )
const addEmployeeMapping = ( { data } ) => client.post( "add-employee-mapping", JSON.stringify( data ), { headers: { 'content-type': 'application/json' } } )
const updateEmployeeMApping = ( { data } ) => client.post( "update-employee-mapping", JSON.stringify( data ), { headers: { 'content-type': 'application/json' } } )

const loginApi = ( val ) => client.post( 'login', { "email": val.email, "employee_code": val.employee_code, "password": val.Password, "type": val.type, "code": val.code }, {} )
const updatePass = ( val ) => client.post( 'employee-update-password', { "employee_code": val.employee_code, "password": val.Password }, {} )
const getBadgeCount = () => client.get( "get-allmenucounts", { limit, offset }, {} )

//License
const getLicense = () => client.get('get-license', { limit, offset }, {});
const addLicense = ({ data }) => client.post("add-license-type", data, {});
const addPeriod = ({ data }) => client.post("add-period", data, {});
const getPeriod = () => client.get("getperiod", { limit, offset }, {});
const updatePeriod = ({ data }) => client.post("update-period", data, {});
const getlicensetype = () => client.get("getlicensetype", { limit, offset }, {});
const updateLicense = ({ data }) => client.post("update-license-type", data, {});  
//Get days
const getDays = () => client.get( 'get-days', { limit, offset }, {} );
//renewal
const getRenewal= () => client.get("get-renewal", { limit, offset }, {});
const updaterenewal = ({ data }) => client.post("update-renewal", data, {});
//approve
const getApprove= () => client.get("approve-request", { limit, offset }, {});
const updateApprove = ({ data }) => client.post("validate-request", data, {});
//Edit License
const getEditLicense= () => client.get("edit-single-license", { limit, offset }, {});
const saveEditLicense = ({ data }) => client.post("update-single-license", data, {}); 
const getLicenseReport= () => client.get("license-report", { limit, offset }, {});
//Active License
const getActiveLicense= () => client.get("get-active-license", { limit, offset }, {});
const saveActiveLicense = ({ data }) => client.post("add-active-license", data, {});
const updateActiveLicense = ({ data }) => client.post("update-active-license", data, {});  
//license det
const addLicenseDetail = ({ data }) => client.post("add-license", data, {});
const getLicenseDetail = () => client.get("get-licensedet", { limit, offset }, {});
const updateLicenseDetail = ({ data }) => client.post("update-license", data, {});
//Rohini
const getAllImage = () => client.get('get-image-training',{ limit,offset }, {});
const getAllVideo = () => client.get('get-video-training',{ limit,offset }, {});
const getAllDocument = ()=> client.get('get-doc-training',{ limit,offset }, {});
const getAllFiles =() => client.get('get-all-training',{ limit,offset }, {});



const addDefinitions = ( { data } ) => client.post( 'add-definitions', data, {} );
const getDefinitions = () => client.get( 'get-definitions', { limit, offset }, {} );
const updateDefinitions = ( { data } ) => client.post( 'update-Definitions', data, {} );

const addDefinitionsList = ( { data } ) => client.post( 'add-definitions-list', data, {} );
const getDefinitionsList = () => client.get( 'get-definitions-list', { limit, offset }, {} );
const updateDefinitionsList = ( { data } ) => client.post( 'update-definitions-list', data, {} );

const getCrewMaster = () => client.get( 'get-crew-master', { limit, offset }, {} );
const addCrewMaster = ( { data } ) => client.post( 'add-crew-master', data, {} );
const updateCrewMaster = ( { data } ) => client.post( 'update-crew-master', data, {} );
const getAllSalesCustomer  =  ( { path, data } ) => client.post( path, data,{} );
const getAuditCategoryWiseReport = ( { path, data } ) => client.post( path, data,{} );

const update_dayclosure_details = ( { data } ) => client.post( "update-dayclosure-Details", data, {} )
const update_mismatch_details = ( { data } ) => client.post( "update-mismatch-details", data, {} )
const update_dayclosure_verification = ( { data } ) => client.post( "update-dayclosure-verification", data, {} )
const get_rista_Sales_Details = ( { data } ) => client.post( "get-rista-Sales-Details", data, {} )
const get_Sales_Details = ( { data } ) => client.post( "get-Sales-Details", data, {} )
const get_Crew_Details = ( { data } ) => client.post( "get-Crew-Details", data, {} )
const get_Revision_Details  = ( { data } ) => client.post( "get-Revision-Details", data, {} )
const get_Attachement_Details  = ( { data } ) => client.post( "get-Attachement-Details", data, {} )
//call status Master

const addCallStatus = ( { data } ) => client.post( 'add-CallStatus', data, {} );
const getCallStatus = () => client.get( 'get-CallStatus', { limit, offset }, {} );
const updateCallStatus = ( { data } ) => client.post( 'update-CallStatus', data, {} );

const getRistaCustomerSale = ( { path, data } ) => client.post( path, data, {} );

// customer Master

const addCustomerMaster = ( { data } ) => client.post( 'add-CallStatus', data, {} );
const getCustomerMaster = () => client.post( 'get-rista-customer', {} );
const updateCustomerMaster = ( { data } ) => client.post( 'update-CallStatus', data, {} );

const addCallBackEntry = ( { data } ) => client.post( 'add-Call-Back-Entry', data, {} );
const getCallBackEntry =  ( { path, data } ) => client.post( path, data,{} );

const getCallBackEntryApproval =  ( { path, data } ) => client.post( path, data,{} );
const getCallBackEntryReport =  ( { path, data } ) => client.post( path, data,{} );
const addCallEntryApprove = ( data ) => client.post( 'add-CallEntry-approve', data, {} );
//const addCallEntryReject = ( data ) => client.post( 'add-CallEntry-reject', data, {} );

const getCalldefStatus = () => client.get( 'get-call-list', { limit, offset }, {} );
const getEditCallBackEntry = ( { path, data } ) => client.post( path, data,{} );
const updateCallBackEntry = ( { data } ) => client.post( 'update-CallBackEntry', data, {} );

const getAllMappedOutlet = () => client.get('get-all-mapped-outlet' ,{});
const getDefinitionsFilter = ( { path, data } ) => client.post( path, data,{} );

const getEquipmentMaster = () => client.get( 'get-EquipmentMaster', { limit, offset }, {} );
const addEquipmentMaster =( { data } ) => client.post( 'add-EquipmentMaster', data, {} );
const updateEquipmentMaster = ( { data } ) => client.post( 'update-EquipmentMaster', data, {} );

const getDayPlanMapping = () => client.get( 'get-DayPlan-mapping', { limit, offset }, {} );
const addDayPlanMapping = ( { data } ) => client.post( 'add-DayPlan-mapping', data, {} );
const updateDayPlanMapping = ( { data } ) => client.post( 'update-DayPlan-mapping', data, {} );

const getDeepCleaning = ( { path, data } ) => client.post( path, data, {} );
const addDeepCleanEntry = ( { data } ) => client.post( 'add-DeepClean-entry', data, {} );
const getDeviationReport = ( { path, data } ) => client.post( path, data, {} );

const getOutlet = () => client.get('get-outlet' ,{ limit, offset },{});
const getEditDeepCleaningEntry = ( { path, data } ) => client.post( path, data, {} );
const updateDeepCleanEntry =  ( { data } ) => client.post( 'update-DeepClean-entry', data, {} );
const getDeepCleanApproval = ( { path, data } ) => client.post( path, data, {} );
const addDeepCleanEntryApprove = ( data ) => client.post( 'add-DeepClean-entry-approve', data, {} );


const getPaymentRequest = (emp_code, date) => {
   if (date) {
    return client.get(
      "get-payment-request-ms?" + date,
      { limit, offset, emp_code },
      {}
    );
  } else {
    return client.get(
      "get-payment-request-ms",
      { limit, offset, emp_code },
      {}
    );
  }
};

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

const getPettyCashRequest = (data) => { 
  function objToString(obj) {
    var str = "";
    for (var p in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, p)) {
        str += p + "=" + obj[p] + "&";
      }
    }
    return str;
  }
  let NewData = objToString(data);  
  let val = {};
  // val = objToString(val);  
  if (val) {
    return client.get("get-petty-claimlist?" + NewData, val, {});
  } else {
    return client.get("get-petty-claimlist", val, {});
  }
};

const updatePettyCashRequest = (val) =>
  client.post(
    "add-petty-claimlist",

    val,

    {}
  );

const getPettyBalRequest = (val) =>
  client.get("get-pettycash-balance", val, {});

const updatePettyCashRequestData = (val) =>
  client.post(
    "update-petty-claimlist-status",
    val,

    {}
  );

const updatePettyCashRequestPut = (val) =>
  client.post(
    "update-petty-post",
    val,

    {}
  );

  const getExpenseList = (val) => client.get("expense-list", val, {});

    
const addBudgetMaster =  ( { data } ) => client.post( 'add-BudgetMaster', data, {} );
const updateBudgetMaster = ( { data } ) => client.post( 'update-BudgetMaster', data, {} );
const getBudgetMaster = ( { path, data } ) => client.post( path, data, {} );
const getEBReadingEntry = ( { path, data } ) => client.post( path, data, {} );
const addEBReadingEntry = ( { data } ) => client.post( 'add-EBReadingEntry', data, {} );
const getEBReadingEditEntry = ( { path, data } ) => client.post( path, data, {} );
const editEBReadingEntry = ( { data } ) => client.post( 'edit-EBReadingEntry', data, {} );
const getEBReadingApprovalEntry = ( { path, data } ) => client.post( path, data, {} );
const addEBReadingapprove =  ( data ) => client.post( 'add-EBReading-approve', data, {} );
const getEBReadingReport = ( { path, data } ) => client.post( path, data, {} );

const getDashboard = ( { path, data } ) => client.post( path, data, {} );

const saveUploadCsvStock = (data) =>  client.post('update-csv-stock', data, {});
const getUploadedRistaStock = ( { path, data } ) => client.post( path, data, {} );
const getConsumableMaster = ( data ) => client.post( 'get-Consumable-Master', data, {} );
const addConsumableMaster =  ( { data } ) => client.post( 'add-Consumable-Master', data, {} );
const updateConsumableMaster = ( { data } ) => client.post( 'update-Consumable-Master', data, {} );
const getConsumableAll =  ( data ) => client.post( 'get-Consumable-All', data, {} );
const getConsumableEntry =  ( data ) => client.post( 'get-Consumable-Entry', data, {} );
const addConsumableEntry = ( data ) => client.post( 'add-Consumable-Entry', data, {} );
const getConsumableEditEntry =  ( data ) => client.post( 'get-Consumable-edit-Entry', data, {} );
const getConsumableReport =  ( data ) => client.post( 'get-Consumable-Report', data, {} );
const getLowConsumableReport =  ( data ) => client.post( 'get-Low-Consumable-Report', data, {} );
const getConsumableList = ( data ) => client.post('get-Consumable-List', data, {});
const getConsumableFullViewReport =  ( data ) => client.post('get-Consumable-Fullview-Report', data, {} );

const addCalendarEvent = ( data ) => client.post( 'add-Calendar-Event', data, {} );
const getCalendarEvent = ( data ) => client.post('get-Calendar-Event', data, {});
const updateCalendarEvent  = ( data ) => client.post( 'update-Calendar-Event', data, {} );
const deleteCalendarEvent = ( data ) => client.post( 'delete-Calendar-Event', data, {} );
const saveUploadCsvConsumableMaster = (data) =>  client.post('update-csv-Consumable-Master', data, {});
const getCalendarEventReport = ( data ) => client.post('get-Calendar-Event-Report', data, {});
const saveUploadCsvCalendarEvent = (data) =>  client.post('update-csv-Calendar-Event', data, {});

const getModuleUpdateLogs = (data) => client.get('get-Module-Update-Logs', data, {});

const apis = {
  addState,
  updateState,
  getStates,

  updateZonal,
  addZonal,
  getZonal,

  addOutletMaster,
  getOutletMaster,
  updateOutletMaster,


  addEmployeeMaster,
  updateEmployeeMaster,
  getEmployeeMaster,

  addSubZonal,
  getSubZonal,
  updateSubZonal,

  setCity,
  getCity,
  updateCity,

  addDivision,
  getDivision,
  updateDivision,

  getDepartment,
  addDepartment,
  updateDepartment,

  addDesignation,
  getDesignation,
  updateDesignation,

  getEmployeeLevel,
  addEmployeeLevel,
  updateEmployeeLevel,

  getModulesList,
  getSubModulesList,
  getModulesScreenList,
  getReport,
  getEmployeeMapping,
  addEmployeeMapping,
  updateEmployeeMApping,

  loginApi,
  updatePass,
  getBadgeCount,
  getORLName,

 
  getAllImage,
  getAllVideo,
  getAllDocument,
  getAllFiles,
 
  getlicensetype,
  addPeriod,
  getPeriod,
  updatePeriod,
  getLicense,
  addLicense,
  updateLicense,
  getDays,

  getRenewal,
  updaterenewal,

  getApprove,
  updateApprove,
  
  getEditLicense,
  saveEditLicense,
  getLicenseReport,
  
  getActiveLicense,
  saveActiveLicense,
  updateActiveLicense,

  getLicenseDetail,
  addLicenseDetail,
  updateLicenseDetail,

  addCallStatus,
  getCallStatus,
  updateCallStatus,

  getRistaCustomerSale,
  
  addCustomerMaster,
  getCustomerMaster,
  updateCustomerMaster,

  addCallBackEntry,
  getDefinitions,
  addDefinitions,
  updateDefinitions,
  addDefinitionsList,
  getDefinitionsList,
  updateDefinitionsList,
  
  getCrewMaster,
  addCrewMaster,
  updateCrewMaster,

  update_dayclosure_details,
  update_mismatch_details,
  get_rista_Sales_Details,
  get_Sales_Details,
  get_Crew_Details,
  get_Revision_Details,
  get_Attachement_Details,
  update_dayclosure_verification,
    getCallBackEntry,

  getAllSalesCustomer,
  getCallBackEntryApproval,
  getAuditCategoryWiseReport,

  getCallBackEntryReport,
  addCallEntryApprove,
  //addCallEntryReject,

  getCalldefStatus,
  getEditCallBackEntry,
  updateCallBackEntry,

  getAllMappedOutlet,
  getDefinitionsFilter,

  getEquipmentMaster,  
  addEquipmentMaster,
  updateEquipmentMaster,

  getDayPlanMapping,
  addDayPlanMapping,
  updateDayPlanMapping,

  getDeepCleaning,
  addDeepCleanEntry,
  getDeviationReport,
  getOutlet,
  
  getEditDeepCleaningEntry,
  updateDeepCleanEntry,
  getDeepCleanApproval,
  addDeepCleanEntryApprove,

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
  
  getPettyCashRequest,
  updatePettyCashRequest,
  getPettyBalRequest,
  updatePettyCashRequestData,
  updatePettyCashRequestPut,
  getExpenseList,

  addBudgetMaster,
  updateBudgetMaster,
  getBudgetMaster,
  getEBReadingEntry,
  addEBReadingEntry,
  getEBReadingEditEntry,
  editEBReadingEntry,
  getEBReadingApprovalEntry,
  addEBReadingapprove,
  getEBReadingReport,

  getDashboard,
  saveUploadCsvStock,
  getUploadedRistaStock,
  updateConsumableMaster,
  addConsumableMaster,
  getConsumableMaster,
  getConsumableAll,
  getConsumableEntry,
  addConsumableEntry,
  
  getConsumableEditEntry,
  getConsumableReport,
  getLowConsumableReport,
  getConsumableList,
  getConsumableFullViewReport,

  addCalendarEvent,
  getCalendarEvent,
  updateCalendarEvent,
  deleteCalendarEvent,
  saveUploadCsvConsumableMaster,
  getCalendarEventReport,
  saveUploadCsvCalendarEvent,

  getModuleUpdateLogs

};

export default apis;
