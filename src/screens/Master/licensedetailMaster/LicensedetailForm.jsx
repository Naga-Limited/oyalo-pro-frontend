/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Input, Card, Select, Button, Radio, Col, Row, Form, Space, DatePicker, Divider } from 'antd';
import { useLocation, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import messageToast from '../../../components/messageToast/messageToast';
import { transStatus } from '../../../util/transStatus';
//import {addlicensedetailMaster, getAuditCategory, updatelicensedetailMaster} from '../../../@app/master/masterSlice';
import { saveLicenseDetail, updateLicenseDetail } from '../../../@app/subMaster/subMasterSlice';
import { getOutletMaster, getSubZonal, getZonal, getLicense } from '../../../@app/master/masterSlice';
import { map } from 'ramda';
import ConfirmOnExit from '../../../components/confirmOnExit/ConfirmOnExit';
const { Option } = Select;
const dateFormat = 'DD-MM-YYYY';

function LicensedetaileditForm() {
  const {
    state: { data: defaultValue = {}, isEdit = false }
  } = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [status, setStatus] = useState(defaultValue?.status ?? 1);


  const { savingLicenseDetail } = useSelector((state) => {
    return state.subMaster;
  });

  const zoneID = Form.useWatch('zone_id', form);
  const subZoneID = Form.useWatch('subzone_id', form);
  const {
    // getStatesResponse: {data: states},
    gettingZonal,
    //gettingLicense,
    // getLicenseResponse: { data: License },
    getZonalResponse: { data: Zonals },
    gettingLicense,
    getLicenseResponse: { data: License },
    getOutletMasterResponse: { data: outletMasterList },
    getSubZonalResponse: { data: SubZonals },
    //savingLicenseDetail
  } = useSelector((state) => {
    return state.master;
  });
  const [setValue] = useState(1);
  const onChange3 = (e) => {
  
    setValue(e.target.value);
  };
  useEffect(() => {
    dispatch(getSubZonal(zoneID));
  }, [dispatch, zoneID]);

  useEffect(() => {
    dispatch(getOutletMaster(subZoneID));
  }, [dispatch, subZoneID]);

  useEffect(() => {
    dispatch(getZonal());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getLicense());
  }, [dispatch]);

  const handleClickBack = () => {
    navigate('/licensedetailMaster');
  };
  const [showDialog, setShowDialog] = useState(false);
  const { state } = useLocation();
  const editMode = state ? true : false;
  const onFinish = (data) => {
    
    setShowDialog(false);
    const { add_license, ...restOfData } = data;
    dispatch(
      //headers: {"Content-Type":"multipart/form-data"},
      defaultValue?.mode === 'edit'
        ? updateLicenseDetail({ data: { ...restOfData, outlet_ID: defaultValue.outlet_id } })
        : saveLicenseDetail({ data: { ...restOfData } })
    ).then(({ message, status, statusText }) => {
      if (status === 200) {
        form.resetFields();
        navigate('/licensedetailMaster');
      }
      else {
        navigate('/licensedetailMaster');
      }
      messageToast({ message: message ?? statusText, status, title: 'Create License' });
    });
  };
  const changeHandler = e => {
    let filename = e.target.files[0].name;
   
  }

  return (
    <>
      <Card>
        <ConfirmOnExit showModel={showDialog} />
        <Row style={{ justifyContent: 'center' }}>
          <Col span={24}>
            <Form
              encType="multipart/form-data"
              disabled={defaultValue?.outlet_status === '0'}
              onFieldsChange={() => setShowDialog(true)}
              name='basic'
              labelCol={{ span: 24 }}
              form={form}
              wrapperCol={{ span: 24 }}
              initialValues={{
                outlet_status: defaultValue?.status,
                zone_id: defaultValue?.zone_id,
                outlet_ID: defaultValue?.outlet_id,
                subzone_id: defaultValue?.subzone_id,
                license: defaultValue?.license,
                license_type_id: defaultValue?.license_type_id,
                license_renewal_date:defaultValue?.license_renewal_date,
                remarks: defaultValue?.remarks,
                ...defaultValue
              }}
              onFinish={onFinish}
              autoComplete='off'>
              <Row gutter={[15, 1]}>
                <Col span={6}>
                  <Form.Item name='zone_id' label='Zone'>
                    <Select
                      placeholder='select'
                      loading={gettingZonal}
                      //disabled={savingLicenseDetail}
                      defaultValue={defaultValue?.zone_id}
                      disabled={defaultValue?.zone_id}
                      // disabled={!roleSelected.includes('Zone')}
                      //mode='multiple'
                      showSearch
                      filterOption={(input, option) => option.children.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                      {map(
                        (Zonal) => {
                          return (
                            <Option key={Zonal.id} value={Zonal.id}>
                              {Zonal.zonal_name}
                            </Option>
                          );
                        },
                        Zonals ? Zonals?.filter((e) => e.status === '1') : []
                      )}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name='subzone_id' label='Sub Zone'>
                    <Select
                      placeholder='select'
                      //disabled={savingLicenseDetail}
                      disabled={defaultValue?.subzone_id}
                      defaultValue={defaultValue?.subzone_id}
                      // disabled={!roleSelected.includes('Sub Zone')}
                      //mode='multiple'
                      showSearch
                      filterOption={(input, option) => option.children.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                      {map(
                        (SubZonal) => {
                          return (
                            <Option key={SubZonal.id} value={SubZonal.id}>
                              {SubZonal.name}
                            </Option>
                          );
                        },
                        SubZonals ? SubZonals?.filter((e) => e.status === '1') : []
                      )}
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={6}>
                  <Form.Item name='outlet_id' label='Outlet'>
                    <Select
                      placeholder='select'
                      disabled={defaultValue?.outlet_id}
                      //disabled={savingLicenseDetail}
                      defaultValue={defaultValue?.outlet_id}
                      // disabled={!roleSelected.includes('Outlet')}
                      //mode='multiple'
                      showSearch
                      filterOption={(input, option) => option.children.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                      {map(
                        (outletMaster) => {
                          return (
                            <Option key={outletMaster.id} value={outletMaster.id}>
                              {outletMaster.name}
                            </Option>
                          );
                        },
                        outletMasterList ? outletMasterList : []
                      )}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[24, 0]}>
                <Col xs={{ span: 24 }}>
                  <Form.Item name='license' label='Add License' >
                    <Form.List
                      name='license'
                      rules={[
                        {
                          validator: async (_, names) => {
                            if (!names || names.length < 1) {
                              return Promise.reject(new Error('At least add 1 License'));
                            }
                          }
                        }
                      ]}>
                      {(fields, { add, remove }, { errors }) => (
                        <div>
                          {fields.map((field, index) => (
                            <Space
                              key={index}
                              size={[1,5]} wrap
                              disabled={defaultValue?.outlet_status === '0'}
                              style={{
                                display: 'flex',
                                // marginBottom: 8,
                                justifyContent: 'space-between',
                                alignItems: 'baseline'
                              }}>

                              <Form.Item {...field} name={[field.name, 'id']} initialValue={0} />
                              <Form.Item
                                {...field}
                                label={'License '}
                                style={{ inlineSize: 220, height: "auto", wordWrap: "break-word" }}
                                name={[field.name, 'license_type_id']}
                                defaultValue={defaultValue?.license_type_id}
                                validateTrigger={['onChange', 'onBlur']}
                              // rules={[
                              //   {
                              //     required: true,
                              //     whitespace: true,
                              //     message: 'Please Select License .'
                              //   }
                              // ]}
                              >
                                {/* <Input
                                  style={{
                                    width: '100% '
                                  }}
                                  placeholder='Add License Type'
                                  disabled={savingLicenseDetail || defaultValue?.outlet_status === '0'}
                                /> */}

                                <Select
                                  name="license_type_id"
                                  placeholder='Select'
                                  loading={gettingLicense}
                                  disabled={savingLicenseDetail}
                                  // disabled={editMode}
                                  style={{
                                    width: '100%'
                                  }}
                                  defaultValue={defaultValue?.license_type_id}
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
                                    //j;jiLicense ? License : []
                                    License ? License?.filter((e) => e.status === '1') : []
                                  )}
                                </Select>

                              </Form.Item>


                              <Form.Item
                                {...field}
                                label={'Reg No'}
                                name={[field.name, 'license_reg_no']}
                                validateTrigger={['onChange', 'onBlur']}
                                rules={[
                                  {
                                    required: true,
                                    whitespace: true,
                                    message: 'Enter License Registration  Number.'
                                  }
                                ]}>
                                <Input
                                  style={{
                                    width: '100%'
                                  }}
                                  placeholder='Add Register No'
                                  disabled={savingLicenseDetail || defaultValue?.outlet_status === '0'}
                                />
                              </Form.Item>


                              <Form.Item
                                {...field}
                                label={'App No'}
                                name={[field.name, 'license_app_no']}
                                defaultValue={defaultValue?.license_app_no}
                                validateTrigger={['onChange', 'onBlur']}
                                rules={[
                                  {
                                    required: true,
                                    whitespace: true,
                                    message: ' Enter License Application Number.'
                                  }
                                ]}>
                                <Input
                                  style={{
                                    width: '100%'
                                  }}
                                  name="license_app_no"
                                  placeholder='Add License No'
                                  disabled={savingLicenseDetail || defaultValue?.outlet_status === '0'}
                                />
                              </Form.Item>
                              <Form.Item
                                {...field}
                                label={'Start Date'}
                                name={[field.name, 'license_start_date']}
                                defaultValue={defaultValue?.license_start_date}
                                validateTrigger={['onChange', 'onBlur']}
                                rules={[
                                  {
                                    required: true,
                                    whitespace: true,
                                    message: 'Enter Start Date.'
                                  }
                                ]}>
                                <Input type='date'
                                  style={{
                                    width: '100%'
                                  }}
                                  format={dateFormat}
                                  name="license_from_date"
                                  placeholder='Add Add From date'
                                  disabled={savingLicenseDetail || defaultValue?.outlet_status === '0'}
                                />
                                {/* <DatePicker  format={'DD-MM-YYYY'}
                                 disabled={savingLicenseDetail || defaultValue?.outlet_status === '0'}
                                 /> */}
                                {/* <Input
                                  style={{
                                    width: '100% '
                                  }}
                                  placeholder='Add License No'
                                  disabled={savingLicenseDetail || defaultValue?.outlet_status === '0'}
                                /> */}
                              </Form.Item>


                              <Form.Item
                                {...field}
                                label={'End Date'}
                                name={[field.name, 'license_end_date']}
                                defaultValue={defaultValue?.license_end_date}
                                validateTrigger={['onChange', 'onBlur']}
                                rules={[
                                  {
                                    required: true,
                                    whitespace: true,
                                    message: 'Enter End date.'
                                  }
                                ]}>
                                {/* <Input
                                  style={{
                                    width: '100% '
                                  }}
                                  type='date'
                                  placeholder='Add Add To date'
                                  disabled={savingLicenseDetail || defaultValue?.outlet_status === '0'}
                                /> */}
                                <Input type='date' style={{
                                  width: '110%'
                                }} name="license_end_date" format={dateFormat} />
                              </Form.Item>
                              <Form.Item
                                {...field}
                                label={'Renewal Date'}
                                name={[field.name, 'license_renewal_date']}
                                defaultValue={defaultValue?.license_renewal_date}
                                validateTrigger={['onChange', 'onBlur']}
                                rules={[
                                  {
                                    required: true,
                                    whitespace: true,
                                    message: 'Enter Renewal date.'
                                  }
                                ]}>
                                {/* <Input
                                  style={{
                                    width: '100% '
                                  }}
                                  type='date'
                                  placeholder='Add Add To date'
                                  disabled={savingLicenseDetail || defaultValue?.outlet_status === '0'}
                                /> */}
                                <Input type='date' style={{
                                  width: '100%'
                                }} name="license_renewal_date" format={dateFormat} />
                              </Form.Item>

                              <Form.Item
                                {...field}
                                label={'Attachement'}
                                name={[field.name, 'license_attachment']}
                                validateTrigger={['onChange', 'onBlur']}
                              // rules={[
                              //   {
                              //     required: true,
                              //     whitespace: true,
                              //     message: 'Please  Add From date.'
                              //   }
                              // ]}
                              >
                                <Input
                                  style={{
                                    width: '100%'
                                  }}
                                  type='file'
                                  id='test'
                                  onChange={changeHandler}
                                  placeholder='Please Choose license attachment'
                                  disabled={savingLicenseDetail || defaultValue?.outlet_status === '0'}
                                />
                              </Form.Item>
                              <Form.Item
                                {...field}
                                label={'Status'}
                                name={[field.name, 'status']}
                                initialValue={1}
                                rules={[
                                  {
                                    required: true,
                                    message: 'Missing Status'
                                  }
                                ]}>
                                {/* <Radio.Group
                                  defaultValue={1}
                                  name='status'
                                  //disabled={defaultValue?.outlet_status === '0'}
                                  buttonStyle='solid'
                                  style={{
                                    display: 'flex'
                                  }}>
                                  <Radio.Button value={defaultValue?.status} className='active'>
                                    Active
                                  </Radio.Button>
                                  <Radio.Button value={defaultValue?.status} className='in-active'>
                                    InActive
                                  </Radio.Button>
                                </Radio.Group> */}
                                <Radio.Group onChange={onChange3} name='status'>
                                  <Radio value={1} defaultValue={defaultValue?.status}>Yes</Radio>
                                  <Radio value={0} defaultValue={defaultValue?.status}>No</Radio>
                                </Radio.Group>
                              </Form.Item>
                              <Form.Item

                                {...field}
                                layout="vertical"
                                label={'Remarks'}
                                name={[field.name, 'remarks']}
                                validateTrigger={['onChange', 'onBlur']}
                              // rules={[
                              //   {
                              //     required: true,
                              //     whitespace: true,
                              //     message: 'Please  Add From date.'
                              //   }
                              // ]}
                              >
                                <Input
                                  style={{
                                    width: '100%'
                                  }}
                                  name="remarks"
                                  defaultValue={defaultValue?.remarks}
                                  placeholder='Please Enter Remarks'
                                  disabled={savingLicenseDetail}
                                />

                              </Form.Item>

                              <MinusCircleOutlined onClick={() => (defaultValue?.outlet_status === '1' ? () => { } : remove(field.name))} />
                              <hr
                                style={{
                                  background: '#3c0eab',
                                  color: '#1c0640',
                                  borderColor: '#6813d9',
                                  height: '3px',
                                  width: '1045px',
                                }}
                              />



                            </Space>

                          ))}

                          <Form.Item>
                            <Button
                              type='dashed'
                              onClick={() => (defaultValue?.outlet_status === '0' ? () => { } : add())}
                              style={{ width: '10%', paddingLeft: '5px', backgroundColor: 'green', color: 'white' }}
                              icon={<PlusOutlined style={{}} />}
                              disabled={savingLicenseDetail || defaultValue?.outlet_status === '0'}>
                              Add field
                            </Button>

                            <Form.ErrorList errors={errors} />
                          </Form.Item>
                        </div>
                      )}
                    </Form.List>
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Row gutter={[15, 15]} style={{ justifyContent: 'çenter' }}>
                    <Col span={12} >
                      <Form.Item>
                        <Button disabled={savingLicenseDetail} onClick={handleClickBack}>
                          Back
                        </Button>
                      </Form.Item>
                    </Col>
                    <Col span={12} style={{ textAlign: 'right' }}>
                      <Form.Item>
                        <Button className='orangeFactory' type='primary' htmlType='submit' disabled={savingLicenseDetail}>
                          {isEdit ? 'Update' : 'Add'}
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

export default LicensedetaileditForm;