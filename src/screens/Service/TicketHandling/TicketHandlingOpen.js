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

function TicketHandlingOpen() {
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
  const employeeName = Form.useWatch('employeeName', form);

  const onSelectChange = (changedValues) => {
    const formFieldName = Object.keys(changedValues)[0];
    if (formFieldName === 'vendorType') form.setFieldsValue({employeeName: undefined, contactNumber: undefined});
  };

  const {
    gettingOutletMaster,
    getOutletMasterResponse: {data: dataSource}
  } = useSelector((state) => {
    return state.master;
  });

  const dateFormat = ['DD/MM/YYYY', 'DD/MM/YY'];

  //   useEffect( () => {
  //     dispatch( getOutletMaster() );
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [] )
  return (
    <div className='h-screen'>
      <Card>
        <Row>
          <Col span={24}>
            <Form
              name='basic'
              labelCol={{span: 24}}
              wrapperCol={{span: 24}}
              onValuesChange={onSelectChange}
              // onFinish={onFinish}
              // onFinishFailed={onFinishFailed}
              autoComplete='off'
              form={form}>
              <Row gutter={[15, 0]}>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='vendorType' label='Vendor Type'>
                    <Select
                      placeholder='Select'
                      //   loading={gettingState}
                      //   disabled={savingCity}
                      showSearch
                      // onChange={handleOnChange}
                      // filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                    >
                      {ticketHandlingDropDownData('vendorType').map((el) => (
                        <Option key={el} value={el}>
                          {el}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              {vendorType &&
                (vendorType === 'Internal' ? (
                  <Row>
                    <Col md={{span: 6}} xs={{span: 24}}>
                      <Form.Item name='employeeName' label='Employee Name'>
                        <Select
                          placeholder='Select'
                          //   loading={gettingState}
                          //   disabled={savingCity}
                          showSearch
                          rules={[
                            {
                              required: true,
                              message: 'Please select employee Name'
                            }
                          ]}
                          // onChange={handleOnChange}
                          // filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                        >
                          {ticketHandlingDropDownData('employeeName').map((el) => (
                            <Option key={el} value={el}>
                              {el}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col md={{span: 6}} xs={{span: 24}}>
                      <Form.Item
                        name='contactNumber'
                        label='Contact No'
                        rules={[
                          {
                            required: true,
                            message: 'Please enter your Contact Number'
                          }
                        ]}>
                        <Input placeholder='contactNumber' name='contactNumber' value={ticketHandlingDropDownData(employeeName)} />
                      </Form.Item>
                    </Col>
                  </Row>
                ) : (
                  <Row>
                    <Col md={{span: 6}} xs={{span: 24}}>
                      <Form.Item
                        name='employeeName'
                        label='Employee Name'
                        rules={[
                          {
                            required: true,
                            message: 'Please enter your Employee Number'
                          }
                        ]}>
                        <Input placeholder='Employee Name' name='employeeName' />
                      </Form.Item>
                    </Col>
                    <Col md={{span: 6}} xs={{span: 24}}>
                      <Form.Item
                        name='contactNumber'
                        label='Contact No'
                        rules={[
                          {
                            required: true,
                            message: 'Please enter your Contact Number'
                          }
                        ]}>
                        <Input placeholder='contactNumber' name='contactNumber' />
                      </Form.Item>
                    </Col>
                  </Row>
                ))}

              <Button onClick={() => {}}>Assign vendor</Button>
            </Form>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default TicketHandlingOpen;
