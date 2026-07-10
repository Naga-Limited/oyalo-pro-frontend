/* eslint-disable no-unused-labels */
import React, { useEffect, useState } from "react";
import { Input, Card, Button, Col, Row, Form, Collapse,Image,Tooltip } from "antd";
import { useSelector } from "react-redux";
import { Colors,Colorsbold } from '../../App/common/Images';
import { useNavigate, useLocation } from "react-router";
//import ConfirmOnExit from "../../../components/confirmOnExit/ConfirmOnExit";
import { DoubleRightOutlined } from "@ant-design/icons";
import { Tabs } from 'antd';
import {
  FaFilePdf,
} from 'react-icons/fa';
const { TabPane } = Tabs;
function EBReadingApprovalForm() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [formData, setFormData] = useState({
    outlet_name: state?.outletData,
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
    navigate("/auditNewReport");
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
      <Card>
        {/* <ConfirmOnExit /> */}
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
                <Col md={{ span: 2 }} xs={{ span: 24 }}>
                  <Form.Item name='Total Marks' label='Total Marks'>
                    <span style={{ color: Colors.text_color, paddingBottom: 0 }}>{state?.total_mark}/{state?.fullmarks}</span>
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
                    {/* <span style={{ color: Colors.text_color, paddingBottom: 0 }}>{state?.audit_date}</span> */}
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
                          accordion
                          key={i}
                          // className='d-flex justify-content-start align-items-center '
                          //defaultActiveKey={['1','2','3','4','5','6','7','8','9']}
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
                          accordion
                        //  defaultActiveKey={['1','2','3','4','5','6','7','8','9']}
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
                                    width: "70px",
                                    height: "50%"
                                    // width: '30%',
                                  }}
                                  value={cat.category_mark +' / '+cat.auditpoint_mark}
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
                              accordion
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
                                            md={{ span: 45 }}
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
                                                          {(ap.score <= ap.capa_mark) ? (
                                                            <>
                                                          <Col md={{ span: 2 }} xs={{ span: 16 }}>
                                                            <span className="mx-1 my-1">CAPA Image </span>
                                                            <Image
                                                            className="mx-1 my-1"
                                                            style = {{width:'60px',height:'45px',padding:'2px',borderRadius: "10px"}}
                                                             src={ap.capa_file_name} alt='No image' />
                                                         
                                                           </Col>
                                                           <Col
                                                            md={{ span: 1 }}
                                                            xs={{ span: 1 }}
                                                          ></Col>
                                                          <Col
                                                            md={{ span: 3 }}
                                                            xs={{ span: 15 }}
                                                          >
                                                            <span className=" mx-1 my-1">
                                                              CAPA Remarks
                                                            </span>
                                                           
                                                           <Tooltip disabled placement="topLeft" title={ap.capa_remarks}> 
                                                           <span className='mx-2'><Input
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
                                                              readOnly
                                                            /> </span></Tooltip>
                                                          </Col>
                                                          <Col
                                                            md={{ span: 2 }}
                                                            xs={{ span: 16 }}
                                                           style={{
                                                            color: Colorsbold.text_color, paddingBottom: 0, 
                                                          
                                                          }}
                                                          >
                                                            <span className="mx-1 my-1">Update Score</span> 
                                                            <Input
                                                              // disabled={editMode}
                                                              className="mx-1 my-1"
                                                              type="text"
                                                              style={{width:'50px',height:'35px',background:'#F5A60B',color: "#000000" }}
                                                              key={k}
                                                              name="updated_score"
                                                              value={ap.updated_score}
                                                              readOnly
                                                            />  
                                                         
                                                          </Col>
                                                          </>
                                                          ):(null)
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
                                                        <Col md={{ span: 1 }} xs={{ span: 1 }}></Col>
                                                          <Col md={{ span: 1 }} xs={{ span: 16 }}>
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
                                                          <Col md={{ span: 1 }} xs={{ span: 1 }}></Col>
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
                                                          
                                                           <Col md={{ span: 2 }} xs={{ span: 16 }}>
                                                            <span className="mx-1 my-1">CAPA Image </span>
                                                           
                                                            <Image
                                                             className="mx-1 my-1"
                                                             style = {{width:'60px',height:'45px',padding:'2px',borderRadius: "10px"}}
                                                             src={ap.capa_file_name} alt='No image' />
                                                         
                                                           </Col>
                                                           <Col
                                                            md={{ span: 1 }}
                                                            xs={{ span: 1 }}
                                                          >
                                                            </Col>
                                                            <Col
                                                              md={{ span: 3 }}
                                                              xs={{ span: 15 }}
                                                            >
                                                            <span className=" mx-1 my-1">
                                                              CAPA Remarks
                                                            </span>                                                           
                                                           <Tooltip disabled placement="topLeft" title={ap.capa_remarks}> 
                                                           <span className='mx-2'><Input
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
                                                              readOnly
                                                            /> </span></Tooltip>
                                                          </Col>
                                                          <Col
                                                            md={{ span: 1 }}
                                                            xs={{ span: 1 }}
                                                          >
                                                            </Col>
                                                            {(ap.updated_criteria) ?(<>
                                                              <Col
                                                            md={{ span: 3 }}
                                                            xs={{ span: 16 }}
                                                           style={{
                                                            color: Colorsbold.text_color, paddingBottom: 0, 
                                                          
                                                          }}
                                                          >                                                          
                                                            <span className="mx-1 my-1">Updated Eligibility</span> 
                                                            <span className='mx-2'><Input
                                                              // disabled={editMode}
                                                              className="mx-1 my-1"
                                                              type="text"
                                                              style={{width:'60px',height:'35px',background:'#F5A60B',color: "#000000" }}
                                                              key={k}
                                                              name="updated_criteria"
                                                              value={ap.updated_criteria.toUpperCase()}
                                                              disabled
                                                            />  </span>
                                                          </Col>
                                                            </>):('null')}
                                                         
                                                          </>
                                                          ):(null)
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

export default EBReadingApprovalForm;