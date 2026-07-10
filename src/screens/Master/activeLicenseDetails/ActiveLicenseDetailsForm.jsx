import React, { useEffect, useState } from 'react';
import { Card, Button, Col, Row, Form, Input,  Select, Upload, Modal,  } from 'antd';

import { useLocation, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import messageToast from '../../../components/messageToast/messageToast';

import { getLicense, getEmployeeMaster } from '../../../@app/master/masterSlice';
import {  updateActiveLicense, saveActiveLicense, getActiveLicense } from '../../../@app/subMaster/subMasterSlice';
import {last} from 'ramda';
import {PlusOutlined} from '@ant-design/icons';
import {baseURL} from '../../../api/baseURL';
import ConfirmOnExit from '../../../components/confirmOnExit/ConfirmOnExit';
import { getOutletMaster, getSubZonal, getZonal } from '../../../@app/master/masterSlice';
import { map } from 'ramda';

const { Option } = Select;
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });


function ActiveLicenseForm() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showDialog, setShowDialog] = useState(false);
  const zoneID = Form.useWatch('zone_id', form);
  const subZoneID = Form.useWatch('subzone_id', form);

  const [imageUpdated, setImageUpdated] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [license_attachment, setImage] = useState('');
  const [fileList, setFileList] = useState([]);
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
    setImage(e?.file?.response?.license_attachment ?? '');
    form.setFieldsValue({license: e?.file?.response?.license_attachment ?? ''});
    setImageUpdated(true);
  };
  const {

    gettingZonal,

    getZonalResponse: { data: Zonals },
    gettingLicense,
    getLicenseResponse: { data: License },
    getOutletMasterResponse: { data: outletMasterList },
    getSubZonalResponse: { data: SubZonals },

  } = useSelector((state) => {
    return state.master;
  });
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

  useEffect(() => {
    dispatch(getActiveLicense());
  }, [dispatch]);


  useEffect(() => {
    dispatch(getEmployeeMaster());
  }, [dispatch]);

  const {
    savingActiveLicense
  } = useSelector((state) => {
    return state.master;
  });
  const {
    state: { data: defaultValue, isEdit = false }
  } = useLocation();




  const costdetails = JSON.parse(defaultValue?.incidental_cost || '[]');

  const handleAddRow = () => {
    setFormRows((prevRows) => [
      ...prevRows,
      { id: prevRows.length + 1, incidental_cost: '', incidental_remark: '' },
    ]);
  };

  // Use cost details from defaultValue or fallback to an empty array
  const formRowsInitial = costdetails.map((detail, index) => ({
    id: index + 1,
    incidental_cost: detail[`incidental_cost-${index + 1}`] || '',
    incidental_remark: detail[`incidental_remark-${index + 1}`] || '',
  }));

  const [formRows, setFormRows] = useState(formRowsInitial);

  const handleDeleteRow = (rowId) => {
    setFormRows((prevRows) => prevRows.filter((row) => row.id !== rowId));
  };

  const Changecost = (rowId, fieldName, value) => {
    setFormRows((rows) =>
      rows.map((row) => (row.id === rowId ? { ...row, [fieldName]: value } : row))
    );
  };



  const props = {
    name: 'license_attachment',
    action: `${baseURL}editlicense-imageupload`,
    headers: {
      authorization: 'authorization-text'
    }
  };


  const getFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
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
    form.setFieldsValue({license_attachment: defaultValue?.license_attachment ?? 'No image'});
  }



  const onFinish = (data) => {   
    setShowDialog(false);


    const incidentalDetails = [];

    for (const key in data) {
      if (key.includes("incidental_cost") || key.includes("incidental_remark")) {
        const rowNumber = key.split('-')[1];
        const existingRow = incidentalDetails.find(row => row.rowNumber === rowNumber);

        if (existingRow) {
          existingRow[key] = data[key];
        } else {
          const newRow = {
            rowNumber: rowNumber,
            [key]: data[key]
          };
          incidentalDetails.push(newRow);
        }
      }
    }

    dispatch(defaultValue?.id ? updateActiveLicense({ data: { ...data, incidentaldetails: incidentalDetails, license_attachment: imageUpdated ? license_attachment ?? 'No image' : last(defaultValue?.license_attachment.split('/')) ?? 'No image', id: defaultValue.id } }) : saveActiveLicense({ data: { ...data, incidentaldetails: incidentalDetails, license_attachment: license_attachment ?? 'No image' } })).then(
      ({ message, status, statusText }) => {
        if (status === 200) {
          navigate('/license');
          form.resetFields();
        }
        else {
          navigate('/license');
          form.resetFields();
        }
        messageToast({ message: message ?? statusText, status, title: 'Add License' });
      }
    );
  };
  // const changeHandler = e => {
  //   let filename = e.target.files[0].name;
  //   return filename;
  // }

  const handleClickBack = () => {
    navigate('/license');
  };

  // const dateFormat = 'DD-MM-YYYY';
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
                zone_id: defaultValue?.zone_id,
                outlet_id: defaultValue?.outlet_id,
                subzone_id: defaultValue?.subzone_id,
                license_type_id: defaultValue?.license_type_id,
                license_reg_no: defaultValue?.license_reg_no,
                license_app_no: defaultValue?.license_app_no,
                license_start_date: defaultValue?.license_start_date,
                license_end_date: defaultValue?.license_end_date,
                license_renewal_date: defaultValue?.license_renewal_date,
                license_validation_remarks: defaultValue?.validation_remarks,
                license_attachment: defaultValue?.license_attachment,
                license_cost: defaultValue?.license_cost,
                incidentalDetails: defaultValue?.incidental_cost,


              }}
              onFinish={onFinish}
              autoComplete='off'
              form={form}>
              {/* <Row style={{ justifyContent: 'center' }}>
                <Title type="success" textAlign="center" level={4}> {defaultValue?.OutletName} Outlet </Title>
              </Row> */}


              <Row gutter={[15, 0]}>
                <Col span={6}>
                  <Form.Item name='zone_id' label='Zone'  rules={[{ required: true, message: 'Please select Zone' }]}>
                    <Select
                      placeholder='select'
                      loading={gettingZonal}
                      //disabled={savingLicenseDetail}
                      defaultValue={defaultValue?.zone_id}

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
                  <Form.Item name='subzone_id' label='Sub Zone'  rules={[{ required: true, message: 'Please select Subzone' }]}>
                    <Select
                      placeholder='select'

                      //disabled={defaultValue?.subzone_id}
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
                  <Form.Item name='outlet_id' label='Outlet'  rules={[{ required: true, message: 'Please select Outlet' }]}>
                    <Select
                      placeholder='select'
                      //disabled={defaultValue?.outlet_id}
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
                        //outletMasterList ? outletMasterList : []
                        outletMasterList ? outletMasterList?.filter((e) => e.status === 1) : []
                      )}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>


              <Row gutter={[15, 0]} style={{ Color: 'black' }}>
                <Col span={6}>
                  <Form.Item name='license_type_id' label='License Name'  rules={[{ required: true, message: 'Please select License' }]}>
                    <Select
                      placeholder='select'

                      defaultValue={defaultValue?.license_type_id}
                      loading={gettingLicense}
                      showSearch
                      filterOption={(input, option) => option.children.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0}>
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
                </Col>
                <Col span={6}>

                  <Form.Item name='license_cost' label='Cost'  rules={[{ required: true, message: 'Please enter license cost' }]}>
                    <Input

                      name="license_cost"
                      placeholder='License Cost'
                      defaultValue={defaultValue?.license_cost}
                    />
                  </Form.Item>
                </Col>
                <Col span={6}>

                  <Form.Item name='license_reg_no' label='Registration No'  rules={[{ required: true, message: 'Please enter  Registration number' }]}>
                    <Input
                      style={{
                        width: '100%'
                      }}
                      placeholder='Add Register No'
                      defaultValue={defaultValue?.license_reg_no}
                    />
                  </Form.Item>
                </Col>
                <Col span={6}>

                  <Form.Item name='license_app_no' label='Application No'  rules={[{ required: true, message: 'Please enter application number' }]}>
                    <Input

                      name="license_app_no"
                      placeholder='Add License No'
                      defaultValue={defaultValue?.license_reg_no}
                    />
                  </Form.Item>
                </Col>
                <Col span={6}>

                  <Form.Item name='license_start_date' label='Validity Start Date'  rules={[{ required: true, message: 'Please select Validity Start Date' }]}>
                    <Input type='date'


                      name="license_start_date"
                      placeholder='Add Add From date'
                      defaultValue={defaultValue?.license_start_date}
                    />


                  </Form.Item>
                </Col>


                <Col span={6}>

                  <Form.Item name='license_end_date' label='Validity End Date'  rules={[{ required: true, message: 'Please select Validity End Date' }]}>
                    <Input type='date' name="license_end_date"  defaultValue={defaultValue?.license_end_date} />
                  </Form.Item>
                </Col>
                <Col span={6}>

                  <Form.Item name='license_renewal_date' label='License Renewal Date'  rules={[{ required: true, message: 'Please select Renewal Date' }]}>
                    <Input type='date' name="license_renewal_date"  defaultValue={defaultValue?.license_renewal_date} />
                  </Form.Item>
                </Col>

                <Col md={{span: 6}} xs={{span: 12}}>
                  <Form.Item
                    name='license_attachment'
                    label='License Attachement'
                    getValueFromEvent={getFile}
                   >
                    <div style={{display: 'gird', direction: 'row'}}>

                      <Upload
                        {...props}
                        name="license_attachment"
                        fileList={fileList}
                        onPreview={handlePreview}
                        capture='environment'
                        accept='.pdf'
                        onChange={(e) => {
                          handleChange(e);
                        }}>
                        {fileList.length >= 1 ? null : uploadButton}
                      </Upload>
                      <div style={{padding:'8px'}}></div>
                      <span style={{padding:'8px'}}></span>

                      {defaultValue?.id && fileList?.length === 0 ? (
                        defaultValue?.license_attachment ? (
                          <iframe allowFullScreen='allowfullscreen' src={defaultValue?.license_attachment ?? ''} />
                        ) : (
                          'No Image Available'
                        )
                      ) : (
                        <></>
                      )}
                    </div>
                    <Modal name="license_attachment" open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                      <iframe
                        alt='example'
                        style={{
                          width: '100%'
                        }}
                        src={previewImage}
                      />
                    </Modal>
                  </Form.Item>
                </Col>

                <Col md={{ span: 6 }} xs={{ span: 24 }} lg={{ span: 6 }}>
                  <Form.Item name='remarks' label='Remarks' >
                    <Input name='remarks' style={{ width: '100%' }} placeholder='' />
                  </Form.Item>
                </Col>

                <Col span={6} style={{ textAlign: 'center' }} className='d-flex align-items-center justify-content-end '>
                  <Form.Item className='mx-2'>
                    <label htmlFor="">Incidental Cost</label><br />
                    <Button style={{ marginTop: '7px', backgroundColor: 'green', color: 'white', fontWeight: 'bold' }} onClick={handleAddRow}>Add</Button>
                  </Form.Item>

                </Col>

              </Row>

              <>

                {formRows.map((row) => (
                  <Row gutter={[15, 0]} key={row.id}>
                    <Col span={6}>
                      <Form.Item
                        name={`incidental_cost-${row.id}`}
                        label='Incidental Cost'
                        rules={[{ required: true, message: 'Please enter incidental cost', },
                        ]}
                      >
                        <Input
                          name="incidental_cost"
                          placeholder='Incidental Cost'
                          defaultValue={row.incidental_cost}
                          onChange={(e) => Changecost(row.id, 'incidental_cost', e.target.value)}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item
                        name={`incidental_remark-${row.id}`}
                        label='Remark'
                        rules={[{ required: true, message: 'Please enter incidental remark' }]}
                      >
                        <Input
                          name="incidental_remark"
                          placeholder='Incidental Remark'
                          defaultValue={row.incidental_remark}
                          onChange={(e) => Changecost(row.id, 'incidental_remark', e.target.value)}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Button disabled={row.id !== formRows.length} style={{ marginTop: '30px', backgroundColor: 'red', color: 'white' }} onClick={() => handleDeleteRow(row.id)}>Delete</Button>
                    </Col>
                  </Row>
                ))}

              </>


              <Col span={24}>
                <Row gutter={[15, 15]} style={{ justifyContent: 'end' }}>
                  <Col span={6} style={{ textAlign: 'right' }} className='d-flex align-items-center justify-content-end mt-3'>

                    <Form.Item>
                      <Button onClick={handleClickBack} disabled={savingActiveLicense}>
                        Back
                      </Button>
                    </Form.Item>
                    <Form.Item className='mx-2'>
                      <Button className='orangeFactory' type='primary' htmlType='submit' loading={savingActiveLicense} disabled={defaultValue?.renewal_status}>
                        {isEdit ? 'Update' : 'Submit'}
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

export default ActiveLicenseForm;
