import React, {useState} from 'react';
import {Card, Button, Col, Row, Form, Input, Radio} from 'antd';
import {useLocation, useNavigate} from 'react-router';
import {useDispatch, useSelector} from 'react-redux';
import {saveGlAccount, updateGlAccount} from '../../../@app/service/serviceSlice';
import messageToast from '../../../components/messageToast/messageToast';
import ConfirmOnExit from '../../../components/confirmOnExit/ConfirmOnExit';
import {transStatus} from '../../../util/transStatus';

function GlaccountForm() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showDialog, setShowDialog] = useState(false);

  const {
    state: {data: defaultValue, isEdit = false}
  } = useLocation();

  const [status, setStatus] = useState(defaultValue?.status ?? 1);

  const {savingGlAccount} = useSelector((state) => {
    return state.service;
  });

  const { userData } = useSelector((state) => state.auth);

  const onFinish = (data) => {
    setShowDialog(false);
    dispatch(defaultValue?.id ? updateGlAccount({data: {...data,status: transStatus({status}), id: defaultValue.id,
    updated_by: userData.data?.id ?? "0",}}) : saveGlAccount({data,status: transStatus({status}),
    created_by: userData.data?.id ?? "0",})).then(({message, status, statusText}) => {
      if (status === 200) {
        form.resetFields();
        navigate('/glaccount');
      }
      messageToast({message: message ?? statusText, status, title: 'Gl Account'});
    });
  };

  const handleClickBack = () => {
    navigate('/glaccount');
  };

  return (
    <>
      <Card>
      <ConfirmOnExit showModel={showDialog} />
        <Row style={{justifyContent: 'center'}}>
          <Col span={24}>
          <Form
              onFieldsChange={() => setShowDialog(true)}
              name='basic'
              labelCol={{span: 24}}
              wrapperCol={{span: 24}}
              initialValues={{
                status: defaultValue?.status ?? 1,
                ...defaultValue
              }}
              onFinish={onFinish}
              form={form}
              autoComplete='off'>
              <Row gutter={[15, 0]}>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item
                    name='gl_code'
                    label='GL Code'
                    rules={[
                      {required: true, message: 'Please add GL Code'},
                      {
                        pattern: /^[0-9]/g,
                        message: 'Invalid value'
                      }
                    ]}>
                    <Input name='gl_code' placeholder='Enter GL Account Number' disabled={savingGlAccount} />
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='gl_description' label='GL Description'
                  rules={[
                    {required: true, message: 'Please add GL Description'},
                    {
                      pattern: /^[a-zA-Z0-9' '  ]*$/,
                      message: 'Invalid value'
                    }
                  ]}>
                    <Input name='gl_description' placeholder='Enter GL Description'  disabled={savingGlAccount}/>
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
                        <Button className='orangeFactory' type='primary' htmlType='submit' disabled={savingGlAccount} loading={savingGlAccount}>
                          {isEdit ? 'Update' : 'Add'}
                        </Button>
                      </Form.Item>
                      {/* </Col>
                    <Col span={12}> */}
                      <Form.Item>
                      <Button onClick={handleClickBack} disabled={savingGlAccount}>
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

export default GlaccountForm;
