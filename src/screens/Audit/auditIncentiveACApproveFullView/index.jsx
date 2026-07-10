import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { getAuditIncentiveSubmitDetails } from "../../../@app/entry/entrySlice";
import { Form, Button } from "antd";
import CustomTable from "../../../components/CustomTableNew";
import { column } from "./column";
import apis from "../../../api/entryApis";
import ConfirmOnExit from "../../../components/confirmOnExit/ConfirmOnExit";

import { Col, Card, Modal, Input } from "antd";
import messageToast from "../../../components/messageToast/messageToast";
import { useForm } from "react-hook-form";

export default function AuditIncentiveACApproveFormView({ setTopTitle }) {
  setTopTitle("Incentive - Outlet List");
  const {
    state: { data: defaultValue = {} }
  } = useLocation();
   const {TextArea} = Input;
  const [form] = Form.useForm();
 
  const currentDate = new Date();
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(currentDate.getDate() - 3);

  const [date, setDate] = useState();
  var changedate = new Date(); // today!
  var x = 5; // go back 5 days!
  changedate.setDate(changedate.getDate() - x);


  const onchangedate = (e) => {
    const newDate = e.target.value;
    setDate(newDate);
  };
  const navigate = useNavigate();
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [approveModal, setApproveModal] = useState({});
  const {
    gettingAuditIncentiveSubmitDetails,
    getAuditIncentiveSubmitDetailsResponse: { data: outletlist }
  } = useSelector((state) => {
    return state.entry;
  });
  const { handleSubmit } = useForm();


  const onFinish = () => {
    //setShowDialog(false);
    let submitted = {
      ...gridDatanew,
      sap_posting_date: date,
      ORL_code: state?.vendor_code,
      docID: state?.id,
      approved_by: userData.data?.id ?? "0",
      approve_remarks:approveModal?.data
      
    };
    setApproveModal(false);
    //setShowDialog(true);
     setLoading(true);
    apis.accPaymentRelease(submitted).then((res) => {
      if (res.data.status === 200) {
        setTimeout(() => {
          messageToast({
            message: res.data.statusText,
            statusText: res.data.statusText,
            title: "Incentive Payment Status"
          });
          navigate("/auditIncentiveACFinal");
        }, 2000);
      } else if (res.data.status === 300) {
        messageToast({
          message: res.data.statusText,
          statusText: res.data.statusText,
          title: "Not Initiate"
        });
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  };

  const gridDatanew = (outletlist ?? []).map((e) => {
    return {
      ...e,
      docID: e.id,
      outletID: e.outlet_id
    };
  });

  const { type, userData } = useSelector((state) => state.auth);
  const empId = userData.data?.id;

  const dispatch = useDispatch();
  useEffect(() => {
    if (type === 1)
      dispatch(
        getAuditIncentiveSubmitDetails({
          path: "get-incentive-process-details",
          data: {
            limit: 400,
            offset: 0,
            docID: state?.id,
            outletID: state?.outlet_id
          }
        })
      );
    else
      dispatch(
        getAuditIncentiveSubmitDetails({
          path: "get-incentive-process-details",
          data: { limit: 400, offset: 0,docID: state?.id, employee: empId }
        })
      );
  }, []);
  let divStyle = {
    color: "#34b1aa",
    fontWeight: "bold",
    fontSize: "20px",
    padding: "550px",
    width: "250px",
    height: "50px"
  };

  return (
    <>
      <ConfirmOnExit showModel={showDialog} />
      <Col md={{ span: 34 }} xs={{ span: 24 }}>
        <Card>
          {/* <Form.Item name='submit' label='Document No' style={{fontWeight:'bold',align:'center'}}>      */}
          <span style={divStyle}>
            Document No : {state?.payment_document_no}
          </span>
          {/* </Form.Item> */}
        </Card>
      </Col>
      <CustomTable
        dataSource={gridDatanew}       
        loading={loading || gettingAuditIncentiveSubmitDetails}
        column={column}
        // handleViewClick={handleViewClick}
        title={"Audit 2.0 Report"}
      />
      <div
        className="d-flex justify-content-center align-items-center "
        style={{ width: "100%", padding: "1px" }}
      >
        <Form.Item>
          <Button
            // disabled={savingAuditNewEntry}
            // onClick={handleSubmit(onFinish)}
            onClick={() => setApproveModal({ ...approveModal, show: true })}
            loading={loading}
            style={{
              backgroundColor: "#34b1aa",
              color: "white",
              marginRight: "6px",
              fontWeight: "bold"
            }}
            type="info"
            htmlType="button"
          >
            Submit
          </Button>
        </Form.Item>
      </div>
      {approveModal?.show && (
        <Modal
          title="Approve Remarks"
          open={approveModal?.show}
          onOk={handleSubmit(onFinish)}
          loading={loading}
          onCancel={() => setApproveModal({ ...approveModal, show: false })}
        >
          <Col md={{ span: 23 }} xs={{ span: 24 }}>
            <Form.Item
              name="sap_posting_date"
              rules={[{ required: true, message: "Select Posting Date" }]}
              label="Posting Date"
            >
              <Input
                type="date"
                selected={date}
                name="sap_posting_date"
                placeholder="Add From date"
                min={threeDaysAgo.toISOString().split('T')[0]} // Set the min date to 3 days ago
                max={currentDate.toISOString().split('T')[0]} // Set the max date to today
                onChange={onchangedate}
                value={date}
              />
            </Form.Item>
          </Col>
          <Form
            onFieldsChange={() => setShowDialog(true)}
            name="basic"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            initialValues={{
              approve_remarks: defaultValue?.approve_remarks
            }}
            onFinish={onFinish}
            autoComplete="off"
            form={form}
          >
            <Col md={{ span: 23 }} xs={{ span: 24 }}>
              <Form.Item
                name="approve_remarks"
                label="Remarks"
                rules={[{ required: true, message: "Select Remarks" }]}
              >
              
              </Form.Item>
            </Col>
          </Form>
          <TextArea 
                    rows={4} 
                    style={{resize: 'none'}} 
                    value={approveModal?.data || ''} 
                    onChange={(e) => setApproveModal({...approveModal, data: e.target.value})} />
        </Modal>
      )}
      </>
      ); 
              
    }
    