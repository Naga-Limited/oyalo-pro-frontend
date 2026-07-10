/* eslint-disable no-unused-labels */
import React, { useEffect, useState } from "react";
import {
  Input,
  Card,
  Button,
  Col,
  Row,
  Form,
  Collapse,
  Image,
  Tooltip,
  Upload,
  Modal,
  message
} from "antd";
import { useSelector } from "react-redux";
import { Colors } from "../../App/common/Images";
import { useNavigate, useLocation } from "react-router";
import ConfirmOnExit from "../../../components/confirmOnExit/ConfirmOnExit";
import { DoubleRightOutlined } from "@ant-design/icons";
import { baseURL } from "../../../api/baseURL";
import { PlusOutlined } from "@ant-design/icons";
import { useForm } from "react-hook-form";
import apis from "../../../api/entryApis";
import messageToast from "../../../components/messageToast/messageToast";
const { TextArea } = Input;
function AuditDepCapaFormView() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    outlet_name: state?.outletData,
    department: []
  });
  const [apiError, setApiError] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const { handleSubmit } = useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const { Panel } = Collapse;
  const { savingAuditNewEntry } = useSelector((state) => {
    return state.master;
  });
  const handleCriteriaChange = (i, j, k, e) => {
    const { name, value } = e.target;
    let data = formData.department;
    data[i].subcategory[j].auditpoint[k][name] = value;
    setFormData((fd) => ({ ...fd, department: data }));
  };
  const handleChange = (i, j, k, e) => {
    let data = formData.department;
    const display = e?.file?.response?.filename ?? "";
    data[i].subcategory[j].auditpoint[k]["capa_file_name"] = display;
  };
  const [recheckPopup, setRecheckPopup] = useState(false);
  const [recheckData, setRecheckData] = useState("");
    const userData1 = useSelector((state) => state.auth);
  const { type, userData } = useSelector((state) => state.auth);
  const empId = userData.data?.id;

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

  const handleClickBack = () => {
    navigate("/auditDepCapa");
  };

  useEffect(() => {
    let currentIndex = -1;
    const department = [];
    const uniqueDepartments = [];
    (state?.department || []).forEach((d) => {
      if (!uniqueDepartments.includes(d?.category_name)) {
        uniqueDepartments.push(d?.category_name);
        department.push({ ...d });
        currentIndex++;
      } else {
        if (d?.auditpoint_id) {
          department[currentIndex]?.subcategories?.forEach((s) => {
            if (d?.name === s?.name) s?.auditpoint?.push(d);
          });
        } else
          department[currentIndex]?.subcategories?.push({
            ...d,
            auditpoint: []
          });
      }
    });
    setFormData({ department: department });
  }, [state?.data]);



  const onFinish = () => {
    // let outlet_id = data.outlet_id;
    let image_validation = 0;
    let image_validation1 = 0;
    let catname = '';
    let pointname = '';
    let category_val = formData.department;
    //category_val.map((val,ind)=>{
    category_val.map((val)=>{
      let sub_category_val = val.subcategory

      sub_category_val.map((val1)=>{
        let audit_point_val = val1.auditpoint

          audit_point_val.map((val2)=>{
          if(val2.criteria == 'no' ){
            if(!val2.capa_file_name || val2.capa_file_name == ''){
              pointname = val2.name;
              catname=val.category_name;
              image_validation = 1;
            }
            if((!val2.capa_remarks || val2.capa_remarks == '')){
              pointname = val2.name;
              catname=val.category_name;
              image_validation1 = 1;
            }

          }
          })
      })
    })

    if(image_validation == 1){
      let pointerror =catname+' - '+pointname;
    messageApi.open({
    type: 'warning',
    content: 'CAPA Image Required  - '+pointerror,
    className: 'custom-class',
    style: {
      marginTop: '20vh',
      color:'#d91616',
      fontWeight:'bold'
    },
  });
     return false
   }
    if(image_validation1 == 1){
        let pointerror =catname+' - '+pointname;
        messageApi.open({
        type: 'warning',
        content: 'CAPA Remarks Required - '+pointerror,
        className: 'custom-class',
        style: {
            marginTop: '20vh',
            color:'#d91616',
            fontWeight:'bold'
        },
        });
        return false
    }
    setShowDialog(false);
    setApiError("");

    let submitted = {
      ...formData,
      id: state?.id,
      outlet_id: state?.outlet_id,
      audit_date: state?.audit_date,
      total_mark: state?.actual_Score,
      batch_status: state?.dep_capa_status,
      department: state?.department,
      capa_submitted_by: userData1.userData.data?.id ?? '0',
      // capa_remarks:state?.capa_remarks,
      // capa_file_name:state?.capa_file_name,
      // created_by: userData.type,
    };
    setLoading(true);
    apis.addAuditDepCAPASubmit(submitted).then((res) => {
      if (res.data.status === 200) {
        setTimeout(() => {
          messageToast({
            message: res.data.statusText,
            statusText: res.data.statusText,
            title: "Department"
          });
          navigate("/auditDepCapa");
        }, 2000);
      } else if (res.data.status === 300) {
        messageToast({
          message: res.data.statusText,
          statusText: res.data.statusText,
          title: "Audit"
        });
        setLoading(false);
      } else {
        setApiError(res?.data?.message ?? "Something went wrong");
        setLoading(false);
      }
    });
  };

  const handleRecheckpopup = (formData) => {
    setRecheckData(formData?.recheck_msg);
    setRecheckPopup(true);
};


  return (
    <>
      {contextHolder}
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
                  <Form.Item name="outlet_name" label="Outlet Name">
                    <span
                      style={{ color: Colors.text_color, paddingBottom: 0 }}
                    >
                      {state?.outlet_name}
                    </span>
                  </Form.Item>
                </Col>
                <Col md={{ span: 4 }} xs={{ span: 24 }}>
                  <Form.Item name="zone" label="Zone">
                    <span
                      style={{ color: Colors.text_color, paddingBottom: 0 }}
                    >
                      {state?.zone_name}
                    </span>
                  </Form.Item>
                </Col>
                <Col md={{ span: 4 }} xs={{ span: 24 }}>
                  <Form.Item name="subzone" label="Sub Zone">
                    <span
                      style={{ color: Colors.text_color, paddingBottom: 0 }}
                    >
                      {state?.subzone_name}
                    </span>
                  </Form.Item>
                </Col>
                <Col md={{ span: 3 }} xs={{ span: 24 }}>
                  <Form.Item name="orl_name" label="ORL Name">
                    <span
                      style={{ color: Colors.text_color, paddingBottom: 0 }}
                    >
                      {state?.orl_name}
                    </span>
                  </Form.Item>
                </Col>
                <Col md={{ span: 3 }} xs={{ span: 24 }}>
                  <Form.Item name="Total Marks" label="Total Marks">
                    <span
                      style={{ color: Colors.text_color, paddingBottom: 0 }}
                    >
                      {state?.total_mark}
                    </span>
                  </Form.Item>
                </Col>
                {state.recheck_msg ? (
                <Col
                  md={{ span: 3 }}
                  xs={{ span: 24 }}
                 >
                  <button type="button" onClick={() => {
                      handleRecheckpopup(state);
                    }}
                    className="btn btn-primary">
                    Remark
                  </button>
                </Col>
                ):[]
               }
                <Col md={{ span: 3 }} xs={{ span: 24 }}>
                  <Form.Item name="audit_date" label="Audit Date">
                    <span
                      style={{ color: Colors.text_color, paddingBottom: 0 }}
                    >
                      {state?.audit_date}
                    </span>
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
                                    {dep.category_name}
                                  </label>
                                  <Input
                                  type={"number"}
                                  min="0"
                                  max="99"
                                  className="category-Input px-2"
                                  readOnly
                                  style={{
                                    justifyContent: "space-between",
                                    width: "150px",
                                    height: "50%"
                                    }}
                                    prefix={'CAPA Count -'}
                                  value={dep.department_capa}
                                />
                                </div>
                              }
                              key="1"
                            >
                              <Collapse
                                defaultActiveKey={i}
                                accordion
                                key={i}
                                style={{ background: "#F5A60B" }}
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
                                                            {(type === 1 &&
                                                              ap.criteria ==
                                                                "no") ||
                                                            (type === 2 &&
                                                              ap.responsible_employee_id ==
                                                                empId &&
                                                              ap.criteria ==
                                                                "no") ? (
                                                              <>
                                                                <span
                                                                  key={k}
                                                                  style={{ fontWeight:'bold',color: "#f5110a" }}
                                                                >
                                                                  {ap.name}
                                                                </span>
                                                                <Row style={{ color: "#f5110a" }}>
                                                                <Col md={{ span: 2 }} xs={{ span: 16 }} >
                                                            <span className=" mx-2 my-2"> Eligible </span>
                                                            <Input name="criteria" key={k}
                                                           defaultValue={ap.criteria.toUpperCase()}
                                                           style={{width:'60px',height:'35px',color:'#000000' }}
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
                                                          <Col md={{ span: 1 }} xs={{ span: 1 }}></Col>
                                                                 <Col
                                                                    md={{
                                                                      span: 3
                                                                    }}
                                                                    xs={{
                                                                      span: 16
                                                                    }}
                                                                  >
                                                                     <span className="small text-danger"><b>*</b></span>
                                                                    <span className="mx-1 my-1">
                                                                      CAPA Image{" "}
                                                                    </span>
                                                                    <Upload
                                                                      key={k}
                                                                      {...props}
                                                                      // fileList={fileList}
                                                                      maxCount={
                                                                        1
                                                                      }
                                                                      name="capa_file_name"
                                                                      listType="picture"
                                                                      // onPreview={handlePreview}
                                                                      capture="environment"
                                                                      accept=".jpeg,.png,.jpg,.jpeg.gif"
                                                                      onChange={(
                                                                        e
                                                                      ) => {
                                                                        handleChange(
                                                                          i,
                                                                          j,
                                                                          k,
                                                                          e
                                                                        );
                                                                      }}
                                                                    >
                                                                      {
                                                                        uploadButtons
                                                                      }
                                                                    </Upload>
                                                                  </Col>
                                                                  <Col md={{ span: 1 }} xs={{ span: 1 }}></Col>
                                                                  <Col
                                                                    md={{
                                                                      span: 6
                                                                    }}
                                                                    xs={{
                                                                      span: 15
                                                                    }}
                                                                  >
                                                                     <span className="small text-danger"><b>*</b></span>
                                                                    <span className=" mx-1 my-1">
                                                                      CAPA
                                                                      Remarks
                                                                    </span>
                                                                    <Tooltip
                                                                      disabled
                                                                      placement="topLeft"
                                                                      title={
                                                                        ap.capa_remarks
                                                                      }
                                                                    >
                                                                      <span className="mx-2">
                                                                        {" "}
                                                                        <Input
                                                                          // disabled={editMode}
                                                                          className="mx-1 my-1"
                                                                          type="text"
                                                                          style={{
                                                                            width:
                                                                              "100%"
                                                                          }}
                                                                          key={
                                                                            k
                                                                          }
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
                                                                        />{" "}
                                                                      </span>
                                                                    </Tooltip>
                                                                  </Col>
                                                                </Row>
                                                              </>
                                                            ) :('No CAPA')}
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
                            {/* </>
                            ) :('')}
                            </div> */}
                          </Collapse>
                        );
                      })
                  : "No Data"}
              </Col>

              <div
                className="d-flex justify-content-end align-items-center "
                style={{ width: "96%", padding: "15px" }}
              >
                <Col span={24}>
                  <Row gutter={[15, 15]} style={{ justifyContent: "center" }}>
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
                      </Form.Item>
                    </Col>
                    <Col span={12} style={{ textAlign: "right" }}>
                      <Form.Item
                        wrapperCol={{ offset: 8, span: 16, padding: "15px" }}
                      >
                        <Button
                          style={{ backgroundColor: "#34b1aa" }}
                          type="primary"
                          onClick={handleSubmit(onFinish)}
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
              <Row gutter={[15, 15]} style={{ justifyContent: "çenter" }}>
                <Col span={12} style={{ textAlign: "right" }}>
                  {typeof apiError === "object" ? (
                    Object?.values(apiError)?.map((e) => (
                      <div key={e?.[0]} className="text-danger">
                        {e?.[0]}
                      </div>
                    ))
                  ) : (
                    <div className="text-danger">{apiError}</div>
                  )}
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Card>
      {recheckPopup && (
        <Modal
          title="Re-mark Note:"
          open={recheckPopup}
          onOk={false}
          footer={null}
          onCancel={() => setRecheckPopup(false)}>
          <h5></h5>
          <TextArea
            rows={4}
            style={{ resize: "none" }}
            value={recheckData}
          />
        </Modal>
      )}
    </>
  );
}

export default AuditDepCapaFormView;
