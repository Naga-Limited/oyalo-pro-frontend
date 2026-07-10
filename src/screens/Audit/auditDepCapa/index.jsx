
import {differenceInDays} from 'date-fns';
import React, {useEffect,useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router';
import {getAuditDepCapa} from '../../../@app/entry/entrySlice';
import CustomTable from '../../../components/CustomTable';
import {column} from './column';
import { Row, Col,Form, DatePicker,Card } from 'antd';

import apis from "../../../api/entryApis";
import { useForm } from "react-hook-form";

export default function AuditDepCapa({setTopTitle}) {
  setTopTitle('Audit Department CAPA');
  const navigate = useNavigate();
  const {
    gettingAuditDepCapaSubmit,
    getAuditDepCapaSubmitResponse: {data: dataSource}
  } = useSelector((state) => {
    return state.entry;
  });

  const [startDate, setStartDate]= useState(useState(new Date().getMonth() + 1));

  const { handleSubmit } = useForm();
  const gridData = (dataSource ?? []).map((e) => {
    const agingDays = `${differenceInDays(new Date().getTime(), new Date(e?.created_at).getTime()) ?? 0} day(s)`;
    //     
    return {
      ...e,agingDays   
     };
  });

  // const onClickAdd = () => {
  //   navigate('/auditDepCapa/addForm');
  // };

  const handleViewClick = (data) => {
    navigate('/auditDepCapa/view', {
      state: {...data}
    });
  };

  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getAuditDepCapa());
  // }, []);

  const {type, userData} = useSelector((state) => state.auth);
  const empId = userData.data?.id;

  const handleFormSubmit = () => {
    const stDate = startDate.toLocaleString({ date: 'DD/MM/YYYY' });
    var arr1 = stDate.split(',');   
    const startSelectedDate = arr1[1];   
    const endSelectedDate = arr1[3];   
    if (startDate) {
      if (type === 1) dispatch(getAuditDepCapa({path: 'get-dep-capa-audit', data: {limit: 400, offset: 0,startDate:startSelectedDate,
        endDate:endSelectedDate }}));
      else dispatch(getAuditDepCapa({path: 'get-dep-capa-audit', data: {limit: 400, offset: 0, employee: empId,startDate:startSelectedDate,
        endDate:endSelectedDate }}));
      }
    else {
      apis.open({message: "Please choose and Month",type: "error",});
    }
    handleSubmit();
  };

  
  useEffect(() => {
    if (type === 1) dispatch(getAuditDepCapa({path: 'get-dep-capa-audit', data: {limit: 400, offset: 0}}));
    else dispatch(getAuditDepCapa({path: 'get-dep-capa-audit', data: {limit: 400, offset: 0, employee: empId}}));
  }, []);

  return (
  <> 
   <Card>   
       <Row style={{margin:'3px'}} gutter={[5, 0]}>
        <Col md={{span: 8}} xs={{span: 24}} >
        <Form.Item name='month' label='Date Filter' >        
          <DatePicker.RangePicker 
              value={startDate} 
              format="DD-MM-YYYY"
              onChange = {(e) => e ? setStartDate(e) : null }
              dateFormat="MMMM d, yyyy"/>
        </Form.Item>
        </Col>
      <Col md={{span: 4}} xs={{span: 24}} >
          <Form.Item name='submit'>     
          <button
          onClick={handleFormSubmit}
          style={{background:'#34b1aa',color: "#ffffff"}}
          className="btn btn col-lg-2 col-m-2 col-sm-2 h-100 w-auto align-items-center">
          {" "}
          Filter
        </button>
        </Form.Item>
            </Col>
      </Row>
      </Card>

    <CustomTable
      dataSource={gridData}
      loading={gettingAuditDepCapaSubmit}
      column={column}
      handleViewClick={handleViewClick}
      title={'Audit Department CAPA'}
    />
    </>
  );
}
