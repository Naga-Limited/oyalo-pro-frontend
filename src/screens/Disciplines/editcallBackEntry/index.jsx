import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router';
import {getEditCallBackEntry} from '../../../@app/subMaster/subMasterSlice';
import CustomTable from '../../../components/CustomTable';
import dayjs from "dayjs";
import {callEntryStatus} from '../../../components/formComponents/CommonFunctions';
import { Badge,Rate,Form,Tooltip,Card,Row,Col,DatePicker } from 'antd';
import apis from "../../../api/stateAPI";
import { useForm
 } from "react-hook-form";

export default function CallBackApproval({setTopTitle}) {
  setTopTitle('Edit Call Back Entry');
  const navigate = useNavigate();
  const { handleSubmit } = useForm();
  const {
    gettingEditCallBackEntry,
    getEditCallBackEntryResponse: {data: dataSource}
  } = useSelector((state) => {
    return state.subMaster;
  });

  const [startDate, setStartDate]= useState(useState(new Date().getMonth() + 1));
  const gridData = Array.isArray(dataSource) ? dataSource.map((e) => ({ ...e })) : [];
  
  const handleFormSubmit = () => {
    const stDate = startDate.toLocaleString({ date: 'DD/MM/YYYY' });
    var arr1 = stDate.split(',');   
    const startSelectedDate = arr1[1];   
    const endSelectedDate = arr1[3];   
    if (startDate) {
      if (type === 1) dispatch(getEditCallBackEntry({path: 'get-edit-call-entry', data: {startDate:startSelectedDate,
        endDate:endSelectedDate }}));
      else dispatch(getEditCallBackEntry({path: 'get-edit-call-entry', data: {employee: empId,startDate:startSelectedDate,
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
    if (type === 1) dispatch(getEditCallBackEntry({path: 'get-edit-call-entry', data:{}}));
    else dispatch(getEditCallBackEntry({path: 'get-edit-call-entry', data: {employee: empId}}));
  }, []);

  const handleEditClick = (data) => {
   navigate('/editcallBackEntry/editForm', {
      state: {data,...data,
        //customer_name : data?.customer_name
      }
    });
  };

// Utility function to convert a string to Title Case

const column = [
  { key: '1', headerName: 'S.No', field: 'S.No', hide: false, width: 80 },

  { key: '3', headerName: 'Outlet Name', field: 'outlet_name', hide: false, width: 220 },
  { key: '5', headerName: 'Customer Name', field: 'customer_name', hide: false, width: 120 },
  {
    key: '2', headerName: 'Bill Date', field: 'invoice_date', hide: false, width: 120,
    valueGetter: (params) => {
      const shortdate = dayjs(params.row.invoice_date).format("DD-MM-YYYY");
      return shortdate;
    }
  },
  {
    key: '5',
    headerName: 'FeedBack',
    field: 'feedback',
    hide: false,
    width: 120,
    renderCell: (params) => {
      const feedbackValue = params.row.feedback;
      // Check if feedback value is 'Negative'
      const isNegativeFeedback = feedbackValue == 'Negative';
  
      return (
        <span style={{ backgroundColor: isNegativeFeedback ? 'red' : '' }}>
          {feedbackValue}
        </span>
      );
    },
  },

   { key: '5', headerName: 'Remarks', field: 'remarks', hide: false, width: 150,
   renderCell: (params) => {
    return (
      <Tooltip title={params.row.remarks}>
        {params.row.remarks}
      </Tooltip>
    );
  }, },
  {
    key: '5',
    headerName: 'Rating',
    field: 'rating',
    hide: false,
    width: 170,
    renderCell: (params) => {
      return (
        <Rate allowHalf defaultValue={params.row.rating} disabled />
      );
    },
  },
  { key: '6', headerName: 'Call Status', field: 'call_status_name', hide: false, width: 170, 
   
   renderCell: (params) => {
    return (
     <Badge
        style={{ Color: callEntryStatus(params.row.call_status_name) }} count={params.row.call_status_name}>
      </Badge>
    );
  }},
  { key: '6', headerName: 'Status', field: 'call_status', hide: false, width: 170, 
   
  renderCell: (params) => {
   return (
    <Badge
       style={{ Color: callEntryStatus(params.row.call_status) }} count={params.row.call_status}>
     </Badge>
   );
 }},
 
];

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
      loading={gettingEditCallBackEntry}
      column={column}
      handleEditClick={handleEditClick}
      title={'Edit Call Back Entry List'}
    />
    
    </>
  );
}
