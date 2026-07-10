import React, { useEffect, useState } from 'react';
import { Card, Button, Col, Row, Form, Input, Radio,Typography } from 'antd';
import { useLocation, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import messageToast from '../../../components/messageToast/messageToast';
//import { transStatus } from '../../../util/transStatus';
import { getLicense, getEmployeeMaster } from '../../../@app/master/masterSlice';
import { getApprove,updateApprove,saveApprove } from '../../../@app/subMaster/subMasterSlice';
//import {getEmployeeMaster} from '../../../@app/master/masterSlice';
import ConfirmOnExit from '../../../components/confirmOnExit/ConfirmOnExit';
import Modal from 'react-bootstrap/Modal';
const { Title } = Typography;


function ApproveForm() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    dispatch(getLicense());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getApprove());
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
  const capitalizeWords = (str) => {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  const {
    savingPeriod
  } = useSelector((state) => {
    return state.master;
  });
  const {
    state: { data: defaultValue, isEdit = false }
  } = useLocation();

  
  const costdetails = JSON.parse(defaultValue?.incidental_cost || '[]');

  // Use cost details from defaultValue or fallback to an empty array
  const formRowsInitial = costdetails.map((detail, index) => ({
    id: index + 1,
    incidental_cost: detail[`incidental_cost-${index + 1}`] || '',
    incidental_remark: detail[`incidental_remark-${index + 1}`] || '',
  }));

  const [formRows, setFormRows] = useState(formRowsInitial);

  const Changecost = (rowId, fieldName, value) => {
    setFormRows((rows) =>
      rows.map((row) => (row.id === rowId ? { ...row, [fieldName]: value } : row))
    );
  };


  //const [status, setStatus] = useState(defaultValue?.status ?? 1);

  const onFinish = (data) => {
     setShowDialog(false);

    dispatch(defaultValue?.id ? updateApprove({ data: { ...data, id: defaultValue.id } }) : saveApprove({ data })).then(
      ({ message, status, statusText }) => {
        if (status === 200) {
          navigate('/approveMaster');
          form.resetFields();
        }
        else {
          navigate('/approveMaster');
          form.resetFields();
        }
        messageToast({ message: message ?? statusText, status, title: 'Approve License' });
      }
    );
  };


  const [ setValue] = useState(1);
  const onChange3 = (e) => {
     setValue(e.target.value);
  };
  const handleClickBack = () => {
    navigate('/approveMaster');
  };


  function LicenseAttachementModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            License Attachement
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          {defaultValue?.id ? (
            defaultValue?.license_attachment ? (


              <iframe width="100%" height={300}

                // controls
                alt="No Document" style={{ paddingRight: '10px' }} src={defaultValue?.license_attachment ?? ''} ></iframe>
            ) : (
              'No Attachement'
            )
          ) : (
            <></>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  const [modalShow, setModalShow] = React.useState(false);

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
              
                status: defaultValue?.currentstatus,
                renewal_status: defaultValue?.renewal_status,
                remarks:defaultValue?.remarks
              }}
              onFinish={onFinish}
              autoComplete='off'
              form={form}>
                 <Row style={{ justifyContent: 'center' }}>
                 <Title type="success" textAlign="center" level={4}>{capitalizeWords(defaultValue?.LicenseAs)} for {defaultValue?.OutletName} Outlet </Title>
               </Row>
              <Row gutter={[15, 0]} style={{ Color: 'black' }}>
 
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
                <Col md={{ span: 6 }} xs={{ span: 24 }} lg={{ span: 5 }}>
                  <Form.Item name='license_app_no' label='Application No' >
                    <Input name='license_app_no' placeholder='' defaultValue={defaultValue?.license_app_no} disabled='disabled' />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[15, 0]} style={{ Color: 'black' }}>


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
                  <Form.Item name='license_renewal_date' label='Renewal Date' >
                    <Input name='license_renewal_date' placeholder='' defaultValue={defaultValue?.license_renewal_date} disabled='disabled' />
                  </Form.Item>
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }} lg={{ span: 5 }}>
                  <Form.Item name='remarks' label='Remarks' >
                    <Input name='' placeholder='' defaultValue={defaultValue?.remarks} disabled='disabled' />
                  </Form.Item>
                </Col>
                

                
                <Col md={{ span: 6 }} xs={{ span: 24 }} lg={{ span: 5 }}>
                  <div style={{ display: 'flex', direction: 'col' }}>
                    {/* {defaultValue?.id  ? (
                        defaultValue?.license_attachment ? (

                          
                          <iframe  width={400} height={150}
                        
                          // controls
                          alt="No Document" style={{paddingRight: '10px'}} src={defaultValue?.license_attachment ?? ''} ></iframe>
                        ) : (
                          'No Attachement'
                        )
                      ) : (
                        <></>
                      )} */}

                    <Button variant="primary" onClick={() => setModalShow(true)}>
                      Click Here to view Attachement
                    </Button>

                    <LicenseAttachementModal
                      show={modalShow}
                      onHide={() => setModalShow(false)}
                    />
                  </div>
                </Col>
                

              </Row>
              <Row  style={{ Color: 'black' ,padding:'4px'}}>
              <Col md={{ span: 6 }} xs={{ span: 24 }}  lg={{ span: 5}}>
                  <Form.Item name='status' label='Validation Approve' rules={[{ required: true, message: 'Please Select ' }]}>
                   
                  <Radio.Group onChange={onChange3} name='status' style={{ width: '100%' }}>
                      <Radio value={1} checked >Yes</Radio>
                      <Radio value={0} >No</Radio>

                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }} lg={{ span: 6 }}>
                  <Form.Item name='validation_remarks' label='Remarks' 
                   rules={[{ required: true, message: 'Please enter your remarks' }]}
                  >
                    <Input name='validation_remarks' style={{ width: '100%' }} placeholder='' />
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
                      >
                        <Input
                          name="incidental_cost"
                          placeholder='Incidental Cost'
                          defaultValue={row.incidental_cost}
                          disabled
                          onChange={(e) => Changecost(row.id, 'incidental_cost', e.target.value)}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item
                        name={`incidental_remark-${row.id}`}
                        label='Remark'
                      >
                        <Input
                          name="incidental_remark"
                          placeholder='Incidental Remark'
                          defaultValue={row.incidental_remark}
                          disabled
                          onChange={(e) => Changecost(row.id, 'incidental_remark', e.target.value)}
                        />
                      </Form.Item>
                    </Col>
                  
                  </Row>
                ))}

              </>

              <Col span={24}>
                <Row gutter={[15, 15]} style={{ justifyContent: 'end' }}>
                  <Col span={6} style={{ textAlign: 'right' }} className='d-flex align-items-center justify-content-end mt-3'>
                    {/* <Row gutter={[15, 0]}>
                 <Col md={{span: 6}} xs={{span: 24}} lg={{span: 5}}> */}
                      <Form.Item className='mx-2'>
                        <Button className='orangeFactory' type='primary' htmlType='submit' loading={savingPeriod} disabled={defaultValue?.renewal_status}>
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
        
            </Form>
          </Col>
        </Row>
      </Card>
    </>
  );
}

export default ApproveForm;
