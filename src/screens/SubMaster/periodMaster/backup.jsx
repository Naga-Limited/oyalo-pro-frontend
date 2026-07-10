import React, {useEffect, useState} from 'react';
import {Card, Button, Col, Row, Select, Form, Input, Radio} from 'antd';
import {map} from 'ramda';
import {useLocation, useNavigate} from 'react-router';
import {useDispatch, useSelector} from 'react-redux';
import messageToast from '../../../components/messageToast/messageToast';
import {transStatus} from '../../../util/transStatus';
import { getAuditCategory} from '../../../@app/master/masterSlice';

import ConfirmOnExit from '../../../components/confirmOnExit/ConfirmOnExit';
import {savePeriod, updatePeriod} from '../../../@app/subMaster/subMasterSlice';

function PeriodForm() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showDialog, setShowDialog] = useState(false);

  // useEffect(() => {
  //   dispatch(getLicense());
  // }, [dispatch]);

  // const {savingPeriod} = useSelector((state) => {
  //   return state.subMaster;
  // });
  const {Option} = Select;
  // const {
  //   // getLicenseResponse: {data: license},
  //   getLicenseResponse: {data: license},
  //   gettingLicense,
  //   // gettingLicense,
  //   //getLicenseLevelResponse: {data: licenseLevels}
  // } = useSelector((state) => {
  //   return state.subMaster;
  // });
  
  const {
    gettingAuditCategory,
   
    getAuditCategoryResponse: {data: AuditCategory}
  } = useSelector((state) => {
    return state.master;
  });

  useEffect(() => {
    dispatch(getAuditCategory());
  }, [dispatch]);

  const {
    getLicenseResponse: {data},
    gettingLicense,
    savingPeriod
  } = useSelector((state) => {
    return state.subMaster;
  });
  const {
    state: {data: defaultValue, isEdit = false}
  } = useLocation();

  const [status, setStatus] = useState(defaultValue?.status ?? 1);

  const onFinish = (data) => {
    setShowDialog(false);
    dispatch(defaultValue?.id ? updatePeriod({data: {...data, status: transStatus({status}), id: defaultValue.id}}) : savePeriod({data})).then(
      ({message, status, statusText}) => {
        if (status === 200) {
          navigate('/periodMaster');
          form.resetFields();
        }
        messageToast({message: message ?? statusText, status, title: 'Period Master'});
      }
    );
  };


  const handleClickBack = () => {
    navigate('/periodMaster');
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
             initialValues={{status}}
              onFinish={onFinish}
              autoComplete='off'
              form={form}>
              <Row gutter={[15, 0]}>
              <Col md={{span: 6}} xs={{span: 24}} lg={{span: 5}}>
                  <Form.Item name='auditcategory_ID' label='Add Category ' rules={[{required: true, message: 'Please select category'}]}>
                    <Select
                      placeholder='Select'
                      loading={gettingAuditCategory}
                      // disabled={savingCity}
                      showSearch
                      filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                      {map(
                        (AuditCategory) => {
                          return (
                            <Option key={AuditCategory.id} value={AuditCategory.id}>
                              {AuditCategory.name}
                            </Option>
                          );
                        },
                        AuditCategory ? AuditCategory : []
                      )}
                    </Select>
                  </Form.Item>
                </Col>

              {/* <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='license' label='License Type' rules={[{required: true, message: 'Please select license type'}]}>
                    <Select
                      placeholder='Select'
                      loading={gettingLicense}
                      // disabled={savingCity}
                      name="license"
                      showSearch
                      filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                      {map(
                        (license) => {
                          return (
                            <Option key={license.id} value={license.id}>
                              {license.name}
                            </Option>
                          );
                        },
                        license ? license.filter((e) => e.status === '1') : []
                      )}
                    </Select>
                  </Form.Item>
                </Col> */}

<Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='license' label='License Type' rules={[{required: true, message: 'Please select License Type'}]}>
                    <Select
                      placeholder='Select'
                      disabled={savingPeriod}
                      loading={gettingLicense}
                      defaultValue={defaultValue?.license.id}
                      showSearch
                      filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                      {map(
                        (license) => { 
                          return (
                            <Option key={license.id} value={license.id}>
                              {license.name}
                            </Option>
                          );
                        },
                        data ? data?.filter((e) => e.status === '1') : []
                      )}
                    </Select>
                  </Form.Item>
                </Col>
                {/* <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='name' label='Add License Type' rules={[{required: true, message: 'Please select add division'}]}>
                    <Input name='name' placeholder='Enter License' disabled={savingPeriod} />
                  </Form.Item>
                </Col> */}
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='Renewal' label='Add Renewal Frequency' rules={[{required: true, message: 'Please select add Renewal'}]}>
                    <Input name='Renewal' placeholder='Enter Renewal' disabled={savingPeriod} />
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='Escalation' label='Add Escalation Mail' rules={[{required: true, message: 'Please select add Escalation'}]}>
                    <Input name='Escalation' placeholder='Enter Renewal' disabled={savingPeriod} />
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='Escmail' label='Add Days For Escmail One' rules={[{required: true, message: 'Please select add Escmail'}]}>
                    <Input name='Escmail' placeholder='Enter Renewal' disabled={savingPeriod} />
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='Escalation_mail_two' label='Add Escalation_mail_two' rules={[{required: true, message: 'Please select add Escalation_mail_two'}]}>
                    <Input name='Escalation_mail_two' placeholder='Enter Renewal' disabled={savingPeriod} />
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='days_for_escmail_two' label='Add Escalation_mail_two' rules={[{required: true, message: 'Please select add days_for_escmail_two'}]}>
                    <Input name='days_for_escmail_two' placeholder='Enter Renewal' disabled={savingPeriod} />
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='escalation_mail_three' label='Add Escalation_mail_two' rules={[{required: true, message: 'Please select add escalation_mail_three'}]}>
                    <Input name='escalation_mail_three' placeholder='Enter Renewal' disabled={savingPeriod} />
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='days_for_escmail_three' label='Add Escalation_mail_two' rules={[{required: true, message: 'Please select add days_for_escmail_three'}]}>
                    <Input name='days_for_escmail_three' placeholder='Enter Renewal' disabled={savingPeriod} />
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
                        <Button className='orangeFactory' type='primary' htmlType='submit' loading={savingPeriod} disabled={savingPeriod}>
                          {isEdit ? 'Update' : 'Add'}
                        </Button>
                      </Form.Item>
                      {/* </Col>
                    <Col span={12}> */}
                      <Form.Item>
                        <Button onClick={handleClickBack} disabled={savingPeriod}>
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

export default PeriodForm;
