/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getTicketsForMSPCClaimAppOH } from "../../../@app/service/serviceSlice";
import CustomTable from "../../../components/CustomTable";
import { format, parseISO } from "date-fns";
import { Button, Modal, Image } from "antd";

function Mspcclaimappah() {
  const dispatch = useDispatch();
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
    gettingTicketMSPCClaimAppOH: loading,
    getTicketMSPCClaimAppOHResponse: data,
  } = useSelector((state) => {
    return state.service;
  });

  useEffect(() => {
    dispatch(getTicketsForMSPCClaimAppOH());
  }, [dispatch]);

  const navigate = useNavigate();

  const onClickAdd = () => {
    navigate("/mspcclaimappohForm");
  };

  const handleViewClick = (rowInfo) => {
    navigate("/mspcclaimappohForm", {
      state: rowInfo,
    });
  };

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
      width: 200,
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
      headerName: "Request Amount",
      field: "spend_amount",
      hide: false,
      width: 180,
    },
    {
      key: "7",
      headerName: "Attachment",
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
  ];
  return (
    <div className="h-screen apphide">
      <CustomTable
        showHeader={false}
        // showEdit={false}
        dataSource={data}
        column={column}
        loading={loading}
        handleViewClick={handleViewClick}
        onClickAdd={onClickAdd}
        title={"Approval List"}
      />

      <Modal
        title={state.title}
        open={state.isOpen}
        footer={null}
        onCancel={() => updateState({ ...state, isOpen: false })}>
        <Image.PreviewGroup>
          {state.images.map((_) => (
            <Image
              width={100}
              key="id"
              src={`${state.pathfor_attachments.replace(/\\/g, "")}/${_}`}
            />
          ))}
        </Image.PreviewGroup>
      </Modal>
    </div>
  );
}

export default Mspcclaimappah;
