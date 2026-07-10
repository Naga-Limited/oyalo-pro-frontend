/* eslint-disable no-unused-labels */
import React, { useEffect, useState } from "react";
import { Input, Card, Button, Col, Row, Form, Collapse,
  Upload,Tooltip,Image } from "antd";
import { useSelector } from "react-redux";
import { Colors } from '../../App/common/Images';
import { useNavigate, useLocation } from "react-router";
import ConfirmOnExit from "../../../components/confirmOnExit/ConfirmOnExit";
import { DoubleRightOutlined } from "@ant-design/icons";
import { baseURL } from "../../../api/baseURL";
import { PlusOutlined } from "@ant-design/icons";
import {useForm} from 'react-hook-form';
import apis from "../../../api/masterApi";
import messageToast from '../../../components/messageToast/messageToast';
function AuditNewCAPAForm() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    outlet_name: state?.outletData,
    category: []
  });
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const { Panel } = Collapse;
  //const {marks} = state;
  //const [date, setDate] = useState('');
  const {
    savingAuditNewEntry
  } = useSelector((state) => {
    return state.master;
  });
  
 // const userData = useSelector((state) => state.auth);
    const handlePointChange = (i, j, k, e) => {
    const { name, value } = e.target;
    let data = formData.category;
    data[i].subcategory[j].auditpoint[k][name] = value;
    setFormData((fd) => ({ ...fd, category: data }));
  };
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
  const handleCriteriaChange = (i, j, k, e) => {
    const { name, value } = e.target;
    let data = formData.category;
    data[i].subcategory[j].auditpoint[k][name] = value;
    setFormData((fd) => ({ ...fd, category: data }));
  };
  const handleChange = (i, j, k, e) => {
    let data = formData.category;
    const display = e?.file?.response?.filename ?? "";
    data[i].subcategory[j].auditpoint[k]['capa_file_name'] = display;
   };
  const handleClickBack = () => {
    navigate("/auditNewCAPA");
  };

  const {
     handleSubmit,
  } = useForm();
  const uploadButtons = (
    <Button
      style={{ display: "flex", direction: "row" }}
      icon={<PlusOutlined style={{ marginTop: "3px", marginRight: "4px" }} />}
    >
      <div
        style={{
          marginLeft: "3px"
        }}
      >
        {form?.id ? "Update Image" : "Upload"}
      </div>
    </Button>
  );
  const props = {
    name: "capa_file_name",
    action: `${baseURL}capa-files-upload`,
    headers: {
      authorization: "authorization-text"
    }
  };  
  useEffect(() => {
    const categories = [];
    const uniqueCategories = [];
    let currentIndex = -1;
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
     setFormData({category: categories});
  }, [state?.data]);

  const onFinish = (data) => {
    // let outlet_id = data.outlet_id;
    setShowDialog(false);
    setApiError("");
    let submitted = {
      ...formData,
      outlet_id:data?.outlet_id,
      audit_date:data?.audit_date,
       total_mark: data?.actual_Score,
       capa_status: 1,
       department:data?.department,
       capa_remarks:data?.capa_remarks,
       capa_file_name:data?.capa_file_name,
      // created_by: userData.type,
  };
    setLoading(true);
    apis.addAuditNewCAPASubmit(submitted).then((res) => {
      if (res.data.status === 200) {
        setTimeout(() => {
          messageToast({ message: res.data.statusText, statusText: res.data.statusText, title: 'Audit CAPA Submitted' });
        navigate("/auditNewCAPA");
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
                <Col md={{ span: 4 }} xs={{ span: 24 }}>
                  <Form.Item name='zone' label='Zone'>
                    <span style={{ color: Colors.text_color, paddingBottom: 0 }}>{state?.zone_name}</span>
                  </Form.Item>
                </Col>
                <Col md={{ span: 4 }} xs={{ span: 24 }}>
                  <Form.Item
                    name='subzone'
                    label='Sub Zone'>
                    <span style={{ color: Colors.text_color, paddingBottom: 0 }}>{state?.subzone_name}</span>
                  </Form.Item>
                </Col>
                <Col md={{ span: 4 }} xs={{ span: 24 }}>
                  <Form.Item name='orl_name' label='ORL Name'>
                    <span style={{ color: Colors.text_color, paddingBottom: 0 }}>{state?.orl_name}</span>
                  </Form.Item>
                </Col>
                <Col md={{ span: 4 }} xs={{ span: 24 }}>
                  <Form.Item name='Total Marks' label='Total Marks'>
                    <span style={{ color: Colors.text_color, paddingBottom: 0 }}>{state?.total_mark}</span>
                  </Form.Item>
                </Col>
                <Col md={{ span: 4 }} xs={{ span: 24 }}>
                  <Form.Item name='audit_date' label='Audit Date'>
                    <span style={{ color: Colors.text_color, paddingBottom: 0 }}>{state?.audit_date}</span>
                  </Form.Item>
                </Col>
              </Row>
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
                                  type={"number"}
                                  min="0"
                                  max="99"
                                  className="category-Input px-2"
                                  disabled
                                  style={{
                                    justifyContent: "space-between",
                                    width: "50px",
                                    height: "50%"
                                    // width: '30%',
                                  }}
                                  value={cat.category_mark}
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
                              key={i}
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                background: "#F5A60B",
                              }}
                              expandIcon={({ isActive }) => (
                                <DoubleRightOutlined
                                  rotate={isActive ? 90 : 0}
                                  style={{ color: "#FFFFFF" }}
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
                                            <span style={{ color: "#FFFFFF" }}>{sub.name}</span>
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
                                                disabled
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
                                                        className="p-2 border align-self-start"
                                                      >
                                                        <span
                                                          key={k}
                                                          className="mx-1"
                                                        >
                                                          {ap.name}
                                                        </span>
                                                        <Row>
                                                          <Col
                                                            md={{ span: 3 }}
                                                            xs={{ span: 12 }}
                                                          >
                                                            <span className=" mx-1 my-1">
                                                              Eligible Score
                                                            </span>
                                                            <Input
                                                              disabled
                                                              className="mx-1 my-1"
                                                              type="number"
                                                              min={"0"}
                                                              max="99"
                                                              style={{
                                                                width:
                                                                  "60px"
                                                              }}
                                                              key={k}
                                                              onChange={(
                                                                e
                                                              ) =>
                                                                handlePointChange(
                                                                  i,
                                                                  j,
                                                                  k,
                                                                  e
                                                                )
                                                              }
                                                              name="auditpoint_mark"
                                                              value={
                                                                ap.auditpoint_mark
                                                              }
                                                              placeholder=""
                                                            />
                                                          </Col>
                                                          <Col
                                                            md={{ span: 3 }}
                                                            xs={{ span: 12 }}
                                                          >
                                                            <span className=" mx-1 my-1">
                                                              Actual Score
                                                            </span>
                                                            <Input name="score" key={k}
                                                              className="mx-1 my-1"
                                                              value={ap.score}
                                                              disabled
                                                              style={{
                                                                width:
                                                                  "60px"
                                                              }}
                                                            />
                                                            </Col>                                                       
                                                          <Col
                                                            md={{ span: 4 }}
                                                            xs={{ span: 16 }}
                                                          >
                                                            <span className=" mx-2 my-2">
                                                              Image
                                                            </span>

                                                            {ap.file_name != null ?
                                                            <Image
                                                            style = {{width:'100%',height:'80px',padding:'4px'}}
                                                            src={ap.file_name} alt='No image' />
                                                              // <img
                                                              //   alt='example'
                                                              //   style = {{width:'50%',height:'80px',padding:'4px'}}
                                                              //   src={ap.file_name}
                                                              // />
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
                                                            {/* <Input
                                                              // disabled={editMode}
                                                              className="mx-1 my-1"
                                                              type="text"
                                                              style={{
                                                                width:
                                                                  "100%"
                                                              }}
                                                              key={k}
                                                              
                                                              name="remarks"
                                                              value={ap.remarks}
                                                              disabled
                                                            /> */}
                                                            <Tooltip disabled placement="topLeft" title={ap.remarks}> <span className='mx-2'><Input
                                                              // disabled={editMode}
                                                              className="mx-1 my-1"
                                                              type="text"
                                                              style={{
                                                                width:
                                                                  "80%"
                                                              }}
                                                              key={k}
                                                              
                                                              name="remarks"
                                                              value={ap.remarks}
                                                              disabled
                                                            /> </span></Tooltip>
                                                          </Col>                                                        
                                                          <Col md={{ span: 2 }} xs={{ span: 6 }}>
                                                            <span className="mx-1 my-1">CAPA Image </span>
                                                            <Upload key={k}
                                                              {...props}
                                                              //  fileList={fileList}
                                                              maxCount={1}
                                                              name="capa_file_name"
                                                              listType="picture"
                                                            //  onPreview={handlePreview}
                                                              capture="environment"
                                                              accept=".jpeg,.png,.jpg,.jpeg.gif"
                                                              onChange={(e) => {
                                                                handleChange(
                                                                  i, j, k, e);
                                                              }}
                                                            >
                                                              {uploadButtons}
                                                            </Upload>
                                                            {/* <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                                                                <img
                                                                  alt='example'
                                                                  style={{
                                                                    width: '100%'
                                                                  }}
                                                                  src={previewImage}
                                                                />
                                                              </Modal> */}
                                                          </Col>
                                                          <Col
                                                            md={{ span: 5 }}
                                                            xs={{ span: 15 }}
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
                                                                  "50%"
                                                              }}
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
                                                              name="capa_remarks"
                                                              // value={ap.auditpoint_mark}
                                                              placeholder=""
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
             
              <div
                className="d-flex justify-content-end align-items-center "
                style={{ width: "96%",padding:'15px' }}
              >
                <Col span={24}>
                <Row gutter={[15,15]} style={{ justifyContent:'center'}}>
                  <Col span={12}>
                <Form.Item>
                  <Button
                    disabled={savingAuditNewEntry}
                    onClick={handleClickBack}
                    style={{ backgroundColor: "#f5a60b", color: "white" }}
                    type="info"
                    htmlType="button"
                  >
                    Back
                  </Button>
                </Form.Item></Col>
                <Col span={12} style={{ textAlign:'right'}}>
                <Form.Item wrapperCol={{ offset: 8, span: 16,padding:'15px' }}>
                  <Button
                    style={{ backgroundColor: "#34b1aa" }}
                    type="primary"
                   // onClick={handleSubmit(onFinish)}
                    onClick={
                     handleSubmit(onFinish)
                    }
                     loading={loading}
                  //disabled={!submitStatus}
                  >
                    {"Submit"}
                  </Button>
                </Form.Item>
                </Col>
                </Row>
                </Col>
              </div>
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
            </Form>
          </Col>
        </Row>

      </Card>
    </>
  );
}

export default AuditNewCAPAForm;