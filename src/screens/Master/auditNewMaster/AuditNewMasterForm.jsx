/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import {Card,Select, Button, Radio, Col, Row, Form, Input} from 'antd';
import {useLocation, useNavigate} from 'react-router';
import {transStatus} from '../../../util/transStatus';
import {useDispatch, useSelector} from 'react-redux';
import {map} from 'ramda';
import messageToast from "../../../components/messageToast/messageToast";
import {getAuditCategoryPointList, getAuditCategory,getEmployeeMaster, getAuditSubCategory,addAuditMaster, updateAuditMaster} from '../../../@app/master/masterSlice';
import ConfirmOnExit from '../../../components/confirmOnExit/ConfirmOnExit';
import {getDepartment} from '../../../@app/subMaster/subMasterSlice';
const {Option} = Select;
function AuditNewMasterForm() {
  const {
    state: {data: defaultValue = {}, isEdit = false}
  } = useLocation();
  const [loading, setLoading] = useState(false);
  const [newEmployee, setNewEmployee] = useState('');
  const {
    gettingDepartment,
    getDepartmentResponse: {data: departmentList}
  } = useSelector((state) => {
    return state.subMaster;
  });
const{
   getEmployeeMasterResponse: {data: EmployeeList},
  } = useSelector((state) => {
   return state.master;
});

  const dispatch = useDispatch();

useEffect(()=>{
  dispatch(getEmployeeMaster());
},[]);

  useEffect(() => {
    dispatch(getDepartment());
  }, []);

  const navigate = useNavigate();
  const [form] = Form.useForm();
  const EmpId = Form.useWatch('employee_id', form);
  const type = Form.useWatch('type',form);
  const auditcategory_ID = Form.useWatch('auditcategory_ID', form);
  const auditsubcategory_ID = Form.useWatch('auditsubcategory_ID', form);
  const auditpointslist_ID = Form.useWatch('auditpointslist_ID', form);   
  const department = Form.useWatch('department_id', form);   
  const Score = Form.useWatch('Score', form);   
  const CAPA_Score = Form.useWatch('CAPA_Score', form);
  const employee_id = Form.useWatch('employee_id', form);   

 
  useEffect(() => {
    setNewEmployee(EmpId);
  }, [EmpId]);

 const [status, setStatus] = useState(defaultValue?.status ?? 1);

  const {savingAuditMaster} = useSelector((state) => {
     return state.master;
  });

  const { userData } = useSelector((state) => state.auth);

  const onFinish = (data) => {
   let id;
    if (defaultValue?.id) {
      id = defaultValue?.id;
    }
    setLoading(true);
    setShowDialog(false);
     dispatch(
     
      defaultValue?.id
        ? updateAuditMaster(
          {
          data:{
          status: transStatus({status}),
          auditcategory_ID,
          auditsubcategory_ID,
          auditpointslist_ID,
          department,
          Score,
          CAPA_Score,
          type,
          employee_id,
          updated_by: userData.data?.id ?? "0",
          id
  }})
        : addAuditMaster({
          data: {
            type,
            auditcategory_ID,
            auditsubcategory_ID,
            auditpointslist_ID,
            department,
            Score,
            CAPA_Score,
            employee_id,
            created_by : userData.data?.id ?? "0",
            status: transStatus({status})},             
          })
    ).then(({ message, status, statusText }) => {
      if (status === 200) {
        form.resetFields();
        setLoading(false);
        setTimeout(() => {
        navigate('/auditNewMaster');},1000)
      }
      messageToast({
        message: message ?? statusText,
        status,
        title: "Audit Master"
      });
    });
  };

  const {
    gettingAuditCategory,
    gettingAuditSubCategory,
    gettingAuditCategoryPointList,
    getAuditSubCategoryResponse: {data: AuditSubCategory},
    getAuditCategoryResponse: {data: AuditCategory},
    getAuditCategoryPointListResponse: {data: AuditCategoryPointList}
  } = useSelector((state) => {
    return state.master;
  });


  useEffect(() => {
    dispatch(getAuditCategory());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAuditSubCategory(auditcategory_ID));
  }, [dispatch, auditcategory_ID]);

  useEffect(() => {
    dispatch(getAuditCategoryPointList(auditsubcategory_ID));
  }, [dispatch, auditsubcategory_ID]);

  const handleClickBack = () => {
    navigate('/auditNewMaster');
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
              initialValues={{
                
                auditcategory_ID: defaultValue?.category_id,
                auditsubcategory_ID: defaultValue?.subcategory_id,
                auditpointslist_ID: defaultValue?.point_id,
                department:defaultValue?.department_id,
                Score:defaultValue?.score,
                CAPA_Score:defaultValue?.capa_score,
                employee_id:defaultValue?.responsible_employee_id,
                status: defaultValue?.status ?? 1, ...defaultValue}}
              onFinish={onFinish}
              form={form}
              autoComplete='off'>
              <Row gutter={[15, 0]}>
            
              <Col md={{span: 6}} xs={{span: 24}} lg={{span: 6}}>
                  <Form.Item name='auditcategory_ID' label='Select Category ' rules={[{required: true,message: 'Select category'}]}>
                    <Select
                      placeholder='Select'
                      loading={gettingAuditCategory}
                       disabled={isEdit}
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
                        AuditCategory ? AuditCategory.filter((e) => e.status == '1') : []
                      )}
                    </Select>
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}} lg={{span: 6}}>
                  <Form.Item name='auditsubcategory_ID' label='Select Sub Category' rules={[{required: true, message: 'Select category'}]}>
                    <Select
                      placeholder='Select'
                      loading={gettingAuditSubCategory}
                      disabled={isEdit}
                      showSearch
                      filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                      {map(
                        (aSubCategory) => {
                          return (aSubCategory?.audit_subcategory ?? [])?.map((aSubCategoryName, index) => {
                            return (
                              <Option key={index} value={aSubCategoryName?.id}>
                                {aSubCategoryName?.value}
                              </Option>
                            );
                          });
                        },
                        AuditSubCategory ? AuditSubCategory : []
                      )}
                      </Select>
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}} lg={{span: 10}}>
                  <Form.Item name='auditpointslist_ID' label='Select Points' rules={[{required: true, message: 'Select points'}]}>
                    <Select
                      placeholder='Select'
                      loading={gettingAuditCategoryPointList}
                      disabled={isEdit}
                      showSearch
                      filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>                    
                   {map(
                        (auditpoint) => {
                          return (
                            <Option key={auditpoint.id} value={auditpoint.id}>
                              {auditpoint.name}
                            </Option>
                          );
                        },
                        AuditCategoryPointList ? AuditCategoryPointList .filter((e) => e.status == '1') : []
                    )}                                                             
                    </Select>
                  </Form.Item>                 
                </Col>
                <Col md={{span: 3}} xs={{span: 24}}>
                  <Form.Item name='type' label='Audit Type' rules={[{required: false, message: 'Enter Audit Type'}]}>
                    <Select name='type' disabled={isEdit} placeholder='Audit Type'>
                      <Input name='outlet' value='Outlet' />
                      <Input name='department' value='Department' />
                      </Select>
                  </Form.Item>
                </Col>          
                <Col md={{span: 6}} xs={{span: 24}} lg={{span: 5}}>
                  <Form.Item name='department_id' label='Select Department' rules={[{required: true, message: 'Select Department'}]}>
                    <Select
                      placeholder='Select'
                      loading={gettingDepartment}
                      showSearch
                      filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>                    
                   {map(
                        (auditpoint) => {
                          return (
                            <Option key={auditpoint.id} value={auditpoint.id}>
                              {auditpoint.name}
                            </Option>
                          );
                        },
                        departmentList ? departmentList.filter((e) => e.status == '1') : []
                    )}                                                             
                    </Select>
                  </Form.Item>                 
                </Col>
                <Col md={{span: 4}} xs={{span: 24}} lg={{span: 4}}>
                  <Form.Item name='employee_id' label='Select Employee' rules={[{required: true, message: 'select Employee'}]}>
                  <Select
                      placeholder='Select'
                      onChange={(e) => setNewEmployee(e)}
                      defaultValue={defaultValue?.employee_id}
                      showSearch
                      filterOption={(input, option) => option.children.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                      {map(
                        (Employee) => {
                          return (
                            <Option key={Employee.id} value={Employee.id}>
                              {Employee.name} <span className='mx-2'>({Employee.employee_code})</span>
                            </Option>
                          );
                        },
                        EmployeeList ? EmployeeList?.filter((e) => e.name !== newEmployee && e.department_id === department) : []
                      )}
                    </Select>
                  </Form.Item>                 
                </Col>
                <Col md={{span: 3}} xs={{span: 24}}>
                  <Form.Item name='Score' label='Score' rules={[{required: true, message: 'Enter Score'}]}>
                    <Input name='score' placeholder='Score' />
                  </Form.Item>
                </Col>
                <Col md={{span: 3}} xs={{span: 24}}>
                  <Form.Item name='CAPA_Score' label='CAPA Score' rules={[{required: true, message: 'Enter CAPA Score'}]}>
                    <Input name='capa_score' placeholder='Capa_Score' />
                  </Form.Item>
                </Col>              
               
                <Col md={{span: 3}} xs={{span: 24}} lg={{span: 2}}></Col>
                <Col md={{span: 6}} xs={{span: 24}} lg={{span: 4}}>
                  <Form.Item name='status' label='Status ' rules={[{required: true, message: 'Select your status'}]}>
                    <Radio.Group>
                      <Radio.Group
                        buttonStyle='solid'
                        disabled={savingAuditMaster}
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
                <Col span={24}>
                  <p className='text-danger'>Note* : Please enter Score and Capa Score as 0 for Department based Points</p>
               </Col>              
                <Col span={24}>
                  <Row gutter={[15, 15]} style={{justifyContent: 'end'}}>
                    <Col span={12} className='d-flex justify-content-end align-items-center'>
                      <Form.Item className='mx-2'>
                     <Button className='orangeFactory' type='primary' htmlType='submit' disabled={savingAuditMaster} loading={loading}>
                          {isEdit ? 'Update' : 'Add'}
                        </Button> 
                      </Form.Item>
                     
                      <Form.Item>
                        <Button disabled={savingAuditMaster} onClick={handleClickBack}>
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

export default AuditNewMasterForm;
