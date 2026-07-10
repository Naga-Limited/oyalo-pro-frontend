/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import {Card, Col, Row, Form, Tabs} from 'antd';
import {Colors} from '../../App/common/Images';
import {useLocation, useNavigate} from 'react-router';
import {toString, eqBy, map, prop, unionWith, uniq} from 'ramda';

import {useForm} from 'react-hook-form';
import entryApis from '../../../api/entryApis';
import messageToast from '../../../components/messageToast/messageToast';
import FormTable from '../../../components/formComponents/FormTable';
import ConfirmOnExit from '../../../components/confirmOnExit/ConfirmOnExit';

function CapaView() {
  const {state} = useLocation();
  const navigate = useNavigate();
  const [submitStatus, setSubmitStatus] = useState(false);
  const [capaSubmit, setCapaSubmit] = useState(false);
  const {marks} = state;

  const cat = uniq((marks ?? []).map((e) => e?.category_id));
  const category = [];
  cat.forEach((element) => {
    category.push((marks ?? []).filter((mark) => Number(mark.category_id) === Number(element)));
  });

  const handleOnBack = () => {
    navigate('/capa');
  };

  const handleOnSubmit = (formData) => {
    const mergeMark = [];

    map((e) => {
      // eslint-disable-next-line array-callback-return
      (formData?.mark ?? []).map((data) => {
        if (e.pointsID === data?.pointsID) mergeMark.push({...e, ...data});
      });
    }, marks).filter((e) => e);

    // eslint-disable-next-line no-unused-vars
    const finalMark = unionWith(eqBy(prop('pointsID')), mergeMark, marks);

    const {id: entry_id, zone_id, subzone_id, outlet_id, audit_type, capa_status, total_mark} = state;
    entryApis
      .capaSubmit({
        data: {
          entry_id: toString(Number(entry_id)),
          zone_id: toString(Number(zone_id)),
          subzone_id: toString(Number(subzone_id)),
          outlet_id: toString(Number(outlet_id)),
          audit_type: toString(Number(audit_type)),
          capa_status,
          status: '1',
          marks: finalMark,
          total_mark: toString(Number(total_mark))
        }
      })
      .then((e) => {
        messageToast({message: 'CAPA Submitted successfully', status: e?.status, title: 'CAPA'});
        navigate('/capa');
      });
  };

  const {
    register,
    setValue,
    getValues,
    control,
    setError,
    clearErrors,
    handleSubmit,
    formState: {errors, isDirty}
  } = useForm();

  const checkAbleToSubmit = () => {};

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
                        <FormTable
                          {...{
                            mode: 'CAPA',
                            index: i,
                            data: {subcategory: data, state},
                            register,
                            errors,
                            control,
                            setValue,
                            getValues,
                            setError,
                            clearErrors,
                            checkAbleToSubmit
                          }}
                        />
                      )
                    };
                  })}
                />
              </Row>
              <div className='d-flex align-items-center justify-content-center w-100 gap-3 pt-3 '>
                <button onClick={handleOnBack} className='btn' style={{color: 'white', backgroundColor: Colors.text_color}}>
                  Back
                </button>
                <button onClick={handleSubmit(handleOnSubmit)} disabled={submitStatus} className='btn' style={{color: 'white', backgroundColor: '#34b1aa'}}>
                  Submit
                </button>
              </div>
            </Form>
          </Col>
        </Row>
      </Card>
    </>
  );
}

export default CapaView;
