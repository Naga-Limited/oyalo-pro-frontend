import React, {useEffect, useState} from 'react';
import {Card, Select, Button, Col, Row, Form, Input, Radio} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {saveCity, getStates, getSubZonal, getZonal, updateCity} from '../../../@app/subMaster/subMasterSlice';
import {map} from 'ramda';
import messageToast from '../../../components/messageToast/messageToast';
import {useLocation, useNavigate} from 'react-router';
import {transStatus} from '../../../util/transStatus';
import ConfirmOnExit from '../../../components/confirmOnExit/ConfirmOnExit';
const {Option} = Select;

function CityMasterForm() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const stateID = Form.useWatch('stateID', form);
  const zoneID = Form.useWatch('zoneID', form);

  const handleClickBack = () => {
    navigate('/cityMaster');
  };
  const {
    state: {data: defaultValue, isEdit = false}
  } = useLocation();

  const [status, setStatus] = useState(defaultValue?.status ?? 1);
  const [showDialog, setShowDialog] = useState(false);

  const {
    getStatesResponse: {data: states},
    gettingState,
    getZonalResponse: {data: Zonals},
    gettingZonal,
    getSubZonalResponse: {data: SubZonals},
    gettingSubZonal,
    savingCity
  } = useSelector((state) => {
    return state.subMaster;
  });

  useEffect(() => {
    dispatch(getStates());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getZonal(stateID));
  }, [dispatch, stateID]);

  useEffect(() => {
    dispatch(getSubZonal(zoneID));
  }, [dispatch, zoneID]);

  const { userData } = useSelector((state) => state.auth);

  const onFinish = (data) => {
    setShowDialog(false);
    dispatch(defaultValue?.id ? updateCity({data: {...data, 
      updated_by: userData.data?.id ?? "0",
      status: transStatus({status}), id: defaultValue.id}}) : saveCity({data, 
        created_by: userData.data?.id ?? "0",
        status: transStatus({status})})).then(({message, status, statusText}) => {
      if (status === 200) {
        form.resetFields();
        navigate('/cityMaster');
      }
      messageToast({message: message ?? statusText, status, title: 'City Master'});
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
              wrapperCol={{span: 24}}
              initialValues={{
                stateID: defaultValue?.state_id,
                zoneID: defaultValue?.zonel_id,
                subzoneID: defaultValue?.subzonel_id,
                name: defaultValue?.name,
                status: defaultValue?.status ?? 1
              }}
              onFinish={onFinish}
              autoComplete='off'
              form={form}>
              <Row gutter={[15, 0]}>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='stateID' label='State' rules={[{required: true, message: 'Please select state'}]}>
                    <Select
                      placeholder='Select'
                      loading={gettingState}
                      disabled={savingCity}
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
                      disabled={savingCity}
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
                  <Form.Item name='subzoneID' label='Sub Zone' rules={[{required: true, message: 'Please select sub zone'}]}>
                    <Select
                      placeholder='Select'
                      loading={gettingSubZonal}
                      disabled={savingCity}
                      showSearch
                      filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                      {map(
                        (SubZonal) => {
                          return (
                            <Option key={SubZonal.id} value={SubZonal.id}>
                              {SubZonal.name}
                            </Option>
                          );
                        },
                        SubZonals ? SubZonals.filter((e) => e.status === '1') : []
                      )}
                    </Select>
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='name' label='Add City ' rules={[{required: true, message: 'Please select add city'}]}>
                    <Input placeholder='Enter city name' name='name' disabled={savingCity} />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item name='status' label='Status' rules={[{required: true, message: 'Please select your status'}]}>
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
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Row gutter={[15, 15]} style={{justifyContent: 'end'}}>
                    <Col span={12} style={{textAlign: 'right'}} className='d-flex align-items-center justify-content-end mt-3'>
                      <Form.Item className='mx-2'>
                        <Button className='orangeFactory' type='primary' htmlType='submit' loading={savingCity} disabled={savingCity}>
                          {isEdit ? 'Update' : 'Add'}
                        </Button>
                      </Form.Item>
                      {/* </Col>
                    <Col span={12}> */}
                      <Form.Item>
                        <Button onClick={handleClickBack} disabled={savingCity}>
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

export default CityMasterForm;
