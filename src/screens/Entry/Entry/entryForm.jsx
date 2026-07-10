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
  Upload,
  Modal,
  Image
} from "antd";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {  
  getEquipmentMaster,
  getDefinitionsList
} from "../../../@app/subMaster/subMasterSlice";
import {addEntryForm} from "../../../@app/entry/entrySlice";
import {
  getStates, 
} from "../../../@app/master/masterSlice";
import { useLocation } from "react-router-dom";
import messageToast from "../../../components/messageToast/messageToast";
import {PlusOutlined } from "@ant-design/icons";
import { baseURL } from "../../../api/baseURL";

function entryForm() {

  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    dispatch(getStates());
  }, [dispatch]);

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

 const { userData } = useSelector((state) => state.auth);

 const getBase64 = (file) =>
  new Promise((resolve, reject) => {
 const reader = new FileReader();
 reader.readAsDataURL(file);
 reader.onload = () => resolve(reader.result);
 reader.onerror = (error) => reject(error);
});

const getFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};
  
  const {
    state: { data: defaultValue}
  } = useLocation();

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
    action: `${baseURL}entry-upload`,
    headers: {
      authorization: "authorization-text"
    }
  };

  
  useEffect(() => {
    dispatch(getEquipmentMaster());
  }, []);


  const [date, setDate] = useState('');

  const onChangeDate = (e) => {
      const inputDate = e.target.value;
      // Format inputDate as needed here
      setDate(inputDate);
  };

  useEffect(() => {
    dispatch(getDefinitionsList());
  }, []);

  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);
 
  const { savingEquipmentMaster } = useSelector((state) => {
    return state.subMaster;
  });

  const onFinish = (data) => {   
    dispatch(      
        addEntryForm({
            data: {
              ...data,
              entry_by: userData.data?.id ?? "0",
              image: image ?? 'No image',             
            }
          })
    ).then(({ message, status, statusText }) => {
      if (status == 200) {
        messageToast({
          message: message ?? statusText,
          status,
          title: "Entry Status"
        });
        navigate("/Entry");
        form.resetFields();
      }
      if (status == 400) {
        // setApiError("Please fill all values");
        messageApi.open({
          type: "warning",
          content: "Entry already exists",
          className: "custom-class",
          style: {
            marginTop: "28vh",
            color: "#d91616",
            fontWeight: "bold"
          }
        });
        return false;
      }
    });
  };

  const handleClickBack = () => {
    navigate("/Entry");
  };

  const handleOnChange = (e) => {
    if (e.target.name === 'mobileno' || e.target.name === 'landlineno' || e.target.name === 'quantity') {
      return form.setFieldsValue({
        [e.target.name]: e.target.value.replace(/[^0-9 ./]/g, '')
      });
    } 
   
  };

  const handleChangenew = (e) => {
    setFileList(e?.fileList);
    setImage(e?.file?.response?.filename ?? '');
    form.setFieldsValue({image: e?.file?.response?.filename ?? ''});
  };

  return (
    <>
      {contextHolder}
      <Card>
        <Row style={{ justifyContent: "center" }}>
          <Col span={24}>
            <Form
              //onFieldsChange={() => setShowDialog(true)}
              name="basic"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              onFinish={onFinish}
              disabled={savingEquipmentMaster}
              form={form}
              initialValues={{
                status: defaultValue?.status ?? 1,
                name: defaultValue?.name,
                company_name :defaultValue?.company_name,
                ...defaultValue
              }}
              autoComplete="off"
            >
              <Row gutter={[15, 0]}>
              <Card title="EXPO" headStyle={{ backgroundColor: "#b8ad9a" }} size="small">
              <Descriptions bordered size="small">                      
                  <Descriptions.Item
                    name="name"
                    label={"Name *"}
                    className={`custom-background ${show ? "show" : ""}`}
                    style={{ Height:"40px",color: "#f70707" }}
                  >
                    <Col>
                      <Form.Item name="name"  
                      rules={[
                      { required: true, message: "Please Enter Name" }
                    ]}>
                      <Input
                      name="name"
                      style={{
                        width: "250px",
                        height: "34px",
                        border: "2px solid #f5a60b",
                        borderRadius: "10px"
                      }}
                      defaultValue={state?.name}
                     // onChange={onChangeName}
                      placeholder=" Enter Name"
                    />
                      </Form.Item>
                    </Col>
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={"Date"}
                    style={{Height:"40px" }}
                    className={`custom-background ${show ? "show" : ""}`}                   
                  >
                    <Col>
                      <Form.Item name="date" 
                       >
                      <Input
                          type="date"
                          name="date"
                          style={{
                              width: "250px",
                              height: "34px",
                              border: "2px solid #f5a60b",
                              borderRadius: "10px"
                          }}
                          placeholder="Date"
                          value={date}
                          defaultValue={state?.date}
                          onChange={onChangeDate}
                      />
                      </Form.Item>
                    </Col>
                  </Descriptions.Item>                                    
                 </Descriptions>    
                </Card>                             
               <Card title="Company Details" headStyle={{ backgroundColor: "#b8ad9a" }} size="small">
                 <Descriptions bordered size="small">      
                <Descriptions.Item
                    label={"Company Name *"}                   
                    className={`custom-background ${show ? "show" : ""}`}
                    style={{ Height:"40px",color: "#f70707" }}
                  >
                    <Col>
                      <Form.Item name="company_name"
                       rules={[
                        { required: true, message: "Please Enter Company Name" }
                      ]}
                      >
                      <Input
                      name="company_name"
                      style={{
                        width: "250px",
                        height: "34px",
                        border: "2px solid #f5a60b",
                        borderRadius: "10px"
                      }}
                      defaultValue={state?.company_name}
                      //onChange={onChangeCompanyname}
                      placeholder=" Enter Companyname"
                    />
                      </Form.Item>
                    </Col>
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={"Segment"}
                    style={{ }}
                    className={`custom-background ${show ? "show" : ""}`}
                  >
                    <Col>
                      <Form.Item name="segment">
                      <Input
                      name="segment"
                      style={{
                        width: "250px",
                        height: "34px",
                        border: "2px solid #f5a60b",
                        borderRadius: "10px"
                      }}
                      defaultValue={state?.segment}
                     // onChange={onremarks}
                      placeholder=" Enter Segment"
                    />
                      </Form.Item>
                    </Col>
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={"Type"}
                    style={{ }}
                    className={`custom-background ${show ? "show" : ""}`}
                  >
                    <Col>
                      <Form.Item name="type">
                      <Input
                      name="type"
                      style={{
                        width: "250px",
                        height: "34px",
                        border: "2px solid #f5a60b",
                        borderRadius: "10px"
                      }}
                      defaultValue={state?.type}
                     // onChange={onremarks}
                      placeholder="Enter Type"
                    />
                      </Form.Item>
                    </Col>
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={"Address"}
                    style={{ }}
                    className={`custom-background ${show ? "show" : ""}`}
                  >
                    <Col>
                      <Form.Item name="address">
                      <Input
                      name="address"
                      style={{
                        width: "250px",
                        height: "34px",
                        border: "2px solid #f5a60b",
                        borderRadius: "10px"
                      }}
                      defaultValue={state?.address}
                     // onChange={onremarks}
                      placeholder=" Enter Address"
                    />
                      </Form.Item>
                    </Col>
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={"City"}
                    style={{ }}
                    className={`custom-background ${show ? "show" : ""}`}
                  >
                    <Col>
                      <Form.Item name="city">
                      <Input
                      name="city"
                      style={{
                        width: "250px",
                        height: "34px",
                        border: "2px solid #f5a60b",
                        borderRadius: "10px"
                      }}
                      defaultValue={state?.city}
                     // onChange={onremarks}
                      placeholder=" Enter City"
                    />
                      </Form.Item>
                    </Col>
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={"State"}
                    style={{ }}
                    className={`custom-background ${show ? "show" : ""}`}
                  >
                    <Col>
                      <Form.Item name="state">
                      <Input
                      name="state"
                      style={{
                        width: "250px",
                        height: "34px",
                        border: "2px solid #f5a60b",
                        borderRadius: "10px"
                      }}
                      defaultValue={state?.state}
                     // onChange={onremarks}
                      placeholder=" Enter State"
                    />
                      </Form.Item>
                    </Col>
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={"Country"}
                    style={{ }}
                    className={`custom-background ${show ? "show" : ""}`}
                  >
                    <Col>
                      <Form.Item name="country">
                      <Input
                      name="country"
                      style={{
                        width: "250px",
                        height: "34px",
                        border: "2px solid #f5a60b",
                        borderRadius: "10px"
                      }}
                      defaultValue={state?.country}
                     // onChange={onremarks}
                      placeholder=" Enter Country"
                    />
                      </Form.Item>
                    </Col>
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={"Pincode"}
                    style={{ }}
                    className={`custom-background ${show ? "show" : ""}`}
                  >
                    <Col>
                      <Form.Item name="pincode">
                      <Input
                      name="pincode"
                      style={{
                        width: "250px",
                        height: "34px",
                        border: "2px solid #f5a60b",
                        borderRadius: "10px"
                      }}
                      defaultValue={state?.pincode}
                     // onChange={onremarks}
                      placeholder=" Enter Pincode"
                    />
                      </Form.Item>
                    </Col>
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={"Website"}
                    style={{ }}
                    className={`custom-background ${show ? "show" : ""}`}
                  >
                    <Col>
                      <Form.Item name="website">
                      <Input
                      name="website"
                      style={{
                        width: "250px",
                        height: "34px",
                        border: "2px solid #f5a60b",
                        borderRadius: "10px"
                      }}
                      defaultValue={state?.website}
                     // onChange={onremarks}
                      placeholder=" Enter Website"
                    />
                      </Form.Item>
                    </Col>
                  </Descriptions.Item>
                  </Descriptions>  
                  </Card>  
                  <Card title="Contact Person" headStyle={{ backgroundColor: "#b8ad9a" }} size="small">
                  <Descriptions bordered size="small">    
                <Descriptions.Item
                    label={"Contact Person Name *"}
                    style={{ Height:"40px",color: "#f70707" }}
                    className={`custom-background ${show ? "show" : ""}`}
                  >
                    <Col>
                      <Form.Item name="contactpersonname"  
                      rules={[
                      { required: true, message: "Please Enter Contact Person Name" }
                    ]}>
                      <Input
                      name="contactpersonname"
                      style={{
                        width: "250px",
                        height: "34px",
                        border: "2px solid #f5a60b",
                        borderRadius: "10px"
                      }}
                      defaultValue={state?.contact_person_name}
                     // onChange={onremarks}
                      placeholder=" Enter Contact Person Name"
                    />
                      </Form.Item>
                    </Col>
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={"Designation"}
                    style={{ }}
                    className={`custom-background ${show ? "show" : ""}`}
                  >
                    <Col>
                      <Form.Item name="designation">
                      <Input
                      name="designation"
                      style={{
                        width: "250px",
                        height: "34px",
                        border: "2px solid #f5a60b",
                        borderRadius: "10px"
                      }}
                      defaultValue={state?.designation}
                     // onChange={onremarks}
                      placeholder=" Enter Designation"
                    />
                      </Form.Item>
                    </Col>
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={"Mobile Number"}                    
                    className={`custom-background ${show ? "show" : ""}`}
                  >
                    <Col>
                      <Form.Item name="mobileno"
                      rules={[
                      {
                       // pattern: /^[5-9][0-9]{9}$/g, //do not allow above 10digit and string
                       //pattern: /^[5-9][0-9]{9}$/,//do not allow above 10digit and string
                     //   pattern: /^[5-9][0-9]{9,}$/, //allow above 10digit                      
                        message: 'Invalid Phone Number'
                      }
                    ]}>
                      <Input
                      name="mobileno"
                      style={{
                        width: "250px",
                        height: "34px",
                        border: "2px solid #f5a60b",
                        borderRadius: "10px"
                      }}
                      defaultValue={state?.mobile_number}
                      onChange={handleOnChange}
                      placeholder=" Enter Mobile Number"
                    />
                      </Form.Item>
                    </Col>
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={"LandLine Number"}
                    style={{ }}
                    className={`custom-background ${show ? "show" : ""}`}
                  >
                    <Col>
                      <Form.Item name="landlineno"
                       rules={[
                        {
                          //pattern: /^[5-9][0-9]{9}$/g,
                          message: 'Invalid Phone Number'
                        }
                      ]}>
                      <Input
                      name="landlineno"
                      style={{
                        width: "250px",
                        height: "34px",
                        border: "2px solid #f5a60b",
                        borderRadius: "10px"
                      }}
                      defaultValue={state?.landline_number}
                      onChange={handleOnChange}
                      placeholder=" Enter Landline Number"
                    />
                      </Form.Item>
                    </Col>
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={"Mail ID"}
                    style={{ }}
                    className={`custom-background ${show ? "show" : ""}`}
                  >
                    <Col>
                      <Form.Item name="mailid">
                      <Input
                      name="mailid"
                      style={{
                        width: "250px",
                        height: "34px",
                        border: "2px solid #f5a60b",
                        borderRadius: "10px"
                      }}
                      defaultValue={state?.mail_id}
                     // onChange={onremarks}
                      placeholder=" Enter Mail ID"
                    />
                      </Form.Item>
                    </Col>
                  </Descriptions.Item>
                  </Descriptions>
                  </Card>  
                  <Card title="Inquiry Info" headStyle={{ backgroundColor: "#b8ad9a" }} size="small">
                  <Descriptions bordered size="small">    
                  <Descriptions.Item
                    label={"Intersested in Sample / Order"}
                    style={{  }}
                    className={`custom-background ${show ? "show" : ""}`}
                  >
                    <Col>
                      <Form.Item name="inquiryinfo">
                      <Input
                      name="inquiryinfo"
                      style={{
                        width: "250px",
                        height: "34px",
                        border: "2px solid #f5a60b",
                        borderRadius: "10px"
                      }}
                      defaultValue={state?.intersested_in_sample_or_order}
                     // onChange={onremarks}
                      placeholder=" Enter Inquiry Info"
                    />
                      </Form.Item>
                    </Col>
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={"Product Name"}
                    style={{ }}
                    className={`custom-background ${show ? "show" : ""}`}
                  >
                    <Col>
                      <Form.Item name="productname">
                      <Input
                      name="productname"
                      style={{
                        width: "250px",
                        height: "34px",
                        border: "2px solid #f5a60b",
                        borderRadius: "10px"
                      }}
                      defaultValue={state?.product_name}
                     // onChange={onremarks}
                      placeholder=" Enter Product Name"
                    />
                      </Form.Item>
                    </Col>
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={"Product Category"}
                    style={{ }}
                    className={`custom-background ${show ? "show" : ""}`}
                  >
                    <Col>
                      <Form.Item name="productcategory">
                      <Input
                      name="productcategory"
                      style={{
                        width: "250px",
                        height: "34px",
                        border: "2px solid #f5a60b",
                        borderRadius: "10px"
                      }}
                      defaultValue={state?.product_category}
                     // onChange={onremarks}
                      placeholder=" Enter Product Category"
                    />
                      </Form.Item>
                    </Col>
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={"UOM"}
                    style={{ }}
                    className={`custom-background ${show ? "show" : ""}`}
                  >
                    <Col>
                      <Form.Item name="uom">
                      <Input
                      name="uom"
                      style={{
                        width: "250px",
                        height: "34px",
                        border: "2px solid #f5a60b",
                        borderRadius: "10px"
                      }}
                      defaultValue={state?.uom}                     
                      placeholder=" Enter UOM"
                    />
                      </Form.Item>
                    </Col>
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={"Quantity"}
                    style={{ }}
                    className={`custom-background ${show ? "show" : ""}`}
                  >
                    <Col>
                      <Form.Item name="quantity">
                      <Input
                      name="quantity"
                      style={{
                        width: "250px",
                        height: "34px",
                        border: "2px solid #f5a60b",
                        borderRadius: "10px"
                      }}
                      defaultValue={state?.quantity}
                      onChange={handleOnChange}
                      placeholder=" Enter Quantity"
                    />
                      </Form.Item>
                    </Col>
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={"Timeline for Purchase"}
                    style={{ }}
                    className={`custom-background ${show ? "show" : ""}`}
                  >
                    <Col>
                      <Form.Item name="timeline">
                      <Input
                      name="timeline"
                      style={{
                        width: "250px",
                        height: "34px",
                        border: "2px solid #f5a60b",
                        borderRadius: "10px"
                      }}
                      defaultValue={state?.timeline_for_purchase}
                     // onChange={onremarks}
                      placeholder=" Enter Timeline"
                    />
                      </Form.Item>
                    </Col>
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={"Spe.Req or Spec"}
                    style={{ }}
                    className={`custom-background ${show ? "show" : ""}`}
                  >
                    <Col>
                      <Form.Item name="requirment">
                      <Input
                      name="requirment"
                      style={{
                        width: "250px",
                        height: "34px",
                        border: "2px solid #f5a60b",
                        borderRadius: "10px"
                      }}
                      defaultValue={state?.spe_req_or_specifications}
                     // onChange={onremarks}
                      placeholder=" Enter Special Requirements"
                    />
                      </Form.Item>
                    </Col>
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={"Delivery Destination"}
                    style={{ }}
                    className={`custom-background ${show ? "show" : ""}`}
                  >
                    <Col>
                      <Form.Item name="deliverydestination">
                      <Input
                      name="deliverydestination"
                      style={{
                        width: "250px",
                        height: "34px",
                        border: "2px solid #f5a60b",
                        borderRadius: "10px"
                      }}
                      defaultValue={state?.delivery_destination}
                     // onChange={onremarks}
                      placeholder=" Enter Delivery Destination"
                    />
                      </Form.Item>
                    </Col>
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={"Attachement"}
                    style={{ width: "150px" }}
                    getValueFromEvent={getFile}
                  >
                    <div style={{display: 'flex', direction: 'col'}}>
                    {defaultValue?.id && fileList?.length === 0 ? (
                        defaultValue?.image ? (
                          <Image
                            style={{ paddingRight: "10px" }}
                            width={100}
                            src={defaultValue?.image}
                            alt="No Image"
                          />
                        ) : (
                          "No Image Available"
                        )
                      ) : (
                        <></>
                      )}
                      <Upload
                        {...props}
                        style={{
                          width: '30px'
                        }}
                        fileList={fileList}
                        capture='camera'
                        listType='picture'
                        name="image"
                        accept=".jpeg,.png,.jpg,.jpeg.gif"
                        onPreview={handlePreview}
                        // beforeUpload={() => {
                        //   // Prevent files from being selected
                        //   return false;
                        // }}                        
                        multiple
                        onChange={(e) => {
                          handleChangenew(e);
                        }}
                      >
                        {fileList.length >= 1 ? null : uploadButton}
                        {/* <Button icon={<UploadOutlined />}>Upload</Button> */}
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
                  </Descriptions>    
                  </Card>  
                <Col span={24}>
                <Form.Item>
                        <Button
                          onClick={handleClickBack}
                          disabled={savingEquipmentMaster}
                        >
                          Back
                        </Button>
                      </Form.Item>                
                    <Col                     
                      //style={{ textAlign: "right" }}
                      className="d-flex align-items-center justify-content-end mt-3"
                    >
                      <Form.Item 
                      //className="mx-2"
                      >
                        <Button
                          className="orangeFactory"
                          type="primary"
                          htmlType="submit"
                          disabled={savingEquipmentMaster}
                          loading={savingEquipmentMaster}
                        >
                          {
                           "Entry Completed"
                            //
                          }
                        </Button>
                      </Form.Item>
                      </Col>
                      {/* 
                    <Col span={12}> */}
                    
                    {/* </Col> */}
                  {/* </Row> */}
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Card>
    </>
  );
}

export default entryForm;
