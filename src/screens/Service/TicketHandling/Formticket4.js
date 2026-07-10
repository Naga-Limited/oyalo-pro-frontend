/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Input, Card, DatePicker, Button, Col, Row, Form, Select } from 'antd';
import { saveOutletMaster, getStates, getSubZonal, getZonal, updateOutletMaster, getCity } from '../../../@app/master/masterSlice';
// import {map} from 'ramda';
import { useLocation, useNavigate } from 'react-router';
// import dayjs from 'dayjs';
import messageToast from '../../../components/messageToast/messageToast';
import { transStatus } from '../../../util/transStatus';
// import { Input } from 'antd';
import { includes } from 'ramda';
const { TextArea } = Input;

const { Option } = Select;
function Formticket4() {
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

  const priority = Form.useWatch( 'priority', form );
  const serviceFor = Form.useWatch( 'serviceFor', form );
  const assetGroup = Form.useWatch( 'assetGroup', form );

  const service = serviceFor ? serviceFor : '';

  const onFinish = ( values ) => {
    let data = {
      state: values.stateID,
      city: values.city_name,
      zone: values.zoneID,
      subzone: values.subzoneID,
      oulet_Code: values.oulet_Code,
      name: values.name,
      zomoato_status: values.zomoato_status,
      zomoatoID: values.zomoatoID,
      zomoato_date: values['zomoato_date']?.format( 'YYYY-MM-DD' ),
      swiggy_status: values.swiggy_status,
      swiggyID: values.swiggyID,
      swiggy_date: values['swiggy_date']?.format( 'YYYY-MM-DD' ),
      dotpe_status: values.dotpe_status,
      dotpeID: values.dotpeID,
      dotpe_date: values.dotpe_date?.format( 'YYYY-MM-DD' ),
      email: values.email,
      latitude: values.latitude,
      longitude: values.longitude,
      address: values.address,
      order_placing_no: values.order_placing_no,
      orl_cug_no: values.orl_cug_no,
      contact: values.contact,
      open_time: values.open_time?.format( 'HH:mm:ss' ),
      close_time: values.close_time?.format( 'HH:mm:ss' ),
      opening_date: values.opening_date?.format( 'YYYY-MM-DD' ),
      profit_center: values.profit_center,
      cost_center: values.cost_center,
      labour_license_no: values.labour_license_no,
      fire_license_no: values.fire_license_no,
      fire_extinguisher_license_no: values.fire_extinguisher_license_no,
      fssai_license_no: values.fssai_license_no,
      status: values.status === 'active' ? 1 : 0
    };

    dispatch( defaultValue?.id ? updateOutletMaster( { data: { ...data, id: defaultValue.id, status: transStatus( { status: data?.status } ) } } ) : saveOutletMaster( { data } ) ).then( ( data ) => {
      const { status, message } = data;
      if ( status === 200 ) {
        messageToast( { message: data?.statusText, status: status, title: 'Outlet Master' } );
        form.resetFields();
      }
      if ( data?.exception ) {
        messageToast( { message: 'Invalid Request', status: 400, title: 'Outlet Master' } );
      }
      if ( status === 400 ) {
        if ( ( message && message?.contact?.length > 0 ) || ( message && message.email?.length > 0 ) || ( message && message.name?.length > 0 ) ) {
          if ( message && message.contact ) {
            messageToast( { message: message?.contact[0], status: status, title: 'Outlet Master' } );
          } else if ( message && message.email ) {
            messageToast( { message: message?.email[0], status: status, title: 'Outlet Master' } );
          } else if ( message && message.name ) {
            messageToast( { message: message?.name[0], status: status, title: 'Outlet Master' } );
          }
          if ( message ) {
            messageToast( { message: message, status: status, title: 'Employee Master' } );
          }
        }
      }
      if ( status === 200 ) {
        messageToast( { message: message, status: status, title: 'Outlet Master' } );
      }
      if ( defaultValue?.id ) {
        navigate( '/createTicket' );
      }
    } );
  };

  useEffect( () => {
    dispatch( getStates() );
  }, [dispatch] );

  const handleOnChange = ( e ) => {
    return form.setFieldsValue( {
      [e.target.name]: e.target.value
    } );
  };

  const onSelectChange = ( changedValues ) => {
    const formFieldName = Object.keys( changedValues )[0];
    if ( formFieldName === "assetGroup" ) form.setFieldsValue( { asset: undefined } );
    if ( formFieldName === "serviceFor" ) form.setFieldsValue( { assetGroup: undefined, asset: undefined } );
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
              <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='ticketNo' label='Ticket No'>
                    <Input placeholder='' name='ticketNo' defaultValue={'ticket'} />
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='ticketDescription' label='Ticket Description'>
                    <Input placeholder='Network Issue' name='ticketDescription' />
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='serviceFor' label='Service For'>
                    <Input placeholder='IT' name='serviceFor' />
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='assetGroup' label='Asset Group'>
                    <Input placeholder='Internet' name='assetGroup' />
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='asset' label='Asset'>
                    <Input placeholder='Network' name='asset' />
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name=' ORL Name' label=' ORL Name'>
                    <Input placeholder=''  name=' ORL Name' />
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name=' ORL Number' label=' ORL Number'>
                    <Input placeholder='' name=' ORL Number' />
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='  Assigned To' label='  Assigned To'>
                    <Input placeholder='' name=' Assigned To' />
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item
                    name='contact_no'
                    label='Contact No'
                   >
                    <Input placeholder='Enter Contact No' name='contact_no' />
                  </Form.Item>
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                <Form.Item name='Status' label='Status'>
                <Input placeholder='Issue Closed'  name='contact_no' />
                </Form.Item>
              </Col>
              <Col md={{ span: 6 }} xs={{ span: 24 }}>
                <Form.Item name='Vendor Type' label='Vendor Type'>
                  <Select >
                    <Option selected>Internal</Option>
                    <Option>External</Option>
                  </Select>
                </Form.Item>
              </Col>
               
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
                        <Input placeholder='Kumar' name='employeeName' />
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
                        <Input placeholder='9837363633' name='contactNumber' />
                      </Form.Item>
                    </Col>
                    <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name=' Workdone' label=' Workdone'>
                    <Input placeholder='Service without Spare' name=' Workdone' />
                  </Form.Item>
                </Col>
              
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='Tentative Date ' label='Tentative Date '>
                    <Input placeholder='' type='date' name='Tentative Date ' />
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='Cost Involved ' label='Cost Involved '>
                    <Input placeholder='Yes' type='text' name='Cost Involved ' />
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='Mode of Payment ' label='Mode of Payment '>
                    <Input placeholder='Online' type='text' name='Mode of Payment ' />
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='Advance      ' label='Advance      '>
                    <Input placeholder='Yes' type='text' name='Advance      ' />
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='Advance % ' label='Advance % '>
                    <Input placeholder='50%' type='text' name='Advance % ' />
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='Quotation' label='  Quotation'>
                    <Input placeholder='No' name='Quotation' />
                  </Form.Item>
                </Col>
               
               
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='Spend Amount' label='Spend Amount'>
                    <Input placeholder='1000' name='Spend Amount' />
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='Issue Closed' label='Issue Closed'>
                   <Select >
                    <Option>Yes</Option>
                   </Select>
                  </Form.Item>
                </Col>
               <Col span={24}>
                <p>  * Once confirmation come from ORL Ticket Closed Button enabled (Otherwise after 24hrs the button will be enabled)</p>
               </Col>
                <Col span={24}>
                  <Row gutter={[15, 15]} style={{justifyContent: 'end'}}>
                    <Col span={12} style={{textAlign: 'right'}} className='d-flex align-items-center justify-content-end mt-3'>
                      <Form.Item className='mx-2'>
                        <Button className='orangeFactory' type='primary' htmlType='submit'>
                          Submit
                        </Button>
                      </Form.Item>
                      {/* </Col>
                    <Col span={12}> */}
                      <Form.Item>
                        <Button>Back</Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
               
              </Row>
            </Form>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default Formticket4;
