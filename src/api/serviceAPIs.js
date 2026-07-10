/* eslint-disable no-unused-vars */
import client from "./client";

const limit = 10000;
const offset = 0;

//subMaster
const addServiceFor = ({ data }) => client.post("add-servicefor", data, {});
const getServiceFor = () => client.get("get-servicefor", { limit, offset }, {});
const updateServiceFor = ({ data }) =>
  client.post("update-servicefor", data, {});

const addAssetGroup = ({ data }) => client.post("add-asset-group", data, {});
const getAssetGroup = () =>
  client.get("get-asset-group", { limit, offset }, {});
const updateAssetGroup = ({ data }) =>
  client.post("update-asset-group", data, {});

const addServiceCategory = ({ data }) =>
  client.post("add-service-category", data, {});
const getServiceCategory = () =>
  client.get("get-service-category", { limit, offset }, {});
const updateServiceCategory = ({ data }) =>
  client.post("update-service-category", data, {});

const addPriority = ({ data }) => client.post("add-priority", data, {});
const getPriority = () => client.get("get-priority", { limit, offset }, {});
const updatePriority = ({ data }) => client.post("update-priority", data, {});

const addTypeOfService = ({ data }) =>
  client.post("add-typeOfService", data, {});
const getTypeOfService = () =>
  client.get("get-typeOfService", { limit, offset }, {});
const updateTypeOfService = ({ data }) =>
  client.post("update-typeOfService", data, {});

const addWorkDone = ({ data }) => client.post("add-work-done", data, {});
const getWorkDone = () => client.get("get-work-done", { limit, offset }, {});
const updateWorkDone = ({ data }) => client.post("update-work-done", data, {});

const addModeOfPayment = ({ data }) =>
  client.post("add-modeOfPayment", data, {});
const getModeOfPayment = () =>
  client.get("get-modeOfPayment", { limit, offset }, {});
const updateModeOfPayment = ({ data }) =>
  client.post("update-modeOfPayment", data, {});

const addAssetGroupIssue = ({ data }) =>
  client.post("add-asset-group-issue", data, {});
const getAssetGroupIssue = () =>
  client.get("get-asset-group-issue", { limit, offset }, {});
const updateAssetGroupIssue = ({ data }) =>
  client.post("update-asset-group-issue", data, {});

const addAssetMaster = ({ data }) => client.post("add-asset-master", data, {});
const getAssetMaster = () =>
  client.get("get-asset-master", { limit, offset }, {});
const getAssetBasedOnORLMaster = (data) =>
  client.post("get-asset-details", data, {});
const updateAssetMaster = ({ data }) =>
  client.post("update-asset-master", data, {});

const updateAssetMasterExist = ({ data }) =>
  client.post("update-asset-master-exist", data, {});

const addNewAssetMaster = ({ data }) =>
  client.post("add-new-asset-master", data, {});
const getNewAssetMaster = () =>
  client.get("get-new-asset-master", { limit, offset }, {});
const updateNewAssetMaster = ({ data }) =>
  client.post("update-new-asset-master", data, {});

const addAssetGroupSpare = ({ data }) =>
  client.post("add-asset-group-spare", data, {});
const getAssetGroupSpare = () =>
  client.get("get-asset-group-spare", { limit, offset }, {});
const updateAssetGroupSpare = ({ data }) =>
  client.post("update-asset-group-spare", data, {});

const addVendorMaster = ({ data }) =>
  client.post("add-vendor-master", data, {});
const getVendorMaster = () =>
  client.get("get-vendor-master", { limit, offset }, {});
const updateVendorMaster = ({ data }) =>
  client.post("update-vendor-master", data, {});

const addGlAccount = ({ data }) => client.post("add-GLAccount", data, {});
const getGlAccount = () => client.get("get-GLAccount", { limit, offset }, {});
const updateGlAccount = ({ data }) => client.put("update-GLAccount", data, {});

const addTickets = ({ data }) => client.post("add-tickets", data, {});
//const getTickets = () => client.get("get-tickets", { limit, offset }, {});

let emp_code = localStorage.getItem("emp_code");

const getTickets = () => {
  if (emp_code) {
    return client.get(
      "get-tickets?emp_code=" + emp_code,
      { limit, offset },
      {}
    );
  } else {
    return client.get("get-tickets", { limit, offset }, {});
  }
  };


//const getTickets = ( { data } ) => client.post( data, {} );
const updateTickets = ({ data }) => client.post("update-tickets", data, {});
const updateORLTicketStatus = ({ data }) =>
  client.post("update-ticket-handling-issue", data, {});
const closeTickets = ({ data }) =>
  client.post("delete-tickets-dat?ticket_id=" + data.id, data, {});

const getTicketForHadling = ({ type }) =>
  client.get("get-ticket-handling", { limit, offset, type }, {});

const getTicketForHadlingFilter = ({ type }) =>
  client.get("get-ticket-handling?" + type, { limit, offset }, {});

const updateTicketHandling = ({ data }) =>
  client.post("update-ticket-handling", data, {});
const updateOHTicketHandling = ({ data }) =>
  client.post("update-po-ticket-update", data, {});

const updateOHTicketHandlingStatus = ({ data }) =>
  client.post("update-oh-ticket-update", data, {});

const downloadCSVAssetMaster = () =>
  client.get("download-new-asset-master", {}, {});

const uploadCSVAssetMaster = (data) =>
  client.post("upload-new-asset-master", data, {});

const uploadCSVVendorMaster = (data) =>
  client.post("update-vendor-master-csv", data, {});

const getAssetHistoryBasedOnOutlet = (data) =>
  client.post("get-asset-history", data, {});

const getTicketsForPCOHApproval = () =>
  client.get("get-pettycash-ticket", { limit, offset }, {});

const updatePCOHTicketStatus = ({ data }) =>
  client.post("update-oh-ticket-update", data, {});

const submitPCTicket = ({ data }) =>
  client.post("get-ticket-submitted", data, {});

const getPettyCashClaimSubMSTickets = (range = {}) =>
  client.get(
    "get-ticket-ms-handling",
    { limit, offset, type: "Waiting @ FI Doc No", ...range },
    {}
  );

const getPettyCashClaimSubmittedMSTickets = (range = {}) =>
  client.get("get-ticket-claimlist", {}, {});

const getPettyCashClaimRejectedMSTickets = (range = {}) =>
  client.get(
    "get-ticket-reject-list",
    { limit, offset, type: "Waiting @ FI Doc No", ...range },
    {}
  );

const rejectTicketAPI = ({ data }) =>
  client.post("get-ticket-reject", data, {});

const uploadCSVOutletMaster = (data) =>
  client.post("update-outlet-master-csv", data, {});

const uploadCSVEmployeeMaster = (data) =>
  client.post("update-employee-master-csv", data, {});

const getTicketFIEntry = () =>
  client.get("get-ticket-FI-Entry", { limit, offset }, {});

const getOrlFIEntry = () =>
  client.get("get-orl-FI-Entry", { limit, offset }, {});


const serviceApi = {
  addServiceFor,
  getServiceFor,
  updateServiceFor,
  addAssetGroup,
  getAssetGroup,
  updateAssetGroup,
  addServiceCategory,
  getServiceCategory,
  updateServiceCategory,
  addPriority,
  getPriority,
  updatePriority,
  addTypeOfService,
  getTypeOfService,
  updateTypeOfService,
  addWorkDone,
  getWorkDone,
  updateWorkDone,
  addModeOfPayment,
  getModeOfPayment,
  updateModeOfPayment,
  addGlAccount,
  getGlAccount,
  updateGlAccount,
  addAssetGroupIssue,
  getAssetGroupIssue,
  updateAssetGroupIssue,
  addAssetGroupSpare,
  getAssetGroupSpare,
  updateAssetGroupSpare,
  addAssetMaster,
  getAssetMaster,
  updateAssetMaster,
  updateAssetMasterExist,
  addNewAssetMaster,
  getNewAssetMaster,
  getAssetBasedOnORLMaster,
  updateNewAssetMaster,
  addVendorMaster,
  getVendorMaster,
  updateVendorMaster,
  addTickets,
  getTickets,
  updateTickets,
  updateORLTicketStatus,
  closeTickets,
  getTicketForHadling,
  getTicketForHadlingFilter,
  updateTicketHandling,
  updateOHTicketHandling,
  updateOHTicketHandlingStatus,
  downloadCSVAssetMaster,
  uploadCSVAssetMaster,
  uploadCSVVendorMaster,
  getAssetHistoryBasedOnOutlet,
  getTicketsForPCOHApproval,
  updatePCOHTicketStatus,
  submitPCTicket,
  getPettyCashClaimSubMSTickets,
  getPettyCashClaimSubmittedMSTickets,
  getPettyCashClaimRejectedMSTickets,
  rejectTicketAPI,
  uploadCSVOutletMaster,
  uploadCSVEmployeeMaster,
  getTicketFIEntry,
  getOrlFIEntry
};

export default serviceApi;
