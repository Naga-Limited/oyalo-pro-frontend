/* eslint-disable no-unused-labels */
import React, { useEffect, useState } from "react";
import { Input, Card, Button, Col, Row, Form, Select, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { eqBy, isEmpty, map, prop, unionWith } from 'ramda';
import { getOutletMasternotsubzone } from "../../../@app/master/masterSlice";
import messageToast from '../../../components/messageToast/messageToast';
import { useNavigate, useLocation } from "react-router";
import ConfirmOnExit from "../../../components/confirmOnExit/ConfirmOnExit";
import apis from "../../../api/masterApi";
import { baseURL } from "../../../api/baseURL";
import { PlusOutlined } from "@ant-design/icons";






const orl_name = 'thirukumaran';
const check = '100';















const { Option } = Select;
function AccountClosingForm({ mode }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [messageApi, contextHolder] = message.useMessage();

  const marks = state?.marks;
  const [type, setType] = useState(mode === "edit" ? state?.auditType : null);
  const [totalMark, setTotalMark] = useState(
    mode === "edit" ? state.total_mark : 0
  );
  const handleCancel = () => setPreviewOpen(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [image, setImage] = useState('');

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  // const [submitStatus, setSubmitStatus] = useState(false);
  const [selectedOutlet, setSelectedOutlet] = useState(false);
  const [entryData, setEntryData] = useState();
  const [formData, setFormData] = useState({
    outlet_name: state?.outletData,
    department: [],
    category: []
  });
  const loginType = useSelector((state) => state.auth.type);
  const emp_map = useSelector(
    (state) =>
      state.auth.userData.data && state.auth.userData.data.employee_mapping
  );



  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const {
    savingAuditNewEntry
  } = useSelector((state) => {
    return state.master;
  });
  const current = new Date();
  const year = current.getFullYear();
  const month = String(current.getMonth() + 1).padStart(2, '0');
  const day = String(current.getDate()).padStart(2, '0');
  const currentdate = [year, month, day].join('-');
  const [date, setDate] = useState(currentdate);

  var changedate = new Date(); // today!

  var x = 5; // go back 5 days!
  var fifthday = [year, month, '05'].join('-'); //To Restrict Date before 5th of everymonth

  changedate.setDate(changedate.getDate() - x);

  const cyear = changedate.getFullYear();

  const cmonth = String(changedate.getMonth() + 1).padStart(2, '0');

  const cday = String(changedate.getDate()).padStart(2, '0');

  const previous = [cyear, cmonth, cday].join('-');


  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [fileListdoc, setFileListDoc] = useState([]);


  const getFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const getFiledoc = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileListdoc;
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const handleDocCancel = () => setPreviewOpenDoc(false);
  const [previewOpenDoc, setPreviewOpenDoc] = useState(false);
  const [previewDoc, setPreviewDoc] = useState('');
  const [previewTitleDoc, setPreviewTitleDoc] = useState('');
  const [document1, setDocument] = useState('');
  const handlePreviewDoc = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewDoc(file.url || file.preview);
    setPreviewOpenDoc(true);
    setPreviewTitleDoc(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };



  const uploadButton = (
    <Button style={{ display: 'flex', direction: 'row' }} icon={<PlusOutlined style={{ marginTop: '3px', marginRight: '4px' }} />}>
      <div
        style={{
          marginLeft: '3px'
        }}>
        {state?.id ? 'Update Image' : 'Upload'}
      </div>
    </Button>
  );

  const uploadButton1 = (
    <Button style={{ display: 'flex', direction: 'row' }} icon={<PlusOutlined style={{ marginTop: '3px', marginRight: '4px' }} />}>
      <div
        style={{
          marginLeft: '3px'
        }}>
        {state?.id ? 'Update Image' : 'Upload'}
      </div>
    </Button>
  );



  const propsnew = {
    name: "audit_agent_image",
    action: `${baseURL}audit-agent-upload`,
    headers: {
      authorization: "authorization-text"
    }
  };

  const propstraining = {
    name: "training_document",
    action: `${baseURL}audit-training-upload`,
    headers: {
      authorization: "authorization-text"
    }
  };

  const handleChangenew = (e) => {
    setFileList(e?.fileList);
    setImage(e?.file?.response?.audit_agent_image ?? '');
    form.setFieldsValue({ audit_agent_image: e?.file?.response?.audit_agent_image ?? '' });
  };

  const handleChangetrain = (e) => {
    setFileListDoc(e?.fileList);
    setDocument(e?.file?.response?.training_document ?? '');
    form.setFieldsValue({ training_document: e?.file?.response?.training_document ?? '' });
  };

  const {
    getOutletMasterResponse: { data: outletData }
  } = useSelector((state) => {
    return state.master;
  });
  const outletList = outletData?.map((o) => ({
    ...o,
    outlet_code: `${o?.outlet_code} - ${o?.name}`
  }));

  const {
    getEntryTypeResponse: { data: entryDatum }
  } = useSelector((state) => {
    return state.entry;
  });

  const {
    userData: { data: authData },
    type: userType
  } = useSelector((state) => {
    return state.auth;
  });
  const userData = useSelector((state) => state.auth);

  const isFullAudit =
    (authData?.employee_mapping?.submodule ?? []).find(
      (e) => e?.id !== "Category wise"
    ) || userType === 1;

  useEffect(() => {
    let cat_wise_total_mark = 0;
    const catWiseCate = (entryDatum?.category ?? [])?.filter((e) => {
      if (type?.includes(e?.id) || isFullAudit) {
        cat_wise_total_mark = cat_wise_total_mark + e?.mark ?? 0;
        return true;
      }
      return false;
    });

    setEntryData({
      category: catWiseCate,
      total_mark: cat_wise_total_mark
    });
    setTotal_mark(cat_wise_total_mark ?? 0);
  }, [type, entryDatum]);

  const {
    register,
    handleSubmit,
    control,
    //formState: { errors }
  } = useForm();

  useEffect(() => {
    dispatch(getOutletMasternotsubzone());
  }, [dispatch]);

  const handleClickBack = () => {
    navigate("/auditNewEntry");
  };

  const onFinish = (data) => {
    /* ====== Empty Sumbit Restriction Start ======*/
    let basic_validation1 = 0;
    let basic_validation2 = 0;
    let image_validation = 0;
    let image_validation1 = 0;

    let dep_validation1 = 0;
    let dep_image = 0;
    let dep_remark = 0;
    let category_val = formData.category;
    //category_val.map((val,ind)=>{
    category_val.map((val) => {
      let sub_category_val = val.subcategory

      sub_category_val.map((val1) => {
        let audit_point_val = val1.auditpoint
        audit_point_val.map((val2) => {
          if (isNaN(val2.score)) {
            basic_validation1 = 1;
          }
          if (val2.error_status == '1') {
            basic_validation2 = 1;
          }
          if (val2.score <= val2.capa_mark) {
            if (!val2.file_name) {
              image_validation = 1;
            }
            if (!val2.remarks) {
              image_validation1 = 1;
            }

          }
        })
      })
    })

    if (basic_validation1 == 1) {
      // setApiError("Please fill all values");
      messageApi.open({
        type: 'warning',

        content: 'Please fill all Outlet values',
        className: 'custom-class',
        style: {
          marginTop: '28vh',
          color: '#d91616',
          fontWeight: 'bold'
        },
      });
      return false
    }
    if (basic_validation2 == 1) {
      // setApiError("Please enter valid Score");
      messageApi.open({
        type: 'warning',
        content: 'Please enter valid Score for Outlet',
        className: 'custom-class',
        style: {
          marginTop: '20vh',
          color: '#d91616',
          fontWeight: 'bold'
        },
      });
      return false
    }
    if (image_validation == 1) {

      messageApi.open({
        type: 'warning',
        content: 'Outlet Capa Attachment Required for Marks',
        className: 'custom-class',
        style: {
          marginTop: '20vh',
          color: '#d91616',
          fontWeight: 'bold'
        },
      });

      return false
    }


    if (image_validation1 == 1) {

      messageApi.open({
        type: 'warning',
        content: 'Outlet capa remark required for Marks',
        className: 'custom-class',
        style: {
          marginTop: '20vh',
          color: '#d91616',
          fontWeight: 'bold'
        },
      });
      return false
    }


    let department_val = formData.department;
    //category_val.map((val,ind)=>{
    department_val.map((val) => {
      let sub_department_val = val.subcategory
      sub_department_val.map((val1) => {
        let audit_point_val = val1.auditpoint
        audit_point_val.map((val2) => {
          if ((val2.criteria == '')) {
            dep_validation1 = 1;
          }
          if (val2.criteria == 'no') {
            if (!val2.file_name) {
              dep_image = 1;
            }
            if (!val2.remarks) {
              dep_remark = 1;
            }

          }
        })
      })
    })

    if (dep_validation1 == 1) {
      messageApi.open({
        type: 'warning',
        content: 'Please fill all Department values',
        className: 'custom-class',
        style: {
          marginTop: '28vh',
          color: '#d91616',
          fontWeight: 'bold'

        },
      });
      return false
    }

    if (dep_image == 1) {

      messageApi.open({
        type: 'warning',
        content: 'Department CAPA attachment required',
        className: 'custom-class',
        style: {
          marginTop: '20vh',
          color: '#d91616',
          fontWeight: 'bold'
        },
      });
      return false
    }


    if (dep_remark == 1) {
      messageApi.open({
        type: 'warning',
        content: 'Department CAPA Remarks Required',
        className: 'custom-class',
        style: {
          marginTop: '20vh',
          color: '#d91616',
          fontWeight: 'bold'
        },
      });
      return false
    }
    let outlet_id = selectedOutlet.id;
    setShowDialog(false);
    setApiError("");

    let submitted = {
      ...formData,
      audit_date: date,
      total_mark: data?.actual_Score,
      capa_status: 1,
      created_by: userData.userData.data?.id ?? '0',
      outlet_id: outlet_id,
      audit_agent_image: image ?? 'No image',
      training_document: document1 ?? 'No Document',
      spent_time: formattedTime,
    };


    setLoading(true);
    apis.addAuditNewEntry(submitted).then((res) => {
      if (res.data.status === 200) {
        setTimeout(() => {
          messageToast({ message: res.data.statusText, statusText: res.data.statusText, title: 'Audit Entry Submitted' });
          navigate("/auditNewEntry");
        }, 2000)
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

  const [time, setTime] = useState(0);
  //const [intervalId, setIntervalId] = useState(null);
  const [pageLoadTime, setPageLoadTime] = useState(Date.now());
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isActive) {
        setTime(Date.now() - pageLoadTime);
      }
    }, 1000);

    return () => {

      clearInterval(interval);
    };
  }, [isActive, pageLoadTime]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsActive(!document.hidden);
      if (!document.hidden) {
        setPageLoadTime(Date.now() - time);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [time]);

  const formattedTime = React.useMemo(() => {
    const minutes = Math.floor(time / 60000);
    const seconds = ((time % 60000) / 1000).toFixed(0);
    return `${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`;
  }, [time]);


  const [total_mark, setTotal_mark] = useState(entryData?.total_mark ?? 0);
  const addOnEditMark = (data) => {
    setTotalMark(0);
    const mergeMark = [];
    map((e) => {
      // eslint-disable-next-line array-callback-return
      (data?.mark ?? []).map((data) => {
        if (Number(e.pointsID) === Number(data?.pointsID))
          mergeMark.push({ ...e, ...data });
      });
    }, marks).filter((e) => e);

    const finalMark = unionWith(eqBy(prop("pointsID")), mergeMark, marks);
    const submitCondition = [];
    const capaStatus = [];
    finalMark.forEach((e) => {
      capaStatus.push(Number(e?.capa) < Number(e?.actual_Score));
      setTotalMark((mark) => mark + Number(e?.score));
      submitCondition.push(
        isEmpty(e?.actual_Score) ? false : true,
        Number(e?.actual_Score) <= e?.eligible_Score
      );
    });

  };

  const onchangedate = e => {
    const newDate = e.target.value;
    setDate(newDate);
  };

  useEffect(() => {
    if (mode === "edit") addOnEditMark({ mark: marks });
  }, []);

  useEffect(() => {
    if (state?.data) {
      const category = [];
      const uniqueCategories = [];
      const department = [];
      const uniquedepartment = [];
      let currentIndex = -1;
      (state?.data || []).forEach((d) => {
        if ((!uniqueCategories.includes(d?.category_name))) {
          uniqueCategories.push(d?.category_name);
          category.push({ ...d, subcategory: [] });
        }
        else {
          if (d?.auditpoint_id) {
            category[currentIndex]?.subcategory?.forEach((s) => {
              if (d?.subcategory_name === s?.subcategory_name)
                s?.auditpoint?.push(d);
            },
            );
          } else
            category[currentIndex]?.subcategory?.push(
              {
                ...d,
                name: d?.subcategory_name,
                auditpoint: []
              });

        }
        if ((!uniquedepartment.includes(d?.category_name))) {
          uniquedepartment.push(d?.category_name);
          department.push({ ...d, subcategory: [] });
          currentIndex++;
        }
        else {
          if (d?.auditpoint_id) {
            department[currentIndex]?.subcategory?.forEach((s) => {
              if (d?.subcategory_name === s?.subcategory_name)
                s?.auditpoint?.push(d);
            });
            department[currentIndex]?.subcategory?.push({
              ...d,
              name: d?.subcategory_name,
              auditpoint: []
            });
          }
        }

      });
      setFormData({ ...state, category, department });
    }
    else {
      apis.getallauditMaster().then((res) => {
        if (res.data.status === 200) {
          const data = res.data.data.category || [];
          const data2 = res.data.data.department || [];
          setTotalMark(0);
          const categoryList = data
            .filter(
              (li) => li.subcategory !== undefined && li.subcategory.length > 0
            )
            .map((cat) => {
              let subcategoryTotal = 0;
              let subcategory = cat.subcategory
                .filter(
                  (li) => li.pointlist !== undefined && li.pointlist.length > 0
                )
                .map((sub) => {
                  let pointTotal = 0;
                  let auditpoint = sub.pointlist.map((point) => {
                    subcategoryTotal =
                      subcategoryTotal + Number(point?.auditpoint_mark ?? 0);
                    pointTotal =
                      pointTotal + Number(point?.auditpoint_mark ?? 0);
                    setTotalMark((mark) =>
                      Number(mark + Number(point?.auditpoint_mark))
                    );
                    let pointItem =
                    {
                      auditpoint_id: point.id,
                      auditpoint_mark: point?.auditpoint_mark ?? "",
                      auditmaster_id: point?.auditmaster_id ?? "",
                      capa_mark: Number(point?.capa_mark) ?? "",
                      score: Number(point?.score) ?? "",
                      error_status: 0,
                      error_message: '',
                      name: point.name
                    };
                    return pointItem;
                  });
                  let subcategoryItem =
                  {
                    subcategory_id: sub.id,
                    subcategory_mark: pointTotal ?? "",
                    name: sub.name,
                    auditpoint
                  };
                  return subcategoryItem;
                });
              let categoryItem =
              {
                category_id: cat.category_id,
                category_name: cat.category_name,
                category_mark: subcategoryTotal ?? "",
                subcategory
              };
              return categoryItem;
            });
          const category = categoryList.filter(
            (li) => li.subcategory !== undefined && li.subcategory.length > 0
          );
          const departmentList = data2
            .filter(
              (li) => li.subcategory !== undefined && li.subcategory.length > 0
            )
            .map((dep) => {
              let subcategoryTotal = 0;
              let subcategory = dep.subcategory
                .filter(
                  (li) => li.pointlist !== undefined && li.pointlist.length > 0
                )
                .map((sub) => {
                  let pointTotal = 0;
                  let auditpoint = sub.pointlist.map((point) => {
                    subcategoryTotal =
                      subcategoryTotal + Number(point?.auditpoint_mark ?? 0);
                    pointTotal =
                      pointTotal + Number(point?.auditpoint_mark ?? 0);
                    setTotalMark((mark) =>
                      Number(mark + Number(point?.auditpoint_mark))
                    );
                    let pointItem =
                    {
                      auditpoint_id: point.id,
                      auditpoint_mark: point?.auditpoint_mark ?? "",
                      auditmaster_id: point?.auditmaster_id ?? "",
                      capa_mark: Number(point?.capa_mark) ?? "",
                      criteria: point?.criteria ?? "",
                      error_status: 0,
                      error_message: '',
                      name: point.name
                    };
                    return pointItem;
                  });
                  let subcategoryItem = {
                    subcategory_id: sub.id,
                    subcategory_mark: pointTotal ?? "",
                    name: sub.name,
                    auditpoint
                  };
                  return subcategoryItem;
                });
              let categoryItem = {
                category_id: dep.category_id,
                category_name: dep.category_name,
                category_mark: subcategoryTotal ?? "",
                subcategory
              };
              return categoryItem;
            });
          const department = departmentList.filter(
            (li) => li.subcategory !== undefined && li.subcategory.length > 0
          );
          const initialValue = {
            current_date: "",
            audit_date: state?.audit_date || "",
            // from_date: state?.from_date || "",
            // to_date: state?.from_date || "",
            outlet_id: state?.outlet_id || "",
            status: "1",
            department,
            category
          };
          setFormData(initialValue);
        }

      });
    }
  }, []);

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

              <div
                className="d-flex justify-content-center align-items-center "
                style={{ width: "96%", padding: '15px' }}
              >
                <Row gutter={[20, 0]}>
                  <Col md={{ span: 6 }} xs={{ span: 24 }} style={{ textAlign: 'left' }}>
                    <Form.Item name="orl_name" label="OUTLET NAME">
                      <Controller
                        control={control}
                        name="orl_name"
                        render={({ field: { onChange } }) => (
                          <Input
                            onChange={onChange}
                            value={'Dindigul'}
                            readOnly
                            style={{ width: "100%" }}
                          />
                        )}
                      />
                    </Form.Item>
                  </Col>

                  <Col md={{ span: 6 }} xs={{ span: 24 }} style={{ textAlign: 'right' }}>
                    <Form.Item name="orl_name" label="ORL NAME">
                      <Controller
                        control={control}
                        name="orl_name"
                        render={({ field: { onChange } }) => (
                          <Input
                            onChange={onChange}
                            value={'Pandian'}
                            readOnly
                            style={{ width: "100%" }}
                          />
                        )}
                      />
                    </Form.Item>
                  </Col>

                  <Col md={{ span: 6 }} xs={{ span: 24 }} style={{ textAlign: 'right' }}>
                    <Form.Item name="orl_name" label="OPENING BALANCE">
                      <Controller
                        control={control}
                        name="orl_name"
                        render={({ field: { onChange } }) => (
                          <Input
                            onChange={onChange}
                            value={'50'}
                            readOnly
                            style={{ width: "100%" }}
                          />
                        )}
                      />
                    </Form.Item>
                  </Col>

                  <Col md={{ span: 6 }} xs={{ span: 24 }} style={{ textAlign: 'right' }}>
                    <Form.Item name="orl_name" label="PREVIOUS ACCOUNT CLOSE">
                      <Controller
                        control={control}
                        name="orl_name"
                        render={({ field: { onChange } }) => (
                          <Input
                            onChange={onChange}
                            value={'12-09-2023'}
                            readOnly
                            style={{ width: "100%" }}
                          />
                        )}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </div>


              <div className="d-flex  align-items-center " >
                <Col span={24}>
                  <Row gutter={[15, 15]} style={{ justifyContent: 'center' }}>
                    <Col span={12} >
                      <Form.Item wrapperCol={{ offset: 8, span: 16, padding: '15px' }}>
                        <Button
                          style={{ backgroundColor: "black" }}
                          type="primary"
                          loading={loading}
                        >
                          {"Close Sales Account"}
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
              </div>


              <div
                className="d-flex justify-content-center align-items-center ">
                <Row gutter={[20, 0]}>
                  <Col md={{ span: 10 }} xs={{ span: 24 }} style={{ textAlign: 'left' }}>
                    <Form.Item name="orl_name" label="CASH SALES">
                      <Controller
                        control={control}
                        name="orl_name"
                        render={({ field: { onChange } }) => (
                          <Input
                            onChange={onChange}
                            value={'4750'}
                            readOnly
                            style={{ width: "100%" }}
                          />
                        )}
                      />
                    </Form.Item>
                  </Col>
                  <Col md={{ span: 2 }} xs={{ span: 24 }} ></Col>
                  <Col md={{ span: 2 }} xs={{ span: 24 }} ></Col>
                  <Col md={{ span: 10 }} xs={{ span: 24 }} style={{ textAlign: 'right' }}>
                    <Form.Item name="orl_name" label="OUTLET TOTAL CASH">
                      <Controller
                        control={control}
                        name="orl_name"
                        render={({ field: { onChange } }) => (
                          <Input
                            onChange={onChange}
                            value={'4800'}
                            readOnly
                            style={{ width: "100%" }}
                          />
                        )}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </div>




              <div>
                <table style={{ width: '50%', textAlign: 'center' }}>
                  <thead>
                    <td style={{border:'2px black solid',backgroundColor:'#f5a60b',color:'white'}}>S.No</td>
                    <td style={{border:'2px black solid',backgroundColor:'#f5a60b',color:'white'}}>Denomination</td>
                    <td style={{border:'2px black solid',backgroundColor:'#f5a60b',color:'white'}}>Cnt</td>
                    <td style={{border:'2px black solid',backgroundColor:'#f5a60b',color:'white'}}>Amount</td>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{border:'2px black solid'}}>1</td>
                      <td style={{border:'2px black solid'}}>2000</td>
                      <td style={{border:'2px black solid'}}><Input type="text" style={{ width: '175px' }} /></td>
                      <td style={{border:'2px black solid'}}>10000</td>
                    </tr>
                    <tr>
                      <td style={{border:'2px black solid'}}>2</td>
                      <td style={{border:'2px black solid'}}>500</td>
                      <td style={{border:'2px black solid'}}><Input type="text" style={{ width: '175px' }} /></td>
                      <td style={{border:'2px black solid'}}>1500</td>
                    </tr>
                    <tr>
                      <td style={{border:'2px black solid'}}>3</td>
                      <td style={{border:'2px black solid'}}>200</td>
                      <td style={{border:'2px black solid'}}><Input type="text" style={{ width: '175px' }} /></td>
                      <td style={{border:'2px black solid'}}>400</td>
                    </tr>
                    <tr>
                      <td style={{border:'2px black solid'}}>4</td>
                      <td style={{border:'2px black solid'}}>100</td>
                      <td style={{border:'2px black solid'}}><Input type="text" style={{ width: '175px' }} /></td>
                      <td style={{border:'2px black solid'}}>500</td>
                    </tr>
                    <tr>
                      <td style={{border:'2px black solid'}}>5</td>
                      <td style={{border:'2px black solid'}}>50</td>
                      <td style={{border:'2px black solid'}}><Input type="number" style={{ width: '175px' }} /></td>
                      <td style={{border:'2px black solid'}}>250</td>
                    </tr>
                    <tr>
                      <td style={{border:'2px black solid'}}>6</td>
                      <td style={{border:'2px black solid'}}>20</td>
                      <td style={{border:'2px black solid'}}><Input type="number" style={{ width: '175px' }} /></td>
                      <td style={{border:'2px black solid'}}>100</td>
                    </tr>
                    <tr>
                      <td style={{border:'2px black solid'}}>7</td>
                      <td style={{border:'2px black solid'}}>10</td>
                      <td style={{border:'2px black solid'}}><Input type="text" style={{ width: '175px' }} /></td>
                      <td style={{border:'2px black solid'}}>50</td>
                    </tr>
                    <tr>
                      <td style={{border:'2px black solid'}}>8</td>
                      <td style={{border:'2px black solid'}}>5</td>
                      <td style={{border:'2px black solid'}}><Input type="number" style={{ width: '175px' }} /></td>
                      <td style={{border:'2px black solid'}}>25</td>
                    </tr>
                    <tr>
                      <td style={{border:'2px black solid'}}>9</td>
                      <td style={{border:'2px black solid'}}>2</td>
                      <td style={{border:'2px black solid'}}><Input type="number" style={{ width: '175px' }} /></td>
                      <td style={{border:'2px black solid'}}>4</td>
                    </tr>
                    <tr>
                      <td style={{border:'2px black solid'}}>10</td>
                      <td style={{border:'2px black solid'}}>1</td>
                      <td style={{border:'2px black solid'}}><Input type="number" style={{ width: '175px' }} /></td>
                      <td style={{border:'2px black solid'}}>0</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="d-flex  align-items-center " >
                <Col span={24}>
                  <Row gutter={[15, 15]} style={{ justifyContent: 'center',padding: '25px' }}>
                    <Col span={12} >
                      <Form.Item wrapperCol={{ offset: 8, span: 16, padding: '15px' }}>
                        <Button
                          style={{ backgroundColor: "#f5a60b" }}
                          type="primary"
                          loading={loading}
                        >
                          {"Submit"}
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
              </div>


            </Form>
          </Col>
        </Row>
      </Card>

    </>
  );
}

export default AccountClosingForm;