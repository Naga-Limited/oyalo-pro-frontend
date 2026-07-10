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
import { CardHeader } from '@mui/material';
const { TextArea } = Input;

const { Option } = Select;
function Formticket1() {
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
  const [selectedOption, setSelectedOption] = useState("");
  const [inputValue, setInputValue] = useState("");

  const handlevendorChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
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
                <h2>Ticket Details</h2>
               <Card>
        <Row gutter={16}>
                 
                 <Col md={{ span: 6 }} xs={{ span: 24 }}>
                   <Form.Item
                     name='ticketNo'
                     label='Ticket Number'
                   >
                     <Input name='ticketNo' placeholder='AS-BR-09-22-01' />
                   </Form.Item>
                 </Col>
                 <Col md={{ span: 6 }} xs={{ span: 24 }}>
                   <Form.Item name='ticketDescription' label='Ticket Description'>
                     <Input placeholder='' name='ticketDescription' />
                   </Form.Item>
                 </Col>
                 <Col md={{ span: 6 }} xs={{ span: 24 }}>
                   <Form.Item name='outletName' label='Outlet Name'>
                     <Input placeholder='' name='outletName' />
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
                   <Form.Item name='Waiting @' label='Waiting @'>
                     <Select >
                       <Option>select</Option>
                     </Select>
                   </Form.Item>
                 </Col>
                 <Col md={{ span: 6 }} xs={{ span: 24 }}>
                   <Form.Item name='orlName' label='ORL Name'>
                     <Input placeholder='' name='orlName' />
                   </Form.Item>
                 </Col>
                 <Col md={{ span: 6 }} xs={{ span: 24 }}>
                   <Form.Item name='orlNumber' label='ORLNumber'>
                     <Input placeholder='' name='orlNumber' />
                   </Form.Item>
                 </Col>
                 <Col md={{ span: 6 }} xs={{ span: 24 }}>
                   <Form.Item name='  Assigned To' label='  Assigned To'>
                     <Input placeholder='' name=' Assigned To' />
                   </Form.Item>
                 </Col>
                 <Col md={{ span: 6 }} xs={{ span: 24 }}>
                   <Form.Item
                     name='contact_no'
                     label='Contact No'
                   >
                     <Input placeholder='Enter Contact No' name='contact_no' />
                   </Form.Item>
                 </Col>
                 </Row>
    </Card>                 
                
              
              <Row gutter={[15, 0]}>
              
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item name='Vendor Type' label='Vendor Type' >
                    <Select value={selectedOption} onChange={handlevendorChange}>
                      <Option>Internal</Option>
                      <Option>External</Option>
                    </Select>
                  </Form.Item>
                </Col>
                
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item
                    name='employeeName'
                    label='Employee Name'
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your Employee Number'
                      }
                    ]}>
                    <Select >
                      <Option>Sankar</Option>
                      <Option>Karthick</Option>
                      <Option>Ranjith</Option>
                      <Option>Karthick</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item
                    name='contactNumber'
                    label='Contact No'
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your Contact Number'
                      }
                    ]}>
                    <Input placeholder='contactNumber' disabled name='contactNumber' />
                  </Form.Item>
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item name='Select Workdone' label='Select Workdone'>
                    <Select >
                      <Option>Service With Spare</Option>
                      <Option>Service Without Spare</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item name='Select the Spare' label='Select the Spare'>
                    <Select >
                      <Option>Compressor</Option>
                      <Option>Fan motor</Option>
                      <Option>P.C.B</Option>
                      <Option>Magnetic Switch</Option>
                      <Option>Transformer</Option>
                      <Option>Other Electrical Parts Of AC</Option>
                      <Option>Air Filter</Option>
                      <Option>Sheet Metal Parts</Option>
                      <Option>Evaporator Coils</Option>
                      <Option>Condenser coils</Option>
                      <Option>Front grill Assy./Plastic cover/panel</Option>
                      <Option>Circuit Breaker (M.C.B., Sequencer)</Option>
                      <Option>Remote Handset (if mishandling/broken)</Option>
                      <Option>Voltage stabilizer Scanners</Option>
                      <Option>Others</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name=' Covered in AMC' label=' Covered in AMC'>
                    <Input placeholder='' disabled name=' Covered in AMC'  />
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='Existing Spare Photo' label='  Existing Spare Photo'>
                    <Input placeholder='' type='file' name='Existing Spare Photo' />
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='New Spare Photo' label='  New Spare Photo'>
                    <Input placeholder='' type='file' name='New Spare Photo' />
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='Document Copy' label='  Document Copy'>
                    <Input placeholder='' type='file' name='Document Copy' />
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='Tentative Date ' label='Tentative Date '>
                    <Input placeholder='' type='date' name='Tentative Date ' />
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='Cost Involved ' label='Cost Involved '>
                  <Select >
                    <Option>Yes</Option>
                    <Option>No</Option>
                   </Select>
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name=' Mode of Payment' label=' Mode of Payment'>
                  <Select >
                    <Option>Pettycash</Option>
                    <Option>Online</Option>
                   </Select>
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
            </Row>
          </Form>
        </Col>
      </Row>
    </Card>
    </div >
  );
}

export default Formticket1;
