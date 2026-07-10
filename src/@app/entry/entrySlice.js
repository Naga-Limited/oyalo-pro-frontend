import {createSlice} from '@reduxjs/toolkit';
import entryApis from '../../api/entryApis';
import messageToast from '../../components/messageToast/messageToast';

const initialState = {
  gettingEntryTypes: false,
  getEntryTypeResponse: {},
  getEntryTypeError: {},
  savingEntryTypes: false,
  gettingApproval: false,
  getApprovalList: {},
  gettingCapa: false,
  getCapaList: {},
  AuditEntry: false,
  getAuditEntry: {},
  gettingApprovalReport: false,
  gettingUserApprovalReport: false,
  getApprovalReport: {},


  gettingAuditNewEntry: false,
  getAuditNewEntryResponse: {},
  getAuditNewEntryError: {},
  savingAuditNewEntry: false,
  gettingAuditNewCapa: false,
  getAuditNewCapaResponse: {},
  getAuditNewCapaError: {},

  gettingAuditNewApproval: false,
  getAuditNewApprovalResponse: {},
  getAuditNewApprovalError: {},


    savingAuditNewOutletApprovalSubmit: false,
    saveAuditNewOutletApprovalResponse: {},
    saveAuditNewOutletApprovalSubmitError: {},
    gettingAuditNewOutletApprovalSubmit: false,
    getAuditNewOutletApprovalSubmitResponse: {},
    getAuditNewOutletApprovalSubmitError: {},

    
    //New Recheck Submit

    savingAuditNewOutletRecheckSubmit: false,
    saveAuditNewOutletRecheckResponse: {},
    saveAuditNewOutletRecheckSubmitError: {},
    gettingAuditNewOutletRecheckSubmit: false,
    getAuditNewOutletRecheckSubmitResponse: {},
    getAuditNewOutletRecheckSubmitError: {},
  
        
    //New dep capa Submit

    savingAuditDepCapaSubmit: false,
    saveAuditDepCapaResponse: {},
    saveAuditDepCapaSubmitError: {},
    gettingAuditDepCapaSubmit: false,
    getAuditDepCapaSubmitResponse: {},
    getAuditDepCapaSubmitError: {},
  
  // get Depa Approval 
    
      savingAuditDepApprovalSubmit: false,
      saveAuditDepApprovalResponse: {},
      saveAuditDepApprovalSubmitError: {},
      gettingAuditDepApprovalSubmit: false,
      getAuditDepApprovalSubmitResponse: {},
      getAuditDepApprovalSubmitError: {},  

        
    //Dep Recheck Submit

    savingAuditDepRecheckSubmit: false,
    saveAuditDepRecheckResponse: {},
    saveAuditDepRecheckSubmitError: {},
    gettingAuditDepRecheckSubmit: false,
    getAuditDepRecheckSubmitResponse: {},
    getAuditDepRecheckSubmitError: {},

     //Audit Report

     savingAuditReport: false,
     saveAuditReportResponse: {},
     saveAuditReportError: {},
     gettingAuditReport: false,
     getAuditReportResponse: {},
     getAuditReportError: {},


     savingAuditCateWiseReport: false,
     saveAuditCateWiseReportResponse: {},
     saveAuditCateWiseReportError: {},
     gettingAuditCateWiseReport: false,
     getAuditCateWiseReportResponse: {},
     getAuditCateWiseReportError: {},

     //Incentive Approve

     savingAuditIncentiveApprove: false,
     saveAuditIncentiveApproveResponse: {},
     saveAuditIncentiveApproveError: {},
     gettingAuditIncentiveApprove: false,
     getAuditIncentiveApproveResponse: {},
     getAuditIncentiveApproveError: {},

     //Incentive Reject
     
     savingAuditIncentiveReject: false,
     saveAuditIncentiveRejectResponse: {},
     saveAuditIncentiveRejectError: {},
     gettingAuditIncentiveReject: false,
     getAuditIncentiveRejectResponse: {},
     getAuditIncentiveRejectError: {},

     //Incentive Hold
     
     savingAuditIncentiveHold: false,
     saveAuditIncentiveHoldResponse: {},
     saveAuditIncentiveHoldError: {},
     gettingAuditIncentiveHold: false,
     getAuditIncentiveHoldResponse: {},
     getAuditIncentiveHoldError: {},

     //Incentive Approve Submitted

     savingAuditIncentiveApproveSubmitted: false,
     saveAuditIncentiveApproveSubmittedResponse: {},
     saveAuditIncentiveApproveSubmittedError: {},
     gettingAuditIncentiveApproveSubmitted: false,
     getAuditIncentiveApproveSubmittedResponse: {},
     getAuditIncentiveApproveSubmittedError: {},

   //Incentive details

   savingAuditIncentiveSubmitDetails: false,
   saveAuditIncentiveSubmitDetailsResponse: {},
   saveAuditIncentiveSubmitDetailsError: {},
   gettingAuditIncentiveSubmitDetails: false,
   getAuditIncentiveSubmitDetailsResponse: {},
   getAuditIncentiveSubmitDetailsError: {},

  
     //Incentive Approve OH

     savingAuditIncentiveApproveOH: false,
     saveAuditIncentiveApproveOHResponse: {},
     saveAuditIncentiveApproveOHError: {},
     gettingAuditIncentiveApproveOH: false,
     getAuditIncentiveApproveOHResponse: {},
     getAuditIncentiveApproveOHError: {},

     //Incentive Reject OH
     
     savingAuditIncentiveRejectOH: false,
     saveAuditIncentiveRejectOHResponse: {},
     saveAuditIncentiveRejectOHError: {},
     gettingAuditIncentiveRejectOH: false,
     getAuditIncentiveRejectOHResponse: {},
     getAuditIncentiveRejectOHError: {},

     //hr status update

     savingHrStatusUpdate: false,
     saveHrStatusUpdateResponse: {},
     saveHrStatusUpdateError: {},
     gettingHrStatusUpdate: false,
     getHrStatusUpdateResponse: {},
     getHrStatusUpdateError: {},
  getUserData: {},

     //getByMonthAudit


     savinggetByMonthAudit: false,
     savegetByMonthAuditResponse: {},
     savegetByMonthAuditError: {},
     gettingByMonthAudit: false,
     getByMonthAuditResponse: {},
     getByMonthAuditError: {},


         //OH get Audit Incentive

         savingAuditIncentiveOH: false,
         saveAuditIncentiveOHResponse: {},
         saveAuditIncentiveOHError: {},
         gettingAuditIncentiveOH: false,
         getAuditIncentiveOHResponse: {},
         getAuditIncentiveOHError: {},

   //AC get Audit Incentive

   savingAuditIncentiveAC: false,
   saveAuditIncentiveACResponse: {},
   saveAuditIncentiveACError: {},
   gettingAuditIncentiveAC: false,
   getAuditIncentiveACResponse: {},
   getAuditIncentiveACError: {},

  
      //Incentive Approve AC

      savingAuditIncentiveApproveAC: false,
      saveAuditIncentiveApproveACResponse: {},
      saveAuditIncentiveApproveACError: {},
      gettingAuditIncentiveApproveAC: false,
      getAuditIncentiveApproveACResponse: {},
      getAuditIncentiveApproveACError: {},
 
      //Incentive Reject AC
      
      savingAuditIncentiveRejectAC: false,
      saveAuditIncentiveRejectACResponse: {},
      saveAuditIncentiveRejectACError: {},
      gettingAuditIncentiveRejectAC: false,
      getAuditIncentiveRejectACResponse: {},
      getAuditIncentiveRejectACError: {},

      
   //BH get Audit Incentive

   savingAuditIncentiveBH: false,
   saveAuditIncentiveBHResponse: {},
   saveAuditIncentiveBHError: {},
   gettingAuditIncentiveBH: false,
   getAuditIncentiveBHResponse: {},
   getAuditIncentiveBHError: {},


     //Incentive Approve BH

     savingAuditIncentiveApproveBH: false,
     saveAuditIncentiveApproveBHResponse: {},
     saveAuditIncentiveApproveBHError: {},
     gettingAuditIncentiveApproveBH: false,
     getAuditIncentiveApproveBHResponse: {},
     getAuditIncentiveApproveBHError: {},

     //Incentive Reject BH
     
     savingAuditIncentiveRejectBH: false,
     saveAuditIncentiveRejectBHResponse: {},
     saveAuditIncentiveRejectBHError: {},
     gettingAuditIncentiveRejectBH: false,
     getAuditIncentiveRejectBHResponse: {},
     getAuditIncentiveRejectBHError: {},


     //Audit entry Details

     savingAuditEntryDetails: false,
     saveAuditEntryDetailsResponse: {},
     saveAuditEntryDetailsError: {},
     gettingAuditEntryDetails: false,
     getAuditEntryDetailsResponse: {},
     getAuditEntryDetailsError: {},

       //get audit payment

       savingAuditPayment: false,
       saveAuditPaymentResponse: {},
       saveAuditPaymentError: {},
       gettingAuditPayment: false,
       getAuditPaymentResponse: {},
       getAuditPaymentError: {},

       //Current Status
       
       savingPaymentCurrentStatus: false,
       savePaymentCurrentStatusResponse: {},
       savePaymentCurrentStatusError: {},
       gettingPaymentCurrentStatus: false,
       getPaymentCurrentStatusResponse: {},
       getPaymentCurrentStatusError: {},

       savingAuditReject: false,
       saveAuditRejectResponse: {},
       saveAuditRejectError: {},
       gettingAuditReject: false,
       getAuditRejectResponse: {},
       getAuditRejectError: {},

       savingOutletIncentiveReject: false,
       saveOutletIncentiveRejectResponse: {},
       saveOutletIncentiveRejectError: {},
       gettingOutletIncentiveReject: false,
       getOutletIncentiveRejectResponse: {},
       getOutletIncentiveRejectError: {},

      // Audit ReSubmit

      savingAuditReSubmit: false,
      saveAuditReSubmitResponse: {},
      saveAuditReSubmitError: {},
      gettingAuditReSubmit: false,
      getAuditReSubmitResponse: {},
      getAuditReSubmitError: {},


      savingHRHoldRelease: false,
      saveHRHoldReleaseResponse: {},
      saveHRHoldReleaseError: {},
      gettingHRHoldRelease: false,
      getHRHoldReleaseResponse: {},
      getHRHoldReleaseError: {},

      savingaccPaymentRelease: false,
      saveaccPaymentReleaseResponse: {},
      saveaccPaymentReleaseError: {},
      gettingaccPaymentRelease: false,
      getaccPaymentReleaseResponse: {},
      getaccPaymentReleaseError: {},
  getUserRankData: {},

      savingAuditIncentiveHoldRejectHr: false,
      saveAuditIncentiveHoldRejectHrResponse: {},
      saveAuditIncentiveHoldRejectHrError: {},
      gettingAuditIncentiveHoldRejectHrRelease: false,
      getAuditIncentiveHoldRejectHrResponse: {},
      getAuditIncentiveHoldRejectHrError: {},

      
      savingauditOrlChangeHr: false,
      saveauditOrlChangeHrResponse: {},
      saveauditOrlChangeHrError: {},
      gettingauditOrlChangeHr: false,
      getauditOrlChangeHrResponse: {},
      getauditOrlChangeHrError: {},


      savingPaymentReport: false,
      savePaymentReportResponse: {},
      savePaymentReportError: {},
      gettingPaymentReport: false,
      getPaymentReportResponse: {},
      getPaymentReportError: {},

      savingPaymentOutletwiseReport: false,
      savePaymentOutletwiseReportResponse: {},
      savePaymentOutletwiseReportError: {},
      gettingPaymentOutletwiseReport: false,
      getPaymentOutletwiseReportResponse: {},
      getPaymentOutletwiseReportError: {},

      
      savinghrRejectRelease: false,
      savehrRejectReleaseResponse: {},
      savehrRejectReleaseError: {},
      gettinghrRejectRelease: false,
      gethrRejectReleaseResponse: {},
      gethrRejectReleaseError: {},
      
      savinghrRemoveRelease: false,
      savehrRemoveReleaseResponse: {},
      savehrRemoveReleaseError: {},
      gettinghrRemoveRelease: false,
      gethrRemoveReleaseResponse: {},
      gethrRemoveReleaseError: {},

      
      savingemployeemasteronlyORL: false,
      saveemployeemasteronlyORLResponse: {},
      saveemployeemasteronlyORLError: {},
      gettingemployeemasteronlyORL: false,
      getemployeemasteronlyORLResponse: {},
      getemployeemasteronlyORLError: {},
  

      savingauditOrlAddHr: false,
      saveauditOrlAddHrResponse: {},
      saveauditOrlAddHrError: {},
      gettingauditOrlAddHr: false,
      getauditOrlAddHrResponse: {},
      getauditOrlAddHrError: {},

      
      savingauditOrlChangeAddHr: false,
      saveauditOrlChangeAddHrResponse: {},
      saveauditOrlChangeAddHrError: {},
      gettingauditOrlChangeAddHr: false,
      getauditOrlChangeAddHrResponse: {},
      getauditOrlChangeAddHrError: {},
      
        gettingOutletSalesClosure: false,
  getOutletSalesClosureResponse: {},
  getOutletSalesClosureError: {},


  gettingBackOfficeclosure: false,
  getBackOfficeclosureResponse: {},
  getBackOfficeclosureError: {},

  gettingBackOfficeReport: false,
  getBackOfficeReportResponse: {},
  getBackOfficeReportError: {},

  gettingSalesReport: false,
  getSalesReportResponse: {},
  getSalesReportError: {},

  //EntryForm
  savingEntryForm: false,
  saveEntryFormResponse: {},
  saveEntryFormError: {},
  gettingEntryForm: false,
  getEntryFormResponse: {},
  getEntryFormError: {}
};
const entrySlice = createSlice({
  name: 'entry',
  initialState,
  reducers: {
    getEntryTypeRequest: (state) => {
      state.gettingEntryTypes = true;
    },
    getEntryTypeResponse: (state, action) => {
      state.gettingEntryTypes = false;
      state.getEntryTypeResponse = action.payload;
    },
    getEntryTypeError: (state, action) => {
      state.gettingEntryTypes = false;
      state.getEntryTypeError = action.payload;
    },
    saveAddAuditEntryRequest: (state) => {
      state.savingEntry = true;
    },
    saveAddAuditEntryResponse: (state) => {
      state.savingEntry = false;
    },
    saveAddAuditEntryError: (state) => {
      state.savingEntry = false;
    },
    getApprovalRequest: (state) => {
      state.gettingApproval = true;
    },
    getApprovalResponse: (state, action) => {
      state.gettingApproval = false;
      state.getApprovalList = action.payload;
    },
    getApprovalError: (state) => {
      state.gettingApproval = false;
    },
    getCapaRequest: (state) => {
      state.gettingCapa = true;
    },
    getCapaResponse: (state, action) => {
      state.gettingCapa = false;
      state.getCapaList = action.payload;
    },
    getCapaError: (state) => {
      state.gettingCapa = false;
    },
    getAuditEntryRequest: (state) => {
      state.gettingAuditEntry = true;
    },
    getAuditEntryResponse: (state, action) => {
      state.gettingAuditEntry = false;
      state.getAuditEntry = action.payload;
    },
    getAuditEntryError: (state) => {
      state.gettingAuditEntry = false;
    },
    getApprovalReportRequest: (state) => {
      state.gettingApprovalReport = true;
    },
    getApprovalReportResponse: (state, action) => {
      state.gettingApprovalReport = false;
      state.getApprovalReport = action.payload;
    },
    getApprovalReportError: (state) => {
      state.gettingApprovalReport = false;
    },
    
saveAuditNewEntryRequest: (state) => {
  state.savingAuditNewEntry = true;
},
saveAuditNewEntryResponse: (state) => {
  state.savingAuditNewEntry = false;
},
saveAuditNewEntryError: (state) => {
  state.savingAuditNewEntry = false;
}, getAuditNewEntryRequest: (state) => {
  state.gettingAuditNewEntry = true;
},
getAuditNewEntryResponse: (state, action) => {
  state.gettingAuditNewEntry = false;
  state.getAuditNewEntryResponse = action.payload;
},
getAuditNewEntryError: (state, action) => {
  state.gettingAuditNewEntry = false;
  state.getAuditNewEntryError = action.payload;
},

getAuditNewCapaRequest: (state) => {
  state.gettingAuditNewCapa = true;
},
getAuditNewCapaResponse: (state, action) => {
  state.gettingAuditNewCapa = false;
  state.getAuditNewCapaResponse = action.payload;
},
getAuditNewCapaError: (state,action) => {
  state.gettingAuditNewCapa = false;
  state.getAuditNewCapaError = action.payload;
},


getAuditNewApprovalRequest: (state) => {
  state.gettingAuditNewApproval = true;
},
getAuditNewApprovalResponse: (state, action) => {
  state.gettingAuditNewApproval = false;
  state.getAuditNewApprovalResponse = action.payload;
},
getAuditNewApprovalError: (state,action) => {
  state.gettingAuditNewApproval = false;
  state.getAuditNewApprovalError = action.payload;
},


getAuditNewOutletApprovalSubmitResponse: (state, action) => {
  state.gettingAuditNewOutletApprovalSubmit = false;
  state.getAuditNewOutletApprovalSubmitResponse = action.payload;
},
getAuditNewOutletApprovalSubmitRequest: (state) => {
  state.gettingAuditNewOutletApprovalSubmit = true;
},

getAuditNewOutletApprovalSubmitError: (state, action) => {
  state.gettingAuditNewOutletApprovalSubmit = false;
  state.getAuditNewOutletApprovalSubmitError = action.payload;
},

saveAuditNewOutletApprovalSubmitRequest: (state) => {
  state.savingAuditNewOutletApprovalSubmit = true;
},
saveAuditNewOutletApprovalSubmitResponse: (state, action) => {
  state.savingAuditNewOutletApprovalSubmit = false;
  state.saveAuditNewOutletApprovalSubmitResponse = action.payload;
},
saveAuditNewOutletApprovalSubmitError: (state, action) => {
  state.savingAuditNewOutletApprovalSubmit = false;
  state.saveAuditNewOutletApprovalSubmitError = action.payload;
},



getAuditNewOutletRecheckSubmitResponse: (state, action) => {
  state.gettingAuditNewRecheckSubmit = false;
  state.getAuditNewOutletRecheckSubmitResponse = action.payload;
},
getAuditNewOutletRecheckSubmitRequest: (state) => {
  state.gettingAuditNewRecheckSubmit = true;
},

getAuditNewOutletCheckSubmitError: (state, action) => {
  state.gettingAuditNewRecheckSubmit = false;
  state.getAuditNewOutletRecheckSubmitError = action.payload;
},

saveAuditNewOutletRecheckSubmitRequest: (state) => {
  state.savingAuditNewOutletRecheckSubmit = true;
},
saveAuditNewOutletRecheckSubmitResponse: (state, action) => {
  state.savingAuditNewOutletRecheckSubmit = false;
  state.saveAuditNewOutletRecheckSubmitResponse = action.payload;
},
saveAuditNewOutletRecheckSubmitError: (state, action) => {
  state.savingAuditNewOutletRecheckSubmit = false;
  state.saveAuditNewOutletRecheckSubmitError = action.payload;
},


getAuditDepCapaSubmitResponse: (state, action) => {
  state.gettingAuditDepCapaSubmit = false;
  state.getAuditDepCapaSubmitResponse = action.payload;
},
getAuditDepCapaSubmitRequest: (state) => {
  state.gettingAuditDepCapaSubmit = true;
},

getAuditDepCapaSubmitError: (state, action) => {
  state.gettingAuditDepCapaSubmit = false;
  state.getAuditDepCapaSubmitError = action.payload;
},

saveAuditDepCapaSubmitRequest: (state) => {
  state.savingAuditDepCapaSubmit = true;
},
saveAuditDepCapaSubmitResponse: (state, action) => {
  state.savingAuditDepCapaSubmit = false;
  state.saveAuditDepCapaSubmitResponse = action.payload;
},
saveAuditDepCapaSubmitError: (state, action) => {
  state.savingAuditDepCapaSubmit = false;
  state.saveAuditDepCapaSubmitError = action.payload;
},

getAuditDepApprovalSubmitResponse: (state, action) => {
  state.gettingAuditDepApprovalSubmit = false;
  state.getAuditDepApprovalSubmitResponse = action.payload;
},
getAuditDepApprovalSubmitRequest: (state) => {
  state.gettingAuditDepApprovalSubmit = true;
},

getAuditDepApprovalSubmitError: (state, action) => {
  state.gettingAuditDepApprovalSubmit = false;
  state.getAuditDepApprovalSubmitError = action.payload;
},

saveAuditDepApprovalSubmitRequest: (state) => {
  state.savingAuditDepApprovalSubmit = true;
},
saveAuditDepApprovalSubmitResponse: (state, action) => {
  state.savingAuditDepApprovalSubmit = false;
  state.saveAuditDepApprovalSubmitResponse = action.payload;
},
saveAuditDepApprovalSubmitError: (state, action) => {
  state.savingAuditDepApprovalSubmit = false;
  state.saveAuditDepApprovalSubmitError = action.payload;
},


getAuditReportResponse: (state, action) => {
  state.gettingAuditReport = false;
  state.getAuditReportResponse = action.payload;
},
getAuditReportRequest: (state) => {
  state.gettingAuditReport = true;
},

getAuditReportError: (state, action) => {
  state.gettingAuditReport = false;
  state.getAuditReportError = action.payload;
},

saveAuditReportRequest: (state) => {
  state.savingAuditReport = true;
},
saveAuditReportResponse: (state, action) => {
  state.savingAuditReport = false;
  state.saveAuditReportResponse = action.payload;
},
saveAuditReportError: (state, action) => {
  state.savingAuditReport = false;
  state.saveAuditReportError = action.payload;
},


getAuditCateWiseReportResponse: (state, action) => {
  state.gettingAuditCateWiseReport = false;
  state.getAuditCateWiseReportResponse = action.payload;
},
getAuditCateWiseReportRequest: (state) => {
  state.gettingAuditCateWiseReport = true;
},

getAuditCateWiseReportError: (state, action) => {
  state.gettingAuditCateWiseReport = false;
  state.getAuditCateWiseReportError = action.payload;
},

saveAuditCateWiseReportRequest: (state) => {
  state.savingAuditCateWiseReport = true;
},
saveAuditCateWiseReportResponse: (state, action) => {
  state.savingAuditCateWiseReport = false;
  state.saveAuditCateWiseReportResponse = action.payload;
},
saveAuditCateWiseReportError: (state, action) => {
  state.savingAuditCateWiseReport = false;
  state.saveAuditCateWiseReportError = action.payload;
},


saveAuditIncentiveApproveRequest: (state) => {
  state.savingAuditIncentiveApprove = true;
},
saveAuditIncentiveApproveResponse: (state) => {
  state.savingAuditIncentiveApprove = false;
},
saveAuditIncentiveApproveError: (state) => {
  state.savingAuditIncentiveApprove = false;
}, getAuditIncentiveApproveRequest: (state) => {
  state.gettingAuditIncentiveApprove = true;
},
getAuditIncentiveApproveResponse: (state, action) => {
  state.gettingAuditIncentiveApprove = false;
  state.getAuditIncentiveApproveResponse = action.payload;
},
getAuditIncentiveApproveError: (state, action) => {
  state.gettingAuditIncentiveApprove = false;
  state.getAuditIncentiveApproveError = action.payload;
},

//---Reject


saveAuditIncentiveRejectRequest: (state) => {
  state.savingAuditIncentiveReject = true;
},
saveAuditIncentiveRejectResponse: (state) => {
  state.savingAuditIncentiveReject = false;
},
saveAuditIncentiveRejectError: (state) => {
  state.savingAuditIncentiveReject = false;
}, getAuditIncentiveRejectRequest: (state) => {
  state.gettingAuditIncentiveReject = true;
},
getAuditIncentiveRejectResponse: (state, action) => {
  state.gettingAuditIncentiveReject = false;
  state.getAuditIncentiveRejectResponse = action.payload;
},
getAuditIncentiveRejectError: (state, action) => {
  state.gettingAuditIncentiveReject = false;
  state.getAuditIncentiveRejectError = action.payload;
},

//Hold


saveAuditIncentiveHoldRequest: (state) => {
  state.savingAuditIncentiveHold = true;
},
saveAuditIncentiveHoldResponse: (state) => {
  state.savingAuditIncentiveHold = false;
},
saveAuditIncentiveHoldError: (state) => {
  state.savingAuditIncentiveHold = false;
}, getAuditIncentiveHoldRequest: (state) => {
  state.gettingAuditIncentiveHold = true;
},
getAuditIncentiveHoldResponse: (state, action) => {
  state.gettingAuditIncentiveHold = false;
  state.getAuditIncentiveHoldResponse = action.payload;
},
getAuditIncentiveHoldError: (state, action) => {
  state.gettingAuditIncentiveHold = false;
  state.getAuditIncentiveHoldError = action.payload;
},


saveAuditIncentiveApproveSubmittedRequest: (state) => {
  state.savingAuditIncentiveApproveSubmitted = true;
},
saveAuditIncentiveApproveSubmittedResponse: (state) => {
  state.savingAuditIncentiveApproveSubmitted = false;
},
saveAuditIncentiveApproveSubmittedError: (state) => {
  state.savingAuditIncentiveApproveSubmitted = false;
}, getAuditIncentiveApproveSubmittedRequest: (state) => {
  state.gettingAuditIncentiveApproveSubmitted = true;
},
getAuditIncentiveApproveSubmittedResponse: (state, action) => {
  state.gettingAuditIncentiveApproveSubmitted = false;
  state.getAuditIncentiveApproveSubmittedResponse = action.payload;
},
getAuditIncentiveApproveSubmittedError: (state, action) => {
  state.gettingAuditIncentiveApproveSubmitted = false;
  state.getAuditIncentiveApproveSubmittedError = action.payload;
},


saveAuditIncentiveSubmitDetailsRequest: (state) => {
  state.savingAuditIncentiveSubmitDetails = true;
},
saveAuditIncentiveSubmitDetailsResponse: (state) => {
  state.savingAuditIncentiveSubmitDetails = false;
},
saveAuditIncentiveSubmitDetailsError: (state) => {
  state.savingAuditIncentiveSubmitDetails = false;
},
 getAuditIncentiveSubmitDetailsRequest: (state) => {
  state.gettingAuditIncentiveSubmitDetails = true;
},
getAuditIncentiveSubmitDetailsResponse: (state, action) => {
  state.gettingAuditIncentiveSubmitDetails = false;
  state.getAuditIncentiveSubmitDetailsResponse = action.payload;
},
getAuditIncentiveSubmitDetailsError: (state, action) => {
  state.gettingAuditIncentiveSubmitDetails = false;
  state.getAuditIncentiveSubmitDetailsError = action.payload;
},




saveAuditIncentiveApproveOHRequest: (state) => {
  state.savingAuditIncentiveApproveOH = true;
},
saveAuditIncentiveApproveOHResponse: (state) => {
  state.savingAuditIncentiveApproveOH = false;
},
saveAuditIncentiveApproveOHError: (state) => {
  state.savingAuditIncentiveApproveOH = false;
}, getAuditIncentiveApproveOHRequest: (state) => {
  state.gettingAuditIncentiveApproveOH = true;
},
getAuditIncentiveApproveOHResponse: (state, action) => {
  state.gettingAuditIncentiveApproveOH = false;
  state.getAuditIncentiveApproveOHResponse = action.payload;
},
getAuditIncentiveApproveOHError: (state, action) => {
  state.gettingAuditIncentiveApproveOH = false;
  state.getAuditIncentiveApproveOHError = action.payload;
},

//---Reject


saveAuditIncentiveRejectOHRequest: (state) => {
  state.savingAuditIncentiveRejectOH = true;
},
saveAuditIncentiveRejectOHResponse: (state) => {
  state.savingAuditIncentiveRejectOH = false;
},
saveAuditIncentiveRejectOHError: (state) => {
  state.savingAuditIncentiveRejectOH = false;
}, getAuditIncentiveRejectRequestOH: (state) => {
  state.gettingAuditIncentiveRejectOH = true;
},
getAuditIncentiveRejectOHResponse: (state, action) => {
  state.gettingAuditIncentiveRejectOH = false;
  state.getAuditIncentiveRejectOHResponse = action.payload;
},
getAuditIncentiveRejectOHError: (state, action) => {
  state.gettingAuditIncentiveRejectOH = false;
  state.getAuditIncentiveRejectOHError = action.payload;
},


saveHrStatusUpdateRequest: (state) => {
  state.savingHrStatusUpdate = true;
},
saveHrStatusUpdateResponse: (state) => {
  state.savingHrStatusUpdate = false;
},
saveHrStatusUpdateError: (state) => {
  state.savingHrStatusUpdate = false;
}, 
getHrStatusUpdateRequest: (state) => {
  state.gettingHrStatusUpdate = true;
},
getHrStatusUpdateResponse: (state, action) => {
  state.gettingHrStatusUpdate = false;
  state.getHrStatusUpdateResponse = action.payload;
},
getHrStatusUpdateError: (state, action) => {
  state.gettingHrStatusUpdate = false;
  state.getHrStatusUpdateError = action.payload;
},





savegetByMonthAuditRequest: (state) => {
  state.savinggetByMonthAudit = true;
},
savegetByMonthAuditResponse: (state) => {
  state.savinggetByMonthAudit = false;
},
savegetByMonthAuditError: (state) => {
  state.savinggetByMonthAudit = false;
}, 
getByMonthAuditRequest: (state) => {
  state.gettingByMonthAudit = true;
},
getByMonthAuditResponse: (state, action) => {
  state.gettingByMonthAudit = false;
  state.getByMonthAuditResponse = action.payload;
},
getByMonthAuditError: (state, action) => {
  state.gettingByMonthAudit = false;
  state.getByMonthAuditError = action.payload;
},


saveAuditIncentiveOHRequest: (state) => {
  state.savingAuditIncentiveOH = true;
},
saveAuditIncentiveOHResponse: (state) => {
  state.savingAuditIncentiveOH = false;
},
saveAuditIncentiveOHError: (state) => {
  state.savingAuditIncentiveOH = false;
},
 getAuditIncentiveOHRequest: (state) => {
  state.gettingAuditIncentiveOH = true;
},
getAuditIncentiveOHResponse: (state, action) => {
  state.gettingAuditIncentiveOH = false;
  state.getAuditIncentiveOHResponse = action.payload;
},
getAuditIncentiveOHError: (state, action) => {
  state.gettingAuditIncentiveOH = false;
  state.getAuditIncentiveOHError = action.payload;
},


saveAuditIncentiveACRequest: (state) => {
  state.savingAuditIncentiveAC = true;
},
saveAuditIncentiveACResponse: (state) => {
  state.savingAuditIncentiveAC = false;
},
saveAuditIncentiveACError: (state) => {
  state.savingAuditIncentiveAC = false;
},
 getAuditIncentiveACRequest: (state) => {
  state.gettingAuditIncentiveAC = true;
},
getAuditIncentiveACResponse: (state, action) => {
  state.gettingAuditIncentiveAC = false;
  state.getAuditIncentiveACResponse = action.payload;
},
getAuditIncentiveACError: (state, action) => {
  state.gettingAuditIncentiveAC = false;
  state.getAuditIncentiveACError = action.payload;
},



saveAuditIncentiveApproveACRequest: (state) => {
  state.savingAuditIncentiveApproveAC = true;
},
saveAuditIncentiveApproveACResponse: (state) => {
  state.savingAuditIncentiveApproveAC = false;
},
saveAuditIncentiveApproveACError: (state) => {
  state.savingAuditIncentiveApproveAC = false;
}, getAuditIncentiveApproveACRequest: (state) => {
  state.gettingAuditIncentiveApproveAC = true;
},
getAuditIncentiveApproveACResponse: (state, action) => {
  state.gettingAuditIncentiveApproveAC = false;
  state.getAuditIncentiveApproveACResponse = action.payload;
},
getAuditIncentiveApproveACError: (state, action) => {
  state.gettingAuditIncentiveApproveAC = false;
  state.getAuditIncentiveApproveACError = action.payload;
},

//---Reject


saveAuditIncentiveRejectACRequest: (state) => {
  state.savingAuditIncentiveRejectAC = true;
},
saveAuditIncentiveRejectACResponse: (state) => {
  state.savingAuditIncentiveRejectAC = false;
},
saveAuditIncentiveRejectACError: (state) => {
  state.savingAuditIncentiveRejectAC = false;
}, getAuditIncentiveRejectRequestAC: (state) => {
  state.gettingAuditIncentiveRejectAC = true;
},
getAuditIncentiveRejectACResponse: (state, action) => {
  state.gettingAuditIncentiveRejectAC = false;
  state.getAuditIncentiveRejectACResponse = action.payload;
},
getAuditIncentiveRejectACError: (state, action) => {
  state.gettingAuditIncentiveRejectAC = false;
  state.getAuditIncentiveRejectACError = action.payload;
},


saveAuditIncentiveBHRequest: (state) => {
  state.savingAuditIncentiveBH = true;
},
saveAuditIncentiveBHResponse: (state) => {
  state.savingAuditIncentiveBH = false;
},
saveAuditIncentiveBHError: (state) => {
  state.savingAuditIncentiveBH = false;
},
 getAuditIncentiveBHRequest: (state) => {
  state.gettingAuditIncentiveBH = true;
},
getAuditIncentiveBHResponse: (state, action) => {
  state.gettingAuditIncentiveBH = false;
  state.getAuditIncentiveBHResponse = action.payload;
},
getAuditIncentiveBHError: (state, action) => {
  state.gettingAuditIncentiveBH = false;
  state.getAuditIncentiveBHError = action.payload;
},

saveAuditEntryDetailsRequest: (state) => {
  state.savingAuditEntryDetails = true;
},
saveAuditEntryDetailsResponse: (state) => {
  state.savingAuditEntryDetails = false;
},
saveAuditEntryDetailsError: (state) => {
  state.savingAuditEntryDetails = false;
},
 getAuditEntryDetailsRequest: (state) => {
  state.gettingAuditEntryDetails = true;
},
getAuditEntryDetailsResponse: (state, action) => {
  state.gettingAuditEntryDetails = false;
  state.getAuditEntryDetailsResponse = action.payload;
},
getAuditEntryDetailsError: (state, action) => {
  state.gettingAuditEntryDetails = false;
  state.getAuditEntryDetailsError = action.payload;
},


saveAuditIncentiveApproveBHRequest: (state) => {
  state.savingAuditIncentiveApproveBH = true;
},
saveAuditIncentiveApproveBHResponse: (state) => {
  state.savingAuditIncentiveApproveBH = false;
},
saveAuditIncentiveApproveBHError: (state) => {
  state.savingAuditIncentiveApproveBH = false;
}, getAuditIncentiveApproveBHRequest: (state) => {
  state.gettingAuditIncentiveApproveBH = true;
},
getAuditIncentiveApproveBHResponse: (state, action) => {
  state.gettingAuditIncentiveApproveBH = false;
  state.getAuditIncentiveApproveBHResponse = action.payload;
},
getAuditIncentiveApproveBHError: (state, action) => {
  state.gettingAuditIncentiveApproveBH = false;
  state.getAuditIncentiveApproveBHError = action.payload;
},

//---Reject


saveAuditIncentiveRejectBHRequest: (state) => {
  state.savingAuditIncentiveRejectBH = true;
},
saveAuditIncentiveRejectBHResponse: (state) => {
  state.savingAuditIncentiveRejectBH = false;
},
saveAuditIncentiveRejectBHError: (state) => {
  state.savingAuditIncentiveRejectBH = false;
}, getAuditIncentiveRejectRequestBH: (state) => {
  state.gettingAuditIncentiveRejectBH = true;
},
getAuditIncentiveRejectBHResponse: (state, action) => {
  state.gettingAuditIncentiveRejectBH = false;
  state.getAuditIncentiveRejectBHResponse = action.payload;
},
getAuditIncentiveRejectBHError: (state, action) => {
  state.gettingAuditIncentiveRejectBH = false;
  state.getAuditIncentiveRejectBHError = action.payload;
},


getAuditPaymentResponse: (state, action) => {
  state.gettingAuditPayment = false;
  state.getAuditPaymentResponse = action.payload;
},
getAuditPaymentRequest: (state) => {
  state.gettingAuditPayment = true;
},

getAuditPaymentError: (state, action) => {
  state.gettingAuditPayment = false;
  state.getAuditPaymentError = action.payload;
},

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


getPaymentCurrentStatusResponse: (state, action) => {
  state.gettingPaymentCurrentStatus = false;
  state.getPaymentCurrentStatusResponse = action.payload;
},
getPaymentCurrentStatusRequest: (state) => {
  state.gettingPaymentCurrentStatus = true;
},

getPaymentCurrentStatusError: (state, action) => {
  state.gettingPaymentCurrentStatus = false;
  state.getPaymentCurrentStatusError = action.payload;
},

savePaymentCurrentStatusRequest: (state) => {
  state.savingPaymentCurrentStatus = true;
},
savePaymentCurrentStatusResponse: (state, action) => {
  state.savingPaymentCurrentStatus = false;
  state.savePaymentCurrentStatusResponse = action.payload;
},
savePaymentCurrentStatusError: (state, action) => {
  state.savingPaymentCurrentStatus = false;
  state.savePaymentCurrentStatusError = action.payload;
},


getAuditRejectResponse: (state, action) => {
  state.gettingAuditReject = false;
  state.getAuditRejectResponse = action.payload;
},
getAuditRejectRequest: (state) => {
  state.gettingAuditReject = true;
},

getAuditRejectError: (state, action) => {
  state.gettingAuditReject = false;
  state.getAuditRejectError = action.payload;
},

saveAuditRejectRequest: (state) => {
  state.savingAuditReject = true;
},
saveAuditRejectResponse: (state, action) => {
  state.savingAuditReject = false;
  state.saveAuditRejectResponse = action.payload;
},
saveAuditRejectError: (state, action) => {
  state.savingAuditReject = false;
  state.saveAuditRejectError = action.payload;
},


getAuditReSubmitResponse: (state, action) => {
  state.gettingAuditReSubmit = false;
  state.getAuditReSubmitResponse = action.payload;
},
getAuditReSubmitRequest: (state) => {
  state.gettingAuditReSubmit = true;
},

getAuditReSubmitError: (state, action) => {
  state.gettingAuditReSubmit = false;
  state.getAuditReSubmitError = action.payload;
},

saveAuditReSubmitRequest: (state) => {
  state.savingAuditReSubmit = true;
},
saveAuditReSubmitResponse: (state, action) => {
  state.savingAuditReSubmit = false;
  state.saveAuditReSubmitResponse = action.payload;
},
saveAuditReSubmitError: (state, action) => {
  state.savingAuditReSubmit = false;
  state.saveAuditReSubmitError = action.payload;
},


getHRHoldReleaseResponse: (state, action) => {
  state.gettingHRHoldRelease = false;
  state.getHRHoldReleaseResponse = action.payload;
},
getHRHoldReleaseRequest: (state) => {
  state.gettingHRHoldRelease = true;
},

getHRHoldReleaseError: (state, action) => {
  state.gettingHRHoldRelease = false;
  state.getHRHoldReleaseError = action.payload;
},

saveHRHoldReleaseRequest: (state) => {
  state.savingHRHoldRelease = true;
},
saveHRHoldReleaseResponse: (state, action) => {
  state.savingHRHoldRelease = false;
  state.saveHRHoldReleaseResponse = action.payload;
},
saveHRHoldReleaseError: (state, action) => {
  state.savingHRHoldRelease = false;
  state.saveHRHoldReleaseError = action.payload;
},


getaccPaymentReleaseResponse: (state, action) => {
  state.gettingaccPaymentRelease = false;
  state.getaccPaymentReleaseResponse = action.payload;
},
getaccPaymentReleaseRequest: (state) => {
  state.gettingaccPaymentRelease = true;
},

getaccPaymentReleaseError: (state, action) => {
  state.gettingaccPaymentRelease = false;
  state.getaccPaymentReleaseError = action.payload;
},

saveaccPaymentReleaseRequest: (state) => {
  state.savingaccPaymentRelease = true;
},
saveaccPaymentReleaseResponse: (state, action) => {
  state.savingaccPaymentRelease = false;
  state.saveaccPaymentReleaseResponse = action.payload;
},
saveaccPaymentReleaseError: (state, action) => {
  state.savingaccPaymentRelease = false;
  state.saveaccPaymentReleaseError = action.payload;
},


getAuditIncentiveHoldRejectHrResponse: (state, action) => {
  state.gettingAuditIncentiveHoldRejectHr = false;
  state.getAuditIncentiveHoldRejectHrResponse = action.payload;
},
getAuditIncentiveHoldRejectHrRequest: (state) => {
  state.gettingAuditIncentiveHoldRejectHr = true;
},

getAuditIncentiveHoldRejectHrError: (state, action) => {
  state.gettingAuditIncentiveHoldRejectHr = false;
  state.getAuditIncentiveHoldRejectHrError = action.payload;
},

saveAuditIncentiveHoldRejectHrRequest: (state) => {
  state.savingAuditIncentiveHoldRejectHr = true;
},
saveAuditIncentiveHoldRejectHrResponse: (state, action) => {
  state.savingAuditIncentiveHoldRejectHr = false;
  state.saveAuditIncentiveHoldRejectHrResponse = action.payload;
},
saveAuditIncentiveHoldRejectHrError: (state, action) => {
  state.savingAuditIncentiveHoldRejectHr = false;
  state.saveAuditIncentiveHoldRejectHrError = action.payload;
},


getauditOrlChangeHrResponse: (state, action) => {
  state.gettingauditOrlChangeHr = false;
  state.getauditOrlChangeHrResponse = action.payload;
},
getauditOrlChangeHrRequest: (state) => {
  state.gettingauditOrlChangeHr = true;
},

getauditOrlChangeHrError: (state, action) => {
  state.gettingauditOrlChangeHr = false;
  state.getauditOrlChangeHrError = action.payload;
},

saveauditOrlChangeHrRequest: (state) => {
  state.savingauditOrlChangeHr = true;
},
saveauditOrlChangeHrResponse: (state, action) => {
  state.savingauditOrlChangeHr = false;
  state.saveauditOrlChangeHrResponse = action.payload;
},
saveauditOrlChangeHrError: (state, action) => {
  state.savingauditOrlChangeHr = false;
  state.saveauditOrlChangeHrError = action.payload;
},

getPaymentOutletwiseReportResponse: (state, action) => {
  state.gettingPaymentOutletwiseReport = false;
  state.getPaymentOutletwiseReportResponse = action.payload;
},
getPaymentOutletwiseReportRequest: (state) => {
  state.gettingPaymentOutletwiseReport = true;
},

getPaymentOutletwiseReportError: (state, action) => {
  state.gettingPaymentOutletwiseReport = false;
  state.getPaymentOutletwiseReportError = action.payload;
},

savePaymentOutletwiseReportRequest: (state) => {
  state.savingPaymentOutletwiseReport = true;
},
savePaymentOutletwiseReportResponse: (state, action) => {
  state.savingPaymentOutletwiseReport = false;
  state.savePaymentOutletwiseReportResponse = action.payload;
},
savePaymentOutletwiseReportError: (state, action) => {
  state.savingPaymentOutletwiseReport = false;
  state.savePaymentOutletwiseReportError = action.payload;
},


getPaymentReportResponse: (state, action) => {
  state.gettingPaymentReport = false;
  state.getPaymentReportResponse = action.payload;
},
getPaymentReportRequest: (state) => {
  state.gettingPaymentReport = true;
},

getPaymentReportError: (state, action) => {
  state.gettingPaymentReport = false;
  state.getPaymentReportError = action.payload;
},

    //for back office closure details
    getBackOfficeclosureResponse: (state, action) => {
      state.gettingBackOfficeclosure = false;
      state.getBackOfficeclosureResponse = action.payload;
    },
    getBackOfficeclosureRequest: (state) => {
      state.gettingBackOfficeclosure = true;
    },

    getBackOfficeclosureError: (state, action) => {
      state.gettingBackOfficeclosure = false;
      state.getBackOfficeclosureError = action.payload;
    },
    getBackOfficeReportResponse: (state, action) => {
      state.gettingBackOfficeReport = false;
      state.getBackOfficeReportResponse = action.payload;
    },
    getBackOfficeReportRequest: (state) => {
      state.gettingBackOfficeReport = true;
    },

    getBackOfficeReportError: (state, action) => {
      state.gettingBackOfficeReport = false;
      state.getBackOfficeReportError = action.payload;
    },
savePaymentReportRequest: (state) => {
  state.savingPaymentReport = true;
},
savePaymentReportResponse: (state, action) => {
  state.savingPaymentReport = false;
  state.savePaymentReportResponse = action.payload;
},
savePaymentReportError: (state, action) => {
  state.savingPaymentReport = false;
  state.savePaymentReportError = action.payload;
},


gethrRejectReleaseResponse: (state, action) => {
  state.gettinghrRejectRelease = false;
  state.gethrRejectReleaseResponse = action.payload;
},
gethrRejectReleaseRequest: (state) => {
  state.gettinghrRejectRelease = true;
},

gethrRejectReleaseError: (state, action) => {
  state.gettinghrRejectRelease = false;
  state.gethrRejectReleaseError = action.payload;
},

savehrRejectReleaseRequest: (state) => {
  state.savinghrRejectRelease = true;
},
savehrRejectReleaseResponse: (state, action) => {
  state.savinghrRejectRelease = false;
  state.savehrRejectReleaseResponse = action.payload;
},
savehrRejectReleaseError: (state, action) => {
  state.savinghrRejectRelease = false;
  state.savehrRejectReleaseError = action.payload;
},

      

gethrRemoveReleaseResponse: (state, action) => {
  state.gettinghrRemoveRelease = false;
  state.gethrRemoveReleaseResponse = action.payload;
},
gethrRemoveReleaseRequest: (state) => {
  state.gettinghrRemoveRelease = true;
},

gethrRemoveReleaseError: (state, action) => {
  state.gettinghrRemoveRelease = false;
  state.gethrRemoveReleaseError = action.payload;
},

savehrRemoveReleaseRequest: (state) => {
  state.savinghrRemoveRelease = true;
},
savehrRemoveReleaseResponse: (state, action) => {
  state.savinghrRemoveRelease = false;
  state.savehrRemoveReleaseResponse = action.payload;
},
savehrRemoveReleaseError: (state, action) => {
  state.savinghrRemoveRelease = false;
  state.savehrRemoveReleaseError = action.payload;
},



getemployeemasteronlyORLResponse: (state, action) => {
  state.gettingemployeemasteronlyORL = false;
  state.getemployeemasteronlyORLResponse = action.payload;
},
getemployeemasteronlyORLRequest: (state) => {
  state.gettingemployeemasteronlyORL = true;
},

getemployeemasteronlyORLError: (state, action) => {
  state.gettingemployeemasteronlyORL = false;
  state.getemployeemasteronlyORLError = action.payload;
},

saveemployeemasteronlyORLRequest: (state) => {
  state.savingemployeemasteronlyORL = true;
},
saveemployeemasteronlyORLResponse: (state, action) => {
  state.savingemployeemasteronlyORL = false;
  state.saveemployeemasteronlyORLResponse = action.payload;
},
saveemployeemasteronlyORLError: (state, action) => {
  state.savingemployeemasteronlyORL = false;
  state.saveemployeemasteronlyORLError = action.payload;
},


getauditOrlAddHrResponse: (state, action) => {
  state.gettingauditOrlAddHr = false;
  state.getauditOrlAddHrResponse = action.payload;
},
getauditOrlAddHrRequest: (state) => {
  state.gettingauditOrlAddHr = true;
},

getauditOrlAddHrError: (state, action) => {
  state.gettingauditOrlAddHr = false;
  state.getauditOrlAddHrError = action.payload;
},

saveauditOrlAddHrRequest: (state) => {
  state.savingauditOrlAddHr = true;
},
saveauditOrlAddHrResponse: (state, action) => {
  state.savingauditOrlAddHr = false;
  state.saveauditOrlAddHrResponse = action.payload;
},
saveauditOrlAddHrError: (state, action) => {
  state.savingauditOrlAddHr = false;
  state.saveauditOrlAddHrError = action.payload;
},


getauditOrlChangeAddHrResponse: (state, action) => {
  state.gettingauditOrlChangeAddHr = false;
  state.getauditOrlChangeAddHrResponse = action.payload;
},
getauditOrlChangeAddHrRequest: (state) => {
  state.gettingauditOrlChangeAddHr = true;
},

getauditOrlChangeAddHrError: (state, action) => {
  state.gettingauditOrlChangeAddHr = false;
  state.getauditOrlChangeAddHrError = action.payload;
},

saveauditOrlChangeAddHrRequest: (state) => {
  state.savingauditOrlChangeAddHr = true;
},
saveauditOrlChangeAddHrResponse: (state, action) => {
  state.savingauditOrlChangeAddHr = false;
  state.saveauditOrlChangeAddHrResponse = action.payload;
},
saveauditOrlChangeAddHrError: (state, action) => {
  state.savingauditOrlChangeAddHr = false;
  state.saveauditOrlChangeAddHrError = action.payload;
},

    getOutletSalesClosureRequest: (state) => {
      state.gettingOutletSalesClosure = true;
    },
    getOutletSalesClosureResponse: (state, action) => {
      state.gettingOutletSalesClosure = false;
      state.getOutletSalesClosureResponse = action.payload;
    },
    getOutletSalesClosureError: (state, action) => {
      state.gettingOutletSalesClosure = false;
      state.getOutletSalesClosureError = action.payload;
    },


    getSalesReportRequest: (state) => {
      state.gettingSalesReport = true;
    },
    getSalesReportResponse: (state, action) => {
      state.gettingSalesReport = false;
      state.getSalesReportResponse = action.payload;
    },
    getSalesReportError: (state, action) => {
      state.gettingSalesReport = false;
      state.getSalesReportError = action.payload;
    },
    getUserRank: (state, action) => {
      state.getUserRankData = action.payload;
    },
    getUserApprovalReportRequest: (state) => {
      state.gettingUserApprovalReport = true;
    },
    getUserFetchData: (state, action) => {
      state.getUserData = action.payload;
    },
    //addEntryForm

    getEntryFormResponse: (state, action) => {
      state.gettingEntryForm = false;
      state.getEntryFormResponse = action.payload;
    },
    getEntryFormRequest: (state) => {
      state.gettingEntryForm = true;
    },

    getEntryFormError: (state, action) => {
      state.gettingEntryForm = false;
      state.getEntryFormError = action.payload;
    },

    saveEntryFormRequest: (state) => {
      state.savingEntryForm = true;
    },
    saveEntryFormResponse: (state, action) => {
      state.savingEntryForm = false;
      state.saveEntryFormResponse = action.payload;
    },
    saveEntryFormError: (state, action) => {
      state.savingEntryForm = false;
      state.saveEntryFormError = action.payload;
    }
  }
});

export const AuthAction = entrySlice.actions;
export default entrySlice.reducer;

export const getAuditType =
  ({ data }) =>
  async (dispatch) => {
    dispatch(entrySlice.actions.getEntryTypeRequest());
    return entryApis
      .getEntryType({ data })
      .then(({ data }) => {
        const {
          data: { data: auditType, total_mark },
          ...rest
        } = data;

        dispatch(
          entrySlice.actions.getEntryTypeResponse({
            data: { ...auditType, total_mark },
            ...rest
          })
        );
        return data;
      })
      .catch(() => {
        dispatch(entrySlice.actions.getEntryTypeError());
      });
  };

export const addAuditEntry =
  ({data}) =>
  async (dispatch) => {
    dispatch(entrySlice.actions.saveAddAuditEntryRequest());
    return entryApis
      .addAuditEntry({data})
      .then(({data}) => {
        dispatch(entrySlice.actions.saveAddAuditEntryResponse({data}));
        return data;
      })
      .catch(() => {
        dispatch(entrySlice.actions.saveAddAuditEntryError());
      });
  };

export const editAuditEntry =
  ({data}) =>
  async (dispatch) => {
    dispatch(entrySlice.actions.saveAddAuditEntryRequest());
    return entryApis
      .editAuditEntry({data})
      .then(({data}) => {
        dispatch(entrySlice.actions.saveAddAuditEntryResponse({data}));
        return data;
      })
      .catch(() => {
        dispatch(entrySlice.actions.saveAddAuditEntryError());
      });
  };

export const getApproval = (req) => async (dispatch) => {
  dispatch(entrySlice.actions.getApprovalRequest());
  return entryApis
    .getApproval(req)
    .then(({ data }) => {
      const { data: approvalData, ...resatOfData } = data;

      const onlyCapaPassRecord = approvalData?.filter(
        (e) => e.capa_status === "1" || e.status === "5"
      );
      dispatch(
        entrySlice.actions.getApprovalResponse({
          data: onlyCapaPassRecord,
          ...resatOfData,
        })
      );
      return data;
    })
    .catch(() => {
      dispatch(entrySlice.actions.getApprovalError());
    });
};

export const getCapa = (req) => async (dispatch) => {
  dispatch(entrySlice.actions.getCapaRequest());
  return entryApis
    .getCapa(req)
    .then(({ data }) => {
      const { data: capaList, ...restOfData } = data;
      const filterByApprovedStatus = (capaList ?? [])?.filter(
        (e) => e.capa_status === "0"
      );
      dispatch(
        entrySlice.actions.getCapaResponse({
          data: filterByApprovedStatus,
          ...restOfData,
        })
      );
      return data;
    })
    .catch(() => {
      dispatch(entrySlice.actions.getCapaError());
    });
};

export const getAuditEntry = (req_data) => async (dispatch) => {
  dispatch(entrySlice.actions.getAuditEntryRequest());
  return entryApis
    .getAuditEntry(req_data)
    .then(({data}) => {
      dispatch(entrySlice.actions.getAuditEntryResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(entrySlice.actions.getAuditEntryError());
    });
};

export const getApprovalReport = (req) => async (dispatch) => {
  dispatch(entrySlice.actions.getApprovalReportRequest());
  return entryApis
    .getApprovalReport(req)
    .then(({data}) => {
      dispatch(entrySlice.actions.getApprovalReportResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(entrySlice.actions.getApprovalReportError());
    });
};


export const addAuditNewEntry =
  ({data}) =>
  async (dispatch) => {
    dispatch(entrySlice.actions.saveAuditNewEntryRequest());
    return entryApis
      .addAuditNewEntry({data})
      .then(({data}) => {
        dispatch(entrySlice.actions.saveAuditNewEntryResponse({data}));
        return data;
      })
      .catch(() => {
        dispatch(entrySlice.actions.saveAuditNewEntryError());
      });
  };

 
  export const getAuditNewCapa = (req) => async (dispatch) => {
    dispatch(entrySlice.actions.getAuditNewCapaRequest());
    return entryApis
      .getAuditNewCapa(req)
      .then(({data}) => {
        dispatch(entrySlice.actions.getAuditNewCapaResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(entrySlice.actions.getAuditNewCapaError());
      });
  };


  export const getAuditNewApproval = (req) => async (dispatch) => {
    dispatch(entrySlice.actions.getAuditNewApprovalRequest());
    return entryApis
      .getAuditNewApproval(req)
      .then(({data}) => {
        dispatch(entrySlice.actions.getAuditNewApprovalResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(entrySlice.actions.getAuditNewApprovalError());
      });
  };

export const addAuditNewOutletApproveSubmit =
  ({ data }) =>
  async (dispatch) => {
    dispatch(entrySlice.actions.saveAuditNewOutletApprovalSubmitRequest());
    return entryApis
      .addAuditNewOutletApproveSubmit({ data })
      .then(({ data }) => {
        dispatch(
          entrySlice.actions.saveAuditNewOutletApprovalSubmitResponse(data)
        );
        messageToast({
          message: data?.message ?? data?.statusText,
          status: data.status,
          title: "Audit Approval Given"
        });
        return data;
      })
      .catch(() => {
        dispatch(entrySlice.actions.saveAuditNewOutletApprovalSubmitError());
      });
  };

export const addAuditNewOutletRecheckSubmit =
  ({ data }) =>
  async (dispatch) => {
    dispatch(entrySlice.actions.saveAuditNewOutletRecheckSubmitRequest());
    return entryApis
      .addAuditNewOutletRecheckSubmit({ data })
      .then(({ data }) => {
        dispatch(
          entrySlice.actions.saveAuditNewOutletRecheckSubmitResponse(data)
        );
        messageToast({
          message: data?.message ?? data?.statusText,
          status: data.status,
          title: "Audit Recheck Given"
        });
        return data;
      })
      .catch(() => {
        dispatch(entrySlice.actions.saveAuditNewOutletRecheckSubmitError());
      });
  };

   export const getAuditDepCapa = (data) => async (dispatch) => {
    dispatch(entrySlice.actions.getAuditDepCapaSubmitRequest());
      return entryApis
      .getAuditDepCapa(data)
      .then(({data}) => {
        dispatch(entrySlice.actions.getAuditDepCapaSubmitResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(entrySlice.actions.getAuditDepCapaSubmitError());
      });
  };
  

export const addAuditDepCAPASubmit =
  ({ data }) =>
  async (dispatch) => {
    dispatch(entrySlice.actions.saveAuditDepCapaSubmitRequest());
    return entryApis
      .addAuditDepCAPASubmit({ data })
      .then(({ data }) => {
        dispatch(entrySlice.actions.saveAuditDepCapaSubmitResponse(data));
        messageToast({
          message: data?.message ?? data?.statusText,
          status: data.status,
          title: "Audit Dep CAPA Submitted"
        });
        return data;
      })
      .catch(() => {
        dispatch(entrySlice.actions.saveAuditDepCapaSubmitError());
      });
  };


  export const getAuditDepApproval = (data) => async (dispatch) => {
    dispatch(entrySlice.actions.getAuditDepApprovalSubmitRequest());
     return entryApis
      .getAuditDepApproval(data)
      .then(({data}) => {
        dispatch(entrySlice.actions.getAuditDepApprovalSubmitResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(entrySlice.actions.getAuditDepApprovalSubmitError());
      });
  };

export const addAuditDepApproveSubmit =
  ({ data }) =>
  async (dispatch) => {
    dispatch(entrySlice.actions.saveAuditDepApprovalSubmitRequest());
    return entryApis
      .addAuditDepApproveSubmit({ data })
      .then(({ data }) => {
        dispatch(entrySlice.actions.saveAuditDepApprovalSubmitResponse(data));
        messageToast({
          message: data?.message ?? data?.statusText,
          status: data.status,
          title: "Audit Dep Approved"
        });
        return data;
      })
      .catch(() => {
        dispatch(entrySlice.actions.saveAuditDepApprovalSubmitError());
      });
  };

export const addAuditDepRecheckSubmit =
  ({ data }) =>
  async (dispatch) => {
    dispatch(entrySlice.actions.saveAuditDepRecheckRequest());
    return entryApis
      .addAuditDepRecheckSubmit({ data })
      .then(({ data }) => {
        dispatch(entrySlice.actions.saveAuditDepRecheckResponse(data));
        messageToast({
          message: data?.message ?? data?.statusText,
          status: data.status,
          title: "Audit Dep Recheck Submitted"
        });
        return data;
      })
      .catch(() => {
        dispatch(entrySlice.actions.saveAuditDepRecheckError());
      });
  };

  
 
  export const getAuditReport = (data) => async (dispatch) => {
    dispatch(entrySlice.actions.getAuditReportRequest());
     return entryApis
      .getAuditReport(data)
      .then(({data}) => {
        dispatch(entrySlice.actions.getAuditReportResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(entrySlice.actions.getAuditReportError());
      });
  };


   
  export const getAuditCateWiseReport = (data) => async (dispatch) => {
    dispatch(entrySlice.actions.getAuditCateWiseReportRequest());
     return entryApis
      .getAuditCateWiseReport(data)
      .then(({data}) => {
        dispatch(entrySlice.actions.getAuditCateWiseReportResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(entrySlice.actions.getAuditCateWiseReportError());
      });
  };

export const auditApproveIncentiveSubmit =
  ({ data }) =>
  async (dispatch) => {
    dispatch(entrySlice.actions.saveAuditIncentiveApproveRequest());
    return entryApis
      .auditApproveIncentiveSubmit({data})
      .then(({data}) => {
        dispatch(entrySlice.actions.saveAuditIncentiveApproveResponse(data));
          return data;
      })
      .catch(() => {
        dispatch(entrySlice.actions.saveAuditIncentiveApproveError());
      });
  };

  export const getAuditIncentiveHR = (data) => async (dispatch) => {
    dispatch(entrySlice.actions.getAuditIncentiveApproveRequest());
     return entryApis
      .getAuditIncentiveHR(data)
      .then(({data}) => {
        dispatch(entrySlice.actions.getAuditIncentiveApproveResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(entrySlice.actions.getAuditIncentiveApproveError());
      });
  };

export const auditRejectIncentiveSubmit =
  ({ data }) =>
  async (dispatch) => {
    dispatch(entrySlice.actions.saveAuditIncentiveRejectRequest());
    return entryApis
      .auditRejectIncentiveSubmit({data})
      .then(({data}) => {
        dispatch(entrySlice.actions.saveAuditIncentiveRejectResponse(data));
          return data;
      })
      .catch(() => {
        dispatch(entrySlice.actions.saveAuditIncentiveRejectError());
      });
  };

export const auditHoldIncentiveSubmit =
  ({ data }) =>
  async (dispatch) => {
    dispatch(entrySlice.actions.saveAuditIncentiveHoldRequest());
    return entryApis
      .auditHoldIncentiveSubmit({data})
      .then(({data}) => {
        dispatch(entrySlice.actions.saveAuditIncentiveHoldResponse(data));
          return data;
      })
      .catch(() => {
        dispatch(entrySlice.actions.saveAuditIncentiveHoldError());
      });
  };

  export const getAuditIncentiveHRsubmitted = (data) => async (dispatch) => {
    dispatch(entrySlice.actions.getAuditIncentiveApproveSubmittedRequest());
     return entryApis
      .getAuditIncentiveHRsubmitted(data)
      .then(({data}) => {
        dispatch(entrySlice.actions.getAuditIncentiveApproveSubmittedResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(entrySlice.actions.getAuditIncentiveApproveSubmittedError());
      });
  };
  export const getAuditIncentiveSubmitDetails = (data) => async (dispatch) => {
    dispatch(entrySlice.actions.getAuditIncentiveSubmitDetailsRequest());
     return entryApis
      .getAuditIncentiveSubmitDetails(data)      
      .then(({data}) => {
        dispatch(entrySlice.actions.getAuditIncentiveSubmitDetailsResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(entrySlice.actions.getAuditIncentiveSubmitDetailsError());
      });
  };
 

  export const auditApproveIncentiveOH = ({data}) => async (dispatch) => {
    dispatch(entrySlice.actions.saveAuditIncentiveApproveOHRequest());
    return entryApis
      .auditApproveIncentiveOH({data})
      .then(({data}) => {
        dispatch(entrySlice.actions.saveAuditIncentiveApproveOHResponse(data));
          return data;
      })
      .catch(() => {
        dispatch(entrySlice.actions.saveAuditIncentiveApproveOHError());
      });
  };

  export const auditRejectIncentiveOH = ({data}) =>
  async (dispatch) => {
    dispatch(entrySlice.actions.saveAuditIncentiveRejectOHRequest());
    return entryApis
      .auditRejectIncentiveOH({data})
      .then(({data}) => {
        dispatch(entrySlice.actions.saveAuditIncentiveRejectOHResponse(data));
          return data;
      })
      .catch(() => {
        dispatch(entrySlice.actions.saveAuditIncentiveRejectOHError());
      });
  };

  export const hrStatusUpdate = ({data}) =>
  async (dispatch) => {
    dispatch(entrySlice.actions.saveHrStatusUpdateRequest());
    return entryApis
      .hrStatusUpdate({data})
      .then(({data}) => {
        dispatch(entrySlice.actions.saveHrStatusUpdateResponse(data));
          return data;
      })
      .catch(() => {
        dispatch(entrySlice.actions.saveHrStatusUpdateError());
      });
  };

  export const getByMonthAudit = (data) => async (dispatch) => {
    dispatch(entrySlice.actions.getByMonthAuditRequest());
     return entryApis
      .getByMonthAudit(data)      
      .then(({data}) => {
        dispatch(entrySlice.actions.getByMonthAuditResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(entrySlice.actions.getByMonthAuditError());
      });
  };

  
  export const getAuditIncentiveOH = (data) => async (dispatch) => {
    dispatch(entrySlice.actions.getAuditIncentiveOHRequest());
     return entryApis
      .getAuditIncentiveOH(data)      
      .then(({data}) => {
        dispatch(entrySlice.actions.getAuditIncentiveOHResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(entrySlice.actions.getAuditIncentiveOHError());
      });
  };  

  export const getAuditIncentiveAC = (data) => async (dispatch) => {
    dispatch(entrySlice.actions.getAuditIncentiveACRequest());
     return entryApis
      .getAuditIncentiveAC(data)      
      .then(({data}) => {
        dispatch(entrySlice.actions.getAuditIncentiveACResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(entrySlice.actions.getAuditIncentiveACError());
      });
  };  

  export const auditApproveIncentiveAC = ({data}) => async (dispatch) => {
    dispatch(entrySlice.actions.saveAuditIncentiveApproveACRequest());
    return entryApis
      .auditApproveIncentiveAC({data})
      .then(({data}) => {
        dispatch(entrySlice.actions.saveAuditIncentiveApproveACResponse(data));
          return data;
      })
      .catch(() => {
        dispatch(entrySlice.actions.saveAuditIncentiveApproveACError());
      });
  };

  export const auditRejectIncentiveAC = ({data}) =>
  async (dispatch) => {
    dispatch(entrySlice.actions.saveAuditIncentiveRejectACRequest());
    return entryApis
      .auditRejectIncentiveAC({data})
      .then(({data}) => {
        dispatch(entrySlice.actions.saveAuditIncentiveRejectACResponse(data));
          return data;
      })
      .catch(() => {
        dispatch(entrySlice.actions.saveAuditIncentiveRejectACError());
      });
  };
 

  export const getAuditIncentiveBH = (data) => async (dispatch) => {
    dispatch(entrySlice.actions.getAuditIncentiveBHRequest());
     return entryApis
      .getAuditIncentiveBH(data)      
      .then(({data}) => {
        dispatch(entrySlice.actions.getAuditIncentiveBHResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(entrySlice.actions.getAuditIncentiveBHError());
      });
  };  

  
  export const getAuditEntryDetails = (data) => async (dispatch) => {
    dispatch(entrySlice.actions.getAuditEntryDetailsRequest());
     return entryApis
      .getAuditEntryDetails(data)      
      .then(({data}) => {
        dispatch(entrySlice.actions.getAuditEntryDetailsResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(entrySlice.actions.getAuditEntryDetailsError());
      });
  };  

  export const auditApproveIncentiveBH = ({data}) => async (dispatch) => {
    dispatch(entrySlice.actions.saveAuditIncentiveApproveBHRequest());
    return entryApis
      .auditApproveIncentiveBH({data})
      .then(({data}) => {
        dispatch(entrySlice.actions.saveAuditIncentiveApproveBHResponse(data));
          return data;
      })
      .catch(() => {
        dispatch(entrySlice.actions.saveAuditIncentiveApproveBHError());
      });
  };

  export const auditRejectIncentiveBH = ({data}) =>
  async (dispatch) => {
    dispatch(entrySlice.actions.saveAuditIncentiveRejectBHRequest());
    return entryApis
      .auditRejectIncentiveBH({data})
      .then(({data}) => {
        dispatch(entrySlice.actions.saveAuditIncentiveRejectBHResponse(data));
          return data;
      })
      .catch(() => {
        dispatch(entrySlice.actions.saveAuditIncentiveRejectBHError());
      });
  };
 
  export const getAuditPayment = (data) => async (dispatch) => {
    dispatch(entrySlice.actions.getAuditPaymentRequest());
     return entryApis
      .getAuditPayment(data)      
      .then(({data}) => {
        dispatch(entrySlice.actions.getAuditPaymentResponse(data));
         return data;
      })
      .catch(() => {
        dispatch(entrySlice.actions.getAuditPaymentError());
      });
  };  

  export const  getPaymentCurrentStatus = (data) => async (dispatch) => {
    dispatch(entrySlice.actions.getPaymentCurrentStatusRequest());
     return entryApis
      .getPaymentCurrentStatus(data)      
      .then(({data}) => {
        dispatch(entrySlice.actions.getPaymentCurrentStatusResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(entrySlice.actions.getPaymentCurrentStatusError());
      });
  };  


  export const getAuditIncentiveReject = (data) => async (dispatch) => {
    dispatch(entrySlice.actions.getAuditRejectRequest());
     return entryApis
      .getAuditIncentiveReject(data)      
      .then(({data}) => {
        dispatch(entrySlice.actions.getAuditRejectResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(entrySlice.actions.getAuditRejectError());
      });
  };  
 

  export const rejectOutletIncentive = ({data}) =>
  async (dispatch) => {
    dispatch(entrySlice.actions.saveOutletIncentiveRejectRequest());
    return entryApis
      .rejectOutletIncentive({data})
      .then(({data}) => {
        dispatch(entrySlice.actions.saveOutletIncentiveRejectResponse(data));
          return data;
      })
      .catch(() => {
        dispatch(entrySlice.actions.saveOutletIncentiveRejectError());
      });
  };


  export const auditReSubmitHR = ({data}) =>
  async (dispatch) => {
    dispatch(entrySlice.actions.saveAuditReSubmitRequest());
    return entryApis
      .auditReSubmitHR({data})
      .then(({data}) => {
        dispatch(entrySlice.actions.saveAuditReSubmitResponse(data));
          return data;
      })
      .catch(() => {
        dispatch(entrySlice.actions.saveAuditReSubmitError());
      });
  };
  
  
  export const hrHoldRelease = ({data}) =>
  async (dispatch) => {
    dispatch(entrySlice.actions.saveHRHoldReleaseRequest());
    return entryApis
      .hrHoldRelease({data})
      .then(({data}) => {
        dispatch(entrySlice.actions.saveHRHoldReleaseResponse(data));
          return data;
      })
      .catch(() => {
        dispatch(entrySlice.actions.saveHRHoldReleaseError());
      });
  };

    
  export const accPaymentRelease = ({data}) =>
  async (dispatch) => {
    dispatch(entrySlice.actions.saveaccPaymentReleaseRequest());
    return entryApis
      .accPaymentRelease({data})
      .then(({data}) => {
        dispatch(entrySlice.actions.saveaccPaymentReleaseResponse(data));
          return data;
      })
      .catch(() => {
        dispatch(entrySlice.actions.saveaccPaymentReleaseError());
      });
  };

  export const getAuditIncentiveHoldRejectHr = (data) => async (dispatch) => {
    dispatch(entrySlice.actions.getAuditIncentiveHoldRejectHrRequest());
     return entryApis
      .getAuditIncentiveHoldRejectHr(data)      
      .then(({data}) => {
        dispatch(entrySlice.actions.getAuditIncentiveHoldRejectHrResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(entrySlice.actions.getAuditIncentiveHoldRejectHrError());
      });
  };  
 

  export const auditOrlChangeHr = ({data}) =>
  async (dispatch) => {
    dispatch(entrySlice.actions.saveauditOrlChangeHrRequest());
    return entryApis
      .auditOrlChangeHr({data})
      .then(({data}) => {
        dispatch(entrySlice.actions.saveauditOrlChangeHrResponse(data));
          return data;
      })
      .catch(() => {
        dispatch(entrySlice.actions.saveauditOrlChangeHrError());
      });
  };
  

  export const getPaymentReport = (data) => async (dispatch) => {
    dispatch(entrySlice.actions.getPaymentReportRequest());
     return entryApis
      .getPaymentReport(data)      
      .then(({data}) => {
        dispatch(entrySlice.actions.getPaymentReportResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(entrySlice.actions.getPaymentReportError());
      });
  };  
 
  export const getPaymentOutletwiseReport = (data) => async (dispatch) => {
    dispatch(entrySlice.actions.getPaymentOutletwiseReportRequest());
     return entryApis
      .getPaymentOutletwiseReport(data)      
      .then(({data}) => {
        dispatch(entrySlice.actions.getPaymentOutletwiseReportResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(entrySlice.actions.getPaymentOutletwiseReportError());
      });
  };  
 

  export const hrRejectRelease = ({data}) =>
  async (dispatch) => {
    dispatch(entrySlice.actions.savehrRejectReleaseRequest());
    return entryApis
      .hrRejectRelease({data})
      .then(({data}) => {
        dispatch(entrySlice.actions.savehrRejectReleaseResponse(data));
          return data;
      })
      .catch(() => {
        dispatch(entrySlice.actions.savehrRejectReleaseError());
      });
  };
  
  export const hrRemoveRelease = ({data}) =>
  async (dispatch) => {
    dispatch(entrySlice.actions.savehrRemoveReleaseRequest());
    return entryApis
      .hrRemoveRelease({data})
      .then(({data}) => {
        dispatch(entrySlice.actions.savehrRemoveReleaseResponse(data));
          return data;
      })
      .catch(() => {
        dispatch(entrySlice.actions.savehrRemoveReleaseError());
      });
  };


  export const auditOrlAddHr = ({data}) =>
  async (dispatch) => {
    dispatch(entrySlice.actions.saveauditOrlAddHrRequest());
    return entryApis
      .auditOrlAddHr({data})
      .then(({data}) => {
        dispatch(entrySlice.actions.saveauditOrlAddHrResponse(data));
          return data;
      })
      .catch(() => {
        dispatch(entrySlice.actions.saveauditOrlAddHrError());
      });
  };

  export const auditOrlChangeAddHr = ({data}) =>
  async (dispatch) => {
    dispatch(entrySlice.actions.saveauditOrlChangeAddHrRequest());
    return entryApis
      .auditOrlChangeAddHr({data})
      .then(({data}) => {
        dispatch(entrySlice.actions.saveauditOrlChangeAddHrResponse(data));
          return data;
      })
      .catch(() => {
        dispatch(entrySlice.actions.saveauditOrlChangeAddHrError());
      });
  };
  

  export const getEmployeeMasterOnlyORL = () => async (dispatch) => {
    dispatch(entrySlice.actions.getemployeemasteronlyORLRequest());
    return entryApis
      .getEmployeeMasterOnlyORL()
      .then(({data}) => {
        dispatch(entrySlice.actions.getemployeemasteronlyORLResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(entrySlice.actions.getemployeemasteronlyORLError());
      });
  };
export const getBackOfficeclosureDetails = (data) => async (dispatch) => {
  dispatch(entrySlice.actions.getBackOfficeclosureRequest());
  return entryApis
    .getBackOfficeclosureDetails(data)
    .then(({ data }) => {
      dispatch(entrySlice.actions.getBackOfficeclosureResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(entrySlice.actions.getBackOfficeclosureError());
    });
};

export const getBackOfficeReport = (data) => async (dispatch) => {
  dispatch(entrySlice.actions.getBackOfficeReportRequest());
  return entryApis
    .getBackOfficeReport(data)
    .then(({ data }) => {
      dispatch(entrySlice.actions.getBackOfficeReportResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(entrySlice.actions.getBackOfficeReportError());
    });
};


//for cash handling to get and post cash daysales_closure_details and cash deposit details

export const getOutletDayClosureDetails = (data) => async (dispatch) => {
  dispatch(entrySlice.actions.getOutletSalesClosureRequest());
  return entryApis
    .getOutletDayClosureDetails(data)
    .then(({ data }) => {
      dispatch(entrySlice.actions.getOutletSalesClosureResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(entrySlice.actions.getOutletSalesClosureError());
    });
};

// //for to outlet day sales details daywise individual details
export const getSalesReport = (data) => async (dispatch) => {
  dispatch(entrySlice.actions.getSalesReportRequest());
  return entryApis
    .getSalesReport(data)
    .then(({ data }) => {
      dispatch(entrySlice.actions.getSalesReportResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(entrySlice.actions.getSalesReportError());
    });
};

//AddEntryForm
export const addEntryForm =
  ({ data }) =>
  async (dispatch) => {
    dispatch(entrySlice.actions.saveEntryFormRequest());
    return entryApis
      .addEntryForm({ data })
      .then(({ data }) => {
        dispatch(entrySlice.actions.saveEntryFormResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(entrySlice.actions.saveEntryFormError());
      });
  };

export const getEntryForm = (data) => async (dispatch) => {
  dispatch(entrySlice.actions.getEntryFormRequest());
  return entryApis
    .getEntryForm(data)
    .then(({ data }) => {
      dispatch(entrySlice.actions.getEntryFormResponse(data));
      return data;
    })
    .catch(() => {
      dispatch(entrySlice.actions.getEntryFormError());
    });
};

export const updateEntryForm =
  ({ data }) =>
  async (dispatch) => {
    dispatch(entrySlice.actions.saveEntryFormRequest());
    return entryApis
      .updateEntryForm({ data })
      .then(({ data }) => {
        dispatch(entrySlice.actions.saveEntryFormResponse(data));
        return data;
      })
      .catch(() => {
        dispatch(entrySlice.actions.saveEntryFormError());
      });
  };
