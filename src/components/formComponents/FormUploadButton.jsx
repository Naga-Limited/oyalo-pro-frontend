import React, {useState} from 'react';
import {PlusOutlined} from '@ant-design/icons';
import {Button, Image, Modal, Upload} from 'antd';
import {Controller} from 'react-hook-form';
import {baseURL} from '../../api/baseURL';

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const UploadButton = ({setValue, index, record, control, disabled, mode, handleOnChange, editMode}) => {
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
    setFileList(e?.fileList);
    setValue(`category[${index}].[${record?.sno - 1}].attachments`, e?.file?.response?.filename ?? '');
  };

  const uploadButton = (
    <Button disabled={disabled} style={{display: 'flex', direction: 'row'}} icon={<PlusOutlined style={{marginTop: '3px', marginRight: '4px'}} />}>
      <div
        style={{
          marginLeft: '3px'
        }}>
        Upload
      </div>
    </Button>
  );

  const props = {
    name: 'image',
    action: `${baseURL}audit-entry-imageupload`,
    headers: {
      authorization: 'authorization-text'
    }
  };
  return (
    <>
      <Controller
        control={control}
        name={`mark[${record.pointsID}].capa_attachments`}
        defaultValue=''
        render={({field: {onChange}}) =>
          mode === 'Approval' || mode === 'CAPA' || mode === 'entryView' || editMode ? (
            record?.attachments ? (
              <Image width={50} src={record?.attachments} />
            ) : (
              'No Attachments'
            )
          ) : (
            <Upload
              {...props}
              disabled={disabled}
              fileList={fileList}
              onPreview={handlePreview}
              capture='environment'
              accept='.png,.jpg,.jpeg'
              onChange={(e) => {
                handleChange(e);
                onChange(e?.fileList?.length > 0 ? e?.file?.response?.filename : '');
                if (handleOnChange) handleOnChange(record);
              }}>
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
          )
        }
      />
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
