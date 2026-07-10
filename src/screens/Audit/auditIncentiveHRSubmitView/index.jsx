import React, {useEffect,
    //  useState
    } from 'react';
    import {useDispatch, useSelector} from 'react-redux';
    import {useLocation,useNavigate} from 'react-router';
    import {getAuditIncentiveSubmitDetails} from '../../../@app/entry/entrySlice';
    import CustomTable from '../../../components/CustomTableNew';
    import {column} from './column';   
    import {Col, Card, Form, Button}  from 'antd';
    export default function AuditIncentiveHRSubmitFormView ({setTopTitle}) {
      setTopTitle('Incentive - Outlet List');
     const navigate = useNavigate();
     const { state } = useLocation();
    
      const {
       gettingAuditIncentiveSubmitDetails,
       getAuditIncentiveSubmitDetailsResponse: {data: outletlist}
      } = useSelector((state) => {
          return state.entry;
      });

     // const [statusnew, setStatusnew] = useState(data);

      const gridDatanew = (outletlist ?? []).map((e) => {
         return {            
         ...e, 
         docID:e.id,             
       };   
      }
     );

     const handleViewClick = (data) => {
      navigate("/auditIncentiveHRSubmitView/view",
     {
        state: { ...data,
        },      
      }
      );
     };

     const handleClickBack = () => {
      navigate("/auditIncentiveHR");
    };
    
      const {type, userData} = useSelector((state) => state.auth);
      const empId = userData.data?.id;
     
     const dispatch = useDispatch();
      useEffect(() => {
        if (type === 1) 
        dispatch(getAuditIncentiveSubmitDetails({path: 'get-incentive-process-details', data: {limit: 400, offset: 0,docID:state?.id}}));
        else 
        dispatch(getAuditIncentiveSubmitDetails({path: 'get-incentive-process-details', data: {limit: 400, offset: 0,employee: empId,docID:state?.id}}));
      }, []);
      let divStyle = {
        color: '#34b1aa',
        fontWeight:'bold',
        fontSize:'20px',
        padding: '600px',
        width:'250px',
        height:'50px',        
      };

      return ( 
        <>
        <Col md={{span: 34}} xs={{span: 24}} >
        <Card>
        {/* <Form.Item name='submit' label='Document No' style={{fontWeight:'bold',align:'center'}}>      */}
        <span style={divStyle}>      
          Document No : {state?.payment_document_no}      
       </span>
      {/* </Form.Item> */}
      </Card>
          </Col>
        <CustomTable
          dataSource={gridDatanew}
          loading={gettingAuditIncentiveSubmitDetails}
          column={column}
          handleViewClick={handleViewClick}
          title={'Audit 2.0 Report'}
    
        />
         <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button
                    //disabled={savingAuditNewEntry}
                    onClick={handleClickBack}
                    style={{ backgroundColor: "#f5a60b", color: "white" }}
                    type="info"
                    htmlType="button"
                  >
                    Back
                  </Button>
                </Form.Item>
        </>
      ); 
              
    }
    