/* eslint-disable no-unused-labels */
import React, { useEffect, useState, } from "react";
import { Input, Card, Button, Col, Row, Form } from "antd";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { getDenominationName } from "../../../@app/master/masterSlice";
// import { postDayClosureDetails } from "../../../@app/master/masterSlice";


function CashHandlingForm() {

  const dispatch = useDispatch();
  const { control, } = useForm();

  const { refnum } = '';
  const { remarks } = '';
  const [formData, setFormData] = useState({
    depositAmount: '',
    cashBalance: '',
  });


  const [showAlert, setShowAlert] = useState(false);

  const checkDepositAmt = (e) => {
    const { name, value } = e.target;

    // Calculate cash balance based on deposit amount
    if (name === 'depositAmount') {
      const depositAmount = parseFloat(value) || 0;
      if (depositAmount > 2000) {
        setShowAlert(true);
      } else {
        setShowAlert(false);
      }
      const cashBalance = 2000 - depositAmount; // You can modify the calculation logic here

      setFormData({
        ...formData,
        [name]: value,
        cashBalance: cashBalance.toFixed(2), // Assuming you want to format it as a number with two decimal places
      });
    }
  };



  const [data, setdata] = useState([]);

  useEffect(() => {
    
    dispatch(getDenominationName())
      .then((result) => {
       
        setdata(result.data);
      })

  }, [dispatch]);

  // Function to handle input changes
  function handleInputChange(event, index, item) {
    const inputValue = event.target.value;
    const updatedData = [...data];
    updatedData[index].value = parseInt(inputValue, 10) * parseFloat(item.name); // Use parseInt to convert to a number
    setdata(updatedData);
  }

  // Calculate the total value
  const totalValue = data.reduce((acc, item) => acc + (item.value || 0), 0);

  return (
    <>

      <Card>


        <Row style={{ justifyContent: "center" }}>


          <Col span={24}>
            <Form
              name="basic"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              initialValues={{ remember: true }}
              autoComplete="off"
            >

              <div
                className="d-flex justify-content-center align-items-center "
                style={{ width: "96%", padding: '15px' }}
              >

                <Row gutter={[20, 0]}>

                  <Col md={{ span: 6 }} xs={{ span: 24 }} style={{ textAlign: 'center' }}>
                    <Form.Item name="orl_name" label="Outlet Name" labelCol={{ md: { span: 10 }, xs: { span: 24 }, style: { textAlign: 'center' } }}  >
                      <Controller
                        control={control}
                        name="orl_name"
                        render={() => (
                          <Input
                            value={"Dindigul"}
                            style={{
                              backgroundColor: "black",
                              color: "#f5a60b",
                              fontWeight: "bold",
                              border: "none",
                              boxShadow: "none",
                              textAlign: "center",
                            }}
                          />
                        )}
                      />
                    </Form.Item>
                  </Col>



                  <Col md={{ span: 6 }} xs={{ span: 24 }} style={{ textAlign: 'center' }}>
                    <Form.Item name="orl_name" label="ORL Name" labelCol={{ md: { span: 10 }, xs: { span: 24 }, style: { textAlign: 'center' } }}  >
                      <Controller
                        control={control}
                        name="orl_name"
                        style={{ color: 'red' }}
                        render={() => (
                          <Input
                            value={"Pandian"}
                            style={{
                              backgroundColor: "black",
                              color: "#f5a60b",
                              fontWeight: "bold",
                              border: "none",
                              boxShadow: "none",
                              textAlign: "center",
                            }}
                          />
                        )}
                      />
                    </Form.Item>
                  </Col>

                  <Col md={{ span: 6 }} xs={{ span: 24 }} style={{ textAlign: 'center' }}>
                    <Form.Item name="orl_name" label="Pre. Acc. Close" labelCol={{ md: { span: 10 }, xs: { span: 24 }, style: { textAlign: 'center' } }} >
                      <Controller
                        control={control}
                        name="orl_name"
                        render={() => (
                          <Input
                            value={"13-09-2023"}
                            style={{
                              backgroundColor: "black",
                              color: "#f5a60b",
                              fontWeight: "bold",
                              border: "none",
                              boxShadow: "none",
                              textAlign: "center",
                            }}
                          />
                        )}
                      />
                    </Form.Item>
                  </Col>
                  <Col md={{ span: 6 }} xs={{ span: 24 }} style={{ textAlign: 'center' }}>
                    <Form.Item name="orl_name" label="Closure By" labelCol={{ md: { span: 10 }, xs: { span: 24 }, style: { textAlign: 'center' } }} >
                      <Controller
                        control={control}
                        name="orl_name"
                        render={() => (
                          <Input
                            value={"Yogeswaran"}
                            style={{
                              backgroundColor: "black",
                              color: "#f5a60b",
                              fontWeight: "bold",
                              border: "none",
                              boxShadow: "none",
                              textAlign: "center",
                            }}
                          />
                        )}
                      />
                    </Form.Item>
                  </Col>

                </Row>
              </div>

              <div className=" " style={{ justifyContent: 'center', textAlign: 'center' }}  >
                <>
                  <Row >
                    <Col md={{ span: 8 }} xs={{ span: 24 }}  >
                      <Form.Item name="orl_name" label="Opening Balance" labelCol={{ md: { span: 10 }, xs: { span: 24 }, style: { textAlign: 'center' } }}>
                        <Controller style={{ textAlign: 'center', }}
                          control={control}
                          name="orl_name"
                          render={() => (
                            <Input
                              value={'350'}
                              readOnly
                              style={{
                                backgroundColor: "black",
                                color: "#f5a60b",
                                fontWeight: "bold",
                                border: "none",
                                boxShadow: "none",
                                textAlign: "center",
                              }}
                            />
                          )}
                        />
                      </Form.Item>
                    </Col>
                    <Col md={{ span: 8 }} xs={{ span: 24 }}  >
                      <Form.Item name="orl_name" label="Cash Sales" labelCol={{ md: { span: 10 }, xs: { span: 24 }, style: { textAlign: 'center' } }}>
                        <Controller style={{ textAlign: 'center', }}
                          control={control}
                          name="orl_name"
                          render={() => (
                            <Input
                              value={'4750'}
                              readOnly
                              style={{
                                backgroundColor: "black",
                                color: "#f5a60b",
                                fontWeight: "bold",
                                border: "none",
                                boxShadow: "none",
                                textAlign: "center",
                              }}
                            />
                          )}
                        />
                      </Form.Item>
                    </Col>

                    <Col md={{ span: 8 }} xs={{ span: 24 }} >
                      <Form.Item name="orl_name" label="OUTLET TOTAL CASH" labelCol={{ md: { span: 10 }, xs: { span: 24 }, style: { textAlign: 'center' } }}>
                        <Controller
                          control={control}
                          name="orl_name"
                          render={() => (
                            <Input
                              value={'5100'}
                              readOnly
                              style={{
                                backgroundColor: "black",
                                color: "#f5a60b",
                                fontWeight: "bold",
                                border: "none",
                                boxShadow: "none",
                                textAlign: "center",
                              }}
                            />
                          )}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </>
              </div>



              <div>
                <Row style={{ justifyContent: 'center' }}>

                  <Col md={{ span: 12, }} xs={{ span: 24 }}>
                    <table style={{ width: '100%', textAlign: 'center' }}>
                      <thead>
                        <td style={{ border: '2px black solid', backgroundColor: '#f5a60b', color: 'white' }}>S.No</td>
                        <td style={{ border: '2px black solid', backgroundColor: '#f5a60b', color: 'white' }}>Denomination</td>
                        <td style={{ border: '2px black solid', backgroundColor: '#f5a60b', color: 'white' }}>Cnt</td>
                        <td style={{ border: '2px black solid', backgroundColor: '#f5a60b', color: 'white' }}>Amount</td>
                      </thead>
                      <tbody >
                        {data.map((item, index) => (
                          <tr key={index + 1}>
                            <td style={{ border: '2px black solid' }}>{index + 1}</td>
                            <td style={{ border: '2px black solid' }}>{item.name}</td>
                            <td style={{ border: '2px black solid' }}>
                              <input
                                type="text"
                                style={{ width: '175px', textAlign: 'center' }}
                                onChange={(e) => handleInputChange(e, index, item)}
                              />
                            </td>
                            <td style={{ border: '2px black solid' }}>{item.value || 0}</td>
                          </tr>
                        ))}

                      </tbody>
                      <tfoot>
                        <tr>
                          <td colSpan="3" style={{ border: '2px black solid' }}>Total</td>
                          <td style={{ border: '2px black solid' }}>{totalValue}</td>
                        </tr>
                      </tfoot>
                    </table>
                    <div style={{ paddingTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <Col md={{ span: 24 }} xs={{ span: 24 }} >
                        <Form.Item labelCol={{ md: { span: 24 }, xs: { span: 24 } }} >
                          <div >
                            <Button
                              style={{ backgroundColor: "#f5a60b", color: 'white', fontWeight: 'bold' }}
                            >
                              {"Submit"}
                            </Button>
                          </div>
                        </Form.Item>
                      </Col>
                    </div>

                  </Col>
                  <Col md={{ span: 9, }} xs={{ span: 24 }} style={{ paddingTop: '25px' }}>
                    <Row style={{ justifyContent: 'center' }}>
                      <Form.Item
                        name="depositAmount"
                        label="Deposit Amount"
                        labelCol={{ md: { span: 10 }, xs: { span: 24 }, style: { textAlign: 'center' } }}
                      >
                        <Controller
                          style={{ textAlign: 'center' }}
                          control={control}
                          name="depositAmount"
                          render={() => (
                            <Input
                              name="depositAmount"
                              value={formData.depositAmount}
                              onChange={checkDepositAmt}
                              style={{
                                textAlign: 'center',
                              }}
                            />
                          )}
                        />
                      </Form.Item>
                      {showAlert && <div style={{ color: 'red', fontWeight: 'bold', textAlign: 'center' }}><span>{'Your Deposit Amount Is Greater Than Closing Balance.'}</span></div>}
                    </Row>

                    <Row style={{ justifyContent: 'center' }}>
                      <Form.Item name="orl_name" label="Cash Balance" labelCol={{ md: { span: 10 }, xs: { span: 24 }, style: { textAlign: 'center' } }}>
                        <Controller
                          style={{ textAlign: 'center' }}
                          control={control}
                          name="cashBalance"
                          render={() => (
                            <Input
                              name="cashBalance"
                              value={formData.cashBalance}
                              disabled // Disable editing of cash balance field
                              style={{
                                textAlign: 'center',
                              }}
                            />
                          )}
                        />
                      </Form.Item>
                    </Row>
                    <Row style={{ justifyContent: 'center' }}>
                      <Form.Item name="orl_name" label="Reference Num" labelCol={{ md: { span: 10 }, xs: { span: 24 }, style: { textAlign: 'center' } }}>
                        <Controller
                          style={{ textAlign: 'center' }}
                          control={control}
                          name="cashBalance"
                          render={() => (
                            <Input
                              name="cashBalance"
                              value={refnum}
                              style={{
                                textAlign: 'center',
                              }}
                            />
                          )}
                        />
                      </Form.Item>
                    </Row>
                    <Row style={{ justifyContent: 'center' }}>
                      <Form.Item name="orl_name" label="Attachment" labelCol={{ md: { span: 10 }, xs: { span: 24 }, style: { textAlign: 'center' } }}>
                        <Controller
                          style={{ textAlign: 'center' }}
                          control={control}
                          name="cashBalance"
                          render={() => (
                            <Input
                              name="cashBalance"
                              value={refnum}
                              type="file"
                              style={{
                                textAlign: 'center',
                              }}
                            />
                          )}
                        />
                      </Form.Item>
                    </Row>
                    <Row style={{ justifyContent: 'center' }}>
                      <Form.Item name="orl_name" label="Remarks" labelCol={{ md: { span: 10 }, xs: { span: 24 }, style: { textAlign: 'center' } }}>
                        <Controller
                          style={{ textAlign: 'center' }}
                          control={control}
                          name="cashBalance"
                          render={() => (
                            <Input
                              name="cashBalance"
                              value={remarks}
                              style={{
                                textAlign: 'center',
                              }}
                            />
                          )}
                        />
                      </Form.Item>
                    </Row>
                    <div style={{ paddingTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <Col md={{ span: 24 }} xs={{ span: 24 }} >
                        <Form.Item labelCol={{ md: { span: 24 }, xs: { span: 24 } }} >
                          <div >
                            <Button
                              style={{ backgroundColor: "#f5a60b", color: 'white', fontWeight: 'bold' }}
                            >
                              {"Submit"}
                            </Button>
                          </div>
                        </Form.Item>
                      </Col>
                    </div>
                  </Col>
                </Row>
              </div>

            </Form>
          </Col>
        </Row>
      </Card >

    </>
  );
}

export default CashHandlingForm;