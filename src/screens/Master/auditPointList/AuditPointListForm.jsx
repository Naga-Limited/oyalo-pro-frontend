/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {Input, Card, Select, Button, Radio, Col, Row, Form, Space} from 'antd';
import {useLocation, useNavigate} from 'react-router';
import {useDispatch, useSelector} from 'react-redux';
import {addAuditPointList, getAuditCategory, getAuditSubCategory, updateAuditPointList} from '../../../@app/master/masterSlice';
import {map} from 'ramda';
import ConfirmOnExit from '../../../components/confirmOnExit/ConfirmOnExit';
const {Option} = Select;

function AuditPointListForm() {
  const {
    state: {data: defaultValue = {}, isEdit = false}
  } = useLocation();

  const [statusInActive, setStatusInActive] = useState(Number(defaultValue?.audit_subcategory_status === '0'));
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auditcategory_ID = Form.useWatch('auditcategory_ID', form);

  const onFinish = (data) => {
    setShowDialog(false);
    const {audit_points, ...restOfData} = data;
    dispatch(
      defaultValue?.mode === 'edit'
        ? updateAuditPointList({
            data: {
              audit_pointlists: restOfData?.audit_pointlists,
              auditcategory_ID: defaultValue?.auditcategory_id,
              auditsubcategory_ID: defaultValue?.auditsubcategory_id
            }
          })
        : addAuditPointList({data: {...restOfData}})
    ).then(({status}) => {
      if (status === 200) {
        navigate('/auditPointList');
        form.resetFields();
      }
    });
  };

  const {
    gettingAuditCategory,
    gettingAuditSubCategory,
    getAuditSubCategoryResponse: {data: AuditSubCategory},
    getAuditCategoryResponse: {data: AuditCategory}
  } = useSelector((state) => {
    return state.master;
  });

  useEffect(() => {
    dispatch(getAuditCategory());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAuditSubCategory(auditcategory_ID));
  }, [dispatch, auditcategory_ID]);

  const handleClickBack = () => {
    navigate('/auditPointList');
  };

  const formItemLayout = {
    labelCol: {
      xs: {span: 24},
      sm: {span: 4}
    },
    wrapperCol: {
      xs: {span: 24},
      sm: {span: 20}
    }
  };
  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: {span: 24, offset: 0},
      sm: {span: 20, offset: 0}
    }
  };

  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <Card>
        <ConfirmOnExit showModel={showDialog} />
        <Row style={{justifyContent: 'center'}}>
          <Col span={24}>
            <Form
              onFieldsChange={() => setShowDialog(true)}
              name='basic'
              disabled={statusInActive}
              labelCol={{span: 24}}
              wrapperCol={{span: 24}}
              initialValues={{
                status: defaultValue?.status ?? 1,
                auditcategory_ID: defaultValue?.auditcategory_id,
                auditsubcategory_ID: defaultValue?.auditsubcategory_id,
                name: defaultValue?.audit_pointlist,
                ...defaultValue
              }}
              onFinish={onFinish}
              autoComplete='off'
              form={form}>
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
                        AuditCategory ? AuditCategory : []
                      )}
                    </Select>
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}} lg={{span: 5}}>
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
                  <Form.Item name='audit_pointlists' label='Audit Points'>
                    <Form.List
                      name='audit_pointlists'
                      rules={[
                        {
                          validator: async (_, name) => {
                            if (!name || name.length < 2) {
                              return Promise.reject(new Error('At least 2 points'));
                            }
                          }
                        }
                      ]}>
                      {(fields, {add, remove}, {errors}) => (
                        <>
                          {fields.map((field, index) => (
                            // <Form.Item {...( index === 0 ? formItemLayout : formItemLayoutWithOutLabel )} required={false} key={field.key}>
                            //   <Form.Item
                            //     {...field}
                            //     validateTrigger={['onChange', 'onBlur']}
                            //     rules={[
                            //       {
                            //         required: true,
                            //         whitespace: true,
                            //         message: 'Please input Point content or delete this field.'
                            //       }
                            //     ]}
                            //     noStyle>
                            //     <Input placeholder='Points' style={{ width: '90%' }} />
                            //   </Form.Item>
                            //   {fields.length > 1 ? <MinusCircleOutlined className='dynamic-delete-button' style={{ paddingLeft: '6px' }} onClick={() => remove( field.name )} /> : null}
                            // </Form.Item>
                            <Space
                              key={field.key}
                              style={{
                                display: 'flex',
                                gap: '20px',
                                alignItems: 'baseline'
                              }}>
                              <Form.Item {...field} name={[field.name, 'id']} initialValue={0} />
                              <Form.Item
                                {...field}
                                name={[field.name, 'name']}
                                validateTrigger={['onChange', 'onBlur']}
                                rules={[
                                  {
                                    required: true,
                                    whitespace: true,
                                    message: 'Please input Point content or delete this field.'
                                  }
                                ]}>
                                <Input
                                  style={{
                                    width: '100% '
                                  }}
                                  placeholder='Add Points'
                                />
                              </Form.Item>
                              <Form.Item
                                align='baseline'
                                noStyle
                                shouldUpdate={(prevValues, curValues) => prevValues.area !== curValues.area || prevValues.sights !== curValues.sights}>
                                <Form.Item
                                  {...field}
                                  name={[field.name, 'status']}
                                  initialValue={'1'}
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Missing Status'
                                    }
                                  ]}>
                                  <Radio.Group
                                    defaultValue={'1'}
                                    buttonStyle='solid'
                                    style={{
                                      display: 'flex'
                                    }}>
                                    <Radio.Button value={'1'} className='active'>
                                      Active
                                    </Radio.Button>
                                    <Radio.Button value={'0'} className='in-active'>
                                      InActive
                                    </Radio.Button>
                                  </Radio.Group>
                                </Form.Item>
                              </Form.Item>
                              <MinusCircleOutlined onClick={() => (statusInActive ? () => {} : remove(field.name))} />
                            </Space>
                          ))}
                          <Form.Item>
                            <Button
                              type='dashed'
                              onClick={() => add()}
                              style={{width: '20%', paddingLeft: '5px', backgroundColor: 'green', color: 'white'}}
                              icon={<PlusOutlined style={{}} />}>
                              Add field
                            </Button>

                            <Form.ErrorList errors={errors} />
                          </Form.Item>
                        </>
                      )}
                    </Form.List>
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Row gutter={[15, 15]} style={{justifyContent: 'end'}}>
                    <Col span={12} className='d-flex justify-content-end align-items-center'>
                      <Form.Item className='mx-2'>
                        <Button
                          className='orangeFactory'
                          type='primary'
                          htmlType='submit'
                          disabled={0}
                          // disabled={savingAuditCategory}
                        >
                          {isEdit ? 'Update' : 'Add'}
                        </Button>
                      </Form.Item>
                      {/* </Col>
                    <Col span={12}> */}
                      <Form.Item>
                        <Button
                          disabled={0}
                          // disabled={savingAuditCategory}
                          onClick={handleClickBack}>
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

export default AuditPointListForm;
