/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import CustomTable from "../../../components/CustomTable";
import { useDispatch, useSelector } from "react-redux";
import { Input, DatePicker, Button, Col, Row, Form, Select, Card, Image } from "antd";
import { includes } from "ramda";
import {
  getEmployeeMaster,
  getOutletMaster,
  getPettyCashRequest,
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

function Pcclaimreqorl() {
  const dispatch = useDispatch();
  const { Option } = Select;

  const [selected, updateSelected] = useState([]);
  const [inhand, setInHand] = useState(0);
  const [cashDetails, setCashDetails] = useState({});
  const [outletName, setOutletName] = useState("");
  const [employee, setEmployee] = useState({});

  const [emp_date, setEmpdate] = useState(
    localStorage.getItem("emp_code") || ""
  );

  const [yetConfirm, setYetConfirm] = useState(0);
  const [receiptConfirm, setReceiptConfirm] = useState(0);
  const { getExpenseData, getPettyCashRequestResponse } = useSelector(
    (state) => {
      return state.master;
    }
  );

  let userLog = parseInt(localStorage.getItem("type"));

  const handleFormSubmit = () => {
    let data = [];
    getExpenseData.map((e) => {
      if (selected.includes(e?.id)) {
        data.push(e);
      }
    });

     apis.updatePettyCashRequest({ data }).then((res) => {
       if (res.data?.status === 200) {
        messageToast({
          message: res?.data?.statusText,
          status: res?.data?.status,
          title: "Payment Request",
        });

        // let emp_date = localStorage.getItem("emp_code") || "";
        // window.location.reload():
        dispatch(getPettyCashRequest({ emp_code: emp_date }));
        window.location.reload();
      } else {
        messageToast({
          message: res?.data?.message ?? "Something went wrong",
          status: res?.data.status,
          title: "Payment Request",
        });
      }
      // console.log("res");
      // if (res.data?.status === 200) {
      //   let bal =
      //     Number(res?.data?.data?.balance_amount) +
      //     Number(res?.data?.payment?.approval_amount);
      //   // let Amount = { unapproveAmount: res?.data?.data };
      //   // setCashDetails({ ...data[0], ...Amount });
      //   dispatch(getPaymentRequest());
      //   const newData = {
      //     ...cashDetails,
      //     approval_amount: 0,
      //     emp_balance_amount: bal,
      //   };
      //   setCashDetails(newData);
      //   messageToast({
      //     message: res?.data?.statusText,
      //     status: res?.data?.status,
      //     title: "Payment Request",
      //   });
      //   getBalanceDetails();
      // } else {
      //   messageToast({
      //     message: res?.data?.message ?? "Something went wrong",
      //     status: res?.data.status,
      //     title: "Payment Request",
      //   });
      // }
    });
  };
  // console.log(getPettyCashRequestResponse, "getPettyCashRequestResponse");

  useEffect(() => {
    dispatch(getPettyCashRequest({ emp_code: emp_date }));
    getBalanceDetails(emp_date);
    dispatch(getOutletMaster());
    dispatch(getEmployeeMaster());
  }, [emp_date]);

  const onChecked = (isChecked, id) => {
    if (!isChecked) {
      selected.splice(selected.indexOf(id), 1);
    } else {
      selected.push(id);
    }
    updateSelected([...selected]);
  };

  // const SelectedAll = () => {
  //   updateSelected([...getExpenseData?.map((_) => _.id)]);
  // };

  const SelectedAll = () => {
    if (getExpenseData) {
      updateSelected([...getExpenseData.map((_) => _.id)]);
    }
  };

  let url = process.env.REACT_APP_API_BASE_URL;
  url = url.replace("api/", "");

  const data =
    getPettyCashRequestResponse?.length > 0
      ? (getPettyCashRequestResponse ?? []).map((e) => {
          let S_No = e.id;
          let Doc_No = e.doc_no;
          let Expense_Type = e.expense_type;
          let Remarks = e.remark;
          let FIExpDocNo = e.fi_exp_doc_no;
          let FIPaymentDocNo = e.fi_payment_doc_no;
          let Request_Amount = e?.request_amount;
          let Approved_Amount = e?.approved_amount;
          let Status = "";
          if (e?.rejected_by == "OH Rejected") {
            Status = "OH Rejected";
          } else if (e?.rejected_by == "AH Rejected") {
            Status = "AH Rejected";
          } else {
            Status = e?.status;
          }
          let Petty_Cash_Request_Status = Status;

          // if (e?.status == "approved") {
          //   Petty_Cash_Request_Status += `<Button class="orangeFactory ms-2 text-white"  type="primary" htmlType="submit"> Cash Received </Button>`;
          // }
          // let to_date = format(new Date(e?.to_date), "dd/MM/yyyy");
          // let status =
          //   isPast(new Date(e?.from_date)) && isFuture(new Date(e?.to_date));
          return {
            ...e,
            S_No,
            Doc_No,
            Expense_Type,
            FIExpDocNo,
            Remarks,
            FIPaymentDocNo,
            Request_Amount,
            Approved_Amount,
            Status,
            Petty_Cash_Request_Status,
          };
        })
      : [];

  //console.log(data, "data");

  // const data = [
  //   {
  //     "S.No": 1,
  //     Doc_No: "CM-RQ-23-03-01-001",
  //     FIExpDocNo: "1800000125",
  //     FIPaymentDocNo: " 1600000182	",
  //     Request_Amount: " 8000	",
  //     Approved_Amount: " 8000	",
  //     Status: "Approved",
  //     btnfields:
  //       '<div class="my-2"> <button class="orangeFactory btn  p-2 "  type="primary"> Received </button></div>',
  //   },
  //   {
  //     "S.No": 2,
  //     Doc_No: "CM-RQ-23-03-01-001",
  //     FIExpDocNo: "1800000125",
  //     FIPaymentDocNo: " 1600000182	",
  //     Request_Amount: " 8000	",
  //     Approved_Amount: " 8000	",
  //     Status: "	Waiting @ AH Approval",
  //   },
  // ];

  const data1 = (getExpenseData ?? []).map((e) => {
    let S_No = e.id;
    let Expense_Date = e.expense_date;
    let Expense_Type = e.expense_type;
    let Request_Amount = e?.amount;
    let Reason = e?.remarks;
    let status = e?.status;
    let select = '<input type="checkbox" name="vehicle1" value="Bike">';
    let Bill_Copy = "";
    if (e?.bill_copy?.length > 0) {
      e?.bill_copy?.forEach(function (item, index) {
        let imgeURl = url + `public/storage/app/public/tickets/` + item;
         Bill_Copy +=
          imgeURl
          ;
      });
    }

    return {
      ...e,
      S_No,
      Expense_Date,
      Expense_Type,
      Request_Amount,
      Reason,
      Bill_Copy,
      select,
      status,
    };
  });

  let total = false;
  let totalAmount = 0;

  getExpenseData?.map((e) => {
    if (e?.remarks?.includes("Total")) {
      total = true;
    }
    totalAmount += Number(e?.amount);
  });

  if (getExpenseData?.length > 0 && !total) {
    data1.push({
      "S.No": "",
      Expense_Date: "",
      Expense_Type: "",
      Reason: "Total",
      Request_Amount: totalAmount,
      Bill_Copy: "-",
      select: "-",
    });
  }
  // const data1 = [
  //   {
  //     "S.No": 1,
  //     Expense_Date: "14-Nov-2022",
  //     Expense_Type: "Petrol",
  //     Reason: "Genset Usage	",
  //     Request_Amount: "300",
  //     Bill_Copy: "-",
  //     select: '<input type="checkbox" name="vehicle1" value="Bike">',
  //   },
  //   {
  //     "S.No": 2,
  //     Expense_Date: "14-Nov-2022",
  //     Expense_Type: "Petrol",
  //     Reason: "Genset Usage	",
  //     Request_Amount: "300",
  //     btnfi: '<button class="orangeFactory">Reject</button>',
  //     select: '<input type="checkbox" name="vehicle1" value="Bike">',
  //   },
  //   {
  //     "S.No": "",
  //     Expense_Date: "",
  //     Expense_Type: "",
  //     Reason: "Total",
  //     Request_Amount: "1000",
  //     Bill_Copy: "",
  //     select: '<input type="checkbox" name="vehicle1" value="Bike">',
  //   },
  // ];
  const navigate = useNavigate();

  const onClickAdd = () => {
    navigate("/PcclaimreqorlForm");
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

  const {
    gettingOutletMaster,
    getEmployeeMappingResponse: { data: employeeMapping = [] },
    getOutletMasterResponse: { data: dataSource },
  } = useSelector((state) => {
    return state.master;
  });

  const {
    gettingEmployeMaster,
    getEmployeeMasterResponse: { data: dataExployeeSource },
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
  let column = [
    { key: "1", headerName: "S.No", field: "S.No", hide: false, width: 70 },
    {
      key: "2",
      headerName: "Outlet Name",
      field: "outletName",
      hide: false,
      width: 250,
    },
    {
      key: "3",
      headerName: "Doc No	",
      field: "Doc_No",
      hide: false,
      width: 300,
    },
    {
      key: "4",
      headerName: "FI Exp Doc No",
      field: "FIExpDocNo",
      hide: false,
      width: 180,
    },
    {
      key: "5",
      headerName: "FI Payment Doc No",
      field: "FIPaymentDocNo",
      hide: false,
      width: 180,
    },
    {
      key: "6",
      headerName: "Request Amount",
      field: "Request_Amount",
      hide: false,
      width: 180,
    },
    {
      key: "7",
      headerName: "Approved Amount	",
      field: "Approved_Amount",
      hide: false,
      width: 180,
    },
    {
      key: "8",
      headerName: "Status",
      field: "Status",
      hide: false,
      width: 180,
    },
   
    {
      key: "9",
      headerName: "Expense Type",
      field: "Expense_Type",
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
      field: "Remarks",
      hide: false,
      width: 250,
      valueGetter: (params) => {
        const Remarks = params.row.Remarks || '';       
        return `${Remarks}`.trim(); // Combine and remove extra spaces
      }
    },

    {
      key: "11",
      headerName: "Value",
      field: "amount",
      hide: false,
      width: 250,
      valueGetter: (params) => {
        const amount = params.row.amount || '';       
        return `${amount}`.trim(); // Combine and remove extra spaces
      }
    },
    {
      key: "12",
      headerName: "Action",
      field: "btnfields",
      hide: false,
      width: 180,
      renderCell: (params) => {
        return <div dangerouslySetInnerHTML={{ __html: params.value }}></div>;
      },
    },
  ];
  let column1 = [
    { key: "1", headerName: "S.No", field: "S.No", hide: false, width: 70 },
    {
      key: "2",
      headerName: "Expense Date",
      field: "Expense_Date",
      hide: false,
      width: 300,
    },
    {
      key: "3",
      headerName: "Expense Type",
      field: "Expense_Type",
      hide: false,
      width: 180,
    },
    {
      key: "4",
      headerName: "Reason",
      field: "Reason",
      hide: false,
      width: 250,
    },
    {
      key: "5",
      headerName: "Request Amount",
      field: "Request_Amount",
      hide: false,
      width: 200,
    },
    {
      key: "6",
      headerName: "Bill Copy",
      field: "Bill_Copy",
      hide: false,
      width: 180,
      renderCell: (params) => {
        return  <Image
        style={{ paddingLeft: "10px" }}
        width={50}
        src={params.value} />;
      },
    },

    {
      key: "8",
      headerName:
        'Select <input type="checkbox" class="ms-2 mt-1" name="vehicle1" value="Bike">',
      field: "select",
      hide: false,
      width: 180,
      renderCell: (params) => {
        return (
          <input
            type="checkbox"
            className="ms-2 mt-1"
            checked={selected.includes(params.id)}
            onClick={(e) => onChecked(e.target.checked, params.id)}
          />
        );
      },
      renderHeader: () => {
        return (
          <div>
              <input
              type="checkbox"
              checked={
                getExpenseData?.length > 0
                  ? getExpenseData?.length === selected.length
                  : ""
              }
              className="ms-2 mt-1"
              onClick={(e) => {
                if (e.target.checked) {
                  SelectedAll();
                } else {
                  updateSelected([]);
                }
              }}
            />
             Select{" "}

          </div>
        );
      },
    },
  ];

  const getBalanceDetails = (emp_date) => {
    // let emp_date = localStorage.getItem("emp_code") || "";

    let submitted = {
      emp_id: emp_date,
    };

    apis.getPettyBalRequest(submitted).then((res) => {
      if (res.data?.status === 200) {
        setInHand(res.data.balance_amount);
        setYetConfirm(res.data.yet_confirm);
        setReceiptConfirm(res.data.receipt_confirm);
        setOutletName(res.data.outletName);
      } else {
        // messageToast({
        //   message: res?.data?.message ?? "Something went wrong",
        //   status: res?.data.status,
        //   title: "Payment Request",
        // });
      }
    });
  };

  const handleCashReceive = (Row) => {
    let submitted = {
      id: Row?.id,
      status: "Cash Received",
    };
    apis.updatePettyCashRequestData(submitted).then((res) => {
      if (res.data?.status === 200) {
        messageToast({
          message: res?.data?.statusText,
          status: res?.data?.status,
          title: "Payment Request",
        });
        getBalanceDetails(emp_date);
        dispatch(getPettyCashRequest({ emp_code: emp_date }));
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
    <>
      <div className="h-screen apphide lasthide ">
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
                    <Form.Item
                      name="name"
                      label="Outlet Name"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your outlet name",
                        },
                      ]}>
                      {userLog != 1 ? (
                        <Input
                          placeholder={outletName}
                          name="name"
                          disabled
                          value={outletName}
                        />
                      ) : (
                        <Select
                        allowClear
                          onSelect={(e) => {
                            let orl_emp_id = dataSource.find(
                              (e1) => e1?.id == e
                            );

                            let emp_code = dataExployeeSource?.find(
                              (e) => e?.id == parseInt(orl_emp_id?.orl_id)
                            );
                            setEmpdate(emp_code?.employee_code);
                          }}>
                          {dataSource?.map((el) => (
                            <Option key={el?.id} value={el?.orl_emp_id}>
                              {el?.name}
                            </Option>
                          ))}
                        </Select>
                      )}
                    </Form.Item>
                  </Col>
                  <Col md={{ span: 6 }} xs={{ span: 24 }}>
                    <Form.Item name="Cash in Hand" label="Cash in Hand">
                      <Input
                        placeholder={
                          cashDetails?.emp_balance_amount
                            ? cashDetails?.emp_balance_amount
                            : inhand
                        }
                        disabled
                        name="Cash in Hand"
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
                            : receiptConfirm
                        }
                        disabled={true}
                        name="name"
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
                        disabled
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
          dataSource={data}
          column={column}
          title={"Payment Create List"}
          handleCashReceive={handleCashReceive}
          // handleViewClick={handleViewClick}
          // onClickAdd={onClickAdd}
        />
      </div>
      <div className="h-screen lasthide addonly">
        <CustomTable
          showHeader={false}
          showEdit={false}
          dataSource={data1}
          column={column1}
          handleViewClick={handleViewClick}
          onClickAdd={onClickAdd}
          title={"Create List"}
        />
        <Col
          span={12}
          style={{ textAlign: "right" }}
          className="d-flex align-items-center justify-content-end mt-3">
          <Form.Item className="mx-2">
            <Button
              className="orangeFactory"
              type="primary"
              onClick={() => {
                handleFormSubmit();
              }}
              disabled={selected.length > 0 ? false : true}
              htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Col>
      </div>
    </>
  );
}

export default Pcclaimreqorl;
