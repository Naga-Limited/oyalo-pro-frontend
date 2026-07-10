/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import {Card,Select, Button, Radio, Col, Row, Form, Input,Upload, Modal, Image} from 'antd';
import {useLocation, useNavigate} from 'react-router';
import {transStatus} from '../../../util/transStatus';
import {PlusOutlined} from '@ant-design/icons';
import {useDispatch, useSelector} from 'react-redux';
import {last,map} from 'ramda';
import {baseURL} from '../../../api/baseURL';
import {getAuditCategoryPointList, getAuditCategory, getAuditSubCategory, addAuditPointsImage,updateAuditPointsImage} from '../../../@app/master/masterSlice';
import ConfirmOnExit from '../../../components/confirmOnExit/ConfirmOnExit';

const {Option} = Select;
function AuditPointsImageForm() {
  const {
    state: {data: defaultValue = {}, isEdit = false}
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
  const auditcategory_ID = Form.useWatch('auditcategory_ID', form);
  const auditsubcategory_ID = Form.useWatch('auditsubcategory_ID', form);
  const auditpointslist_ID = Form.useWatch('auditpointslist_ID', form);    
  const handleChange = (e) => {
    setFileList(e?.fileList);
    setImage(e?.file?.response?.filename ?? '');
    form.setFieldsValue({points_image: e?.file?.response?.filename ?? ''});
  };

  const inputRef = React.useRef();
  const handleChangeVideo = (e) => {
    setFileListVideo(e?.fileList);
    setVideo(e?.file?.response?.filenamevideo ?? '');
    form.setFieldsValue({points_video: e?.file?.response?.filenamevideo ?? ''});
  };

  const [fileList, setFileList] = useState([]);
  const [fileListVideo, setFileListVideo] = useState([]);
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const handleVideoCancel = () => setPreviewOpenVideo(false);
  const handlePreviewVideo = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewVideo(file.url || file.preview);
    setPreviewOpenVideo(true);
    setPreviewTitleVideo(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const [status, setStatus] = useState(defaultValue?.status ?? 1);

  const {savingAuditPointsImage} = useSelector((state) => {
     return state.master;
  });

  const onFinish = (data) => {
   
    setShowDialog(false);
     dispatch(
      defaultValue?.id
        ? updateAuditPointsImage(
          {
          data:{
          status: transStatus({status}),
          filenamevideo: last(defaultValue?.video.split('/')) ?? 'No video',
          filename: last(defaultValue?.image.split('/')) ?? 'No image',
          auditcategory_ID,
          auditsubcategory_ID,
          auditpointslist_ID,
  }})
        : addAuditPointsImage({
          data: {
            filenamevideo: video ?? 'No Video',
            filename: image ?? 'No image',
            auditcategory_ID,
            auditsubcategory_ID,
            auditpointslist_ID,
            status: transStatus({status})},             
          })
    ).then(({status}) => {
      if (status === 200) {
        form.resetFields();
        navigate('/training');
      }
    });
  };

  const {
    gettingAuditCategory,
    gettingAuditSubCategory,
   // gettingAuditPointList,
    gettingAuditCategoryPointList,
    getAuditSubCategoryResponse: {data: AuditSubCategory},
    getAuditCategoryResponse: {data: AuditCategory},
   // getAuditPointListResponse: {data: AuditPointList},
    getAuditCategoryPointListResponse: {data: AuditCategoryPointList}
  } = useSelector((state) => {
    return state.master;
  });
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [image, setImage] = useState('');
  const [previewOpenVideo, setPreviewOpenVideo] = useState(false);
  const [previewVideo, setPreviewVideo] = useState('');
  const [previewTitleVideo, setPreviewTitleVideo] = useState('');
  const [video,setVideo] = useState('');


  useEffect(() => {
    dispatch(getAuditCategory());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAuditSubCategory(auditcategory_ID));
  }, [dispatch, auditcategory_ID]);

  useEffect(() => {
    dispatch(getAuditCategoryPointList(auditsubcategory_ID));
  }, [dispatch, auditsubcategory_ID]);

  

  const props = {
    name: 'image',
    action: `${baseURL}points-imageupload`,
    headers: {
      authorization: 'authorization-text'
    }
  };

  
  const propsvideo = {
    name: 'video',
    action: `${baseURL}points-videoupload`,
    headers: {
      authorization: 'authorization-text'
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

  const uploadButton = (
    <Button style={{display: 'flex', direction: 'row'}} icon={<PlusOutlined style={{marginTop: '3px', marginRight: '4px'}} />}>
      <div
        style={{
          marginLeft: '3px'
        }}>
        {defaultValue?.id ? 'Update Image' : 'Upload'}
      </div>
    </Button>
  );

  const uploadButtonVideo = (
    <Button style={{display: 'flex', direction: 'row'}} icon={<PlusOutlined style={{marginTop: '3px', marginRight: '4px'}} />}>
      <div
        style={{
          marginLeft: '3px'
        }}>
        {defaultValue?.id ? 'Update Video' : 'Upload'}
      </div>
    </Button>
  );
  if (defaultValue?.id) {
    form.setFieldsValue({employee_image: defaultValue?.image ?? 'No image'});
  }

  const handleClickBack = () => {
    navigate('/training');
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
        <Row style={{justifyContent: 'center'}}>
          <Col span={24}>
            <Form
              name='basic'
              labelCol={{span: 24}}
              wrapperCol={{span: 24}}
              initialValues={{
                auditcategory_ID: defaultValue?.auditcategory_id,
                auditsubcategory_ID: defaultValue?.auditsubcategory_id,
                auditpointslist_ID: defaultValue?.auditpoint_id,
                status: defaultValue?.status ?? 1, ...defaultValue}}
              onFinish={onFinish}
              form={form}
              autoComplete='off'>
              <Row gutter={[15, 0]}>
              <Col md={{span: 6}} xs={{span: 24}} lg={{span: 5}}>
                  <Form.Item name='auditcategory_ID' label='Add Category ' rules={[{required: true, message: 'Please select category'}]}>
                    <Select
                      placeholder='Select'
                      loading={gettingAuditCategory}
                      // disabled={savingCity}
                      showSearch
                      filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                      {map(
                        (AuditCategory) => {
                          return (
                            <Option key={AuditCategory.id} value={AuditCategory.id}>
                              {AuditCategory.name}
                            </Option>
                          );
                        },
                        AuditCategory ? AuditCategory.filter((e) => e.status === '1') : []
                      )}
                    </Select>
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}} lg={{span: 6}}>
                  <Form.Item name='auditsubcategory_ID' label='Add Sub Category' rules={[{required: true, message: 'Please select category'}]}>
                    <Select
                      placeholder='Select'
                      loading={gettingAuditSubCategory}
                      // disabled={savingCity}
                      showSearch
                      filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                      {map(
                        (aSubCategory) => {
                          return (aSubCategory?.audit_subcategory ?? [])?.map((aSubCategoryName, index) => {
                            return (
                              <Option key={index} value={aSubCategoryName?.id}>
                                {aSubCategoryName?.value}
                              </Option>
                            );
                          });
                        },
                        AuditSubCategory ? AuditSubCategory : []
                      )}
                      </Select>
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}} lg={{span: 12}}>
                  <Form.Item name='auditpointslist_ID' label='Select Points' rules={[{required: true, message: 'Please select points'}]}>
                    <Select
                      placeholder='Select'
                      loading={gettingAuditCategoryPointList}
                      //disabled={savingAuditPointsImage}
                      showSearch
                      filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>                    
                   {map(
                        (auditpoint) => {
                          return (
                            <Option key={auditpoint.id} value={auditpoint.id}>
                              {auditpoint.name}
                            </Option>
                          );
                        },
                        AuditCategoryPointList ? AuditCategoryPointList : []
                    )}                                                             
                    </Select>
                  </Form.Item>                 
                </Col>
                <Col md={{span: 6}} xs={{span: 24}} lg={{span: 5}}>
                  <Form.Item
                    name='image'
                    label='Image'
                    getValueFromEvent={getFile}
                    alt='No image'
                    >
                    <div style={{display: 'flex', direction: 'col'}}>
                      {defaultValue?.id && fileList?.length === 0 ? (
                        defaultValue?.image ? (
                          <Image style={{paddingRight: '10px'}} width={100} src={defaultValue?.image ?? ''}  alt='No image' />
                        ) : (
                          'No Image Available'
                        )
                      ) : (
                        <></>
                      )}
                      <Upload
                        {...props}
                        fileList={fileList}
                        name="image"
                        onPreview={handlePreview}
                        capture='environment'
                        accept='.png,.jpg,.jpeg'
                        onChange={(e) => {
                          handleChange(e);
                        }}>
                        {fileList.length >= 1 ? null : uploadButton}
                      </Upload>
                    </div>
                    <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                      <img
                        alt='example'
                        style={{
                          width: '100%'
                        }}
                        src={previewImage}
                      />
                    </Modal>
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}} lg={{span: 6}}>
                  <Form.Item
                    name='video'
                    label='Video'
                    getValueFromEvent={getFileVideo}
                    >
<div className="VideoInput">
{defaultValue?.id && fileList?.length === 0 ? (
                        defaultValue?.video ? (                          
                            <video
                              className="VideoInput_video"
                              width="300px"
                              height="300px"
                              controls
                              src={defaultValue?.video}
                               />                                                                                                                     
                        ) : (
                          'No Video Available'
                        )
                      ) : (
                        <></>
                      )}
                      <Upload
                        {...propsvideo}
                        fileList={fileListVideo}
                        name="video"
                        onPreview={handlePreviewVideo}
                        capture='environment'
                        accept='.mp4,.mkv,.gif'
                        onChange={(e) => {
                          handleChangeVideo(e);
                        }}>
                        {fileListVideo.length >= 1 ? null : uploadButtonVideo}
                      </Upload>   
                  </div>
                  <Modal open={previewOpenVideo} title={previewTitleVideo} footer={null} onCancel={handleVideoCancel}>
                                         
                    </Modal>                 
                  </Form.Item>
                </Col>               
                <Col md={{span: 6}} xs={{span: 24}} lg={{span: 4}}>
                  <Form.Item name='status' label='Status ' rules={[{required: true, message: 'Please select your status'}]}>
                    <Radio.Group>
                      <Radio.Group
                        buttonStyle='solid'
                        disabled={savingAuditPointsImage}
                        onChange={(e) => {
                          onChange();
                          setStatus(e?.target?.value);
                          }}
                        size='small'
                        defaultValue={defaultValue?.status === 'In Active' ? 0 : 1}>
                        <Radio.Button className='active' value={1}>
                          Active
                        </Radio.Button>
                        <Radio.Button className='in-active' value={0}>
                          In-Active
                        </Radio.Button>
                      </Radio.Group>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                
              
                <Col span={24}>
                  <Row gutter={[15, 15]} style={{justifyContent: 'end'}}>
                    <Col span={12} className='d-flex justify-content-end align-items-center'>
                      <Form.Item className='mx-2'>
                     <Button className='orangeFactory' type='primary' htmlType='submit' disabled={savingAuditPointsImage}>
                          {isEdit ? 'Update' : 'Add'}
                        </Button> 
                      </Form.Item>
                     
                      <Form.Item>
                        <Button disabled={savingAuditPointsImage} onClick={handleClickBack}>
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

export default AuditPointsImageForm;
