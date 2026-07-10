import React, {useState} from 'react';
import {Card, Button, Col, Row, Form, Input, Radio} from 'antd';
import {useLocation, useNavigate} from 'react-router';
import {useDispatch, useSelector} from 'react-redux';
import messageToast from '../../../components/messageToast/messageToast';
import {addDefinitions, updateDefinitions} from '../../../@app/subMaster/subMasterSlice';
import {transStatus} from '../../../util/transStatus';
import ConfirmOnExit from '../../../components/confirmOnExit/ConfirmOnExit';

function DefinitionsForm() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showDialog, setShowDialog] = useState(false);

  const {savingCallStatus} = useSelector((state) => {
    return state.subMaster;
  });

  const {
    state: {data: defaultValue, isEdit = false}
  } = useLocation();

  const [status, setStatus] = useState(defaultValue?.status ?? 1);

  const onFinish = (data) => {
    setShowDialog(false);
    dispatch(
      defaultValue?.id ? updateDefinitions(
        {
          data: {...data, 
            status: transStatus({status}),
            id: defaultValue.id}}) : addDefinitions({data})).then(
      ({message, status, statusText}) => {
        if (status === 200) {
          navigate('/definitions');
          form.resetFields();
        }
        messageToast({message: message ?? statusText, status, title: 'Call Status Master'});
      }
    );
  };

  const handleClickBack = () => {
    navigate('/definitions');
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
              initialValues={{status: defaultValue?.status ?? 1, ...defaultValue}}
              onFinish={onFinish}
              autoComplete='off'
              form={form}>
              <Row gutter={[15, 0]}>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='def_title' label='Add Definition' rules={[{required: true, message: 'Please add Definition'}]}>
                    <Input name='def_title' placeholder='Enter Definition' disabled={savingCallStatus} />
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
                        <Button className='orangeFactory' type='primary' htmlType='submit' loading={savingCallStatus} disabled={savingCallStatus}>
                          {isEdit ? 'Update' : 'Add'}
                        </Button>
                      </Form.Item>
                      {/* </Col>
                    <Col span={12}> */}
                      <Form.Item>
                        <Button onClick={handleClickBack} disabled={savingCallStatus}>
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

export default DefinitionsForm;
