import {createSlice} from '@reduxjs/toolkit';
import {filter} from 'ramda';
import masterApi from '../../api/masterApi';
import apis from '../../api/stateAPI';
import messageToast from '../../components/messageToast/messageToast';

const initialState = {
  savingState: false,
  saveStateResponse: {},
  saveStateError: {},
  gettingState: false,
  getStatesResponse: {},
  getStatesError: {},

  savingZonal: false,
  saveZonalResponse: {},
  saveZonalError: {},
  gettingZonal: false,
  getZonalResponse: {},
  getZonalError: {},

  savingSubZonal: false,
  saveSubZonalResponse: {},
  saveSubZonalError: {},
  gettingSubZonal: false,
  getSubZonalResponse: {},
  getSubZonalError: {},

  savingOutletMaster: false,
  saveOutletMasterResponse: {},
  saveOutletMasterError: {},

  savingEmployeeMaster: false,
  saveEmployeeMasterResponse: {},
  saveEmployeeMasterError: {},

  gettingCity: false,
  getCityResponse: {},
  getCityError: {},

  savingDivision: false,
  saveDivisionResponse: {},
  saveDivisionError: {},

  gettingDivision: false,
  getDivisionResponse: {},
  getDivisionError: {},

  gettingDepartment: false,
  getDepartmentResponse: {},
  getDepartmentError: {},

  savingDepartment: false,
  saveDepartmentResponse: {},
  saveDepartmentError: {},

  gettingDesignation: false,
  getDesignationResponse: {},
  getDesignationError: {},

  savingDesignation: false,
  saveDesignationResponse: {},
  saveDesignationError: {},

  gettingEmployeeLevel: false,
  getEmployeeLevelResponse: {},
  getEmployeeLevelError: {},

  savingEmployeeLevel: false,
  saveEmployeeLevelResponse: {},
  saveEmployeeLevelError: {},

  gettingOutletMaster: false,
  getOutletMasterResponse: {},
  getOutletMasterError: {},
  getORLsResponse: {},

  gettingEmployeMaster: false,
  getEmployeeMasterResponse: {},
  getEmployeeMasterError: {},

  savingAuditCategory: false,
  saveAuditCategoryResponse: {},
  saveAuditCategoryError: {},
  gettingAuditCategory: false,
  getAuditCategoryResponse: {},
  getAuditCategoryError: {},

  savingAuditSubCategory: false,
  saveAuditSubCategoryResponse: {},
  saveAuditSubCategoryError: {},
  gettingAuditSubCategory: false,
  getAuditSubCategoryResponse: {},
  getAuditSubCategoryError: {},

  savingAuditPointList: false,
  saveAuditPointListResponse: {},
  saveAuditPointListError: {},
  gettingAuditPointList: false,
  getAuditPointListResponse: {},
  getAuditSPointListError: {},

  savingAuditPointListMark: false,
  saveAuditPointListMarkResponse: {},
  saveAuditPointListMarkError: {},
  gettingAuditPointListMark: false,
  getAuditPointListMarkResponse: {},
  getAuditSPointListMarkError: {},

  savingRoleMaster: false,
  saveRoleMasterResponse: {},
  saveRoleMasterError: {},
  gettingRoleMaster: false,
  getRoleMasterResponse: {},
  getRoleMasterError: {},
  gettingRoleMasterList: false,
  getRoleMasterListResponse: {},
  getRoleMasterListError: {},

  gettingModulesList: true,
  getModulesListResponse: {},
  getModulesListError: {},

  gettingSubModulesList: true,
  getSubModulesListResponse: {},
  getSubModulesListError: {},

  gettingModulesScreenList: true,
  getModulesScreenListResponse: {},
  getModulesScreenListError: {},

  gettingReport: true,
  getReportResponse: {},
  getReportError: {},

  savingEmployeeMapping: false,
  saveEmployeeMappingResponse: {},
  saveEmployeeMappingError: {},
  gettingEmployeeMapping: false,
  getEmployeeMappingResponse: {},
  getEmployeeMappingError: {},
  allCatData: {},
  allCatDataError: false,
  zoneEmp: {},
  zoneEmpError: false,

  //Rohini Audit Points Image Start

  savingAuditPointsImage: false,
  saveAuditPointsImageResponse: {},
  saveAuditPointsImageError: {},
  gettingAuditPointsImage: false,
  getAuditPointsImageResponse: {},
  getAuditPointsImageError: {},

  savingAuditCategoryPointList: false,
  saveAuditCategoryPointListResponse: {},
  saveAuditCategoryPointListError: {},
  gettingAuditCategoryPointList: false,
  getAuditCategoryPointListResponse: {},
  getAuditCategoryPointListError: {},

  //Rohini Audit Points Image End

   //License
   savingLicense: false,
   saveLicenseResponse: {},
   saveLicenseError: {},
   gettingLicense: false,
   getLicenseResponse: {},
   getLicenseError: {},
 
   gettingLicenseDetail: false,
   getLicenseResponseDetail: {},
   getLicenseErrorDetail: {},
   saveLicenseDetail: false,
   saveLicenseResponseDetail: {},
   saveLicenseErrorDetail: {},
 
   
   //License Details Master Report
   gettingLicenseDetails: false,
   getLicenseDetailsResponse: {},
   getLicenseDetailsError: {},
 
 
   //Period
   gettingPeriod: false,
   getPeriodResponse: {},
   getPeriodError: {},
   savePeriod: false,
   savePeriodResponse: {},
   savePeriodError: {},
 
 
   //License Details Master 
   gettingOutletLicense: false,
   getOutletLicenseResponse: {},
   getOutletLicenseError: {},
 
   gettingAuditType: false,
   getAuditTypeResponse: {},
   getAuditTypeError: {},
   allAuditDataError: {},
   allAuditData : false,
   savingAuditType: false,
   saveAuditTypeResponse: {},
   saveAuditTypeError: {},
 
   savingAuditfile: false,
   saveAuditfileResponse: {},
   saveAuditfileError: {},
   gettingAuditfile: false,
   getAuditfileResponse: {},
   getAuditfileError: {},

   //Rohini Audit New Master Start

  gettingAuditMaster: false,
  getAuditMasterResponse: {},
  getAuditMasterError: {},
  saveAuditMaster: false,
  saveAuditMasterResponse: {},
  saveAuditMasterError: {},

  //Audit New Entry

  savingAuditNewEntry: false,
  saveAuditNewEntryResponse: {},
  saveAuditNewEntryError: {},
  gettingAuditNewEntryMark: false,
  getAuditNewEntryMarkResponse: {},
  getAuditNewentryError: {},

  //New CAPA Submit

  savingAuditNewCAPASubmit: false,
  saveAuditNewCAPASubmitResponse: {},
  saveAuditNewCAPASubmitError: {},
  gettingAuditNewCAPASubmit: false,
  getAuditNewCAPASubmitResponse: {},
  getAuditNewCAPASubmitError: {},


  //Get Audit Payment
  savingAuditPayment: false,
  saveAuditPaymentResponse: {},
  saveAuditPaymentError: {},
  gettingAuditPayment: false,
  getAuditPaymentResponse: {},
  getAuditPaymentError: {},


  //for get cash denomination name
  gettingDenominationName: false,
  getDenominationNameResponse: {},
  getDenominationNameError: {},

  //for get cash day closure status name from master
  gettingClosureStatusName: false,
  getClosureStatusNameResponse: {},
  getClosureStatusNameError: {},

  //for get cash deposit mode name master
  gettingDepositModeName: false,
  getDepositModeNameResponse: {},
  getDepositModeNameError: {},

  gettingDepositSkipReason: false,
  getDepositSkipReasonResponse: {},
  getDepositSkipReasonError: {},

  gettingRejectReason: false,
  getRejectResponse: {},
  getRejectError: {},

  //for to get outlet name by using outlet code
  gettingOutletName: false,
  getOutletNameResponse: {},
  getOutletNameError: {},

  savingDayClosureDetails: false,
  saveDayClosureResponse: {},
  saveDayClosureError: {},

  savingMismatchDetails: false,
  saveMismatchResponse: {},
  saveMismatchError: {},

  savingDayClosureVerificationDetails: false,
  saveDayClosureVerificationResponse: {},
  saveDayClosureVerificationError: {},

  gettingCashSalesAmt: false,
  getCashSalesResponse: {},
  getCashSalesError: {},

  gettingBalanceAmt: false,
  getBalanceResponse: {},
  getBalanceError: {},

  gettingCrewDetails: false,
  getCrewResponse: {},
  getCrewError: {},

  gettingRevisionDetail: false,
  getRevisionResponse: {},
  getRevisionError: {},

  gettingAttachementDetail: false,
  getAttachementResponse: {},
  getAttachementError: {},

  gettingPaymentRequest: false,
  getPaymentRequestResponse: {},
  getPaymentRequestError: {},

  gettingPaymentOHRequest: false,
  getPaymentOHRequestResponse: {},
  getPaymentOHRequestError: {},

  gettingPaymentAHRequest: false,
  getPaymentAHRequestResponse: {},
  getPaymentAHRequestError: {},

  gettingUserReport: false,
  getUserReporResponse: {},
  getUserReporError: {},

  gettingEmailMapping: false,
  getEmailMappingResponse: {},
  getEmailMappingError: {},

  getExpenseData: [],
  gettingPettyCashRequest: false,
  getPettyCashRequestResponse: {},
  getPettyCashRequestError: {},

  savingEDCDetails: false,
  saveEDCDetailsResponse: {},
  saveEDCDetailsError: {},
  gettingEDCDetails: false,
  getEDCDetailsResponse: {},
  getEDCDetailsError: {},

  //getUploadedBankTrans
  savingUploadedBankTrans: false,
  saveUploadedBankTransResponse: {},
  saveUploadedBankTransError: {},
  gettingUploadedBankTrans: false,
  getUploadedBankTransResponse: {},
  getUploadedBankTransError: {},

// Outlet Bank details
  savingOutletBankDetails: false,
  saveOutletBankDetailsResponse: {},
  saveOutletBankDetailsError: {},
  gettingOutletBankDetails: false,
  getOutletBankDetailsResponse: {},
  getOutletBankDetailsError: {},

  //getRistaSalesData
  savingRistaSalesData: false,
  saveRistaSalesDataResponse: {},
  saveRistaSalesDataError: {},
  gettingRistaSalesData: false,
  getRistaSalesDataResponse: {},
  getRistaSalesDataError: {},

  //getEdcPaymentVsBank

  savingEdcPaymentVsBank: false,
  saveEdcPaymentVsBankResponse: {},
  saveEdcPaymentVsBankError: {},
  gettingEdcPaymentVsBank: false,
  getEdcPaymentVsBankResponse: {},
  getEdcPaymentVsBankError: {},

  //addPaymentDiffRemarks

  savingPaymentDiffRemarks: false,
  savePaymentDiffRemarksResponse: {},
  savePaymentDiffRemarksError: {},
  gettingPaymentDiffRemarks: false,
  getPaymentDiffRemarksResponse: {},
  getPaymentDiffRemarksError: {},

  //UploadCsvDotpe

  savingUploadCsvDotpe: false,
  saveUploadCsvDotpeResponse: {},
  saveUploadCsvDotpeError: {},

  //UploadedDotpe
  savingUploadedDotpe: false,
  saveUploadedDotpeResponse: {},
  saveUploadedDotpeError: {},
  gettingUploadedDotpe: false,
  getUploadedDotpeResponse: {},
  getUploadedDotpeError: {},

  //getDotpePaymentVsSales
  savingDotpePaymentVsSales: false,
  saveDotpePaymentVsSalesResponse: {},
  saveDotpePaymentVsSalesError: {},
  gettingDotpePaymentVsSales: false,
  getDotpePaymentVsSalesResponse: {},
  getDotpePaymentVsSalesError: {},

  //UploadedSwiggy
  savingUploadedSwiggy: false,
  saveUploadedSwiggyResponse: {},
  saveUploadedSwiggyError: {},
  gettingUploadedSwiggy: false,
  getUploadedSwiggyResponse: {},
  getUploadedSwiggyError: {},

  //UploadCsvSwiggy

  savingUploadCsvSwiggy: false,
  saveUploadCsvSwiggyResponse: {},
  saveUploadCsvSwiggyError: {},
  gettingUploadCsvSwiggy: false,
  getUploadCsvSwiggyResponse: {},
  getUploadCsvSwiggyError: {},

  //UploadedMagicPin
  savingUploadedMagicPin: false,
  saveUploadedMagicPinResponse: {},
  saveUploadedMagicPinError: {},
  gettingUploadedMagicPin: false,
  getUploadedMagicPinResponse: {},
  getUploadedMagicPinError: {},

  //UploadCsvMagicPin

  savingUploadCsvMagicPin: false,
  saveUploadCsvMagicPinResponse: {},
  saveUploadCsvMagicPinError: {},
  gettingUploadCsvMagicPin: false,
  getUploadCsvMagicPinResponse: {},
  getUploadCsvMagicPinError: {},

   //UploadedZomato
   savingUploadedZomato: false,
   saveUploadedZomatoResponse: {},
   saveUploadedZomatoError: {},
   gettingUploadedZomato: false,
   getUploadedZomatoResponse: {},
   getUploadedZomatoError: {},
 
   //UploadCsvZomato
 
   savingUploadCsvZomato: false,
   saveUploadCsvZomatoResponse: {},
   saveUploadCsvZomatoError: {},
   gettingUploadCsvZomato: false,
   getUploadCsvZomatoResponse: {},
   getUploadCsvZomatoError: {},

   //Swiggy
   
  gettingSwiggyPaymentVsSales: false,
  getSwiggyPaymentVsSalesResponse: {},
  getSwiggyPaymentVsSalesError: {},

  //Zomato

  gettingZomatoPaymentVsSales: false,
  getZomatoPaymentVsSalesResponse: {},
  getZomatoPaymentVsSalesError: {},

  //MagicPin
  gettingMagicPinPaymentVsSales: false,
  getMagicPinPaymentVsSalesResponse: {},
  getMagicPinPaymentVsSalesError: {},

  //Stock Taking

   
  savingStockTaking: false,
  saveStockTakingResponse: {},
  saveStockTakingError: {},
  gettingStockTaking: false,
  getStockTakingResponse: {},
  getStockTakingError: {},

  //OverallPaymentVsSales
  gettingOverallPaymentVsSales: false,
  getOverallPaymentVsSalesResponse: {},
  getOverallPaymentVsSalesError: {},

};

export const masterSlice = createSlice({
  name: 'master',
  initialState,
  reducers: {
    saveStateRequest: (state) => {
      state.savingState = true;
    },
    saveStateResponse: (state, action) => {
      state.savingState = false;
      state.saveStateResponse = action.payload;
    },
    saveStateError: (state, action) => {
      state.savingState = false;
      state.saveStateError = action.payload;
    },
    getStatesRequest: (state) => {
      state.gettingState = true;
    },
    getStatesResponse: (state, action) => {
      state.gettingState = false;
      state.getStatesResponse = action.payload;
    },
    getStatesError: (state, action) => {
      state.gettingState = false;
      state.getStatesError = action.payload;
    },

    getORLRequest: (state) => {
      state.gettingORLs = true;
    },
    getORLResponse: (state, action) => {
      state.gettingORLs = false;
      state.getORLsResponse = action.payload;
    },
    getORLError: (state, action) => {
      state.gettingORLs = false;
      state.getORLsError = action.payload;
    },

    getOutletMasterRequest: (state) => {
      state.gettingOutletMaster = true;
    },
    getOutletMasterResponse: (state, action) => {
      state.gettingOutletMaster = false;
      state.getOutletMasterResponse = action.payload;
    },
    getOutletMasterError: (state, action) => {
      state.gettingOutletMaster = false;
      state.getOutletMasterError = action.payload;
    },

    getEmployeeMasterRequest: (state) => {
      state.gettingEmployeMaster = true;
    },
    getEmployeeMasterResponse: (state, action) => {
      state.gettingEmployeMaster = false;
      state.getEmployeeMasterResponse = action.payload;
    },
    getEmployeeMasterError: (state, action) => {
      state.gettingEmployeMaster = false;
      state.getEmployeeMasterError = action.payload;
    },

    saveZonalRequest: (state) => {
      state.savingZonal = true;
    },
    saveZonalResponse: (state, action) => {
      state.savingZonal = false;
      state.saveZonalResponse = action.payload;
    },
    saveZonalError: (state, action) => {
      state.savingZonal = false;
      state.saveZonalError = action.payload;
    },
    getZonalRequest: (state) => {
      state.gettingZonal = true;
    },
    getZonalResponse: (state, action) => {
      state.gettingZonal = false;
      state.getZonalResponse = action.payload;
    },
    getZonalError: (state, action) => {
      state.gettingZonal = false;
      state.getZonalError = action.payload;
    },
    saveSubZonalRequest: (state) => {
      state.savingSubZonal = true;
    },
    saveSubZonalResponse: (state, action) => {
      state.savingSubZonal = false;
      state.saveSubZonalResponse = action.payload;
    },
    saveSubZonalError: (state, action) => {
      state.savingSubZonal = false;
      state.saveSubZonalError = action.payload;
    },
    getSubZonalRequest: (state) => {
      state.gettingSubZonal = true;
    },
    getSubZonalResponse: (state, action) => {
      state.gettingSubZonal = false;
      state.getSubZonalResponse = action.payload;
    },
    getSubZonalError: (state, action) => {
      state.gettingSubZonal = false;
      state.getSubZonalError = action.payload;
    },
    saveOutletMasterRequest: (state) => {
      state.savingOutletMaster = true;
    },
    saveOutletMasterResponse: (state, action) => {
      state.savingOutletMaster = false;
      state.saveOutletMasterResponse = action.payload;
    },
    saveOutletMasterError: (state, action) => {
      state.savingOutletMaster = false;
      state.saveOutletMasterError = action.payload;
    },

    saveEmployeeMasterRequest: (state) => {
      state.savingEmployeeMaster = true;
    },
    saveEmployeeMasterResponse: (state, action) => {
      state.savingEmployeeMaster = false;
      state.saveEmployeeMasterResponse = action.payload;
    },
    saveEmployeeMasterError: (state, action) => {
      state.savingEmployeeMaster = false;
      state.saveEmployeeMasterError = action.payload;
    },

    getCityRequest: (state) => {
      state.gettingCity = true;
    },
    getCityResponse: (state, action) => {
      state.gettingCity = false;
      state.getCityResponse = action.payload;
    },
    getCityError: (state, action) => {
      state.gettingCity = false;
      state.getCityError = action.payload;
    },

    saveDivisionRequest: (state) => {
      state.savingDivision = true;
    },
    saveDivisionResponse: (state, action) => {
      state.savingDivision = false;
      state.saveDivisionResponse = action.payload;
    },
    saveDivisionError: (state, action) => {
      state.savingDivision = false;
      state.saveDivisionError = action.payload;
    },
    getDivisionRequest: (state) => {
      state.gettingDivision = true;
    },
    getDivisionResponse: (state, action) => {
      state.gettingDivision = false;
      state.getDivisionResponse = action.payload;
    },
    getDivisionError: (state, action) => {
      state.gettingDivision = false;
      state.getDivisionError = action.payload;
    },
    getDepartmentRequest: (state) => {
      state.gettingDepartment = true;
    },
    getDepartmentResponse: (state, action) => {
      state.gettingDepartment = false;
      state.getDepartmentResponse = action.payload;
    },
    getDepartmentError: (state, action) => {
      state.gettingDepartment = false;
      state.getDepartmentError = action.payload;
    },
    saveDepartmentRequest: (state) => {
      state.savingDepartment = true;
    },
    saveDepartmentResponse: (state, action) => {
      state.savingDepartment = false;
      state.saveDepartmentResponse = action.payload;
    },
    saveDepartmentError: (state, action) => {
      state.savingDepartment = false;
      state.saveDepartmentError = action.payload;
    },
    getDesignationRequest: (state) => {
      state.gettingDesignation = true;
    },
    getDesignationResponse: (state, action) => {
      state.gettingDesignation = false;
      state.getDesignationResponse = action.payload;
    },
    getDesignationError: (state, action) => {
      state.gettingDesignation = false;
      state.getDesignationError = action.payload;
    },
    saveDesignationRequest: (state) => {
      state.savingDesignation = true;
    },
    saveDesignationResponse: (state, action) => {
      state.savingDesignation = false;
      state.saveDesignationResponse = action.payload;
    },
    saveDesignationError: (state, action) => {
      state.savingDesignation = false;
      state.saveDesignationError = action.payload;
    },
    getEmployeeLevelRequest: (state) => {
      state.gettingEmployeeLevel = true;
    },
    getEmployeeLevelResponse: (state, action) => {
      state.gettingEmployeeLevel = false;
      state.getEmployeeLevelResponse = action.payload;
    },
    getEmployeeLevelError: (state, action) => {
      state.gettingEmployeeLevel = false;
      state.getEmployeeLevelError = action.payload;
    },
    saveEmployeeLevelRequest: (state) => {
      state.savingEmployeeLevel = true;
    },
    saveEmployeeLevelResponse: (state, action) => {
      state.savingEmployeeLevel = false;
      state.saveEmployeeLevelResponse = action.payload;
    },
    saveEmployeeLevelError: (state, action) => {
      state.savingEmployeeLevel = false;
      state.saveEmployeeLevelError = action.payload;
    },

    saveAuditCategoryRequest: (state) => {
      state.savingAuditCategory = true;
    },
    saveAuditCategoryResponse: (state, action) => {
      state.savingAuditCategory = false;
      state.saveAuditCategoryResponse = action.payload;
    },
    saveAuditCategoryError: (state, action) => {
      state.savingAuditCategory = false;
      state.saveAuditCategoryError = action.payload;
    },
    getAuditCategoryRequest: (state) => {
      state.gettingAuditCategory = true;
    },
    getAuditCategoryResponse: (state, action) => {
      state.gettingAuditCategory = false;
      state.getAuditCategoryResponse = action.payload;
    },
    getAuditCategoryError: (state, action) => {
      state.gettingAuditCategory = false;
      state.getAuditCategoryError = action.payload;
    },
    saveAuditSubCategoryRequest: (state) => {
      state.savingAuditSubCategory = true;
    },
    saveAuditSubCategoryResponse: (state, action) => {
      state.savingAuditSubCategory = false;
      state.saveAuditSubCategoryResponse = action.payload;
    },
    saveAuditSubCategoryError: (state, action) => {
      state.savingAuditSubCategory = false;
      state.saveAuditSubCategoryError = action.payload;
    },
    getAuditSubCategoryRequest: (state) => {
      state.gettingAuditSubCategory = true;
    },
    getAuditSubCategoryResponse: (state, action) => {
      state.gettingAuditSubCategory = false;
      state.getAuditSubCategoryResponse = action.payload;
    },
    getAuditSubCategoryError: (state, action) => {
      state.gettingAuditSubCategory = false;
      state.getAuditSubCategoryError = action.payload;
    },

    saveAuditPointListRequest: (state) => {
      state.savingAuditPointList = true;
    },
    saveAuditPointListResponse: (state, action) => {
      state.savingAuditPointList = false;
      state.saveAuditPointListResponse = action.payload;
    },
    saveAuditPointListError: (state, action) => {
      state.savingAuditPointList = false;
      state.saveAuditPointListError = action.payload;
    },
    getAuditPointListRequest: (state) => {
      state.gettingAuditPointList = true;
    },
    getAuditPointListResponse: (state, action) => {
      state.gettingAuditPointList = false;
      state.getAuditPointListResponse = action.payload;
    },
    getAuditPointListError: (state, action) => {
      state.gettingAuditPointList = false;
      state.getAuditPointListError = action.payload;
    },

    saveAuditPointListMarkRequest: (state) => {
      state.savingAuditPointListMark = true;
    },
    saveAuditPointListMarkResponse: (state, action) => {
      state.savingAuditPointListMark = false;
      state.saveAuditPointListMarkResponse = action.payload;
    },
    saveAuditPointListMarkError: (state, action) => {
      state.savingAuditPointListMark = false;
      state.saveAuditPointListMarkError = action.payload;
    },
    getAuditPointListMarkRequest: (state) => {
      state.gettingAuditPointListMark = true;
    },
    getAuditPointListMarkResponse: (state, action) => {
      state.gettingAuditPointListMark = false;
      state.getAuditPointListMarkResponse = action.payload;
    },
    getAuditPointListMarkError: (state, action) => {
      state.gettingAuditPointListMark = false;
      state.getAuditPointListMarkError = action.payload;
    },

    getRoleMasterRequest: (state) => {
      state.gettingRoleMaster = true;
    },
    getRoleMasterResponse: (state, action) => {
      state.gettingRoleMaster = false;
      state.getRoleMasterResponse = action.payload;
    },
    getRoleMasterError: (state, action) => {
      state.gettingRoleMaster = false;
      state.getRoleMasterError = action.payload;
    },

    saveRoleMasterRequest: (state) => {
      state.savingRoleMaster = true;
    },
    saveRoleMasterResponse: (state, action) => {
      state.savingRoleMaster = false;
      state.saveRoleMasterResponse = action.payload;
    },
    saveRoleMasterError: (state, action) => {
      state.savingRoleMaster = false;
      state.saveRoleMasterError = action.payload;
    },
    getRoleMasterListRequest: (state) => {
      state.gettingRoleMasterList = true;
    },
    getRoleMasterListResponse: (state, action) => {
      state.gettingRoleMasterList = false;
      state.getRoleMasterListResponse = action.payload;
    },
    getRoleMasterListError: (state, action) => {
      state.gettingRoleMasterList = false;
      state.getRoleMasterListError = action.payload;
    },

    getModulesListRequest: (state, action) => {
      state.gettingModulesList = true;
      state.getModulesListRequest = action.payload;
    },
    getModulesListResponse: (state, action) => {
      state.gettingModulesList = false;
      state.getModulesListResponse = action.payload;
    },
    getModulesListError: (state, action) => {
      state.gettingModulesList = false;
      state.getRoleMasterListError = action.payload;
    },
    getSubModulesListRequest: (state, action) => {
      state.gettingSubModulesList = true;
      state.getSubModulesListRequest = action.payload;
    },
    getSubModulesListResponse: (state, action) => {
      state.gettingSubModulesList = false;
      state.getSubModulesListResponse = action.payload;
    },
    getSubModulesListError: (state, action) => {
      state.gettingSubModulesList = false;
      state.getSubModulesListError = action.payload;
    },
    getModulesScreenListRequest: (state, action) => {
      state.gettingModulesScreenList = true;
      state.getModulesScreenListRequest = action.payload;
    },
    getModulesScreenListResponse: (state, action) => {
      state.gettingModulesScreenList = false;
      state.getModulesScreenListResponse = action.payload;
    },
    getModulesScreenListError: (state, action) => {
      state.gettingModulesScreenList = false;
      state.getModulesScreenListError = action.payload;
    },
    getReportRequest: (state, action) => {
      state.gettingReport = true;
      state.getReportRequest = action.payload;
    },
    getReportResponse: (state, action) => {
      state.gettingReport = false;
      state.getReportResponse = action.payload;
    },
    getReportError: (state, action) => {
      state.gettingReport = false;
      state.getReportError = action.payload;
    },

    getEmployeeMappingRequest: (state) => {
      state.gettingEmployeeMapping = true;
    },
    getEmployeeMappingResponse: (state, action) => {
      state.gettingEmployeeMapping = false;
      state.getEmployeeMappingResponse = action.payload;
    },
    getEmployeeMappingError: (state, action) => {
      state.gettingEmployeeMapping = false;
      state.getEmployeeMappingError = action.payload;
    },

    saveEmployeeMappingRequest: (state) => {
      state.savingEmployeeMapping = true;
    },
    saveEmployeeMappingResponse: (state, action) => {
      state.savingEmployeeMapping = false;
      state.saveEmployeeMappingResponse = action.payload;
    },
    saveEmployeeMappingError: (state, action) => {
      state.savingEmployeeMapping = false;
      state.saveEmployeeMappingError = action.payload;
    },
    getCat: (state, action) => {
      state.allCatDataError = false;
      state.allCatData = action.payload;
    },
    getCatErr: (state) => {
      state.allCatDataError = true;
    },
    getEmployZone: (state, action) => {
      state.zoneEmp = action.payload;
      state.zoneEmpError = true;
    },

//Rohini Audit Points Image Start

saveAuditPointsImageRequest: (state) => {
  state.savingAuditPointsImage = true;
},
saveAuditPointsImageResponse: (state, action) => {
  state.savingAuditPointsImage = false;
  state.saveAuditPointsImageResponse = action.payload;
},
saveAuditPointsImageError: (state, action) => {
  state.savingAuditPointsImage = false;
  state.saveAuditPointsImageError = action.payload;
},
getAuditPointsImageRequest: (state) => {
  state.gettingAuditPointsImage = true;
},
getAuditPointsImageResponse: (state, action) => {
  state.gettingAuditPointsImage = false;
  state.getAuditPointsImageResponse = action.payload;
},
getAuditPointsImageError: (state, action) => {
  state.gettingAuditPointsImage = false;
  state.getAuditPointsImageError = action.payload;
},

saveAuditCategoryPointListRequest: (state) => {
  state.savingAuditCategoryPointList = true;
},
saveAuditCategoryPointListResponse: (state, action) => {
  state.savingAuditCategoryPointList = false;
  state.saveAuditCategoryPointListResponse = action.payload;
},
saveAuditCategoryPointListError: (state, action) => {
  state.savingAuditCategoryPointList = false;
  state.saveAuditCategoryPointListError = action.payload;
},
getAuditCategoryPointListRequest: (state) => {
  state.gettingAuditCategoryPointList = true;
},
getAuditCategoryPointListResponse: (state, action) => {
  state.gettingAuditCategoryPointList = false;
  state.getAuditCategoryPointListResponse = action.payload;
},
getAuditCategoryPointListError: (state, action) => {
  state.gettingAuditCategoryPointList = false;
  state.getAuditCategoryPointListError = action.payload;
},

getCatImage: (state, action) => {
  state.allCatDataError = false;
  state.allCatData = action.payload;
},
getCatImageErr: (state) => {
  state.allCatDataError = true;
},
// Rohini Audit Points Image End

//License
saveLicenseRequest: (state) => {
  state.savingLicense = true;
},
saveLicenseResponse: (state, action) => {
  state.savingLicense = false;
  state.saveLicenseResponse = action.payload;
},
saveLicenseError: (state, action) => {
  state.savingLicense = false;
  state.saveLicenseError = action.payload;
},
getLicenseRequest: (state) => {
  state.gettingLicense = true;
},
getLicenseResponse: (state, action) => {
  state.gettingLicense = false;
  state.getLicenseResponse = action.payload;
},
getLicenseError: (state, action) => {
  state.gettingLicense = false;
  state.getLicenseError = action.payload;
},



saveLicenseRequestDetail: (state) => {
  state.saveLicenseDetail = true;
},

saveLicenseResponseDetail: (state, action) => {
  state.saveLicenseDetail = false;
  state.saveLicenseResponseDetail = action.payload;
},
saveLicenseErrorDetail: (state, action) => {
  state.saveLicenseDetail = false;
  state.saveLicenseErrorDetail = action.payload;
},
getLicenseRequestDetail: (state) => {
  state.gettingLicenseDetail = true;
},
getLicenseResponseDetail: (state, action) => {
  state.gettingLicenseDetail = false;
  state.getLicenseResponseDetail = action.payload;
},
getLicenseErrorDetail: (state, action) => {
  state.gettingLicenseDetail = false;
  state.getLicenseErrorDetail = action.payload;
},

//License details master report
getLicenseDetailsRequest: (state) => {
state.gettingLicenseDetails = true;
},
getLicenseDetailsResponse: (state, action) => {
state.gettingLicenseDetails = false;
state.getLicenseDetailsResponse = action.payload;
},
getLicenseDetailsError: (state, action) => {
state.gettingLicenseDetails = false;
state.getLicenseDetailsError = action.payload;
},

//period
savePeriodRequest: (state) => {
  state.savingPeriod = true;
},
savePeriodResponse: (state, action) => {
  state.savingPeriod = false;
  state.savePeriodResponse = action.payload;
},
savePeriodError: (state, action) => {
  state.savingPeriod = false;
  state.savePeriodError = action.payload;
},
getPeriodRequest: (state) => {
  state.gettingPeriod = true;
},
getPeriodResponse: (state, action) => {
  state.gettingPeriod = false;
  state.getPeriodResponse = action.payload;
},
getPeriodError: (state, action) => {
  state.gettingPeriod = false;
  state.getPeriodError = action.payload;
},

getAuditType: (state, action) => {
  state.allAuditDataError = false;
  state.allAuditData = action.payload;
},
getAuditTypeErr: (state) => {
  state.allAuditDataError = true;
},

getAuditTypeResponse: (state, action) => {
  state.gettingAuditType = false;
  state.getAuditTypeResponse = action.payload;
},
getAuditTypeRequest: (state) => {
  state.gettingAuditType = true;
},

getAuditTypeError: (state, action) => {
  state.gettingAuditType = false;
  state.getAuditTypeError = action.payload;
},

saveAuditTypeRequest: (state) => {
  state.savingAuditType = true;
},
saveAuditTypeResponse: (state, action) => {
  state.savingAuditType = false;
  state.saveAuditTypeResponse = action.payload;
},
saveAuditTypeError: (state, action) => {
  state.savingAuditType = false;
  state.saveAuditTypeError = action.payload;
},

saveAuditfileRequest: (state) => {
  state.savingAuditfile = true;
},
saveAuditfileResponse: (state, action) => {
  state.savingAuditfile = false;
  state.saveAuditfileResponse = action.payload;
},
saveAuditfileError: (state, action) => {
  state.savingAuditfile = false;
  state.saveAuditfileError = action.payload;
},
getAuditfileRequest: (state) => {
  state.gettingAuditfile = true;
},
getAuditfileResponse: (state, action) => {
  state.gettingAuditfile = false;
  state.getAuditfileResponse = action.payload;
},
getAuditfileError: (state, action) => {
  state.gettingAuditfile = false;
  state.getAuditfileError = action.payload;
},



getAuditMasterResponse: (state, action) => {
  state.gettingAuditMaster = false;
  state.getAuditMasterResponse = action.payload;
},
getAuditMasterRequest: (state) => {
  state.gettingAuditMaster = true;
},

getAuditMasterError: (state, action) => {
  state.gettingAuditMaster = false;
  state.getAuditMasterError = action.payload;
},

saveAuditMasterRequest: (state) => {
  state.savingAuditMaster = true;
},
saveAuditMasterResponse: (state, action) => {
  state.savingAuditMaster = false;
  state.saveAuditMasterResponse = action.payload;
},
saveAuditMasterError: (state, action) => {
  state.savingAuditMaster = false;
  state.saveAuditMasterError = action.payload;
},

saveAuditNewEntryRequest: (state) => {
  state.savingAuditNewEntry = true;
},
saveAuditNewEntryResponse: (state, action) => {
  state.savingAuditNewEntry = false;
  state.saveAuditNewEntryResponse = action.payload;
},
saveAuditNewEntryError: (state, action) => {
  state.savingAuditNewEntry = false;
  state.saveAuditNewEntryError = action.payload;
},


getAuditNewEntryMarkResponse: (state, action) => {
  state.gettingAuditNewEntryMark = false;
  state.getAuditNewEntryMarkResponse = action.payload;
},
getAuditNewEntryRequest: (state) => {
  state.gettingAuditNewEntryMark = true;
},

getAuditNewEntryError: (state, action) => {
  state.gettingAuditNewEntryMark = false;
  state.getAuditNewentryError = action.payload;
},


getAuditNewCAPASubmitResponse: (state, action) => {
  state.gettingAuditNewCAPASubmit = false;
  state.getAuditNewCAPASubmitResponse = action.payload;
},
getAuditNewCAPASubmitRequest: (state) => {
  state.gettingAuditNewCAPASubmit = true;
},

getAuditNewCAPASubmitError: (state, action) => {
  state.gettingAuditNewCAPASubmit = false;
  state.getAuditNewCAPASubmitError = action.payload;
},

saveAuditNewCAPASubmitRequest: (state) => {
  state.savingAuditNewCAPASubmit = true;
},
saveAuditNewCAPASubmitResponse: (state, action) => {
  state.savingAuditNewCAPASubmit = false;
  state.saveAuditNewCAPASubmitResponse = action.payload;
},
saveAuditNewCAPASubmitError: (state, action) => {
  state.savingAuditNewCAPASubmit = false;
  state.saveAuditNewCAPASubmitError = action.payload;
},

//get Audit Payment

saveAuditPaymentRequest: (state) => {
  state.savingAuditPayment = true;
},
saveAuditPaymentResponse: (state, action) => {
  state.savingAuditPayment = false;
  state.saveAuditPaymentResponse = action.payload;
},
saveAuditPaymentError: (state, action) => {
  state.savingAuditPayment = false;
  state.saveAuditPaymentError = action.payload;
},
getAuditPaymentRequest: (state) => {
  state.gettingAuditPayment = true;
},
getAuditPaymentResponse: (state, action) => {
  state.gettingAuditPayment = false;
  state.getAuditPaymentResponse = action.payload;
},
getAuditPaymentError: (state, action) => {
  state.gettingAuditPayment = false;
  state.getAuditPaymentError = action.payload;
},


    //for cash handling to get cash denomination master
    getDenominationNameRequest: (state) => {
      state.gettingDenominationName = true;
    },
    getDenominationNameResponse: (state, action) => {
      state.gettingDenominationName = false;
      state.getDenominationNameResponse = action.payload;
    },
    getDenominationNameError: (state, action) => {
      state.gettingDenominationName = false;
      state.getDenominationNameError = action.payload;
    },


    //for cash handling to get cash sales closure status name master
    getClosureStatusNameRequest: (state) => {
      state.gettingClosureStatusName = true;
    },
    getClosureStatusNameResponse: (state, action) => {
      state.gettingClosureStatusName = false;
      state.getClosureStatusNameResponse = action.payload;
    },
    getClosureStatusNameError: (state, action) => {
      state.gettingClosureStatusName = false;
      state.getClosureStatusNameError = action.payload;
    },

    //for to get outlet name by using associative array
    getOutletNameRequest: (state) => {
      state.gettingOutletName = true;
    },
    getOutletNameResponse: (state, action) => {
      state.gettingOutletName = false;
      state.getOutletNameResponse = action.payload;
    },
    getOutletNameError: (state, action) => {
      state.gettingOutletName = false;
      state.getOutletNameError = action.payload;
    },

    //for cash handling to get cash deposit mode name
    getDepositModeNameRequest: (state) => {
      state.gettingDepositModeName = true;
    },
    getDepositModeNameResponse: (state, action) => {
      state.gettingDepositModeName = false;
      state.getDepositModeNameResponse = action.payload;
    },
    getDepositModeNameError: (state, action) => {
      state.gettingDepositModeName = false;
      state.getDepositModeNameError = action.payload;
    },

    getDepositSkipReasonRequest: (state) => {
      state.gettingDepositSkipReason = true;
    },
    getDepositSkipReasonResponse: (state, action) => {
      state.gettingDepositSkipReason = false;
      state.getDepositSkipReasonResponse = action.payload;
    },
    getDepositSkipReasonError: (state, action) => {
      state.gettingDepositSkipReason = false;
      state.getDepositSkipReasonError = action.payload;
    },

    getRejectRequest: (state) => {
      state.gettingRejectReason = true;
    },
    getRejectResponse: (state, action) => {
      state.gettingRejectReason = false;
      state.getRejectResponse = action.payload;
    },
    getRejectError: (state, action) => {
      state.gettingRejectReason = false;
      state.getRejectError = action.payload;
    },

    saveDayClosureRequest: (state) => {
      state.savingDayClosureDetails = true;
    },
    saveDayClosureResponse: (state, action) => {
      state.savingDayClosureDetails = false;
      state.saveDayClosureResponse = action.payload;
    },
    saveDayClosureError: (state, action) => {
      state.savingDayClosureDetails = false;
      state.saveDayClosureError = action.payload;
    },


    saveMismatchRequest: (state) => {
      state.savingMismatchDetails = true;
    },
    saveMismatchResponse: (state, action) => {
      state.savingMismatchDetails = false;
      state.saveMismatchResponse = action.payload;
    },
    saveMismatchError: (state, action) => {
      state.savingMismatchDetails = false;
      state.saveMismatchError = action.payload;
    },


    saveDayClosureVerificationRequest: (state) => {
      state.savingDayClosureVerificationDetails = true;
    },
    saveDayClosureVerificationResponse: (state, action) => {
      state.savingDayClosureVerificationDetails = false;
      state.saveDayClosureVerificationResponse = action.payload;
    },
    saveDayClosureVerificationError: (state, action) => {
      state.savingDayClosureVerificationDetails = false;
      state.saveDayClosureVerificationError = action.payload;
    },

    getCashSalesRequest: (state) => {
      state.gettingCashSalesAmt = true;
    },
    getCashSalesResponse: (state, action) => {
      state.gettingCashSalesAmt = false;
      state.getCashSalesResponse = action.payload;
    },
    getCashSalesError: (state, action) => {
      state.gettingCashSalesAmt = false;
      state.getCashSalesError = action.payload;
    },

    getBalanceRequest: (state) => {
      state.gettingBalanceAmt = true;
    },
    getBalanceResponse: (state, action) => {
      state.gettingBalanceAmt = false;
      state.getBalanceResponse = action.payload;
    },
    getBalanceError: (state, action) => {
      state.gettingBalanceAmt = false;
      state.getBalanceError = action.payload;
    },

    getCrewRequest: (state) => {
      state.gettingCrewDetails = true;
    },
    getCrewResponse: (state, action) => {
      state.gettingCrewDetails = false;
      state.getCrewResponse = action.payload;
    },
    getCrewError: (state, action) => {
      state.gettingCrewDetails = false;
      state.getCrewError = action.payload;
    },

    getRevisionRequest: (state) => {
      state.gettingRevisionDetail = true;
    },
    getRevisionResponse: (state, action) => {
      state.gettingRevisionDetail = false;
      state.getRevisionResponse = action.payload;
    },
    getRevisionError: (state, action) => {
      state.gettingRevisionDetail = false;
      state.getRevisionError = action.payload;
    },

    getAttachementRequest: (state) => {
      state.gettingAttachementDetail = true;
    },
    getAttachementResponse: (state, action) => {
      state.gettingAttachementDetail = false;
      state.getAttachementResponse = action.payload;
    },
    getAttachementError: (state, action) => {
      state.gettingAttachementDetail = false;
      state.getAttachementError = action.payload;
    },


    getPaymentRequest: (state) => {
      state.gettingPaymentRequest = true;
    },
    getPaymentRequestResponse: (state, action) => {
      state.gettingPaymentRequest = false;
      state.getPaymentRequestResponse = action.payload;
    },
    getPaymentRequestError: (state, action) => {
      state.gettingPaymentRequest = false;
      state.getPaymentRequestResponse = action.payload;
    },
    getPaymentOHRequest: (state) => {
      state.gettingPaymentOHRequest = true;
    },
    getPaymentOHRequestResponse: (state, action) => {
      state.gettingPaymentOHRequest = false;
      state.getPaymentOHRequestResponse = action.payload;
    },
    getPaymentOHRequestError: (state, action) => {
      state.gettingPaymentOHRequest = false;
      state.getPaymentOHRequestResponse = action.payload;
    },

    getPaymentAHRequest: (state) => {
      state.gettingPaymentAHRequest = true;
    },
    getPaymentAHRequestResponse: (state, action) => {
      state.gettingPaymentAHRequest = false;
      state.getPaymentAHRequestResponse = action.payload;
    },
    getPaymentAHRequestError: (state, action) => {
      state.gettingPaymentAHRequest = false;
      state.getPaymentAHRequestResponse = action.payload;
    },
    getUserReportRequest: (state) => {
      state.gettingUserReport = true;
    },
    getUserReportError: (state, action) => {
      state.gettingUserReport = false;
      state.getUserReportError = action.payload;
    },
    getUserReporResponseData: (state, action) => {
      state.gettingUserReport = false;
      state.getUserReporResponse = action.payload;
    },
    getEmailMappingRequest: (state) => {
      state.gettingEmailMapping = true;
    },
    getEmailMappingResponse: (state, action) => {
      state.gettingEmailMapping = false;
      state.getEmailMappingResponse = action.payload;
    },
    getEmailMappingError: (state, action) => {
      state.gettingEmailMapping = false;
      state.getEmailMappingResponse = action.payload;
    },

    savingExpenseData: (state, action) => {
      state.getExpenseData = action.payload;
    },

    gettingPettyCashRequest: (state) => {
      state.gettingPettyCashRequest = true;
    },
    getPettyCashRequestResponse: (state, action) => {
      state.gettingPettyCashRequest = false;
      state.getPettyCashRequestResponse = action.payload;
    },
    getPettyCashRequestError: (state, action) => {
      state.gettingPettyCashRequest = false;
      state.getPettyCashRequestResponse = action.payload;
    },

    saveEDCDetailsRequest: (state) => {
      state.savingEDCDetails = true;
    },
    saveEDCDetailsResponse: (state, action) => {
      state.savingEDCDetails = false;
      state.saveEDCDetailsResponse = action.payload;
    },
    saveEDCDetailsError: (state, action) => {
      state.savingEDCDetails = false;
      state.saveEDCDetailsError = action.payload;
    },

    //UploadedBankTrans


    getUploadedBankTransRequest: (state) => {
      state.gettingUploadedBankTrans = true;
    },
    getUploadedBankTransResponse: (state, action) => {
      state.gettingUploadedBankTrans = false;
      state.getUploadedBankTransResponse = action.payload;
    },
    getUploadedBankTransError: (state, action) => {
      state.gettingUploadedBankTrans = false;
      state.getUploadedBankTransResponse = action.payload;
    },

    saveUploadedBankTrans: (state) => {
      state.savingUploadedBankTrans = true;
    },
    saveUploadedBankTransResponse: (state, action) => {
      state.savingUploadedBankTrans = false;
      state.saveUploadedBankTransResponse = action.payload;
    },
    saveUploadedBankTransError: (state, action) => {
      state.savingUploadedBankTrans = false;
      state.saveUploadedBankTransError = action.payload;
    },

    //OutletBankDetails

    getOutletBankDetailsRequest: (state) => {
      state.gettingOutletBankDetails = true;
    },
    getOutletBankDetailsResponse: (state, action) => {
      state.gettingOutletBankDetails = false;
      state.getOutletBankDetailsResponse = action.payload;
    },
    getOutletBankDetailsError: (state, action) => {
      state.gettingOutletBankDetails = false;
      state.getOutletBankDetailsResponse = action.payload;
    },

    saveOutletBankDetails: (state) => {
      state.savingOutletBankDetails = true;
    },
    saveOutletBankDetailsResponse: (state, action) => {
      state.savingOutletBankDetails = false;
      state.saveOutletBankDetailsResponse = action.payload;
    },
    saveOutletBankDetailsError: (state, action) => {
      state.savingOutletBankDetails = false;
      state.saveOutletBankDetailsError = action.payload;
    },

    //RistaSalesData

    getRistaSalesDataRequest: (state) => {
      state.gettingRistaSalesData = true;
    },
    getRistaSalesDataResponse: (state, action) => {
      state.gettingRistaSalesData = false;
      state.getRistaSalesDataResponse = action.payload;
    },
    getRistaSalesDataError: (state, action) => {
      state.gettingRistaSalesData = false;
      state.getRistaSalesDataResponse = action.payload;
    },

    saveRistaSalesData: (state) => {
      state.savingRistaSalesData = true;
    },
    saveRistaSalesDataResponse: (state, action) => {
      state.savingRistaSalesData = false;
      state.saveRistaSalesDataResponse = action.payload;
    },
    saveRistaSalesDataError: (state, action) => {
      state.savingRistaSalesData = false;
      state.saveRistaSalesDataError = action.payload;
    },

    //EdcPaymentVsBank
    getEdcPaymentVsBankRequest: (state) => {
      state.gettingEdcPaymentVsBank = true;
    },
    getEdcPaymentVsBankResponse: (state, action) => {
      state.gettingEdcPaymentVsBank = false;
      state.getEdcPaymentVsBankResponse = action.payload;
    },
    getEdcPaymentVsBankError: (state, action) => {
      state.gettingEdcPaymentVsBank = false;
      state.getEdcPaymentVsBankResponse = action.payload;
    },

    saveEdcPaymentVsBank: (state) => {
      state.savingEdcPaymentVsBank = true;
    },
    saveEdcPaymentVsBankResponse: (state, action) => {
      state.savingEdcPaymentVsBank = false;
      state.saveEdcPaymentVsBankResponse = action.payload;
    },
    saveEdcPaymentVsBankError: (state, action) => {
      state.savingEdcPaymentVsBank = false;
      state.saveEdcPaymentVsBankError = action.payload;
    },

    //PaymentDiffRemarks

    getPaymentDiffRemarksRequest: (state) => {
      state.gettingPaymentDiffRemarks = true;
    },
    getPaymentDiffRemarksResponse: (state, action) => {
      state.gettingPaymentDiffRemarks = false;
      state.getPaymentDiffRemarksResponse = action.payload;
    },
    getPaymentDiffRemarksError: (state, action) => {
      state.gettingPaymentDiffRemarks = false;
      state.getPaymentDiffRemarksResponse = action.payload;
    },

    savePaymentDiffRemarks: (state) => {
      state.savingPaymentDiffRemarks = true;
    },
    savePaymentDiffRemarksResponse: (state, action) => {
      state.savingPaymentDiffRemarks= false;
      state.savePaymentDiffRemarksResponse = action.payload;
    },
    savePaymentDiffRemarksError: (state, action) => {
      state.savingPaymentDiffRemarks = false;
      state.savePaymentDiffRemarksError = action.payload;
    },

    //UploadCsvDotpe
    saveUploadCsvDotpe: (state) => {
      state.savingUploadCsvDotpe = true;
    },
    saveUploadCsvDotpeResponse: (state, action) => {
      state.savingUploadCsvDotpe = false;
      state.saveUploadCsvDotpeResponse = action.payload;
    },
    saveUploadCsvDotpeError: (state, action) => {
      state.savingUploadCsvDotpe = false;
      state.saveUploadCsvDotpeError = action.payload;
    },

    //UploadedDotpe
    getUploadedDotpeRequest: (state) => {
      state.gettingUploadedDotpe = true;
    },
    getUploadedDotpeResponse: (state, action) => {
      state.gettingUploadedDotpe = false;
      state.getUploadedDotpeResponse = action.payload;
    },
    getUploadedDotpeError: (state, action) => {
      state.gettingUploadedDotpe = false;
      state.getUploadedDotpeResponse = action.payload;
    },

    saveUploadedDotpe: (state) => {
      state.savingUploadedDotpe = true;
    },
    saveUploadedDotpeResponse: (state, action) => {
      state.savingUploadedDotpe= false;
      state.saveUploadedDotpeResponse = action.payload;
    },
    saveUploadedDotpeError: (state, action) => {
      state.savingUploadedDotpe = false;
      state.saveUploadedDotpeError = action.payload;
    },

    //DotpePaymentVsSales
    getDotpePaymentVsSalesRequest: (state) => {
      state.gettingDotpePaymentVsSales = true;
    },
    getDotpePaymentVsSalesResponse: (state, action) => {
      state.gettingDotpePaymentVsSales = false;
      state.getDotpePaymentVsSalesResponse = action.payload;
    },
    getDotpePaymentVsSalesError: (state, action) => {
      state.gettingDotpePaymentVsSales = false;
      state.getDotpePaymentVsSalesResponse = action.payload;
    },

    saveDotpePaymentVsSales: (state) => {
      state.savingDotpePaymentVsSales = true;
    },
    saveDotpePaymentVsSalesResponse: (state, action) => {
      state.savingDotpePaymentVsSales= false;
      state.saveDotpePaymentVsSalesResponse = action.payload;
    },
    saveDotpePaymentVsSalesError: (state, action) => {
      state.savingDotpePaymentVsSales = false;
      state.saveDotpePaymentVsSalesError = action.payload;
    },

    //UploadedSwiggy

    getUploadedSwiggyRequest: (state) => {
      state.gettingUploadedSwiggy = true;
    },
    getUploadedSwiggyResponse: (state, action) => {
      state.gettingUploadedSwiggy = false;
      state.getUploadedSwiggyResponse = action.payload;
    },
    getUploadedSwiggyError: (state, action) => {
      state.gettingUploadedSwiggy = false;
      state.getUploadedSwiggyResponse = action.payload;
    },

    saveUploadedSwiggy: (state) => {
      state.savingUploadedSwiggy = true;
    },
    saveUploadedSwiggyResponse: (state, action) => {
      state.savingUploadedSwiggy = false;
      state.saveUploadedSwiggyResponse = action.payload;
    },
    saveUploadedSwiggyError: (state, action) => {
      state.savingUploadedSwiggy = false;
      state.saveUploadedSwiggyError = action.payload;
    },
    //UploadCsvSwiggy

    getUploadCsvSwiggyRequest: (state) => {
      state.gettingUploadCsvSwiggy = true;
    },
    getUploadCsvSwiggyResponse: (state, action) => {
      state.gettingUploadCsvSwiggy = false;
      state.getUploadCsvSwiggyResponse = action.payload;
    },
    getUploadCsvSwiggyError: (state, action) => {
      state.gettingUploadCsvSwiggy = false;
      state.getUploadCsvSwiggyResponse = action.payload;
    },

    saveUploadCsvSwiggy: (state) => {
      state.savingUploadCsvSwiggy = true;
    },
    saveUploadCsvSwiggyResponse: (state, action) => {
      state.savingUploadCsvSwiggy = false;
      state.saveUploadCsvSwiggyResponse = action.payload;
    },
    saveUploadCsvSwiggyError: (state, action) => {
      state.savingUploadCsvSwiggy = false;
      state.saveUploadCsvSwiggyError = action.payload;
    },
    //UploadCsvMagicPin
    getUploadCsvMagicPinRequest: (state) => {
      state.gettingUploadCsvMagicPin = true;
    },
    getUploadCsvMagicPinResponse: (state, action) => {
      state.gettingUploadCsvMagicPin = false;
      state.getUploadCsvMagicPinResponse = action.payload;
    },
    getUploadCsvMagicPinError: (state, action) => {
      state.gettingUploadCsvMagicPin = false;
      state.getUploadCsvMagicPinResponse = action.payload;
    },

    saveUploadCsvMagicPin: (state) => {
      state.savingUploadCsvMagicPin = true;
    },
    saveUploadCsvMagicPinResponse: (state, action) => {
      state.savingUploadCsvMagicPin = false;
      state.saveUploadedSwiggyResponse = action.payload;
    },
    saveUploadCsvMagicPinError: (state, action) => {
      state.savingUploadCsvMagicPin = false;
      state.saveUploadCsvMagicPinError = action.payload;
    },
    //UploadMagicPin

    getUploadedMagicPinRequest: (state) => {
      state.gettingUploadedMagicPin = true;
    },
    getUploadedMagicPinResponse: (state, action) => {
      state.gettingUploadedMagicPin = false;
      state.getUploadedMagicPinResponse = action.payload;
    },
    getUploadedMagicPinError: (state, action) => {
      state.gettingUploadedMagicPin = false;
      state.getUploadedMagicPinResponse = action.payload;
    },

    saveUploadedMagicPin: (state) => {
      state.savingUploadedMagicPin = true;
    },
    saveUploadedMagicPinResponse: (state, action) => {
      state.savingUploadedMagicPin= false;
      state.saveUploadedMagicPinResponse = action.payload;
    },
    saveUploadedMagicPinError: (state, action) => {
      state.savingUploadedMagicPin = false;
      state.saveUploadedMagicPinError = action.payload;
    },
//UploadCsvZomato

 getUploadCsvZomatoRequest: (state) => {
  state.gettingUploadCsvZomato = true;
},
getUploadCsvZomatoResponse: (state, action) => {
  state.gettingUploadCsvZomato = false;
  state.getUploadCsvZomatoResponse = action.payload;
},
getUploadCsvZomatoError: (state, action) => {
  state.gettingUploadCsvZomato = false;
  state.getUploadCsvZomatoResponse = action.payload;
},

saveUploadCsvZomato: (state) => {
  state.savingUploadCsvZomato = true;
},
saveUploadCsvZomatoResponse: (state, action) => {
  state.savingUploadCsvZomato = false;
  state.saveUploadCsvZomatoResponse = action.payload;
},
saveUploadCsvZomatoError: (state, action) => {
  state.savingUploadCsvZomato = false;
  state.saveUploadCsvZomatoError = action.payload;
},
//UploadZomato

getUploadedZomatoRequest: (state) => {
  state.gettingUploadedZomato = true;
},
getUploadedZomatoResponse: (state, action) => {
  state.gettingUploadedZomato = false;
  state.getUploadedZomatoResponse = action.payload;
},
getUploadedZomatoError: (state, action) => {
  state.gettingUploadedZomato = false;
  state.getUploadedZomatoResponse = action.payload;
},

saveUploadedZomato: (state) => {
  state.savingUploadedZomato = true;
},
saveUploadedZomatoResponse: (state, action) => {
  state.savingUploadedZomato = false;
  state.saveUploadedZomatoResponse = action.payload;
},
saveUploadedZomatoError: (state, action) => {
  state.savingUploadedZomato = false;
  state.saveUploadedZomatoError = action.payload;
},

//Swiggy

getSwiggyPaymentVsSalesRequest: (state) => {
  state.gettingSwiggyPaymentVsSales = true;
},
getSwiggyPaymentVsSalesResponse: (state, action) => {
  state.gettingSwiggyPaymentVsSales = false;
  state.getSwiggyPaymentVsSalesResponse = action.payload;
},
getSwiggyPaymentVsSalesError: (state, action) => {
  state.gettingSwiggyPaymentVsSales = false;
  state.getSwiggyPaymentVsSalesResponse = action.payload;
},

// Zomato

getZomatoPaymentVsSalesRequest: (state) => {
  state.gettingZomatoPaymentVsSales = true;
},
getZomatoPaymentVsSalesResponse: (state, action) => {
  state.gettingZomatoPaymentVsSales = false;
  state.getZomatoPaymentVsSalesResponse = action.payload;
},
getZomatoPaymentVsSalesError: (state, action) => {
  state.gettingZomatoPaymentVsSales = false;
  state.getZomatoPaymentVsSalesResponse = action.payload;
},

//MagicPin

getMagicPinPaymentVsSalesRequest: (state) => {
  state.gettingMagicPinPaymentVsSales = true;
},
getMagicPinPaymentVsSalesResponse: (state, action) => {
  state.gettingMagicPinPaymentVsSales = false;
  state.getMagicPinPaymentVsSalesResponse = action.payload;
},
getMagicPinPaymentVsSalesError: (state, action) => {
  state.gettingMagicPinPaymentVsSales = false;
  state.getMagicPinPaymentVsSalesResponse = action.payload;
},

//StockTaking


getStockTakingRequest: (state) => {
  state.gettingStockTaking = true;
},
getStockTakingResponse: (state, action) => {
  state.gettingStockTaking = false;
  state.getStockTakingResponse = action.payload;
},
getStockTakingError: (state, action) => {
  state.gettingStockTaking = false;
  state.getStockTakingResponse = action.payload;
},

saveStockTaking: (state) => {
  state.savingStockTaking = true;
},
saveStockTakingResponse: (state, action) => {
  state.savingStockTaking= false;
  state.saveStockTakingResponse = action.payload;
},
saveStockTakingError: (state, action) => {
  state.savingStockTaking = false;
  state.saveStockTakingError = action.payload;
},

//OverallPaymentVsSales

getOverallPaymentVsSalesRequest: (state) => {
  state.gettingOverallPaymentVsSales = true;
},
getOverallPaymentVsSalesResponse: (state, action) => {
  state.gettingOverallPaymentVsSales = false;
  state.getOverallPaymentVsSalesResponse = action.payload;
},
getOverallPaymentVsSalesError: (state, action) => {
  state.gettingOverallPaymentVsSales = false;
  state.getOverallPaymentVsSalesResponse = action.payload;
},
  }
});

export default masterSlice.reducer;

export const saveState =
  ({data}) =>
  async (dispatch) => {
    dispatch(masterSlice.actions.saveStateRequest());
    return apis
      .addState({data})
      .then(({data}) => {
        dispatch(masterSlice.actions.saveStateResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(masterSlice.actions.saveStateError());
      });
  };

export const updateState =
  ({data}) =>
  async (dispatch) => {
    dispatch(masterSlice.actions.saveStateRequest());
    return apis
      .updateState({data})
      .then(({data}) => {
        dispatch(masterSlice.actions.saveStateResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(masterSlice.actions.saveStateError());
      });
  };

export const getStates = () => async (dispatch) => {
  dispatch(masterSlice.actions.getStatesRequest());
  return apis
    .getStates()
    .then(({data}) => {
      dispatch(masterSlice.actions.getStatesResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(masterSlice.actions.getStatesError());
    });
};

export const saveZonal =
  ({data}) =>
  async (dispatch) => {
    dispatch(masterSlice.actions.saveZonalRequest());
    return apis
      .addZonal({data})
      .then(({data}) => {
        dispatch(masterSlice.actions.saveZonalResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(masterSlice.actions.saveZonalError());
      });
  };

export const updateZonal =
  ({data}) =>
  async (dispatch) => {
    dispatch(masterSlice.actions.saveZonalRequest());
    return apis
      .updateZonal({data})
      .then(({data}) => {
        dispatch(masterSlice.actions.saveZonalResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(masterSlice.actions.saveZonalError());
      });
  };

export const getZonal = (stateID) => async (dispatch) => {
  dispatch(masterSlice.actions.getZonalRequest());
  return apis
    .getZonal()
    .then(({data}) => {
      const {data: zonal, ...rest} = data;

      const filterByStateId = filter((e) => (stateID ? e.state_id === stateID : true), zonal ? zonal : []);

      dispatch(masterSlice.actions.getZonalResponse({data: filterByStateId, ...rest}));
      return data;
    })
    .catch(() => {
      dispatch(masterSlice.actions.getZonalError());
    });
};
export const EmployeeZone = (stateID) => async (dispatch) => {
  dispatch(masterSlice.actions.getZonalRequest());
  return apis
    .getZonal()
    .then(({data}) => {
      const tempArr = [];

      data.data.forEach((el) => {
        if (stateID.includes(el.state_id)) {
          tempArr.push(el);
        }
      });
      dispatch(masterSlice.actions.getEmployZone({data: tempArr}));
      return data;
    })
    .catch(() => {
      dispatch(masterSlice.actions.getZonalError());
    });
};
export const saveSubZonal =
  ({data}) =>
  async (dispatch) => {
    dispatch(masterSlice.actions.saveSubZonalRequest());
    return apis
      .addSubZonal({data})
      .then(({data}) => {
        dispatch(masterSlice.actions.saveSubZonalResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(masterSlice.actions.saveSubZonalError());
      });
  };

export const getORLName = () => async (dispatch) => {
  dispatch(masterSlice.actions.getORLRequest());
  return apis
    .getORLName()
    .then(({data}) => {
      dispatch(masterSlice.actions.getORLResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(masterSlice.actions.getORLError());
    });
};

export const getOutletMaster = (subzone_id) => async (dispatch) => {
  dispatch(masterSlice.actions.getOutletMasterRequest());
  return apis
    .getOutletMaster()
    .then(({data}) => {
      const {data: outletList, ...restOfData} = data;
      let filteredBySZ = [];
      if (Array.isArray(subzone_id)) {
        (outletList ?? [])?.forEach((el) => {
          if (subzone_id.includes(el.subzone_id)) {
            filteredBySZ.push(el);
          }
        });
      } else {
        filteredBySZ = (outletList ?? [])?.filter((data) => {
          return subzone_id ? Number(data.subzone_id) === Number(subzone_id) : true;
        });
      }
      dispatch(masterSlice.actions.getOutletMasterResponse({data: filteredBySZ, ...restOfData}));
      return data;
    })
    .catch(() => {
      dispatch(masterSlice.actions.getOutletMasterError());
    });
};

export const getEmployeeMaster = () => async (dispatch) => {
  dispatch(masterSlice.actions.getEmployeeMasterRequest());
  return apis
    .getEmployeeMaster()
    .then(({data}) => {
      dispatch(masterSlice.actions.getEmployeeMasterResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(masterSlice.actions.getEmployeeMasterError());
    });
};

export const updateSubZonal =
  ({data}) =>
  async (dispatch) => {
    dispatch(masterSlice.actions.saveSubZonalRequest());
    return apis
      .updateSubZonal({data})
      .then(({data}) => {
        dispatch(masterSlice.actions.saveSubZonalResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(masterSlice.actions.saveSubZonalError());
      });
  };

export const getSubZonal = (zoneID) => async (dispatch) => {
  dispatch(masterSlice.actions.getSubZonalRequest());
  return apis
    .getSubZonal()
    .then(({data}) => {
      const {data: subZonal, ...rest} = data;
      let tempArr = [];
      if (Array.isArray(zoneID)) {
        data?.data?.forEach((el) => {
          if (zoneID.includes(el.zonal_id)) {
            tempArr.push(el);
          }
        });
      } else {
        tempArr = filter((e) => (zoneID ? e.zonal_id === zoneID : true), subZonal ? subZonal : []);
      }
      dispatch(masterSlice.actions.getSubZonalResponse({data: tempArr, ...rest}));
      return data;
    })
    .catch(() => {
      dispatch(masterSlice.actions.getSubZonalError());
    });
};

export const saveOutletMaster =
  ({data}) =>
  async (dispatch) => {
    dispatch(masterSlice.actions.saveOutletMasterRequest());
    return apis
      .addOutletMaster({data})
      .then(({data}) => {
        dispatch(masterSlice.actions.saveOutletMasterResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(masterSlice.actions.saveOutletMasterError());
      });
  };

export const updateOutletMaster =
  ({data}) =>
  async (dispatch) => {
    dispatch(masterSlice.actions.saveOutletMasterRequest());
    return apis
      .updateOutletMaster({data})
      .then(({data}) => {
        dispatch(masterSlice.actions.saveOutletMasterResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(masterSlice.actions.saveOutletMasterError());
      });
  };
export const updateCity =
  ({data}) =>
  async (dispatch) => {
    dispatch(masterSlice.actions.saveOutletMasterRequest());
    return apis
      .updateCity({data})
      .then(({data}) => {
        dispatch(masterSlice.actions.saveCityResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(masterSlice.actions.saveCityError());
      });
  };

export const getCity = (subZoneID) => async (dispatch) => {
  dispatch(masterSlice.actions.getCityRequest());
  return apis
    .getCity()
    .then(({data}) => {
      const {data: cities, ...rest} = data;
      const filterCities = filter((e) => (subZoneID ? e.subzonel_id === subZoneID : true), cities ? cities : []);
      dispatch(masterSlice.actions.getCityResponse({data: filterCities, ...rest}));
      return data;
    })
    .catch(() => {
      dispatch(masterSlice.actions.getCityError());
    });
};

export const saveDivision =
  ({data}) =>
  async (dispatch) => {
    dispatch(masterSlice.actions.saveDivisionRequest());
    return apis
      .addDivision({data})
      .then(({data}) => {
        dispatch(masterSlice.actions.saveDivisionResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(masterSlice.actions.saveDivisionError());
      });
  };

export const updateDivision =
  ({data}) =>
  async (dispatch) => {
    dispatch(masterSlice.actions.saveDivisionRequest());
    return apis
      .updateDivision({data})
      .then(({data}) => {
        dispatch(masterSlice.actions.saveDivisionResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(masterSlice.actions.saveDivisionError());
      });
  };

export const getDivision = () => async (dispatch) => {
  dispatch(masterSlice.actions.getDivisionRequest());
  return apis
    .getDivision()
    .then(({data}) => {
      data.data = data?.data.filter((item) => item.status === '1');

      dispatch(masterSlice.actions.getDivisionResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(masterSlice.actions.getDivisionError());
    });
};

export const getDepartment = () => async (dispatch) => {
  dispatch(masterSlice.actions.getDepartmentRequest());
  return apis
    .getDepartment()
    .then(({data}) => {
      data.data = data?.data.filter((item) => item.status === '1');
      dispatch(masterSlice.actions.getDepartmentResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(masterSlice.actions.getDepartmentError());
    });
};

export const saveDepartment =
  ({data}) =>
  async (dispatch) => {
    dispatch(masterSlice.actions.saveDepartmentRequest());
    return apis
      .addDepartment({data})
      .then(({data}) => {
        dispatch(masterSlice.actions.saveDepartmentResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(masterSlice.actions.saveDepartmentError());
      });
  };

export const updateDepartment =
  ({data}) =>
  async (dispatch) => {
    dispatch(masterSlice.actions.saveDepartmentRequest());
    return apis
      .updateDepartment({data})
      .then(({data}) => {
        dispatch(masterSlice.actions.saveDepartmentResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(masterSlice.actions.saveDepartmentError());
      });
  };

export const getDesignation = () => async (dispatch) => {
  dispatch(masterSlice.actions.getDesignationRequest());
  return apis
    .getDesignation()
    .then(({data}) => {
      data.data = data?.data.filter((item) => item.status === '1');

      dispatch(masterSlice.actions.getDesignationResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(masterSlice.actions.getDesignationError());
    });
};

export const saveDesignation =
  ({data}) =>
  async (dispatch) => {
    dispatch(masterSlice.actions.saveDesignationRequest());
    return apis
      .addDesignation({data})
      .then(({data}) => {
        dispatch(masterSlice.actions.saveDesignationResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(masterSlice.actions.saveDesignationError());
      });
  };

export const updateDesignation =
  ({data}) =>
  async (dispatch) => {
    dispatch(masterSlice.actions.saveDesignationRequest());
    return apis
      .updateDesignation({data})
      .then(({data}) => {
        dispatch(masterSlice.actions.saveDesignationResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(masterSlice.actions.saveDesignationError());
      });
  };
export const getEmployeeLevel = () => async (dispatch) => {
  dispatch(masterSlice.actions.getEmployeeLevelRequest());
  return apis
    .getEmployeeLevel()
    .then(({data}) => {
      dispatch(masterSlice.actions.getEmployeeLevelResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(masterSlice.actions.getEmployeeLevelError());
    });
};

export const updateEmployeeLevel =
  ({data}) =>
  async (dispatch) => {
    dispatch(masterSlice.actions.saveEmployeeLevelRequest());
    return apis
      .updateEmployeeLevel({data})
      .then(({data}) => {
        dispatch(masterSlice.actions.saveEmployeeLevelResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(masterSlice.actions.saveEmployeeLevelError());
      });
  };

export const saveEmployeeLevel =
  ({data}) =>
  async (dispatch) => {
    dispatch(masterSlice.actions.saveEmployeeLevelRequest());
    return apis
      .addEmployeeLevel({data})
      .then(({data}) => {
        dispatch(masterSlice.actions.saveEmployeeLevelResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(masterSlice.actions.saveEmployeeLevelError());
      });
  };

export const getAuditCategory = () => async (dispatch) => {
  dispatch(masterSlice.actions.getAuditCategoryRequest());
  return masterApi
    .getAuditCategory()
    .then(({data}) => {
      dispatch(masterSlice.actions.getAuditCategoryResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(masterSlice.actions.getAuditCategoryError());
    });
};

export const addAuditCategory =
  ({data}) =>
  async (dispatch) => {
    dispatch(masterSlice.actions.saveAuditCategoryRequest());
    return masterApi
      .addAuditCategory({data})
      .then(({data}) => {
        dispatch(masterSlice.actions.saveAuditCategoryResponse(data));

        messageToast({message: data?.message ?? data?.statusText, status: data.status, title: 'State Master'});
        return data;
      })
      .catch(() => {
        dispatch(masterSlice.actions.saveAuditCategoryError());
      });
  };

export const updateAuditCategory =
  ({data}) =>
  async (dispatch) => {
    dispatch(masterSlice.actions.saveAuditCategoryRequest());
    return masterApi
      .updateAuditCategory({data})
      .then(({data}) => {
        dispatch(masterSlice.actions.saveAuditCategoryResponse(data));
        messageToast({message: data?.message ?? data?.statusText, status: data.status, title: 'State Master'});
        return data;
      })
      .catch(() => {
        dispatch(masterSlice.actions.saveAuditCategoryError());
      });
  };

export const getAuditSubCategory = (auditcategory_ID) => async (dispatch) => {
  dispatch(masterSlice.actions.getAuditSubCategoryRequest());
  return masterApi
    .getAuditSubCategory()
    .then(({data}) => {
      const {data: AuditSubCategory, ...rest} = data;
      const filterByStateId = filter((e) => (auditcategory_ID ? e.auditcategory_id === auditcategory_ID : true), AuditSubCategory ? AuditSubCategory : []);
      dispatch(masterSlice.actions.getAuditSubCategoryResponse({data: filterByStateId, ...rest}));
      return data;
    })
    .catch((e) => {
      dispatch(masterSlice.actions.getAuditSubCategoryError(e));
    });
};

export const addAuditSubCategory =
  ({data}) =>
  async (dispatch) => {
    dispatch(masterSlice.actions.saveAuditSubCategoryRequest());
    return masterApi
      .addAuditSubCategory({data})
      .then(({data}) => {
        dispatch(masterSlice.actions.saveAuditSubCategoryResponse(data));
        messageToast({message: data?.message ?? data?.statusText, status: data.status, title: 'State Master'});
        return data;
      })
      .catch(() => {
        dispatch(masterSlice.actions.saveAuditSubCategoryError());
      });
  };

export const updateAuditSubCategory =
  ({data}) =>
  async (dispatch) => {
    dispatch(masterSlice.actions.saveAuditSubCategoryRequest());
    return masterApi
      .updateAuditSubCategory({data})
      .then(({data}) => {
        dispatch(masterSlice.actions.saveAuditSubCategoryResponse(data));
        messageToast({message: data?.message ?? data?.statusText, status: data.status, title: 'State Master'});
        return data;
      })
      .catch(() => {
        dispatch(masterSlice.actions.saveAuditSubCategoryError());
      });
  };

export const getAuditPointList = () => async (dispatch) => {
  dispatch(masterSlice.actions.getAuditPointListRequest());
  return masterApi
    .getAuditPointList()
    .then(({data}) => {
      dispatch(masterSlice.actions.getAuditPointListResponse(data));
      return data;
    })
    .catch((e) => {
      dispatch(masterSlice.actions.getAuditPointListError(e));
    });
};

export const getAllCat = () => async (dispatch) => {
  dispatch(masterSlice.actions.getAuditPointListRequest());
  return masterApi
    .getAuditPointList()
    .then(({data}) => {
      dispatch(masterSlice.actions.getAuditPointListResponse(data));
      return data;
    })
    .catch((e) => {
      dispatch(masterSlice.actions.getAuditPointListError(e));
    });
};

export const addAuditPointList =
  ({data}) =>
  async (dispatch) => {
    dispatch(masterSlice.actions.saveAuditPointListRequest());
    return masterApi
      .addAuditPointList({data})
      .then(({data}) => {
        dispatch(masterSlice.actions.saveAuditPointListResponse(data));
        messageToast({message: data?.message ?? data?.statusText, status: data.status, title: 'State Master'});
        return data;
      })
      .catch(() => {
        dispatch(masterSlice.actions.saveAuditPointListError());
      });
  };

export const updateAuditPointList =
  ({data}) =>
  async (dispatch) => {
    dispatch(masterSlice.actions.saveAuditPointListRequest());
    return masterApi
      .updateAuditPointList({data})
      .then(({data}) => {
        dispatch(masterSlice.actions.saveAuditPointListResponse(data));
        messageToast({message: data?.message ?? data?.statusText, status: data.status, title: 'Audit Point List Master'});
        return data;
      })
      .catch(() => {
        dispatch(masterSlice.actions.saveAuditPointListError());
      });
  };

export const getAuditPointListMark = () => async (dispatch) => {
  dispatch(masterSlice.actions.getAuditPointListMarkRequest());
  return masterApi
    .getAuditPointMark()
    .then(({data}) => {
      dispatch(masterSlice.actions.getAuditPointListMarkResponse(data));
      return data;
    })
    .catch((e) => {
      dispatch(masterSlice.actions.getAuditPointListMarkError(e));
    });
};

export const addAuditPointListMark =
  ({data}) =>
  async (dispatch) => {
    dispatch(masterSlice.actions.saveAuditPointListMarkRequest());
    return masterApi
      .addAuditPointMark({data})
      .then(({data}) => {
        dispatch(masterSlice.actions.saveAuditPointListMarkResponse(data));
        messageToast({message: data?.message ?? data?.statusText, status: data.status, title: 'State Master'});
        return data;
      })
      .catch(() => {
        dispatch(masterSlice.actions.saveAuditPointListMarkError());
      });
  };

export const updateAuditPointListMark =
  ({data}) =>
  async (dispatch) => {
    dispatch(masterSlice.actions.saveAuditPointListMarkRequest());
    return masterApi
      .updateAuditPointMark({data})
      .then(({data}) => {
        dispatch(masterSlice.actions.saveAuditPointListMarkResponse(data));
        messageToast({message: data?.message ?? data?.statusText, status: data.status, title: 'Audit Point List Master'});
        return data;
      })
      .catch(() => {
        dispatch(masterSlice.actions.saveAuditPointListMarkError());
      });
  };

export const getRoleMaster = () => async (dispatch) => {
  dispatch(masterSlice.actions.getRoleMasterRequest());
  return masterApi
    .getRoleMaster()
    .then(({data}) => {
      dispatch(masterSlice.actions.getRoleMasterResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(masterSlice.actions.getRoleMasterError());
    });
};

export const addRoleMaster =
  ({data}) =>
  async (dispatch) => {
    dispatch(masterSlice.actions.saveRoleMasterRequest());
    return masterApi
      .addRoleMaster({data})
      .then(({data}) => {
        dispatch(masterSlice.actions.saveRoleMasterResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(masterSlice.actions.saveRoleMasterError());
      });
  };

export const getRoleList = () => async (dispatch) => {
  dispatch(masterSlice.actions.getRoleMasterListRequest());
  return masterApi
    .getRoleList()
    .then(({data}) => {
      dispatch(masterSlice.actions.getRoleMasterListResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(masterSlice.actions.getRoleMasterListError());
    });
};

export const addEmployeeMaster =
  ({data}) =>
  async (dispatch) => {
    dispatch(masterSlice.actions.saveEmployeeMasterRequest());
    return apis
      .addEmployeeMaster({data})
      .then(({data}) => {
        dispatch(masterSlice.actions.saveEmployeeMasterResponse({data}));
        return data;
      })
      .catch(() => {
        dispatch(masterSlice.actions.saveEmployeeMasterError());
      });
  };

export const updateEmployeeMaster = (data) => async (dispatch) => {
  dispatch(masterSlice.actions.saveEmployeeMasterRequest());
  return apis
    .updateEmployeeMaster(data)
    .then(({data}) => {
      dispatch(masterSlice.actions.saveEmployeeMasterResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(masterSlice.actions.saveEmployeeMasterError());
    });
};

export const getModulesList = () => async (dispatch) => {
  dispatch(masterSlice.actions.getModulesListRequest());
  return apis
    .getModulesList()
    .then(({data}) => {
      dispatch(masterSlice.actions.getModulesListResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(masterSlice.actions.getModulesListError());
    });
};

export const getSubModulesList = () => async (dispatch) => {
  dispatch(masterSlice.actions.getSubModulesListRequest());
  return apis
    .getSubModulesList()
    .then(({data}) => {
      dispatch(masterSlice.actions.getSubModulesListResponse({...data}));
      return data;
    })
    .catch(() => {
      dispatch(masterSlice.actions.getSubModulesListError());
    });
};

export const getModuleScreensList = () => async (dispatch) => {
  dispatch(masterSlice.actions.getModulesScreenListRequest());
  return apis
    .getModulesScreenList()
    .then(({data}) => {
      dispatch(masterSlice.actions.getModulesScreenListResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(masterSlice.actions.getModulesScreenListError());
    });
};

export const getReport = () => async (dispatch) => {
  dispatch(masterSlice.actions.getReportRequest());
  return apis
    .getReport()
    .then(({data}) => {
      dispatch(masterSlice.actions.getReportResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(masterSlice.actions.getReportError());
    });
};

export const getEmployeeMapping = () => async (dispatch) => {
  dispatch(masterSlice.actions.getEmployeeMappingRequest());
  return apis
    .getEmployeeMapping()
    .then(({data}) => {
      dispatch(masterSlice.actions.getEmployeeMappingResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(masterSlice.actions.getEmployeeMappingError());
    });
};

export const UpdateEmployeeMapping =
  ({data}) =>
  async (dispatch) => {
    dispatch(masterSlice.actions.saveEmployeeMappingRequest());
    return apis
      .updateEmployeeMApping({data})
      .then(({data}) => {
        dispatch(masterSlice.actions.saveEmployeeMappingResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(masterSlice.actions.saveEmployeeMappingError());
      });
  };

export const addEmployeeMapping =
  ({data}) =>
  async (dispatch) => {
    dispatch(masterSlice.actions.saveEmployeeMappingRequest());
    return apis
      .addEmployeeMapping({data})
      .then(({data}) => {
        dispatch(masterSlice.actions.saveEmployeeMappingResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(masterSlice.actions.saveEmployeeMappingError());
      });
  };

export const getAllCategory = () => async (dispatch) => {
  return masterApi
    .getAllCategory()
    .then(({data}) => {
      dispatch(masterSlice.actions.getCat(data.data));
      return data.data;
    })
    .catch(() => {
      dispatch(masterSlice.actions.getCatErr());
    });
};



//Rohini Audit Points Image Start

export const getAuditCategoryPointList = (auditsubcategort_ID) => async (dispatch) => {
  dispatch(masterSlice.actions.getAuditCategoryPointListRequest());

  return masterApi
    .getAuditCategoryPointList()
    .then(({data}) => {
      const {data: pointlist, ...rest} = data;
      const filterPointlist = filter((e) => (auditsubcategort_ID ? e.auditsubcategory_id === auditsubcategort_ID : true), pointlist ? pointlist : []);
      dispatch(masterSlice.actions.getAuditCategoryPointListResponse({data: filterPointlist, ...rest}));
      return data;
    })

    .catch((e) => {
      dispatch(masterSlice.actions.getAuditCategoryPointListError(e));
    });
};


export const getAuditPointsImage = () => async (dispatch) => {
  dispatch(masterSlice.actions.getAuditPointsImageRequest());
  return masterApi
    .getAuditPointsImage()
    .then(({data}) => {
      dispatch(masterSlice.actions.getAuditPointsImageResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(masterSlice.actions.getAuditPointsImageError());
    });
};

export const addAuditPointsImage =
  ({data}) =>
  async (dispatch) => {  
    dispatch(masterSlice.actions.saveAuditPointsImageRequest());
    return masterApi
      .addAuditPointsImage({data})
      .then(({data}) => {
        dispatch(masterSlice.actions.saveAuditPointsImageResponse(data));
        messageToast({message: data?.message ?? data?.statusText, status: data.status, title: 'Audit Points Image'});
        return data;
      })
      .catch(() => {
        dispatch(masterSlice.actions.saveAuditPointsImageError());
      });
  };

  export const updateAuditPointsImage =
   ({data}) =>
    async (dispatch) => {
      dispatch(masterSlice.actions.saveAuditPointsImageRequest());
      return masterApi
        .updateAuditPointsImage({data})
        .then(({data}) => {
          dispatch(masterSlice.actions.saveAuditPointsImageResponse(data));
          messageToast({message: data?.message ?? data?.statusText, status: data.status, title: 'Audit Points Image'});
          return data;
        })
        .catch(() => {
          dispatch(masterSlice.actions.saveAuditPointsImageError());
        });
  }

  export const getAllCategoryImage = () => async (dispatch) => {
    return masterApi
      .getAllCategoryImage()
      .then(({data}) => {
        dispatch(masterSlice.actions.getCatImage(data.data));
        return data.data;
      })
      .catch(() => {
        dispatch(masterSlice.actions.getCatImageErr());
      });
  };

//License
export const getLicense = () => async (dispatch) => {
  dispatch(masterSlice.actions.getLicenseRequest());
  return masterApi
    .getLicense()
    .then(({data}) => {
      dispatch(masterSlice.actions.getLicenseResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(masterSlice.actions.getLicenseError());
    });
};
//License Details Master
export const getLicenseDetails = (outlet_ID) => async (dispatch) => {
  dispatch(masterSlice.actions.getLicenseDetailsRequest());
  return masterApi
    .getLicenseDetails()
    .then(({data}) => {
      const {data: LicenseDetails, ...rest} = data;
      const filterByStateId = filter((e) => (outlet_ID ? e.outlet_ID === outlet_ID : true), LicenseDetails ? LicenseDetails : []);
      dispatch(masterSlice.actions.getLicenseDetailsResponse({data: filterByStateId, ...rest}));
      return data;
    })
    .catch((e) => {
      dispatch(masterSlice.actions.getLicenseDetailsError(e));
    });
};

//period
export const getPeriod = (stateID) => async (dispatch) => {
  dispatch(masterSlice.actions.getPeriodRequest());
  return apis
    .getPeriod()
    .then(({ data }) => {
      const { data: Period, ...rest } = data;
      const filterByLicenseId = filter(
        (e) => (stateID ? e.state_id === stateID : true),
        Period ? Period : []
      );
      dispatch(
        masterSlice.actions.getPeriodResponse({
          data: filterByLicenseId,
          ...rest,
        })
      );
      return data;
    })
    .catch(() => {
      dispatch(masterSlice.actions.getPeriodError());
    });
};
export const savePeriod =
({ data }) =>
async (dispatch) => {
  dispatch(masterSlice.actions.savePeriodRequest());
  return apis
    .addPeriod({ data })
    .then(({ data }) => {
      dispatch(masterSlice.actions.savePeriodResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(masterSlice.actions.savePeriodError());
    });
};

export const updatePeriod =
({ data }) =>
async (dispatch) => {
  dispatch(masterSlice.actions.savePeriodRequest());
  return apis
    .updatePeriod({ data })
    .then(({ data }) => {
      dispatch(masterSlice.actions.savePeriodResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(masterSlice.actions.savePeriodError());
    });
};

  export const getAuditType = () => async (dispatch) => {
    dispatch(masterSlice.actions.getAuditTypeRequest());
   
    return masterApi
      .getAuditType()
      .then(({data}) => {
        dispatch(masterSlice.actions.getAuditTypeResponse(data));
      
        return data;
      })
      .catch(() => {
        dispatch(masterSlice.actions.getAuditTypeError());
      });
  };

  export const addAuditType =
  ({data}) =>
  async (dispatch) => {
    dispatch(masterSlice.actions.saveAuditTypeRequest());
    return masterApi
      .addAuditType({data})
      .then(({data}) => {
        dispatch(masterSlice.actions.saveAuditTypeResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(masterSlice.actions.saveAuditTypeError());
      });
  };

export const updateAuditType =
  ({data}) =>
  async (dispatch) => {
    dispatch(masterSlice.actions.saveAuditTypeRequest());
    return masterApi
      .updateAuditType({data})
      .then(({data}) => {
        dispatch(masterSlice.actions.saveAuditTypeResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(masterSlice.actions.saveAuditTypeError());
      });
  };

  
  export const addAuditfile =
  ({data}) =>
  async (dispatch) => {
    dispatch(masterSlice.actions.saveAuditfileRequest());
    return masterApi
      .addAuditfile({data})
      .then(({data}) => {
        dispatch(masterSlice.actions.saveAuditfileResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(masterSlice.actions.saveAuditfileError());
      });
  };

export const updateAuditfile =
  ({data}) =>
  async (dispatch) => {
    dispatch(masterSlice.actions.saveAuditfileRequest());
       return masterApi
      .updateAuditfile({data})
      .then(({data}) => {
        dispatch(masterSlice.actions.saveAuditfileResponse(data));
      
        return data;
      })
      .catch(() => {
        dispatch(masterSlice.actions.saveAuditfileError());
      });
  };

export const getAuditfile = () => async (dispatch) => {
  dispatch(masterSlice.actions.getAuditfileRequest());
  return masterApi
    .getAuditfile()
    .then(({data}) => {
       dispatch(masterSlice.actions.getAuditfileResponse(data));
       return data;
    })
    .catch(() => {
      dispatch(masterSlice.actions.getAuditfileError());
    });
};



export const addAuditMaster =
({data}) =>
async (dispatch) => {
  dispatch(masterSlice.actions.saveAuditMasterRequest());
  return masterApi
    .addAuditMaster({data})
    .then(({data}) => {
      dispatch(masterSlice.actions.saveAuditMasterResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(masterSlice.actions.saveAuditMasterError());
    });
};

export const updateAuditMaster =({data}) =>
async (dispatch) => {
  dispatch(masterSlice.actions.saveAuditMasterRequest());
     return masterApi
    .updateAuditMaster({data})
    .then(({data}) => {
      dispatch(masterSlice.actions.saveAuditMasterResponse(data));
        return data;
    })
    .catch(() => {
      dispatch(masterSlice.actions.saveAuditMasterError());
    });
};

export const getAuditMaster = () => async (dispatch) => {
dispatch(masterSlice.actions.getAuditMasterRequest());
return masterApi
  .getAuditMaster()
  .then(({data}) => {
     dispatch(masterSlice.actions.getAuditMasterResponse(data));
     return data;
  })
  .catch(() => {
    dispatch(masterSlice.actions.getAuditMasterError());
  });
};


export const getallauditMaster = () => async (dispatch) => {
  return masterApi
    .getallauditMaster()
    .then(({data}) => {
      dispatch(masterSlice.actions.getCat(data.data));
      return data.data;
    })
    .catch(() => {
      dispatch(masterSlice.actions.getCatErr());
    });
};


export const getOutletMasternotsubzone = () => async (dispatch) => {
  dispatch(masterSlice.actions.getOutletMasterRequest());
  return masterApi
    .getOutletMasternotsubzone()
    .then(({data}) => {
      dispatch(masterSlice.actions.getOutletMasterResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(masterSlice.actions.getOutletMasterError());
    });
};

export const addAuditNewEntry =
  ({data}) =>
  async (dispatch) => {
    dispatch(masterSlice.actions.saveAuditNewEntryRequest());
    return masterApi
      .addAuditNewEntry({data})
      .then(({data}) => {
        dispatch(masterSlice.actions.saveAuditNewEntryResponse(data));
        messageToast({message: data?.message ?? data?.statusText, status: data.status, title: 'Audit Entry'});
        return data;
      })
      .catch(() => {
        dispatch(masterSlice.actions.saveAuditNewEntryError());
      });
  };



  export const get_Audit_Entry = (req) => async (dispatch) => {
    dispatch(masterSlice.actions.getAuditNewEntryRequest());
    return masterApi
      .get_Audit_Entry(req)
      .then(({data}) => {
        dispatch(masterSlice.actions.getAuditNewEntryMarkResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(masterSlice.actions.getAuditNewEntryError());
      });
  };
  




  export const addAuditNewCAPASubmit = ({data}) =>
  async (dispatch) => {
    dispatch(masterSlice.actions.saveAuditNewCAPASubmitRequest());
    return masterApi
      .addAuditNewCAPASubmit({data})
      .then(({data}) => {
        dispatch(masterSlice.actions.saveAuditNewCAPASubmitResponse(data));
        messageToast({message: data?.message ?? data?.statusText, status: data.status, title: 'Audit CAPA Updated'});
        return data;
      })
      .catch(() => {
        dispatch(masterSlice.actions.saveAuditNewCAPASubmitError());
      });
  };

//Audit Payment
  export const getAuditPayment = () => async (dispatch) => {
    dispatch(masterSlice.actions.getAuditPaymentRequest());
    return masterApi
      .getAuditPayment()
      .then(({data}) => {
        dispatch(masterSlice.actions.getAuditPaymentResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(masterSlice.actions.getAuditPaymentError());
      });
  };

  export const addAuditPayment =
  ({data}) =>
  async (dispatch) => {
    dispatch(masterSlice.actions.saveAuditPaymentRequest());
    return masterApi
      .addAuditPayment({data})
      .then(({data}) => {
        dispatch(masterSlice.actions.saveAuditPaymentResponse(data));

        messageToast({message: data?.message ?? data?.statusText, status: data.status, title: 'Payment Master'});
        return data;
      })
      .catch(() => {
        dispatch(masterSlice.actions.saveAuditPaymentError());
      });
  };

export const updateAuditPayment =
  ({ data }) =>
    async (dispatch) => {
      dispatch(masterSlice.actions.saveAuditPaymentRequest());
      return masterApi
        .updateAuditPayment({ data })
        .then(({ data }) => {
          dispatch(masterSlice.actions.saveAuditPaymentResponse(data));
          messageToast({ message: data?.message ?? data?.statusText, status: data.status, title: 'Payment Master' });
          return data;
        })
        .catch(() => {
          dispatch(masterSlice.actions.saveAuditPaymentError());
        });
    };


//for cash handling to get cash denomination from master
export const getDenominationName = () => async (dispatch) => {
  dispatch(masterSlice.actions.getDenominationNameRequest());
  return masterApi
    .getDenominationName()
    .then(({ data }) => {
      dispatch(masterSlice.actions.getDenominationNameResponse());
      return data;
    })
    .catch(() => {
      dispatch(masterSlice.actions.getDenominationNameError());
    });
};

//for cash handling to get Day sales Closure statue name from master
export const get_DayClosure_Status_Name = () => async (dispatch) => {
  dispatch(masterSlice.actions.getClosureStatusNameRequest());
  return masterApi
    .get_DayClosure_Status_Name()
    .then(({ data }) => {
      dispatch(masterSlice.actions.getClosureStatusNameResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(masterSlice.actions.getClosureStatusNameError());
    });
};

//for cash handling to get cash deposit mode name from master
export const get_Deposit_Mode_Name = () => async (dispatch) => {
  dispatch(masterSlice.actions.getDepositModeNameRequest());
  return masterApi
    .get_Deposit_Mode_Name()
    .then(({ data }) => {
      dispatch(masterSlice.actions.getDepositModeNameResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(masterSlice.actions.getDepositModeNameError());
    });
};

export const get_Deposit_Skip_Reason = () => async (dispatch) => {
  dispatch(masterSlice.actions.getDepositSkipReasonRequest());
  return masterApi
    .get_Deposit_Skip_Reason()
    .then(({ data }) => {
      dispatch(masterSlice.actions.getDepositSkipReasonResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(masterSlice.actions.getDepositSkipReasonError());
    });
};

export const get_Reject_Reason = () => async (dispatch) => {
  dispatch(masterSlice.actions.getRejectRequest());
  return masterApi
    .get_Reject_Reason()
    .then(({ data }) => {
      dispatch(masterSlice.actions.getRejectResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(masterSlice.actions.getRejectError());
    });
};

//for to get outlet name with by using associative array
export const get_Outlet_Name = () => async (dispatch) => {
  dispatch(masterSlice.actions.getOutletNameRequest());
  return masterApi
    .get_Outlet_Name()
    .then(({ data }) => {
      dispatch(masterSlice.actions.getOutletNameResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(masterSlice.actions.getOutletNameError());
    });
};


export const update_dayclosure_details = (data) => async (dispatch) => {
  dispatch(masterSlice.actions.saveDayClosureRequest());
  return apis
    .update_dayclosure_details(data)
    .then(({ data }) => {
      dispatch(masterSlice.actions.saveDayClosureResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(masterSlice.actions.saveDayClosureError());
    });
};

export const update_mismatch_details = (data) => async (dispatch) => {
  dispatch(masterSlice.actions.saveMismatchRequest());
  return apis
    .update_mismatch_details(data)
    .then(({ data }) => {
      dispatch(masterSlice.actions.saveMismatchResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(masterSlice.actions.saveMismatchError());
    });
};

export const update_dayclosure_verification = (data) => async (dispatch) => {
  dispatch(masterSlice.actions.saveDayClosureVerificationRequest());
  return apis
    .update_dayclosure_verification(data)
    .then(({ data }) => {
      dispatch(masterSlice.actions.saveDayClosureVerificationResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(masterSlice.actions.saveDayClosureVerificationError());
    });
};

export const get_rista_Sales_Details = (data) => async (dispatch) => {
  dispatch(masterSlice.actions.getCashSalesRequest());
  return apis
    .get_rista_Sales_Details(data)
    .then(({ data }) => {
      dispatch(masterSlice.actions.getCashSalesResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(masterSlice.actions.getCashSalesError());
    });
};

export const get_Sales_Details = (data) => async (dispatch) => {
  dispatch(masterSlice.actions.getBalanceRequest());
  return apis
    .get_Sales_Details(data)
    .then(({ data }) => {
      dispatch(masterSlice.actions.getBalanceResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(masterSlice.actions.getBalanceError());
    });
};

export const get_Crew_Details = (data) => async (dispatch) => {
  dispatch(masterSlice.actions.getCrewRequest());
  return apis
    .get_Crew_Details(data)
    .then(({ data }) => {
      dispatch(masterSlice.actions.getCrewResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(masterSlice.actions.getCrewError());
    });
};

export const get_Revision_Details = (data) => async (dispatch) => {
  dispatch(masterSlice.actions.getRevisionRequest());
  return apis
    .get_Revision_Details(data)
    .then(({ data }) => {
      dispatch(masterSlice.actions.getRevisionResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(masterSlice.actions.getRevisionError());
    });
};

export const get_Attachement_Details = (data) => async (dispatch) => {
  dispatch(masterSlice.actions.getAttachementRequest());
  return apis
    .get_Attachement_Details(data)
    .then(({ data }) => {
      dispatch(masterSlice.actions.getAttachementResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(masterSlice.actions.getAttachementError());
    });
};


export const getPaymentRequest = (data) => async (dispatch) => {
  let emp_code = localStorage.getItem("emp_code") || "";

  dispatch(masterSlice.actions.getPaymentRequest());
  return apis
   .getPaymentRequest(emp_code, data?.type)
      .then(({ data }) => {
      dispatch(masterSlice.actions.getPaymentRequestResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(masterSlice.actions.getPaymentRequestError());
    });
};

export const getPaymentOHRequest = () => async (dispatch) => {
  dispatch(masterSlice.actions.getPaymentOHRequest());
  return apis
    .getPaymentOHRequest()
    .then(({ data }) => {
      dispatch(masterSlice.actions.getPaymentOHRequestResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(masterSlice.actions.getPaymentOHRequestError());
    });
};

export const getPaymentAHRequest = () => async (dispatch) => {
  dispatch(masterSlice.actions.getPaymentAHRequest());
  return apis
    .getPaymentAHRequest()
    .then(({ data }) => {
      dispatch(masterSlice.actions.getPaymentAHRequestResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(masterSlice.actions.getPaymentAHRequestError());
    });
};

export const savePaymentRequest =
  ({ data }) =>
  async (dispatch) => {
    dispatch(masterSlice.actions.getPaymentRequest());
    return apis
      .postPaymentRequest({ data })
      .then(({ data }) => {
        // dispatch(masterSlice.actions.saveOutletMasterResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(masterSlice.actions.getPaymentRequestError());
      });
  };

export const cancelpaymentRequest =
  ({ data }) =>
  async (dispatch) => {
    dispatch(masterSlice.actions.getPaymentRequest());
    return apis
      .cancelPaymentRequest(data)
      .then(({ data }) => {
         dispatch(masterSlice.actions.saveOutletMasterResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(masterSlice.actions.getPaymentRequestError());
      });
  };

export const savePaymentAHRequest =
  ({ data }) =>
  async (dispatch) => {
     dispatch(masterSlice.actions.getPaymentRequest());
    return apis
      .postPaymentAHUpdate({ data })
      .then(({ data }) => {
         dispatch(masterSlice.actions.saveOutletMasterResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(masterSlice.actions.getPaymentRequestError());
      });
  };


  export const getUserReportData = () => async (dispatch) => {
    dispatch(masterSlice.actions.getUserReportRequest());
    return apis
      .getUserReport()
      .then(({ data }) => {
          dispatch(masterSlice.actions.getUserReporResponseData(data));
        return data;
      })
      .catch(() => {
        dispatch(masterSlice.actions.getUserReportError());
      });
  };
  export const getEmailMapping = () => async (dispatch) => {
    dispatch(masterSlice.actions.getEmailMappingRequest());
    return apis
      .getEmailMappingRequest()
      .then(({ data }) => {
        dispatch(masterSlice.actions.getEmailMappingResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(masterSlice.actions.getEmailMappingError());
      });
  };
  
  export const addEmailMapping =
    ({ data }) =>
    async (dispatch) => {
      dispatch(masterSlice.actions.saveEmployeeMappingRequest());
      return apis
        .addEmailMapping({ data })
        .then(({ data }) => {
          dispatch(masterSlice.actions.saveEmployeeMappingResponse(data));
          return data;
        })
        .catch(() => {
          dispatch(masterSlice.actions.saveEmployeeMappingError());
        });
    };
  
  export const UpdateEmaileMapping =
    ({ data }) =>
    async (dispatch) => {
      dispatch(masterSlice.actions.saveEmployeeMappingRequest());
      return apis
        .updateEmailMApping({ data })
        .then(({ data }) => {
          //dispatch(masterSlice.actions.saveEmployeeMappingResponse(data));
          return data;
        })
        .catch(() => {
          dispatch(masterSlice.actions.saveEmployeeMappingError());
        });
    };

    export const getOutletMasterWithEmployee =
    (empId, subzone_id) => async (dispatch) => {    
      dispatch(masterSlice.actions.getOutletMasterRequest());
      return apis
        .getOutletMaster(empId)
       
        .then(({ data }) => {
          const { data: outletList, ...restOfData } = data;
          let filteredBySZ = [];
          if (Array.isArray(subzone_id)) {
            (outletList ?? [])?.forEach((el) => {
              if (subzone_id.includes(el.subzone_id)) {
                filteredBySZ.push(el);
              }
            });
          } else {
            filteredBySZ = (outletList ?? [])?.filter((data) => {
              return subzone_id
                ? Number(data.subzone_id) === Number(subzone_id)
                : true;
            });
          }
          dispatch(
            masterSlice.actions.getOutletMasterResponse({
              data: filteredBySZ,
              ...restOfData,
            })
          );
          return data;
        })
        .catch(() => {
          dispatch(masterSlice.actions.getOutletMasterError());
        });
    };
  
    
    export const UpdateSaveExpense = (data) => async (dispatch) => {   
       return dispatch(masterSlice.actions.savingExpenseData(data));
    };
    
    export const getPettyCashRequest = (type) => async (dispatch) => {       
      dispatch(masterSlice.actions.gettingPettyCashRequest());
      return apis
        .getPettyCashRequest(type)
        .then(({ data }) => {        
          dispatch(masterSlice.actions.getPettyCashRequestResponse(data?.data));
          return data;
        })
        .catch(() => {
          dispatch(masterSlice.actions.getPettyCashRequestError());
        });
    };
    
    export const addPettyCashRequest =
      ({ data }) =>
      async (
        //dispatch
        ) => {
        return apis
          .updatePettyCashRequest({ data })
          .then(({ data }) => {
            //dispatch(masterSlice.actions.saveEmployeeMappingResponse(data));
            return data;
          })
          .catch(() => {
            // dispatch(masterSlice.actions.saveEmployeeMappingError());
          });
      };
  
    

      export const saveUploadCsvEdc =
      ({ data }) =>
      async (dispatch
      ) => {
        dispatch(masterSlice.actions.saveEDCDetailsRequest());
        return masterApi
          .saveUploadCsvEdc(data)         
          .then(async ({ data }) => {        
            await dispatch(masterSlice.actions.saveEDCDetailsResponse(data));
            return data;
          })
          .catch((err) => {
            dispatch(masterSlice.actions.saveEDCDetailsError());
           return err;
          });
    };
    

    export const getUploadedBankTrans = (req) => async (dispatch) => {
      dispatch(masterSlice.actions.getUploadedBankTransRequest());
      return masterApi
        .getUploadedBankTrans(req)
        .then(({ data }) => {
          dispatch(masterSlice.actions.getUploadedBankTransResponse(data));
          return data;
        })
        .catch(() => {
          dispatch(masterSlice.actions.getUploadedBankTransError());
        });
    };

  
    export const getOutletBankDetails = () => async (dispatch) => {
      dispatch(masterSlice.actions.getOutletBankDetailsRequest());
      return masterApi
        .getOutletBankDetails()
        .then(({data}) => {
          dispatch(masterSlice.actions.getOutletBankDetailsResponse(data));
          return data;
        })
        .catch(() => {
          dispatch(masterSlice.actions.getOutletBankDetailsError());
        });
    };

  export const addOutletBankDetails = ({ data }) => async (dispatch) => {
    dispatch(masterSlice.actions.saveOutletBankDetails());
    return masterApi
      .addOutletBankDetails({ data })
      .then(({ data }) => {
        dispatch(masterSlice.actions.saveOutletBankDetailsResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(masterSlice.actions.saveOutletBankDetailsError());
      });
  };

  export const updateOutletBankDetails = ({data}) =>  async (dispatch) => {
    dispatch(masterSlice.actions.saveOutletBankDetails());
       return masterApi
      .updateOutletBankDetails({data})
      .then(({data}) => {
        dispatch(masterSlice.actions.saveOutletBankDetailsResponse(data));
          return data;
      })
      .catch(() => {
        dispatch(masterSlice.actions.saveOutletBankDetailsError());
      });
  };

  export const getRistaSalesData = (req) =>  async (dispatch) => {
    dispatch(masterSlice.actions.getRistaSalesDataRequest());
    return masterApi
      .getRistaSalesData(req)
      .then(({data}) => {
        dispatch(masterSlice.actions.getRistaSalesDataResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(masterSlice.actions.getRistaSalesDataError());
      });
  }

 
  export const getEdcPaymentVsBank  = (req) =>  async (dispatch) => {
    dispatch(masterSlice.actions.getEdcPaymentVsBankRequest());
    return masterApi
      .getEdcPaymentVsBank(req)
      .then(({data}) => {      
        dispatch(masterSlice.actions.getEdcPaymentVsBankResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(masterSlice.actions.getEdcPaymentVsBankError());
      });
  }

 
  export const addPaymentDiffRemarks = ({ data }) => async (dispatch) => {
    dispatch(masterSlice.actions.savePaymentDiffRemarks ());
    return masterApi
      .addPaymentDiffRemarks({ data })
      .then(({ data }) => {
        dispatch(masterSlice.actions.savePaymentDiffRemarksResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(masterSlice.actions.savePaymentDiffRemarksError());
      });
  };


  export const saveUploadCsvDotpe =
      ({ data }) =>
      async (dispatch
      ) => {
        dispatch(masterSlice.actions.saveUploadCsvDotpe());
        return masterApi
          .saveUploadCsvDotpe(data)         
          .then(async ({ data }) => {        
            await dispatch(masterSlice.actions.saveUploadCsvDotpeResponse(data));
            return data;
          })
          .catch((err) => {
            dispatch(masterSlice.actions.saveUploadCsvDotpeError());
           return err;
          });
    };
    

    export const getUploadedDotpe = (req) => async (dispatch) => {
      dispatch(masterSlice.actions.getUploadedDotpeRequest());
      return masterApi
        .getUploadedDotpe(req)
        .then(({ data }) => {
          dispatch(masterSlice.actions.getUploadedDotpeResponse(data));
          return data;
        })
        .catch(() => {
          dispatch(masterSlice.actions.getUploadedDotpeError());
        });
    };

    export const getDotpePaymentVsSales  = (req) =>  async (dispatch) => {
      dispatch(masterSlice.actions.getDotpePaymentVsSalesRequest());
      return masterApi
        .getDotpePaymentVsSales(req)
        .then(({data}) => {      
          dispatch(masterSlice.actions.getDotpePaymentVsSalesResponse(data));
          return data;
        })
        .catch(() => {
          dispatch(masterSlice.actions.getDotpePaymentVsSalesError());
        });
    }

    //UploadedSwiggy
    export const getUploadedSwiggy = (req) => async (dispatch) => {
      dispatch(masterSlice.actions.getUploadedSwiggyRequest());
      return masterApi
        .getUploadedSwiggy(req)
        .then(({ data }) => {
          dispatch(masterSlice.actions.getUploadedSwiggyResponse(data));
          return data;
        })
        .catch(() => {
          dispatch(masterSlice.actions.getUploadedSwiggyError());
        });
    };

    export const saveUploadCsvSwiggy =
      ({ data }) =>
      async (dispatch
      ) => {
        dispatch(masterSlice.actions.saveUploadCsvSwiggy());
        return masterApi
          .saveUploadCsvSwiggy(data)         
          .then(async ({ data }) => {        
            await dispatch(masterSlice.actions.saveUploadCsvSwiggyResponse(data));
            return data;
          })
          .catch((err) => {
            dispatch(masterSlice.actions.saveUploadCsvSwiggyError());
           return err;
          });
    };

      //UploadedMagicPin
      export const getUploadedMagicPin = (req) => async (dispatch) => {
        dispatch(masterSlice.actions.getUploadedMagicPinRequest());
        return masterApi
          .getUploadedMagicPin(req)
          .then(({ data }) => {
            dispatch(masterSlice.actions.getUploadedMagicPinResponse(data));
            return data;
          })
          .catch(() => {
            dispatch(masterSlice.actions.getUploadedMagicPinError());
          });
      };
  
      export const saveUploadCsvMagicPin =
        ({ data }) =>
        async (dispatch
        ) => {
          dispatch(masterSlice.actions.saveUploadCsvMagicPin());
          return masterApi
            .saveUploadCsvMagicPin(data)         
            .then(async ({ data }) => {        
              await dispatch(masterSlice.actions.saveUploadCsvMagicPinResponse(data));
              return data;
            })
            .catch((err) => {
              dispatch(masterSlice.actions.saveUploadCsvMagicPinError());
             return err;
            });
      };

      //uploadZomato   
        export const getUploadedZomato = (req) => async (dispatch) => {
          dispatch(masterSlice.actions.getUploadedZomatoRequest());
          return masterApi
            .getUploadedZomato(req)
            .then(({ data }) => {
              dispatch(masterSlice.actions.getUploadedZomatoResponse(data));
              return data;
            })
            .catch(() => {
              dispatch(masterSlice.actions.getUploadedZomatoError());
            });
        };
    
        export const saveUploadCsvZomato =
          ({ data }) =>
          async (dispatch
          ) => {
            dispatch(masterSlice.actions.saveUploadCsvZomato());
            return masterApi
              .saveUploadCsvZomato(data)         
              .then(async ({ data }) => {        
                await dispatch(masterSlice.actions.saveUploadCsvZomatoResponse(data));
                return data;
              })
              .catch((err) => {
                dispatch(masterSlice.actions.saveUploadCsvZomatoError());
               return err;
              });
        };


        export const getSwiggyPaymentVsSales  = (req) =>  async (dispatch) => {
          dispatch(masterSlice.actions.getSwiggyPaymentVsSalesRequest());
          return masterApi
            .getSwiggyPaymentVsSales(req)
            .then(({data}) => {      
              dispatch(masterSlice.actions.getSwiggyPaymentVsSalesResponse(data));
              return data;
            })
            .catch(() => {
              dispatch(masterSlice.actions.getSwiggyPaymentVsSalesError());
            });
        }

        export const getZomatoPaymentVsSales  = (req) =>  async (dispatch) => {
          dispatch(masterSlice.actions.getZomatoPaymentVsSalesRequest());
          return masterApi
            .getZomatoPaymentVsSales(req)
            .then(({data}) => {      
              dispatch(masterSlice.actions.getZomatoPaymentVsSalesResponse(data));
              return data;
            })
            .catch(() => {
              dispatch(masterSlice.actions.getZomatoPaymentVsSalesError());
            });
        }

        export const getMagicPinPaymentVsSales  = (req) =>  async (dispatch) => {
          dispatch(masterSlice.actions.getMagicPinPaymentVsSalesRequest());
          return masterApi
            .getMagicPinPaymentVsSales(req)
            .then(({data}) => {      
              dispatch(masterSlice.actions.getMagicPinPaymentVsSalesResponse(data));
              return data;
            })
            .catch(() => {
              dispatch(masterSlice.actions.getMagicPinPaymentVsSalesError());
            });
        }

          //StockTaking
      export const getStockDetails = (req) => async (dispatch) => {
        dispatch(masterSlice.actions.getStockTakingRequest());
        return masterApi
          .getStockDetails(req)
          .then(({ data }) => {
            dispatch(masterSlice.actions.getStockTakingResponse(data));
            return data;
          })
          .catch(() => {
            dispatch(masterSlice.actions.getStockTakingError());
          });
      };

      //getOverallPaymentVsSales

      export const getOverallPaymentVsSales  = (req) =>  async (dispatch) => {
        dispatch(masterSlice.actions.getOverallPaymentVsSalesRequest());
        return masterApi
          .getOverallPaymentVsSales(req)
          .then(({data}) => {      
            dispatch(masterSlice.actions.getOverallPaymentVsSalesResponse(data));
            return data;
          })
          .catch(() => {
            dispatch(masterSlice.actions.getOverallPaymentVsSalesError());
          });
      }