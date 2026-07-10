
import React, {useEffect,useState
  //  useState
  } from 'react';
  import {useDispatch, useSelector} from 'react-redux';
  import { useNavigate} from "react-router";
 // import {useLocation} from 'react-router';
  import {getPaymentReport} from '../../../@app/entry/entrySlice';
  import CustomTable from '../../../components/CustomTableReport';
  import {column} from './column';    
  import {Row,Col,Form,DatePicker,Card} from  'antd';
  import apis from "../../../api/entryApis";
  import { useForm } from "react-hook-form";
  
  export default function AuditIncentiveReport({setTopTitle}) {
    setTopTitle('Incentive Report');
   const navigate = useNavigate();
   const { MonthPicker } = DatePicker;
   const { handleSubmit } = useForm();
   const [startDate, setStartDate] = useState(new Date().getMonth() + 1);
 //const [year,setYear] =useState(new Date().getFullYear());

 function getNumericMonth(startDate) {
  return (String(['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].indexOf(startDate) + 1).padStart(1, '0'))
}
  const monthnewone = startDate.toLocaleString({ month: 'numeric' });
  var arr1 = monthnewone.split(' ');
  const monthvalue = getNumericMonth(arr1[2]);
  const yearvalue = arr1[3];

    const {
      gettingPaymentReport,
      getPaymentReportResponse: {data: outletlist}
    } = useSelector((state) => {
        return state.entry;
    });
  const dispatch = useDispatch();
    let docID = ''
    const gridDatanew = (outletlist ?? []).map((e) => {
       return {            
       ...e, 
       docID:e.id,             
     };   
    }
   );
   const handleViewClick = (data) => {
    navigate("/auditIncentiveReportView/", {
      state: { ...data,
      },      
    }
    );};

     
    const {type, userData} = useSelector((state) => state.auth);
    const empId = userData.data?.id;
   
    useEffect(() => {
      if (type === 1)
        dispatch(
          getPaymentReport({
            path: "get-incentive-report-screen",
            data: { limit: 400, offset: 0, docID:docID, }
          })
        );
      else
        dispatch(
          getPaymentReport({
            path: "get-incentive-report-screen",
            data: { limit: 400, offset: 0, employee: empId, docID:docID, }
          })
        );
     }, []);

     const handleFormSubmit = () => {
      if (startDate) {
        dispatch(getPaymentReport({path: 'get-incentive-report-screen',data: { month: monthvalue, year:yearvalue },
          }));}
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
        <Col md={{span: 4}} xs={{span: 24}} >
      <Form.Item name='month' label='Month' >                     
        <MonthPicker
        selected={startDate}
        format="MMMM-YYYY"
        showPreviousMonths     
        onChange = {(e) => e ? setStartDate(e) : null }
        dateFormat="MM/YYYY"
        required
        form="external-form"
        showMonthYearPicker
      />
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
                key={column.id}
                monthvalue={monthvalue}
                setStartDate={setStartDate}
                loading={gettingPaymentReport}
                dataSource={gridDatanew}
                column={column}
                handleViewClick={handleViewClick}
                title={"Audit 2.0 Report"}
              />
              </>
      
    ); 
            
  }
  
