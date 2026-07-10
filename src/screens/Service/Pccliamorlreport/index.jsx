/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import CustomTable from "../../../components/CustomTable";
import { useDispatch, useSelector } from "react-redux";
import { Input, DatePicker, Button, Col, Row, Form, Select, Card,Collapse } from "antd";
import { includes } from "ramda";
// import {saveOutletMaster, getStates, getSubZonal, getZonal, updateOutletMaster, getCity} from '../../../@app/master/masterSlice';
// import {map} from 'ramda';
// import {useLocation, useNavigate} from 'react-router';
// import dayjs from 'dayjs';
// import messageToast from '../../../components/messageToast/messageToast';
// import {transStatus} from '../../../util/transStatus';
// import { Input } from 'antd';
// import {getFormData, CREATE_TICKET_FORM_DATA} from './createTicket.constants';
import favicon from "../../../asset/favicon.ico";
import { CaretRightOutlined } from "@ant-design/icons";
import {
  getOutletMaster,
  getPettyCashRequest,
  getSubZonal,
  getZonal,
} from "../../../@app/master/masterSlice";
import apis from "../../../api/stateAPI";

const { TextArea } = Input;

function Pccliamorlreport() {
  const dispatch = useDispatch();
  // const dispatch = useDispatch();
  const { Panel } = Collapse;
  const { Option } = Select;
  const apiCall = useRef(true);
  let userLog = parseInt(localStorage.getItem("type"));
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
  const [zones, setZones] = useState({});
  const [expense, setExpense] = useState({});
  const [subZones, setSubZones] = useState({});

  const navigate = useNavigate();

  const { getExpenseData, getPettyCashRequestResponse } = useSelector(
    (state) => {
      return state.master;
    }
  );
  let emp_date = localStorage.getItem("emp_code") || "";

  useEffect(() => {
    dispatch(getPettyCashRequest({ emp_code: emp_date }));
  }, []);

  const onClickAdd = () => {
    navigate("/pccliamorlreportForm");
  };

  const handleViewClick = (rowInfo) => {
    navigate("/pccliamorlreportForm", {
      state: rowInfo,
    });
  };

  const handleOnChange = () => {
    // eslint-disable-next-line no-console
   
  };

  const onFinish = (values) => {
  
    //  let data = {
    //    zone: values.zone,
    //    subZone: values.subZone,
    //    outlet: values.outlet,
    //    serviceFor: values.serviceFor,
    //    assetGroup: values.assetGroup,
    //    ticketStatus: values.ticketStatus,
    //    waitingAt: values.waitingAt,
    //    assignedTo: values.assignedTo,
    //    fromDate: values["fromDate"]?.format("YYYY-MM-DD"),
    //    toDate: values["toDate"]?.format("YYYY-MM-DD"),
    //  };

    //  let AssignedData = dataSource.find(
    //    (e) => e?.employee_code == values?.assignedTo
    //  );

    // console.log(AssignedData, "AssignedData");
    let string = {};
    //  if (values?.zone) {
    //    string += "zone_id=" + values?.zone;
    //  }
    //  if (values?.subZone) {
    //    string += "&subzone_id=" + values?.subZone;
    //  }
    //  if (values?.outlet) {
    //    string += "&outlet_id=" + values?.outlet;
    //  }
    //  if (values?.serviceFor) {
    //    string += "&service_for=" + values?.serviceFor;
    //  }
    //  if (values?.assetGroup) {
    //    string += "&asset_group=" + values?.assetGroup;
    //  }
    //  if (values?.assignedTo) {
    //    string += "&assigned_to=" + values?.assignedTo;
    //  }
    //  if (values?.ticketStatus) {
    //    string += "&ticket_status=" + values?.ticketStatus;
    //  }

    //  if (values?.waitingAt) {
    //    string += "&waiting=" + values?.waitingAt;
    //  }

    if (values?.Zone) {
      string.zone = values?.Zone;
    }
    if (values?.SubZone) {
      string.subzone = values?.SubZone;
    }
    if (values?.Outlet) {
      string.outlet = values?.Outlet;
    }

    if (values?.ExpenseType) {
      string.expense_type = values?.ExpenseType;
    }
    if (values?.Waiting) {
      string.waiting = values?.Waiting;
    }

    if (values?.FromDate) {
      string.from_date = values?.FromDate;
    }

    // console.log(values, "values?.ToDate");

    if (values?.ToDate) {
      string.to_date = values?.ToDate;
    }

    if (emp_date) {
      string.emp_code = emp_date;
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

    // const userInfo = { ...string };

      dispatch(getPettyCashRequest({ ...string }));
  };

  useEffect(() => {
    if (apiCall.current == true) {
      dispatch(getZonal());
      dispatch(getOutletMaster());
      dispatch(getSubZonal());
      getExpenseAPI();
      //   apiCall.current = false;
    }
    // eslint-disable-next-line
  }, []);

  const {
    gettingZonal,
    getZonalResponse: { data: dataZone },
    getSubZonalResponse: { data: dataSubZoneSource },
  } = useSelector((state) => {
    return state.subMaster;
  });

  const getExpenseAPI = () => {
    apis.getExpenseList().then(({ data }) => {
      setExpense(data?.data);
      // dispatch(authSlice.actions.setBadgeCount(data));
      // return data;
    });

    apis.getZonal().then(({ data }) => {
      const { data: zonal, ...rest } = data;

      setZones(zonal);
    });

    apis.getSubZonal().then(({ data }) => {
      const { data: subZonal, ...rest } = data;
      //  let tempArr = [];
      //  if (Array.isArray(zoneID)) {
      //    data?.data?.forEach((el) => {
      //      if (zoneID.includes(el.zonal_id)) {
      //        tempArr.push(el);
      //      }
      //    });
      //  } else {
      //    tempArr = filter(
      //      (e) => (zoneID ? e.zonal_id === zoneID : true),
      //      subZonal ? subZonal : []
      //    );
      //  }
      //  dispatch(
      //    masterSlice.actions.getSubZonalResponse({ data: tempArr, ...rest })
      //  );
      setSubZones(subZonal);
      //  return data;
    });
  };

  const {
    getOutletMasterResponse: { data: dataSource },
  } = useSelector((state) => {
    return state.master;
  });

  const onSelectChange = () => {
    // eslint-disable-next-line no-console

  };

  const dateFormat = ["DD/MM/YYYY", "DD/MM/YY"];

  //   useEffect( () => {
  //     dispatch( getOutletMaster() );
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [] );

  const data =
    getPettyCashRequestResponse?.length > 0
      ? (getPettyCashRequestResponse ?? []).map((e) => {
          let S_No = e.id;
          let Reqno = e.doc_no;
          let fino = e.fi_exp_doc_no;
          let fipaymentno = e.fi_payment_doc_no;
          let Reqamount = e?.request_amount;
          let Approvedamount = e?.approved_amount;
          let Status = "";
          if (e?.rejected_by == "OH Rejected") {
            Status = "OH Rejected";
          } else if (e?.rejected_by == "AH Rejected") {
            Status = "AH Rejected";
          } else {
            Status = e?.status;
          }

          // let to_date = format(new Date(e?.to_date), "dd/MM/yyyy");
          // let status =
          //   isPast(new Date(e?.from_date)) && isFuture(new Date(e?.to_date));
          return {
            ...e,
            S_No,
            Reqno,
            fino,
            fipaymentno,
            Reqamount,
            Approvedamount,
            Status,
          };
        })
      : [];

  // const data = [
  //   {
  //     "S.No": 1,
  //     Reqno: "CM-RQ-23-03-01-001",
  //     expensedate: "Pooja",
  //     Ticket_Number: "CM-PP-11-22-001",
  //     fino: "1800000125",
  //     fipaymentno: "1600000182",
  //     Reqamount: "500",
  //     Approvedamount: "200",
  //     Status: "Approved",
  //   },
  //   {
  //     "S.No": 2,
  //     Reqno: "CM-RQ-23-03-01-002",
  //     expensedate: "Pooja",
  //     Ticket_Number: "-",
  //     fino: "-",
  //     fipaymentno: "-",
  //     Reqamount: "1500",
  //     Approvedamount: "-",
  //     Status: "Waiting @ AH Approval",
  //   },
  //   {
  //     "S.No": 3,
  //     Reqno: "CM-RQ-23-03-01-003",
  //     expensedate: "Pooja",
  //     Ticket_Number: "-",
  //     fino: "-",
  //     fipaymentno: "-",
  //     Reqamount: "800",
  //     Approvedamount: "-",
  //     Status: "Waiting @ BH Approval",
  //   },
  //   {
  //     "S.No": 4,
  //     Reqno: "CM-RQ-23-03-01-004",
  //     expensedate: "Pooja",
  //     Ticket_Number: "-",
  //     fino: "-",
  //     fipaymentno: "-",
  //     Reqamount: "500",
  //     Approvedamount: "-",
  //     Status: "Waiting @ Backoffice Approval",
  //   },
  //   {
  //     "S.No": 5,
  //     Reqno: "CM-RQ-23-03-01-005",
  //     expensedate: "Pooja",
  //     Ticket_Number: "-",
  //     fino: "-",
  //     fipaymentno: "-",
  //     Reqamount: "500",
  //     Approvedamount: "-",
  //     Status: "Waiting @ ARM Approval",
  //   },
  // ];
  let column = [
    { key: "1", headerName: "S.No", field: "S.No", hide: false, width: 70 },
    {
      key: "2",
      headerName: "Request Doc No	",
      field: "Reqno",
      hide: false,
      width: 250,
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
      field: "outletName",
      hide: false,
      width: 250,
    },
    {
      key: "5",
      headerName: "FI Exp Doc No",
      field: "fi_exp_doc_no",
      hide: false,
      width: 180,
    },
    {
      key: "6",
      headerName: "FI Payment Doc No",
      field: "fipaymentno",
      hide: false,
      width: 180,
    },
    {
      key: "7",
      headerName: "Request Amount",
      field: "Reqamount",
      hide: false,
      width: 180,
    },
    {
      key: "8",
      headerName: "Approved Amount",
      field: "Approvedamount",
      hide: false,
      width: 180,
    },
    {
      key: "9",
      headerName: "Expense Type",
      field: "expense_type",
      hide: false,
      width: 250,
      valueGetter: (params) => {
        const expenseType = params.row.expense_type || '';       
        return `${expenseType}`.trim(); // Combine and remove extra spaces
      }
    },  
    {
      key: "10",
      headerName: "Remarks",
      field: "remark",
      hide: false,
      width: 250,
      valueGetter: (params) => {     
        const remarks = params.row.remark || '';
        return `${remarks}`.trim(); // Combine and remove extra spaces
      }
    },  
    {
      key: "11",
      headerName: "Value",
      field: "amount",
      hide: false,
      width: 150,
      valueGetter: (params) => {     
        const amounts = params.row.amount || '';
        
        if (Array.isArray(amounts)) {
          // If amounts is an array, join the elements with commas
          return amounts.join(', ').trim();
        } else {
          // If amounts is a single value, return it as a string
          return `${amounts}`.trim();
        }
      }
    },    
    {
      key: "12",
      headerName: "Status",
      field: "Status",
      hide: false,
      width: 300,
    },
  ]; 

  return (
    <div className="h-screen apphide appactionhide">
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
                {userLog == 1 && (
                  <>
                    <Col md={{ span: 6 }} xs={{ span: 24 }}>
                      <Form.Item name="Zone" label="Zone">
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
                          {zones?.length > 0 &&
                            zones?.map((el) => (
                              <Option key={el?.id} value={el?.id}>
                                {el?.zonal_name}
                              </Option>
                            ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col md={{ span: 6 }} xs={{ span: 24 }}>
                      <Form.Item name="SubZone" label="Sub Zone">
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
                          {subZones?.length > 0 &&
                            subZones?.map((el) => {
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
                      <Form.Item name="Outlet" label="Outlet">
                        <Select>
                          {dataSource?.map((el) => (
                            <Option key={el?.id} value={el?.id}>
                              {el?.name}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                  </>
                )}
                {/* <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item name="ExpenseType" label="Expense Type">
                    <Select>
                      {expense?.length > 0 &&
                        expense?.map((el) => (
                          <Option key={el?.id} value={el?.name}>
                            {el?.name}
                          </Option>
                        ))}
                    </Select>
                  </Form.Item>
                </Col> */}
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item name="Waiting" label="Waiting @">
                    <Select>
                    <Option value="Waiting @ Backoffice Approval">
                        Waiting @ Backoffice Approval
                      </Option>
                      <Option value="Waiting @ OH Approval">
                        Waiting @ OH Approval
                      </Option>
                    <Option value="Approved">
                    Approved
                      </Option>
                      <Option value="Cash Received">
                      Cash Received
                      </Option>
                      <Option value="Waiting @ AH Approval">
                        Waiting @ AH Approval
                      </Option>
                      <Option value="Waiting @ ARM">Waiting @ ARM</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item name="FromDate" label="From Date ">
                    <Input placeholder="" type="date" name="From Date " />
                  </Form.Item>
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item name="ToDate" label="To Date ">
                    <Input placeholder="" type="date" name="To Date " />
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
                {/*  */}

                {/* <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='Cash in Hand' label='Cash in Hand'>
                  <Input placeholder='1000' name='Cash in Hand' />
                  </Form.Item>
                </Col>
               
               
              

              
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='Yet to confirm by accounts ' label='Yet to confirm by accounts '>
                    <Input placeholder='3000' name='Yet to confirm by accounts ' />
                  </Form.Item>
                </Col> */}
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
        dataSource={data}
        column={column}
        hideActionBtn={true}
        // handleViewClick={handleViewClick}
        onClickAdd={onClickAdd}
        title={"Create List"}
      />
    </div>
  );
}

export default Pccliamorlreport;
