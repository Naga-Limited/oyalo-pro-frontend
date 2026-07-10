/* eslint-disable no-unused-labels */
import React, { useEffect, useState } from "react";
import { Input, Card, Button, Col, Row, Form, Collapse,Image,Tooltip,Modal,Radio } from "antd";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import ConfirmOnExit from "../../../components/confirmOnExit/ConfirmOnExit";
import { DoubleRightOutlined } from "@ant-design/icons";
import { Colors,Colorsbold } from '../../App/common/Images';
import messageToast from '../../../components/messageToast/messageToast';
import entryApis from '../../../api/entryApis';
import {useForm} from 'react-hook-form';
import apis from "../../../api/entryApis";
import {
  FaFilePdf,
} from 'react-icons/fa';
const {TextArea} = Input;
function AuditIncentiveBHFormView() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [showDialog, setShowDialog] = useState(false);
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const [recheckModal, setRecheckModal] = useState({});

  const [formData, setFormData] = useState({
    outlet_name: state?.outletData,
    department: [],
       });
  
  const { Panel } = Collapse;
  const {
    savingAuditNewEntry
  } = useSelector((state) => {
    return state.master;
  });

  const handleCriteriaChange = (i, j, k, e) => {
    const { name, value } = e.target;
    let data = formData.department;
    data[i].subcategory[j].auditpoint[k][name] = value;
    setFormData((fd) => ({ ...fd, department: data }));
  };



  const handleClickBack = () => {
    navigate("/auditDepApproval");
  };


  useEffect(() => {
    let currentIndex = -1;
    const department = [];
    const uniqueDepartments = [];     
    (state?.department || []).forEach((d) => {
      if (!uniqueDepartments.includes(d?.category_name)) {
        uniqueDepartments.push(d?.category_name);
        department.push({ ...d});
        currentIndex++;
      } else {
        if (d?.auditpoint_id) {
          department[currentIndex]?.subcategories?.forEach((s) => {
            if (d?.name === s?.name) s?.auditpoint?.push(d);
          });
        } else department[currentIndex]?.subcategories?.push({ ...d, auditpoint: [] });
      }
    });
    setFormData({ department:department});
  }, [state?.data]);

  const handleRecheck = () => {
    setLoading(true);
    entryApis.addAuditDepRecheckSubmit(
      {
        ...formData,
        auditentry_id: (state?.audit_id ?? '').toString(),
        id:state?.id,
        status: state?.capa_status,
        recheck_msg: recheckModal?.data
        }).then((data) => {
      const {
        data: {status}
      } = data;
       messageToast({message: 'Audit Department Recheck Raised', status, title: 'Recheck'});
      navigate('/auditDepApproval');
    });
  };

  const userData1 = useSelector((state) => state.auth);

  const onFinish = () => {
    // let outlet_id = data.outlet_id;
    setShowDialog(false);
    setApiError("");
    let submitted = {
      ...formData,
      id:state?.id,
      audit_id:state?.audit_id,
      outlet_name:state?.outlet_name,
      approval_id: userData1.userData.data?.id ?? '0',
      outlet_id:state?.outlet_id,
      audit_date:state?.audit_date,
       total_mark: state?.total_mark,
       capa_status:state?.capa_status
    };
    setLoading(true);
    apis.addAuditDepApproveSubmit(submitted).then((res) => {
      if (res.data.status === 200) {
        setTimeout(() => {
          messageToast({ message: res.data.statusText, statusText: res.data.statusText, title: 'Department' });
        navigate("/auditDepApproval");
      },2000)
      } else if (res.data.status === 300) {
          messageToast({ message: res.data.statusText, statusText: res.data.statusText, title: 'Audit' });
        setLoading(false);
      }
      else {
        setApiError(res?.data?.message ?? "Something went wrong");
        setLoading(false);
      }
    });
  };

  const {
    handleSubmit,
 } = useForm();

  return (
    <>
      <Card>
      <ConfirmOnExit showModel={showDialog} />
        <Row style={{ justifyContent: "center" }}>
          <Col span={24}>
            <Form
              name="basic"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              initialValues={{ remember: true }}
              autoComplete="off"
            >
              <Row gutter={[15, 0]}>
                <Col md={{ span: 4 }} xs={{ span: 24 }}>
                  <Form.Item name='outlet_name' label='Outlet Name'>
                    <span style={{ color: Colors.text_color, paddingBottom: 0 }}>{state?.outlet_name}</span>
                  </Form.Item>
                </Col>
                <Col md={{ span: 2 }} xs={{ span: 24 }}>
                  <Form.Item name='zone' label='Zone'>
                    <span style={{ color: Colors.text_color, paddingBottom: 0 }}>{state?.zone_name}</span>
                  </Form.Item>
                </Col>
                <Col md={{ span: 2 }} xs={{ span: 24 }}>
                  <Form.Item
                    name='subzone'
                    label='Sub Zone'>
                    <span style={{ color: Colors.text_color, paddingBottom: 0 }}>{state?.subzone_name}</span>
                  </Form.Item>
                </Col>
                <Col md={{ span: 3 }} xs={{ span: 24 }}>
                  <Form.Item name='orl_name' label='ORL Name'>
                    <span style={{ color: Colors.text_color, paddingBottom: 0 }}>{state?.outlet_ORL}</span>
                  </Form.Item>
                </Col>
                <Col md={{ span: 3 }} xs={{ span: 24 }}>
                  <Form.Item name='agent_name' label='Agent Name'>
                    <span style={{ color: Colors.text_color, paddingBottom: 0 }}>{state?.entry_by} - {state?.spent_time}</span>
                  </Form.Item>
                </Col>

                <Col md={{ span: 2 }} xs={{ span: 24 }}>
                  <Form.Item name='audit_agent_image' label='Agent Image'>
                  {state?.audit_agent_image != null ?
                    <Image
                       className="mx-1 my-1"
                       style = {{width:'60px',height:'55px',padding:'2px',borderRadius: "50%"}}
                       src={state?.audit_agent_image} alt='No image' />
                      : null
                  }
                 </Form.Item>
                </Col>
                <Col md={{ span: 3 }} xs={{ span: 24 }}>
                  <Form.Item name='audit_date' label='Audit Date'>
                    <span style={{ color: Colors.text_color, paddingBottom: 0 }}>{state?.audit_date}</span>
                  </Form.Item>
                </Col>

                 <Col md={{ span: 3 }} xs={{ span: 24 }}>
                  <Form.Item name='training' label='Training Document'>
                  {state?.training_document != null ?
                    <a href={state?.training_document} target="_blank"  rel="noopener noreferrer"><FaFilePdf size={27}/></a>
                    : null
                  }
                 </Form.Item>
                </Col>
              </Row>
                       
              <Col span={23}>
                {formData.department !== 0
                  ? formData.department
                    .filter(
                      (li) =>
                        li?.subcategory !== undefined &&
                        li?.subcategory.length > 0
                    )
                    .map((dep, i) => {
                      return (
                        <Collapse
                        defaultActiveKey={['1','2','3','4','5','6','7','8','9']}
                          accordion
                          key={i}
                          // className='d-flex justify-content-start align-items-center '
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            background: "#73716d"
                          }}
                          expandIcon={({ isActive }) => (
                            <DoubleRightOutlined
                              style={{ color: "#FFFFFF" }}
                              rotate={isActive ? 90 : 0}
                            />
                          )}
                        >
                          <Panel
                           defaultActiveKey={['1','2','3','4','5','6','7','8','9']}
                           accordion
                            header={
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "space-between"
                                }}
                              >
                                <label style={{ color: "#FFFFFF" }}>
                                  {dep.category_name}
                                </label>
                              
                              </div>
                            }
                            key="1"
                          >
                            <Collapse
                            defaultActiveKey={i}
                              accordion
                              key={i}
                              style={{  background: "#F5A60B"}}
                              expandIcon={({ isActive }) => (
                                <DoubleRightOutlined
                                  rotate={isActive ? 90 : 0}
                                />
                              )}
                            >
                              {dep?.subcategory !== undefined
                                ? dep.subcategory.map((sub, j) => {
                                  if (
                                    sub.auditpoint !== undefined &&
                                    sub.auditpoint.length > 0
                                  ) {
                                    return (
                                      <Panel
                                      defaultActiveKey={i}
                                        key={j}
                                        header={
                                          <div
                                            style={{
                                              display: "flex",
                                              flexDirection: "row",
                                              justifyContent:
                                                "space-between"
                                            }}
                                          >
                                            <span>{sub.name}</span>
                                            <Form.Item
                                              style={{ height: "2px" }}
                                              name="sub_name"
                                              rules={[
                                                {
                                                  required: false,
                                                  message:
                                                    "Please select sub category"
                                                }
                                              ]}
                                            >
                                              <span
                                                style={{ display: "none" }}
                                              >
                                                {sub.name}
                                              </span>
                                            
                                            </Form.Item>
                                          </div>
                                        }
                                      >
                                        <Row gutter={[15, 0]}>
                                          <Col
                                            md={{ span: 44 }}
                                            xs={{ span: 45 }}
                                          >
                                            <Form.Item
                                              rules={[
                                                {
                                                  required: false,
                                                  message:
                                                    "Please select points"
                                                }
                                              ]}
                                            >
                                              <div>
                                                {sub.auditpoint.map(
                                                  (ap, k) => {
                                                    return (
                                                      <div
                                                        key={k}
                                                        className="row p-2 m-2 border align-self-stretch"
                                                      >
                                                        <span
                                                          key={k}
                                                          style={{ fontWeight:'bold' }}
                                                        >
                                                      {ap.name}
                                                        </span>
                                                        <Row>
                                                        <Col md={{ span: 2 }} xs={{ span: 16 }} >
                                                            <span className=" mx-2 my-2"> Eligible </span>
                                                            <Input name="criteria" key={k}
                                                           defaultValue={ap.criteria.toUpperCase()}
                                                           style={{width:'60px',height:'35px',background:'#F5A60B',color: "#000000" }}
                                                           disabled
                                                            />                              

                                                          </Col>
                                                       
                                                          <Col md={{ span: 1 }} xs={{ span: 16 }}>
                                                          <span
                                                          key={k}
                                                          className="mx-1"
                                                        >
                                                          Image
                                                        </span>
                                                          {ap.file_name != null ?
                                                          <Image
                                                          className="mx-1 my-1"
                                                          style = {{width:'60px',height:'45px',padding:'2px',borderRadius: "10px"}}
                                                          src={ap.file_name} alt='No image' />
                                                           : null
                                                            }
                  
                                                          </Col>    
                                                          <Col
                                                            md={{ span: 1 }}
                                                            xs={{ span: 1 }}
                                                          ></Col>                                                  
                                                          <Col
                                                            md={{ span: 3 }}
                                                            xs={{ span: 16 }}
                                                          >
                                                            <span className=" mx-2 my-2">
                                                              Remarks
                                                            </span>
                                                             <Tooltip disabled placement="topLeft" title={ap.remarks}> 
                                                           <span className='mx-2'><Input
                                                              // disabled={editMode}
                                                              className="mx-1 my-1"
                                                              type="text"
                                                              style={{
                                                                width:
                                                                  "100px"
                                                              }}
                                                              key={k}
                                                              name="remarks"
                                                              value={ap.remarks}
                                                              readOnly
                                                            /> </span></Tooltip>
                                                           
                                                          </Col>
                                                          {ap.criteria == 'no' ? (
                                                            <>
                                                            {/* <p>{ap.file_name}</p> */}
                                                          {/* <Row> */}
                                                        
                                                           <Col md={{ span: 2 }}
                                                            xs={{ span: 16 }}
                                                           >
                                                            <span className="mx-1 my-1">CAPA Image </span>                                                          
                                                            {ap.capa_file_name != null ?
                                                          <Image
                                                          className="mx-1 my-1"
                                                          style = {{width:'60px',height:'45px',padding:'2px',borderRadius: "10px"}}
                                                          src={ap.capa_file_name} alt='No image' />
                                                              : null
                                                            }                                                            
                                                          </Col>
                                                          <Col
                                                             md={{ span: 4 }}
                                                             xs={{ span: 16 }}
                                                             style={{
                                                               border:
                                                                 "2px",padding:'4px'
                                                             }}
                                                          >
                                                            <span className=" mx-1 my-1">
                                                              CAPA Remarks
                                                            </span>
                                                            <Tooltip disabled placement="topLeft" title={ap.capa_remarks}> 
                                                            <span className='mx-2'> <Input
                                                              // disabled={editMode}
                                                              className="mx-1 my-1"
                                                              type="text"
                                                              style={{
                                                                width:
                                                                  "100px"
                                                              }}
                                                              key={k}
                                                              name="capa_remarks"
                                                              value={ap.capa_remarks}
                                                              placeholder=""
                                                              readOnly
                                                            /> </span></Tooltip>                                                           
                                                          </Col>
                                                          <Col
                                                            md={{ span: 3 }}
                                                            xs={{ span: 16 }}
                                                           style={{
                                                            color: Colorsbold.text_color, paddingBottom: 0, 
                                                            border:
                                                              "2px",padding:'1px'
                                                          }}
                                                          >
                                                            <span className="mx-1 my-1">Update Criteria</span> 
                                                            <Radio.Group
                                                                      name="updated_criteria"
                                                                      key={k}
                                                                      onChange={(
                                                                        e
                                                                      ) =>
                                                                        handleCriteriaChange(
                                                                          i,
                                                                          j,
                                                                          k,
                                                                          e
                                                                        )
                                                                      }
                                                                    >
                                                                      <Radio value="yes">
                                                                        Yes
                                                                      </Radio>
                                                                      <Radio value="no">
                                                                        No
                                                                      </Radio>
                                                                    </Radio.Group> 
                                                          
                                                          </Col>
                                                          {/* </Row> */}
                                                          </>
                                                          ):('No CAPA')
                                                            }
                                                        </Row>                                                       
                                                      </div>
                                                    );
                                                    // return <Input key={k} name='name' value={ap.name} placeholder='Points' />;
                                                  }
                                                )}
                                              </div>
                                            </Form.Item>
                                          </Col>

                                        </Row>
                                      </Panel>
                                    );
                                  } else {
                                    return null;
                                  }
                                })
                                : null}
                            </Collapse>
                          </Panel>
                        </Collapse>
                      );
                    })
                  : "No Data"}
              </Col>
              <div
                className="d-flex justify-content-end align-items-center "
                style={{ width: "70px",padding:'12px' }}>
                <Form.Item wrapperCol={{ offset: 1, span: 16 }}>
                <Button
                    onClick={handleClickBack}
                    style={{ backgroundColor: "#f5a60b", color: "white",marginRight:'6px' }}
                    type="info"
                    htmlType="button"
                  >
                    Back
                  </Button>
                  </Form.Item>
                  
                  </div>
                  <div
                className="d-flex justify-content-end align-items-center "
                style={{ width: "100%",padding:'4px' }}>
                  <Form.Item>    
                  <Button 
                    disabled={savingAuditNewEntry}
                    onClick={
                      handleSubmit(onFinish)
                     }
                      loading={loading}
                    style={{ backgroundColor: "#34b1aa", color: "white",marginRight:'6px' }}
                    type="info"
                    htmlType="button"
                  >
                    Approve
                  </Button>
                  </Form.Item><Form.Item>
                  <Button
                    disabled={savingAuditNewEntry}
                    onClick={() => setRecheckModal({...recheckModal, show: true})} 
                    style={{ backgroundColor: Colors.text_color, color: "white" }}
                    type="info"
                    htmlType="button"
                  >
                    Re-Check
                  </Button>
                  </Form.Item>                               
               </div>                  
            </Form>
          </Col>
        </Row>
        <Row gutter={[15, 15]} style={{ justifyContent: 'çenter' }}>
          <Col span={12} style={{ textAlign: 'right' }}>
            {typeof apiError === 'object' ? (
              Object?.values(apiError)?.map((e) => (
                <div key={e?.[0]} className='text-danger'>
                  {e?.[0]}
                </div>
              ))
            ) : (
              <div className='text-danger'>{apiError}</div>
            )}
          </Col>
        </Row>
      </Card>
      {recheckModal?.show && (
        <Modal title='Re-Check' open={recheckModal?.show} onOk={handleRecheck} onCancel={() => setRecheckModal({...recheckModal, show: false})}>
          <h5>Add Remarks:</h5>
          <TextArea rows={4} style={{resize: 'none'}} value={recheckModal?.data || ''} onChange={(e) => setRecheckModal({...recheckModal, data: e.target.value})} />
        </Modal>
      )}
    </>
  );
}

export default AuditIncentiveBHFormView;