import { createSlice } from "@reduxjs/toolkit";
import apis from "../../api/serviceAPIs";

const initialState = {
  savingServiceFor: false,
  saveServiceForResponse: {},
  saveServiceForError: {},
  gettingServiceFor: false,
  getServiceForResponse: {},
  getServiceForError: {},
  savingAssetGroup: false,
  saveAssetGroupResponse: {},
  saveAssetGroupError: {},
  gettingAssetGroup: false,
  getAssetGroupResponse: {},
  getAssetGroupError: {},
  savingServiceCategory: false,
  saveServiceCategoryResponse: {},
  saveServiceCategoryError: {},
  gettingServiceCategory: false,
  getServiceCategoryResponse: {},
  getServiceCategoryError: {},
  savingPriority: false,
  savePriorityResponse: {},
  savePriorityError: {},
  gettingPriority: false,
  getPriorityResponse: {},
  getPriorityError: {},
  savingTypeOfService: false,
  saveTypeOfServiceResponse: {},
  saveTypeOfServiceError: {},
  gettingTypeOfService: false,
  getTypeOfServiceResponse: {},
  getTypeOfServiceError: {},
  savingWorkDone: false,
  saveWorkDoneResponse: {},
  saveWorkDoneError: {},
  gettingWorkDone: false,
  getWorkDoneResponse: {},
  getWorkDoneError: {},
  savingModeOfPayment: false,
  saveModeOfPaymentResponse: {},
  saveModeOfPaymentError: {},
  gettingModeOfPayment: false,
  getModeOfPaymentResponse: {},
  getModeOfPaymentError: {},
  savingGlAccount: false,
  saveGlAccountResponse: {},
  saveGlAccountError: {},
  gettingGlAccount: false,
  getGlAccountResponse: {},
  getGlAccountError: {},
  savingAssetGroupIssue: false,
  saveAssetGroupIssueResponse: {},
  saveAssetGroupIssueError: {},
  gettingAssetGroupIssue: false,
  getAssetGroupIssueResponse: {},
  getAssetGroupIssueError: {},
  savingAssetGroupSpare: false,
  saveAssetGroupSpareResponse: {},
  saveAssetGroupSpareError: {},
  gettingAssetGroupSpare: false,
  getAssetGroupSpareResponse: {},
  getAssetGroupSpareError: {},

  savingAssetMaster: false,
  saveAssetMasterResponse: {},
  saveAssetMasterError: {},
  gettingAssetMaster: false,
  getAssetMasterResponse: {},
  getAssetMasterError: {},

  savingNewAssetMaster: false,
  saveNewAssetMasterResponse: {},
  saveNewAssetMasterError: {},
  gettingNewAssetMaster: false,
  getNewAssetMasterResponse: {},
  getNewAssetMasterError: {},

  savingVendorMaster: false,
  saveVendorMasterResponse: {},
  saveVendorMasterError: {},
  gettingVendorMaster: false,
  getVendorMasterResponse: {},
  getVendorMasterError: {},
  savingTickets: false,
  saveTicketsResponse: {},
  saveTicketsError: {},
  gettingTickets: false,
  getTicketsResponse: {},
  getTicketsError: {},
  gettingTicketHandling: false,
  getTicketHandlingResponse: {},
  getTicketHandlingError: {},

  updatingTicketHandling: false,
  updateTicketHandlingResponse: {},
  updateTicketHandlingError: {},

  updatingOHTicketStatus: false,
  updateOHTicketStatusResponse: {},
  updateOHTicketStatusError: {},

  gettingAssetHistory: false,
  getAssetHistoryResponse: {},
  getAssetHistoryError: {},

  gettingAssetBasedOnORL: false,
  getAssetBaseOnORLResponse: {},
  getAssetBaseOnORLError: {},

  gettingTicketMSPCClaimAppOH: false,
  getTicketMSPCClaimAppOHResponse: [],
  getTicketMSPCClaimAppOHError: {},

  updatingPCOHTicketStatus: false,
  updatePCOHTicketStatusResponse: {},
  updatePCOHTicketStatusError: {},

  submittingPCTickets: false,
  submitedPCTicketResponse: {},
  submitedPCTicketError: {},

  gettingPCClaimSubMS: false,
  getPCClaimSubMSResponse: {},
  getPCClaimSubMSError: {},

  gettingPCClaimSubmittedMS: false,
  getPCClaimSubmittedMSResponse: {},
  getPCClaimSubmittedMSError: {},

  gettingPCClaimRejecteddMS: false,
  getPCClaimRejectedMSResponse: {},
  getPCClaimRejecteddMSError: {},

  rejectingPCTickets: false,
  rejectPCTicketResponse: {},
  rejectPCTicketError: {},

  gettingTicketFIEntry: false,
  getTicketFIEntryResponse: {},
  getTicketFIEntryError: {},

  gettingOrlFIEntry: false,
  getOrlFIEntryResponse: {},
  getOrlFIEntryError: {},
};

export const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    saveServiceForRequest: (state) => {
      state.savingServiceFor = true;
    },
    saveServiceForResponse: (state, action) => {
      state.savingServiceFor = false;
      state.saveServiceForResponse = action.payload;
    },
    saveServiceForError: (state, action) => {
      state.savingServiceFor = false;
      state.saveServiceForError = action.payload;
    },

    getServiceForRequest: (state) => {
      state.gettingServiceFor = true;
    },
    getServiceForResponse: (state, action) => {
      state.gettingServiceFor = false;
      state.getServiceForResponse = action.payload;
    },
    getServiceForError: (state, action) => {
      state.gettingServiceFor = false;
      state.getServiceForError = action.payload;
    },

    updateServiceForRequest: (state) => {
      state.savingServiceFor = true;
    },
    updateServiceForResponse: (state, action) => {
      state.savingServiceFor = false;
      state.saveServiceForResponse = action.payload;
    },
    updateServiceForError: (state, action) => {
      state.savingServiceFor = false;
      state.saveServiceForError = action.payload;
    },

    ///
    saveAssetGroupRequest: (state) => {
      state.savingAssetGroup = true;
    },
    saveAssetGroupResponse: (state, action) => {
      state.savingAssetGroup = false;
      state.saveAssetGroupResponse = action.payload;
    },
    saveAssetGroupError: (state, action) => {
      state.savingAssetGroup = false;
      state.saveAssetGroupError = action.payload;
    },

    getAssetGroupRequest: (state) => {
      state.gettingAssetGroup = true;
    },
    getAssetGroupResponse: (state, action) => {
      state.gettingAssetGroup = false;
      state.getAssetGroupResponse = action.payload;
    },
    getAssetGroupError: (state, action) => {
      state.gettingAssetGroup = false;
      state.getAssetGroupError = action.payload;
    },

    updateAssetGroupRequest: (state) => {
      state.savingAssetGroup = true;
    },
    updateAssetGroupResponse: (state, action) => {
      state.savingAssetGroup = false;
      state.saveAssetGroupResponse = action.payload;
    },
    updateAssetGroupError: (state, action) => {
      state.savingAssetGroup = false;
      state.saveAssetGroupError = action.payload;
    },

    /////
    saveServiceCategoryRequest: (state) => {
      state.savingServiceCategory = true;
    },
    saveServiceCategoryResponse: (state, action) => {
      state.savingServiceCategory = false;
      state.saveServiceCategoryResponse = action.payload;
    },
    saveServiceCategoryError: (state, action) => {
      state.savingServiceCategory = false;
      state.saveServiceCategoryError = action.payload;
    },

    getServiceCategoryRequest: (state) => {
      state.gettingServiceCategory = true;
    },
    getServiceCategoryResponse: (state, action) => {
      state.gettingServiceCategory = false;
      state.getServiceCategoryResponse = action.payload;
    },
    getServiceCategoryError: (state, action) => {
      state.gettingServiceCategory = false;
      state.getServiceCategoryError = action.payload;
    },

    updateServiceCategoryRequest: (state) => {
      state.savingServiceCategory = true;
    },
    updateServiceCategoryResponse: (state, action) => {
      state.savingServiceCategory = false;
      state.saveServiceCategoryResponse = action.payload;
    },
    updateServiceCategoryError: (state, action) => {
      state.savingServiceCategory = false;
      state.saveServiceCategoryError = action.payload;
    },

    /////
    savePriorityRequest: (state) => {
      state.savingPriority = true;
    },
    savePriorityResponse: (state, action) => {
      state.savingPriority = false;
      state.savePriorityResponse = action.payload;
    },
    savePriorityError: (state, action) => {
      state.savingPriority = false;
      state.savePriorityError = action.payload;
    },

    getPriorityRequest: (state) => {
      state.gettingPriority = true;
    },
    getPriorityResponse: (state, action) => {
      state.gettingPriority = false;
      state.getPriorityResponse = action.payload;
    },
    getPriorityError: (state, action) => {
      state.gettingPriority = false;
      state.getPriorityError = action.payload;
    },

    updatePriorityRequest: (state) => {
      state.savingPriority = true;
    },
    updatePriorityResponse: (state, action) => {
      state.savingPriority = false;
      state.savePriorityResponse = action.payload;
    },
    updatePriorityError: (state, action) => {
      state.savingPriority = false;
      state.savePriorityError = action.payload;
    },

    //////
    saveTypeOfServiceRequest: (state) => {
      state.savingTypeOfService = true;
    },
    saveTypeOfServiceResponse: (state, action) => {
      state.savingTypeOfService = false;
      state.saveTypeOfServiceResponse = action.payload;
    },
    saveTypeOfServiceError: (state, action) => {
      state.savingTypeOfService = false;
      state.saveTypeOfServiceError = action.payload;
    },

    getTypeOfServiceRequest: (state) => {
      state.gettingTypeOfService = true;
    },
    getTypeOfServiceResponse: (state, action) => {
      state.gettingTypeOfService = false;
      state.getTypeOfServiceResponse = action.payload;
    },
    getTypeOfServiceError: (state, action) => {
      state.gettingTypeOfService = false;
      state.getTypeOfServiceError = action.payload;
    },

    updateTypeOfServiceRequest: (state) => {
      state.savingTypeOfService = true;
    },
    updateTypeOfServiceResponse: (state, action) => {
      state.savingTypeOfService = false;
      state.saveTypeOfServiceResponse = action.payload;
    },
    updateTypeOfServiceError: (state, action) => {
      state.savingTypeOfService = false;
      state.saveTypeOfServiceError = action.payload;
    },

    ////////////
    saveWorkDoneRequest: (state) => {
      state.savingWorkDone = true;
    },
    saveWorkDoneResponse: (state, action) => {
      state.savingWorkDone = false;
      state.saveWorkDoneResponse = action.payload;
    },
    saveWorkDoneError: (state, action) => {
      state.savingWorkDone = false;
      state.saveWorkDoneError = action.payload;
    },

    getWorkDoneRequest: (state) => {
      state.gettingWorkDone = true;
    },
    getWorkDoneResponse: (state, action) => {
      state.gettingWorkDone = false;
      state.getWorkDoneResponse = action.payload;
    },
    getWorkDoneError: (state, action) => {
      state.gettingWorkDone = false;
      state.getWorkDoneError = action.payload;
    },

    updateWorkDoneRequest: (state) => {
      state.savingWorkDone = true;
    },
    updateWorkDoneResponse: (state, action) => {
      state.savingWorkDone = false;
      state.saveWorkDoneResponse = action.payload;
    },
    updateWorkDoneError: (state, action) => {
      state.savingWorkDone = false;
      state.saveWorkDoneError = action.payload;
    },

    ////////////////

    saveModeOfPaymentRequest: (state) => {
      state.savingModeOfPayment = true;
    },
    saveModeOfPaymentResponse: (state, action) => {
      state.savingModeOfPayment = false;
      state.saveModeOfPaymentResponse = action.payload;
    },
    saveModeOfPaymentError: (state, action) => {
      state.savingModeOfPayment = false;
      state.saveModeOfPaymentError = action.payload;
    },

    getModeOfPaymentRequest: (state) => {
      state.gettingModeOfPayment = true;
    },
    getModeOfPaymentResponse: (state, action) => {
      state.gettingModeOfPayment = false;
      state.getModeOfPaymentResponse = action.payload;
    },
    getModeOfPaymentError: (state, action) => {
      state.gettingModeOfPayment = false;
      state.getModeOfPaymentError = action.payload;
    },

    updateModeOfPaymentRequest: (state) => {
      state.savingModeOfPayment = true;
    },
    updateModeOfPaymentResponse: (state, action) => {
      state.savingModeOfPayment = false;
      state.saveModeOfPaymentResponse = action.payload;
    },
    updateModeOfPaymentError: (state, action) => {
      state.savingModeOfPayment = false;
      state.saveModeOfPaymentError = action.payload;
    },

    /**
     *  Req and Res for GLaccount
     */
    saveGlAccountRequest: (state) => {
      state.savingGlAccount = true;
    },
    saveGlAccountResponse: (state, action) => {
      state.savingGlAccount = false;
      state.saveGlAccountResponse = action.payload;
    },
    saveGlAccountError: (state, action) => {
      state.savingGlAccount = false;
      state.saveGlAccountError = action.payload;
    },

    getGlAccountRequest: (state) => {
      state.gettingGlAccount = true;
    },
    getGlAccountResponse: (state, action) => {
      state.gettingGlAccount = false;
      state.getGlAccountResponse = action.payload;
    },
    getGlAccountError: (state, action) => {
      state.gettingGlAccount = false;
      state.getGlAccountError = action.payload;
    },

    updateGlAccountRequest: (state) => {
      state.savingGlAccount = true;
    },
    updateGlAccountResponse: (state, action) => {
      state.savingGlAccount = false;
      state.saveGlAccountResponse = action.payload;
    },
    updateGlAccountError: (state, action) => {
      state.savingGlAccount = false;
      state.saveGlAccountError = action.payload;
    },
    ////////////////
    saveAssetGroupIssueRequest: (state) => {
      state.savingAssetGroupIssue = true;
    },
    saveAssetGroupIssueResponse: (state, action) => {
      state.savingAssetGroupIssue = false;
      state.saveAssetGroupIssueResponse = action.payload;
    },
    saveAssetGroupIssueError: (state, action) => {
      state.savingAssetGroupIssue = false;
      state.saveAssetGroupIssueError = action.payload;
    },

    getAssetGroupIssueRequest: (state) => {
      state.gettingAssetGroupIssue = true;
    },
    getAssetGroupIssueResponse: (state, action) => {
      state.gettingAssetGroupIssue = false;
      state.getAssetGroupIssueResponse = action.payload;
    },
    getAssetGroupIssueError: (state, action) => {
      state.gettingAssetGroupIssue = false;
      state.getAssetGroupIssueError = action.payload;
    },

    updateAssetGroupIssueRequest: (state) => {
      state.savingAssetGroupIssue = true;
    },
    updateAssetGroupIssueResponse: (state, action) => {
      state.savingAssetGroupIssue = false;
      state.saveAssetGroupIssueResponse = action.payload;
    },
    updateAssetGroupIssueError: (state, action) => {
      state.savingAssetGroupIssue = false;
      state.saveAssetGroupIssueError = action.payload;
    },

    ////////////////
    saveAssetGroupSpareRequest: (state) => {
      state.savingAssetGroupSpare = true;
    },
    saveAssetGroupSpareResponse: (state, action) => {
      state.savingAssetGroupSpare = false;
      state.saveAssetGroupSpareResponse = action.payload;
    },
    saveAssetGroupSpareError: (state, action) => {
      state.savingAssetGroupSpare = false;
      state.saveAssetGroupSpareError = action.payload;
    },

    getAssetGroupSpareRequest: (state) => {
      state.gettingAssetGroupSpare = true;
    },
    getAssetGroupSpareResponse: (state, action) => {
      state.gettingAssetGroupSpare = false;
      state.getAssetGroupSpareResponse = action.payload;
    },
    getAssetGroupSpareError: (state, action) => {
      state.gettingAssetGroupSpare = false;
      state.getAssetGroupSpareError = action.payload;
    },

    updateAssetGroupSpareRequest: (state) => {
      state.savingAssetGroupSpare = true;
    },
    updateAssetGroupSpareResponse: (state, action) => {
      state.savingAssetGroupSpare = false;
      state.saveAssetGroupSpareResponse = action.payload;
    },
    updateAssetGroupSpareError: (state, action) => {
      state.savingAssetGroupSpare = false;
      state.saveAssetGroupSpareError = action.payload;
    },

    ////////////////
    saveAssetMasterRequest: (state) => {
      state.savingAssetMaster = true;
    },
    saveAssetMasterResponse: (state, action) => {
      state.savingAssetMaster = false;
      state.saveAssetMasterResponse = action.payload;
    },
    saveAssetMasterError: (state, action) => {
      state.savingAssetMaster = false;
      state.saveAssetMasterError = action.payload;
    },

    getAssetMasterRequest: (state) => {
      state.gettingAssetMaster = true;
    },
    getAssetMasterResponse: (state, action) => {
      state.gettingAssetMaster = false;
      state.getAssetMasterResponse = action.payload;
    },
    getAssetMasterError: (state, action) => {
      state.gettingAssetMaster = false;
      state.getAssetMasterError = action.payload;
    },

    getAssetBaseOnORLRequest: (state) => {
      state.gettingAssetBasedOnORL = true;
    },
    getAssetBaseOnORLResponse: (state, action) => {
      state.gettingAssetBasedOnORL = false;
      state.getAssetBaseOnORLResponse = action.payload;
    },
    getAssetBaseOnORLError: (state, action) => {
      state.gettingAssetBasedOnORL = false;
      state.getAssetBaseOnORLError = action.payload;
    },

    updateAssetMasterRequest: (state) => {
      state.savingAssetMaster = true;
    },
    updateAssetMasterResponse: (state, action) => {
      state.savingAssetMaster = false;
      state.saveAssetMasterResponse = action.payload;
    },
    updateAssetMasterError: (state, action) => {
      state.savingAssetMaster = false;
      state.saveAssetMasterError = action.payload;
    },

    ////////////////
    saveNewAssetMasterRequest: (state) => {
      state.savingNewAssetMaster = true;
    },
    saveNewAssetMasterResponse: (state, action) => {
      state.savingNewAssetMaster = false;
      state.saveNewAssetMasterResponse = action.payload;
    },
    saveNewAssetMasterError: (state, action) => {
      state.savingNewAssetMaster = false;
      state.saveNewAssetMasterError = action.payload;
    },

    getNewAssetMasterRequest: (state) => {
      state.gettingNewAssetMaster = true;
    },
    getNewAssetMasterResponse: (state, action) => {
      state.gettingNewAssetMaster = false;
      state.getNewAssetMasterResponse = action.payload;
    },
    getNewAssetMasterError: (state, action) => {
      state.gettingNewAssetMaster = false;
      state.getNewAssetMasterError = action.payload;
    },

    updateNewAssetMasterRequest: (state) => {
      state.savingNewAssetMaster = true;
    },
    updateNewAssetMasterResponse: (state, action) => {
      state.savingNewAssetMaster = false;
      state.saveNewAssetMasterResponse = action.payload;
    },
    updateNewAssetMasterError: (state, action) => {
      state.savingNewAssetMaster = false;
      state.saveNewAssetMasterError = action.payload;
    },

    ////////////////
    saveVendorMasterRequest: (state) => {
      state.savingVendorMaster = true;
    },
    saveVendorMasterResponse: (state, action) => {
      state.savingVendorMaster = false;
      state.saveVendorMasterResponse = action.payload;
    },
    saveVendorMasterError: (state, action) => {
      state.savingVendorMaster = false;
      state.saveVendorMasterError = action.payload;
    },

    getVendorMasterRequest: (state) => {
      state.gettingVendorMaster = true;
    },
    getVendorMasterResponse: (state, action) => {
      state.gettingVendorMaster = false;
      state.getVendorMasterResponse = action.payload;
    },
    getVendorMasterError: (state, action) => {
      state.gettingVendorMaster = false;
      state.getVendorMasterError = action.payload;
    },

    updateVendorMasterRequest: (state) => {
      state.savingVendorMaster = true;
    },
    updateVendorMasterResponse: (state, action) => {
      state.savingVendorMaster = false;
      state.saveVendorMasterResponse = action.payload;
    },
    updateVendorMasterError: (state, action) => {
      state.savingVendorMaster = false;
      state.saveVendorMasterError = action.payload;
    },

    ////////////////
    saveTicketsRequest: (state) => {
      state.savingTickets = true;
    },
    saveTicketsResponse: (state, action) => {
      state.savingTickets = false;
      state.saveTicketsResponse = action.payload;
    },
    saveTicketsError: (state, action) => {
      state.savingTickets = false;
      state.saveTicketsError = action.payload;
    },

    getTicketsRequest: (state) => {
      state.gettingTickets = true;
    },
    getTicketsResponse: (state, action) => {
      state.gettingTickets = false;
      state.getTicketsResponse = action.payload;
    },
    getTicketsError: (state, action) => {
      state.gettingTickets = false;
      state.getTicketsError = action.payload;
    },

    updateTicketsRequest: (state) => {
      state.savingTickets = true;
    },
    updateTicketsResponse: (state, action) => {
      state.savingTickets = false;
      state.saveTicketsResponse = action.payload;
    },
    updateTicketsError: (state, action) => {
      state.savingTickets = false;
      state.saveTicketsError = action.payload;
    },

    getTicketHandlingRequest: (state) => {
      state.gettingTicketHandling = true;
    },
    getTicketHandlingResponse: (state, action) => {
      state.gettingTicketHandling = false;
      state.getTicketHandlingResponse = action.payload;
    },
    getTicketHandlingError: (state, action) => {
      state.gettingTicketHandling = false;
      state.getTicketHandlingError = action.payload;
    },

    getAssetHistoryRequest: (state) => {
      state.gettingAssetHistory = true;
    },
    getAssetHistoryResponse: (state, action) => {
      state.gettingAssetHistory = false;
      state.getAssetHistoryResponse = action.payload;
    },
    getAssetHistoryError: (state, action) => {
      state.gettingAssetHistory = false;
      state.getAssetHistoryError = action.payload;
    },

    ////////////////
    updateTicketHandlingRequest: (state) => {
      state.updatingTicketHandling = true;
    },
    updatedTicketHandlingResponse: (state, action) => {
      state.updatingTicketHandling = false;
      state.updateTicketHandlingResponse = action.payload;
    },
    updatedTicketHandlingError: (state, action) => {
      state.updatingTicketHandling = false;
      state.updateTicketHandlingError = action.payload;
    },

    ////////////////
    updateOHTicketStatusRequest: (state) => {
      state.updatingOHTicketStatus = true;
    },
    updateOHTicketStatusResponse: (state, action) => {
      state.updatingOHTicketStatus = false;
      state.updateOHTicketStatusResponse = action.payload;
    },
    updateOHTicketStatusError: (state, action) => {
      state.updatingOHTicketStatus = false;
      state.updateOHTicketStatusError = action.payload;
    },

    /////////////////
    getTicketMSPCClaimAppOH: (state) => {
      state.gettingTicketMSPCClaimAppOH = true;
    },
    getTicketMSPCClaimAppOHResponse: (state, action) => {
      state.gettingTicketMSPCClaimAppOH = false;
      state.getTicketMSPCClaimAppOHResponse = action.payload;
    },
    getTicketMSPCClaimAppOHError: (state, action) => {
      state.gettingTicketMSPCClaimAppOH = false;
      state.getTicketMSPCClaimAppOHError = action.payload;
    },

    ////////////////
    updatePCOHTicketStatusRequest: (state) => {
      state.updatingPCOHTicketStatus = true;
    },
    updatePCOHTicketStatusResponse: (state, action) => {
      state.updatingPCOHTicketStatus = false;
      state.updatePCOHTicketStatusResponse = action.payload;
    },
    updatePCOHTicketStatusError: (state, action) => {
      state.updatingPCOHTicketStatus = false;
      state.updatePCOHTicketStatusError = action.payload;
    },

    ////////////////
    submitPCTicketRequest: (state) => {
      state.submittingPCTickets = true;
    },
    submitPCTicketResponse: (state, action) => {
      state.submittingPCTickets = false;
      state.submitedPCTicketResponse = action.payload;
    },
    submitPCTicketError: (state, action) => {
      state.submittingPCTickets = false;
      state.submitedPCTicketError = action.payload;
    },

    ////////////////
    getPCClaimSubMSRequest: (state) => {
      state.gettingPCClaimSubMS = true;
    },
    getPCClaimSubMSResponse: (state, action) => {
      state.gettingPCClaimSubMS = false;
      state.getPCClaimSubMSResponse = action.payload;
    },
    getPCClaimSubMSError: (state, action) => {
      state.gettingPCClaimSubMS = false;
      state.getPCClaimSubMSError = action.payload;
    },

    ////////////////
    getPCClaimSubmittedMSRequest: (state) => {
      state.gettingPCClaimSubmittedMS = true;
    },
    getPCClaimSubmittedMSResponse: (state, action) => {
      state.gettingPCClaimSubmittedMS = false;
      state.getPCClaimSubmittedMSResponse = action.payload;
    },
    getPCClaimSubmittedMSError: (state, action) => {
      state.gettingPCClaimSubmittedMS = false;
      state.getPCClaimSubmittedMSError = action.payload;
    },

    ////////////////
    getPCClaimRejectedMSRequest: (state) => {
      state.gettingPCClaimRejectedMS = true;
    },
    getPCClaimRejectedMSResponse: (state, action) => {
      state.gettingPCClaimRejectedMS = false;
      state.getPCClaimRejectedMSResponse = action.payload;
    },
    getPCClaimRejectedMSError: (state, action) => {
      state.gettingPCClaimRejectedMS = false;
      state.getPCClaimRejectedMSError = action.payload;
    },

    ////////////////
    rejectPCTicketRequest: (state) => {
      state.rejectingPCTickets = true;
    },
    rejectPCTicketResponse: (state, action) => {
      state.rejectingPCTickets = false;
      state.rejectPCTicketResponse = action.payload;
    },
    rejectPCTicketError: (state, action) => {
      state.rejectingPCTickets = false;
      state.rejectPCTicketError = action.payload;
    },


    
    getTicketFIEntryRequest: (state) => {
      state.gettingTicketFIEntry = true;
    },
    getTicketFIEntryResponse: (state, action) => {
      state.gettingTicketFIEntry = false;
      state.getTicketFIEntryResponse = action.payload;
    },
    getTicketFIEntryError: (state, action) => {
      state.gettingTicketFIEntry = false;
      state.getTicketFIEntryError = action.payload;
    },

     
    getOrlFIEntryRequest: (state) => {
      state.gettingOrlFIEntry = true;
    },
    getOrlFIEntryResponse: (state, action) => {
      state.gettingOrlFIEntry = false;
      state.getOrlFIEntryResponse = action.payload;
    },
    getOrlFIEntryError: (state, action) => {
      state.gettingOrlFIEntry = false;
      state.getOrlFIEntryError = action.payload;
    },


  },
});

export default serviceSlice.reducer;

// Actions
export const saveServiceFor =
  ({ data }) =>
  async (dispatch) => {
    dispatch(serviceSlice.actions.saveServiceForRequest());
    return apis
      .addServiceFor({ data })
      .then(async ({ data }) => {
        await dispatch(serviceSlice.actions.saveServiceForResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(serviceSlice.actions.saveServiceForError());
      });
  };

export const getServiceFor = () => async (dispatch) => {
  dispatch(serviceSlice.actions.getServiceForRequest());
  return apis
    .getServiceFor()
    .then(({ data }) => {
      dispatch(serviceSlice.actions.getServiceForResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(serviceSlice.actions.getServiceForError());
    });
};

export const updateServiceFor =
  ({ data }) =>
  async (dispatch) => {
    dispatch(serviceSlice.actions.updateServiceForRequest());
    return apis
      .updateServiceFor({ data })
      .then(async ({ data }) => {
        await dispatch(serviceSlice.actions.updateServiceForResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(serviceSlice.actions.updateServiceForError());
      });
  };

//////////////////////////////
export const saveAssetGroup =
  ({ data }) =>
  async (dispatch) => {
    dispatch(serviceSlice.actions.saveAssetGroupRequest());
    return apis
      .addAssetGroup({ data })
      .then(async ({ data }) => {
        await dispatch(serviceSlice.actions.saveAssetGroupResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(serviceSlice.actions.saveAssetGroupError());
      });
  };

export const getAssetGroup = () => async (dispatch) => {
  dispatch(serviceSlice.actions.getAssetGroupRequest());
  return apis
    .getAssetGroup()
    .then(({ data }) => {
      dispatch(serviceSlice.actions.getAssetGroupResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(serviceSlice.actions.getAssetGroupError());
    });
};

export const updateAssetGroup =
  ({ data }) =>
  async (dispatch) => {
    dispatch(serviceSlice.actions.updateAssetGroupRequest());
    return apis
      .updateAssetGroup({ data })
      .then(async ({ data }) => {
        await dispatch(serviceSlice.actions.updateAssetGroupResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(serviceSlice.actions.updateAssetGroupError());
      });
  };

//////////////

export const saveServiceCategory =
  ({ data }) =>
  async (dispatch) => {
    dispatch(serviceSlice.actions.saveServiceCategoryRequest());
    return apis
      .addServiceCategory({ data })
      .then(async ({ data }) => {
        await dispatch(serviceSlice.actions.saveServiceCategoryResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(serviceSlice.actions.saveServiceCategoryError());
      });
  };

export const getServiceCategory = () => async (dispatch) => {
  dispatch(serviceSlice.actions.getServiceCategoryRequest());
  return apis
    .getServiceCategory()
    .then(({ data }) => {
      dispatch(serviceSlice.actions.getServiceCategoryResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(serviceSlice.actions.getServiceCategoryError());
    });
};

export const updateServiceCategory =
  ({ data }) =>
  async (dispatch) => {
    dispatch(serviceSlice.actions.updateServiceCategoryRequest());
    return apis
      .updateServiceCategory({ data })
      .then(async ({ data }) => {
        await dispatch(
          serviceSlice.actions.updateServiceCategoryResponse(data)
        );
        return data;
      })
      .catch(() => {
        dispatch(serviceSlice.actions.updateServiceCategoryError());
      });
  };

//////
export const savePriority =
  ({ data }) =>
  async (dispatch) => {
    dispatch(serviceSlice.actions.savePriorityRequest());
    return apis
      .addPriority({ data })
      .then(async ({ data }) => {
        await dispatch(serviceSlice.actions.savePriorityResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(serviceSlice.actions.savePriorityError());
      });
  };

export const getPriority = () => async (dispatch) => {
  dispatch(serviceSlice.actions.getPriorityRequest());
  return apis
    .getPriority()
    .then(({ data }) => {
      dispatch(serviceSlice.actions.getPriorityResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(serviceSlice.actions.getPriorityError());
    });
};

export const updatePriority =
  ({ data }) =>
  async (dispatch) => {
    dispatch(serviceSlice.actions.updatePriorityRequest());
    return apis
      .updatePriority({ data })
      .then(async ({ data }) => {
        await dispatch(serviceSlice.actions.updatePriorityResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(serviceSlice.actions.updatePriorityError());
      });
  };

///////////

export const saveTypeOfService =
  ({ data }) =>
  async (dispatch) => {
    dispatch(serviceSlice.actions.saveTypeOfServiceRequest());
    return apis
      .addTypeOfService({ data })
      .then(async ({ data }) => {
        await dispatch(serviceSlice.actions.saveTypeOfServiceResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(serviceSlice.actions.saveTypeOfServiceError());
      });
  };

export const getTypeOfService = () => async (dispatch) => {
  dispatch(serviceSlice.actions.getTypeOfServiceRequest());
  return apis
    .getTypeOfService()
    .then(({ data }) => {
      dispatch(serviceSlice.actions.getTypeOfServiceResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(serviceSlice.actions.getTypeOfServiceError());
    });
};

export const updateTypeOfService =
  ({ data }) =>
  async (dispatch) => {
    dispatch(serviceSlice.actions.updateTypeOfServiceRequest());
    return apis
      .updateTypeOfService({ data })
      .then(async ({ data }) => {
        await dispatch(serviceSlice.actions.updateTypeOfServiceResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(serviceSlice.actions.updateTypeOfServiceError());
      });
  };

//////////////////////

export const saveWorkDone =
  ({ data }) =>
  async (dispatch) => {
    dispatch(serviceSlice.actions.saveWorkDoneRequest());
    return apis
      .addWorkDone({ data })
      .then(async ({ data }) => {
        await dispatch(serviceSlice.actions.saveWorkDoneResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(serviceSlice.actions.saveWorkDoneError());
      });
  };

export const getWorkDone = () => async (dispatch) => {
  dispatch(serviceSlice.actions.getWorkDoneRequest());
  return apis
    .getWorkDone()
    .then(({ data }) => {
      dispatch(serviceSlice.actions.getWorkDoneResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(serviceSlice.actions.getWorkDoneError());
    });
};

export const updateWorkDone =
  ({ data }) =>
  async (dispatch) => {
    dispatch(serviceSlice.actions.updateWorkDoneRequest());
    return apis
      .updateWorkDone({ data })
      .then(async ({ data }) => {
        await dispatch(serviceSlice.actions.updateWorkDoneResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(serviceSlice.actions.updateWorkDoneError());
      });
  };

//////////
export const saveModeOfPayment =
  ({ data }) =>
  async (dispatch) => {
    dispatch(serviceSlice.actions.saveModeOfPaymentRequest());
    return apis
      .addModeOfPayment({ data })
      .then(async ({ data }) => {
        await dispatch(serviceSlice.actions.saveModeOfPaymentResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(serviceSlice.actions.saveModeOfPaymentError());
      });
  };

export const getModeOfPayment = () => async (dispatch) => {
  dispatch(serviceSlice.actions.getModeOfPaymentRequest());
  return apis
    .getModeOfPayment()
    .then(({ data }) => {
      dispatch(serviceSlice.actions.getModeOfPaymentResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(serviceSlice.actions.getModeOfPaymentError());
    });
};

export const updateModeOfPayment =
  ({ data }) =>
  async (dispatch) => {
    dispatch(serviceSlice.actions.updateModeOfPaymentRequest());
    return apis
      .updateModeOfPayment({ data })
      .then(async ({ data }) => {
        await dispatch(serviceSlice.actions.updateModeOfPaymentResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(serviceSlice.actions.updateModeOfPaymentError());
      });
  };

/**
 * API's for GL Account
 */

export const saveGlAccount =
  ({ data }) =>
  async (dispatch) => {
    dispatch(serviceSlice.actions.saveGlAccountRequest());
    return apis
      .addGlAccount({ data })
      .then(async ({ data }) => {
        await dispatch(serviceSlice.actions.saveGlAccountResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(serviceSlice.actions.saveGlAccountError());
      });
  };

export const getGlAccount = () => async (dispatch) => {
  dispatch(serviceSlice.actions.getGlAccountRequest());
  return apis
    .getGlAccount()
    .then(({ data }) => {
      dispatch(serviceSlice.actions.getGlAccountResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(serviceSlice.actions.getGlAccountError());
    });
};

export const updateGlAccount =
  ({ data }) =>
  async (dispatch) => {
    dispatch(serviceSlice.actions.updateGlAccountRequest());
    return apis
      .updateGlAccount({ data })
      .then(async ({ data }) => {
        await dispatch(serviceSlice.actions.updateGlAccountResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(serviceSlice.actions.updateGlAccountError());
      });
  };

//////////
export const saveAssetGroupIssue =
  ({ data }) =>
  async (dispatch) => {
    dispatch(serviceSlice.actions.saveAssetGroupIssueRequest());
    return apis
      .addAssetGroupIssue({ data })
      .then(async ({ data }) => {
        await dispatch(serviceSlice.actions.saveAssetGroupIssueResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(serviceSlice.actions.saveAssetGroupIssueError());
      });
  };

export const getAssetGroupIssue = () => async (dispatch) => {
  dispatch(serviceSlice.actions.getAssetGroupIssueRequest());
  return apis
    .getAssetGroupIssue()
    .then(({ data }) => {
      dispatch(serviceSlice.actions.getAssetGroupIssueResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(serviceSlice.actions.getAssetGroupIssueError());
    });
};

export const updateAssetGroupIssue =
  ({ data }) =>
  async (dispatch) => {
    dispatch(serviceSlice.actions.updateAssetGroupIssueRequest());
    return apis
      .updateAssetGroupIssue({ data })
      .then(async ({ data }) => {
        await dispatch(
          serviceSlice.actions.updateAssetGroupIssueResponse(data)
        );
        return data;
      })
      .catch(() => {
        dispatch(serviceSlice.actions.updateAssetGroupIssueError());
      });
  };

//////////
export const saveAssetGroupSpare =
  ({ data }) =>
  async (dispatch) => {
    dispatch(serviceSlice.actions.saveAssetGroupSpareRequest());
    return apis
      .addAssetGroupSpare({ data })
      .then(async ({ data }) => {
        await dispatch(serviceSlice.actions.saveAssetGroupSpareResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(serviceSlice.actions.saveAssetGroupSpareError());
      });
  };

export const getAssetGroupSpare = () => async (dispatch) => {
  dispatch(serviceSlice.actions.getAssetGroupSpareRequest());
  return apis
    .getAssetGroupSpare()
    .then(({ data }) => {
      dispatch(serviceSlice.actions.getAssetGroupSpareResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(serviceSlice.actions.getAssetGroupSpareError());
    });
};

export const updateAssetGroupSpare =
  ({ data }) =>
  async (dispatch) => {
    dispatch(serviceSlice.actions.updateAssetGroupSpareRequest());
    return apis
      .updateAssetGroupSpare({ data })
      .then(async ({ data }) => {
        await dispatch(
          serviceSlice.actions.updateAssetGroupSpareResponse(data)
        );
        return data;
      })
      .catch(() => {
        dispatch(serviceSlice.actions.updateAssetGroupSpareError());
      });
  };

//////////
export const saveAssetMaster =
  ({ data }) =>
  async (dispatch) => {
    dispatch(serviceSlice.actions.saveAssetMasterRequest());
    return apis
      .addAssetMaster({ data })
      .then(async ({ data }) => {
        await dispatch(serviceSlice.actions.saveAssetMasterResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(serviceSlice.actions.saveAssetMasterError());
      });
  };

export const getAssetMaster = () => async (dispatch) => {
  dispatch(serviceSlice.actions.getAssetMasterRequest());
  return apis
    .getAssetMaster()
    .then(({ data }) => {
      dispatch(serviceSlice.actions.getAssetMasterResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(serviceSlice.actions.getAssetMasterError());
    });
};

export const getAssetBasedOnORLMaster = (payload) => async (dispatch) => {
  dispatch(serviceSlice.actions.getAssetBaseOnORLRequest());
  return apis
    .getAssetBasedOnORLMaster(payload)
    .then(({ data }) => {
      dispatch(serviceSlice.actions.getAssetBaseOnORLResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(serviceSlice.actions.getAssetBaseOnORLError());
    });
};

export const updateAssetMaster =
  ({ data }) =>
  async (dispatch) => {
    dispatch(serviceSlice.actions.updateAssetMasterRequest());
    return apis
      .updateAssetMaster({ data })
      .then(async ({ data }) => {
        await dispatch(serviceSlice.actions.updateAssetMasterResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(serviceSlice.actions.updateAssetMasterError());
      });
  };

export const updateAssetMasterExist =
  ({ data }) =>
  async (dispatch) => {
    dispatch(serviceSlice.actions.updateAssetMasterRequest());
    return apis
      .updateAssetMasterExist({ data })
      .then(async ({ data }) => {
        await dispatch(serviceSlice.actions.updateAssetMasterResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(serviceSlice.actions.updateAssetMasterError());
      });
  };

//////////
export const saveNewAssetMaster =
  ({ data }) =>
  async (dispatch) => {
    dispatch(serviceSlice.actions.saveNewAssetMasterRequest());
    return apis
      .addNewAssetMaster({ data })
      .then(async ({ data }) => {
        await dispatch(serviceSlice.actions.saveNewAssetMasterResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(serviceSlice.actions.saveNewAssetMasterError());
      });
  };

export const getNewAssetMaster = () => async (dispatch) => {
  dispatch(serviceSlice.actions.getNewAssetMasterRequest());
  return apis
    .getNewAssetMaster()
    .then(({ data }) => {
      dispatch(serviceSlice.actions.getNewAssetMasterResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(serviceSlice.actions.getNewAssetMasterError());
    });
};

export const getNewAssetMasterDownload = () => async (dispatch) => {
  dispatch(serviceSlice.actions.getNewAssetMasterRequest());
  return apis
    .downloadCSVAssetMaster()
    .then(({ data }) => {
      // dispatch(serviceSlice.actions.getNewAssetMasterResponse(data));
      return data;
    })
    .catch(() => {
      //dispatch(serviceSlice.actions.getNewAssetMasterError());
    });
};

export const updateNewAssetMaster =
  ({ data }) =>
  async (dispatch) => {
    dispatch(serviceSlice.actions.updateNewAssetMasterRequest());
    return apis
      .updateNewAssetMaster({ data })
      .then(async ({ data }) => {
        await dispatch(serviceSlice.actions.updateNewAssetMasterResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(serviceSlice.actions.updateNewAssetMasterError());
      });
  };

//////////
export const saveVendorMaster =
  ({ data }) =>
  async (dispatch) => {
    dispatch(serviceSlice.actions.saveVendorMasterRequest());
    return apis
      .addVendorMaster({ data })
      .then(async ({ data }) => {
        await dispatch(serviceSlice.actions.saveVendorMasterResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(serviceSlice.actions.saveVendorMasterError());
      });
  };

export const getVendorMaster = () => async (dispatch) => {
  dispatch(serviceSlice.actions.getVendorMasterRequest());
  return apis
    .getVendorMaster()
    .then(({ data }) => {
      dispatch(serviceSlice.actions.getVendorMasterResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(serviceSlice.actions.getVendorMasterError());
    });
};

export const updateVendorMaster =
  ({ data }) =>
  async (dispatch) => {
    dispatch(serviceSlice.actions.updateVendorMasterRequest());
    return apis
      .updateVendorMaster({ data })
      .then(async ({ data }) => {
        await dispatch(serviceSlice.actions.updateVendorMasterResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(serviceSlice.actions.updateVendorMasterError());
      });
  };

//////////
export const saveTickets =
  ({ data }) =>
  async (dispatch) => {
    dispatch(serviceSlice.actions.saveTicketsRequest());
    return apis
      .addTickets({ data })
      .then(async ({ data }) => {
        await dispatch(serviceSlice.actions.saveTicketsResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(serviceSlice.actions.saveTicketsError());
      });
  };


export const getTickets =(data) => async (dispatch) => {
      dispatch(serviceSlice.actions.getTicketsRequest());
      return apis
      .getTickets(data)
        .then(({ data }) => {
          dispatch(serviceSlice.actions.getTicketsResponse(data));
          return data;
        })
        .catch(() => {
          dispatch(serviceSlice.actions.getTicketsError());
        });
    };


export const updateTickets =
  ({ data }) =>
  async (dispatch) => {
    dispatch(serviceSlice.actions.updateTicketsRequest());

    if (
      [
        "Issue Resolved MS",
        "Issue Not Resolved ORL",
        "Ticket Closed ORL",
      ].includes(data.ticket_status)
    ) {
      return apis
        .updateORLTicketStatus({ data })
        .then(async ({ data }) => {
          await dispatch(serviceSlice.actions.updateTicketsResponse(data));
          return data;
        })
        .catch(() => {
          dispatch(serviceSlice.actions.updateTicketsError());
        });
    } else {
      return apis
        .updateTickets({ data })
        .then(async ({ data }) => {
          await dispatch(serviceSlice.actions.updateTicketsResponse(data));
          return data;
        })
        .catch(() => {
          dispatch(serviceSlice.actions.updateTicketsError());
        });
    }
  };

export const closeTickets =
  ({ data }) =>
  async (dispatch) => {
    dispatch(serviceSlice.actions.updateTicketsRequest());
    return apis
      .closeTickets({ data })
      .then(async ({ data }) => {
        await dispatch(serviceSlice.actions.updateTicketsResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(serviceSlice.actions.updateTicketsError());
      });
  };

export const getTicketForHadling = (payload) => async (dispatch) => {
  dispatch(serviceSlice.actions.getTicketHandlingRequest());
  return apis
    .getTicketForHadling(payload)
    .then(({ data }) => {
      dispatch(serviceSlice.actions.getTicketHandlingResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(serviceSlice.actions.getTicketHandlingError());
    });
};

export const getTicketForHadlingFilter = (payload) => async (dispatch) => {
  dispatch(serviceSlice.actions.getTicketHandlingRequest());
  return apis
    .getTicketForHadlingFilter(payload)
    .then(({ data }) => {
      dispatch(serviceSlice.actions.getTicketHandlingResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(serviceSlice.actions.getTicketHandlingError());
    });
};

export const getAssetHistoryBasedOnOutlet = (payload) => async (dispatch) => {
  dispatch(serviceSlice.actions.getAssetHistoryRequest());
  return apis
    .getAssetHistoryBasedOnOutlet(payload)
    .then(({ data }) => {
      dispatch(
        serviceSlice.actions.getAssetHistoryResponse(
          data.data?.map((_, index) => ({ ..._, sl_no: index + 1 }))
        )
      );
      return data;
    })
    .catch(() => {
      dispatch(serviceSlice.actions.getAssetHistoryError());
    });
};

export const updateTicketHandling =
  ({ data }) =>
  async (dispatch) => {
    dispatch(serviceSlice.actions.updateTicketHandlingRequest());
    return apis
      .updateTicketHandling({ data })
      .then(async ({ data }) => {
        await dispatch(
          serviceSlice.actions.updatedTicketHandlingResponse(data)
        );
        return data;
      })
      .catch(() => {
        dispatch(serviceSlice.actions.updatedTicketHandlingError());
      });
  };

export const updateOHTicketHandling =
  ({ data }) =>
  async (dispatch) => {
    dispatch(serviceSlice.actions.updateTicketHandlingRequest());
    return apis
      .updateOHTicketHandling({ data })
      .then(async ({ data }) => {
        await dispatch(
          serviceSlice.actions.updatedTicketHandlingResponse(data)
        );
        return data;
      })
      .catch(() => {
        dispatch(serviceSlice.actions.updatedTicketHandlingError());
      });
  };

export const updateOHTicketStatus =
  ({ data }) =>
  async (dispatch) => {
    dispatch(serviceSlice.actions.updateOHTicketStatusRequest());
    return apis
      .updateOHTicketHandlingStatus({ data })
      .then(async ({ data }) => {
        await dispatch(serviceSlice.actions.updateOHTicketStatusResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(serviceSlice.actions.updateOHTicketStatusError());
      });
  };

export const uploadCsvFile =
  ({ data }) =>
  async () => {
    //dispatch(serviceSlice.actions.saveNewAssetMasterRequest());
    return apis
      .uploadCSVAssetMaster(data)
      .then(async ({ data }) => {
        //await dispatch(serviceSlice.actions.saveNewAssetMasterResponse(data));
        return data;
      })
      .catch(() => {
        //dispatch(serviceSlice.actions.saveNewAssetMasterError());
      });
  };

export const saveUploadNewAssetMaster =
  ({ data }) =>
  async (dispatch) => {  
    dispatch(serviceSlice.actions.saveNewAssetMasterRequest());
    return apis
      .uploadCSVAssetMaster(data)
      .then(async ({ data }) => {
        await dispatch(serviceSlice.actions.saveNewAssetMasterResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(serviceSlice.actions.saveNewAssetMasterError());
      });
  };

export const saveUploadVendorMaster =
  ({ data }) =>
  async () => {
   
    //dispatch(serviceSlice.actions.saveNewAssetMasterRequest());
    return apis
      .uploadCSVVendorMaster(data)
      .then(async ({ data }) => {
        //await dispatch(serviceSlice.actions.saveNewAssetMasterResponse(data));
        return data;
      })
      .catch((err) => {
        return err;

        //dispatch(serviceSlice.actions.saveNewAssetMasterError());
      });
  };

export const getTicketsForMSPCClaimAppOH = (payload) => async (dispatch) => {
  dispatch(serviceSlice.actions.getTicketMSPCClaimAppOH());
  return apis
    .getTicketsForPCOHApproval(payload)
    .then(({ data }) => {
      dispatch(
        serviceSlice.actions.getTicketMSPCClaimAppOHResponse(
          data.data?.map((_, index) => ({ ..._, sl_no: index + 1 }))
        )
      );
      return data;
    })
    .catch(() => {
      dispatch(serviceSlice.actions.getTicketMSPCClaimAppOHError());
    });
};

export const updatePCOHTicketStatus =
  ({ data }) =>
  async (dispatch) => {
    dispatch(serviceSlice.actions.updatePCOHTicketStatusRequest());
    return apis
      .updatePCOHTicketStatus({ data })
      .then(async ({ data }) => {
        await dispatch(
          serviceSlice.actions.updatePCOHTicketStatusResponse(data)
        );
        return data;
      })
      .catch(() => {
        dispatch(serviceSlice.actions.updatePCOHTicketStatusError());
      });
  };

export const submitPCTickets =
  ({ data }) =>
  async (dispatch) => {
    dispatch(serviceSlice.actions.submitPCTicketRequest());
    return apis
      .submitPCTicket({ data })
      .then(async ({ data }) => {
        await dispatch(serviceSlice.actions.submitPCTicketResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(serviceSlice.actions.submitPCTicketError());
      });
  };

export const getPettyCashClaimSubMSTickets =
  (dateRange) => async (dispatch) => {
    dispatch(serviceSlice.actions.getPCClaimSubMSRequest());
    return apis
      .getPettyCashClaimSubMSTickets({
        start_at: dateRange?.[0].format("YYYY-MM-DD").toString(),
        end_at: dateRange?.[1].format("YYYY-MM-DD").toString(),
      })
      .then(async ({ data }) => {
        await dispatch(serviceSlice.actions.getPCClaimSubMSResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(serviceSlice.actions.getPCClaimSubMSError());
      });
  };

export const getPettyCashClaimSubmitedMSTickets = () => async (dispatch) => {
  dispatch(serviceSlice.actions.getPCClaimSubmittedMSRequest());
  return apis
    .getPettyCashClaimSubmittedMSTickets()
    .then(async ({ data }) => {
      await dispatch(serviceSlice.actions.getPCClaimSubmittedMSResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(serviceSlice.actions.getPCClaimSubmittedMSError());
    });
};

export const getPettyCashClaimRejectedMSTickets =
  (data) => async (dispatch) => {
    dispatch(serviceSlice.actions.getPCClaimRejectedMSRequest());
    return apis
      .getPettyCashClaimRejectedMSTickets(data)
      .then(async ({ data }) => {
        await dispatch(serviceSlice.actions.getPCClaimRejectedMSResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(serviceSlice.actions.getPCClaimRejectedMSError());
      });
  };

export const rejectPCTicket =
  ({ data }, callback) =>
  async (dispatch) => {
    dispatch(serviceSlice.actions.rejectPCTicketRequest());
    return apis
      .rejectTicketAPI({ data })
      .then(async ({ data }) => {
        await dispatch(serviceSlice.actions.rejectPCTicketResponse(data));
        callback();
        return data;
      })
      .catch(() => {
        dispatch(serviceSlice.actions.rejectPCTicketError());
      });
  };

export const saveUploadOutletMaster =
  ({ data }) =>
  async () => {
    //dispatch(serviceSlice.actions.saveNewAssetMasterRequest());
    return apis
      .uploadCSVOutletMaster(data)
      .then(async ({ data }) => {
        //await dispatch(serviceSlice.actions.saveNewAssetMasterResponse(data));
        return data;
      })
      .catch((err) => {
        return err;

        //dispatch(serviceSlice.actions.saveNewAssetMasterError());
      });
  };

export const saveUploadEmployeeMaster =
  ({ data }) =>
  async (dispatch) => {
    //dispatch(serviceSlice.actions.saveNewAssetMasterRequest());
    return apis
      .uploadCSVEmployeeMaster(data)
      .then(async ({ data }) => {
        //await dispatch(serviceSlice.actions.saveNewAssetMasterResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(serviceSlice.actions.saveNewAssetMasterError());
      });
  };

  export const getTicketFIEntry =
  (data) => async (dispatch) => {
    dispatch(serviceSlice.actions.getTicketFIEntryRequest());
    return apis
      .getTicketFIEntry(data)
      .then(async ({ data }) => {
        await dispatch(serviceSlice.actions.getTicketFIEntryResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(serviceSlice.actions.getTicketFIEntryError());
      });
  };

  export const getOrlFIEntry =
  (data) => async (dispatch) => {
    dispatch(serviceSlice.actions.getOrlFIEntryRequest());
    return apis
      .getOrlFIEntry(data)
      .then(async ({ data }) => {
        await dispatch(serviceSlice.actions.getOrlFIEntryResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(serviceSlice.actions.getOrlFIEntryError());
      });
  };