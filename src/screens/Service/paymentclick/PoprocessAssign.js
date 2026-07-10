/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router';
import CustomTable from '../../../components/CustomTable';
import {useSelector} from 'react-redux';
import {Input, DatePicker, Button, Col, Row, Form, Select, Card} from 'antd';
import {includes} from 'ramda';
import {ticketHandlingDropDownData} from './Pcaclaimsubmissionms.constants';
// import {saveOutletMaster, getStates, getSubZonal, getZonal, updateOutletMaster, getCity} from '../../../@app/master/masterSlice';
// import {map} from 'ramda';
// import {useLocation, useNavigate} from 'react-router';
// import dayjs from 'dayjs';
// import messageToast from '../../../components/messageToast/messageToast';
// import {transStatus} from '../../../util/transStatus';
// import { Input } from 'antd';
// import {getFormData, CREATE_TICKET_FORM_DATA} from './createTicket.constants';
import CostInvolvedNo from './CostInvolvedNo';

const {TextArea} = Input;
const {Option} = Select;

const dateFormat = ['DD/MM/YYYY', 'DD/MM/YY'];

const QuotationYes = () => (
  <>
    <Row>
      <Col>
        <Form.Item name='Quotation No' label='Quotation No'>
          <input type='text' placeholder='Quotation No' />
        </Form.Item>
      </Col>
      <Col>
        <Form.Item name='Quotation Amount' label='Quotation Amount'>
          <input type='text' placeholder='Quotation Amount' />
        </Form.Item>
      </Col>
    </Row>
    <Row>
      <Col>
        <Form.Item name='stateID' label='Quotation Copy'>
          <input type={'file'} />
        </Form.Item>
      </Col>
    </Row>
  </>
);

const SelectWithSpare = () => (
  <Row>
    <Col md={{span: 6}} xs={{span: 24}}>
      <Form.Item name='selectSpare' label='Select the Spare'>
        <Select
          placeholder='Select'
          //   loading={gettingState}
          //   disabled={savingCity}
          showSearch
          // onChange={handleOnChange}
          // filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
        >
          {ticketHandlingDropDownData('selectSpare').map((el) => (
            <Option key={el} value={el}>
              {el}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </Col>
    <Col md={{span: 6}} xs={{span: 24}}>
      <Form.Item label='Tentative Date' name='tentativeDate'>
        <DatePicker format={dateFormat} placeholder='dd/mm/yyyy' style={{width: '100%'}} name='tentativeDate' />
      </Form.Item>
    </Col>
  </Row>
);

function PoprocessAssign() {
  // const dispatch = useDispatch();

  const data = [
    {
      'S.No': 1,
      id: 1,
      outlet: 'select',
      ticket_description: 'ticket description',
      service_for: 'ticket service',
      asset_group: 'asset group',
      ticket_status: 'open',
      current_status: 'current ticket',
      ticket_date: 'ticket date',
      aging: 'agingd'
    }
  ];

  const navigate = useNavigate();

  const onClickAdd = () => {
    navigate('/pcadvancereqmsform');
  };

  const handleViewClick = (rowInfo) => {
    navigate('/ticketForm', {
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

  const [form] = Form.useForm();

  // useWatch
  const vendorType = Form.useWatch('vendorType', form);
  const selectWorkDone = Form.useWatch('selectWorkDone', form);
  const costInvolved = Form.useWatch('costInvolved', form);
  const paymentMode = Form.useWatch('paymentMode', form);
  const quotation = Form.useWatch('quotation', form);

  const {
    gettingOutletMaster,
    getOutletMasterResponse: {data: dataSource}
  } = useSelector((state) => {
    return state.master;
  });

  const onSelectChange = () => {
    // eslint-disable-next-line no-console

  };

  //   useEffect( () => {
  //     dispatch( getOutletMaster() );
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [] )
  return (
    <div className='h-screen'>
      <Card>
        <Row>
          <Col span={24}>
            <Form
              name='basic'
              labelCol={{span: 24}}
              wrapperCol={{span: 24}}
              // onValuesChange={onSelectChange}
              // onFinish={onFinish}
              // onFinishFailed={onFinishFailed}
              autoComplete='off'
              form={form}>
              <Row>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='selectWorkDone' label='Select WorkDone'>
                    <Select
                      placeholder='Select'
                      //   loading={gettingState}
                      //   disabled={savingCity}
                      showSearch
                      // onChange={handleOnChange}
                      // filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                    >
                      {ticketHandlingDropDownData('selectWorkDone').map((el) => (
                        <Option key={el} value={el}>
                          {el}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              {'Service with spare' === selectWorkDone && <SelectWithSpare />}

              <Row>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='coveredInAMC' label='Covered in AMC'>
                    <Input placeholder='Covered In AMC' name='coveredInAMC' />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col md={{span: 6}} xs={{span: 24}}>
                  <Form.Item name='costInvolved' label='Cost Involved'>
                    <Select
                      placeholder='Select'
                      //   loading={gettingState}
                      //   disabled={savingCity}
                      showSearch
                      // onChange={handleOnChange}
                      // filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                    >
                      {ticketHandlingDropDownData('costInvolved').map((el) => (
                        <Option key={el} value={el}>
                          {el}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              {costInvolved === 'no' && <CostInvolvedNo />}

              {costInvolved === 'yes' && (
                <>
                  <Row>
                    <Col md={{span: 6}} xs={{span: 24}}>
                      <Form.Item name='paymentMode' label='Mode of Payment'>
                        <Select
                          placeholder='Select'
                          //   loading={gettingState}
                          //   disabled={savingCity}
                          showSearch
                          // onChange={handleOnChange}
                          // filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                        >
                          {ticketHandlingDropDownData('paymentMode').map((el) => (
                            <Option key={el} value={el}>
                              {el}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                </>
              )}

              {paymentMode === 'Online' && (
                <>
                  <Row>
                    <Col md={{span: 6}} xs={{span: 24}}>
                      <Form.Item name='advance' label='advance'>
                        <Select
                          placeholder='Select'
                          //   loading={gettingState}
                          //   disabled={savingCity}
                          showSearch
                          // onChange={handleOnChange}
                          // filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                        >
                          {ticketHandlingDropDownData('advance').map((el) => (
                            <Option key={el} value={el}>
                              {el}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Item name='advance' label='advance%'>
                        <input type='text' placeholder='Quotation Amount' />
                      </Form.Item>
                    </Col>
                  </Row>
                </>
              )}

              {['Petty cash', 'online'].includes(paymentMode) && (
                <Row>
                  <Col md={{span: 6}} xs={{span: 24}}>
                    <Form.Item name='quotation' label='Quotation'>
                      <Select placeholder='Select' showSearch>
                        {ticketHandlingDropDownData('quotation').map((el) => (
                          <Option key={el} value={el}>
                            {el}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              )}

              {quotation === 'yes' && <QuotationYes />}

              {paymentMode === 'Online' && (
                <>
                  <table>HERE WE NEED TO SHOW THE TABLE</table>
                  <Row>
                    <Col>
                      <Form.Item name=' PO Number' label=' PO Number'>
                        <input type='text' placeholder='PO Number' />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Item name='Vendor Name' label='Vendor Name'>
                        <input type='text' placeholder='Vendor Name' />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Item name='Total Cost' label='Total Cost'>
                        <input type='text' placeholder='Total Cost' />
                      </Form.Item>
                    </Col>
                  </Row>
                </>
              )}

              {costInvolved === 'yes' && (
                <Row>
                  <Col>
                    <Form.Item name='stateID' label='Invoice Copy'>
                      <input type={'file'} />
                    </Form.Item>
                  </Col>
                </Row>
              )}
            </Form>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default PoprocessAssign;
