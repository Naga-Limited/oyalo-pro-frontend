/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {Input, Card, Select, Button, Radio, Col, Row, Form, Space} from 'antd';
import {useLocation, useNavigate} from 'react-router';
import {useDispatch, useSelector} from 'react-redux';
import {transStatus} from '../../../util/transStatus';
import {addAuditSubCategory, getAuditCategory, updateAuditSubCategory} from '../../../@app/master/masterSlice';
import {map} from 'ramda';
import {getAssetGroup, saveAssetGroupSpare, updateAssetGroupSpare} from '../../../@app/service/serviceSlice';
import messageToast from '../../../components/messageToast/messageToast';
const {Option} = Select;

function AssetGroupSpareForm() {
  const {
    state: {data: defaultValue = {}}
  } = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [status, setStatus] = useState(defaultValue?.status ?? 1);

  const {
    savingAssetGroupSpare,
    gettingAssetGroup,
    getAssetGroupResponse: {data: assetGroups}
  } = useSelector((state) => {
    return state.service;
  });

  useEffect(() => {
    dispatch(getAssetGroup());
  }, [dispatch]);

  const handleClickBack = () => {
    navigate('/AssetGroupSpare');
  };

  const onFinish = (data) => {
    dispatch(defaultValue?.mode === 'edit' ? updateAssetGroupSpare(
      { data: { ...data, id: defaultValue.id} }
    ) : saveAssetGroupSpare({data})).then(({message, status, statusText}) => {
      messageToast({message: message ?? statusText, status, title: 'Asset Group Spare Master'});
      if (status === 200) {
        form.resetFields();
        navigate('/AssetGroupSpare');
      }
    });
  };

  return (
    <>
      <Card>
        <Row style={{justifyContent: 'center'}}>
          <Col span={24}>
            <Form
              name='basic'
              labelCol={{span: 24}}
              form={form}
              wrapperCol={{span: 24}}
              initialValues={{
                status: defaultValue?.status ?? 1,
                auditcategory_ID: defaultValue?.auditcategory_id,
                name: defaultValue?.audit_subcategory,
                ...defaultValue
              }}
              onFinish={onFinish}
              autoComplete='off'>
              <Row gutter={[15, 0]}>
                <Col md={{span: 6}} xs={{span: 24}} lg={4}>
                  <Form.Item name='asset_group_id' label='Add Asset Group ' rules={[{required: true, message: 'Please select Asset Group'}]} disabled={savingAssetGroupSpare}>
                    <Select
                      placeholder='select Asset Group'
                      disabled={gettingAssetGroup}
                      showSearch
                      filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                      {map(
                        (assetGroup) => {
                          return (
                            <Option key={assetGroup.id} value={assetGroup.id}>
                              {assetGroup.name}
                            </Option>
                          );
                        },
                        assetGroups ? assetGroups : []
                      )}
                    </Select>
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}} lg={8}>
                  <Form.Item name='asset_group_spares' label='Add Asset Spare'>
                    <Form.List
                      name='asset_group_spares'
                      rules={[
                        {
                          validator: async (_, names) => {
                            if (!names || names.length < 1) {
                              return Promise.reject(new Error('At least add 1 Asset Spare'));
                            }
                          }
                        }
                      ]}>
                      {(fields, {add, remove}, {errors}) => (
                        <div>
                          {fields.map((field, index) => (
                            <Space
                              key={field.key}
                              style={{
                                display: 'flex',
                                // marginBottom: 8,
                                justifyContent: 'space-between',
                                alignItems: 'baseline'
                              }}>
                              <Form.Item
                                {...field}
                                name={[field.name, 'name']}
                                validateTrigger={['onChange', 'onBlur']}
                                rules={[
                                  {
                                    required: true,
                                    whitespace: true,
                                    message: 'Please input Add Asset Spare or delete this field.'
                                  },
                                  {
                                    pattern: /^[a-zA-Z0-9' '  ]*$/,
                                    message: 'Invalid value'
                                  }
                                ]}>
                                <Input
                                  style={{
                                    width: '100% '
                                  }}
                                  placeholder='Add Asset Spare'
                                  disabled={savingAssetGroupSpare}
                                />
                              </Form.Item>
                              <Form.Item
                                align='baseline'
                                noStyle
                                shouldUpdate={(prevValues, curValues) => prevValues.area !== curValues.area || prevValues.sights !== curValues.sights}
                                rules={[
                                  {
                                    required: true,
                                    message: 'Please slect your status'
                                  }
                                ]}>
                                {() => (
                                  <Form.Item
                                    initialValue={1}
                                    {...field}
                                    name={[field.name, 'status']}
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Please slect your status'
                                      }
                                    ]}>
                                    <Radio.Group
                                      defaultValue={1}
                                      buttonStyle='solid'
                                      style={{
                                        display: 'flex'
                                      }}>
                                      <Radio.Button value={defaultValue?.mode === 'edit' ? 1 : 1} className='active'>
                                        Active
                                      </Radio.Button>
                                      <Radio.Button value={defaultValue?.mode === 'edit' ? 0 : 0} className='in-active'>
                                        InActive
                                      </Radio.Button>
                                    </Radio.Group>
                                  </Form.Item>
                                )}
                              </Form.Item>

                              <MinusCircleOutlined onClick={() => remove(field.name)} />
                            </Space>
                          ))}
                          <Form.Item>
                            <Button
                              type='dashed'
                              onClick={() => add()}
                              style={{width: '40%', paddingLeft: '5px', backgroundColor: 'green', color: 'white'}}
                              icon={<PlusOutlined style={{}} />}
                              disabled={savingAssetGroupSpare}>
                              Add field
                            </Button>

                            <Form.ErrorList errors={errors} />
                          </Form.Item>
                        </div>
                      )}
                    </Form.List>
                  </Form.Item>
                </Col>

                {/* <Col span={24}>
                  <Form.Item name='status' label='Status'>
                    <Space direction='vertical'>
                      <Col span={24}>
                        <Radio.Group
                          disabled={savingAssetGroupSpare}
                          buttonStyle='solid'
                          defaultValue={defaultValue?.status === 'In Active' ? 0 : 1}
                          onChange={( e ) => {
                            setStatus( e?.target?.value );
                          }}
                          size='small'>
                          <Radio.Button className='active' value={1}>
                            Active
                          </Radio.Button>
                          <Radio.Button className='in-active' value={0}>
                            In-Active
                          </Radio.Button>
                        </Radio.Group>
                      </Col>
                    </Space>
                  </Form.Item>
                </Col> */}
                {/* <Col span={24}>
                  <Row gutter={[15, 15]} style={{ justifyContent: 'çenter' }}>
                    <Col span={12} style={{ textAlign: 'right' }}>
                      <Form.Item>
                        <Button className='orangeFactory' type='primary' htmlType='submit' disabled={savingAssetGroupSpare}>
                          Submit
                        </Button>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item>
                        <Button disabled={savingAssetGroupSpare} onClick={handleClickBack}>
                          Back
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Col> */}

                <Col span={24}>
                  <Row gutter={[15, 15]} style={{justifyContent: 'end'}}>
                    <Col span={12} className='d-flex justify-content-end align-items-center'>
                      <Form.Item className='mx-2'>
                        <Button className='orangeFactory' type='primary' htmlType='submit' disabled={savingAssetGroupSpare}>
                          Submit
                        </Button>
                      </Form.Item>
                      {/* </Col>
                    <Col span={12}> */}
                      <Form.Item>
                        <Button disabled={savingAssetGroupSpare} onClick={handleClickBack}>
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

export default AssetGroupSpareForm;
