/* eslint-disable no-unused-labels */
import React, { useEffect, useState } from "react";
import { Input, Card, Button, Col, Row, Form, Collapse, Select, Radio, Upload,Modal,Tooltip,Typography,Image,message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import {eqBy, isEmpty, map, prop, unionWith} from 'ramda';
import { getOutletMasternotsubzone } from "../../../@app/master/masterSlice";
import messageToast from '../../../components/messageToast/messageToast';
import { useNavigate, useLocation } from "react-router";
import ConfirmOnExit from "../../../components/confirmOnExit/ConfirmOnExit";
import { DoubleRightOutlined } from "@ant-design/icons";
import apis from "../../../api/masterApi";
import { baseURL } from "../../../api/baseURL";
import { PlusOutlined } from "@ant-design/icons";
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const { Option } = Select;
function AuditNewEntryForm({ mode }) {
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
  const { Panel } = Collapse;
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
var fifthday=[year,month,'05'].join('-'); //To Restrict Date before 5th of everymonth

changedate.setDate(changedate.getDate() - x);

const cyear = changedate.getFullYear();

const cmonth = String(changedate.getMonth() + 1).padStart(2, '0');

const cday = String(changedate.getDate()).padStart(2, '0');

const previous = [cyear, cmonth, cday].join('-');


  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [fileListdoc,setFileListDoc] = useState([]);

  
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

  const handleChange = (i, j, k, e) => {
    let data = formData.category;
    const display = e?.file?.response?.filename ?? "";
    data[i].subcategory[j].auditpoint[k]['file_name'] = display;
  };
  const handleChangeDep = (i, j, k, e) => {
    let data = formData.department;
    const display = e?.file?.response?.filename ?? "";
    data[i].subcategory[j].auditpoint[k]['file_name'] = display;
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

  const uploadButton = (
    <Button style={{display: 'flex', direction: 'row'}} icon={<PlusOutlined style={{marginTop: '3px', marginRight: '4px'}} />}>
      <div
        style={{
          marginLeft: '3px'
        }}>
        {state?.id ? 'Update Image' : 'Upload'}
      </div>
    </Button>
  );

  const uploadButton1 = (
    <Button style={{display: 'flex', direction: 'row'}} icon={<PlusOutlined style={{marginTop: '3px', marginRight: '4px'}} />}>
      <div
        style={{
          marginLeft: '3px'
        }}>
        {state?.id ? 'Update Image' : 'Upload'}
      </div>
    </Button>
  );

  const props = {
    name: "file_name",
    action: `${baseURL}entry-files-upload`,
    headers: {
      authorization: "authorization-text"
    }
  };

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
    form.setFieldsValue({audit_agent_image: e?.file?.response?.audit_agent_image ?? ''});
  };

  const handleChangetrain = (e) => {
    setFileListDoc(e?.fileList);
    setDocument(e?.file?.response?.training_document ?? '');
    form.setFieldsValue({training_document: e?.file?.response?.training_document ?? ''});
  };

  const handlePointChange = (i, j, k, e) => {
    const { name, value } = e.target;
    let data = formData.category;
    data[i].subcategory[j].auditpoint[k][name] = value;
    setFormData((fd) => ({ ...fd, category: data }));
  };

  const handleScoreChange = (i, j, k, e) =>
   {
      const { name, value } = e.target;
      let actual_score_validation_status = 0;
      let actual_score_validation_message = '';
     // let min_val = Number(e.target.min)
      let max_val = Number(e.target.max)
      let actual_score = Number(e.target.value.replace(/\D/g, ''));  
      if(actual_score > max_val || actual_score < 0)
      {
        actual_score_validation_status = 1;
        actual_score_validation_message = 'Invalid Score';
      }  
     let data = formData.category;
      data[i].subcategory[j].auditpoint[k][name] = value;
      data[i].subcategory[j].auditpoint[k]['error_status'] = actual_score_validation_status;
      data[i].subcategory[j].auditpoint[k]['error_message'] = actual_score_validation_message;
      setFormData((fd) => ({ ...fd, category: data }));
    };

    const handleCriteriaChange = (i, j, k, e) => 
  {
    const { name, value } = e.target;
    let data = formData.department;
    data[i].subcategory[j].auditpoint[k][name] = value;
    setFormData((fd) => ({ ...fd, department: data }));
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

  const onFinish = (data) => 
  {
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
      category_val.map((val)=>{
        let sub_category_val = val.subcategory

        sub_category_val.map((val1)=>{
          let audit_point_val = val1.auditpoint       
            audit_point_val.map((val2)=>{         
            if(isNaN(val2.score)){
              basic_validation1 = 1;
            }
            if(val2.error_status == '1'){
              basic_validation2 = 1;
            }
            if(val2.score <= val2.capa_mark ){
              if(!val2.file_name){
                image_validation = 1;
              }
              if(!val2.remarks){
                image_validation1 = 1;
              }
              
            }
            })
        })
      })      

     if (basic_validation1 == 1){
       // setApiError("Please fill all values");
        messageApi.open({
          type: 'warning',
     
          content: 'Please fill all Outlet values',
          className: 'custom-class',             
          style: {
            marginTop: '28vh',
            color:'#d91616',
            fontWeight:'bold'
            },
        });
        return false
      }
      if (basic_validation2 == 1){
       // setApiError("Please enter valid Score");
       messageApi.open({
        type: 'warning',
        content: 'Please enter valid Score for Outlet',
        className: 'custom-class',
        style: {
          marginTop: '20vh',
            color:'#d91616',
            fontWeight:'bold'
        },
      });
        return false
      }
      if(image_validation == 1){
      
       messageApi.open({
        type: 'warning',
        content: 'Outlet Capa Attachment Required for Marks',
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
      
        messageApi.open({
         type: 'warning',
         content: 'Outlet capa remark required for Marks',
         className: 'custom-class',
         style: {
             marginTop: '20vh',
             color:'#d91616',
             fontWeight:'bold'
         },
       });
         return false
       }


let department_val = formData.department;
//category_val.map((val,ind)=>{
  department_val.map((val)=>{
  let sub_department_val = val.subcategory
  sub_department_val.map((val1)=>{
    let audit_point_val = val1.auditpoint       
      audit_point_val.map((val2)=>{         
      if((val2.criteria == '')){
       dep_validation1 = 1;
      }
     if(val2.criteria == 'no' ){
        if(!val2.file_name){
          dep_image = 1;
        }
        if(!val2.remarks){
          dep_remark = 1;
        }
        
      }
      })
  })
})      

if (dep_validation1 == 1){
  messageApi.open({
    type: 'warning',
    content: 'Please fill all Department values',
    className: 'custom-class',
    style: {
      marginTop: '28vh',
      color:'#d91616',
      fontWeight:'bold'

    },
  });
  return false
}

if(dep_image == 1){

 messageApi.open({
  type: 'warning',
  content: 'Department CAPA attachment required',
  className: 'custom-class',
  style: {
      marginTop: '20vh',
      color:'#d91616',
      fontWeight:'bold'
  },
});
  return false
}


if(dep_remark == 1){
  messageApi.open({
   type: 'warning',
   content: 'Department CAPA Remarks Required',
   className: 'custom-class',
   style: {
       marginTop: '20vh',
       color:'#d91616',
       fontWeight:'bold'
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
      capa_status:1,
      created_by: userData.userData.data?.id ?? '0',
      outlet_id: outlet_id,
      audit_agent_image: image ?? 'No image',
      training_document:document1 ?? 'No Document',
      spent_time: formattedTime,
     };   
  
  
    setLoading(true);
     apis.addAuditNewEntry(submitted).then((res) => {
      if (res.data.status === 200) {
        setTimeout(() => {
          messageToast({ message: res.data.statusText, statusText: res.data.statusText, title: 'Audit Entry Submitted' });
        navigate("/auditNewEntry");
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
    if (state?.data) 
    {
      const category = [];
      const uniqueCategories = [];
      const department = [];
      const uniquedepartment = [];
      let currentIndex = -1;
      (state?.data || []).forEach((d) => 
      {
        if ((!uniqueCategories.includes(d?.category_name)))
         {
          uniqueCategories.push(d?.category_name);
          category.push({ ...d, subcategory: [] });
         }
         else 
         {
          if (d?.auditpoint_id) 
          {
            category[currentIndex]?.subcategory?.forEach((s) => 
            {
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
        if ((!uniquedepartment.includes(d?.category_name))) 
        {
          uniquedepartment.push(d?.category_name);
          department.push({ ...d, subcategory: [] });
          currentIndex++;
        } 
        else 
        {
          if (d?.auditpoint_id) 
          {
            department[currentIndex]?.subcategory?.forEach((s) => 
            {
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
    else 
    {
      apis.getallauditMaster().then((res) => 
      {
        if (res.data.status === 200)
         {
          const data = res.data.data.category || [];
          const data2 = res.data.data.department || [];
          setTotalMark(0);
          const categoryList = data
            .filter(
              (li) => li.subcategory !== undefined && li.subcategory.length > 0
            )
            .map((cat) =>
             {
              let subcategoryTotal = 0;
              let subcategory = cat.subcategory
                .filter(
                  (li) => li.pointlist !== undefined && li.pointlist.length > 0
                )
                .map((sub) => 
                {
                  let pointTotal = 0;
                  let auditpoint = sub.pointlist.map((point) => 
                  {
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
            .map((dep) => 
            {
              let subcategoryTotal = 0;
              let subcategory = dep.subcategory
                .filter(
                  (li) => li.pointlist !== undefined && li.pointlist.length > 0
                )
                .map((sub) => 
                {
                  let pointTotal = 0;
                  let auditpoint = sub.pointlist.map((point) => 
                  {
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
              <Row gutter={[15, 0]}>

                <Col md={{ span: 5 }} xs={{ span: 24 }}>
                  <Form.Item
                    name="outlet_id"
                    label="Outlet Code"
                    rules={[
                      { required: true, message: "Select Outlet" }
                    ]}
                  >
                    <Controller
                      control={control}
                      name="outlet_id"
                      render={({ field: { onChange } }) => (
                        <Select
                          {...register("outlet_id", {
                            required: mode === "add"
                          })}
                          disabled={mode === "edit"}
                          defaultValue={state?.outlet_id}
                          placeholder="Select"
                          showSearch
                          onChange={(e) => {
                            onChange(e);
                            setSelectedOutlet(
                              (outletList ?? [])?.find(
                                (outlet) => outlet.id === e
                              )
                            );
                          }}
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {map(
                            (outlet) => {
                              return (
                                <Option key={outlet?.id} value={outlet?.id}>
                                  {outlet?.outlet_code}
                                </Option>
                              );
                            },
                            outletList ? outletList.filter((e) => {
                                if (loginType === 2) {
                                  let fid =
                                    emp_map &&
                                    emp_map.outlet.findIndex(
                                      (x) => Number(x.id) === Number(e.id)
                                    );
                                  if (fid !== -1 && e.status == '1') return true;
                                  else return false;
                                } else return e.status == '1';
                              })
                              : []
                          )}
                        </Select>
                      )}
                    />
                    {apiError?.outlet_id && (
                      <p style={{ color: "red" }}>Please select Outlet</p>
                    )}
                     
                  </Form.Item>
                </Col>
                <Col md={{ span: 4 }} xs={{ span: 24 }}>
                  <Form.Item name="outlet_name" label="Outlet Name">
                    <Controller
                      control={control}
                      name="outlet_name"
                      render={({ field: { onChange } }) => (
                        <Input
                          onChange={onChange}
                          defaultValue={state?.outlet_name}
                          value={selectedOutlet?.name}
                          disabled
                          style={{ width: "100%" }}
                        />
                      )}
                    />
                  </Form.Item>
                </Col>
                <Col md={{ span: 3 }} xs={{ span: 24 }}>
                  <Form.Item name="zone_id" label="Zone Name">
                    <Controller
                      control={control}
                      name="zone_id"
                      render={({ field: { onChange } }) => (
                        <Input
                          onChange={onChange}
                          value={selectedOutlet?.zone_name}
                          readOnly
                          //style={{ width: "100%" }}
                        />
                      )}
                    />
                  </Form.Item>
                </Col>
                <Col md={{ span: 3 }} xs={{ span: 24 }}>
                  <Form.Item
                    name="subzone_id"
                    label="SubZone"
                    rules={[
                      { required: false, message: "Please Enter Subzone" }
                    ]}
                  >
                    <Controller
                      control={control}
                      name="subzone_id"
                      render={({ field: { onChange } }) => (
                        <Input
                          onChange={onChange}
                          value={selectedOutlet?.subzone_name}
                          readOnly
                          style={{ width: "100%" }}
                        />
                      )}
                    />
                  </Form.Item>
                </Col>
                <Col md={{ span: 3 }} xs={{ span: 24 }}>
                  <Form.Item name="orl_name" label="ORL Name">
                    <Controller
                      control={control}
                      name="orl_name"
                      render={({ field: { onChange } }) => (
                        <Input
                          onChange={onChange}
                          value={selectedOutlet?.orl_name}
                          readOnly
                          style={{ width: "100%" }}
                        />
                      )}
                    />
                  </Form.Item>
                </Col>
                <Col md={{ span: 3 }} xs={{ span: 24 }}>
                  <Form.Item name="audit_date"
                    rules={[
                      { required: true, message: "Please Select Audit Date" }
                    ]}
                    label="Audit Date">
                    <Input type='date'
                      selected={date}
                      name="audit_date"
                      placeholder='Add Add From date'
                      defaultValue={currentdate}
                     min={currentdate >= fifthday ? currentdate : previous}
                      max={currentdate}
                      onChange={onchangedate}
                      value={date}
                    //format={dateFormat}
                    />                   
                  </Form.Item>
                </Col>                        

               <Col md={{ span: 3 }} xs={{ span: 24 }}>
                  <Form.Item name="agent_name"
                    label="Agent Name">
                       {userData.type == 2? (
                   <Typography>
                   <Card style={{fontWeight:'bold',width:'180px',height:'40px',background:'#34b1aa',color: "#ffffff" }}>
                   {userData.userData.data?.name}</Card>
                   </Typography>   
                       ):(
                        <Typography>
                        <Card style={{fontWeight:'bold',width:'180px',height:'40px',background:'#34b1aa',color: "#ffffff" }}>
                         Admin</Card>
                        </Typography>   
                       )}
                  </Form.Item>
                </Col>
                <Col md={{ span: 3 }} xs={{ span: 24 }}>
                <Form.Item name="spent_time" label="Duration Time">                  
                <Typography>
                   <Card style={{width:'100px',height:'40px',background:'#34b1aa',color: "#ffffff"}}><b>{formattedTime}</b></Card>
                   </Typography>     
                                  
                  </Form.Item>   
                </Col>         
               <Col md={{ span: 0 }} xs={{ span: 0 }}>
                  <Form.Item name="total_mark" label="" >
                    <Controller
                      control={control}
                      name="total_mark"
                      defaultValue={state?.total_mark || (total_mark ?? 100)}
                      render={({ field: { onChange } }) => (
                        <Input
                        type='hidden'
                          onChange={onChange}
                          value={
                            !isEmpty(type)
                              ? `${totalMark}/${total_mark ?? 100}`
                              : 0
                          }
                          disabled
                          style={{ width: "10px" }}
                        />
                      )}
                    />
                  </Form.Item>
                </Col>    
                <Row>
                <Col md={{span: 17}} xs={{span: 16}}>
                  <Form.Item
                   rules={[
                    { required: true, message: "Please Select Audit Date" }
                    ]}
                    name='audit_agent_image'
                    label='Audit Agent Image'
                    getValueFromEvent={getFile}
                    alt='No image'
                    >
                    <div style={{display: 'flex', direction: 'col'}}>
                      {state?.id && fileList?.length === 0 ? (
                        state?.audit_agent_image ? (
                          <Image style={{paddingRight: '3px'}} width={'10px'} src={state?.audit_agent_image ?? ''}  alt='No image' />
                        ) : (
                          'No Image Available'
                        )
                      ) : (
                        <></>
                      )}
                      <Upload
                        {...propsnew}
                        style={{
                          width: '30px'
                        }}
                        fileList={fileList}
                       // listType='picture'
                        name="audit_agent_image"
                        onPreview={handlePreview}
                        capture='environment'
                        accept='.png,.jpg,.jpeg'
                        onChange={(e) => {
                          handleChangenew(e);
                        }}>
                        {fileList.length >= 1 ? null : uploadButton}
                      </Upload>
                    </div>
                    <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                      <img
                        alt='example'
                        style={{
                          width: '30px'
                        }}
                        src={previewImage}
                      />
                    </Modal>
                  </Form.Item>
                </Col>
              
                <Col md={{span: 7}} xs={{span: 16}}>
                  <Form.Item
                    name='training_document'
                    label='Training Document'
                    getValueFromEvent={getFiledoc}
                    alt='No image'
                    >
                    <div style={{display: 'flex', direction: 'col'}}>
                      {state?.id && fileListdoc?.length === 0 ? (
                        state?.training_document ? (
                          <iframe style={{paddingRight: '3px'}} width={100} src={state?.training_document ?? ''}  alt='No image' />
                        ) : (
                          'No Image Available'
                        )
                      ) : (
                        <></>
                      )}
                      <Upload
                        {...propstraining}
                        fileList={fileListdoc}
                        // listType='picture-card'
                        name="training_document"
                        onPreview={handlePreviewDoc}
                        capture='environment'
                        accept='.png,.jpg,.jpeg,.pdf'
                        onChange={(e) => {
                          handleChangetrain(e);
                        }}>
                        {fileListdoc.length >= 1 ? null : uploadButton1}
                      </Upload>
                    </div>
                    <Modal open={previewOpenDoc} title={previewTitleDoc} footer={null} onCancel={handleDocCancel}>
                      <iframe
                        alt='example'
                        style={{
                          width: '100%'
                        }}
                        src={previewDoc}
                      />
                    </Modal>
                  </Form.Item>
                </Col>

                </Row>                             
              </Row>
              <Tabs centered
                type='card'
                defaultActiveKey="1"
              //  onChange={callback}
              >
                <TabPane tab="Outlet" key="1">
                      
                  <Col span={23}>
                    {formData.category !== 0 ? formData.category
                      .filter(
                        (li) =>
                          li?.subcategory !== undefined &&
                          li?.subcategory.length > 0
                      )
                      .map((cat, i) => {
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
                            <Panel accordion
                              defaultActiveKey={['1','2','3','4','5','6','7','8','9']}
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
                                    // disabled
                                    readOnly
                                    style={{
                                      justifyContent: "space-between",
                                      width: "50px",
                                      height: "50%"
                                      // width: '30%',
                                    }}
                                    value={cat.category_mark}
                                    name='category_mark'
                                    />
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
                                {cat?.subcategory !== undefined
                                  ? cat.subcategory.map((sub, j) => {
                                    if (
                                      sub.auditpoint !== undefined &&
                                      sub.auditpoint.length > 0
                                    ) {
                                      return (
                                        <Panel
                                        defaultActiveKey={['1','2','3','4','5','6','7','8','9']}
                                          key={j}
                                          header={
                                            <div
                                              style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                justifyContent:
                                                  "space-between",
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
                                                            style ={{fontWeight:'bold'}}
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
                                                                disabled
                                                                className="mx-1 my-1"
                                                                type="number"
                                                                min={"0"}
                                                                max="99"
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
                                                              md={{ span: 2 }}
                                                              xs={{ span: 16 }}
                                                            >
                                                              <span className=" mx-2 my-2">
                                                                CAPA Score
                                                              </span>
                                                              
                                                              <Input
                                                                readOnly
                                                                className="mx-1 my-1"
                                                                type="number"
                                                                style={{width:'50px',height:'35px',background:'#F5A60B',color: "#000000" }}
                                                                key={k}
                                                                name="capa_score"
                                                                value={
                                                                  ap.capa_mark
                                                                }
                                                                placeholder=""
                                                              />
                                                            </Col>
                                                                                                                   
                                                            <Col
                                                              md={{ span: 2 }}
                                                              xs={{ span: 16 }}
                                                            >
                                                              <span className=" mx-2 my-2">
                                                                Actual Score
                                                              </span>
                                                            <Input
                                                                                                                                                                           
                                                                className="mx-1 my-1"
                                                                required='required'
                                                                type="number"
                                                                min={ap.capa_mark}
                                                                max={ap.auditpoint_mark}
                                                                pattern= '/^[5-9][0-9]{9}$/g,'
                                                                style={{
                                                                  width:
                                                                    "70px"
                                                                }}
                                                                key={k}
                                                               
                                                                onChange={(
                                                                  e
                                                                ) =>
                                                                handleScoreChange(i, j, k, e)
                                                                }
                                                                name="score"
                                                                // value={ap.auditpoint_mark}
                                                                placeholder=""
                                                              />           
                                                              </Col>                                                      
                                                            <Col
                                                              md={{ span: 2 }}
                                                              xs={{ span: 16 }}
                                                            >
                                                              <span className=" mx-2 my-2">
                                                                Image
                                                              </span>

                                                              <Upload key={k}
                                                                {...props}
                                                              //  fileList={fileList}
                                                           
                                                                name="file_name"
                                                                listType="picture"
                                                                onPreview={handlePreview}
                                                                capture="environment"
                                                                maxCount={1}
                                                                accept=".jpeg,.png,.jpg,.jpeg,.gif"
                                                                onChange={(e) => {
                                                                  handleChange(
                                                                    i, j, k, e);
                                                                }}
                                                              >                                
                                                                {uploadButtons}
                                                              </Upload>
                                                              <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                                                                  <img
                                                                    alt='example'
                                                                    style={{
                                                                      width: '100%'
                                                                    }}
                                                                    src={previewImage}
                                                                  />
                                                                </Modal>
                                                              
                                                            </Col>
 
                                                            <Col
                                                              md={{ span: 6 }}
                                                              xs={{ span: 16 }}
                                                            >
                                                              <span className=" mx-2 my-2">
                                                                Remarks
                                                              </span>
                                                              <Tooltip placement="topLeft" title={ap.remarks}> <span className='mx-2'>
                                                                <Input
                                                                // disabled={editMode}
                                                                className="mx-1 my-1"
                                                                type="text"
                                                                style={{
                                                                  width:
                                                                    "100%"
                                                                }}
                                                                key={k}
                                                                onChange={(
                                                                  e
                                                                ) =>
                                                                  handlePointChange(i, j, k, e)
                                                                }
                                                                name="remarks"
                                                              /> </span></Tooltip>
                                                             
                                                            </Col>
                                                            <Col
                                                              md={{ span: 1 }}
                                                              xs={{ span: 1 }}
                                                            >                                                          
                                                              <Input
                                                                type="hidden"                                                            
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
                                                                name="auditmaster_id"
                                                                value={
                                                                  ap.auditmaster_id
                                                                }
                                                                placeholder=""
                                                              />
                                                            </Col>
                                                         
                                                       
                                                          </Row>
                                                          {ap.error_status == 1 && ap.error_message != '' && (
                                                            <span style={{color:'red'}} key={k} className="mx-1">
                                                              {ap.error_message}
                                                            </span>
                                                          )}
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
                            {/* </Panel>
              </Collapse>  */}
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
                          accordion
                          key={i}
                          defaultActiveKey={['1','2','3','4','5','6','7','8','9']}
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
                            header={
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                 
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
                              style={{  background: "#F5A60B"}}
                              key={i}
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
                                                          style = {{fontWeight:'bold'}}
                                                        >
                                                         {ap.name}
                                                        </span>
                                                        <Row>
                                                          <Col md={{ span: 3 }} xs={{ span: 13 }} >
                                                            <span className=" mx-2 my-2"> Eligible </span>
                                                            <Radio.Group name="criteria" key={k}
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
                                                              <Radio value='yes'>Yes</Radio>
                                                              <Radio value='no'>No</Radio>
                                                            </Radio.Group>

                                                          </Col>
                                                         <Row>
                                                          <Col md={{ span: 7 }} xs={{ span: 6 }}>
                                                            <span className=" mx-2 my-2">Image </span>
                                                            <Upload key={k}
                                                            
                                                              {...props}
                                                            //  fileList={fileList}
                                                              maxCount={1}
                                                              name="file_name"
                                                              listType="picture"
                                                              onPreview={handlePreview}
                                                              capture="environment"
                                                              accept=".jpeg,.png,.jpg,.jpeg.gif"
                                                              onChange={(e) => {
                                                                handleChangeDep(
                                                                  i, j, k, e);
                                                              }}
                                                            >
                                                              {uploadButtons}
                                                            </Upload>
                                                            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                      <img
                        alt='example'
                        style={{
                          width: '100%'
                        }}
                        src={previewImage}
                      />
                    </Modal>
                                                          </Col>
                                                          <Row>
                                                          <Col
                                                            md={{ span: 5 }}
                                                            xs={{ span: 0 }}
                                                          >
                                                            {" "}
                                                          </Col>
                                                          <Col
                                                            md={{ span: 15 }}
                                                            xs={{ span: 15 }}
                                                          >
                                                            <span className=" mx-2 my-2">
                                                              Remarks
                                                            </span>
                                                            <Input
                                                              // disabled={editMode}
                                                              className="mx-1 my-1"
                                                              type="text"
                                                              style={{
                                                                width:
                                                                  "100%"
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
                                                              name="remarks"
                                                              // value={ap.auditpoint_mark}
                                                              placeholder=""
                                                            />
                                                          </Col>
                                                          <Col
                                                            md={{ span: 1 }}
                                                            xs={{ span: 1 }}
                                                          >
                                                           
                                                            <Input
                                                           
                                                              type="hidden"
                                                             
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
                                                              name="auditmaster_id"
                                                              value={
                                                                ap.auditmaster_id
                                                              }
                                                              placeholder=""
                                                            />
                                                          </Col>
                                                          </Row>
                                                          </Row>
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
              {/* </Panel></Collapse> */}
              </TabPane>
           
      </Tabs>
              <div
                className="d-flex justify-content-end align-items-center "
                style={{ width: "96%",padding:'15px' }}
              >
                <Col span={24}>
                <Row gutter={[15,15]} style={{ justifyContent:'center'}}>
                  <Col span={5}>
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
                    onClick={
                      isEmpty(setType) ? () => { } : handleSubmit(onFinish)
                    }
                    loading={loading}
                  //disabled={!submitStatus}
                  >
                    {"Add"}
                  </Button>
                </Form.Item>
                </Col>
                </Row>
                </Col>
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
     
    </>
  );
}

export default AuditNewEntryForm;