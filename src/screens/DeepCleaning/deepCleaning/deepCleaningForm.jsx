import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Col,
  Row,
  Form,
  Descriptions,
  //message,
  Input,
  Typography,
  TimePicker,
  Select,
  Upload,
  Modal,
  // Image
} from "antd";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  addDeepCleanEntry,
  getEquipmentMaster,
  getDefinitionsList,
} from "../../../@app/subMaster/subMasterSlice";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
import messageToast from "../../../components/messageToast/messageToast";
import { PlusOutlined } from "@ant-design/icons";
import { map } from "ramda";
import { baseURL } from "../../../api/baseURL";


const { Option } = Select;
function deepCleaningForm() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { state } = useLocation();
  const {
    state: { data: defaultValue }
  } = useLocation();
 
  const format = "HH:mm:ss";
  const dispatch = useDispatch();
  //const [messageApi, contextHolder] = message.useMessage();
   const loginType = useSelector((state) => state.auth.type);
   const [previewImage, setPreviewImage] = useState('');
   const [fileList, setFileList] = useState([]);
   const [image, setImage] = useState('');

   const [previewOpen, setPreviewOpen] = useState(false);
   const [previewTitle, setPreviewTitle] = useState('');
   const handleCancel = () => setPreviewOpen(false);
   const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const getBase64 = (file) =>
   new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = (error) => reject(error);
});

useEffect(() => {
  dispatch(getDefinitionsList());
}, []);

const {
  gettingDefinitionsList,
  getDefinitionsListResponse: { data: def }
} = useSelector((state) => {
  return state.subMaster;
});
  // const emp_map = useSelector(
  //   (state) =>
  //     state.auth.userData.data && state.auth.userData.data.employee_mapping
  // );
  const {
    state: {isEdit = false }
  } = useLocation();

  const current = new Date();
  const year = current.getFullYear();
  const month = String(current.getMonth() + 1).padStart(2, "0");
  const day = String(current.getDate()).padStart(2, "0");
  const currentdate = [year, month, day].join("-");

  const getFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  useEffect(() => {
    dispatch(getEquipmentMaster());
  }, []);



  useEffect(() => {
    dispatch(getDefinitionsList());
  }, []);

  const [status, setStatus] = useState();
  const [remarks,setRemarks] = useState();
  const [comments,setComments] = useState();
 
  const oncomments = (e) => {
    setComments(e.target.value);
    return comments;
  };
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  const { savingEquipmentMaster } = useSelector((state) => {
    return state.subMaster;
  });

  const onFinish = () => {
     dispatch(      
      addDeepCleanEntry({
            data: {            
              id: defaultValue.id,
              outlet_id: state?.outlet_ids_string,
              entry_by:userData.data?.id ?? "0",      
              equipment:state?.equipment,            
              check_list_type:state?.check_list_type,            
              time_lot:state?.time_lot,            
              functional_type:state?.functional_type,                         
              time:  selectedTime,
              deep_clean_status : status,
              schedule_time : state?.schedule_time,
              comments : comments,
              remarks : remarks,
              image: image ?? 'No image',       
            }
          })
      ).then(({ message, status, statusText }) => {
      if (status === 200) {
          messageToast({
          message: message ?? statusText,
          status,
          title: "Deep Clean Entry Status"
        });    
        navigate("/deepCleaning");
        form.resetFields();
      }
      else{
      messageToast({
        message: message ?? statusText,
        status,
        title: "Deep Clean Entry Status"
      });  } 
        
    });
  };

  const [selectedTime, setSelectedTime] = useState("");

  const uploadButton = (
    <Button style={{display: 'flex', direction: 'row'}} icon={<PlusOutlined style={{marginTop: '3px', marginRight: '4px'}} />}>
      <div
        style={{
          marginLeft: '3px'
        }}>
        {state?.id ? 'Upload' : 'Upload'}
      </div>
    </Button>
  );

  const props = {
    name: "file_name",
    action: `${baseURL}deep-clean-upload`,
    headers: {
      authorization: "authorization-text"
    }
  };

  const handleChangenew = (e) => {
    setFileList(e?.fileList);
    setImage(e?.file?.response?.filename ?? '');
    form.setFieldsValue({image: e?.file?.response?.filename ?? ''});
  };

  let formattedTime;
  const onDurationChange = (e) => {
    const hours = e["$d"].getHours();
    const minutes = e["$d"].getMinutes();
    const seconds = e["$d"].getSeconds();
    // Format the time as HH:MM:SS
    formattedTime = `${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    setSelectedTime(formattedTime);
  };

  const { userData } = useSelector((state) => state.auth);

  //const empId = userData.data?.id;

  const handleClickBack = () => {
    navigate("/deepCleaning");
  };

  return (
    <>
      {/* {contextHolder} */}
      <Card>
        <Row style={{ justifyContent: "center" }}>
          <Col span={24}>
            <Form
             // onFieldsChange={() => setShowDialog(true)}
              name="basic"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              onFinish={onFinish}
              disabled={savingEquipmentMaster}
              form={form}
              initialValues={{
                status: defaultValue?.status ?? 1,
                id: defaultValue?.id,
                filename: defaultValue?.image,
                comments:defaultValue?.comments,
                ...defaultValue
              }}
              autoComplete="off"
            >
              <Row gutter={[15, 0]}>
              <Col span={24}></Col>
              <Descriptions bordered size="small">
              <Descriptions.Item
                    label={"Entry By"}
                    className={`custom-background ${show ? "show" : ""}`}
                  >
                    {loginType == 2 ? (
                      <Typography>
                        <Card
                          style={{
                            fontWeight: "bold",
                            width: "250px",
                            height: "40px",
                            background: "#c9cfa7",
                            color: "#000000"
                          }}
                        >
                          {userData.data?.name}
                        </Card>
                      </Typography>
                    ) : (
                      <Typography>
                        <Card
                          style={{
                            fontWeight: "bold",
                            width: "250px",
                            height: "40px",
                            background: "#c9cfa7",
                            color: "#000000"
                          }}
                        >
                          Admin
                        </Card>
                      </Typography>
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={"Date"}
                    className={`custom-background ${show ? "show" : ""}`}
                  >
                    <Input
                     // type="date"
                      style={{
                        width: "250px",
                        background: "#c9cfa7",
                        color: "#000000"
                      }}
                      name="date"
                      placeholder="Select date"
                     defaultValue={currentdate}
                     value={dayjs(state?.currentdate).format("DD-MM-YYYY")}                  
                    />
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={"Outlet Name"}
                    className={`custom-background ${show ? "show" : ""}`}
                  >
                    <Input
                      name="outlet_name"
                      placeholder="Outlet Name"
                      defaultValue={state.outlet_name}
                      readOnly
                      style={{
                        width: "250px",
                        background: "#c9cfa7",
                        color: "#000000"
                      }}
                    />
                  </Descriptions.Item>
               
                <Descriptions.Item
                    label={"Particulars Name"}
                    style={{ width: "150px" }}
                    className={`custom-background ${show ? "show" : ""}`}
                  >
                      <Input
                      name="equipment_name"                    
                      defaultValue={state.equipment_name}
                      readOnly
                      style={{
                        width: "250px",
                        background: "#c9cfa7",
                        color: "#000000"
                      }}
                    />
                  
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={"Check List Type"}
                    style={{ width: "150px" }}
                    className={`custom-background ${show ? "show" : ""}`}
                  >
                      <Input
                      name="check_list_type"                     
                      defaultValue={state.check_list_type}
                      readOnly
                      style={{
                        width: "250px",
                        background: "#c9cfa7",
                        color: "#000000"
                      }}
                    />
                  
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={"Time Lot"}
                    style={{ width: "150px" }}
                    className={`custom-background ${show ? "show" : ""}`}
                  >
                      <Input
                      name="time_lot"                     
                      defaultValue={state.time_lot}
                      readOnly
                      style={{
                        width: "250px",
                        background: "#c9cfa7",
                        color: "#000000"
                      }}
                    />
                  
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={"Functional Type"}
                    style={{ width: "150px" }}
                    className={`custom-background ${show ? "show" : ""}`}
                  >
                      <Input
                      name="functional_type"                     
                      defaultValue={state.functional_type}
                      readOnly
                      style={{
                        width: "250px",
                        background: "#c9cfa7",
                        color: "#000000"
                      }}
                    />
                  
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={"Schedule Time"}
                    style={{ width: "150px" }}
                  >
                      <Input
                      name="schedule_time"
                      placeholder="Schedule Time"
                      defaultValue={state.schedule_time}
                      readOnly
                      style={{
                        width: "250px",
                        background: "#c9cfa7",
                        color: "#000000"
                      }}
                    />
                 
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={"Status"}
                    style={{ width: "150px" }}
                    className={`custom-background ${show ? "show" : ""}`}
                  >
                      <Select
                      placeholder="Select"
                      style={{
                        width: "250px",
                        height: "34px",
                        border: "2px solid #f5a60b",
                        borderRadius: "10px"
                      }}
                      name="definition_list"
                      loading={gettingDefinitionsList}
                      onChange={(e) => setStatus(e)}
                      defaultValue={defaultValue?.definition_list}
                      showSearch
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {map(
                        (state) => {
                          return (
                            <Option key={state.id} value={state.id}>
                              {state.def_list_name}
                            </Option>
                          );
                        },
                        def ? def?.filter((e) => e.def_title == "Deep Clean Status") : []
                      )}
                    </Select>
                  
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={"Clean Time"}
                    style={{ width: "150px" }}
                  >
                    <TimePicker
                      placeholder="Time"
                      style={{ width: "170px" }}
                      defaultValue={defaultValue?.time}
                      value={formattedTime}
                      onChange={onDurationChange}
                      format={format}
                      name="time"
                    />
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={"Image"}
                    style={{ width: "150px" }}
                    getValueFromEvent={getFile}
                  >
                    <div style={{display: 'flex', direction: 'col'}}>
                      <Upload
                        {...props}
                        style={{
                          width: '30px'
                        }}
                        fileList={fileList}
                        capture='camera'
                        listType='picture'
                        name="image"
                        accept='.png,.jpg,.jpeg,.gif,'
                        onPreview={handlePreview}
                        // beforeUpload={() => {
                        //   // Prevent files from being selected
                        //   return false;
                        // }}
                        onChange={(e) => {
                          handleChangenew(e);
                        }}
                      >
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
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={"Remarks"}
                    style={{ width: "150px" }}
                    className={`custom-background ${show ? "show" : ""}`}
                  >
                      <Select
                      placeholder="Select"
                      style={{
                        width: "250px",
                        height: "34px",
                        border: "2px solid #f5a60b",
                        borderRadius: "10px"
                      }}
                      name="definition_list"
                      loading={gettingDefinitionsList}
                      onChange={(e) => setRemarks(e)}
                      defaultValue={defaultValue?.definition_list}
                      showSearch
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {map(
                        (state) => {
                          return (
                            <Option key={state.id} value={state.id}>
                              {state.def_list_name}
                            </Option>
                          );
                        },
                        def ? def?.filter((e) => e.def_title == "Deep Clean Remarks") : []
                      )}
                    </Select>
                  
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={"Comments"}
                    style={{ width: "150px" }}
                  >
                      <Input
                      name="comments"
                      placeholder="Comments"
                      defaultValue={defaultValue?.comments}                     
                      onChange={oncomments}
                      style={{
                        width: "250px",
                        //background: "#c9cfa7",
                        color: "#000000"
                      }}
                    />
                 
                  </Descriptions.Item>
                </Descriptions>
               
                <div
                className="d-flex justify-content-end align-items-center"
                style={{ width: "96%", padding: "15px" }}
              >
                <Col span={24}>
                
                  <Row gutter={[15, 15]} style={{ justifyContent: "center" }}>
                    <Col md={{ span: 13 }} xs={{ span: 24 }}>
                      <Form.Item>
                      <Button
                          onClick={handleClickBack}
                          disabled={savingEquipmentMaster}
                          style={{
                            fontWeight: "bold",
                            width: "110px",
                            height: "40px",
                            background: "#ed9609",
                            borderRadius:"10px",
                            color: "#ffffff"
                          }}
                        >
                          Back
                        </Button>
                      </Form.Item>
                    </Col>
                    <Col span={6} style={{ textAlign: "right" }}>
                      <Form.Item
                        wrapperCol={{ offset: 8, span: 16, padding: "15px" }}
                      >
                        <Button
                            style={{
                              fontWeight: "bold",
                              width: "130px",
                              height: "40px",
                              background: "#34b1aa",
                              borderRadius:"10px",
                              color: "#ffffff"
                            }}
                          type="primary"
                          htmlType="submit"
                          disabled={savingEquipmentMaster}
                          loading={savingEquipmentMaster}
                        >
                          {
                            isEdit ? "add" : "Submit"
                            //
                          }
                        </Button>
                      </Form.Item>
                    </Col>

                  
                  </Row>
                </Col>
              </div>               
              </Row>
            </Form>
          </Col>
        </Row>
      </Card>
    </>
  );
}

export default deepCleaningForm;
