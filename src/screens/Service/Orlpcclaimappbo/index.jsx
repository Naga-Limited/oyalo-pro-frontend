/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import CustomTable from "../../../components/CustomTable";
import { useDispatch, useSelector } from "react-redux";
import { Input, Col, Row, Form, Card } from "antd";

import { getPettyCashRequest } from "../../../@app/master/masterSlice";

const { TextArea } = Input;

function Orlpcclaimappbo() {
  const dispatch = useDispatch();

  const { getPettyCashRequestResponse } = useSelector((state) => {
    return state.master;
  });

  let emp_date = localStorage.getItem("emp_code") || "";
  useEffect(() => {
    dispatch(
      getPettyCashRequest({ emp_code: emp_date, type: "Waiting @ Back Office" })
    );
  }, []);

  const data =
    getPettyCashRequestResponse?.length > 0
      ? (getPettyCashRequestResponse ?? []).map((e) => {
          let S_No = e.id;
          let Name = "";
          let Doc_No = e.doc_no;
          let Claim_Amount = e.request_amount;
          let Aging_Days = e.aging_days;
          let ticketstatus = e?.status;
          return {
            ...e,
            S_No,
            Name,
            Doc_No,
            Claim_Amount,
            Aging_Days,
            ticketstatus,
          };
        })
      : [];
 

  const navigate = useNavigate();

  const onClickAdd = () => {
    navigate("/orlpcclaimapparmForm");
  };

  const handleViewClick = (rowInfo) => {
    navigate("/orlpcclaimapparmForm", {
      state: rowInfo,
    });
  };

  const handleOnChange = () => {
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
  };

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
    { key: "2", headerName: "outletName", field: "outletName", hide: false, width: 300 },
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
      width: 150,
    },
    {
      key: "6",
      headerName: "Doc No",
      field: "Doc_No",
      hide: false,
      width: 240,
    },
    {
      key: "7",
      headerName: "Claim Amount",
      field: "Claim_Amount",
      hide: false,
      width: 250,
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
      headerName: "Aging Days",
      field: "Aging_Days",
      hide: false,
      width: 100,
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
            </Form>
          </Col>
        </Row>
      </Card>
      <CustomTable
        showHeader={false}
        showEdit={false}
        dataSource={data}
        column={column}
        handleViewClick={handleViewClick}
        onClickAdd={onClickAdd}
        title={"Approval List"}
      />
    </div>
  );
}

export default Orlpcclaimappbo;
