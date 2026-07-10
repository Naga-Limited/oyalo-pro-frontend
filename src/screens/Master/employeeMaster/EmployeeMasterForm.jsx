import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import messageToast from '../../../components/messageToast/messageToast';
import {useLocation, useNavigate} from 'react-router';
import {getDivision, getDepartment, getDesignation, getEmployeeLevel} from '../../../@app/subMaster/subMasterSlice';
import {addEmployeeMaster, updateEmployeeMaster} from '../../../@app/master/masterSlice';
import {last, map} from 'ramda';
import {PlusOutlined} from '@ant-design/icons';
import {baseURL} from '../../../api/baseURL';
import {Input, Card, Select, Button, Radio, Col, Row, Form, Upload, Modal, Image} from 'antd';
import {transStatus} from '../../../util/transStatus';
import ConfirmOnExit from '../../../components/confirmOnExit/ConfirmOnExit';
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const {Option} = Select;

function EmployeeMasterForm() {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [image, setImage] = useState('');
  const [showDialog, setShowDialog] = useState(false);

  const [fileList, setFileList] = useState([]);
  const [imageUpdated, setImageUpdated] = useState(false);
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const handleChange = (e) => {
    setFileList(e?.fileList);
    setImage(e?.file?.response?.filename ?? '');
    form.setFieldsValue({employee_image: e?.file?.response?.filename ?? ''});
    setImageUpdated(true);
  };

  const props = {
    name: 'image',
    action: `${baseURL}employee-imageupload`,
    headers: {
      authorization: 'authorization-text'
    }
  };

  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const onClickBack = () => {
    navigate('/employeeMaster');
  };

  const {state} = useLocation();
  const isEdit = state?.isEdit || false;
  let defaultValue = state?.data;

  const uploadButton = (
    <Button style={{display: 'flex', direction: 'row'}} icon={<PlusOutlined style={{marginTop: '3px', marginRight: '4px'}} />}>
      <div
        style={{
          marginLeft: '3px'
        }}>
        {defaultValue?.id ? 'Update Image' : 'Upload'}
      </div>
    </Button>
  );
  if (defaultValue?.id) {
    form.setFieldsValue({employee_image: defaultValue?.image ?? 'No image'});
  }
   
  const userData = useSelector((state) => state.auth);

  const onFinish = (values) => {
    let id;
    if (defaultValue?.id) {
      id = defaultValue?.id;
    }
    setShowDialog(false);
    const Employee_Code = values.employee_code;
    const emp_vendor_code = values.emp_vendor_code;
    const name = values.name;
    const division = values.division;
    const department = values.department;
    const designation = values.designation;
    const level = values.level;
    const contact = values.contact;
    const location = values.location;
    const email = values.email;
    const balance_amount = values.balance_amount;

    const status = values.status;

    dispatch(
      defaultValue?.id
        ? updateEmployeeMaster({
            data: {
              status: transStatus({status}),
              filename: imageUpdated ? image ?? 'No image' : last(defaultValue?.image.split('/')) ?? 'No image',
              updated_by: userData.data?.id ?? "0",
              email,
              balance_amount,
              location,
              contact,
              level,
              designation,
              department,
              division,
              name,
              Employee_Code,
              emp_vendor_code,
              id
            }
          })
        : addEmployeeMaster({
            data: {status: transStatus({status}), filename: image ?? 'No image', email,balance_amount, location, contact, level, designation, department, division, name, Employee_Code, emp_vendor_code,
            created_by: userData.data?.id ?? "0"}
          })
    ).then((data) => {
      const {status, message} = data;
      if (status === 200) {
        messageToast({message: data?.statusText, status: status, title: 'Employee Master'});
        form.resetFields();
        navigate('/employeeMaster');
      }
      if (data?.exception) {
        messageToast({message: 'Invalid Request', status: 400, title: 'Employee Master'});
      }
      if (data?.status === 400) {
        if (message && message?.image?.length > 0) {
          messageToast({message: 'Fill the Image Field and the Image size should be greater than of 100kb size!', status: status, title: 'Employee Master'});
        }
      }
    });
  };

  useEffect(() => {
    dispatch(getDivision());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getDepartment());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getDesignation());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getEmployeeLevel());
  }, [dispatch]);

  const {
    getDivisionResponse: {data: divisions},
    gettingDivision,
    gettingDepartment,
    getDepartmentResponse: {data: departments},
    gettingDesignation,
    getDesignationResponse: {data: designations},
    getEmployeeLevelResponse: {data: employeeLevels}
  } = useSelector((state) => {
    return state.subMaster;
  });

  const {savingEmployeeMaster} = useSelector((state) => {
    return state.master;
  });

  const getFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const handleOnChange = (e) => {
    if (e.target.name === 'employee_code') {
      return form.setFieldsValue({
        [e.target.name]: e.target.value.replace(/[^0-9 ./]/g, '')
      });
    }
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
                employee_code: defaultValue?.employee_code,
                emp_vendor_code:defaultValue?.emp_vendor_code,
                name: defaultValue?.name,
                division: defaultValue?.division_id,
                department: defaultValue?.department_id,
                designation: defaultValue?.designation_id,
                level: defaultValue?.level_id,
                contact: defaultValue?.contact,
                location: defaultValue?.location,
                email: defaultValue?.email,
                balance_amount: defaultValue?.balance_amount,
                reporting_manager_code: defaultValue?.report_id,
                reporting_manager_designation: defaultValue?.report_name,
                reporting_manager_name: defaultValue?.report_to,
                status: defaultValue?.status === 'Active' ? '1' : '0'
              }}
              onFinish={onFinish}
              form={form}
              autoComplete='off'>
              <Row gutter={[15, 0]}>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item
                    name='employee_code'
                    label='Employee Code'
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your employee code'
                      }
                    ]}>
                    <Input name='employee_code' onChange={handleOnChange} placeholder='Enter Employee Code' />
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item
                    name='emp_vendor_code'
                    label='Employee Vendor Code'
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your employee code'
                      }
                    ]}>
                    <Input name='emp_vendor_code' onChange={handleOnChange} placeholder='Enter Employee Vendor Code' />
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item
                    name='name'
                    label='Name '
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your name'
                      }
                    ]}>
                    <Input placeholder='Enter Name' />
                  </Form.Item>
                </Col>

                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='division' label='Division' rules={[{required: true, message: 'Please select division'}]}>
                    <Select
                      placeholder='Select'
                      loading={gettingDivision}
                      showSearch
                      filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                      {map(
                        (division) => {
                          return (
                            <Option key={division.id} value={division.id}>
                              {division.name}
                            </Option>
                          );
                        },
                        divisions ? divisions.filter((e) => e.status === '1') : []
                      )}
                    </Select>
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='department' label='Department' rules={[{required: true, message: 'Please select department'}]}>
                    <Select
                      placeholder='Select'
                      loading={gettingDepartment}
                      // disabled={savingCity}
                      showSearch
                      filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                      {map(
                        (department) => {
                          return (
                            <Option key={department.id} value={department.id}>
                              {department.name}
                            </Option>
                          );
                        },
                        departments ? departments.filter((e) => e.status === '1') : []
                      )}
                    </Select>
                  </Form.Item>
                </Col>

                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='designation' label='Designation' rules={[{required: true, message: 'Please select designation'}]}>
                    <Select
                      placeholder='Select'
                      loading={gettingDesignation}
                      // disabled={savingCity}
                      showSearch
                      filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                      {map(
                        (designation) => {
                          return (
                            <Option key={designation.id} value={designation.id}>
                              {designation.name}
                            </Option>
                          );
                        },
                        designations ? designations.filter((e) => e.status === '1') : []
                      )}
                    </Select>
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='level' label='Level' rules={[{required: true, message: 'Please select level'}]}>
                    <Select
                      placeholder='Select'
                      loading={gettingDepartment}
                      // disabled={savingCity}
                      showSearch
                      filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                      {map(
                        (employeeLevel) => {
                          return (
                            <Option key={employeeLevel.id} value={employeeLevel.id}>
                              {employeeLevel.name}
                            </Option>
                          );
                        },
                        employeeLevels ? employeeLevels.filter((e) => e.status === '1') : []
                      )}
                    </Select>
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='location' label='Location' rules={[{required: true, message: 'Please select location'}]}>
                    <Input placeholder='Enter Location' />
                  </Form.Item>
                </Col>

                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item
                    name='contact'
                    label='Contact Number'
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your contact'
                      },

                      {
                        pattern: /^[5-9][0-9]{9}$/g,
                        message: 'Invalid Phone Number'
                      }
                    ]}>
                    <Input placeholder='Enter Contact Number' />
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item
                    name='email'
                    label='Email'
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your email'
                      },
                      {
                        pattern: /^([\w]*[\w.]*(?!\.)@(nagamills.com|gmail.com))/g,
                        message: 'Invalid email Id'
                      }
                    ]}>
                    <Input placeholder='Enter email'/>
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item
                    name='balance_amount'
                    label='Balance Amount'                  
                    >
                    <Input placeholder='Enter Balance Amount' />
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='reporting_manager_code' label='Reporting Manager Code'>
                    <Input placeholder='Reporting Manager Code' disabled />
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='reporting_manager_name' label='Reporting Manager Name'>
                    <Input placeholder='Reporting Manager Name' disabled />
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='reporting_manager_designation' label='Reporting Manager Designation'>
                    <Input placeholder='Reporting Manager Designation' disabled />
                  </Form.Item>
                </Col>

                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item
                    name='employee_image'
                    label='Employee Image'
                    getValueFromEvent={getFile}
                    rules={[
                      {
                        required: true,
                        message: 'Please Select employee image'
                      }
                    ]}>
                    <div style={{display: 'flex', direction: 'col'}}>
                      {defaultValue?.id && fileList?.length === 0 ? (
                        defaultValue?.image ? (
                          <Image style={{paddingRight: '10px'}} width={100} src={defaultValue?.image ?? ''} />
                        ) : (
                          'No Image Available'
                        )
                      ) : (
                        <></>
                      )}
                      <Upload
                        {...props}
                        fileList={fileList}
                        onPreview={handlePreview}
                        capture='environment'
                        accept='.png,.jpg,.jpeg'
                        onChange={(e) => {
                          handleChange(e);
                        }}>
                        {fileList.length >= 1 ? null : uploadButton}
                      </Upload>
                    </div>
                    <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                      <img
                        alt='example'
                        style={{
                          width: '100%'
                        }}
                        src={previewImage}
                      />
                    </Modal>
                  </Form.Item>
                </Col>

                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='status' label='Status ' rules={[{required: true, message: 'Please slect your status'}]}>
                    <Radio.Group buttonStyle='solid' size='middle'>
                      <Radio.Button className='active' value={'1'}>
                        Active
                      </Radio.Button>
                      <Radio.Button className='in-active' value={'0'}>
                        In-Active
                      </Radio.Button>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Row gutter={[15, 15]} style={{justifyContent: 'end'}}>
                    <Col span={12} style={{textAlign: 'right'}} className='d-flex align-items-center justify-content-end mt-3'>
                      <Form.Item className='mx-2'>
                        <Button loading={savingEmployeeMaster} className='orangeFactory' type='primary' htmlType='submit'>
                          {isEdit ? 'Update' : 'Add'}
                        </Button>
                      </Form.Item>
                      {/* </Col>
                    <Col span={12}> */}
                      <Form.Item>
                        <Button onClick={onClickBack}>Back</Button>
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

export default EmployeeMasterForm;
