import React, { useState, useEffect } from "react";
import {
  Calendar,
  Modal,
  Button,
  Input,
  Select,
  Form,
  Row,
  Col,
  Radio,
  Card,
  message,
  Tooltip
} from "antd";
import { v4 as uuidv4 } from "uuid";
import { useLocation } from "react-router";
import ConfirmOnExit from "../../../components/confirmOnExit/ConfirmOnExit";
import { useDispatch, useSelector } from "react-redux";
import { getAllMappedOutlet } from "../../../@app/subMaster/subMasterSlice";
import {
  getDefinitionsList,
  getCalendarEvent
} from "../../../@app/subMaster/subMasterSlice";
import { getEmployeeMaster } from "../../../@app/master/masterSlice";
import { map } from "ramda";
import apis from "../../../api/stateAPI";
import messageToast from "../../../components/messageToast/messageToast";
import { useNavigate } from "react-router";
import moment from "moment";
import dayjs from "dayjs";
import { FaUpload, FaDownload } from "react-icons/fa";

const { Option } = Select;

const CalendarEvent = ({ setTopTitle }) => {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentEvent, setCurrentEvent] = useState("");
 // console.log(currentEvent,'currentEvent');
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [showDialog, setShowDialog] = useState(false);
  const { state } = useLocation();

  let newDateFrom;
  const onchangedateFrom = (e) => {
    newDateFrom = e.target.value;
    setDateFrom(newDateFrom);
  };

  useEffect(() => {
    dispatch(getEmployeeMaster());
  }, [dispatch]);

  let newDateTo;
  const onchangedateTo = (e) => {
    newDateTo = e.target.value;
    setDateTo(newDateTo);
  };

  let defaultValue = state?.data;

  const {
    gettingEmployeeMaster,
    getEmployeeMasterResponse: { data: EmployeeList }
  } = useSelector((state) => {
    return state.master;
  });

  useEffect(() => {
    setTopTitle("Calendar Event");
  }, [setTopTitle]);

  const handleSelectDate = () => {
    setCurrentEvent(null);
    setModalVisible(true);
  };

  const handleEventClick = (event) => {
    setCurrentEvent(event);
    setModalVisible(true);
  };

  useEffect(() => {
    dispatch(getDefinitionsList());
  }, []);

  useEffect(() => {
    dispatch(getCalendarEvent());
  }, []);

  const {
    getCalendarEventResponse: { data: dataSource }
  } = useSelector((state) => state.subMaster);

  const {
    gettingDefinitionsList,
    getDefinitionsListResponse: { data: def }
  } = useSelector((state) => {
    return state.subMaster;
  });

  const handleDeleteEvent = () => {
    const newEvent = {
      event_id: currentEvent ? currentEvent.event_id : uuidv4(),
      id: currentEvent.id,
      status: 2
    };
    setEvents((prevEvents) => {
      if (currentEvent) {
        return prevEvents.map((event) =>
          event.id === currentEvent.id ? newEvent : event
        );
      }
      return [...prevEvents, newEvent];
    });
    setCurrentEvent(newEvent);
    apis.deleteCalendarEvent(newEvent).then((res) => {
      if (res.data.status === 200) {
        setTimeout(() => {
          messageToast({
            message: res.data.statusText,
            statusText: res.data.statusText,
            title: "Calendar Event Created"
          });
          dispatch(getCalendarEvent());
          navigate("/calendarEvent");
        }, 2000);
      } else if (res.data.status === 300) {
        messageToast({
          message: res.data.statusText,
          statusText: res.data.statusText,
          title: "Calendar Event"
        });
      } else {
        messageToast({
          message: "Something went wrong",
          statusText: res.data.statusText,
          title: "Calendar Event"
        });
      }
    });
    setModalVisible(false);
    setCurrentEvent(null);
  };

  const [eventMap, setEventMap] = useState({});

  useEffect(() => {
    if (!dataSource) return;
    const map = {};
    dataSource.forEach((event) => {
      const startDate = moment(event.event_date_from);
      const endDate = moment(event.event_date_to);
      let currentDate = startDate;
      while (currentDate.isSameOrBefore(endDate)) {
        const dateStr = currentDate.format("YYYY-MM-DD");
        if (!map[dateStr]) {
          map[dateStr] = [];
        }
        map[dateStr].push(event);
        currentDate = currentDate.add(1, "days");
      }
    });
    setEventMap(map);
  }, [dataSource]);

  // DJB2 hash function
  const hashCode = (str) => {
    let hash = 5381;
    // Handle null or undefined strings
    if (!str) {
        str = ""; // You can replace "default" with any fallback string
    }
    for (let i = 0; i < str.length; i++) {
      hash = (hash * 33) ^ str.charCodeAt(i);
    }
    return hash >>> 0;
  };

  // Function to generate a color from a hash value
  const getColorFromHash = (str) => {
    const hash = hashCode(str);
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 80%)`;
  };

  // Date cell render function
  const dateCellRender = (value) => {
    const dateStr = value.format("YYYY-MM-DD");
    const events = eventMap[dateStr] || [];
    const isWeekend = value.day() === 0 || value.day() === 6;
    return (
      <div
      style={{
        backgroundColor: isWeekend ? "#F5B41E" : "#ffffff",       
        borderRadius: "4px",
        padding: "5px"
      }}
      >      
        {events.map((event) => (
          <div
            key={event.id}
            onClick={() => handleEventClick(event)}
            style={{
              backgroundColor: getColorFromHash(event.event_type),
              padding: "3px 8px",
              borderRadius: "4px",
              color: "#000000",
              fontWeight: "bold",
              cursor: "pointer",
              marginBottom: "4px"
            }}
          >
          {event.event_name ? `${event.event_name}` : ''}
          </div>
        ))}
      </div>
    );
  };

  const [physicalMarketing, setPhysicalMarketing] = useState(
    defaultValue?.physical_marketing_status ?? false
  );
  const [digitalMarketing, setDigitalMarketing] = useState(
    defaultValue?.digital_marketing_status ?? false
  );
  const [monitoring, setMonitoring] = useState(
    defaultValue?.monitoring_status ?? false
  );
  const [productDiscount, setProductDiscount] = useState(
    defaultValue?.product_discount_status ?? false
  );

  const [physicalMarketingNew, setPhysicalMarketingNew] = useState(
    defaultValue?.physical_marketing_status ?? false
  );
  const [digitalMarketingNew, setDigitalMarketingNew] = useState(
    defaultValue?.digital_marketing_status ?? false
  );
  const [monitoringNew, setMonitoringNew] = useState(
    defaultValue?.monitoring_status ?? false
  );
  const [productDiscountNew, setProductDiscountNew] = useState(
    defaultValue?.product_discount_status ?? false
  );

  const { type } = useSelector((state) => { return state.auth; });
 
  const userData = useSelector((state) => state.auth);

  const empId = userData.data?.id;

  const [selectedOutlets, setselectedOutlets] = useState([]);
  const [dropdownoutlet, setdropdownoutlet] = useState([]);
  const { gettingAllMappedOutlet } = useSelector((state) => state.subMaster);

  //const dateFormat = ['DD/MM/YYYY', 'DD/MM/YY'];
  useEffect(() => {
    const fetchData = async () => {
      try {
        let result;
        if (type == 1) {
          result = await dispatch(
            getAllMappedOutlet({
              path: "get-all-mapped-outlet",
              data: {}
            })
          );
        } else {
          result = await dispatch(
            getAllMappedOutlet({
              path: "get-all-mapped-outlet",
              data: {
                employee: empId
              }
            })
          );
        }
        if (result) {
          const options = result.data.map((item) => ({
            key: item.outlet_code,
            value: item.outlet_code,
            label: `${item.outlet_code}-${item.name}`
          }));
          options.unshift({
            key: "select_all",
            value: "select_all",
            label: "Select All"
          });
          options.unshift({
            key: "unselect_all",
            value: "unselect_all",
            label: "Unselect All"
          });
          setdropdownoutlet(options);
        }
      } catch (error) {
        // Handle errors if necessary
      }
    };

    fetchData();
  }, [type, empId, dispatch]);

  const SelectAllOutlets = () => {
    if (!dropdownoutlet || dropdownoutlet.length === 0) {
      setselectedOutlets([]);
    } else {
      const allValuesExceptSpecial = dropdownoutlet
        .filter(
          (option) =>
            option.value !== "select_all" && option.value !== "unselect_all"
        )
        .map((option) => option.value);
      setselectedOutlets(allValuesExceptSpecial);
    }
  };

  const handleOnChange = (e) => {
    setShowDialog(true);
    if (e.target.name === "physical_marketing_status") {
      if (e.target.value === 0) {
        setPhysicalMarketing(false);
      } else {
        setPhysicalMarketing(true);
      }
    }
    if (e.target.name === "digital_marketing_status") {
      if (e.target.value === 0) {
        setDigitalMarketing(false);
      } else {
        setDigitalMarketing(true);
      }
    }

    if (e.target.name === "monitoring_status") {
      if (e.target.value === 0) {
        setMonitoring(false);
      } else {
        setMonitoring(true);
      }
    }
    if (e.target.name === "product_discount_status") {
      if (e.target.value === 0) {
        setProductDiscount(false);
      } else {
        setProductDiscount(true);
      }
    }
    return form.setFieldsValue({
      [e.target.name]: e.target.value
    });
  };

  const handleOnChangeNew = (e) => {
    setShowDialog(true);
    if (e.target.name === "physical_marketing_status") {
      if (e.target.value === 0) {
        setPhysicalMarketingNew(false);
      } else {
        setPhysicalMarketingNew(true);
      }
    }
    if (e.target.name === "digital_marketing_status") {
      if (e.target.value === 0) {
        setDigitalMarketingNew(false);
      } else {
        setDigitalMarketingNew(true);
      }
    }

    if (e.target.name === "monitoring_status") {
      if (e.target.value === 0) {
        setMonitoringNew(false);
      } else {
        setMonitoringNew(true);
      }
    }
    if (e.target.name === "product_discount_status") {
      if (e.target.value === 0) {
        setProductDiscountNew(false);
      } else {
        setProductDiscountNew(true);
      }
    }
    return form.setFieldsValue({
      [e.target.name]: e.target.value
    });
  };

  const [reasonForEvent, setReasonForEvent] = useState();
  const [eventType, setEventType] = useState();

  const [eventNature, setEventNature] = useState();
  const [executionPlan, setExecutionPlan] = useState();
  const [recurringPeriod, setRecurringPeriod] = useState();
  const [eventStatus, setEventStatus] = useState();

  const handleModalOk = (values) => {
    const outlet = selectedOutlets;
    if (currentEvent == null) {
      const physicalMarketingData = selectedOptions.map((id) => ({
        physical_marketing_id : id,
        physical_marketing_actual: actuals[id],
        physical_marketing_budget: budgets[id],
        physical_marketing_name: def.find((state) => state.id === id)?.def_list_name || "",
      }));
      const digitalMarketingData = selectedOptionsDigitalMarketing.map((id) => ({
        digital_marketing_id : id,
        digital_marketing_actual: actuals[id],
        digital_marketing_budget: budgets[id],
        digital_marketing_name: def.find((state) => state.id === id)?.def_list_name || "",
      }));
      const monitoringData =  selectedOptionsMonitoring.map((id) => ({
        monitoring_id : id,
        monitoring_actual: actuals[id],
        monitoring_budget: budgets[id],
        monitoring_name: def.find((state) => state.id === id)?.def_list_name || "",
      }));
      const productDiscountData =  selectedOptionsProductDiscount.map((id) => ({
        product_discount_id : id,
        product_discount_actual: actuals[id],
        product_discount_budget: budgets[id],
        product_discount_name: def.find((state) => state.id === id)?.def_list_name || "",
      }));
      const newEvent = {
        event_id: currentEvent ? currentEvent.event_id : uuidv4(),
        outlet_id: outlet,
        event_name: values.event_name,
        day_type: dayType,
        event_date_from: dateFrom,
        event_date_to: dateTo,
        events: events,
        reason_for_event: reasonForEvent,
        event_type: eventType,     
        budget_expenses_food_truck: values.budget_expenses_food_truck,
        rent_food_truck: values.rent_food_truck,
        man_power_food_truck: values.man_power_food_truck,
        cost_food_truck: values.cost_food_truck,
        driver_food_truck: values.driver_food_truck,
        petrol_food_truck: values.petrol_food_truck,
        mem_food_truck: values.mem_food_truck,
        transport_cost_FG_equipements_food_truck: values.transport_cost_FG_equipements_food_truck,
        mp_travel_expenses_food_truck: values.mp_travel_expenses_food_truck,
        budget_expenses_ODC: values.budget_expenses_ODC,
        transport_cost_ODC: values.transport_cost_ODC,
        rent_ODC: values.rent_ODC,
        mem_ODC: values.mem_ODC,
        eb_petrol_ODC: values.eb_petrol_ODC,
        food_expenses_ODC: values.food_expenses_ODC,
        budget_expenses_InStore: values.budget_expenses_InStore,
        whatsapp_campaign_InStore: values.whatsapp_campaign_InStore,
        organizer_company_name: values.organizer_company_name,
        expected_sales: values.expected_sales,
        budgeted_AOV: values.budgeted_AOV,
        expected_AOV: values.expected_AOV,      
        physical_marketing_status: values.physical_marketing_status,
        physical_marketing_id: physicalMarketingData,       
        digital_marketing_status: values.digital_marketing_status,      
        digital_marketing_id: digitalMarketingData,      
        monitoring_status: values.monitoring_status,
        monitoring_id: monitoringData,
        product_discount_status: values.product_discount_status,    
        product_discount_id: productDiscountData,    
        initiator_name: values.initiator_name,
        initiator_phone_no: values.initiator_phone_no,          
        employee_email: values.employee_email,
        event_nature: eventNature,
        organizer_name: values.organizer_name,      
        organizer_phone_no: values.organizer_phone_no,
        targeted_audience: values.targeted_audience,
        no_of_audience: values.no_of_audience,
        offer_details: values.offer_details,
        budgeted_ROI: values.budgeted_ROI,
        expected_convertion_ratio: values.expected_convertion_ratio,
        budgeted_sales: values.budgeted_sales,       
        execution_plan: executionPlan,
        recurring_period: recurringPeriod,
        event_status : eventStatus,
        created_by:userData.data?.id ?? "0",   
        status: 1
      };
      setEvents((prevEvents) => {
        if (currentEvent) {
          return prevEvents.map((event) =>
            event.id === currentEvent.id ? newEvent : event
          );
        }
        return [...prevEvents, newEvent];
      });
      setCurrentEvent(newEvent);
      apis.addCalendarEvent(newEvent).then((res) => {
        if (res.data.status === 200) {
          setTimeout(() => {
            messageToast({
              message: res.data.statusText,
              statusText: res.data.statusText,
              title: "Calendar Event Created"
            });
            dispatch(getCalendarEvent());
            navigate("/calendarEvent");
          }, 2000);
        } else if (res.data.status === 300) {
          messageToast({
            message: res.data.statusText,
            statusText: res.data.statusText,
            title: "Calendar Event"
          });
        } else {
          messageToast({
            message: "Something went wrong",
            statusText: res.data.statusText,
            title: "Calendar Event"
          });
        }
      });
      setModalVisible(false);
      setCurrentEvent(null);
    } else {
      console.log(outlet,'outlet');
      console.log(currentEvent.outlet_id,'currentEvent.outlet_id');
      const newEvent = {
        id: currentEvent ? currentEvent.id : currentEvent.id,
        event_id: currentEvent ? currentEvent.event_id : uuidv4(),
        outlet_id: outlet ? outlet : currentEvent.outlet_id,
        event_name: eventNewName ? eventNewName : currentEvent.event_name,
        day_type: dayType,
        event_date_from: eventNewDateFrom
          ? eventNewDateFrom
          : currentEvent.event_date_from,
        event_date_to: eventNewDateTo
          ? eventNewDateTo
          : currentEvent.event_date_to,
        events: events,
        reason_for_event: eventNewReason
          ? eventNewReason
          : currentEvent.reason_for_event,
        event_type: eventNewType ? eventNewType : currentEvent.event_type,    
        budget_expenses_food_truck: budgetExpensesFoodTruck,
        rent_food_truck: rentFoodTruck,
        man_power_food_truck: manPowerFoodTruck,
        cost_food_truck: costFoodTruck,
        driver_food_truck: driverFoodTruck,
        petrol_food_truck: petrolFoodTruck,
        mem_food_truck: memFoodTruck,
        transport_cost_FG_equipements_food_truck: transportCostFGEquipFoodTruck,
        mp_travel_expenses_food_truck: mpTravelExpensesFoodTruck,
        budget_expenses_ODC: budgetExpensesODC,
        transport_cost_ODC: transportCostODC,
        rent_ODC: rentODC,
        mem_ODC: memODC,
        eb_petrol_ODC: ebPetrolODC,
        food_expenses_ODC: foodExpensesODC,
        budget_expenses_InStore: budgetExpensesInStore,
        whatsapp_campaign_InStore: whatsappCampaignInStore,      
        physical_marketing_status: physicalMarketingNew
          ? physicalMarketingNew
          : currentEvent.physical_marketing_status,
        physical_marketing_id: marketingData
          ? marketingData
          : currentEvent.physical_marketing_id,
        digital_marketing_status: digitalMarketingNew
          ? digitalMarketingNew
          : currentEvent.digital_marketing_status,
        digital_marketing_id: digitalMarketingData 
          ? digitalMarketingData 
          : currentEvent.digital_marketing_id,      
        monitoring_status: monitoringNew
          ? monitoringNew
          : currentEvent.monitoring_status,
        monitoring_id: monitoringData
          ? monitoringData
          : currentEvent.monitoring_status,
        initiator_name: newInitiatorName
          ? newInitiatorName
          : currentEvent.initiator_name,
        employee_email: currentEvent.employee_email,
        initiator_phone_no: newInitiatorPhoneno
          ? newInitiatorPhoneno
          : currentEvent.initiator_phone_no,      
        product_discount_status: productDiscountNew
          ? productDiscountNew
          : currentEvent.product_discount_status,
        product_discount_id: productDiscountData
          ? productDiscountData
          : currentEvent.product_discount_id,      
        event_nature: newEventNature
          ? newEventNature
          : currentEvent.event_nature,
        organizer_name: newOrganizerName
          ? newOrganizerName
          : currentEvent.organizer_name,
        organizer_company_name: newOrganizerCompanyName
          ? newOrganizerCompanyName
          : currentEvent.organizer_company_name,
        organizer_phone_no: newOrganizerPhoneno
          ? newOrganizerPhoneno
          : currentEvent.organizer_phone_no,
        targeted_audience: newTargetAudi
          ? newTargetAudi
          : currentEvent.targeted_audience,
        no_of_audience: newNoofAudience
          ? newNoofAudience
          : currentEvent.no_of_audience,
        expected_convertion_ratio: expConverRatio
          ? expConverRatio
          : currentEvent.expected_convertion_ratio,
        offer_details: newOfferDetails
          ? newOfferDetails
          : currentEvent.offer_details,
        budgeted_ROI: newBudgetROI ? newBudgetROI : currentEvent.budgeted_ROI,
        budgeted_sales: newBudgetSales
          ? newBudgetSales
          : currentEvent.budgeted_sales,
        expected_sales: newExpectedSales
          ? newExpectedSales
          : currentEvent.expected_sales,
        budgeted_AOV: newBudgetAOV ? newBudgetAOV : currentEvent.budgeted_AOV,
        expected_AOV: newExpectedAOV
          ? newExpectedAOV
          : currentEvent.expected_AOV,
        execution_plan: executionNewPlan
          ? executionNewPlan
          : currentEvent.execution_plan,
        recurring_period: newRecuPlan
          ? newRecuPlan
          : currentEvent.recurring_period,
        event_status : eventNewStatus ? eventNewStatus : currentEvent.event_status,
        status: currentEvent.status ? currentEvent.status : currentEvent.status
      };
      setEvents((prevEvents) => {
        if (currentEvent) {
          return prevEvents.map((event) =>
            event.id === currentEvent.id ? newEvent : event
          );
        }
        return [...prevEvents, newEvent];
      });
      setCurrentEvent(newEvent);
      apis.updateCalendarEvent(newEvent).then((res) => {
        if (res.data.status === 200) {
          setTimeout(() => {
            messageToast({
              message: res.data.statusText,
              statusText: res.data.statusText,
              title: "Calendar Event Created"
            });
            dispatch(getCalendarEvent());
            navigate("/calendarEvent");
          }, 2000);
        } else if (res.data.status === 400) {
          messageToast({
            message: res.data.statusText,
            statusText: res.data.statusText,
            title: "Calendar Event"
          });
        } else {
          messageToast({
            message: "Something went wrong",
            statusText: res.data.statusText,
            title: "Calendar Event"
          });
        }
      });
      setModalVisible(false);
      setCurrentEvent(null);
    }
  };

  const confirmDelete = () => {
    Modal.confirm({
      title: "Event Delete Status",
      content: "Are you going to delete the event?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDeleteEvent();
      },
      onCancel() {
        message.info("Deletion cancelled");
      },
      className: "custom-class",
      style: {
        marginTop: "20vh",
        color: "#d91616",
        fontWeight: "bold"
      }
    });
  };

  const [dayType, setDayType] = useState("");
  const [eventNewName, setEventNewName] = useState("");
  let newName;
  const handleChangeName = (e) => {
    newName = e.target.value;
    setEventNewName(newName);
  };

  const [eventNewDateFrom, setEventNewDateFrom] = useState("");
  let newChangeDateFrom;
  const handleChangeNewDateFrom = (e) => {
    newChangeDateFrom = e.target.value;
    setEventNewDateFrom(newChangeDateFrom);
  };

  const [eventNewDateTo, setEventNewDateTo] = useState("");
  let newChangeDateTo;
  const handleChangeNewDateTo = (e) => {
    newChangeDateTo = e.target.value;
    setEventNewDateTo(newChangeDateTo);
  };

  const [eventNewReason, setEventNewReason] = useState("");

  const [eventNewType, setEventNewType] = useState("");

  const [eventNewStatus, setEventNewStatus] = useState("");

  const [newInitiatorName, setNewInitiatorName] = useState("");
  let newInName;
  const handleChangeInitiatorName = (e) => {
    newInName = e.target.value;
    setNewInitiatorName(newInName);
  };

  const [newInitiatorPhoneno, setNewInitiatorPhoneno] = useState("");
  let newInPhoneno;
  const handleChangeInitiatorPhoneno = (e) => {
    newInPhoneno = e.target.value;
    setNewInitiatorPhoneno(newInPhoneno);
  };

  const [newOrganizerName, setNewOrganizerName] = useState("");
  let newOrgName;
  const handleChangeOrganizerName = (e) => {
    newOrgName = e.target.value;
    setNewOrganizerName(newOrgName);
  };

  const [newOrganizerCompanyName, setNewOrganizerCompanyName] = useState("");
  let newOrgCompanyName;
  const handleChangeOrganizerCompanyName = (e) => {
    newOrgCompanyName = e.target.value;
    setNewOrganizerCompanyName(newOrgCompanyName);
  };

  const [newOrganizerPhoneno, setNewOrganizerPhoneno] = useState("");
  let newOrgPhoneno;
  const handleChangeOrganizerPhoneno = (e) => {
    newOrgPhoneno = e.target.value;
    setNewOrganizerPhoneno(newOrgPhoneno);
  };

  const [newTargetAudi, setNewTargetAudi] = useState("");
  let newTarAudi;
  const handleChangeTargetAudience = (e) => {
    newTarAudi = e.target.value;
    setNewTargetAudi(newTarAudi);
  };

  const [newNoofAudience, setNewNoofAudience] = useState("");
  let newNoofAudi;
  const handleChangeNoofAudience = (e) => {
    newNoofAudi = e.target.value;
    setNewNoofAudience(newNoofAudi);
  };

  const [expConverRatio, setExpConverRatio] = useState("");
  let newExpRatio;
  const handleChangeExpRatio = (e) => {
    newExpRatio = e.target.value;
    setExpConverRatio(newExpRatio);
  };

  const [executionNewPlan, setExecutionNewPlan] = useState("");

  const [newOfferDetails, setNewOfferDetails] = useState("");
  let newOffDetails;
  const handleChangeOffDetails = (e) => {
    newOffDetails = e.target.value;
    setNewOfferDetails(newOffDetails);
  };

  const [newBudgetROI, setNewBudgetROI] = useState("");
  let newBudROI;
  const handleChangeBudROI = (e) => {
    newBudROI = e.target.value;
    setNewBudgetROI(newBudROI);
  };

  const [newBudgetSales, setNewBudgetSales] = useState("");
  let newBudSales;
  const handleChangeBudSales = (e) => {
    newBudSales = e.target.value;
    setNewBudgetSales(newBudSales);
  };

  const [newExpectedSales, setNewExpectedSales] = useState("");
  let newExpSales;
  const handleChangeExpSales = (e) => {
    newExpSales = e.target.value;
    setNewExpectedSales(newExpSales);
  };

  const [newBudgetAOV, setNewBudgetAOV] = useState("");
  let newBudAOV;
  const handleChangeBudAOV = (e) => {
    newBudAOV = e.target.value;
    setNewBudgetAOV(newBudAOV);
  };

  const [newExpectedAOV, setNewExpectedAOV] = useState("");
  let newExpAOV;
  const handleChangeExpAOV = (e) => {
    newExpAOV = e.target.value;
    setNewExpectedAOV(newExpAOV);
  };

  const [newEventNature, setNewEventNature] = useState("");

  const [newRecuPlan, setNewRecuPlan] = useState("");
  
  const [marketingData, setMarketingData] = useState({});
  const [digitalMarketingData, setDigitalMarketingData] = useState({});
  const [monitoringData, setMonitoringData] = useState({});
  const [productDiscountData, setProductDiscountData] = useState({});

  const handleChangeMarketingValue = (id, value, type) => {
    setMarketingData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [type]: value,
      },
    }));
  };

  const handleChangeDigitalMarketingValue = (id, value, type) => {
    setDigitalMarketingData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [type]: value,
      },
    }));
  };

  const handleChangeMonitoringValue = (id, value, type) => {
    setMonitoringData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [type]: value,
      },
    }));
  };

  const handleChangeProductDiscountValue = (id, value, type) => {
    setProductDiscountData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [type]: value,
      },
    }));
  };


  
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [budgets, setBudgets] = useState({});
  const [actuals, setActuals] = useState({});

  const handleSelectionChange = (selectedValues) => {
    setSelectedOptions(selectedValues);
    selectedValues.forEach((value) => {
      if (!budgets[value]) setBudgets((prev) => ({ ...prev, [value]: "" }));
      if (!actuals[value]) setActuals((prev) => ({ ...prev, [value]: "" }));
    });
  };

  const handleBudgetChange = (id, value) => {
    setBudgets((prev) => ({ ...prev, [id]: value }));
  };

  const handleActualChange = (id, value) => {
    setActuals((prev) => ({ ...prev, [id]: value }));
  };

  const [selectedOptionsDigitalMarketing, setSelectedOptionsDigitalMarketing] =
    useState([]);
  const [budgetsDigitalMarketing, setBudgetsDigitalMarketing] = useState({});
  const [actualsDigitalMarketing, setActualsDigitalMarketing] = useState({});

  const handleSelectionDigitalMarketingChange = (selectedValues) => {
    setSelectedOptionsDigitalMarketing(selectedValues);
    selectedValues.forEach((value) => {
      if (!budgetsDigitalMarketing[value])
        setBudgetsDigitalMarketing((prev) => ({ ...prev, [value]: "" }));
      if (!actualsDigitalMarketing[value])
        setActualsDigitalMarketing((prev) => ({ ...prev, [value]: "" }));
    });
  };

  const [selectedOptionsMonitoring, setSelectedOptionsMonitoring] = useState(
    []
  );
  const [budgetsMonitoring, setBudgetsMonitoring] = useState({});
  const [actualsMonitoring, setActualsMonitoring] = useState({});

   const handleSelectionMonitoringChange = (selectedValuesMonitoring) => {
     setSelectedOptionsMonitoring(selectedValuesMonitoring);
     selectedValuesMonitoring.forEach(value => {
       if (!budgetsMonitoring[value]) setBudgetsMonitoring(prev => ({ ...prev, [value]: "" }));
       if (!actualsMonitoring[value]) setActualsMonitoring(prev => ({ ...prev, [value]: "" }));
     });
   };
 

  const [selectedOptionsProductDiscount, setSelectedOptionsProductDiscount] = useState([]);
  const [budgetsProductDiscount, setBudgetsProductDiscount] = useState({});
  const [actualsProductDiscount, setActualsProductDiscount] = useState({});

  const handleSelectionProductDiscountChange = (selectedValues) => {
    setSelectedOptionsProductDiscount(selectedValues);
    selectedValues.forEach((value) => {
      if (!budgetsProductDiscount[value])
        setBudgetsProductDiscount((prev) => ({ ...prev, [value]: "" }));
      if (!actualsProductDiscount[value])
        setActualsProductDiscount((prev) => ({ ...prev, [value]: "" }));
    });
  };

  const [budgetExpensesFoodTruck, setBudgetExpensesFoodTruck] = useState("");
  const [rentFoodTruck, setRentFoodTruck] = useState("");
  const [manPowerFoodTruck, setManPowerFoodTruck] = useState("");
  const [costFoodTruck, setCostFoodTruck] = useState("");
  const [driverFoodTruck, setDriverFoodTruck] = useState("");
  const [petrolFoodTruck, setPetrolFoodTruck] = useState("");
  const [memFoodTruck, setMemFoodTruck] = useState("");
  const [transportCostFGEquipFoodTruck, setTransportCostFGEquiFoodTruck] =
    useState("");
  const [mpTravelExpensesFoodTruck, setMpTravelExpensesFoodTruck] =
    useState("");
  const [budgetExpensesODC, setBudgetExpensesODC] = useState("");
  const [transportCostODC, setTransportCostODC] = useState("");
  const [rentODC, setRentODC] = useState("");
  const [memODC, setMemODC] = useState("");
  const [ebPetrolODC, setEbPetrolODC] = useState("");
  const [foodExpensesODC, setFoodExpensesODC] = useState("");
  const [budgetExpensesInStore, setBudgetExpensesInStore] = useState("");
  const [whatsappCampaignInStore, setWhatsappCampaignInStore] = useState("");

  const outletIds =
    currentEvent && Array.isArray(currentEvent.outlet_id)
      ? currentEvent.outlet_id
      : JSON.parse(currentEvent?.outlet_id || "[]");
  
      const onClickUpdateCsv = () => {
        navigate("/calendarEvent/csvUpdate", {
          state: {}
        });
      };
    
      const handleDownload = () => {
        window.open(
          process.env.REACT_APP_API_BASE_URL + "download-calendar-event",
          "_blank"
        );
      };
    

  return (
    <div>
      <ConfirmOnExit showModel={showDialog} />
      <Card>
        <Col md={{ span: 6 }} xs={{ span: 24 }}>
          <Button
            style={{
              backgroundColor: "#f5a60b",
              color: "white",
              borderRadius: "10px",
              border: "none",
              padding: "13px 23px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer"
            }}
            onClick={handleSelectDate}
          >
            Add Event
          </Button>
        </Col>
        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
        >
          <Tooltip title="Upload Event">
            <Button
              style={{
                backgroundColor: "#f5a60b",
                color: "white",
                borderRadius: "10px",
                border: "none",
                padding: "13px 23px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
                boxShadow:
                  "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
                transition: "transform 0.2s"
              }}
              onClick={onClickUpdateCsv}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = "translateY(2px)";
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <FaUpload />
            </Button>
          </Tooltip>
          <Tooltip title="Download Template">
            <Button
              style={{
                backgroundColor: "#f5a60b",
                color: "white",
                borderRadius: "10px",
                border: "none",
                padding: "13px 23px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
                boxShadow:
                  "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
                transition: "transform 0.2s"
              }}
              onClick={handleDownload}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = "translateY(2px)";
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <FaDownload />
            </Button>
          </Tooltip>
        </div>
      </Card>

      <Calendar cellRender={dateCellRender} />
      <Modal
        title={currentEvent ? "Edit Event" : "Add Event"}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        wrapperCol={{ span: 84 }}
        width={1200}
      >
        
        <Form
          name="basic"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 84 }}
          initialValues={{
            event_name: currentEvent ? currentEvent.event_name : "",
            description: currentEvent ? currentEvent.description : "",
            event_date_from:
              defaultValue && dayjs(defaultValue?.event_date_from)
          }}
          onFinish={handleModalOk}
          autoComplete="off"
          form={form}
        >
          <Row gutter={[15, 0]}>
          <Col md={{ span: 6 }} xs={{ span: 24 }}>
              {currentEvent ? (
                <Form.Item name="event_type" label="Event Type">
                  <span hidden>{currentEvent.event_type}</span>
                  <Select
                    placeholder="Select"
                    style={{
                      width: "250px",
                      height: "34px",
                      border: "2px solid #f5a60b",
                      borderRadius: "10px"
                    }}
                    name="definition_list"
                    loading={gettingDefinitionsList}
                    onChange={(e) => setEventNewType(e)}
                    defaultValue={currentEvent.event_type_name}
                    showSearch
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {map(
                      (state) => {
                        return (
                          <Option key={state.id} value={state.id}>
                            {state.def_list_name}
                          </Option>
                        );
                      },
                      def ? def?.filter((e) => e.def_title == "Event Type") : []
                    )}
                  </Select>
                </Form.Item>
              ) : (
                <>
                  <Form.Item name="event_type" label="Event Type">
                    <Select
                      placeholder="Select"
                      style={{
                        width: "250px",
                        height: "34px",
                        border: "2px solid #f5a60b",
                        borderRadius: "10px"
                      }}
                      name="definition_list"
                      loading={gettingDefinitionsList}
                      onChange={(e) => setEventType(e)}                    
                      showSearch
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {map(
                        (state) => {
                          return (
                            <Option key={state.id} value={state.id}>
                              {state.def_list_name}
                            </Option>
                          );
                        },
                        def
                          ? def?.filter((e) => e.def_title == "Event Type")
                          : []
                      )}
                    </Select>
                  </Form.Item>
                </>
              )}
            </Col>
            {eventType == "102" ? (
              <>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>                
                    <Form.Item
                      name="budget_expenses_food_truck"
                      label="Budget Expenses"
                    >
                      <Input
                        style={{
                          width: "250px",
                          height: "34px",
                          border: "2px solid #f5a60b",
                          borderRadius: "10px"
                        }}
                      />
                    </Form.Item>                
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>                
                    <Form.Item name="rent_food_truck" label="Rent">
                      <Input
                        style={{
                          width: "250px",
                          height: "34px",
                          border: "2px solid #f5a60b",
                          borderRadius: "10px"
                        }}
                      />
                    </Form.Item>                
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>                 
                    <Form.Item name="man_power_food_truck" label="Man Power">
                      <Input
                        style={{
                          width: "250px",
                          height: "34px",
                          border: "2px solid #f5a60b",
                          borderRadius: "10px"
                        }}
                      />
                    </Form.Item>               
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>                
                    <Form.Item name="cost_food_truck" label="Food Cost">
                      <Input
                        style={{
                          width: "250px",
                          height: "34px",
                          border: "2px solid #f5a60b",
                          borderRadius: "10px"
                        }}
                      />
                    </Form.Item>                 
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>                
                    <Form.Item name="driver_food_truck" label="Driver">
                      <Input
                        style={{
                          width: "250px",
                          height: "34px",
                          border: "2px solid #f5a60b",
                          borderRadius: "10px"
                        }}
                      />
                    </Form.Item>                
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>                 
                    <Form.Item name="petrol_food_truck" label="Petrol">
                      <Input
                        style={{
                          width: "250px",
                          height: "34px",
                          border: "2px solid #f5a60b",
                          borderRadius: "10px"
                        }}
                      />
                    </Form.Item>                
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>                
                    <Form.Item name="mem_food_truck" label="MEM">
                      <Input
                        style={{
                          width: "250px",
                          height: "34px",
                          border: "2px solid #f5a60b",
                          borderRadius: "10px"
                        }}
                      />
                    </Form.Item>             
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>                 
                    <Form.Item
                      name="transport_cost_FG_equipements_food_truck"
                      label="Transport Cost - FG & Equipments"
                    >
                      <Input
                        style={{
                          width: "250px",
                          height: "34px",
                          border: "2px solid #f5a60b",
                          borderRadius: "10px"
                        }}
                      />
                    </Form.Item>                
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>              
                    <Form.Item
                      name="mp_travel_expenses_food_truck"
                      label="MP Travel Expenses"
                    >
      
                      <Input
                        onChange={(e) => setMpTravelExpensesFoodTruck(e)}
                        style={{
                          width: "250px",
                          height: "34px",
                          border: "2px solid #f5a60b",
                          borderRadius: "10px"
                        }}
                      />
                   </Form.Item>                       
                </Col>
              </>
            ) : null}
            {currentEvent && currentEvent.event_type=="102" ? (
            <>
             <Col md={{ span: 6 }} xs={{ span: 24 }}>           
                    <Form.Item
                      name="budget_expenses_food_truck"
                      label="Budget Expenses"
                    >
                      <span hidden>
                        {currentEvent.budget_expenses_food_truck}
                      </span>
                      <Input
                        onChange={(e) => setBudgetExpensesFoodTruck(e)}
                        defaultValue= {currentEvent.budget_expenses_food_truck}
                        style={{
                          width: "250px",
                          height: "34px",
                          border: "2px solid #f5a60b",
                          borderRadius: "10px"
                        }}
                      />
                    </Form.Item>                
                  </Col>
                  <Col md={{ span: 6 }} xs={{ span: 24 }}>                 
                    <Form.Item name="rent_food_truck" label="Rent">
                      <span hidden>{currentEvent.rent_food_truck}</span>
                      <Input
                        onChange={(e) => setRentFoodTruck(e)}
                        defaultValue= {currentEvent.rent_food_truck}
                        style={{
                          width: "250px",
                          height: "34px",
                          border: "2px solid #f5a60b",
                          borderRadius: "10px"
                        }}
                      />
                    </Form.Item>               
                  </Col>
                  <Col md={{ span: 6 }} xs={{ span: 24 }}>                 
                    <Form.Item name="man_power_food_truck" label="Man Power">
                      <span hidden>{currentEvent.man_power_food_truck}</span>
                      <Input
                      defaultValue={currentEvent.man_power_food_truck}
                        onChange={(e) => setManPowerFoodTruck(e)}
                        style={{
                          width: "250px",
                          height: "34px",
                          border: "2px solid #f5a60b",
                          borderRadius: "10px"
                        }}
                      />
                    </Form.Item>                 
                  </Col>
                  <Col md={{ span: 6 }} xs={{ span: 24 }}>               
                    <Form.Item name="cost_food_truck" label="Food Cost">
                      <span hidden>{currentEvent.cost_food_truck}</span>
                      <Input
                        onChange={(e) => setCostFoodTruck(e)}
                        defaultValue={currentEvent.cost_food_truck}
                        style={{
                          width: "250px",
                          height: "34px",
                          border: "2px solid #f5a60b",
                          borderRadius: "10px"
                        }}
                      />
                    </Form.Item>                
                  </Col>
                  <Col md={{ span: 6 }} xs={{ span: 24 }}>               
                    <Form.Item name="driver_food_truck" label="Driver">
                      <span hidden>{currentEvent.driver_food_truck}</span>
                      <Input
                        onChange={(e) => setDriverFoodTruck(e)}
                        defaultValue={currentEvent.driver_food_truck}
                        style={{
                          width: "250px",
                          height: "34px",
                          border: "2px solid #f5a60b",
                          borderRadius: "10px"
                        }}
                      />
                    </Form.Item>                
                  </Col>
                  <Col md={{ span: 6 }} xs={{ span: 24 }}>              
                    <Form.Item name="petrol_food_truck" label="Petrol">
                      <span hidden>{currentEvent.petrol_food_truck}</span>
                      <Input
                        onChange={(e) => setPetrolFoodTruck(e)}
                        defaultValue={currentEvent.petrol_food_truck}
                        style={{
                          width: "250px",
                          height: "34px",
                          border: "2px solid #f5a60b",
                          borderRadius: "10px"
                        }}
                      />
                    </Form.Item>             
                  </Col>               
                  <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item name="mem_food_truck" label="Mem Food Truck">
                      <span hidden>{currentEvent.mem_food_truck}</span>
                      <Input
                        onChange={(e) => setMemFoodTruck(e)}
                        defaultValue={currentEvent.mem_food_truck}
                        style={{
                          width: "250px",
                          height: "34px",
                          border: "2px solid #f5a60b",
                          borderRadius: "10px"
                        }}
                      />
                    </Form.Item>                
                  </Col>
                  <Col md={{ span: 6 }} xs={{ span: 24 }}>                
                    <Form.Item name="transport_cost_FG_equipements_food_truck"
                    label="Transport Cost - FG & Equipments">
                      <span hidden>{currentEvent.transport_cost_FG_equipements_food_truck}</span>
                      <Input
                        onChange={(e) => setTransportCostFGEquiFoodTruck(e)}
                        defaultValue={currentEvent.transport_cost_FG_equipements_food_truck}
                        style={{
                          width: "250px",
                          height: "34px",
                          border: "2px solid #f5a60b",
                          borderRadius: "10px"
                        }}
                      />
                    </Form.Item>               
                  </Col>
                  <Col md={{ span: 6 }} xs={{ span: 24 }}>                
                    <Form.Item name="mp_travel_expenses_food_truck"
                    label="Transport Cost - FG & Equipments">
                      <span hidden>{currentEvent.mp_travel_expenses_food_truck}</span>
                      <Input
                        onChange={(e) => setMpTravelExpensesFoodTruck(e)}
                        defaultValue={currentEvent.mp_travel_expenses_food_truck}
                        style={{
                          width: "250px",
                          height: "34px",
                          border: "2px solid #f5a60b",
                          borderRadius: "10px"
                        }}
                      />
                    </Form.Item>                 
                  </Col>
                  </>) : ("")}
                 
                
            {eventType == "103" ? (
              <>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>                 
                    <Form.Item
                      name="budget_expenses_ODC"
                      label="Budget Expenses ODC"
                    >
                      <Input
                        style={{
                          width: "250px",
                          height: "34px",
                          border: "2px solid #f5a60b",
                          borderRadius: "10px"
                        }}
                      />
                    </Form.Item>              
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>                
                    <Form.Item name="transport_cost_ODC" label="Travel Cost">
                      <Input
                        style={{
                          width: "250px",
                          height: "34px",
                          border: "2px solid #f5a60b",
                          borderRadius: "10px"
                        }}
                      />
                    </Form.Item>                 
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>                
                    <Form.Item name="rent_ODC" label="Rent">
                      <Input
                        style={{
                          width: "250px",
                          height: "34px",
                          border: "2px solid #f5a60b",
                          borderRadius: "10px"
                        }}
                      />
                    </Form.Item>               
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>                                                
                    <Form.Item name="mem_ODC" label="MEM">
                      <Input
                        style={{
                          width: "250px",
                          height: "34px",
                          border: "2px solid #f5a60b",
                          borderRadius: "10px"
                        }}
                      />
                    </Form.Item>               
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>                                   
                    <Form.Item name="eb_petrol_ODC" label="EB / Petrol">
                      <Input
                        style={{
                          width: "250px",
                          height: "34px",
                          border: "2px solid #f5a60b",
                          borderRadius: "10px"
                        }}
                      />
                    </Form.Item>                
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>                                  
                    <Form.Item name="food_expenses_ODC" label="Food Expenses">
                      <Input
                        style={{
                          width: "250px",
                          height: "34px",
                          border: "2px solid #f5a60b",
                          borderRadius: "10px"
                        }}
                      />
                    </Form.Item>              
                </Col>
              </>
            ) : ('')}           
             {currentEvent && currentEvent.event_type =='103' ? (
              <>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                    <Form.Item
                      name="budget_expenses_ODC"
                      label="Budget Expenses ODC"
                    >
                      <span hidden> {currentEvent.budget_expenses_ODC} </span>
                      <Input
                        onChange={(e) => setBudgetExpensesODC(e)}
                        defaultValue={currentEvent.budget_expenses_ODC}
                        style={{
                          width: "250px",
                          height: "34px",
                          border: "2px solid #f5a60b",
                          borderRadius: "10px"
                        }}
                      />
                    </Form.Item>
                    </Col>
                     <Col md={{ span: 6 }} xs={{ span: 24 }}>             
                     <Form.Item name="transport_cost_ODC" label="Travel Cost">
                       <span hidden>{currentEvent.transport_cost_ODC}</span>
                       <Input
                         onChange={(e) => setTransportCostODC(e)}
                         defaultValue={currentEvent.transport_cost_ODC}
                         style={{
                           width: "250px",
                           height: "34px",
                           border: "2px solid #f5a60b",
                           borderRadius: "10px"
                         }}
                       />
                     </Form.Item>           
               </Col>
               <Col md={{ span: 6 }} xs={{ span: 24 }}>
                <Form.Item name="rent_ODC" label="Rent">
                    <span hidden>{currentEvent.rent_ODC}</span>
                    <Input
                      onChange={(e) => setRentODC(e)}
                      defaultValue={currentEvent.rent_ODC}
                      style={{
                        width: "250px",
                        height: "34px",
                        border: "2px solid #f5a60b",
                        borderRadius: "10px"
                      }}
                    />
                  </Form.Item>          
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>                
                <Form.Item name="mem_ODC" label="MEM">
                  <span hidden>{currentEvent.mem_ODC}</span>
                  <Input
                    onChange={(e) => setMemODC(e)}
                    defaultValue={currentEvent.mem_ODC}
                    style={{
                      width: "250px",
                      height: "34px",
                      border: "2px solid #f5a60b",
                      borderRadius: "10px"
                    }}
                  />
                </Form.Item>
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>                
                    <Form.Item name="eb_petrol_ODC" label="EB / Petrol">
                      <span hidden>{currentEvent.eb_petrol_ODC}</span>
                      <Input
                        onChange={(e) => setEbPetrolODC(e)}
                        defaultValue={currentEvent.eb_petrol_ODC}
                        style={{
                          width: "250px",
                          height: "34px",
                          border: "2px solid #f5a60b",
                          borderRadius: "10px"
                        }}
                      />
                    </Form.Item>              
                 </Col>
                 <Col md={{ span: 6 }} xs={{ span: 24 }}>                
                 <Form.Item name="food_expenses_ODC" label="Food Expenses">
                      <span hidden>{currentEvent.food_expenses_ODC}</span>
                      <Input
                        onChange={(e) => setFoodExpensesODC(e)}
                        defaultValue={currentEvent.food_expenses_ODC}
                        style={{
                          width: "250px",
                          height: "34px",
                          border: "2px solid #f5a60b",
                          borderRadius: "10px"
                        }}
                      />
                    </Form.Item>                    
                 </Col>
               </>
              ) : ('')}                             
            {eventType == "104" ? (
              <>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>                                 
                    <Form.Item
                      name="budget_expenses_InStore"
                      label="Budget Expenses InStore Activity"
                    >
                      <Input
                        style={{
                          width: "250px",
                          height: "34px",
                          border: "2px solid #f5a60b",
                          borderRadius: "10px"
                        }}
                      />
                    </Form.Item>                
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>                                 
                 <Form.Item
                      name="whatsapp_campaign_InStore"
                      label="Whatsapp Campaign"
                    >
                      <Input
                        style={{
                          width: "250px",
                          height: "34px",
                          border: "2px solid #f5a60b",
                          borderRadius: "10px"
                        }}
                      />
                    </Form.Item>           
                </Col>
              </>
            ) : ''}
            {currentEvent  && currentEvent.event_type =='104' ? (
              <>
              <Col md={{ span: 6 }} xs={{ span: 24 }}>              
                    <Form.Item
                      name="budget_expenses_InStore"
                      label="Budget Expenses InStore Activity"
                    >
                      <span hidden>{currentEvent.budget_expenses_InStore}</span>
                      <Input
                        onChange={(e) => setBudgetExpensesInStore(e)}
                        defaultValue={currentEvent.budget_expenses_InStore}
                        style={{
                          width: "250px",
                          height: "34px",
                          border: "2px solid #f5a60b",
                          borderRadius: "10px"
                        }}
                      />
                    </Form.Item>    
                    </Col>     
                    <Col md={{ span: 6 }} xs={{ span: 24 }}>                 
                    <Form.Item
                      name="whatsapp_campaign_InStore"
                      label="Whatsapp Campaign"
                    >
                      <span hidden>
                        {currentEvent.whatsapp_campaign_InStore}
                      </span>
                      <Input
                        onChange={(e) => setWhatsappCampaignInStore(e)}
                        defaultValue={currentEvent.whatsapp_campaign_InStore}
                        style={{
                          width: "250px",
                          height: "34px",
                          border: "2px solid #f5a60b",
                          borderRadius: "10px"
                        }}
                      />
                    </Form.Item>
                </Col>
              </>
            ) : ('')}


             <Col md={{ span: 6 }} xs={{ span: 24 }}>
              {currentEvent ? (
                <Form.Item name="day_type" label="Day Type">
                  <div>
                  <span hidden>{currentEvent.day_type}</span>
                  <Select
                    style={{
                      width: "250px",
                      height: "34px",
                      border: "2px solid #f5a60b",
                      borderRadius: "10px"
                    }}
                    onChange={(e) => setDayType(e)}
                    defaultValue={currentEvent.day_type}
                  >
                    <Option value="Week Day">Week Day</Option>
                    <Option value="Week End">Week End</Option>
                  </Select>
                  </div>
                </Form.Item>
              ) : (
                <Form.Item name="day_type" label="Day Type">
                  <div>
                  <Select
                    style={{
                      width: "250px",
                      height: "34px",
                      border: "2px solid #f5a60b",
                      borderRadius: "10px"
                    }}
                    onChange={(e) => setDayType(e)}
                  >
                    <Option value="Week Day">Week Day</Option>
                    <Option value="Week End">Week End</Option>
                  </Select>
                  </div>
                </Form.Item>
              )}
            </Col>
            <Col md={{ span: 6 }} xs={{ span: 24 }}>
              {currentEvent ? (
                <Form.Item name="event_name" label="Event Name">
                  <Input
                    defaultValue={currentEvent.event_name}
                    onChange={handleChangeName}
                    style={{
                      width: "250px",
                      height: "34px",
                      border: "2px solid #f5a60b",
                      borderRadius: "10px"
                    }}
                  />
                  <span hidden>{currentEvent.event_name}</span>
                </Form.Item>
              ) : (
                <Form.Item
                  name="event_name"
                  label="Event Name"
                  rules={[
                    { required: true, message: "Please enter an Event Name" }
                  ]}
                >
                  <Input
                    value={""}
                    name="event_name"
                    style={{
                      width: "250px",
                      height: "34px",
                      border: "2px solid #f5a60b",
                      borderRadius: "10px"
                    }}
                  />
                </Form.Item>
              )}{" "}
            </Col>
            <Col md={{ span: 6 }} xs={{ span: 24 }}>
              <Form.Item name="event_date_from" label="Date From">
                {currentEvent ? (
                  <>
                    <Input
                      type="date"
                      selected={dateFrom}
                      name="date_from"
                      style={{
                        width: "250px",
                        height: "34px",
                        border: "2px solid #f5a60b",
                        borderRadius: "10px"
                      }}
                      onChange={handleChangeNewDateFrom}
                      defaultValue={currentEvent?.event_date_from}
                    />
                    <span hidden>{currentEvent.event_date_from}</span>
                  </>
                ) : (
                  <Input
                    type="date"
                    selected={dateFrom}
                    name="event_date_from"
                    style={{
                      width: "250px",
                      height: "34px",
                      border: "2px solid #f5a60b",
                      borderRadius: "10px"
                    }}
                    onChange={onchangedateFrom}
                  />
                )}
              </Form.Item>
            </Col>
            <Col md={{ span: 6 }} xs={{ span: 24 }}>
              <Form.Item name="event_date_to" label="Date To">
                {currentEvent ? (
                  <>
                    <Input
                      type="date"
                      selected={dateTo}
                      name="event_date_to"
                      style={{
                        width: "250px",
                        height: "34px",
                        border: "2px solid #f5a60b",
                        borderRadius: "10px"
                      }}
                      onChange={handleChangeNewDateTo}
                      defaultValue={currentEvent?.event_date_to}
                    />
                    <span hidden>{currentEvent.event_date_to}</span>
                  </>
                ) : (
                  <Input
                    type="date"
                    selected={dateTo}
                    name="event_date_to"
                    style={{
                      width: "250px",
                      height: "34px",
                      border: "2px solid #f5a60b",
                      borderRadius: "10px"
                    }}
                    onChange={onchangedateTo}
                  />
                )}
              </Form.Item>
            </Col>          
          
            <Col md={{ span: 6 }} xs={{ span: 24 }}>
              {currentEvent ? (
                <Form.Item name="reason_for_event" label="Reason For Event">
                  <span hidden>{currentEvent.reason_for_event_name}</span>
                  <Select
                    placeholder="Select"
                    style={{
                      width: "250px",
                      height: "34px",
                      border: "2px solid #f5a60b",
                      borderRadius: "10px"
                    }}
                    name="definition_list"
                    loading={gettingDefinitionsList}
                    onChange={(e) => setEventNewReason(e)}
                    defaultValue={currentEvent.reason_for_event_name}
                    showSearch
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {map(
                      (state) => {
                        return (
                          <Option key={state.id} value={state.id}>
                            {state.def_list_name}
                          </Option>
                        );
                      },
                      def
                        ? def?.filter((e) => e.def_title == "Reason For Event")
                        : []
                    )}
                  </Select>
                </Form.Item>
              ) : (
                <Form.Item name="reason_for_event" label="Reason For Event">
                  <Select
                    placeholder="Select"
                    style={{
                      width: "250px",
                      height: "34px",
                      border: "2px solid #f5a60b",
                      borderRadius: "10px"
                    }}
                    name="definition_list"
                    loading={gettingDefinitionsList}
                    onChange={(e) => setReasonForEvent(e)}                   
                    showSearch
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {map(
                      (state) => {
                        return (
                          <Option key={state.id} value={state.id}>
                            {state.def_list_name}
                          </Option>
                        );
                      },
                      def
                        ? def?.filter((e) => e.def_title == "Reason For Event")
                        : []
                    )}
                  </Select>
                </Form.Item>
              )}
            </Col>
            <Col md={{ span: 6 }} xs={{ span: 24 }}>
              <Form.Item
                label="Outlet Code"
                labelCol={{
                  md: { span: 24 },
                  xs: { span: 24 },
                  style: { textAlign: "left" }
                }}
              >
                {currentEvent ? (
                  <>
                    <span>{currentEvent.outlet_name}</span>
                    <Select
                      placeholder="Select"
                      style={{
                        width: "250px",
                        height: "34px",
                        border: "2px solid #f5a60b",
                        borderRadius: "10px"
                      }}
                      loading={gettingAllMappedOutlet}
                      // value={currentEvent.outlet_id}
                      defaultValue={outletIds} // Use the array of outlet IDs
                      maxTagCount={0}
                      label="Outlet Code"
                      disabled={false}
                      showSearch
                      mode="multiple"
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      value={selectedOutlets}
                      onChange={(newSelectedValues) => {
                        if (newSelectedValues.includes("select_all")) {
                          SelectAllOutlets();
                        } else if (newSelectedValues.includes("unselect_all")) {
                          setselectedOutlets([]);
                        } else {
                          setselectedOutlets(newSelectedValues);
                        }
                      }}
                    >
                      {dropdownoutlet.map((item) => (
                        <Option key={item.key} value={item.value}>
                          {item.label}
                        </Option>
                      ))}
                    </Select>
                  </>
                ) : (
                  <Select
                    placeholder="Select"
                    style={{
                      width: "250px",
                      height: "34px",
                      border: "2px solid #f5a60b",
                      borderRadius: "10px"
                    }}
                    loading={gettingAllMappedOutlet}
                    maxTagCount={0}
                    label="Outlet Code"
                    disabled={false}
                    showSearch
                    mode="multiple"
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    value={selectedOutlets}
                    onChange={(newSelectedValues) => {
                      if (newSelectedValues.includes("select_all")) {
                        SelectAllOutlets();
                      } else if (newSelectedValues.includes("unselect_all")) {
                        setselectedOutlets([]);
                      } else {
                        setselectedOutlets(newSelectedValues);
                      }
                    }}
                  >
                    {dropdownoutlet.map((item) => (
                      <Option key={item.key} value={item.value}>
                        {item.label}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
            {currentEvent ? (
              <>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item
                    name="physical_marketing_status"
                    label="Physical Marketing Status"
                  >
                    <div>
                    <Radio.Group
                      buttonStyle="solid"
                      defaultValue={currentEvent.physical_marketing_status}
                      size="middle"
                      name="physical_marketing_status"
                      onChange={handleOnChangeNew}
                    >
                      <Radio.Button className="active" value={1}>
                        Yes
                      </Radio.Button>
                      <Radio.Button className="in-active" value={0}>
                        No
                      </Radio.Button>
                    </Radio.Group>
                    </div>
                  </Form.Item>
                </Col>
                {currentEvent.physical_marketing_status == 1 ? (
                  <>
                    <Col md={{ span: 6 }} xs={{ span: 24 }}>
                      <Form.Item
                        name="physical_marketing_id"
                        label="Physical Marketing"
                      >                      
                        <Select
                          placeholder="Select"
                          style={{
                            width: "250px",
                            height: "34px",
                            border: "2px solid #f5a60b",
                            borderRadius: "10px"
                          }}
                          maxTagCount={0}
                          name="physical_marketing_id"
                          loading={gettingDefinitionsList}                       
                          // onChange={(e) => setPhysicalMarketingNewValue(e)}
                          defaultValue={currentEvent.physical_marketing_id.map(
                            (item) => item.id
                          )}
                          showSearch
                          filterOption={(input, option) =>
                            option.items
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                        >
                          {map(
                            (state) => (
                              <Option key={state.id} value={state.id}>
                                {state.def_list_name}
                              </Option>
                            ),
                            def
                              ? def.filter(
                                  (e) => e.def_title === "Physical Marketing"
                                )
                              : []
                          )}
                        </Select>
                      </Form.Item>
                    </Col>
                    {currentEvent.physical_marketing_id.map((item) => (
                      <>
                        <Col key={item.id} md={{ span: 6 }} xs={{ span: 24 }}>
                          <Form.Item
                            name={`physical_marketing_budget_${item.id}`}
                            label={`${item.physical_name} Budget`}
                          >
                            <span hidden>{item.budget}</span>
                            <Input
                              defaultValue={item.budget}
                              onChange={(e) =>
                                handleChangeMarketingValue(item.id, e.target.value, "physical_marketing_budget")
                              }
                              style={{
                                width: "250px",
                                height: "34px",
                                border: "2px solid #f5a60b",
                                borderRadius: "10px"
                              }}
                            />
                          </Form.Item>
                        </Col>
                        <Col md={{ span: 6 }} xs={{ span: 24 }}>
                          <Form.Item
                            name={`physical_marketing_actual_${item.id}`}
                            label={`${item.physical_name} Actual`}
                          >
                              <span hidden>{item.actual}</span>
                            <Input
                              defaultValue={item.actual}                            
                              onChange={(e) =>
                                handleChangeMarketingValue(item.id, e.target.value, "physical_marketing_actual")
                              }
                              style={{
                                width: "250px",
                                height: "34px",
                                border: "2px solid #f5a60b",
                                borderRadius: "10px"
                              }}
                            />
                          </Form.Item>
                        </Col>
                      </>
                    ))}
                  </>
                ) : null}                
              </>
            )  : (
              <>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item
                    name="physical_marketing_status"
                    label="Physical Marketing Status"
                    rules={[
                      {
                        required: true,
                        message:
                          "Please enter your Physical Marketing Available"
                      }
                    ]}
                  >
                    <Radio.Group
                      buttonStyle="solid"
                      size="middle"
                      name="physical_marketing_status"
                      onChange={handleOnChange}
                    >
                      <Radio.Button className="active" value={1}>
                        Yes
                      </Radio.Button>
                      <Radio.Button className="in-active" value={0}>
                        No
                      </Radio.Button>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                {physicalMarketing ? (
                  <>
                  <Col md={{ span: 6 }} xs={{ span: 24 }}>
                    <Form.Item
                      name="physical_marketing_id"
                      label="Physical Marketing"
                    >
                      <Select
                        mode="multiple"
                        placeholder="Select"
                        style={{
                          width: "250px",
                          height: "34px",
                          border: "2px solid #f5a60b",
                          borderRadius: "10px"
                        }}
                        name="physical_marketing_id"
                        loading={gettingDefinitionsList}
                        onChange={handleSelectionChange}                     
                        showSearch
                        maxTagCount={0}
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {map(
                          (state) => {
                            return (
                              <Option key={state.id} value={state.id}>
                                {state.def_list_name}
                              </Option>
                            );
                          },
                          def
                            ? def?.filter(
                                (e) => e.def_title === "Physical Marketing"
                              )
                            : []
                        )}
                      </Select>
                    </Form.Item>
                  </Col>
                  {selectedOptions.map((id) => {
                  const defItem = def.find((state) => state.id === id);
                  const physicalMarketingName = defItem ? defItem.def_list_name : "";
                  return (
                    <>
                      <Col key={`budget-${id}`} md={{ span: 6 }} xs={{ span: 24 }}>
                        <Form.Item label={`${physicalMarketingName} Budget`}>
                          <Input
                            style={{
                              width: "250px",
                              height: "34px",
                              border: "2px solid #f5a60b",
                              borderRadius: "10px",
                            }}
                            value={budgets[id]}
                            onChange={(e) => handleBudgetChange(id, e.target.value)}
                          />
                        </Form.Item>
                      </Col>
                      <Col key={`actual-${id}`} md={{ span: 6 }} xs={{ span: 24 }}>
                        <Form.Item label={`${physicalMarketingName} Actual`}>
                          <Input
                            style={{
                              width: "250px",
                              height: "34px",
                              border: "2px solid #f5a60b",
                              borderRadius: "10px",
                            }}
                            value={actuals[id]}
                            onChange={(e) => handleActualChange(id, e.target.value)}
                          />
                        </Form.Item>
                      </Col>
                    </>
                  );
                })}
                </>) : null}               
              </>
            )}
          {currentEvent ? (
              <>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item
                    name="digital_marketing_status"
                    label="Digital Marketing Status"
                  >
                    <div>
                    <Radio.Group
                      buttonStyle="solid"
                      defaultValue={currentEvent.digital_marketing_status}
                      size="middle"
                      name="digital_marketing_status"
                      onChange={handleOnChangeNew}
                    >
                      <Radio.Button className="active" value={1}>
                        Yes
                      </Radio.Button>
                      <Radio.Button className="in-active" value={0}>
                        No
                      </Radio.Button>
                    </Radio.Group>
                    </div>
                  </Form.Item>
                </Col>
                {currentEvent.digital_marketing_status == 1 ? (
                  <>
                    <Col md={{ span: 6 }} xs={{ span: 24 }}>
                      <Form.Item
                        name="digital_marketing_id"
                        label="Digital Marketing"
                      >                      
                        <Select
                          placeholder="Select"
                          style={{
                            width: "250px",
                            height: "34px",
                            border: "2px solid #f5a60b",
                            borderRadius: "10px"
                          }}
                          maxTagCount={0}
                          name="digital_marketing_id"
                          loading={gettingDefinitionsList}                       
                          // onChange={(e) => setPhysicalMarketingNewValue(e)}
                          defaultValue={currentEvent.digital_marketing_id.map(
                            (item) => item.id
                          )}
                          showSearch
                          filterOption={(input, option) =>
                            option.items
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                        >
                          {map(
                            (state) => (
                              <Option key={state.id} value={state.id}>
                                {state.def_list_name}
                              </Option>
                            ),
                            def
                              ? def.filter(
                                  (e) => e.def_title === "Digital Marketing"
                                )
                              : []
                          )}
                        </Select>
                      </Form.Item>
                    </Col>
                    {currentEvent.digital_marketing_id.map((item) => (
                      <>
                        <Col key={item.id} md={{ span: 6 }} xs={{ span: 24 }}>
                          <Form.Item
                            name={`digital_marketing_budget_${item.id}`}
                            label={`${item.digital_name} Budget`}
                          >
                            <span hidden>{item.budget}</span>
                            <Input
                              defaultValue={item.budget}
                              onChange={(e) =>
                                handleChangeDigitalMarketingValue(item.id, e.target.value, "digital_marketing_budget")
                              }
                              style={{
                                width: "250px",
                                height: "34px",
                                border: "2px solid #f5a60b",
                                borderRadius: "10px"
                              }}
                            />
                          </Form.Item>
                        </Col>
                        <Col md={{ span: 6 }} xs={{ span: 24 }}>
                          <Form.Item
                            name={`digital_marketing_actual_${item.id}`}
                            label={`${item.digital_name} Actual`}
                          >
                              <span hidden>{item.actual}</span>
                            <Input
                              defaultValue={item.actual}                            
                              onChange={(e) =>
                                handleChangeDigitalMarketingValue(item.id, e.target.value, "digital_marketing_actual")
                              }
                              style={{
                                width: "250px",
                                height: "34px",
                                border: "2px solid #f5a60b",
                                borderRadius: "10px"
                              }}
                            />
                          </Form.Item>
                        </Col>
                      </>
                    ))}
                  </>
                ) : null}                
              </>
            )  : (
              <>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item
                    name="digital_marketing_status"
                    label="Digital Marketing Status"
                    rules={[
                      {
                        required: true,
                        message:
                          "Please enter your Digital Marketing Available"
                      }
                    ]}
                  >
                    <Radio.Group
                      buttonStyle="solid"
                      size="middle"
                      name="digital_marketing_status"
                      onChange={handleOnChange}
                    >
                      <Radio.Button className="active" value={1}>
                        Yes
                      </Radio.Button>
                      <Radio.Button className="in-active" value={0}>
                        No
                      </Radio.Button>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                {digitalMarketing ? (
                  <>
                  <Col md={{ span: 6 }} xs={{ span: 24 }}>
                    <Form.Item
                      name="digital_marketing_id"
                      label="Digital Marketing"
                    >
                      <Select
                        mode="multiple"
                        placeholder="Select"
                        style={{
                          width: "250px",
                          height: "34px",
                          border: "2px solid #f5a60b",
                          borderRadius: "10px"
                        }}
                        name="digital_marketing_id"
                        loading={gettingDefinitionsList}
                        onChange={handleSelectionDigitalMarketingChange}                     
                        showSearch
                        maxTagCount={0}
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {map(
                          (state) => {
                            return (
                              <Option key={state.id} value={state.id}>
                                {state.def_list_name}
                              </Option>
                            );
                          },
                          def
                            ? def?.filter(
                                (e) => e.def_title === "Digital Marketing"
                              )
                            : []
                        )}
                      </Select>
                    </Form.Item>
                  </Col>             
                   {selectedOptionsDigitalMarketing.map((id) => {
                  const defItem = def.find((state) => state.id === id);
                  const digitalMarketingName = defItem ? defItem.def_list_name : "";
                  return (
                    <>
                      <Col key={`budget-${id}`} md={{ span: 6 }} xs={{ span: 24 }}>
                        <Form.Item label={`${digitalMarketingName} Budget`}>
                          <Input
                            style={{
                              width: "250px",
                              height: "34px",
                              border: "2px solid #f5a60b",
                              borderRadius: "10px",
                            }}
                            value={budgets[id]}
                            onChange={(e) => handleBudgetChange(id, e.target.value)}
                          />
                        </Form.Item>
                      </Col>
                      <Col key={`actual-${id}`} md={{ span: 6 }} xs={{ span: 24 }}>
                        <Form.Item label={`${digitalMarketingName} Actual`}>
                          <Input
                            style={{
                              width: "250px",
                              height: "34px",
                              border: "2px solid #f5a60b",
                              borderRadius: "10px",
                            }}
                            value={actuals[id]}
                            onChange={(e) => handleActualChange(id, e.target.value)}
                          />
                        </Form.Item>
                      </Col>
                    </>
                  );
                })}
                </>) : null}               
              </>
            )}
            {currentEvent ? (
              <>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item
                    name="monitoring_status"
                    label="Monetary Status"
                  >
                    <div>
                    <Radio.Group
                      buttonStyle="solid"
                      defaultValue={currentEvent.monitoring_status}
                      size="middle"
                      name="monitoring_status"
                      onChange={handleOnChangeNew}
                    >
                      <Radio.Button className="active" value={1}>
                        Yes
                      </Radio.Button>
                      <Radio.Button className="in-active" value={0}>
                        No
                      </Radio.Button>
                    </Radio.Group>
                    </div>
                  </Form.Item>
                </Col>
                {currentEvent.monitoring_status == 1 ? (
                  <>
                    <Col md={{ span: 6 }} xs={{ span: 24 }}>
                      <Form.Item
                        name="monitoring_id"
                        label="Monetary"
                      >                      
                        <Select
                          placeholder="Select"
                          style={{
                            width: "250px",
                            height: "34px",
                            border: "2px solid #f5a60b",
                            borderRadius: "10px"
                          }}
                          maxTagCount={0}
                          name="monitoring_id"
                          loading={gettingDefinitionsList}                                               
                          defaultValue={currentEvent.monitoring_id.map(
                            (item) => item.id
                          )}
                          showSearch
                          filterOption={(input, option) =>
                            option.items
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                        >
                          {map(
                            (state) => (
                              <Option key={state.id} value={state.id}>
                                {state.def_list_name}
                              </Option>
                            ),
                            def
                              ? def.filter(
                                  (e) => e.def_title === "Monitoring"
                                )
                              : []
                          )}
                        </Select>
                      </Form.Item>
                    </Col>
                    {currentEvent.monitoring_id.map((item) => (
                      <>
                        <Col key={item.id} md={{ span: 6 }} xs={{ span: 24 }}>
                          <Form.Item
                            name={`monitoring_budget_${item.id}`}
                            label={`${item.monitoring_name} Budget`}
                          >
                            <span hidden>{item.budget}</span>
                            <Input
                              defaultValue={item.budget}
                              onChange={(e) =>
                                handleChangeMonitoringValue(item.id, e.target.value, "monitoring_budget_")
                              }
                              style={{
                                width: "250px",
                                height: "34px",
                                border: "2px solid #f5a60b",
                                borderRadius: "10px"
                              }}
                            />
                          </Form.Item>
                        </Col>
                        <Col md={{ span: 6 }} xs={{ span: 24 }}>
                          <Form.Item
                            name={`monitoring_actual_${item.id}`}
                            label={`${item.monitoring_name} Actual`}
                          >
                              <span hidden>{item.actual}</span>
                            <Input
                              defaultValue={item.actual}                            
                              onChange={(e) =>
                                handleChangeMonitoringValue(item.id, e.target.value, "monitoring_actual_")
                              }
                              style={{
                                width: "250px",
                                height: "34px",
                                border: "2px solid #f5a60b",
                                borderRadius: "10px"
                              }}
                            />
                          </Form.Item>
                        </Col>
                      </>
                    ))}
                  </>
                ) : null}                
              </>
            )  : (
              <>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item
                    name="monitoring_status"
                    label="Monetary Status"
                    rules={[
                      {
                        required: true,
                        message:
                          "Please enter your Monetary Available"
                      }
                    ]}
                  >
                    <Radio.Group
                      buttonStyle="solid"
                      size="middle"
                      name="monitoring_status"
                      onChange={handleOnChange}
                    >
                      <Radio.Button className="active" value={1}>
                        Yes
                      </Radio.Button>
                      <Radio.Button className="in-active" value={0}>
                        No
                      </Radio.Button>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                {monitoring ? (
                  <>
                  <Col md={{ span: 6 }} xs={{ span: 24 }}>
                    <Form.Item
                      name="monitoring_id"
                      label="Monetary"
                    >
                      <Select
                        mode="multiple"
                        placeholder="Select"
                        style={{
                          width: "250px",
                          height: "34px",
                          border: "2px solid #f5a60b",
                          borderRadius: "10px"
                        }}
                        name="digital_marketing_id"
                        loading={gettingDefinitionsList}
                        onChange={handleSelectionMonitoringChange}                     
                        showSearch
                        maxTagCount={0}
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {map(
                          (state) => {
                            return (
                              <Option key={state.id} value={state.id}>
                                {state.def_list_name}
                              </Option>
                            );
                          },
                          def
                            ? def?.filter(
                                (e) => e.def_title === "Monitoring"
                              )
                            : []
                        )}
                      </Select>
                    </Form.Item>
                  </Col>
                 {selectedOptionsMonitoring.map((id) => {
                  const defItem = def.find((state) => state.id === id);
                  const monitoringName = defItem ? defItem.def_list_name : "";
                  return (
                    <>
                      <Col key={`budget-${id}`} md={{ span: 6 }} xs={{ span: 24 }}>
                        <Form.Item label={`${monitoringName} Budget`}>
                          <Input
                            style={{
                              width: "250px",
                              height: "34px",
                              border: "2px solid #f5a60b",
                              borderRadius: "10px",
                            }}
                            value={budgets[id]}
                            onChange={(e) => handleBudgetChange(id, e.target.value)}
                          />
                        </Form.Item>
                      </Col>
                      <Col key={`actual-${id}`} md={{ span: 6 }} xs={{ span: 24 }}>
                        <Form.Item label={`${monitoringName} Actual`}>
                          <Input
                            style={{
                              width: "250px",
                              height: "34px",
                              border: "2px solid #f5a60b",
                              borderRadius: "10px",
                            }}
                            value={actuals[id]}
                            onChange={(e) => handleActualChange(id, e.target.value)}
                          />
                        </Form.Item>
                      </Col>
                    </>
                  );
                })}
                </>) : null}
               
              </>
            )}  
            {currentEvent ? (
              <>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item
                    name="product_discount_status"
                    label="Product Discount Status"
                  >
                    <div>
                    <Radio.Group
                      buttonStyle="solid"
                      defaultValue={currentEvent.product_discount_status}
                      size="middle"
                      name="product_discount_status"
                      onChange={handleOnChangeNew}
                    >
                      <Radio.Button className="active" value={1}>
                        Yes
                      </Radio.Button>
                      <Radio.Button className="in-active" value={0}>
                        No
                      </Radio.Button>
                    </Radio.Group>
                    </div>
                  </Form.Item>
                </Col>
                {currentEvent.product_discount_status == 1 ? (
                  <>
                    <Col md={{ span: 6 }} xs={{ span: 24 }}>
                      <Form.Item
                        name="product_discount_id"
                        label="Product Discount"
                      >                      
                        <Select
                          placeholder="Select"
                          style={{
                            width: "250px",
                            height: "34px",
                            border: "2px solid #f5a60b",
                            borderRadius: "10px"
                          }}
                          maxTagCount={0}
                          name="product_discount_id"
                          loading={gettingDefinitionsList}                                               
                          defaultValue={currentEvent.product_discount_id.map(
                            (item) => item.id
                          )}
                          showSearch
                          filterOption={(input, option) =>
                            option.items
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                        >
                          {map(
                            (state) => (
                              <Option key={state.id} value={state.id}>
                                {state.def_list_name}
                              </Option>
                            ),
                            def
                              ? def.filter(
                                  (e) => e.def_title === "Product Discount"
                                )
                              : []
                          )}
                        </Select>
                      </Form.Item>
                    </Col>
                    {currentEvent.product_discount_id.map((item) => (
                      <>
                        <Col key={item.id} md={{ span: 6 }} xs={{ span: 24 }}>
                          <Form.Item
                            name={`product_discount_budget_${item.id}`}
                            label={`${item.product_discount_name} Budget`}
                          >
                            <span hidden>{item.budget}</span>
                            <Input
                              defaultValue={item.budget}
                              onChange={(e) =>
                                handleChangeProductDiscountValue(item.id, e.target.value, "product_discount_budget_")
                              }
                              style={{
                                width: "250px",
                                height: "34px",
                                border: "2px solid #f5a60b",
                                borderRadius: "10px"
                              }}
                            />
                          </Form.Item>
                        </Col>
                        <Col md={{ span: 6 }} xs={{ span: 24 }}>
                          <Form.Item
                            name={`product_discount_actual_${item.id}`}
                            label={`${item.product_discount_name} Actual`}
                          >
                              <span hidden>{item.actual}</span>
                            <Input
                              defaultValue={item.actual}                            
                              onChange={(e) =>
                                handleChangeMonitoringValue(item.id, e.target.value, "product_discount_actual_")
                              }
                              style={{
                                width: "250px",
                                height: "34px",
                                border: "2px solid #f5a60b",
                                borderRadius: "10px"
                              }}
                            />
                          </Form.Item>
                        </Col>
                      </>
                    ))}
                  </>
                ) : null}                
              </>
            )  : (
              <>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item
                    name="product_discount_status"
                    label="Product Discount Status"
                    rules={[
                      {
                        required: true,
                        message:
                          "Please enter your Product Discount Available"
                      }
                    ]}
                  >
                    <Radio.Group
                      buttonStyle="solid"
                      size="middle"
                      name="product_discount_status"
                      onChange={handleOnChange}
                    >
                      <Radio.Button className="active" value={1}>
                        Yes
                      </Radio.Button>
                      <Radio.Button className="in-active" value={0}>
                        No
                      </Radio.Button>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                {productDiscount ? (
                  <>
                  <Col md={{ span: 6 }} xs={{ span: 24 }}>
                    <Form.Item
                      name="product_discount_id"
                      label="Product Discount"
                    >
                      <Select
                        mode="multiple"
                        placeholder="Select"
                        style={{
                          width: "250px",
                          height: "34px",
                          border: "2px solid #f5a60b",
                          borderRadius: "10px"
                        }}
                        name="product_discount_id"
                        loading={gettingDefinitionsList}
                        onChange={handleSelectionProductDiscountChange}                     
                        showSearch
                        maxTagCount={0}
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {map(
                          (state) => {
                            return (
                              <Option key={state.id} value={state.id}>
                                {state.def_list_name}
                              </Option>
                            );
                          },
                          def
                            ? def?.filter(
                                (e) => e.def_title === "Product Discount"
                              )
                            : []
                        )}
                      </Select>
                    </Form.Item>
                  </Col>
                 {selectedOptionsProductDiscount.map((id) => {
                  const defItem = def.find((state) => state.id === id);
                  const productDiscountName = defItem ? defItem.def_list_name : "";
                  return (
                    <>
                      <Col key={`budget-${id}`} md={{ span: 6 }} xs={{ span: 24 }}>
                        <Form.Item label={`${productDiscountName} Budget`}>
                          <Input
                            style={{
                              width: "250px",
                              height: "34px",
                              border: "2px solid #f5a60b",
                              borderRadius: "10px",
                            }}
                            value={budgets[id]}
                            onChange={(e) => handleBudgetChange(id, e.target.value)}
                          />
                        </Form.Item>
                      </Col>
                      <Col key={`actual-${id}`} md={{ span: 6 }} xs={{ span: 24 }}>
                        <Form.Item label={`${productDiscountName} Actual`}>
                          <Input
                            style={{
                              width: "250px",
                              height: "34px",
                              border: "2px solid #f5a60b",
                              borderRadius: "10px",
                            }}
                            value={actuals[id]}
                            onChange={(e) => handleActualChange(id, e.target.value)}
                          />
                        </Form.Item>
                      </Col>
                    </>
                  );
                })}
                </>) : null}               
              </>
            )}         
           {currentEvent ? (null):(
                  <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item
                    name="employee_email"
                    label="Employee Email"
                    rules={[
                      {
                        required: true,
                        message: "Please add Employee for Email Intimation"
                      }
                    ]}
                  >
                    <Select
                      placeholder="select"
                      mode="multiple"
                      //onChange={(e) => setNewEmployee(e)}
                      name="email"
                      maxTagCount={0}
                      defaultValue={currentEvent?.employee_name}
                      showSearch
                      loading={gettingEmployeeMaster}
                      filterOption={(input, option) =>
                        option.children
                          .toString()
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {map(
                        (Employee) => {
                          return (
                            <Option
                              key={Employee.id}
                              value={Employee.employee_code}
                            >
                              {Employee.name}
                              <Tooltip placement="topLeft" title={Employee.email}>
                                {" "}
                                <span className="mx-2">
                                  ({Employee.employee_code})
                                </span>
                              </Tooltip>
                            </Option>
                          );
                        },
                        EmployeeList
                          ? EmployeeList?.filter((e) => e.status === "1")
                          : []
                      )}
                    </Select>
                  </Form.Item>
                </Col>
            )}       

            <Col md={{ span: 6 }} xs={{ span: 24 }}>
              {currentEvent ? (
                <Form.Item name="initiator_name" label="Initiator Name">
                  <span hidden>{currentEvent.initiator_name}</span>
                  <Input
                    defaultValue={currentEvent.initiator_name}
                    onChange={handleChangeInitiatorName}
                    style={{
                      width: "250px",
                      height: "34px",
                      border: "2px solid #f5a60b",
                      borderRadius: "10px"
                    }}
                  />
                </Form.Item>
              ) : (
                <Form.Item name="initiator_name" label="Initiator Name">
                  <Input
                    style={{
                      width: "250px",
                      height: "34px",
                      border: "2px solid #f5a60b",
                      borderRadius: "10px"
                    }}
                  />
                </Form.Item>
              )}
            </Col>

            <Col md={{ span: 6 }} xs={{ span: 24 }}>
              {currentEvent ? (
                <Form.Item name="initiator_phone_no" label="Initiator Phone No">
                  <span hidden>{currentEvent.initiator_phone_no}</span>
                  <Input
                    defaultValue={currentEvent.initiator_phone_no}
                    onChange={handleChangeInitiatorPhoneno}
                    style={{
                      width: "250px",
                      height: "34px",
                      border: "2px solid #f5a60b",
                      borderRadius: "10px"
                    }}
                  />
                </Form.Item>
              ) : (
                <Form.Item name="initiator_phone_no" label="Initiator Phone No">
                  <Input
                    style={{
                      width: "250px",
                      height: "34px",
                      border: "2px solid #f5a60b",
                      borderRadius: "10px"
                    }}
                  />
                </Form.Item>
              )}
            </Col>
            <Col md={{ span: 6 }} xs={{ span: 24 }}>
              {currentEvent ? (
                <Form.Item name="organizer_name" label="Organizer Name">
                  <span hidden>{currentEvent.organizer_name}</span>
                  <Input
                    defaultValue={currentEvent.organizer_name}
                    onChange={handleChangeOrganizerName}
                    style={{
                      width: "250px",
                      height: "34px",
                      border: "2px solid #f5a60b",
                      borderRadius: "10px"
                    }}
                  />
                </Form.Item>
              ) : (
                <Form.Item name="organizer_name" label="Organizer Name">
                  <Input
                    // onChange={(e) => setOrganizerName(e)}
                    style={{
                      width: "250px",
                      height: "34px",
                      border: "2px solid #f5a60b",
                      borderRadius: "10px"
                    }}
                  />
                </Form.Item>
              )}
            </Col>
            <Col md={{ span: 6 }} xs={{ span: 24 }}>
              {currentEvent ? (
                <Form.Item
                  name="organizer_company_name"
                  label="Organizer Company Name"
                >
                  <span hidden>{currentEvent.organizer_company_name}</span>
                  <Input
                    defaultValue={currentEvent.organizer_company_name}
                    onChange={handleChangeOrganizerCompanyName}
                    style={{
                      width: "250px",
                      height: "34px",
                      border: "2px solid #f5a60b",
                      borderRadius: "10px"
                    }}
                  />
                </Form.Item>
              ) : (
                <Form.Item
                  name="organizer_company_name"
                  label="Organizer Company Name"
                >
                  <Input
                    style={{
                      width: "250px",
                      height: "34px",
                      border: "2px solid #f5a60b",
                      borderRadius: "10px"
                    }}
                  />
                </Form.Item>
              )}
            </Col>
            <Col md={{ span: 6 }} xs={{ span: 24 }}>
              {currentEvent ? (
                <Form.Item name="organizer_phone_no" label="Organizer Phone No">
                  <span hidden>{currentEvent.organizer_phone_no}</span>
                  <Input
                    defaultValue={currentEvent.organizer_phone_no}
                    onChange={handleChangeOrganizerPhoneno}
                    style={{
                      width: "250px",
                      height: "34px",
                      border: "2px solid #f5a60b",
                      borderRadius: "10px"
                    }}
                  />
                </Form.Item>
              ) : (
                <Form.Item name="organizer_phone_no" label="Organizer Phone No">
                  <Input
                    //  onChange={(e) => setOrganizerPhoneno(e)}
                    style={{
                      width: "250px",
                      height: "34px",
                      border: "2px solid #f5a60b",
                      borderRadius: "10px"
                    }}
                  />
                </Form.Item>
              )}
            </Col>
            <Col md={{ span: 6 }} xs={{ span: 24 }}>
              {currentEvent ? (
                <Form.Item name="targeted_audience" label="Targeted Audience">
                  <span hidden>{currentEvent.targeted_audience}</span>
                  <Input
                    defaultValue={currentEvent.targeted_audience}
                    onChange={handleChangeTargetAudience}
                    style={{
                      width: "250px",
                      height: "34px",
                      border: "2px solid #f5a60b",
                      borderRadius: "10px"
                    }}
                  />
                </Form.Item>
              ) : (
                <Form.Item name="targeted_audience" label="Targeted Audience">
                  <Input
                    style={{
                      width: "250px",
                      height: "34px",
                      border: "2px solid #f5a60b",
                      borderRadius: "10px"
                    }}
                  />
                </Form.Item>
              )}
            </Col>
            <Col md={{ span: 6 }} xs={{ span: 24 }}>
              {currentEvent ? (
                <Form.Item name="no_of_audience" label="No.of Audience">
                  <span hidden>{currentEvent.no_of_audience}</span>
                  <Input
                    defaultValue={currentEvent.no_of_audience}
                    onChange={handleChangeNoofAudience}
                    style={{
                      width: "250px",
                      height: "34px",
                      border: "2px solid #f5a60b",
                      borderRadius: "10px"
                    }}
                  />
                </Form.Item>
              ) : (
                <Form.Item name="no_of_audience" label="No.of Audience">
                  <Input
                    style={{
                      width: "250px",
                      height: "34px",
                      border: "2px solid #f5a60b",
                      borderRadius: "10px"
                    }}
                  />
                </Form.Item>
              )}
            </Col>
            <Col md={{ span: 6 }} xs={{ span: 24 }}>
              {currentEvent ? (
                <Form.Item
                  name="expected_convertion_ratio"
                  label="Expected Convertion Ratio"
                >
                  <span hidden>{currentEvent.expected_convertion_ratio}</span>
                  <Input
                    defaultValue={currentEvent.expected_convertion_ratio}
                    onChange={handleChangeExpRatio}
                    style={{
                      width: "250px",
                      height: "34px",
                      border: "2px solid #f5a60b",
                      borderRadius: "10px"
                    }}
                  />
                </Form.Item>
              ) : (
                <Form.Item
                  name="expected_convertion_ratio"
                  label="Expected Convertion Ratio"
                >
                  <Input
                    style={{
                      width: "250px",
                      height: "34px",
                      border: "2px solid #f5a60b",
                      borderRadius: "10px"
                    }}
                  />
                </Form.Item>
              )}
            </Col>
            <Col md={{ span: 6 }} xs={{ span: 24 }}>
              {currentEvent ? (
                <Form.Item name="execution_plan" label="Execution Plan">
                  <span hidden>{currentEvent.execution_plan}</span>
                  <Select
                    placeholder="Select"
                    style={{
                      width: "250px",
                      height: "34px",
                      border: "2px solid #f5a60b",
                      borderRadius: "10px"
                    }}
                    name="definition_list"
                    loading={gettingDefinitionsList}
                    onChange={(e) => setExecutionNewPlan(e)}
                    value={currentEvent.execution_plan_name}
                    showSearch
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {map(
                      (state) => {
                        return (
                          <Option key={state.id} value={state.id}>
                            {state.def_list_name}
                          </Option>
                        );
                      },
                      def
                        ? def?.filter((e) => e.def_title == "Execution Plan")
                        : []
                    )}
                  </Select>
                </Form.Item>
              ) : (
                <Form.Item name="execution_plan" label="Execution Plan">
                  <Select
                    placeholder="Select"
                    style={{
                      width: "250px",
                      height: "34px",
                      border: "2px solid #f5a60b",
                      borderRadius: "10px"
                    }}
                    name="definition_list"
                    loading={gettingDefinitionsList}
                    onChange={(e) => setExecutionPlan(e)}                 
                    showSearch
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {map(
                      (state) => {
                        return (
                          <Option key={state.id} value={state.id}>
                            {state.def_list_name}
                          </Option>
                        );
                      },
                      def
                        ? def?.filter((e) => e.def_title == "Execution Plan")
                        : []
                    )}
                  </Select>
                </Form.Item>
              )}
            </Col>
            <Col md={{ span: 6 }} xs={{ span: 24 }}>
              {currentEvent ? (
                <Form.Item name="offer_details" label="Offer Details">
                  <span hidden>{currentEvent.offer_details}</span>
                  <Input
                    defaultValue={currentEvent.offer_details}
                    onChange={handleChangeOffDetails}
                    style={{
                      width: "250px",
                      height: "34px",
                      border: "2px solid #f5a60b",
                      borderRadius: "10px"
                    }}
                  />
                </Form.Item>
              ) : (
                <Form.Item name="offer_details" label="Offer Details">
                  <Input
                    style={{
                      width: "250px",
                      height: "34px",
                      border: "2px solid #f5a60b",
                      borderRadius: "10px"
                    }}
                  />
                </Form.Item>
              )}
            </Col>
            <Col md={{ span: 6 }} xs={{ span: 24 }}>
              {currentEvent ? (
                <Form.Item name="budgeted_ROI" label="Budgeted ROI">
                  <span hidden>{currentEvent.budgeted_ROI}</span>
                  <Input
                    defaultValue={currentEvent.budgeted_ROI}
                    onChange={handleChangeBudROI}
                    style={{
                      width: "250px",
                      height: "34px",
                      border: "2px solid #f5a60b",
                      borderRadius: "10px"
                    }}
                  />
                </Form.Item>
              ) : (
                <Form.Item name="budgeted_ROI" label="Budgeted ROI">
                  <Input
                    style={{
                      width: "250px",
                      height: "34px",
                      border: "2px solid #f5a60b",
                      borderRadius: "10px"
                    }}
                  />
                </Form.Item>
              )}
            </Col>
            <Col md={{ span: 6 }} xs={{ span: 24 }}>
              {currentEvent ? (
                <Form.Item name="budgeted_sales" label="Budgeted Sales">
                  <span hidden>{currentEvent.budgeted_sales}</span>
                  <Input
                    defaultValue={currentEvent.budgeted_sales}
                    onChange={handleChangeBudSales}
                    style={{
                      width: "250px",
                      height: "34px",
                      border: "2px solid #f5a60b",
                      borderRadius: "10px"
                    }}
                  />
                </Form.Item>
              ) : (
                <Form.Item name="budgeted_sales" label="Budgeted Sales">
                  <Input
                    style={{
                      width: "250px",
                      height: "34px",
                      border: "2px solid #f5a60b",
                      borderRadius: "10px"
                    }}
                  />
                </Form.Item>
              )}
            </Col>
            <Col md={{ span: 6 }} xs={{ span: 24 }}>
              {currentEvent ? (
                <Form.Item name="expected_sales" label="Expected Sales">
                  <span hidden>{currentEvent.expected_sales}</span>
                  <Input
                    defaultValue={currentEvent.expected_sales}
                    onChange={handleChangeExpSales}
                    style={{
                      width: "250px",
                      height: "34px",
                      border: "2px solid #f5a60b",
                      borderRadius: "10px"
                    }}
                  />
                </Form.Item>
              ) : (
                <Form.Item name="expected_sales" label="Expected Sales">
                  <Input
                    style={{
                      width: "250px",
                      height: "34px",
                      border: "2px solid #f5a60b",
                      borderRadius: "10px"
                    }}
                  />
                </Form.Item>
              )}
            </Col>

            <Col md={{ span: 6 }} xs={{ span: 24 }}>
              {currentEvent ? (
                <Form.Item name="budgeted_AOV" label="Budgeted AOV">
                  <span hidden>{currentEvent.budgeted_AOV}</span>
                  <Input
                    defaultValue={currentEvent.budgeted_AOV}
                    onChange={handleChangeBudAOV}
                    style={{
                      width: "250px",
                      height: "34px",
                      border: "2px solid #f5a60b",
                      borderRadius: "10px"
                    }}
                  />
                </Form.Item>
              ) : (
                <Form.Item name="budgeted_AOV" label="Budgeted AOV">
                  <Input
                    style={{
                      width: "250px",
                      height: "34px",
                      border: "2px solid #f5a60b",
                      borderRadius: "10px"
                    }}
                  />
                </Form.Item>
              )}
            </Col>
            <Col md={{ span: 6 }} xs={{ span: 24 }}>
              {currentEvent ? (
                <Form.Item name="expected_AOV" label="Expected AOV">
                  <span hidden>{currentEvent.expected_AOV}</span>
                  <Input
                    defaultValue={currentEvent.expected_AOV}
                    onChange={handleChangeExpAOV}
                    style={{
                      width: "250px",
                      height: "34px",
                      border: "2px solid #f5a60b",
                      borderRadius: "10px"
                    }}
                  />
                </Form.Item>
              ) : (
                <Form.Item name="expected_AOV" label="Expected AOV">
                  <Input
                    style={{
                      width: "250px",
                      height: "34px",
                      border: "2px solid #f5a60b",
                      borderRadius: "10px"
                    }}
                  />
                </Form.Item>
              )}
            </Col>

            <Col md={{ span: 6 }} xs={{ span: 24 }}>
              {currentEvent ? (
                <Form.Item name="event_nature" label="Event Nature">
                  <span hidden>{currentEvent.event_nature_name}</span>
                  <Select
                    placeholder="Select"
                    style={{
                      width: "250px",
                      height: "34px",
                      border: "2px solid #f5a60b",
                      borderRadius: "10px"
                    }}
                    name="definition_list"
                    loading={gettingDefinitionsList}
                    onChange={(e) => setNewEventNature(e)}
                    value={currentEvent.event_nature_name}
                    showSearch
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {map(
                      (state) => {
                        return (
                          <Option key={state.id} value={state.id}>
                            {state.def_list_name}
                          </Option>
                        );
                      },
                      def
                        ? def?.filter((e) => e.def_title == "Event Nature")
                        : []
                    )}
                  </Select>
                </Form.Item>
              ) : (
                <Form.Item name="event_nature" label="Event Nature">
                  <Select
                    placeholder="Select"
                    style={{
                      width: "250px",
                      height: "34px",
                      border: "2px solid #f5a60b",
                      borderRadius: "10px"
                    }}
                    name="definition_list"
                    loading={gettingDefinitionsList}
                    onChange={(e) => setEventNature(e)}
                    showSearch
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {map(
                      (state) => {
                        return (
                          <Option key={state.id} value={state.id}>
                            {state.def_list_name}
                          </Option>
                        );
                      },
                      def
                        ? def?.filter((e) => e.def_title == "Event Nature")
                        : []
                    )}
                  </Select>
                </Form.Item>
              )}
            </Col>
            <Col md={{ span: 6 }} xs={{ span: 24 }}>
              {currentEvent ? (
                <Form.Item name="recurring_period" label="Recurring Period">
                  <span hidden>{currentEvent.recurring_period_name}</span>
                  <Select
                    placeholder="Select"
                    style={{
                      width: "250px",
                      height: "34px",
                      border: "2px solid #f5a60b",
                      borderRadius: "10px"
                    }}
                    name="definition_list"
                    loading={gettingDefinitionsList}
                    onChange={(e) => setNewRecuPlan(e)}
                    value={currentEvent.recurring_period_name}
                    showSearch
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {map(
                      (state) => {
                        return (
                          <Option key={state.id} value={state.id}>
                            {state.def_list_name}
                          </Option>
                        );
                      },
                      def
                        ? def?.filter((e) => e.def_title == "Recurring Period")
                        : []
                    )}
                  </Select>
                </Form.Item>
              ) : (
                <Form.Item name="recurring_period" label="Recurring Period">
                  <Select
                    placeholder="Select"
                    style={{
                      width: "250px",
                      height: "34px",
                      border: "2px solid #f5a60b",
                      borderRadius: "10px"
                    }}
                    name="definition_list"
                    loading={gettingDefinitionsList}
                    onChange={(e) => setRecurringPeriod(e)}                 
                    showSearch
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {map(
                      (state) => {
                        return (
                          <Option key={state.id} value={state.id}>
                            {state.def_list_name}
                          </Option>
                        );
                      },
                      def
                        ? def?.filter((e) => e.def_title == "Recurring Period")
                        : []
                    )}
                  </Select>
                </Form.Item>
              )}
            </Col>
            <Col md={{ span: 6 }} xs={{ span: 24 }}>      
            {currentEvent ? (     
                <Form.Item name="event_status" label="Event Status">
                  <span hidden>{currentEvent.event_status}</span>
                  <Select
                    placeholder="Select"
                    style={{
                      width: "250px",
                      height: "34px",
                      border: "2px solid #f5a60b",
                      borderRadius: "10px"
                    }}
                    name="definition_list"
                    loading={gettingDefinitionsList}
                    onChange={(e) => setEventNewStatus(e)}
                    value={currentEvent.event_status_name}
                    showSearch
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {map(
                      (state) => {
                        return (
                          <Option key={state.id} value={state.id}>
                            {state.def_list_name}
                          </Option>
                        );
                      },
                      def ? def?.filter((e) => e.def_title == "Event Status") : []
                    )}
                  </Select>
                </Form.Item>
            ):(  
            <Form.Item name="event_status" label="Event Status">          
            <Select
              placeholder="Select"
              style={{
                width: "250px",
                height: "34px",
                border: "2px solid #f5a60b",
                borderRadius: "10px"
              }}
              name="definition_list"
              loading={gettingDefinitionsList}
              onChange={(e) => setEventStatus(e)}            
              showSearch
              filterOption={(input, option) =>
                option.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {map(
                (state) => {
                  return (
                    <Option key={state.id} value={state.id}>
                      {state.def_list_name}
                    </Option>
                  );
                },
                def ? def?.filter((e) => e.def_title == "Event Status") : []
              )}
            </Select>
          </Form.Item>)}
          </Col>
          </Row>
          <Form.Item>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button type="primary" htmlType="submit">
                {currentEvent ? "Update" : "Add"}
              </Button>
              {currentEvent && (
                <Button
                  danger
                  onClick={confirmDelete}
                  style={{
                    backgroundColor: "#ff7f7f",
                    marginLeft: "10px",
                    color: "#000000"
                  }}
                >
                  In Active
                </Button>
              )}
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CalendarEvent;
