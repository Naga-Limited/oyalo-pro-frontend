/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import CustomTable from "../../../components/CustomTable";
import { useDispatch, useSelector } from "react-redux";
import {
  Input,
  DatePicker,
  Button,
  Col,
  Row,
  Form,
  Select,
  Card,
  Collapse,
} from "antd";
import { format } from 'date-fns';
import { includes, length } from "ramda";
// import {saveOutletMaster, getStates, getSubZonal, getZonal, updateOutletMaster, getCity} from '../../../@app/master/masterSlice';
// import {map} from 'ramda';
// import {useLocation, useNavigate} from 'react-router';
// import dayjs from 'dayjs';
// import messageToast from '../../../components/messageToast/messageToast';
// import {transStatus} from '../../../util/transStatus';
// import { Input } from 'antd';
// import {getFormData, CREATE_TICKET_FORM_DATA} from './createTicket.constants';
import favicon from "../../../asset/favicon.ico";
import {
  getAssetGroup,
  getAssetGroupIssue,
  getAssetMaster,
  getPriority,
  getServiceFor,
  getTicketForHadling,
  getTicketForHadlingFilter,
  getTypeOfService,
} from "../../../@app/service/serviceSlice";
import {
  getEmployeeMapping,
  getEmployeeMaster,
  getOutletMaster,
} from "../../../@app/master/masterSlice";
import { getSubZonal, getZonal } from "../../../@app/subMaster/subMasterSlice";
import { CaretRightOutlined } from "@ant-design/icons";

const { TextArea } = Input;

function Ticketstatusreportorl(props) {
  const dispatch = useDispatch();
  const { Option } = Select;
  const { Panel } = Collapse;
  const apiCall = useRef(true);

  const [zoneId, setZoneId] = useState(null);
  const [subZoneId, setSubZoneId] = useState(null);
  const [outletId, setOutletId] = useState(null);
  const [serviceForID, setServiceForID] = useState(null);
  const [assetGroupId, setAssetGroupId] = useState(null);
  const [waitingAt, setWaitingAt] = useState(null);
  const [ticketStatus, setTicketStatus] = useState(null);
  const [assignedTo, setAssignedTo] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const navigate = useNavigate();

  // const onClickAdd = () => {
  //   navigate("/ticketstatusreportorlForm");
  // };

  const handleViewClick = (rowInfo) => {
    navigate("/ticketstatusreportorlForm", {
      state: rowInfo,
    });
  };

  const handleOnChange = () => {
    // eslint-disable-next-line no-console
    console.log("onChange");
  };

  // const {
  //   gettingOutletMaster,
  //   getOutletMasterResponse: {data: dataSource}
  // } = useSelector((state) => {
  //   return state.master;
  // });

  const onSelectChange = () => {
    // eslint-disable-next-line no-console
  
  };

  const onFinish = (values) => {
  
    let data = {
      zone: values.zone,
      subZone: values.subZone,
      outlet: values.outlet,
      serviceFor: values.serviceFor,
      assetGroup: values.assetGroup,
      ticketStatus: values.ticketStatus,
      waitingAt: values.waitingAt,
      assignedTo: values.assignedTo,
      fromDate: values["fromDate"]?.format("YYYY-MM-DD"),
      toDate: values["toDate"]?.format("YYYY-MM-DD"),
    };

    let AssignedData = dataSource.find(
      (e) => e?.employee_code == values?.assignedTo
    );

    // console.log(AssignedData, "AssignedData");
    let string = "";
    if (values?.zone) {
      string += "zone_id=" + values?.zone;
    }
    if (values?.subZone) {
      string += "&subzone_id=" + values?.subZone;
    }
    if (values?.outlet) {
      string += "&outlet_id=" + values?.outlet;
    }
    if (values?.modeofpayment) {
      string += "&modeofpayment=" + values?.modeofpayment;
    }

    if (values?.serviceFor) {
      string += "&service_for=" + values?.serviceFor;
    }
    if (values?.assetGroup) {
      string += "&asset_group=" + values?.assetGroup;
    }
    if (values?.assignedTo) {
      string += "&assigned_to=" + values?.assignedTo;
    }
    if (values?.ticketStatus) {
      string += "&ticket_status=" + values?.ticketStatus;
    }

    if (values?.waitingAt) {
      string += "&waiting=" + values?.waitingAt;
    }

    if (data?.fromDate) {
      string += "&from_date=" + data?.fromDate;
    }

    if (data?.toDate) {
      string += "&to_date=" + data?.toDate;
    }

    //     api/get-ticket-handling?limit=400
    // &offset=0
    // &zone_id=43
    // &subzone_id=29
    // &outlet_id=1
    // &service_for=1
    // &asset_group=2
    // &ticket_status=WIP
    // &assigned_to=62
    // &from_date=2023-05-06
    // &to_date=2023-05-06
    // &waiting=

      dispatch(
      getTicketForHadlingFilter({
        type: string,
      })
    );
  
  };

  const {
    gettingOutletMaster,
    getEmployeeMappingResponse: { data: employeeMapping = [] },
    getOutletMasterResponse: { data: dataSource },
  } = useSelector((state) => {
    return state.master;
  });

  const {
    gettingPriority,
    getPriorityResponse: { data: priorityData },
    gettingServiceFor,
    getServiceForResponse: { data: serviceForData },
    getAssetGroupResponse: { data: assetGroups },
    getAssetMasterResponse: { data: assetMasters },
    getTypeOfServiceResponse: { data: typeOfServices },
    getAssetGroupIssueResponse: { data: typesOfAssetGroupIssue },
    getAssetBaseOnORLResponse: { data: assetsByORLs },
  } = useSelector((state) => {
    return state.service;
  });

  // const {
  //   getOutletMasterResponse: { data: outletData },
  //   getEmployeeMappingResponse: { data: employeeMapping = [] },
  //   getEmployeeMasterResponse: { data: Employees },
  // } = useSelector((state) => {
  //   return state.master;
  // });

  // const assignedTo = employeeMapping?.filter((e) => {
  //   //if (service === "POS" || service === "Equipment" || service === "IT") {
  //   return e?.submodule;
  //   //}
  //   //return true;
  // });

  //  const {
  //    getServiceForResponse: { data: dataSource },
  //  } = useSelector((state) => {
  //    return state.service;
  //  });

  const {
    gettingZonal,
    getZonalResponse: { data: dataZoneSource },
    getSubZonalResponse: { data: dataSubZoneSource },
  } = useSelector((state) => {
    return state.subMaster;
  });

  const {
    gettingTicketHandling,
    getTicketHandlingResponse: { data: dataValue },
  } = useSelector((state) => {
    return state.service;
  });

  const dateFormat = ["DD/MM/YYYY", "DD/MM/YY"];

  useEffect(() => {
    if (apiCall.current == true) {
      dispatch(getTicketForHadling({ type: "" }));
      dispatch(getOutletMaster());
      dispatch(getPriority());
      dispatch(getServiceFor());
      dispatch(getAssetGroup());
      dispatch(getAssetMaster());
      dispatch(getTypeOfService());
      dispatch(getEmployeeMapping());
      dispatch(getEmployeeMaster());
      dispatch(getAssetGroupIssue());
      dispatch(getZonal());
      dispatch(getSubZonal());
      apiCall.current = false;
    }
    // eslint-disable-next-line
  }, []);

  //   useEffect( () => {
  //     dispatch( getOutletMaster() );
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [] );


  function getDate(params) {
    return `${format(new Date(params.row.created_at), 'dd-MM-yy') }`;
  }
  const data = [
    {
      "S.No": 1,
      ticketno: "SE-BR-EQ-23-09-01-01",
      Outlet_Name: "TN-MADURAI-ANNANAGAR",
      Service_For: "Equipement",
      Asset_Group: "Air Conditioner",
      Asset: "Daikin 1",
      Type_of_Service: "BreakDown",
      Vendor_Type: "Internal",
      Mode_of_Payment: "Online",
      Spend_Amount: "1500",
      Waiting: "Issue Resolved	",
      Payment_Status: "Waiting @ OH Approval",
      pono: "",
      Aging: "2",
    },
    {
      "S.No": 2,
      ticketno: "SE-BR-EQ-23-09-01-01",
      Outlet_Name: "TN-MADURAI-ANNANAGAR",
      Service_For: "Equipement",
      Asset_Group: "Air Conditioner",
      Asset: "Daikin 2",
      Type_of_Service: "BreakDown",
      Vendor_Type: "Internal",
      Mode_of_Payment: "Online",
      Spend_Amount: "100",
      Waiting: "Issue Resolved	",
      Payment_Status: "Approved",
      pono: "",
      Aging: "2",
    },
    {
      "S.No": 3,
      ticketno: "SE-BR-EQ-23-09-01-01",
      Outlet_Name: "TN-MADURAI-ANNANAGAR",
      Service_For: "Equipement",
      Asset_Group: "Air Conditioner",
      Asset: "Daikin 3",
      Type_of_Service: "BreakDown",
      Vendor_Type: "Internal",
      Mode_of_Payment: "Online",
      Spend_Amount: "500",
      Waiting: "Issue Resolved	",
      Payment_Status: "Waiting @ OH Approval",
      pono: "",
      Aging: "2",
    },
  ];

  const data1 =
    dataValue?.length > 0
      ? (dataValue ?? []).map((e) => {
          let S_No = e.id;
          let ticketno = e.ticket_no;
          let Outlet_Name = e.outlet_name;
          let Service_For = e.service_for;
          let Asset_Group = e?.asset_group;
          let Asset = e?.asset_details;
          let Type_of_Service = e?.type_of_service_details;
          let Vendor_Type = e?.ticket_details[0].vendor_type;
          let Mode_of_Payment = e?.ticket_details[0].payment_mode;
          let Spend_Amount = e?.ticket_details[0].spend_amount;
          let Waiting = e?.ticket_details[0]?.waiting;
          let Payment_Status = e?.ticket_details[0]?.payment_status;
          let pono = e?.po_number ? e?.po_number : "";
          let Aging = e?.aging_days;

          // let to_date = format(new Date(e?.to_date), "dd/MM/yyyy");
          // let status =
          //   isPast(new Date(e?.from_date)) && isFuture(new Date(e?.to_date));
          return {
            ...e,
            S_No,
            ticketno,
            Outlet_Name,
            Service_For,
            Asset_Group,
            Asset,
            Type_of_Service,
            Vendor_Type,
            Mode_of_Payment,
            Spend_Amount,
            Waiting,
            Payment_Status,
            pono,
            Aging,
          };
        })
      : [];
  let column = [
    { key: "1", headerName: "S.No", field: "S.No", hide: false, width: 70 },
    {
      key: "2",
      headerName: "Ticket No",
      field: "ticketno",
      hide: false,
      width: 300,
    },
    {
      key: "3",
      headerName: "Outlet Code",
      field: "outlet_code",
      hide: false,
      width: 100,
    },
    {
      key: "4",
      headerName: "Outlet Name",
      field: "Outlet_Name",
      hide: false,
      width: 180,
    },
    {
      key: "5",
      headerName: "Service For",
      field: "Service_For",
      hide: false,
      width: 180,
    },
    {
      key: "6",
      headerName: "Ticket Date",
      field: "date",
      hide: false,
      width: 100,
      valueGetter:getDate 
    },
    {
      key: "7",
      headerName: "Asset Group",
      field: "Asset_Group",
      hide: false,
      width: 180,
    },
    { key: "8", headerName: "Asset", field: "Asset", hide: false, width: 380 },
    {
      key: "9",
      headerName: "Type of Service",
      field: "Type_of_Service",
      hide: false,
      width: 180,
    },
    {
      key: "10",
      headerName: "Vendor Type",
      field: "Vendor_Type",
      hide: false,
      width: 180,
    },
    {
      key: "11",
      headerName: "Mode of Payment",
      field: "Mode_of_Payment",
      hide: false,
      width: 300,
    },
    {
      key: "12",
      headerName: "Spend Amount",
      field: "Spend_Amount",
      hide: false,
      width: 180,
    },
    {
      key: "13",
      headerName: "Waiting @",
      field: "Waiting",
      hide: false,
      width: 180,
    },
    {
      key: "14",
      headerName: "Payment Status",
      field: "Payment_Status",
      hide: false,
      width: 180,
    },
    {
      key: "15",
      headerName: "Po No / FI Doc No",
      field: "pono",
      hide: false,
      width: 180,
    },
    {
      key: "16",
      headerName: "Remarks",
      field: "remarks",
      hide: false,
      width: 180,
    },
    { key: "17", headerName: "Aging", field: "Aging", hide: false, width: 180 },
  ];
  return (
    <div className="h-screen apphide">
      <Card>
        <Row>
          <Col span={24}>
            <Form
              name="basic"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              onValuesChange={onSelectChange}
              onFinish={onFinish}
              // onFinishFailed={onFinishFailed}
              autoComplete="off"
              // form={form}
            >
            <Collapse
                bordered={false}
                expandIcon={({ isActive }) => (
                  <CaretRightOutlined rotate={isActive ? 90 : 0} />
                )}>
                <Panel header="Show Filters" key="1">
                  <section>
                    {" "}
              <Row gutter={[15, 0]}>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item name="zone" label="Zone">
                    <Select
                      placeholder="Select"
                      loading={gettingZonal}
                      //   disabled={savingCity}
                      showSearch
                      onChange={(e) => {
                        // console.log(e, "e");
                        setZoneId(e);
                      }}
                      // filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                    >
                      {dataZoneSource?.map((el) => (
                        <Option key={el?.id} value={el?.id}>
                          {el?.zonal_name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item name="subZone" label="SubZone">
                    <Select
                      placeholder="Select"
                      //   loading={gettingState}
                      //   disabled={savingCity}
                      showSearch
                      onChange={(e) => {
                        setSubZoneId(e);
                      }}
                      // filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                    >
                      {dataSubZoneSource?.map((el) => {
                        if (el && el?.zonal_id == zoneId) {
                          return (
                            <Option key={el?.id} value={el?.id}>
                              {el?.name}
                            </Option>
                          );
                        }
                      })}
                    </Select>
                  </Form.Item>
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item name="outlet" label="Outlet">
                    <Select
                      placeholder="Select"
                      //   loading={gettingState}
                      //   disabled={savingCity}
                      showSearch
                      onChange={(e) => {
                        setOutletId(e);
                      }}
                      // onChange={handleOnChange}
                      // filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                    >
                      {dataSource?.map((el) => (
                        <Option key={el?.id} value={el?.outlet_code}>
                          {el?.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item name="serviceFor" label="Service For">
                    <Select
                      placeholder="Select"
                      //   loading={gettingState}
                      //   disabled={savingCity}
                      showSearch
                      onChange={(e) => {
                        setServiceForID(e);
                      }}
                      // onChange={handleOnChange}
                      // filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                    >
                      {serviceForData?.map((el) => (
                        <Option key={el?.id} value={el?.id}>
                          {el?.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item name="assetGroup" label="Asset Group">
                    <Select
                      placeholder="Select"
                      //   loading={gettingState}
                      //   disabled={savingCity}
                      onChange={(e) => {
                        setAssetGroupId(e);
                      }}
                      showSearch
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }>
                      {assetGroups?.map((el) => {
                        if (el?.servicefor_id == serviceForID) {
                          return (
                            <Option key={el?.id} value={el?.id}>
                              {el?.name}
                            </Option>
                          );
                        }
                      })}
                    </Select>
                  </Form.Item>
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  {/* <Form.Item name="assignedTo" label="Waiting @">
                    <Select
                      placeholder="Select"
                      //   loading={gettingState}
                      //   disabled={savingCity}
                      onChange={(e) => {
                        setAssetGroupId(e);
                      }}
                      showSearch
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }>
                      {employeeMapping?.map((el) => (
                        <Option
                          key={el?.employee_code}
                          value={el?.employee_code}>
                          {el?.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item> */}

                  
                        <Form.Item name="assignedTo" label="Waiting @">
                          <Select
                          allowClear
                            placeholder="Select"
                            //   loading={gettingState}
                            //   disabled={savingCity}
                            onChange={(e) => {
                              setTicketStatus(e);
                            }}
                            showSearch
                            filterOption={(input, option) =>
                              option.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }>
                            <Option key={"WIP"} value={"WIP"}>
                              WIP
                            </Option>
                            <Option key={"PO processed"} value={"PO processed"}>
                              PO processed
                            </Option>
                            <Option
                              key={"Waiting @ PO No"}
                              value={"Waiting @ PO No"}>
                              Waiting @ PO
                            </Option>
                            <Option
                              key={"Waiting @ Vendor Assignment"}
                              value={"Waiting @ Vendor Assignment"}>
                              Waiting @ Vendor Assignment
                            </Option>
                            <Option
                              key={"issue Resolved MS"}
                              value={"issue Resolved MS"}>
                              issue Resolved MS
                            </Option>
                            <Option
                              key={"Ticket Closed ORL"}
                              value={"Ticket Closed ORL"}>
                              Ticket Closed ORL
                            </Option>
                            <Option
                              key={"Waiting @ OH Apporval "}
                              value={"Waiting @ OH Apporval "}>
                              Waiting @ OH Apporval
                            </Option>
                            <Option
                              key={"Waiting @ AH apporval"}
                              value={"Waiting @ AH apporval"}>
                              Waiting @ AH apporval
                            </Option>
                            <Option
                              key={"Waiting @ FI Doc"}
                              value={"Waiting @ FI Doc"}>
                              Waiting @ FI Doc
                            </Option>
                            {/* {CREATE_TICKET_FORM_DATA?.[assetGroup]?.map((el) => (
                        <Option key={el} value={el}>
                          {el}
                        </Option>
                      ))} */}
                          </Select>
                        </Form.Item>
                     
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item name="modeofpayment" label="Mode of Payment">
                    <Select
                      placeholder="Select"
                      //   loading={gettingState}
                      //   disabled={savingCity}
                      onChange={(e) => {
                        setTicketStatus(e);
                      }}
                      showSearch
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }>
                      <Option key={"Online"} value={"Online"}>
                        Online
                      </Option>
                      <Option key={"Pettycash"} value={"Pettycash"}>
                        Pettycash
                      </Option>
                      {/* {CREATE_TICKET_FORM_DATA?.[assetGroup]?.map((el) => (
                        <Option key={el} value={el}>
                          {el}
                        </Option>
                      ))} */}
                    </Select>
                  </Form.Item>
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item label="From Date" name="fromDate">
                    <DatePicker
                      format={dateFormat}
                      placeholder="dd/mm/yyyy"
                      style={{ width: "100%" }}
                      name="fromDate"
                      // onChange={handleOnChange}
                      onChange={(e) => {
                        setFromDate(e);
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item label="To Date" name="toDate">
                    <DatePicker
                      format={dateFormat}
                      placeholder="dd/mm/yyyy"
                      style={{ width: "100%" }}
                      name="toDate"
                      onChange={(e) => {
                        setToDate(e);
                      }}
                      // disabledDate={(current) => {
                      //   let customDate = moment().format("YYYY-MM-DD");
                      //   return (
                      //     current &&
                      //     current < moment(customDate, "YYYY-MM-DD")
                      //   );
                      // }}

                      //onChange={handleOnChange}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Row gutter={[15, 15]} style={{ justifyContent: "end" }}>
                    <Col
                      span={12}
                      style={{ textAlign: "right" }}
                      className="d-flex align-items-center justify-content-end mt-3">
                      <Form.Item className="mx-2">
                        <Button
                          className="orangeFactory"
                          type="primary"
                          htmlType="submit">
                          View
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
              </Row>
              </section>
              </Panel>
              </Collapse>
            </Form>
          </Col>
        </Row>
      </Card>
      <CustomTable
        showHeader={false}
        showEdit={false}
        dataSource={data1}
        column={column}
        handleViewClick={handleViewClick}
        // onClickAdd={onClickAdd}
        title={"Approval List"}
      />
    </div>
  );
}

export default Ticketstatusreportorl;
