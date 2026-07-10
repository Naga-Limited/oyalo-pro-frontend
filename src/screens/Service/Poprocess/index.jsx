/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router';
import CustomTable from '../../../components/CustomTable';
import {useSelector} from 'react-redux';
import {Input, DatePicker, Button, Col, Row, Form, Select, Card} from 'antd';
import {includes} from 'ramda';
// import {saveOutletMaster, getStates, getSubZonal, getZonal, updateOutletMaster, getCity} from '../../../@app/master/masterSlice';
// import {map} from 'ramda';
// import {useLocation, useNavigate} from 'react-router';
// import dayjs from 'dayjs';
// import messageToast from '../../../components/messageToast/messageToast';
// import {transStatus} from '../../../util/transStatus';
// import { Input } from 'antd';
// import {getFormData, CREATE_TICKET_FORM_DATA} from './createTicket.constants';
 import favicon from '../../../asset/favicon.ico';

const {TextArea} = Input;

function Pcaclaimsubmissionms() {
  // const dispatch = useDispatch();

  const data = [
    {
      'S.No': 1,
      Outlet_Name: 'TN-MADURAI-VILLUPURAM',
      Ticket_Creation_Date: '22-FEB-23',
      Ticket_Number: 'SE-BR-EQ-23-02-22-04',
      Workdone:'Service with Spare',
      Value_for_Spare_Material: '5300',
      Advance:'3000',
      Aging_Days:'7'
    },
   
  ];

  const navigate = useNavigate();

  const onClickAdd = () => {
    navigate('/poprocessForm');
  };

  const handleViewClick = (rowInfo) => {
    navigate('/poprocessForm', {
      state: rowInfo
    });
  };

  const handleOnChange = () => {
    // eslint-disable-next-line no-console
   
  };

  const onFinish = (values) => {
    let data = {
      zone: values.zone,
      subZone: values.subZone,
      outlet: values.outlet,
      serviceFor: values.serviceFor,
      assetGroup: values.assetGroup,
      ticketStatus: values.ticketStatus,
      waitingAt: values.waitingAt,
      assignedTo: values.assignedTo,
      fromDate: values['fromDate']?.format('YYYY-MM-DD'),
      toDate: values['toDate']?.format('YYYY-MM-DD')
    };
  };

  const {
    gettingOutletMaster,
    getOutletMasterResponse: {data: dataSource}
  } = useSelector((state) => {
    return state.master;
  });

  const onSelectChange = () => {
    // eslint-disable-next-line no-console
  
  };

  const dateFormat = ['DD/MM/YYYY', 'DD/MM/YY'];

  //   useEffect( () => {
  //     dispatch( getOutletMaster() );
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [] );
  let column = [
    { key: '1', headerName: 'S.No', field: 'S.No', hide: false, width: 70 },
    { key: '2', headerName: 'Outlet Name', field: 'Outlet_Name', hide: false, width: 300 },
    { key: '3', headerName: 'Ticket Creation Date', field: 'Ticket_Creation_Date', hide: false, width: 180 },
    { key: '4', headerName: 'Ticket Number', field: 'Ticket_Number', hide: false, width: 180 },
    { key: '5', headerName: 'Workdone', field: 'Workdone', hide: false, width: 180 },
    { key: '6', headerName: 'Value for Spare Material', field: 'Value_for_Spare_Material', hide: false, width: 180 },
    { key: '7', headerName: 'Advance', field: 'Advance', hide: false, width: 180 },
    { key: '7', headerName: 'Aging Days', field: 'Aging_Days', hide: false, width: 180 },
    ];
  return (
    <div className='h-screen apphide'>
      <Card>
        <Row>
          <Col span={24}>
            <Form
              name='basic'
              labelCol={{span: 24}}
              wrapperCol={{span: 24}}
              onValuesChange={onSelectChange}
              onFinish={onFinish}
              // onFinishFailed={onFinishFailed}
              autoComplete='off'
              // form={form}
            >
              <Row gutter={[15, 0]}>

              {/*  */}

                {/* <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='Cash in Hand' label='Cash in Hand'>
                  <Input placeholder='1000' name='Cash in Hand' />
                  </Form.Item>
                </Col>
               
               
              

              
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='Yet to confirm by accounts ' label='Yet to confirm by accounts '>
                    <Input placeholder='3000' name='Yet to confirm by accounts ' />
                  </Form.Item>
                </Col> */}
               
              </Row>
            </Form>
          </Col>
        </Row>
      </Card>
      <CustomTable
        showHeader={false}
        showEdit={false}
        dataSource={data}
        column={column}
        handleViewClick={handleViewClick}
        onClickAdd={onClickAdd}
        title={'Approval List'}
      />
    </div>
  );
}

export default Pcaclaimsubmissionms;
