/* eslint-disable no-unused-vars */
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Input,
  Card,
  DatePicker,
  Button,
  Col,
  Row,
  Form,
  Select,
  Upload,
} from "antd";
import {
  UpdateSaveExpense,
  getEmployeeMaster,
  getOutletMaster,
} from "../../../@app/master/masterSlice";
// import {map} from 'ramda';
import { useLocation, useNavigate } from "react-router";
// import dayjs from 'dayjs';
import messageToast from "../../../components/messageToast/messageToast";
import { transStatus } from "../../../util/transStatus";
import { MultiUploadButton } from "../../../components/multiUploadButton/MultiUploadButton";
import { PlusOutlined } from "@ant-design/icons";
import apis from "../../../api/stateAPI";
// import { Input } from 'antd';
// import {CREATE_TICKET_FORM_DATA} from './createTicket.constants';
const { TextArea } = Input;

const { Option } = Select;

function PcclaimreqorlForm() {
  const { state } = useLocation();
  // const handleClickBack = () => {
  //   navigate('/createTicket');
  // };

  const [emp_date, setEmpdate] = useState(
    localStorage.getItem("emp_code") || ""
  );

  const dispatch = useDispatch();

  //  dispatch(masterSlice.actions.getPaymentRequestResponse(data));

  const { getExpenseData } = useSelector((state) => {
    return state.master;
  });
  const navigate = useNavigate();

  // const { state } = useLocation();

  // let defaultValue = state?.data;

  const [form] = Form.useForm();

  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [image, setImage] = useState("");

  const [expense, setExpense] = useState({});

  // const stateID = Form.useWatch('stateID', form);
  // const zoneID = Form.useWatch('zoneID', form);
  // const subzoneID = Form.useWatch('subzoneID', form);
  // const priority = Form.useWatch('priority', form);
  // const serviceFor = Form.useWatch('serviceFor', form);

  const onFinish = (values) => {
    let Data = [...getExpenseData];

    let newData = {
      id: Math.floor(Math.random() * 10 + 1),
      expense_date: values?.expense_date,
      expense_type: values?.expense_type,
      amount: values?.amount,
      remarks: values?.remarks,
      bill_copy: values?.bill_copy,
      emp_code: emp_date,
    };

    // console.log(getExpenseData, "getExpenseData");

    Data = [...getExpenseData];

    Data.push(newData);

    dispatch(UpdateSaveExpense(Data));

    navigate("/pcclaimreqorl", {});

    //getExpenseData;
  };

  useEffect(() => {
    getExpenseAPI();
  }, []);

  const getExpenseAPI = () => {
    apis.getExpenseList().then(({ data }) => {
      setExpense(data?.data);
      // dispatch(authSlice.actions.setBadgeCount(data));
      // return data;
    });
  };

  // const onFinish = (values) => {
  //   let data = {
  //     state: values.stateID,
  //     city: values.city_name,
  //     zone: values.zoneID,
  //     subzone: values.subzoneID,
  //     oulet_Code: values.oulet_Code,
  //     name: values.name,
  //     zomoato_status: values.zomoato_status,
  //     zomoatoID: values.zomoatoID,
  //     zomoato_date: values['zomoato_date']?.format('YYYY-MM-DD'),
  //     swiggy_status: values.swiggy_status,
  //     swiggyID: values.swiggyID,
  //     swiggy_date: values['swiggy_date']?.format('YYYY-MM-DD'),
  //     dotpe_status: values.dotpe_status,
  //     dotpeID: values.dotpeID,
  //     dotpe_date: values.dotpe_date?.format('YYYY-MM-DD'),
  //     email: values.email,
  //     latitude: values.latitude,
  //     longitude: values.longitude,
  //     address: values.address,
  //     order_placing_no: values.order_placing_no,
  //     orl_cug_no: values.orl_cug_no,
  //     contact: values.contact,
  //     open_time: values.open_time?.format('HH:mm:ss'),
  //     close_time: values.close_time?.format('HH:mm:ss'),
  //     opening_date: values.opening_date?.format('YYYY-MM-DD'),
  //     profit_center: values.profit_center,
  //     cost_center: values.cost_center,
  //     labour_license_no: values.labour_license_no,
  //     fire_license_no: values.fire_license_no,
  //     fire_extinguisher_license_no: values.fire_extinguisher_license_no,
  //     fssai_license_no: values.fssai_license_no,
  //     status: values.status === 'active' ? 1 : 0
  //   };

  //   dispatch(defaultValue?.id ? updateOutletMaster({ data: { ...data, id: defaultValue.id, status: transStatus({ status: data?.status }) } }) : saveOutletMaster({ data })).then((data) => {
  //     const { status, message } = data;
  //     if (status === 200) {
  //       messageToast({ message: data?.statusText, status: status, title: 'Outlet Master' });
  //       form.resetFields();
  //     }
  //     if (data?.exception) {
  //       messageToast({ message: 'Invalid Request', status: 400, title: 'Outlet Master' });
  //     }
  //     if (status === 400) {
  //       if ((message && message?.contact?.length > 0) || (message && message.email?.length > 0) || (message && message.name?.length > 0)) {
  //         if (message && message.contact) {
  //           messageToast({ message: message?.contact[0], status: status, title: 'Outlet Master' });
  //         } else if (message && message.email) {
  //           messageToast({ message: message?.email[0], status: status, title: 'Outlet Master' });
  //         } else if (message && message.name) {
  //           messageToast({ message: message?.name[0], status: status, title: 'Outlet Master' });
  //         }
  //         if (message) {
  //           messageToast({ message: message, status: status, title: 'Employee Master' });
  //         }
  //       }
  //     }
  //     if (status === 200) {
  //       messageToast({ message: message, status: status, title: 'Outlet Master' });
  //     }
  //     if (defaultValue?.id) {
  //       navigate('/createTicket');
  //     }
  //   });
  // };

  // useEffect(() => {
  //   dispatch(getStates());
  // }, [dispatch]);

  // useEffect(() => {
  //   dispatch(getZonal(stateID));
  // }, [dispatch, stateID]);

  // useEffect(() => {
  //   dispatch(getSubZonal(zoneID));
  // }, [dispatch, zoneID]);

  // useEffect(() => {
  //   dispatch(getCity(subzoneID));
  // }, [dispatch, subzoneID]);

  // // const [zomatoStatus, setZomatoStatus] = useState(defaultValue?.zomoato_status ?? false);
  // // const [swiggyStatus, setSwiggyStatus] = useState(defaultValue?.swiggy_status ?? false);
  // // const [dotpeStatus, setDotpeStaus] = useState(defaultValue?.dotpe_status ?? false);

  // const handleOnChange = (e) => {
  //   if (e.target.name === 'zomoato_status') {
  //     if (e.target.value === 0) {
  //       setZomatoStatus(false);
  //     } else {
  //       setZomatoStatus(true);
  //     }
  //   }
  //   if (e.target.name === 'swiggy_status') {
  //     if (e.target.value === 0) {
  //       setSwiggyStatus(false);
  //     } else {
  //       setSwiggyStatus(true);
  //     }
  //   }

  //   if (e.target.name === 'dotpe_status') {
  //     if (e.target.value === 0) {
  //       setDotpeStaus(false);
  //     } else {
  //       setDotpeStaus(true);
  //     }
  //   }
  //   if (
  //     e.target.name === 'latitude' ||
  //     e.target.name === 'longitude' ||
  //     e.target.name === 'orl_cug_no' ||
  //     e.target.name === 'contact' ||
  //     e.target.name === 'order_placing_no' ||
  //     e.target.name === 'oulet_Code'
  //   ) {
  //     return form.setFieldsValue({
  //       [e.target.name]: e.target.value.replace(/[^0-9 ./]/g, '')
  //     });
  //   }
  //   return form.setFieldsValue({
  //     [e.target.name]: e.target.value
  //   });
  // };

  useEffect(() => {
    dispatch(getOutletMaster());
    dispatch(getEmployeeMaster());
  }, []);

  let userLog = parseInt(localStorage.getItem("type"));

  const {
    gettingOutletMaster,
    getEmployeeMappingResponse: { data: employeeMapping = [] },
    getOutletMasterResponse: { data: dataSource },
  } = useSelector((state) => {
    return state.master;
  });

  const {
    gettingEmployeMaster,
    getEmployeeMasterResponse: { data: dataExployeeSource },
  } = useSelector((state) => {
    return state.master;
  });

  const onFinishFailed = (errorInfo) => {
   
  };

  const uploadButton = (
    <Button
      style={{ display: "flex", direction: "row" }}
      icon={<PlusOutlined style={{ marginTop: "3px", marginRight: "4px" }} />}>
      <div
        style={{
          marginLeft: "3px",
        }}>
        Update Image
      </div>
    </Button>
  );

  // const dateFormat = ['DD/MM/YYYY', 'DD/MM/YY'];

  return (
    <>
      <Card>
        <Row>
          <Col span={24}>
            <Form
              name="basic"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              form={form}>
              <Row gutter={[15, 0]}>
                {userLog === 1 && (
                  <Col md={{ span: 6 }} xs={{ span: 24 }}>
                     <Form.Item name="outlet_Name" label="Outlet Name">
                    <Select
                      onSelect={(e) => {
                        let orl_emp_id = dataSource.find((e1) => e1?.id == e);

                        let emp_code = dataExployeeSource?.find(
                          (e) => e?.id == parseInt(orl_emp_id?.orl_id)
                        );                      
                        setEmpdate(emp_code?.employee_code);
                      }}>
                      {dataSource?.map((el) => (
                        <Option key={el?.id} value={el?.orl_emp_id}>
                          {el?.name}
                        </Option>
                      ))}
                    </Select>
                    </Form.Item>
                  </Col>
                )}
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item name="expense_date" label="Expense Date">
                    <Input
                      placeholder="Vani"
                      type="date"
                      name="ticketNo"
                      defaultValue={""}
                    />
                  </Form.Item>
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item name="expense_type" label="Expense Type">
                    <Select>
                      {expense?.length > 0 &&
                        expense?.map((e) => {
                          return <Option key=""
                          value={e?.name}>{e?.name}</Option>;
                        })}

                      {/* <Option>select</Option>
                      <Option>select</Option> */}
                    </Select>
                  </Form.Item>
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item name="amount" label="Amount">
                    <Input placeholder="" type="number" name="Amount" />
                  </Form.Item>
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item name="remarks" label="Remarks">
                    <Input placeholder="" name="Remarks" />
                  </Form.Item>
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item name="bill_copy" label="Bill Copy">
                    {/* <Input
                      placeholder=""
                      type="file"
                      name="Bill Copy"
                      accept="image/png, image/gif, image/jpeg"
                    /> */}
                    <MultiUploadButton
                      url={"ticket-imageupload"}
                      onSuccess={(files) => {
                        form.setFieldsValue({
                          bill_copy:
                            files?.map?.(
                              (file) =>
                                JSON.parse(
                                  file?.response?.filename ?? "['']"
                                )?.[0] ?? ""
                            ) ?? "",
                        });
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Row gutter={[15, 15]} style={{ justifyContent: "end" }}>
                    <Col
                      span={12}
                      style={{ textAlign: "right" }}
                      className="d-flex align-items-center justify-content-end mt-3">
                      <Form.Item className="mx-2">
                        <Button
                          className="orangeFactory"
                          type="primary"
                          htmlType="submit">
                          Submit
                        </Button>
                      </Form.Item>
                      {/* </Col>
                    <Col span={12}> */}
                      <Form.Item>
                        <Button
                          onClick={() => {
                            navigate("/pcclaimreqorl", {});
                          }}>
                          Back
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Card>
      {/* {state.current_status === 'open' ? <PcadvancereqmsOpen /> : <PcadvancereqmsAssign />} */}
    </>
  );
}

export default memo(PcclaimreqorlForm);
