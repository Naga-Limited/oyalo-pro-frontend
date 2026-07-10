/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router';
import CustomTable from '../../../components/CustomTable';
import {useSelector} from 'react-redux';
import {Input, DatePicker, Button, Col, Row, Form, Select, Card} from 'antd';
import {includes} from 'ramda';
import {ticketHandlingDropDownData} from './TicketHandling.constants';
// import {saveOutletMaster, getStates, getSubZonal, getZonal, updateOutletMaster, getCity} from '../../../@app/master/masterSlice';
// import {map} from 'ramda';
// import {useLocation, useNavigate} from 'react-router';
// import dayjs from 'dayjs';
// import messageToast from '../../../components/messageToast/messageToast';
// import {transStatus} from '../../../util/transStatus';
// import { Input } from 'antd';
// import {getFormData, CREATE_TICKET_FORM_DATA} from './createTicket.constants';

const {TextArea} = Input;
const {Option} = Select;

function CostInvolvedNo() {
  // const dispatch = useDispatch();

  const data = [
    {
      'S.No': 1,
      id: 1,
      outlet: 'select',
      ticket_description: 'ticket description',
      service_for: 'ticket service',
      asset_group: 'asset group',
      ticket_status: 'open',
      current_status: 'current ticket',
      ticket_date: 'ticket date',
      aging: 'agingd'
    }
  ];

  const navigate = useNavigate();

  const onClickAdd = () => {
    navigate('/createTicket/addEditForm');
  };

  const handleViewClick = (rowInfo) => {
    navigate('/ticketForm', {
      state: rowInfo
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

  const [form] = Form.useForm();

  // useWatch
  const vendorType = Form.useWatch('vendorType', form);
  const selectWorkDone = Form.useWatch('selectWorkDone', form);
  const costInvolved = Form.useWatch('costInvolved', form);
  const paymentMode = Form.useWatch('paymentMode', form);

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
  //   }, [] )
  return (
    <div className='h-screen' style={{border: '1px solid green'}}>
      <Card>
        <Row>
          <Col span={24}>
            <Form
              name='basic'
              labelCol={{span: 24}}
              wrapperCol={{span: 24}}
              // onValuesChange={onSelectChange}
              // onFinish={onFinish}
              // onFinishFailed={onFinishFailed}
              autoComplete='off'
              form={form}>
              <Row>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item
                    name='name'
                    label='Name'
                    rules={[
                      {
                        required: true,
                        message: 'Name'
                      }
                    ]}>
                    <Input placeholder='Name' name='name' />
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item
                    name='phNumber'
                    label='Phone Number'
                    rules={[
                      {
                        required: true,
                        message: 'Enter Phone Number'
                      }
                    ]}>
                    <Input placeholder='Number' name='phNumber' />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Item name='invoiceCopy' label='Vendor Invoice Copy' rules={[{required: true, message: 'Please add invoice copy'}]}>
                    <input type={'file'} />
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item name='photoCopy' label=' Spare Photo Copy (Existing)' rules={[{required: true, message: 'Please add photo copy'}]}>
                    <input type={'file'} />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Item name='spareCopy' label='Spare Photo Copy (New)' rules={[{required: true, message: 'Please add Spare Photo Copy (New)'}]}>
                    <input type={'file'} />
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item
                    name='remark'
                    label='Remark'
                    rules={[
                      {
                        required: true,
                        message: 'Enter Remark'
                      }
                    ]}>
                    <Input placeholder='Remark' name='remark' />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default CostInvolvedNo;
