/* eslint-disable no-unused-vars */
import { CaretRightOutlined } from "@ant-design/icons";
import moment from "moment"; // 292.3K (gzipped: 71.6K)
import {
  Button,
  Card,
  Col,
  Collapse,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import CustomTable from "../../../components/CustomTable";
import { getZonal } from "../../../@app/subMaster/subMasterSlice";
import { getSubZonal } from "../../../@app/subMaster/subMasterSlice";
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
import { column } from "./column";
import {
  getEmployeeMapping,
  getEmployeeMaster,
  getOutletMaster,
} from "../../../@app/master/masterSlice";
import { Option } from "antd/es/mentions";

function TicketHandling(props) {
  const { Panel } = Collapse;

  const navigate = useNavigate();
  const apiCall = useRef(true);
  const dispatch = useDispatch();
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

  const onClickAdd = () => {
    navigate("/createTicket/addEditForm");
  };

  const handleViewClick = (rowInfo) => {
    navigate("/ticketHandling", {
      state: { data: rowInfo },
    });
  };

  const handleOnChange = (e) => {
    // console.log("e", e?.target?.value);
    // console.log(e?.target?.name, "e?.target?.name");
    // eslint-disable-next-line no-console
 
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
    getTicketHandlingResponse: { data },
  } = useSelector((state) => {
    return state.service;
  });

  const onSelectChange = () => {};

  const dateFormat = ["DD/MM/YYYY", "DD/MM/YY"];

  
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
    if (values?.serviceFor) {
      string += "&service_for=" + values?.serviceFor;
    }
    if (values?.assetGroup) {
      string += "&asset_group=" + values?.assetGroup;
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

  useEffect(() => {
    if (apiCall.current == true) {
      props.setTopTitle("Ticket Handling");
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

  // useEffect(() => {
  //   dispatch(getTicketForHadling({ type: "" }));
  //   dispatch(getOutletMaster());
  //   dispatch(getPriority());
  //   dispatch(getServiceFor());
  //   dispatch(getAssetGroup());
  //   dispatch(getAssetMaster());
  //   dispatch(getTypeOfService());
  //   dispatch(getEmployeeMapping());
  //   dispatch(getEmployeeMaster());
  //   dispatch(getAssetGroupIssue());
  // }, [dispatch]);

  return (
    <div className="h-screen lasthide apphide">
      <Card>
        <Row>
          <Col span={24}>
            <Form
              name="basic"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              onValuesChange={onSelectChange}
              onFinish={onFinish}
              autoComplete="off"
              // form={form}
            >
              {/* <Button className='orangeFactory text-white mt-3' type='primary' htmlType='submit' {...getToggleProps({
          onClick: () => setExpanded((prevExpanded) => !prevExpanded),
        })}>
                         {isExpanded ? 'Hide Filters' : 'Show Filters'}
                      </Button> */}
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
                          allowClear
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
                          allowClear
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
                          allowClear
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
                          allowClear
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
                          allowClear
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
                        <Form.Item name="ticketStatus" label="Ticket Status">
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
                        <Form.Item name="assignedTo" label="Assigned To">
                          <Select
                          allowClear
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
                  </section>
                </Panel>
              </Collapse>
            </Form>
          </Col>
        </Row>
      </Card>
      <CustomTable
        loading={gettingTicketHandling}
        dataSource={data}
        column={column(handleViewClick)}
        handleViewClick={handleViewClick}
        hideActionBtn={true}
        onClickAdd={onClickAdd}
        title={"Create List"}
      />
    </div>
  );
}

export default TicketHandling;
