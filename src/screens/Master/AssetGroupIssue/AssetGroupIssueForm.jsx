/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {Input, Card, Select, Button, Radio, Col, Row, Form, Space} from 'antd';
import {useLocation, useNavigate} from 'react-router';
import {useDispatch, useSelector} from 'react-redux';
import {transStatus} from '../../../util/transStatus';
import {addAuditSubCategory, getAuditCategory, updateAuditSubCategory} from '../../../@app/master/masterSlice';
import {map} from 'ramda';
import {getAssetGroup, saveAssetGroupIssue, updateAssetGroupIssue} from '../../../@app/service/serviceSlice';
import messageToast from '../../../components/messageToast/messageToast';
import ConfirmOnExit from '../../../components/confirmOnExit/ConfirmOnExit';
const {Option} = Select;

function AssetGroupIssueForm() {
  const {
    state: {data: defaultValue = {}}
  } = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [status, setStatus] = useState(defaultValue?.status ?? 1);
  const [showDialog, setShowDialog] = useState(false);

  const {
    savingAssetGroupIssue,
    gettingAssetGroup,
    getAssetGroupResponse: {data: assetGroups}
  } = useSelector((state) => {
    return state.service;
  });

  useEffect(() => {
    dispatch(getAssetGroup());
  }, [dispatch]);

  const handleClickBack = () => {
    navigate('/AssetGroupIssue');
  };

  const onFinish = (data) => {
    setShowDialog(false);
    dispatch(defaultValue?.mode === 'edit' ? updateAssetGroupIssue(
      { data: { ...data, id: defaultValue.id } })
       : saveAssetGroupIssue({data})).then(({message, status, statusText}) => {
      if (status === 200) {
        form.resetFields();
        messageToast({message: message ?? statusText, status, title: 'Asset Group Issue Master'});
        navigate('/AssetGroupIssue');
      } else {
        if(message?.issue_ids){
          messageToast({message: message.issue_ids[0] , status, title: 'Asset Group Issue Master'});
        }
        messageToast({message: message, status, title: 'Asset Group Issue Master'});
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
              onFieldsChange={() => setShowDialog(true)}
              name='basic'
              labelCol={{span: 24}}
              form={form}
              wrapperCol={{span: 24}}
              initialValues={{
                ...defaultValue
              }}
              onFinish={onFinish}
              autoComplete='off'>
              <Row gutter={[15, 0]}>
                <Col md={{span: 6}} xs={{span: 24}} lg={4}>
                  <Form.Item
                    name='asset_group_id'
                    label='Asset Group'
                    rules={[{required: true, message: 'Please select Asset Group'}]}
                    disabled={gettingAssetGroup || savingAssetGroupIssue}>
                    <Select
                      placeholder='select Asset Group'
                      disabled={gettingAssetGroup || savingAssetGroupIssue }
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
                  <Form.Item name='asset_group_issues' label='Add Asset Group issue'>
                    <Form.List
                      name='asset_group_issues'
                      rules={[
                        {
                          validator: async (_, names) => {
                            if (!names || names.length < 1) {
                              return Promise.reject(new Error('At least add 1 Asset Group issue'));
                            }
                          }
                        }
                      ]}>
                      {(fields, {add, remove}, {errors}) => (
                        <div>
                          {fields.map((field, index) => (
                            <Space
                              key={field.id}
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
                                    message: 'Please input Asset Group issue or delete this field.'
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
                                  placeholder='Add Asset Group Issue'
                                  disabled={savingAssetGroupIssue}
                                />
                              </Form.Item>
                              <Form.Item
                                align='baseline'
                                noStyle
                                shouldUpdate={(prevValues, curValues) => prevValues.area !== curValues.area || prevValues.sights !== curValues.sights}>
                                {() => (
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
                                      disabled={savingAssetGroupIssue}
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
                              disabled={savingAssetGroupIssue}>
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
                  <Row gutter={[15, 15]} style={{justifyContent: 'end'}}>
                    <Col span={12} className='d-flex justify-content-end align-items-center'>
                      <Form.Item className='mx-2'>
                        <Button className='orangeFactory' type='primary' htmlType='submit' loading={savingAssetGroupIssue} disabled={savingAssetGroupIssue}>
                          Submit
                        </Button>
                      </Form.Item>
                      <Form.Item>
                        <Button disabled={savingAssetGroupIssue} onClick={handleClickBack}>
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

export default AssetGroupIssueForm;
