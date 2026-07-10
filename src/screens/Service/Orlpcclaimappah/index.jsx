/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import CustomTable from "../../../components/CustomTableReport";
import { useDispatch, useSelector } from "react-redux";
import { Input,  Button, Col, Row, Form, Select, Card } from "antd";
import { getPettyCashRequest } from "../../../@app/master/masterSlice";
import apis from "../../../api/stateAPI";
import messageToast from "../../../components/messageToast/messageToast";
import { getGlAccount } from "../../../@app/service/serviceSlice";

const { TextArea } = Input;

function Orlpcclaimappah() {
  const dispatch = useDispatch();
  const [selected, updateSelected] = useState([]);
  const {
     gettingPettyCashRequest,
     getPettyCashRequestResponse } = useSelector((state) => {
    return state.master;
  });

  let emp_date = localStorage.getItem("emp_code") || "";
  // window.location.reload():

  const {
    gettingGlAccount,
    getGlAccountResponse: { data: GLAccounts },
  } = useSelector((state) => {
    return state.service;
  });

  useEffect(() => {
    dispatch(
      getPettyCashRequest({ emp_code: emp_date, type: "Waiting @ AH Approval" })
    );
    dispatch(getGlAccount());
  }, []);

  const onChecked = (isChecked, id) => {
    if (!isChecked) {
      selected.splice(selected.indexOf(id), 1);
    } else {
      selected.push(id);
    }
    updateSelected([...selected]);
  };


  const SelectedAll = () => {
    updateSelected([...(data ?? []).map((_) => _.id)]);
  };

  const stringDivider = (str, width, spaceReplacer) => {
    if (str.length > width) {
      var p = width;   
      if (p > 0) {
        var left = str.substring(0, p);
        var right = str.substring(p + 1);
        return (
          left + spaceReplacer + stringDivider(right, width, spaceReplacer)
        );
      }
    }
    return str;
  };

  const data =
    getPettyCashRequestResponse?.length > 0
      ? (getPettyCashRequestResponse ?? []).map((e) => {
          let S_No = e.id;
          let OutletName = stringDivider(e?.outletName, 1, "<br/>\n");
          let Doc_No = e?.doc_no;
          let Claim_Amount = e?.request_amount;
          let Aging_Days = e?.aging_days;
          let Expense_Date = e.expense_date;       
          let ticketstatus = e?.status;
          let select = '<input type="checkbox" name="vehicle1" value="Bike">';       
     
          return {
            ...e,
            S_No,
            OutletName,

            Doc_No,
            Claim_Amount,
            Aging_Days,
            Expense_Date,
            ticketstatus,
            select,
          };
        })
      : [];


  const navigate = useNavigate();

  const onClickAdd = () => {
    navigate("/orlpcclaimappahForm");
  };

  const handleViewClick = (rowInfo) => {
   
    //orlpcclaimapparmForm
    navigate("/orlpcclaimapparmForm", {
      state: rowInfo,
    });
  };

  const paymentclick = (rowInfo) => {
    navigate("/paymentclick", {});
  };
  const [loading, setLoading] = useState(false);
  const handleApprove = () => {
    let data = { ids: selected, emp_code: emp_date, reqData: reqData };   
    apis.updatePettyCashRequestPut(data).then((res) => {
      if (res.data?.status === 200) {
          setLoading(true);
          messageToast({
          message: res?.data?.statusText,
          status: res?.data?.status,
          title: "Payment Request",
        });        
        navigate("/paymentclick");
        setLoading(false);
      } else {
        messageToast({
          message: res?.data?.message ??  res?.data?.statusText,
          status: res?.data.status,
          title: "Payment Request",
        });
      }
    });
  };

 
  const currentDate = new Date();
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(currentDate.getDate() - 3);


  var changedate = new Date(); // today!
  var x = 5; // go back 5 days!
  changedate.setDate(changedate.getDate() - x);

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

  let ApprvelObj = {};

  data?.map((e) => {
    ApprvelObj = { ...ApprvelObj, [e?.id]: e.request_amount };
  });

  const [reqData, setReqData] = useState({
    GLAccounts: {},
    ApprovelAmount: { ...ApprvelObj },
    paymentAmount: {},
    postDate: {},
  });

  const {
    gettingOutletMaster,
    getOutletMasterResponse: { data: dataSource },
  } = useSelector((state) => {
    return state.master;
  });

  const onSelectChange = () => {
    // eslint-disable-next-line no-console
   
  };


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
      headerName: "Emp Code",
      field: "employee_code",
      hide: false,
      width: 100,
    },
    {
      key: "4",
      headerName: "Emp Name",
      field: "emp_name",
      hide: false,
      width: 200,
    },
    {
      key: "5",
      headerName: "Vendor Code",
      field: "vendor_code",
      hide: false,
      width: 120,
    },
    {
      key: "3",
      headerName: "Doc No",
      field: "Doc_No",
      hide: false,
      width: 250,
    },
    {
      key: "4",
      headerName: "Claim Amount",
      field: "Claim_Amount",
      hide: false,
      width: 120,
    },   
    {
      key: "5",
      headerName: "GL Account",
      field: "gl_account",
      hide: false,
      width: 250,
      renderCell: (params) => {
        return (
          <Select
            style={{ width: "100%" }}
            loading={gettingGlAccount}
            onChange={(e) => {
              // console.log(e, "e");
              setReqData({
                ...reqData,
                GLAccounts: {
                  ...reqData.GLAccounts,
                  [params?.id]: e,
                },
              });
            }}
            placeholder={"GL Account"}
            options={GLAccounts?.map((_) => ({
              ..._,
              value: _.id,
              label: `${_.gl_code} - ${_.gl_description}`,
            }))}
            on
          />
        );
      },
    },
    {
      key: "6",
      headerName: "Approved Expense Amount",
      field: "spend_amounts",
      hide: false,
      width: 200,
      renderCell: (params) => {
        return (
          <Input
            type="number"
            value={reqData?.ApprovelAmount?.[params?.id]}
            onChange={(e) => {
              setReqData({
                ...reqData,
                ApprovelAmount: {
                  ...reqData.ApprovelAmount,
                  [params?.id]: e?.target.value,
                },
              });
            }}
          />
        );
      },
    },
    {
      key: "7",
      headerName: "Posting Date",
      field: "posting_date",
      hide: false,
      width: 200,
      renderCell: (params) => {
        return (
          <Input
             type="date"
            value={reqData?.postDate?.[params?.id]}
            onChange={(e) => {
              setReqData({
                ...reqData,
                postDate: {
                  ...reqData.postDate,
                  [params?.id]: e?.target.value,
                },
              });
            }}
            min={threeDaysAgo.toISOString().split('T')[0]} // Set the min date to 3 days ago
            max={currentDate.toISOString().split('T')[0]} // Set the max date to today          
          />
        );
      },
    },
    {
      key: "8",
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
      key: "9",
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
      key: "10",
      headerName: "Value",
      field: "amount",
      hide: false,
      width: 150,
      valueGetter: (params) => {     
        const amount = params.row.amount || '';
        return `${amount}`.trim(); // Combine and remove extra spaces
      }
    },    
    {
      key: "11",
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
            Select{" "}
            <input
              type="checkbox"
              checked={data?.length > 0 ? data?.length === selected.length : ""}
              className="ms-2 mt-1"
              onClick={(e) => {
                if (e.target.checked) {
                  SelectedAll();
                } else {
                  updateSelected([]);
                }
              }}
            />
          </div>
        );
      },
    },
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
              <Row gutter={[15, 0]}>
                <Col span={24}>
                  <Row
                    gutter={[15, 15]}
                    style={{ justifyContent: "flex-start" }}>
                    <Col
                      span={12}
                      className="d-flex align-items-center justify-content-start mt-3">
                      <Form.Item className="mx-2">
                        <Button htmlType="submit">
                          Petty Cash Expense Approval
                        </Button>
                      </Form.Item>
                      {/* </Col>
                    <Col span={12}> */}
                      <Form.Item>
                        <Button
                          className="orangeFactory"
                          onClick={paymentclick}>
                          Payment Process
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
             
              </Row>
            </Form>
          </Col>
        </Row>
      </Card>
      <CustomTable
        showHeader={false}
        showEdit={false}
        loading = {gettingPettyCashRequest}
        dataSource={data}
        column={column}
        handleViewClick={handleViewClick}
        onClickAdd={onClickAdd}
        title={"Approval List"}
      />
      <Col
        span={12}
        style={{ textAlign: "center" }}
        className="d-flex align-items-center justify-content-end mt-3">
        <Form.Item className="mx-2">
          <Button
            className="orangeFactory"
            loading={loading}
            type="primary"
            onClick={() => {
              handleApprove();
            }}
            htmlType="submit"
            disabled={selected?.length == 0}>
            Submit
          </Button>
        </Form.Item>
    
      </Col>
    </div>
  );
}

export default Orlpcclaimappah;
