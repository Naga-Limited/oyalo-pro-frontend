import {isPast, isFuture} from 'date-fns';
import {differenceInDays} from 'date-fns';
import React, {useEffect,useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Row, Col,Form, DatePicker,Card } from 'antd';
import {useNavigate} from 'react-router';
import {getAuditNewApproval} from '../../../@app/entry/entrySlice';
import CustomTable from '../../../components/CustomTable';
import {column} from './column';
import apis from "../../../api/entryApis";
import { useForm } from "react-hook-form";
export default function AuditNewApproval({setTopTitle}) {
  setTopTitle('Audit Outlet Approval List');
  const navigate = useNavigate();
  const { handleSubmit } = useForm();
  const {
    gettingAuditNewApproval,
    getAuditNewApprovalResponse: {data: dataSource}
  } = useSelector((state) => {
    return state.entry;
  });
  const [startDate, setStartDate]= useState(useState(new Date().getMonth() + 1));
  const gridData = (dataSource ?? []).map((e) => {
    // let currentDate = format(new Date(e?.currentDate), 'dd/MM/yyyy');
    // let from_date = format(new Date(e?.from_date), 'dd/MM/yyyy');
    // let to_date = format(new Date(e?.to_date), 'dd/MM/yyyy');
    let status = isPast(new Date(e?.from_date)) && isFuture(new Date(e?.to_date));
    const agingDays = `${differenceInDays(new Date().getTime(), new Date(e?.created_at).getTime()) ?? 0} day(s)`;
    return {
      ...e,
      // currentDate,
      // from_date,
      // to_date,
      agingDays,
      status
    };
  });

  // const onClickAdd = () => {
  //   navigate('/auditNewEntry/addForm');
  // };

  const handleViewClick = (data) => {
    navigate('/auditNewApproval/view', {
      state: {...data}
    });
  };

   const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getAuditNewApproval());
  // }, []);
  const {type, userData} = useSelector((state) => state.auth);
  const empId = userData.data?.id;

  useEffect(() => {
    if (type === 1) dispatch(getAuditNewApproval({path: 'get-outlet-approval', data: {limit: 400, offset: 0}}));
    else dispatch(getAuditNewApproval({path: 'get-outlet-approval', data: {limit: 400, offset: 0, employee: empId}}));
  }, []);

  const handleFormSubmit = () => {
    const stDate = startDate.toLocaleString({ date: 'DD/MM/YYYY' });
    var arr1 = stDate.split(',');   
    const startSelectedDate = arr1[1];   
    const endSelectedDate = arr1[3];   
    if (startDate) {
      if (type === 1) dispatch(getAuditNewApproval({path: 'get-outlet-approval', data: {limit: 400, offset: 0,startDate:startSelectedDate,
        endDate:endSelectedDate }}));
      else dispatch(getAuditNewApproval({path: 'get-outlet-approval', data: {limit: 400, offset: 0, employee: empId,startDate:startSelectedDate,
        endDate:endSelectedDate }}));
      // dispatch(getAuditNewApproval({path: 'get-outlet-approval',data: { startDate:startSelectedDate,
      //     endDate:endSelectedDate},
       // }));
      }
    else {
      apis.open({message: "Please choose and Month",type: "error",});
    }
    handleSubmit();
  };


  return (
    <>  
    <Card>   
    <Row style={{margin:'3px'}} gutter={[5, 0]}>
      <Col md={{span: 1}} xs={{span: 24}}></Col>
      <Col md={{span: 8}} xs={{span: 24}} >
        <Form.Item name='month' label='Date Filter' >        
          <DatePicker.RangePicker 
               value={startDate} 
               format="DD-MM-YYYY"
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
      loading={gettingAuditNewApproval}
      column={column}
      // onClickAdd={onClickAdd}
      // handleEditClick={handleEditClick}
      handleViewClick={handleViewClick}
      title={'Audit Outlet Approval List'}
    />
    </>
  );
}
