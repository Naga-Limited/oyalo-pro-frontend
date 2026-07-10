/* eslint-disable no-unused-vars */
/* eslint-disable-next-line no-unsafe-optional-chaining */
import { Button, Col, DatePicker, Image, Modal, Radio, Row } from "antd";
import Title from "antd/es/typography/Title";
import { format, parseISO } from "date-fns";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  getPettyCashClaimSubMSTickets,
  submitPCTickets,
} from "../../../@app/service/serviceSlice";
import CustomTable from "../../../components/CustomTable";
import messageToast from "../../../components/messageToast/messageToast";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import weekYear from "dayjs/plugin/weekYear";
import localeData from "dayjs/plugin/localeData";

dayjs.extend(customParseFormat);
dayjs.extend(weekday);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);
dayjs.extend(localeData);

const dateFormat = "YYYY/MM/DD";

function Pcaclaimsubmissionms() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [state, updateState] = useState({
    isOpen: false,
    title: "Title",
    pathfor_attachments: "",
    images: [],
  });
  const [selected, updateSelected] = useState([]);
  const [rangePicker, updateRangePicker] = useState([
    dayjs(format(new Date(), "yyyy/MM/dd"), dateFormat),
    dayjs(format(new Date(), "yyyy/MM/dd"), dateFormat),
  ]);

  const updatePicker = (date) => {
    updateRangePicker(date);
  };

  const openModal = (title, images = [], pathfor_attachments) => {
    updateState({ ...state, title, isOpen: true, images, pathfor_attachments });
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
    gettingPCClaimSubMS,
    getPCClaimSubMSResponse: { data, id },
    submittingPCTickets,
  } = useSelector((state) => {
    return state.service;
  });

  const handleTabClick = (e) => {
    if (e.target.value === "submitted") {
      navigate("/claimsubmission");
    } else if (e.target.value === "rejected") {
      navigate("/pcsubmissionRejected");
    }
  };

  const giveMeTotal = () => {
    let total = 0;
    if (data && selected.length > 0) {
      data?.forEach((_) => {
        if (selected.includes(_.ticket_no)) {
          total = total + parseFloat(_?.spend_amount ?? "0");
        }
      });
    }
    return total;
  };

  const handleUpdate = (rowInfo) => {
    navigate("/pcaclaimsubmissionms/view", {
      state: rowInfo,
    });
  };

  const submitTicket = () => {
    dispatch(
      submitPCTickets({
        data: {
          ticket_no: selected,
          document_no: id,
          requestee_name: data?.[0]?.assigned_to ?? "-",
          total_amount: giveMeTotal(),
        },
      })
    ).then(({ message, status, statusText }) => {
      messageToast({
        message: message ?? statusText,
        status,
        title: "Petty Cash Claim Submission - MS",
      });
      navigate("/claimsubmission");
    });
  };

  useEffect(() => {
    dispatch(getPettyCashClaimSubMSTickets(rangePicker));
  }, [dispatch, rangePicker]);

  let column = [
    { key: "1", headerName: "S.No", field: "S.No", hide: false, width: 70 },
    {
      key: "2",
      headerName: "Outlet Name",
      field: "outlet_name",
      hide: false,
      width: 300,
    },
    {
      key: "3",
      headerName: "Service Ticket No",
      field: "ticket_no",
      hide: false,
      width: 180,
    },
    {
      key: "4",
      headerName: "Ticket Creation Date",
      field: "created_at",
      hide: false,
      width: 180,
      // valueGetter: (params) =>
      //   format(parseISO(params.row.created_at), "dd-MM-yyyy hh:mm aa"),
      valueGetter: (params) =>
        format(parseISO(params.row.created_at), "dd-MM-yyyy"),
    },
    {
      key: "5",
      headerName: "Type of Issue",
      field: "type_of_issue",
      hide: false,
      width: 180,
    },
    {
      key: "6",
      headerName: "Amount",
      field: "spend_amount",
      hide: false,
      width: 180,
    },
    {
      key: "7",
      headerName: "Bill Copy",
      field: "quotation_copy",
      hide: false,
      width: 180,
      renderCell: (params) => (
        <Button
          type="link"
          color="primary"
          onClick={() =>
            openModal(
              "Quotation Copy",
              typeof params.row.quotation_copy !== "string"
                ? params.row?.quotation_copy
                : [],
              params.row?.pathfor_attachments
            )
          }>
          View
        </Button>
      ),
    },
    {
      key: "13",
      headerName: "Actions",
      field: "btnfields",
      hide: false,
      width: 180,
      renderCell: (params) => {
        return (
          <Button
            className="orangeFactory"
            onClick={() => handleUpdate(params.row)}>
            View
          </Button>
        );
      },
    },
    {
      key: "8",
      headerName: "Select",
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
      renderHeader: (params) => {
        return (
          <div>
            Select{" "}
            <input
              type="checkbox"
              checked={data?.length === selected.length}
              className="ms-2 mt-1"
              onClick={(e) => {
                if (e.target.checked) {
                  // updateSelected([...data?.map((e) => e.ticket_no)]);
                  let arr = [];
                    arr = data?.map((e) => e.ticket_no);
                    updateSelected([...arr]);
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
    <div className="h-screen apphide lasthide">
      <Row>
        <Col span={24}>
          <Radio.Group
            className=" p-4"
            buttonStyle="solid"
            onChange={handleTabClick}
            value={"submission"}>
            <Radio.Button value={"submission"}>Submission</Radio.Button>
            <Radio.Button value={"submitted"}>Submitted</Radio.Button>
            <Radio.Button value={"rejected"}>Rejected</Radio.Button>
          </Radio.Group>
          <DatePicker.RangePicker value={rangePicker} onChange={updatePicker} />
        </Col>
        <Col span={12}>
          {false && (
            <Title level={3} style={{ marginLeft: "16px" }}>
              Request Claim for: {id}
            </Title>
          )}
        </Col>
        <Col
          span={12}
          className="p-2 d-flex gap-2 align-items-center justify-content-end mt-3">
          <Title level={5}>{`Total: ${giveMeTotal()}`}</Title>
          <Button
            className="orangeFactory"
            loading={submittingPCTickets}
            onClick={() => submitTicket()}
            disabled={selected.length === 0}
            type="primary"
            htmlType="submit">
            Submit
          </Button>
        </Col>
      </Row>

      <CustomTable
        showHeader={false}
        dataSource={data}
        column={column}
        title={"Create List"}
        hideActionBtn={true}
        loading={gettingPCClaimSubMS}
      />
      <Modal
        title={state.title}
        open={state.isOpen}
        footer={null}
        onCancel={() => updateState({ ...state, isOpen: false })}>
        <Image.PreviewGroup>
          {state.images.map((_) => (
            <Image
            key=""
              width={100}
              src={`${state.pathfor_attachments.replace(/\\/g, "")}/${_}`}
            />
          ))}
        </Image.PreviewGroup>
      </Modal>
    </div>
  );
}

export default Pcaclaimsubmissionms;
