import React, {useState} from 'react';
import {Card, Button, Col, Row, Form, Input, Radio} from 'antd';
import {useLocation, useNavigate} from 'react-router';
import {useDispatch, useSelector} from 'react-redux';
import messageToast from '../../../components/messageToast/messageToast';
import {saveDivision, updateDivision} from '../../../@app/subMaster/subMasterSlice';
import {transStatus} from '../../../util/transStatus';
import ConfirmOnExit from '../../../components/confirmOnExit/ConfirmOnExit';

function DivisionForm() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showDialog, setShowDialog] = useState(false);

  const {savingDivision} = useSelector((state) => {
    return state.subMaster;
  });

  const {
    state: {data: defaultValue, isEdit = false}
  } = useLocation();

  const [status, setStatus] = useState(defaultValue?.status ?? 1);

  const { userData } = useSelector((state) => state.auth);

  const onFinish = (data) => {
    setShowDialog(false);
    dispatch(defaultValue?.id ? updateDivision({data: {...data,
      updated_by: userData.data?.id ?? "0",
       status: transStatus({status}), id: defaultValue.id}}) : saveDivision({data, 
        created_by: userData.data?.id ?? "0",
        status: transStatus({status})})).then(
      ({message, status, statusText}) => {
        if (status === 200) {
          navigate('/division');
          form.resetFields();
        }
        messageToast({message: message ?? statusText, status, title: 'Division Master'});
      }
    );
  };

  const handleClickBack = () => {
    navigate('/division');
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
                  <Form.Item name='name' label='Add Division' rules={[{required: true, message: 'Please select add division'}]}>
                    <Input name='name' placeholder='Enter Division' disabled={savingDivision} />
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
                        <Button className='orangeFactory' type='primary' htmlType='submit' loading={savingDivision} disabled={savingDivision}>
                          {isEdit ? 'Update' : 'Add'}
                        </Button>
                      </Form.Item>
                      {/* </Col>
                    <Col span={12}> */}
                      <Form.Item>
                        <Button onClick={handleClickBack} disabled={savingDivision}>
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

export default DivisionForm;
