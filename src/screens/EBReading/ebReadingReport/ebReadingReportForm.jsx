import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Col,
  Row,
  Form,
  Descriptions,
  Input,
  Typography,
  Upload,
  Modal,
  Image
} from "antd";
import { last} from "ramda";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { editEBReadingEntry } from "../../../@app/subMaster/subMasterSlice";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
import messageToast from "../../../components/messageToast/messageToast";
import { PlusOutlined } from "@ant-design/icons";
import { baseURL } from "../../../api/baseURL";

function ebReadingReportForm() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { state } = useLocation();
  const {
    state: { data: defaultValue }
  } = useLocation();

  const dispatch = useDispatch();
  const loginType = useSelector((state) => state.auth.type);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const [image, setImage] = useState("");
  const [peakImage, setPeakImage] = useState("");
  const [closeImage, setCloseImage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewTitle, setPreviewTitle] = useState("");
  const [previewPeakImage, setPreviewPeakImage] = useState("");
  const [previewCloseImage, setPreviewCloseImage] = useState("");
  const [fileListPeak, setFileListPeak] = useState([]);
  const [fileListClose, setFileListClose] = useState([]);
  const [previewOpenPeak, setPreviewOpenPeak] = useState(false);
  const [previewOpenClose, setPreviewOpenClose] = useState(false);
  const [previewTitlePeak, setPreviewTitlePeak] = useState("");
  const [previewTitleClose, setPreviewTitleClose] = useState("");
  const handleCancelPeak = () => setPreviewOpenPeak(false);
  const handleCancelClose = () => setPreviewOpenClose(false);
  const [imageUpdated, setImageUpdated] = useState(false); 
  const [imagePeakUpdated, setImagePeakUpdated] = useState(false);
  const [imageCloseUpdated, setImageCloseUpdated] = useState(false);
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

  const handlePreviewPeak = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewPeakImage(file.url || file.preview);
    setPreviewOpenPeak(true);
    setPreviewTitlePeak(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handlePreviewClose = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewCloseImage(file.url || file.preview);
    setPreviewOpenClose(true);
    setPreviewTitleClose(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };


  const handleChangenewClose = (e) => {
    setFileListClose(e?.fileList);
    setCloseImage(e?.file?.response?.filename ?? "");
    form.setFieldsValue({ imageClose: e?.file?.response?.filename ?? "" });
    setImageCloseUpdated(true);
  };
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const {
    state: { isEdit = false }
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

  const getFilePeak = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileListPeak;
  };

  const getFileClose = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileListClose;
  };
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  const { savingEBReadingEntry } = useSelector((state) => {
    return state.subMaster;
  });

  
  if (defaultValue?.id) {
    form.setFieldsValue({ files: defaultValue?.file_name ?? "No image" });
  }


  const onFinish = () => {
    dispatch(
      editEBReadingEntry({
        data: {
          id: state.id,
          outlet_id: state?.outlet_id,
          status : defaultValue.status,
          entry_by: userData.data?.id ?? "0",         
          lean_actual: state?.lean_actual || leanActual,
          peak_actual: state?.peak_actual || peakActual,
          close_actual: state?.close_actual || closeActual,
          entry_date: currentdate,
          lean_image: imageUpdated ? image  ?? 'No image' : last(state?.lean_image.split('/')) ?? 'No image',   
          peak_image: imagePeakUpdated ? peakImage  ?? 'No image' : last(state?.peak_image.split('/')) ?? 'No image',   
          close_image: imageCloseUpdated ? closeImage  ?? 'No image' : last(state?.close_image.split('/')) ?? 'No image',        
        }
      })
    ).then(({ message, status, statusText }) => {
      if (status === 200) {
        messageToast({
          message: message ?? statusText,
          status,
          title: "EB Reading Edit Entry Status"
        });
        navigate("/ebReadingEdit");
        form.resetFields();
      } else {
        messageToast({
          message: message ?? statusText,
          status,
          title: "EB Reading Edit Entry Status"
        });
      }
    });
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
        {state?.id ? "Upload" : "Upload"}
      </div>
    </Button>
  );

  const props = {
    name: "file_name",
    action: `${baseURL}eb-reading-upload`,
    headers: {
      authorization: "authorization-text"
    }
  };


    
  const uploadButtonPeak = (
    <Button
      style={{ display: "flex", direction: "row" }}
      icon={<PlusOutlined style={{ marginTop: "3px", marginRight: "4px" }} />}
    >
      <div
        style={{
          marginLeft: "3px"
        }}
      >
        {state?.id ? "Upload" : "Upload"}
      </div>
    </Button>
  );

  const propsPeak = {
    name: "file_name",
    action: `${baseURL}eb-reading-peak-upload`,
    headers: {
      authorization: "authorization-text"
    }
  };
  const uploadButtonClose = (
    <Button
      style={{ display: "flex", direction: "row" }}
      icon={<PlusOutlined style={{ marginTop: "3px", marginRight: "4px" }} />}
    >
      <div
        style={{
          marginLeft: "3px"
        }}
      >
        {state?.id ? "Upload" : "Upload"}
      </div>
    </Button>
  );

  const propsClose = {
    name: "file_name",
    action: `${baseURL}eb-reading-close-upload`,
    headers: {
      authorization: "authorization-text"
    }
  };

  const handleChangenew = (e) => {
    setFileList(e?.fileList);
    setImage(e?.file?.response?.filename ?? "");
    form.setFieldsValue({ image: e?.file?.response?.filename ?? "" });
    setImageUpdated(true);
  };

  const handleChangenewPeak = (e) => {   
    setFileListPeak(e?.fileList);
    setPeakImage(e?.file?.response?.filename ?? "");  
    form.setFieldsValue({ imagePeak: e?.file?.response?.filename ?? "" }); 
    setImagePeakUpdated(true);
  };

  const { userData } = useSelector((state) => state.auth);

  const handleClickBack = () => {
    navigate("/ebReadingEdit");
  };

  const [closingUnitsLean, setClosingUnitsLean] = useState(defaultValue.opening_units+state?.lean_actual);
  const [openingUnitsPeak, setOpeningUnitsPeak] = useState(defaultValue.opening_units+state?.lean_actual);

  const [closingUnitsPeak, setClosingUnitsPeak] = useState(state?.peak_actual ? openingUnitsPeak+state?.peak_actual : '');
  const [openingUnitsClose, setOpeningUnitsClose] = useState(state?.peak_actual ? openingUnitsPeak+state?.peak_actual : '');
  const [closingUnitsClose, setClosingUnitsClose] = useState(state?.close_actual? openingUnitsClose+state?.close_actual :
    '');

  const [leanActual,setLeanActual] = useState();
  const [peakActual,setPeakActual] = useState();
  const [closeActual,setCloseActual] = useState();
 

  const handleActualUnitsChange = (e) => {
    const openingUnitsLean = parseFloat(defaultValue.opening_units);
    const actualUnitsLean = parseFloat(e.target.value);
    const totalUnitsLean = openingUnitsLean + actualUnitsLean;
    setClosingUnitsLean(totalUnitsLean.toString());
    setOpeningUnitsPeak(totalUnitsLean.toString());
    setLeanActual(e.target.value);
    setClosingUnitsPeak(totalUnitsLean+actualUnitsLean);
  };

  const handleActualUnitsPeakChange = (e) => {
    const openingUnitsPeakValue = parseFloat(openingUnitsPeak || closingUnitsLean);
    const actualUnitsPeak = parseFloat(e.target.value);
    const totalUnitsPeak = openingUnitsPeakValue + actualUnitsPeak;
    setClosingUnitsPeak(totalUnitsPeak.toString());
    setOpeningUnitsClose(totalUnitsPeak.toString());    
    setPeakActual(e.target.value);
  };

  const handleActualUnitsCloseChange = (e) => {
    const openingUnitsCloseValue = parseFloat(openingUnitsClose || 0);
    const actualUnitsClose = parseFloat(e.target.value);
    const totalUnitsClose = openingUnitsCloseValue + actualUnitsClose;
    setClosingUnitsClose(totalUnitsClose.toString());
    setCloseActual(e.target.value);
  };
  return (
    <>
      <Card>
        <Row style={{ justifyContent: "center" }}>
          <Col span={24}>
            <Form
              // onFieldsChange={() => setShowDialog(true)}
              name="basic"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              onFinish={onFinish}
              disabled={savingEBReadingEntry}
              form={form}
              initialValues={{
                status: defaultValue?.status ?? 1,
                id: defaultValue?.id,
                //filename: defaultValue?.image,               
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
                            background: "#34b1aa",
                            borderRadius: "10px",
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
                            borderRadius: "10px",
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
                        background: "#34b1aa",
                        borderRadius: "10px",
                        color: "#ffffff",
                        fontWeight: "bold"
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
                        background: "#34b1aa",
                        borderRadius: "10px",
                        color: "#ffffff",
                        fontWeight: "bold"
                      }}
                    />
                  </Descriptions.Item>
                </Descriptions>
                <Descriptions bordered size="big">
                  <Typography>Time</Typography>
                  <Typography>Opening</Typography>
                  <Typography>Closing</Typography>
                  <Form.Item name="lean_time" label="Lean Hrs">
                    <Input
                      style={{ width: "70px", backgroundColor: "#a0b8de" }}
                      name="lean_time_start"
                      defaultValue={defaultValue.lean_time_start}
                    />
                    <Input
                      style={{ width: "40px", backgroundColor: "#a0b8de" }}
                      value={"to"}
                    />
                    <Input
                      style={{ width: "70px", backgroundColor: "#a0b8de" }}
                      name="lean_time_end"
                      defaultValue={defaultValue.lean_time_end}
                    />
                  </Form.Item>
                  <Descriptions.Item>
                    <Input
                      style={{ width: "150px", backgroundColor: "#a0b8de" }}
                      value={defaultValue.opening_units}
                      readOnly
                    />
                  </Descriptions.Item>
                  <Descriptions.Item>
                    <Input
                      name="closing_units_lean"
                      style={{ width: "150px", backgroundColor: "#a0b8de" }}
                      value={closingUnitsLean || 0}
                      readOnly
                    />
                  </Descriptions.Item>

                  <Form.Item label="Peak Hrs" name="peak_time">
                    <Input
                      style={{ width: "70px", backgroundColor: "#97f0c5" }}
                      name="peak_time_start"
                      defaultValue={defaultValue.peak_time_start}
                    />
                    <Input
                      style={{ width: "40px", backgroundColor: "#97f0c5" }}
                      value={"to"}
                    />
                    <Input
                      style={{ width: "70px", backgroundColor: "#97f0c5" }}
                      name="peak_time_end"
                      defaultValue={defaultValue.peak_time_end}
                    />
                  </Form.Item>
                  <Descriptions.Item>
                    <Input
                      name={"opening_units_peak"}
                      style={{ width: "150px", backgroundColor: "#97f0c5" }}
                      value={openingUnitsPeak || 0}
                      readOnly
                    />
                  </Descriptions.Item>
                  <Descriptions.Item>
                    <Input
                      name="closing_units_peak"
                      style={{ width: "150px", backgroundColor: "#97f0c5" }}
                      value={closingUnitsPeak}
                      readOnly
                    />
                  </Descriptions.Item>

                  <Form.Item label="Closed Hrs" name="closed_time">
                    <Input
                      style={{ width: "70px", backgroundColor: "#f0d3a8" }}
                      name="closed_time_start"
                      defaultValue={defaultValue.closed_time_start}
                    />
                    <Input
                      style={{ width: "40px", backgroundColor: "#f0d3a8" }}
                      value={"to"}
                    />
                    <Input
                      style={{ width: "70px", backgroundColor: "#f0d3a8" }}
                      name="closed_time_end"
                      defaultValue={defaultValue.closed_time_end}
                    />
                  </Form.Item>

                  <Descriptions.Item>
                    <Input
                      name={"opening_units_close"}
                      style={{ width: "150px", backgroundColor: "#f0d3a8" }}
                      value={openingUnitsClose}
                      readOnly
                    />
                  </Descriptions.Item>
                  <Descriptions.Item>
                    <Input
                      name="closing_units_close"
                      style={{ width: "150px", backgroundColor: "#f0d3a8" }}
                      value={closingUnitsClose}
                      readOnly
                    />
                  </Descriptions.Item>
                </Descriptions>
                <Descriptions
                  bordered
                  size="big"
                  //</Row>style={{height:'50px',width:'50px'}}
                >
                  <Typography>Actual Units</Typography>
                  <Typography>Attachment</Typography>

                  <Descriptions.Item></Descriptions.Item>
                  <Descriptions.Item>
                    <Input
                      style={{ width: "70px" }}
                      name="actual_units_lean"
                      onChange={handleActualUnitsChange}
                      defaultValue={state?.lean_actual}
                    />
                  </Descriptions.Item>

                  <Descriptions.Item
                    // label={"Image"}
                    //style={{ width: "70px" }}
                    getValueFromEvent={getFile}
                  >
                     {state?.lean_image != '' ? ( 
                    defaultValue?.id && fileList?.length === 0 ? (
                        state?.lean_image ? (
                          <>
                          <Image
                            style={{ paddingRight: "10px" }}
                            width={'40px'}
                            src={state?.lean_image ?? ""}
                            alt="No Image"
                          />
                          <Upload
                          {...props}
                          fileList={fileList}
                          capture="environment"                        
                          style={{ height: "10px" }}
                          name="image"
                          onPreview={handlePreview}                        
                          onChange={(e) => {
                            handleChangenew(e);
                          }}
                        >
                          {fileList.length >= 1 ? null : uploadButton}
                        </Upload>                     
                        <Modal
                          open={previewOpen}
                          title={previewTitle}
                          footer={null}
                          onCancel={handleCancel}
                        >
                          <img
                            alt="example"
                            // style={{
                            //   width: "30px"
                            // }}
                            src={previewImage}
                          />
                        </Modal>
                        </>
                        ) : (
                          "No Image Available"
                        )
                      ) : (
                        <></>
                      ) ) :(
                        <> 
                    <Upload
                      {...props}
                      fileList={fileList}
                      capture="environment"
                      style={{ height: "10px" }}
                      name="image"
                      onPreview={handlePreview}                     
                      onChange={(e) => {
                        handleChangenew(e);
                      }}
                    >
                      {fileList.length >= 1 ? null : uploadButton}
                    </Upload>                   
                    <Modal
                      open={previewOpen}
                      title={previewTitle}
                      footer={null}
                      onCancel={handleCancel}
                    >
                      <img
                        alt="example"                       
                        src={previewImage}
                      />
                    </Modal>
                    </>
                      )}
                  </Descriptions.Item>
                  <Descriptions.Item></Descriptions.Item>
                  <Descriptions.Item>
                    <Input
                      style={{ width: "70px" }}
                      name="actual_units_peak"
                      onChange={handleActualUnitsPeakChange}
                      defaultValue={state?.peak_actual}
                    />
                  </Descriptions.Item>

                  <Descriptions.Item
                    // label={"Image"}
                    //style={{ width: "70px" }}
                    getValueFromEvent={getFilePeak}
                  >
                      {state?.peak_image != '' ? ( 
                    defaultValue?.id && fileList?.length === 0 ? (
                        state?.peak_image ? (
                          <>   
                          <Image
                            style={{ paddingRight: "10px" }}
                            width={'40px'}
                            src={state?.peak_image ?? ""}
                            alt="No Image"
                          />
                            
                          <Upload
                            {...propsPeak}
                            fileList={fileListPeak}
                            capture="environment"
                            // listType="picture-card"
                            // listType="picture"
                            style={{ height: "10px" }}
                            name="peakImage"
                            onPreview={handlePreviewPeak}
                            // beforeUpload={() => {
                            //   // Prevent files from being selected
                            //   return false;
                            // }}
                            onChange={(e) => {
                              handleChangenewPeak(e);
                            }}
                          >
                            {fileList.length >= 1 ? null : uploadButtonPeak}
                          </Upload>
                          {/* </div> */}
                          <Modal
                            open={previewOpenPeak}
                            title={previewTitlePeak}
                            footer={null}
                            onCancel={handleCancelPeak}
                          >
                            <img
                              alt="example"
                              // style={{
                              //   width: "30px"
                              // }}
                              src={previewPeakImage}
                            />
                          </Modal>
                         
                          </>
                        ) : (
                          "No Image Available"
                        )
                      ) : (
                        <></>
                      ) ) :(
                        <>       
                    <Upload
                      {...propsPeak}
                      fileList={fileListPeak}
                      capture="environment"
                      // listType="picture-card"
                      // listType="picture"
                      style={{ height: "10px" }}
                      name="peakImage"
                      onPreview={handlePreviewPeak}
                      // beforeUpload={() => {
                      //   // Prevent files from being selected
                      //   return false;
                      // }}
                      onChange={(e) => {
                        handleChangenewPeak(e);
                      }}
                    >
                      {fileList.length >= 1 ? null : uploadButtonPeak}
                    </Upload>
                    {/* </div> */}
                    <Modal
                      open={previewOpenPeak}
                      title={previewTitlePeak}
                      footer={null}
                      onCancel={handleCancelPeak}
                    >
                      <img
                        alt="example"
                        // style={{
                        //   width: "30px"
                        // }}
                        src={previewPeakImage}
                      />
                    </Modal>
                   
                    </>
                     )}
                  </Descriptions.Item>
                  <Descriptions.Item></Descriptions.Item>
                  <Descriptions.Item>
                    <Input
                      style={{ width: "70px" }}
                      name="actual_units_closed"
                      onChange={handleActualUnitsCloseChange}
                      defaultValue={state?.close_actual}
                    />
                  </Descriptions.Item>
                  <Descriptions.Item
                    // label={"Image"}
                    //style={{ width: "70px" }}
                    getValueFromEvent={getFileClose}
                  >
                    {state?.close_image != '' ? ( 
                    defaultValue?.id && fileList?.length === 0 ? (
                        state?.close_image ? (
                          <>    
                          <Image
                            style={{ paddingRight: "10px" }}
                            width={'40px'}
                            src={state?.close_image ?? ""}
                            alt="No Image"
                          />                         
                    <Upload
                      {...propsClose}
                      fileList={fileListClose}
                      capture="environment"
                      // listType="picture-card"
                      // listType="picture"
                      style={{ height: "10px" }}
                      name="closeImage"
                      onPreview={handlePreviewClose}
                      // beforeUpload={() => {
                      //   // Prevent files from being selected
                      //   return false;
                      // }}
                      onChange={(e) => {
                        handleChangenewClose(e);
                      }}
                    >
                      {fileList.length >= 1 ? null : uploadButtonClose}
                    </Upload>
                    {/* </div> */}
                    <Modal
                      open={previewOpenClose}
                      title={previewTitleClose}
                      footer={null}
                      onCancel={handleCancelClose}
                    >
                      <img
                        alt="example"
                        // style={{
                        //   width: "30px"
                        // }}
                        src={previewCloseImage}
                      />
                    </Modal>
                    </>
                        ) : (
                          "No Image Available"
                        )
                      ) : (
                        <></>
                      ) ) :(
                        <>       
                    <Upload
                      {...propsClose}
                      fileList={fileListClose}
                      capture="environment"
                      // listType="picture-card"
                      // listType="picture"
                      style={{ height: "10px" }}
                      name="closeImage"
                      onPreview={handlePreviewClose}
                      // beforeUpload={() => {
                      //   // Prevent files from being selected
                      //   return false;
                      // }}
                      onChange={(e) => {
                        handleChangenewClose(e);
                      }}
                    >
                      {fileList.length >= 1 ? null : uploadButtonClose}
                    </Upload>
                    {/* </div> */}
                    <Modal
                      open={previewOpenClose}
                      title={previewTitleClose}
                      footer={null}
                      onCancel={handleCancelClose}
                    >
                      <img
                        alt="example"
                        // style={{
                        //   width: "30px"
                        // }}
                        src={previewCloseImage}
                      />
                    </Modal>
                    </>
                    )}
                   
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
                            disabled={savingEBReadingEntry}
                            style={{
                              fontWeight: "bold",
                              width: "110px",
                              height: "40px",
                              background: "#ed9609",
                              borderRadius: "10px",
                              color: "#ffffff"
                            }}
                          >
                            Back
                          </Button>
                        </Form.Item>
                      </Col>
                      <Col span={3} style={{ textAlign: "right" }}>
                        <Form.Item
                          wrapperCol={{ offset: 8, span: 16, padding: "10px" }}
                        >
                          <Button
                            style={{
                              fontWeight: "bold",
                              width: "130px",
                              height: "40px",
                              background: "#34b1aa",
                              borderRadius: "10px",
                              color: "#ffffff"
                            }}
                            type="primary"
                            htmlType="submit"
                            disabled={savingEBReadingEntry}
                            loading={savingEBReadingEntry}
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

export default ebReadingReportForm;
