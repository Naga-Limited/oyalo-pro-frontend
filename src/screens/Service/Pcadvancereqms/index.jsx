/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import CustomTable from "../../../components/CustomTable";
import { useDispatch, useSelector } from "react-redux";
import { Input, DatePicker, Button, Col, Row, Form, Select, Card } from "antd";
import { includes } from "ramda";
import {
  cancelpaymentRequest,
  getEmployeeMaster,
  getPaymentRequest,
  savePaymentRequest,
} from "../../../@app/master/masterSlice";
import messageToast from "../../../components/messageToast/messageToast";
import apis from "../../../api/stateAPI";
// import {saveOutletMaster, getStates, getSubZonal, getZonal, updateOutletMaster, getCity} from '../../../@app/master/masterSlice';
// import {map} from 'ramda';
// import {useLocation, useNavigate} from 'react-router';
// import dayjs from 'dayjs';
// import messageToast from '../../../components/messageToast/messageToast';
// import {transStatus} from '../../../util/transStatus';
// import { Input } from 'antd';
// import {getFormData, CREATE_TICKET_FORM_DATA} from './createTicket.constants';

const { TextArea } = Input;

function Pcadvancereqms() {
  const dispatch = useDispatch();
  const [cashDetails, setCashDetails] = useState({});

  const {
    gettingPaymentRequest,
    getPaymentRequestResponse: { data: dataSource },
  } = useSelector((state) => {
    return state.master;
  });
  const [inhand, setInHand] = useState(0);

  const [yetConfirm, setYetConfirm] = useState(0);
  const [receiptConfirm, setReceiptConfirm] = useState(0);

  // const {
  //   gettingPaymentRequest,
  //   getPaymentRequestResponse: { data: dataSource },
  // } = useSelector((state) => {
  //   return state.master;
  // });

  const handleEditClick = (e) => {
    navigate("/pcadvancereqms/pcadvancereqmsEdit", {
      state: { e, isEdit: true },
    });
  };
  const handleCancelRequest = (e) => {
    let submitted = {
      doc_no: e?.doc_no,
      date: new Date(),
    };

    apis.cancelPaymentRequest(submitted).then((res) => {
      if (res.data?.status === 200) {
        dispatch(getPaymentRequest());
        messageToast({
          message: res?.data?.statusText,
          status: res?.data?.status,
          title: "Payment Request",
        });
        getBalanceDetails();
      } else {
        messageToast({
          message: res?.data?.message ?? "Something went wrong",
          status: res?.data.status,
          title: "Payment Request",
        });
      }
    });
  };

  const handleClickBack = () => {
    navigate("/pcadvancereqms");
  };

  const getBalanceDetails = () => {
    let emp_date = localStorage.getItem("emp_code") || "";

    let submitted = {
      emp_id: emp_date,
    };

    apis.getBalRequest(submitted).then((res) => {
      if (res.data?.status === 200) {
        setInHand(res.data.balance_amount);
        setYetConfirm(res.data.yet_confirm);
        setReceiptConfirm(res.data.receipt_confirm);
        // dispatch(getPaymentRequest());
        // messageToast({
        //   message: res?.data?.statusText,
        //   status: res?.data?.status,
        //   title: "Payment Request",
        // });
      } else {
        // messageToast({
        //   message: res?.data?.message ?? "Something went wrong",
        //   status: res?.data.status,
        //   title: "Payment Request",
        // });
      }
    });
  };

  useEffect(() => {
    dispatch(getPaymentRequest());
    dispatch(getEmployeeMaster());
    getBalanceDetails();

  }, []);

  const gridData = (dataSource ?? []).map((e) => {
    let S_No = e.id;
    let type = e.type;
    let Doc_No = e.doc_No;
    let SAP_Accounting_Exp_Doc_No = e.payment_doc_no;
    let Request_Amount = e?.request_dmount;
    let Approved_Amount = e?.approval_amount;
    let status = "";
    if (e?.rejected_by == "OH Rejected") {
      status = "OH Rejected";
    } else if (e?.rejected_by == "AH Rejected") {
      status = "AH Rejected";
    } else {
      status = e?.status;
    }

    let Petty_Cash_Request_Status = status;

    if (e?.status == "approved") {
      Petty_Cash_Request_Status += `<Button class="orangeFactory ms-2 text-white"  type="primary" htmlType="submit"> Cash Received </Button>`;
    }
    // let to_date = format(new Date(e?.to_date), "dd/MM/yyyy");
    // let status =
    //   isPast(new Date(e?.from_date)) && isFuture(new Date(e?.to_date));
    return {
      ...e,
      S_No,
      type,
      Doc_No,
      SAP_Accounting_Exp_Doc_No,
      Request_Amount,
      Approved_Amount,
      Petty_Cash_Request_Status,
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
    console.log("onChange");
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
    console.log("change");
  };

  const dateFormat = ["DD/MM/YYYY", "DD/MM/YY"];

  //   useEffect( () => {
  //     dispatch( getOutletMaster() );
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [] );
  let column = [
    { key: "1", headerName: "S.No", field: "S_No", hide: false, width: 70 },
    {
      key: "2",
      headerName: "Type",
      field: "type",
      hide: false,
      width: 250,
    },
    {
      key: "",
      headerName: "Doc No	",
      field: "doc_no",
      hide: false,
      width: 250,
    },
    {
      key: "3",
      headerName: "Payment Doc No",
      field: "SAP_Accounting_Exp_Doc_No",
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
      headerName: "Approved Amount	",
      field: "approval_amount",
      hide: false,
      width: 280,
    },
    {
      key: "6",
      headerName: "Petty Cash Request Status",
      field: "Petty_Cash_Request_Status",
      hide: false,
      width: 300,
      renderCell: (params) => {
        return <div dangerouslySetInnerHTML={{ __html: params.value }}></div>;
      },
    },
  ];
  const returnData = (data) => {
    if (data[0]?.Petty_Cash_Request_Status == "Approved") {
      setCashDetails(data[0]);

      let submitted = {
        emp_id: data[0]?.emp_id,
        date: new Date(),
      };

      apis.getEmployeeUnapproveAmount(submitted).then((res) => {
        if (res.data?.status === 200) {
          let Amount = { unapproveAmount: res?.data?.data };
          setCashDetails({ ...data[0], ...Amount });
          getBalanceDetails();
        } else {
          messageToast({
            message: res?.data?.message ?? "Something went wrong",
            status: res?.data.status,
            title: "Payment Request",
          });
        }
      });
    } else {
      setCashDetails({});
    }
  };

  const handleCashReceive = (Row) => {
    let submitted = {
      emp_id: Row?.emp_id,
      id: Row?.id,
    };
    apis.updatePaymentApprove(submitted).then((res) => {
        if (res.data?.status === 200) {
        let bal =
          Number(res?.data?.data?.balance_amount) +
          Number(res?.data?.payment?.approval_amount);
        // let Amount = { unapproveAmount: res?.data?.data };
        // setCashDetails({ ...data[0], ...Amount });
        dispatch(getPaymentRequest());

        const newData = {
          ...cashDetails,
          approval_amount: 0,
          emp_balance_amount: bal,
        };
        setCashDetails(newData);
        messageToast({
          message: res?.data?.statusText,
          status: res?.data?.status,
          title: "Payment Request",
        });
        getBalanceDetails();
      } else {
        messageToast({
          message: res?.data?.message ?? "Something went wrong",
          status: res?.data.status,
          title: "Payment Request",
        });
      }
    });
  };

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
                    <Input
                      placeholder={
                        cashDetails?.emp_balance_amount
                          ? cashDetails?.emp_balance_amount
                          : inhand
                      }
                      name="Cash in Hand"
                      disabled
                      // value={inhand}
                    />
                  </Form.Item>
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item
                    name="Receipt Confirmation"
                    label="Receipt Confirmation">
                    <Input
                      placeholder={
                        cashDetails?.approval_amount
                          ? cashDetails?.approval_amount
                          : 0
                      }
                      name="Receipt Confirmation"
                      //value={cashDetails?.request_amount}
                      disabled
                    />
                  </Form.Item>
                </Col>

                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item
                    name="Yet to confirm by accounts "
                    label="Yet to confirm by accounts ">
                    <Input
                      placeholder={
                        cashDetails?.unapproveAmount
                          ? cashDetails?.unapproveAmount
                          : yetConfirm
                      }
                      name="Yet to confirm by accounts "
                      disabled
                      // value={yetConfirm}
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
        showEdit={true}
        dataSource={gridData}
        hideActionBtn={false}
        column={column}
        handleViewClick={handleViewClick}
        onClickAdd={onClickAdd}
        handleEditClick={handleEditClick}
        title={"Payment Create List"}
        handleCancelRequest={handleCancelRequest}
        handleClickBack={handleClickBack}
        returnData={returnData}
        handleCashReceive={handleCashReceive}
      />
    </div>
  );
}

export default Pcadvancereqms;
