/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import { isEmpty } from "ramda";
import "./styles.css";
import {
  FaBook,
  FaBriefcase,
  FaBuilding,
  FaCalculator,
  FaDatabase,
  FaGlobe,
  FaLocationArrow,
  FaMap,
  FaMapMarkedAlt,
  FaServicestack,
  FaSortAmountDown,
  FaStackExchange,
  FaStreetView,
  FaUserAlt,
  FaUserEdit,
  FaUserTag,
  FaPizzaSlice,
  FaGalacticSenate,
  FaEmpire,
  FaCanadianMapleLeaf,
  FaMoneyCheckAlt,
  FaUserTie,
  FaSortAmountUpAlt,
  FaReadme,
  FaRegEdit,
  FaStream,
  FaRetweet,
  FaGlide,
  FaDropbox,
  FaJoomla,
  FaGripfire,
  FaSlackHash,
  FaSquarespace,
  FaWpbeginner,
  FaDharmachakra,
  FaHandsWash,
  FaSnowflake,
  FaPuzzlePiece,
  FaWeibo,
  FaGalacticRepublic,
  FaBookReader,
  FaBiohazard,FaCloudUploadAlt,
  FaAtom,
  FaHornbill,
  FaKhanda,
  FaRegSnowflake,
  FaSlack,
  FaKeybase,
  FaLeaf,
  FaPhabricator,
  FaPodcast,
  FaMedrt,
  FaSignal,
  FaBattleNet, 
  FaCarrot, 
  FaCloudversify,
  FaDocker
} from "react-icons/fa";
import { RiLayoutGridFill } from "react-icons/ri";
import { SiAdobeaudition } from "react-icons/si";
import { ImList2 } from "react-icons/im";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";

import { Badge, Input, Layout, Menu, notification } from "antd";
import logo from "../../logo.png";
import OutletMaster from "../Master/outletMaster";
import OutletMasterForm from "../Master/outletMaster/OutletMasterForm";
import OutletMasterFormCsv from "../Master/outletMaster/OutletMasterFormCsv";
import EmployeeMasterForm from "../Master/employeeMaster/EmployeeMasterForm";
import EmployeeMasterUpdateFormCsv from "../Master/employeeMaster/EmployeeMasterUpdateFormCsv";
import RoleMasterForm from "../Master/roleMaster/RoleMasterForm";
import EditRoleMasterForm from "../Master/editRoleMaster/EditRoleMasterForm";
import EmployeeMappingForm from "../Master/employeeMaping/EmployeeMappingForm";
import AuditCategoryForm from "../Master/auditCategory/AuditCategoryForm";
import AuditSubCategoryForm from "../Master/auditSubCategory/AuditSubCategoryForm";
import AuditPointMarksForm from "../Master/auditPointMarks/AuditPointMarksForm";
import AuditPointMarksView from "../Master/auditPointMarks/AuditPointMarksView";
import AuditPointListForm from "../Master/auditPointList/AuditPointListForm";
import EmployeeMaster from "../Master/employeeMaster";
import RoleMaster from "../Master/roleMaster";
import EditRoleMaster from "../Master/editRoleMaster";
import EmployeeMaping from "../Master/employeeMaping";
import EmailMaping from "../Master/emailMapping";
import EmailMappingForm from "../Master/emailMapping/EmailMappingForm";
import AuditCategory from "../Master/auditCategory";
import AuditSubCategory from "../Master/auditSubCategory";
import AuditPointMarks from "../Master/auditPointMarks";
import AuditPointList from "../Master/auditPointList";
import StateMaster from "../SubMaster/stateMaster";
import ZoneMaster from "../SubMaster/zoneMaster";
import SubZoneMaster from "../SubMaster/subZoneMaster";
import CityMaster from "../SubMaster/cityMaster";
import Division from "../SubMaster/division";
import Department from "../SubMaster/department";
import Designation from "../SubMaster/designation";
import Glaccount from "../SubMaster/Glaccount";
import GlaccountForm from "../SubMaster/Glaccount/GlaccountForm";
import EmployeeLevel from "../SubMaster/employeeLevel";
import StateMasterForm from "../SubMaster/stateMaster/StateMasterForm";
import ZoneMasterForm from "../SubMaster/zoneMaster/ZoneMasterForm";
import SubZoneMasterForm from "../SubMaster/subZoneMaster/SubZoneMasterForm";
import CityMasterForm from "../SubMaster/cityMaster/CityMasterForm";
import DivisionForm from "../SubMaster/division/DivisionForm";
import DepartForm from "../SubMaster/department/DepartForm";
import DesignationForm from "../SubMaster/designation/DesignationForm";
import EmployeeLevelForm from "../SubMaster/employeeLevel/EmployeeLevelForm";
import TopNavMenu from "./TopNavMenu";
import Footer from "./Footer";
import AuditEntry from "../Audit/auditEntry";
import AuditView from "../Audit/auditEntry/AuditView";
import AuditApproval from "../Audit/auditApproval";
import AuditReport from "../Audit/auditReport";
import AuditRank from "../Audit/auditRank";
import Report from "../Report/Report";
import AuditCAPA from "../Audit/auditSubCAPA";
import AuditEntryForm from "../Audit/auditEntry/AuditForm";
import Approval from "../Audit/auditApproval/Approval";
import CapaView from "../Audit/auditSubCAPA/CapaView";
import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import apis from "../../api/stateAPI";
import {
  MdCategory,
  MdOutlineDynamicForm,
  MdGroups,
  MdOutlineMiscellaneousServices,
  MdPriorityHigh,
  MdWork,
  MdOutlinePayment
} from "react-icons/md";
import { BsCash, BsCashCoin } from "react-icons/bs";
import AssetGroupIssue from "../Master/AssetGroupIssue";
import AssetGroupIssueForm from "../Master/AssetGroupIssue/AssetGroupIssueForm";
import AssetGroupSpare from "../Master/AssetGroupSpare";
import AssetGroupSpareForm from "../Master/AssetGroupSpare/AssetGroupSpareForm";
import VendorMaster from "../Master/VendorMaster";
import VendorMasterForm from "../Master/VendorMaster/VendorMasterForm";
import VendroUpdateFormCsv from "../Master/VendorMaster/VendroUpdateFormCsv";
import AssetMaster from "../Master/AssertMaster";
import AssetMasterForm from "../Master/AssertMaster/AssetMasterForm";
import AssetMasterUpdateForm from "../Master/AssertMaster/AssetMasterUpdateForm";
import ServiceFor from "../SubMaster/ServiceFor";
import ServiceForForm from "../SubMaster/ServiceFor/ServiceForForm";
import AssetGroup from "../SubMaster/assetGroup";
import AssetGroupForm from "../SubMaster/assetGroup/AssetGroupForm";
import ServiceCategory from "../SubMaster/ServiceCategory";
import ServiceCategoryForm from "../SubMaster/ServiceCategory/ServiceCategoryForm";
import PriorityForm from "../SubMaster/priority/PriorityForm";
import Priority from "../SubMaster/priority";
import TypeOfService from "../SubMaster/typeOfService";
import TypeOfServiceForm from "../SubMaster/typeOfService/TypeOfServiceForm";
import WorkDone from "../SubMaster/workDone";
import WorkDoneForm from "../SubMaster/workDone/WorkDoneForm";
import ModeOfPayment from "../SubMaster/modeOfPayment";
import ModeOfPaymentForm from "../SubMaster/modeOfPayment/ModeOfPaymentForm";
import CreateTicket from "../Service/CreateTicket";
import CreateTicketForm from "../Service/CreateTicket/createTicketForm";
import ShowTicket from "../Service/CreateTicket/showTicket";
import ShowTicket1 from "../Service/CreateTicket/showTicket1";
import TicketHandling from "../Service/TicketHandling";
import TicketHandlingForm from "../Service/TicketHandling/TicketHandlingForm";
import Formticket1 from "../Service/TicketHandling/Formticket1";
import Formticket2 from "../Service/TicketHandling/Formticket2";
import Formticket3 from "../Service/TicketHandling/Formticket3";
import Formticket4 from "../Service/TicketHandling/Formticket4";
import Pcadvancereqms from "../Service/Pcadvancereqms";
import PcadvancereqmsForm from "../Service/Pcadvancereqms/PcadvancereqmsForm";
import PcadvancereqmsEdit from "../Service/Pcadvancereqms/PcadvancereqmsEdit";
import PcadvancereqmsohEdit from "../Service/Ticketstatusreportorl/PcadvancereqmsohEdit";

import Poprocess from "../Service/Poprocess";
import PoprocessForm from "../Service/Poprocess/PoprocessForm";
import Pcaclaimsubmissionms from "../Service/Pcaclaimsubmissionms";
import PCClaminSubmissionView from "../Service/Pcaclaimsubmissionms/PcaclaimsubmissionmsForm";
import Pcclaimreqorl from "../Service/Pcclaimreqorl";
import PcclaimreqorlForm from "../Service/Pcclaimreqorl/PcclaimreqorlForm";
import Poprocessappoh from "../Service/Poprocessappoh";
import PoprocessappohForm from "../Service/Poprocessappoh/PoprocessForm";
import Poprocessappah from "../Service/Poprocessappah";
import PoprocessappahForm from "../Service/Poprocessappah/PoprocessForm";
import Orlpcclaimapparm from "../Service/Orlpcclaimapparm";
import OrlpcclaimapparmForm from "../Service/Orlpcclaimapparm/PoprocessForm";
import Orlpcclaimappbo from "../Service/Orlpcclaimappbo";
import OrlpcclaimappboForm from "../Service/Orlpcclaimappbo/PoprocessForm";
import Orlpcclaimappah from "../Service/Orlpcclaimappah";
import OrlpcclaimappahForm from "../Service/Orlpcclaimappah/PoprocessForm";
import Orlpcclaimappbh from "../Service/Orlpcclaimappbh";
import OrlpcclaimappbhForm from "../Service/Orlpcclaimappbh/PoprocessForm";
import Mspcclaimappoh from "../Service/Mspcclaimappoh";
import MspcclaimappohForm from "../Service/Mspcclaimappoh/PoprocessOHForm";
import MspcclaimappohAppRej from "../Service/Mspcclaimappoh/MSPcClaimAppOHForm";
import MspcclaimappahForm from "../Service/Mspcclaimappah/PoprocessForm";
import Mspcclaimappah from "../Service/Mspcclaimappah";
import Pcadvancereqmsah from "../Service/Msclaimappoh/PoprocessForm";
import Mspcadvanceappoh from "../Service/Mspcadvanceappoh";
import MspcadvanceappohForm from "../Service/Mspcadvanceappoh/PoprocessForm";
import Mspcadvanceappah from "../Service/Mspcadvanceappah";
import MspcadvanceappahForm from "../Service/Mspcadvanceappah/PoprocessForm";
import Mspcadvanceappbh from "../Service/Mspcadvanceappbh";
import MspcadvanceappbhForm from "../Service/Mspcadvanceappbh/PoprocessForm";
import Ticketstatusreportorl from "../Service/Ticketstatusreportorl";
import TicketstatusreportorlForm from "../Service/Ticketstatusreportorl/PoprocessForm";
import Pccliamorlreport from "../Service/Pccliamorlreport";
import PccliamorlreportForm from "../Service/Pccliamorlreport/PoprocessForm";
import Fisubmit from "../Service/fisubmit";
import Paymentclick from "../Service/paymentclick";
import Pclcimapprovalah from "../Service/pclcimapprovalah";
import Claimsubmission from "../Service/claimsubmission";
import Mspcrequestreport from "../Service/Mspcrequestreport";
import NewAssetMaster from "../Master/newAssetMaster";
import NewAssetMasterUpdateForm from "../Master/newAssetMaster/NewAssetMasterUpdateForm";
import NewAssetMasterForm from "../Master/newAssetMaster/NewAssetMasterForm";

import NewAssetMasterUpdateFormCsv from "../Master/newAssetMaster/NewAssetMasterUpdateFormCsv";
import PCSubmissionRejected from "../Service/PCSubmissionRejected";
import EmailMappingUpdateForm from "../Master/emailMapping/EmailMappingUpdateForm";
import AuditPointsImage from "../Master/auditPointsImage";
import AuditPointsImageForm from "../Master/auditPointsImage/AuditPointsImageForm";
import AuditTraining from "../Audit/auditTraining/AuditPointImageTrainForm";
import AuditTrainingForm from "../Audit/auditTraining/AuditPointImageTrainView";
import LicenseForm from "../SubMaster/licenseMaster/LicenseForm";
import PeriodForm from "../SubMaster/periodMaster/PeriodForm";
import LicensedetailMasterForm from "../Master/licensedetailMaster/LicensedetailForm";
import LicensedetailMaster from "../Master/licensedetailMaster";
import RenewalMaster from "../Master/renewalMaster";
import ApproveMaster from "../Master/approveMaster";
import RenewalMasterForm from "../Master/renewalMaster/RenewalForm";
import ApproveMasterForm from "../Master/approveMaster/ApproveForm";
import EditLicenseDetailsForm from "../Master/editLicenseDetails/EditLicenseDetailsForm";
import EditLicenseDetails from "../Master/editLicenseDetails";
import LicenseReport from "../Master/licenseReport";
import ActiveLicense from "../Master/activeLicenseDetails";
import ActiveLicenseForm from "../Master/activeLicenseDetails/ActiveLicenseDetailsForm";
import AuditFiletype from "../SubMaster/AuditFiletype";
import TypeMasterForm from "../SubMaster/AuditFiletype/TypeMasterForm";
import TrainingForm from "../Audit/overallTraining/AuditFilesForm";
import TrainingMaster from "../Master/AuditOverallTraining";
import TrainingMasterForm from "../Master/AuditOverallTraining/AuditOverallTrainingForm";
import LicenseMaster from "../SubMaster/licenseMaster";
import PeriodMaster from "../SubMaster/periodMaster";
import AuditNewMaster from "../Master/auditNewMaster";
import AuditNewMasterForm from "../Master/auditNewMaster/AuditNewMasterForm";
import AuditNewEntry from "../Audit/auditNewEntry";
import AuditNewEntryForm from "../Audit/auditNewEntry/AuditNewEntryForm";
import AuditNewEntryView from "../Audit/auditNewEntry/AuditNewEntryFormView";
import AuditNewCAPA from "../Audit/auditNewCAPA";
import AuditNewCAPAForm from "../Audit/auditNewCAPA/AuditNewCAPAForm";
import AuditNewCAPAView from "../Audit/auditNewCAPA/AuditNewCAPAFormView";
import AuditNewApproval from "../Audit/auditNewApproval";
import AuditNewApprovalView from "../Audit/auditNewApproval/AuditNewApprovalFormView";
import AuditDepCAPA from "../Audit/auditDepCapa";
import AuditDepCAPAView from "../Audit/auditDepCapa/AuditDepCapaFormView";
import AuditDepApproval from "../Audit/auditDepApproval";
import AuditDepApprovalView from "../Audit/auditDepApproval/AuditDepApprovalFormView";
import AuditNewReport from "../Audit/auditNewReport";
import AuditNewReportView from "../Audit/auditNewReport/AuditReportFormView";

import AuditPayment from "../Master/auditPayment";
import AuditPaymentForm from "../Master/auditPayment/AuditPaymentForm";

import AuditIncentiveHR from "../Audit/auditIncentiveHR/index";
import AuditIncentiveHRForm from "../Audit/auditIncentiveHR/AuditIncentiveHRFormView";
import AuditIncentiveHREditForm from "../Audit/auditIncentiveHR/AuditIncentiveHREditFormView";

import AuditIncentiveOHView from "../Audit/auditIncentiveOHApproveView";
import AuditIncentiveOHFormView from "../Audit/auditIncentiveOHApproveView/AuditIncentiveOHApproveFormView";

import AuditIncentiveOH from "../Audit/auditIncentiveOH";
import AuditIncentiveOHForm from "../Audit/auditIncentiveOH/AuditIncentiveOHFormView";

import AuditIncentiveAC from "../Audit/auditIncentiveAC";
import AuditIncentiveACForm from "../Audit/auditIncentiveAC/AuditIncentiveACFormView";

import AuditIncentiveACApproveView from "../Audit/auditIncentiveACApproveView";
import AuditIncentiveACApproveViewForm from "../Audit/auditIncentiveACApproveView/AuditIncentiveACApproveFormView";

import AuditIncentiveBH from "../Audit/auditIncentiveBH";
import AuditIncentiveBHForm from "../Audit/auditIncentiveBH/AuditIncentiveBHFormView";

import AuditIncentiveACFinal from "../Audit/auditIncentiveACFinal";
import AuditIncentiveACFinalForm from "../Audit/auditIncentiveACFinal/AuditIncentiveACFinalFormView";

import AuditIncentiveHRSubmitView from "../Audit/auditIncentiveHRSubmitView/index";
import AuditIncentiveHRSubmitViewForm from "../Audit/auditIncentiveHRSubmitView/AuditIncentiveHRSubmitFormView";

import AuditIncentiveReport from "../Audit/auditIncentiveReport/index";
import AuditIncentiveReportViewForm from "../Audit/auditIncentiveReport/AuditIncentiveReport";

import AuditIncentiveReportView from "../Audit/auditIncentiveReportView/index";
import AuditIncentiveReportFullViewForm from "../Audit/auditIncentiveReportView/AuditIncentiveReportFormView";

import AuditOutletwisePaymentReportView from "../Audit/auditIncentiveOutletWiseReport";
import AuditOutletwisePaymentReportViewForm from "../Audit/auditIncentiveOutletWiseReport/auditIncentiveOutletWiseReport";

import AuditIncentiveHRRejectionView from "../Audit/auditIncentiveHRRejectionView";
import AuditIncentiveHRRejectionViewForm from "../Audit/auditIncentiveHRRejectionView/AuditIncentiveHRRejectionFormView";

import AuditIncentiveBHApproveFormView from "../Audit/auditIncentiveBHApproveView";
import AuditIncentiveBHApproveFullView from "../Audit/auditIncentiveBHApproveView/AuditIncentiveBHApproveFormView";

import AuditIncentiveACApproveFullView from "../Audit/auditIncentiveACApproveFullView";
import AuditIncentiveACApproveFormFullView from "../Audit/auditIncentiveACApproveFullView/AuditIncentiveACApproveFormView";

import AuditIncentiveHRHoldReject from "../Audit/auditIncentiveHRHoldReject/index";
import AuditIncentiveHRHoldRejectForm from "../Audit/auditIncentiveHRHoldReject/AuditIncentiveHRHoldRejectFormView";

//for cash handling
import CashHandling from "../CashClosure/cashHandling";
import CashHandlingForm from "../CashClosure/cashHandling/CashHandlingForm";
import CashHandlingEdit from "../CashClosure/cashHandling/CashHandlingEdit";
import CashHandlingView from "../CashClosure/cashHandling/CashHandlingView";

import BackOffice from "../CashClosure/backOffice";
import BackofficeEdit from "../CashClosure/backOffice/BackOfficeEdit";
import BackOfficeView from "../CashClosure/backOffice/BackOfficeView";

import SaleReport from "../CashClosure/salesReport";
import CashHandlingReport from "../CashClosure/cashDeposit";

import Definitions from "../../screens/SubMaster/definitions";
import DefinitionsForm from "../../screens/SubMaster/definitions/DefinitionsForm";

import DefinitionsList from "../../screens/SubMaster/definitionsList";
import DefinitionsListForm from "../../screens/SubMaster/definitionsList/definitionsListForm";

import CrewMaster from "../../screens/Master/crewMaster";
import CrewMasterForm from "../../screens/Master/crewMaster/CrewMasterForm";

import AuditCategorywiseReport from "../Audit/auditCategorywiseReport";
import AuditCategorywiseReportForm from "../Audit/auditCategorywiseReport/auditCategorywiseReportFormView";
import CallEntry from "../Disciplines/callEntry";
import CallEntryView from "../Disciplines/callEntry/CallEditForm";

import CallBackReport from "../Disciplines/callBackReport";
import CallBackReportForm from "../Disciplines/callBackReport/CallReportFormView";

import CallEntryApproval from "../Disciplines/callBackApproval";
import CallEntryApprovalForm from "../Disciplines/callBackApproval/CallBackApprovalFormView";

import CustomerMaster from "../../screens/Master/customerMaster";
import CustomerMasterForm from "../../screens/Master/customerMaster/CustomerMasterForm";
import CallBackEntryEdit from "../Disciplines/editcallBackEntry";
import CallBackEntryEditForm from "../Disciplines/editcallBackEntry/editCallBackEntryForm";

import EquipmentMaster from "../DeepCleaning/equipmentMaster";
import EquipmentMasterForm from "../DeepCleaning/equipmentMaster/equipmentMasterForm";
import EquipmentMasterEditForm from "../DeepCleaning/equipmentMaster/equipmentMasterEditForm";
import DayPlanMapping from "../DeepCleaning/dayPlanMappingMaster";
import DayPlanMappingForm from "../DeepCleaning/dayPlanMappingMaster/dayPlanMappingForm";
import DayPlanMappingEditForm from "../DeepCleaning/dayPlanMappingMaster/dayPlanMappingEditForm";

import DeepCleaning from "../DeepCleaning/deepCleaning";
import DeepCleaningForm from "../DeepCleaning/deepCleaning/deepCleaningForm";
import DeviationReport from "../DeepCleaning/deviationReport";
import DeviationReportForm from "../DeepCleaning/deviationReport/deviationReportForm";

import EditDeepCleaning from "../DeepCleaning/editdeepCleaning";
import EditDeepCleaningForm from "../DeepCleaning/editdeepCleaning/editdeepCleaningForm";

import DeepCleaningApproval from "../DeepCleaning/deepCleaningApproval";
import DeepCleaningApprovalForm from "../DeepCleaning/deepCleaningApproval/DeepCleaningApprovalForm";

import Entry from "../Entry/Entry";
import EntryForm from "../Entry/Entry/entryForm";
import EntryEditForm from "../Entry/Entry/entryEditForm";


import BudgetMaster from '../EBReading/budgetMaster';
import BudgetMasterForm from '../EBReading/budgetMaster/budgetMasterForm';
import BudgetMasterEditForm from '../EBReading/budgetMaster/budgetMasterEditForm';

import EBReadingEntry from '../EBReading/ebReading';
//import EBReadingEntryForm from '../EBReading/ebReading/ebReadingForm';
import EBReadingEntryForm from '../EBReading/ebReading/ebReadingFormNew';
import EBReadingEditEntry from '../EBReading/ebReadingEdit';
//import EBReadingEditEntryForm from '../EBReading/ebReadingEdit/ebReadingEditForm';
import EBReadingEditEntryForm from '../EBReading/ebReadingEdit/ebReadingEditFormNew';
import EBReadingApprovalEntry from '../EBReading/ebReadingApproval';
import EBReadingApprovalEntryForm from '../EBReading/ebReadingApproval/ebReadingApprovalForm';
import EBReadingReport from '../EBReading/ebReadingReport';
import EBReadingReportForm from "../EBReading/ebReadingReport/ebReadingReportForm";

import EDC from "../EDC/edcDetails";
import EDCFormCsv from "../EDC/edcDetails/EDCUpdateFormCsv";
import OutletBankDetails from '../EDC/outletBankDetails';
import OutletBankDetailsForm from '../EDC/outletBankDetails/OutletBankForm';
import RistaSaleData from '../EDC/ristaSalesDetails';
import EDCSalesDetails from '../EDC/edcSalesReport';
import EDCSalesDetailsForm from '../EDC/edcSalesReport/edcSalesReportForm';
import Dotpe from "../EDC/dotpeDetails";
import DotpeFormCsv from "../EDC/dotpeDetails/DotpeUpdateFormCsv";
import DotpePaymentDetails from '../EDC/dotpePaymentReport';
import DotpePaymentDetailsForm from '../EDC/dotpePaymentReport/dotpePaymentReportForm';
import Swiggy from "../EDC/swiggyDetails";
import SwiggyFormCsv from "../EDC/swiggyDetails/SwiggyUpdateFormCsv";
import MagicPin from "../EDC/magicPinDetails";
import MagicPinFormCsv from "../EDC/magicPinDetails/MagicPinUpdateFormCsv";
import Zomato from "../EDC/zomatoDetails";
import ZomatoFormCsv from "../EDC/zomatoDetails/ZomatoUpdateFormCsv";

import SwiggyPaymentDetails from '../EDC/swiggyPaymentReport';
import SwiggyPaymentDetailsForm from '../EDC/swiggyPaymentReport/swiggyPaymentReportForm';
import ZomatoPaymentDetails from '../EDC/zomatoPaymentReport';
import ZomatoPaymentDetailsForm from '../EDC/zomatoPaymentReport/zomatoPaymentReportForm';
import MagicPinPaymentDetails from '../EDC/magicPinPaymentReport';
import MagicPinPaymentDetailsForm from '../EDC/magicPinPaymentReport/magicPinPaymentReportForm';

import OverallPaymentDetails from '../EDC/overallPaymentReport';
import OverallPaymentDetailsForm from '../EDC/overallPaymentReport/overallPaymentReportForm';

import StockDetails from '../StockTaking/stockDetails';
import StockDetailsForm from '../StockTaking/stockDetails/stockDetailsForm';

import Dashboard from '../EDC/dashboard';

import StockUpload from "../StockTaking/stockUploadDetails";
import StockUploadFormCsv from "../StockTaking/stockUploadDetails/StockUploadFormCsv";
import ConsumableMaster from '../StockTaking/consumableMaster';
import ConsumableMasterForm from '../StockTaking/consumableMaster/ConsumableMasterForm';
import ConsumableEntry from '../StockTaking/consumableEntry';
import ConsumableEntryForm from '../StockTaking/consumableEntry/ConsumableEntryForm';
import ConsumableEntryReport from '../StockTaking/consumableEntryReport';
import ConsumableEntryReportForm from '../StockTaking/consumableEntryReport/ConsumableEntryReportForm';
import ConsumableEntryLowReport from '../StockTaking/consumableEntryLowReport';
import ConsumableEntryLowReportForm from '../StockTaking/consumableEntryLowReport/ConsumableEntryLowReportForm';
import CalendarEvent from '../CalendarEvent/Calendar';
import CalendarEventReport from '../CalendarEvent/CalendarReport';

import ConsumableFullEntryViewReport from '../StockTaking/consumableFullEntryViewReport';
import ConsumableFullEntryViewReportForm from '../StockTaking/consumableFullEntryViewReport/ConsumableFullEntryViewReportForm';

import ConsumableMasterUploadCSVForm from '../StockTaking/consumableMaster/ConsumableMasterUploadFormCsv';
import ConsumableMasterEditForm from '../StockTaking/consumableMaster/ConsumableMasterEditForm';

import CalendarEventUploadCSVForm from '../CalendarEvent/Calendar/CalendarEventUpdateFormCsv';

import LogReport from '../Report/LogReport';

const { Sider } = Layout;

import { loginCheckReducer } from "../../@app/master/authSlice";
import PcprocessReject from "../Service/PCSubmissionRejected/PcprocessReject";

function App() {
  const {  loginStatus } = useSelector((state) => state.auth);
  let userLog = parseInt(localStorage.getItem("type"));
  const dispatch = useDispatch();
  let userData = JSON.parse(localStorage.getItem("userData"));
  //const userData = useSelector((state) => state.auth.userData.data);
  const badgeCount = useSelector((state) => state.auth.badgeCount);
  const [api, contextHolder] = notification.useNotification();
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setid] = useState("");
  const [pass, setpass] = useState("");
  const [TopTitle, setTopTitle] = useState("Dashboard");
  const loginStato = localStorage.getItem("loginStatus") == "true";

  const screen = userData?.data?.employee_mapping?.module_Screen ?? [];

  const main = {
    dashboard:
      userLog === 1
        ? true
        : screen.findIndex((s) => s.name === "Dashboard") > -1
        ? true
        : false,
    master:
      userLog === 1
        ? true
        : screen.findIndex((s) => s.name === "Master") > -1
        ? true
        : false,
    submaster:
      userLog === 1
        ? true
        : screen.findIndex((s) => s.name === "Sub Master") > -1
        ? true
        : false,
    audit:
      userLog === 1
        ? true
        : screen.findIndex(
            (s) =>
              s.name === "Audit" ||
              s.name === "Audit Approval" ||
              s.name === "CAPA" ||
              s.name === "Report" ||
              s.name === "Rank"
          ) > -1
        ? true
        : false,
    report:
      userLog === 1
        ? true
        : screen.findIndex((s) => s.name === "Report") > -1 ||
          screen.findIndex((s) => s.name === "report") > -1 ||
          screen.findIndex((s) => s.name === "logreport") > -1
        ? true
        : false,
    service:
      userLog === 1
        ? true
        : screen.findIndex((s) => s.name === "Service") > -1 ||
          screen.findIndex((s) => s.name === "service") > -1
        ? true
        : false,
    license:
      userLog === 1
        ? true
        : screen.findIndex((s) => s.name === "Create License") > -1 ||
          screen.findIndex((s) => s.name === "Edit License Details") > -1 ||
          screen.findIndex((s) => s.name === "Approve License") > -1 ||
          screen.findIndex((s) => s.name === "Renewal License") > -1 ||
          screen.findIndex((s) => s.name === "License Type Master") > -1 ||
          screen.findIndex((s) => s.name === "Period Master") > -1 ||
          screen.findIndex((s) => s.name === "License Report") > -1
        ? true
        : false,
    overalltraining:
      userLog === 1
        ? true
        : screen.findIndex((s) => s.name === "Audit Training Master") > -1 ||
          screen.findIndex((s) => s.name === "Overall Training") > -1
        ? true
        : false,
    auditnew:
      userLog === 1
        ? true
        : screen.findIndex((s) =>s.name === "Audit New Entry") > -1 ||
          screen.findIndex((s) =>s.name === "Audit Outlet CAPA") > -1 ||
          screen.findIndex((s) =>s.name === "Audit Department CAPA") > -1 ||
          screen.findIndex((s) =>s.name === "Audit Outlet Approval") > -1 ||
          screen.findIndex((s) =>s.name === "Audit Department Approval") > -1 ||
          screen.findIndex((s) =>s.name === "Audit 2.0 Report") > -1 ||
          screen.findIndex((s) =>s.name === "Audit CategoryWise Report") > -1 ||
          screen.findIndex((s) =>s.name === "Audit Incentive HR") > -1 ||
          screen.findIndex((s) =>s.name === "Audit Incentive OH") > -1 ||
          screen.findIndex((s) =>s.name === "Audit Incentive AC") > -1 ||
          screen.findIndex((s) =>s.name === "Audit Incentive BH") > -1 ||
          screen.findIndex((s) =>s.name === "Audit Incentive AC Final") > -1 ||
          screen.findIndex((s) =>s.name === "Audit Payment Report") > -1 ||
          screen.findIndex((s) =>s.name === "Audit Outletwise Payment Report" ) > -1 ||
          screen.findIndex((s) =>s.name === "Audit Categorywise Report") > -1
        ? true
        : false,
    cashclosure:
      userLog === 1
        ? true
        : screen.findIndex((s) =>s.name === "Cash Handling - Crew") > -1 ||
          screen.findIndex((s) =>s.name === "Cash Handling - Reports") > -1 ||
          screen.findIndex((s) =>s.name === "Cash Handling - Verification") > -1
        ? true
        : false,
    discipline:
      userLog === 1
        ? true
        : screen.findIndex((s) => s.name === "Call Back Entry") > -1 ||
          screen.findIndex((s) => s.name === "Call Back Entry Edit") > -1 ||
          screen.findIndex((s) => s.name === "Call Back Entry Approval") > -1 ||
          screen.findIndex((s) => s.name === "Call Back Report") > -1
        ? true
        : false,
    deepcleaning:
      userLog === 1
        ? true
        : screen.findIndex((s) =>s.name === "Equipment Master") > -1 ||
          screen.findIndex((s) => s.name === "Day Plan Mapping") > -1 ||
          screen.findIndex((s) => s.name === "Deep Cleaning") > -1 ||
          screen.findIndex((s) => s.name === "Edit Deep Cleaning") > -1 ||
          screen.findIndex((s) => s.name === "Deep Cleaning App") > -1 ||
          screen.findIndex((s) => s.name === "Deviation Report") > -1
        ? true
        : false,
    entryForm:
      userLog === 1
        ? true
        : screen.findIndex((s) => s.name === "Entry") > -1
        ? true
        : false,
    ebreading:
        userLog === 1 
        ? true 
        : screen.findIndex((s) => s.name === "Budget Master") > -1 ||
        screen.findIndex((s) => s.name === "EB Reading Entry") > -1 ||
        screen.findIndex((s) => s.name === "EB Reading Edit Entry") > -1 ||
        screen.findIndex((s) => s.name === "EB Reading Approval Entry") > -1 ||
        screen.findIndex((s) => s.name === "EB Reading Report") > -1      
        ? true 
        : false,
    edc:
        userLog === 1
          ? true
          : screen.findIndex((s) => s.name === "EDC") > -1 ||
          screen.findIndex((s) => s.name === "Outlet Bank Details") > -1 ||
          screen.findIndex((s) => s.name === "Rista Sales Data") > -1 ||
          screen.findIndex((s) => s.name === "EDC Payment Vs Bank") > -1 ||
          screen.findIndex((s) => s.name === "Dotpe Upload Details") > -1 ||
          screen.findIndex((s) => s.name === "Dotpe Payment Vs Sales") > -1 ||
          screen.findIndex((s) => s.name === "Swiggy Details") -1 || 
          screen.findIndex((s) => s.name === "MagicPin Details") -1 ||
          screen.findIndex((s) => s.name === "Zomato Details") -1 || 
          screen.findIndex((s) => s.name === "Swiggy Payment Vs Sales") > -1 ||
          screen.findIndex((s) => s.name === "Zomato Payment Vs Sales") > -1 ||
          screen.findIndex((s) => s.name === "MagicPin Payment Vs Sales") > -1 ||
          screen.findIndex((s) => s.name === "Overall Payment Vs Sales") > -1 
          ? true
          : false,
    stock:
          userLog === 1
            ? true
            : screen.findIndex((s) => s.name === "Stock Details") > -1 ||
            screen.findIndex((s) => s.name === "Rista Stock Upload") > -1 ||
            screen.findIndex((s) => s.name === "Consumable Master") > -1 ||
            screen.findIndex((s) => s.name === "Consumable Entry") > -1 ||     
            screen.findIndex((s) => s.name === "Consumable Entry Report") > -1 ||
            screen.findIndex((s) => s.name === "Consumable Entry Low Report") > -1 ||
            screen.findIndex((s) => s.name === "Consumable Full Entry View Report") > -1 
            ? true
            : false,  
    calendar:
            userLog === 1
              ? true
              : screen.findIndex((s) => s.name === "Calendar Add Event") > -1 || 
              screen.findIndex((s) => s.name === "Calendar Event Report") > -1
              ? true
              : false,
  };

  const sub = {
    entry:
      userLog === 1
        ? true
        : screen.findIndex((s) => s.name === "Audit") > -1
        ? true
        : false,
    approval:
      userLog === 1
        ? true
        : screen.findIndex((s) => s.name === "Audit Approval") > -1
        ? true
        : false,
    capa:
      userLog === 1
        ? true
        : screen.findIndex((s) => s.name === "CAPA") > -1
        ? true
        : false,
    report:
      userLog === 1
        ? true
        : screen.findIndex((s) => s.name === "Report") > -1
        ? true
        : false,
    rank:
      userLog === 1
        ? true
        : screen.findIndex((s) => s.name === "Rank") > -1
        ? true
        : false,
    learning:
      userLog === 1
        ? true
        : screen.findIndex((s) => s.name === "Training") > -1
        ? true
        : false,
    overalltraining:
      userLog === 1
        ? true
        : screen.findIndex((s) => s.name === "Overall Training") > -1
        ? true
        : false,
    trainingmaster:
      userLog === 1
        ? true
        : screen.findIndex((s) => s.name === "Audit Training Master") > -1
        ? true
        : false,
    entrynew:
      userLog === 1
        ? true
        : screen.findIndex((s) => s.name === "Audit New Entry") > -1
        ? true
        : false,
    capanew:
      userLog === 1
        ? true
        : screen.findIndex((s) => s.name === "Audit Outlet CAPA") > -1
        ? true
        : false,
    depcapa:
      userLog === 1
        ? true
        : screen.findIndex((s) => s.name === "Audit Department CAPA") > -1
        ? true
        : false,
    approvenew:
      userLog === 1
        ? true
        : screen.findIndex((s) => s.name === "Audit Outlet Approval") > -1
        ? true
        : false,
    approvedep:
      userLog === 1
        ? true
        : screen.findIndex((s) => s.name === "Audit Department Approval") > -1
        ? true
        : false,
    auditreport:
      userLog === 1
        ? true
        : screen.findIndex((s) => s.name === "Audit 2.0 Report") > -1
        ? true
        : false,
    // auditcatewisereport:userLog === 1 ? true : screen.findIndex((s) => s.name === 'Audit CategoryWise Report') > -1 ? true : false,
    auditincentivehr:
      userLog === 1
        ? true
        : screen.findIndex((s) => s.name === "Audit Incentive HR") > -1
        ? true
        : false,
    auditincentiveoh:
      userLog === 1
        ? true
        : screen.findIndex((s) => s.name === "Audit Incentive OH") > -1
        ? true
        : false,
    auditincentiveac:
      userLog === 1
        ? true
        : screen.findIndex((s) => s.name === "Audit Incentive AC") > -1
        ? true
        : false,
    auditincentivebh:
      userLog === 1
        ? true
        : screen.findIndex((s) => s.name === "Audit Incentive BH") > -1
        ? true
        : false,
    auditincentiveacfinal:
      userLog === 1
        ? true
        : screen.findIndex((s) => s.name === "Audit Incentive AC Final") > -1
        ? true
        : false,
    auditpaymentreport:
      userLog === 1
        ? true
        : screen.findIndex((s) => s.name === "Audit Payment Report") > -1
        ? true
        : false,
    auditoutletpaymentreport:
      userLog === 1
        ? true
        : screen.findIndex(
            (s) => s.name === "Audit Outletwise Payment Report"
          ) > -1
        ? true
        : false,
    auditcategorywisereport:
      userLog === 1
        ? true
        : screen.findIndex((s) => s.name === "Audit Categorywise Report") > -1
        ? true
        : false,
    create:
      userLog === 1
        ? true
        : screen.findIndex((s) => s.name === "Create License") > -1
        ? true
        : false,
    renewal:
      userLog === 1
        ? true
        : screen.findIndex((s) => s.name === "Renewal License") > -1
        ? true
        : false,
    approvallicense:
      userLog === 1
        ? true
        : screen.findIndex((s) => s.name === "Approve License") > -1
        ? true
        : false,
    editLicense:
      userLog === 1
        ? true
        : screen.findIndex((s) => s.name === "Edit License Details") > -1
        ? true
        : false,
    licenseType:
      userLog === 1
        ? true
        : screen.findIndex((s) => s.name === "License Type Master") > -1
        ? true
        : false,
    period:
      userLog === 1
        ? true
        : screen.findIndex((s) => s.name === "Period Master") > -1
        ? true
        : false,
    license_report:
      userLog === 1
        ? true
        : screen.findIndex((s) => s.name === "License Report") > -1
        ? true
        : false,
    cash_handling:
      userLog === 1
        ? true
        : screen.findIndex((s) => s.name === "Cash Handling - Crew") > -1
        ? true
        : false,
    cash_handling_report:
      userLog === 1
        ? true
        : screen.findIndex((s) => s.name === "Cash Handling - Reports") > -1
        ? true
        : false,
    cash_handling_verification:
      userLog === 1
        ? true
        : screen.findIndex((s) => s.name === "Cash Handling - Verification") >
          -1
        ? true
        : false,
    crew_master:
      userLog === 1
        ? true
        : screen.findIndex((s) => s.name === "Crew Master") > -1
        ? true
        : false,
    sales_data:
      userLog === 1
        ? true
        : screen.findIndex((s) => s.name === "Sales Data") > -1
        ? true
        : false,
    callback_entry:
      userLog === 1
        ? true
        : screen.findIndex((s) => s.name === "Call Back Entry") > -1
        ? true
        : false,
    callback_entry_edit:
      userLog === 1
        ? true
        : screen.findIndex((s) => s.name === "Call Back Entry Edit") > -1
        ? true
        : false,
    callback_approval:
      userLog === 1
        ? true
        : screen.findIndex((s) => s.name === "Call Back Entry Approval") > -1
        ? true
        : false,
    callback_report:
      userLog === 1
        ? true
        : screen.findIndex((s) => s.name === "Call Back Report") > -1
        ? true
        : false,
    equipment_master:
      userLog === 1
        ? true
        : screen.findIndex((s) => s.name === "Equipment Master") > -1
        ? true
        : false,
    day_plan_mapping:
      userLog === 1
        ? true
        : screen.findIndex((s) => s.name === "Day Plan Mapping") > -1
        ? true
        : false,
    deep_cleaning:
      userLog === 1
        ? true
        : screen.findIndex((s) => s.name === "Deep Cleaning") > -1
        ? true
        : false,
    edit_deep_cleaning:
      userLog === 1
        ? true
        : screen.findIndex((s) => s.name === "Edit Deep Cleaning") > -1
        ? true
        : false,
    deep_cleaning_app:
      userLog === 1
        ? true
        : screen.findIndex((s) => s.name === "Deep Cleaning App") > -1
        ? true
        : false,
    deviation_report:
      userLog === 1
        ? true
        : screen.findIndex((s) => s.name === "Deviation Report") > -1
        ? true
        : false,
    entryFormPage:
      userLog === 1
        ? true
        : screen.findIndex((s) => s.name === "Entry") > -1
        ? true
        : false,
    budget_master:
        userLog === 1 
          ? true 
          :screen.findIndex((s) => s.name === 'Budget Master') > -1 
          ? true 
          :false,
    ebreadingentryform:
        userLog === 1 
        ? true 
        :screen.findIndex((s) => s.name === 'EB Reading Entry') > -1 
        ? true 
        :false,
    ebreadingeditentryform:
        userLog === 1 
        ? true 
        :screen.findIndex((s) => s.name === 'EB Reading Edit Entry') > -1 
        ? true 
        :false,
    ebreadingapprovalentryform:
        userLog === 1 
        ? true 
        :screen.findIndex((s) => s.name === 'EB Reading Approval Entry') > -1 
        ? true 
        :false,
    ebreadingreportform:
        userLog === 1 
        ? true 
        :screen.findIndex((s) => s.name === 'EB Reading Report') > -1 
        ? true 
        :false,
    edcform:
        userLog === 1 
        ? true 
        :screen.findIndex((s) => s.name === 'EDC Upload Details') > -1 
        ? true 
        :false,
    outletBankform:
        userLog === 1 
        ? true 
        :screen.findIndex((s) => s.name === 'Outlet Bank Details') > -1 
        ? true 
        :false,
    ristaSalesform:
        userLog === 1 
        ? true 
        :screen.findIndex((s) => s.name === 'Rista Sales Data') > -1 
        ? true 
        :false,
    edcsalesReport:
        userLog === 1 
        ? true 
        :screen.findIndex((s) => s.name === 'EDC Payment Vs Bank') > -1 
        ? true 
        :false,  
    dotpeform:
        userLog === 1 
        ? true 
        :screen.findIndex((s) => s.name === 'Dotpe Upload Details') > -1 
        ? true 
        :false,     
    dotpeReportform:
        userLog === 1 
        ? true 
        :screen.findIndex((s) => s.name === 'Dotpe Payment Vs Sales') > -1 
        ? true 
        :false,     
    swiggyform:
        userLog === 1 
        ? true 
        :screen.findIndex((s) => s.name === 'Swiggy Upload Details') > -1 
        ? true 
        :false,     
    magicPinform:
        userLog === 1 
        ? true 
        :screen.findIndex((s) => s.name === 'MagicPin Upload Details') > -1 
        ? true 
        :false,    
    zomatoform:
        userLog === 1 
        ? true 
        :screen.findIndex((s) => s.name === 'Zomato Upload Details') > -1 
        ? true 
        :false,      
    swiggysalesReport:
        userLog === 1 
        ? true 
        :screen.findIndex((s) => s.name === 'Swiggy Payment Vs Sales') > -1 
        ? true 
        :false,  
    zomatosalesReport:
        userLog === 1 
        ? true 
        :screen.findIndex((s) => s.name === 'Zomato Payment Vs Sales') > -1 
        ? true 
        :false,  
    magicPinsalesReport:
        userLog === 1 
        ? true 
        :screen.findIndex((s) => s.name === 'MagicPin Payment Vs Sales') > -1 
        ? true 
        :false,  
    overallsalesReport:
        userLog === 1 
        ? true 
        :screen.findIndex((s) => s.name === 'Overall Payment Vs Sales') > -1 
        ? true 
        :false,  
    stockDetailsForm:
        userLog === 1 
        ? true 
        :screen.findIndex((s) => s.name === 'Stock Details') > -1 
        ? true 
        :false,  
    ristaStockUploadform:
        userLog === 1 
        ? true 
        :screen.findIndex((s) => s.name === 'Rista Stock Upload') > -1 
        ? true 
        :false,     
    consumableform:
        userLog === 1 
        ? true 
        :screen.findIndex((s) => s.name === 'Consumable Master') > -1 
        ? true 
        :false,     
    consumableEntryform:
        userLog === 1 
        ? true 
        :screen.findIndex((s) => s.name === 'Consumable Entry') > -1 
        ? true 
        :false,     
    consumableEditEntryform:
        userLog === 1 
        ? true 
        :screen.findIndex((s) => s.name === 'Consumable Edit Entry') > -1 
        ? true 
        :false,     
    consumableEntryReportform:
        userLog === 1 
        ? true 
        :screen.findIndex((s) => s.name === 'Consumable Entry Report') > -1 
        ? true 
        :false,    
    consumableEntryLowReportform:
        userLog === 1 
        ? true 
        :screen.findIndex((s) => s.name === 'Consumable Entry Low Report') > -1 
        ? true 
        :false,          
    consumableFullEntryViewReportform:
        userLog === 1 
        ? true 
        :screen.findIndex((s) => s.name === 'Consumable Full Entry View Report') > -1 
        ? true 
        :false, 
    calendarAddEventform:
        userLog === 1 
        ? true 
        :screen.findIndex((s) => s.name === 'Calendar Add Event') > -1 
        ? true 
        :false,      
    calendarEventReportform:
        userLog === 1 
        ? true 
        :screen.findIndex((s) => s.name === 'Calendar Event Report') > -1 
        ? true 
        :false,      
    logreport:
        userLog === 1 
        ? true 
        :screen.findIndex((s) => s.name === 'Log Report') > -1 
        ? true 
        :false,      
  };

  const subservice = {
    create_ticket:
      userLog === 1
        ? true
        : screen.findIndex((s) => {
            return s.name?.includes("Service | createTicket");
          }) > -1
        ? true
        : false,
    ticket_handling:
      userLog === 1
        ? true
        : screen.findIndex((s) => s.name === "Ticket Handling") > -1
        ? true
        : false,
    pc_claim_submission:
      userLog === 1
        ? true
        : screen.findIndex((s) => {
            return s.name?.includes("Service | PC Claim Submission MS");
          }) > -1
        ? true
        : false,
    payment_request:
      userLog === 1
        ? true
        : screen.findIndex((s) => {
            return s.name?.includes("Payment Request | PC Adv. Req. - MS");
          }) > -1 ||
           screen.findIndex((s) => 
           {return s.name?.includes("Payment Request | PettyCash Claim Request- ORL");}) > -1
        ? true
        : false,

    petty_cash_clam_approval:
      userLog === 1
        ? true
        : screen.findIndex((s) => {
            return s.name?.includes(
              "Petty Cash Claim Approval | ORL - Pettycash Claim Approval - ARM"
            );
          }) > -1
        ? true
        : false,
    po_proccess_approval:
      userLog === 1
        ? true
        : screen.findIndex((s) => {
            return s.name?.includes("PO Process Approval - OH");
          }) > -1
        ? true
        : false,
    petty_cash_request_approval:
      userLog === 1
        ? true
        : screen.findIndex((s) => {
            return s.name?.includes(
              "Petty Cash Request Approval | MS Petty Cash Advance Approval - OH"
            );
          }) > -1
        ? true
        : false,
    report:
      userLog === 1
        ? true
        : screen.findIndex((s) => {
            return s.name?.includes("Report | Ticket Status Report");
          }) > -1
        ? true
        : false,       
  };

  const thirtyservice = {
    pc_advance:
      userLog === 1
        ? true
        : screen.findIndex((s) => {
            return s.name?.includes("Payment Request | PC Adv. Req. - MS");
          }) > -1
        ? true
        : false,
    pettcash_claim_request:
      userLog === 1
        ? true
        : screen.findIndex((s) => {
            return s.name?.includes("Payment Request | PettyCash Claim Request- ORL");
          }) > -1
        ? true
        : false,
    pettcash_claim_approval_arm:
      userLog === 1
        ? true
        : screen.findIndex((s) => {
            return s.name?.includes(
              "Petty Cash Claim Approval | ORL - Pettycash Claim Approval - ARM"
            );
          }) > -1
        ? true
        : false,  
    petty_cash_clam_approval_back_office:
      userLog === 1
        ? true
        : screen.findIndex((s) => {
            return s.name?.includes(
              "Petty Cash Claim Approval | ORL - Pettycash Claim Approval - Back Office"
            );
          }) > -1
        ? true
        : false,
    petty_cash_clam_approval_ah:
      userLog === 1
        ? true
        : screen.findIndex((s) => {
            return s.name?.includes(
              "Petty Cash Claim Approval | ORL - Pettycash Claim Approval - AH"
            );
          }) > -1
        ? true
        : false,
    petty_cash_ms_clam_approval_oh:
      userLog === 1
        ? true
        : screen.findIndex((s) => {
            return s.name?.includes(
              "Petty Cash Claim Approval | MS - Petty Cash Claim Approval - OH"
            );
          }) > -1
        ? true
        : false,
    petty_ms_cash_clam_approval_ah:
      userLog === 1
        ? true
        : screen.findIndex((s) => {
            return s.name?.includes(
              "Petty Cash Claim Approval | MS - Petty Cash Claim Approval - AH"
            );
          }) > -1
        ? true
        : false,
    petty_cash_ms_advance_clam_approval_oh:
      userLog === 1
        ? true
        : screen.findIndex((s) => {
            return s.name?.includes(
              "Petty Cash Request Approval | MS Petty Cash Advance Approval - OH"
            );
          }) > -1
        ? true
        : false,
    petty_cash_ms_advance_clam_approval_ah:
      userLog === 1
        ? true
        : screen.findIndex((s) => {
            return s.name?.includes(
              "Petty Cash Request Approval | MS Petty Cash Advance Approval - AH"
            );
          }) > -1
        ? true
        : false,
    ticket_status_report:
        userLog === 1
        ? true
        : screen.findIndex((s) => {
            return s.name?.includes("Report | Ticket Status Report");
          }) > -1
        ? true
        : false,     
    ms_pettycash_ticket_status_report:
        userLog === 1
        ? true
        : screen.findIndex((s) => {
            return s.name?.includes("Report | MS - PettyCash Request Report");
          }) > -1
        ? true
        : false,   
        orl_pettycash_ticket_status_report:
        userLog === 1
        ? true
        : screen.findIndex((s) => {
            return s.name?.includes("Report | PettyCash Claim Report ORL");
          }) > -1
        ? true
        : false,       
  };

  useEffect(() => {
    if (userLog === 2) {
      const vL = localStorage.getItem("passchange");
      if (!vL) {
        setIsModalOpen(true);
      }
    }
  }, []);

  const handleOk = () => {
    if (id === "" && pass === "") {
      api.open({
        message: "Fields are Required",
        description: "ID and Password Field Need to Fill",
        type: "error"
      });
    } else {
      apis
        .updatePass({ employee_code: id, Password: pass })
        .then(({ data }) => {
          if (data.statusText === "Password Updated.") {
            api.open({
              message: "SuccussFully",
              description: data.statusText,
              type: "success"
            });
            setIsModalOpen(false);
            localStorage.setItem("passchange", true);
          } else {
            api.open({
              message: "Try Again",
              description: "",
              type: "error"
            });
          }
        });
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    let params = {};
    const empCode = localStorage.getItem("emp_code");
    const loginStato = localStorage.getItem("loginStatus") == "true";
    let interval;
    params = { emp_date: localStorage.getItem("emp_code") };
    if (empCode && loginStato) {
      interval = setInterval(function () {
        dispatch(loginCheckReducer({ data: { params }, api }));
      }, 35000);
    } else {
      clearInterval(interval);
    }
  }, []);

  return (
    <>
      <Layout style={{ height: "100vh" }}>
        {contextHolder}
        <Sider
          trigger={null}
          width={150}
          collapsible
          collapsed={collapsed}
          style={{ transition: "0.5s" }}
          className={`${collapsed ? "d-flex" : "d-none"} `}>
          <div style={{ textAlign: "center", marginTop: "10px" }}>
            <img
              src={logo}
              alt="logo"
              style={{ width: "110%", padding: "35px" }}
              className="nav-logo"></img>
          </div>
          <Menu
            mode="vertical"
            onClick={({ key }) => {
              if (key === "signout") {
                //TODO, sign out feature here
              } else {
                if (key !== "search") navigate(key);
              }
            }}
            style={{ backgroundColor: "black", color: "white" }}>           
            {main.dashboard && (
              <Menu.Item key="/dashboard" className="menu side-nav">
                <div className="flex flex-col">
                  <div>
                    <RiLayoutGridFill
                      size={28}
                      color="#f5a60b"
                      className="menu-icon"
                    />
                  </div>
                  <div key={'/dashboard'} className="menu-title">Dashboard</div>
                </div>
              </Menu.Item>
            )}

            {main.master && (
              <Menu.SubMenu
                className="side-nav maintext"
                key="sub1"
                title={
                  <div>
                    <div>
                      <FaDatabase
                        size={20}
                        color="#f5a60b"
                        className="menu-icon"
                      />
                    </div>
                    <div className="menu-title">Master</div>
                  </div>
                }>
                <Menu.Item
                  key={"/outletMaster"}
                  icon={<FaStackExchange size={17} />}>
                  <span>Outlet Master </span>
                  <span className="count">
                    <Badge
                      size="default"
                      count={
                        badgeCount ? badgeCount?.Master?.["Outlet Master"] : 0
                      }
                      showZero
                      color="#3199dc"
                    />
                  </span>
                </Menu.Item>
                <Menu.Item
                  key={"/employeeMaster"}
                  icon={<FaUserAlt size={17} />}>
                  <span> Employee Master </span>
                  <span className="count">
                    <Badge
                      size="default"
                      count={
                        badgeCount
                          ? badgeCount?.["Master"]?.["Employee Master"]
                          : 0
                      }
                      showZero
                      color="#3199dc"
                    />
                  </span>
                </Menu.Item>
                <Menu.Item
                  key={"/customerMaster"}
                  icon={<FaEmpire size={17} />}>
                  <span> Customer Master </span>
                  <span className="count">
                    <Badge
                      size="default"
                      count={
                        badgeCount
                          ? badgeCount?.["Master"]?.["Customer Master"]
                          : 0
                      }
                      showZero
                      color="#3199dc"
                    />
                  </span>
                </Menu.Item>
                <Menu.Item
                  key={"/roleMaster"}
                  icon={<FaUserTag size={17} />}
                  onClick={() => setTopTitle("Role Master")}>
                  <span>Role Master </span>
                  <span className="count">
                    <Badge
                      size="default"
                      count={
                        badgeCount ? badgeCount?.["Master"]?.["Role Master"] : 0
                      }
                      showZero
                      color="#3199dc"
                    />
                  </span>
                </Menu.Item>
                <Menu.Item
                  key={"/editRoleMaster"}
                  icon={<FaUserEdit size={17} />}>
                  <span>Edit Role Master </span>
                  <span className="count">
                    <Badge
                      size="default"
                      count={
                        badgeCount
                          ? badgeCount?.["Master"]?.["Edit Role Master"]
                          : 0
                      }
                      showZero
                      color="#3199dc"
                    />
                  </span>
                </Menu.Item>
                <Menu.Item
                  key={"/employeeMapping"}
                  icon={<FaStreetView size={17} />}>
                  <span>Employee Mapping </span>
                  <span className="count">
                    <Badge
                      size="default"
                      count={
                        badgeCount
                          ? badgeCount?.["Master"]?.["Employee Mapping"]
                          : 0
                      }
                      showZero
                      color="#3199dc"
                    />
                  </span>
                </Menu.Item>
                <Menu.Item
                  key={"/emailMapping"}
                  icon={<FaStreetView size={17} />}>
                  <span>Email Mapping </span>
                  <span className="count">
                    <Badge
                      size="default"
                      count={
                        badgeCount
                          ? badgeCount?.["Master"]?.["Email Mapping"]
                          : 0
                      }
                      showZero
                      color="#3199dc"
                    />
                  </span>
                </Menu.Item>
                <Menu.Item
                  key={"/auditCategory"}
                  icon={<SiAdobeaudition size={17} />}>
                  <span>Audit Category </span>
                  <span className="count">
                    <Badge
                      size="default"
                      count={
                        badgeCount
                          ? badgeCount?.["Master"]?.["Audit Category"]
                          : 0
                      }
                      showZero
                      color="#3199dc"
                    />
                  </span>
                </Menu.Item>
                <Menu.Item
                  key={"/auditSubCategory"}
                  icon={<FaBook size={17} />}>
                  <span>Audit Sub Category </span>
                  <span className="count">
                    <Badge
                      size="default"
                      count={
                        badgeCount
                          ? badgeCount?.["Master"]?.["Audit Sub Category"]
                          : 0
                      }
                      showZero
                      color="#3199dc"
                    />
                  </span>
                </Menu.Item>
                <Menu.Item key={"/auditPointList"} icon={<ImList2 size={17} />}>
                  <span>Audit point list </span>
                  <span className="count">
                    <Badge
                      size="default"
                      count={
                        badgeCount
                          ? badgeCount?.["Master"]?.["Audit Point list"]
                          : 0
                      }
                      showZero
                      color="#3199dc"
                    />
                  </span>
                </Menu.Item>
                <Menu.Item
                  key={"/auditPointMarks"}
                  icon={<FaCalculator size={17} />}>
                  <span>Audit point Marks </span>
                  <span className="count">
                    <Badge
                      size="default"
                      count={
                        badgeCount
                          ? badgeCount?.["Master"]?.["Audit Point Marks"]
                          : 0
                      }
                      showZero
                      color="#3199dc"
                    />
                  </span>
                </Menu.Item>
                <Menu.Item
                  key={"/AssetGroupIssue"}
                  icon={<MdGroups size={17} />}
                  onClick={() => setTopTitle("Asset Group Issue")}>
                  <span>Asset Group Issue</span>
                  <span className="count">
                    <Badge size="default" count={11} showZero color="#3199dc" />
                  </span>
                </Menu.Item>
                <Menu.Item
                  key={"/AssetGroupSpare"}
                  icon={<MdOutlineMiscellaneousServices size={17} />}
                  onClick={() => setTopTitle("Asset Group Spare")}>
                  <span>Asset Group Spare</span>
                  <span className="count">
                    <Badge size="default" count={11} showZero color="#3199dc" />
                  </span>
                </Menu.Item>
                <Menu.Item
                  key={"/VendorMaster"}
                  icon={<MdWork size={17} />}
                  onClick={() => setTopTitle("Vendor Master")}>
                  <span>Vendor Master</span>
                  <span className="count">
                    <Badge size="default" count={11} showZero color="#3199dc" />
                  </span>
                </Menu.Item>
                <Menu.Item key={"/training"} icon={<FaCalculator size={17} />}>
                  <span>Audit points Image </span>
                  <span className="count">
                    <Badge
                      size="default"
                      count={
                        badgeCount
                          ? badgeCount?.["Master"]?.["Audit Points Image"]
                          : 0
                      }
                      showZero
                      color="#3199dc"
                    />
                  </span>
                </Menu.Item>
                <Menu.Item
                  key={"/outletAssetGroupMapping"}
                  icon={<FaServicestack size={17} />}
                  onClick={() => setTopTitle("Outlet Asset Group Mapping")}>
                  <span>Outlet-Asset Group Mapping</span>
                  <span className="count">
                    <Badge size="default" count={11} showZero color="#3199dc" />
                  </span>
                </Menu.Item>
                <Menu.Item
                  key={"/assetMaster"}
                  icon={<FaServicestack size={17} />}
                  onClick={() => setTopTitle("Asset Master")}>
                  <span>Asset Master</span>
                  <span className="count">
                    <Badge size="default" count={11} showZero color="#3199dc" />
                  </span>
                </Menu.Item>

                <Menu.Item
                  key={"/auditNewMaster"}
                  icon={<FaMapMarkedAlt size={17} />}>
                  <span>Audit New Master </span>
                  <span className="count">
                    <Badge
                      size="default"
                      count={
                        badgeCount
                          ? badgeCount?.["Master"]?.["Audit New Master"]
                          : 0
                      }
                      showZero
                      color="#3199dc"
                    />
                  </span>
                </Menu.Item>

                <Menu.Item
                  key={"/auditPayment"}
                  icon={<SiAdobeaudition size={17} />}>
                  <span>Audit Payment </span>
                  <span className="count">
                    <Badge
                      size="default"
                      count={
                        badgeCount
                          ? badgeCount?.["Master"]?.["Audit Payment"]
                          : 0
                      }
                      showZero
                      color="#3199dc"
                    />
                  </span>
                </Menu.Item>
                {/* <Menu.Item key={"/AuditOverallTraining"} icon={<ImList2 size={27} />}
                 onClick={() => setTopTitle("Audit Overall Training Master")}>
                  <span>Audit Training Master</span>
                  <span className="count">
                    <Badge
                      size="default"
                      count={
                        badgeCount
                          ? badgeCount?.["Training"]?.["Audit Training Master"]
                          : 0
                      }
                      showZero
                      color="#3199dc"
                    />
                  </span>
                </Menu.Item> */}
                {/* <Menu.Item key={'/AssetGroupIssue'} icon={<MdGroups size={17} />} onClick={() => setTopTitle('Asset Group Issue')}>
                  <span>Asset Group Issue</span>
                  <span className='count'>
                    <Badge size='default' count={11} showZero color='#3199dc' />
                  </span>
                </Menu.Item>
                <Menu.Item key={'/AssetGroupSpare'} icon={<MdOutlineMiscellaneousServices size={17} />} onClick={() => setTopTitle('Asset Group Spare')}>
                  <span>Asset Group Spare</span>
                  <span className='count'>
                    <Badge size='default' count={11} showZero color='#3199dc' />
                  </span>
                </Menu.Item>
                <Menu.Item key={'/VendorMaster'} icon={<MdWork size={17} />} onClick={() => setTopTitle('Vendor Master')}>
                  <span>Vendor Master</span>
                  <span className='count'>
                    <Badge size='default' count={11} showZero color='#3199dc' />
                  </span>
                </Menu.Item>
                <Menu.Item key={'/AssetMaster'} icon={<FaServicestack size={17} />} onClick={() => setTopTitle('Asset Master')}>
                  <span>Asset Master</span>
                  <span className='count'>
                    <Badge size='default' count={11} showZero color='#3199dc' />
                  </span>
                </Menu.Item> */}
              </Menu.SubMenu>
            )}

            {main.submaster && (
              <Menu.SubMenu
                className="side-nav maintext"
                key="sub2"
                title={
                  <div>
                    <div>
                      <FaDatabase
                        size={20}
                        color="#f5a60b"
                        className="menu-icon"
                      />
                    </div>
                    <div className="menu-title">Sub Master</div>
                  </div>
                }>
                <Menu.Item
                  key={"/stateMaster"}
                  icon={<FaStreetView size={17} />}>
                  <span>State Master</span>
                  <span className="count">
                    <Badge
                      size="default"
                      count={
                        badgeCount
                          ? badgeCount?.["Sub Master"]?.["State Master"]
                          : 0
                      }
                      showZero
                      color="#3199dc"
                    />
                  </span>
                </Menu.Item>
                <Menu.Item
                  key={"/zoneMaster"}
                  icon={<FaLocationArrow size={17} />}>
                  <span>Zone Master</span>
                  <span className="count">
                    <Badge
                      size="default"
                      count={
                        badgeCount
                          ? badgeCount?.["Sub Master"]?.["Zone Master"]
                          : 0
                      }
                      showZero
                      color="#3199dc"
                    />
                  </span>
                </Menu.Item>
                <Menu.Item key={"/subZoneMaster"} icon={<FaMap size={17} />}>
                  <span>Sub Zone Master</span>
                  <span className="count">
                    <Badge
                      size="default"
                      count={
                        badgeCount
                          ? badgeCount?.["Sub Master"]?.["Sub Zone Master"]
                          : 0
                      }
                      showZero
                      color="#3199dc"
                    />
                  </span>
                </Menu.Item>
                <Menu.Item key={"/cityMaster"} icon={<FaGlobe size={17} />}>
                  <span>City Master</span>
                  <span className="count">
                    <Badge
                      size="default"
                      count={
                        badgeCount
                          ? badgeCount?.["Sub Master"]?.["City Master"]
                          : 0
                      }
                      showZero
                      color="#3199dc"
                    />
                  </span>
                </Menu.Item>
                <Menu.Item
                  key={"/division"}
                  icon={<FaSortAmountDown size={17} />}>
                  <span>Division</span>
                  <span className="count">
                    <Badge
                      size="default"
                      count={
                        badgeCount
                          ? badgeCount?.["Sub Master"]?.["Division"]
                          : 0
                      }
                      showZero
                      color="#3199dc"
                    />
                  </span>
                </Menu.Item>
                <Menu.Item key={"/department"} icon={<FaBuilding size={17} />}>
                  <span>Department</span>
                  <span className="count">
                    <Badge
                      size="default"
                      count={
                        badgeCount
                          ? badgeCount?.["Sub Master"]?.["Department"]
                          : 0
                      }
                      showZero
                      color="#3199dc"
                    />
                  </span>
                </Menu.Item>
                <Menu.Item
                  key={"/designation"}
                  icon={<FaBriefcase size={17} />}
                  onClick={() => setTopTitle("Designation")}>
                  <span>Designation</span>
                  <span className="count">
                    <Badge
                      size="default"
                      count={
                        badgeCount
                          ? badgeCount?.["Sub Master"]?.["Designation"]
                          : 0
                      }
                      showZero
                      color="#3199dc"
                    />
                  </span>
                </Menu.Item>
                <Menu.Item
                  key={"/employeeLevel"}
                  icon={<FaUserAlt size={17} />}>
                  <span>Employee Level</span>
                  <span className="count">
                    <Badge
                      size="default"
                      count={
                        badgeCount
                          ? badgeCount?.["Sub Master"]?.["Employee Level"]
                          : 0
                      }
                      showZero
                      color="#3199dc"
                    />
                  </span>
                </Menu.Item>
                <Menu.Item
                  key={"/serviceFor"}
                  icon={<MdOutlineMiscellaneousServices size={17} />}
                  onClick={() => setTopTitle("Service For")}>
                  <span>Service For</span>
                  <span className="count">
                    <Badge size="default" count={11} showZero color="#3199dc" />
                  </span>
                </Menu.Item>
                <Menu.Item
                  key={"/assetGroup"}
                  icon={<MdGroups size={17} />}
                  onClick={() => setTopTitle("Asset Group")}>
                  <span>Asset Group</span>
                  <span className="count">
                    <Badge size="default" count={11} showZero color="#3199dc" />
                  </span>
                </Menu.Item>
                <Menu.Item
                  key={"/serviceCategory"}
                  icon={<MdCategory size={17} />}
                  onClick={() => setTopTitle("Service Category")}>
                  <span>Service Category</span>
                  <span className="count">
                    <Badge size="default" count={11} showZero color="#3199dc" />
                  </span>
                </Menu.Item>
                <Menu.Item
                  key={"/priority"}
                  icon={<MdPriorityHigh size={17} />}
                  onClick={() => setTopTitle("Priority")}>
                  <span>Priority</span>
                  <span className="count">
                    <Badge size="default" count={11} showZero color="#3199dc" />
                  </span>
                </Menu.Item>
                <Menu.Item
                  key={"/typeOfService"}
                  icon={<FaServicestack size={17} />}
                  onClick={() => setTopTitle("Type Of Service")}>
                  <span>Type Of Service</span>
                  <span className="count">
                    <Badge size="default" count={11} showZero color="#3199dc" />
                  </span>
                </Menu.Item>
                <Menu.Item
                  key={"/workDone"}
                  icon={<MdWork size={17} />}
                  onClick={() => setTopTitle("Work Done")}>
                  <span>Work Done</span>
                  <span className="count">
                    <Badge size="default" count={11} showZero color="#3199dc" />
                  </span>
                </Menu.Item>
                <Menu.Item
                  key={"/modeOfPayment"}
                  icon={<BsCash size={17} />}
                  onClick={() => setTopTitle("Mode Of Payment")}>
                  <span>Mode Of Payment</span>
                  <span className="count">
                    <Badge size="default" count={11} showZero color="#3199dc" />
                  </span>
                </Menu.Item>
                <Menu.Item
                  key={"/glaccount"}
                  icon={<MdOutlineDynamicForm size={17} />}
                  onClick={() => setTopTitle("GL Account")}>
                  <span>GL Account</span>
                  <span className="count">
                    <Badge size="default" count={11} showZero color="#3199dc" />
                  </span>
                </Menu.Item>
                <Menu.Item
                  key={"/AuditFileType"}
                  icon={<FaUserAlt size={17} />}>
                  <span>Audit Type Master</span>
                  <span className="count">
                    <Badge
                      size="default"
                      count={
                        badgeCount
                          ? badgeCount?.["Sub Master"]?.["Audit Type Master"]
                          : 0
                      }
                      showZero
                      color="#3199dc"
                    />
                  </span>
                </Menu.Item>
                <Menu.Item key={"/Definitions"} icon={<FaUserAlt size={17} />}>
                  <span>Definitions</span>
                  <span className="count">
                    <Badge
                      size="default"
                      count={
                        badgeCount
                          ? badgeCount?.["Sub Master"]?.["Definitions"]
                          : 0
                      }
                      showZero
                      color="#3199dc"
                    />
                  </span>
                </Menu.Item>

                <Menu.Item
                  key={"/DefinitionsList"}
                  icon={<FaUserAlt size={17} />}>
                  <span>Definitions List</span>
                  <span className="count">
                    <Badge
                      size="default"
                      count={
                        badgeCount
                          ? badgeCount?.["Sub Master"]?.["Definitions List"]
                          : 0
                      }
                      showZero
                      color="#3199dc"
                    />
                  </span>
                </Menu.Item>

                {/* <Menu.Item key={'/serviceFor'} icon={<MdOutlineMiscellaneousServices size={17} />} onClick={() => setTopTitle('Service For')}>
                  <span>Service For</span>
                  <span className='count'>
                    <Badge size='default' count={11} showZero color='#3199dc' />
                  </span>
                </Menu.Item>
                <Menu.Item key={'/assetGroup'} icon={<MdGroups size={17} />} onClick={() => setTopTitle('Asset Group')}>
                  <span>Asset Group</span>
                  <span className='count'>
                    <Badge size='default' count={11} showZero color='#3199dc' />
                  </span>
                </Menu.Item>
                <Menu.Item key={'/serviceCategory'} icon={<MdCategory size={17} />} onClick={() => setTopTitle('Service Category')}>
                  <span>Service Category</span>
                  <span className='count'>
                    <Badge size='default' count={11} showZero color='#3199dc' />
                  </span>
                </Menu.Item>
                <Menu.Item key={'/priority'} icon={<MdPriorityHigh size={17} />} onClick={() => setTopTitle('Priority')}>
                  <span>Priority</span>
                  <span className='count'>
                    <Badge size='default' count={11} showZero color='#3199dc' />
                  </span>
                </Menu.Item>
                <Menu.Item key={'/typeOfService'} icon={<FaServicestack size={17} />} onClick={() => setTopTitle('Type Of Service')}>
                  <span>Type Of Service</span>
                  <span className='count'>
                    <Badge size='default' count={11} showZero color='#3199dc' />
                  </span>
                </Menu.Item>
                <Menu.Item key={'/workDone'} icon={<MdWork size={17} />} onClick={() => setTopTitle('Work Done')}>
                  <span>Work Done</span>
                  <span className='count'>
                    <Badge size='default' count={11} showZero color='#3199dc' />
                  </span>
                </Menu.Item>
                <Menu.Item key={'/modeOfPayment'} icon={<BsCash size={17} />} onClick={() => setTopTitle('Mode Of Payment')}>
                  <span>Mode Of Payment</span>
                  <span className='count'>
                    <Badge size='default' count={11} showZero color='#3199dc' />
                  </span>
                </Menu.Item> */}
              </Menu.SubMenu>
            )}

            {main.audit && (
              <Menu.SubMenu
                className="side-nav maintext"
                key="sub3"
                title={
                  <div>
                    <div>
                      <FaDatabase
                        size={20}
                        color="#f5a60b"
                        className="menu-icon"
                      />
                    </div>
                    <div className="menu-title">Audit</div>
                  </div>
                }>
                {sub.entry && (
                  <Menu.Item
                    key={"/auditEntry"}
                    icon={<FaStreetView size={17} />}>
                    <span>Entry</span>
                    <span className="count">
                      <Badge
                        size="default"
                        count={
                          badgeCount ? badgeCount?.["Audit"]?.["Entry"] : 0
                        }
                        showZero
                        color="#3199dc"
                      />
                    </span>
                  </Menu.Item>
                )}

                {sub.approval && (
                  <Menu.Item
                    key={"/auditApproval"}
                    icon={<FaUserAlt size={17} />}>
                    <span>Approval</span>
                    <span className="count">
                      <Badge
                        size="default"
                        count={
                          badgeCount ? badgeCount?.["Audit"]?.["Approval"] : 0
                        }
                        showZero
                        color="#3199dc"
                      />
                    </span>
                  </Menu.Item>
                )}

                {sub.capa && (
                  <Menu.Item
                    key={"/capa"}
                    icon={<FaMapMarkedAlt size={17} />}
                    onClick={() => setTopTitle("CAPA")}>
                    <span>CAPA</span>
                    <span className="count">
                      <Badge
                        size="default"
                        count={badgeCount ? badgeCount?.["Audit"]?.["CAPA"] : 0}
                        showZero
                        color="#3199dc"
                      />
                    </span>
                  </Menu.Item>
                )}
                {sub.learning && (
                  <Menu.Item key={"/learning"} icon={<FaGlobe size={17} />}>
                    <span>Training</span>
                    <span className="count">
                      <Badge
                        size="default"
                        count={
                          badgeCount ? badgeCount?.["Audit"]?.["Training"] : 0
                        }
                        showZero
                        color="#3199dc"
                      />
                    </span>
                  </Menu.Item>
                )}

                {sub.report && (
                  <Menu.Item key={"/report"} icon={<FaGlobe size={17} />}>
                    <span>Report</span>
                    <span className="count">
                      <Badge
                        size="default"
                        count={
                          badgeCount ? badgeCount?.["Audit"]?.["Report"] : 0
                        }
                        showZero
                        color="#3199dc"
                      />
                    </span>
                  </Menu.Item>
                )}
                {sub.rank && (
                  <Menu.Item key={"/rank"} icon={<FaGlobe size={17} />}>
                    <span>Rank</span>
                    <span className="count">
                      <Badge
                        size="default"
                        count={badgeCount ? badgeCount?.["Audit"]?.["Rank"] : 0}
                        showZero
                        color="#3199dc"
                      />
                    </span>
                  </Menu.Item>
                )}
              </Menu.SubMenu>
            )}
            {main.master && main.report && (
              <Menu.SubMenu
                className="side-nav maintext"
                key="sub99"
                title={
                  <div>
                    <div>
                      <FaDatabase
                        size={20}
                        color="#f5a60b"
                        className="menu-icon"
                      />
                    </div>
                    <div className="menu-title">Report</div>
                  </div>
                }>
                {sub.report && (
                  <Menu.Item key={"/user-report"} icon={<FaGlobe size={17} />}>
                    <span>User Access</span>
                    <span className="count">
                      <Badge
                        size="default"
                        count={
                          badgeCount ? badgeCount?.["Audit"]?.["Report"] : 0
                        }
                        showZero
                        color="#3199dc"
                      />
                    </span>
                  </Menu.Item>
                )}
                {sub.logreport && (
                  <Menu.Item key={"/logreport"} icon={<FaGlobe size={17} />}>
                    <span>Log Report</span>
                    <span className="count">
                      <Badge
                        size="default"
                        count={
                          badgeCount ? badgeCount?.["Audit"]?.["Log Report"] : 0
                        }
                        showZero
                        color="#3199dc"
                      />
                    </span>
                  </Menu.Item>
                )}
              </Menu.SubMenu>
            )}

            {main.service && (
              <Menu.SubMenu
                className="side-nav maintext"
                key="sub12"
                title={
                  <div>
                    <div>
                      <FaEmpire
                        size={20}
                        color="#f5a60b"
                        className="menu-icon"
                      />
                    </div>
                    <div className="menu-title">Service</div>
                  </div>
                }>
                {subservice?.create_ticket && (
                  <Menu.Item
                    key={"/createTicket"}
                    icon={<FaCanadianMapleLeaf size={17} />}
                    onClick={() => setTopTitle("Create Ticket")}
                  >
                    <span>Create Ticket</span>
                    <span className="count">
                      <Badge
                        size="default"
                        count={11}
                        showZero
                        color="#3199dc"
                      />
                    </span>
                  </Menu.Item>
                )}
                {subservice?.ticket_handling && (
                  <Menu.Item
                    key={"/handleTicket"}
                    icon={<FaUserTie size={17} />}
                    onClick={() => setTopTitle("Ticket Handling")}
                  >
                    <span>Ticket Handling</span>
                    <span className="count">
                      <Badge
                        size="default"
                        count={11}
                        showZero
                        color="#3199dc"
                      />
                    </span>
                  </Menu.Item>
                )}
                {subservice?.pc_claim_submission && (
                  <Menu.Item
                    key="/pcaclaimsubmissionms"
                    icon={<FaSortAmountUpAlt size={17} />}
                    onClick={() =>
                      setTopTitle("Petty Cash Claim Submission - MS")
                    }>
                    <span>PC Claim Submission - MS</span>
                    <span className="count">
                      <Badge
                        size="default"
                        count={11}
                        showZero
                        color="#3199dc"
                      />
                    </span>
                  </Menu.Item>
                )}
                {subservice?.payment_request && (
                  <Menu.SubMenu                
                    key="sub43"
                    icon={<FaReadme size={17} />}
                    title={
                      <span className="menu-title">
                       Payment Request
                      </span>
                    }
                  >
                    {thirtyservice.pc_advance && (
                      <Menu.Item
                        key="/pcadvancereqms"
                        icon={<FaRegEdit size={17} />}
                        onClick={() =>
                          setTopTitle("Payment Request | PC Adv. Req. - MS")
                        }
                      >
                        <span>PC Adv. Req. - MS</span>
                        <span className="count">
                          <Badge
                            size="default"
                            count={11}
                            showZero
                            color="#3199dc"
                          />
                        </span>
                      </Menu.Item>
                    )}              
                      {thirtyservice.pettcash_claim_request && (
                      <Menu.Item
                        key="/pcclaimreqorl"
                        icon={<FaStream size={17} />}
                        onClick={() =>
                          setTopTitle("Payment Request | PettyCash Claim Request- ORL")
                        }
                      >
                        <span>PettyCash Claim Request- ORL</span>
                        <span className="count">
                          <Badge
                            size="default"
                            count={11}
                            showZero
                            color="#3199dc"
                          />
                        </span>
                      </Menu.Item>
                    )}                                    
                  </Menu.SubMenu>
                )}

                {subservice?.petty_cash_clam_approval && (
                  <Menu.SubMenu                   
                    key="sub13"
                    icon={<FaRetweet size={17} />}
                    title={
                      <span className="menu-title">
                        Petty Cash Claim Approval
                      </span>
                    }
                  >
                    {thirtyservice?.pettcash_claim_approval_arm && (
                      <Menu.Item
                        key="/orlpcclaimapparm"
                        icon={<FaGlide size={17} />}
                        onClick={() =>
                          setTopTitle("Petty Cash Claim Approval | ORL - Pettycash Claim Approval - ARM")
                        }
                      >
                        <span>ORL - Pettycash Claim Approval - ARM</span>
                        <span className="count">
                          <Badge
                            size="default"
                            count={11}
                            showZero
                            color="#3199dc"
                          />
                        </span>
                      </Menu.Item>
                    )}
                    {thirtyservice?.petty_cash_clam_approval_back_office && (
                      <Menu.Item
                        key="/orlpcclaimappbo"
                        icon={<FaDropbox size={17} />}
                        onClick={() =>
                          setTopTitle(
                            "Petty Cash Claim Approval | ORL - Pettycash Claim Approval - Back Office"
                          )
                        }
                      >
                        <span>
                          ORL - Pettycash Claim Approval - Back Office
                        </span>
                        <span className="count">
                          <Badge
                            size="default"
                            count={11}
                            showZero
                            color="#3199dc"
                          />
                        </span>
                      </Menu.Item>
                    )}
                    {thirtyservice?.petty_cash_clam_approval_ah && (
                      <Menu.Item
                        key="/orlpcclaimappah"
                        icon={<FaJoomla size={17} />}
                        onClick={() =>
                          setTopTitle("Petty Cash Claim Approval | ORL - Pettycash Claim Approval - AH")
                        }
                      >
                        <span>ORL - Pettycash Claim Approval - AH</span>
                        <span className="count">
                          <Badge
                            size="default"
                            count={11}
                            showZero
                            color="#3199dc"
                          />
                        </span>
                      </Menu.Item>
                    )}
                    {thirtyservice?.petty_cash_ms_clam_approval_oh && (
                      <Menu.Item
                        key="/mspcclaimappoh"
                        icon={<FaGripfire size={17} />}
                        onClick={() =>
                          setTopTitle("Petty Cash Claim Approval | MS - Petty Cash Claim Approval - OH")
                        }
                      >
                        <span>MS - Petty Cash Claim Approval - OH</span>
                        <span className="count">
                          <Badge
                            size="default"
                            count={11}
                            showZero
                            color="#3199dc"
                          />
                        </span>
                      </Menu.Item>
                    )}
                    {thirtyservice?.petty_ms_cash_clam_approval_ah && (
                      <Menu.Item
                        key="/mspcclaimappah"
                        icon={<FaSlackHash size={17} />}
                        onClick={() =>
                          setTopTitle("Petty Cash Claim Approval | MS - Petty Cash Claim Approval - AH")
                        }
                      >
                        <span>MS - Petty Cash Claim Approval - AH</span>
                        <span className="count">
                          <Badge
                            size="default"
                            count={11}
                            showZero
                            color="#3199dc"
                          />
                        </span>
                      </Menu.Item>
                    )}
                  </Menu.SubMenu>
                )}

                {subservice?.po_proccess_approval && (
                  <Menu.Item
                    key="/poprocessappoh"
                    icon={<FaSquarespace size={17} />}
                    onClick={() => setTopTitle("PO Process Approval - OH")}
                  >
                    <span>PO Process Approval - OH</span>
                    <span className="count">
                      <Badge
                        size="default"
                        count={11}
                        showZero
                        color="#3199dc"
                      />
                    </span>
                  </Menu.Item>
                )}

                {subservice?.petty_cash_request_approval && (
                  <Menu.SubMenu
                    //className="side-nav"
                    key="sub14"
                    icon={<FaWpbeginner size={17} />}
                    title={
                      <span className="menu-title">
                        Petty Cash Request Approval
                      </span>
                    }
                  >
                    {thirtyservice?.petty_cash_ms_advance_clam_approval_oh && (
                      <Menu.Item
                        key="/mspcclaimappohForm"
                        icon={<FaDharmachakra size={17} />}
                        onClick={() =>
                          setTopTitle("Petty Cash Request Approval | MS Petty Cash Advance Approval - OH")
                        }
                      >
                        <span>MS Petty Cash Advance Approval - OH</span>
                        <span className="count">
                          <Badge
                            size="default"
                            count={11}
                            showZero
                            color="#3199dc"
                          />
                        </span>
                      </Menu.Item>
                    )}
                    {thirtyservice?.petty_cash_ms_advance_clam_approval_ah && (
                      <Menu.Item
                        key="/mspcclaimappahForm"
                        icon={<FaHandsWash size={17} />}
                        onClick={() =>
                          setTopTitle("Petty Cash Request Approval | MS Petty Cash Advance Approval - AH")
                        }
                      >
                        <span>MS Petty Cash Advance Approval - AH</span>
                        <span className="count">
                          <Badge
                            size="default"
                            count={11}
                            showZero
                            color="#3199dc"
                          />
                        </span>
                      </Menu.Item>
                    )}
                  </Menu.SubMenu>
                )}
                {subservice?.report && (
                  <Menu.SubMenu
                    //className="side-nav"
                    key="sub15"
                    icon={<FaSnowflake size={17} />}
                    title={<span className="menu-title">Report</span>}
                  >
                    {thirtyservice?.ticket_status_report && (
                    <Menu.Item
                      key="/ticketstatusreportorl"
                      icon={<FaPuzzlePiece size={17} />}
                      onClick={() => setTopTitle("Ticket Status Report")}
                    >
                      <span>Ticket Status Report</span>
                      <span className="count">
                        <Badge
                          size="default"
                          count={11}
                          showZero
                          color="#3199dc"
                        />
                      </span>
                    </Menu.Item>
                    )}
                    {thirtyservice?.ms_pettycash_ticket_status_report && (
                    <Menu.Item
                      key="/mspcrequestreport"
                      icon={<FaLocationArrow size={17} />}
                      onClick={() =>
                        setTopTitle("MS - PettyCash Request Report")
                      }
                    >
                      <span>MS - PettyCash Request Report</span>
                      <span className="count">
                        <Badge
                          size="default"
                          count={11}
                          showZero
                          color="#3199dc"
                        />
                      </span>
                    </Menu.Item>
                    )}
                    {thirtyservice?.orl_pettycash_ticket_status_report && (
                    <Menu.Item
                      key="/pccliamorlreport"
                      icon={<FaMap size={17} />}
                      onClick={() => setTopTitle("PettyCash Claim Report ORL")}
                    >
                      <span>PettyCash Claim Report ORL</span>
                      <span className="count">
                        <Badge
                          size="default"
                          count={11}
                          showZero
                          color="#3199dc"
                        />
                      </span>
                    </Menu.Item>
                    )}
                  </Menu.SubMenu>
                )}
              </Menu.SubMenu>
            )}

            {main.license && (
              <Menu.SubMenu
                className="side-nav"
                key="sub4"
                title={
                  <div>
                    <div>
                      <FaServicestack
                        size={20}
                        color="#f5a60b"
                        className="menu-icon"
                      />
                    </div>
                    <div className="menu-title">License</div>
                  </div>
                }>
                {sub.licenseType && (
                  <Menu.Item
                    key={"/licenseMaster"}
                    icon={<FaBriefcase size={17} />}>
                    <span>License Type Master</span>
                    <span className="count">
                      <Badge
                        size="default"
                        count={
                          badgeCount
                            ? badgeCount?.["License"]?.["License Master"]
                            : 0
                        }
                        showZero
                        color="#3199dc"
                      />
                    </span>
                  </Menu.Item>
                )}
                {sub.period && (
                  <Menu.Item
                    key={"/periodMaster"}
                    icon={<FaStreetView size={17} />}>
                    <span>Period Master</span>
                    <span className="count">
                      <Badge
                        size="default"
                        count={
                          badgeCount
                            ? badgeCount?.["License"]?.["Period Master"]
                            : 0
                        }
                        showZero
                        color="#3199dc"
                      />
                    </span>
                  </Menu.Item>
                )}
                {sub.create && (
                  <Menu.Item key={"/license"} icon={<FaReadme size={17} />}>
                    <span> Create License </span>
                    <span className="count">
                      <Badge
                        size="default"
                        count={
                          badgeCount
                            ? badgeCount?.["License"]?.["Create License"]
                            : 0
                        }
                        showZero
                        color="#3199dc"
                      />
                    </span>
                  </Menu.Item>
                )}

                {sub.approvallicense && (
                  <Menu.Item
                    key={"/approveMaster"}
                    icon={<FaStream size={17} />}>
                    <span>Approve License</span>
                    <span className="count">
                      <Badge
                        size="default"
                        count={
                          badgeCount
                            ? badgeCount?.["License"]?.["Approve License"]
                            : 0
                        }
                        showZero
                        color="#3199dc"
                      />
                    </span>
                  </Menu.Item>
                )}

                {sub.editLicense && (
                  <Menu.Item
                    key={"/editLicense"}
                    icon={<FaRegEdit size={17} />}>
                    <span>Edit License</span>
                    <span className="count">
                      <Badge
                        size="default"
                        count={
                          badgeCount
                            ? badgeCount?.["License"]?.["Edit License Details"]
                            : 0
                        }
                        showZero
                        color="#3199dc"
                      />
                    </span>
                  </Menu.Item>
                )}
                {sub.renewal && (
                  <Menu.Item
                    key={"/renewalMaster"}
                    icon={<FaRetweet size={17} />}>
                    <span>Renewal Detail</span>
                    <span className="count">
                      <Badge
                        size="default"
                        count={
                          badgeCount
                            ? badgeCount?.["License"]?.["License Renewal"]
                            : 0
                        }
                        showZero
                        color="#3199dc"
                      />
                    </span>
                  </Menu.Item>
                )}
                {sub.license_report && (
                  <Menu.Item
                    key={"/licenseReport"}
                    icon={<FaReadme size={17} />}>
                    <span> License Report</span>
                    <span className="count">
                      <Badge
                        size="default"
                        count={
                          badgeCount
                            ? badgeCount?.["License"]?.["License Report"]
                            : 0
                        }
                        showZero
                        color="#3199dc"
                      />
                    </span>
                  </Menu.Item>
                )}
              </Menu.SubMenu>
            )}
            {main.overalltraining && (
              <Menu.SubMenu
                className="side-nav"
                key="sub5"
                title={
                  <div>
                    <div>
                      <FaMapMarkedAlt
                        size={20}
                        color="#f5a60b"
                        className="menu-icon"
                      />
                    </div>
                    <div className="menu-title">Training</div>
                  </div>
                }>
                {sub.trainingmaster && (
                  <Menu.Item
                    key={"/AuditOverallTraining"}
                    icon={<FaReadme size={17} />}
                    onClick={() => setTopTitle("Audit Training Master")}>
                    <span>Training Master</span>
                    <span className="count">
                      <Badge
                        size="default"
                        count={
                          badgeCount
                            ? badgeCount?.["Training"]?.[
                                "Audit Training Master"
                              ]
                            : 0
                        }
                        showZero
                        color="#3199dc"
                      />
                    </span>
                  </Menu.Item>
                )}
                {sub.overalltraining && (
                  <Menu.Item
                    key={"/overallTraining"}
                    icon={<FaReadme size={17} />}
                    onClick={() => setTopTitle("Outlet Training")}>
                    <span>Overall Training</span>
                    <span className="count">
                      <Badge
                        size="default"
                        count={
                          badgeCount
                            ? badgeCount?.["Training"]?.["Overall Training"]
                            : 0
                        }
                        showZero
                        color="#3199dc"
                      />
                    </span>
                  </Menu.Item>
                )}
              </Menu.SubMenu>
            )}
            {main.auditnew && (
              <Menu.SubMenu
                className="side-nav"
                key="sub6"
                title={
                  <div>
                    <div>
                      <FaStreetView
                        size={20}
                        color="#f5a60b"
                        className="menu-icon"
                      />
                    </div>
                    <div className="menu-title">Audit 2.0</div>
                  </div>
                }>
                {sub.entrynew && (
                  <Menu.Item
                    key={"/auditNewEntry"}
                    icon={<FaStreetView size={17} />}>
                    <span>Audit New Entry</span>
                    <span className="count">
                      <Badge
                        size="default"
                        count={
                          badgeCount
                            ? badgeCount?.["Audit 2.0"]?.["Audit New Entry"]
                            : 0
                        }
                        showZero
                        color="#3199dc"
                      />
                    </span>
                  </Menu.Item>
                )}
                {sub.capanew && (
                  <Menu.Item
                    key={"/auditNewCAPA"}
                    icon={<FaMapMarkedAlt size={17} />}>
                    <span>Audit Outlet CAPA</span>
                    <span className="count">
                      <Badge
                        size="default"
                        count={
                          badgeCount
                            ? badgeCount?.["Audit 2.0"]?.["Audit Outlet CAPA"]
                            : 0
                        }
                        showZero
                        color="#3199dc"
                      />
                    </span>
                  </Menu.Item>
                )}
                {sub.depcapa && (
                  <Menu.Item
                    key={"/auditDepCapa"}
                    icon={<FaReadme size={17} />}
                    onClick={() => setTopTitle("Audit Department CAPA")}>
                    <span>Audit Dept. CAPA</span>
                    <span className="count">
                      <Badge
                        size="default"
                        count={
                          badgeCount
                            ? badgeCount?.["Audit 2.0"]?.[
                                "Audit Department CAPA"
                              ]
                            : 0
                        }
                        showZero
                        color="#3199dc"
                      />
                    </span>
                  </Menu.Item>
                )}
                {sub.approvenew && (
                  <Menu.Item
                    key={"/auditNewApproval"}
                    icon={<FaGlobe size={17} />}>
                    <span>Audit Outlet App.</span>
                    <span className="count">
                      <Badge
                        size="default"
                        count={
                          badgeCount
                            ? badgeCount?.["Audit 2.0"]?.[
                                "Audit Outlet Approval"
                              ]
                            : 0
                        }
                        showZero
                        color="#3199dc"
                      />
                    </span>
                  </Menu.Item>
                )}
                {sub.approvedep && (
                  <Menu.Item
                    key={"/auditDepApproval"}
                    icon={<FaGlide size={17} />}>
                    <span>Audit Dept App</span>
                    <span className="count">
                      <Badge
                        size="default"
                        count={
                          badgeCount
                            ? badgeCount?.["Audit 2.0"]?.[
                                "Audit Department Approval"
                              ]
                            : 0
                        }
                        showZero
                        color="#3199dc"
                      />
                    </span>
                  </Menu.Item>
                )}
                {sub.auditreport && (
                  <Menu.Item
                    key={"/auditNewReport"}
                    icon={<FaDropbox size={17} />}>
                    <span>Audit 2.0 Report</span>
                    <span className="count">
                      <Badge
                        size="default"
                        count={
                          badgeCount
                            ? badgeCount?.["Audit 2.0"]?.["Audit 2.0 Report"]
                            : 0
                        }
                        showZero
                        color="#3199dc"
                      />
                    </span>
                  </Menu.Item>
                )}
                {/* {sub.auditcatewisereport && (
                  <Menu.Item key={'/auditCateWiseReport'} icon={<FaGlobe size={17} />}>
                    <span>Audit CategoryWise Report</span>
                    <span className='count'>
                      <Badge size='default' count={badgeCount ? badgeCount?.['Audit 2.0']?.['Audit CategoryWise Report'] : 0} showZero color='#3199dc' />
                    </span>
                  </Menu.Item>
                )} */}
                {sub.auditincentivehr && (
                  <Menu.Item
                    key={"/auditIncentiveHR"}
                    icon={<FaJoomla size={17} />}>
                    <span>Audit Inc HR</span>
                    <span className="count">
                      <Badge
                        size="default"
                        count={
                          badgeCount
                            ? badgeCount?.["Audit 2.0"]?.["Audit Incentive HR"]
                            : 0
                        }
                        showZero
                        color="#3199dc"
                      />
                    </span>
                  </Menu.Item>
                )}
                {sub.auditincentiveoh && (
                  <Menu.Item
                    key={"/auditIncentiveOH"}
                    icon={<FaGripfire size={17} />}>
                    <span>Audit Inc OH</span>
                    <span className="count">
                      <Badge
                        size="default"
                        count={
                          badgeCount
                            ? badgeCount?.["Audit 2.0"]?.["Audit Incentive OH"]
                            : 0
                        }
                        showZero
                        color="#3199dc"
                      />
                    </span>
                  </Menu.Item>
                )}
                {sub.auditincentiveac && (
                  <Menu.Item
                    key={"/auditIncentiveAC"}
                    icon={<FaSlackHash size={17} />}>
                    <span>Audit Inc AH</span>
                    <span className="count">
                      <Badge
                        size="default"
                        count={
                          badgeCount
                            ? badgeCount?.["Audit 2.0"]?.["Audit Incentive AC"]
                            : 0
                        }
                        showZero
                        color="#3199dc"
                      />
                    </span>
                  </Menu.Item>
                )}
                {sub.auditincentivebh && (
                  <Menu.Item
                    key={"/auditIncentiveBH"}
                    icon={<FaSquarespace size={17} />}>
                    <span>Audit Inc BH</span>
                    <span className="count">
                      <Badge
                        size="default"
                        count={
                          badgeCount
                            ? badgeCount?.["Audit 2.0"]?.["Audit Incentive BH"]
                            : 0
                        }
                        showZero
                        color="#3199dc"
                      />
                    </span>
                  </Menu.Item>
                )}
                {sub.auditincentiveacfinal && (
                  <Menu.Item
                    key={"/auditIncentiveACFinal"}
                    icon={<FaWpbeginner size={17} />}>
                    <span>Audit Inc AH Pmt</span>
                    <span className="count">
                      <Badge
                        size="default"
                        count={
                          badgeCount
                            ? badgeCount?.["Audit 2.0"]?.[
                                "Audit Incentive AC Final"
                              ]
                            : 0
                        }
                        showZero
                        color="#3199dc"
                      />
                    </span>
                  </Menu.Item>
                )}
                {sub.auditpaymentreport && (
                  <Menu.Item
                    key={"/auditIncentiveReport"}
                    icon={<FaDropbox size={17} />}>
                    <span>Audit Inc Report</span>
                    <span className="count">
                      <Badge
                        size="default"
                        count={
                          badgeCount
                            ? badgeCount?.["Audit 2.0"]?.[
                                "Audit Payment Report"
                              ]
                            : 0
                        }
                        showZero
                        color="#3199dc"
                      />
                    </span>
                  </Menu.Item>
                )}
                {sub.auditoutletpaymentreport && (
                  <Menu.Item
                    key={"/auditIncentiveOutletWiseReport"}
                    icon={<FaDropbox size={17} />}>
                    <span>Audit Inc Outlet Report</span>
                    <span className="count">
                      <Badge
                        size="default"
                        count={
                          badgeCount
                            ? badgeCount?.["Audit 2.0"]?.[
                                "Audit Outletwise Payment Report"
                              ]
                            : 0
                        }
                        showZero
                        color="#3199dc"
                      />
                    </span>
                  </Menu.Item>
                )}
                {sub.auditcategorywisereport && (
                  <Menu.Item
                    key={"/auditCategorytWiseReport"}
                    icon={<FaDropbox size={17} />}>
                    <span>Audit Categorywise Report</span>
                    <span className="count">
                      <Badge
                        size="default"
                        count={
                          badgeCount
                            ? badgeCount?.["Audit 2.0"]?.[
                                "Audit Categorywise Report"
                              ]
                            : 0
                        }
                        showZero
                        color="#3199dc"
                      />
                    </span>
                  </Menu.Item>
                )}
              </Menu.SubMenu>
            )}

            {main.cashclosure && (
              <Menu.SubMenu
                className="side-nav"
                key="sub8"
                title={
                  <div>
                    <div>
                      <FaMoneyCheckAlt
                        size={20}
                        color="#f5a60b"
                        className="menu-icon"
                      />
                    </div>
                    <div className="menu-title">Cash Closure</div>
                  </div>
                }>
                {sub.crew_master && (
                  <Menu.Item
                    key={"/crewMaster"}
                    icon={<FaUserTie size={17} />}
                    onClick={() => setTopTitle("Crew Master")}>
                    <span>Crew Master</span>
                    <span className="count">
                      <Badge
                        size="default"
                        count={
                          badgeCount
                            ? badgeCount?.["Cash Closure"]?.["Crew Master"]
                            : 0
                        }
                        showZero
                        color="#3199dc"
                      />
                    </span>
                  </Menu.Item>
                )}

                {sub.cash_handling && (
                  <Menu.Item
                    key={"/cashHandling"}
                    icon={<FaMoneyCheckAlt size={17} />}>
                    <span>Cash Handling</span>
                    <span className="count">
                      <Badge
                        size="default"
                        count={
                          badgeCount
                            ? badgeCount?.["Cash Closure"]?.[
                                "Cash Handling - Crew"
                              ]
                            : 0
                        }
                        showZero
                        color="#3199dc"
                      />
                    </span>
                  </Menu.Item>
                )}
                {sub.cash_handling_report && (
                  <Menu.Item
                    key={"/cashDeposit"}
                    icon={<FaMapMarkedAlt size={17} />}
                    onClick={() => setTopTitle("Cash Handling Report")}>
                    <span>Reports</span>
                    <span className="count">
                      <Badge
                        size="default"
                        count={
                          badgeCount
                            ? badgeCount?.["Cash Closure"]?.[
                                "Cash Handling - Reports"
                              ]
                            : 0
                        }
                        showZero
                        color="#3199dc"
                      />
                    </span>
                  </Menu.Item>
                )}
                {sub.sales_data && (
                  <Menu.Item
                    key={"/salesReport"}
                    icon={<FaSortAmountUpAlt size={17} />}
                    onClick={() => setTopTitle("Sales Report")}>
                    <span>Sales Report</span>
                    <span className="count">
                      <Badge
                        size="default"
                        count={
                          badgeCount
                            ? badgeCount?.["Cash Closure"]?.["Sales Report"]
                            : 0
                        }
                        showZero
                        color="#3199dc"
                      />
                    </span>
                  </Menu.Item>
                )}
                {sub.cash_handling_verification && (
                  <Menu.Item key={"/backOffice"} icon={<FaReadme size={17} />}>
                    <span>Back Office</span>
                    <span className="count">
                      <Badge
                        size="default"
                        count={
                          badgeCount
                            ? badgeCount?.["Cash Closure"]?.[
                                "Cash Handling - Verification"
                              ]
                            : 0
                        }
                        showZero
                        color="#3199dc"
                      />
                    </span>
                  </Menu.Item>
                )}
              </Menu.SubMenu>
            )}

            {main.discipline && (
              <Menu.SubMenu
                className="side-nav"
                key="sub9"
                title={
                  <div>
                    <div>
                      <FaGalacticSenate
                        size={20}
                        color="#f5a60b"
                        className="menu-icon"
                      />
                    </div>
                    <div className="menu-title">Discipline</div>
                  </div>
                }>
                {sub.callback_entry && (
                  <Menu.Item
                    key={"/CallEntry"}
                    icon={<FaCanadianMapleLeaf size={17} />}
                    onClick={() => setTopTitle("Call Back Entry")}>
                    <span>Call Back Entry</span>
                    <span className="count">
                      <Badge
                        size="default"
                        count={
                          badgeCount
                            ? badgeCount?.["Discipline"]?.["Call Back Entry"]
                            : 0
                        }
                        showZero
                        color="#3199dc"
                      />
                    </span>
                  </Menu.Item>
                )}
                {sub.callback_entry_edit && (
                  <Menu.Item
                    key={"/editcallBackEntry"}
                    icon={<FaSquarespace size={17} />}
                    onClick={() => setTopTitle("Edit Call Back Entry")}>
                    <span>Edit Call Back Entry</span>
                    <span className="count">
                      <Badge
                        size="default"
                        count={
                          badgeCount
                            ? badgeCount?.["Discipline"]?.[
                                "Call Back Entry Edit"
                              ]
                            : 0
                        }
                        showZero
                        color="#3199dc"
                      />
                    </span>
                  </Menu.Item>
                )}
                {sub.callback_approval && (
                  <Menu.Item
                    key={"/callBackApproval"}
                    icon={<FaPizzaSlice size={17} />}
                    onClick={() => setTopTitle("Call Back Entry Approval")}>
                    <span>Call Back Entry App</span>
                    <span className="count">
                      <Badge
                        size="default"
                        count={
                          badgeCount
                            ? badgeCount?.["Discipline"]?.[
                                "Call Back Entry Approval"
                              ]
                            : 0
                        }
                        showZero
                        color="#3199dc"
                      />
                    </span>
                  </Menu.Item>
                )}
                {sub.callback_report && (
                  <Menu.Item
                    key={"/callBackReport"}
                    icon={<FaEmpire size={17} />}
                    onClick={() => setTopTitle("Call Back Report")}>
                    <span>Call Back Report</span>
                    <span className="count">
                      <Badge
                        size="default"
                        count={
                          badgeCount
                            ? badgeCount?.["Discipline"]?.["Call Back Report"]
                            : 0
                        }
                        showZero
                        color="#3199dc"
                      />
                    </span>
                  </Menu.Item>
                )}
              </Menu.SubMenu>
            )}
            {main.deepcleaning && (
              <Menu.SubMenu
                className="side-nav"
                key="sub10"
                title={
                  <div>
                    <div>
                      <FaHandsWash
                        size={20}
                        color="#f5a60b"
                        className="menu-icon"
                      />
                    </div>
                    <div className="menu-title">Opening & Closing Checklist</div>
                  </div>
                }>
                {sub.equipment_master && (
                  <Menu.Item
                    key={"/equipmentMaster"}
                    icon={<FaDharmachakra size={17} />}
                    onClick={() => setTopTitle("Equipment Master")}>
                    <span>Check List Master</span>
                    <span className="count">
                      <Badge
                        size="default"
                        count={
                          badgeCount
                            ? badgeCount?.["Deep Cleaning"]?.[
                                "Equipment Master"
                              ]
                            : 0
                        }
                        showZero
                        color="#3199dc"
                      />
                    </span>
                  </Menu.Item>
                )}
                {sub.day_plan_mapping && (
                  <Menu.Item
                    key={"/dayPlanMappingMaster"}
                    icon={<FaPuzzlePiece size={17} />}
                    onClick={() => setTopTitle("Day Plan Mapping Master")}>
                    <span>Day Plan Mapping Master</span>
                    <span className="count">
                      <Badge
                        size="default"
                        count={
                          badgeCount
                            ? badgeCount?.["Deep Cleaning"]?.[
                                "Day Plan Mapping"
                              ]
                            : 0
                        }
                        showZero
                        color="#3199dc"
                      />
                    </span>
                  </Menu.Item>
                )}
                {sub.deep_cleaning && (
                  <Menu.Item
                    key={"/deepCleaning"}
                    icon={<FaSnowflake size={17} />}
                    onClick={() => setTopTitle("Deep Cleaning")}>
                    <span>Opening and Closing Check List</span>
                    <span className="count">
                      <Badge
                        size="default"
                        count={
                          badgeCount
                            ? badgeCount?.["Deep Cleaning"]?.["Deep Cleaning"]
                            : 0
                        }
                        showZero
                        color="#3199dc"
                      />
                    </span>
                  </Menu.Item>
                )}
                {sub.edit_deep_cleaning && (
                  <Menu.Item
                    key={"/editdeepCleaning"}
                    icon={<FaSnowflake size={17} />}
                    onClick={() => setTopTitle("Edit Deep Cleaning")}>
                    <span>Edit Check List Entry</span>
                    <span className="count">
                      <Badge
                        size="default"
                        count={
                          badgeCount
                            ? badgeCount?.["Deep Cleaning"]?.[
                                "Edit Deep Cleaning"
                              ]
                            : 0
                        }
                        showZero
                        color="#3199dc"
                      />
                    </span>
                  </Menu.Item>
                )}

                {sub.deep_cleaning_app && (
                  <Menu.Item
                    key={"/deepCleaningApproval"}
                    icon={<FaSquarespace size={17} />}
                    onClick={() => setTopTitle("Deep Cleaning App")}>
                    <span>Check List Entry Approval</span>
                    <span className="count">
                      <Badge
                        size="default"
                        count={
                          badgeCount
                            ? badgeCount?.["Deep Cleaning"]?.[
                                "Deep Cleaning App"
                              ]
                            : 0
                        }
                        showZero
                        color="#3199dc"
                      />
                    </span>
                  </Menu.Item>
                )}
                {sub.deviation_report && (
                  <Menu.Item
                    key={"/deviationReport"}
                    icon={<FaStreetView size={17} />}
                    onClick={() => setTopTitle("Deviation Report")}>
                    <span>Check List Entry Report</span>
                    <span className="count">
                      <Badge
                        size="default"
                        count={
                          badgeCount
                            ? badgeCount?.["Deep Cleaning"]?.[
                                "Deviation Report"
                              ]
                            : 0
                        }
                        showZero
                        color="#3199dc"
                      />
                    </span>
                  </Menu.Item>
                )}
              </Menu.SubMenu>
            )}
            {main.entryForm && (
              <Menu.SubMenu
                className="side-nav"
                key="sub19"
                title={
                  <div>
                    <div>
                      <FaServicestack
                        size={20}
                        color="#f5a60b"
                        className="menu-icon"
                      />
                    </div>
                    <div className="menu-title">Entry Form</div>
                  </div>
                }
              >
                {sub.entryFormPage && (
                  <Menu.Item key={"/entry"} icon={<FaBriefcase size={17} />}>
                    <span>Entry Form</span>
                    <span className="count">
                      <Badge
                        size="default"
                        count={
                          badgeCount ? badgeCount?.["Entry"]?.["Entry"] : 0
                        }
                        showZero
                        color="#3199dc"
                      />
                    </span>
                  </Menu.Item>
                )}
              </Menu.SubMenu>
            )}
             {main.ebreading && (
          <Menu.SubMenu
            className="side-nav"
            key="sub11"
            title={
              <div>
                <div>
                  <FaGalacticRepublic
                    size={20}
                    color="#f5a60b"
                    className="menu-icon"
                  />
                </div>
                <div className="menu-title">EB Reading</div>
              </div>
            }
          >
             {sub.budget_master && (
              <Menu.Item key={"/budgetMaster"} icon={<FaWeibo size={17} />}
              onClick={() => setTopTitle("Budget Master")}>
                <span>Budget Master</span>
                <span className="count">
                  <Badge
                    size="default"
                    count={
                      badgeCount ? badgeCount?.["EB Reading"]?.["Budget Master"] : 0
                    }
                    showZero
                    color="#3199dc"
                  />
                </span>
              </Menu.Item>
            )}           
             {sub.ebreadingentryform && (
              <Menu.Item key={"/ebReading"} icon={<FaJoomla size={17} />}
              onClick={() => setTopTitle("EB Reading Entry")}>
                <span>EB Reading Entry</span>
                <span className="count">
                  <Badge
                    size="default"
                    count={
                      badgeCount ? badgeCount?.["EB Reading"]?.["EB Reading Entry"] : 0
                    }
                    showZero
                    color="#3199dc"
                  />
                </span>
              </Menu.Item>
            )}            
             {sub.ebreadingeditentryform && (
              <Menu.Item key={"/ebReadingEdit"} icon={<FaReadme size={17} />}
              onClick={() => setTopTitle("EB Reading Edit Entry")}>
                <span>EB Reading Edit Entry</span>
                <span className="count">
                  <Badge
                    size="default"
                    count={
                      badgeCount ? badgeCount?.["EB Reading"]?.["EB Reading Edit Entry"] : 0
                    }
                    showZero
                    color="#3199dc"
                  />
                </span>
              </Menu.Item>
            )}            
             {sub.ebreadingapprovalentryform && (
              <Menu.Item key={"/ebReadingApproval"} icon={<FaBookReader size={17} />}
              onClick={() => setTopTitle("EB Reading Approval Entry")}>
                <span>EB Reading Approval Entry</span>
                <span className="count">
                  <Badge
                    size="default"
                    count={
                      badgeCount ? badgeCount?.["EB Reading"]?.["EB Reading Approval Entry"] : 0
                    }
                    showZero
                    color="#3199dc"
                  />
                </span>
              </Menu.Item>
            )}            
              {sub.ebreadingreportform && (
              <Menu.Item key={"/ebReadingReport"} icon={<FaBiohazard size={17} />}
              onClick={() => setTopTitle("EB Reading Report")}>
                <span>EB Reading Report</span>
                <span className="count">
                  <Badge
                    size="default"
                    count={
                      badgeCount ? badgeCount?.["EB Reading"]?.["EB Reading Report"] : 0
                    }
                    showZero
                    color="#3199dc"
                  />
                </span>
              </Menu.Item>
            )} 
           
           
          </Menu.SubMenu>
             )}
               {main.edc && (
              <Menu.SubMenu
                className="side-nav"
                key="sub20"
                title={
                  <div>
                    <div>
                      <FaAtom
                        size={20}
                        color="#f5a60b"
                        className="menu-icon"
                      />
                    </div>
                    <div className="menu-title">EDC</div>
                  </div>
                }
              >
                {sub.edcform && (
                  <Menu.Item key={"/edcDetails"} icon={<FaCloudUploadAlt size={17} />}>
                    <span>EDC Upload Details</span>
                    <span className="count">
                      <Badge
                        size="default"
                        count={
                          badgeCount ? badgeCount?.["EDC"]?.["EDC Upload Details"] : 0
                        }
                        showZero
                        color="#3199dc"
                      />
                    </span>
                  </Menu.Item>
                )}
                 {sub.dotpeform && (
                  <Menu.Item key={"/dotpeDetails"} icon={<FaHornbill size={17} />}>
                    <span>Dotpe Upload Details</span>
                    <span className="count">
                      <Badge
                        size="default"
                        count={
                          badgeCount ? badgeCount?.["EDC"]?.["Dotpe Upload Details"] : 0
                        }
                        showZero
                        color="#3199dc"
                      />
                    </span>
                  </Menu.Item>
                )}
                  {sub.swiggyform && (
                  <Menu.Item key={"/swiggyDetails"} icon={<FaKhanda size={17} />}>
                    <span>Swiggy Upload Details</span>
                    <span className="count">
                      <Badge
                        size="default"
                        count={
                          badgeCount ? badgeCount?.["EDC"]?.["Swiggy Upload Details"] : 0
                        }
                        showZero
                        color="#3199dc"
                      />
                    </span>
                  </Menu.Item>
                )}
                  {sub.zomatoform && (
                  <Menu.Item key={"/zomatoDetails"} icon={<FaRegSnowflake size={17} />}>
                    <span>Zomato Upload Details</span>
                    <span className="count">
                      <Badge
                        size="default"
                        count={
                          badgeCount ? badgeCount?.["EDC"]?.["Zomato Upload Details"] : 0
                        }
                        showZero
                        color="#3199dc"
                      />
                    </span>
                  </Menu.Item>
                )}
                 {sub.magicPinform && (
                  <Menu.Item key={"/magicPinDetails"} icon={<FaSlack size={17} />}>
                    <span>MagicPin Upload Details</span>
                    <span className="count">
                      <Badge
                        size="default"
                        count={
                          badgeCount ? badgeCount?.["EDC"]?.["MagicPin Upload Details"] : 0
                        }
                        showZero
                        color="#3199dc"
                      />
                    </span>
                  </Menu.Item>
                )}
                 {sub.outletBankform && (
                  <Menu.Item key={"/outletBankDetails"} icon={<FaBriefcase size={17} />}>
                    <span>Outlet Bank Details</span>
                    <span className="count">
                      <Badge
                        size="default"
                        count={
                          badgeCount ? badgeCount?.["EDC"]?.["Outlet Bank Details"] : 0
                        }
                        showZero
                        color="#3199dc"
                      />
                    </span>
                  </Menu.Item>
                )}
                 {sub.ristaSalesform && (
                  <Menu.Item key={"/ristaSalesDetails"} icon={<FaKeybase size={17} />}>
                    <span>Rista Sales Data</span>
                    <span className="count">
                      <Badge
                        size="default"
                        count={
                          badgeCount ? badgeCount?.["EDC"]?.["Rista Sales Data"] : 0
                        }
                        showZero
                        color="#3199dc"
                      />
                    </span>
                  </Menu.Item>
                )}
                 {sub.edcsalesReport && (
                  <Menu.Item key={"/edcSalesReport"} icon={<FaLeaf size={17} />}>
                    <span>EDC Payment Vs Bank</span>
                    <span className="count">
                      <Badge
                        size="default"
                        count={
                          badgeCount ? badgeCount?.["EDC"]?.["EDC Payment Vs Bank"] : 0
                        }
                        showZero
                        color="#3199dc"
                      />
                    </span>
                  </Menu.Item>
                )}
                  {sub.dotpeReportform && (
                  <Menu.Item key={"/dotpePaymentReport"} icon={<FaPhabricator size={17} />}>
                    <span>Dotpe Payment Vs Sales</span>
                    <span className="count">
                      <Badge
                        size="default"
                        count={
                          badgeCount ? badgeCount?.["EDC"]?.["Dotpe Payment Vs Sales"] : 0
                        }
                        showZero
                        color="#3199dc"
                      />
                    </span>
                  </Menu.Item>
                )}
                  {sub.swiggyform && (
                  <Menu.Item key={"/swiggyPaymentReport"} icon={<FaPodcast size={17} />}>
                    <span>Swiggy Payment Vs Sales</span>
                    <span className="count">
                      <Badge
                        size="default"
                        count={
                          badgeCount ? badgeCount?.["EDC"]?.["Swiggy Payment Vs Sales"] : 0
                        }
                        showZero
                        color="#3199dc"
                      />
                    </span>
                  </Menu.Item>
                )}
                  {sub.zomatoform && (
                  <Menu.Item key={"/zomatoPaymentReport"} icon={<FaSlackHash size={17} />}>
                    <span>Zomato Payment Vs Sales</span>
                    <span className="count">
                      <Badge
                        size="default"
                        count={
                          badgeCount ? badgeCount?.["EDC"]?.["Zomato Payment Vs Sales"] : 0
                        }
                        showZero
                        color="#3199dc"
                      />
                    </span>
                  </Menu.Item>
                )}
                  {sub.magicPinform && (
                  <Menu.Item key={"/magicPinPaymentReport"} icon={<FaMedrt size={17} />}>
                    <span>MagicPin Payment Vs Sales</span>
                    <span className="count">
                      <Badge
                        size="default"
                        count={
                          badgeCount ? badgeCount?.["EDC"]?.["MagicPin Payment Vs Sales"] : 0
                        }
                        showZero
                        color="#3199dc"
                      />
                    </span>
                  </Menu.Item>
                )}
                {sub.overallsalesReport && (
                  <Menu.Item key={"/overallPaymentReport"} icon={<FaSignal size={17} />}>
                    <span>Overall Payment Vs Sales</span>
                    <span className="count">
                      <Badge
                        size="default"
                        count={
                          badgeCount ? badgeCount?.["EDC"]?.["Overall Payment Vs Sales"] : 0
                        }
                        showZero
                        color="#3199dc"
                      />
                    </span>
                  </Menu.Item>
                )}
              </Menu.SubMenu>
            )}   
              {main.stock && (
              <Menu.SubMenu
                className="side-nav"
                key="sub21"
                title={
                  <div>
                    <div>
                      <FaServicestack
                        size={20}
                        color="#f5a60b"
                        className="menu-icon"
                      />
                    </div>
                    <div className="menu-title">Stock</div>
                  </div>
                }
              >
                {sub.stockDetailsForm && (
                  <Menu.Item key={"/stockDetails"} icon={<FaBriefcase size={17} />}>
                    <span>Stock Details</span>
                    <span className="count">
                      <Badge
                        size="default"
                        count={
                          badgeCount ? badgeCount?.["Stock"]?.["Stock Details"] : 0
                        }
                        showZero
                        color="#3199dc"
                      />
                    </span>
                  </Menu.Item>
                )}
                {sub.ristaStockUploadform && (
                  <Menu.Item key={"/stockUploadDetails"} icon={<FaPizzaSlice size={17} />}>
                    <span>Rista Stock Upload</span>
                    <span className="count">
                      <Badge
                        size="default"
                        count={
                          badgeCount ? badgeCount?.["Stock"]?.["Rista Stock Upload"] : 0
                        }
                        showZero
                        color="#3199dc"
                      />
                    </span>
                  </Menu.Item>
                )}
                  {sub.consumableform && (
                  <Menu.Item key={"/consumableMaster"} icon={<FaHornbill size={17} />}>
                    <span>Consumable Master</span>
                    <span className="count">
                      <Badge
                        size="default"
                        count={
                          badgeCount ? badgeCount?.["Stock"]?.["Consumable Master"] : 0
                        }
                        showZero
                        color="#3199dc"
                      />
                    </span>
                  </Menu.Item>
                )}
                 {sub.consumableEntryform && (
                  <Menu.Item key={"/consumableEntry"} icon={<FaBattleNet size={17} />}>
                    <span>Consumable Entry</span>
                    <span className="count">
                      <Badge
                        size="default"
                        count={
                          badgeCount ? badgeCount?.["Stock"]?.["Consumable Entry"] : 0
                        }
                        showZero
                        color="#3199dc"
                      />
                    </span>
                  </Menu.Item>
                )}
              
                 {sub.consumableEntryReportform && (
                  <Menu.Item key={"/consumableEntryReport"} icon={<FaCloudversify size={17} />}>
                    <span>Consumable Entry Report</span>
                    <span className="count">
                      <Badge
                        size="default"
                        count={
                          badgeCount ? badgeCount?.["Stock"]?.["Consumable Entry Report"] : 0
                        }
                        showZero
                        color="#3199dc"
                      />
                    </span>
                  </Menu.Item>
                )}
                 {sub.consumableEntryLowReportform && (
                  <Menu.Item key={"/consumableEntryLowReport"} icon={<FaDocker size={17} />}>
                    <span>Consumable Entry Low Report</span>
                    <span className="count">
                      <Badge
                        size="default"
                        count={
                          badgeCount ? badgeCount?.["Stock"]?.["Consumable Entry Low Report"] : 0
                        }
                        showZero
                        color="#3199dc"
                      />
                    </span>
                  </Menu.Item>
                )}
                 {sub.consumableFullEntryViewReportform && (
                  <Menu.Item key={"/consumableFullEntryViewReport"} icon={<FaDocker size={17} />}>
                    <span>Consumable Full Entry View Report</span>
                    <span className="count">
                      <Badge
                        size="default"
                        count={
                          badgeCount ? badgeCount?.["Stock"]?.["Consumable Full Entry View Report"] : 0
                        }
                        showZero
                        color="#3199dc"
                      />
                    </span>
                  </Menu.Item>
                )}
              </Menu.SubMenu>
            )}   
            {main.calendar && (
              <Menu.SubMenu
                className="side-nav"
                key="sub22"
                title={
                  <div>
                    <div>
                      <FaServicestack
                        size={20}
                        color="#f5a60b"
                        className="menu-icon"
                      />
                    </div>
                    <div className="menu-title">Calendar</div>
                  </div>
                }
              >
                {sub.calendarAddEventform && (
                  <Menu.Item key={"/calendarEvent"} icon={<FaBriefcase size={17} />}>
                    <span>Calendar Add Event</span>
                    <span className="count">
                      <Badge
                        size="default"
                        count={
                          badgeCount ? badgeCount?.["Calendar"]?.["Calendar Add Event"] : 0
                        }
                        showZero
                        color="#3199dc"
                      />
                    </span>
                  </Menu.Item>
                )}
                 {sub.calendarEventReportform && (
                  <Menu.Item key={"/calendarReport"} icon={<FaBriefcase size={17} />}>
                    <span>Calendar Event Report</span>
                    <span className="count">
                      <Badge
                        size="default"
                        count={
                          badgeCount ? badgeCount?.["Calendar"]?.["Calendar Event Report"] : 0
                        }
                        showZero
                        color="#3199dc"
                      />
                    </span>
                  </Menu.Item>
                )}
              </Menu.SubMenu>
            )}     
          </Menu>
        </Sider>

        <Layout style={{ height: "100vh" }}>
          <TopNavMenu {...{ collapsed, setCollapsed, TopTitle }} />
          <Content main={main} sub={sub} {...{ setTopTitle }} />
          <Footer />
        </Layout>
        <Modal
          title="Update Your Password to Continue"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}>
          <p>Enter your ID</p>
          <Input onChange={(e) => setid(e.target.value)} />
          <p>Enter your Password</p>
          <Input type="password" onChange={(e) => setpass(e.target.value)} />
        </Modal>
      </Layout>
    </>
  );
}

function Content(props) {
  const { main, sub, setTopTitle } = props;
  const [api] = notification.useNotification();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const loginStato = localStorage.getItem("loginStatus") == "true";
    if (!loginStato) {
      navigate(`/login`);
      return;
    }
  });
  return (
    <div
      style={{ height: "100vh", backgroundColor: "#F4F5F7", overflow: "auto" }}>
      <Routes>
        {/* <Route path="/dashboard" element={<div>Dashbaord</div>}></Route> */}
        <Route path='/dashboard' element={<Dashboard {...{setTopTitle}} />}></Route>
        <Route
          path="/activeUsers"
          element={<div>Active Users List</div>}></Route>
        <Route
          path="/disabledUsers"
          element={<div>Disabled Users List</div>}></Route>
        <Route path="/profile" element={<div>Profile</div>}></Route>

        {main.master && (
          <>
            <Route
              path="/outletMaster"
              element={<OutletMaster {...{ setTopTitle }} />}></Route>
            <Route
              path="/employeeMaster"
              element={<EmployeeMaster {...{ setTopTitle }} />}></Route>
            <Route
              path="/customerMaster"
              element={<CustomerMaster {...{ setTopTitle }} />}></Route>
            <Route
              path="/roleMaster"
              element={<RoleMaster {...{ setTopTitle }} />}></Route>
            <Route
              path="/editRoleMaster"
              element={<EditRoleMaster {...{ setTopTitle }} />}></Route>
            <Route
              path="/employeeMapping"
              element={<EmployeeMaping {...{ setTopTitle }} />}></Route>
            <Route
              path="/emailMapping"
              element={<EmailMaping {...{ setTopTitle }} />}></Route>
            <Route
              path="/emailMapping/addForm"
              element={<EmailMappingForm {...{ setTopTitle }} />}></Route>
            <Route
              path="/emailMapping/UpdateForm"
              element={<EmailMappingUpdateForm {...{ setTopTitle }} />}></Route>

            <Route
              path="/auditCategory"
              element={<AuditCategory {...{ setTopTitle }} />}></Route>
            <Route
              path="/auditSubCategory"
              element={<AuditSubCategory {...{ setTopTitle }} />}></Route>
            <Route
              path="/auditPointList"
              element={<AuditPointList {...{ setTopTitle }} />}></Route>
            <Route
              path="/auditPointMarks"
              element={<AuditPointMarks {...{ setTopTitle }} />}></Route>
            <Route
              path="/outletMaster/addForm"
              element={<OutletMasterForm {...{ setTopTitle }} />}></Route>
            <Route
              path="/outletMaster/csvUpdate"
              element={<OutletMasterFormCsv {...{ setTopTitle }} />}></Route>
            <Route
              path="/employeeMaster/addForm"
              element={<EmployeeMasterForm {...{ setTopTitle }} />}></Route>
            <Route
              path="/employeeMaster/csvUpdate"
              element={
                <EmployeeMasterUpdateFormCsv {...{ setTopTitle }} />
              }></Route>

            <Route
              path="/customerMaster/addForm"
              element={<CustomerMasterForm {...{ setTopTitle }} />}></Route>
            <Route
              path="/roleMaster/addForm"
              element={<RoleMasterForm {...{ setTopTitle }} />}></Route>
            <Route
              path="/editRoleMaster/addForm"
              element={<EditRoleMasterForm {...{ setTopTitle }} />}></Route>
            <Route
              path="/employeeMapping/addForm"
              element={<EmployeeMappingForm {...{ setTopTitle }} />}></Route>
            <Route
              path="/auditCategory/addForm"
              element={<AuditCategoryForm {...{ setTopTitle }} />}></Route>
            <Route
              path="/auditSubCategory/addForm"
              element={<AuditSubCategoryForm {...{ setTopTitle }} />}></Route>
            <Route
              path="/auditPointMarks/addForm"
              element={<AuditPointMarksForm {...{ setTopTitle }} />}></Route>
            <Route
              path="/auditPointMarks/view"
              element={<AuditPointMarksView {...{ setTopTitle }} />}></Route>
            <Route
              path="/auditPointList/addForm"
              element={<AuditPointListForm {...{ setTopTitle }} />}></Route>
            <Route
              path="/auditTraining/view"
              element={<AuditTraining {...{ setTopTitle }} />}></Route>
            <Route
              path="/auditTraining/addForm"
              element={<AuditTrainingForm {...{ setTopTitle }} />}></Route>
            <Route
              path="/training"
              element={<AuditPointsImage {...{ setTopTitle }} />}></Route>
            <Route
              path="/auditPointsImage/addForm"
              element={<AuditPointsImageForm {...{ setTopTitle }} />}></Route>
            <Route
              path="/AssetGroupIssue"
              element={<AssetGroupIssue />}></Route>
            <Route
              path="/AssetGroupIssue/addForm"
              element={<AssetGroupIssueForm />}></Route>
            <Route
              path="/AssetGroupSpare"
              element={<AssetGroupSpare />}></Route>
            <Route
              path="/AssetGroupSpare/addForm"
              element={<AssetGroupSpareForm />}></Route>
            <Route path="/VendorMaster" element={<VendorMaster />}></Route>
            <Route
              path="/VendorMaster/addForm"
              element={<VendorMasterForm />}></Route>
            <Route
              path="/VendorMaster/uploadcsv"
              element={<VendroUpdateFormCsv />}></Route>

            <Route
              path="/outletAssetGroupMapping"
              element={<AssetMaster />}></Route>
            <Route
              path="/outletAssetGroupMapping/addForm"
              element={<AssetMasterForm />}></Route>
            <Route
              path="/outletAssetGroupMapping/updateform"
              element={<AssetMasterUpdateForm />}></Route>
            <Route path="/assetMaster" element={<NewAssetMaster />}></Route>
            <Route
              path="/assetMaster/addForm"
              element={<NewAssetMasterForm />}></Route>
            <Route
              path="/assetMaster/updateForm"
              element={<NewAssetMasterUpdateForm />}></Route>
            <Route
              path="/assetMaster/csvUpdate"
              element={<NewAssetMasterUpdateFormCsv />}></Route>

            <Route
              path="/AssetMaster/addForm"
              element={<AssetMasterForm />}></Route>
            <Route
              path="/AuditOverallTraining"
              element={<TrainingMaster {...{ setTopTitle }} />}></Route>
            <Route
              path="/AuditOverallTraining/addForm"
              element={<TrainingMasterForm {...{ setTopTitle }} />}></Route>
            <Route
              path="/auditNewMaster"
              element={<AuditNewMaster {...{ setTopTitle }} />}></Route>
            <Route
              path="/auditNewMaster/addForm"
              element={<AuditNewMasterForm {...{ setTopTitle }} />}></Route>

            <Route
              path="/auditPayment"
              element={<AuditPayment {...{ setTopTitle }} />}></Route>
            <Route
              path="/auditPayment/addForm"
              element={<AuditPaymentForm {...{ setTopTitle }} />}></Route>
          </>
        )}

        {main.submaster && (
          <>
            <Route
              path="/stateMaster"
              element={<StateMaster {...{ setTopTitle }} />}></Route>
            <Route
              path="/zoneMaster"
              element={<ZoneMaster {...{ setTopTitle }} />}></Route>
            <Route
              path="/subZoneMaster"
              element={<SubZoneMaster {...{ setTopTitle }} />}></Route>
            <Route
              path="/cityMaster"
              element={<CityMaster {...{ setTopTitle }} />}></Route>
            <Route
              path="/division"
              element={<Division {...{ setTopTitle }} />}></Route>
            <Route
              path="/department"
              element={<Department {...{ setTopTitle }} />}></Route>
            <Route
              path="/Designation"
              element={<Designation {...{ setTopTitle }} />}></Route>
            <Route
              path="/employeeLevel"
              element={<EmployeeLevel {...{ setTopTitle }} />}></Route>

            <Route
              path="/stateMaster/addForm"
              element={<StateMasterForm {...{ setTopTitle }} />}></Route>
            <Route
              path="/zoneMaster/addForm"
              element={<ZoneMasterForm {...{ setTopTitle }} />}></Route>
            <Route
              path="/subZoneMaster/addForm"
              element={<SubZoneMasterForm {...{ setTopTitle }} />}></Route>
            <Route
              path="/cityMaster/addForm"
              element={<CityMasterForm {...{ setTopTitle }} />}></Route>
            <Route
              path="/division/addForm"
              element={<DivisionForm {...{ setTopTitle }} />}></Route>
            <Route
              path="/department/addForm"
              element={<DepartForm {...{ setTopTitle }} />}></Route>
            <Route
              path="/Designation/addForm"
              element={<DesignationForm {...{ setTopTitle }} />}></Route>
            <Route
              path="/employeeLevel/addForm"
              element={<EmployeeLevelForm {...{ setTopTitle }} />}></Route>

            <Route path="/serviceFor" element={<ServiceFor />}></Route>
            <Route
              path="/serviceFor/addForm"
              element={<ServiceForForm />}></Route>
            <Route path="/assetGroup" element={<AssetGroup />}></Route>
            <Route
              path="/assetGroup/addForm"
              element={<AssetGroupForm />}></Route>
            <Route
              path="/servicecategory"
              element={<ServiceCategory />}></Route>
            <Route
              path="/servicecategory/addForm"
              element={<ServiceCategoryForm />}></Route>
            <Route path="/priority" element={<Priority />}></Route>
            <Route path="/priority/addForm" element={<PriorityForm />}></Route>
            <Route path="/typeOfService" element={<TypeOfService />}></Route>
            <Route
              path="/typeOfService/addForm"
              element={<TypeOfServiceForm />}></Route>
            <Route path="/workDone" element={<WorkDone />}></Route>
            <Route path="/workDone/addForm" element={<WorkDoneForm />}></Route>
            <Route path="/ModeOfPayment" element={<ModeOfPayment />}></Route>
            <Route
              path="/ModeOfPayment/addForm"
              element={<ModeOfPaymentForm />}></Route>
            <Route path="/glaccount" element={<Glaccount />}></Route>
            <Route path="/glaccountForm" element={<GlaccountForm />}></Route>
            <Route
              path="/AuditFileType"
              element={<AuditFiletype {...{ setTopTitle }} />}></Route>
            <Route
              path="/AuditFileType/addForm"
              element={<TypeMasterForm {...{ setTopTitle }} />}></Route>
            <Route
              path="/definitions"
              element={<Definitions {...{ setTopTitle }} />}></Route>
            <Route
              path="/definitions/addForm"
              element={<DefinitionsForm {...{ setTopTitle }} />}></Route>
            <Route
              path="/definitionsList"
              element={<DefinitionsList {...{ setTopTitle }} />}></Route>
            <Route
              path="/definitionsList/addForm"
              element={<DefinitionsListForm {...{ setTopTitle }} />}></Route>
          </>
        )}

        {main.audit && (
          <>
            <Route path="/audit" element={<div>Profile</div>}></Route>
            <Route
              path="/auditEntry"
              element={<AuditEntry {...{ setTopTitle }} />}></Route>
            <Route
              path="/auditEntry/addForm"
              element={
                <AuditEntryForm mode="add" {...{ setTopTitle }} />
              }></Route>
            <Route
              path="/auditEntry/editForm"
              element={
                <AuditEntryForm mode="edit" {...{ setTopTitle }} />
              }></Route>
            <Route
              path="/auditEntry/auditView"
              element={<AuditView {...{ setTopTitle }} />}></Route>{" "}
          </>
        )}

        {main.audit && sub.approval && (
          <>
            <Route
              path="/auditApproval"
              element={<AuditApproval {...{ setTopTitle }} />}></Route>
            <Route
              path="/approvalView"
              element={<Approval {...{ setTopTitle }} />}></Route>{" "}
          </>
        )}

        {main.audit && sub.capa && (
          <>
            <Route
              path="/capa"
              element={<AuditCAPA {...{ setTopTitle }} />}></Route>
            <Route
              path="/capaView"
              element={<CapaView {...{ setTopTitle }} />}></Route>
          </>
        )}

        {main.audit && sub.capa && (
          <>
            <Route
              path="/capa"
              element={<AuditCAPA {...{ setTopTitle }} />}></Route>
            <Route
              path="/capaView"
              element={<CapaView {...{ setTopTitle }} />}></Route>
          </>
        )}
        {main.audit && sub.capa && (
          <>
            <Route
              path="/report"
              element={<AuditReport {...{ setTopTitle }} />}></Route>
          </>
        )}
        {main.audit && sub.rank && (
          <>
            <Route
              path="/rank"
              element={<AuditRank {...{ setTopTitle }} />}></Route>
          </>
        )}
        {main.report && sub.report && (
          <>
            <Route
              path="/user-report"
              element={<Report {...{ setTopTitle }} />}></Route>
          </>
        )}
         {main.report && sub.logreport && (
          <>
            <Route
              path="/logreport"
              element={<LogReport {...{ setTopTitle }} />}></Route>
          </>
        )}
        {main.audit && sub.learning && (
          <>
            <Route
              path="/learning"
              element={<AuditTraining {...{ setTopTitle }} />}></Route>
          </>
        )}
        {main.audit && sub.overalltraining && (
          <>
            <Route
              path="/overallTraining"
              element={<TrainingForm {...{ setTopTitle }} />}></Route>
          </>
        )}
        {main.audit && sub.trainingmaster && (
          <>
            <Route
              path="/AuditOverallTraining"
              element={<TrainingMaster {...{ setTopTitle }} />}></Route>
          </>
        )}
        {main.license && (
          <>
            <Route
              path="/licensedetailMaster"
              element={<LicensedetailMaster {...{ setTopTitle }} />}></Route>
            <Route
              path="/licensedetailMaster/addForm"
              element={
                <LicensedetailMasterForm {...{ setTopTitle }} />
              }></Route>
          </>
        )}
        {main.license && sub.licenseType && (
          <>
            <Route
              path="/licenseMaster"
              element={<LicenseMaster {...{ setTopTitle }} />}></Route>
            <Route
              path="/licenseMaster/addForm"
              element={<LicenseForm {...{ setTopTitle }} />}></Route>
          </>
        )}
        {main.license && sub.period && (
          <>
            <Route
              path="/periodMaster"
              element={<PeriodMaster {...{ setTopTitle }} />}></Route>
           
            <Route
              path="/periodMaster/addForm"
              element={<PeriodForm {...{ setTopTitle }} />}></Route>
          </>
        )}
        {main.license && sub.create && (
          <>
            <Route
              path="/license"
              element={<ActiveLicense {...{ setTopTitle }} />}></Route>
            <Route
              path="/license/addForm"
              element={<ActiveLicenseForm {...{ setTopTitle }} />}></Route>
          </>
        )}
        {main.license && sub.renewal && (
          <>
            <Route
              path="/renewalMaster"
              element={<RenewalMaster {...{ setTopTitle }} />}></Route>
            <Route
              path="/renewalMaster/addForm"
              element={<RenewalMasterForm {...{ setTopTitle }} />}></Route>
          </>
        )}
        {main.license && sub.editLicense && (
          <>
            <Route
              path="/editLicense"
              element={<EditLicenseDetails {...{ setTopTitle }} />}></Route>
            <Route
              path="/editLicense/editForm"
              element={<EditLicenseDetailsForm {...{ setTopTitle }} />}></Route>
          </>
        )}
        {main.license && sub.approvallicense && (
          <>
            <Route
              path="/approveMaster"
              element={<ApproveMaster {...{ setTopTitle }} />}></Route>
            <Route
              path="/approveMaster/addForm"
              element={<ApproveMasterForm {...{ setTopTitle }} />}></Route>
          </>
        )}
        {main.license && sub.license_report && (
          <>
            <Route
              path="/licenseReport"
              element={<LicenseReport {...{ setTopTitle }} />}></Route>
          </>
        )}
        {main.auditnew && sub.entrynew && (
          <>
            <Route
              path="/auditNewEntry"
              element={<AuditNewEntry {...{ setTopTitle }} />}></Route>
            <Route
              path="/auditNewEntry/addForm"
              element={<AuditNewEntryForm {...{ setTopTitle }} />}></Route>
            <Route
              path="/auditNewEntry/view"
              element={<AuditNewEntryView {...{ setTopTitle }} />}></Route>
            <Route
              path="/auditNewEntry/editForm"
              element={
                <AuditNewEntryForm mode="edit" {...{ setTopTitle }} />
              }></Route>
          </>
        )}
        {main.auditnew && sub.capanew && (
          <>
            <Route
              path="/auditNewCAPA/addForm"
              element={<AuditNewCAPAForm {...{ setTopTitle }} />}></Route>
            <Route
              path="/auditNewCAPA"
              element={<AuditNewCAPA {...{ setTopTitle }} />}></Route>
            <Route
              path="/auditNewCAPA/view"
              element={<AuditNewCAPAView {...{ setTopTitle }} />}></Route>
          </>
        )}
        {main.auditnew && sub.depcapa && (
          <>
            <Route
              path="/auditDepCapa"
              element={<AuditDepCAPA {...{ setTopTitle }} />}></Route>
            <Route
              path="/auditDepCapa/view"
              element={<AuditDepCAPAView {...{ setTopTitle }} />}></Route>
          </>
        )}
        {main.auditnew && sub.approvenew && (
          <>
            <Route
              path="/auditNewApproval"
              element={<AuditNewApproval {...{ setTopTitle }} />}></Route>
            <Route
              path="/auditNewApproval/view"
              element={<AuditNewApprovalView {...{ setTopTitle }} />}></Route>
          </>
        )}
        {main.auditnew && sub.approvedep && (
          <>
            <Route
              path="/auditDepApproval"
              element={<AuditDepApproval {...{ setTopTitle }} />}></Route>
            <Route
              path="/auditDepApproval/view"
              element={<AuditDepApprovalView {...{ setTopTitle }} />}></Route>
          </>
        )}
        {main.auditnew && sub.auditreport && (
          <>
            <Route
              path="/auditNewReport"
              element={<AuditNewReport {...{ setTopTitle }} />}></Route>
            <Route
              path="/auditNewReport/view"
              element={<AuditNewReportView {...{ setTopTitle }} />}></Route>
          </>
        )}
        {/* {main.auditnew && sub.auditcatewisereport && (
          <>
            <Route path='/auditCateWiseReport' element={<AuditCateWiseReport {...{setTopTitle}}/>}></Route>
            <Route path='/auditCateWiseReport/view' element={<AuditCateWiseReportView {...{setTopTitle}}/>}></Route>   
            </>
        )} */}
        {main.auditnew && sub.auditincentivehr && (
          <>
            <Route
              path="/auditIncentiveHR"
              element={<AuditIncentiveHR {...{ setTopTitle }} />}></Route>
            <Route
              path="/auditIncentiveHR/view"
              element={<AuditIncentiveHRForm {...{ setTopTitle }} />}></Route>
            <Route
              path="/auditIncentiveHR/edit"
              element={
                <AuditIncentiveHREditForm {...{ setTopTitle }} />
              }></Route>
          </>
        )}
        {main.auditnew && sub.auditincentiveoh && (
          <>
            <Route
              path="/auditIncentiveOH"
              element={<AuditIncentiveOH {...{ setTopTitle }} />}></Route>
            <Route
              path="/auditIncentiveOH/view"
              element={<AuditIncentiveOHForm {...{ setTopTitle }} />}></Route>
          </>
        )}

        {main.auditnew && sub.auditincentiveoh && (
          <>
            <Route
              path="/auditIncentiveOHApproveView"
              element={<AuditIncentiveOHView {...{ setTopTitle }} />}></Route>
            <Route
              path="/auditIncentiveOHApproveView/view"
              element={
                <AuditIncentiveOHFormView {...{ setTopTitle }} />
              }></Route>
          </>
        )}

        {main.auditnew && sub.auditincentiveac && (
          <>
            <Route
              path="/auditIncentiveAC"
              element={<AuditIncentiveAC {...{ setTopTitle }} />}></Route>
            <Route
              path="/auditIncentiveAC/view"
              element={<AuditIncentiveACForm {...{ setTopTitle }} />}></Route>
          </>
        )}
        {main.auditnew && sub.auditincentiveac && (
          <>
            <Route
              path="/auditIncentiveACApproveView"
              element={
                <AuditIncentiveACApproveView {...{ setTopTitle }} />
              }></Route>
            <Route
              path="/auditIncentiveACApproveView/view"
              element={
                <AuditIncentiveACApproveViewForm {...{ setTopTitle }} />
              }></Route>
          </>
        )}

        {main.auditnew && sub.auditincentivebh && (
          <>
            <Route
              path="/auditIncentiveBH"
              element={<AuditIncentiveBH {...{ setTopTitle }} />}></Route>
            <Route
              path="/auditIncentiveBH/view"
              element={<AuditIncentiveBHForm {...{ setTopTitle }} />}></Route>
          </>
        )}

        {main.auditnew && sub.auditincentivebh && (
          <>
            <Route
              path="/auditIncentiveBHApproveView"
              element={
                <AuditIncentiveBHApproveFormView {...{ setTopTitle }} />
              }></Route>
            <Route
              path="/auditIncentiveBHApproveView/view"
              element={
                <AuditIncentiveBHApproveFullView {...{ setTopTitle }} />
              }></Route>
          </>
        )}

        {main.auditnew && sub.auditincentiveacfinal && (
          <>
            <Route
              path="/auditIncentiveACFinal"
              element={<AuditIncentiveACFinal {...{ setTopTitle }} />}></Route>
            <Route
              path="/auditIncentiveACFinal/view"
              element={
                <AuditIncentiveACFinalForm {...{ setTopTitle }} />
              }></Route>
          </>
        )}

        {main.auditnew && sub.auditincentiveacfinal && (
          <>
            <Route
              path="/auditIncentiveACApproveFullView"
              element={
                <AuditIncentiveACApproveFullView {...{ setTopTitle }} />
              }></Route>
            <Route
              path="/auditIncentiveACApproveFullView/view"
              element={
                <AuditIncentiveACApproveFormFullView {...{ setTopTitle }} />
              }></Route>
          </>
        )}

        {main.auditnew && sub.auditincentivehr && (
          <>
            <Route
              path="/auditIncentiveHRSubmitView"
              element={
                <AuditIncentiveHRSubmitView {...{ setTopTitle }} />
              }></Route>
            <Route
              path="/auditIncentiveHRSubmitView/view"
              element={
                <AuditIncentiveHRSubmitViewForm {...{ setTopTitle }} />
              }></Route>
          </>
        )}

        {main.auditnew && sub.auditincentivehr && (
          <>
            <Route
              path="/auditIncentiveHRRejectionView"
              element={
                <AuditIncentiveHRRejectionView {...{ setTopTitle }} />
              }></Route>
            <Route
              path="/auditIncentiveHRRejectionView/view"
              element={
                <AuditIncentiveHRRejectionViewForm {...{ setTopTitle }} />
              }></Route>
          </>
        )}
        {main.auditnew && sub.auditincentivehr && (
          <>
            <Route
              path="/auditIncentiveHRHoldReject"
              element={
                <AuditIncentiveHRHoldReject {...{ setTopTitle }} />
              }></Route>
            <Route
              path="/auditIncentiveHRHoldReject/view"
              element={
                <AuditIncentiveHRHoldRejectForm {...{ setTopTitle }} />
              }></Route>
          </>
        )}
        {main.auditnew && sub.auditpaymentreport && (
          <>
            <Route
              path="/auditIncentiveReport"
              element={<AuditIncentiveReport {...{ setTopTitle }} />}></Route>
            <Route
              path="/auditIncentiveReport/view"
              element={
                <AuditIncentiveReportViewForm {...{ setTopTitle }} />
              }></Route>
          </>
        )}

        {main.auditnew && sub.auditpaymentreport && (
          <>
            <Route
              path="/auditIncentiveReportView"
              element={
                <AuditIncentiveReportView {...{ setTopTitle }} />
              }></Route>
            <Route
              path="/auditIncentiveReportView/view"
              element={
                <AuditIncentiveReportFullViewForm {...{ setTopTitle }} />
              }></Route>
          </>
        )}

        {main.auditnew && sub.auditoutletpaymentreport && (
          <>
            <Route
              path="/auditIncentiveOutletWiseReport"
              element={
                <AuditOutletwisePaymentReportView {...{ setTopTitle }} />
              }></Route>
            <Route
              path="/auditIncentiveOutletWiseReport/view"
              element={
                <AuditOutletwisePaymentReportViewForm {...{ setTopTitle }} />
              }></Route>
          </>
        )}

        {main.auditnew && sub.auditcategorywisereport && (
          <>
            <Route
              path="/auditCategorytWiseReport"
              element={
                <AuditCategorywiseReport {...{ setTopTitle }} />
              }></Route>
            <Route
              path="/auditCategorytWiseReport/view"
              element={
                <AuditCategorywiseReportForm {...{ setTopTitle }} />
              }></Route>
          </>
        )}

        {/* for cash handling sales day closure */}
        {main.cashclosure && sub.cash_handling && (
          <>
            <Route
              path="/cashHandling"
              element={<CashHandling {...{ setTopTitle }} />}></Route>
            <Route
              path="/cashHandling/addform"
              element={<CashHandlingForm {...{ setTopTitle }} />}></Route>
            <Route
              path="/cashHandling/edit"
              element={<CashHandlingEdit {...{ setTopTitle }} />}></Route>
            <Route
              path="/cashHandling/view"
              element={<CashHandlingView {...{ setTopTitle }} />}></Route>
          </>
        )}
        {main.cashclosure && sub.cash_handling_verification && (
          <>
            <Route
              path="/backOffice"
              element={<BackOffice {...{ setTopTitle }} />}></Route>
            <Route
              path="/backOffice/edit"
              element={<BackofficeEdit {...{ setTopTitle }} />}></Route>
            <Route
              path="/backOffice/view"
              element={<BackOfficeView {...{ setTopTitle }} />}></Route>
          </>
        )}
        {main.cashclosure && sub.sales_data && (
          <>
            <Route
              path="/salesReport"
              element={<SaleReport {...{ setTopTitle }} />}></Route>
          </>
        )}
        {main.cashclosure && sub.cash_handling_report && (
          <>
            <Route
              path="/cashDeposit"
              element={<CashHandlingReport {...{ setTopTitle }} />}></Route>
          </>
        )}
        {main.cashclosure && sub.crew_master && (
          <>
            <Route
              path="/crewMaster"
              element={<CrewMaster {...{ setTopTitle }} />}></Route>
            <Route
              path="/crewMaster/addForm"
              element={<CrewMasterForm {...{ setTopTitle }} />}></Route>{" "}
          </>
        )}
        {main.discipline && sub.callback_entry && (
          <>
            <Route
              path="/callEntry"
              element={<CallEntry {...{ setTopTitle }} />}></Route>
            <Route
              path="/callEntry/addForm"
              element={<CallEntryView {...{ setTopTitle }} />}></Route>{" "}
          </>
        )}

        {main.discipline && sub.callback_entry_edit && (
          <>
            <Route
              path="/editcallBackEntry"
              element={<CallBackEntryEdit {...{ setTopTitle }} />}></Route>
            <Route
              path="/editcallBackEntry/editForm"
              element={
                <CallBackEntryEditForm {...{ setTopTitle }} />
              }></Route>{" "}
          </>
        )}

        {main.discipline && sub.callback_approval && (
          <>
            <Route
              path="/CallBackApproval"
              element={<CallEntryApproval {...{ setTopTitle }} />}></Route>
            <Route
              path="/CallBackApproval/View"
              element={
                <CallEntryApprovalForm {...{ setTopTitle }} />
              }></Route>{" "}
          </>
        )}
        {main.discipline && sub.crew_master && (
          <>
            <Route
              path="/crewMaster"
              element={<CrewMaster {...{ setTopTitle }} />}></Route>
            <Route
              path="/crewMaster/addForm"
              element={<CrewMasterForm {...{ setTopTitle }} />}></Route>{" "}
          </>
        )}

        {main.discipline && sub.callback_report && (
          <>
            <Route
              path="/CallBackReport"
              element={<CallBackReport {...{ setTopTitle }} />}></Route>
            <Route
              path="/CallBackReport/View"
              element={
                <CallBackReportForm {...{ setTopTitle }} />
              }></Route>{" "}
          </>
        )}

        {main.deepcleaning && sub.equipment_master && (
          <>
            <Route
              path="/equipmentMaster"
              element={<EquipmentMaster {...{ setTopTitle }} />}></Route>
            <Route
              path="/equipmentMaster/addForm"
              element={
                <EquipmentMasterForm {...{ setTopTitle }} />
              }></Route>{" "}
            <Route
              path="/equipmentMaster/view"
              element={
                <EquipmentMasterEditForm {...{ setTopTitle }} />
              }></Route>{" "}
          </>
        )}
        {main.deepcleaning && sub.day_plan_mapping && (
          <>
            <Route
              path="/dayPlanMappingMaster"
              element={<DayPlanMapping {...{ setTopTitle }} />}></Route>
            <Route
              path="/dayPlanMappingMaster/addForm"
              element={
                <DayPlanMappingForm {...{ setTopTitle }} />
              }></Route>{" "}
            <Route
              path="/dayPlanMappingMaster/view"
              element={
                <DayPlanMappingEditForm {...{ setTopTitle }} />
              }></Route>{" "}
          </>
        )}
        {main.deepcleaning && sub.deep_cleaning && (
          <>
            <Route
              path="/deepCleaning"
              element={<DeepCleaning {...{ setTopTitle }} />}></Route>
            <Route
              path="/deepCleaning/addForm"
              element={<DeepCleaningForm {...{ setTopTitle }} />}></Route>{" "}
          </>
        )}
        {main.deepcleaning && sub.edit_deep_cleaning && (
          <>
            <Route
              path="/editdeepCleaning"
              element={<EditDeepCleaning {...{ setTopTitle }} />}></Route>
            <Route
              path="/editdeepCleaning/editForm"
              element={
                <EditDeepCleaningForm {...{ setTopTitle }} />
              }></Route>{" "}
          </>
        )}
        {main.deepcleaning && sub.deep_cleaning_app && (
          <>
            <Route
              path="/deepCleaningApproval"
              element={<DeepCleaningApproval {...{ setTopTitle }} />}></Route>
            <Route
              path="/deepCleaningApproval/addForm"
              element={
                <DeepCleaningApprovalForm {...{ setTopTitle }} />
              }></Route>{" "}
          </>
        )}
        {main.deepcleaning && sub.deviation_report && (
          <>
            <Route
              path="/deviationReport"
              element={<DeviationReport {...{ setTopTitle }} />}></Route>
            <Route
              path="/deviationReport/addForm"
              element={
                <DeviationReportForm {...{ setTopTitle }} />
              }></Route>{" "}
          </>
        )}      
      {/* {main.service (
        <> */}
          <Route
              path="/createTicket"
              element={<CreateTicket setTopTitle={setTopTitle} />}></Route>
            <Route
              path="/createTicket/addEditForm"
              element={<CreateTicketForm setTopTitle={setTopTitle} />}></Route>
            <Route
              path="/createTicket/showForm"
              element={<ShowTicket />}></Route>
            <Route
              path="/createTicket/showForm1"
              element={<ShowTicket1 />}></Route>
            <Route
              path="/handleTicket"
              element={<TicketHandling setTopTitle={setTopTitle} />}></Route>
            <Route
              path="/ticketHandling"
              element={
                <TicketHandlingForm setTopTitle={setTopTitle} />
              }></Route>
            <Route path="/pcadvancereqms" element={<Pcadvancereqms />}></Route>
            <Route
              path="/pcadvancereqms/pcadvancereqmsEdit"
              element={<PcadvancereqmsEdit />}></Route>
            <Route
              path="/pcaclaimsubmissionms"
              element={<Pcaclaimsubmissionms />}></Route>
            <Route
              path="/pcsubmissionRejected"
              element={<PCSubmissionRejected />}></Route>

            <Route
              path="/pcsubmissionRejected/view"
              element={<PcprocessReject />}></Route>
            <Route
              path="/pcaclaimsubmissionms/view"
              element={<PCClaminSubmissionView />}></Route>
            <Route
              path="/pcadvancereqmsform"
              element={<PcadvancereqmsForm />}></Route>
            <Route path="/poprocess" element={<Poprocess />}></Route>
            <Route path="/poprocessForm" element={<PoprocessForm />}></Route>
            <Route path="/pcclaimreqorl" element={<Pcclaimreqorl />}></Route>
            <Route
              path="/pcclaimreqorlForm"
              element={<PcclaimreqorlForm />}></Route>
            <Route path="/poprocessappoh" element={<Poprocessappoh />}></Route>
            <Route
              path="/poprocessappohForm"
              element={<PoprocessappohForm />}></Route>
            <Route path="/poprocessappah" element={<Poprocessappah />}></Route>
            <Route
              path="/poprocessappahForm"
              element={<PoprocessappahForm />}></Route>
            <Route
              path="/orlpcclaimapparm"
              element={<Orlpcclaimapparm />}></Route>
            <Route
              path="/orlpcclaimapparmForm"
              element={<OrlpcclaimapparmForm />}></Route>
            <Route
              path="/orlpcclaimappbo"
              element={<Orlpcclaimappbo />}></Route>
            <Route
              path="/orlpcclaimappboForm"
              element={<OrlpcclaimappboForm />}></Route>
            <Route
              path="/orlpcclaimappah"
              element={<Orlpcclaimappah />}></Route>
            <Route
              path="/orlpcclaimappahForm"
              element={<OrlpcclaimappahForm />}></Route>
            <Route
              path="/orlpcclaimappbh"
              element={<Orlpcclaimappbh />}></Route>
            <Route
              path="/orlpcclaimappbhForm"
              element={<OrlpcclaimappbhForm />}></Route>
            <Route path="/mspcclaimappoh" element={<Mspcclaimappoh />}></Route>
            <Route
              path="/mspcclaimappohAppRej"
              element={<MspcclaimappohAppRej />}></Route>
            <Route
              path="/mspcclaimappohForm"
              element={<MspcclaimappohForm />}></Route>

            <Route
              path="/msclaimappahForm"
              element={<MspcclaimappohForm />}></Route>

            <Route path="/mspcclaimappah" element={<Mspcclaimappah />}></Route>
            <Route
              path="/mspcclaimappahForm"
              element={<Pcadvancereqmsah />}></Route>
            <Route
              path="/mspcclaimappahEdit"
              element={<PcadvancereqmsohEdit />}></Route>
            <Route
              path="/mspcadvanceappoh"
              element={<Mspcadvanceappoh />}></Route>
            <Route
              path="/mspcadvanceappohForm"
              element={<MspcadvanceappohForm />}></Route>
            <Route
              path="/mspcadvanceappah"
              element={<Mspcadvanceappah />}></Route>
            <Route
              path="/mspcadvanceappahForm"
              element={<MspcadvanceappahForm />}></Route>
            <Route
              path="/mspcadvanceappbh"
              element={<Mspcadvanceappbh />}></Route>
            <Route
              path="/mspcadvanceappbhForm"
              element={<MspcadvanceappbhForm />}></Route>
            <Route
              path="/ticketstatusreportorl"
              element={<Ticketstatusreportorl />}></Route>
            <Route
              path="/ticketstatusreportorlForm"
              element={<TicketstatusreportorlForm />}></Route>
            <Route
              path="/pccliamorlreport"
              element={<Pccliamorlreport />}></Route>
            <Route
              path="/pccliamorlreportForm"
              element={<PccliamorlreportForm />}></Route>
            <Route path="/fisubmit" element={<Fisubmit />}></Route>
            <Route path="/paymentclick" element={<Paymentclick />}></Route>
            <Route
              path="/pclcimapprovalah"
              element={<Pclcimapprovalah />}></Route>
            <Route
              path="/claimsubmission"
              element={<Claimsubmission />}></Route>
            <Route
              path="/mspcrequestreport"
              element={<Mspcrequestreport />}></Route>
            <Route path="/formticket1" element={<Formticket1 />}></Route>
            <Route path="/formticket2" element={<Formticket2 />}></Route>
            <Route path="/formticket3" element={<Formticket3 />}></Route>
            <Route path="/formticket4" element={<Formticket4 />}></Route>

        <Route path="/entry" element={<Entry {...{ setTopTitle }} />}></Route>
        <Route
          path="/entry/addform"
          element={<EntryForm {...{ setTopTitle }} />}
        ></Route>
        <Route
          path="/entry/editform"
          element={<EntryEditForm {...{ setTopTitle }} />}
        ></Route>
         {main.ebreading && sub.budget_master && (
          <>
            <Route path='/budgetMaster' element={<BudgetMaster {...{setTopTitle}} />}></Route>
            <Route path='/budgetMaster/addForm' element={<BudgetMasterForm {...{setTopTitle}} />}></Route>{' '}
            <Route path='/budgetMaster/editForm' element={<BudgetMasterEditForm {...{setTopTitle}} />}></Route>{' '}
          </>
        )}

        {main.ebreading&& sub.ebreadingentryform && (
          <>
            <Route path='/ebReading' element={<EBReadingEntry {...{setTopTitle}} />}></Route>
            <Route path='/ebReading/addForm' element={<EBReadingEntryForm {...{setTopTitle}} />}></Route>{' '}          
          </>
        )}
         {main.ebreading&& sub.ebreadingeditentryform && (
          <>
            <Route path='/ebReadingEdit' element={<EBReadingEditEntry {...{setTopTitle}} />}></Route>
            <Route path='/ebReadingEdit/editForm' element={<EBReadingEditEntryForm {...{setTopTitle}} />}></Route>{' '}         
          </>
        )}
         {main.ebreading&& sub.ebreadingapprovalentryform && (
          <>
            <Route path='/ebReadingApproval' element={<EBReadingApprovalEntry {...{setTopTitle}} />}></Route>
            <Route path='/ebReadingApproval/editForm' element={<EBReadingApprovalEntryForm {...{setTopTitle}} />}></Route>{' '}         
          </>
        )}
         {main.ebreading&& sub.ebreadingreportform && (
          <>
            <Route path='/ebReadingReport' element={<EBReadingReport{...{setTopTitle}} />}></Route>
            <Route path='/ebReadingReport/addForm' element={<EBReadingReportForm {...{setTopTitle}} />}></Route>{' '}         
          </>
        )}

      {main.edc && sub.edcform && (
          <>
            <Route path='/edcDetails' element={<EDC {...{setTopTitle}} />}></Route>           
            <Route path="/edcDetails/csvUpdate" element={<EDCFormCsv {...{setTopTitle}}/>}></Route>{ ' ' }     
          </>
        )}
     {main.edc && sub.dotpeform && (
          <>
            <Route path='/dotpeDetails' element={<Dotpe {...{setTopTitle}} />}></Route>           
            <Route path="/dotpeDetails/csvUpdate" element={<DotpeFormCsv {...{setTopTitle}}/>}></Route>{ ' ' }     
          </>
        )}
      {main.edc && sub.outletBankform && (
          <>
            <Route path='/outletBankDetails' element={<OutletBankDetails {...{setTopTitle}} />}></Route>           
            <Route path="/outletBankDetails/addForm" element={<OutletBankDetailsForm {...{setTopTitle}}/>}></Route>{ ' ' }     
          </>
        )}
      {main.edc && sub.ristaSalesform && (
          <>
            <Route path='/ristaSalesDetails' element={<RistaSaleData {...{setTopTitle}} />}></Route>           
            {/* <Route path="/outletBankDetails/addForm" element={<OutletBankDetailsForm {...{setTopTitle}}/>}></Route>{ ' ' }      */}
          </>
      )}
       {main.edc && sub.edcsalesReport && (
          <>
            <Route path='/edcSalesReport' element={<EDCSalesDetails {...{setTopTitle}} />}></Route>           
            <Route path="/edcSalesReport/addForm" element={<EDCSalesDetailsForm {...{setTopTitle}}/>}></Route>{ ' ' }     
          </>
      )}
       {main.edc && sub.dotpeReportform && (
          <>
            <Route path='/dotpePaymentReport' element={<DotpePaymentDetails {...{setTopTitle}} />}></Route>           
            <Route path="/dotpePaymentReport/addForm" element={<DotpePaymentDetailsForm {...{setTopTitle}}/>}></Route>{ ' ' }     
          </>
      )}

        {main.edc && sub.swiggyform && (
          <>
            <Route path='/swiggyDetails' element={<Swiggy {...{setTopTitle}} />}></Route>           
            <Route path="/swiggyDetails/csvUpdate" element={<SwiggyFormCsv {...{setTopTitle}}/>}></Route>{ ' ' }     
          </>
        )}
         {main.edc && sub.magicPinform && (
          <>
            <Route path='/magicPinDetails' element={<MagicPin {...{setTopTitle}} />}></Route>           
            <Route path="/magicPinDetails/csvUpdate" element={<MagicPinFormCsv {...{setTopTitle}}/>}></Route>{ ' ' }     
          </>
        )}
         {main.edc && sub.zomatoform && (
          <>
            <Route path='/zomatoDetails' element={<Zomato {...{setTopTitle}} />}></Route>           
            <Route path="/zomatoDetails/csvUpdate" element={<ZomatoFormCsv {...{setTopTitle}}/>}></Route>{ ' ' }
          </>
        )}

      {main.edc && sub.swiggysalesReport && (
          <>
            <Route path='/swiggyPaymentReport' element={<SwiggyPaymentDetails {...{setTopTitle}} />}></Route>           
            <Route path="/swiggyPaymentReport/addForm" element={<SwiggyPaymentDetailsForm {...{setTopTitle}}/>}></Route>{ ' ' }     
          </>
      )}
       {main.edc && sub.zomatosalesReport && (
          <>
            <Route path='/zomatoPaymentReport' element={<ZomatoPaymentDetails {...{setTopTitle}} />}></Route>           
            <Route path="/zomatoPaymentReport/addForm" element={<ZomatoPaymentDetailsForm {...{setTopTitle}}/>}></Route>{ ' ' }     
          </>
      )}
       {main.edc && sub.magicPinsalesReport && (
          <>
            <Route path='/magicPinPaymentReport' element={<MagicPinPaymentDetails {...{setTopTitle}} />}></Route>           
            <Route path="/magicPinPaymentReport/addForm" element={<MagicPinPaymentDetailsForm {...{setTopTitle}}/>}></Route>{ ' ' }     
          </>
      )}
       {main.edc && sub.overallsalesReport && (
          <>
            <Route path='/overallPaymentReport' element={<OverallPaymentDetails {...{setTopTitle}} />}></Route>           
            <Route path="/overallPaymentReport/addForm" element={<OverallPaymentDetailsForm {...{setTopTitle}}/>}></Route>{ ' ' }     
          </>
      )}

      {main.stock && sub.stockDetailsForm && (
          <>
            <Route path='/stockDetails' element={<StockDetails {...{setTopTitle}} />}></Route>
            <Route path='/stockDetails/addForm' element={<StockDetailsForm {...{setTopTitle}} />}></Route>{' '}          
          </>
        )}
      {main.stock && sub.ristaStockUploadform && (
          <>
            <Route path='/stockUploadDetails' element={<StockUpload {...{setTopTitle}} />}></Route>
            <Route path='/stockUploadDetails/csvUpdate' element={<StockUploadFormCsv {...{setTopTitle}} />}></Route>{' '}          
          </>
        )}
       {main.stock && sub.consumableform && (
          <>
            <Route path='/consumableMaster' element={<ConsumableMaster {...{setTopTitle}} />}></Route>
            <Route path='/consumableMaster/addForm' element={<ConsumableMasterForm {...{setTopTitle}} />}></Route>{' '}          
            <Route path="/consumableMaster/csvUpdate" element={<ConsumableMasterUploadCSVForm {...{setTopTitle}}/>}></Route>{ ' ' }     
            <Route path='/consumableMaster/editForm' element={<ConsumableMasterEditForm {...{setTopTitle}} />}></Route>{' '}         
          </>
        )}
         {main.stock && sub.consumableEntryform && (
          <>
            <Route path='/consumableEntry' element={<ConsumableEntry {...{setTopTitle}} />}></Route>
            <Route path='/consumableEntry/addForm' element={<ConsumableEntryForm {...{setTopTitle}} />}></Route>{' '}          
          </>
        )}
        
         {main.stock && sub.consumableEntryReportform && (
          <>
            <Route path='/consumableEntryReport' element={<ConsumableEntryReport {...{setTopTitle}} />}></Route>
            <Route path='/consumableEntryReport/addForm' element={<ConsumableEntryReportForm {...{setTopTitle}} />}></Route>{' '}          
          </>
        )}
           {main.stock && sub.consumableEntryLowReportform && (
          <>
            <Route path='/consumableEntryLowReport' element={<ConsumableEntryLowReport {...{setTopTitle}} />}></Route>
            <Route path='/consumableEntryLowReport/addForm' element={<ConsumableEntryLowReportForm {...{setTopTitle}} />}></Route>{' '}          
          </>
        )}
         {main.stock && sub.consumableFullEntryViewReportform && (
          <>
            <Route path='/consumableFullEntryViewReport' element={<ConsumableFullEntryViewReport {...{setTopTitle}} />}></Route>
            <Route path='/consumableFullEntryViewReport/addForm' element={<ConsumableFullEntryViewReportForm {...{setTopTitle}} />}></Route>{' '}          
          </>
        )}
        {main.calendar && sub.calendarAddEventform && (
          <>
            <Route path='/calendarEvent' element={<CalendarEvent {...{setTopTitle}} />}></Route>  
            <Route path='/calendarReport' element={<CalendarEventReport {...{setTopTitle}} />}></Route>  
            <Route path="/calendarEvent/csvUpdate" element={<CalendarEventUploadCSVForm {...{setTopTitle}}/>}></Route>{ ' ' }                     
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;


