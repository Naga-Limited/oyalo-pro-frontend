import React, {Fragment, useEffect, useState} from 'react';
import {Input, Card, Button, Col, Row, Form, Collapse, DatePicker} from 'antd';
// import {useDispatch, useSelector} from 'react-redux';
import dayjs from 'dayjs';
import {useNavigate} from 'react-router-dom';
// import {getAllCategory} from '../../../@app/master/masterSlice';
import apis from '../../../api/masterApi';
import {useLocation} from 'react-router-dom';
import ConfirmOnExit from '../../../components/confirmOnExit/ConfirmOnExit';
const {Panel} = Collapse;
import {lightFormat} from 'date-fns';

function AuditPointMarksForm() {
  const {state} = useLocation();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState('');
  const [formData, setFormData] = useState({current_date: '', from_date: state?.from_date || '', to_date: state?.from_date || '', category: []});
  const [loading, setLoading] = useState(false);
  const [totalMark, setTotalMark] = useState(0);
  const [showDialog, setShowDialog] = useState(false);

  const [form] = Form.useForm();

  const editMode = state ? true : false;

  useEffect(() => {
    if (state?.data) {
      const category = [];
      const uniqueCategories = [];
      let currentIndex = -1;
      (state?.data || []).forEach((d) => {
        if (!uniqueCategories.includes(d?.category_name)) {
          uniqueCategories.push(d?.category_name);
          category.push({...d, subcategory: []});
          currentIndex++;
        } else {
          if (d?.auditpoint_id) {
            category[currentIndex]?.subcategory?.forEach((s) => {
              if (d?.subcategory_name === s?.subcategory_name) s?.auditpoint?.push(d);
            });
          } else category[currentIndex]?.subcategory?.push({...d, name: d?.subcategory_name, auditpoint: []});
        }
      });
      setFormData({...state, category});
    } else {
      apis.getAllCategory().then((res) => {
        if (res.data.status === 200) {
          const data = res.data.data.category || [];
          setTotalMark(0);
          const categoryList = data
            .filter((li) => li.subcategory !== undefined && li.subcategory.length > 0)
            .map((cat) => {
              let subcategoryTotal = 0;
              let subcategory = cat.subcategory
                .filter((li) => li.pointlist !== undefined && li.pointlist.length > 0)
                .map((sub) => {
                  let pointTotal = 0;
                  let auditpoint = sub.pointlist.map((point) => {
                    subcategoryTotal = subcategoryTotal + Number(point?.auditpoint_mark ?? 0);
                    pointTotal = pointTotal + Number(point?.auditpoint_mark ?? 0);
                    setTotalMark((mark) => Number(mark + Number(point?.auditpoint_mark)));
                    let pointItem = {auditpoint_id: point.id, auditpoint_mark: point?.auditpoint_mark ?? '', capa_mark: Number(point?.capa_mark) ?? '', name: point.name};
                    return pointItem;
                  });
                  let subcategoryItem = {subcategory_id: sub.id, subcategory_mark: pointTotal ?? '', name: sub.name, auditpoint};
                  return subcategoryItem;
                });
              let categoryItem = {category_id: cat.category_id, category_name: cat.category_name, category_mark: subcategoryTotal ?? '', subcategory};
              return categoryItem;
            });

          const category = categoryList.filter((li) => li.subcategory !== undefined && li.subcategory.length > 0);
          const initialValue = {current_date: '', from_date: state?.from_date || '', to_date: state?.from_date || '', capa_mark: 'pass', status: '1', category};
          setFormData(initialValue);
        }
      });
    }
  }, []);

  useEffect(() => {
    form.setFieldsValue({total_marks: totalMark ?? 0});
  }, [totalMark]);

  const formatDate = (date) => date?.split('/').join('-');
  const viewDateFormat = ['DD/MM/YYYY', 'DD/MM/YY'];
  const date = new Date();

  const onFinish = (data) => {
    setShowDialog(false);
    setApiError('');
    let current_date = date.toJSON().slice(0, 10);
    let from_date = lightFormat(new Date(data.startDate), 'yyyy-MM-dd');
    let to_date = lightFormat(new Date(data.endDate ?? ''), 'yyyy-MM-dd');
    let submitted = {...formData, total_mark: data?.total_marks, current_date, from_date, to_date, version_code: 1};
    setLoading(true);
    apis.addAuditPointMark(submitted).then((res) => {
      if (res.data.status === 200) {
        navigate('/auditPointMarks');
      } else {
        setApiError(res?.data?.message ?? 'Something went wrong');
        setLoading(false);
      }
    });
  };

  const onEditFinish = (data) => {
    setShowDialog(false);
    setApiError('');
    // dayjs(formatDate(data.startDate), viewDateFormat);
    let from_date = lightFormat(new Date(data.startDate), 'yyyy-MM-dd');
    let to_date = lightFormat(new Date(data.endDate), 'yyyy-MM-dd');

    let submitted = {id: formData.id, total_mark: data?.total_marks, from_date: from_date || state?.from_date, to_date: to_date || state?.to_date};
    setLoading(true);

    apis.updateAuditPointMark(submitted).then((res) => {
      if (res.data.status === 200) {
        navigate('/auditPointMarks');
      } else {
        setApiError(res?.data?.message ?? 'Something went wrong');
        setLoading(false);
      }
    });
  };

  const handlePointChange = (i, j, k, e) => {
    const {name, value} = e.target;
    let data = formData.category;
    data[i].subcategory[j].auditpoint[k][name] = value;
    setFormData((fd) => ({...fd, category: data}));
  };

  const handleSubCategoryChange = (i, j, e) => {
    const {name, value} = e.target;
    let data = formData.category;
    data[i].subcategory[j][name] = value;
    setFormData((fd) => ({...fd, category: data}));
  };

  const handleCategoryChange = (i, e) => {
    const {name, value} = e.target;
    let data = formData.category;
    data[i][name] = value;
    setFormData((fd) => ({...fd, category: data}));
  };

  const [startDate, setStartDate] = useState(state?.from_date);

  const disabledStartDate = (current) => {
    return current && current <= dayjs().startOf('day');
  };

  const disabledEndDate = (current) => {
    return current && current < dayjs(startDate).endOf('day');
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
              form={form}
              labelCol={{span: 24}}
              wrapperCol={{span: 24}}
              onFinish={editMode ? onEditFinish : onFinish}
              autoComplete='off'
              initialValues={{
                startDate: editMode ? dayjs(formatDate(state?.from_date), viewDateFormat[0]) : dayjs(date),
                endDate: editMode ? dayjs(formatDate(state?.to_date), viewDateFormat[0]) : dayjs(date.setMonth(date.getMonth() + 1))
              }}>
              <Row gutter={[15, 0]}>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='total_marks' label='Total Marks' rules={[{required: false, message: 'Please select category'}]}>
                    <Input name='total_marks' placeholder='Total Mark' />
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name={'startDate'} label='Start Date' rules={[{required: !editMode, message: 'Please add Date'}]}>
                    <DatePicker
                      onSelect={(e) => {
                        setStartDate(e);
                        form.setFieldsValue({endDate: ''});
                      }}
                      disabledDate={(e) => disabledStartDate(e)}
                      format={viewDateFormat}
                    />
                  </Form.Item>
                </Col>

                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name={'endDate'} label='End Date' rules={[{required: !editMode, message: 'Please add Date'}]}>
                    <DatePicker
                      name={'endDate'}
                      // defaultValue={editMode ? dayjs(formatDate(state?.to_date), viewDateFormat[0]) : dayjs(date).endOf('day')}
                      disabledDate={(e) => disabledEndDate(e)}
                      format={viewDateFormat}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  {formData.category !== 0
                    ? formData.category
                        .filter((li) => li?.subcategory !== undefined && li?.subcategory.length > 0)
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
                                    <input
                                      type={'number'}
                                      min='0'
                                      max='99'
                                      className='category-Input px-2'
                                      style={{width: '50px'}}
                                      value={cat.category_mark}
                                      onChange={(e) => handleCategoryChange(i, e)}
                                      name='category_mark'
                                      placeholder=''
                                      disabled={editMode}
                                    />
                                  </div>
                                }
                                key='1'>
                                <Collapse accordion key={i}>
                                  {cat?.subcategory !== undefined
                                    ? cat.subcategory.map((sub, j) => {
                                        if (sub.auditpoint !== undefined && sub.auditpoint.length > 0) {
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
                                                  <span>{sub.name}</span>
                                                  <Form.Item
                                                    style={{height: '2px'}}
                                                    name='sub_name'
                                                    rules={[
                                                      {
                                                        required: false,
                                                        message: 'Please select sub category'
                                                      }
                                                    ]}>
                                                    {/* <Input
                                                    style={{
                                                      width: '60%',
                                                      margin: '0 2.5% 0 2.5%'
                                                    }}                                                    
                                                    defaultValue={sub.name}
                                                    placeholder='Sub Category'                                                    
                                                  /> */}
                                                    <span style={{display: 'none'}}>{sub.name}</span>
                                                    <Input
                                                      disabled={editMode}
                                                      className='mx-3'
                                                      type='number'
                                                      min={'0'}
                                                      max={'99'}
                                                      style={{
                                                        width: '50px',
                                                        height: '50%'
                                                        // width: '30%',
                                                      }}
                                                      placeholder=''
                                                      name='subcategory_mark'
                                                      value={sub.subcategory_mark}
                                                      onChange={(e) => handleSubCategoryChange(i, j, e)}
                                                    />
                                                  </Form.Item>
                                                </div>
                                              }>
                                              <Row gutter={[15, 0]}>
                                                <Col md={{span: 18}} xs={{span: 16}}>
                                                  <Form.Item
                                                    label='Points'
                                                    rules={[
                                                      {
                                                        required: false,
                                                        message: 'Please select points'
                                                      }
                                                    ]}>
                                                    <div>
                                                      {sub.auditpoint.map((ap, k) => {
                                                        return (
                                                          <div key={k} className='d-flex flex-column'>
                                                            <span key={k} className='my-1'>
                                                              {editMode ? ap.auditpoint_name : ap.name}
                                                            </span>
                                                          </div>
                                                        );
                                                        // return <Input  key={k} name='name' value={ap.name} placeholder='Points'  />;
                                                      })}
                                                    </div>
                                                  </Form.Item>
                                                </Col>
                                                <Col md={{span: 2}} xs={{span: 24}} className='d-flex justify-content-end'>
                                                  {/* <Form.Item                                                  
                                                  label='Score '
                                                  rules={[
                                                    {
                                                      required: false,
                                                      message: 'Please select actual marks'
                                                    }
                                                  ]}> */}
                                                  <div className='d-flex flex-column'>
                                                    <span className=' mx-2 my-2'>Score</span>
                                                    <div>
                                                      {sub.auditpoint.map((ap, k) => {
                                                        return (
                                                          <div key={k} className='d-flex flex-column'>
                                                            <Input
                                                              disabled={editMode}
                                                              className='mx-1 my-1'
                                                              type='number'
                                                              min={'0'}
                                                              max='99'
                                                              style={{width: '80px'}}
                                                              key={k}
                                                              onChange={(e) => handlePointChange(i, j, k, e)}
                                                              name='auditpoint_mark'
                                                              value={ap.auditpoint_mark}
                                                              placeholder=''
                                                            />
                                                          </div>
                                                        );
                                                      })}
                                                    </div>
                                                    {/* </Form.Item> */}
                                                  </div>
                                                </Col>
                                                <Col md={{span: 2}} xs={{span: 24}} className='d-flex justify-content-end'>
                                                  {/* <Form.Item                                                  
                                                  label='CAPA Marks '
                                                  style={{display: 'flex', justifyContent: 'end'}}
                                                  rules={[
                                                    {
                                                      required: false,
                                                      message: 'Please select CAPA Marks'
                                                    }
                                                  ]}> */}
                                                  <div className='d-flex flex-column'>
                                                    <span className='mx-2 my-2'>CAPA.Marks</span>
                                                    <div>
                                                      {sub.auditpoint.map((ap, k) => {
                                                        return (
                                                          <div key={k} className='d-flex flex-column'>
                                                            <Input
                                                              disabled={editMode}
                                                              className='mx-1 my-1'
                                                              type='number'
                                                              min={'0'}
                                                              max='99'
                                                              style={{width: '80px'}}
                                                              key={k}
                                                              onChange={(e) => handlePointChange(i, j, k, e)}
                                                              name='capa_mark'
                                                              value={ap.capa_mark}
                                                              placeholder=''
                                                            />
                                                          </div>
                                                        );
                                                      })}
                                                    </div>
                                                  </div>

                                                  {/* </Form.Item> */}
                                                </Col>
                                              </Row>
                                            </Panel>
                                          );
                                        } else {
                                          return null;
                                        }
                                      })
                                    : null}
                                </Collapse>
                              </Panel>
                            </Collapse>
                          );
                        })
                    : 'No Data'}
                </Col>
                <Col span={24}>
                  <Row gutter={[15, 15]} style={{justifyContent: 'çenter', marginTop: '20px'}}>
                    <Col span={12} style={{textAlign: 'right'}}>
                      <Form.Item>
                        <Button className='orangeFactory' type='primary' loading={loading} htmlType='submit'>
                          {editMode ? 'Update' : 'Add'}
                        </Button>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item>
                        <Button type='button' ghost onClick={() => navigate(-1)}>
                          Cancel
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={[15, 15]} style={{justifyContent: 'çenter'}}>
                    <Col span={12} style={{textAlign: 'right'}}>
                      {typeof apiError === 'object' ? (
                        Object?.values(apiError)?.map((e) => (
                          <div key={e?.[0]} className='text-danger'>
                            {e?.[0]}
                          </div>
                        ))
                      ) : (
                        <div className='text-danger'>{apiError}</div>
                      )}
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

export default AuditPointMarksForm;
