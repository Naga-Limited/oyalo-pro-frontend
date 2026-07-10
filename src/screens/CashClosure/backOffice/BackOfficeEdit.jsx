/* eslint-disable no-unused-labels */
import React, { useEffect, useState, } from "react";
import { Spin, Input, Card, Button, Col, Row, Form, Select, message, Image, Modal, Upload,  } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from 'react-router';
import { useForm, Controller } from "react-hook-form";
import { baseURL } from '../../../api/baseURL';
import { get_Sales_Details, get_Crew_Details, update_dayclosure_verification, get_Reject_Reason, getDenominationName } from "../../../@app/master/masterSlice";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function CashHandlingForm() {
  const dispatch = useDispatch();
  // const [form] = Form.useForm();
  const { Option } = Select;
  const { control, } = useForm();
  const location = useLocation();
  const { state } = location;
  // let defaultValue = state?.data;
  const navigate = useNavigate();

  //for geting value from previous page
  const parsedDenominations = JSON.parse(state?.denominations);
  const ClosureStatus = state.status;
  const [UtrNum, setUtrNum] = useState('');
  const getUtrNum = (i) => { setUtrNum(i.target.value) }
  const [rejectdropdown, setrejectdropdown] = useState([]);
  const DepositMode = state?.deposit_mode;
  const DepositSkip = state?.skipreason;
  const outletid = state?.outletidorl;

  useEffect(() => {
    dispatch(get_Reject_Reason())
      .then((result) => {
        setrejectdropdown(result.data);
      })
  }, [dispatch]);

  const [skipdropdown, setskipdropdown] = useState([]);

  useEffect(() => {
    dispatch(getDenominationName())
      .then((result) => {
        if (result && Array.isArray(result.data)) {
          const defTitle3Objects = result.data.filter((item) => item.def_title_id === 3);
          const defTitle4Objects = result.data.filter((item) => item.def_title_id === 4);
          setskipdropdown(defTitle4Objects);
          setDropdownOptions(defTitle3Objects);
        }
      });
  }, [dispatch]);

  const userData = useSelector((state) => state.auth);
  const [previewOpen, setPreviewOpen] = useState(false);
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
        {state?.id ? 'Update Image' : 'Upload'}
      </div>
    </Button>
  );
  const [totDepositAmt, setTotdepositAmt] = useState(0.00);
  const [rejectReason, setrejectReason] = useState('');
  const [lastclosuredate, setlastclosuredate] = useState(null);
  const [verremarks, setverRemarks] = useState(state?.verification_remarks);
  const verRemarks = (i) => { setverRemarks(i.target.value) };
  const [formRows, setFormRows] = useState([]);
  const [previewImage, setPreviewImage] = useState('');
  const [dropdownOptions, setDropdownOptions] = useState([]);

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
  }, [formRows]);

  useEffect(() => {
    dispatch(get_Sales_Details({ data: { outlet_code: state?.outlet_code, closuredate: state?.sales_closure_date } }))
      .then((response) => {
        if (response && response.data.lastclosuredate) {
          setlastclosuredate(response.data.lastclosuredate);
        } else {
          setlastclosuredate('-');
        }
      })
  }, [dispatch]);

  const [crewName, setcrewName] = useState([]);
  const [totalOutletCash, setTotalOutletCash] = useState(0.00);

  useEffect(() => {
    if (outletid) {
      fetchCrewDetails(outletid);
    }
    if (state?.sales_amount && state?.open_balance) {
      const totalCash = parseInt(state.sales_amount, 10) + parseInt(state.open_balance, 10);
      setTotalOutletCash(totalCash.toFixed(2));
    }    
  }, [dispatch, outletid, state]);

  const [error, setError] = useState(null);

    const fetchCrewDetails = async () => {
    try {
      const result = await dispatch(get_Crew_Details({ data: { outletid: outletid } }));
      if (result && result.data && Array.isArray(result.data)) {
        setcrewName(result.data);
      } else {
        setError('Data received from API is not in the expected format');
      }
    } catch (error) {
      setError('Error in API call: ' + error.message);
    }
  };

  // useEffect(() => {
  //   dispatch(get_Crew_Details({ data: { outletid: userid } }))
  //     .then((result) => {
  //       if (result && result.data && Array.isArray(result.data)) {
  //         setcrewName(result.data);
  //       } else {
  //         setError('Data received from API is not in the expected format');
  //       }
  //     })
  //     .catch((error) => {
  //       setError('Error in API call: ' + error.message);
  //     });
  // }, [dispatch, userid]);

  const [previewTitle, setPreviewTitle] = useState('');
  const antIcon = (<LoadingOutlined style={{ fontSize: 34, }} spin />);
  const [showLoader, setShowLoader] = useState(true);
  useEffect(() => {
    const delay = [1, 2, 3, 4, 10].includes(ClosureStatus) ? 2000 : 7000;
    const timeoutId = setTimeout(() => {
      setShowLoader(false);
    }, delay);
    return () => clearTimeout(timeoutId);
  }, [ClosureStatus]);

  const onClickBack = () => {
    navigate('/backOffice');
  };

  const handleSaveVerificationData = async () => {

    setShowLoader(true);
    const salesClosure_id = state?.closure_id;
    const waiting_At = '9';
    const closure_by = userData.userData.data?.id;
    const utr_No = UtrNum;
    const verificationRemarks = verremarks;

    dispatch(update_dayclosure_verification({ data: { closure_by, salesClosure_id, waiting_At, utr_No, verificationRemarks } }))
      .then((response) => {
        if (response.status === 200) {
          navigate('/backOffice');
          message.success({ content: 'Cash Deposit Information Verified', })
        } else {
          message.error({ content: 'Cash Deposit Request Failed', })
        }
      });

    setShowLoader(false);
  };
  const handleSaveRejectionData = async () => {
    setShowLoader(true);
    try {
      let closure_by; // Declare closure_by outside the if/else blocks
      
        if (userData.userData.data?.id == null) {
          closure_by = '0';
        } else {
          closure_by = userData.userData.data?.id;
        }
        const outlet_code = state?.outlet_code;
        const salesClosure_id = state?.closure_id;
        const Deposit_Amt = state?.deposit_amount;
        const reject_Reason = rejectReason;
        const utr_No = UtrNum;
        const waiting_At = '8';
        const verificationRemarks = verremarks;

        const response = await dispatch(update_dayclosure_verification({ data: { verificationRemarks, closure_by, outlet_code, Deposit_Amt, utr_No, reject_Reason, salesClosure_id, waiting_At } }));
        if (response.status === 200) {
          navigate('/backOffice');
          message.success({ content: 'Cash Deposit Rejected', })
        }
    } catch (error) {
      // Handle errors if necessary
      message.error({ content: 'Cash Deposit Rejected Failed', })
    } finally {
      setShowLoader(false);
    }
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
                  initialValues={{ remember: true }}
                  autoComplete="off"
                >
                  <div className=" justify-content-center align-items-center "  >
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
                        <Form.Item
                          name="orl_name"
                          label="ORL Name"
                          labelCol={{ md: { span: 10 }, xs: { span: 24 }, style: { textAlign: 'center' } }}
                        >
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
                        <Form.Item name="preSalesDate" label="Pre. Acc. Close" labelCol={{ md: { span: 10 }, xs: { span: 24 }, style: { textAlign: 'center' } }} >
                          <Controller
                            control={control}
                            name="orl_name"
                            render={() => (<Input value={lastclosuredate} readOnly className="blackinputbox" />)}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </div>
                  <div
                    className=" justify-content-center align-items-center "
                    style={{ width: "100%", }}
                  >
                    <Row>
                      <Col md={{ span: 8 }} xs={{ span: 24 }}  >
                        <Form.Item name="openingBal" label="Opening Balance" labelCol={{ md: { span: 10 }, xs: { span: 24 }, style: { textAlign: 'center' } }}>
                          <Controller
                            control={control}
                            name="openingBal"
                            render={() => (<Input value={state?.open_balance} readOnly className="blackinputbox" />)}
                          />
                        </Form.Item>
                      </Col>
                      <Col md={{ span: 8 }} xs={{ span: 24 }}  >
                        <Form.Item name="cashSale" label="Cash Sales" labelCol={{ md: { span: 10 }, xs: { span: 24 }, style: { textAlign: 'center' } }}>
                          <Controller
                            control={control}
                            name="cashSale"
                            render={() => (<Input value={state?.sales_amount} readOnly className="blackinputbox" />)}
                          />
                        </Form.Item>
                      </Col>
                      <Col md={{ span: 8 }} xs={{ span: 24 }} >
                        <Form.Item name="totalCash" label=" TOTAL CASH" labelCol={{ md: { span: 10 }, xs: { span: 24 }, style: { textAlign: 'center' } }}>
                          <Controller
                            control={control}
                            name="totalCash"
                            render={() => (<Input value={totalOutletCash} readOnly className="blackinputbox" />)}
                          />
                        </Form.Item>
                      </Col>
                      <Col md={{ span: 12 }} xs={{ span: 24 }} style={{ textAlign: 'center' }}>
                        <Form.Item
                          name="Closure_By"
                          label="Closure By"
                          labelCol={{ md: { span: 10 }, xs: { span: 24 }, style: { textAlign: 'center' } }}
                          rules={[{required: true,}]}
                        >
                          {error ? ( // Check if there's an error
                            <div className="error-message">{error}</div>
                          ) : (
                            <Select
                              placeholder="Select"
                              defaultValue={state?.closureby !== null ? state?.closureby : ''}
                              disabled={ClosureStatus !== 1 && ClosureStatus !== 3}
                              name="Closure_By"
                              filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                              }
                              style={{ width: '100%' }}
                            >
                              {crewName.map((item) => (
                                <Option key={item.id} value={item.id}>
                                  {item.name}
                                </Option>
                              ))}
                            </Select>
                          )}
                        </Form.Item>
                      </Col>
                      <Col md={{ span: 12 }} xs={{ span: 24 }} style={{ textAlign: 'center' }}>
                        <Form.Item name="deposit_by" label="Deposit By" labelCol={{ md: { span: 10 }, xs: { span: 24 }, style: { textAlign: 'center', color: 'black' } }} rules={[{required: true,}]}>
                          {error ? ( // Check if there's an error
                            <div className="error-message">{error}</div>
                          ) : (
                            <Select
                              placeholder='Select'
                              disabled={ClosureStatus !== 2 && ClosureStatus !== 5 && ClosureStatus !== 6 && ClosureStatus !== 4}
                              name='deposit_by'
                              defaultValue={state?.depositby !== null ? state?.depositby : 'Admin'}
                              filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                              }
                              style={{ width: '100%', color: 'black' }} // Set the width of the Select component
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
                                labelCol={{ md: { span: 10 }, xs: { span: 10 }, style: { textAlign: 'center' } }}>
                                <Input
                                  defaultValue={state?.aov}
                                  className="blackinputbox"
                                  style={{
                                    textAlign: 'center',
                                  }}
                                />
                              </Form.Item>
                          </Col>
                          <Col md={12} xs={24}>
                              <Form.Item name="abc" label="ABC Remarks"
                                labelCol={{ md: { span: 10 }, xs: { span: 10 }, style: { textAlign: 'center' } }}>
                                <Input
                                  defaultValue={state?.abc}
                                className="blackinputbox"
                                  style={{
                                    textAlign: 'center',
                                  }}
                                />
                              </Form.Item>
                          </Col>
                          <Col md={12} xs={24}>
                              <Form.Item name="remarks" label="Overall Remarks"
                                labelCol={{ md: { span: 10 }, xs: { span: 10 }, style: { textAlign: 'center' } }}>
                                <Input
                                  defaultValue={state?.genremarks}
                                className="blackinputbox"
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
                                          className="blackinputbox"
                                        />
                                      )}
                                    />
                                  </Form.Item>
                                </Col>
                          <Col md={12} xs={24}>
                            <Form.Item name="cashBalance" label="Cash Balance"
                              labelCol={{ md: { span: 10 }, xs: { span: 12 }, style: { textAlign: 'center' } }}>
                              <Input
                                name="cashBalance"
                                readOnly
                                defaultValue={state?.balance_amount}
                                className="blackinputbox"
                              />
                            </Form.Item>
                          </Col>
                      
                    </Row>
                  </div>

                  <div>
                    <Row justify="center">
                      <Col md={12} xs={24}>

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
                        <br></br>
                      </Col>
                     
                      <Col md={12} xs={24}>
                      {formRows.map((row) => ( DepositSkip === null && (
                             <Row gutter={[24, 0]} key={row.id}>
                              <Col md={24} xs={24}>
                                  <Form.Item
                                     name={`deposit_amount-${row.id}`}
                                     label='Deposit Amount'
                                     labelCol={{ md: { span: 12 }, xs: { span: 12 }, style: { textAlign: 'center' } }}
                                  >
                                   <Input
                                    name="deposit_amount"
                                    className="blackinputbox"
                                    placeholder='Deposit Amount'
                                    defaultValue={row.deposit_amount}
                                    disabled={ClosureStatus !== 2 && ClosureStatus !== 4 && ClosureStatus !== 5 && ClosureStatus !== 6 && ClosureStatus !== 8}
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
                                    className="blackinputbox"
                                    placeholder='Reference Number'
                                    defaultValue={row.referenceNum}
                                    disabled={ ClosureStatus !== 8}
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
                             </Row>
                           )))}
                                <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                                  <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                </Modal>    
                        {DepositSkip !== null && ( 
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
                                disabled
                                defaultValue={state?.skipreason !== null ? `${state?.skipreason}` : ''}
                                filterOption={(input, option) =>
                                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                style={{ width: '100%', }} // Set the width of the Select component
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
                       
                      )}
                       {DepositSkip === null && ( 
                        <Row style={{ marginBottom: '-15px' }}>
                          <Col md={24} xs={24}>
                            <Form.Item name="utrNum" label="UTR No"
                              labelCol={{ md: { span: 12 }, xs: { span: 12 }, style: { textAlign: 'center' } }}>
                              <Input
                                onChange={getUtrNum}
                                value={UtrNum}
                                defaultValue={state?.utr_num}
                                style={{
                                  textAlign: 'center',
                                }}
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                       )}
                        <Row style={{ marginBottom: '-15px' }}>
                        <Col md={24} xs={24}>
                                  <Form.Item name="verification_remarks" label="Verification Remarks"
                                    labelCol={{ md: { span: 12 }, xs: { span: 24 }, style: { textAlign: 'center' } }}>
                                    <Input
                                      onChange={verRemarks}
                                      defaultValue={state?.verification_remarks}
                                      disabled={ClosureStatus === 8}
                                      value={verremarks}
                                      style={{
                                        textAlign: 'center',
                                      }}
                                    />
                                  </Form.Item>
                                </Col>
                                </Row>
                        <Row style={{ marginBottom: '-15px' }}>
                          <Col md={24} xs={24}>
                            <Form.Item
                              name='Remark'
                              label='Reject Remark'
                              labelCol={{ md: { span: 12 }, xs: { span: 12 }, style: { textAlign: 'center' } }}
                            >
                              <Select
                                placeholder='Select'
                                name='Remark'
                                filterOption={(input, option) =>
                                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                style={{ width: '100%' }} // Set the width of the Select component
                                value={rejectReason} // Set the selected value here
                                disabled={ClosureStatus === 8}
                                // defaultValue={state?.reject !== null ? `${state?.reject}` : ''}
                                onChange={(value) => setrejectReason(value)} // Update the state when the value changes
                              >
                                {rejectdropdown.map((item, index) => {
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
                      </Col>
                    </Row>
                      <Row justify="space-between">
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
                        {rejectReason.length === 1 && (
                          <Col md={{ span: 8 }} xs={{ span: 24 }} justify="center">
                            <Form.Item labelCol={{ md: { span: 24 }, xs: { span: 24 } }}>
                              <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Button name="Revision" disabled={rejectReason.length === 0}
                                  onClick={handleSaveRejectionData} style={{ backgroundColor: "red", color: 'white', fontWeight: 'bold' }}>
                                  {"Reject"}
                                </Button>
                              </div>
                            </Form.Item>
                          </Col>
                        )}
                        {rejectReason.length === 0 && (
                          <Col md={{ span: 8 }} xs={{ span: 24 }} justify="center">
                            <Form.Item labelCol={{ md: { span: 24 }, xs: { span: 24 } }}>
                              <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Button name="Verified" onClick={handleSaveVerificationData} style={{ backgroundColor: "green", color: 'white', fontWeight: 'bold' }}>
                                  {"Verify"}
                                </Button>
                              </div>
                            </Form.Item>
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