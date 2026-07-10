/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router';
import CustomTable from '../../../components/CustomTable';
import {useSelector} from 'react-redux';
import {Input, DatePicker, Button, Col, Row, Form, Select, Card} from 'antd';
import { useDispatch } from 'react-redux';
import { getTicketFIEntry } from '../../../@app/service/serviceSlice';
import {includes} from 'ramda';

 import favicon from '../../../asset/favicon.ico';

const {TextArea} = Input;

function Fisubmit() {

  const dispatch = useDispatch();
  const {
    gettingTicketFIEntry,
    getTicketFIEntryResponse: { data },
  } = useSelector((state) => {
    return state.service;
  });


 

  const navigate = useNavigate();
  const fiopen = () => {
    navigate('/mspcclaimappah');
  };
  const onClickAdd = () => {
    navigate('/mspcclaimappohForm');
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


  useEffect(() => {
    dispatch(getTicketFIEntry());
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
    // { key: '7', headerName: 'Action', field: 'btnfi', hide: false, width: 180 ,renderCell: (params) => {
    //   if(params.row.payment_status != "Approved"){
    //   return <div dangerouslySetInnerHTML={{__html: params.value}}></div>;
    //   }
    // },},   
  ];
  return (
    <div className='h-screen apphide lasthide'>
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
              <Row gutter={[15, 15]} style={{justifyContent: 'flex-start'}}>
                    <Col span={12}  className='d-flex align-items-center justify-content-start mt-3'>
                      <Form.Item className='mx-2'>
                      <Button onClick={fiopen}   htmlType='submit'>
                          Petty Cash Approval - AH
                        </Button>
                      </Form.Item>
                      {/* </Col>
                    <Col span={12}> */}
                      <Form.Item>
                        <Button className='orangeFactory'>FL Entry</Button>
                      </Form.Item>
                    </Col>
                  </Row>
             

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
        //showHeader={false}
        // showEdit={false}
        loading ={gettingTicketFIEntry}
        dataSource={data}
        column={column}
       // handleViewClick={handleViewClick}
        //onClickAdd={onClickAdd}
        title={'FI Entry List'}
      />
    </div>
  );
}

export default Fisubmit;
