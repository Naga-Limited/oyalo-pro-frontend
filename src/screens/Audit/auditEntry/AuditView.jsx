import React from 'react';
import {Card, Col, Row, Form, Tabs} from 'antd';
import {Colors} from '../../App/common/Images';
import {useLocation, useNavigate} from 'react-router';
import {uniq} from 'ramda';
// import {toString, uniq} from 'ramda';

import {useForm} from 'react-hook-form';
import FormTable from '../../../components/formComponents/FormTable';
import ConfirmOnExit from '../../../components/confirmOnExit/ConfirmOnExit';
// import entryApis from '../../../api/entryApis';
// import {useDispatch} from 'react-redux';

function AuditView() {
  const {state} = useLocation();
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const {marks} = state;
  const cat = uniq((marks ?? []).map((e) => e?.category_id));
  const category = [];
  cat.forEach((element) => {
    category.push((marks ?? []).filter((mark) => Number(mark.category_id) === Number(element)));
  });

  const handleOnBack = () => {
    navigate('/auditEntry');
  };

  const {
    register,
    setValue,
    getValues,
    control,
    setError,
    clearErrors,

    formState: {errors, isDirty}
  } = useForm();

  return (
    <>
      <Card
        className='m-5'
        style={{
          boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 50px',
          borderRadius: '16px'
        }}>
        <ConfirmOnExit showModel={isDirty} />
        <Row style={{justifyContent: 'center'}}>
          <Col span={24}>
            <Form name='basic' labelCol={{span: 24}} wrapperCol={{span: 24}} initialValues={{remember: true}} autoComplete='off'>
              <Row gutter={[15, 0]}>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='add_category' label='Zone'>
                    <span style={{color: Colors.text_color, paddingBottom: 0}}>{state?.zone_name}</span>
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item
                    name='add_category'
                    label='Sub Zone'
                    // rules={[{required: true, message: 'Please select category'}]}
                  >
                    <span style={{color: Colors.text_color, paddingBottom: 0}}>{state?.subzone_name}</span>
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='add_category' label='Outlet Code'>
                    <span style={{color: Colors.text_color, paddingBottom: 0}}>{state?.outlet_ORL}</span>
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='add_category' label='Outlet Name'>
                    <span style={{color: Colors.text_color, paddingBottom: 0}}>{state?.outlet_name}</span>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[15, 0]}>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='add_category' label='ORL Name'>
                    <span style={{color: Colors.text_color, paddingBottom: 0}}>{state?.outlet_name}</span>
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='add_category' label='Audit Type'>
                    <span style={{color: Colors.text_color, paddingBottom: 0}}>{state?.audit_type === '1' ? 'Full Audit' : 'Category Wise'}</span>
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='add_category' label='Audit Agent Name'>
                    <span style={{color: Colors.text_color, paddingBottom: 0}}>{state?.agentName}</span>
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='add_category' label='Total Marks'>
                    <span style={{color: Colors.text_color, paddingBottom: 0}}>{state?.total_mark}</span>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Tabs
                  defaultActiveKey='1'
                  centered
                  type='card'
                  items={(category ?? [])?.map((data, i) => {
                    const id = String(i + 1);
                    return {
                      label: data[0]?.category_name,
                      key: id,
                      children: (
                        <FormTable {...{mode: 'entryView', index: i, data: {subcategory: data, state}, register, errors, control, setValue, getValues, setError, clearErrors}} />
                      )
                    };
                  })}
                />
              </Row>
              <div className='flex align-items-start'>
                <button className='btn' onClick={handleOnBack} style={{color: 'white', backgroundColor: '#3a2cdb'}}>
                  Back
                </button>
              </div>
            </Form>
          </Col>
        </Row>
      </Card>
    </>
  );
}

export default AuditView;
