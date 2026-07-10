import React, { useState, useEffect } from 'react';
import { Card, Button, Col, Row, Form, Input, Radio, Select } from 'antd';
import { useLocation, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import messageToast from '../../../components/messageToast/messageToast';
import { saveLicense, updateLicense, getDays } from '../../../@app/subMaster/subMasterSlice';
import { map } from 'ramda';
import { transStatus } from '../../../util/transStatus';
import ConfirmOnExit from '../../../components/confirmOnExit/ConfirmOnExit';
const { Option } = Select;
//import { Controller} from 'react-hook-form';
//const {Option} = Select;
function LicenseForm() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showDialog, setShowDialog] = useState(false);
  const {
    getDaysResponse: { data: days },
    gettingDays
  } = useSelector((state) => {
    return state.subMaster;
  });
  
 
  const { savingLicense } = useSelector((state) => {
    return state.subMaster;
  });
  
  const {
    state: { data: defaultValue, isEdit = false }
  } = useLocation();
  
  useEffect(() => {
    dispatch(getDays());
    
  }, [dispatch]);

  const [status, setStatus] = useState(defaultValue?.status ?? 1);
  
    const [ setValue] = useState(1);
    const onChange3 = (e) => {
    
      setValue(e.target.value);
    };
    
   

  const onFinish = (data) => {
   
   
    setShowDialog(false);
    dispatch(defaultValue?.id ? updateLicense({ data: { ...data, status: transStatus({ status }), id: defaultValue.id, day_type: data.day_type } }) : saveLicense({ data })).then(
      ({ message, status, statusText }) => {
        if (status === 200) {
          navigate('/licenseMaster');
          form.resetFields();
        }
        messageToast({ message: message ?? statusText, status, title: 'License Master' });
      }
    );
  };

  const handleClickBack = () => {
    navigate('/licenseMaster');
  };
  const handleOnChange = (e) => {
    if ((e.target.name === 'price') || (e.target.name === 'fine')|| (e.target.name === 'lead_days')|| (e.target.name === 'com_code')|| (e.target.name === 'plant_code')) {
      return form.setFieldsValue({

        [e.target.name]: e.target.value.replace(/[^0-9 ./]/g, '')
      });
    }
  };
  return (
    <>
      <Card>
        <ConfirmOnExit showModel={showDialog} />
        <Row style={{ justifyContent: 'center' }}>
          <Col span={24}>
            <Form
              onFieldsChange={() => setShowDialog(true)}
              name='basic'
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              initialValues={{
                ...defaultValue,
                //name: defaultValue?.name,

                day_type: defaultValue?.day_type,
                status: defaultValue?.status ?? 1, ...defaultValue,
                email_status: defaultValue?.email_status ?? 1, ...defaultValue
              }}
              onFinish={onFinish}
              autoComplete='off'
              form={form}>
              <Row gutter={[15, 0]}>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item name='name' label='License Name' rules={[{required: true,
                     message: 'Enter License Name' }]}>
                    <Input name='name' 
      //  onChange={handleOnChange2}
        placeholder='Enter License' disabled={savingLicense} defaultValue={defaultValue?.name} />
                  </Form.Item>
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }} >
                  <Form.Item name='day_type' label='Mail Days' rules={[{ required: true, message: 'Please select days' }]} >
                    <Select
                      placeholder='Select days'
                      mode='multiple'
                      loading={gettingDays}
                      //disabled={savingAuditSubCategory || defaultValue?.auditcategory_status === '0'}
                      showSearch
                      filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                      {map(
                        (days) => {
                          return (
                            <Option key={days.id} value={days.name}>
                              {days.name}
                            </Option>
                          );
                        },
                        days ? days : []
                      )}
                    </Select>
                  </Form.Item>
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item name='category' label='Category' rules={[{ required: true, message: 'Please select Category' }]}>
                    
                  <Radio.Group  name='category'>
                    <Radio value={1} defaultValue={defaultValue?.category}>Statutory</Radio>
                    <Radio value={0}>Non-Statutory</Radio>
                  
                  </Radio.Group>
                   {/* <Input name='email_status' type='checkbox' value={1}  checked={defaultValue?.status === 'checked' ? 1 : 0}/>  */}
                  </Form.Item>
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item name='email_status' label='Email Alert' rules={[{ required: true, message: 'Please select ' }]}>
                    
                  <Radio.Group onChange={onChange3} name='email_status'>
                    <Radio value={1} defaultValue={defaultValue?.email_status}>Yes</Radio>
                    <Radio value={0}>No</Radio>
                  
                  </Radio.Group>
                   {/* <Input name='email_status' type='checkbox' value={1}  checked={defaultValue?.status === 'checked' ? 1 : 0}/>  */}
                  </Form.Item>
                </Col>
                
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item name='price' label='License Cost' rules={[{ required: true, message: 'Enter License Cost' }]}>
                    <Input name='price' onChange={handleOnChange} placeholder='Enter License Cost' disabled={savingLicense} defaultValue={defaultValue?.price} />
                  </Form.Item>
                </Col>

                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item name='fine' label='License Penalty %' rules={[{ required: true, message: 'Enter License Penalty %' }]}>
                    <Input name='fine' placeholder='Enter License Penalty %' onChange={handleOnChange} disabled={savingLicense} defaultValue={defaultValue?.fine} />
                  </Form.Item>
                </Col>

                
             
                <Col md={{ span: 6 }} xs={{ span: 20 }}>
                  <Form.Item name='lead_days' label='Renewal Lead Days' rules={[{ required: true, message: 'Enter Lead Days' }]}>
                   
                   <Input name='lead_days' onChange={handleOnChange} disabled={savingLicense} defaultValue={defaultValue?.lead_days}  placeholder='Please Enter The Lead Days'/> 
                  </Form.Item>
                </Col>

                <Col md={{ span: 6 }} xs={{ span: 20 }}>
                  <Form.Item name='com_code' label='Company Code' rules={[{ required: true, message: 'Please add Company Code' }]}>
                   
                   <Input name='com_code' maxLength={5} onChange={handleOnChange} disabled={savingLicense} defaultValue={defaultValue?.com_code}  placeholder='Please Enter The Company Code'/> 
                  </Form.Item>
                </Col>

                <Col md={{ span: 6 }} xs={{ span: 20 }}>
                  <Form.Item name='plant_code' label='Plant Code' rules={[{ required: true, message: 'Please add Plant Code' }]}>
                   
                   <Input name='plant_code' maxLength={5} onChange={handleOnChange} disabled={savingLicense} defaultValue={defaultValue?.plant_code}  placeholder='Please Enter The Plant Code'/> 
                  </Form.Item>
                </Col>

                <Col  md={{ span: 6 }} xs={{ span: 20 }}>
                  <Form.Item name='status' label='Status ' rules={[{ required: true, message: 'Please select your status' }]}>
                    <Col span={24}>
                      <Radio.Group
                        buttonStyle='solid'
                        onChange={(e) => {
                          setStatus(e?.target?.value);
                        }}
                        size='small'
                        defaultValue={defaultValue?.status === 'Active' ? 1 : 0}>
                        <Radio.Button className='active' value={1}>
                          Active
                        </Radio.Button>
                        <Radio.Button className='in-active' value={0}>
                          In-Active
                        </Radio.Button>
                      </Radio.Group>
                    </Col>
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Row gutter={[15, 15]} style={{ justifyContent: 'end' }}>
                    <Col span={12} style={{ textAlign: 'right' }} className='d-flex align-items-center justify-content-end mt-3'>
                      <Form.Item className='mx-2'>
                        <Button className='orangeFactory'   type='primary' htmlType='submit' loading={savingLicense} disabled={savingLicense}>
                          {isEdit ? 'Update' : 'Add'}
                        </Button>
                      </Form.Item>
                      {/* </Col>
                    <Col span={12}> */}
                      <Form.Item>
                        <Button onClick={handleClickBack} disabled={savingLicense}>
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
    </>
  );
}

export default LicenseForm;