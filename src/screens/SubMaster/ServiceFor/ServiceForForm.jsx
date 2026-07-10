import React, {useState} from 'react';
import {Card, Button, Col, Row, Form, Input, Radio} from 'antd';
import {useLocation, useNavigate} from 'react-router';
import {useDispatch, useSelector} from 'react-redux';
import messageToast from '../../../components/messageToast/messageToast';
import {saveServiceFor, updateServiceFor} from '../../../@app/service/serviceSlice';
import ConfirmOnExit from '../../../components/confirmOnExit/ConfirmOnExit';
import {transStatus} from '../../../util/transStatus';

function ServiceForForm() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showDialog, setShowDialog] = useState(false);

  const {
    state: {data: defaultValue, isEdit = false}
  } = useLocation();

  const [status, setStatus] = useState(defaultValue?.status ?? 1);

  const {savingServiceFor} = useSelector((state) => {
    return state.service;
  });

  const onFinish = (data) => {
    setShowDialog(false);
    dispatch(defaultValue?.id ? updateServiceFor({data: {...data, status: transStatus({status}), id: defaultValue.id}}) : saveServiceFor({data, status: transStatus({status})})).then(({message, status, statusText}) => {
      if (status === 200) {
        navigate('/serviceFor');
        form.resetFields();
        messageToast({message: message ?? statusText, status, title: 'Service for'});
      } else {
        messageToast({message: message.name, status, title: 'Service for'});
      }
    });
  };

  const handleClickBack = () => {
    navigate('/serviceFor');
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
              initialValues={{
                status: defaultValue?.status ?? 1,
                ...defaultValue
              }}
              onFinish={onFinish}
              onFieldsChange={() => setShowDialog(true)}
              form={form}
              autoComplete='off'>
              <Row gutter={[15, 0]}>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item
                    name='name'
                    label='Service For'
                    rules={[
                      {required: true, message: 'Please add Service'},
                      {
                        pattern: /^[a-zA-Z' '  ]*$/,
                        message: 'Invalid value'
                      }
                    ]}>
                    <Input name='name' placeholder='Service For' disabled={savingServiceFor} />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item name='status' label='Status ' rules={[{required: true, message: 'Please slect your status'}]}>
                    <Col span={24}>
                      <Radio.Group
                        buttonStyle='solid'
                        onChange={(e) => {
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
                    </Col>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Row gutter={[15, 15]} style={{justifyContent: 'end'}}>
                    <Col span={12} style={{textAlign: 'right'}} className='d-flex align-items-center justify-content-end mt-3'>
                      <Form.Item className='mx-2'>
                        <Button className='orangeFactory' type='primary' htmlType='submit' disabled={savingServiceFor} loading={savingServiceFor}>
                          {isEdit ? 'Update' : 'Add'}
                        </Button>
                      </Form.Item>
                      <Form.Item>
                        <Button onClick={handleClickBack} disabled={savingServiceFor}>
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

export default ServiceForForm;
