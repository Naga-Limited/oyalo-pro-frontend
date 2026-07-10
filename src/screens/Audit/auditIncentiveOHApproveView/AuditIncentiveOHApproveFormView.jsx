/* eslint-disable no-unused-labels */
import React, { useEffect, useState } from "react";
import { Input, Card, Button, Col, Row, Form, Collapse,Image,Tooltip } from "antd";
import {useDispatch, useSelector} from 'react-redux';
import { Colors } from '../../App/common/Images';
import { useNavigate, useLocation } from "react-router";
import apis from "../../../api/entryApis";
import {getAuditEntryDetails} from '../../../@app/entry/entrySlice';
import { DoubleRightOutlined } from "@ant-design/icons";
import { Tabs,Select } from 'antd';
import messageToast from "../../../components/messageToast/messageToast";
import { FaFilePdf } from 'react-icons/fa';
import { useForm } from "react-hook-form";


const { TabPane } = Tabs;
function AuditIncentiveOHApproveFormView() {
  const navigate = useNavigate();
  const { state } = useLocation(); 
  const {
    state: {data: defaultValue = {}}
  } = useLocation();
 
  const dispatch = useDispatch();
  const {type, userData} = useSelector((state) => state.auth);
  const [showDialog, setShowDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const { handleSubmit } = useForm();
  const empId = userData.data?.id;
  const entryID= state?.entryID;
  useEffect(() => {
    if (type === 1) 
    dispatch(getAuditEntryDetails({path: 'get-incentive-audit-entry-details', data: {limit: 400, offset: 0,entryID:entryID}}));
    else 
    dispatch(getAuditEntryDetails({path: 'get-incentive-audit-entry-details', data: {limit: 400, offset: 0,employee: empId,entryID:entryID}}));
  }, []);


  const [formData, setFormData] = useState({
    entryID:state?.entryID,
    outlet_name: state?.outlet,
    zone_name:state?.zone_name,
    department: [],
    category: []
  });

 
  const { Panel } = Collapse;
  const {
    savingAuditNewEntry
  } = useSelector((state) => {
    return state.master;
  });

  const handleCategoryChange = (i, e) => {
    const { name, value } = e.target;
    let data = formData.category;
    data[i][name] = value;
    setFormData((fd) => ({ ...fd, category: data }));
  };

  const handleSubCategoryChange = (i, j, e) => {
    const { name, value } = e.target;
    let data = formData.category;
    data[i].subcategory[j][name] = value;
    setFormData((fd) => ({ ...fd, category: data }));
  };

  const handleClickBack = () => {
    navigate("/auditIncentiveOHApproveView",
    {
      state: {docID:state?.incentive_process_id,
              DocumentNo: state?.payment_document_no}     
    }
    );
  };
  const [value,setValue] = useState('');
  const onSelect = (e) => {
    let value = e;
    setValue(e);
    setShowDialog(true);
        return value;
     };

  const [valuenew,setValuenew] = useState('');
  const ontype=(e)=>
  {
    setValuenew(e.target.value);
    setShowDialog(true);
    return valuenew;
  }
  const onSubmit = () => {
    let submitted = {
      // id:state?.id,
      outlet_id:state?.outlet_id,
      audit_date:state?.audit_date,
      status_remarks:valuenew,
      status_change:value,
      reject_hold_by: userData.data?.id ?? '0',
      audit_entry_id:state?.audit_entry_table_id,
      incentive_detail_id:state?.id,
      incentive_process_id:state?.incentive_process_id,
  };
    setLoading(true);
     apis.rejectOutletIncentive(submitted).then((res) => {
      if (res.data.status === 200) {
        setTimeout(() => {
          messageToast({
            message: res.data.statusText,
            statusText: res.data.statusText,
            title: "Incentive OH Reject Status"
          });
          navigate("/auditIncentiveOH");
          setLoading(false);
        }, 2000);
      } else if (res.data.status === 300) {
         setLoading(false);
      }
      else {
        setLoading(false);
      }
    });
};

  useEffect(() => {
    const categories = [];
    const uniqueCategories = [];
    let currentIndex = -1;
    const department = [];
    const uniqueDepartments = [];
   
    (state?.category || []).forEach((d) => {
      if (!uniqueCategories.includes(d?.category_name)) {
        uniqueCategories.push(d?.category_name);
        categories.push({ ...d, subcategories: [] });
          currentIndex++;
      } else {
        if (d?.auditpoint_id) {
          categories[currentIndex]?.subcategories?.forEach((s) => {
            if (d?.name === s?.name) s?.auditpoint?.push(d);
          });
        } else categories[currentIndex]?.subcategories?.push({ ...d, auditpoint: [] });
      }
    });
    
    (state?.department || []).forEach((d) => {
      if (!uniqueDepartments.includes(d?.category_name)) {
        uniqueDepartments.push(d?.category_name);

        department.push({ ...d, subcategories: [] });

        currentIndex++;
      } else {
        if (d?.auditpoint_id) {
          department[currentIndex]?.subcategories?.forEach((s) => {
            if (d?.name === s?.name) s?.auditpoint?.push(d);
          });
        } else department[currentIndex]?.subcategories?.push({ ...d, auditpoint: [] });
      }
    });

    setFormData({ category: categories ,department:department});
  }, [state?.data]);

  return (
    <>
       <Card showModel={showDialog}>
      
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
                    <span style={{ color: Colors.text_color, paddingBottom: 0 }}>{state?.outlet}</span>
                  </Form.Item>
                </Col>
                           
                <Col md={{ span: 3 }} xs={{ span: 24 }}>
                  <Form.Item name='orl_name' label='ORL Name'>
                    <span style={{ color: Colors.text_color, paddingBottom: 0 }}>{state?.outlet_ORL}</span>
                  </Form.Item>
                </Col>
                <Col md={{ span: 3 }} xs={{ span: 24 }}>
                  <Form.Item
                    name='amount'
                    label='Incentive Amount'>
                    <span style={{ color: Colors.text_color, paddingBottom: 0 }}>{state?.incentive_amount}</span>
                  </Form.Item>
                </Col>
                <Col md={{ span: 3 }} xs={{ span: 24 }}>
                  <Form.Item name='agent_name' label='Agent Name - Duration'>
                    <span style={{ color: Colors.text_color, paddingBottom: 0 }}>{state?.entry_by} - {state?.spent_time}</span>
                  </Form.Item>
                </Col>

                <Col md={{ span: 3 }} xs={{ span: 24 }}>
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
                <Col md={{ span: 2 }} xs={{ span: 24 }}>
                  <Form.Item name='Total Marks' label='Total Marks'>
                    <span style={{ color: Colors.text_color, paddingBottom: 0 }}>{state?.total_marks}/{state?.fullmarks}</span>
                  </Form.Item>
                </Col>
                <Col md={{ span: 2 }} xs={{ span: 24 }}>
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
                <Col md={{span: 4}} xs={{span: 24}}>
                  <Form.Item name='status_change' label='Status Change' rules={[{required: true, message: 'Select Status Change'}]}>
                  <Select name='status_change' placeholder='Select Status'
                   onSelect={onSelect}
                  >
                      <option name='Remove' value='9' defaultValue={defaultValue?.status_change}>Remove</option>
                      {/* <option name='Hold' value='3' defaultValue={defaultValue?.status_change}>Hold</option> */}
                  </Select>
                  </Form.Item>
                </Col>         
                <Col md={{span: 5}} xs={{span: 24}}>
                 <Form.Item name='status_remarks' label='Status Remarks' rules={[{required: true, message: 'Enter Remarks'}]}>
                    <Input name='status_remarks' placeholder='Enter Remarks' 
                    onChange={ontype}
                    />
                 </Form.Item>
                </Col>            
             
                <Col md={{span: 5}} xs={{span: 24}}>
                <Form.Item  style={{ paddingTop:'35px' }}>
           
                  <Button
                    // showModel={showDialog}
                    // disabled={savingAuditNewEntry}
                   onClick={handleSubmit(onSubmit)}
                   loading={loading}
                    style={{ backgroundColor: "#34b1aa", color: "white" }}
                    type="info"
                    htmlType="button"
                  >
                    Submit
                  </Button>
                </Form.Item>
                </Col>
              </Row>
              <Tabs centered
                  type='card'
                  defaultActiveKey="1" 
                  //onChange={callback}
                  >
    <TabPane tab="Outlet" key="1">
              <Col span={23}>
                {formData.category !== 0
                  ? formData.category
                    .filter(
                      (li) =>
                        li?.subcategory !== undefined &&
                        li?.subcategory.length > 0
                    )
                    .map((cat, i) => {
                      return (
                        <Collapse
                          // accordion
                          key={i}
                          // className='d-flex justify-content-start align-items-center '
                       //   defaultActiveKey={['1','2','3','4','5','6','7','8','9']}
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
                          // accordion
                          // defaultActiveKey={['1','2','3','4','5','6','7','8','9']}
                            header={
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "space-between"
                                }}
                              >
                                <label style={{ color: "#FFFFFF" }}>
                                  {cat.category_name}
                                </label>
                                <input
                                  type={"text"}
                                  min="0"
                                  max="99"
                                  className="category-Input px-2"
                                  readOnly
                                  style={{
                                    justifyContent: "space-between",
                                    width: "50px",
                                    height: "50%"
                                  }}
                                  value={cat.category_mark +'/'+cat.auditpoint_mark}
                                  onChange={(e) => handleCategoryChange(i, e)}
                                  // name='category_mark'
                                  placeholder=""
                                //disabled={editMode}
                                />
                              </div>
                            }
                            key="1"
                          >
                            <Collapse
                             // accordion
                              defaultActiveKey={i}
                              key={i}
                              style={{  background: "#F5A60B"}}
                              expandIcon={({ isActive }) => (
                                <DoubleRightOutlined
                                  rotate={isActive ? 90 : 0}
                                />
                              )}
                            >
                              {cat?.subcategory !== undefined
                                ? cat.subcategory.map((sub, j) => {
                                  if (
                                    sub.auditpoint !== undefined &&
                                    sub.auditpoint.length > 0
                                  ) {
                                    return (
                                      <Panel
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
                                              <Input
                                                readOnly
                                                className="mx-3"
                                                type="number"
                                                min={"0"}
                                                max={"99"}
                                                style={{
                                                  width: "50px",
                                                  height: "50%"
                                                }}
                                                placeholder=""
                                                name="subcategory_mark"
                                                value={sub.subcategory_mark}
                                                onChange={(e) =>
                                                  handleSubCategoryChange(
                                                    i,
                                                    j,
                                                    e
                                                  )
                                                }
                                              />
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
                                                         style = {{fontWeight:'bold'}}
                                                        >
                                                          {ap.name}
                                                        </span>
                                                        <Row>
                                                        <Col
                                                            md={{ span: 2 }}
                                                            xs={{ span: 16 }}
                                                           
                                                          >
                                                            <span className=" mx-2 my-2">
                                                              Eligible Score
                                                            </span>
                                                            <Input
                                                              readOnly
                                                              className="mx-1 my-1"
                                                              type="number"
                                                              style={{width:'50px',height:'35px',background:'#34b1aa',color: "#ffffff" }}
                                                              key={k}
                                                              name="auditpoint_mark"
                                                              value={
                                                                ap.auditpoint_mark
                                                              }
                                                              placeholder=""                                                             
                                                            />
                                                          </Col>
                                                          <Col
                                                            md={{ span: 1 }}
                                                            xs={{ span: 1 }}
                                                          >
                                                            </Col>
                                                          <Col
                                                            md={{ span: 2 }}
                                                            xs={{ span: 16 }}
                                                          >
                                                            <span className=" mx-2 my-2">
                                                              Actual Score
                                                            </span>
                                                            <Input name="score" key={k}
                                                              value={ap.score}
                                                              className="mx-1 my-1"
                                                              readOnly
                                                              style={{width:'50px',height:'35px',background:'#F5A60B',color: "#000000" }}
                                                            />
                                                            </Col>
                                                            <Col
                                                            md={{ span: 1 }}
                                                            xs={{ span: 1 }}
                                                          >
                                                            </Col>
                                                          <Col
                                                            md={{ span: 2 }}
                                                            xs={{ span: 16 }}
                                                          >
                                                            <span className="mx-2 my-2">
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
                                                          >
                                                            </Col>                                                   
                                                          <Col
                                                            md={{ span: 3 }}
                                                            xs={{ span: 16 }}
                                                          >
                                                            <span className=" mx-2 my-2">
                                                              Remarks
                                                            </span>
                                                            <Tooltip disabled placement="topLeft" title={ap.remarks}> <span className='mx-2'><Input
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
              </TabPane> 
              <TabPane tab="Department" key="2">
            
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
                        // defaultActiveKey={['1','2','3','4','5','6','7','8','9']}
                        //   accordion
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
                          //  defaultActiveKey={['1','2','3','4','5','6','7','8','9']}
                          //  accordion
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
                            //  accordion
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
                                                        <Col md={{ span: 3 }} xs={{ span: 16 }} >
                                                            <span className=" mx-2 my-2"> Eligible </span>
                                                            <Input name="criteria" key={k}
                                                           defaultValue={ap.criteria.toUpperCase()}
                                                           style={{width:'60px',height:'35px',background:'#F5A60B',color: "#000000" }}
                                                           disabled
                                                            />                              

                                                          </Col>
                                                        <Col md={{ span: 1 }} xs={{ span: 1 }}></Col>
                                                          <Col md={{ span: 3 }} xs={{ span: 16 }}>
                                                          <span
                                                          key={k}
                                                          className="mx-1"
                                                        >
                                                          Image
                                                        </span>
                                                          {ap.file_name != null ?
                                                          <Image
                                                          style = {{width:'60px',height:'40px',padding:'2px',borderRadius: "10px"}}
                                                          src={ap.file_name} alt='No image' />
                                                           : null
                                                            }
                  
                                                          </Col>                                                      
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
              </TabPane>
            </Tabs>
              <div
                className="d-flex justify-content-end align-items-center "
                style={{ width: "96%",padding:'15px' }}>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button
                    disabled={savingAuditNewEntry}
                    onClick={handleClickBack}
                    style={{ backgroundColor: "#f5a60b", color: "white" }}
                    type="info"
                    htmlType="button"
                  >
                    Back
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </Col>
        </Row>
      </Card>
    </>
  );
}

export default AuditIncentiveOHApproveFormView;