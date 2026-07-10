import {differenceInDays} from 'date-fns';
import React, {useEffect,useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router';
import {getAuditNewCapa} from '../../../@app/entry/entrySlice';
import CustomTable from '../../../components/CustomTable';
import {column} from './column';
import { Row, Col,Form, DatePicker,Card } from 'antd';
import apis from "../../../api/entryApis";
import { useForm } from "react-hook-form";
export default function AuditNewCAPA({setTopTitle}) {
  setTopTitle('Audit Outlet CAPA List');
  const navigate = useNavigate();

  const {
    gettingAuditNewCapa,
    getAuditNewCapaResponse: {data: dataSource}
  } = useSelector((state) => {
    return state.entry;
  });

  const { handleSubmit } = useForm();
  
  const gridData = (dataSource ?? []).map((data) => {
    const {audit_entry, ...restOfData} = data;
    const agingDays = `${differenceInDays(new Date().getTime(), new Date(data?.created_at).getTime()) ?? 0} day(s)`;
    const x = (audit_entry ?? [])?.map((n) => {
      return n.value;
    });
    return {audit_entry: x,agingDays,...restOfData};
  });

  const onClickAdd = () => {
    navigate('/auditNewCAPA/addForm');
  };
  const [startDate, setStartDate]= useState(useState(new Date().getMonth() + 1));

  const handleViewClick = (data) => {
    navigate('/auditNewCAPA/view', {
      state: {...data}
    });
  };

  const {type, userData} = useSelector((state) => state.auth);
  const empId = userData.data?.id;

  const dispatch = useDispatch();

  const handleFormSubmit = () => {
    const stDate = startDate.toLocaleString({ date: 'DD/MM/YYYY' });
    var arr1 = stDate.split(',');   
    const startSelectedDate = arr1[1];   
    const endSelectedDate = arr1[3];   
    if (startDate) {
      if (type === 1) dispatch(getAuditNewCapa({path: 'get-capa-new-audit', data: {limit: 400, offset: 0,startDate:startSelectedDate,
        endDate:endSelectedDate }}));
      else dispatch(getAuditNewCapa({path: 'get-capa-new-audit', data: {limit: 400, offset: 0, employee: empId,startDate:startSelectedDate,
        endDate:endSelectedDate }}));
      }
    else {
      apis.open({message: "Please choose and Month",type: "error",});
    }
    handleSubmit();
  };
  
  useEffect(() => {
    if (type === 1) dispatch(getAuditNewCapa({path: 'get-capa-new-audit', data: {limit: 400, offset: 0}}));
    else dispatch(getAuditNewCapa({path: 'get-capa-new-audit', data: {limit: 400, offset: 0, employee: empId}}));
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
      loading={gettingAuditNewCapa}
      column={column}
      onClickAdd={onClickAdd}
     // handleEditClick={handleEditClick}
      handleViewClick={handleViewClick}
      title={'Audit Outlet CAPA List'}
    />
    </>
  );
}
