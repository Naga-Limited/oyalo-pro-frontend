import client from './client';

const limit = 400;
const offset = 0;

//subMaster
const addAuditCategory = ( { data } ) => client.post( 'add-audit-category', data, {} );
const getAuditCategory = () => client.get( 'get-audit-category', { limit, offset }, {} );
const updateAuditCategory = ( { data } ) => client.post( 'update-audit-category', data, {} );

const addAuditSubCategory = ( { data } ) => client.post( 'add-audit-subcategory', data, {} );
const getAuditSubCategory = () => client.get( 'get-audit-subcategory', { limit, offset }, {} );
const updateAuditSubCategory = ( { data } ) => client.post( 'update-audit-subcategory', data, {} );

const addAuditPointList = ( { data } ) => client.post( 'add-audit-pointlist', data, {} );
const getAuditPointList = () => client.get( 'get-audit-pointlist', { limit, offset }, {} );
const updateAuditPointList = ( { data } ) => client.post( 'update-audit-pointlist', data, {} );

const getRoleList = () => client.get( 'get-role-list', { limit, offset }, {} );
const addRoleMaster = ( { data } ) => client.post( 'add-role-master', data, {} );
const getRoleMaster = () => client.get( 'get-role-master', { limit, offset }, {} );

const getAuditPointMark = () => client.get( 'get-audit-pointmark', { limit, offset }, {} );
const addAuditPointMark = ( data ) => client.post( 'add-audit-pointmark', data, {} );
const updateAuditPointMark = ( data ) => client.post( 'update-audit-pointmark', data, {} );

const getAllCategory = () => client.post( 'all-category-list', { limit, offset }, {} );
// const addAuditPointMark = ( { data } ) => client.post( 'add-audit-pointmark', data, {} );
// const updateAuditPointMark = ( { data } ) => client.get( 'update-audit-pointmark', data, {} );


//Rohini Audit Points Image Start

const getAllCategoryImage = () => client.post( 'all-category-list-image', { limit, offset}, {} );
const getAuditCategoryPointList = () => client.get( 'get-audit-category-pointlist', { limit, offset }, {} );
const addAuditPointsImage = ( { data } ) => client.post( 'add-audit-points-image', data, {} );
const getAuditPointsImage = () => client.get( 'get-audit-points-image', { limit, offset }, {} );
const updateAuditPointsImage = ( {data} ) => client.post( 'update-audit-points-image', data, {} );

const getLicenseDetails = () => client.get( 'get-license-details', { limit, offset }, {} );
const getLicense= () => client.get( 'get-license', { limit, offset }, {} );
// const getLicenseDetail= () => client.get( 'get-licensedet', { limit, offset }, {} );
const getLicenseDetail = () => client.get('get-license-details', { limit, offset }, {});
const addLicenseDetail = ({ data }) => client.post("add-license", data, {});
const getAuditType = () => client.get( 'get-audit-type', { limit, offset}, {} );
const addAuditType = ( { data } ) => client.post( 'add-audit-type', data, {} );
const updateAuditType = ( {data} ) => client.post( 'update-audit-type', data, {} );
const addAuditfile = ( { data } ) => client.post( 'add-audit-file', data, {} );
const getAuditfile = () => client.get( 'get-audit-file', { limit, offset }, {} );
const updateAuditfile = ( {data} ) => client.post( 'update-audit-file', data, {} );

//Audit New Master
const addAuditMaster = ( { data } ) => client.post( 'add-audit-master', data, {} );
const getAuditMaster = () => client.get( 'get-audit-master', { limit, offset }, {} );
const updateAuditMaster = ( {data} ) => client.post( 'update-audit-master', data, {} );

const getallauditMaster = () => client.get( 'all-category-list-master', { limit, offset}, {} );
const getOutletMasternotsubzone = () => client.get( 'all-outlet-not-subzone', { limit, offset}, {} );
const addAuditNewEntry = (  data ) => client.post( 'audit-new-entry', data, {} );
const get_Audit_Entry = ( { path, data } ) => client.post( path, data, {} );
const addAuditNewCAPASubmit = (  data ) => client.post( 'audit-capa-submit', data, {} );

//Get Audit Payment
const getAuditPayment = () => client.get( 'get-audit-incentive', { limit, offset }, {} );
const addAuditPayment = ( { data } ) => client.post( 'add-audit-incentive', data, {} );
const updateAuditPayment = ( { data } ) => client.post( 'update-audit-incentive', data, {} );

//Cash Handling denomination master
const getDenominationName = ( data ) => client.get( 'get-denomination-name', data, {} );
const get_DayClosure_Status_Name = ( data ) => client.get( 'get-DayClosure-Status-Name', data, {} );
const get_Deposit_Mode_Name = ( data ) => client.get( 'get-Deposit-Mode-Name', data, {} );
const get_Deposit_Skip_Reason = ( data ) => client.get( 'get-Deposit-Skip-Reason', data, {} );
const get_Reject_Reason = ( data ) => client.get( 'get-Reject-Reason', data, {} );

//Cash Handling sales closure details and deposit details

const get_Outlet_Name = ( data ) => client.get( 'get-Outlet-Name', data,{} );

const saveUploadCsvEdc = (data) =>  client.post('update-csv-EDC', data, {});
const getUploadedBankTrans = ( { path, data } ) => client.post( path, data, {} );
const getOutletBankDetails = ( data ) => client.post( 'get-outlet-bank-details', data, {} );
const addOutletBankDetails =  ( { data } ) => client.post( 'add-outlet-bank-details', data, {} );
const updateOutletBankDetails = ( { data } ) => client.post( 'update-outlet-bank-details', data, {} );
const getRistaSalesData = ( { path, data } ) => client.post( path, data, {} );
const getEdcPaymentVsBank = ( { path, data } ) => client.post( path, data, {} );
const addPaymentDiffRemarks =  ( { data } ) => client.post( 'add-Payment-Diff-Remarks', data, {} );
const saveUploadCsvDotpe = (data) =>  client.post('update-csv-Dotpe', data, {});
const getUploadedDotpe = ( { path, data } ) => client.post( path, data, {} );
const getDotpePaymentVsSales = ( { path, data } ) => client.post( path, data, {} );
const saveUploadCsvSwiggy = (data) =>  client.post('update-csv-swiggy', data, {});
const getUploadedSwiggy = ( { path, data } ) => client.post( path, data, {} );
const saveUploadCsvMagicPin = (data) =>  client.post('update-csv-magicPin', data, {});
const getUploadedMagicPin = ( { path, data } ) => client.post( path, data, {} );
const saveUploadCsvZomato = (data) =>  client.post('update-csv-Zomato', data, {});
const getUploadedZomato =( { path, data } ) => client.post( path, data, {} );
const getSwiggyPaymentVsSales = ( { path, data } ) => client.post( path, data, {} );
const getZomatoPaymentVsSales = ( { path, data } ) => client.post( path, data, {} );
const getMagicPinPaymentVsSales = ( { path, data } ) => client.post( path, data, {} );


const getStockDetails = ( { path, data } ) => client.post( path, data, {} );

const getOverallPaymentVsSales = ( { path, data } ) => client.post( path, data, {} );

const masterApi = {
  addAuditCategory,
  getAuditCategory,
  updateAuditCategory,
  addAuditSubCategory,
  getAuditSubCategory,
  updateAuditSubCategory,
  updateAuditPointList,
  getAuditPointList,
  addAuditPointList,
  getRoleList,
  getRoleMaster,
  addRoleMaster,
  getAuditPointMark,
  addAuditPointMark,
  updateAuditPointMark,
  getAllCategory,
  getAllCategoryImage,
  getAuditCategoryPointList,
  addAuditPointsImage,
  getAuditPointsImage,
  updateAuditPointsImage,
  getLicense,
  getLicenseDetail,
  addLicenseDetail,
  getLicenseDetails,
  getAuditType,
  addAuditType,
  updateAuditType,
  addAuditfile,
  getAuditfile,
  updateAuditfile,
  //Audit New Master
  addAuditMaster,
  getAuditMaster,
  updateAuditMaster,
  getallauditMaster,
  getOutletMasternotsubzone,
  addAuditNewEntry,
  get_Audit_Entry,
  addAuditNewCAPASubmit,

  //Audit Payment
  getAuditPayment,
  updateAuditPayment,
  addAuditPayment,

  get_Outlet_Name,   //for to get outlet name
  getDenominationName,   //cash handling denomination master
  get_DayClosure_Status_Name,   //for to get day sales closure status name
  get_Deposit_Mode_Name,   //for to get day sales closure status name
  get_Deposit_Skip_Reason,
  get_Reject_Reason,

  saveUploadCsvEdc,
  getUploadedBankTrans,
  getOutletBankDetails,
  addOutletBankDetails,
  updateOutletBankDetails,
  getRistaSalesData,
  getEdcPaymentVsBank,
  addPaymentDiffRemarks,
  saveUploadCsvDotpe,
  getUploadedDotpe,
  getDotpePaymentVsSales,  
  saveUploadCsvSwiggy,
  getUploadedSwiggy,
  saveUploadCsvMagicPin,
  getUploadedMagicPin,
  saveUploadCsvZomato,
  getUploadedZomato,
  getSwiggyPaymentVsSales,
  getZomatoPaymentVsSales,
  getMagicPinPaymentVsSales,

  getStockDetails,
  getOverallPaymentVsSales
};

export default masterApi;
