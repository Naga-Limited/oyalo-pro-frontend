/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import CustomTable from "../../../components/CustomTable";
import { Input, Button, Col, Row, Form, Select, Card,Collapse } from "antd";
import {
  getEmployeeMaster,
  getPaymentRequest,
} from "../../../@app/master/masterSlice";
import { useDispatch, useSelector } from "react-redux";
import { CaretRightOutlined } from "@ant-design/icons";
// import {saveOutletMaster, getStates, getSubZonal, getZonal, updateOutletMaster, getCity} from '../../../@app/master/masterSlice';
// import {map} from 'ramda';
// import {useLocation, useNavigate} from 'react-router';
// import dayjs from 'dayjs';
// import messageToast from '../../../components/messageToast/messageToast';
// import {transStatus} from '../../../util/transStatus';
// import { Input } from 'antd';
// import {getFormData, CREATE_TICKET_FORM_DATA} from './createTicket.constants';

function Mspcrequestreport() {
  const dispatch = useDispatch();
  const { Option } = Select;
  const { Panel } = Collapse;
  const navigate = useNavigate();

  const {
    gettingPaymentRequest,
    getPaymentRequestResponse: { data: dataSource },
  } = useSelector((state) => {
    return state.master;
  });

  useEffect(() => {
    dispatch(getPaymentRequest());
    dispatch(getEmployeeMaster());


  }, []);

  const gridData = (dataSource ?? []).map((e) => {

    let S_No = e.id;
    let request_doc_no = e.doc_no;
    let fi_payment_doc_no = e.payment_doc_no;
    let request_amount = e?.request_amount;
    let request_date = e?.date;
    let approved_amount = e?.approval_amount;
    let Status = "";
    if (e?.rejected_by == "OH Rejected") {
      Status = "OH Rejected";
    } else if (e?.rejected_by == "AH Rejected") {
      Status = "AH Rejected";
    } else {
      Status = e?.status;
    }

    // let Petty_Cash_Request_Status = status;

    // if (e?.status == "approved") {
    //   Petty_Cash_Request_Status += `<Button class="orangeFactory ms-2 text-white"  type="primary" htmlType="submit"> Cash Received </Button>`;
    // }
    // let to_date = format(new Date(e?.to_date), "dd/MM/yyyy");
    // let status =
    //   isPast(new Date(e?.from_date)) && isFuture(new Date(e?.to_date));
    return {
      ...e,
      S_No,
      request_doc_no,
      fi_payment_doc_no,
      request_amount,
      request_date,
      approved_amount,
      Status,
    };
  });

  const onClickAdd = () => {
    navigate("/pccliamorlreportForm");
  };

  // const {
  //   getOutletMasterResponse: {data: dataSource}
  // } = useSelector((state) => {
  //   return state.master;
  // });

  const onSelectChange = () => {
    // eslint-disable-next-line no-console

  };

  //   useEffect( () => {
  //     dispatch( getOutletMaster() );
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [] );

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
    let string = "";
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

    if (values?.FromDate) {
      string += "from_date=" + values?.FromDate;
    }

    if (values?.ToDate) {
      string += "&to_date=" + values?.ToDate;
    }
    if (values?.Waiting) {
      string += "&waiting=" + values?.Waiting;
    }
    dispatch(
      getPaymentRequest({
        type: string,
      })
    );

  };

  const data = [
    {
      "s.no": "1",
      request_doc_no: "AD-RQ-23-03-01-001",
      request_date: "01-03-2023",
      fi_payment_doc_no: "1600000182",
      request_amount: "500",
      approved_amount: "200",
      status: "Cash Received",
    },
    {
      "s.no": "2",
      request_doc_no: "AD-RQ-23-03-02-002",
      request_date: "02-03-2023",
      fi_payment_doc_no: "1600000183",
      request_amount: "800",
      approved_amount: "800",
      status: "Waiting @ Receipt Confirmation",
    },
    {
      "s.no": "3",
      request_doc_no: "AD-RQ-23-03-03-003",
      request_date: "03-03-2023",
      fi_payment_doc_no: "-",
      request_amount: "1500",
      approved_amount: "-",
      status: "Waiting @ AH Approval",
    },
    {
      "s.no": "4",
      request_doc_no: "AD-RQ-23-03-04-004",
      request_date: "04-03-2023",
      fi_payment_doc_no: "-",
      request_amount: "500",
      approved_amount: "-",
      status: "Waiting @ OH Approval",
    },
    {
      "s.no": "5",
      request_doc_no: "AD-RQ-23-03-05-005",
      request_date: "05-03-2023",
      fi_payment_doc_no: "-",
      request_amount: "500",
      approved_amount: "-",
      status: "Waiting @ AH Approval",
    },
    {
      "s.no": "6",
      request_doc_no: "AD-RQ-23-03-06-006",
      request_date: "06-03-2023",
      fi_payment_doc_no: "-",
      request_amount: "500",
      approved_amount: "-",
      status: "Ah Rejected",
    },
    {
      "s.no": "7",
      request_doc_no: "AD-RQ-23-03-07-007",
      request_date: "07-03-2023",
      fi_payment_doc_no: "-",
      request_amount: "1000",
      approved_amount: "-",
      status: "OH Rejected",
    },
    {
      "s.no": "8",
      request_doc_no: "AD-RQ-23-03-07-007",
      request_date: "07-03-2023",
      fi_payment_doc_no: "-",
      request_amount: "1000",
      approved_amount: "-",
      status: "OH Rejected",
    },
  ];
  let column = [
    { key: "1", headerName: "S.No", field: "S_No", hide: false, width: 70 },
    {
      key: "2",
      headerName: "Request doc no	",
      field: "request_doc_no",
      hide: false,
      width: 300,
    },
    {
      key: "3",
      headerName: "Request date",
      field: "request_date",
      hide: false,
      width: 300,
    },
    {
      key: "4",
      headerName: "FI Payment Doc No",
      field: "fi_payment_doc_no",
      hide: false,
      width: 300,
    },
    {
      key: "5",
      headerName: "Request Amount",
      field: "request_amount",
      hide: false,
      width: 180,
    },
    {
      key: "6",
      headerName: "Approved Amount",
      field: "approved_amount",
      hide: false,
      width: 300,
    },
    {
      key: "7",
      headerName: "Status",
      field: "Status",
      hide: false,
      width: 180,
    },
  ];
  return (
    <div className="h-screen apphide appactionhide lasthide">
      <Card>
      <Collapse
                bordered={false}
                expandIcon={({ isActive }) => (
                  <CaretRightOutlined rotate={isActive ? 90 : 0} />
                )}>
                <Panel header="Show Filters" key="1">
                  <section>
                    {" "}
        <Row>
          <Col span={24}>
            <Form
              name="basic"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              onValuesChange={onSelectChange}
              // onFinishFailed={onFinishFailed}
              onFinish={onFinish}
              autoComplete="off"
              // form={form}
            >
              <Row gutter={[15, 0]}>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item name="Waiting" label="Waiting @">
                    <Select>
                    <Option value="Waiting @ OH Approval">
                        Waiting @ OH Approval
                      </Option>
                      <Option value="Approved">
                      Approved
                      </Option>
                      <Option value="Waiting @ AH Approval">
                        Waiting @ AH Approval
                      </Option>
                      <Option value="Cash Received">Cash Received</Option>
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
            </Form>
          </Col>
        </Row>
        </section>
        </Panel>
        </Collapse>
      </Card>
      <CustomTable
        showHeader={false}
        showEdit={false}
        dataSource={gridData}
        column={column}
        hideActionBtn={true}
        // handleViewClick={handleViewClick}
        onClickAdd={onClickAdd}
        title={"Approval List"}
      />
    </div>
  );
}

export default Mspcrequestreport;
