import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Input, Card, DatePicker, TimePicker, Button, Radio, Col, Row, Form, Select} from 'antd';
import {saveOutletMaster, getStates, getSubZonal, getZonal, updateOutletMaster, getCity, getORLName} from '../../../@app/master/masterSlice';
import {map} from 'ramda';
import {useLocation, useNavigate} from 'react-router';
import dayjs from 'dayjs';
import messageToast from '../../../components/messageToast/messageToast';
import {transStatus} from '../../../util/transStatus';
// import Page from '../../../components/page/Page';
import ConfirmOnExit from '../../../components/confirmOnExit/ConfirmOnExit';
// import {useCallbackPrompt} from '../../../customHooks/useCallbackPrompt';

const {Option} = Select;
function OutletMasterForm() {
  const [submitted, setSubmitted] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const handleClickBack = () => {
    navigate('/outletMaster');
  };
  const dispatch = useDispatch();
  const {
    saveOutletMasterRequest,
    getStatesResponse: {data: states},
    gettingState,
    getCityResponse: {data: cities},
    gettingCity,
    getZonalResponse: {data: Zonals},
    gettingZonal,
    getSubZonalResponse: {data: SubZonals},
    gettingSubZonal,
    getORLsResponse: {data: ORLs},
    savingCity
  } = useSelector((state) => {
    return state.master;
  });
  const navigate = useNavigate();

  const {state} = useLocation();
  const isEdit = state?.isEdit || false;
  let defaultValue = state?.data;
  let orlNames;
  if (defaultValue) {
    orlNames = [...(ORLs?.length > 0 ? ORLs : []), {id: defaultValue.orl_id, name: defaultValue.orl_name}];
  } else {
    orlNames = ORLs;
  }

  const [form] = Form.useForm();

  const stateID = Form.useWatch('stateID', form);
  const zoneID = Form.useWatch('zoneID', form);
  const subzoneID = Form.useWatch('subzoneID', form);

  const { userData } = useSelector((state) => state.auth);

  const onFinish = (values) => {
    setShowDialog(false);
    let data = {
      state: values.stateID,
      city: values.city_name,
      zone: values.zoneID,
      subzone: values.subzoneID,
      oulet_Code: values.oulet_Code,
      name: values.name,
      zomoato_status: values.zomoato_status,
      zomoatoID: values.zomoatoID,
      zomoato_date: values['zomoato_date']?.format('YYYY-MM-DD'),
      swiggy_status: values.swiggy_status,
      swiggyID: values.swiggyID,
      swiggy_date: values['swiggy_date']?.format('YYYY-MM-DD'),
      dotpe_status: values.dotpe_status,
      dotpeID: values.dotpeID,
      dotpe_date: values.dotpe_date?.format('YYYY-MM-DD'),
      email: values.email,
      latitude: values.latitude,
      longitude: values.longitude,
      address: values.address,
      order_placing_no: values.order_placing_no,
      orl_cug_no: values.orl_cug_no,
      contact: values.contact,
      open_time: values.open_time?.format('HH:mm:ss'),
      close_time: values.close_time?.format('HH:mm:ss'),
      opening_date: values.opening_date?.format('YYYY-MM-DD'),
      profit_center: values.profit_center,
      cost_center: values.cost_center,
      labour_license_no: values.labour_license_no,
      fire_license_no: values.fire_license_no,
      fire_extinguisher_license_no: values.fire_extinguisher_license_no,
      fssai_license_no: values.fssai_license_no,
      status: values.status === 'active' ? 1 : 0,
      orl_name: values?.orl_name,
      emp_vendor_code:values?.emp_vendor_code,
      created_by: userData.data?.id ?? "0",
    };

    dispatch(defaultValue?.id ? updateOutletMaster({data: {...data, id: defaultValue.id, status: transStatus({status: data?.status})}}) : saveOutletMaster({data})).then((data) => {
      const {status, message} = data;
      setSubmitted((e) => !e);
      if (status === 200) {
        messageToast({message: data?.statusText, status: status, title: 'Outlet Master'});
      }
      if (data?.exception) {
        messageToast({message: 'Invalid Request', status: 400, title: 'Outlet Master'});
      }
      if (status === 400) {
        if ((message && message?.contact?.length > 0) || (message && message.email?.length > 0) || (message && message.name?.length > 0)) {
          if (message && message.contact) {
            messageToast({message: message?.contact[0], status: status, title: 'Outlet Master'});
          } else if (message && message.email) {
            messageToast({message: message?.email[0], status: status, title: 'Outlet Master'});
          } else if (message && message.name) {
            messageToast({message: message?.name[0], status: status, title: 'Outlet Master'});
          }
          if (message) {
            messageToast({message: message, status: status, title: 'Outlet Master'});
          }
        }
      }
      if (status === 200) {
        navigate('/outletMaster');
      }
      messageToast({message: message, status: status, title: 'Outlet Master'});
    });
  };

  useEffect(() => {
    dispatch(getStates());
    dispatch(getORLName());
  }, [dispatch, submitted]);

  useEffect(() => {
    dispatch(getZonal(stateID));
  }, [dispatch, stateID]);

  useEffect(() => {
    dispatch(getSubZonal(zoneID));
  }, [dispatch, zoneID]);

  useEffect(() => {
    dispatch(getCity(subzoneID));
  }, [dispatch, subzoneID]);

  const [zomatoStatus, setZomatoStatus] = useState(defaultValue?.zomoato_status ?? false);
  const [swiggyStatus, setSwiggyStatus] = useState(defaultValue?.swiggy_status ?? false);
  const [dotpeStatus, setDotpeStaus] = useState(defaultValue?.dotpe_status ?? false);

  const handleOnChange = (e) => {
    setShowDialog(true);
    if (e.target.name === 'zomoato_status') {
      if (e.target.value === 0) {
        setZomatoStatus(false);
      } else {
        setZomatoStatus(true);
      }
    }
    if (e.target.name === 'swiggy_status') {
      if (e.target.value === 0) {
        setSwiggyStatus(false);
      } else {
        setSwiggyStatus(true);
      }
    }

    if (e.target.name === 'dotpe_status') {
      if (e.target.value === 0) {
        setDotpeStaus(false);
      } else {
        setDotpeStaus(true);
      }
    }
    if (
      e.target.name === 'latitude' ||
      e.target.name === 'longitude' ||
      e.target.name === 'orl_cug_no' ||
      e.target.name === 'contact' ||
      e.target.name === 'order_placing_no' ||
      e.target.name === 'oulet_Code'
    ) {
      return form.setFieldsValue({
        [e.target.name]: e.target.value.replace(/[^0-9 ./]/g, '')
      });
    }

    return form.setFieldsValue({
      [e.target.name]: e.target.value
    });
  };

  const dateFormat = ['DD/MM/YYYY', 'DD/MM/YY'];

  return (
    <>
      <Card>
        <ConfirmOnExit showModel={showDialog} />
        <Row>
          <Col span={24}>
            <Form
              name='basic'
              labelCol={{span: 24}}
              wrapperCol={{span: 24}}
              initialValues={{
                stateID: defaultValue?.state_id,
                swiggy_date: defaultValue && dayjs(defaultValue?.swiggy_date),
                dotpe_date: defaultValue && dayjs(defaultValue?.dotpe_date),
                zomoato_date: defaultValue && dayjs(defaultValue?.zomoato_date),
                opening_date: defaultValue && dayjs(defaultValue?.opening_date),
                city_name: defaultValue?.city_id,
                zoneID: defaultValue?.zone_id,
                subzoneID: defaultValue?.subzone_id,
                oulet_Code: defaultValue?.outlet_code,
                name: defaultValue?.name,
                zomoatoID: defaultValue?.zomoatoID,
                swiggyID: defaultValue?.swiggyID,
                dotpeID: defaultValue?.dotpeID,
                email: defaultValue?.email,
                latitude: defaultValue?.latitude,
                longitude: defaultValue?.longitude,
                zomoato_status: defaultValue && Number(defaultValue?.zomoato_status),
                swiggy_status: defaultValue && Number(defaultValue?.swiggy_status),
                dotpe_status: defaultValue && Number(defaultValue?.dotpe_status),
                open_time: defaultValue && dayjs(defaultValue?.open_time, 'HH:mm'),
                close_time: defaultValue && dayjs(defaultValue?.close_time, 'HH:mm'),
                address: defaultValue?.address,
                order_placing_no: defaultValue?.order_placing_no,
                orl_cug_no: defaultValue?.orl_cug_no,
                contact: defaultValue?.contact,
                profit_center: defaultValue?.profit_center,
                cost_center: defaultValue?.cost_center,
                labour_license_no: defaultValue?.labour_license_no,
                fire_license_no: defaultValue?.fire_license_no,
                fire_extinguisher_license_no: defaultValue?.fire_extinguisher_license_no,
                fssai_license_no: defaultValue?.fssai_license_no,
                orl_name: defaultValue?.orl_id,
                emp_vendor_code:defaultValue?.emp_vendor_code,
                status: defaultValue?.status === 'In Active' ? 'inActive' : 'active'
              }}
              onFinish={onFinish}
              autoComplete='off'
              form={form}>
              <Row gutter={[15, 0]}>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='stateID' label='State Name' rules={[{required: true, message: 'Please select state name'}]}>
                    <Select
                      placeholder='Select'
                      loading={gettingState}
                      disabled={savingCity}
                      showSearch
                      filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                      {map(
                        (state) => {
                          return (
                            <Option key={state.id} value={state.id}>
                              {state.name}
                            </Option>
                          );
                        },
                        states ? states?.filter((e) => e.status === '1') : []
                      )}
                    </Select>
                  </Form.Item>
                </Col>

                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='zoneID' label='Zone Name' rules={[{required: true, message: 'Please select zone name'}]}>
                    <Select
                      placeholder='Select'
                      loading={gettingZonal}
                      disabled={savingCity}
                      showSearch
                      filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
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
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item
                    name='subzoneID'
                    label='Sub zone Name'
                    rules={[
                      {
                        required: true,
                        message: 'Please select sub zone name'
                      }
                    ]}>
                    <Select
                      placeholder='Select'
                      loading={gettingSubZonal}
                      disabled={savingCity}
                      showSearch
                      filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
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
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='city_name' label='City Name' rules={[{required: true, message: 'Please select city name'}]}>
                    <Select
                      placeholder='select'
                      loading={gettingCity}
                      disabled={savingCity}
                      showSearch
                      filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                      {map(
                        (city) => {
                          return (
                            <Option key={city.id} value={city.id}>
                              {city.name}
                            </Option>
                          );
                        },
                        cities ? cities?.filter((e) => e.status === '1') : []
                      )}
                    </Select>
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item
                    name='oulet_Code'
                    label='Oulet Code'
                    rules={[
                      {
                        pattern: /^[0-9]/g,
                        message: 'Invalid outlet code'
                      },
                      {
                        required: true,
                        message: 'Please enter your outlet code'
                      }
                    ]}>
                    <Input name='oulet_Code' onChange={handleOnChange} placeholder='Enter Outlet Code' />
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item
                    name='name'
                    label='Outlet Name'
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your outlet name'
                      }
                    ]}>
                    <Input placeholder='Enter Outlet Name' name='name' onChange={handleOnChange} />
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item
                    name='zomoato_status'
                    label='Zomato Service Available '
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your Zomato Service Available'
                      }
                    ]}>
                    <Radio.Group buttonStyle='solid' size='middle' name='zomoato_status' onChange={handleOnChange}>
                      <Radio.Button className='active' value={1}>
                        Yes
                      </Radio.Button>
                      <Radio.Button className='in-active' value={0}>
                        No
                      </Radio.Button>
                    </Radio.Group>
                  </Form.Item>
                </Col>

                {zomatoStatus ? (
                  <Col md={{span: 6}} xs={{span: 24}}>
                    <Form.Item
                      rules={[
                        {
                          required: true,
                          message: 'Please enter your outlet zomato id'
                        }
                      ]}
                      name='zomoatoID'
                      label='Zomato ID'>
                      <Input placeholder='Enter Zomato ID' name='zomoatoID' onChange={handleOnChange} />
                    </Form.Item>
                  </Col>
                ) : (
                  <></>
                )}
                {zomatoStatus ? (
                  <Col md={{span: 6}} xs={{span: 24}}>
                    <Form.Item
                      label='Zomato Live Date'
                      name='zomoato_date'
                      rules={[
                        {
                          required: true,
                          message: 'Please select zomato live date!'
                        }
                      ]}>
                      <DatePicker format={dateFormat} placeholder='dd/mm/yyyy' name='zomoato_date' style={{width: '100%'}} onChange={handleOnChange} />
                    </Form.Item>
                  </Col>
                ) : (
                  <></>
                )}
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item
                    name='swiggy_status'
                    label='Swiggy Service Available '
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your Swiggy Service Available'
                      }
                    ]}>
                    <Radio.Group
                      // defaultValue={defaultValue && Number(defaultValue?.swiggy_status)}
                      buttonStyle='solid'
                      size='middle'
                      name='swiggy_status'
                      onChange={handleOnChange}>
                      <Radio.Button className='active' value={1}>
                        Yes
                      </Radio.Button>
                      <Radio.Button className='in-active' value={0}>
                        No
                      </Radio.Button>
                    </Radio.Group>
                  </Form.Item>
                </Col>

                {swiggyStatus ? (
                  <Col md={{span: 6}} xs={{span: 24}}>
                    <Form.Item
                      name='swiggyID'
                      label='Swiggy ID'
                      rules={[
                        {
                          required: true,
                          message: 'Please enter your swiggy_id'
                        }
                      ]}>
                      <Input placeholder='Enter Swiggy ID' name='swiggyID' onChange={handleOnChange} />
                    </Form.Item>
                  </Col>
                ) : (
                  <></>
                )}

                {swiggyStatus ? (
                  <Col md={{span: 6}} xs={{span: 24}}>
                    <Form.Item
                      label='Swiggy Live Date'
                      name='swiggy_date'
                      rules={[
                        {
                          required: true,
                          message: 'Please select swiggy live date!'
                        }
                      ]}>
                      <DatePicker onChange={handleOnChange} format={dateFormat} name='swiggy_date' placeholder='dd/mm/yyyy' style={{width: '100%'}} />
                    </Form.Item>
                  </Col>
                ) : (
                  <></>
                )}
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item
                    name='dotpe_status'
                    label='Dotpe  Service Available '
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your Dotpe  Service Available'
                      }
                    ]}>
                    <Radio.Group
                      //  defaultValue={defaultValue && Number(defaultValue?.dotpe_status)}
                      buttonStyle='solid'
                      size='middle'
                      name='dotpe_status'
                      onChange={handleOnChange}>
                      <Radio.Button className='active' value={1}>
                        Yes
                      </Radio.Button>
                      <Radio.Button className='in-active' value={0}>
                        No
                      </Radio.Button>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                {dotpeStatus ? (
                  <Col md={{span: 6}} xs={{span: 24}}>
                    <Form.Item name='dotpeID' label='Dotpe  ID' rules={[{required: true, message: 'Please enter your dotpe id'}]}>
                      <Input placeholder='Enter DotpeID ID' name='dotpeID' onChange={handleOnChange} />
                    </Form.Item>
                  </Col>
                ) : (
                  <></>
                )}
                {dotpeStatus ? (
                  <Col md={{span: 6}} xs={{span: 24}}>
                    <Form.Item
                      label='Dotpe  Live Date'
                      name='dotpe_date'
                      rules={[
                        {
                          required: true,
                          message: 'Please select dotpe live date!'
                        }
                      ]}>
                      <DatePicker format={dateFormat} name='dotpe_date' placeholder='dd/mm/yyyy' style={{width: '100%'}} onChange={handleOnChange} />
                    </Form.Item>
                  </Col>
                ) : (
                  <></>
                )}
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item
                    label='Email'
                    name='email'
                    rules={[
                      {required: true, message: 'Please enter your email!'},
                      {
                        pattern: /^([\w]*[\w.]*(?!\.)@(nagamills.com|gmail.com))/g,
                        message: 'Invalid email Id'
                      }
                    ]}>
                    <Input placeholder='Email' name='email' onChange={handleOnChange} />
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item
                    name='latitude'
                    label='Latitude No'
                    rules={[
                      {
                        pattern: /^(([0-8]?[0-9](\.\d+)?|90(.[0]+)))$/g,
                        message: 'Invalid latitude '
                      }
                    ]}>
                    <Input placeholder='Enter Latitude No' allow='number_only' name='latitude' onChange={handleOnChange} />
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item
                    name='longitude'
                    label='Longitude No'
                    rules={[
                      {
                        pattern: /^(([0-8]?[0-9](\.\d+)?|90(.[0]+)))$/g,
                        message: 'Invalid longitude '
                      }
                    ]}>
                    <Input placeholder='Enter Longitude No' type='number_only' name='longitude' onChange={handleOnChange} />
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='address' label='Restaurant Address'>
                    <Input placeholder='Enter Restaurant Address' name='address' onChange={handleOnChange} />
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item
                    name='order_placing_no'
                    label='Order Placing Phone No'
                    rules={[
                      {
                        pattern: /^[5-9][0-9]{9}$/g,
                        message: 'Invalid Phone Number'
                      }
                    ]}>
                    <Input placeholder='Enter Order Placing No' name='order_placing_no' onChange={handleOnChange} />
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='orl_name' label='ORL Name'>
                    <Select placeholder='select' showSearch filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                      {map(
                        (ORL) => {
                          return (
                            <Option key={ORL.id} value={ORL.id}>
                              {ORL.name}
                            </Option>
                          );
                        },
                        orlNames ? orlNames : []
                      )}
                    </Select>
                    {/* <Input placeholder='Enter ORL Name' name='orl_name' onChange={handleOnChange} /> */}
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item
                    name='emp_vendor_code'
                    label='Employee Vendor Code'                 
                    >
                    <Input placeholder='Enter ORL Vendor Code' name='emp_vendor_code' onChange={handleOnChange} />
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item
                    name='orl_cug_no'
                    label='ORL CUG Phone No'
                    rules={[
                      {
                        pattern: /^[5-9][0-9]{9}$/g,
                        message: 'Invalid Phone Number'
                      }
                    ]}>
                    <Input placeholder='Enter ORL CUG Phone No' name='orl_cug_no' onChange={handleOnChange} />
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item
                    name='contact'
                    label='Phone No'
                    rules={[
                      {
                        pattern: /^[5-9][0-9]{9}$/g,
                        message: 'Invalid Phone Number'
                      }
                    ]}>
                    <Input placeholder='Enter Phone Phone No' onChange={handleOnChange} name='contact' />
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='open_time' label='Open Time'>
                    <TimePicker placeholder='Enter Open Time' style={{width: '100%'}} name='open_time' onChange={handleOnChange} />
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='close_time' label='Close Time'>
                    <TimePicker placeholder='Enter Close Time' style={{width: '100%'}} name='close_time' onChange={handleOnChange} />
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item label='Outlet Opening Date' name='opening_date'>
                    <DatePicker showTime={false} format={dateFormat} placeholder='dd/mm/yyyy' style={{width: '100%'}} name='opening_date' onChange={handleOnChange} />
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='profit_center' label='Profit Center'>
                    <Input placeholder='Enter Profit Center' name='profit_center' onChange={handleOnChange} />
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='cost_center' label='Cost Center'>
                    <Input placeholder='Enter Cost Center' name='cost_center' onChange={handleOnChange} />
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='labour_license_no' label='Labour License No'>
                    <Input placeholder='Enter Labour License No' name='labour_license_no' onChange={handleOnChange} />
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item label='Fire License No' name='fire_license_no'>
                    <Input placeholder='Fire License No' name='fire_license_no' onChange={handleOnChange} />
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item label='Fire Extinguisher License No' name='fire_extinguisher_license_no'>
                    <Input placeholder='Fire Extinguisher License No' name='fire_extinguisher_license_no' onChange={handleOnChange} />
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item label='FSSAI License No' name='fssai_license_no'>
                    <Input placeholder='FSSAI License No' name='fssai_license_no' onChange={handleOnChange} />
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='status' label='Status ' rules={[{required: true, message: 'Please select your status'}]}>
                    <Radio.Group buttonStyle='solid' size='middle' name='status' onChange={handleOnChange}>
                      <Radio.Button className='active' value='active'>
                        Active
                      </Radio.Button>
                      <Radio.Button className='in-active' value='inActive'>
                        In-Active
                      </Radio.Button>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Row gutter={[15, 15]} style={{justifyContent: 'end'}}>
                    <Col span={12} style={{textAlign: 'right'}} className='d-flex align-items-center justify-content-end mt-3'>
                      <Form.Item className='mx-2'>
                        <Button loading={saveOutletMasterRequest} className='orangeFactory' type='primary' htmlType='submit'>
                          {isEdit ? 'Update' : 'Add'}
                        </Button>
                      </Form.Item>
                      {/* </Col>
                    <Col span={12}> */}
                      <Form.Item>
                        <Button onClick={handleClickBack}>Back</Button>
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

export default OutletMasterForm;
