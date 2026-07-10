/* eslint-disable no-unused-vars */
import { Button, Card, Descriptions, Image, Modal, Typography, Space, Popover } from 'antd';
import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { getAssetHistoryBasedOnOutlet, updateOHTicketStatus } from '../../../@app/service/serviceSlice';
import messageToast from '../../../components/messageToast/messageToast';
import { InfoCircleTwoTone } from '@ant-design/icons';
import { format, parseISO } from 'date-fns';
import { DataGrid } from '@mui/x-data-grid';

function PCClaimSubmissionView() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state: ticketInfo } = useLocation();
  const [state, updateState] = useState({ isOpen: false, title: "Title", images: [] });
  const { updatingOHTicketStatus, gettingAssetHistory, getAssetHistoryResponse } = useSelector((state) => state.service);
  const [isApproveLoading, setApproveLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const openModal = (title, images) => {
    updateState({ ...state, title, isOpen: true, images })
  };

  const updateStatus = (isApprove) => {
    setApproveLoading(isApprove);
    dispatch(updateOHTicketStatus({ data: { ticket_no: ticketInfo.ticket_no, isApprove } })).then(
      ({ message, status, statusText }) => {
        messageToast({ message: message ?? statusText, status, title: 'Ticket Status Updated' });
        if (status === 200) {
          navigate('/poprocessappoh');
        }
      }
    );
  };

  useEffect(() => {
    dispatch(getAssetHistoryBasedOnOutlet({ asset_id: ticketInfo.asset, outlet_code: ticketInfo.outlet_code }))
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <Card>
        <Descriptions title="Ticket Info" bordered size='small' >
          <Descriptions.Item label={"Ticket No"}>{ticketInfo?.ticket_no ?? "-"}</Descriptions.Item>
          <Descriptions.Item label={"Ticket Description"}>{ticketInfo?.problem_description ?? "-"}</Descriptions.Item>
          <Descriptions.Item label={"Service For"}>{ticketInfo?.service_for ?? "-"}</Descriptions.Item>
          <Descriptions.Item label={"Asset Group"}>{ticketInfo?.asset_group ?? "-"}</Descriptions.Item>
          <Descriptions.Item label={"Asset"}>
            <Space align='center'>
              <Typography>
                {ticketInfo?.asset_details ?? "-"}
              </Typography>
              <Popover content={"Click to see the service history of this asset."} title='Service History'>
                <InfoCircleTwoTone onClick={showModal} style={{ marginBottom: "4px", cursor: "pointer", }} />
              </Popover>
            </Space>
          </Descriptions.Item>
          <Descriptions.Item label={"ORL Name"}>{ticketInfo?.orl_name ?? "-"}</Descriptions.Item>
          <Descriptions.Item label={"ORL Number"}>{ticketInfo?.contact_no ?? "-"}</Descriptions.Item>
          <Descriptions.Item label={"Assigned To"}>{ticketInfo?.assigned_to ?? "-"}</Descriptions.Item>
          <Descriptions.Item label={"Contact No"}>{ticketInfo?.phone_no ?? "-"}</Descriptions.Item>
          <Descriptions.Item label={"Status"}>{ticketInfo?.ticket_status ?? "-"}</Descriptions.Item>
          <Descriptions.Item label={"Vendor Type"}>{ticketInfo?.vendor_type ?? "-"}</Descriptions.Item>
          <Descriptions.Item label={"Employee Name"}>{ticketInfo.vendor_type === "Internal" ? ticketInfo.employee_name.name : ticketInfo.vendor_name}</Descriptions.Item>
          <Descriptions.Item label={"Contact No"}>{ticketInfo.vendor_type === "Internal" ? ticketInfo.employee_name.contact : ticketInfo.vendor_contact_no}</Descriptions.Item>
          <Descriptions.Item label={"Workdone"}>{ticketInfo?.workdone ?? "-"}</Descriptions.Item>
          <Descriptions.Item label={"Spare"}>{ticketInfo?.spare_id ?? "-"}</Descriptions.Item>
          <Descriptions.Item label={"Estimated Amount Rs"}>{ticketInfo?.spend_amount ?? "-"}</Descriptions.Item>
          <Descriptions.Item label={"Existing Spare Photo"}>{ticketInfo.existing_photo ? <Button type='link' color='primary' onClick={() => openModal("Existing Spare Photo", ticketInfo?.existing_photo ?? [])} >View</Button> : "-"}</Descriptions.Item>
          <Descriptions.Item label={"New Spare Photo"}>{ticketInfo.new_photo ? <Button type='link' color='primary' onClick={() => openModal("New Spare Photo", ticketInfo?.new_photo ?? [])} >View</Button> : "-"}</Descriptions.Item>
          <Descriptions.Item label={"Document Copy"}>{ticketInfo.document_copy ? <Button type='link' color='primary' onClick={() => openModal("Document Copy", ticketInfo?.document_copy ?? [])} >View</Button> : "-"}</Descriptions.Item>
          <Descriptions.Item label={"Tentative Date"}>{ticketInfo?.tentative_date ?? "-"}</Descriptions.Item>
          <Descriptions.Item label={"Cost Involved"}>{ticketInfo?.cost_involved ?? "-"}</Descriptions.Item>
          <Descriptions.Item label={"Mode of Payment"}>{ticketInfo?.payment_mode ?? "-"}</Descriptions.Item>
          <Descriptions.Item label={"Advance Amount"}>{parseInt(ticketInfo?.spend_amount ?? 0) * (parseFloat(ticketInfo?.advance_percentage ?? 0) / 100)}</Descriptions.Item>
          <Descriptions.Item label={"Advance %"}>{ticketInfo?.advance_percentage ?? "-"}</Descriptions.Item>
          <Descriptions.Item label={"Quotation"}>{ticketInfo?.quotation ?? "-"}</Descriptions.Item>
          <Descriptions.Item label={"Quotation No"}>{ticketInfo?.quotation_no ?? "-"}</Descriptions.Item>
          <Descriptions.Item label={"Quotation Copy"}>{ticketInfo.quotation_copy ? <Button type='link' color='primary' onClick={() => openModal("Quotation Copy", ticketInfo?.quotation_copy ?? [])} >View Copies</Button> : "-"}</Descriptions.Item>
          {/* <Descriptions.Item label={"Spend Amount"}>{ticketInfo?.spend_amount ?? "-"}</Descriptions.Item> */}
          <Descriptions.Item label={"Issue Closed"}>{ticketInfo?.issue_closed ?? "-"}</Descriptions.Item>
        </Descriptions>
      </Card>

      <Modal title={state.title} open={state.isOpen} footer={null} onCancel={() => updateState({ ...state, isOpen: false })}>
        <Image.PreviewGroup>
          {state.images.map(_ => <Image
           key= ""
            width={100}
            src={`${ticketInfo.pathfor_attachments}/${_}`}
          />)}
        </Image.PreviewGroup>
      </Modal>

      <Modal
        open={open}
        title={`Service History: ${ticketInfo.asset_details} (${ticketInfo.outlet_name ?? "-"})`}
        onOk={handleCancel}
        onCancel={handleCancel}
        footer={[]}
        width={1000}
      >
        <DataGrid
          loading={gettingAssetHistory}
          rows={getAssetHistoryResponse}
          sx={{ height: "80vh" }}
          columns={[
            { key: '1', headerName: 'Sl No.', field: 'sl_no', hide: false, width: 200 },
            { key: '2', headerName: 'Ticket No', field: 'service_number', hide: false, width: 200 },
            { key: '11', headerName: 'Ticket Date', field: 'created_at', hide: false, width: 180, valueGetter: (params) => format(parseISO(params.row.created_at), 'dd-MM-yyyy hh:mm aa') },
            { key: '8', headerName: 'Asset', field: 'asset', hide: false, width: 180 },
            { key: '3', headerName: 'Work Done', field: 'workdone', hide: false, width: 150 },
            { key: '4', headerName: 'Type of Spare', field: 'spare_id', hide: false, width: 150 },
            { key: '5', headerName: 'Mode of Payment', field: 'payment_mode', hide: false, width: 150 },
            { key: '6', headerName: 'Value', field: 'po_value', hide: false, width: 130 },
            { key: '7', headerName: 'Quotation No', field: 'quotation_no', hide: false, width: 180 },
            { key: '9', headerName: 'Vendor Name', field: 'vendor_name', hide: false, width: 220 },
          ]}
        />
      </Modal>
    </>
  );
}

export default memo(PCClaimSubmissionView);
