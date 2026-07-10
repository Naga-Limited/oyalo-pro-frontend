/* eslint-disable no-unused-vars */
import { Button, Col, Image, Modal, Radio, Row } from 'antd';
import Title from 'antd/es/typography/Title';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { getPettyCashClaimSubmitedMSTickets } from '../../../@app/service/serviceSlice';
import CustomTable from '../../../components/CustomTable';

function Pcaclaimsubmissionms() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [state, updateState] = useState({ isOpen: false, title: "Title", pathfor_attachments: "", images: [] });

  const openModal = (title, images = [], pathfor_attachments) => {
    updateState({ ...state, title, isOpen: true, images, pathfor_attachments })
  };

  const {
    gettingPCClaimSubmittedMS,
    getPCClaimSubmittedMSResponse: { data },
  } = useSelector((state) => {
    return state.service;
  });

  const handleTabClick = (e) => {
    if (e.target.value === "submission") {
      navigate('/pcaclaimsubmissionms');
    } else if (e.target.value === "rejected") {
      navigate('/pcsubmissionRejected');
    }
  }

  const giveMeTotal = () => {
    let total = 0
    if (data) {
      data?.forEach(_ => {
        _.ticket?.forEach(_ => {
          let spend_amount = parseFloat(_.spend_amount);
          total += spend_amount;
        });
      })
    }
    return total;
  }

  useEffect(() => {
    dispatch(getPettyCashClaimSubmitedMSTickets());
  }, [dispatch]);

  let column = [
    { key: '1', headerName: 'S.No', field: 'S.No', hide: false, width: 70 },
    { key: '2', headerName: 'Requestee Name', field: 'requestee_name', hide: false, width: 300 },
    { key: '3', headerName: 'Document No', field: 'document_no', hide: false, width: 180 },
    {
      key: '4', headerName: 'Request Amount', field: 'created_at', hide: false, width: 180, valueGetter: (params) => {
        let total = 0;
        params.row.ticket?.forEach(_ => {
          let spend_amount = parseFloat(_.spend_amount);
          total += spend_amount;
        });
        return total;
      }
    },
    { key: '5', headerName: 'Approved Expense Amount', field: 'approved_expense_amount', hide: false, width: 220 },
    { key: '6', headerName: 'Approved Payment Amount', field: 'approved_payment_amount', hide: false, width: 220 },
    { key: '7', headerName: 'FI Expense No', field: 'fi_expense_no', hide: false, width: 180 },
    { key: '8', headerName: 'FI Payment No', field: 'fi_payment_no', hide: false, width: 180 },
    { key: '9', headerName: 'Status', field: 'ticket_status', hide: false, width: 180 },
    {
      key: '10', headerName: 'Bill Copy', field: 'quotation_copy', hide: false, width: 180,
      renderCell: (params) => <Button type='link' color='primary' onClick={() => {
        let quotation_copies = [];
        let pathfor_attachments = "";
        params.row.ticket?.forEach(_ => {
          pathfor_attachments = _.pathfor_attachments;
          if (typeof _.quotation_copy === "string") {
            quotation_copies.push(JSON.parse(_.quotation_copy));
          }
        });
        openModal("Quotation Copy", quotation_copies, pathfor_attachments)
      }} >View</Button>
    }
  ];
  return (
    <div className='h-screen apphide lasthide'>
      <Row>
        <Col span={24} >
          <Radio.Group className=' p-4' buttonStyle="solid" onChange={handleTabClick} value={"submitted"}>
            <Radio.Button value={"submission"}>Submission</Radio.Button>
            <Radio.Button value={"submitted"} >Submitted</Radio.Button>
            <Radio.Button value={"rejected"} >Rejected</Radio.Button>
          </Radio.Group>
        </Col>
        <Col span={12}>
          <Title level={3} style={{ marginLeft: "16px" }}>Request for Claim</Title>
        </Col>
        <Col span={12}>
          <Title level={4}>{"Total: " + giveMeTotal()}</Title>
        </Col>
      </Row>

      <CustomTable
        showHeader={false}
        dataSource={data?.map(_ => ({ ..._, ticket_status: _.status }))}
        column={column}
        title={'Create List'}
        hideActionBtn={true}
        loading={gettingPCClaimSubmittedMS}
      />
      <Modal title={state.title} open={state.isOpen} footer={null} onCancel={() => updateState({ ...state, isOpen: false })}>
        <Image.PreviewGroup>
          {state.images.map(_ => <Image
          key = "id"
            width={100}
            src={`${state?.pathfor_attachments?.replace(/\\/g, "")}/${_}`}
          />)}
        </Image.PreviewGroup>
      </Modal>
    </div>
  );
}

export default Pcaclaimsubmissionms;
