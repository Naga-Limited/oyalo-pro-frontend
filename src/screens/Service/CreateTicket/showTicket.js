/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Input, Card, DatePicker, Button, Col, Row, Form, Select, Progress, Steps } from 'antd';
import { saveOutletMaster, getStates, getSubZonal, getZonal, updateOutletMaster, getCity } from '../../../@app/master/masterSlice';
// import {map} from 'ramda';
import { useLocation, useNavigate } from 'react-router';
// import dayjs from 'dayjs';
import messageToast from '../../../components/messageToast/messageToast';
import { transStatus } from '../../../util/transStatus';
// import { Input } from 'antd';
import { getFormData, CREATE_TICKET_FORM_DATA } from './createTicket.constants';
import { includes } from 'ramda';
const { TextArea } = Input;

const { Option } = Select;
function ShowTicket() {
  const description = 'This is a description.';

  // const handleClickBack = () => {
  //   navigate('/createTicket');
  // };
  const dispatch = useDispatch();
  // const {
  //   saveOutletMasterRequest,
  //   getStatesResponse: {data: states},
  //   gettingState,
  //   getCityResponse: {data: cities},
  //   gettingCity,
  //   getZonalResponse: {data: Zonals},
  //   gettingZonal,
  //   getSubZonalResponse: {data: SubZonals},
  //   gettingSubZonal,
  //   savingCity
  // } = useSelector((state) => {
  //   return state.master;
  // });
  const navigate = useNavigate();

  const { state } = useLocation();

  let defaultValue = state?.data;

  const data = [{
    SNo: "0.738800798388459",
    ticketNo: "0.344545632130673",
    assetGroup: "0.31401690349812195",
    asset: "0.3041391696521716",
    serviceFor: "IT",
    ticketStatus: "0.0008051642659738789",
    currentStatus: "0.685970168269374",
    creationDate: "0.5667665296799829",
    ageingDays: "0.030456688837579904"
  }]

  const [form] = Form.useForm();

  const priority = Form.useWatch('priority', form);
  const serviceFor = Form.useWatch('serviceFor', form);
  const assetGroup = Form.useWatch('assetGroup', form);

  const service = serviceFor ? serviceFor : '';

  const onFinish = (values) => {
    let data = {
      state: values.stateID,
      city: values.city_name,
      zone: values.zoneID,
      subzone: values.subzoneID,
      oulet_Code: values.oulet_Code,
      name: values.name,
      zomoato_status: values.zomoato_status,
      zomoatoID: values.zomoatoID,
      zomoato_date: values['zomoato_date']?.format('YYYY-MM-DD'),
      swiggy_status: values.swiggy_status,
      swiggyID: values.swiggyID,
      swiggy_date: values['swiggy_date']?.format('YYYY-MM-DD'),
      dotpe_status: values.dotpe_status,
      dotpeID: values.dotpeID,
      dotpe_date: values.dotpe_date?.format('YYYY-MM-DD'),
      email: values.email,
      latitude: values.latitude,
      longitude: values.longitude,
      address: values.address,
      order_placing_no: values.order_placing_no,
      orl_cug_no: values.orl_cug_no,
      contact: values.contact,
      open_time: values.open_time?.format('HH:mm:ss'),
      close_time: values.close_time?.format('HH:mm:ss'),
      opening_date: values.opening_date?.format('YYYY-MM-DD'),
      profit_center: values.profit_center,
      cost_center: values.cost_center,
      labour_license_no: values.labour_license_no,
      fire_license_no: values.fire_license_no,
      fire_extinguisher_license_no: values.fire_extinguisher_license_no,
      fssai_license_no: values.fssai_license_no,
      status: values.status === 'active' ? 1 : 0
    };

    dispatch(defaultValue?.id ? updateOutletMaster({ data: { ...data, id: defaultValue.id, status: transStatus({ status: data?.status }) } }) : saveOutletMaster({ data })).then((data) => {
      const { status, message } = data;
      if (status === 200) {
        messageToast({ message: data?.statusText, status: status, title: 'Outlet Master' });
        form.resetFields();
      }
      if (data?.exception) {
        messageToast({ message: 'Invalid Request', status: 400, title: 'Outlet Master' });
      }
      if (status === 400) {
        if ((message && message?.contact?.length > 0) || (message && message.email?.length > 0) || (message && message.name?.length > 0)) {
          if (message && message.contact) {
            messageToast({ message: message?.contact[0], status: status, title: 'Outlet Master' });
          } else if (message && message.email) {
            messageToast({ message: message?.email[0], status: status, title: 'Outlet Master' });
          } else if (message && message.name) {
            messageToast({ message: message?.name[0], status: status, title: 'Outlet Master' });
          }
          if (message) {
            messageToast({ message: message, status: status, title: 'Employee Master' });
          }
        }
      }
      if (status === 200) {
        messageToast({ message: message, status: status, title: 'Outlet Master' });
      }
      if (defaultValue?.id) {
        navigate('/createTicket');
      }
    });
  };

  useEffect(() => {
    dispatch(getStates());
  }, [dispatch]);

  const handleOnChange = (e) => {
    return form.setFieldsValue({
      [e.target.name]: e.target.value
    });
  };

  const onSelectChange = (changedValues) => {
    const formFieldName = Object.keys(changedValues)[0];
    if (formFieldName === "assetGroup") form.setFieldsValue({ asset: undefined });
    if (formFieldName === "serviceFor") form.setFieldsValue({ assetGroup: undefined, asset: undefined });
  };


  const dateFormat = ['DD/MM/YYYY', 'DD/MM/YY'];

  return (
    <div className='h-screen lasthide apphide'>
      <Card>
        <Row>
          <Col span={24}>
            <Form
              name='basic'
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              onValuesChange={onSelectChange}
              onFinish={onFinish}
              autoComplete='off'
              form={form}>
              <Row gutter={[15, 0]}>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item
                    name='ticketNo'
                    label='Ticket Number'
                  >
                    <Input name='ticketNo' placeholder='AS-BR-09-22-01' />
                  </Form.Item>
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item
                    name='serviceFor'
                    label='Service For'>
                    <Input name='serviceFor' placeholder='Equipement' />
                  </Form.Item>
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item
                    name='ticketStatus'
                    label='Ticket Status'>
                    <Input name='ticketStatus' placeholder='Waiting Vendor Assignment' />
                  </Form.Item>
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item
                    name='creationDate'
                    label='Creation Date'>
                    <Input name='creationDate' placeholder='01-Oct-22' />
                  </Form.Item>
                </Col>

                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item
                    name='ageingDays'
                    label='Ageing Days'>
                    <Input name='ageingDays' placeholder='5' />
                  </Form.Item>
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item name='Attachment' label='attachment'>
                    image
                    {/* <input type={'file'} /> */}
                  </Form.Item>
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item
                    name='assetGroup'
                    label='Asset Group'>
                    <Input name='assetGroup' placeholder='Air Conditioner' />
                  </Form.Item>
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item
                    name='asset'
                    label='Asset'>
                    <Input name='asset' placeholder='asset' />
                  </Form.Item>
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item
                    name='Type of Service'
                    label='Type of Service'>
                    <Input name='Type of Service' placeholder='Breakdown' />
                  </Form.Item>
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item
                    name='reasonForClose'
                    label='Reason for Close'>
                    <Input name='reasonForClose' placeholder='reasonForClose' />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Row gutter={[15, 15]} style={{ justifyContent: 'end' }}>
                    <Col span={12} style={{ textAlign: 'right' }} className='d-flex align-items-center justify-content-end mt-3'>
                      <Form.Item className='mx-2'>
                        <Button className='orangeFactory' type='primary' htmlType='submit' >
                          Submit
                        </Button>
                      </Form.Item>
                      {/* </Col>
                    <Col span={12}> */}
                      <Form.Item>
                        <Button>
                          Back
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                <Steps
    direction="vertical"
    current={1}
    items={[
      {
        title: 'yet to Start',
        description:'No Comment',
      },
      {
        title: 'Open',
        description:'No Comment',
      },
      {
        title: 'Work Inprogress',
        description:'No Comment',
      },
    ]}
  />
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default ShowTicket;
