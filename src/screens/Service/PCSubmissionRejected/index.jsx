/* eslint-disable no-unused-vars */
import { Button, Col, DatePicker, Image, Modal, Radio, Row } from "antd";
import Title from "antd/es/typography/Title";
import { format, parseISO } from "date-fns";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getPettyCashClaimRejectedMSTickets } from "../../../@app/service/serviceSlice";
import CustomTable from "../../../components/CustomTable";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const dateFormat = "YYYY/MM/DD";

function PCSubmissionRejected() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [state, updateState] = useState({
    isOpen: false,
    title: "Title",
    pathfor_attachments: "",
    images: [],
  });

  const openModal = (title, images = [], pathfor_attachments) => {
    updateState({ ...state, title, isOpen: true, images, pathfor_attachments });
  };

  const {
    gettingPCClaimRejecteddMS,
    getPCClaimRejectedMSResponse: { data },
  } = useSelector((state) => {
    return state.service;
  });

  const handleTabClick = (e) => {
    if (e.target.value === "submitted") {
      navigate("/claimsubmission");
    } else if (e.target.value === "submission") {
      navigate("/pcaclaimsubmissionms");
    }
  };

  const handleUpdate = (rowInfo) => {
    navigate("/PCSubmissionRejected/view", {
      state: rowInfo,
    });
  };

  useEffect(() => {
    dispatch(getPettyCashClaimRejectedMSTickets());
  }, [dispatch]);

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
      valueGetter: (params) =>
        format(parseISO(params.row.created_at), "dd-MM-yyyy hh:mm aa"),
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
              typeof params?.row?.quotation_copy !== "string"
                ? params?.row?.quotation_copy
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
    // {
    //   key: '8', headerName: 'Select', field: 'select', hide: false, width: 180, renderCell: (params) => {
    //     return <input type="checkbox" class="ms-2 mt-1" checked={selected.includes(params.row.ticket_no)} onClick={(e) => onChecked(e.target.checked, params.row.ticket_no)} />
    //   }, renderHeader: (params) => {
    //     return <div>
    //       Select <input type="checkbox" checked={data?.length === selected.length} class="ms-2 mt-1" onClick={(e) => {
    //         if (e.target.checked) {
    //           updateSelected([...data?.map(_ => _.ticket_no)]);
    //         } else {
    //           updateSelected([]);
    //         }
    //       }} />
    //     </div>;
    //   },
    // },
  ];
  return (
    <div className="h-screen apphide lasthide">
      <Row>
        <Col span={24}>
          <Radio.Group
            className=" p-4"
            buttonStyle="solid"
            onChange={handleTabClick}
            value={"rejected"}>
            <Radio.Button value={"submission"}>Submission</Radio.Button>
            <Radio.Button value={"submitted"}>Submitted</Radio.Button>
            <Radio.Button value={"rejected"}>Rejected</Radio.Button>
          </Radio.Group>
        </Col>
      </Row>

      <CustomTable
        showHeader={false}
        dataSource={data}
        column={column}
        title={"Create List"}
        hideActionBtn={true}
        loading={gettingPCClaimRejecteddMS}
      />
      <Modal
        title={state.title}
        open={state.isOpen}
        footer={null}
        onCancel={() => updateState({ ...state, isOpen: false })}>
        <Image.PreviewGroup>
          {state?.images?.map((_) => (
            <Image
            key="id"
              width={100}
              src={`${state?.pathfor_attachments.replace(/\\/g, "")}/${_}`}
            />
          ))}
        </Image.PreviewGroup>
      </Modal>
    </div>
  );
}

export default PCSubmissionRejected;
