/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import {Card, Button, Radio, Col, Row, Form, Input} from 'antd';
import {useLocation, useNavigate} from 'react-router';
import {transStatus} from '../../../util/transStatus';
import {useDispatch, useSelector} from 'react-redux';
import {addAuditCategory, updateAuditCategory} from '../../../@app/master/masterSlice';
import ConfirmOnExit from '../../../components/confirmOnExit/ConfirmOnExit';

function AuditCategoryForm() {
  const {
    state: {data: defaultValue = {}, isEdit = false}
  } = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [status, setStatus] = useState(defaultValue?.status ?? 1);

  const {savingAuditCategory} = useSelector((state) => {
    return state.master;
  });

  const onFinish = (data) => {
    setShowDialog(false);
    dispatch(
      defaultValue?.id
        ? updateAuditCategory({data: {...data, status: transStatus({status}), id: defaultValue?.id}})
        : addAuditCategory({data: {...data, status: transStatus({status})}})
    ).then(({status}) => {
      if (status === 200) {
        form.resetFields();
        navigate('/auditCategory');
      }
    });
  };

  const handleClickBack = () => {
    navigate('/auditCategory');
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
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='name' label='Add Category' rules={[{required: true, message: 'Please enter category'}]}>
                    <Input onChange={onChange} placeholder='Enter Category' disabled={savingAuditCategory} />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item name='status' label='Status ' rules={[{required: true, message: 'Please select your status'}]}>
                    <Radio.Group>
                      <Radio.Group
                        buttonStyle='solid'
                        disabled={savingAuditCategory}
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
                {/* <Col span={24}>
                  <Row gutter={[15, 15]} style={{justifyContent: 'çenter'}}>
                    <Col span={12} style={{textAlign: 'right'}}>
                      <Form.Item>
                        <Button className='orangeFactory' type='primary' htmlType='submit' disabled={savingAuditCategory} loading={savingAuditCategory}>
                          Submit
                        </Button>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item>
                        <Button onClick={handleClickBack} disabled={savingAuditCategory}>
                          Back
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Col> */}

                <Col span={24}>
                  <Row gutter={[15, 15]} style={{justifyContent: 'end'}}>
                    <Col span={12} className='d-flex justify-content-end align-items-center'>
                      <Form.Item className='mx-2'>
                        <Button className='orangeFactory' type='primary' htmlType='submit' disabled={savingAuditCategory}>
                          {isEdit ? 'Update' : 'Add'}
                        </Button>
                      </Form.Item>
                      {/* </Col>
                    <Col span={12}> */}
                      <Form.Item>
                        <Button disabled={savingAuditCategory} onClick={handleClickBack}>
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

export default AuditCategoryForm;
