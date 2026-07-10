import React, {useEffect, useState} from 'react';
import {Card, Select, Button, Radio, Col, Row, Form, Input} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {addRoleMaster, getRoleList} from '../../../@app/master/masterSlice';
import {map} from 'ramda';
import {useNavigate} from 'react-router';
import messageToast from '../../../components/messageToast/messageToast';
import ConfirmOnExit from '../../../components/confirmOnExit/ConfirmOnExit';
const {Option} = Select;

function RoleMasterForm() {
  const [status, setStatus] = useState(1);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);

  const onFinish = (data) => {
    setShowDialog(false);
    dispatch(addRoleMaster({data})).then(({message, status, statusText}) => {
      if (status === 200) {
        form.resetFields();
        navigate('/roleMaster');
      }
      messageToast({message: message ?? statusText, status, title: 'Role Master'});
    });
  };

  const handleClickBack = () => {
    navigate('/roleMaster');
  };

  useEffect(() => {
    dispatch(getRoleList());
  }, [dispatch]);

  const {
    gettingRoleMasterList,
    getRoleMasterListResponse: {data: roleMasterList},
    savingRoleMaster
  } = useSelector((state) => {
    return state.master;
  });

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
              initialValues={{status: status}}
              onFinish={onFinish}
              form={form}
              autoComplete='off'>
              <Row gutter={[15, 0]}>
                <Col span={6} xs={{span: 24}}>
                  <Form.Item name='name' label='Add Role' rules={[{required: true, message: 'Please select role'}]}>
                    <Input name='name' placeholder='Enter Designation' />
                  </Form.Item>
                </Col>
                <Col span={6} xs={{span: 24}}>
                  <Form.Item name='role' label='Select Role Response' rules={[{required: true, message: 'Please select state'}]}>
                    <Select
                      placeholder='Select Role Response'
                      mode='multiple'
                      showSearch
                      loading={gettingRoleMasterList}
                      filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                      {map(
                        (role) => {
                          return (
                            <Option key={role.id} value={role.id}>
                              {role.name}
                            </Option>
                          );
                        },
                        roleMasterList ? roleMasterList : []
                      )}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={24} xs={{span: 24}}>
                  <Form.Item name='status' label='Status ' rules={[{required: true, message: 'Please slect your status'}]}>
                    <Radio.Group
                      buttonStyle='solid'
                      onChange={(e) => {
                        setStatus(e?.target?.value);
                      }}
                      size='small'
                      // defaultValue={defaultValue?.status === 'In Active' ? 0 : 1}
                    >
                      <Radio.Button className='active' value={1}>
                        Active
                      </Radio.Button>
                      <Radio.Button className='in-active' value={0}>
                        In-Active
                      </Radio.Button>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Row gutter={[15, 15]} style={{justifyContent: 'end'}}>
                    <Col span={12} style={{textAlign: 'right'}} className='d-flex align-items-center justify-content-end mt-3'>
                      <Form.Item className='mx-2'>
                        <Button className='orangeFactory' type='primary' htmlType='submit' disabled={savingRoleMaster} loading={savingRoleMaster}>
                          Add
                        </Button>
                      </Form.Item>
                      {/* </Col>
                    <Col span={12}> */}
                      <Form.Item>
                        <Button onClick={handleClickBack} disabled={savingRoleMaster}>
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

export default RoleMasterForm;
