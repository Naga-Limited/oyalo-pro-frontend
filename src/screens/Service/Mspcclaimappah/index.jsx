/* eslint-disable no-unused-vars */
import { Button, Card, Col, Form, Row } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { getPettyCashClaimSubmitedMSTickets } from '../../../@app/service/serviceSlice';
import CustomTable from '../../../components/CustomTable';

function Mspcclaimappoh() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onClickAdd = () => {
    navigate('/mspcclaimappohForm');
  };
  const fiopen = () => {
    navigate('/mspcclaimappah');
  };
  const fisubmit = () => {
    navigate('/fisubmit');
  };
  const handleViewClick = (rowInfo) => {
    navigate('/orlpcclaimappbhForm', {
      state: rowInfo
    });
  };

  const {
    gettingPCClaimSubmittedMS,
    getPCClaimSubmittedMSResponse: { data },
  } = useSelector((state) => {
    return state.service;
  });

  const onSelectChange = () => {
    // eslint-disable-next-line no-console

  };

  let column = [
    { key: '1', headerName: 'S.No', field: 'S.No', hide: false, width: 70 },
    { key: '2', headerName: 'Requestee Name', field: 'requestee_name', hide: false, width: 300 },
    { key: '3', headerName: 'Document No', field: 'document_no', hide: false, width: 180 },
    {
      key: '4', headerName: 'Request Amount', field: 'created_at', hide: false, width: 180, valueGetter: (params) => {
        let total = 0;
        params.row.ticket?.forEach(_ => {
          let spend_amount = parseFloat(_.spend_amount);
          total += spend_amount;
        });
        return total;
      }
    },
    { key: '5', headerName: 'Approved Expense Amount', field: 'approved_expense_amount', hide: false, width: 220 },
    { key: '6', headerName: 'Approved Payment Amount', field: 'approved_payment_amount', hide: false, width: 220 },
    { key: '7', headerName: 'FI Expense No', field: 'fi_expense_no', hide: false, width: 180 },
    { key: '8', headerName: 'FI Payment No', field: 'fi_payment_no', hide: false, width: 180 },
    { key: '5', headerName: 'Aging	', field: 'aging	', hide: false, width: 180 },
  ];

  useEffect(() => {
    dispatch(getPettyCashClaimSubmitedMSTickets());
  }, [dispatch]);

  return (
    <div className='h-screen apphide'>
      <Card>
        <Row>
          <Col span={24}>
            <Form
              name='basic'
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              onValuesChange={onSelectChange}
              autoComplete='off'
            >
              <Row gutter={[15, 0]}>
                <Row gutter={[15, 15]} style={{ justifyContent: 'flex-start' }}>
                  <Col span={12} className='d-flex align-items-center justify-content-start mt-3'>
                    <Form.Item className='mx-2'>
                      <Button onClick={fiopen} htmlType='submit'>
                        Petty Cash Approval - AH
                      </Button>
                    </Form.Item>
                    {/* </Col>
                    <Col span={12}> */}
                    <Form.Item>
                      <Button className='orangeFactory' onClick={fisubmit}>FL Entry</Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Row>
            </Form>
          </Col>
        </Row>
      </Card>
      <CustomTable
        showHeader={false}
        // showEdit={false}
        dataSource={data}
        loading={gettingPCClaimSubmittedMS}
        column={column}
        handleViewClick={handleViewClick}
        onClickAdd={onClickAdd}
        title={'Approval List'}
      />
    </div>
  );
}

export default Mspcclaimappoh;
