import React, {Fragment, useEffect, useState} from 'react';
import {Input, Card, Col, Row, Form, Collapse} from 'antd';
// import {useDispatch, useSelector} from 'react-redux';
// import {getAllCategory} from '../../../@app/master/masterSlice';
import {useLocation} from 'react-router-dom';
const {Panel} = Collapse;

function AuditPointMarksView() {
  const {state} = useLocation();
  const [formData, setFormData] = useState({current_date: '', from_date: '', to_date: '', category: []});

  useEffect(() => {
    const categories = [];
    const uniqueCategories = [];
    let currentIndex = -1;
    (state?.data || []).forEach((d) => {
      if (!uniqueCategories.includes(d?.category_name)) {
        uniqueCategories.push(d?.category_name);
        categories.push({...d, subcategories: []});
        currentIndex++;
      } else {
        if (d?.auditpoint_id) {
          categories[currentIndex]?.subcategories?.forEach((s) => {
            if (d?.subcategory_name === s?.subcategory_name) s?.auditpoint?.push(d);
          });
        } else categories[currentIndex]?.subcategories?.push({...d, auditpoint: []});
      }
    });
    setFormData({category: categories});
  }, [state?.data]);

  const formatDate = (date) => date?.split('/')?.reverse().join('-');

  return (
    <>
      <Card>
        <Row style={{justifyContent: 'center'}}>
          <Col span={24}>
            <Form name='basic' labelCol={{span: 24}} wrapperCol={{span: 24}} initialValues={{remember: true}} autoComplete='off'>
              <Row gutter={[15, 0]}>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='total_marks' label='Total Marks ' initialValue={100}>
                    <Input placeholder='Cashier Station' disabled />
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name={'startDate'} label='Start Date  '>
                    <div className='ant-form-item-control-input'>
                      <input
                        type={'date'}
                        disabled
                        defaultValue={formatDate(state?.from_date)}
                        style={{
                          backgroundColor: '#e7dedea3',
                          height: '36px',
                          borderRadius: '8px',
                          border: 'none',
                          fontSize: '14px',
                          padding: '0px 12px',
                          outline: 'none'
                        }}
                        className=' '
                      />
                    </div>
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name={'endDate'} label=' End Date  '>
                    <div className='ant-form-item-control-input'>
                      <input
                        defaultValue={formatDate(state?.to_date)}
                        disabled
                        type={'date'}
                        style={{
                          backgroundColor: '#e7dedea3',
                          height: '36px',
                          borderRadius: '8px',
                          border: 'none',
                          fontSize: '14px',
                          padding: '0px 12px',
                          outline: 'none'
                        }}
                      />
                    </div>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  {formData.category !== 0
                    ? formData.category
                        .filter((li) => li.subcategories !== undefined && li.subcategories.length > 0)
                        .map((cat, i) => {
                          return (
                            <Collapse accordion key={i}>
                              <Panel
                                header={
                                  <div
                                    style={{
                                      display: 'flex',
                                      flexDirection: 'row',
                                      justifyContent: 'space-between'
                                    }}>
                                    <label>{cat.category_name}</label>
                                    <Input
                                      type={'number'}
                                      min='0'
                                      max='99'
                                      className='category-Input px-2'
                                      style={{width: '50px'}}
                                      value={cat.category_mark}
                                      disabled
                                      name='category_mark'
                                      placeholder=''
                                    />
                                  </div>
                                }
                                key='1'>
                                <Collapse accordion key={i}>
                                  {cat.subcategories !== undefined
                                    ? cat.subcategories.map((sub, j) => {
                                        return (
                                          <Panel
                                            key={j}
                                            header={
                                              <div
                                                style={{
                                                  display: 'flex',
                                                  flexDirection: 'row',
                                                  justifyContent: 'space-between'
                                                }}>
                                                <span>{sub.subcategory_name}</span>
                                                <Form.Item style={{height: '2px'}} name='sub_name'>
                                                  <span style={{display: 'none'}}>{sub.subcategory_name}</span>
                                                  <Input
                                                    className='mx-3'
                                                    type='number'
                                                    min={'1'}
                                                    max={'99'}
                                                    style={{
                                                      width: '80px',
                                                      // width: '30%',
                                                      margin: '0 2.5% 0 2.5%'
                                                    }}
                                                    placeholder=''
                                                    name='subcategory_mark'
                                                    value={sub.subcategory_mark}
                                                    disabled
                                                  />
                                                </Form.Item>
                                              </div>
                                            }>
                                            <Row gutter={[15, 0]}>
                                              <Col md={{span: 18}} xs={{span: 24}}>
                                                <Form.Item label='Points'>
                                                  <div>
                                                    {sub.auditpoint.map((ap, k) => {
                                                      return (
                                                        <div key={k} className='d-flex flex-column'>
                                                          <span key={k} className='my-1'>
                                                            {ap.auditpoint_name}
                                                          </span>
                                                        </div>
                                                      );
                                                    })}
                                                  </div>
                                                </Form.Item>
                                              </Col>
                                              <Col md={{span: 2}} xs={{span: 24}} className='d-flex justify-content-end'>
                                                <div className='d-flex flex-column'>
                                                  <span className=' mx-2 my-2'>Score</span>
                                                  <div>
                                                    {sub.auditpoint.map((ap, k) => {
                                                      return (
                                                        <div key={k} className='d-flex flex-column'>
                                                          <Input
                                                            className='mx-1 my-1'
                                                            type='number'
                                                            min={'1'}
                                                            max='99'
                                                            style={{width: '80px'}}
                                                            key={k}
                                                            name='auditpoint_mark'
                                                            value={ap.auditpoint_mark}
                                                            placeholder=''
                                                            disabled
                                                          />
                                                        </div>
                                                      );
                                                    })}
                                                  </div>
                                                </div>
                                              </Col>
                                              <Col md={{span: 2}} xs={{span: 24}} className='d-flex justify-content-end'>
                                                <div className='d-flex flex-column'>
                                                  <span className='mx-2 my-2'>CAPA.Marks</span>
                                                  <div>
                                                    {sub.auditpoint.map((ap, k) => {
                                                      return (
                                                        <div key={k} className='d-flex flex-column'>
                                                          <Input
                                                            className='mx-1 my-1'
                                                            type='number'
                                                            min={'1'}
                                                            max='99'
                                                            style={{width: '80px'}}
                                                            key={k}
                                                            name='capa_mark'
                                                            value={ap.capa_mark}
                                                            placeholder=''
                                                            disabled
                                                          />
                                                        </div>
                                                      );
                                                    })}
                                                  </div>
                                                </div>
                                              </Col>
                                            </Row>
                                          </Panel>
                                        );
                                      })
                                    : null}
                                </Collapse>
                              </Panel>
                            </Collapse>
                          );
                        })
                    : 'No Data'}
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Card>
    </>
  );
}

export default AuditPointMarksView;
