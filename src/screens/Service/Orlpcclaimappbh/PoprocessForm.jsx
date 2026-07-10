/* eslint-disable no-unused-vars */
import {
  Button,
  Col,
  Form,
  Image,
  Input,
  Modal,
  Select,
  Card,
  Descriptions,
  Popover,
  Space,
  Typography,
} from "antd";
import { InfoCircleTwoTone } from "@ant-design/icons";
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import {
  getGlAccount,
  rejectPCTicket,
} from "../../../@app/service/serviceSlice";
import CustomTable from "../../../components/CustomTable";
import apis from "../../../api/stateAPI";
import messageToast from "../../../components/messageToast/messageToast";

function OrlpcclaimappbhForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state: data } = useLocation();
  const [state, updateState] = useState({
    isOpen: false,
    infoPop: false,
    title: "Title",
    pathfor_attachments: "",
    images: [],
    dataInfo: {},
  });

  const [selected, updateSelected] = useState([]);
  const openModal = (title, images = [], pathfor_attachments) => {
    updateState({ ...state, title, isOpen: true, images, pathfor_attachments });
  };

  let ApprvelObj = {};

  data?.ticket.map((e) => {
    ApprvelObj = { ...ApprvelObj, [e?.ticket_no]: e.spend_amount };
  });

  console.log(ApprvelObj, "ApprvelObj");
  const [reqData, setReqData] = useState({
    GLAccounts: {},
    ApprovelAmount: { ...ApprvelObj },
    paymentAmount: {},
    postDate: {},
  });

  const openInfoModal = (items) => {
    updateState({
      ...state,
      infoPop: true,
      dataInfo: items,
    });
  };

  const onClickAdd = () => {
    navigate("/orlpcclaimapparmForm");
  };

  const handleViewClick = (rowInfo) => {
    navigate("/orlpcclaimapparmForm", {
      state: rowInfo,
    });
  };

  const onChecked = (isChecked, ticket_no) => {
    if (!isChecked) {
      selected.splice(selected.indexOf(ticket_no), 1);
    } else {
      selected.push(ticket_no);
    }
    updateSelected([...selected]);
  };

  const {
    rejectingPCTickets,
    rejectPCTicketResponse: { data: dataSource },
  } = useSelector((state) => {
    return state.service;
  });

  const {
    gettingGlAccount,
    getGlAccountResponse: { data: GLAccounts },
  } = useSelector((state) => {
    return state.service;
  });

  useEffect(() => {
    dispatch(getGlAccount());
  }, [dispatch]);

  // const SelectedAll = () => {  
  //   updateSelected([...data?.ticket?.map((_) => _.ticket_no)]);
  // };

  const SelectedAll = () => {  
    if (data && data.ticket) {
      updateSelected([...data.ticket.map((_) => _.ticket_no)]);
    }
  };

  const currentDate = new Date();
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(currentDate.getDate() - 3);

  // const [date, setDate] = useState();
  var changedate = new Date(); // today!
  var x = 5; // go back 5 days!
  changedate.setDate(changedate.getDate() - x);


  
  let column = [
    { key: "1", headerName: "S.No", field: "S.No", hide: false, width: 70 },
    {
      key: "2",
      headerName: "Document No",
      field: "Reqno",
      hide: false,
      width: 180,
      valueGetter: () => data.document_no,
    },
    {
      key: "3",
      headerName: "Outlet Name",
      field: "outlet_name",
      hide: false,
      width: 250,
    },
    {
      key: "4",
      headerName: "Service Ticket No",
      field: "ticket_no",
      hide: false,
      width: 200,
    },
    {
      key: "5",
      headerName: "Ticket Creation Date",
      field: "date",
      hide: false,
      width: 300,
    },
    {
      key: "6",
      headerName: "Type of Issue",
      field: "types_of_issue",
      hide: false,
      width: 200,
    },
    {
      key: "7",
      headerName: "Request Amount",
      field: "spend_amount",
      hide: false,
      width: 200,
    },
    {
      key: "8",
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
                  [params?.row?.ticket_no]: e,
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
      key: "10",
      headerName: "Approved Expense Amount",
      field: "spend_amounts",
      hide: false,
      width: 200,
      renderCell: (params) => {
        return (
          <Input
            type="number"
            value={reqData?.ApprovelAmount?.[params?.row?.ticket_no]}
            onChange={(e) => {
              setReqData({
                ...reqData,
                ApprovelAmount: {
                  ...reqData.ApprovelAmount,
                  [params?.row?.ticket_no]: e?.target.value,
                },
              });
            }}
          />
        );
      },
    },
    {
      key: "11",
      headerName: "Payment Amount",
      field: "payment_amount",
      hide: false,
      width: 200,
      renderCell: (params) => {
        return (
          <Input
            value={reqData?.paymentAmount?.[params?.row?.ticket_no]}
            type="number"
            onChange={(e) => {
              setReqData({
                ...reqData,
                paymentAmount: {
                  ...reqData.paymentAmount,
                  [params?.row?.ticket_no]: e?.target.value,
                },
              });
            }}
          />
        );
      },
    },
    {
      key: "12",
      headerName: "Posting Date",
      field: "posting_date",
      hide: false,
      width: 200,
      // renderCell: (params) => {
      //   return (
      //     <Input
      //       type="date"
      //       value={reqData?.postDate?.[params?.row?.ticket_no]}
      //       onChange={(e) => {
      //         setReqData({
      //           ...reqData,
      //           postDate: {
      //             ...reqData.postDate,
      //             [params?.row?.ticket_no]: e?.target.value,
      //           },
      //         });
      //       }}
      //     />
      //   );
      // },
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
      key: "13",
      headerName: "Action",
      field: "Action",
      hide: false,
      width: 180,
      renderCell: (params) => {
        return (
          <div>
            <Button
              className="orangeFactory btn"
              onClick={() => {
                openInfoModal(params?.row);
                // var asData = JSON.parse(params?.row?.quotation_copy);
                // openModal(
                //   "Quotation Copy",
                //   typeof asData !== "string" ? asData : [],
                //   params.row?.pathfor_attachments
                // );
              }}>
              View
            </Button>
            <Button
              className="orangeFactory btn"
              loading={rejectingPCTickets}
              style={{ marginLeft: "8px" }}
              onClick={() => {
                dispatch(
                  rejectPCTicket(
                    { data: { ticket_no: params.row.ticket_no } },
                    () => {
                      navigate(-1);
                    }
                  )
                );
              }}>
              Reject
            </Button>
          </div>
        );
      },
    },
    {
      key: "14",
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
            checked={selected.includes(params.row.ticket_no)}
            onClick={(e) => onChecked(e.target.checked, params.row.ticket_no)}
          />
        );
      },
      renderHeader: () => {
        return (
          <div>
            Select{" "}
            <input
              type="checkbox"
              checked={data?.ticket?.length === selected.length}
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

  const submitReq = () => {
    if (selected?.length == 0) {
      messageToast({
        message: "Please select altleast One item",
        status: 400,
        title: "Petty cash request",
      });
      return;
    }
    let reqdata = { ticket_details: reqData, selected: selected, data: data };
    apis.updateSapPaymentQuotation(reqdata).then((res) => {
      if (res?.data?.status === 200) {
        navigate("/mspcclaimappah");
        messageToast({
          message: res?.data?.message ?? res?.data?.statusText,
          status: res?.data?.status,
          title: "Payment Request",
        });
      } else {
        messageToast({
          message: res?.data?.message ?? "Something went wrong",
          status: res?.data?.status,
          title: "Payment Request",
        });
      }
    });
  };

  // console.log(reqData, "state?.reqData");

  return (
    <div className="h-screen apphide lasthide">
      <CustomTable
        showHeader={false}
        // showEdit={false}
        dataSource={data?.ticket ?? []}
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
            type="primary"
            htmlType="submit"
            onClick={submitReq}>
            Approved
          </Button>
        </Form.Item>
      </Col>
      <Modal
        title={state.title}
        open={state.isOpen}
        footer={null}
        onCancel={() => updateState({ ...state, isOpen: false })}>
        <Image.PreviewGroup>
          {state?.images?.map((_) => (
            <Image
            key=""
              width={100}
              src={`${data?.pathfor_attachments?.replace(/\\/g, "")}/${_}`}
            />
          ))}
        </Image.PreviewGroup>
      </Modal>

      <Modal
        // title={"ticket Info"}
        className="ant-modal-ant-modal"
        open={state.infoPop}
        footer={null}
        onCancel={() => updateState({ ...state, infoPop: false })}>
        <Card>
          <Descriptions title="Ticket Info" bordered size="small">
            <Descriptions.Item label={"Ticket No"}>
              {state?.dataInfo?.ticket_no ?? "-"}
            </Descriptions.Item>
            <Descriptions.Item label={"Ticket Description"}>
              {state?.dataInfo?.problem_description ?? "-"}
            </Descriptions.Item>
            <Descriptions.Item label={"Service For"}>
              {state?.dataInfo?.service_for ?? "-"}
            </Descriptions.Item>
            <Descriptions.Item label={"Asset Group"}>
              {state?.dataInfo?.asset_group ?? "-"}
            </Descriptions.Item>
            <Descriptions.Item label={"Asset"}>
              <Space align="center">
                <Typography>{state?.dataInfo?.asset_details ?? "-"}</Typography>
                {/* <Popover
                  content={"Click to see the service history of this asset."}
                  title="Service History">
                  <InfoCircleTwoTone
                    onClick={showModal}
                    style={{ marginBottom: "4px", cursor: "pointer" }}
                  />
                </Popover> */}
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label={"ORL Name"}>
              {state?.dataInfo?.orl_name ?? "-"}
            </Descriptions.Item>
            <Descriptions.Item label={"ORL Number"}>
              {state?.dataInfo?.contact_no ?? "-"}
            </Descriptions.Item>
            <Descriptions.Item label={"Assigned To"}>
              {state?.dataInfo?.assigned_to ?? "-"}
            </Descriptions.Item>
            <Descriptions.Item label={"Contact No"}>
              {state?.dataInfo?.phone_no ?? "-"}
            </Descriptions.Item>
            <Descriptions.Item label={"Status"}>
              {state?.dataInfo?.ticket_status ?? "-"}
            </Descriptions.Item>
            <Descriptions.Item label={"Vendor Type"}>
              {state?.dataInfo?.vendor_type ?? "-"}
            </Descriptions.Item>
            <Descriptions.Item label={"Employee Name"}>
              {state?.dataInfo?.vendor_type === "Internal"
                ? state?.dataInfo?.employee_name?.name
                : state?.dataInfo?.vendor_name}
            </Descriptions.Item>
            <Descriptions.Item label={"Contact No"}>
              {state?.dataInfo?.vendor_type === "Internal"
                ? state?.dataInfo?.employee_name?.contact
                : state?.dataInfo?.vendor_contact_no}
            </Descriptions.Item>
            <Descriptions.Item label={"Workdone"}>
              {state?.dataInfo?.workdone ?? "-"}
            </Descriptions.Item>
            <Descriptions.Item label={"Spare"}>
              {state?.dataInfo?.spare_id ?? "-"}
            </Descriptions.Item>
            <Descriptions.Item label={"Estimated Amount Rs"}>
              {state?.dataInfo?.spend_amount ?? "-"}
            </Descriptions.Item>
            <Descriptions.Item label={"Existing Spare Photo"}>
              {state?.dataInfo.existing_photo ? (
                <Button
                  type="link"
                  color="primary"
                  onClick={() =>
                    openModal(
                      "Existing Spare Photo",
                      state?.dataInfo?.existing_photo ?? []
                    )
                  }>
                  View
                </Button>
              ) : (
                "-"
              )}
            </Descriptions.Item>
            <Descriptions.Item label={"New Spare Photo"}>
              {state?.dataInfo.new_photo ? (
                <Button
                  type="link"
                  color="primary"
                  onClick={() =>
                    openModal(
                      "New Spare Photo",
                      state?.dataInfo?.new_photo ?? []
                    )
                  }>
                  View
                </Button>
              ) : (
                "-"
              )}
            </Descriptions.Item>
            <Descriptions.Item label={"Document Copy"}>
              {state?.dataInfo.document_copy ? (
                <Button
                  type="link"
                  color="primary"
                  onClick={() =>
                    openModal(
                      "Document Copy",
                      state?.dataInfo?.document_copy ?? []
                    )
                  }>
                  View
                </Button>
              ) : (
                "-"
              )}
            </Descriptions.Item>
            <Descriptions.Item label={"Tentative Date"}>
              {state?.dataInfo?.tentative_date ?? "-"}
            </Descriptions.Item>
            <Descriptions.Item label={"Cost Involved"}>
              {state?.dataInfo?.cost_involved ?? "-"}
            </Descriptions.Item>
            <Descriptions.Item label={"Mode of Payment"}>
              {state?.dataInfo?.payment_mode ?? "-"}
            </Descriptions.Item>
            <Descriptions.Item label={"Advance Amount"}>
              {parseInt(state?.dataInfo?.spend_amount ?? 0) *
                (parseFloat(state?.dataInfo?.advance_percentage ?? 0) / 100)}
            </Descriptions.Item>
            <Descriptions.Item label={"Advance %"}>
              {state?.dataInfo?.advance_percentage ?? "-"}
            </Descriptions.Item>
            <Descriptions.Item label={"Quotation"}>
              {state?.dataInfo?.quotation ?? "-"}
            </Descriptions.Item>
            <Descriptions.Item label={"Quotation No"}>
              {state?.dataInfo?.quotation_no ?? "-"}
            </Descriptions.Item>
            <Descriptions.Item label={"Quotation Copy"}>
              {state?.dataInfo.quotation_copy ? (
                <Button
                  type="link"
                  color="primary"
                  onClick={() => {
                    var asData = JSON.parse(state?.dataInfo?.quotation_copy);
                    openModal(
                      "Quotation Copy",
                      typeof asData !== "string" ? asData : []
                    );
                  }}>
                  View Copies
                </Button>
              ) : (
                "-"
              )}
            </Descriptions.Item>
            {/* <Descriptions.Item label={"Spend Amount"}>{state?.dataInfo?.spend_amount ?? "-"}</Descriptions.Item> */}
            <Descriptions.Item label={"Issue Closed"}>
              {state?.dataInfo?.issue_closed ?? "-"}
            </Descriptions.Item>
          </Descriptions>

          {/* <Space style={{ marginTop: 8 }}>
            <Button
              type="primary"
              disabled={!isApproveLoading && updatingOHTicketStatus}
              loading={isApproveLoading && updatingOHTicketStatus}
              onClick={() => updateStatus(true)}>
              Approve
            </Button>
            <Button
              type="primary"
              disabled={isApproveLoading && updatingOHTicketStatus}
              loading={!isApproveLoading && updatingOHTicketStatus}
              danger
              onClick={() => updateStatus(false)}>
              Reject
            </Button>
          </Space> */}
        </Card>
        {/* <Image.PreviewGroup>
          {state?.images?.map((_) => (
            <Image
              width={100}
              src={`${state.pathfor_attachments.replace(/\\/g, "")}/${_}`}
            />
          ))}
        </Image.PreviewGroup> */}
      </Modal>
    </div>
  );
}

export default memo(OrlpcclaimappbhForm);
