/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {Input, Card, Select, Button, Radio, Col, Row, Form, Space} from 'antd';
import {useLocation, useNavigate} from 'react-router';
import {useDispatch, useSelector} from 'react-redux';
import {transStatus} from '../../../util/transStatus';
import {addAuditSubCategory, getAuditCategory, updateAuditSubCategory} from '../../../@app/master/masterSlice';
import {map} from 'ramda';
import ConfirmOnExit from '../../../components/confirmOnExit/ConfirmOnExit';
const {Option} = Select;

function AuditSubCategoryForm() {
  const {
    state: {data: defaultValue = {}, isEdit = false}
  } = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [status, setStatus] = useState(defaultValue?.status ?? 1);

  const {
    savingAuditSubCategory,
    getAuditCategoryResponse: {data: AuditCategory}
  } = useSelector((state) => {
    return state.master;
  });

  useEffect(() => {
    dispatch(getAuditCategory());
  }, [dispatch]);

  const handleClickBack = () => {
    navigate('/auditSubCategory');
  };
  const [showDialog, setShowDialog] = useState(false);

  const onFinish = (data) => {
    setShowDialog(false);
    const {add_sub_category, ...restOfData} = data;
    dispatch(
      defaultValue?.mode === 'edit'
        ? updateAuditSubCategory({data: {...restOfData, auditcategory_ID: defaultValue.auditcategory_id}})
        : addAuditSubCategory({data: {...restOfData}})
    ).then(({status}) => {
      if (status === 200) {
        form.resetFields();
        navigate('/auditSubCategory');
      }
    });
  };
  return (
    <>
      <Card>
        <ConfirmOnExit showModel={showDialog} />
        <Row style={{justifyContent: 'center'}}>
          <Col span={24}>
            <Form
              disabled={defaultValue?.auditcategory_status === '0'}
              onFieldsChange={() => setShowDialog(true)}
              name='basic'
              labelCol={{span: 24}}
              form={form}
              wrapperCol={{span: 24}}
              initialValues={{
                status: defaultValue?.status ?? '1',
                auditcategory_ID: defaultValue?.auditcategory_id,
                audit_subcategories: defaultValue?.audit_subcategory,
                ...defaultValue
              }}
              onFinish={onFinish}
              autoComplete='off'>
              <Row gutter={[15, 0]}>
                <Col md={{span: 6}} xs={{span: 24}} lg={4}>
                  <Form.Item name='auditcategory_ID' label='Add Category ' rules={[{required: true, message: 'Please select category'}]} disabled={savingAuditSubCategory}>
                    <Select
                      placeholder='select audit category'
                      disabled={savingAuditSubCategory || defaultValue?.auditcategory_status === '0'}
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
                <Col md={{span: 6}} xs={{span: 24}} lg={8}>
                  <Form.Item name='audit_subcategories' label='Add Sub Category'>
                    <Form.List
                      name='audit_subcategories'
                      rules={[
                        {
                          validator: async (_, names) => {
                            if (!names || names.length < 1) {
                              return Promise.reject(new Error('At least add 1 Add Sub Category'));
                            }
                          }
                        }
                      ]}>
                      {(fields, {add, remove}, {errors}) => (
                        <div>
                          {fields.map((field, index) => (
                            <Space
                              key={index}
                              disabled={defaultValue?.auditcategory_status === '0'}
                              style={{
                                display: 'flex',
                                // marginBottom: 8,
                                justifyContent: 'space-between',
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
                                    message: 'Please input Add Sub Category or delete this field.'
                                  }
                                ]}>
                                <Input
                                  style={{
                                    width: '100% '
                                  }}
                                  placeholder='Add Sub Category'
                                  disabled={savingAuditSubCategory || defaultValue?.auditcategory_status === '0'}
                                />
                              </Form.Item>

                              <Form.Item
                                {...field}
                                name={[field.name, 'status']}
                                initialValue={1}
                                rules={[
                                  {
                                    required: true,
                                    message: 'Missing Status'
                                  }
                                ]}>
                                <Radio.Group
                                  defaultValue={1}
                                  disabled={defaultValue?.auditcategory_status === '0'}
                                  buttonStyle='solid'
                                  style={{
                                    display: 'flex'
                                  }}>
                                  <Radio.Button value={defaultValue?.mode === 'edit' ? '1' : 1} className='active'>
                                    Active
                                  </Radio.Button>
                                  <Radio.Button value={defaultValue?.mode === 'edit' ? '0' : 0} className='in-active'>
                                    InActive
                                  </Radio.Button>
                                </Radio.Group>
                              </Form.Item>

                              <MinusCircleOutlined onClick={() => (defaultValue?.auditcategory_status === '0' ? () => {} : remove(field.name))} />
                            </Space>
                          ))}
                          <Form.Item>
                            <Button
                              type='dashed'
                              onClick={() => (defaultValue?.auditcategory_status === '0' ? () => {} : add())}
                              style={{width: '40%', paddingLeft: '5px', backgroundColor: 'green', color: 'white'}}
                              icon={<PlusOutlined style={{}} />}
                              disabled={savingAuditSubCategory || defaultValue?.auditcategory_status === '0'}>
                              Add field
                            </Button>

                            <Form.ErrorList errors={errors} />
                          </Form.Item>
                        </div>
                      )}
                    </Form.List>
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Row gutter={[15, 15]} style={{justifyContent: 'çenter'}}>
                    <Col span={12} style={{textAlign: 'right'}}>
                      <Form.Item>
                        <Button className='orangeFactory' type='primary' htmlType='submit' disabled={savingAuditSubCategory}>
                          {isEdit ? 'Update' : 'Add'}
                        </Button>
                      </Form.Item>
                      <Form.Item>
                        <Button disabled={savingAuditSubCategory} onClick={handleClickBack}>
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

export default AuditSubCategoryForm;
