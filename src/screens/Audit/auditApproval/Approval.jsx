import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router';
import {Card, Col, Row, Form, Tabs, Modal, Input} from 'antd';
import {Colors} from '../../App/common/Images';
import {useForm} from 'react-hook-form';
import {eqBy, map, prop, unionWith, uniq} from 'ramda';
import entryApis from '../../../api/entryApis';
import messageToast from '../../../components/messageToast/messageToast';
import FormTable from '../../../components/formComponents/FormTable';
import ConfirmOnExit from '../../../components/confirmOnExit/ConfirmOnExit';
const {TextArea} = Input;

function Approval() {
  const {state} = useLocation();
  const navigate = useNavigate();
  const [totalMark, setTotalMark] = useState(0);
  const [recheckModal, setRecheckModal] = useState({});
  const {marks} = state;

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

    finalMark.forEach((e) => {
      setTotalMark((mark) => mark + Number(e?.actual_Score));
    });
  };
  useEffect(() => {
    addOnEditMark({mark: marks});
  }, []);
  const cat = uniq((marks ?? []).map((e) => e?.category_id));
  const category = [];
  cat.forEach((element) => {
    category.push((marks ?? []).filter((mark) => Number(mark.category_id) === Number(element)));
  });

  const handleApproved = (formData) => {
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
      capa_status: state.capa_status,
      status: '1',
      total_mark: totalMark,
      marks: finalMark
    };

    entryApis.editApproval({data}).then((data) => {
      const {
        data: {status}
      } = data;
      messageToast({message: 'Record approved successfully', status, title: 'Approved'});
      navigate('/auditApproval');
    });
  };

  const handleRecheck = () => {
    entryApis.entryCheck({data: {auditentry_id: (state?.id ?? '').toString(), status: '0', recheck_msg: recheckModal?.data}}).then((data) => {
      const {
        data: {status}
      } = data;
      messageToast({message: 'Record send recheck successfully', status, title: 'Recheck'});
      navigate('/auditApproval');
    });
  };

  const handleBack = () => {
    navigate('/auditApproval');
  };

  const {
    register,
    setValue,
    getValues,
    control,
    setError,
    handleSubmit,
    clearErrors,
    formState: {errors, isDirty}
  } = useForm();

  return (
    <>
      <Card className='m-5' style={{boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 50px', borderRadius: '16px'}}>
        <ConfirmOnExit showModel={isDirty} />
        <Row style={{justifyContent: 'center'}}>
          <Col span={24}>
            <Form name='basic' labelCol={{span: 24}} wrapperCol={{span: 24}} initialValues={{remember: true}} autoComplete='off'>
              <Row gutter={[15, 0]}>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='add_category' label='Zone'>
                    <span style={{color: Colors.text_color, paddingBottom: 0, marginTop: '-5px'}}>{state?.zone_name ?? ''}</span>
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='add_category' label='Sub Zone'>
                    <span style={{color: Colors.text_color, paddingBottom: 0}}>{state?.subzone_name ?? ''}</span>
                  </Form.Item>
                </Col>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='add_category' label='Outlet Code'>
                    <span style={{color: Colors.text_color, paddingBottom: 0}}>54622</span>
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
                    <span style={{color: Colors.text_color, paddingBottom: 0}}>{state?.outlet_ORL}</span>
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
                    <span style={{color: Colors.text_color, paddingBottom: 0}}>{totalMark}</span>
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
                            mode: 'Approval',
                            capa_status: state?.capa_status,
                            index: i,
                            data: {subcategory: data, state},
                            register,
                            errors,
                            control,
                            setValue,
                            getValues,
                            setError,
                            clearErrors,
                            addOnEditMark
                          }}
                        />
                      )
                    };
                  })}
                />
              </Row>
              <div className='d-flex align-items-right justify-content-between w-100 gap-3 pt-3 '>
                <button className='btn' onClick={handleBack} style={{color: 'white', backgroundColor: '#3a2cdb'}}>
                  Back
                </button>
                <div>
                  <button className='btn' onClick={handleSubmit(handleApproved)} style={{color: 'white', backgroundColor: '#34b1aa', marginRight: '10px'}}>
                    Approve
                  </button>
                  <button className='btn' onClick={() => setRecheckModal({...recheckModal, show: true})} style={{color: 'white', backgroundColor: Colors.text_color}}>
                    Re-Check
                  </button>
                </div>
              </div>
            </Form>
          </Col>
        </Row>
      </Card>
      {recheckModal?.show && (
        <Modal title='Re-Check' open={recheckModal?.show} onOk={handleRecheck} onCancel={() => setRecheckModal({...recheckModal, show: false})}>
          <h5>Add Remarks:</h5>
          <TextArea rows={4} style={{resize: 'none'}} value={recheckModal?.data || ''} onChange={(e) => setRecheckModal({...recheckModal, data: e.target.value})} />
        </Modal>
      )}
    </>
  );
}

export default Approval;
