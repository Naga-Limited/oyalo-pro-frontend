import React from 'react';
import {Input, Card, DatePicker, TimePicker, Select, Button, Radio, Col, Row, Form} from 'antd';
const {Option} = Select;

function EditRoleMasterForm() {
  const onFinish = () => {};
  const onChange = () => {};

  return (
    <>
      <Card>
        <Row style={{justifyContent: 'center'}}>
          <Col span={24}>
            <Form name='basic' labelCol={{span: 24}} wrapperCol={{span: 24}} initialValues={{remember: true}} onFinish={onFinish} autoComplete='off'>
              <Row gutter={[15, 0]}>
                <Col span={6} xs={{span: 24}}>
                  <Form.Item name='state_name' label='State Name' rules={[{required: true, message: 'Please select state name'}]}>
                    <Select placeholder='select'>
                      <Option value='male'>Male</Option>
                      <Option value='female'>Female</Option>
                      <Option value='other'>Other</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6} xs={{span: 24}}>
                  <Form.Item name='city_name' label='City Name' rules={[{required: true, message: 'Please select city name'}]}>
                    <Select placeholder='select'>
                      <Option value='male'>Male</Option>
                      <Option value='female'>Female</Option>
                      <Option value='other'>Other</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6} xs={{span: 24}}>
                  <Form.Item name='zone_name' label='Zone Name' rules={[{required: true, message: 'Please select zone name'}]}>
                    <Select placeholder='select'>
                      <Option value='male'>Male</Option>
                      <Option value='female'>Female</Option>
                      <Option value='other'>Other</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6} xs={{span: 24}}>
                  <Form.Item
                    name='sub_zone_name'
                    label='Sub zone Name'
                    rules={[
                      {
                        required: true,
                        message: 'Please select sub zone name'
                      }
                    ]}>
                    <Select placeholder='select'>
                      <Option value='male'>Male</Option>
                      <Option value='female'>Female</Option>
                      <Option value='other'>Other</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6} xs={{span: 24}}>
                  <Form.Item
                    name='outlet_code'
                    label='Outlet Code'
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your outlet code'
                      }
                    ]}>
                    <Input placeholder='Enter Outlet Code' />
                  </Form.Item>
                </Col>
                <Col span={6} xs={{span: 24}}>
                  <Form.Item
                    name='outlet_name'
                    label='Outlet Name'
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your outlet name'
                      }
                    ]}>
                    <Input placeholder='Enter Outlet Name' />
                  </Form.Item>
                </Col>
                <Col span={6} xs={{span: 24}}>
                  <Form.Item
                    name='zomato_service_available'
                    label='Zomato Service Available '
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your Zomato Service Available'
                      }
                    ]}>
                    <Radio.Group>
                      <Radio value={1}>Yes</Radio>
                      <Radio value={2}>No</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col span={6} xs={{span: 24}}>
                  <Form.Item
                    name='zomato_id'
                    label='Zomato ID'
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your outlet zomato_id'
                      }
                    ]}>
                    <Input placeholder='Enter Zomato ID' />
                  </Form.Item>
                </Col>
                <Col span={6} xs={{span: 24}}>
                  <Form.Item
                    label='Zomato Live Date'
                    name='zomato_live_date'
                    rules={[
                      {
                        required: true,
                        message: 'Please select zomato live date!'
                      }
                    ]}>
                    <DatePicker onChange={onChange} placeholder='dd/mm/yyyy' style={{width: '100%'}} />
                  </Form.Item>
                </Col>
                <Col span={6} xs={{span: 24}}>
                  <Form.Item
                    name='swiggy_service_available'
                    label='Swiggy Service Available '
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your Swiggy Service Available'
                      }
                    ]}>
                    <Radio.Group>
                      <Radio value={1}>Yes</Radio>
                      <Radio value={2}>No</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col span={6} xs={{span: 24}}>
                  <Form.Item
                    name='swiggy_id'
                    label='Swiggy ID'
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your swiggy_id'
                      }
                    ]}>
                    <Input placeholder='Enter Zomato ID' />
                  </Form.Item>
                </Col>
                <Col span={6} xs={{span: 24}}>
                  <Form.Item
                    label='Swiggy Live Date'
                    name='swiggy_live_date'
                    rules={[
                      {
                        required: true,
                        message: 'Please select swiggy live date!'
                      }
                    ]}>
                    <DatePicker onChange={onChange} placeholder='dd/mm/yyyy' style={{width: '100%'}} />
                  </Form.Item>
                </Col>
                <Col span={6} xs={{span: 24}}>
                  <Form.Item
                    name='dotpe_service_available'
                    label='Dotpe  Service Available '
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your Dotpe  Service Available'
                      }
                    ]}>
                    <Radio.Group>
                      <Radio value={1}>Yes</Radio>
                      <Radio value={2}>No</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col span={6} xs={{span: 24}}>
                  <Form.Item name='dotpe_id' label='Dotpe  ID' rules={[{required: true, message: 'Please enter your dotpe id'}]}>
                    <Input placeholder='Enter Zomato ID' />
                  </Form.Item>
                </Col>
                <Col span={6} xs={{span: 24}}>
                  <Form.Item
                    label='Dotpe  Live Date'
                    name='dotpe_live_date'
                    rules={[
                      {
                        required: true,
                        message: 'Please select dotpe live date!'
                      }
                    ]}>
                    <DatePicker onChange={onChange} placeholder='dd/mm/yyyy' style={{width: '100%'}} />
                  </Form.Item>
                </Col>
                <Col span={6} xs={{span: 24}}>
                  <Form.Item
                    label='Email'
                    name='email'
                    rules={[
                      {required: true, message: 'Please enter your email!'},
                      {
                        type: 'email',
                        message: 'Please enter valid mail'
                      }
                    ]}>
                    <Input placeholder='Email' />
                  </Form.Item>
                </Col>
                <Col span={6} xs={{span: 24}}>
                  <Form.Item
                    name='latitude_no'
                    label='Latitude No'
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your latitude no'
                      }
                    ]}>
                    <Input placeholder='Enter Latitude No' />
                  </Form.Item>
                </Col>
                <Col span={6} xs={{span: 24}}>
                  <Form.Item
                    name='longitude_no'
                    label='Longitude No'
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your longitude no'
                      }
                    ]}>
                    <Input placeholder='Enter Longitude No' />
                  </Form.Item>
                </Col>
                <Col span={6} xs={{span: 24}}>
                  <Form.Item
                    name='restaurant_address'
                    label='Restaurant Address'
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your restaurant address'
                      }
                    ]}>
                    <Input placeholder='Enter Restaurant Address' />
                  </Form.Item>
                </Col>
                <Col span={6} xs={{span: 24}}>
                  <Form.Item
                    name='order_placing_no'
                    label='Order Placing No'
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your order placing no'
                      }
                    ]}>
                    <Input placeholder='Enter Order Placing No' />
                  </Form.Item>
                </Col>
                <Col span={6} xs={{span: 24}}>
                  <Form.Item
                    name='orl_cug_no'
                    label='ORL CUG No'
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your ORL CUG No'
                      }
                    ]}>
                    <Input placeholder='Enter ORL CUG No' />
                  </Form.Item>
                </Col>
                <Col span={6} xs={{span: 24}}>
                  <Form.Item
                    name='contact_no'
                    label='Contact No'
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your Contact No'
                      }
                    ]}>
                    <Input placeholder='Enter Contact No' />
                  </Form.Item>
                </Col>
                <Col span={6} xs={{span: 24}}>
                  <Form.Item name='open_time' label='Open Time' rules={[{required: true, message: 'Please select open time'}]}>
                    <TimePicker placeholder='Enter Open Time' style={{width: '100%'}} />
                  </Form.Item>
                </Col>
                <Col span={6} xs={{span: 24}}>
                  <Form.Item name='close_time' label='Close Time' rules={[{required: true, message: 'Please select Close time'}]}>
                    <TimePicker placeholder='Enter Close Time' style={{width: '100%'}} />
                  </Form.Item>
                </Col>
                <Col span={6} xs={{span: 24}}>
                  <Form.Item
                    label='Outlet Opening Date'
                    name='outlet_opening_date'
                    rules={[
                      {
                        required: true,
                        message: 'Please select outlet opening  date!'
                      }
                    ]}>
                    <DatePicker onChange={onChange} placeholder='dd/mm/yyyy' style={{width: '100%'}} />
                  </Form.Item>
                </Col>
                <Col span={6} xs={{span: 24}}>
                  <Form.Item
                    name='profit_center'
                    label='Profit Center'
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your profit center'
                      }
                    ]}>
                    <Input placeholder='Enter Profit Center' />
                  </Form.Item>
                </Col>
                <Col span={6} xs={{span: 24}}>
                  <Form.Item
                    name='cost_center'
                    label='Cost Center'
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your cost center'
                      }
                    ]}>
                    <Input placeholder='Enter Cost Center' />
                  </Form.Item>
                </Col>
                <Col span={6} xs={{span: 24}}>
                  <Form.Item
                    name='laber_license_no'
                    label='Labour License No'
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your laber licenso no'
                      }
                    ]}>
                    <Input placeholder='Enter Labour License No' />
                  </Form.Item>
                </Col>
                <Col span={6} xs={{span: 24}}>
                  <Form.Item
                    label='Fire License No'
                    name='fire_license_no'
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your fire license No!'
                      }
                    ]}>
                    <Input placeholder='Fire License No' />
                  </Form.Item>
                </Col>
                <Col span={6} xs={{span: 24}}>
                  <Form.Item
                    label='Fire Extinguisher License No'
                    name='fire_extinguisher_license_no'
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your fire extinguisher license no!'
                      }
                    ]}>
                    <Input placeholder='Fire Extinguisher License No' />
                  </Form.Item>
                </Col>
                <Col span={6} xs={{span: 24}}>
                  <Form.Item
                    label='FSSAI License No'
                    name='fssai_license_no'
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your FSSAI_License_No!'
                      }
                    ]}>
                    <Input placeholder='FSSAI License No' />
                  </Form.Item>
                </Col>
                <Col span={6} xs={{span: 24}}>
                  <Form.Item name='status' label='Status ' rules={[{required: true, message: 'Please slect your status'}]}>
                    <Radio.Group>
                      <Radio value={1}>Active</Radio>
                      <Radio value={2}>In-Active</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item wrapperCol={{span: 24}} className='d-flex justify-content-end'>
                <Button type='primary' htmlType='submit'>
                  Update
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Card>
    </>
  );
}

export default EditRoleMasterForm;
