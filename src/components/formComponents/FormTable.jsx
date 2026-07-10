import React from 'react';
import {Button, Card, Image, Input, Modal, Table} from 'antd';
import {UploadButton} from './FormUploadButton';
import {flatten, map} from 'ramda';
import {Controller} from 'react-hook-form';

const FormTable = (props) => {
  const {data, register, control, setValue, getValues, addonMark, index, mode = 'entry', addOnEditMark, editMode = false, capa_status, checkAbleToSubmit} = props;
  const {subcategory, id: category_id, state} = data;
  let pointArray = [];

  pointArray = map((e) => {
    const {name, pointlist, id: Sub_CategoryID} = e;
    return (pointlist ?? [])?.map((point, index) => {
      const {mark, name: pointName, id: pointsID, capa_mark} = point;

      return {key: index, sno: index + 1, subCategoryName: name, eligible_Score: mark, pointName, capa: capa_mark, Sub_CategoryID, pointsID, category_id};
    });
  }, subcategory ?? []);

  const gridData = (mode === 'entry' && !editMode ? flatten(pointArray) : subcategory)?.map((e, index) => {
    return {...e, key: index, sno: index + 1};
  });

  const handleOnChange = (record) => {
    if (mode === 'entry' && !editMode) {
      Object.keys(record)
        // eslint-disable-next-line array-callback-return
        .map((key) => {
          if (key !== 'key' && key !== 'pointName' && key !== 'sno' && key !== 'subCategoryName' && key !== 'actual_Score')
            setValue(`category[${index}].[${record.sno - 1}].${key}`, editMode ? record[key] : String(record[key]));
        });
      setValue(
        `category[${index}].[${record.sno - 1}].status_capa`,
        Number(getValues(`category[${index}].[${record.sno - 1}].actual_Score`)) > Number(getValues(`category[${index}].[${record.sno - 1}].capa`)) ? '1' : '0'
      );
      addonMark();
    }
    if (mode === 'CAPA') {
      setValue(`mark[${record?.pointsID}].pointsID`, record?.pointsID);
      checkAbleToSubmit();
    }
    if (mode === 'Approval') {
      setValue(`mark[${record?.pointsID}].pointsID`, record?.pointsID);
      addOnEditMark(getValues());
    }
    if (mode === 'entry' && editMode) {
      setValue(`mark[${record?.pointsID}].pointsID`, record?.pointsID);
      addOnEditMark(getValues());
    }
  };

  const info = (record) => {
    Modal.info({
      title: 'CAPA Submission Details',
      content: (
        <Card className='view-data' style={{width: '100%'}}>
          <div key={4521} className='flex flex-row view-container' style={{fontFamily: 'sans-serif', padding: '2px'}}>
            <div style={{width: '50%'}}>
              <div className='pb-2'>Remark </div>
            </div>
            <div style={{display: 'flex', direction: 'row'}}>
              <div style={{paddingRight: '8px'}}> : </div>
              <div className='view-value' style={{color: '#f5a60b', alignSelf: 'center', flexWrap: 'wrap', wordWrap: 'break-word', wordBreak: 'break-all'}}>
                <span className='3' style={{flexWrap: 'wrap'}}>
                  <div key={index} style={{paddingBottom: '5px'}}>
                    {record?.capa_remark ?? 'No Remarks'}
                  </div>
                </span>
              </div>
            </div>
          </div>
          <div key={4221} className='flex flex-col view-container' style={{fontFamily: 'sans-serif', padding: '2px'}}>
            <div style={{width: '50%'}}>
              <div className='pb-2'>Capa Image </div>
            </div>
            <div style={{display: 'flex', direction: 'col'}}>
              <div style={{paddingRight: '8px'}}> : </div>
              <div className='view-value' style={{color: '#f5a60b', alignSelf: 'center', flexWrap: 'wrap', wordWrap: 'break-word', wordBreak: 'break-all'}}>
                <span className='3' style={{flexWrap: 'wrap'}}>
                  <div key={index} style={{paddingBottom: '5px'}}>
                    <Image width={50} src={record?.capa_attachments} />
                  </div>
                </span>
              </div>
            </div>
          </div>
        </Card>
      ),
      onOk() {}
    });
  };

  const columns = [
    {
      title: 'S.No',
      dataIndex: 'sno',
      width: '4%'
    },
    {
      title: 'Sub Category',
      dataIndex: mode === 'entry' && !editMode ? 'subCategoryName' : 'subcategory_name',
      width: '10%'
    },
    {
      title: 'Points',
      dataIndex: mode === 'entry' && !editMode ? 'pointName' : 'pointname',
      width: '35%'
    },
    {
      title: 'Eligible Score',
      dataIndex: 'eligible_Score',
      width: '8%'
    },

    {
      title: 'Actual Score',
      dataIndex: 'actualScore',
      width: '8%',
      render: (e, record) => {
        return (
          <>
            <Controller
              control={control}
              name={mode === 'Approval' || (mode === 'entry' && editMode) ? `mark[${record.pointsID}].actual_Score` : `category[${index}].[${record?.sno - 1}].actual_Score`}
              defaultValue={editMode ? Number(record?.actual_Score) : record?.actual_Score}
              render={({field: {onChange, value}}) => (
                <Input
                  disabled={mode === 'CAPA' || mode == 'entryView' || (mode === 'Approval' && record.status_capa === '1')}
                  {...register(
                    mode === 'Approval' || (mode === 'entry' && editMode) ? `mark[${record.pointsID}].actual_Score` : `category[${index}].[${record?.sno - 1}].actual_Score`,
                    {
                      required: true
                    }
                  )}
                  value={value}
                  key={record?.key}
                  name='actual_Score'
                  onChange={(e) => {
                    onChange(e);
                    handleOnChange(record);
                  }}
                />
              )}
            />
            {(Number(getValues(`category[${index}][${record.sno - 1}].actual_Score`)) > getValues(`category[${index}][${record.sno - 1}].eligible_Score`) ||
              getValues(`mark[${record.pointsID}].actual_Score`) > Number(record.eligible_Score)) && <p style={{color: 'red'}}>Actual mark not greater then Eligible mark</p>}
          </>
        );
      }
    },
    {
      title: 'Attachments',
      dataIndex: 'attachments',
      render: (_, record) => (
        <UploadButton
          {...{setValue, index, record, control, disabled: !(mode === 'entry' || mode === 'entryView' || mode === 'CAPA'), mode, editMode, capa_status: state?.capa_status}}
        />
      ),
      width: '6%'
    },

    {
      title: 'CAPA Image',
      dataIndex: 'capaImage',
      render: (_, record) => {
        return <UploadButton {...{setValue, index, record, control, disabled: record?.status_capa === '1', handleOnChange}} />;
      },
      width: '6%',
      hidden: mode !== 'CAPA'
    },
    {
      title: 'CAPA Remark',
      dataIndex: 'capaRemark',
      render: (e, record) => {
        return (
          <>
            <Controller
              control={control}
              name={`mark[${record.pointsID}].capa_remark`}
              defaultValue={record?.capa_remark}
              render={({field: {onChange}}) => (
                <Input
                  disabled={record?.status_capa === '1'}
                  key={record?.key}
                  name='remark'
                  onChange={(e) => {
                    onChange(e);
                    handleOnChange(record);
                  }}
                  value={e}
                />
              )}
            />
          </>
        );
      },
      width: '12%',
      hidden: mode !== 'CAPA'
    },

    {
      title: 'Remark',
      dataIndex: 'remark',
      width: '15%',
      render: (e, record) => {
        return (
          <>
            <Controller
              control={control}
              name={`category[${index}].[${record?.sno - 1}].remark`}
              defaultValue={mode === 'Approval' ? record?.remark : ''}
              render={({field: {onChange}}) => (
                <Input
                  disabled={mode !== 'entry'}
                  key={record?.key}
                  name='remark'
                  onChange={(e) => {
                    onChange(e);
                    handleOnChange(record);
                  }}
                  value={e}
                />
              )}
            />
          </>
        );
      }
    },
    {
      title: 'CAPA Details',
      dataIndex: 'capaDetails',
      render: (_, record) => (
        <Button disabled={record?.status_capa === '1'} onClick={() => info(record)}>
          Info
        </Button>
      ),
      width: '6%',
      hidden: (mode === 'Approval' && capa_status === '1') || state?.capa_status === '1' || (mode === 'entry' && !editMode) || mode === 'CAPA'
    }
  ].filter((item) => !item.hidden);

  return (
    <div>
      <Table rowClassName={() => 'editable-row'} bordered dataSource={gridData} columns={columns} />
    </div>
  );
};
export default FormTable;
