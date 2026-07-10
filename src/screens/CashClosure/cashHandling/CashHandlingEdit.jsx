/* eslint-disable no-unused-labels */
import React, { useEffect, useState } from "react";
import { Spin, Input, Card, Button, Col, Row, Form, Select, Radio, Upload, Modal, Image, message, } from "antd";
// import messageToast from '../../../components/messageToast/messageToast';
import { useDispatch,  } from "react-redux";
// import { getdayclosureDetails } from '../../../@app/entry/entrySlice';
import { last, } from 'ramda';
import { useLocation, useNavigate } from 'react-router';
import { useForm, Controller } from "react-hook-form";
import { baseURL } from '../../../api/baseURL';
import { PlusOutlined } from '@ant-design/icons';
import { getDenominationName, update_dayclosure_details, get_rista_Sales_Details, get_Crew_Details } from "../../../@app/master/masterSlice";
import './style.css'; // Import the CSS file
import { LoadingOutlined } from '@ant-design/icons';

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const { Option } = Select;

function CashHandlingForm({ setTopTitle }) {

  const dispatch = useDispatch();
  // const userData = useSelector((state) => state.auth);

  const [form] = Form.useForm();
  const { control, } = useForm();
  const location = useLocation();
  const { state } = location;
  let defaultValue = state?.data;
  const navigate = useNavigate();

  //for geting value from previous page
  const dataValue = state ? state : {}; // Default to an empty object if state is undefined
  const ClosureStatus = dataValue.status;
  const Closureid = dataValue.closure_id;
  const DepositReason = dataValue.skipreason;
  const DepositMode = dataValue.deposit_mode;
  const Holiday = dataValue.reason;
  const parsedDenominations = JSON.parse(state?.denominations);
  const outletid = dataValue?.outletidorl;
  const outlet_code = dataValue?.outlet_code;
  const outlet_Name = dataValue?.outlet_Name;

  if (ClosureStatus === 1 || ClosureStatus === 2 || ClosureStatus === 3) {
    setTopTitle('Cash Denomination Information');
  } else {
    setTopTitle('Cash Deposit Information');
  }

  const [denomination, setDenomination] = useState(!(ClosureStatus === 1 || ClosureStatus === 2 || ClosureStatus === 3));
  const [denominationreason, setDenominationreason] = useState(!(ClosureStatus === 1 || ClosureStatus === 2 || ClosureStatus === 3));

  const leaveHandle = () => {
    setDenomination(false);
    setDenominationreason(true);
  };

  const inactiveClass = DepositReason !== null ? 'in-active' : 'active';

  const [deposit, setDeposit] = useState(DepositReason === null ? false : true);
  const [reason, setReason] = useState(DepositReason === null ? true : false);


  useEffect(() => {
    setClosureBy(dataValue.closureby);
    setDepositBy(dataValue.depositby);
    if (DepositReason === null) {
      setDeposit(true);
      setReason(false);
    } else {
      setDeposit(false);
      setReason(true);
    }
  }, [DepositReason]);

  const depositHandle = (e) => {
    if (e.target.name === 'Deposit') {
      if (e.target.value === 0) {
        setDeposit(false);
        setReason(true);
      } else {
        setDeposit(true);
        setReason(false);
        setdepositSkipReason(null);
      }
    }
  };

  const [showLoader, setShowLoader] = useState(true);
  useEffect(() => {
    const delay = [1, 2, 3, 4, 10].includes(ClosureStatus) ? 2000 : 7000;
    const timeoutId = setTimeout(() => {
      setShowLoader(false);
    }, delay);
    return () => clearTimeout(timeoutId);
  }, [ClosureStatus]);

  const [revRemarks, setrevRemarks] = useState('');
  const getRemarks = (i) => { setrevRemarks(i.target.value) };
  const [aov, setaov] = useState('');
  const getAov = (i) => { setaov(i.target.value) }
  const [abc, setabc] = useState('');
  const getAbc = (i) => { setabc(i.target.value) }
  const [remarks, setremarks] = useState('');
  const getGenRemarks = (i) => { setremarks(i.target.value) }
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [skipdropdown, setskipdropdown] = useState([]);
  const [denominationvalue, setdenominationvalue] = useState([]);

  useEffect(() => {
    dispatch(getDenominationName())
      .then((result) => {
        if (result && Array.isArray(result.data)) {
          const defTitle1Objects = result.data.filter((item) => item.def_title_id === 1);
          const defTitle3Objects = result.data.filter((item) => item.def_title_id === 3);
          const defTitle4Objects = result.data.filter((item) => item.def_title_id === 4);
          setdenominationvalue(defTitle1Objects); // Set for def_title_id 1
          setskipdropdown(defTitle4Objects);
          setDropdownOptions(defTitle3Objects);
        }
      });
  }, [dispatch]);

  const [depositSkipReason, setdepositSkipReason] = useState('');
  const antIcon = (<LoadingOutlined style={{ fontSize: 34, }} spin />);

  let userid;

  const [crewName, setcrewName] = useState([]);
  const fetchCrewDetails = async () => {
    try {
      const result = await dispatch(get_Crew_Details({ data: { outletid: outletid } }));
      if (result && result.data && Array.isArray(result.data)) {
        setcrewName(result.data);
      } else {
        message.error({content:'Data received from the API is not in the expected format'});
      }
    } catch (error) {
      message.error({content:'Error in the API call: '});
    }
  };

  const [closureBy, setClosureBy] = useState(dataValue.closureby || '');
  const [depositBy, setDepositBy] = useState(dataValue.depositBy || '');
  const [image ] = useState('');
  const [imageUpdated] = useState(false);
  const handleCancel = () => setPreviewOpen(false);

  const props = {
    name: 'image',
    action: `${baseURL}mismatchproof-upload`,
    headers: {
      authorization: 'authorization-text'
    }
  };

  const uploadButton = (
    <Button style={{ display: 'flex', direction: 'row' }} icon={<PlusOutlined style={{ marginTop: '3px', marginRight: '4px' }} />}>
      <div
        style={{
          marginLeft: '3px'
        }}>
        {defaultValue?.id ? 'Update Image' : 'Upload'}
      </div>
    </Button>
  );

  form.setFieldsValue({ depositproof: state?.closureid });

  form.setFieldsValue({ attchment: state?.closureid });

  // Function to handle input changes
  function handleInputChange(numericValue, index, item) {
    const updatedDenominationData = [...denominationvalue];
    updatedDenominationData[index].value = parseInt(numericValue, 10) * parseFloat(item.def_list_name); // Use parseInt to convert to a number
    updatedDenominationData[index].inputvalue = numericValue;
    setdenominationvalue(updatedDenominationData);
  }

  const totalValue = denominationvalue.reduce((acc, item) => acc + (item.value || 0), 0)
  const [cashSales, setCashSales] = useState(state?.sales_amount);
  const [totalOutletCash, setTotalOutletCash] = useState(0.00);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (outletid) {
      fetchCrewDetails(outletid);
    }
    if (state?.sales_amount && state?.open_balance) {
      const totalCash = parseInt(state.sales_amount, 10) + parseInt(state.open_balance, 10);
      setTotalOutletCash(totalCash.toFixed(2));
    }    
  }, [dispatch, outletid, state]);

  const handleGetSalesData = () => {
    setShowLoader(true);
    setDenomination(true);
    setDenominationreason(false);
    const outlet_code = state?.outlet_code;
    const closure_date = state?.sales_closure_date;

    dispatch(get_rista_Sales_Details({ data: { outlet_code, closure_date } }))
      .then((result) => {
        if (result && result.data) {
          setCashSales(result.data.cashsales);
          const saleAmt = result.data.cashsales;
          setTotalOutletCash(parseInt(saleAmt) + parseInt(state?.open_balance));
        }
        setShowLoader(false);
      })
      .catch((error) => {
        setError('Error in API call: ' + error.message);
        setShowLoader(false);
      });
  };

  const handleSaveDenominationData = () => {
    if (closureBy === '' || closureBy === undefined) {
      message.error({ content: 'Please Select Closure By' });
    } else {
      const outlet_code = state?.outlet_code;
      const denomination_value = denominationvalue;
      const total_denomination_value = totalValue;
      const open_balance = state?.open_balance;
      const closure_amount = totalOutletCash;
      const closure_by = closureBy;
      const login_by = userid;
      const closure_id = Closureid;
      const cashSaleAmt = cashSales;
      const aovValue = aov; 
      const abcValue = abc; 
      const remarksValue = remarks; 
      const waiting_at = denomination ? '4' : '2';
  
      const dayClosureDetails = {
        outlet_code,
        closure_id,
        login_by,
        open_balance,
        closure_amount,
        denomination_value,
        total_denomination_value,
        closure_by,
        waiting_at,
        cashSaleAmt,
        aov: aovValue,  
        abc: abcValue,  
        remarks: remarksValue       };
  
      dispatch(
        update_dayclosure_details({
          data: dayClosureDetails
        })
      ).then((response) => {
        if (response.status === 200) {
          navigate('/cashHandling');
          message.success({ content: 'Closure Details Added Successfully' });
        } else {
          message.error({ content: 'Closure Details Request failed' });
        }
      });
    }
  };

  const handleSaveDepositData = async () => {

    if (depositBy === '' || depositBy === undefined || depositBy === null ) {
      message.error({ content: 'Please Select Deposit By', })
    } else {
      setShowLoader(true);
      const fileName = imageUpdated ? image ?? 'No image' : last(state?.image ? state?.image.split('/').pop() : 'No image');
      const closure_amount = totalOutletCash;
      const outlet_code = state?.outlet_code;
      const skipreason = depositSkipReason; 
      const depositDate = state?.sales_closure_date;
      const salesClosure_id = Closureid; 
      const deposit_by = depositBy;
      const cash_balance = cashBalanceAmt;
      const total_deposit = totDepositAmt;
      const Remarks = revRemarks;
      const DepositDetails = formRows;
      const closure_date = state?.sales_closure_date;
      const login_by = userid;
      const waiting_at = deposit ? '7' : '5'; 

      dispatch(update_dayclosure_details({
        data: {
          filename: fileName, salesClosure_id,closure_date,Remarks, login_by, outlet_code, depositDate, 
            waiting_at, skipreason, closure_amount, DepositDetails, cash_balance, total_deposit, deposit_by,
        },
      })).then((response) => {
        if (response.status === 200) {
          navigate('/cashHandling');
          message.success({ content: 'Deposit Details Added Successfully' });
        } else {
          message.error({ content: 'Deposit Details Request failed' });
        }
      });
      setShowLoader(false);
    }
  };

  useEffect(() => {
    const depositDetails = JSON.parse(state?.deposit_details || '[]');
    const formRowsInitial = depositDetails.length === 0
      ? [{
          id: 1,
          deposit_amount: state?.deposit_amount || '',
          referenceNum: state?.referencenum || '',
          deposit_mode: DepositMode || '',
        }]
      : depositDetails.map((detail, index) => ({
          id: detail.id || index + 1,
          deposit_amount: detail.deposit_amount || '',
          referenceNum: detail.referenceNum || '',
          deposit_mode: detail.deposit_mode || '1',
          fileList: detail.fileList || [],
          image: detail.image || '',
        }));
    setFormRows(formRowsInitial);
  }, [state?.deposit_details, state?.deposit_amount, state?.referencenum, state?.DepositMode]);

  const handleAddRow = () => {
    setFormRows((prevRows) => [
      ...prevRows,
      { id: prevRows.length + 1, deposit_amount: '', referenceNum: '', deposit_mode: '' },
    ]);
  };

  const [formRows, setFormRows] = useState([]);
  const [totDepositAmt, setTotdepositAmt] = useState(0.00);
  const [cashBalanceAmt, setCashBalanceAmt] = useState(0.00);
  const [previewImage, setPreviewImage] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewTitle, setPreviewTitle] = useState('');

  const handleDeleteRow = (rowId) => {
    setFormRows((prevRows) => prevRows.filter((row) => row.id !== rowId));
  };

  const Changecost = (rowId, fieldName, value) => {
    setFormRows((rows) =>
      rows.map((row) => (row.id === rowId ? { ...row, [fieldName]: value } : row))
    );
  };

  const handleChange = (e, rowId) => {
    const updatedRows = formRows.map(row => 
      row.id === rowId
        ? { ...row, fileList: e.fileList, image: e?.file?.response?.filename ?? '' }
        : row
    );
    setFormRows(updatedRows);
  };
  
  const handlePreview = async (file, rowId) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    const row = formRows.find(row => row.id === rowId);
    setPreviewImage(row.image);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  
  const getFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  
  useEffect(() => {
    const totalDepositCost = formRows.reduce((acc, row) => acc + Number(row.deposit_amount || 0), 0);
    setTotdepositAmt(totalDepositCost.toFixed(2));
    setCashBalanceAmt((totalOutletCash - totalDepositCost).toFixed(2));
  }, [formRows, totalOutletCash]);
  

  const onClickBack = () => {
    navigate('/cashHandling', {
      state: { outlet_code, outlet_Name }
    });
  };

  return (
    <>
      <div className="content-container">
        {showLoader && (
          <div className="loader-container">
            <Spin indicator={antIcon} />
          </div>
        )}
        <div className={`actual-content ${showLoader ? 'blurred' : ''}`}>

          <Card>
            <Row style={{ justifyContent: "center" }}>

              <Col span={24}>
                <Form
                  name="basic"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  autoComplete='off'
                >

                  <div className=" justify-content-center align-items-center "    >
                    <Row >
                      <Col md={{ span: 8 }} xs={{ span: 24 }} style={{ textAlign: 'center' }}>
                        <Form.Item name="outlet_name" label="Outlet Name" labelCol={{ md: { span: 10 }, xs: { span: 24 }, style: { textAlign: 'center' } }}  >
                          <Controller
                            control={control}
                            name="outlet_name"
                            render={() => (<Input value={state?.outlet_Name} readOnly className="blackinputbox" />)}
                          />
                        </Form.Item>
                      </Col>
                      <Col md={{ span: 8 }} xs={{ span: 24 }} style={{ textAlign: 'center' }}>
                        <Form.Item name="orl_name" label="ORL Name" labelCol={{ md: { span: 10 }, xs: { span: 24 }, style: { textAlign: 'center' } }}  >
                         <Controller
                            control={control}
                            name="orl_name"
                            render={() => (
                              <Input
                                value={state?.outlet_orl_name}
                                readOnly
                                className="blackinputbox"
                              />
                            )}
                          />
                        </Form.Item>
                      </Col>
                      <Col md={{ span: 8 }} xs={{ span: 24 }} style={{ textAlign: 'center' }}>
                        <Form.Item name="" label="Pre. Acc. Close" labelCol={{ md: { span: 10 }, xs: { span: 24 }, style: { textAlign: 'center' } }} >
                          <Controller
                            control={control}
                            name=""
                            render={() => (<Input value={state?.latestActSalesClosure} readOnly className="blackinputbox" />)}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </div>
                  {denomination === true && (
                    <div className="  ">
                      <Row>
                        <Col md={{ span: 8 }} xs={{ span: 24 }}  >
                          <Form.Item name="" label="Opening Balance" labelCol={{ md: { span: 10 }, xs: { span: 24 }, style: { textAlign: 'center' } }}>
                            <Controller
                              control={control}
                              name=""
                              render={() => (<Input value={state?.open_balance} readOnly className="blackinputbox" />)}
                            />
                          </Form.Item>
                        </Col>
                        <Col md={{ span: 8 }} xs={{ span: 24 }}  >
                          <Form.Item name="" label="Cash Sales" labelCol={{ md: { span: 10 }, xs: { span: 24 }, style: { textAlign: 'center' } }}>
                            <Controller
                              control={control}
                              name=""
                              render={() => (<Input value={cashSales} readOnly className="blackinputbox" />)}
                            />
                            {error && (
                              <div className="error-message">{error}</div>
                            )}
                          </Form.Item>
                        </Col>
                        <Col md={{ span: 8 }} xs={{ span: 24 }} >
                          <Form.Item name="" label=" Total Cash" labelCol={{ md: { span: 10 }, xs: { span: 24 }, style: { textAlign: 'center' } }}>
                            <Controller
                              control={control}
                              name=""
                              render={() => (<Input value={totalOutletCash} readOnly className="blackinputbox" />)}
                            />
                          </Form.Item>
                        </Col>
                        <Col md={{ span: 12 }} xs={{ span: 24 }} style={{ textAlign: 'center', color: 'black' }}>
                        <Form.Item name="Closure_By" label="Closure By" labelCol={{ md: { span: 10 }, xs: { span: 24 }, style: { textAlign: 'center', } }} rules={[{required: true,}]} >
                          <Select
                            placeholder='Select'
                            defaultValue={state?.closureby !== null ? state?.closureby : ''}
                            disabled={ClosureStatus !== 1 && ClosureStatus !== 2 && ClosureStatus !== 3}
                            name='Closure_By'
                            filterOption={(input, option) =>
                              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            value={closureBy}
                            onChange={(value) => setClosureBy(value)}
                            style={{ width: '100%', color: 'black' }} // Set the width of the Select component
                          >
                            {crewName.map((item, index) => {
                              return (
                                <Option
                                  key={index} value={item.id}
                                  style={{ color: 'black' }} >
                                  {item.name}

                                </Option>
                              );
                            })}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col md={{ span: 12 }} xs={{ span: 24 }} style={{ textAlign: 'center' }}>
                          <Form.Item name="deposit_by" label="Deposit By" labelCol={{ md: { span: 10 }, xs: { span: 24 }, style: { textAlign: 'center' } }} rules={[{required: true,}]}>
                            {error ? ( // Check if there's an error
                              <div className="error-message">{error}</div>
                            ) : (
                              <Select
                                placeholder='Select'
                                disabled={ClosureStatus !== 2 && ClosureStatus !== 5 && ClosureStatus !== 6 && ClosureStatus !== 4 && ClosureStatus !== 8}
                                name='deposit_by'
                                defaultValue={state?.depositby}
                                value={depositBy}
                                onChange={(value) => setDepositBy(value)}
                                filterOption={(input, option) =>
                                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                style={{ width: '100%' }} // Set the width of the Select component
                              >
                                {crewName.map((item, index) => {
                                  return (
                                    <Option
                                      key={index} value={item.id}>
                                      {item.name}
                                    </Option>
                                  );
                                })}
                              </Select>
                            )}
                          </Form.Item>
                        </Col>
                        <Col md={12} xs={24}>
                            <Form.Item name="aov" label="AOV Remarks"
                              labelCol={{ md: { span: 10 }, xs: { span: 24 }, style: { textAlign: 'center' } }}>
                              <Input
                                onChange={getAov}
                                defaultValue={state?.aov}
                                value={aov}
                                style={{
                                  textAlign: 'center',
                                }}
                              />
                            </Form.Item>
                        </Col>
                        <Col md={12} xs={24}>
                                <Form.Item name="abc" label="ABC Remarks"
                                  labelCol={{ md: { span: 10 }, xs: { span: 24 }, style: { textAlign: 'center' } }}>
                                  <Input
                                    onChange={getAbc}
                                    defaultValue={state?.abc}
                                    value={abc}
                                    style={{
                                      textAlign: 'center',
                                    }}
                                  />
                                </Form.Item>
                            </Col>
                            <Col md={12} xs={24}>
                                <Form.Item name="remarks" label="Overall Remarks"
                                  labelCol={{ md: { span: 10 }, xs: { span: 24 }, style: { textAlign: 'center' } }}>
                                  <Input
                                    onChange={getGenRemarks}
                                    defaultValue={state?.genremarks}
                                    value={remarks}
                                    style={{
                                      textAlign: 'center',
                                    }}
                                  />
                                </Form.Item>
                            </Col>
                            
                                <Col md={12} xs={24}>
                                  <Form.Item name="totalDeposit" label="Total Deposit"
                                    labelCol={{ md: { span: 10 }, xs: { span: 24 }, style: { textAlign: 'center' } }}>
                                    <Controller
                                      style={{ textAlign: 'center' }}
                                      control={control}
                                      name="totalDeposit"
                                      render={() => (
                                        <Input
                                          name="totalDeposit"
                                          value={totDepositAmt}
                                          disabled 
                                          style={{
                                            textAlign: 'center',
                                            color: 'black'
                                          }}
                                        />
                                      )}
                                    />
                                  </Form.Item>
                                </Col>
                            <Col md={12} xs={24}>
                                  <Form.Item name="cashBalance" label="Cash Balance"
                                    labelCol={{ md: { span: 10 }, xs: { span: 24 }, style: { textAlign: 'center' } }}>
                                    <Controller
                                      style={{ textAlign: 'center' }}
                                      control={control}
                                      name="cashBalance"
                                      render={() => (
                                        <Input
                                          name="cashBalance"
                                          value={cashBalanceAmt}
                                          disabled 
                                          style={{
                                            textAlign: 'center',
                                            color: 'black'
                                          }}
                                        />
                                      )}
                                    />
                                  </Form.Item>
                            </Col>
                                
                                
                      </Row>
                    </div>
                  )}
                  {[1, 2, 3].includes(ClosureStatus) && ( //this is only visible when cosure status 1 or 2 or 3
                    <div>
                      <Row justify="space-between">
                        
                        <Col md={{ span: 8 }} xs={{ span: 24 }} justify="center">
                          <Form.Item labelCol={{ md: { span: 24 }, xs: { span: 24 } }}>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                              <Button
                                onClick={leaveHandle}
                                style={{ backgroundColor: 'red', color: 'white', fontWeight: 'bold' }}
                              >
                                {"Leave"}
                              </Button>
                            </div>
                          </Form.Item>
                        </Col>
                        <Col md={{ span: 8 }} xs={{ span: 24 }} justify="right">
                          <Form.Item labelCol={{ md: { span: 24 }, xs: { span: 24 } }}>
                            <div style={{ display: 'flex', justifyContent: 'right' }}>
                              <Button
                                onClick={handleGetSalesData}
                                style={{ backgroundColor: 'green', color: 'white', fontWeight: 'bold' }}
                              >
                                {"Make Day Sales Closure"}
                              </Button>
                            </div>
                          </Form.Item>
                        </Col>
                      </Row>
                    </div>
                  )}

                  <div>
                    <Row justify="center">
                      <Col md={11} xs={24}>
                        {denomination && (
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
                                {Holiday == null && (
                                  Array.isArray(parsedDenominations) ? (
                                    parsedDenominations.map((item, index) => (
                                      <tr key={index + 1}>
                                        <td style={{ width: '33%', border: '2px black solid' }}>{item.def_list_name}</td>
                                        <td style={{ width: '33%', border: '2px black solid' }}>{item.inputvalue || 0}</td>
                                        <td style={{ width: '33%', border: '2px black solid' }}>{item.value || 0}</td>
                                      </tr>
                                    ))
                                  ) : (
                                    denominationvalue.map((item, index) => (
                                      <tr key={index + 1}>
                                        <td style={{ width: '33%', border: '2px black solid' }}>{item.def_list_name}</td>
                                        <td style={{ width: '33%', border: '2px black solid' }}>
                                          <input
                                            type="number"
                                            style={{ width: '100%', textAlign: 'center' }}
                                            disabled={Holiday}
                                            onInput={(e) => {
                                              const numericValue = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                                              e.target.value = numericValue; // Update the input value with the numeric version
                                              handleInputChange(numericValue, index, item);
                                            }}
                                          />
                                        </td>
                                        <td style={{ width: '33%', border: '2px black solid' }}>{item.value || 0}</td>
                                        <td><input type="hidden" value={item.inputvalue || 0} /></td>
                                      </tr>
                                    ))
                                  )
                                )}

                                {Holiday != null && (
                                  denominationvalue.map((item, index) => (
                                    <tr key={index + 1}>
                                      <td style={{ width: '33%', border: '2px black solid' }}>{item.def_list_name}</td>
                                      <td style={{ width: '33%', border: '2px black solid' }}>
                                        <input
                                          type="number"
                                          style={{ width: '100%', textAlign: 'center' }}
                                          onInput={(e) => {
                                            const numericValue = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                                            e.target.value = numericValue; // Update the input value with the numeric version
                                            handleInputChange(numericValue, index, item);
                                          }}
                                        />
                                      </td>
                                      <td style={{ width: '33%', border: '2px black solid' }}>{item.value || 0}</td>
                                      <td><input type="hidden" value={item.inputvalue || 0} /></td>
                                    </tr>
                                  ))
                                )}
                              </tbody>
                              <tfoot>
                                <tr>
                                  <td colSpan="2" style={{ backgroundColor: 'black', color: 'orange', fontWeight: 'bolder' }}>Total</td>
                                  <td style={{ backgroundColor: 'black', color: 'orange', fontWeight: 'bolder' }}>
                                    {Array.isArray(parsedDenominations) ? state?.closure_amount : totalValue}
                                  </td>
                                </tr>
                              </tfoot>
                            </table>
                            <br></br>
                            </>
                        )}
                        {denominationreason && [1, 2, 3].includes(ClosureStatus) && (
                          <>
                            <Row style={{ justifyContent: 'center', marginBottom: '-15px' }}>
                              <Col md={24} xs={24}>
                                <Input
                                  name="denominationreason"
                                  readOnly
                                  defaultValue={'Outlet Holiday'}
                                  className="blackinputbox"
                                />
                              </Col>
                            </Row>
                          </>
                        )}
               
                        {(denominationreason || (denomination && [1, 2, 3].includes(ClosureStatus))) && ![4, 5, 6, 7, 8, 9, 10].includes(ClosureStatus) && (
                          <div style={{ paddingTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Col md={{ span: 24 }} xs={{ span: 24 }}>
                              <Form.Item labelCol={{ md: { span: 24 }, xs: { span: 24 } }}>
                                <div>
                                  <Button
                                    onClick={handleSaveDenominationData}
                                    disabled={!denominationreason && totalValue !== totalOutletCash && totalOutletCash > 0}
                                    style={{ backgroundColor: "#f5a60b", color: 'white', fontWeight: 'bold' }}
                                  >
                                    {"Submit"}
                                  </Button>
                                </div>
                              </Form.Item>
                            </Col>
                          </div>
                        )}
                        <Col md={{ span: 8 }} xs={{ span: 24 }} justify="left">
                          <Form.Item labelCol={{ md: { span: 24 }, xs: { span: 24 } }}>
                            <div style={{ display: 'flex', justifyContent: 'left' }}>
                              <Button

                                onClick={onClickBack}
                                style={{ backgroundColor: '#f5a60b', color: 'white', fontWeight: 'bold' }}
                              >
                                {"Back"}
                              </Button>
                            </div>
                          </Form.Item>
                        </Col>
                      </Col>

                      {![1, 3].includes(ClosureStatus) && ( //if closure status having 1,2,3 means this won't show
                        <Col md={11} xs={24}>
                          <Row style={{ justifyContent: 'center', marginBottom: '-15px' }}>
                            <Col md={12} xs={24}>
                              <Form.Item
                                name="Deposit"
                                label="Deposit"
                                labelCol={{ md: { span: 12 }, xs: { span: 12 }, style: { textAlign: 'center' } }}
                              >
                                <Radio.Group name="Deposit" buttonStyle='solid'
                                  defaultValue={DepositReason === null ? 1 : 0}
                                   onChange={depositHandle} style={{ display: 'flex' }}>
                                  <Radio value={1} className={inactiveClass}>
                                    Yes
                                  </Radio>
                                  <Radio value={0} className={inactiveClass}>
                                    No
                                  </Radio>
                                </Radio.Group>
                              </Form.Item>
                            </Col>
                            {deposit && (
                              <Col span={6} style={{ textAlign: 'center' }} className='d-flex align-items-center justify-content-end '>
                                    <Form.Item className='mx-2'>
                                      <Button style={{ marginTop: '7px', backgroundColor: 'green', color: 'white', fontWeight: 'bold' }} onClick={handleAddRow} >Add</Button>
                                    </Form.Item>
                              </Col>
                            )}
                          </Row>
                          <Col md={24} xs={24}>
                                  <Form.Item name="depositremarks" label="Deposit Remarks"
                                    labelCol={{ md: { span: 12 }, xs: { span: 12 }, style: { textAlign: 'center' } }}>
                                    <Input
                                      onChange={getRemarks}
                                      defaultValue={state?.remarks}
                                      disabled={ClosureStatus !== 2 && ClosureStatus !== 4 && ClosureStatus !== 5 && ClosureStatus !== 6 && ClosureStatus !== 8}
                                      value={revRemarks}
                                      style={{
                                        textAlign: 'center',
                                      }}
                                    />
                                  </Form.Item>
                                </Col>

                          {deposit && ( // Render the row only if loading is false
                           <>
                           {formRows.map((row) => (
                             <Row gutter={[24, 0]} key={row.id}>
                              <Col md={24} xs={24}>
                                  <Form.Item
                                     name={`deposit_amount-${row.id}`}
                                     label='Deposit Amount'
                                     labelCol={{ md: { span: 12 }, xs: { span: 12 }, style: { textAlign: 'center' } }}
                                  >
                                   <Input
                                     name="deposit_amount"
                                     placeholder='Deposit Amount'
                                     defaultValue={row.deposit_amount}
                                     disabled={ClosureStatus !== 2 && ClosureStatus !== 4 && ClosureStatus !== 5 && ClosureStatus !== 6 && ClosureStatus !== 8}
                                     onChange={(e) => Changecost(row.id, 'deposit_amount', e.target.value)}
                                   />
                                  </Form.Item>
                                </Col>
                               <Col span={24}>
                                 <Form.Item
                                   name={`referenceNum-${row.id}`}
                                   label='Reference Number'
                                   labelCol={{ md: { span: 12 }, xs: { span: 12 }, style: { textAlign: 'center' } }}
                                 >
                                   <Input
                                     name="referenceNum"
                                     placeholder='Reference Number'
                                     defaultValue={row.referenceNum}
                                     disabled={ClosureStatus !== 2 && ClosureStatus !== 4 && ClosureStatus !== 5 && ClosureStatus !== 6 && ClosureStatus !== 8}
                                     onChange={(e) => Changecost(row.id, 'referenceNum', e.target.value)}
                                   />
                                 </Form.Item>
                               </Col>
                               <Col md={24} xs={24}>
                                  <Form.Item
                                    name={`deposit_mode-${row.id}`}
                                    label="Deposit Mode"
                                    labelCol={{ md: { span: 12 }, xs: { span: 12 }, style: { textAlign: 'center' } }}
                                  >
                                  <Select
                                    placeholder="Select"
                                    name="deposit_mode"
                                    defaultValue={row.deposit_mode}
                                    disabled={ClosureStatus !== 2 && ClosureStatus !== 4 && ClosureStatus !== 5 && ClosureStatus !== 6 && ClosureStatus !== 8}
                                    value={row.deposit_mode}
                                    onChange={(value) => Changecost(row.id, 'deposit_mode', value)} // Handle changes
                                    style={{ width: '100%' }}
                                  >
                                    {dropdownOptions.map((item) => (
                                      <Option key={item.id} value={item.def_list_code}>
                                        {item.def_list_name}
                                      </Option>
                                    ))}
                                  </Select>
                                  </Form.Item>
                                </Col>
                                <Col md={12} xs={24} >
                                      <Form.Item
                                        name={`deposit_image-${row.id}`}
                                        label="Proof Image"
                                        getValueFromEvent={getFile}
                                      >
                                        {row.image ? (
                                          <>
                                          <Image width={100} 
                                          src={row.image} />
                                          </>
                                        ) : (
                                          'No Image Available'
                                        )}
                                      </Form.Item>
                                    </Col>
                                    <Col md={12} xs={24}>
                                      <Upload
                                        {...props}
                                        fileList={row.fileList}
                                        onPreview={(file) => handlePreview(file, row.id)}
                                        capture="environment"
                                        accept=".png,.jpg,.jpeg"
                                        onChange={(e) => handleChange(e, row.id)}
                                        disabled={ClosureStatus !== 2 && ClosureStatus !== 4 && ClosureStatus !== 5 && ClosureStatus !== 6 && ClosureStatus !== 8}
                                      >
                                        {row.fileList?.length >= 1 ? null : uploadButton}
                                      </Upload>
                                    </Col>
                                    {[2, 4, 6, 8].includes(ClosureStatus) && (
                               <Col span={24} style={{ textAlign: 'center' }}>
                                 <Button disabled={row.id !== formRows.length} style={{ backgroundColor: 'red', color: 'white' }} onClick={() => handleDeleteRow(row.id)}>Delete</Button>
                               </Col>
                                    )}
                             </Row>
                           ))}
                                <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                                  <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                </Modal>
                            </>
                          )}
                          {reason && ( // Render the row only if loading is false
                            <>

                              <Row style={{ marginBottom: '-15px', }}>
                                <Col md={24} xs={24}>
                                  <Form.Item
                                    name='skipreason'
                                    label='Skip Reason'
                                    labelCol={{ md: { span: 12 }, xs: { span: 12 }, style: { textAlign: 'center' } }}
                                  >
                                    <Select
                                      placeholder='Select'
                                      name='skipreason'
                                      defaultValue={DepositReason !== null ? `${DepositReason}` : ''}
                                      disabled={ClosureStatus !== 2 && ClosureStatus !== 4 && ClosureStatus !== 5 && ClosureStatus !== 6 && ClosureStatus !== 8}
                                      filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                      }
                                      style={{ width: '100%' }} // Set the width of the Select component
                                      value={depositSkipReason}
                                      onChange={(value) => setdepositSkipReason(value)} // Update the state when the value changes
                                    >
                                      {skipdropdown.map((item, index) => {
                                        return (
                                          <Option key={index} value={item.def_list_code}>
                                            {item.def_list_name}
                                          </Option>
                                        );
                                      })}
                                    </Select>
                                  </Form.Item>
                                </Col>
                              </Row>
                            </>
                          )}
                          {[2, 4, 6, 8].includes(ClosureStatus) && (
                            <div style={{ paddingTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <Col md={{ span: 24 }} xs={{ span: 24 }} >
                                <Form.Item labelCol={{ md: { span: 24 }, xs: { span: 24 } }} >
                                  <div >
                                    <Button
                                      onClick={handleSaveDepositData}
                                      style={{ backgroundColor: "#f5a60b", color: 'white', fontWeight: 'bold' }}
                                    >
                                      {"Submit"}
                                    </Button>
                                  </div>
                                </Form.Item>
                              </Col>
                            </div>
                          )}
                        </Col>
                      )}
                    </Row>
                    <br />
                  </div>

                </Form >
              </Col >
            </Row >
          </Card >
        </div >
      </div >

    </>
  );
}

export default CashHandlingForm;
