/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router';
import CustomTable from '../../../components/CustomTableReport';
import {useSelector,useDispatch} from 'react-redux';
import {Input, Button, Col, Row, Form, Card} from 'antd';
import {includes} from 'ramda';
import { getOrlFIEntry } from '../../../@app/service/serviceSlice';

 import favicon from '../../../asset/favicon.ico';

const {TextArea} = Input;

function Orlpcclaimappah() {
  const dispatch = useDispatch();
  const {
    gettingOrlFIEntry,
    getOrlFIEntryResponse: { data },
  } = useSelector((state) => {
    return state.service;
  });


  const navigate = useNavigate();

  const onClickAdd = () => {
    navigate('/orlpcclaimappahForm');
  };

  const handleViewClick = (rowInfo) => {
    navigate('/pclcimapprovalah', {
      state: rowInfo
    });
  };

  const paymentclick = (rowInfo) => {
    navigate('/paymentclick', {
    });
  };

  const pettycashExpenseApproval =  (rowInfo) => {
    navigate('/orlpcclaimappah', {
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
      fromDate: values['fromDate']?.format('YYYY-MM-DD'),
      toDate: values['toDate']?.format('YYYY-MM-DD')
    };
  };

  const {
    gettingOutletMaster,
    getOutletMasterResponse: {data: dataSource}
  } = useSelector((state) => {
    return state.master;
  });

  const onSelectChange = () => {
    // eslint-disable-next-line no-console

  };

  const dateFormat = ['DD/MM/YYYY', 'DD/MM/YY'];

  //   useEffect( () => {
  //     dispatch( getOutletMaster() );
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [] );
  let column1 = [
    { key: '1', headerName: 'S.No', field: 'S.No', hide: false, width: 70 },
    { key: '2', headerName: 'outletName', field: 'outletName', hide: false, width: 250 },
    { key: '3', headerName: 'Payment Doc No', field: 'doc_no', hide: false, width: 200 },
    { key: '4', headerName: 'Claim Amount', field: 'approved_amount', hide: false, width: 150 },
    { key: '5', headerName: 'FI Exp Doc No', field: 'fi_exp_doc_no', hide: false, width: 200 },
    { key: '6', headerName: 'FI Payment Doc No', field: 'fi_payment_doc_no', hide: false, width: 200 },
    { key: '7', headerName: 'Request Status', field: 'paymentstatus', hide: false, width: 300 },
  ];
  let column2 = [
    { key: '1', headerName: 'S.No', field: 'S.No', hide: false, width: 70 },
    { key: '2', headerName: 'Payment Doc No', field: 'Paymentno', hide: false, width: 300 },
    { key: '3', headerName: 'Claim Amount', field: 'Claim_Amount', hide: false, width: 300 },
    { key: '4', headerName: 'FI Exp Doc No', field: 'fino', hide: false, width: 300 },
    { key: '5', headerName: 'FI Payment Doc No', field: 'fipayno', hide: false, width: 300 },
  ];

  useEffect(() => {
    dispatch(getOrlFIEntry());
  }, [dispatch]);

  return (
    <>
    <div className='h-screen apphide lasthide appactionhideuu'>
      <Card>
        <Row>
          <Col span={24}>
            <Form
              name='basic'
              labelCol={{span: 24}}
              wrapperCol={{span: 24}}
              onValuesChange={onSelectChange}
              onFinish={onFinish}
              // onFinishFailed={onFinishFailed}
              autoComplete='off'
              // form={form}
            >
              <Row gutter={[15, 0]}>
              <Col span={24}>
                  <Row gutter={[15, 15]} style={{justifyContent: 'flex-start'}}>
                    <Col span={12}  className='d-flex align-items-center justify-content-start mt-3'>
                      <Form.Item className='mx-2'>
                        <Button htmlType='submit' onClick={pettycashExpenseApproval}>
                          Petty Cash Expense Approval
                        </Button>
                      </Form.Item>

                      <Form.Item>
                        <Button className='orangeFactory' onClick={paymentclick}>Payment Process</Button>
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
        dataSource={data}
        loading ={gettingOrlFIEntry}
        column={column1}
        hideActionBtn = {true}
        handleViewClick={handleViewClick}
        // onClickAdd={onClickAdd}
        title={'ORL FI Entry List'}
      />


    </div>
 
    </>
  );
}

export default Orlpcclaimappah;
