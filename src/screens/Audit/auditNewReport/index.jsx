import {isPast, isFuture} from 'date-fns';
import {differenceInDays} from 'date-fns';
import React, {useEffect,useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router';
import {getAuditReport} from '../../../@app/entry/entrySlice';
import CustomTable from '../../../components/CustomTable';
import {column} from './column';
import { Row, Col,Form, DatePicker,Card } from 'antd';
import apis from "../../../api/entryApis";
import { useForm } from "react-hook-form";

export default function AuditNewReport({setTopTitle}) {
  setTopTitle('Audit 2.0 Report');
  const navigate = useNavigate();
  const { handleSubmit } = useForm();
  const {
    gettingAuditReport,
    getAuditReportResponse: {data: dataSource}
  } = useSelector((state) => {
    return state.entry;
  });

  const [startDate, setStartDate]= useState(useState(new Date().getMonth() + 1));
  const gridData = (dataSource ?? []).map((e) => {   
    let status = isPast(new Date(e?.from_date)) && isFuture(new Date(e?.to_date));
    const agingDays = `${differenceInDays(new Date().getTime(), new Date(e?.created_at).getTime()) ?? 0} day(s)`;
    return {
      ...e,   
      agingDays,
      status
    };
  });

  const handleViewClick = (data) => {
    navigate('/auditNewReport/view', {
      state: {...data}
    });
  };

  const handleFormSubmit = () => {
    const stDate = startDate.toLocaleString({ date: 'DD/MM/YYYY' });
    var arr1 = stDate.split(',');   
    const startSelectedDate = arr1[1];   
    const endSelectedDate = arr1[3];   
    if (startDate) {
      if (type === 1) dispatch(getAuditReport({path: 'get-audit-report', data: {limit: 400, offset: 0,startDate:startSelectedDate,
        endDate:endSelectedDate }}));
      else dispatch(getAuditReport({path: 'get-audit-report', data: {limit: 400, offset: 0, employee: empId,startDate:startSelectedDate,
        endDate:endSelectedDate }}));
      }
    else {
      apis.open({message: "Please choose and Month",type: "error",});
    }
    handleSubmit();
  };

  const {type, userData} = useSelector((state) => state.auth);
  const empId = userData.data?.id;

  const dispatch = useDispatch();

  useEffect(() => {
    if (type === 1) dispatch(getAuditReport({path: 'get-audit-report', data: {limit: 400, offset: 0}}));
    else dispatch(getAuditReport({path: 'get-audit-report', data: {limit: 400, offset: 0, employee: empId}}));
  }, []);


  return (   
 <>
  <Card>   
    <Row style={{margin:'3px'}} gutter={[5, 0]}>
      <Col md={{span: 1}} xs={{span: 24}}></Col>
      <Col md={{span: 8}} xs={{span: 24}} >
        <Form.Item name='month' label='Date Filter' >        
          <DatePicker.RangePicker 
               format="DD-MM-YYYY"
               value={startDate} 
               onChange = {(e) => setStartDate(e)}
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
      loading={gettingAuditReport}
      column={column}
    //  onClickAdd={onClickAdd}
      //handleEditClick={handleEditClick}
      handleViewClick={handleViewClick}
      title={'Audit 2.0 Report'}
    />
    </>
  );
}
