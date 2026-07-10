import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Modal, Upload } from 'antd';
// import ImgCrop from 'antd-img-crop';
import { baseURL } from '../../api/baseURL';

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const MultiUploadButton = ({ disabled, url, onSuccess = () => false }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const handleChange = (e) => {
    if (e?.file?.response) {
      onSuccess(e?.fileList);
    }
    setFileList(e?.fileList);
  };
  const uploadButton = (
    <Button disabled={disabled} style={{ display: 'flex', direction: 'row' }} icon={<PlusOutlined style={{ marginTop: '3px', marginRight: '4px' }} />}>
      <div
        style={{
          marginLeft: '3px'
        }}>
        Upload
      </div>
    </Button>
  );

  const props = {
    name: 'attachments[0]',
    action: `${baseURL}${url}`,
    headers: {
      authorization: 'authorization-text'
    }
  };
  return (
    <>
      {/* <ImgCrop> */}
      <Upload
        {...props}
        disabled={disabled}
        fileList={fileList}
        onPreview={handlePreview}
        capture='environment'
        accept='.png,.jpg,.jpeg'
        onChange={(e) => {
          handleChange(e);
        }}>
        {uploadButton}
        {/* {fileList.length >= 1 ? null : uploadButton} */}
      </Upload>
      {/* </ImgCrop> */}

      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img
          alt='example'
          style={{
            width: '100%'
          }}
          src={previewImage}
        />
      </Modal>
    </>
  );
};
