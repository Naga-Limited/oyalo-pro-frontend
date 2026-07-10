import React, {useEffect, useState} from 'react';
import {Card, Select, Button, Col, Row, Form, Input, Radio} from 'antd';
import {map} from 'ramda';
import {saveSubZonal, getStates, getZonal, updateSubZonal} from '../../../@app/subMaster/subMasterSlice';
import {useDispatch, useSelector} from 'react-redux';
import messageToast from '../../../components/messageToast/messageToast';
import {useLocation, useNavigate} from 'react-router';
import {transStatus} from '../../../util/transStatus';
import ConfirmOnExit from '../../../components/confirmOnExit/ConfirmOnExit';
const {Option} = Select;

function SubZoneMasterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const stateID = Form.useWatch('stateID', form);

  const {
    getStatesResponse: {data: states},
    gettingState,
    gettingZonal,
    savingSubZonal,
    getZonalResponse: {data: Zonals}
  } = useSelector((state) => {
    return state.subMaster;
  });

  const {
    state: {data: defaultValue, isEdit = false}
  } = useLocation();

  const [status, setStatus] = useState(defaultValue?.status ?? 1);

  useEffect(() => {
    dispatch(getStates());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getZonal(stateID));
  }, [dispatch, stateID]);

  const { userData } = useSelector((state) => state.auth);
  
  const onFinish = (data) => {
    setShowDialog(false);
    dispatch(defaultValue?.id ? updateSubZonal({data: {...data, 
      updated_by: userData.data?.id ?? "0",
      status: transStatus({status}), id: defaultValue.id}}) : saveSubZonal({data, 
        created_by: userData.data?.id ?? "0",
        status: transStatus({status})})).then(
      ({message, status, statusText}) => {
        if (status === 200) {
          form.resetFields();
          navigate('/subZoneMaster');
        }
        messageToast({message: message ?? statusText, status, title: 'Sub Zone Master'});
      }
    );
  };

  const handleClickBack = () => {
    navigate('/subZoneMaster');
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
              labelCol={{span: 24}}
              wrapperCol={{span: 24}}
              initialValues={{stateID: defaultValue?.state_id, zoneID: defaultValue?.zonal_id, name: defaultValue?.name, status: defaultValue?.status ?? 1}}
              onFinish={onFinish}
              form={form}
              autoComplete='off'>
              <Row gutter={[15, 0]}>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='stateID' label='State' rules={[{required: true, message: 'Please select state'}]}>
                    <Select
                      placeholder='Select'
                      loading={gettingState}
                      defaultValue={defaultValue?.state_id}
                      disabled={savingSubZonal}
                      showSearch
                      filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                      {map(
                        (state) => {
                          return (
                            <Option key={state.id} value={state.id}>
                              {state.name}
                            </Option>
                          );
                        },
                        states ? states.filter((e) => e.status === '1') : []
                      )}
                    </Select>
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='zoneID' label='Zone' rules={[{required: true, message: 'Please select zone'}]}>
                    <Select
                      placeholder='Select'
                      loading={gettingZonal}
                      defaultValue={defaultValue?.zonal_id}
                      disabled={savingSubZonal}
                      showSearch
                      filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                      {map(
                        (Zonal) => {
                          return (
                            <Option key={Zonal.id} value={Zonal.id}>
                              {Zonal.zonal_name}
                            </Option>
                          );
                        },
                        Zonals ? Zonals.filter((e) => e.status === '1') : []
                      )}
                    </Select>
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='name' label='Add Sub Zone' rules={[{required: true, message: 'Please select add sub zone'}]}>
                    <Input placeholder='Enter sub zone name' name='name' defaultValue={defaultValue?.subzonel_name} disabled={savingSubZonal} />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item name='status' label='Status ' rules={[{required: true, message: 'Please slect your status'}]}>
                    <Col span={24}>
                      <Radio.Group
                        buttonStyle='solid'
                        onChange={(e) => {
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
                    </Col>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Row gutter={[15, 15]} style={{justifyContent: 'end'}}>
                    <Col span={12} style={{textAlign: 'right'}} className='d-flex align-items-center justify-content-end mt-3'>
                      <Form.Item className='mx-2'>
                        <Button className='orangeFactory' type='primary' htmlType='submit' disabled={savingSubZonal} loading={savingSubZonal}>
                          {isEdit ? 'Update' : 'Add'}
                        </Button>
                      </Form.Item>
                      {/* </Col>
                    <Col span={12}> */}
                      <Form.Item>
                        <Button onClick={handleClickBack} disabled={savingSubZonal}>
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

export default SubZoneMasterForm;
