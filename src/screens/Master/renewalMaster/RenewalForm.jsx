import React, { useEffect, useState } from 'react';
import { Card, Button, Col, Row, Form, Input, Radio, Upload, Modal } from 'antd';

import { useLocation, useNavigate } from 'react-router';
import {
  useDispatch,
  // useSelector 
} from 'react-redux';
import messageToast from '../../../components/messageToast/messageToast';
import { transStatus } from '../../../util/transStatus';
import { getLicense, getEmployeeMaster } from '../../../@app/master/masterSlice';
import { updaterenewal } from '../../../@app/subMaster/subMasterSlice';
//import {getEmployeeMaster} from '../../../@app/master/masterSlice';
import { last } from 'ramda';
import { PlusOutlined } from '@ant-design/icons';
import { baseURL } from '../../../api/baseURL';
import ConfirmOnExit from '../../../components/confirmOnExit/ConfirmOnExit';
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function RenewalForm() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    dispatch(getLicense());
  }, [dispatch]);

  const [imageUpdated, setImageUpdated] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [license_attachment, setImage] = useState('');
  const [fileList, setFileList] = useState([]);
  const handleCancel = () => setPreviewOpen(false);

  const [DocUpdated, setDocImageUpdated] = useState(false);
  const [previewDocOpen, setDocPreviewOpen] = useState(false);
  const [previewDocImage, setDocPreviewImage] = useState('');
  const [previewDocTitle, setDocPreviewTitle] = useState('');
  const [license_acknowledgement, setDocImage] = useState('');
  const [fileDoc, setFileListDoc] = useState([]);
  const handleDocCancel = () => setDocPreviewOpen(false); 

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const handleDocPreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setDocPreviewImage(file.url || file.preview);
    setDocPreviewOpen(true);
    setDocPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const handleChange = (e) => {
    setFileList(e?.fileList);
    setImage(e?.file?.response?.license_attachment ?? '');
    form.setFieldsValue({license: e?.file?.response?.license_attachment ?? ''});
    setImageUpdated(true);
  };

  const handleDocChange = (e) => {
    setFileListDoc(e?.fileList);
    //console.log(e);
    setDocImage(e?.file?.response?.license_acknowledgement ?? '');
    form.setFieldsValue({acknowledgement: e?.file?.response?.license_acknowledgement ?? ''});
    setDocImageUpdated(true);
  };
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
    action: `${baseURL}license-attachementupload`,
    headers: {
      authorization: 'authorization-text'
    }
  };
  const Docprops = {
    name: 'license_acknowledgement',
    action: `${baseURL}license-ackupload`,
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

  const getFileDoc = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileDoc;
  };
  const uploadButton = (
    <Button style={{display: 'flex', direction: 'row'}} icon={<PlusOutlined style={{marginTop: '3px', marginRight: '4px'}} />}>
      <div
        style={{
          marginLeft: '3px'
        }}>
        {defaultValue?.id ? 'Renewal Attachement' : 'Upload'}
      </div>
    </Button>
  );
  const uploadDocButton = (
    <Button style={{display: 'flex', direction: 'row'}} icon={<PlusOutlined style={{marginTop: '3px', marginRight: '4px'}} />}>
      <div
        style={{
          marginLeft: '3px'
        }}>
        {defaultValue?.id ? 'Acknowledgement' : 'Upload'}
      </div>
    </Button>
  );
  if (defaultValue?.id) {
    form.setFieldsValue({license_attachment: defaultValue?.license_attachment ?? 'No image'});
  }
  if (defaultValue?.id) {
    form.setFieldsValue({license_acknowledgement: defaultValue?.license_acknowledgement ?? 'No ack'});
  }
  //const [status, setStatus] = useState(defaultValue?.status ?? 1);
  // const [ setValue] = useState(1);
  //   const onChange3 = (e) => {
  //     console.log('radio checked', e.target.value);
  //     setValue(e.target.value);
  //   };
  const onFinish = (data) => {
   
    setShowDialog(false);
    if(data.license_attachment){
      data.license_attachment= imageUpdated ? license_attachment ?? 'No image' : last(defaultValue?.license_attachment.split('/')) ?? 'No image';
    }
    else{
      data.license_attachment='NULL';
    }
    if(data.license_acknowledgement){
      data.license_acknowledgement= DocUpdated ? license_acknowledgement ?? 'No Ack' : last(defaultValue?.license_acknowledgement.split('/')) ?? 'No Ack';
    }
    else{
      data.license_acknowledgement='NULL';
    }

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

    //console.log(data);
    dispatch(defaultValue?.id ? updaterenewal({ data: { ...data,incidentaldetails: incidentalDetails, status: transStatus({ status }), id: defaultValue.id } }) : updaterenewal({ data: { ...data, incidentaldetails: incidentalDetails } })).then(
      ({ message, status, statusText }) => {
        if (status === 200) {
          navigate('/renewalMaster');
          form.resetFields();
        }
        else {
          navigate('/renewalMaster');
          form.resetFields();
        }
        messageToast({ message: message ?? statusText, status, title: 'Renewal Master' });
      }
    );
  };

  const [AcknowlegementStatus, setAcknowlegementStatus] = useState(defaultValue?.ack_status ?? false);
  const [RenewalStatus, setRenewalStatus] = useState(defaultValue?.renewal_status ?? false);
  //const [dotpeStatus, setDotpeStaus] = useState(defaultValue?.dotpe_status ?? false);


  const handleOnChange = (e) => {
    setShowDialog(true);
    if (e.target.name === 'renewal_status') {
      if (e.target.value === 0) {
        setRenewalStatus(false);
      } else {
        setRenewalStatus(true);
      }
    }
    if (e.target.name === 'ack_status') {
      if (e.target.value === 0) {
        setAcknowlegementStatus(false);
      } else {
        setAcknowlegementStatus(true);
      }
    }
    // if (e.target.name === 'dotpe_status') {
    //   if (e.target.value === 0) {
    //     setDotpeStaus(false);
    //   } else {
    //     setDotpeStaus(true);
    //   }
    // }

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

  const handleClickBack = () => {
    navigate('/renewalMaster');
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
                license: defaultValue?.license_type_id,
                report_id: defaultValue?.report_id,
                ...defaultValue,
                ack_status: defaultValue && Number(defaultValue?.ack_status),
                renewal_status: defaultValue && Number(defaultValue?.renewal_status),
                present_license_attachement:defaultValue.present_license_attachement,
                license_acknowledgement:defaultValue.license_acknowledgement,
                apply_date: defaultValue?.apply_date,
                from_date: defaultValue?.renewal_start_date,
                to_date: defaultValue?.renewal_end_date,
                license_reg_no: defaultValue?.renewal_reg_no,
                license_app_no: defaultValue?.renewal_app_no,
                renewal_date: defaultValue?.renewal_renewal_date,
                license_amount:defaultValue?.renewal_license_cost,
                Rid: defaultValue?.Rid,
                discard: 0,
                //remarks: defaultValue?.remarks,
                status: defaultValue?.status ?? 1
              }}
              onFinish={onFinish}
              autoComplete='off'
              form={form}>

              <Row gutter={[15, 0]} style={{ Color: 'black' }}>

                <Col md={{ span: 6 }} xs={{ span: 24 }} lg={{ span: 5 }}>

                </Col>

                <Col md={{ span: 6 }} xs={{ span: 24 }} lg={{ span: 5 }}>
                  <Form.Item name='OutletName' style={{ color: 'white' }} label='Outlet Name' rules={[{ required: true, message: 'Please select license type' }]}>
                    <Input name='OutletName' placeholder='' defaultValue={defaultValue?.OutletName} disabled='disabled' />
                  </Form.Item>
                </Col>

                <Col md={{ span: 6 }} xs={{ span: 24 }} lg={{ span: 5 }}>
                  <Form.Item name='License' label='License Name' rules={[{ required: true, message: 'Please select license type' }]}>
                    <Input name='License' placeholder='' defaultValue={defaultValue?.License} disabled='disabled' />
                  </Form.Item>
                </Col>

                <Col md={{ span: 6 }} xs={{ span: 24 }} lg={{ span: 5 }}>
                  <Form.Item name='license1_reg_no' label='Registration No' >
                    <Input name='license1_reg_no' placeholder='' defaultValue={defaultValue?.license_reg_no} disabled='disabled' />
                  </Form.Item>
                </Col>

              </Row>

              <Row gutter={[15, 0]} style={{ Color: 'black' }}>
                <Col md={{ span: 6 }} xs={{ span: 24 }} lg={{ span: 5 }}>
                </Col>

                <Col md={{ span: 6 }} xs={{ span: 24 }} lg={{ span: 5 }}>
                  <Form.Item name='license_start_date' label='Validity Start Date' rules={[{ required: true, message: 'Please select license type' }]}>
                    <Input name='license_start_date' placeholder='' style={{ fontStyle: 'oblique', Color: 'black' }} defaultValue={defaultValue?.license_start_date} disabled='disabled' />
                  </Form.Item>
                </Col>

                <Col md={{ span: 6 }} xs={{ span: 24 }} lg={{ span: 5 }}>
                  <Form.Item name='license_end_date' label='Validity End Date' rules={[{ required: true, message: 'Please select license type' }]}>
                    <Input name='license_end_date' placeholder='' defaultValue={defaultValue?.license_end_date} disabled='disabled' />
                  </Form.Item>
                </Col>

                <Col md={{ span: 6 }} xs={{ span: 24 }} lg={{ span: 5 }}>
                  <Form.Item name='license_renewal_date' label='Renewal Date' rules={[{ required: true, message: 'Please select license type' }]}>
                    <Input name='license_renewal_date' placeholder='' defaultValue={defaultValue?.license_renewal_date} disabled='disabled' />
                  </Form.Item>
                </Col>
                

              </Row>
              <Row gutter={[15, 0]} style={{ Color: 'black' }}>
                <Col md={{ span: 6 }} xs={{ span: 24 }} lg={{ span: 5 }}>
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }} lg={{ span: 5 }}>
                </Col>
               

                <Col md={{ span: 8}} xs={{ span: 24 }} lg={{ span: 6}}>
                <iframe width='100%' height="85%" allowFullScreen='allowfullscreen' src={defaultValue?.present_license_attachement ?? ''} />
                       
                </Col>
                </Row>
              <hr
                style={{
                  background: 'lime',
                  color: 'lime',
                  borderColor: 'lime',
                  height: '3px',
                }}
              />
              <Row gutter={[15, 0]}>

                <Col md={{ span: 4 }} xs={{ span: 14 }}>
                  <Form.Item
                    name='ack_status'
                    label='Acknowledgement'
                    getValueFromEvent={getFileDoc}
                  >
                    <Radio.Group
                      
                      buttonStyle='solid'
                      size='middle'
                      name='ack_status'
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

                
                {AcknowlegementStatus ? (
                  <Col md={{ span: 4 }} xs={{ span: 14 }}>
                    <Form.Item
                      label='Apply Date'
                      name='apply_date'
                      rules={[
                        {
                          required: true,
                          message: 'Please select Apply date!'
                        }
                      ]}>
                      <Input type='date'
                        style={{
                          width: '100%'
                        }}
                      
                        name="apply_date"
                        placeholder='Add Add From date'
                      
                      />
                     </Form.Item>
                  </Col>
                ) : (
                  <></>
                )}
                {AcknowlegementStatus ? (
                  <Col md={{ span: 4 }} xs={{ span: 14 }}>
                    <Form.Item
                      label='Acknowledgement'
                      name='license_acknowledgement'
                      rules={[
                        {
                          required: true,
                          message: 'Please select license_acknowledgement !'
                        }
                      ]}>
                       <div style={{display: 'flex', direction: 'col'}}>
                     
                     <Upload
                       {...Docprops}
                       name="license_acknowledgement"
                       fileList={fileDoc}
                       onPreview={handleDocPreview}
                       capture='environment'
                       accept='.pdf'
                       onChange={(e) => {
                         handleDocChange(e);
                       }}>
                       {fileDoc.length >= 1 ? null : uploadDocButton}
                     </Upload>
                     <span style={{padding:'8px'}}></span>

                     {defaultValue?.id && fileDoc?.length === 0 ? (
                       defaultValue?.license_acknowledgement ? (
                         <iframe allowFullScreen='allowfullscreen' src={defaultValue?.license_acknowledgement ?? ''} />
                       ) : (
                         'No pdf Available'
                       )
                     ) : (
                       <></>
                     )}
                   </div>
                   <Modal name="license_acknowledgement" open={previewDocOpen} title={previewDocTitle} footer={null} onCancel={handleDocCancel}>
                      <iframe
                        alt='example'
                        style={{
                          width: '100%'
                        }}
                        allowFullScreen='allowfullscreen'
                        src={previewDocImage}
                      />
                    </Modal>
                     </Form.Item>
                  </Col>
                ) : (
                  <></>
                )}

              </Row>
              <Row gutter={[15, 0]}>
                <Col md={{ span: 4 }} xs={{ span: 14 }}>
                  <Form.Item
                    name='renewal_status'
                    label='Renewal'
                    getValueFromEvent={getFile}
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your Renewal Available'
                      }
                    ]}>
                    <Radio.Group buttonStyle='solid' size='middle' name='renewal_status' onChange={handleOnChange}>
                      <Radio.Button className='active' value={1}>
                        Yes
                      </Radio.Button>
                      <Radio.Button className='in-active' value={0}>
                        No
                      </Radio.Button>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                {RenewalStatus ? (
                  <Col md={{ span: 4 }} xs={{ span: 14 }}>
                    <Form.Item
                      label='License Register No'
                      name='license_reg_no'
                      rules={[
                        {
                          required: true,
                          message: 'Please select Register No!'
                        }
                      ]}>
                      <Input placeholder='Enter Register No' name='license_reg_no' defaultValue={defaultValue?.renewal_reg_no} onChange={handleOnChange} />
                      </Form.Item>
                  </Col>
                ) : (
                  <></>
                )}
                {RenewalStatus ? (
                  <Col md={{ span: 4 }} xs={{ span: 14 }}>
                    <Form.Item
                      label='License Application No'
                      name='license_app_no'
                      rules={[
                        {
                          required: true,
                          message: 'Please select Register No!'
                        }
                      ]}>
                      <Input placeholder='Enter Application No' type='text' name='license_app_no' defaultValue={defaultValue?.renewal_app_no}  onChange={handleOnChange} />
                      </Form.Item>
                  </Col>
                ) : (
                  <></>
                )}

{RenewalStatus ? (
                  <Col md={{ span: 4 }} xs={{ span: 14 }}>
                    <Form.Item
                      label='License Cost'
                      name='license_amount'
                      rules={[
                        {
                          required: true,
                          message: 'Please enter cost!'
                        }
                      ]}>
                      <Input placeholder='Enter Cost' type='text' name='license_amount' defaultValue={defaultValue?.license_amount}   />
                      </Form.Item>
                  </Col>
                ) : (
                  <></>
                )}

                {RenewalStatus ? (
                  <Col md={{ span: 4 }} xs={{ span: 14 }}>
                    <Form.Item
                      rules={[
                        {
                          required: true,
                          message: 'Please enter your Start Date'
                        }
                      ]}
                      name='from_date'
                      label='Validity Start Date '>
                    
                      <Input type='date' name='from_date' defaultValue={defaultValue?.renewal_start_date}  onChange={handleOnChange} />
                    </Form.Item>
                  </Col>
                ) : (
                  <></>
                )}
                {RenewalStatus ? (
                  <Col md={{ span: 4 }} xs={{ span: 14 }}>
                    <Form.Item
                      label='Validity End Date'
                      name='to_date'
                      rules={[
                        {
                          required: true,
                          message: 'Please select End Date!'
                        }
                      ]}>
                      <Input type='date' name='to_date' style={{ width: '100%' }} defaultValue={defaultValue?.renewal_end_date}  />
                     </Form.Item>
                  </Col>
                ) : (
                  <></>
                )}
                
                {RenewalStatus ? (
                  <Col md={{ span: 4 }} xs={{ span: 14 }}>
                  
                    <Form.Item
                      label='Renewal Date'
                      name='renewal_date'
                      rules={[
                        {
                          required: true,
                          message: 'Please select Renewal Date!'
                        }
                      ]}>
                      <Input type='date' name='renewal_date' defaultValue={defaultValue?.renewal_renewal_date}  style={{ width: '100%' }} />
                        </Form.Item>

                  </Col>
                ) : (
                  <></>
                )}
                {RenewalStatus ? (
                  <Col md={{ span: 4 }} xs={{ span: 14 }}>
                    <Form.Item
                      label='Renewal Attachment'
                      name='license_attachment'
                      rules={[
                        {
                          required: true,
                          message: 'Please select Attachment !'
                        }
                      ]}>
                       <div style={{display: 'flex', direction: 'col'}}>
                     
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
                     <span style={{padding:'8px'}}></span>

                     {defaultValue?.id && fileList?.length === 0 ? (
                       defaultValue?.license_attachment ? (
                         <iframe allowFullScreen='allowfullscreen' src={defaultValue?.license_attachment ?? ''} />
                       ) : (
                         'No pdf Available'
                       )
                     ) : (
                       <></>
                     )}
                   </div>
                   <Modal name="license_attachment" open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                      <embed
                        alt='example'
                        style={{
                          width: '100%'
                        }}
                        src={previewImage}
                      />
                    </Modal>
                     </Form.Item>
                  </Col>
                ) : (
                  <></>
                )}
                </Row>
                <Row gutter={[15, 0]} >

                {RenewalStatus ? (
                  <Col md={{ span: 4 }} xs={{ span: 14 }}>
                    <Form.Item
                      label='Remarks'
                      name='user_remarks'
                    >
                      <Input placeholder='Enter Remarks' name='user_remarks' onChange={handleOnChange} />
                     </Form.Item>
                  </Col>
                ) : (
                  <></>
                )}
                 {RenewalStatus ? (
//{ ?()
                  <Col md={{ span: 4 }} xs={{ span: 14 }}>
                    <Form.Item
                     name=''
                     label='Validated Remarks'
                     disabled=''
                    
                    >
                      <p style={{color:'red',padding:'2px'}}>{defaultValue?.renewal_validated_remarks}</p>
                     
                     </Form.Item>
                  </Col>

                  
) : (
  <></>
)}
              


               
      

            

               




               
                 
                   <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item name='discard' label='Discard'>
                   <Radio.Group  name='discard'>
                 <Radio value={1}>Yes</Radio>
      <Radio value={0}  defaultValue={defaultValue?.discard}>No</Radio>
      
                  </Radio.Group> 

                 
                  </Form.Item>
                </Col>
                <Col span={6} style={{ textAlign: 'center' }} className='d-flex align-items-center justify-content-end '>
                  <Form.Item className='mx-2'>
                    <label htmlFor="">Incidental Cost</label><br />
                    <Button style={{ marginTop: '7px', backgroundColor: 'green', color: 'white', fontWeight: 'bold' }} onClick={handleAddRow}>Add</Button>
                  </Form.Item>

                </Col>
                <>

                  {formRows.map((row) => (
                    <Row gutter={[15, 0]} key={row.id}>
                      <Col span={6}>
                        <Form.Item
                          name={`incidental_cost-${row.id}`}
                          label='Incidental Cost'
                          rules={[{ required: true, message: 'Please enter incidental cost' }]}
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
                {RenewalStatus ? (
                  <Col md={{ span: 4 }} xs={{ span: 14 }}>
                    <Form.Item
                     
                      name='Rid'
                    >
                      <Input placeholder='' type='hidden' name='Rid'  defaultValue={defaultValue?.Rid}  />
                     </Form.Item>
                  </Col>
                ) : (
                  <></>
                )}
                <Col span={24}>
                  <Row gutter={[15, 15]} style={{ justifyContent: 'end' }}>
                    <Col span={6} style={{ textAlign: 'right' }} className='d-flex align-items-center justify-content-end mt-3'>
                     
                      <Form.Item className='mx-2'>
                        <Button className='orangeFactory' type='primary' htmlType='submit'  disabled={defaultValue?.renewalApprove == 3 || defaultValue?.renewalApprove == 1 || defaultValue?.renewalApprove == 0}>
                          {isEdit ? 'Update' : 'Add'}
                        </Button>
                      </Form.Item>
                    
                      <Form.Item>
                        <Button onClick={handleClickBack} >
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

export default RenewalForm;
