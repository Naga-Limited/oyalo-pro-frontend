/* eslint-disable no-unused-labels */
import React, { useEffect, useState } from "react";
import { Spin, Input, Card, Col, Row, Form, } from "antd";
import { useForm, Controller } from "react-hook-form";
// import messageToast from '../../../components/messageToast/messageToast';
import { useDispatch, } from "react-redux";
import { useLocation, } from 'react-router';
import { getEmployeeMaster, get_Outlet_Name, get_Deposit_Mode_Name } from "../../../@app/master/masterSlice";
// import { getdayclosureDetails } from '../../../@app/entry/entrySlice';
import '../cashHandling/style.css'; // Import the CSS file
import { LoadingOutlined } from '@ant-design/icons';


function CashHandlingView() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { state } = location;
  // let defaultValue = state?.data;
  const {
    control,
    //formState: { errors }
  } = useForm();
  //for geting value from previous page
  // const dataValue = state ? state : {}; // Default to an empty object if state is undefined
  const image = state?.image;
  const parsedDenominations = JSON.parse(state?.denominations);


  function useMapping(dispatch, getDataFunction, id) {
    const [mapping, setMapping] = useState({});
    useEffect(() => {
      dispatch(getDataFunction())
        .then((result) => {
          const data = result.data;
          if (typeof data === 'object' && Object.keys(data).length > 0) {
            const formattedData = {};
            for (const key in data) {
              if (data[key] !== undefined) {
                formattedData[key] = data[key].name;
              }
            }
            setMapping(formattedData);
          } 
        });
    }, [dispatch]);

    return mapping[id];
  }
  const orlName = useMapping(dispatch, getEmployeeMaster, state?.orl_id);
  const closureEmpName = useMapping(dispatch, getEmployeeMaster, state?.closureby);
  const depositEmpName = useMapping(dispatch, getEmployeeMaster, state?.depositby);
  const OutletName = useMapping(dispatch, get_Outlet_Name, 109023);



  function useMapping2(dispatch, getDataFunction, id) {
    const [mapping, setMapping] = useState({});
    useEffect(() => {
      dispatch(getDataFunction())
        .then((result) => {
          const data = result.data;
          if (typeof data === 'object' && Object.keys(data).length > 0) {
            const statusMasterData = {};
            for (const key in data) {
              if (data[key] !== undefined) {
                statusMasterData[data[key].def_list_code] = data[key].def_list_name;
              }
            }
            setMapping(statusMasterData);
          }
        });
    }, [dispatch]);

    return mapping[id];
  }
  const depositModeName = useMapping2(dispatch, get_Deposit_Mode_Name, state?.deposit_mode);




  // useEffect(() => {
  //   dispatch(
  //     getdayclosureDetails({
  //       path: "get-dayclosure-Details",
  //       data: { closureid: '12' }
  //     })
  //   );
  // }, [dispatch]);

  const antIcon = (<LoadingOutlined style={{ fontSize: 34, }} spin />);

  const [showLoader, setShowLoader] = useState(true);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowLoader(false);
    }, 4000); // Show the loader for 5 seconds
    return () => clearTimeout(timeoutId);
  }, []); 
        
  
  
  return (

    <>
      <div className="content-container">
        {showLoader && (
          <div className="loader-container">
            <Spin indicator={antIcon} />
          </div>
        )}
        <div className={`actual-content ${showLoader ? 'blurred' : ''}`}>
          <Card >

            <Row style={{ justifyContent: "center" }}>
              <Col span={24}>
                <Form
                  name="basic"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  <div className="justify-content-center align-items-center">
                    <Row>
                      <Col md={{ span: 6 }} xs={{ span: 24 }} style={{ textAlign: 'center' }}>
                        <Form.Item name="outlet_name" label="Outlet Name" labelCol={{ md: { span: 10 }, xs: { span: 24 }, style: { textAlign: 'center' } }}>
                          <Controller
                            control={control}
                            name="orl_name"
                            render={() => (<Input value={OutletName} readOnly className="blackinputbox" />)}
                          />
                        </Form.Item>
                      </Col>
                      <Col md={{ span: 6 }} xs={{ span: 24 }} style={{ textAlign: 'center' }}>
                        <Form.Item name="orl_name" label="ORL Name" labelCol={{ md: { span: 10 }, xs: { span: 24 }, style: { textAlign: 'center' } }}>
                          <Controller
                            control={control}
                            name="orl_name"
                            render={() => (<Input value={orlName} readOnly className="blackinputbox" />)}
                          />
                        </Form.Item>
                      </Col>
                      <Col md={{ span: 6 }} xs={{ span: 24 }} style={{ textAlign: 'center' }}>
                        <Form.Item name="" label="Pre. Acc. Close" labelCol={{ md: { span: 10 }, xs: { span: 24 }, style: { textAlign: 'center' } }}>
                          <Input defaultValue={state?.pre_sales_closure} className="blackinputbox" />
                        </Form.Item>
                      </Col>
                      <Col md={{ span: 6 }} xs={{ span: 24 }} style={{ textAlign: 'center' }}>
                        <Form.Item name="" label="Closure By" labelCol={{ md: { span: 10 }, xs: { span: 24 }, style: { textAlign: 'center' } }}>
                          <Controller
                            control={control}
                            name="orl_name"
                            render={() => (<Input value={closureEmpName} readOnly className="blackinputbox" />)}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </div>

                  <div className="  ">
                    <Row>
                      <Col md={{ span: 6 }} xs={{ span: 24 }}  >
                        <Form.Item name="" label="Opening Balance" labelCol={{ md: { span: 10 }, xs: { span: 24 }, style: { textAlign: 'center' } }}>
                          <Input
                            defaultValue={state?.open_balance}
                            readOnly
                            className="blackinputbox"
                          />
                        </Form.Item>
                      </Col>
                      <Col md={{ span: 6 }} xs={{ span: 24 }}  >
                        <Form.Item name="" label="Cash Sales" labelCol={{ md: { span: 10 }, xs: { span: 24 }, style: { textAlign: 'center' } }}>
                          <Input
                            defaultValue={state?.sales_amount}
                            readOnly
                            className="blackinputbox"
                          />
                        </Form.Item>
                      </Col>

                      <Col md={{ span: 6 }} xs={{ span: 24 }} >
                        <Form.Item name="" label=" TOTAL CASH" labelCol={{ md: { span: 10 }, xs: { span: 24 }, style: { textAlign: 'center' } }}>
                          <Input
                            defaultValue={state?.closure_amount}
                            readOnly
                            className="blackinputbox"
                          />
                        </Form.Item>
                      </Col>
                      <Col md={{ span: 6 }} xs={{ span: 24 }} style={{ textAlign: 'center' }}>
                        <Form.Item name="" label="Deposit By" labelCol={{ md: { span: 10 }, xs: { span: 24 }, style: { textAlign: 'center' } }} >
                          <Controller
                            control={control}
                            name="orl_name"
                            render={() => (<Input value={depositEmpName} readOnly className="blackinputbox" />)}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </div>

                  <div>
                    <Row justify="center">

                      <Col md={12} xs={24}>
                        <>
                          <table
                            name="denominationResult"
                            style={{ width: '100%', textAlign: 'center', margin: '0 auto' }}
                          >
                            <thead>
                              <tr>
                                <td style={{ width: '33%', border: '2px black solid', backgroundColor: '#f5a60b', color: 'white' }}>Denomination</td>
                                <td style={{ width: '33%', border: '2px black solid', backgroundColor: '#f5a60b', color: 'white' }}>Count</td>
                                <td style={{ width: '33%', border: '2px black solid', backgroundColor: '#f5a60b', color: 'white' }}>Amount</td>
                              </tr>
                            </thead>
                            <tbody>
                              {Array.isArray(parsedDenominations) ? (
                                parsedDenominations.map((item, index) => (
                                  <tr key={index + 1}>
                                    <td style={{ width: '33%', border: '2px black solid' }}>{item.def_list_name}</td>
                                    <td style={{ width: '33%', border: '2px black solid' }}>{item.inputvalue || 0}</td>
                                    <td style={{ width: '33%', border: '2px black solid' }}>{item.value || 0}</td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan="3">No data available</td>
                                </tr>
                              )}
                            </tbody>
                            <tfoot>
                              <tr >
                                <td colSpan="2" style={{ backgroundColor: 'black', color: 'orange', fontWeight: 'bolder' }}>Total</td>
                                <td style={{ backgroundColor: 'black', color: 'orange', fontWeight: 'bolder' }}>{state?.denomination_amount}</td>
                                <td ><input type="hidden" defaultValue={state?.denomination_amount} /></td>
                              </tr>
                            </tfoot>
                          </table>
                        </>
 
                      </Col>  
                      <Col md={11} xs={24}>

                        <>
                          <Row style={{ justifyContent: 'center', marginBottom: '-15px' }}>
                            <Col md={24} xs={24}>
                              <Form.Item
                                name="deposit_Amount"
                                label="Deposit Amount"
                                labelCol={{ md: { span: 12 }, xs: { span: 12 }, style: { textAlign: 'center' } }}
                              >
                                <Input
                                  name="deposit_Amount"
                                  disabled
                                  defaultValue={state?.deposit_amount}
                                  style={{
                                    backgroundColor: "black",
                                    color: "#f5a60b",
                                    fontWeight: "bold",
                                    border: "none",
                                    boxShadow: "none",
                                    textAlign: "center",
                                  }}
                                />
                              </Form.Item>
                            </Col>

                          </Row>
                          <Row style={{ justifyContent: 'center', marginBottom: '-15px' }}>
                            <Col md={24} xs={24}>
                              <Form.Item name="cashBalance" label="Cash Balance"
                                labelCol={{ md: { span: 12 }, xs: { span: 12 }, style: { textAlign: 'center' } }}>
                                <Input
                                  name="cashBalance"
                                  disabled // Disable editing of cash balance field
                                  defaultValue={state?.balance_amount}
                                  style={{
                                    backgroundColor: "black",
                                    color: "#f5a60b",
                                    fontWeight: "bold",
                                    border: "none",
                                    boxShadow: "none",
                                    textAlign: "center",
                                  }}
                                />
                              </Form.Item>
                            </Col>
                          </Row>
                          <Row style={{ justifyContent: 'center', marginBottom: '-15px' }}>
                            <Col md={24} xs={24}>
                              <Form.Item name='refnum' label="Reference Num"
                                labelCol={{ md: { span: 12 }, xs: { span: 12 }, style: { textAlign: 'center' } }}>
                                <Input
                                  name='refnum'
                                  defaultValue={state?.referencenum}
                                  disabled
                                  style={{
                                    backgroundColor: "black",
                                    color: "#f5a60b",
                                    fontWeight: "bold",
                                    border: "none",
                                    boxShadow: "none",
                                    textAlign: "center",
                                  }}
                                />
                              </Form.Item>
                            </Col>
                          </Row>
                          <Row style={{ justifyContent: 'center', marginBottom: '-15px' }}>
                            <Col md={24} xs={24}>
                              <Form.Item name="proofattach" label="Attachment"
                                labelCol={{ md: { span: 12 }, xs: { span: 12 }, style: { textAlign: 'center' } }}>
                                <img
                                  src={image}
                                  alt="Selected Image"
                                  style={{ maxWidth: '100%' }}
                                />
                              </Form.Item>
                            </Col>
                          </Row>
                          <Row style={{ marginBottom: '-15px', }}>
                            <Col md={24} xs={24}>
                              <Form.Item
                                name='deposit_mode'
                                label='Deposit Mode'
                                labelCol={{ md: { span: 12 }, xs: { span: 12 }, style: { textAlign: 'center' } }}
                              >
                                <Controller
                                  control={control}
                                  name="deposit_mode"
                                  render={() => (<Input value={depositModeName} readOnly className="blackinputbox" />)}
                                />
                              </Form.Item>
                            </Col>
                          </Row>
                        </>
                        <>
                          <Row style={{ justifyContent: 'center', marginBottom: '-15px' }}>
                            <Col md={24} xs={24}>
                              <Form.Item
                                name="depositreason"
                                label="Reason"
                                labelCol={{ md: { span: 12 }, xs: { span: 12 }, style: { textAlign: 'center' } }}
                              >
                                <Input
                                  name="depositreason"
                                  defaultValue={state?.reason}
                                  className="blackinputbox"
                                />
                              </Form.Item>
                            </Col>

                          </Row>
                        </>
                      </Col>
                    </Row>
                  </div>



                </Form >
              </Col >
            </Row >
          </Card >

        </div>
      </div>

    </>
  );
}

export default CashHandlingView;