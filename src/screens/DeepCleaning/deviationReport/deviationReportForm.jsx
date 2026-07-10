import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Col,
  Row,
  Form,
  Descriptions,
  message,
  Input,
  Typography,
  TimePicker,
  Select,
  Upload,
  Modal
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

  const format = "HH:mm:ss";
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
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
    state: { data: defaultValue, isEdit = false }
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
              id: state?.id, 
              outlet_id: state?.outlet_ids_string,
              entry_by:userData.data?.id ?? "0",      
              equipment:state?.equipment,                         
              time:  selectedTime,
              deep_clean_status : status,
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
        if (status == 400){
           messageApi.open({
           type: 'warning',
           content: 'Deep Clean Entry already exists',
           className: 'custom-class',             
           style: {
             marginTop: '28vh',
             color:'#d91616',
             fontWeight:'bold'
             },
         });
         return false }
    });
  };

  const [selectedTime, setSelectedTime] = useState("");

  const uploadButton = (
    <Button style={{display: 'flex', direction: 'row'}} icon={<PlusOutlined style={{marginTop: '3px', marginRight: '4px'}} />}>
      <div
        style={{
          marginLeft: '3px'
        }}>
        {state?.id ? 'Upload Image' : 'Upload'}
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
    setImage(e?.file?.response?.image ?? '');
    form.setFieldsValue({image: e?.file?.response?.image ?? ''});
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
      {contextHolder}
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
                ...defaultValue
              }}
              autoComplete="off"
            >
              <Row gutter={[15, 0]}>
              <Descriptions bordered size="small">
              <Descriptions.Item
                    label={"Call Make By"}
                    className={`custom-background ${show ? "show" : ""}`}
                  >
                    {loginType == 2 ? (
                      <Typography>
                        <Card
                          style={{
                            fontWeight: "bold",
                            width: "250px",
                            height: "40px",
                            background: "#34b1aa",
                            color: "#ffffff"
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
                            background: "#34b1aa",
                            color: "#ffffff"
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
                        background: "#cdd4cf",
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
                        background: "#cdd4cf",
                        color: "#000000"
                      }}
                    />
                  </Descriptions.Item>
               
                <Descriptions.Item
                    label={"Equipment"}
                    style={{ width: "150px" }}
                    className={`custom-background ${show ? "show" : ""}`}
                  >
                      <Input
                      name="outlet_name"
                      placeholder="Outlet Name"
                      defaultValue={state.equipment_name}
                      readOnly
                      style={{
                        width: "250px",
                        background: "#cdd4cf",
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
                      {/* {state?.id && fileList?.length === 0 ? (
                        state?.image ? (
                          <Image style={{paddingRight: '3px'}} width={'10px'} src={state?.image ?? ''}  alt='No image' />
                        ) : (
                          'No Image Available'
                        )
                      ) : (
                        <></>
                      )} */}
                      <Upload
                        {...props}
                        style={{
                          width: '30px'
                        }}
                        fileList={fileList}
                        listType='picture'
                        name="image"
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
                </Descriptions>
               
                <Col span={24}>
                  <Row gutter={[15, 15]} style={{ justifyContent: "end" }}>
                    <Col
                      span={12}
                      style={{ textAlign: "right" }}
                      className="d-flex align-items-center justify-content-end mt-3"
                    >
                      <Form.Item className="mx-2">
                        <Button
                          className="orangeFactory"
                          type="primary"
                          htmlType="submit"
                          disabled={savingEquipmentMaster}
                          loading={savingEquipmentMaster}
                        >
                          {
                            isEdit ? "add" : "Cleaning Complete"
                            //
                          }
                        </Button>
                      </Form.Item>
                      {/* </Col>
                    <Col span={12}> */}
                      <Form.Item>
                        <Button
                          onClick={handleClickBack}
                          disabled={savingEquipmentMaster}
                        >
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

export default deepCleaningForm;
