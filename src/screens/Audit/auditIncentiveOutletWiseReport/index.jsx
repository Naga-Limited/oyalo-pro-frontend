import React, {useEffect,useState} from 'react';
    import {useDispatch, useSelector} from 'react-redux';
    import {getPaymentOutletwiseReport} from '../../../@app/entry/entrySlice';
    import CustomTable from '../../../components/CustomTableNew';
    import {column} from './column';    
    import { Row, Col,Form, DatePicker,Card } from 'antd';
    import dayjs from 'dayjs';
    //import { format } from 'date-fns';
    import apis from "../../../api/entryApis";
    import { useForm } from "react-hook-form";

    //const dateFormat = 'YYYY/MM/DD';
    import customParseFormat from 'dayjs/plugin/customParseFormat';

    dayjs.extend(customParseFormat);
  
    export default function AuditIncentiveOutletWiseReportFormView ({setTopTitle}) {
      setTopTitle('Incentive Report Outlet List');
      const [startDate, setStartDate]= useState(useState(new Date().getMonth() + 1));
         
      const { handleSubmit } = useForm();
      const {
        gettingPaymentOutletwiseReport,
        getPaymentOutletwiseReportResponse: { data: dataSource }
      } = useSelector((state) => {
        return state.entry;
      });
      const dispatch = useDispatch();

  const gridData = (dataSource ?? []).map((e) => {
    return {
      ...e,
    };
  });

  const handleFormSubmit = () => {
    const stDate = startDate.toLocaleString({ date: 'DD/MM/YYYY' });
    var arr1 = stDate.split(',');   
    const startSelectedDate = arr1[1];   
    const endSelectedDate = arr1[3];   
    if (startDate) {
      dispatch(getPaymentOutletwiseReport({path: 'get-payment-outletwise-report',data: { startDate:startSelectedDate,
          endDate:endSelectedDate 
      },
        }));}
    else {
      apis.open({message: "Please choose and Month",type: "error",});
    }
    handleSubmit();
  };


  useEffect(() => {
    if (type === 1)
      dispatch(
        getPaymentOutletwiseReport({
          path: "get-payment-outletwise-report",
          data: { limit: 400, offset: 0}
        })
      );
    else
      dispatch(
        getPaymentOutletwiseReport({
          path: "get-payment-outletwise-report",
          data: { limit: 400, offset: 0, employee: empId }
        })
      );
  }, []); 
      const {type, userData} = useSelector((state) => state.auth);
      const empId = userData.data?.id;    

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
          loading={gettingPaymentOutletwiseReport}
          setStartDate={setStartDate}
          column={column}     
          title={'Incentive OH View Outlet List'}    
        />          
      </>
      ); 
              
    }
    