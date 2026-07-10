/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import {Card, Button, Radio, Col, Row, Form, Input,InputNumber,DatePicker} from 'antd';
import {useLocation, useNavigate} from 'react-router';
import {transStatus} from '../../../util/transStatus';
import {useDispatch, useSelector} from 'react-redux';
import {addAuditPayment, updateAuditPayment} from '../../../@app/master/masterSlice';
import ConfirmOnExit from '../../../components/confirmOnExit/ConfirmOnExit';

function AuditPaymentForm() {
  const {
    state: {data: defaultValue = {}, isEdit = false}
  } = useLocation();

  const { RangePicker } = DatePicker;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [status, setStatus] = useState(defaultValue?.status ?? 1);

  const {savingAuditPayment} = useSelector((state) => {
    return state.master;
  });

  const onFinish = (data) => {
    setShowDialog(false);
    dispatch(
      defaultValue?.id
        ? updateAuditPayment({data: {...data, status: transStatus({status}), id: defaultValue?.id}})
        : addAuditPayment({data: {...data, status: transStatus({status})}})
    ).then(({status}) => {
      if (status === 200) {
        form.resetFields();
        navigate('/auditPayment');
      }
    });
  };

  const handleClickBack = () => {
    navigate('/auditPayment');
  };

  const [showDialog, setShowDialog] = useState(false);
  const onChange = () => {
    setShowDialog(true);
  };

  return (
    <>
      <Card>
        <ConfirmOnExit showModel={showDialog} />
        <Row style={{justifyContent: 'center'}}>
          <Col span={24}>
            <Form
              name='basic'
              labelCol={{span: 24}}
              wrapperCol={{span: 24}}
              initialValues={{status: defaultValue?.status ?? 1, ...defaultValue}}
              onFinish={onFinish}
              form={form}
              autoComplete='off'>
              <Row gutter={[15, 0]}>
              <Col md={{span: 2}} xs={{span: 24}}>
                  <Form.Item name='range_from' label='Range_from'>
                    <InputNumber type='number'  
                      name="range_from"
                      placeholder='Range From'
                      min={0}
                      max={100}
                      defaultValue={defaultValue?.range_from}
                    />
                  </Form.Item>
              </Col>
              <Col md={{span: 2}} xs={{span: 24}}>
                  <Form.Item name='range_to' label='Range_to'>
                    <InputNumber type='number' 
                        name="range_to" 
                        placeholder='Range To' 
                        min={0}
                        max={100}
                        defaultValue={defaultValue?.range_to} />
                  </Form.Item>
              </Col>
                <Col md={{span: 4}} xs={{span: 24}}>
                  <Form.Item name='level' label='Level'
                   //rules={[{required: true, message: 'Enter Level'}]}
                   >
                    <Input placeholder='Enter Level' disabled={savingAuditPayment} />
                  </Form.Item>
                </Col>
                <Col md={{span: 3}} xs={{span: 24}}>
                  <Form.Item name='amount' label='Amount' 
                  //rules={[{required: true, message: 'Enter Amount'}]}
                  >
                    <Input placeholder='Enter Amount' disabled={savingAuditPayment} />
                  </Form.Item>
                </Col>
                {/* <Col md={{span: 5}} xs={{span: 24}}>
                  <Form.Item name='date_range' label='Date Valid From - To' 
                  //rules={[{required: true, message: 'Enter Amount'}]}
                  >
                <RangePicker onChange={onChange} />
                </Form.Item>
                </Col> */}
                <Col md={{span: 2}}  span={24}></Col>
                <Col md={{span: 6}}  span={24}>
                  <Form.Item name='status' label='Status ' rules={[{required: true, message: 'Please select your status'}]}>
                    <Radio.Group>
                      <Radio.Group
                        buttonStyle='solid'
                        disabled={savingAuditPayment}
                        onChange={(e) => {
                          onChange();
                          setStatus(e?.target?.value);
                        }}
                        size='small'
                        defaultValue={defaultValue?.status === 'In Active' ? 0 : 1}>
                        <Radio.Button className='active' value={1}>
                          Active
                        </Radio.Button>
                        <Radio.Button className='in-active' value={0}>
                          In-Active
                        </Radio.Button>
                      </Radio.Group>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                 <Col span={24}>
                  <Row gutter={[15, 15]} style={{justifyContent: 'end'}}>
                    <Col span={12} className='d-flex justify-content-end align-items-center'>
                      <Form.Item className='mx-2'>
                        <Button className='orangeFactory' type='primary' htmlType='submit' disabled={savingAuditPayment}>
                          {isEdit ? 'Update' : 'Add'}
                        </Button>
                      </Form.Item>
                      {/* </Col>
                    <Col span={12}> */}
                      <Form.Item>
                        <Button disabled={savingAuditPayment} onClick={handleClickBack}>
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

export default AuditPaymentForm;
