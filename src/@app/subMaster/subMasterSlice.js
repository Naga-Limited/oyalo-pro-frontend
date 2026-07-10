import { createSlice } from '@reduxjs/toolkit';
import { filter } from 'ramda';
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

  savingCity: false,
  saveCityResponse: {},
  saveCityError: {},

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

  //days
  gettingDays: false,
  getDaysResponse: {},
  getDaysError: {},

  gettingLicense: false,
  getLicenseResponse: {},
  getLicenseError: {},
  saveLicense: false,
  saveLicenseResponse: {},
  saveLicenseError: {},

  gettingLicenseDetail: false,
  getLicenseResponseDetail: {},
  getLicenseErrorDetail: {},
  saveLicenseDetail: false,
  saveLicenseResponseDetail: {},
  saveLicenseErrorDetail: {},

  gettingPeriod: false,
  getPeriodResponse: {},
  getPeriodError: {},
  savePeriod: false,
  savePeriodResponse: {},
  savePeriodError: {},


  gettingRenewal: false,
  getRenewalResponse: {},
  getRenewalError: {},
  saveRenewal: false,
  saveRenewalResponse: {},
  saveRenewalError: {},

  gettingApprove: false,
  getApproveResponse: {},
  getApproveError: {},
  saveApprove: false,
  saveApproveResponse: {},
  saveApproveError: {},

//Edit License Preethika
  gettingEditLicense: false,
  getEditLicenseResponse: {},
  getEditLicenseError: {},
  saveEditLicense: false,
  saveEditLicenseResponse: {},
  saveEditLicenseError: {},


  //Add single License
  gettingActiveLicense: false,
  getActiveLicenseResponse: {},
  getActiveLicenseError: {},
  saveActiveLicense: false,
  saveActiveLicenseResponse: {},
  saveActiveLicenseError: {},


  gettingLicenseReport: false,
  getLicenseReportResponse: {},
  getLicenseReportError: {},

  //Rohini
  gettingTraining: false,
  getTrainingResponse: {},
  getTrainingError: {},
  saveTraining: false,
  saveTrainingResponse: {},
  saveTrainingError: {},

  gettingImage: false,
  getImageResponse: {},
  getImageError: {},
  saveImage: false,
  saveImageResponse: {},
  saveImageError: {},

  gettingVideo: false,
  getVideoResponse: {},
  getVideoError: {},
  saveVideo: false,
  saveVideoResponse: {},
  saveVideoError: {},


  gettingDocument: false,
  getDocumentResponse: {},
  getDocumentError: {},
  saveDocument: false,
  saveDocumentResponse: {},
  saveDocumentError: {},

  gettingFiles: false,
  getFilesResponse: {},
  getFilesError: {},
  saveFiles: false,
  saveFilesResponse: {},
  saveFilesError: {},

  //Call Status Master

  savingCallStatus: false,
  saveCallStatusResponse: {},
  saveCallStatusError: {},
  gettingCallStatus: false,
  getCallStatusResponse: {},
  getCallStatusError: {},


  //get Rista Customer

  gettingRistaCustomer: false,
  getRistaCustomerResponse: {},
  getRistaCustomerError: {},
  saveRistaCustomer: false,
  saveRistaCustomerResponse: {},
  saveRistaCustomerError: {},

  //Customer Master

  gettingCustomerMaster: false,
  getCustomerMasterResponse: {},
  getCustomerMasterError: {},
  savingCustomerMaster: false,
  saveCustomerMasterResponse: {},
  saveCustomerMasterError: {},

  //Definitions

  
  gettingDefinitions: false,
  getDefinitionsResponse: {},
  getDefinitionsError: {},
  savingDefinitions: false,
  saveDefinitionsResponse: {},
  saveDefinitionsError: {},


  //Definitions List


  gettingDefinitionsList: false,
  getDefinitionsListResponse: {},
  getDefinitionsListError: {},
  savingDefinitionsList: false,
  saveDefinitionsListResponse: {},
  saveDefinitionsListError: {},


  //CrewMaster


  gettingCrewMaster: false,
  getCrewMasterResponse: {},
  getCrewMasterError: {},
  savingCrewMaster: false,
  saveCrewMasterResponse: {},
  saveCrewMasterError: {},

//CallBackEntry
gettingCallBackEntry: false,
getCallBackEntryResponse: {},
getCallBackEntryError: {},
savingCallBackEntry: false,
saveCallBackEntryResponse: {},
saveCallBackEntryError: {},

//CallBackEntryApproval

gettingCallBackEntryApproval: false,
getCallBackEntryApprovalResponse: {},
getCallBackEntryApprovalError: {},
savingCallBackEntryApproval: false,
saveCallBackEntryApprovalResponse: {},
saveCallBackEntryApprovalError: {},

//AllSalesCustomer

gettingAllSalesCustomer: false,
getAllSalesCustomerResponse: {},
getAllSalesCustomerError: {},
savingAllSalesCustomer: false,
saveAllSalesCustomerResponse: {},
saveAllSalesCustomerError: {},

//AuditCategoryWiseReport
gettingAuditCategoryWiseReport: false,
getAuditCategoryWiseReportResponse: {},
getAuditCategoryWiseReportError: {},
savingAuditCategoryWiseReport: false,
saveAuditCategoryWiseReportResponse: {},
saveAuditCategoryWiseReportError: {},

//getCallentry Report
gettingCallBackEntryReport: false,
getCallBackEntryReportResponse: {},
getCallBackEntryReportError: {},
savingCallBackEntryReport: false,
saveCallBackEntryReportResponse: {},
saveCallBackEntryReportError: {},

//addcallEntryApprove
gettingaddcallEntryApprove: false,
getaddcallEntryApproveResponse: {},
getaddcallEntryApproveError: {},
savingaddcallEntryApprove: false,
saveaddcallEntryApproveResponse: {},
saveaddcallEntryApproveError: {},


//getCalldefStatus
gettingCalldefStatus: false,
getCalldefStatusResponse: {},
getCalldefStatusError: {},
savingCalldefStatus: false,
saveCalldefStatusResponse: {},
saveCalldefStatusError: {},

//getEditCallBackEntry

gettingEditCallBackEntry: false,
getEditCallBackEntryResponse: {},
getEditCallBackEntryError: {},
savingEditCallBackEntry: false,
saveEditCallBackEntryResponse: {},
saveEditCallBackEntryError: {},

// updateCallBackEntry
gettingupdateCallBackEntry: false,
getupdateCallBackEntryResponse: {},
getupdateCallBackEntryError: {},
savingupdateCallBackEntry: false,
saveupdateCallBackEntryResponse: {},
saveupdateCallBackEntryError: {},

//getAllMappedOutlet
gettingAllMappedOutlet: false,
getAllMappedOutletResponse: {},
getAllMappedOutletError: {},
savingAllMappedOutlet: false,
saveAllMappedOutletResponse: {},
saveAllMappedOutletError: {},

//addCallEntryReject
gettingaddCallEntryReject: false,
getaddCallEntryRejectResponse: {},
getaddCallEntryRejectError: {},
savingaddCallEntryReject: false,
saveaddCallEntryRejectResponse: {},
saveaddCallEntryRejectError: {},

//getDefinitionsFilter
gettingDefinitionsFilter: false,
getDefinitionsFilterResponse: {},
getDefinitionsFilterError: {},
savingDefinitionsFilter: false,
saveDefinitionsFilterResponse: {},
saveDefinitionsFilterError: {},


//getEquipmentMaster
gettingEquipmentMaster: false,
getEquipmentMasterResponse: {},
getEquipmentMasterError: {},
savingEquipmentMaster: false,
saveEquipmentMasterResponse: {},
saveEquipmentMasterError: {},


//dayPlanMapping

gettingdayPlanMapping: false,
getdayPlanMappingResponse: {},
getdayPlanMappingError: {},
savingdayPlanMapping: false,
savedayPlanMappingResponse: {},
savedayPlanMappingError: {},

//DeepCleaning


gettingDeepCleaning: false,
getDeepCleaningResponse: {},
getDeepCleaningError: {},
savingDeepCleaning: false,
saveDeepCleaningResponse: {},
saveDeepCleaningError: {},

//DeepCleanEntry
gettingDeepCleanEntry: false,
getDeepCleanEntryResponse: {},
getDeepCleanEntryError: {},
savingDeepCleanEntry: false,
saveDeepCleanEntryResponse: {},
saveDeepCleanEntryError: {},

//DeviationReport
gettingDeviationReport: false,
getDeviationReportResponse: {},
getDeviationReportError: {},
savingDeviationReport: false,
saveDeviationReportResponse: {},
saveDeviationReportError: {},

//Outlet
gettingOutlet: false,
getOutletResponse: {},
getOutletError: {},
savingOutlet: false,
saveOutletResponse: {},
saveOutletError: {},

//EditDeepCleaningEntry
gettingEditDeepCleaningEntry: false,
getEditDeepCleaningEntryResponse: {},
getEditDeepCleaningEntryError: {},
savingEditDeepCleaningEntry: false,
saveEditDeepCleaningEntryResponse: {},
saveEditDeepCleaningEntryError: {},

//DeepCleanApproval

gettingDeepCleanApproval: false,
getDeepCleanApprovalResponse: {},
getDeepCleanApprovalError: {},
savingDeepCleanApproval: false,
saveDeepCleanApprovalResponse: {},
saveDeepCleanApprovalError: {},

  //BudgetMaster
  gettingBudgetMaster: false,
  getBudgetMasterResponse: {},
  getBudgetMasterError: {},
  savingBudgetMaster: false,
  saveBudgetMasterResponse: {},
  saveBudgetMasterError: {},
  
  //EBReadingEntry
  gettingEBReadingEntry: false,
  getEBReadingEntryResponse: {},
  getEBReadingEntryError: {},
  savingEBReadingEntry: false,
  saveEBReadingEntryResponse: {},
  saveEBReadingEntryError: {},


   //EBReadingEntry
   gettingEBReadingEditEntry: false,
   getEBReadingEditEntryResponse: {},
   getEBReadingEditEntryError: {},
   savingEBReadingEditEntry: false,
   saveEBReadingEditEntryResponse: {},
   saveEBReadingEditEntryError: {},

   //EBReadingApprovalEntry

   gettingEBReadingApprovalEntry: false,
   getEBReadingApprovalEntryResponse: {},
   getEBReadingApprovalEntryError: {},
   savingEBReadingApprovalEntry: false,
   saveEBReadingApprovalEntryResponse: {},
   saveEBReadingApprovalEntryError: {},


   //EB Reading Report

   
   gettingEBReadingReport: false,
   getEBReadingReportResponse: {},
   getEBReadingReportError: {},
   savingEBReadingReport: false,
   saveEBReadingReportResponse: {},
   saveEBReadingReportError: {},


     //getDashboard
  gettingDashboard: false,
  getDashboardResponse: {},
  getDashboardError: {},
  savingDashboard: false,
  saveDashboardResponse: {},
  saveDashboardError: {},

  savingStockUpload: false,
  saveStockUploadResponse: {},
  saveStockUploadError: {},
  gettingStockUpload: false,
  getStockUploadResponse: {},
  getStockUploadError: {},
 

  //UploadedDotpe
  savingUploadedRistaStock: false,
  saveUploadedRistaStockResponse: {},
  saveUploadedRistaStockError: {},
  gettingUploadedRistaStock: false,
  getUploadedRistaStockResponse: {},
  getUploadedRistaStockError: {},

  //ConsumableMaster
  savingConsumableMaster: false,
  saveConsumableMasterResponse: {},
  saveConsumableMasterError: {},
  gettingConsumableMaster: false,
  getConsumableMasterResponse: {},
  getConsumableMasterError: {},

  //AllConsumable
  savingConsumableAll: false,
  saveConsumableAllResponse: {},
  saveConsumableAllError: {},
  gettingConsumableAll: false,
  getConsumableAllResponse: {},
  getConsumableAllError: {},

  //getConsumableEntry
  savingConsumableEntry: false,
  saveConsumableEntryResponse: {},
  saveConsumableEntryError: {},
  gettingConsumableEntry: false,
  getConsumableEntryResponse: {},
  getConsumableEntryError: {},

  //getConsumableEditEntry
  savingConsumableEditEntry: false,
  saveConsumableEditEntryResponse: {},
  saveConsumableEditEntryError: {},
  gettingConsumableEditEntry: false,
  getConsumableEditEntryResponse: {},
  getConsumableEditEntryError: {},

  //getConsumableReport
  savingConsumableReport: false,
  saveConsumableReportResponse: {},
  saveConsumableReportError: {},
  gettingConsumableReport: false,
  getConsumableReportResponse: {},
  getConsumableReportError: {},

  //getConsumableReport
  savingLowConsumableReport: false,
  saveLowConsumableReportResponse: {},
  saveLowConsumableReportError: {},
  gettingLowConsumableReport: false,
  getLowConsumableReportResponse: {},
  getLowConsumableReportError: {},

//getConsumableList
savingConsumableList: false,
saveConsumableListResponse: {},
saveConsumableListError: {},
gettingConsumableList: false,
getConsumableListResponse: {},
getConsumableListError: {},

//addCalendarEvent
savingCalendarEvent: false,
saveCalendarEventResponse: {},
saveCalendarEventError: {},
gettingCalendarEvent: false,
getCalendarEventResponse: {},
getCalendarEventError: {},

//saveUploadCsvConsumableMaster
savingUploadCsvConsumableMaster: false,
saveUploadCsvConsumableMasterResponse: {},
saveUploadCsvConsumableMasterError: {},
gettingUploadCsvConsumableMaster: false,
getUploadCsvConsumableMasterResponse: {},
getUploadCsvConsumableMasterError: {},


// CalendarEventReport
savingCalendarEventReport: false,
saveCalendarEventReportResponse: {},
saveCalendarEventReportError: {},
gettingCalendarEventReport: false,
getCalendarEventReportResponse: {},
getCalendarEventReportError: {},

//saveUploadCsvCalendarEvent
savingUploadCsvCalendarEvent: false,
saveUploadCsvCalendarEventResponse: {},
saveUploadCsvCalendarEventError: {},
gettingUploadCsvCalendarEvent: false,
getUploadCsvCalendarEventResponse: {},
getUploadCsvCalendarEventError: {},

//FullView

savingConsumableFullViewReport: false,
saveConsumableFullViewReportResponse: {},
saveConsumableFullViewReportError: {},
gettingConsumableFullViewReport: false,
getConsumableFullViewReportResponse: {},
getConsumableFullViewReportError: {},

//getModuleUpdateLogs
savingModuleUpdateLogs: false,
saveModuleUpdateLogsResponse: {},
saveModuleUpdateLogsError: {},
gettingModuleUpdateLogs: false,
getModuleUpdateLogsResponse: {},
getModuleUpdateLogsError: {},



};

export const subMasterSlice = createSlice( {
  name: 'subMaster',
  initialState,
  reducers: {
    saveStateRequest: ( state ) => {
      state.savingState = true;
    },
    saveStateResponse: ( state, action ) => {
      state.savingState = false;
      state.saveStateResponse = action.payload;
    },
    saveStateError: ( state, action ) => {
      state.savingState = false;
      state.saveStateError = action.payload;
    },
    getStatesRequest: ( state ) => {
      state.gettingState = true;
    },
    getStatesResponse: ( state, action ) => {
      state.gettingState = false;
      state.getStatesResponse = action.payload;
    },
    getStatesError: ( state, action ) => {
      state.gettingState = false;
      state.getStatesError = action.payload;
    },

    saveZonalRequest: ( state ) => {
      state.savingZonal = true;
    },
    saveZonalResponse: ( state, action ) => {
      state.savingZonal = false;
      state.saveZonalResponse = action.payload;
    },
    saveZonalError: ( state, action ) => {
      state.savingZonal = false;
      state.saveZonalError = action.payload;
    },
    getZonalRequest: ( state ) => {
      state.gettingZonal = true;
    },
    getZonalResponse: ( state, action ) => {
      state.gettingZonal = false;
      state.getZonalResponse = action.payload;
    },
    getZonalError: ( state, action ) => {
      state.gettingZonal = false;
      state.getZonalError = action.payload;
    },
    saveSubZonalRequest: ( state ) => {
      state.savingSubZonal = true;
    },
    saveSubZonalResponse: ( state, action ) => {
      state.savingSubZonal = false;
      state.saveSubZonalResponse = action.payload;
    },
    saveSubZonalError: ( state, action ) => {
      state.savingSubZonal = false;
      state.saveSubZonalError = action.payload;
    },
    getSubZonalRequest: ( state ) => {
      state.gettingSubZonal = true;
    },
    getSubZonalResponse: ( state, action ) => {
      state.gettingSubZonal = false;
      state.getSubZonalResponse = action.payload;
    },
    getSubZonalError: ( state, action ) => {
      state.gettingSubZonal = false;
      state.getSubZonalError = action.payload;
    },
    saveCityRequest: ( state ) => {
      state.savingCity = true;
    },
    saveCityResponse: ( state, action ) => {
      state.savingCity = false;
      state.saveCityResponse = action.payload;
    },
    saveCityError: ( state, action ) => {
      state.savingCity = false;
      state.saveCityError = action.payload;
    },

    getCityRequest: ( state ) => {
      state.gettingCity = true;
    },
    getCityResponse: ( state, action ) => {
      state.gettingCity = false;
      state.getCityResponse = action.payload;
    },
    getCityError: ( state, action ) => {
      state.gettingCity = false;
      state.getCityError = action.payload;
    },

    saveDivisionRequest: ( state ) => {
      state.savingDivision = true;
    },
    saveDivisionResponse: ( state, action ) => {
      state.savingDivision = false;
      state.saveDivisionResponse = action.payload;
    },
    saveDivisionError: ( state, action ) => {
      state.savingDivision = false;
      state.saveDivisionError = action.payload;
    },
    getDivisionRequest: ( state ) => {
      state.gettingDivision = true;
    },
    getDivisionResponse: ( state, action ) => {
      state.gettingDivision = false;
      state.getDivisionResponse = action.payload;
    },
    getDivisionError: ( state, action ) => {
      state.gettingDivision = false;
      state.getDivisionError = action.payload;
    },
    getDepartmentRequest: ( state ) => {
      state.gettingDepartment = true;
    },
    getDepartmentResponse: ( state, action ) => {
      state.gettingDepartment = false;
      state.getDepartmentResponse = action.payload;
    },
    getDepartmentError: ( state, action ) => {
      state.gettingDepartment = false;
      state.getDepartmentError = action.payload;
    },
    saveDepartmentRequest: ( state ) => {
      state.savingDepartment = true;
    },
    saveDepartmentResponse: ( state, action ) => {
      state.savingDepartment = false;
      state.saveDepartmentResponse = action.payload;
    },
    saveDepartmentError: ( state, action ) => {
      state.savingDepartment = false;
      state.saveDepartmentError = action.payload;
    },
    getDesignationRequest: ( state ) => {
      state.gettingDesignation = true;
    },
    getDesignationResponse: ( state, action ) => {
      state.gettingDesignation = false;
      state.getDesignationResponse = action.payload;
    },
    getDesignationError: ( state, action ) => {
      state.gettingDesignation = false;
      state.getDesignationError = action.payload;
    },
    saveDesignationRequest: ( state ) => {
      state.savingDesignation = true;
    },
    saveDesignationResponse: ( state, action ) => {
      state.savingDesignation = false;
      state.saveDesignationResponse = action.payload;
    },
    saveDesignationError: ( state, action ) => {
      state.savingDesignation = false;
      state.saveDesignationError = action.payload;
    },
    getEmployeeLevelRequest: ( state ) => {
      state.gettingEmployeeLevel = true;
    },
    getEmployeeLevelResponse: ( state, action ) => {
      state.gettingEmployeeLevel = false;
      state.getEmployeeLevelResponse = action.payload;
    },
    getEmployeeLevelError: ( state, action ) => {
      state.gettingEmployeeLevel = false;
      state.getEmployeeLevelError = action.payload;
    },
    saveEmployeeLevelRequest: ( state ) => {
      state.savingEmployeeLevel = true;
    },
    saveEmployeeLevelResponse: ( state, action ) => {
      state.savingEmployeeLevel = false;
      state.saveEmployeeLevelResponse = action.payload;
    },
    saveEmployeeLevelError: ( state, action ) => {
      state.savingEmployeeLevel = false;
      state.saveEmployeeLevelError = action.payload;
    },

    saveLicenseRequest: (state) => {
      state.saveLicense = true;
    },

    saveLicenseResponse: (state, action) => {
      state.saveLicense = false;
      state.saveLicenseResponse = action.payload;
    },
    saveLicenseError: (state, action) => {
      state.saveLicense = false;
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


    //License detail
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

    //Get Days
    getDaysRequest: ( state ) => {
      state.gettingDays = true;
    },
    getDaysResponse: ( state, action ) => {
      state.gettingDays = false;
      state.getDaysResponse = action.payload;
    },
    getDaysError: ( state, action ) => {
      state.gettingDays = false;
      state.getDaysError = action.payload;
    },

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

    saveRenewalRequest: (state) => {
      state.saveRenewal = true;
    },
    saveRenewalResponse: (state, action) => {
      state.saveRenewal = false;
      state.saveRenewalResponse = action.payload;
    },
    saveRenewalError: (state, action) => {
      state.saveRenewal = false;
      state.saveRenewalError = action.payload;
    },
    getRenewalRequest: (state) => {
      state.gettingRenewal = true;
    },
    getRenewalResponse: (state, action) => {
      state.gettingRenewal = false;
      state.getRenewalResponse = action.payload;
    },
    getRenewalError: (state, action) => {
      state.gettingRenewal = false;
      state.getRenewalError = action.payload;
    },

    saveApproveRequest: (state) => {
      state.saveApprove = true;
    },
    saveApproveResponse: (state, action) => {
      state.saveApprove = false;
      state.saveApproveResponse = action.payload;
    },
    saveApproveError: (state, action) => {
      state.saveApprove = false;
      state.saveApproveError = action.payload;
    },
    getApproveRequest: (state) => {
      state.gettingApprove = true;
    },
    getApproveResponse: (state, action) => {
      state.gettingApprove = false;
      state.getApproveResponse = action.payload;
    },
    getApproveError: (state, action) => {
      state.gettingApprove = false;
      state.getApproveError = action.payload;
    },

    saveEditLicenseRequest: (state) => {
      state.saveEditLicense = true;
    },
    saveEditLicenseResponse: (state, action) => {
      state.saveEditLicense = false;
      state.saveEditLicenseResponse = action.payload;
    },
    saveEditLicenseError: (state, action) => {
      state.saveEditLicense = false;
      state.saveEditLicenseError = action.payload;
    },
    getEditLicenseRequest: (state) => {
      state.gettingEditLicense = true;
    },
    getEditLicenseResponse: (state, action) => {
      state.gettingEditLicense = false;
      state.getEditLicenseResponse = action.payload;
    },
    getEditLicenseError: (state, action) => {
      state.gettingEditLicense = false;
      state.getEditLicenseError = action.payload;
    },

    
    saveActiveLicenseRequest: (state) => {
      state.saveActiveLicense = true;
    },
    saveActiveLicenseResponse: (state, action) => {
      state.saveActiveLicense = false;
      state.saveActiveLicenseResponse = action.payload;
    },
    saveActiveLicenseError: (state, action) => {
      state.saveActiveLicense = false;
      state.saveActiveLicenseError = action.payload;
    },
    getActiveLicenseRequest: (state) => {
      state.gettingActiveLicense = true;
    },
    getActiveLicenseResponse: (state, action) => {
      state.gettingActiveLicense = false;
      state.getActiveLicenseResponse = action.payload;
    },
    getActiveLicenseError: (state, action) => {
      state.gettingActiveLicense = false;
      state.getActiveLicenseError = action.payload;
    },

    getLicenseReportRequest: (state) => {
      state.gettingLicenseReport = true;
    },
    getLicenseReportResponse: (state, action) => {
      state.gettingLicenseReport = false;
      state.getLicenseReportResponse = action.payload;
    },
    getLicenseReportError: (state, action) => {
      state.gettingLicenseReport = false;
      state.getLicenseReportError = action.payload;
    },

    //Rohini
    saveTrainingRequest: (state) => {
      state.saveTraining = true;
    },

    saveTrainingResponse: (state, action) => {
      state.saveTraining = false;
      state.saveTrainingResponse = action.payload;
    },
    saveTrainingError: (state, action) => {
      state.saveTraining = false;
      state.saveTrainingError = action.payload;
    },
    getTrainingRequest: (state) => {
      state.gettingTraining = true;
    },
    getTrainingResponse: (state, action) => {
      state.gettingTraining = false;
      state.getTrainingResponse = action.payload;
    },
    getTrainingError: (state, action) => {
      state.gettingTraining = false;
      state.getTrainingError = action.payload;
    },
    saveImageRequest: (state) => {
      state.saveImage = true;
    },

    saveImageResponse: (state, action) => {
      state.saveImage = false;
      state.saveImageResponse = action.payload;
    },
    saveImageError: (state, action) => {
      state.saveImage = false;
      state.saveImageError = action.payload;
    },
    getImageRequest: (state) => {
      state.gettingImage = true;
    },
    getImageResponse: (state, action) => {
      state.gettingImage = false;
      state.getImageResponse = action.payload;
    },
    getImageRequestError: (state, action) => {
      state.gettingImage = false;
      state.getImageRequestError = action.payload;
    },

    saveVideoRequest: (state) => {
      state.saveVideo = true;
    },

    saveVideoResponse: (state, action) => {
      state.saveVideo = false;
      state.saveVideoResponse = action.payload;
    },
    saveVideoError: (state, action) => {
      state.saveVideo = false;
      state.saveVideoError = action.payload;
    },
    getVideoRequest: (state) => {
      state.gettingVideo = true;
    },
    getVideoResponse: (state, action) => {
      state.gettingVideo = false;
      state.getVideoResponse = action.payload;
    },
    getVideoRequestError: (state, action) => {
      state.gettingVideo = false;
      state.getVideoRequestError = action.payload;
    },

    saveDocumentRequest: (state) => {
      state.saveDocument = true;
    },

    saveDocumentResponse: (state, action) => {
      state.saveDocument = false;
      state.saveDocumentResponse = action.payload;
    },
    saveDocumentError: (state, action) => {
      state.saveDocument = false;
      state.saveDocumentError = action.payload;
    },
    getDocumentRequest: (state) => {
      state.gettingDocument = true;
    },
    getDocumentResponse: (state, action) => {
      state.gettingDocument = false;
      state.getDocumentResponse = action.payload;
    },
    getDocumentRequestError: (state, action) => {
      state.gettingDocument = false;
      state.getDocumentRequestError = action.payload;
    },

    
    saveFilesRequest: (state) => {
      state.saveFiles = true;
    },

    saveFilesResponse: (state, action) => {
      state.saveFiles = false;
      state.saveFilesResponse = action.payload;
    },
    saveFilesError: (state, action) => {
      state.saveFiles = false;
      state.saveFilesError = action.payload;
    },
    getFilesRequest: (state) => {
      state.gettingFiles = true;
    },
    getFilesResponse: (state, action) => {
      state.gettingFiles = false;
      state.getFilesResponse = action.payload;
    },
    getFilesRequestError: (state, action) => {
      state.gettingFiles = false;
      state.getFilesRequestError = action.payload;
    },
 //callstatus Master

 saveCallStatusRequest: ( state ) => {
  state.savingCallStatus = true;
},
saveCallStatusResponse: ( state, action ) => {
  state.savingCallStatus = false;
  state.saveCallStatusResponse = action.payload;
},
saveCallStatusError: ( state, action ) => {
  state.savingCallStatus = false;
  state.saveCallStatusError = action.payload;
},
getCallStatusRequest: ( state ) => {
  state.gettingCallStatus = true;
},
getCallStatusResponse: ( state, action ) => {
  state.gettingCallStatus = false;
  state.getCallStatusResponse = action.payload;
},
getCallStatusError: ( state, action ) => {
  state.gettingCallStatus = false;
  state.getCallStatusError = action.payload;
},
//get RistaCustomer

saveRistaCustomerRequest: ( state ) => {
  state.savingRistaCustomer = true;
},
saveRistaCustomerResponse: ( state, action ) => {
  state.savingRistaCustomer = false;
  state.saveRistaCustomerResponse = action.payload;
},
saveRistaCustomerError: ( state, action ) => {
  state.savingRistaCustomer = false;
  state.saveRistaCustomerError = action.payload;
},
getRistaCustomerRequest: ( state ) => {
  state.gettingRistaCustomer = true;
},
getRistaCustomerResponse: ( state, action ) => {
  state.gettingRistaCustomer = false;
  state.getRistaCustomerResponse = action.payload;
},
getRistaCustomerError: ( state, action ) => {
  state.gettingRistaCustomer = false;
  state.getRistaCustomerError = action.payload;
},

// Customer Master
saveCustomerMasterRequest: ( state ) => {
  state.savingCustomerMaster = true;
},
saveCustomerMasterResponse: ( state, action ) => {
  state.savingCustomerMaster = false;
  state.saveCustomerMasterResponse = action.payload;
},
saveCustomerMasterError: ( state, action ) => {
  state.savingCustomerMaster = false;
  state.saveCustomerMasterError = action.payload;
},
getCustomerMasterRequest: ( state ) => {
  state.gettingCustomerMaster = true;
},
getCustomerMasterResponse: ( state, action ) => {
  state.gettingCustomerMaster = false;
  state.getCustomerMasterResponse = action.payload;
},
getCustomerMasterError: ( state, action ) => {
  state.gettingCustomerMaster = false;
  state.getCustomerMasterError = action.payload;
},


// CallBackEntry

// Definitions

    saveDefinitionsRequest: (state) => {
      state.savingDefinitions = true;
    },
    saveDefinitionsResponse: (state, action) => {
      state.savingDefinitions = false;
      state.saveDefinitionsResponse = action.payload;
    },
    saveDefinitionsError: (state, action) => {
      state.savingDefinitions = false;
      state.saveDefinitionsError = action.payload;
    },
    getDefinitionsRequest: (state) => {
      state.gettingDefinitions = true;
    },
    getDefinitionsResponse: (state, action) => {
      state.gettingDefinitions = false;
      state.getDefinitionsResponse = action.payload;
    },
    getDefinitionsError: (state, action) => {
      state.gettingDefinitions = false;
      state.getDefinitionsError = action.payload;
    },

    //Definitions List
    saveDefinitionsListRequest: (state) => {
      state.savingDefinitionsList = true;
    },
    saveDefinitionsListResponse: (state, action) => {
      state.savingDefinitionsList = false;
      state.saveDefinitionsListResponse = action.payload;
    },
    saveDefinitionsListError: (state, action) => {
      state.savingDefinitionsList = false;
      state.saveDefinitionsListError = action.payload;
    },
    getDefinitionsListRequest: (state) => {
      state.gettingDefinitionsList = true;
    },
    getDefinitionsListResponse: (state, action) => {
      state.gettingDefinitionsList = false;
      state.getDefinitionsListResponse = action.payload;
    },
    getDefinitionsListError: (state, action) => {
      state.gettingDefinitionsList = false;
      state.getDefinitionsListError = action.payload;
    },

    //CrewMaster
    saveCrewMasterRequest: (state) => {
      state.savingCrewMaster = true;
    },
    saveCrewMasterResponse: (state, action) => {
      state.savingCrewMaster = false;
      state.saveCrewMasterResponse = action.payload;
    },
    saveCrewMasterError: (state, action) => {
      state.savingCrewMaster = false;
      state.saveCrewMasterError = action.payload;
    },
    getCrewMasterRequest: (state) => {
      state.gettingCrewMaster = true;
    },
    getCrewMasterResponse: (state, action) => {
      state.gettingCrewMaster = false;
      state.getCrewMasterResponse = action.payload;
    },
    getCrewMasterError: (state, action) => {
      state.gettingCrewMaster = false;
      state.getCrewMasterError = action.payload;
    },

//CallBackEntry

saveCallBackEntryRequest: ( state ) => {
  state.savingCallBackEntry = true;
},
saveCallBackEntryResponse: ( state, action ) => {
  state.savingCallBackEntry = false;
  state.saveCallBackEntryResponse = action.payload;
},
saveCallBackEntryError: ( state, action ) => {
  state.savingCallBackEntry = false;
  state.saveCallBackEntryError = action.payload;
},
getCallBackEntryRequest: ( state ) => {
  state.gettingCallBackEntry = true;
},
getCallBackEntryResponse: ( state, action ) => {
  state.gettingCallBackEntry = false;
  state.getCallBackEntryResponse = action.payload;
},
getCallBackEntryError: ( state, action ) => {
  state.gettingCallBackEntry = false;
  state.getCallBackEntryError = action.payload;
},



//CallBackEntryApproval

saveCallBackEntryApprovalRequest: ( state ) => {
  state.savingCallBackEntryApproval = true;
},
saveCallBackEntryApprovalResponse: ( state, action ) => {
  state.savingCallBackEntryApproval = false;
  state.saveCallBackEntryApprovalResponse = action.payload;
},
saveCallBackEntryApprovalError: ( state, action ) => {
  state.savingCallBackEntryApproval = false;
  state.saveCallBackEntryApprovalError = action.payload;
},
getCallBackEntryApprovalRequest: ( state ) => {
  state.gettingCallBackEntryApproval = true;
},
getCallBackEntryApprovalResponse: ( state, action ) => {
  state.gettingCallBackEntryApproval = false;
  state.getCallBackEntryApprovalResponse = action.payload;
},
getCallBackEntryApprovalError: ( state, action ) => {
  state.gettingCallBackEntryApproval = false;
  state.getCallBackEntryApprovalError = action.payload;
},

//AllSalesCustomer


saveAllSalesCustomerRequest: ( state ) => {
  state.savingAllSalesCustomer = true;
},
saveAllSalesCustomerResponse: ( state, action ) => {
  state.savingAllSalesCustomer = false;
  state.saveAllSalesCustomerResponse = action.payload;
},
saveAllSalesCustomerError: ( state, action ) => {
  state.savingAllSalesCustomer = false;
  state.saveAllSalesCustomerError = action.payload;
},
getAllSalesCustomerRequest: ( state ) => {
  state.gettingAllSalesCustomer = true;
},
getAllSalesCustomerResponse: ( state, action ) => {
  state.gettingAllSalesCustomer = false;
  state.getAllSalesCustomerResponse = action.payload;
},
getAllSalesCustomerError: ( state, action ) => {
  state.gettingAllSalesCustomer = false;
  state.getAllSalesCustomerError = action.payload;
},

//AuditCategoryWiseReport


saveAuditCategoryWiseReportRequest: ( state ) => {
  state.savingAuditCategoryWiseReport = true;
},
saveAuditCategoryWiseReportResponse: ( state, action ) => {
  state.savingAuditCategoryWiseReport = false;
  state.saveAuditCategoryWiseReportResponse = action.payload;
},
saveAuditCategoryWiseReportError: ( state, action ) => {
  state.savingAuditCategoryWiseReport = false;
  state.saveAuditCategoryWiseReportError = action.payload;
},
getAuditCategoryWiseReportRequest: ( state ) => {
  state.gettingAuditCategoryWiseReport = true;
},
getAuditCategoryWiseReportResponse: ( state, action ) => {
  state.gettingAuditCategoryWiseReport = false;
  state.getAuditCategoryWiseReportResponse = action.payload;
},
getAuditCategoryWiseReportError: ( state, action ) => {
  state.gettingAuditCategoryWiseReport = false;
  state.getAuditCategoryWiseReportError = action.payload;
},

//CallBackEntryReport

saveCallBackEntryReportRequest: ( state ) => {
  state.savingCallBackEntryReport = true;
},
saveCallBackEntryReportResponse: ( state, action ) => {
  state.savingCallBackEntryReport = false;
  state.saveCallBackEntryReportResponse = action.payload;
},
saveCallBackEntryReportError: ( state, action ) => {
  state.savingCallBackEntryReport = false;
  state.saveCallBackEntryReportError = action.payload;
},
getCallBackEntryReportRequest: ( state ) => {
  state.gettingCallBackEntryReport = true;
},
getCallBackEntryReportResponse: ( state, action ) => {
  state.gettingCallBackEntryReport = false;
  state.getCallBackEntryReportResponse = action.payload;
},
getCallBackEntryReportError: ( state, action ) => {
  state.gettingCallBackEntryReport = false;
  state.getCallBackEntryReportError = action.payload;
},
//addcallEntryApprove


saveaddcallEntryApproveRequest: ( state ) => {
  state.savingaddcallEntryApprove = true;
},
saveaddcallEntryApproveResponse: ( state, action ) => {
  state.savingaddcallEntryApprove = false;
  state.saveaddcallEntryApproveResponse = action.payload;
},
saveaddcallEntryApproveError: ( state, action ) => {
  state.savingaddcallEntryApprove = false;
  state.saveaddcallEntryApproveError = action.payload;
},
getaddcallEntryApproveRequest: ( state ) => {
  state.gettingaddcallEntryApprove = true;
},
getaddcallEntryApproveResponse: ( state, action ) => {
  state.gettingaddcallEntryApprove = false;
  state.getaddcallEntryApproveResponse = action.payload;
},
getaddcallEntryApproveError: ( state, action ) => {
  state.gettingaddcallEntryApprove = false;
  state.getaddcallEntryApproveError = action.payload;
},

//CalldefStatus

saveCalldefStatusRequest: ( state ) => {
  state.savingCalldefStatus = true;
},
saveCalldefStatusResponse: ( state, action ) => {
  state.savingCalldefStatus = false;
  state.saveCalldefStatusResponse = action.payload;
},
saveCalldefStatusError: ( state, action ) => {
  state.savingCalldefStatus = false;
  state.saveCalldefStatusError = action.payload;
},
getCalldefStatusRequest: ( state ) => {
  state.gettingCalldefStatus = true;
},
getCalldefStatusResponse: ( state, action ) => {
  state.gettingCalldefStatus = false;
  state.getCalldefStatusResponse = action.payload;
},
getCalldefStatusError: ( state, action ) => {
  state.gettingCalldefStatus = false;
  state.getCalldefStatusError = action.payload;
},

//getEditCallBackEntry


saveEditCallBackEntryRequest: ( state ) => {
  state.savingEditCallBackEntry = true;
},
saveEditCallBackEntryResponse: ( state, action ) => {
  state.savingEditCallBackEntry = false;
  state.saveEditCallBackEntryResponse = action.payload;
},
saveEditCallBackEntryError: ( state, action ) => {
  state.savingEditCallBackEntry = false;
  state.saveEditCallBackEntryError = action.payload;
},
getEditCallBackEntryRequest: ( state ) => {
  state.gettingEditCallBackEntry = true;
},
getEditCallBackEntryResponse: ( state, action ) => {
  state.gettingEditCallBackEntry = false;
  state.getEditCallBackEntryResponse = action.payload;
},
getEditCallBackEntryError: ( state, action ) => {
  state.gettingEditCallBackEntry = false;
  state.getEditCallBackEntryError = action.payload;
},

//updateCallBackEntry


saveupdateCallBackEntryRequest: ( state ) => {
  state.savingupdateCallBackEntry = true;
},
saveupdateCallBackEntryResponse: ( state, action ) => {
  state.savingupdateCallBackEntry = false;
  state.saveupdateCallBackEntryResponse = action.payload;
},
saveupdateCallBackEntryError: ( state, action ) => {
  state.savingupdateCallBackEntry = false;
  state.saveupdateCallBackEntryError = action.payload;
},
getupdateCallBackEntryRequest: ( state ) => {
  state.gettingupdateCallBackEntry = true;
},
getupdateCallBackEntryResponse: ( state, action ) => {
  state.gettingupdateCallBackEntry = false;
  state.getupdateCallBackEntryResponse = action.payload;
},
getupdateCallBackEntryError: ( state, action ) => {
  state.gettingupdateCallBackEntry = false;
  state.getupdateCallBackEntryError = action.payload;
},

//getAllMappedOutlet


saveAllMappedOutletRequest: ( state ) => {
  state.savingAllMappedOutlet = true;
},
saveAllMappedOutletResponse: ( state, action ) => {
  state.savingAllMappedOutlet = false;
  state.saveAllMappedOutletResponse = action.payload;
},
saveAllMappedOutletError: ( state, action ) => {
  state.savingAllMappedOutlet = false;
  state.saveAllMappedOutletError = action.payload;
},
getAllMappedOutletRequest: ( state ) => {
  state.gettingAllMappedOutlet = true;
},
getAllMappedOutletResponse: ( state, action ) => {
  state.gettingAllMappedOutlet = false;
  state.getAllMappedOutletResponse = action.payload;
},
getAllMappedOutletError: ( state, action ) => {
  state.gettingAllMappedOutlet = false;
  state.getAllMappedOutletError = action.payload;
},

//addCallEntryReject

saveaddCallEntryRejectRequest: ( state ) => {
  state.savingaddCallEntryReject = true;
},
saveaddCallEntryRejectResponse: ( state, action ) => {
  state.savingaddCallEntryReject = false;
  state.saveaddCallEntryRejectResponse = action.payload;
},
saveaddCallEntryRejectError: ( state, action ) => {
  state.savingaddCallEntryReject = false;
  state.saveaddCallEntryRejectError = action.payload;
},
getaddCallEntryRejectRequest: ( state ) => {
  state.gettingaddCallEntryReject = true;
},
getaddCallEntryRejectResponse: ( state, action ) => {
  state.gettingaddCallEntryReject = false;
  state.getaddCallEntryRejectResponse = action.payload;
},
getaddCallEntryRejectError: ( state, action ) => {
  state.gettingaddCallEntryReject = false;
  state.getaddCallEntryRejectError = action.payload;
},
//DefinitionsFilter

saveDefinitionsFilterRequest: ( state ) => {
  state.savingDefinitionsFilter = true;
},
saveDefinitionsFilterResponse: ( state, action ) => {
  state.savingDefinitionsFilter = false;
  state.saveDefinitionsFilterResponse = action.payload;
},
saveDefinitionsFilterError: ( state, action ) => {
  state.savingDefinitionsFilter = false;
  state.saveDefinitionsFilterError = action.payload;
},
getDefinitionsFilterRequest: ( state ) => {
  state.gettingDefinitionsFilter = true;
},
getDefinitionsFilterResponse: ( state, action ) => {
  state.gettingDefinitionsFilter = false;
  state.getDefinitionsFilterResponse = action.payload;
},
getDefinitionsFilterError: ( state, action ) => {
  state.gettingDefinitionsFilter = false;
  state.getDefinitionsFilterError = action.payload;
},

//EquipmentMaster


saveEquipmentMasterRequest: ( state ) => {
  state.savingEquipmentMaster = true;
},
saveEquipmentMasterResponse: ( state, action ) => {
  state.savingEquipmentMaster = false;
  state.saveEquipmentMasterResponse = action.payload;
},
saveEquipmentMasterError: ( state, action ) => {
  state.savingEquipmentMaster = false;
  state.saveEquipmentMasterError = action.payload;
},
getEquipmentMasterRequest: ( state ) => {
  state.gettingEquipmentMaster = true;
},
getEquipmentMasterResponse: ( state, action ) => {
  state.gettingEquipmentMaster = false;
  state.getEquipmentMasterResponse = action.payload;
},
getEquipmentMasterError: ( state, action ) => {
  state.gettingEquipmentMaster = false;
  state.getEquipmentMasterError = action.payload;
},

//dayPlanMapping


savedayPlanMappingRequest: ( state ) => {
  state.savingdayPlanMapping = true;
},
savedayPlanMappingResponse: ( state, action ) => {
  state.savingdayPlanMapping = false;
  state.savedayPlanMappingResponse = action.payload;
},
savedayPlanMappingError: ( state, action ) => {
  state.savingdayPlanMapping = false;
  state.savedayPlanMappingError = action.payload;
},
getdayPlanMappingRequest: ( state ) => {
  state.gettingdayPlanMapping = true;
},
getdayPlanMappingResponse: ( state, action ) => {
  state.gettingdayPlanMapping = false;
  state.getdayPlanMappingResponse = action.payload;
},
getdayPlanMappingError: ( state, action ) => {
  state.gettingdayPlanMapping = false;
  state.getdayPlanMappingError = action.payload;
},

//DeepCleaning


saveDeepCleaningRequest: ( state ) => {
  state.savingDeepCleaning = true;
},
saveDeepCleaningResponse: ( state, action ) => {
  state.savingDeepCleaning = false;
  state.saveDeepCleaningResponse = action.payload;
},
saveDeepCleaningError: ( state, action ) => {
  state.savingDeepCleaning = false;
  state.saveDeepCleaningError = action.payload;
},
getDeepCleaningRequest: ( state ) => {
  state.gettingDeepCleaning = true;
},
getDeepCleaningResponse: ( state, action ) => {
  state.gettingDeepCleaning = false;
  state.getDeepCleaningResponse = action.payload;
},
getDeepCleaningError: ( state, action ) => {
  state.gettingDeepCleaning = false;
  state.getDeepCleaningError = action.payload;
},

//DeepCleanEntry


saveDeepCleanEntryRequest: ( state ) => {
  state.savingDeepCleanEntry = true;
},
saveDeepCleanEntryResponse: ( state, action ) => {
  state.savingDeepCleanEntry = false;
  state.saveDeepCleanEntryResponse = action.payload;
},
saveDeepCleanEntryError: ( state, action ) => {
  state.savingDeepCleanEntry = false;
  state.saveDeepCleanEntryError = action.payload;
},
getDeepCleanEntryRequest: ( state ) => {
  state.gettingDeepCleanEntry = true;
},
getDeepCleanEntryResponse: ( state, action ) => {
  state.gettingDeepCleanEntry = false;
  state.getDeepCleanEntryResponse = action.payload;
},
getDeepCleanEntryError: ( state, action ) => {
  state.gettingDeepCleanEntry = false;
  state.getDeepCleanEntryError = action.payload;
},
//DeviationReport


saveDeviationReportRequest: ( state ) => {
  state.savingDeviationReport = true;
},
saveDeviationReportResponse: ( state, action ) => {
  state.savingDeviationReport = false;
  state.saveDeviationReportResponse = action.payload;
},
saveDeviationReportError: ( state, action ) => {
  state.savingDeviationReport = false;
  state.saveDeviationReportError = action.payload;
},
getDeviationReportRequest: ( state ) => {
  state.gettingDeviationReport = true;
},
getDeviationReportResponse: ( state, action ) => {
  state.gettingDeviationReport = false;
  state.getDeviationReportResponse = action.payload;
},
getDeviationReportError: ( state, action ) => {
  state.gettingDeviationReport = false;
  state.getDeviationReportError = action.payload;
},

//Outlet
saveOutletRequest: ( state ) => {
  state.savingOutlet = true;
},
saveOutletResponse: ( state, action ) => {
  state.savingOutlet = false;
  state.saveOutletResponse = action.payload;
},
saveOutletError: ( state, action ) => {
  state.savingOutlet = false;
  state.saveOutletError = action.payload;
},
getOutletRequest: ( state ) => {
  state.gettingOutlet = true;
},
getOutletResponse: ( state, action ) => {
  state.gettingOutlet = false;
  state.getOutletResponse = action.payload;
},
getOutletError: ( state, action ) => {
  state.gettingOutlet = false;
  state.getOutletError = action.payload;
  },

//EditDeepCleaningEntry

saveEditDeepCleaningEntryRequest: ( state ) => {
  state.savingEditDeepCleaningEntry = true;
},
saveEditDeepCleaningEntryResponse: ( state, action ) => {
  state.savingEditDeepCleaningEntry = false;
  state.saveEditDeepCleaningEntryResponse = action.payload;
},
saveEditDeepCleaningEntryError: ( state, action ) => {
  state.savingEditDeepCleaningEntry = false;
  state.saveEditDeepCleaningEntryError = action.payload;
},
getEditDeepCleaningEntryRequest: ( state ) => {
  state.gettingEditDeepCleaningEntry = true;
},
getEditDeepCleaningEntryResponse: ( state, action ) => {
  state.gettingEditDeepCleaningEntry = false;
  state.getEditDeepCleaningEntryResponse = action.payload;
},
getEditDeepCleaningEntryError: ( state, action ) => {
  state.gettingEditDeepCleaningEntry = false;
  state.getEditDeepCleaningEntryError = action.payload;
  },

//DeepCleanApproval


saveDeepCleanApprovalRequest: ( state ) => {
  state.savingDeepCleanApproval = true;
},
saveDeepCleanApprovalResponse: ( state, action ) => {
  state.savingDeepCleanApproval = false;
  state.saveDeepCleanApprovalResponse = action.payload;
},
saveDeepCleanApprovalError: ( state, action ) => {
  state.savingDeepCleanApproval = false;
  state.saveDeepCleanApprovalError = action.payload;
},
getDeepCleanApprovalRequest: ( state ) => {
  state.gettingDeepCleanApproval = true;
},
getDeepCleanApprovalResponse: ( state, action ) => {
  state.gettingDeepCleanApproval = false;
  state.getDeepCleanApprovalResponse = action.payload;
},
getDeepCleanApprovalError: ( state, action ) => {
  state.gettingDeepCleanApproval = false;
  state.getDeepCleanApprovalError = action.payload;
  },

    //BudgetMaster

    saveBudgetMasterRequest: (state) => {
      state.savingBudgetMaster = true;
    },
    saveBudgetMasterResponse: (state, action) => {
      state.savingBudgetMaster = false;
      state.saveBudgetMasterResponse = action.payload;
    },
    saveBudgetMasterError: (state, action) => {
      state.savingBudgetMaster = false;
      state.saveBudgetMasterError = action.payload;
    },
    getBudgetMasterRequest: (state) => {
      state.gettingBudgetMaster = true;
    },
    getBudgetMasterResponse: (state, action) => {
      state.gettingBudgetMaster = false;
      state.getBudgetMasterResponse = action.payload;
    },
    getBudgetMasterError: (state, action) => {
      state.gettingBudgetMaster = false;
      state.getBudgetMasterError = action.payload;
    },

    //EBReadingEntry

    saveEBReadingEntryRequest: (state) => {
      state.savingEBReadingEntry = true;
    },
    saveEBReadingEntryResponse: (state, action) => {
      state.savingEBReadingEntry = false;
      state.saveEBReadingEntryResponse = action.payload;
    },
    saveEBReadingEntryError: (state, action) => {
      state.savingEBReadingEntry = false;
      state.saveEBReadingEntryError = action.payload;
    },
    getEBReadingEntryRequest: (state) => {
      state.gettingEBReadingEntry = true;
    },
    getEBReadingEntryResponse: (state, action) => {
      state.gettingEBReadingEntry = false;
      state.getEBReadingEntryResponse = action.payload;
    },
    getEBReadingEntryError: (state, action) => {
      state.gettingEBReadingEntry = false;
      state.getEBReadingEntryError = action.payload;
    },

     //EBReadingEditEntry

     saveEBReadingEditEntryRequest: (state) => {
      state.savingEBReadingEditEntry = true;
    },
    saveEBReadingEditEntryResponse: (state, action) => {
      state.savingEBReadingEditEntry = false;
      state.saveEBReadingEditEntryResponse = action.payload;
    },
    saveEBReadingEditEntryError: (state, action) => {
      state.savingEBReadingEditEntry = false;
      state.saveEBReadingEditEntryError = action.payload;
    },
    getEBReadingEditEntryRequest: (state) => {
      state.gettingEBReadingEditEntry = true;
    },
    getEBReadingEditEntryResponse: (state, action) => {
      state.gettingEBReadingEditEntry = false;
      state.getEBReadingEditEntryResponse = action.payload;
    },
    getEBReadingEditEntryError: (state, action) => {
      state.gettingEBReadingEditEntry = false;
      state.getEBReadingEditEntryError = action.payload;
    },

     //EBReadingApprovalEntry

    saveEBReadingApprovalEntryRequest: (state) => {
     state.savingEBReadingApprovalEntry = true;
   },
   saveEBReadingApprovalEntryResponse: (state, action) => {
     state.savingEBReadingApprovalEntry = false;
     state.saveEBReadingApprovalEntryResponse = action.payload;
   },
   saveEBReadingApprovalEntryError: (state, action) => {
     state.savingEBReadingApprovalEntry = false;
     state.saveEBReadingApprovalEntryError = action.payload;
   },
   getEBReadingApprovalEntryRequest: (state) => {
     state.gettingEBReadingApprovalEntry = true;
   },
   getEBReadingApprovalEntryResponse: (state, action) => {
     state.gettingEBReadingApprovalEntry = false;
     state.getEBReadingApprovalEntryResponse = action.payload;
   },
   getEBReadingApprovalEntryError: (state, action) => {
     state.gettingEBReadingApprovalEntry = false;
     state.getEBReadingApprovalEntryError = action.payload;
   },

   //EB Reading Report

   
   saveEBReadingReportRequest: (state) => {
    state.savingEBReadingReport = true;
  },
  saveEBReadingReportResponse: (state, action) => {
    state.savingEBReadingReport = false;
    state.saveEBReadingReportResponse = action.payload;
  },
  saveEBReadingReportError: (state, action) => {
    state.savingEBReadingReport = false;
    state.saveEBReadingReportError = action.payload;
  },
  getEBReadingReportRequest: (state) => {
    state.gettingEBReadingReport = true;
  },
  getEBReadingReportResponse: (state, action) => {
    state.gettingEBReadingReport = false;
    state.getEBReadingReportResponse = action.payload;
  },
  getEBReadingReportError: (state, action) => {
    state.gettingEBReadingReport = false;
    state.getEBReadingReportError = action.payload;
  },

   //  getDashboard

   saveDashboardRequest: (state) => {
    state.savingDashboard = true;
  },
  saveDashboardResponse: (state, action) => {
    state.savingDashboard = false;
    state.saveDashboardResponse = action.payload;
  },
  saveDashboardError: (state, action) => {
    state.savingDashboard = false;
    state.saveDashboardError = action.payload;
  },
  getDashboardRequest: (state) => {
    state.gettingDashboard = true;
  },
  getDashboardResponse: (state, action) => {
    state.gettingDashboard = false;
    state.getDashboardResponse = action.payload;
  },
  getDashboardError: (state, action) => {
    state.gettingDashboard = false;
    state.getDashboardError = action.payload;
  },



  saveStockUploadRequest: (state) => {
    state.savingStockUpload = true;
  },
  saveStockUploadResponse: (state, action) => {
    state.savingStockUpload = false;
    state.saveStockUploadResponse = action.payload;
  },
  saveStockUploadError: (state, action) => {
    state.savingStockUpload = false;
    state.saveStockUploadError = action.payload;
  },

  //UploadedRistaStock
  
  saveUploadedRistaStockRequest: (state) => {
    state.savingUploadedRistaStock = true;
  },
  saveUploadedRistaStockResponse: (state, action) => {
    state.savingUploadedRistaStock = false;
    state.saveUploadedRistaStockResponse = action.payload;
  },
  saveUploadedRistaStockError: (state, action) => {
    state.savingUploadedRistaStock = false;
    state.saveUploadedRistaStockError = action.payload;
  },
  getUploadedRistaStockRequest: (state) => {
    state.gettingUploadedRistaStock = true;
  },
  getUploadedRistaStockResponse: (state, action) => {
    state.gettingUploadedRistaStock = false;
    state.getUploadedRistaStockResponse = action.payload;
  },
  getUploadedRistaStockError: (state, action) => {
    state.gettingUploadedRistaStock = false;
    state.getUploadedRistaStockError = action.payload;
  },


  //ConsumableMaster

getConsumableMasterRequest: (state) => {
  state.gettingConsumableMaster = true;
},
getConsumableMasterResponse: (state, action) => {
  state.gettingConsumableMaster = false;
  state.getConsumableMasterResponse = action.payload;
},
getConsumableMasterError: (state, action) => {
  state.gettingConsumableMaster = false;
  state.getConsumableMasterResponse = action.payload;
},

saveConsumableMasterRequest: (state) => {
  state.savingConsumableMaster = true;
},
saveConsumableMasterResponse: (state, action) => {
  state.savingConsumableMaster = false;
  state.saveConsumableMasterResponse = action.payload;
},
saveConsumableMasterError: (state, action) => {
  state.savingConsumableMaster = false;
  state.saveConsumableMasterError = action.payload;
},
//ConsumableAll


getConsumableAllRequest: (state) => {
  state.gettingConsumableAll = true;
},
getConsumableAllResponse: (state, action) => {
  state.gettingConsumableAll = false;
  state.getConsumableAllResponse = action.payload;
},
getConsumableAllError: (state, action) => {
  state.gettingConsumableAll = false;
  state.getConsumableAllResponse = action.payload;
},

saveConsumableAll: (state) => {
  state.savingConsumableAll = true;
},
saveConsumableAllResponse: (state, action) => {
  state.savingConsumableAll = false;
  state.saveConsumableAllResponse = action.payload;
},
saveConsumableAllError: (state, action) => {
  state.savingConsumableAll = false;
  state.saveConsumableAllError = action.payload;
},

//ConsumableEntry


getConsumableEntryRequest: (state) => {
  state.gettingConsumableEntry = true;
},
getConsumableEntryResponse: (state, action) => {
  state.gettingConsumableEntry = false;
  state.getConsumableEntryResponse = action.payload;
},
getConsumableEntryError: (state, action) => {
  state.gettingConsumableEntry = false;
  state.getConsumableEntryResponse = action.payload;
},

saveConsumableEntry: (state) => {
  state.savingConsumableEntry = true;
},
saveConsumableEntryResponse: (state, action) => {
  state.savingConsumableEntry = false;
  state.saveConsumableEntryResponse = action.payload;
},
saveConsumableEntryError: (state, action) => {
  state.savingConsumableEntry = false;
  state.saveConsumableEntryError = action.payload;
},

//consumable edit entry


getConsumableEditEntryRequest: (state) => {
  state.gettingConsumableEditEntry = true;
},
getConsumableEditEntryResponse: (state, action) => {
  state.gettingConsumableEditEntry = false;
  state.getConsumableEditEntryResponse = action.payload;
},
getConsumableEditEntryError: (state, action) => {
  state.gettingConsumableEditEntry = false;
  state.getConsumableEditEntryResponse = action.payload;
},

saveConsumableEditEntry: (state) => {
  state.savingConsumableEditEntry = true;
},
saveConsumableEditEntryResponse: (state, action) => {
  state.savingConsumableEditEntry = false;
  state.saveConsumableEditEntryResponse = action.payload;
},
saveConsumableEditEntryError: (state, action) => {
  state.savingConsumableEditEntry = false;
  state.saveConsumableEditEntryError = action.payload;
},

//consumable entry Report


getConsumableReportRequest: (state) => {
  state.gettingConsumableReport = true;
},
getConsumableReportResponse: (state, action) => {
  state.gettingConsumableReport = false;
  state.getConsumableReportResponse = action.payload;
},
getConsumableReportError: (state, action) => {
  state.gettingConsumableReport = false;
  state.getConsumableReportResponse = action.payload;
},

saveConsumableReport: (state) => {
  state.savingConsumableReport = true;
},
saveConsumableReportResponse: (state, action) => {
  state.savingConsumableReport = false;
  state.saveConsumableReportResponse = action.payload;
},
saveConsumableReportError: (state, action) => {
  state.savingConsumableReport = false;
  state.saveConsumableReportError = action.payload;
},


//consumable entry Report


getLowConsumableReportRequest: (state) => {
  state.gettingLowConsumableReport = true;
},
getLowConsumableReportResponse: (state, action) => {
  state.gettingLowConsumableReport = false;
  state.getLowConsumableReportResponse = action.payload;
},
getLowConsumableReportError: (state, action) => {
  state.gettingLowConsumableReport = false;
  state.getLowConsumableReportResponse = action.payload;
},

saveLowConsumableReport: (state) => {
  state.savingLowConsumableReport = true;
},
saveLowConsumableReportResponse: (state, action) => {
  state.savingLowConsumableReport = false;
  state.saveLowConsumableReportResponse = action.payload;
},
saveLowConsumableReportError: (state, action) => {
  state.savingLowConsumableReport = false;
  state.saveLowConsumableReportError = action.payload;
},

//List


getConsumableListRequest: (state) => {
  state.gettingConsumableList = true;
},
getConsumableListResponse: (state, action) => {
  state.gettingConsumableList = false;
  state.getConsumableListResponse = action.payload;
},
getConsumableListError: (state, action) => {
  state.gettingConsumableList = false;
  state.getConsumableListResponse = action.payload;
},

saveConsumableList: (state) => {
  state.savingConsumableList = true;
},
saveConsumableListResponse: (state, action) => {
  state.savingConsumableList = false;
  state.saveConsumableListResponse = action.payload;
},
saveConsumableListError: (state, action) => {
  state.savingConsumableList = false;
  state.saveConsumableListError = action.payload;
},

//CalendarEvent



getCalendarEventRequest: (state) => {
  state.gettingCalendarEvent = true;
},
getCalendarEventResponse: (state, action) => {
  state.gettingCalendarEvent = false;
  state.getCalendarEventResponse = action.payload;
},
getCalendarEventError: (state, action) => {
  state.gettingCalendarEvent = false;
  state.getCalendarEventResponse = action.payload;
},

saveCalendarEvent: (state) => {
  state.savingCalendarEvent = true;
},
saveCalendarEventResponse: (state, action) => {
  state.savingCalendarEvent = false;
  state.saveCalendarEventResponse = action.payload;
},
saveCalendarEventError: (state, action) => {
  state.savingCalendarEvent = false;
  state.saveCalendarEventError = action.payload;
},

//UploadCsvConsumableMaster

getUploadCsvConsumableMasterRequest: (state) => {
  state.gettingUploadCsvConsumableMaster = true;
},
getUploadCsvConsumableMasterResponse: (state, action) => {
  state.gettingUploadCsvConsumableMaster = false;
  state.getUploadCsvConsumableMasterResponse = action.payload;
},
getUploadCsvConsumableMasterError: (state, action) => {
  state.gettingUploadCsvConsumableMaster = false;
  state.getUploadCsvConsumableMasterResponse = action.payload;
},

saveUploadCsvConsumableMasterRequest: (state) => {
  state.savingUploadCsvConsumableMaster = true;
},
saveUploadCsvConsumableMasterResponse: (state, action) => {
  state.savingUploadCsvConsumableMaster = false;
  state.saveUploadCsvConsumableMasterResponse = action.payload;
},
saveUploadCsvConsumableMasterError: (state, action) => {
  state.savingUploadCsvConsumableMaster = false;
  state.saveUploadCsvConsumableMasterError = action.payload;
},

//CalendarEventReport

getCalendarEventReportRequest: (state) => {
  state.gettingCalendarEventReport = true;
},
getCalendarEventReportResponse: (state, action) => {
  state.gettingCalendarEventReport = false;
  state.getCalendarEventReportResponse = action.payload;
},
getCalendarEventReportError: (state, action) => {
  state.gettingCalendarEventReport = false;
  state.getCalendarEventReportResponse = action.payload;
},

saveCalendarEventReport: (state) => {
  state.savingCalendarEventReport = true;
},
saveCalendarEventReportResponse: (state, action) => {
  state.savingCalendarEventReport = false;
  state.saveCalendarEventReportResponse = action.payload;
},
saveCalendarEventReportError: (state, action) => {
  state.savingCalendarEventReport = false;
  state.saveCalendarEventReportError = action.payload;
},


//CalendarEvent


getUploadCsvCalendarEventRequest: (state) => {
  state.gettingUploadCsvCalendarEvent = true;
},
getUploadCsvCalendarEventResponse: (state, action) => {
  state.gettingUploadCsvCalendarEvent = false;
  state.getUploadCsvCalendarEventResponse = action.payload;
},
getUploadCsvCalendarEventError: (state, action) => {
  state.gettingUploadCsvCalendarEvent = false;
  state.getUploadCsvCalendarEventResponse = action.payload;
},

saveUploadCsvCalendarEventRequest: (state) => {
  state.savingUploadCsvCalendarEvent = true;
},
saveUploadCsvCalendarEventResponse: (state, action) => {
  state.savingUploadCsvCalendarEvent = false;
  state.saveUploadCsvCalendarEventResponse = action.payload;
},
saveUploadCsvCalendarEventError: (state, action) => {
  state.savingUploadCsvCalendarEvent = false;
  state.saveUploadCsvCalendarEventError = action.payload;
},

//FullView

getConsumableFullViewReportRequest: (state) => {
  state.gettingConsumableFullViewReport = true;
},
getConsumableFullViewReportResponse: (state, action) => {
  state.gettingConsumableFullViewReport = false;
  state.getConsumableFullViewReportResponse = action.payload;
},
getConsumableFullViewReportError: (state, action) => {
  state.gettingConsumableFullViewReport = false;
  state.getConsumableFullViewReportResponse = action.payload;
},

saveConsumableFullViewReport: (state) => {
  state.savingConsumableFullViewReport = true;
},
saveConsumableFullViewReportResponse: (state, action) => {
  state.savingConsumableFullViewReport = false;
  state.saveConsumableFullViewReportResponse = action.payload;
},
saveConsumableFullViewReportError: (state, action) => {
  state.savingConsumableFullViewReport = false;
  state.saveConsumableFullViewReportError = action.payload;
},

//getModuleUpdateLogs

getModuleUpdateLogsRequest: (state) => {
  state.gettingModuleUpdateLogs = true;
},
getModuleUpdateLogsResponse: (state, action) => {
  state.gettingModuleUpdateLogs = false;
  state.getModuleUpdateLogsResponse = action.payload;
},
getModuleUpdateLogsError: (state, action) => {
  state.gettingModuleUpdateLogs = false;
  state.getModuleUpdateLogsResponse = action.payload;
},

saveModuleUpdateLogs: (state) => {
  state.savingModuleUpdateLogs = true;
},
saveModuleUpdateLogsResponse: (state, action) => {
  state.savingModuleUpdateLogs = false;
  state.saveModuleUpdateLogsResponse = action.payload;
},
saveModuleUpdateLogsError: (state, action) => {
  state.savingModuleUpdateLogs = false;
  state.saveModuleUpdateLogsError = action.payload;
},


  }
} );
export default subMasterSlice.reducer;

// Actions
export const saveState =
  ( { data } ) =>
    async ( dispatch ) => {
      dispatch( subMasterSlice.actions.saveStateRequest() );
      return apis
        .addState( { data } )
        .then( async ( { data } ) => {
          await dispatch( subMasterSlice.actions.saveStateResponse( data ) );
          messageToast( { message: data?.message ?? data?.statusText, status: data?.status, title: 'State Master' } );
          return data;
        } )
        .catch( () => {
          dispatch( subMasterSlice.actions.saveStateError() );
        } );
    };

export const updateState =
  ( { data } ) =>
    async ( dispatch ) => {
      dispatch( subMasterSlice.actions.saveStateRequest() );
      return apis
        .updateState( { data } )
        .then( ( { data } ) => {
          dispatch( subMasterSlice.actions.saveStateResponse( data ) );
          messageToast( { message: data?.message ?? data?.statusText, status: data.status, title: 'State Master' } );

          return data;
        } )
        .catch( () => {
          dispatch( subMasterSlice.actions.saveStateError() );
        } );
    };

export const getStates = () => async ( dispatch ) => {
  dispatch( subMasterSlice.actions.getStatesRequest() );
  return apis
    .getStates()
    .then( ( { data } ) => {
      dispatch( subMasterSlice.actions.getStatesResponse( data ) );
      return data;
    } )
    .catch( () => {
      dispatch( subMasterSlice.actions.getStatesError() );
    } );
};

export const saveZonal =
  ( { data } ) =>
    async ( dispatch ) => {
      dispatch( subMasterSlice.actions.saveZonalRequest() );
      return apis
        .addZonal( { data } )
        .then( ( { data } ) => {
          dispatch( subMasterSlice.actions.saveZonalResponse( data ) );
          messageToast( { message: data?.message ?? data?.statusText, status: data.status, title: 'Zone Master' } );
          return data;
        } )
        .catch( () => {
          dispatch( subMasterSlice.actions.saveZonalError() );
        } );
    };

export const updateZonal =
  ( { data } ) =>
    async ( dispatch ) => {
      dispatch( subMasterSlice.actions.saveZonalRequest() );
      return apis
        .updateZonal( { data } )
        .then( ( { data } ) => {
          dispatch( subMasterSlice.actions.saveZonalResponse( data ) );
          messageToast( { message: data?.message ?? data?.statusText, status: data.status, title: 'Zone Master' } );
          return data;
        } )
        .catch( () => {
          dispatch( subMasterSlice.actions.saveZonalError() );
        } );
    };

export const getZonal = ( stateID ) => async ( dispatch ) => {
  dispatch( subMasterSlice.actions.getZonalRequest() );
  return apis
    .getZonal()
    .then( ( { data } ) => {
      const { data: zonal, ...rest } = data;
      const filterByStateId = filter( ( e ) => ( stateID ? e.state_id === stateID : true ), zonal ? zonal : [] );
      dispatch( subMasterSlice.actions.getZonalResponse( { data: filterByStateId, ...rest } ) );
      return data;
    } )
    .catch( () => {
      dispatch( subMasterSlice.actions.getZonalError() );
    } );
};

export const saveSubZonal =
  ( { data } ) =>
    async ( dispatch ) => {
      dispatch( subMasterSlice.actions.saveSubZonalRequest() );
      return apis
        .addSubZonal( { data } )
        .then( ( { data } ) => {
          dispatch( subMasterSlice.actions.saveSubZonalResponse( data ) );
          return data;
        } )
        .catch( () => {
          dispatch( subMasterSlice.actions.saveSubZonalError() );
        } );
    };

export const updateSubZonal =
  ( { data } ) =>
    async ( dispatch ) => {
      dispatch( subMasterSlice.actions.saveSubZonalRequest() );
      return apis
        .updateSubZonal( { data } )
        .then( ( { data } ) => {
          dispatch( subMasterSlice.actions.saveSubZonalResponse( data ) );
          return data;
        } )
        .catch( () => {
          dispatch( subMasterSlice.actions.saveSubZonalError() );
        } );
    };

export const getSubZonal = ( zoneID ) => async ( dispatch ) => {
  dispatch( subMasterSlice.actions.getSubZonalRequest() );
  return apis
    .getSubZonal()
    .then( ( { data } ) => {
      const { data: zonal, ...rest } = data;
      const filterByStateId = filter( ( e ) => ( zoneID ? e.zonal_id === zoneID : true ), zonal ? zonal : [] );
      dispatch( subMasterSlice.actions.getSubZonalResponse( { data: filterByStateId, ...rest } ) );
      return data;
    } )
    .catch( () => {
      dispatch( subMasterSlice.actions.getSubZonalError() );
    } );
};

export const saveCity =
  ( { data } ) =>
    async ( dispatch ) => {
      dispatch( subMasterSlice.actions.saveCityRequest() );
      return apis
        .setCity( { data } )
        .then( ( { data } ) => {
          dispatch( subMasterSlice.actions.saveCityResponse( data ) );
          return data;
        } )
        .catch( () => {
          dispatch( subMasterSlice.actions.saveCityError() );
        } );
    };

export const updateCity =
  ( { data } ) =>
    async ( dispatch ) => {
      dispatch( subMasterSlice.actions.saveCityRequest() );
      return apis
        .updateCity( { data } )
        .then( ( { data } ) => {
          dispatch( subMasterSlice.actions.saveCityResponse( data ) );
          return data;
        } )
        .catch( () => {
          dispatch( subMasterSlice.actions.saveCityError() );
        } );
    };

export const getCity = () => async ( dispatch ) => {
  dispatch( subMasterSlice.actions.getCityRequest() );
  return apis
    .getCity()
    .then( ( { data } ) => {
      dispatch( subMasterSlice.actions.getCityResponse( data ) );
      return data;
    } )
    .catch( () => {
      dispatch( subMasterSlice.actions.getCityError() );
    } );
};

export const saveDivision =
  ( { data } ) =>
    async ( dispatch ) => {
      dispatch( subMasterSlice.actions.saveDivisionRequest() );
      return apis
        .addDivision( { data } )
        .then( ( { data } ) => {
          dispatch( subMasterSlice.actions.saveDivisionResponse( data ) );
          return data;
        } )
        .catch( () => {
          dispatch( subMasterSlice.actions.saveDivisionError() );
        } );
    };

export const updateDivision =
  ( { data } ) =>
    async ( dispatch ) => {
      dispatch( subMasterSlice.actions.saveDivisionRequest() );
      return apis
        .updateDivision( { data } )
        .then( ( { data } ) => {
          dispatch( subMasterSlice.actions.saveDivisionResponse( data ) );
          return data;
        } )
        .catch( () => {
          dispatch( subMasterSlice.actions.saveDivisionError() );
        } );
    };

export const getDivision = () => async ( dispatch ) => {
  dispatch( subMasterSlice.actions.getDivisionRequest() );
  return apis
    .getDivision()
    .then( ( { data } ) => {

      dispatch( subMasterSlice.actions.getDivisionResponse( data ) );
      return data;
    } )
    .catch( () => {
      dispatch( subMasterSlice.actions.getDivisionError() );
    } );
};

export const getDepartment = () => async ( dispatch ) => {
  dispatch( subMasterSlice.actions.getDepartmentRequest() );
  return apis
    .getDepartment()
    .then( ( { data } ) => {
      dispatch( subMasterSlice.actions.getDepartmentResponse( data ) );
      return data;
    } )
    .catch( () => {
      dispatch( subMasterSlice.actions.getDepartmentError() );
    } );
};

export const saveDepartment =
  ( { data } ) =>
    async ( dispatch ) => {
      dispatch( subMasterSlice.actions.saveDepartmentRequest() );
      return apis
        .addDepartment( { data } )
        .then( ( { data } ) => {
          dispatch( subMasterSlice.actions.saveDepartmentResponse( data ) );
          return data;
        } )
        .catch( () => {
          dispatch( subMasterSlice.actions.saveDepartmentError() );
        } );
    };

export const updateDepartment =
  ( { data } ) =>
    async ( dispatch ) => {
      dispatch( subMasterSlice.actions.saveDepartmentRequest() );
      return apis
        .updateDepartment( { data } )
        .then( ( { data } ) => {
          dispatch( subMasterSlice.actions.saveDepartmentResponse( data ) );
          return data;
        } )
        .catch( () => {
          dispatch( subMasterSlice.actions.saveDepartmentError() );
        } );
    };

export const getDesignation = () => async ( dispatch ) => {
  dispatch( subMasterSlice.actions.getDesignationRequest() );
  return apis
    .getDesignation()
    .then( ( { data } ) => {
      dispatch( subMasterSlice.actions.getDesignationResponse( data ) );
      return data;
    } )
    .catch( () => {
      dispatch( subMasterSlice.actions.getDesignationError() );
    } );
};

export const saveDesignation =
  ( { data } ) =>
    async ( dispatch ) => {
      dispatch( subMasterSlice.actions.saveDesignationRequest() );
      return apis
        .addDesignation( { data } )
        .then( ( { data } ) => {
          dispatch( subMasterSlice.actions.saveDesignationResponse( data ) );
          return data;
        } )
        .catch( () => {
          dispatch( subMasterSlice.actions.saveDesignationError() );
        } );
    };

export const updateDesignation =
  ( { data } ) =>
    async ( dispatch ) => {
      dispatch( subMasterSlice.actions.saveDesignationRequest() );
      return apis
        .updateDesignation( { data } )
        .then( ( { data } ) => {
          dispatch( subMasterSlice.actions.saveDesignationResponse( data ) );
          return data;
        } )
        .catch( () => {
          dispatch( subMasterSlice.actions.saveDesignationError() );
        } );
    };
export const getEmployeeLevel = () => async ( dispatch ) => {
  dispatch( subMasterSlice.actions.getEmployeeLevelRequest() );
  return apis
    .getEmployeeLevel()
    .then( ( { data } ) => {
      dispatch( subMasterSlice.actions.getEmployeeLevelResponse( data ) );
      return data;
    } )
    .catch( () => {
      dispatch( subMasterSlice.actions.getEmployeeLevelError() );
    } );
};

export const updateEmployeeLevel =
  ( { data } ) =>
    async ( dispatch ) => {
      dispatch( subMasterSlice.actions.saveEmployeeLevelRequest() );
      return apis
        .updateEmployeeLevel( { data } )
        .then( ( { data } ) => {
          dispatch( subMasterSlice.actions.saveEmployeeLevelResponse( data ) );
          return data;
        } )
        .catch( () => {
          dispatch( subMasterSlice.actions.saveEmployeeLevelError() );
        } );
    };

export const saveEmployeeLevel =
  ( { data } ) =>
    async ( dispatch ) => {
      dispatch( subMasterSlice.actions.saveEmployeeLevelRequest() );
      return apis
        .addEmployeeLevel( { data } )
        .then( ( { data } ) => {
          dispatch( subMasterSlice.actions.saveEmployeeLevelResponse( data ) );
          return data;
        } )
        .catch( () => {
          dispatch( subMasterSlice.actions.saveEmployeeLevelError() );
        } );
    };

    export const getLicense = () => async (dispatch) => {
      dispatch(subMasterSlice.actions.getLicenseRequest());
      return apis
        .getLicense()
        .then(({ data }) => {
          dispatch(subMasterSlice.actions.getLicenseResponse(data));
          return data;
        })
        .catch(() => {
          dispatch(subMasterSlice.actions.getLicenseError());
        });
    };
    
    export const saveLicense =
      ({ data }) =>
      async (dispatch) => {
        dispatch(subMasterSlice.actions.saveLicenseRequest());
        return apis
          .addLicense({ data })
          .then(({ data }) => {
            dispatch(subMasterSlice.actions.saveLicenseResponse(data));
            return data;
          })
          .catch(() => {
            dispatch(subMasterSlice.actions.saveLicenseError());
          });
      };
    
      export const updateLicense =
      ({ data }) =>
      async (dispatch) => {
        dispatch(subMasterSlice.actions.saveLicenseRequest());
        return apis
          .updateLicense({ data })
          .then(({ data }) => {
            dispatch(subMasterSlice.actions.saveLicenseResponse(data));
            return data;
          })
          .catch(() => {
            dispatch(subMasterSlice.actions.saveLicenseError());
          });
      };
    
    
    
      export const getLicenseDetail = () => async (dispatch) => {
        dispatch(subMasterSlice.actions.getLicenseRequestDetail());
        return apis
          .getLicenseDetail()
          .then(({ data }) => {
            dispatch(subMasterSlice.actions.getLicenseResponseDetail(data));
            return data;
          })
          .catch(() => {
            dispatch(subMasterSlice.actions.getLicenseErrorDetail());
          });
      };
      
    //Days
    
    export const getDays = () => async ( dispatch ) => {
      dispatch( subMasterSlice.actions.getDaysRequest() );
      return apis
        .getDays()
        .then( ( { data } ) => {
          dispatch( subMasterSlice.actions.getDaysResponse( data ) );
          return data;
        } )
        .catch( () => {
          dispatch( subMasterSlice.actions.getDaysError() );
        } );
    };
    
    
    
    export const saveLicenseDetail =
      ({ data }) =>
      async (dispatch) => {
        dispatch(subMasterSlice.actions.saveLicenseRequestDetail());
        return apis
          .addLicenseDetail({ data })
          .then(({ data }) => {
            dispatch(subMasterSlice.actions.saveLicenseResponseDetail(data));
            return data;
          })
          .catch(() => {
            dispatch(subMasterSlice.actions.saveLicenseErrorDetail());
          });
      };
    
      export const updateLicenseDetail =
      ({ data }) =>
      async (dispatch) => {
        dispatch(subMasterSlice.actions.saveLicenseRequestDetail());
        return apis
          .updateLicenseDetail({ data })
          .then(({ data }) => {
            dispatch(subMasterSlice.actions.saveLicenseResponseDetail(data));
            return data;
          })
          .catch(() => {
            dispatch(subMasterSlice.actions.saveLicenseErrorDetail());
          });
      };
    
    
    export const getPeriod = (licenseId) => async (dispatch) => {
      dispatch(subMasterSlice.actions.getPeriodRequest());
      return apis
        .getPeriod()
        .then(({ data }) => {
          const { data: License, ...rest } = data;
          const filterByStateId = filter(
            (e) => (licenseId ? e.license_type_id === licenseId : true),
            License ? License : []
          );
          dispatch(
            subMasterSlice.actions.getPeriodResponse({
              data: filterByStateId,
              ...rest,
            })
          );
          return data;
        })
        .catch(() => {
          dispatch(subMasterSlice.actions.getPeriodError());
        });
    };
    
   
    export const getRenewal = () => async (dispatch) => {
      dispatch(subMasterSlice.actions.getRenewalRequest());
      return apis
        .getRenewal()
        .then(({ data }) => {
          dispatch(subMasterSlice.actions.getRenewalResponse(data));
          return data;
        })
        .catch(() => {
          dispatch(subMasterSlice.actions.getRenewalError());
        });
    };
    
    export const updaterenewal =
      ({ data }) =>
      async (dispatch) => {
        dispatch(subMasterSlice.actions.saveRenewalRequest());
        return apis
          .updaterenewal({ data })
          .then(({ data }) => {
            dispatch(subMasterSlice.actions.saveRenewalResponse(data));
            return data;
          })
          .catch(() => {
            dispatch(subMasterSlice.actions.saveRenewalError());
          });
      };
    
      export const saveRenewal =
      ({ data }) =>
      async (dispatch) => {
        dispatch(subMasterSlice.actions.saveRenewalRequest());
        return apis
          .addrenewal({ data })
          .then(({ data }) => {
            dispatch(subMasterSlice.actions.saveRenewalResponse(data));
            return data;
          })
          .catch(() => {
            dispatch(subMasterSlice.actions.saveRenewalError());
          });
      };
    
    
      export const getApprove = () => async (dispatch) => {
        dispatch(subMasterSlice.actions.getApproveRequest());
        return apis
          .getApprove()
          .then(({ data }) => {
            dispatch(subMasterSlice.actions.getApproveResponse(data));
            return data;
          })
          .catch(() => {
            dispatch(subMasterSlice.actions.getApproveError());
          });
      };
      
      export const updateApprove =
        ({ data }) =>
        async (dispatch) => {
          dispatch(subMasterSlice.actions.saveApproveRequest());
          return apis
            .updateApprove({ data })
            .then(({ data }) => {
              dispatch(subMasterSlice.actions.saveApproveResponse(data));
              return data;
            })
            .catch(() => {
              dispatch(subMasterSlice.actions.saveApproveError());
            });
        };
      
        export const saveApprove =
        ({ data }) =>
        async (dispatch) => {
          dispatch(subMasterSlice.actions.saveApproveRequest());
          return apis
            .addApprove({ data })
            .then(({ data }) => {
              dispatch(subMasterSlice.actions.saveApproveResponse(data));
              return data;
            })
            .catch(() => {
              dispatch(subMasterSlice.actions.saveApproveError());
            });
        };
    
        //Preethika
        export const getEditLicense = () => async (dispatch) => {
          dispatch(subMasterSlice.actions.getEditLicenseRequest());
          return apis
            .getEditLicense()
            .then(({ data }) => {
              dispatch(subMasterSlice.actions.getEditLicenseResponse(data));
              return data;
            })
            .catch(() => {
              dispatch(subMasterSlice.actions.getEditLicenseError());
            });
        };
    
    
        export const updateEditLicense =
        ({ data }) =>
        async (dispatch) => {
          dispatch(subMasterSlice.actions.saveEditLicenseRequest());
          return apis
            .saveEditLicense({ data })
            .then(({ data }) => {
              dispatch(subMasterSlice.actions.saveEditLicenseResponse(data));
              return data;
            })
            .catch(() => {
              dispatch(subMasterSlice.actions.saveError());
            });
        };
      
        export const saveEditLicense =
        ({ data }) =>
        async (dispatch) => {
          dispatch(subMasterSlice.actions.saveEditLicenseRequest());
          return apis
            .saveEditLicense({ data })
            .then(({ data }) => {
              dispatch(subMasterSlice.actions.saveEditLicenseResponse(data));
              return data;
            })
            .catch(() => {
              dispatch(subMasterSlice.actions.saveEditLicenseError());
            });
        };
    
        //Active License
    
         export const getActiveLicense = () => async (dispatch) => {
          dispatch(subMasterSlice.actions.getActiveLicenseRequest());
          return apis
            .getActiveLicense()
            .then(({ data }) => {
              dispatch(subMasterSlice.actions.getActiveLicenseResponse(data));
              return data;
            })
            .catch(() => {
              dispatch(subMasterSlice.actions.getActiveLicenseError());
            });
        };
    
    
        export const updateActiveLicense =
        ({ data }) =>
        async (dispatch) => {
          dispatch(subMasterSlice.actions.saveActiveLicenseRequest());
          return apis
            .updateActiveLicense({ data })
            .then(({ data }) => {
              dispatch(subMasterSlice.actions.saveActiveLicenseResponse(data));
              return data;
            })
            .catch(() => {
              dispatch(subMasterSlice.actions.saveError());
            });
        };
      
        export const saveActiveLicense =
        ({ data }) =>
        async (dispatch) => {
          dispatch(subMasterSlice.actions.saveActiveLicenseRequest());
          return apis
            .saveActiveLicense({ data })
            .then(({ data }) => {
              dispatch(subMasterSlice.actions.saveActiveLicenseResponse(data));
              return data;
            })
            .catch(() => {
              dispatch(subMasterSlice.actions.saveActiveLicenseError());
            });
        };
    
    
        export const getLicenseReport = () => async (dispatch) => {
          dispatch(subMasterSlice.actions.getLicenseReportRequest());
          return apis
            .getLicenseReport()
            .then(({ data }) => {
              dispatch(subMasterSlice.actions.getLicenseReportResponse(data));
              return data;
            })
            .catch(() => {
              dispatch(subMasterSlice.actions.getLicenseReportError());
            });
        };
    
        //Rohini
        export const addTraining =
        ( { data } ) =>
          async ( dispatch ) => {
            dispatch( subMasterSlice.actions.saveTrainingRequest() );
            return apis
              .addTraining( { data } )
              .then( async ( { data } ) => {
                await dispatch( subMasterSlice.actions.saveTrainingResponse( data ) );
                messageToast( { message: data?.message ?? data?.statusText, status: data?.status, title: 'Training' } );
                return data;
              } )
              .catch( () => {
                dispatch( subMasterSlice.actions.saveTrainingError() );
              } );
          };
      
      export const updateTraining =
        ( { data } ) =>
          async ( dispatch ) => {
            dispatch( subMasterSlice.actions.saveTrainingRequest() );
            return apis
              .updateTraining( { data } )
              .then( ( { data } ) => {
                dispatch( subMasterSlice.actions.saveTrainingResponse( data ) );
                messageToast( { message: data?.message ?? data?.statusText, status: data.status, title: 'Training' } );
      
                return data;
              } )
              .catch( () => {
                dispatch( subMasterSlice.actions.saveTrainingError() );
              } );
          };
      
      export const getTraining = () => async ( dispatch ) => {
        dispatch( subMasterSlice.actions.getTrainingRequest() );
        return apis
          .getTraining()
          .then( ( { data } ) => {
            dispatch( subMasterSlice.actions.getTrainingResponse( data ) );
            return data;
          } )
          .catch( () => {
            dispatch( subMasterSlice.actions.getTrainingError() );
          } );
      };
      export const getAllImage = () => async ( dispatch ) => {
        dispatch( subMasterSlice.actions.getImageRequest() );
        return apis
          .getAllImage()
          .then( ( { data } ) => {
            dispatch( subMasterSlice.actions.getImageResponse( data ) );
            return data;
          } )
          .catch( () => {
            dispatch( subMasterSlice.actions.getImageRequestError() );
          } );
        };
      
        export const getAllVideo = () => async ( dispatch ) => {
          dispatch( subMasterSlice.actions.getVideoRequest() );
          return apis
            .getAllVideo()
            .then( ( { data } ) => {
              dispatch( subMasterSlice.actions.getVideoResponse( data ) );
              return data;
            } )
            .catch( () => {
              dispatch( subMasterSlice.actions.getVideoRequestError() );
            } );
          };
        
          export const getAllDocument = () => async ( dispatch ) => {
            dispatch( subMasterSlice.actions.getDocumentRequest() );
            return apis
              .getAllDocument()
              .then( ( { data } ) => {
                dispatch( subMasterSlice.actions.getDocumentResponse( data ) );
                return data;
              } )
              .catch( () => {
                dispatch( subMasterSlice.actions.getDocumentRequestError() );
              } );
            };
    
            export const getAllFiles =() => async (dispatch) => {
              dispatch( subMasterSlice.actions.getFilesRequest() );
            return apis
              .getAllFiles()
              .then( ( { data } ) => {
                dispatch( subMasterSlice.actions.getFilesResponse( data ) );
                return data;
              } )
              .catch( () => {
                dispatch( subMasterSlice.actions.getFilesRequestError() );
              } );
            }
    
//Call Status Master

export const addCallStatus =
( { data } ) =>
  async ( dispatch ) => {
    dispatch( subMasterSlice.actions.saveCallStatusRequest() );
    return apis
      .addCallStatus( { data } )
      .then( ( { data } ) => {
        dispatch( subMasterSlice.actions.saveCallStatusResponse( data ) );
        return data;
      } )
      .catch( () => {
        dispatch( subMasterSlice.actions.saveCallStatusError() );
      } );
  };

export const updateCallStatus =
( { data } ) =>
  async ( dispatch ) => {
    dispatch( subMasterSlice.actions.saveCallStatusRequest() );
    return apis
      .updateCallStatus( { data } )
      .then( ( { data } ) => {
        dispatch( subMasterSlice.actions.saveCallStatusResponse( data ) );
        return data;
      } )
      .catch( () => {
        dispatch( subMasterSlice.actions.saveCallStatusError() );
      } );
  };

export const getCallStatus = () => async ( dispatch ) => {
dispatch( subMasterSlice.actions.getCallStatusRequest() );
return apis
  .getCallStatus()
  .then( ( { data } ) => {

    dispatch( subMasterSlice.actions.getCallStatusResponse( data ) );
    return data;
  } )
  .catch( () => {
    dispatch( subMasterSlice.actions.getCallStatusError() );
  } );
};



export const getRistaCustomerSale = (data) => async (dispatch) => {
dispatch(subMasterSlice.actions.getRistaCustomerRequest());
 return apis
  .getRistaCustomerSale(data)      
  .then(({data}) => {
    dispatch(subMasterSlice.actions.getRistaCustomerResponse(data));
    return data;
  })
  .catch(() => {
    dispatch(subMasterSlice.actions.getRistaCustomerError());
  });
}; 


//Customer Master


export const addCustomerMaster =
( { data } ) =>
async ( dispatch ) => {
  dispatch( subMasterSlice.actions.saveCustomerMasterRequest() );
  return apis
    .addCustomerMaster( { data } )
    .then( ( { data } ) => {
      dispatch( subMasterSlice.actions.saveCustomerMasterResponse( data ) );
      return data;
    } )
    .catch( () => {
      dispatch( subMasterSlice.actions.saveCustomerMasterError() );
    } );
};

export const updateCustomerMaster =
( { data } ) =>
async ( dispatch ) => {
  dispatch( subMasterSlice.actions.saveCustomerMasterRequest() );
  return apis
    .updateCustomerMaster( { data } )
    .then( ( { data } ) => {
      dispatch( subMasterSlice.actions.saveCustomerMasterResponse( data ) );
      return data;
    } )
    .catch( () => {
      dispatch( subMasterSlice.actions.saveCustomerMasterError() );
    } );
};

export const getCustomerMaster = () => async ( dispatch ) => {
dispatch( subMasterSlice.actions.getCustomerMasterRequest() );
return apis
.getCustomerMaster()
.then( ( { data } ) => {

  dispatch( subMasterSlice.actions.getCustomerMasterResponse( data ) );
  return data;
} )
.catch( () => {
  dispatch( subMasterSlice.actions.getCustomerMasterError() );
} );
};


export const addCallBackEntry =( { data } ) => async ( dispatch ) => {
  dispatch( subMasterSlice.actions.saveCallBackEntryRequest() );
  return apis
    .addCallBackEntry( { data } )
    .then( ( { data } ) => {    
      dispatch( subMasterSlice.actions.saveCallBackEntryResponse( data ) );
      return data;
    } )
    .catch( () => {
      dispatch( subMasterSlice.actions.saveCallBackEntryError() );
    } );
};


export const getCallBackEntry = (data) => async ( dispatch ) => {
  dispatch( subMasterSlice.actions.getCallBackEntryRequest() );
  return apis
  .getCallBackEntry(data)
  .then( ( { data } ) => {  
    dispatch( subMasterSlice.actions.getCallBackEntryResponse( data ) );      
    return data;
  } )
  .catch( () => {
    dispatch( subMasterSlice.actions.getCallBackEntryError() );
  } );
  };
  

export const getDefinitions = () => async ( dispatch ) => {
  dispatch( subMasterSlice.actions.getDefinitionsRequest() );
  return apis
    .getDefinitions()
    .then(({ data }) => {
      dispatch(subMasterSlice.actions.getDefinitionsResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(subMasterSlice.actions.getDefinitionsError());
    });
};

export const addDefinitions = ({ data }) => async (dispatch) => {
  dispatch(subMasterSlice.actions.saveDefinitionsRequest());
  return apis
    .addDefinitions({ data })
    .then(({ data }) => {
      dispatch(subMasterSlice.actions.saveDefinitionsResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(subMasterSlice.actions.saveDefinitionsError());
    });
};


export const updateDefinitions = ({ data }) =>
  async (dispatch) => {
    dispatch(subMasterSlice.actions.saveDefinitionsRequest());
    return apis
      .updateDefinitions({ data })
      .then(({ data }) => {
        dispatch(subMasterSlice.actions.saveDefinitionsResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(subMasterSlice.actions.saveDefinitionsError());
      });
  };



export const getDefinitionsList = () => async (dispatch) => {
  dispatch(subMasterSlice.actions.getDefinitionsListRequest());
  return apis
    .getDefinitionsList()
    .then(({ data }) => {
      dispatch(subMasterSlice.actions.getDefinitionsListResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(subMasterSlice.actions.getDefinitionsListError());
    });
};

export const addDefinitionsList = ({ data }) => async (dispatch) => {
  dispatch(subMasterSlice.actions.saveDefinitionsListRequest());
  return apis
    .addDefinitionsList({ data })
    .then(({ data }) => {
      dispatch(subMasterSlice.actions.saveDefinitionsListResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(subMasterSlice.actions.saveDefinitionsListError());
    });
};


export const updateDefinitionsList = ({ data }) => async (dispatch) => {
  dispatch(subMasterSlice.actions.saveDefinitionsListRequest());
  return apis
    .updateDefinitionsList({ data })
    .then(({ data }) => {
      dispatch(subMasterSlice.actions.saveDefinitionsListResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(subMasterSlice.actions.saveDefinitionsListError());
    });
};



export const getCrewMaster = () => async (dispatch) => {
  dispatch(subMasterSlice.actions.getCrewMasterRequest());
  return apis
    .getCrewMaster()
    .then(({ data }) => {
      dispatch(subMasterSlice.actions.getCrewMasterResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(subMasterSlice.actions.getCrewMasterError());
    });
};

export const addCrewMaster = ({ data }) => async (dispatch) => {
  dispatch(subMasterSlice.actions.saveCrewMasterRequest());
  return apis
    .addCrewMaster({ data })
    .then(({ data }) => {
      dispatch(subMasterSlice.actions.saveCrewMasterResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(subMasterSlice.actions.saveCrewMasterError());
    });
};


export const updateCrewMaster = ({ data }) => async (dispatch) => {
  dispatch(subMasterSlice.actions.saveCrewMasterRequest());
  return apis
    .updateCrewMaster({ data })
    .then(({ data }) => {
      dispatch(subMasterSlice.actions.saveCrewMasterResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(subMasterSlice.actions.saveCrewMasterError());
    });
};


export const getCallBackEntryApproval = (data) => async ( dispatch ) => {
  dispatch( subMasterSlice.actions.getCallBackEntryApprovalRequest() );
  return apis
  .getCallBackEntryApproval(data)
  .then( ( { data } ) => {  
    dispatch( subMasterSlice.actions.getCallBackEntryApprovalResponse( data ) );      
    return data;
  } )
  .catch( () => {
    dispatch( subMasterSlice.actions.getCallBackEntryApprovalError() );
  } );
  };

// get all Sales of customer
  
export const getAllSalesCustomer = (data) => async (dispatch) => {
  dispatch(subMasterSlice.actions.getAllSalesCustomerRequest());
   return apis
    .getAllSalesCustomer(data)      
    .then(({data}) => {
      dispatch(subMasterSlice.actions.getAllSalesCustomerResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(subMasterSlice.actions.getAllSalesCustomerError());
    });
  }; 
    
  export const getAuditCategoryWiseReport = (data) => async (dispatch) => {
    dispatch(subMasterSlice.actions.getAuditCategoryWiseReportRequest());
     return apis
      .getAuditCategoryWiseReport(data)      
      .then(({data}) => {
        dispatch(subMasterSlice.actions.getAuditCategoryWiseReportResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(subMasterSlice.actions.getAuditCategoryWiseReportError());
      });
    }; 

    export const getCallBackEntryReport  = (data) => async (dispatch) => {
      dispatch(subMasterSlice.actions.getCallBackEntryReportRequest());
       return apis
        .getCallBackEntryReport(data)      
        .then(({data}) => {
          dispatch(subMasterSlice.actions.getCallBackEntryReportResponse(data));
          return data;
        })
        .catch(() => {
          dispatch(subMasterSlice.actions.getCallBackEntryReportError());
        });
      }; 
      
    export const addCallEntryApprove = ({data}) =>
      async (dispatch) => {
        dispatch(subMasterSlice.actions.saveaddcallEntryApproveRequest());
        return apis
          .addCallEntryApprove({data})
          .then(({data}) => {
            dispatch(subMasterSlice.actions.saveaddcallEntryApproveResponse(data));        
              return data;
          })
          .catch(() => {
            dispatch(subMasterSlice.actions.saveaddcallEntryApproveError());
          });
      };


      export const getCalldefStatus = (data) => async (dispatch) => {
        dispatch(subMasterSlice.actions.getCalldefStatusRequest());
         return apis
          .getCalldefStatus(data)      
          .then(({data}) => {
            dispatch(subMasterSlice.actions.getCalldefStatusResponse(data));
            return data;
          })
          .catch(() => {
            dispatch(subMasterSlice.actions.getCalldefStatusError());
          });
        }; 

    export const getEditCallBackEntry = (data) => async (dispatch) => {
      dispatch(subMasterSlice.actions.getEditCallBackEntryRequest());
       return apis
        .getEditCallBackEntry(data)      
        .then(({data}) => {
          dispatch(subMasterSlice.actions.getEditCallBackEntryResponse(data));
          return data;
        })
        .catch(() => {
          dispatch(subMasterSlice.actions.getEditCallBackEntryError());
        });
      }; 

  export const updateCallBackEntry = ({data}) =>
  async (dispatch) => {
    dispatch(subMasterSlice.actions.saveupdateCallBackEntryRequest());
    return apis
      .updateCallBackEntry({data})
      .then(({data}) => {
        dispatch(subMasterSlice.actions.saveupdateCallBackEntryResponse(data));        
          return data;
      })
      .catch(() => {
        dispatch(subMasterSlice.actions.saveupdateCallBackEntryError());
      });
  };

  export const getAllMappedOutlet = (data) => async (dispatch) => {
    dispatch(subMasterSlice.actions.getAllMappedOutletRequest());
     return apis
      .getAllMappedOutlet(data)      
      .then(({data}) => {
        dispatch(subMasterSlice.actions.getAllMappedOutletResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(subMasterSlice.actions.getAllMappedOutletError());
      });
    }; 

    export const getDefinitionsFilter = (data) => async (dispatch) => {
      dispatch(subMasterSlice.actions.getDefinitionsFilterRequest());
       return apis
        .getDefinitionsFilter(data)      
        .then(({data}) => {
          dispatch(subMasterSlice.actions.getDefinitionsFilterResponse(data));
          return data;
        })
        .catch(() => {
          dispatch(subMasterSlice.actions.getDefinitionsFilterError());
        });
      }; 
      

      
      
      export const getEquipmentMaster = (data) => async (dispatch) => {
        dispatch(subMasterSlice.actions.getEquipmentMasterRequest());
         return apis
          .getEquipmentMaster(data)      
          .then(({data}) => {
            dispatch(subMasterSlice.actions.getEquipmentMasterResponse(data));
            return data;
          })
          .catch(() => {
            dispatch(subMasterSlice.actions.getEquipmentMasterError());
          });
        }; 


        export const addEquipmentMaster = ({data}) =>
        async (dispatch) => {
          dispatch(subMasterSlice.actions.saveEquipmentMasterRequest());
          return apis
            .addEquipmentMaster({data})
            .then(({data}) => {
              dispatch(subMasterSlice.actions.saveEquipmentMasterResponse(data));        
                return data;
            })
            .catch(() => {
              dispatch(subMasterSlice.actions.saveEquipmentMasterError());
            });
        };
  
        export const updateEquipmentMaster = ({data}) =>
        async (dispatch) => {
          dispatch(subMasterSlice.actions.saveEquipmentMasterRequest());
          return apis
            .updateEquipmentMaster({data})
            .then(({data}) => {
              dispatch(subMasterSlice.actions.saveEquipmentMasterResponse(data));        
                return data;
            })
            .catch(() => {
              dispatch(subMasterSlice.actions.saveEquipmentMasterError());
            });
        };
              
        
      export const getDayPlanMapping = (data) => async (dispatch) => {
        dispatch(subMasterSlice.actions.getdayPlanMappingRequest());
         return apis
          .getDayPlanMapping(data)      
          .then(({data}) => {
            dispatch(subMasterSlice.actions.getdayPlanMappingResponse(data));
            return data;
          })
          .catch(() => {
            dispatch(subMasterSlice.actions.getdayPlanMappingError());
          });
        }; 


        export const addDayPlanMapping = ({data}) =>
        async (dispatch) => {
          dispatch(subMasterSlice.actions.savedayPlanMappingRequest());
          return apis
            .addDayPlanMapping({data})
            .then(({data}) => {
              dispatch(subMasterSlice.actions.savedayPlanMappingResponse(data));        
                return data;
            })
            .catch(() => {
              dispatch(subMasterSlice.actions.savedayPlanMappingError());
            });
        };
  
        export const updateDayPlanMapping = ({data}) =>
        async (dispatch) => {
          dispatch(subMasterSlice.actions.savedayPlanMappingRequest());
          return apis
            .updateDayPlanMapping({data})
            .then(({data}) => {
              dispatch(subMasterSlice.actions.savedayPlanMappingResponse(data));        
                return data;
            })
            .catch(() => {
              dispatch(subMasterSlice.actions.savedayPlanMappingError());
            });
        };

        export const getDeepCleaning = (data) => async (dispatch) => {
          dispatch(subMasterSlice.actions.getDeepCleaningRequest());
           return apis
            .getDeepCleaning(data)      
            .then(({data}) => {
              dispatch(subMasterSlice.actions.getDeepCleaningResponse(data));
              return data;
            })
            .catch(() => {
              dispatch(subMasterSlice.actions.getDeepCleaningError());
            });
          }; 
        
      export const addDeepCleanEntry = ({data}) =>
      async (dispatch) => {
        dispatch(subMasterSlice.actions.saveDeepCleanEntryRequest());
        return apis
          .addDeepCleanEntry({data})
          .then(({data}) => {
            dispatch(subMasterSlice.actions.saveDeepCleanEntryResponse(data));        
              return data;
          })
          .catch(() => {
            dispatch(subMasterSlice.actions.saveDeepCleanEntryError());
          });
      };

      export const getDeviationReport = (data) => async (dispatch) => {
        dispatch(subMasterSlice.actions.getDeviationReportRequest());
         return apis
          .getDeviationReport(data)      
          .then(({data}) => {
            dispatch(subMasterSlice.actions.getDeviationReportResponse(data));
            return data;
          })
          .catch(() => {
            dispatch(subMasterSlice.actions.getDeviationReportError());
          });
        }; 


        export const getOutlet = (subzone_id) => async (dispatch) => {
          dispatch(subMasterSlice.actions.getOutletRequest());
          return apis
            .getOutlet()
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
              dispatch(subMasterSlice.actions.getOutletResponse({data: filteredBySZ, ...restOfData}));
              return data;
            })
            .catch(() => {
              dispatch(subMasterSlice.actions.getOutletError());
            });
        };

        export const getEditDeepCleaningEntry = (data) => async (dispatch) => {
          dispatch(subMasterSlice.actions.getEditDeepCleaningEntryRequest());
           return apis
            .getEditDeepCleaningEntry(data)      
            .then(({data}) => {
              dispatch(subMasterSlice.actions.getEditDeepCleaningEntryResponse(data));
              return data;
            })
            .catch(() => {
              dispatch(subMasterSlice.actions.getEditDeepCleaningEntryError());
            });
          }; 

        export const updateDeepCleanEntry = ({data}) =>
        async (dispatch) => {
          dispatch(subMasterSlice.actions.saveDeepCleanEntryRequest());
          return apis
            .updateDeepCleanEntry({data})
            .then(({data}) => {
              dispatch(subMasterSlice.actions.saveDeepCleanEntryResponse(data));        
                return data;
            })
            .catch(() => {
              dispatch(subMasterSlice.actions.saveDeepCleanEntryError());
            });
        };

        export const getDeepCleanApproval = (data) => async (dispatch) => {
          dispatch(subMasterSlice.actions.getDeepCleanApprovalRequest());
           return apis
            .getDeepCleanApproval(data)      
            .then(({data}) => {
              dispatch(subMasterSlice.actions.getDeepCleanApprovalResponse(data));
              return data;
            })
            .catch(() => {
              dispatch(subMasterSlice.actions.getDeepCleanApprovalError());
            });
          }; 
      
       export const addDeepCleanEntryApprove = ({data}) =>
        async (dispatch) => {
          dispatch(subMasterSlice.actions.saveDeepCleanApprovalRequest());
          return apis
            .addDeepCleanEntryApprove({data})
            .then(({data}) => {
              dispatch(subMasterSlice.actions.saveDeepCleanApprovalResponse(data));        
                return data;
            })
            .catch(() => {
              dispatch(subMasterSlice.actions.saveDeepCleanApprovalError());
            });
        };

        export const addBudgetMaster =
        ({ data }) =>
        async (dispatch) => {
          dispatch(subMasterSlice.actions.saveBudgetMasterRequest());
          return apis
            .addBudgetMaster({ data })
            .then(({ data }) => {
              dispatch(subMasterSlice.actions.saveBudgetMasterResponse(data));
              return data;
            })
            .catch(() => {
              dispatch(subMasterSlice.actions.saveBudgetMasterError());
            });
        };

      export const getBudgetMaster = (data) => async (dispatch) => {
        dispatch(subMasterSlice.actions.getBudgetMasterRequest());
        return apis
          .getBudgetMaster(data)
          .then(({ data }) => {
            dispatch(subMasterSlice.actions.getBudgetMasterResponse(data));
            return data;
          })
          .catch(() => {
            dispatch(subMasterSlice.actions.getBudgetMasterError());
          });
      };

      export const updateBudgetMaster =
      ({ data }) =>
      async (dispatch) => {
        dispatch(subMasterSlice.actions.saveBudgetMasterRequest());
        return apis
          .updateBudgetMaster({ data })
          .then(({ data }) => {
            dispatch(subMasterSlice.actions.saveBudgetMasterResponse(data));
            return data;
          })
          .catch(() => {
            dispatch(subMasterSlice.actions.saveBudgetMasterError());
          });
      };
  
    export const getEBReadingEntry = (data) => async (dispatch) => {
      dispatch(subMasterSlice.actions.getEBReadingEntryRequest());
      return apis
        .getEBReadingEntry(data)
        .then(({ data }) => {
          dispatch(subMasterSlice.actions.getEBReadingEntryResponse(data));
          return data;
        })
        .catch(() => {
          dispatch(subMasterSlice.actions.getEBReadingEntryError());
        });
    };
  
    export const addEBReadingEntry =
    ({ data }) =>
    async (dispatch) => {
      dispatch(subMasterSlice.actions.saveEBReadingEntryRequest());
      return apis
        .addEBReadingEntry({ data })
        .then(({ data }) => {
          dispatch(subMasterSlice.actions.saveEBReadingEntryResponse(data));
          return data;
        })
        .catch(() => {
          dispatch(subMasterSlice.actions.saveEBReadingEntryError());
        });
    };

    export const getEBReadingEditEntry = (data) => async (dispatch) => {
      dispatch(subMasterSlice.actions.getEBReadingEditEntryRequest());
      return apis
        .getEBReadingEditEntry(data)
        .then(({ data }) => {
          dispatch(subMasterSlice.actions.getEBReadingEditEntryResponse(data));
          return data;
        })
        .catch(() => {
          dispatch(subMasterSlice.actions.getEBReadingEditEntryError());
        });
    };

  export const editEBReadingEntry = ({ data }) =>
  async (dispatch) => {
    dispatch(subMasterSlice.actions.saveEBReadingEntryRequest());
    return apis
      .editEBReadingEntry({ data })
      .then(({ data }) => {
        dispatch(subMasterSlice.actions.saveEBReadingEntryResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(subMasterSlice.actions.saveEBReadingEntryError());
      });
  };

  export const getEBReadingApprovalEntry  = (data) => async (dispatch) => {
    dispatch(subMasterSlice.actions.getEBReadingApprovalEntryRequest());
    return apis
      .getEBReadingApprovalEntry(data)
      .then(({ data }) => {
        dispatch(subMasterSlice.actions.getEBReadingApprovalEntryResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(subMasterSlice.actions.getEBReadingApprovalEntryError());
      });
  };

  export const addEBReadingapprove  = ({ data }) =>
  async (dispatch) => {
     dispatch(subMasterSlice.actions.saveEBReadingApprovalEntryRequest());
    return apis
      .addEBReadingapprove({ data })
      .then(({ data }) => {
        dispatch(subMasterSlice.actions.saveEBReadingApprovalEntryResponse(data));
        
        return data;
      })
      .catch(() => {
        dispatch(subMasterSlice.actions.saveEBReadingApprovalEntryError());
      });
  };

  //get-EBReading-report
  export const getEBReadingReport = (data) => async (dispatch) => {
    dispatch(subMasterSlice.actions.getEBReadingReportRequest());
    return apis
      .getEBReadingReport(data)
      .then(({ data }) => {
        dispatch(subMasterSlice.actions.getEBReadingReportResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(subMasterSlice.actions.getEBReadingReportError());
      });
  };
  export const getDashboard = (data) => async (dispatch) => {
    dispatch(subMasterSlice.actions.getDashboardRequest());
    return apis
      .getDashboard(data)
      .then(({ data }) => {
        dispatch(subMasterSlice.actions.getDashboardResponse(data));       
        return data;
      })
      .catch(() => {
        dispatch(subMasterSlice.actions.getDashboardError());
      });
  };

  export const saveUploadCsvStock = ({ data }) => async (dispatch) => {
    dispatch(subMasterSlice.actions.saveStockUploadRequest());
    return apis
      .saveUploadCsvStock({data})         
      .then(({ data }) => {        
        dispatch(subMasterSlice.actions.saveStockUploadResponse(data));
        return data;
      })  
      .catch(() => {
        dispatch(subMasterSlice.actions.saveStockUploadError());
      });
  };

  export const getUploadedRistaStock = (req) => async (dispatch) => {
    dispatch(subMasterSlice.actions.getUploadedRistaStockRequest());
    return apis
      .getUploadedRistaStock(req)
      .then(({ data }) => {
        dispatch(subMasterSlice.actions.getUploadedRistaStockResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(subMasterSlice.actions.getUploadedRistaStockError());
      });
  };


  //ConsumableMaster

  export const getConsumableMaster = () => async (dispatch) => {
    dispatch(subMasterSlice.actions.getConsumableMasterRequest());
    return apis
      .getConsumableMaster()
      .then(({data}) => {
        dispatch(subMasterSlice.actions.getConsumableMasterResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(subMasterSlice.actions.getConsumableMasterError());
      });
  };

export const addConsumableMaster = ({ data }) => async (dispatch) => {
  dispatch(subMasterSlice.actions.saveConsumableMasterRequest());
  return apis
    .addConsumableMaster({ data })
    .then(({ data }) => {
      dispatch(subMasterSlice.actions.saveConsumableMasterResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(subMasterSlice.actions.saveConsumableMasterError());
    });
};

export const updateConsumableMaster = ({data}) =>  async (dispatch) => {
  dispatch(subMasterSlice.actions.saveConsumableMasterRequest());
     return apis
    .updateConsumableMaster({data})
    .then(({data}) => {
      dispatch(subMasterSlice.actions.saveConsumableMasterResponse(data));
        return data;
    })
    .catch(() => {
      dispatch(subMasterSlice.actions.saveConsumableMasterError());
    });
};

export const getConsumableAll = (req) => async (dispatch) => {
  dispatch(subMasterSlice.actions.getConsumableAllRequest());
  return apis
    .getConsumableAll(req)
    .then(({ data }) => {
      dispatch(subMasterSlice.actions.getConsumableAllResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(subMasterSlice.actions.getConsumableAllError());
    });
};

export const getConsumableEntry = (req) => async (dispatch) => {
  dispatch(subMasterSlice.actions.getConsumableEntryRequest());
  return apis
    .getConsumableEntry(req)
    .then(({ data }) => {
      dispatch(subMasterSlice.actions.getConsumableEntryResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(subMasterSlice.actions.getConsumableEntryError());
    });
};

export const addConsumableEntry = ({data}) => async (dispatch) => {
    dispatch(subMasterSlice.actions.saveConsumableEntry());  
    return apis
      .addConsumableEntry({data})
      .then(({data}) => {        
        dispatch(subMasterSlice.actions.saveConsumableEntryResponse({data}));      
        return data;
      })
      .catch(() => {
        dispatch(subMasterSlice.actions.saveConsumableEntryError());
      });
  };

  export const getConsumableEditEntry = (req) => async (dispatch) => {
    dispatch(subMasterSlice.actions.getConsumableEditEntryRequest());
    return apis
      .getConsumableEditEntry(req)
      .then(({ data }) => {
        dispatch(subMasterSlice.actions.getConsumableEditEntryResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(subMasterSlice.actions.getConsumableEditEntryError());
      });
  };

  
export const getConsumableReport = (req) => async (dispatch) => {
  dispatch(subMasterSlice.actions.getConsumableReportRequest());
  return apis
    .getConsumableReport(req)
    .then(({ data }) => {
      dispatch(subMasterSlice.actions.getConsumableReportResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(subMasterSlice.actions.getConsumableReportError());
    });
};

  
export const getLowConsumableReport = (req) => async (dispatch) => {
  dispatch(subMasterSlice.actions.getLowConsumableReportRequest());
  return apis
    .getLowConsumableReport(req)
    .then(({ data }) => {
      dispatch(subMasterSlice.actions.getLowConsumableReportResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(subMasterSlice.actions.getLowConsumableReportError());
    });
};

export const getConsumableList = (req) => async (dispatch) => {
  dispatch(subMasterSlice.actions.getConsumableListRequest());
  return apis
    .getConsumableList(req)
    .then(({ data }) => {
      dispatch(subMasterSlice.actions.getConsumableListResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(subMasterSlice.actions.getConsumableListError());
    });
};


export const addCalendarEvent = ({data}) => async (dispatch) => {
  dispatch(subMasterSlice.actions.saveCalendarEvent());  
  return apis
    .addCalendarEvent({data})
    .then(({data}) => {        
      dispatch(subMasterSlice.actions.saveCalendarEventResponse({data}));      
      return data;
    })
    .catch(() => {
      dispatch(subMasterSlice.actions.saveCalendarEventError());
    });
};

export const getCalendarEvent = (req) => async (dispatch) => {
  dispatch(subMasterSlice.actions.getCalendarEventRequest());
  return apis
    .getCalendarEvent(req)
    .then(({ data }) => {
      dispatch(subMasterSlice.actions.getCalendarEventResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(subMasterSlice.actions.getCalendarEventError());
    });
};

export const updateCalendarEvent = ({data}) => async (dispatch) => {
  dispatch(subMasterSlice.actions.saveCalendarEvent());  
  return apis
    .updateCalendarEvent({data})
    .then(({data}) => {        
      dispatch(subMasterSlice.actions.saveCalendarEventResponse({data}));      
      return data;
    })
    .catch(() => {
      dispatch(subMasterSlice.actions.saveCalendarEventError());
    });
};

export const deleteCalendarEvent = ({data}) => async (dispatch) => {
  dispatch(subMasterSlice.actions.saveCalendarEvent());  
  return apis
    .deleteCalendarEvent({data})
    .then(({data}) => {        
      dispatch(subMasterSlice.actions.saveCalendarEventResponse({data}));      
      return data;
    })
    .catch(() => {
      dispatch(subMasterSlice.actions.saveCalendarEventError());
    });
};


export const saveUploadCsvConsumableMaster =({ data }) => async (dispatch) => {
  dispatch(subMasterSlice.actions.saveUploadCsvConsumableMasterRequest());
  return apis
    .saveUploadCsvConsumableMaster(data)         
    .then(async ({ data }) => {        
      await dispatch(subMasterSlice.actions.saveUploadCsvConsumableMasterResponse(data));
      return data;
    })
    .catch((err) => {
      dispatch(subMasterSlice.actions.saveUploadCsvConsumableMasterError());
     return err;
    });
};

export const  getCalendarEventReport  = (req) => async (dispatch) => {
  dispatch(subMasterSlice.actions.getCalendarEventReportRequest());
  return apis
    .getCalendarEventReport(req)
    .then(({ data }) => {
      dispatch(subMasterSlice.actions.getCalendarEventReportResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(subMasterSlice.actions.getCalendarEventReportError());
    });
};


export const saveUploadCsvCalendarEvent =({ data }) => async (dispatch) => {
  dispatch(subMasterSlice.actions.saveUploadCsvCalendarEventRequest());
  return apis
    .saveUploadCsvCalendarEvent(data)         
    .then(async ({ data }) => {        
      await dispatch(subMasterSlice.actions.saveUploadCsvCalendarEventResponse(data));
      return data;
    })
    .catch((err) => {
      dispatch(subMasterSlice.actions.saveUploadCsvCalendarEventError());
     return err;
    });
};


export const getConsumableFullViewReport = (req) => async (dispatch) => {
  dispatch(subMasterSlice.actions.getConsumableFullViewReportRequest());
  return apis
    .getConsumableFullViewReport(req)
    .then(({ data }) => {
      dispatch(subMasterSlice.actions.getConsumableFullViewReportResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(subMasterSlice.actions.getConsumableFullViewReportError());
    });
};

export const getModuleUpdateLogs = (req) => async(dispatch) => {
  dispatch(subMasterSlice.actions.getModuleUpdateLogsRequest());
  return apis
    .getModuleUpdateLogs(req)
    .then(({ data }) => {
      dispatch(subMasterSlice.actions.getModuleUpdateLogsResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(subMasterSlice.actions.getModuleUpdateLogsError());
    });
}