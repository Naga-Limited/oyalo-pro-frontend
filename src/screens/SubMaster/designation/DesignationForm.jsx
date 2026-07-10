import React, {useState} from 'react';
import {Card, Button, Col, Row, Form, Input, Radio} from 'antd';
import {useLocation, useNavigate} from 'react-router';
import {useDispatch, useSelector} from 'react-redux';
import messageToast from '../../../components/messageToast/messageToast';
import {saveDesignation, updateDesignation} from '../../../@app/subMaster/subMasterSlice';
import {transStatus} from '../../../util/transStatus';
import ConfirmOnExit from '../../../components/confirmOnExit/ConfirmOnExit';

function DesignationForm() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    state: {data: defaultValue, isEdit = false}
  } = useLocation();

  const [status, setStatus] = useState(defaultValue?.status ?? 1);

  const {savingDesignation} = useSelector((state) => {
    return state.subMaster;
  });

  const { userData } = useSelector((state) => state.auth);

  const onFinish = (data) => {
    setShowDialog(false);
    dispatch(defaultValue?.id ? updateDesignation({data: {...data, 
      updated_by: userData.data?.id ?? "0",
      status: transStatus({status}), id: defaultValue.id}}) : saveDesignation({data, 
        created_by: userData.data?.id ?? "0",
        status: transStatus({status})})).then(
      ({message, status, statusText}) => {
        if (status === 200) {
          form.resetFields();
          navigate('/designation');
        }
        messageToast({message: message ?? statusText, status, title: 'Designation Master'});
      }
    );
  };

  const handleClickBack = () => {
    navigate('/designation');
  };

  const [showDialog, setShowDialog] = useState(false);
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
              initialValues={{
                status: defaultValue?.status ?? 1,
                ...defaultValue
              }}
              form={form}
              autoComplete='off'>
              <Row gutter={[15, 0]}>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='name' label='Add Designation' rules={[{required: true, message: 'Please select add designation'}]}>
                    <Input name='name' placeholder='Enter Designation' disabled={savingDesignation} />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item name='status' label='Status' rules={[{required: true, message: 'Please slect your status'}]}>
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
                        <Button className='orangeFactory' type='primary' htmlType='submit' disabled={savingDesignation} loading={savingDesignation}>
                          {isEdit ? 'Update' : 'Add'}
                        </Button>
                      </Form.Item>
                      {/* </Col>
                    <Col span={12}> */}
                      <Form.Item>
                        <Button onClick={handleClickBack} disabled={savingDesignation}>
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

export default DesignationForm;
