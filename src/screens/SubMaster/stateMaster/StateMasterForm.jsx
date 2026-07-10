import React, {useState} from 'react';
import {Card, Button, Col, Row, Form, Input, Radio} from 'antd';
import {useLocation, useNavigate} from 'react-router';
import {useDispatch, useSelector} from 'react-redux';
import {saveState, updateState} from '../../../@app/subMaster/subMasterSlice';
import {transStatus} from '../../../util/transStatus';
import ConfirmOnExit from '../../../components/confirmOnExit/ConfirmOnExit';

function StateMasterForm() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    state: {data: defaultValue, isEdit = false}
  } = useLocation();

  const [status, setStatus] = useState(defaultValue?.status ?? 1);
  const [showDialog, setShowDialog] = useState(false);

  const {savingState} = useSelector((state) => {
    return state.subMaster;
  });

  const { userData } = useSelector((state) => state.auth);
 
  const onFinish = (data) => { 
    dispatch(defaultValue?.id ? updateState({data: {...data, 
      updated_by: userData.data?.id ?? "0",
      status: transStatus({status}), id: defaultValue.id}}) : saveState({    
       data,    
        created_by: userData.data?.id ?? "0",              
        status: transStatus({status})})).then(({status}) => {
      if (status === 200) {
        form.resetFields();
        setShowDialog(false);
        navigate('/stateMaster');
      }
    });
  };

  const handleClickBack = () => {
    navigate('/stateMaster');
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
              onFinish={onFinish}
              disabled={savingState}
              form={form}
              initialValues={{status: defaultValue?.status ?? 1, ...defaultValue}}
              autoComplete='off'>
              <Row gutter={[15, 0]}>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='name' label='State Name' rules={[{required: true, message: 'Please enter state name'}]}>
                    <Input placeholder='Enter state Name' />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item name='status' label='Status' rules={[{required: true, message: 'Please slect your status'}]}>
                    <Col span={24}>
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
                    </Col>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Row gutter={[15, 15]} style={{justifyContent: 'end'}}>
                    <Col span={12} style={{textAlign: 'right'}} className='d-flex align-items-center justify-content-end mt-3'>
                      <Form.Item className='mx-2'>
                        <Button className='orangeFactory' type='primary' htmlType='submit' disabled={savingState} loading={savingState}>
                          {isEdit ? 'Update' : 'Add'}
                        </Button>
                      </Form.Item>
                      {/* </Col>
                    <Col span={12}> */}
                      <Form.Item>
                        <Button onClick={handleClickBack} disabled={savingState}>
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

export default StateMasterForm;
