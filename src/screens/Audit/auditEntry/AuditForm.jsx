/* eslint-disable no-unused-labels */
import React, {useEffect, useState} from 'react';
import {Card, Select, Col, Row, Form, Button, Popover} from 'antd';
import {Tabs} from 'antd';
import Input from 'rc-input';
import {useDispatch, useSelector} from 'react-redux';
import {addAuditEntry, editAuditEntry, getAuditType} from '../../../@app/entry/entrySlice';
import {useForm, Controller, useWatch} from 'react-hook-form';
import {all, eqBy, equals, flatten, forEach, isEmpty, map, prop, unionWith, uniq} from 'ramda';
import {getSubZonal, getZonal} from '../../../@app/subMaster/subMasterSlice';
import {getOutletMaster} from '../../../@app/master/masterSlice';
import messageToast from '../../../components/messageToast/messageToast';
import {useNavigate, useLocation} from 'react-router';
import FormTable from '../../../components/formComponents/FormTable';
import ConfirmOnExit from '../../../components/confirmOnExit/ConfirmOnExit';
const {Option} = Select;

function AuditEntryForm({mode}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {state} = useLocation();
  const marks = state?.marks;
  const [type, setType] = useState(mode === 'edit' ? state?.auditType : null);
  const [totalMark, setTotalMark] = useState(mode === 'edit' ? state.total_mark : 0);
  const [submitStatus, setSubmitStatus] = useState(false);
  const [selectedOutlet, setSelectedOutlet] = useState(false);
  const [capaStatus, setCapaStatus] = useState(false);
  const [categories, setCategories] = useState(null);
  const [entryData, setEntryData] = useState();

  const loginType = useSelector((state) => state.auth.type);
  const emp_map = useSelector((state) => state.auth.userData.data && state.auth.userData.data.employee_mapping);

  const {
    getZonalResponse: {data: Zonals},
    getSubZonalResponse: {data: SubZonals}
  } = useSelector((state) => {
    return state.subMaster;
  });

  const {
    getOutletMasterResponse: {data: outletData}
  } = useSelector((state) => {
    return state.master;
  });
  const outletList = outletData?.map((o) => ({
    ...o,
    outlet_code: `${o?.outlet_code} - ${o?.name}`
  }));

  const {
    savingEntryTypes,
    getEntryTypeResponse: {data: entryDatum}
  } = useSelector((state) => {
    return state.entry;
  });

  const categoriesName = (entryDatum?.category ?? []).map(({id, name}) => {
    return {
      id,
      name
    };
  });

  const {
    userData: {data: authData},
    type: userType
  } = useSelector((state) => {
    return state.auth;
  });

  const isFullAudit = (authData?.employee_mapping?.submodule ?? []).find((e) => e?.id !== 'Category wise') || userType === 1;

  useEffect(() => {
    let cat_wise_total_mark = 0;
    const catWiseCate = (entryDatum?.category ?? [])?.filter((e) => {
      if (type?.includes(e?.id) || isFullAudit) {
        cat_wise_total_mark = cat_wise_total_mark + e?.mark ?? 0;
        return true;
      }
      return false;
    });

    setEntryData({
      category: catWiseCate,
      total_mark: cat_wise_total_mark
    });
    setTotal_mark(cat_wise_total_mark ?? 0);
  }, [type, entryDatum]);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    setError,
    clearErrors,
    reset,
    formState: {errors, isDirty}
  } = useForm();

  const zone_id = useWatch({
    control,
    name: 'zone_id'
  });

  const subzone_id = useWatch({
    control,
    name: 'subzone_id'
  });

  useEffect(() => {
    if (mode === 'edit') {
      const {marks} = state;
      const cat = uniq((marks ?? []).map((e) => e?.category_id));
      const category = [];
      cat.forEach((element) => {
        category.push((marks ?? []).filter((mark) => Number(mark.category_id) === Number(element)));
      });

      setCategories([...category]);
    }
  }, [mode, state]);

  useEffect(() => {
    dispatch(getAuditType({data: {type: 1}}));
    dispatch(getZonal());
    setTotal_mark(entryData?.total_mark ?? 0);
  }, [dispatch]);

  useEffect(() => {
    dispatch(getSubZonal(zone_id));
  }, [dispatch, zone_id]);

  useEffect(() => {
    dispatch(getOutletMaster(subzone_id));
  }, [dispatch, subzone_id]);

  const handleClickBack = () => {
    navigate('/auditEntry');
  };

  const onFinish = (formData) => {
    // eslint-disable-next-line no-unused-vars
    const {category, orl_name, outlet_name, ...restOfData} = formData;

    const formFields = {
      audit_type: isFullAudit ? 1 : 2,
      selected_category: restOfData?.selected_category,
      outlet_id: (restOfData?.outlet_id ?? '').toString(),
      subzone_id: (restOfData?.subzone_id ?? '').toString(),
      total_mark: (restOfData?.total_mark ?? '').toString(),
      zone_id: (restOfData?.zone_id ?? '').toString(),
      capa_status: capaStatus,
      status: '1'
    };
    const marks = flatten(category);
    reset({}, {keepValues: true});
    const data = {marks, ...formFields};
    dispatch(addAuditEntry({data})).then(({message, status, statusText}) => {
      messageToast({message: message ?? statusText, status, title: 'Audit'});
      navigate('/auditEntry');
    });
  };

  const onEditFinish = (formData) => {
    // const data = {...formData, ...state};
    // const marks = flatten(data?.category);
    const mergeMark = [];
    map((e) => {
      // eslint-disable-next-line array-callback-return
      (formData?.mark ?? []).map((data) => {
        if (e.pointsID === data?.pointsID) mergeMark.push({...e, ...data});
      });
    }, marks).filter((e) => e);

    // eslint-disable-next-line no-unused-vars
    const finalMark = unionWith(eqBy(prop('pointsID')), mergeMark, marks);
    const data = {
      entry_id: (state?.id ?? '').toString(),
      zone_id: state.zone_id,
      subzone_id: state.subzone_id,
      outlet_id: state.outlet_id,
      audit_type: state.audit_type,
      selected_category: state?.selected_category,
      capa_status: capaStatus,
      status: '1',
      total_mark: totalMark,
      marks: finalMark
    };
    reset({}, {keepValues: true});
    dispatch(editAuditEntry({data})).then(({message, status, statusText}) => {
      messageToast({message: message ?? statusText, status, title: 'City Master'});
      navigate('/auditEntry');
    });
  };

  // eslint-disable-next-line no-unused-vars
  const [total_mark, setTotal_mark] = useState(entryData?.total_mark ?? 0);
  const pointsIds = flatten((entryData?.category ?? [])?.map((data) => data?.subcategory?.map((e) => e?.pointlist?.map((e) => e?.id))));

  useEffect(() => {
    setValue('total_mark', totalMark);
  }, [totalMark]);

  const addonMark = () => {
    const category = getValues('category');
    setTotal_mark(entryData?.total_mark ?? 0);
    setTotalMark(0);
    const mark = flatten(category);
    const submitCondition = [];
    const listCategoryIds = [];
    const capaStatus = [];
    forEach((e) => {
      listCategoryIds.push(e?.pointsID);
      setTotalMark((mark) => mark + Number(e?.actual_Score ?? 0));
      capaStatus.push(Number(e?.capa) < Number(e?.actual_Score));
      submitCondition.push(isEmpty(e?.actual_Score) ? false : true, Number(e?.actual_Score) <= e?.eligible_Score);
    }, mark ?? []);
    setCapaStatus(all(equals(true))(capaStatus) ? '1' : '0');
    if (mode === 'add') setSubmitStatus(all(equals(true))(submitCondition) && uniq(listCategoryIds).length === pointsIds?.length);
    else setSubmitStatus(!mark.some((m) => !m.actual_Score));
  };

  const addOnEditMark = (data) => {
    setTotalMark(0);
    const mergeMark = [];
    map((e) => {
      // eslint-disable-next-line array-callback-return
      (data?.mark ?? []).map((data) => {
        if (Number(e.pointsID) === Number(data?.pointsID)) mergeMark.push({...e, ...data});
      });
    }, marks).filter((e) => e);

    // eslint-disable-next-line no-unused-vars
    const finalMark = unionWith(eqBy(prop('pointsID')), mergeMark, marks);
    const submitCondition = [];
    const capaStatus = [];
    finalMark.forEach((e) => {
      capaStatus.push(Number(e?.capa) < Number(e?.actual_Score));
      setTotalMark((mark) => mark + Number(e?.actual_Score));
      submitCondition.push(isEmpty(e?.actual_Score) ? false : true, Number(e?.actual_Score) <= e?.eligible_Score);
    });
    setCapaStatus(all(equals(true))(capaStatus) ? '1' : '0');
    setSubmitStatus(all(equals(true))(submitCondition));
  };

  useEffect(() => {
    if (mode === 'edit') addOnEditMark({mark: marks});
  }, []);

  return (
    <>
      <Card>
        <ConfirmOnExit showModel={isDirty} />
        <Row style={{justifyContent: 'center'}}>
          <Col span={24}>
            <Form name='basic' labelCol={{span: 24}} wrapperCol={{span: 24}} initialValues={{remember: true}} autoComplete='off'>
              <Row gutter={[15, 0]}>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='zone_id' label='Zone' rules={[{required: true, message: 'Please select category'}]}>
                    <Controller
                      control={control}
                      name='zone_id'
                      render={({field: {onChange}}) => (
                        <Select
                          {...register('zone_id', {
                            required: mode === 'add'
                          })}
                          placeholder='Select'
                          defaultValue={state?.zone_id}
                          showSearch
                          onChange={onChange}
                          disabled={mode === 'edit'}
                          filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                          {map(
                            (Zonal) => {
                              return (
                                <Option key={Zonal.id} value={Zonal.id}>
                                  {Zonal.zonal_name}
                                </Option>
                              );
                            },
                            Zonals
                              ? Zonals.filter((e) => {
                                  if (loginType === 2) {
                                    let fid = emp_map && emp_map.zone.findIndex((x) => Number(x.id) === Number(e.id));
                                    if (fid !== -1 && e.status === '1') return true;
                                    else return false;
                                  } else return e.status === '1';
                                })
                              : []
                          )}
                        </Select>
                      )}
                    />
                    {errors?.zone_id && <p style={{color: 'red'}}>Please Enter Zone</p>}
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='subzone_id' label='Sub Zone' rules={[{required: true, message: 'Please select category'}]}>
                    <Controller
                      control={control}
                      name='subzone_id'
                      render={({field: {onChange}}) => (
                        <Select
                          {...register('subzone_id', {
                            required: mode === 'add'
                          })}
                          defaultValue={state?.subzone_id}
                          placeholder='Select'
                          showSearch
                          disabled={mode === 'edit'}
                          onChange={onChange}
                          filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                          {map(
                            (SubZonal) => {
                              return (
                                <Option key={SubZonal.id} value={SubZonal.id}>
                                  {SubZonal.name}
                                </Option>
                              );
                            },
                            SubZonals
                              ? SubZonals.filter((e) => {
                                  if (loginType === 2) {
                                    let fid = emp_map && emp_map.subzone.findIndex((x) => Number(x.id) === Number(e.id));
                                    if (fid !== -1 && e.status === '1') return true;
                                    else return false;
                                  } else return e.status === '1';
                                })
                              : []
                          )}
                        </Select>
                      )}
                    />
                    {errors?.subzone_id && <p style={{color: 'red'}}>Please select SubZone</p>}
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='outlet_id' label='Outlet Code' rules={[{required: true, message: 'Please select category'}]}>
                    <Controller
                      control={control}
                      name='outlet_id'
                      render={({field: {onChange}}) => (
                        <Select
                          {...register('outlet_id', {
                            required: mode === 'add'
                          })}
                          disabled={mode === 'edit'}
                          defaultValue={state?.outlet_id}
                          placeholder='Select'
                          showSearch
                          onChange={(e) => {
                            onChange(e);
                            setSelectedOutlet((outletList ?? [])?.find((outlet) => outlet.id === e));
                          }}
                          filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                          {map(
                            (outlet) => {
                              return (
                                <Option key={outlet?.id} value={outlet?.id}>
                                  {outlet?.outlet_code}
                                </Option>
                              );
                            },
                            outletList
                              ? outletList.filter((e) => {
                                  if (loginType === 2) {
                                    let fid = emp_map && emp_map.outlet.findIndex((x) => Number(x.id) === Number(e.id));
                                    if (fid !== -1) return true;
                                    else return false;
                                  } else return true;
                                })
                              : []
                          )}
                        </Select>
                      )}
                    />
                    {errors?.outlet_id && <p style={{color: 'red'}}>Please select Outlet</p>}
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='zone_id' label='Zone' rules={[{required: true, message: 'Please select category'}]}>
                    <Controller
                      control={control}
                      name='zone_id'
                      render={({field: {onChange}}) => (
                        <Select
                          {...register('zone_id', {
                            required: mode === 'add'
                          })}
                          placeholder='Select'
                          defaultValue={state?.zone_id}
                          showSearch
                          onChange={onChange}
                          disabled
                          filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                          value={selectedOutlet?.zone_id}>
                          {map(
                            (Zonal) => {
                              return (
                                <Option key={Zonal.id} value={Zonal.id}>
                                  {Zonal.zonal_name}
                                </Option>
                              );
                            },
                            Zonals
                              ? Zonals.filter((e) => {
                                  if (loginType === 2) {
                                    let fid = emp_map && emp_map.zone.findIndex((x) => Number(x.id) === Number(e.id));
                                    if (fid !== -1 && e.status === '1') return true;
                                    else return false;
                                  } else return e.status === '1';
                                })
                              : []
                          )}
                        </Select>
                      )}
                    />
                    {errors?.zone_id && <p style={{color: 'red'}}>Please Enter Zone</p>}
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='subzone_id' label='Sub Zone' rules={[{required: true, message: 'Please select category'}]}>
                    <Controller
                      control={control}
                      name='subzone_id'
                      render={({field: {onChange}}) => (
                        <Select
                          {...register('subzone_id', {
                            required: mode === 'add'
                          })}
                          defaultValue={state?.subzone_id}
                          placeholder='Select'
                          showSearch
                          disabled
                          onChange={onChange}
                          filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                          value={selectedOutlet?.subzone_id}>
                          {map(
                            (SubZonal) => {
                              return (
                                <Option key={SubZonal.id} value={SubZonal.id}>
                                  {SubZonal.name}
                                </Option>
                              );
                            },
                            SubZonals
                              ? SubZonals.filter((e) => {
                                  if (loginType === 2) {
                                    let fid = emp_map && emp_map.subzone.findIndex((x) => Number(x.id) === Number(e.id));
                                    if (fid !== -1 && e.status === '1') return true;
                                    else return false;
                                  } else return e.status === '1';
                                })
                              : []
                          )}
                        </Select>
                      )}
                    />
                    {errors?.subzone_id && <p style={{color: 'red'}}>Please select SubZone</p>}
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='outlet_name' label='Outlet Name'>
                    <Controller
                      control={control}
                      name='outlet_name'
                      render={({field: {onChange}}) => (
                        <Input onChange={onChange} defaultValue={state?.outlet_name} value={selectedOutlet?.name} disabled style={{width: '100%'}} />
                      )}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[15, 0]}>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='orl_name' label='ORL Name'>
                    <Controller
                      control={control}
                      name='orl_name'
                      render={({field: {onChange}}) => <Input onChange={onChange} value={selectedOutlet?.orl_name} disabled style={{width: '100%'}} />}
                    />
                  </Form.Item>
                </Col>
                {!isFullAudit ? (
                  <Col md={{span: 6}} xs={{span: 24}}>
                    <Form.Item name='selected_category' label='Audit Type' rules={[{required: true, message: 'Please select category'}]}>
                      <Controller
                        control={control}
                        name='selected_category'
                        render={({field}) => (
                          <Select
                            {...field}
                            mode='multiple'
                            disabled={mode === 'edit'}
                            onChange={(e) => {
                              setType(e);
                            }}
                            placeholder='Select'
                            showSearch
                            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                            {map(
                              (category) => {
                                return (
                                  <Option key={category?.id} value={category?.id}>
                                    {category?.name}
                                  </Option>
                                );
                              },
                              categoriesName ? categoriesName : []
                            )}
                          </Select>
                        )}
                      />
                      {isEmpty(setType) && <p style={{color: 'red'}}>Please select Audit Type</p>}
                    </Form.Item>
                  </Col>
                ) : (
                  <></>
                )}
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='total_mark' label='Total Mark'>
                    <Controller
                      control={control}
                      name='total_mark'
                      defaultValue={state?.total_mark || (total_mark ?? 100)}
                      render={({field: {onChange}}) => (
                        <Input onChange={onChange} value={!isEmpty(type) ? `${totalMark}/${total_mark ?? 100}` : 0} disabled style={{width: '100%'}} />
                      )}
                    />
                  </Form.Item>
                </Col>
                {mode === 'edit' && state?.recheck_msg && (
                  <Col md={{span: 6}} xs={{span: 24}}>
                    <Form.Item name='re-check remark' label='Re-Check Remarks:'>
                      <Popover content={<p>{state?.recheck_msg || ''}</p>} trigger='click'>
                        <Button>Click to see</Button>
                      </Popover>
                    </Form.Item>
                  </Col>
                )}
              </Row>

              {!isEmpty(type) || isFullAudit ? (
                <Row>
                  <Tabs
                    defaultActiveKey='1'
                    centered
                    type='card'
                    items={
                      mode === 'add'
                        ? (entryData?.category ?? [])?.map((data, i) => {
                            const id = String(i + 1);
                            return {
                              label: data?.name,
                              key: id,
                              children: <FormTable {...{index: i, data, register, errors, control, setValue, getValues, setError, clearErrors, addonMark}} />
                            };
                          })
                        : (categories ?? [])?.map((data, i) => {
                            const id = String(i + 1);
                            return {
                              label: data[0]?.category_name,
                              key: id,
                              children: (
                                <FormTable
                                  {...{
                                    index: i,
                                    data: {subcategory: data, state},
                                    register,
                                    errors,
                                    control,
                                    setValue,
                                    getValues,
                                    setError,
                                    clearErrors,
                                    addOnEditMark,
                                    editMode: true
                                  }}
                                />
                              )
                            };
                          })
                    }
                  />
                </Row>
              ) : (
                <></>
              )}

              <div className='d-flex justify-content-end align-items-center ' style={{width: '96%'}}>
                <Form.Item wrapperCol={{offset: 8, span: 16}}>
                  <Button loading={savingEntryTypes} onClick={handleClickBack} style={{backgroundColor: '#f5a60b', color: 'white'}} type='info' htmlType='button'>
                    Back
                  </Button>
                </Form.Item>
                <Form.Item wrapperCol={{offset: 8, span: 16}}>
                  <Button
                    style={{backgroundColor: '#34b1aa'}}
                    type='primary'
                    onClick={isEmpty(setType) ? () => {} : handleSubmit(mode === 'add' ? onFinish : onEditFinish)}
                    loading={savingEntryTypes}
                    disabled={!submitStatus}>
                    {mode === 'edit' ? 'Update' : 'Add'}
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </Col>
        </Row>
      </Card>
    </>
  );
}

export default AuditEntryForm;
