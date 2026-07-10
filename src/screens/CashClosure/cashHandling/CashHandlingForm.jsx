/* eslint-disable no-unused-labels */
import React, { useEffect, useState, } from "react";
import { Input, Card, Button, Col, Row, Form, Select, Radio } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { getDenominationName, get_Deposit_Mode_Name } from "../../../@app/master/masterSlice";
// import { postDayClosureDetails } from "../../../@app/master/masterSlice";


function CashHandlingForm() {

  const dispatch = useDispatch();
  const { Option } = Select;


  const [dropdownOptions, setDropdownOptions] = useState([]);


  useEffect(() => {
    dispatch(get_Deposit_Mode_Name())
      .then((result) => {
     
        setDropdownOptions(result.data);
      });
  }, [dispatch]);

  const {
    gettingClosureStatusName,
  } = useSelector((state) => {
    return state.subMaster;
  });



  const [deposit, setDeposit] = useState(true);
  const [reason, setReason] = useState(true);

  const handleOnAdd = (e) => {
    if (e.target.name === 'ORL_Add') {
      if (e.target.value === 0) {
       
        setDeposit(true);
        setReason(false);

      } else {
       
        setDeposit(false);
        setReason(true);
      }
    }
  }

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

              <div className="d-flex justify-content-center align-items-center "
                style={{ width: "96%", }} >
                <>
                  <Row gutter={[20, 0]}>
                    <Col md={{ span: 6 }} xs={{ span: 24 }}  >
                      <Form.Item name="orl_name" label="Opening Balance" labelCol={{ md: { span: 11 }, xs: { span: 24 }, style: { textAlign: 'center' } }}>
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
                    <Col md={{ span: 6 }} xs={{ span: 24 }}  >
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

                    <Col md={{ span: 6 }} xs={{ span: 24 }} >
                      <Form.Item name="orl_name" label=" TOTAL CASH" labelCol={{ md: { span: 10 }, xs: { span: 24 }, style: { textAlign: 'center' } }}>
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
                    <Col md={{ span: 6 }} xs={{ span: 24 }} >
                      <Form.Item name="orl_name" label=" Excess Amt" labelCol={{ md: { span: 10 }, xs: { span: 24 }, style: { textAlign: 'center' } }}>
                        <Controller
                          control={control}
                          name="orl_name"
                          render={() => (
                            <Input
                              value={'200'}
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
                  <Col md={{ span: 9, }} xs={{ span: 24 }} >
                    <Row style={{ justifyContent: 'center', paddingLeft: '80px', marginBottom: '-15px' }}>
                      <Form.Item
                        name='ORL_Add'
                        placeholder='Select'
                        label='Deposit'
                        rules={[
                          {
                            required: true,
                            message: 'Please Select ORL Name'
                          }
                        ]}
                      >

                        <Radio.Group buttonStyle='solid' size='middle' name='ORL_Add' onChange={handleOnAdd}>
                          <Radio.Button className='active' value={13}>
                            Yes
                          </Radio.Button>
                          <Radio.Button className='in-active' value={0}>
                            No
                          </Radio.Button>
                        </Radio.Group>
                      </Form.Item>
                    </Row>

                    {!deposit && ( // Render the row only if loading is false
                      <>
                        <Row style={{ justifyContent: 'center', marginBottom: '-15px' }}>
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
                          {showAlert && (
                            <div style={{ color: 'red', fontWeight: 'bold', textAlign: 'center' }}>
                              <span>{'Your Deposit Amount Is Greater Than Closing Balance.'}</span>
                            </div>
                          )}
                        </Row>


                        <Row style={{ justifyContent: 'center', marginBottom: '-15px' }}>
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
                        <Row style={{ justifyContent: 'center', marginBottom: '-15px' }}>
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
                        <Row style={{ justifyContent: 'center', marginBottom: '-15px' }}>
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
                        <Row style={{ justifyContent: 'center', marginBottom: '-15px' }}>
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
                        <Row style={{ justifyContent: 'center', marginBottom: '-15px' }}>
                          <Form.Item
                            name='city_name'
                            label='Deposit Mode'
                            rules={[{ required: true, message: 'Please select city name' }]}
                            labelCol={{ md: { span: 10 }, xs: { span: 24 }, style: { textAlign: 'center' } }}
                          >
                            <Select
                              placeholder='Select'
                              loading={gettingClosureStatusName}
                              disabled={false} // You can set this to your desired condition
                              showSearch
                              filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                              }
                            >

                              {dropdownOptions.map((item, index) => {
                                return (
                                  <Option key={index} value={item.name}>
                                    {item.name}
                                  </Option>
                                );
                              },
                              )}

                            </Select>
                          </Form.Item>
                        </Row>
                      </>
                    )}

                    {!reason &&  ( // Render the row only if loading is false
                      <>
                        <Row style={{ justifyContent: 'center', marginBottom: '-15px' }}>
                          <Form.Item
                            name="depositAmount"
                            label="Reason"
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
                                  style={{
                                    textAlign: 'center',
                                  }}
                                />
                              )}
                            />
                          </Form.Item>
                          {showAlert && (
                            <div style={{ color: 'red', fontWeight: 'bold', textAlign: 'center' }}>
                              <span>{'Your Deposit Amount Is Greater Than Closing Balance.'}</span>
                            </div>
                          )}
                        </Row>
                      </>

                    )}
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
        </Row >
      </Card >

    </>
  );
}

export default CashHandlingForm;