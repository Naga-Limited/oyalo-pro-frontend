import {isPast, isFuture} from 'date-fns';
import {differenceInDays} from 'date-fns';
import React, {useEffect,useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {useNavigate} from 'react-router';
import {get_Audit_Entry} from '../../../@app/master/masterSlice';
import CustomTable from '../../../components/CustomTable';
import {column} from './column';
import { Row, Col,Form, DatePicker,Card } from 'antd';

import apis from "../../../api/entryApis";
import { useForm } from "react-hook-form";

export default function AuditNewEntry({setTopTitle}) {
  setTopTitle('Audit Entry List');
  const navigate = useNavigate();
  const {
    gettingAuditNewEntryMark,
    getAuditNewEntryMarkResponse: {data: dataSource}
  } = useSelector((state) => {return state.master});

  const [startDate, setStartDate]= useState(useState(new Date().getMonth() + 1));

  const { handleSubmit } = useForm();

  const {type, userData} = useSelector((state) => state.auth);
  const empId = userData.data?.id;

  const gridData = (dataSource ?? []).map((e) => {
    let status = isPast(new Date(e?.from_date)) && isFuture(new Date(e?.to_date));
    const agingDays = `${differenceInDays(new Date().getTime(), new Date(e?.created_at).getTime()) ?? 0} day(s)`;
    return {
      ...e,
      agingDays,
      status
    };
  });

  const onClickAdd = () => {
    navigate('/auditNewEntry/addForm');
  };


  const handleFormSubmit = () => {
    const stDate = startDate.toLocaleString({ date: 'DD/MM/YYYY' });
    var arr1 = stDate.split(',');   
    const startSelectedDate = arr1[1];   
    const endSelectedDate = arr1[3];   
    if (startDate) {
      if (type === 1) dispatch(get_Audit_Entry({path: 'get-Audit-Entry', data: {limit: 400, offset: 0,startDate:startSelectedDate,
        endDate:endSelectedDate }}));
      else dispatch(get_Audit_Entry({path: 'get-Audit-Entry', data: {limit: 400, offset: 0, employee: empId,startDate:startSelectedDate,
        endDate:endSelectedDate }}));
      }
    else {
      apis.open({message: "Please choose and Month",type: "error",});
    }
    handleSubmit();
  };

  const handleViewClick = (data) => {
    navigate('/auditNewEntry/view', {
      state: {...data}
    });
  };

  const handleEditClick = (data) => {
    navigate('/auditNewEntry/addForm', {
      state: {...data, edit: true}
    });
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (type === 1) dispatch(get_Audit_Entry({path: 'get-Audit-Entry', data: {limit: 400, offset: 0}}));
    else dispatch(get_Audit_Entry({path: 'get-Audit-Entry', data: {limit: 400, offset: 0, employee: empId}}));
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
      loading={gettingAuditNewEntryMark}
      column={column}
      onClickAdd={onClickAdd}
      handleEditClick={handleEditClick}
      handleViewClick={handleViewClick}
      title={'Audit Entry List'}
    /></>
  
  );
}
