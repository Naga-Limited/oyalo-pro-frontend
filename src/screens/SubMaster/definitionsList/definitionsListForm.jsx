import React, { useEffect, useState } from 'react';
import { Card, Select, Button, Col, Row, Form, Input, Radio } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addDefinitionsList, getDefinitions, updateDefinitionsList } from '../../../@app/subMaster/subMasterSlice';
// import { map } from 'ramda';
import { useLocation, useNavigate } from 'react-router';
import { transStatus } from '../../../util/transStatus';
import ConfirmOnExit from '../../../components/confirmOnExit/ConfirmOnExit';
const { Option } = Select;

function definitionsListForm() {
  const {
    gettingDefinitions,
    savingZonal
  } = useSelector((state) => {
    return state.subMaster;
  });

  const {
    state: { data: defaultValue, isEdit = false }
  } = useLocation();

  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [status, setStatus] = useState(defaultValue?.status ?? 1);
  const [showDialog, setShowDialog] = useState(false);

  // useEffect(() => {
  //   dispatch(getDefinitions());
  // }, [dispatch]);

  const [dropdownOptions, setDropdownOptions] = useState([]);
  useEffect(() => {
    dispatch(getDefinitions())
      .then((result) => {
        if (result && result.data) {
          setDropdownOptions(result.data);
        }
      })
    
  }, [dispatch]);

  const onFinish = (data) => {
    dispatch(defaultValue?.id ? updateDefinitionsList({ data: { ...data, status: transStatus({ status }), id: defaultValue?.id } }) : addDefinitionsList({ data })).then(({ status }) => {
      if (status === 200) {
        form.resetFields();
        navigate('/definitionsList');
        setShowDialog(false);
      }
    });
  };

  const handleClickBack = () => {
    navigate('/definitionsList');
  };

  return (
    <>
      <Card>
        <ConfirmOnExit showModel={showDialog} />
        <Row style={{ justifyContent: 'center' }}>
          <Col span={24}>
            <Form
              onFieldsChange={() => setShowDialog(true)}
              name='basic'
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              onFinish={onFinish}
              form={form}
              initialValues={{ Definitions: defaultValue?.def_title_id, name: defaultValue?.zonal_name, status: defaultValue?.status ?? 1 }}
              autoComplete='off'>
              <Row gutter={[15, 0]}>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item name='Definitions' label='Definitions' rules={[{ required: true, message: 'Please select Definitions' }]}>
                    <Select
                      placeholder='Select'
                      disabled={savingZonal}
                      loading={gettingDefinitions}
                      showSearch
                      filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                     
                      {dropdownOptions.map((item, index) => {
                        return (
                          <Option
                            key={index} value={item.id}>
                            {item.def_title}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </Col>

                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item name='def_list_name' label='Definitions List' rules={[{ required: true, message: 'Please add Definitions name' }]}>
                    <Input placeholder='Enter def_list name' name='def_list_name' disabled={savingZonal} defaultValue={defaultValue?.def_list_name} />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item name='status' label='Status' rules={[{ required: true, message: 'Please slect your status' }]}>
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
                  <Row gutter={[15, 15]} style={{ justifyContent: 'end' }}>
                    <Col span={12} style={{ textAlign: 'right' }} className='d-flex align-items-center justify-content-end mt-3'>
                      <Form.Item className='mx-2'>
                        <Button className='orangeFactory' type='primary' htmlType='submit' disabled={savingZonal} loading={savingZonal}>
                          {isEdit ? 'Update' : 'Add'}
                        </Button>
                      </Form.Item>
                      {/* </Col>
                    <Col span={12}> */}
                      <Form.Item>
                        <Button onClick={handleClickBack} disabled={savingZonal}>
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

export default definitionsListForm;
