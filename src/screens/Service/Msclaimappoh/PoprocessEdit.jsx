/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import CustomTable from "../../../components/CustomTable";
import { useDispatch, useSelector } from "react-redux";
import { Input, DatePicker, Button, Col, Row, Form, Select, Card } from "antd";
import { includes } from "ramda";
import {
  getEmployeeMaster,
  getPaymentAHRequest,
  getPaymentRequest,
} from "../../../@app/master/masterSlice";
import apis from "../../../api/stateAPI";
import messageToast from "../../../components/messageToast/messageToast";
// import {saveOutletMaster, getStates, getSubZonal, getZonal, updateOutletMaster, getCity} from '../../../@app/master/masterSlice';
// import {map} from 'ramda';
// import {useLocation, useNavigate} from 'react-router';
// import dayjs from 'dayjs';
// import messageToast from '../../../components/messageToast/messageToast';
// import {transStatus} from '../../../util/transStatus';
// import { Input } from 'antd';
// import {getFormData, CREATE_TICKET_FORM_DATA} from './createTicket.constants';

const { TextArea } = Input;

function Pcadvancereqmsah() {
  const dispatch = useDispatch();

  const {
    gettingPaymentAHRequest,
    getPaymentAHRequestResponse: { data: dataSource },
  } = useSelector((state) => {
    return state.master;
  });


  // const {
  //   gettingPaymentRequest,
  //   getPaymentRequestResponse: { data: dataSource },
  // } = useSelector((state) => {
  //   return state.master;
  // });

  useEffect(() => {
    dispatch(getPaymentAHRequest());
    dispatch(getEmployeeMaster());
  //  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const gridData = (dataSource ?? []).map((e) => {
    let S_No = e.id;
    let emp_name = e.emp_name;
    let doc_No = e.doc_No;
    // let SAP_Accounting_Exp_Doc_No = e.payment_doc_no;
    let Request_Amount = e?.request_dmount;
    let Approval_amount = e?.approval_amount;
    let date = e?.date;
    let ago = e?.date;
    // let to_date = format(new Date(e?.to_date), "dd/MM/yyyy");
    // let status =
    //   isPast(new Date(e?.from_date)) && isFuture(new Date(e?.to_date));
    return {
      ...e,
      S_No,
      emp_name,
      doc_No,
      Request_Amount,
      Approval_amount,
      date,
      ago,
    };
  });

 

  // const data = [
  //   {
  //     "S.No": 1,
  //     Doc_No: "AD-RQ-23-03-01-003	",
  //     SAP_Accounting_Exp_Doc_No: "10000590002",
  //     Request_Amount: " 8000	",
  //     Approved_Amount: " 8000	",
  //     Petty_Cash_Request_Status: "Waiting @ AH Approval",
  //   },
  //   {
  //     "S.No": 2,
  //     Doc_No: "AD-RQ-23-03-01-003	",
  //     SAP_Accounting_Exp_Doc_No: "10000590002",
  //     Request_Amount: " 8000	",
  //     Approved_Amount: " 8000	",
  //     Petty_Cash_Request_Status:
  //       'Approved  <Button class="orangeFactory ms-2 text-white" type="primary" htmlType="submit"> Cash Received </Button>',
  //   },
  // ];

  const navigate = useNavigate();

  const onClickAdd = () => {
    navigate("/pcadvancereqmsform");
  };

  const handleViewClick = (rowInfo) => {
    navigate("/pcadvancereqmsform", {
      state: rowInfo,
    });
  };

  const handleOnChange = () => {
    // eslint-disable-next-line no-console
   
  };

  const onClickhandleReject = (row) => {
    let submitted = {
      doc_no: row.doc_no,
      isApprove: false,
    };

    apis.postPaymentOHRequest(submitted).then((res) => {
      if (res.status === 200) {
        dispatch(getPaymentAHRequest());
        messageToast({
          message: res?.message ?? res?.statusText,
          status: res?.status,
          title: "Payment Request",
        });
      } else {
        messageToast({
          message: res?.message ?? "Something went wrong",
          status: res?.data.status,
          title: "Payment Request",
        });
      }
    });

    //  setShowDialog(false);
    //  setApiError("");
    //  // dayjs(formatDate(data.startDate), viewDateFormat);
    //  let from_date = lightFormat(new Date(data.startDate), "yyyy-MM-dd");
    //  let to_date = lightFormat(new Date(data.endDate), "yyyy-MM-dd");

    //  let submitted = {
    //    id: formData.id,
    //    total_mark: data?.total_marks,
    //    from_date: from_date || state?.from_date,
    //    to_date: to_date || state?.to_date,
    //  };
    //  setLoading(true);

    //  apis.updateAuditPointMark(submitted).then((res) => {
    //    if (res.data.status === 200) {
    //      navigate("/auditPointMarks");
    //    } else {
    //      setApiError(res?.data?.message ?? "Something went wrong");
    //      setLoading(false);
    //    }
    //  });
  };
  const onClickhandleApproval = (row) => {
    let submitted = {
      doc_no: row.doc_no,
      isApprove: true,
    };

    apis.postPaymentOHRequest(submitted).then((res) => {
      if (res.status === 200) {
        dispatch(getPaymentAHRequest());
        messageToast({
          message: res?.message ?? res?.statusText,
          status: res?.status,
          title: "Payment Request",
        });
      } else {
        messageToast({
          message: res?.message ?? "Something went wrong",
          status: res?.data.status,
          title: "Payment Request",
        });
      }
    });
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
  };

  const onSelectChange = () => {
    // eslint-disable-next-line no-console
    
  };

  let column = [
    { key: "1", headerName: "S.No", field: "S_No", hide: false, width: 70 },
    {
      key: "2",
      headerName: "Name",
      field: "emp_name",
      hide: false,
      width: 250,
    },
    {
      key: "3",
      headerName: "Doc No",
      field: "doc_no",
      hide: false,
      width: 240,
    },
    {
      key: "4",
      headerName: "Request Amount	",
      field: "request_amount",
      hide: false,
      width: 180,
    },
    {
      key: "5",
      headerName: "Approval amount",
      field: "Approval_amount",
      hide: false,
      width: 100,
    },
    {
      key: "5",
      headerName: "Posted Date",
      field: "date",
      hide: false,
      width: 100,
    },
  ];
  return (
    <div className="h-screen mstable addonly  appactionhide">
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
              <Row gutter={[15, 0]}>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item name="Cash in Hand" label="Cash in Hand">
                    <Input placeholder="1000" name="Cash in Hand" />
                  </Form.Item>
                </Col>

                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item
                    name="Yet to confirm by accounts "
                    label="Yet to confirm by accounts ">
                    <Input
                      placeholder="3000"
                      name="Yet to confirm by accounts "
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Card>
      <CustomTable
        showHeader={false}
        showEdit={false}
        dataSource={gridData}
        column={column}
        handleViewClick={handleViewClick}
        onClickAdd={onClickAdd}
        title={"Payment_request_oh"}
        onClickhandleApproval={onClickhandleApproval}
        onClickhandleReject={onClickhandleReject}
      />
    </div>
  );
}

export default Pcadvancereqmsah;
