import React, { useEffect, useState } from 'react';
import { Card, Button, Col, Row, Select, Form, Radio ,Tooltip, InputNumber} from 'antd';
import { map } from 'ramda';
import { useLocation, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import messageToast from '../../../components/messageToast/messageToast';
import { transStatus } from '../../../util/transStatus';
import { getLicense, savePeriod, updatePeriod,getEmployeeMaster} from '../../../@app/master/masterSlice';
//import {getEmployeeMaster} from '../../../@app/master/masterSlice';
import ConfirmOnExit from '../../../components/confirmOnExit/ConfirmOnExit';
const {Option} = Select;
//import {savePeriod, updatePeriod} from '../../../@app/subMaster/subMasterSlice';

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
      //getModulesScreenListResponse: {data: modulesScreen},
    gettingLicense,
    gettingEmployeeMaster,
    getEmployeeMasterResponse: {data: EmployeeList},
   // getReportResponse: {data: Reports},
      
    getLicenseResponse: { data: License }
   
  } = useSelector((state) => {
    return state.master;
  });

  useEffect(() => {
    dispatch(getLicense());
  }, [dispatch]);
  // useEffect(() => {
  //   dispatch(getModulesList());
  // }, [dispatch]);

  useEffect(() => {
    dispatch(getEmployeeMaster());
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(getReport());
  // }, [dispatch]);
  const {
    savingPeriod
  } = useSelector((state) => {
    return state.master;
  });
  const {
    state: { data: defaultValue, isEdit = false }
  } = useLocation();

  const [status, setStatus] = useState(defaultValue?.status ?? 1);

  const onFinish = (data) => {
    setShowDialog(false);

    dispatch(defaultValue?.id ? updatePeriod({ data: { ...data, status: transStatus({ status }), id: defaultValue.id } }) : savePeriod({ data })).then(
      ({ message, status, statusText }) => {
        if (status === 200) {
          navigate('/periodMaster');
          form.resetFields();
        }
        else{
          navigate('/periodMaster');
          form.resetFields();
        }
        messageToast({ message: message ?? statusText, status, title: 'Period Master' });
      }
    );
  };

  const handleOnChange = (e) => {
    if ((e.target.name === 'Renewal') || (e.target.name === 'Escmail') || (e.target.name === 'days_for_escmail_two') || (e.target.name === 'days_for_escmail_three')) {
      return form.setFieldsValue({
        [e.target.name]: e.target.value.replace(/[^0-9 ./]/g, '')
      });
    }
  };


  const handleClickBack = () => {
    navigate('/periodMaster');
  };


  return (
    <>
      <Card>
        <ConfirmOnExit showModel={showDialog} />
        <Row style={{ justifyContent: 'center' }}>
          <Col span={24}>
            <Form
              onFieldsChange={() => setShowDialog(true)}
              name='basic'
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              initialValues={{
                license: defaultValue?.license_type_id,
                report_id:  defaultValue?.report_id,
                ...defaultValue,
                status: defaultValue?.status ?? 1
              }}
              onFinish={onFinish}
              autoComplete='off'
              form={form}>
              <Row gutter={[15, 0]}>
           
                {/* <Col span={6}>
                  <Form.Item name='Escalation_mail_two' label='Module Screen'>
                    <Select
                      placeholder='select'
                      name='Escalation_mail_two'
                      mode='multiple'
                       defaultValue={defaultValue?.Escalation_mail_two}
                      showSearch
                      filterOption={(input, option) => option.children.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                      {map(
                        (Employee) => {
                          return (
                            <Option key={Employee.id} value={Employee.id}>
                              {Employee.name}
                            </Option>
                          );
                        },
                        EmployeeList ? EmployeeList?.filter((e) => e.status === '1') : []
                      )}
                    </Select>
                  </Form.Item>
                </Col> */}
                <Col md={{ span: 6 }} xs={{ span: 24 }} lg={{ span: 5 }}>
                  <Form.Item name='license' label='License Type' rules={[{ required: true, message: 'Please select license type' }]}>
                    <Select
                      name="license"
                      placeholder='Select'
                      loading={gettingLicense}
                      disabled={savingPeriod}
                      defaultValue={defaultValue?.license}
                      showSearch
                      filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                      {map(
                        (Period) => {
                          return (
                            <Option key={Period.id} value={Period.id}>
                              {Period.name}
                            </Option>
                          );
                        },
                        License ? License.filter((e) => e.status === '1') : []
                        
                      )}
                    </Select>
                  </Form.Item>
                </Col>
                </Row>
                {/* <Col md={{ span: 6 }} xs={{ span: 24 }} lg={{ span: 5 }}>
                  <Form.Item name='Escalation_mail_two' label='Report Type' rules={[{ required: true, message: 'Please select license type' }]}>
                    <Select
                      name="Escalation_mail_two"
                      placeholder='Select' 
                      mode="multiple"
                      //loading={getReportResponse}
                      disabled={savingPeriod}
                      defaultValue={defaultValue?.Escalation_mail_two}
                      showSearch
                      filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                      {map(
                        (Employee) => {
                          return (
                            <Option key={Employee.id} value={Employee.id}>
                              {Employee.name} <span className='mx-2'>({Employee.employee_code})</span>
                            </Option>
                          );
                        },
                        EmployeeList ? EmployeeList : []
                      )}
                    </Select>
                  </Form.Item>
                </Col>        */}

                {/* <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='name' label='Add License Type' rules={[{required: true, message: 'Please select add division'}]}>
                    <Input name='name' placeholder='Enter License' disabled="" />
                  </Form.Item>
                </Col> */}
                {/* <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item name='Renewal' label='Email Start Days' rules={[{ required: true, message: 'Please select add Renewal' }]}>
                    <Input name='Renewal' onChange={handleOnChange} placeholder='Enter Renewal' disabled={savingPeriod} defaultValue={defaultValue?.Renewal} />
                  </Form.Item>
                </Col> */}
                 <Row gutter={[15, 0]}>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item name='Escalation' label='Escalation  Level One' rules={[{ required: true, message: 'Please select add Escalation' }]}>
                    {/* <Input name='Escalation' placeholder='Enter Renewal' disabled={savingPeriod} defaultValue={defaultValue?.Escalation}/> */}
                    <Select
                      placeholder='select'
                      mode='multiple'
                      //onChange={(e) => setNewEmployee(e)}
                      name="Escalation"
                      defaultValue={defaultValue?.Escalation}
                      showSearch
                      loading={gettingEmployeeMaster}
                      filterOption={(input, option) => option.children.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                      {map(
                        (Employee) => {
                          return (
                            <Option key={Employee.id} value={Employee.employee_code}>
                              {Employee.name}<Tooltip placement="topLeft" title={Employee.email}> <span className='mx-2'>({Employee.employee_code})</span>
                              </Tooltip>
                            </Option>
                          );
                        },
                        EmployeeList ? EmployeeList?.filter((e) => e.status === '1') : []
                      )}
                    </Select>
                  </Form.Item>
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item name='Escmail' label='Days For Escalation Level One' rules={[{ required: true, message: 'Please select add Escmail Minimum 10Days' }]}>
                    <InputNumber name='Escmail'  min={10} max={100} placeholder='Enter Renewal' defaultValue={defaultValue?.Escmail} disabled={savingPeriod} />
                  </Form.Item>
                </Col>
                </Row>
                {/* <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item name='Escalation_mail_two' label='Add Escalation_mail_two' rules={[{ required: true, message: 'Please select add Escalation_mail_two' }]}>
                    <Input name='Escalation_mail_two' placeholder='Enter Renewal' disabled={savingPeriod} />
                  </Form.Item>
                </Col> */}

               {/* <Col span={6}>
                  <Form.Item name='Escalation_mail_two' label='Add Escalatname
                        EmployeeList ? EmployeeList?.filter((e) => e.status === '1') : []
                      )}
                    </Select>
                  </Form.Item>
                </Col> */}
                {/* <Col span={6}>
                  <Form.Item name='report_id' label='Employee Screen'>
                    <Select
                      placeholder='select'
                      defaultValue={defaultValue?.Escalation_mail_two}
                     // loading={gettingEmployeMaster}
                      disabled={savingPeriod}
                      mode='multiple'
                      showSearch
                      filterOption={(input, option) => option.children.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                      {map(
                        (Report) => {
                          return (
                            <Option key={Report.id} value={Report.id}>
                              {Report.name}
                            </Option>
                          );
                        },
                        Reports ? Reports?.filter((e) => e.status === '1') : []
                      )}
                    </Select>
                  </Form.Item>
                </Col> */}
                 <Row gutter={[15, 0]}>
                <Col span={6}>
                  <Form.Item name='Escalation_mail_two' label='Escalation  Level Two' 
                   rules={[
                    {
                      required: true,
                      message: 'Please select Escalation Mail'
                    }
                  ]}>
                    <Select
                      placeholder='select'
                      mode='multiple'
                      //onChange={(e) => setNewEmployee(e)}
                      name="Escalation_mail_two"
                      defaultValue={defaultValue?.Escalation_mail_two}
                      showSearch
                      loading={gettingEmployeeMaster}
                      filterOption={(input, option) => option.children.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                      {map(
                        (Employee) => {
                          return (
                            <Option key={Employee.id} value={Employee.employee_code}>
                              {Employee.name}<Tooltip placement="topLeft" title={Employee.email}>  <span className='mx-2'>({Employee.employee_code})</span>
                            </Tooltip>
                            </Option>
                          );
                        },
                        EmployeeList ? EmployeeList?.filter((e) => e.status === '1') : []
                      )}
                    </Select>
                  </Form.Item>
                </Col>
                             
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item name='days_for_escmail_two' label=' Days For  Escalation Level Two' rules={[{ required: true, message: 'Please select add days_for_escmail_two' }]}>
                    <InputNumber name='days_for_escmail_two' min={10} max={100} onChange={handleOnChange} placeholder='Enter Renewal' disabled={savingPeriod} defaultValue={defaultValue?.days_for_escmail_two} />
                  </Form.Item>
                </Col>
                </Row>


              <Row gutter={[15, 0]}>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item name='escalation_mail_three' label='Escalation Level Three' rules={[{ required: true, message: 'Please select add escalation_mail_three' }]}>
                    {/* <Input name='escalation_mail_three' placeholder='Enter Renewal' disabled={savingPeriod} defaultValue={defaultValue?.escalation_mail_three}/> */}
                    <Select
                      placeholder='select'
                      mode='multiple'
                      //onChange={(e) => setNewEmployee(e)}
                      name="escalation_mail_three"
                      defaultValue={defaultValue?.escalation_mail_three}
                      showSearch
                      loading={gettingEmployeeMaster}
                      filterOption={(input, option) => option.children.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                      {map(
                        (Employee) => {
                          return (
                            <Option key={Employee.id} value={Employee.employee_code}>
                              {Employee.name}<Tooltip placement="topLeft" title={Employee.email}>  <span className='mx-2'>({Employee.employee_code})</span>
                            </Tooltip>
                            </Option>
                          );
                        },
                        EmployeeList ? EmployeeList?.filter((e) => e.status === '1') : []
                      )}
                    </Select>
                  </Form.Item>
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item name='days_for_escmail_three' label='Days For Escalation Level Three' rules={[{ required: true, message: 'Please select add days_for_escmail_three' }]}>
                    <InputNumber name='days_for_escmail_three' min={10} max={100} onChange={handleOnChange} placeholder='Enter Renewal' disabled={savingPeriod} defaultValue={defaultValue?.days_for_escmail_three}/>
                  </Form.Item>
                </Col>
                </Row>

                <Col span={24}>
                  <Form.Item name='status' label='Status ' rules={[{ required: true, message: 'Please slect your status' }]}>
                    <Col span={24}>
                      <Radio.Group
                       name='status'
                        buttonStyle='solid'
                        onChange={(e) => {
                          setStatus(e?.target?.value);
                        }}
                        size='small'
                        defaultValue={defaultValue?.status === 'Active' ? 1 : 0}
                        >
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
                  <Row gutter={[15, 15]} style={{ justifyContent: 'end' }}>
                    <Col span={6} style={{ textAlign: 'right' }} className='d-flex align-items-center justify-content-end mt-3'>
                      {/* <Row gutter={[15, 0]}>
                  <Col md={{span: 6}} xs={{span: 24}} lg={{span: 5}}> */}
                      <Form.Item className='mx-2'>
                        <Button className='orangeFactory' type='primary' htmlType='submit' loading={savingPeriod} disabled={savingPeriod}>
                          {isEdit ? 'Update' : 'Submit'}
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
             
            </Form>
          </Col>
        </Row>
      </Card>
    </>
  );
}

export default PeriodForm;
