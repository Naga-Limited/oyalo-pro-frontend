/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Card,
  Select,
  Button,
  Radio,
  Col,
  Row,
  Form,
  Input,
  Upload,
  Modal,
  Image
} from "antd";
import { useLocation, useNavigate } from "react-router";
import { transStatus } from "../../../util/transStatus";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { last, map, type } from "ramda";
import messageToast from "../../../components/messageToast/messageToast";
import { baseURL } from "../../../api/baseURL";
//simport { Player } from 'video-react'
//import VideoInput from "./VideoInput";
//import {addAuditCategory, updateAuditCategory} from '../../../@app/master/masterSlice';
import {
  getAuditType,
  addAuditfile,
  updateAuditfile
} from "../../../@app/master/masterSlice";
import ConfirmOnExit from "../../../components/confirmOnExit/ConfirmOnExit";
//import AuditPointList from '../auditPointList';
const { Option } = Select;
function AuditOverallTrainingForm() {
  const {
    state: { data: defaultValue = {}, isEdit = false }
  } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const type_ID = Form.useWatch("type_ID", form);
  const description = Form.useWatch("description", form);
  const [fileList, setFileList] = useState([]);
  const [fileListVideo, setFileListVideo] = useState([]);
  const [fileListDoc, setFileListDoc] = useState([]);

  const handleChange = (e) => {
    setFileList(e?.fileList);
    setImage(e?.file?.response?.filename ?? "");
    form.setFieldsValue({ files: e?.file?.response?.filename ?? "" });
    setImageUpdated(true);
  };

  const inputRef = React.useRef();
  const handleChangeVideo = (e) => {
    setFileListVideo(e?.fileList);
    setVideo(e?.file?.response?.filenamevideo ?? "");
    form.setFieldsValue({ filesvideo: e?.file?.response?.filenamevideo ?? "" });
    setVideoUpdated(true);
  };

  const handleChangeDoc = (e) => {
    setFileListDoc(e?.fileList);
    setDocument(e?.file?.response?.filenamedoc ?? "");
    form.setFieldsValue({
      filesdocument: e?.file?.response?.filenamedoc ?? ""
    });
    setDocUpdated(true);
  };

  const [imageUpdated, setImageUpdated] = useState(false);
  const [videoUpdated, setVideoUpdated] = useState(false);
  const [DocUpdated, setDocUpdated] = useState(false);

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleVideoCancel = () => setPreviewOpenVideo(false);
  const handlePreviewVideo = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewVideo(file.url || file.preview);
    setPreviewOpenVideo(true);
    setPreviewTitleVideo(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleDocCancel = () => setPreviewOpenDoc(false);
  const handlePreviewDoc = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewDoc(file.url || file.preview);
    setPreviewOpenDoc(true);
    setPreviewTitleDoc(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const [status, setStatus] = useState(defaultValue?.status ?? 1);
  const { savingAuditfile } = useSelector((state) => {
    return state.master;
  });
  const onFinish = (data) => {
    
    setShowDialog(false);
    dispatch(
      defaultValue?.id
        ? updateAuditfile(
            // {
            //   data: {
            //     ...data,
            //     status: transStatus({ status }),
            //     id: defaultValue?.id
            //   }
            // }
                {
                  data:{
                    ...data,
                    id: defaultValue?.id,
                    status: transStatus({status}),
                    file_name: imageUpdated ? image ?? 'No image' : last(defaultValue?.file_name.split('/')) ?? 'No image',
                    video:videoUpdated ? video ?? 'No Video' : last(defaultValue?.video.split('/')) ?? 'No video',
                    document:DocUpdated ? document ?? 'No Document' :last(defaultValue?.document.split('/')) ?? 'No document',
                    type_ID,
                    description,
            }
                }
          )
        : addAuditfile({
            data: {
              ...data,
              type_ID,
              description,
              filename: image ?? "No file",
              filenamevideo: video ?? "No Video",
              filenamedoc: document ?? "No Document",
              status: transStatus({ status })
            }
          })
    ).then(({ message, status, statusText }) => {
      if (status === 200) {
        form.resetFields();
        navigate("/AuditOverallTraining");
      }
      messageToast({
        message: message ?? statusText,
        status,
        title: "Audit Overall Training Master"
      });
    });
  };

  const {
    //   gettingAuditCategory,
    //   gettingAuditSubCategory,
    //  // gettingAuditPointList,
    //   gettingAuditCategoryPointList,
    gettingAuditType,
    getAuditTypeResponse: { data: AuditType }
    //   getAuditSubCategoryResponse: {data: AuditSubCategory},
    //   getAuditCategoryResponse: {data: AuditCategory},
    //  // getAuditPointListResponse: {data: AuditPointList},
    //   getAuditCategoryPointListResponse: {data: AuditCategoryPointList}
  } = useSelector((state) => {
    return state.master;
  });
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [image, setImage] = useState("");
  const [previewOpenVideo, setPreviewOpenVideo] = useState(false);
  const [previewVideo, setPreviewVideo] = useState("");
  const [previewTitleVideo, setPreviewTitleVideo] = useState("");
  const [video, setVideo] = useState("");
  const [previewOpenDoc, setPreviewOpenDoc] = useState(false);
  const [previewDoc, setPreviewDoc] = useState("");
  const [previewTitleDoc, setPreviewTitleDoc] = useState("");
  const [document, setDocument] = useState("");

  useEffect(() => {
    dispatch(getAuditType());
  }, [dispatch]);

  const props = {
    name: "file_name",
    action: `${baseURL}files-upload`,
    headers: {
      authorization: "authorization-text"
    }
  };
  const propsvideo = {
    name: "video",
    action: `${baseURL}filesvideo-upload`,
    headers: {
      authorization: "authorization-text"
    }
  };

  const propsdoc = {
    name: "file_doc",
    action: `${baseURL}filesdocument-upload`,
    headers: {
      authorization: "authorization-text"
    }
  };

  const getFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const getFileVideo = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileListVideo;
  };

  const getFileDoc = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileListDoc;
  };

  const uploadButton = (
    <Button
      style={{ display: "flex", direction: "row" }}
      icon={<PlusOutlined style={{ marginTop: "3px", marginRight: "4px" }} />}
    >
      <div
        style={{
          marginLeft: "3px"
        }}
      >
        {defaultValue?.id ? "Update Image" : "Upload"}
      </div>
    </Button>
  );
  const uploadButtonVideo = (
    <Button
      style={{ display: "flex", direction: "row" }}
      icon={<PlusOutlined style={{ marginTop: "3px", marginRight: "4px" }} />}
    >
      <div
        style={{
          marginLeft: "3px"
        }}
      >
        {defaultValue?.id ? "Update Video" : "Upload"}
      </div>
    </Button>
  );
  const uploadButtonDoc = (
    <Button
      style={{ display: "flex", direction: "row" }}
      icon={<PlusOutlined style={{ marginTop: "3px", marginRight: "4px" }} />}
    >
      <div
        style={{
          marginLeft: "3px"
        }}
      >
        {defaultValue?.id ? "Update Document" : "Upload"}
      </div>
    </Button>
  );

  if (defaultValue?.id) {
    form.setFieldsValue({ files: defaultValue?.file_name ?? "No image" });
  }
  if (defaultValue?.id) {
    form.setFieldsValue({ filesvideo: defaultValue?.video ?? "No video" });
  }
  if (defaultValue?.id) {
    form.setFieldsValue({ files: defaultValue?.file_doc ?? "No document" });
  }

  const handleClickBack = () => {
    navigate("/AuditOverallTraining");
  };

  const handleChoose = () => {
    inputRef.current.click();
  };

  const [showDialog, setShowDialog] = useState(false);
  const onChange = () => {
    setShowDialog(true);
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
              initialValues={{
                type_ID: defaultValue?.typeid,
                description: defaultValue?.description,
                filename: defaultValue?.file_name,
                video: defaultValue?.file_video,
                document: defaultValue?.document,
                status: defaultValue?.status ?? 1,
                ...defaultValue
              }}
              onFinish={onFinish}
              form={form}
              autoComplete="off"
            >
              <Row gutter={[15, 0]}>
                <Col md={{ span: 6 }} xs={{ span: 24 }} lg={{ span: 5 }}>
                  <Form.Item
                    name="type_ID"
                    label="Select Category Type"
                    rules={[{ required: true, message: "Select Type" }]}
                  >
                    <Select
                      name="type_ID"
                      placeholder="Select"
                      loading={gettingAuditType}
                      //disabled={savingAuditPointsImage}
                      showSearch
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {map(
                        (auditpoint) => {
                          return (
                            <Option key={auditpoint.id} value={auditpoint.id}>
                              {auditpoint.name}
                            </Option>
                          );
                        },
                        AuditType ? AuditType.filter((e) => e.status === "1"): []
                      )}
                    </Select>
                  </Form.Item>
                </Col>
                <Form.Item
                  name="description"
                  label="Description"
                  rules={[{ required: false, message: "Enter Description" }]}
                >
                  <Input name="description" placeholder="Description" />
                </Form.Item>
                <Col md={{ span: 6 }} xs={{ span: 24 }} lg={{ span: 4 }}>
                  <Form.Item
                    name="file_name"
                    label="Image"
                    getValueFromEvent={getFile}
                    alt="No Image"
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: 'Please Select image'
                    //   }
                    // ]}
                  >
                    <div style={{ display: "flex", direction: "col" }}>
                      {defaultValue?.id && fileList?.length === 0 ? (
                        defaultValue?.file_name ? (
                          <Image
                            style={{ paddingRight: "10px" }}
                            width={100}
                            src={defaultValue?.file_name ?? ""}
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
                        fileList={fileList}
                        name="file_name"
                        listType="picture"
                        onPreview={handlePreview}
                        capture="environment"
                        accept=".jpeg,.png,.jpg,.jpeg.gif"
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      >
                        {fileList.length >= 1 ? null : uploadButton}
                      </Upload>
                    </div>
                    <Modal
                      open={previewOpen}
                      title={previewTitle}
                      footer={null}
                      onCancel={handleCancel}
                      alt="No Image"
                    >
                      <img
                        alt="No Image"
                        style={{
                          width: "100%"
                        }}
                        src={previewImage}
                      />
                    </Modal>
                  </Form.Item>
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }} lg={{ span: 4 }}>
                  <Form.Item
                    name="video"
                    label="Video"
                    getValueFromEvent={getFileVideo}
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: 'Please Select image'
                    //   }
                    // ]}
                  >
                    <div className="VideoInput">
                      {defaultValue?.id && fileList?.length === 0 ? (
                        defaultValue?.video ? (
                          <iframe
                            style={{ paddingRight: "10px" }}
                            width="250px"
                            height="150px"
                            name="file_doc"
                            src={defaultValue?.video ?? ""}                                           
                          
                          />
                        ) : (
                          "No Video Available"
                        )
                      ) : (
                        <></>
                      )}
                      <Upload
                        {...propsvideo}
                        fileList={fileListVideo}
                        name="video"
                        onPreview={handlePreviewVideo}
                        capture="environment"
                        accept=".mp4,.mkv,.gif"
                        onChange={(e) => {
                          handleChangeVideo(e);
                        }}
                      >
                        {fileListVideo.length >= 1 ? null : uploadButtonVideo}
                      </Upload>
                      <p
                         style={{
                          color :'red'
                        }}>Max. size 70MB</p>   
                    </div>
                    <Modal
                      open={previewOpenVideo}
                      title={previewTitleVideo}
                      footer={null}
                      onCancel={handleVideoCancel}
                    >
                      {/* <Player
                        alt='example'
                        style={{
                          width: '10px'
                        }}
                        src={previewVideo}
                      /> */}
                    </Modal>
                  </Form.Item>
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }} lg={{ span: 4 }}>
                  <Form.Item
                    name="file_doc"
                    label="Document"
                    getValueFromEvent={getFileDoc}
                    alt="No Document"
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: 'Please Select image'
                    //   }
                    // ]}
                  >
                    <div style={{ display: "flex", direction: "col" }}>
                      {defaultValue?.id && fileListDoc?.length === 0 ? (
                        defaultValue?.document ? (
                          <iframe
                            style={{ paddingRight: "10px" }}
                            width="250px"
                            height="150px"
                            // src={defaultValue?.file_doc ?? ''}
                            //src={file_doc}
                            name="file_doc"
                            src={defaultValue?.document ?? ""}
                            //viewer="url"
                            alt="No Document"
                          />
                        ) : (
                          "No Image Available"
                        )
                      ) : (
                        <></>
                      )}
                      <Upload
                        {...propsdoc}
                        fileList={fileListDoc}
                        name="file_doc"
                        onPreview={handlePreviewDoc}
                        capture="environment"
                        accept=".doc,.docx,.pdf"
                        onChange={(e) => {
                          handleChangeDoc(e);
                        }}
                      >
                        {fileListDoc.length >= 1 ? null : uploadButtonDoc}
                      </Upload>
                    </div>
                    <Modal
                      open={previewOpenDoc}
                      title={previewTitleDoc}
                      footer={null}
                      onCancel={handleDocCancel}
                      alt="No Document"
                    >
                      <iframe
                        src={previewDoc}
                       // queryParams={previewDoc}
                        // viewerUrl={'https://docs.google.com/gview?url=%URL%&embedded=true'}
                        // url={'https://file-examples.com/wp-content/uploads/2017/02/file-sample_100kB.doc'}
                        //viewer="src"
                      ></iframe>
                    </Modal>
                  </Form.Item>
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }} lg={{ span: 4 }}>
                  <Form.Item
                    name="status"
                    label="Status "
                    rules={[
                      { required: true, message: "Please select your status" }
                    ]}
                  >
                    <Radio.Group>
                      <Radio.Group
                        buttonStyle="solid"
                        disabled={savingAuditfile}
                        onChange={(e) => {
                          onChange();
                          setStatus(e?.target?.value);
                        }}
                        size="small"
                        defaultValue={
                          defaultValue?.status === "In Active" ? 0 : 1
                        }
                      >
                        <Radio.Button className="active" value={1}>
                          Active
                        </Radio.Button>
                        <Radio.Button className="in-active" value={0}>
                          In-Active
                        </Radio.Button>
                      </Radio.Group>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Row gutter={[15, 15]} style={{ justifyContent: "end" }}>
                    <Col
                      span={12}
                      className="d-flex justify-content-end align-items-center"
                    >
                      <Form.Item className="mx-2">
                        <Button
                          className="orangeFactory"
                          type="primary"
                          htmlType="submit"
                        >
                          {isEdit ? "Update" : "Add"}
                        </Button>
                      </Form.Item>
                      {/* </Col>
                    <Col span={12}> */}
                      <Form.Item>
                        <Button
                          disabled={savingAuditfile}
                          onClick={handleClickBack}
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

export default AuditOverallTrainingForm;
