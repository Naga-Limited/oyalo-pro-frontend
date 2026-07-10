/* eslint-disable no-unused-vars */
import {
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Button,
  Image,
  Descriptions,
  Modal,
} from "antd";
import React, { memo, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { getEmployeeMaster } from "../../../@app/master/masterSlice";
import {  map } from "ramda";
import { ConverToReactSelect } from "../../../util";
import {
  getAssetBasedOnORLMaster,
  getAssetGroupSpare,
  updateOHTicketHandling,
  updateTicketHandling,
} from "../../../@app/service/serviceSlice";
import { MultiUploadButton } from "../../../components/multiUploadButton/MultiUploadButton";
import messageToast from "../../../components/messageToast/messageToast";
import apis from "../../../api/stateAPI";
import TextArea from "antd/es/input/TextArea";

export const OPTIONS = {
  vendorType: [
    { value: "Internal", label: "Internal" },
    { value: "External", label: "External" },
  ],
  workdoneBy: [
    { value: "Service with spare", label: "Service with spare" },
    { value: "Service without spare", label: "Service without spare" },
  ],
  costInvolved: [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" },
  ],
  issueResolved: [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" },
  ],
  paymentMode: [
    { value: "Pettycash", label: "Pettycash" },
    { value: "Online", label: "Online" },
  ],
  quotation: [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" },
  ],
  advance: [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" },
  ],
  issueClosed: [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" },
  ],
};

function TicketHandlingForm() {
  const { Option } = Select;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    state: { data: defaultValue },
  } = useLocation();
  const {
    gettingEmployeMaster: gettingEmployeeList,
    getEmployeeMasterResponse: { data: employeeList },
    getEmployeeMasterResponse: { data: EmployeeList },
  } = useSelector((state) => {
    return state.master;
  });
  const [newEmployee, setNewEmployee] = useState( defaultValue.id ? defaultValue.employee_name : {});

  const {
    gettingAssetGroupSpare,
    getAssetGroupSpareResponse: { data: assetSpares },
    getAssetBaseOnORLResponse: { data: assetsByORLs },
  } = useSelector((state) => {
    return state.service;
  });
  const { updatingTicketHandling } = useSelector((state) => {
    return state.service;
  });

  const [form] = Form.useForm();
  const vendorType = Form.useWatch("vendor_type", form);
  const costInvolved = Form.useWatch("cost_involved", form);
  const po_number = Form.useWatch("po_number", form);
  const workdoneBy = Form.useWatch("workdone", form);
  const paymentMode = Form.useWatch("payment_mode", form);
  const quotation = Form.useWatch("quotation", form);
  const advance = Form.useWatch("advance", form);
  const advancePercentage = Form.useWatch("advance_percentage", form);
  const spendAmount = Form.useWatch("spend_amount", form);
  const [poNumber, setPoNumber] = useState("");

  const [employee, setEmployee] = useState(
    defaultValue.id ? defaultValue.employee_name : {}
  );
  const [state, updateState] = useState({
    isOpen: false,
    title: "Title",
    images: [],
  });

  const [poDetails, setPoDetails] = useState({});

  const openModal = (title, images = []) => {
    updateState({ ...state, title, isOpen: true, images });
  };

  // console.log(assetsByORLs, "assetsByORLs");

  const OHStatus =
    [
      "Waiting @ Vendor Advance",
      // "OH Rejected",
      "PO processed",
      "Waiting @ PO No",
      "Waiting @ Vendor Advance",
      "Waiting @ FI Doc No",
    ].includes(defaultValue.payment_status) ||
    ["Ticket Closed ORL"].includes(defaultValue.ticket_status);

  const OHRejected = ["OH Rejected"].includes(defaultValue.payment_status);

  // console.log(OHRejected, "OHRejected");

  const onFinish = (data) => {
   
    dispatch(
      updateTicketHandling({
        data: {
          ...data,
          covered_in_amc: "Auto",
          id: defaultValue?.id,
          employee_id: defaultValue.id || newEmployee,
          balance_amount: `${
            parseInt(data.spend_amount) - parseInt(data.advance)
          }`,
        },
      })
    ).then(({ message, status, statusText }) => {
      messageToast({
        message: message ?? statusText,
        status,
        title: "Ticket Updated",
      });
      if (status === 200) {
        form.resetFields();
        navigate("/handleTicket");
      }
    });
    //}
  };

  const canIshowIssueResolved = () => {
    if (
      costInvolved === OPTIONS.costInvolved[1].value ||
      defaultValue.service_for === "POS" ||
      defaultValue.payment_status === "PO processed" ||
      defaultValue.ticket_status === "Issue Resolved MS"
    ) {
      return true;
    }
    return false;
  };

  const canIshowIssueClosed = () => {
    if (
      costInvolved === OPTIONS.costInvolved[1].value &&
      paymentMode &&
      quotation === OPTIONS.quotation[0].value
    ) {
      return true;
    }
    return true;
  };

  const handleClickBack = () => {
    navigate(-1);
  };

  const giveMeEmployeeOptions = useCallback(() => {
    return ConverToReactSelect(employeeList, "id", "name");
  }, [employeeList]);

  const giveMeAdvanceAmount = () => {
    let spendAmount = form.getFieldValue("spend_amount") ?? 0;
    return spendAmount * (advancePercentage / 100);
  };

  const giveMeAssetSpares = useCallback(() => {
    //console.log(assetsByORLs, "assetsByORLs[0]");
    //return assetsByORLs[0]?.spare?.map((el) => el?.spare);
    //console.log(assetSpares,'assetSpares')
    // console.log(assetsByORLs[0], "assetsByORLs[0]");
    // let assetsByORLsdata = assetsByORLs[0]?.spare?.filter((e) => {
    //   return e?.spare;
    // });
    // console.log(assetsByORLsdata, "assetsByORLsdata");
    // return ConverToReactSelect(
    //   assetSpares?.filter(
    //     (_) =>
    //       defaultValue?.asset_group_details?.toString() ===
    //       _?.asset_group_id?.toString()
    //   )?.[0]?.assetspares,
    //   "name",
    //   "name"
    // );
    // eslint-disable-next-line
  }, [assetSpares]);

  useEffect(() => {
    if (vendorType === OPTIONS.vendorType[0].value && !employeeList?.length)
      dispatch(getEmployeeMaster());

    // eslint-disable-next-line
  }, [vendorType]);

  useEffect(() => {
    if (EmployeeList) {
        form.setFieldsValue({ emp_contact_no: EmployeeList?.contact });
        console.log(EmployeeList?.contact);
    }
}, [EmployeeList]);
  useEffect(() => {
    form.setFieldsValue({ advance_amount: giveMeAdvanceAmount() });
    // eslint-disable-next-line
  }, [advancePercentage, spendAmount]);

  useEffect(() => {
    if (workdoneBy === OPTIONS.workdoneBy[0].value && !assetSpares?.length)
      dispatch(getAssetGroupSpare());
    //console.log(defaultValue, "defaultValue");
    dispatch(
      getAssetBasedOnORLMaster({
        asset_groupid: defaultValue.asset_group_details,
        outlet_code: defaultValue.outlet_code,
      })
    );

    form.setFieldsValue({ covered_in_amc: "Auto" });
    // eslint-disable-next-line
  }, [workdoneBy]);

  const verifyPoNumber = (e) => {
    // console.log(poNumber, "po_number");

    if (!poNumber) {
      messageToast({
        message: "Enter PO Number",
        status: 400,
        title: "Ticket handling",
      });
      return;
    }
    let submitted = {
      po_number: poNumber,
    };

    apis.updatePoPayment(submitted).then((res) => {
      if (res.status === 200) {
        form.setFieldsValue({
          po_no: res?.data?.data[0]?.po_no,
          po_value: res?.data?.data[0]?.po_value,
          vendor_name_po: res?.data?.data[0]?.vendor_name_po,
        });
        messageToast({
          message: res?.data?.message ?? res?.data?.statusText,
          status: res?.data?.status,
          title: "Ticket handling",
        });
      } else {
        messageToast({
          message: res?.message ?? "Something went wrong",
          status: res?.data.status,
          title: "Ticket handling",
        });
      }
    });
  };

  return (
    <>
      <Card>
        <Descriptions title="Ticket Info" bordered size="small">       
          <Descriptions.Item label={"Outlet Name"}>
            {defaultValue?.outlet_name ?? "-"}
          </Descriptions.Item>
          <Descriptions.Item label={"Ticket No"}>
            {defaultValue?.old_ticket_no
              ? defaultValue?.old_ticket_no
              : defaultValue.ticket_no}
          </Descriptions.Item>
          <Descriptions.Item label={"Ticket Description"}>
            {defaultValue?.problem_description ?? "-"}
          </Descriptions.Item>
          <Descriptions.Item label={"Service For"}>
            {defaultValue.service_for}
          </Descriptions.Item>
          <Descriptions.Item label={"Asset Group"}>
            {defaultValue?.asset_group ?? "-"}
          </Descriptions.Item>
          <Descriptions.Item label={"Asset"}>
            {defaultValue?.asset_details ?? "-"}
          </Descriptions.Item>
          <Descriptions.Item label={"ORL Name"}>
            {defaultValue?.orl_name ?? "-"}
          </Descriptions.Item>
          <Descriptions.Item label={"ORL Number"}>
            {defaultValue.contact_no}
          </Descriptions.Item>
          <Descriptions.Item label={"Assigned To"}>
            {defaultValue.assigned_to}
          </Descriptions.Item>
          <Descriptions.Item label={"Contact No"}>
            {defaultValue.phone_no}
          </Descriptions.Item>
          <Descriptions.Item label={"Attachement"}>
            {defaultValue.attachments === "[]" ? (
              "-"
            ) : (
              <Button
                type="link"
                color="primary"
                onClick={() =>
                  openModal(
                    "Ticket Attachement",
                    typeof defaultValue.attachments !== "string"
                      ? defaultValue?.attachments
                      : []
                  )
                }>
                View
              </Button>
            )}
          </Descriptions.Item>
        </Descriptions>
      </Card>
      {defaultValue?.ticket_details.length > 0 &&
        defaultValue?.ticket_details?.map((e) => {
          if (e?.ticket_no != defaultValue.ticket_no) {
            return (
              <Card key={e?.ticket_no} style={{ marginTop: "8px" }}>
                <Row>
                  <Col span={24}>
                    <Form
                      name="update_ticket_handling"
                      labelCol={{ span: 24 }}
                      wrapperCol={{ span: 24 }}
                      onFinish={onFinish}
                      autoComplete="off"
                      initialValues={{
                        ...defaultValue,
                        vendor_type: e?.vendor_type,
                        employee_id: parseInt(e?.employee_id),

                        emp_contact_no: e?.emp_contact_id,
                        vendor_name: e?.vendor_name,
                        vendor_contact_no: e?.vendor_contact_no,
                        workdone: e?.workdone,
                        spare_id: e?.spare_id,
                        covered_in_amc: e?.covered_in_amc,
                        cost_involved: e?.cost_involved,
                        issue_closed: e?.issue_closed,
                        issues_solved: e?.issue_solved,
                      }}
                      setFieldsValue={{
                        vendor_name_po:
                          e?.vendor_name_po || poDetails?.vendor_name_po,
                        po_value: e?.po_value || poDetails?.po_value,
                      }}>
                      {/* Vendor Type */}
                      <Row gutter={[15, 0]}>
                        {e?.vendor_type && (
                          <Col md={{ span: 6 }} xs={{ span: 24 }}>
                            <Form.Item
                              name="vendor_type"
                              label="Vendor Type"
                              rules={[
                                {
                                  required: true,
                                  message: "Please select vendor type",
                                },
                              ]}>
                              <Select
                                allowClear
                                disabled={true}
                                placeholder="Select Vendor Type"
                                options={OPTIONS.vendorType}
                              />
                            </Form.Item>
                          </Col>
                        )}

                        {/* Vendor Details */}
                        {/* If Vendor Type is Internal */}

                        <>
                          {/* Employee Name */}
                          {e?.employee_id && (
                            <Col md={{ span: 6 }} xs={{ span: 24 }}>
                              {/* <Form.Item
                                name="employee_id"
                                label="Employee Name"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please select employee name",
                                  },
                                ]}> */}
                                {/* <Select
                                  allowClear
                                  showSearch
                                  loading={gettingEmployeeList}
                                  placeholder="Select Employee Name"
                                  options={giveMeEmployeeOptions()}
                                  onChange={(value, option) => {
                                    setEmployee(option);
                                  }}
                                  defaultValue={e?.employee_id}
                                  disabled={true}
                                /> */}
                              {/* </Form.Item> */}
                            </Col>
                          )}
                          {/* Employee Mobile */}
                          {e?.emp_contact_id && (
                            <Col md={{ span: 6 }} xs={{ span: 24 }}>
                              <Form.Item
                                name="emp_contact_no"
                                label="Contact No.">
                                <Input
                                  placeholder="Enter contact no"
                                  name="emp_contact_no"
                                  disabled={true}
                                />
                              </Form.Item>
                            </Col>
                          )}
                        </>
                        {/* )} */}

                        {/* If Vendot Type is External */}
                        {/* {vendorType === OPTIONS.vendorType[1].value && ( */}
                        <>
                          {/* Vendor Name */}
                          {e?.vendor_name && (
                            <Col md={{ span: 6 }} xs={{ span: 24 }}>
                              <Form.Item
                                name="vendor_name"
                                label="Vendor Name"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please enter vendor name",
                                  },
                                ]}>
                                <Input
                                  disabled={true}
                                  placeholder="Enter Vendor Name"
                                  name="vendor_name"
                                  readOnly
                                />
                              </Form.Item>
                            </Col>
                          )}
                          {/* Vendor Mobile */}
                          {e?.vendor_contact_no && (
                            <Col md={{ span: 6 }} xs={{ span: 24 }}>
                              <Form.Item
                                name="vendor_contact_no"
                                label="Contact No.">
                                <Input
                                  disabled={true}
                                  placeholder="Enter contact no"
                                  name="vendor_contact_no"
                                />
                              </Form.Item>
                            </Col>
                          )}
                        </>
                        {/* )} */}

                        {/* Workdone */}
                        {/* {defaultValue.service_for !== "POS" && ( */}
                        {e?.workdone && (
                          <Col md={{ span: 6 }} xs={{ span: 24 }}>
                            <Form.Item name="workdone" label="Workdone By">
                              <Select
                                allowClear
                                disabled={true}
                                placeholder="Select Workdone"
                                options={OPTIONS.workdoneBy}
                              />
                            </Form.Item>
                          </Col>
                        )}
                        {/* )} */}

                        {/* If Workdone By is Service with Spare */}
                        {/* {workdoneBy === OPTIONS.workdoneBy[0].value && ( */}
                        <>
                          {/* Spare */}
                          {e?.spare_id && (
                            <Col md={{ span: 6 }} xs={{ span: 24 }}>
                              <Form.Item name="spare_id" label="Spare">
                                <Select
                                  allowClear
                                  disabled={true}
                                  //loading={gettingAssetGroupSpare}
                                  placeholder="Select"
                                  //options={giveMeAssetSpares()}
                                >
                                  {assetsByORLs &&
                                    assetsByORLs[0] &&
                                    assetsByORLs[0]?.spare?.length > 0 &&
                                    assetsByORLs[0]?.spare?.map((el) => (
                                      <Option key={el?.spare} value={el?.spare}>
                                        {el?.spare}
                                      </Option>
                                    ))}
                                </Select>
                              </Form.Item>
                            </Col>
                          )}

                          {/* Covered in AMC */}
                          {e?.covered_in_amc && (
                            <Col md={{ span: 6 }} xs={{ span: 24 }}>
                              <Form.Item
                                name="covered_in_amc"
                                disabled={true}
                                label="Covered in AMC">
                                <Input
                                  disabled
                                  placeholder="Enter"
                                  name="covered_in_amc"
                                />
                              </Form.Item>
                            </Col>
                          )}

                          {/* Spare Upload */}
                          {/* Existing Spare Photo */}
                          {e?.existing_photo && (
                            <Col md={{ span: 6 }} xs={{ span: 24 }}>
                              <Form.Item
                                name="existing_photo"
                                label="Existing Spare Photo">
                                <Row>
                                  <Col>
                                    {!OHStatus && (
                                      <MultiUploadButton
                                        url={"ticket-imageupload"}
                                        disabled={true}
                                        onSuccess={(files) => {
                                          form.setFieldsValue({
                                            existing_photo:
                                              files?.map?.(
                                                (file) =>
                                                  JSON.parse(
                                                    file?.response?.filename ??
                                                      "['']"
                                                  )?.[0] ?? ""
                                              ) ?? "",
                                          });
                                        }}
                                      />
                                    )}
                                  </Col>
                                  <Col>
                                    <Button
                                      type="link"
                                      color="primary"
                                      onClick={() =>
                                        openModal(
                                          "Existing Spare Photo",
                                          typeof defaultValue.existing_photo !==
                                            "string"
                                            ? defaultValue?.existing_photo
                                            : []
                                        )
                                      }>
                                      View
                                    </Button>
                                  </Col>
                                </Row>
                              </Form.Item>
                            </Col>
                          )}

                          {/* New Spare Photo */}
                          {e?.new_photo && (
                            <Col md={{ span: 6 }} xs={{ span: 24 }}>
                              <Form.Item
                                name="new_photo"
                                label="New Spare Photo">
                                <Row>
                                  <Col>
                                    {!OHStatus && (
                                      <MultiUploadButton
                                        url={"ticket-imageupload"}
                                        disabled={true}
                                        onSuccess={(files) => {
                                          form.setFieldsValue({
                                            new_photo:
                                              files?.map?.(
                                                (file) =>
                                                  JSON.parse(
                                                    file?.response?.filename ??
                                                      "['']"
                                                  )?.[0] ?? ""
                                              ) ?? "",
                                          });
                                        }}
                                      />
                                    )}
                                  </Col>
                                  <Col>
                                    <Button
                                      type="link"
                                      color="primary"
                                      onClick={() =>
                                        openModal(
                                          "New Spare Photo",
                                          typeof defaultValue.new_photo !==
                                            "string"
                                            ? defaultValue?.new_photo
                                            : []
                                        )
                                      }>
                                      View
                                    </Button>
                                  </Col>
                                </Row>
                              </Form.Item>
                            </Col>
                          )}

                          {/* Document Copy */}
                          {e.document_copy && (
                            <Col md={{ span: 6 }} xs={{ span: 24 }}>
                              <Form.Item
                                name="document_copy"
                                label="Document Copy">
                                <Row>
                                  <Col>
                                    {!OHStatus && (
                                      <MultiUploadButton
                                        url={"ticket-imageupload"}
                                        disabled={true}
                                        onSuccess={(files) => {
                                          form.setFieldsValue({
                                            document_copy:
                                              files?.map?.(
                                                (file) =>
                                                  JSON.parse(
                                                    file?.response?.filename ??
                                                      "['']"
                                                  )?.[0] ?? ""
                                              ) ?? "",
                                          });
                                        }}
                                      />
                                    )}
                                  </Col>
                                  <Col>
                                    <Button
                                      type="link"
                                      color="primary"
                                      onClick={() =>
                                        openModal(
                                          "New Spare Photo",
                                          typeof defaultValue.document_copy !==
                                            "string"
                                            ? defaultValue?.document_copy
                                            : []
                                        )
                                      }>
                                      View
                                    </Button>
                                  </Col>
                                </Row>
                              </Form.Item>
                            </Col>
                          )}

                          {/* Tentative Date */}
                          {e?.tentative_date && (
                            <Col md={{ span: 6 }} xs={{ span: 24 }}>
                              <Form.Item
                                name="tentative_date"
                                label="Tentative Date">
                                <Input
                                  disabled={true}
                                  type="date"
                                  placeholder="Select"
                                  name="tentative_date"
                                />
                              </Form.Item>
                            </Col>
                          )}
                        </>
                        {/* )} */}

                        {/* Cost Involved */}
                        {/* {defaultValue.service_for !== "POS" && ( */}
                        {e?.cost_involved && (
                          <Col md={{ span: 6 }} xs={{ span: 24 }}>
                            <Form.Item
                              name="cost_involved"
                              label="Cost Involved">
                              <Select
                                allowClear
                                disabled={true}
                                placeholder="Select"
                                options={OPTIONS.costInvolved}
                              />
                            </Form.Item>
                          </Col>
                        )}
                        {/* )} */}

                        {/* If Cost Involved is Yes */}
                        {/* {costInvolved === OPTIONS.costInvolved[0].value && ( */}
                        <>
                          {/* Mode of Payment */}
                          {e?.payment_mode && (
                            <Col md={{ span: 6 }} xs={{ span: 24 }}>
                              <Form.Item
                                name="payment_mode"
                                label="Mode of Payment">
                                <Select
                                  allowClear
                                  disabled={true}
                                  placeholder="Select"
                                  options={OPTIONS.paymentMode}
                                />
                              </Form.Item>
                            </Col>
                          )}

                          {/* Quotation */}
                          {/* {paymentMode && ( */}
                          <>
                            {e?.quotation && (
                              <Col md={{ span: 6 }} xs={{ span: 24 }}>
                                <Form.Item name="quotation" label="Quotation">
                                  <Select
                                    allowClear
                                    disabled={true}
                                    placeholder="Select"
                                    options={OPTIONS.quotation}
                                  />
                                </Form.Item>
                              </Col>
                            )}

                            {/* Estimated Amount */}
                            {e?.spend_amount && (
                              <Col md={{ span: 6 }} xs={{ span: 24 }}>
                                <Form.Item
                                  name="spend_amount"
                                  label="Estimated Amount Rs"
                                  rules={[
                                    {
                                      required: true,
                                      message:
                                        "Please enter Estimated Amount rupees",
                                    },
                                  ]}>
                                  <Input
                                    min={0}
                                    disabled={true}
                                    type="number"
                                    placeholder="Enter"
                                    name="spend_amount"
                                  />
                                </Form.Item>
                              </Col>
                            )}
                          </>
                          {/* )} */}

                          {/* If Mode of Payment is Pettycash */}
                          {/* {paymentMode && ( */}
                          <>
                            {/* If Quotation is Yes */}
                            {/* {quotation === OPTIONS.quotation[0].value && ( */}
                            <>
                              {/* Quotation Number */}
                              {e?.quotation_no && (
                                <Col
                                  md={{ span: 6 }}
                                  xs={{ span: 24 }}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please enter quotation number",
                                    },
                                  ]}>
                                  <Form.Item
                                    name="quotation_no"
                                    label="Quotation No">
                                    <Input
                                      disabled={true}
                                      placeholder="Enter"
                                      name="quotation_no"
                                    />
                                  </Form.Item>
                                </Col>
                              )}
                            </>
                            {/* // )} */}
                          </>
                          {/* )} */}

                          {/* If Mode of Payment is Online */}
                          {/* {paymentMode === OPTIONS.paymentMode[1].value && ( */}
                          <>
                            {/* Advance */}
                            {e?.advance && (
                              <Col md={{ span: 6 }} xs={{ span: 24 }}>
                                <Form.Item name="advance" label="Advance">
                                  <Select
                                    allowClear
                                    disabled={true}
                                    placeholder="Select"
                                    options={OPTIONS.advance}
                                  />
                                </Form.Item>
                              </Col>
                            )}

                            {/* If Advance is yes */}
                            {/* {advance === OPTIONS.advance[0].value && ( */}
                            <>
                              {/* Advance Percentage */}
                              {e?.advance_percentage && (
                                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                                  <Form.Item
                                    name="advance_percentage"
                                    label="Advance Percentage">
                                    <Input
                                      min={0}
                                      type="number"
                                      disabled={true}
                                      placeholder="Enter"
                                      name="advance_percentage"
                                    />
                                  </Form.Item>
                                </Col>
                              )}

                              {/* Advance Amount */}
                              {e?.advance_amount && (
                                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                                  <Form.Item
                                    name="advance_amount"
                                    label="Advance Amount">
                                    <Input
                                      min={0}
                                      type="number"
                                      disabled={true}
                                      placeholder="Enter"
                                      name="advance_amount"
                                    />
                                  </Form.Item>
                                </Col>
                              )}
                            </>
                            {/* )} */}
                          </>
                          {/* )} */}
                        </>

                        {/* PO Details */}

                        <>
                          {/* PO No */}
                          {e?.po_no && (
                            <Col md={{ span: 6 }} xs={{ span: 24 }}>
                              <Form.Item name="po_no" label="PO No">
                                <Input
                                  placeholder="Enter"
                                  disabled={true}
                                  name="po_no"
                                />
                              </Form.Item>
                            </Col>
                          )}

                          {/* Vendor Name */}
                          {e?.vendor_name_po && (
                            <Col md={{ span: 6 }} xs={{ span: 24 }}>
                              <Form.Item
                                name="vendor_name_po"
                                label="Vendor Name">
                                <Input
                                  placeholder="Enter"
                                  disabled={true}
                                  name="vendor_name_po"
                                />
                              </Form.Item>
                            </Col>
                          )}

                          {/* PO Value */}
                          {e?.po_value && (
                            <Col md={{ span: 6 }} xs={{ span: 24 }}>
                              <Form.Item name="po_value" label="PO Value">
                                <Input
                                  min={0}
                                  type="number"
                                  disabled={true}
                                  placeholder="Enter"
                                  name="po_value"
                                />
                              </Form.Item>
                            </Col>
                          )}

                          {/* Advance Paid */}
                          {e?.advance &&
                            e.advance === OPTIONS.advance[0].value && (
                              <Col md={{ span: 6 }} xs={{ span: 24 }}>
                                <Form.Item
                                  name="advance_paid"
                                  label="Advance Paid">
                                  <Select
                                    allowClear
                                    placeholder="Select"
                                    options={OPTIONS.issueClosed}
                                    disabled={true}
                                  />
                                </Form.Item>
                              </Col>
                            )}

                          {/* PO Copy */}
                          {e?.po_copy && (
                            <Col md={{ span: 6 }} xs={{ span: 24 }}>
                              <Form.Item name="po_copy" label="PO Copy">
                                <Row>
                                  <Col>
                                    {defaultValue.ticket_status !==
                                      "Ticket Closed ORL" && (
                                      <MultiUploadButton
                                        url={"ticket-imageupload"}
                                        disabled={true}
                                        onSuccess={(files) => {
                                          form.setFieldsValue({
                                            po_copy:
                                              files?.map?.(
                                                (file) =>
                                                  JSON.parse(
                                                    file?.response?.filename ??
                                                      "['']"
                                                  )?.[0] ?? ""
                                              ) ?? "",
                                          });
                                        }}
                                      />
                                    )}
                                  </Col>
                                  <Col>
                                    <Button
                                      type="link"
                                      color="primary"
                                      onClick={() =>
                                        openModal(
                                          "Document Copy",
                                          typeof defaultValue.po_copy !==
                                            "string"
                                            ? defaultValue?.po_copy
                                            : []
                                        )
                                      }>
                                      View
                                    </Button>
                                  </Col>
                                </Row>
                              </Form.Item>
                            </Col>
                          )}
                        </>

                        {/* Issue Closed */}
                        {/* {canIshowIssueClosed() && false && ( */}
                        {e?.issue_closed && (
                          <Col md={{ span: 6 }} xs={{ span: 24 }}>
                            <Form.Item name="issue_closed" label="Issue Closed">
                              <Select
                                disabled={true}
                                allowClear
                                placeholder="Select"
                                options={OPTIONS.issueClosed}
                              />
                            </Form.Item>
                          </Col>
                        )}
                        {/* )} */}

                        {/* Issue Resolved */}
                        {/* {canIshowIssueResolved() && ( */}
                        {/* {e?.issues_solved && (
                      <Col md={{ span: 6 }} xs={{ span: 24 }}>
                        <Form.Item name="issues_solved" label="Issue Resolved">
                          <Select
                            disabled={true}
                            allowClear
                            placeholder="Select"
                            options={OPTIONS.issueResolved}
                          />
                        </Form.Item>
                      </Col>
                    )} */}
                        {/* )} */}
                      </Row>
                      {/* <Row gutter={[15, 0]}>
                    <Col span={24}>
                      <Row gutter={[15, 15]} style={{ justifyContent: "end" }}>
                        <Col
                          span={12}
                          style={{ textAlign: "right" }}
                          className="d-flex align-items-center justify-content-end mt-3">
                          {defaultValue.ticket_status !==
                            "Ticket Closed ORL" && (
                            <Form.Item className="mx-2">
                              <Button
                                loading={updatingTicketHandling}
                                disabled={updatingTicketHandling}
                                className="orangeFactory"
                                type="primary"
                                htmlType="submit">
                                {"Update"}
                              </Button>
                            </Form.Item>
                          )}

                          <Form.Item>
                            <Button
                              disabled={updatingTicketHandling}
                              onClick={handleClickBack}>
                              Back
                            </Button>
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                  </Row> */}
                    </Form>
                  </Col>
                </Row>
              </Card>
            );
          }
        })}
      {defaultValue?.ticket_history?.map((e) => {
        return (
          <Card key={e?.ticket_no} style={{ marginTop: "8px" }}>
            <Row>
              <Col span={24}>
                <Form
                  name="update_ticket_handling"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  onFinish={onFinish}
                  autoComplete="off"
                  initialValues={{
                    ...defaultValue,
                    vendor_type: e?.vendor_type,
                    employee_id: e?.employee_id,

                    emp_contact_no: e?.emp_contact_id,
                    vendor_name: e?.vendor_name,
                    vendor_contact_no: e?.vendor_contact_no,
                    workdone: e?.workdone,
                    spare_id: e?.spare_id,
                    covered_in_amc: e?.covered_in_amc,
                    cost_involved: e?.cost_involved,
                    issue_closed: e?.issue_closed,
                    issues_solved: e?.issue_solved,
                  }}
                  setFieldsValue={{
                    vendor_name_po:
                      e?.vendor_name_po || poDetails?.vendor_name_po,
                    po_value: e?.po_value || poDetails?.po_value,
                  }}>
                  {/* Vendor Type */}
                  <Row gutter={[15, 0]}>
                    {e?.vendor_type && (
                      <Col md={{ span: 6 }} xs={{ span: 24 }}>
                        <Form.Item
                          name="vendor_type"
                          label="Vendor Type"
                          rules={[
                            {
                              required: true,
                              message: "Please select vendor type",
                            },
                          ]}>
                          <Select
                            allowClear
                            disabled={true}
                            placeholder="Select Vendor Type"
                            options={OPTIONS.vendorType}
                          />
                        </Form.Item>
                      </Col>
                    )}

                    {/* Vendor Details */}
                    {/* If Vendor Type is Internal */}

                    <>
                      {/* Employee Name */}
                      {e?.employee_id && (
                        <Col md={{ span: 6 }} xs={{ span: 24 }}>
                          <Form.Item
                            name="employee_id"
                            label="Employee Name"
                            rules={[
                              {
                                required: true,
                                message: "Please select employee name",
                              },
                            ]}>
                            <Select
                              allowClear
                              loading={gettingEmployeeList}
                              placeholder="Select Employee Name"
                              options={giveMeEmployeeOptions()}
                              onChange={(value, option) => {
                                setEmployee(option);
                              }}
                              defaultValue={e?.employee_id}
                              disabled={true}
                            />
                          </Form.Item>
                        </Col>
                      )}
                      {/* Employee Mobile */}
                      {e?.emp_contact_id && (
                        <Col md={{ span: 6 }} xs={{ span: 24 }}>
                          <Form.Item name="emp_contact_no" label="Contact No.">
                            <Input
                              placeholder="Enter contact no"
                              name="emp_contact_no"
                              disabled={true}
                            />
                          </Form.Item>
                        </Col>
                      )}
                    </>
                    {/* )} */}

                    {/* If Vendot Type is External */}
                    {/* {vendorType === OPTIONS.vendorType[1].value && ( */}
                    <>
                      {/* Vendor Name */}
                      {e?.vendor_name && (
                        <Col md={{ span: 6 }} xs={{ span: 24 }}>
                          <Form.Item
                            name="vendor_name"
                            label="Vendor Name"
                            rules={[
                              {
                                required: true,
                                message: "Please enter vendor name",
                              },
                            ]}>
                            <Input
                              disabled={true}
                              placeholder="Enter Vendor Name"
                              name="vendor_name"
                              readOnly
                            />
                          </Form.Item>
                        </Col>
                      )}
                      {/* Vendor Mobile */}
                      {e?.vendor_contact_no && (
                        <Col md={{ span: 6 }} xs={{ span: 24 }}>
                          <Form.Item
                            name="vendor_contact_no"
                            label="Contact No.">
                            <Input
                              disabled={true}
                              placeholder="Enter contact no"
                              name="vendor_contact_no"
                            />
                          </Form.Item>
                        </Col>
                      )}
                    </>
                    {/* )} */}

                    {/* Workdone */}
                    {/* {defaultValue.service_for !== "POS" && ( */}
                    {e?.workdone && (
                      <Col md={{ span: 6 }} xs={{ span: 24 }}>
                        <Form.Item name="workdone" label="Workdone By">
                          <Select
                            allowClear
                            disabled={true}
                            placeholder="Select Workdone"
                            options={OPTIONS.workdoneBy}
                          />
                        </Form.Item>
                      </Col>
                    )}
                    {/* )} */}

                    {/* If Workdone By is Service with Spare */}
                    {/* {workdoneBy === OPTIONS.workdoneBy[0].value && ( */}
                    <>
                      {/* Spare */}
                      {e?.spare_id && (
                        <Col md={{ span: 6 }} xs={{ span: 24 }}>
                          <Form.Item name="spare_id" label="Spare">
                            <Select
                              allowClear
                              disabled={true}
                              //loading={gettingAssetGroupSpare}
                              placeholder="Select"
                              //options={giveMeAssetSpares()}
                            >
                              {assetsByORLs &&
                                assetsByORLs[0] &&
                                assetsByORLs[0]?.spare?.length > 0 &&
                                assetsByORLs[0]?.spare?.map((el) => (
                                  <Option key={el?.spare} value={el?.spare}>
                                    {el?.spare}
                                  </Option>
                                ))}
                            </Select>
                          </Form.Item>
                        </Col>
                      )}

                      {/* Covered in AMC */}
                      {e?.covered_in_amc && (
                        <Col md={{ span: 6 }} xs={{ span: 24 }}>
                          <Form.Item
                            name="covered_in_amc"
                            disabled={true}
                            label="Covered in AMC">
                            <Input
                              disabled
                              placeholder="Enter"
                              name="covered_in_amc"
                            />
                          </Form.Item>
                        </Col>
                      )}

                      {/* Spare Upload */}
                      {/* Existing Spare Photo */}
                      {e?.existing_photo && (
                        <Col md={{ span: 6 }} xs={{ span: 24 }}>
                          <Form.Item
                            name="existing_photo"
                            label="Existing Spare Photo">
                            <Row>
                              <Col>
                                {!OHStatus && (
                                  <MultiUploadButton
                                    url={"ticket-imageupload"}
                                    disabled={true}
                                    onSuccess={(files) => {
                                      form.setFieldsValue({
                                        existing_photo:
                                          files?.map?.(
                                            (file) =>
                                              JSON.parse(
                                                file?.response?.filename ??
                                                  "['']"
                                              )?.[0] ?? ""
                                          ) ?? "",
                                      });
                                    }}
                                  />
                                )}
                              </Col>
                              <Col>
                                <Button
                                  type="link"
                                  color="primary"
                                  onClick={() =>
                                    openModal(
                                      "Existing Spare Photo",
                                      typeof defaultValue.existing_photo !==
                                        "string"
                                        ? defaultValue?.existing_photo
                                        : []
                                    )
                                  }>
                                  View
                                </Button>
                              </Col>
                            </Row>
                          </Form.Item>
                        </Col>
                      )}

                      {/* New Spare Photo */}
                      {e?.new_photo && (
                        <Col md={{ span: 6 }} xs={{ span: 24 }}>
                          <Form.Item name="new_photo" label="New Spare Photo">
                            <Row>
                              <Col>
                                {!OHStatus && (
                                  <MultiUploadButton
                                    url={"ticket-imageupload"}
                                    disabled={true}
                                    onSuccess={(files) => {
                                      form.setFieldsValue({
                                        new_photo:
                                          files?.map?.(
                                            (file) =>
                                              JSON.parse(
                                                file?.response?.filename ??
                                                  "['']"
                                              )?.[0] ?? ""
                                          ) ?? "",
                                      });
                                    }}
                                  />
                                )}
                              </Col>
                              <Col>
                                <Button
                                  type="link"
                                  color="primary"
                                  onClick={() =>
                                    openModal(
                                      "New Spare Photo",
                                      typeof defaultValue.new_photo !== "string"
                                        ? defaultValue?.new_photo
                                        : []
                                    )
                                  }>
                                  View
                                </Button>
                              </Col>
                            </Row>
                          </Form.Item>
                        </Col>
                      )}

                      {/* Document Copy */}
                      {e.document_copy && (
                        <Col md={{ span: 6 }} xs={{ span: 24 }}>
                          <Form.Item name="document_copy" label="Document Copy">
                            <Row>
                              <Col>
                                {!OHStatus && (
                                  <MultiUploadButton
                                    url={"ticket-imageupload"}
                                    disabled={true}
                                    onSuccess={(files) => {
                                      form.setFieldsValue({
                                        document_copy:
                                          files?.map?.(
                                            (file) =>
                                              JSON.parse(
                                                file?.response?.filename ??
                                                  "['']"
                                              )?.[0] ?? ""
                                          ) ?? "",
                                      });
                                    }}
                                  />
                                )}
                              </Col>
                              <Col>
                                <Button
                                  type="link"
                                  color="primary"
                                  onClick={() =>
                                    openModal(
                                      "New Spare Photo",
                                      typeof defaultValue.document_copy !==
                                        "string"
                                        ? defaultValue?.document_copy
                                        : []
                                    )
                                  }>
                                  View
                                </Button>
                              </Col>
                            </Row>
                          </Form.Item>
                        </Col>
                      )}

                      {/* Tentative Date */}
                      {e?.tentative_date && (
                        <Col md={{ span: 6 }} xs={{ span: 24 }}>
                          <Form.Item
                            name="tentative_date"
                            label="Tentative Date">
                            <Input
                              disabled={true}
                              type="date"
                              placeholder="Select"
                              name="tentative_date"
                            />
                          </Form.Item>
                        </Col>
                      )}
                    </>
                    {/* )} */}

                    {/* Cost Involved */}
                    {/* {defaultValue.service_for !== "POS" && ( */}
                    {e?.cost_involved && (
                      <Col md={{ span: 6 }} xs={{ span: 24 }}>
                        <Form.Item name="cost_involved" label="Cost Involved">
                          <Select
                            allowClear
                            disabled={true}
                            placeholder="Select"
                            options={OPTIONS.costInvolved}
                          />
                        </Form.Item>
                      </Col>
                    )}
                    {/* )} */}

                    {/* If Cost Involved is Yes */}
                    {/* {costInvolved === OPTIONS.costInvolved[0].value && ( */}
                    <>
                      {/* Mode of Payment */}
                      {e?.payment_mode && (
                        <Col md={{ span: 6 }} xs={{ span: 24 }}>
                          <Form.Item
                            name="payment_mode"
                            label="Mode of Payment">
                            <Select
                              allowClear
                              disabled={true}
                              placeholder="Select"
                              options={OPTIONS.paymentMode}
                            />
                          </Form.Item>
                        </Col>
                      )}

                      {/* Quotation */}
                      {/* {paymentMode && ( */}
                      <>
                        {e?.quotation && (
                          <Col md={{ span: 6 }} xs={{ span: 24 }}>
                            <Form.Item name="quotation" label="Quotation">
                              <Select
                                allowClear
                                disabled={true}
                                placeholder="Select"
                                options={OPTIONS.quotation}
                              />
                            </Form.Item>
                          </Col>
                        )}

                        {/* Estimated Amount */}
                        {e?.spend_amount && (
                          <Col md={{ span: 6 }} xs={{ span: 24 }}>
                            <Form.Item
                              name="spend_amount"
                              label="Estimated Amount Rs"
                              rules={[
                                {
                                  required: true,
                                  message:
                                    "Please enter Estimated Amount rupees",
                                },
                              ]}>
                              <Input
                                min={0}
                                disabled={true}
                                type="number"
                                placeholder="Enter"
                                name="spend_amount"
                              />
                            </Form.Item>
                          </Col>
                        )}
                      </>
                      {/* )} */}

                      {/* If Mode of Payment is Pettycash */}
                      {/* {paymentMode && ( */}
                      <>
                        {/* If Quotation is Yes */}
                        {/* {quotation === OPTIONS.quotation[0].value && ( */}
                        <>
                          {/* Quotation Number */}
                          {e?.quotation_no && (
                            <Col
                              md={{ span: 6 }}
                              xs={{ span: 24 }}
                              rules={[
                                {
                                  required: true,
                                  message: "Please enter quotation number",
                                },
                              ]}>
                              <Form.Item
                                name="quotation_no"
                                label="Quotation No">
                                <Input
                                  disabled={true}
                                  placeholder="Enter"
                                  name="quotation_no"
                                />
                              </Form.Item>
                            </Col>
                          )}

                          {/* Quotation Copy */}
                          <Col md={{ span: 6 }} xs={{ span: 24 }}>
                            <Form.Item
                              name="quotation_copy"
                              label="Quotation Copy">
                              {!OHStatus && (
                                <MultiUploadButton
                                  url={"ticket-imageupload"}
                                  disabled={true}
                                  onSuccess={(files) => {
                                    form.setFieldsValue({
                                      quotation_copy:
                                        files?.map?.(
                                          (file) =>
                                            JSON.parse(
                                              file?.response?.filename ?? "['']"
                                            )?.[0] ?? ""
                                        ) ?? "",
                                    });
                                  }}
                                />
                              )}
                              <Image.PreviewGroup>
                                {form
                                  .getFieldValue("quotation_copy")
                                  ?.map((_) => (
                                    <Image
                                    key=""
                                      width={200}
                                      src={`${defaultValue.pathfor_attachments}/${_}`}
                                    />
                                  ))}
                              </Image.PreviewGroup>
                            </Form.Item>
                          </Col>
                        </>
                        {/* // )} */}
                      </>
                      {/* )} */}

                      {/* If Mode of Payment is Online */}
                      {/* {paymentMode === OPTIONS.paymentMode[1].value && ( */}
                      <>
                        {/* Advance */}
                        {e?.advance && (
                          <Col md={{ span: 6 }} xs={{ span: 24 }}>
                            <Form.Item name="advance" label="Advance">
                              <Select
                                allowClear
                                disabled={true}
                                placeholder="Select"
                                options={OPTIONS.advance}
                              />
                            </Form.Item>
                          </Col>
                        )}

                        {/* If Advance is yes */}
                        {/* {advance === OPTIONS.advance[0].value && ( */}
                        <>
                          {/* Advance Percentage */}
                          {e?.advance_percentage && (
                            <Col md={{ span: 6 }} xs={{ span: 24 }}>
                              <Form.Item
                                name="advance_percentage"
                                label="Advance Percentage">
                                <Input
                                  min={0}
                                  type="number"
                                  disabled={true}
                                  placeholder="Enter"
                                  name="advance_percentage"
                                />
                              </Form.Item>
                            </Col>
                          )}

                          {/* Advance Amount */}
                          {e?.advance_amount && (
                            <Col md={{ span: 6 }} xs={{ span: 24 }}>
                              <Form.Item
                                name="advance_amount"
                                label="Advance Amount">
                                <Input
                                  min={0}
                                  type="number"
                                  disabled={true}
                                  placeholder="Enter"
                                  name="advance_amount"
                                />
                              </Form.Item>
                            </Col>
                          )}
                        </>
                        {/* )} */}
                      </>
                      {/* )} */}
                    </>

                    {/* PO Details */}

                    <>
                      {/* PO No */}
                      {e?.po_no && (
                        <Col md={{ span: 6 }} xs={{ span: 24 }}>
                          <Form.Item name="po_no" label="PO No">
                            <Input
                              placeholder="Enter"
                              disabled={true}
                              name="po_no"
                            />
                          </Form.Item>
                        </Col>
                      )}

                      {/* Vendor Name */}
                      {e?.vendor_name_po && (
                        <Col md={{ span: 6 }} xs={{ span: 24 }}>
                          <Form.Item name="vendor_name_po" label="Vendor Name">
                            <Input
                              placeholder="Enter"
                              disabled={true}
                              name="vendor_name_po"
                            />
                          </Form.Item>
                        </Col>
                      )}

                      {/* PO Value */}
                      {e?.po_value && (
                        <Col md={{ span: 6 }} xs={{ span: 24 }}>
                          <Form.Item name="po_value" label="PO Value">
                            <Input
                              min={0}
                              type="number"
                              disabled={true}
                              placeholder="Enter"
                              name="po_value"
                            />
                          </Form.Item>
                        </Col>
                      )}

                      {/* Advance Paid */}
                      {e?.advance && e.advance === OPTIONS.advance[0].value && (
                        <Col md={{ span: 6 }} xs={{ span: 24 }}>
                          <Form.Item name="advance_paid" label="Advance Paid">
                            <Select
                              allowClear
                              placeholder="Select"
                              options={OPTIONS.issueClosed}
                              disabled={true}
                            />
                          </Form.Item>
                        </Col>
                      )}

                      {/* PO Copy */}
                      {e?.po_copy && (
                        <Col md={{ span: 6 }} xs={{ span: 24 }}>
                          <Form.Item name="po_copy" label="PO Copy">
                            <Row>
                              <Col>
                                {defaultValue.ticket_status !==
                                  "Ticket Closed ORL" && (
                                  <MultiUploadButton
                                    url={"ticket-imageupload"}
                                    disabled={true}
                                    onSuccess={(files) => {
                                      form.setFieldsValue({
                                        po_copy:
                                          files?.map?.(
                                            (file) =>
                                              JSON.parse(
                                                file?.response?.filename ??
                                                  "['']"
                                              )?.[0] ?? ""
                                          ) ?? "",
                                      });
                                    }}
                                  />
                                )}
                              </Col>
                              <Col>
                                <Button
                                  type="link"
                                  color="primary"
                                  onClick={() =>
                                    openModal(
                                      "Document Copy",
                                      typeof defaultValue.po_copy !== "string"
                                        ? defaultValue?.po_copy
                                        : []
                                    )
                                  }>
                                  View
                                </Button>
                              </Col>
                            </Row>
                          </Form.Item>
                        </Col>
                      )}
                    </>

                    {/* Issue Closed */}
                    {/* {canIshowIssueClosed() && false && ( */}
                    {e?.issue_closed && (
                      <Col md={{ span: 6 }} xs={{ span: 24 }}>
                        <Form.Item name="issue_closed" label="Issue Closed">
                          <Select
                            disabled={true}
                            allowClear
                            placeholder="Select"
                            options={OPTIONS.issueClosed}
                          />
                        </Form.Item>
                      </Col>
                    )}
                    {/* )} */}

                    {/* Issue Resolved */}
                    {/* {canIshowIssueResolved() && ( */}
                    {/* {e?.issues_solved && (
                      <Col md={{ span: 6 }} xs={{ span: 24 }}>
                        <Form.Item name="issues_solved" label="Issue Resolved">
                          <Select
                            disabled={true}
                            allowClear
                            placeholder="Select"
                            options={OPTIONS.issueResolved}
                          />
                        </Form.Item>
                      </Col>
                    )} */}
                    {/* )} */}
                  </Row>
                  {/* <Row gutter={[15, 0]}>
                    <Col span={24}>
                      <Row gutter={[15, 15]} style={{ justifyContent: "end" }}>
                        <Col
                          span={12}
                          style={{ textAlign: "right" }}
                          className="d-flex align-items-center justify-content-end mt-3">
                          {defaultValue.ticket_status !==
                            "Ticket Closed ORL" && (
                            <Form.Item className="mx-2">
                              <Button
                                loading={updatingTicketHandling}
                                disabled={updatingTicketHandling}
                                className="orangeFactory"
                                type="primary"
                                htmlType="submit">
                                {"Update"}
                              </Button>
                            </Form.Item>
                          )}

                          <Form.Item>
                            <Button
                              disabled={updatingTicketHandling}
                              onClick={handleClickBack}>
                              Back
                            </Button>
                          </Form.Item>
                        </Col>
                      </Row>
                    </Col>
                  </Row> */}
                </Form>
              </Col>
            </Row>
          </Card>
        );
      })}
      <Card style={{ marginTop: "8px" }}>
        <Row>
          <Col span={24}>
            <Form
              name="update_ticket_handling"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              onFinish={onFinish}
              autoComplete="off"
              form={form}
              initialValues={{
                ...defaultValue,
                employee_id:
                  defaultValue.id && defaultValue.employee_name
                    ? {
                        value: defaultValue.employee_name.id,
                        label: defaultValue.employee_name.name,
                        ...defaultValue.employee_name,
                      }
                    : "",
              }}>
              {/* Vendor Type */}
              <Row gutter={[15, 0]}>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item
                    name="vendor_type"
                    label="Vendor Type"
                    rules={[
                      { required: true, message: "Please select vendor type" },
                    ]}>
                    <Select
                      allowClear
                      disabled={
                        OHStatus ||
                        ["WIP", "Issue Resolved MS"].includes(
                          defaultValue.ticket_status
                        )
                      }
                      placeholder="Select Vendor Type"
                      options={OPTIONS.vendorType}
                    />
                  </Form.Item>
                </Col>

                {/* Vendor Details */}
                {/* If Vendor Type is Internal */}
                {vendorType === OPTIONS.vendorType[0].value && (
                  <>
                    {/* Employee Name */}
                    <Col md={{ span: 6 }} xs={{ span: 24 }}>
                      <Form.Item
                        name="employee_id"
                        label="Employee Name"
                        rules={[
                          {
                            required: true,
                            message: "Please select employee name",
                          },
                        ]}>
                          <Select
                      placeholder="select"
                      onChange={(e) => setNewEmployee(e)}
                      defaultValue={defaultValue?.employee_id}
                      showSearch
                      filterOption={(input, option) =>
                        option.children
                          .toString()
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }>
                      {map(
                        (Employee) => {
                          return (
                            <Option key={Employee.id} value={Employee.id}>
                              {Employee.name}{" "}
                              <span className="mx-2">
                                ({Employee.employee_code}) - {Employee.contact}
                              </span>
                            </Option>
                          );
                        },
                        EmployeeList
                          ? EmployeeList?.filter((e) => e.status === "1")
                          : []
                      )}
                    </Select>
                        {/* <Select
                          allowClear
                          showSearch
                          loading={gettingEmployeeList}
                          placeholder="Select Employee Name"
                          options={giveMeEmployeeOptions()}
                          onChange={(value, option) => {
                            setEmployee(option);
                          }}
                          disabled={
                            OHStatus ||
                            ["WIP", "Issue Resolved MS"].includes(
                              defaultValue.ticket_status
                            )
                          }
                        /> */}
                      </Form.Item>
                    </Col>
                    {/* Employee Mobile */}
                    {/* <Col md={{ span: 6 }} xs={{ span: 24 }}>
                      <Form.Item name="emp_contact_no" label="Contact No.">
                        <Input
                          disabled
                          placeholder="Enter contact no"
                          name="emp_contact_no"
                        />
                      </Form.Item>
                    </Col> */}
                  </>
                )}

                {/* If Vendot Type is External */}
                {vendorType === OPTIONS.vendorType[1].value && (
                  <>
                    {/* Vendor Name */}
                    <Col md={{ span: 6 }} xs={{ span: 24 }}>
                      <Form.Item
                        name="vendor_name"
                        label="Vendor Name"
                        rules={[
                          {
                            required: true,
                            message: "Please enter vendor name",
                          },
                        ]}>
                        <Input
                          disabled={OHStatus}
                          placeholder="Enter Vendor Name"
                          name="vendor_name"
                        />
                      </Form.Item>
                    </Col>
                    {/* Vendor Mobile */}
                    <Col md={{ span: 6 }} xs={{ span: 24 }}>
                      <Form.Item name="vendor_contact_no" label="Contact No.">
                        <Input
                          disabled={OHStatus}
                          placeholder="Enter contact no"
                          name="vendor_contact_no"
                        />
                      </Form.Item>
                    </Col>
                  </>
                )}

                {/* Workdone */}
                {defaultValue.service_for !== "POS" && (
                  <Col md={{ span: 6 }} xs={{ span: 24 }}>
                    <Form.Item name="workdone" label="Workdone By">
                      <Select
                        allowClear
                        disabled={OHStatus || defaultValue.cost_involved}
                        placeholder="Select Workdone"
                        options={OPTIONS.workdoneBy}
                      />
                    </Form.Item>
                  </Col>
                )}

                {/* If Workdone By is Service with Spare */}
                {workdoneBy === OPTIONS.workdoneBy[0].value && (
                  <>
                    {/* Spare */}
                    <Col md={{ span: 6 }} xs={{ span: 24 }}>
                      <Form.Item name="spare_id" label="Spare">
                        <Select
                          allowClear
                          disabled={OHStatus || defaultValue.cost_involved}
                          //loading={gettingAssetGroupSpare}
                          placeholder="Select"
                          //options={giveMeAssetSpares()}
                        >
                          {assetsByORLs &&
                            assetsByORLs[0] &&
                            assetsByORLs[0]?.spare?.length > 0 &&
                            assetsByORLs[0]?.spare?.map((el) => (
                              <Option key={el?.spare} value={el?.spare}>
                                {el?.spare}
                              </Option>
                            ))}
                        </Select>
                      </Form.Item>
                    </Col>

                    {/* Covered in AMC */}
                    <Col md={{ span: 6 }} xs={{ span: 24 }}>
                      <Form.Item name="covered_in_amc" label="Covered in AMC">
                        <Input
                          disabled
                          placeholder="Enter"
                          name="covered_in_amc"
                        />
                      </Form.Item>
                    </Col>

                    {/* Spare Upload */}
                    {/* Existing Spare Photo */}
                    <Col md={{ span: 6 }} xs={{ span: 24 }}>
                      <Form.Item
                        name="existing_photo"
                        label="Existing Spare Photo">
                        <Row>
                          <Col>
                            {!OHStatus && !defaultValue.cost_involved && (
                              <MultiUploadButton
                                url={"ticket-imageupload"}
                                onSuccess={(files) => {
                                  form.setFieldsValue({
                                    existing_photo:
                                      files?.map?.(
                                        (file) =>
                                          JSON.parse(
                                            file?.response?.filename ?? "['']"
                                          )?.[0] ?? ""
                                      ) ?? "",
                                  });
                                }}
                              />
                            )}
                          </Col>
                          <Col>
                            <Button
                              type="link"
                              color="primary"
                              onClick={() =>
                                openModal(
                                  "Existing Spare Photo",
                                  typeof defaultValue.existing_photo !==
                                    "string"
                                    ? defaultValue?.existing_photo
                                    : []
                                )
                              }>
                              View
                            </Button>
                          </Col>
                        </Row>
                      </Form.Item>
                    </Col>

                    {/* New Spare Photo */}
                    <Col md={{ span: 6 }} xs={{ span: 24 }}>
                      <Form.Item name="new_photo" label="New Spare Photo">
                        <Row>
                          <Col>
                            {!OHStatus && !defaultValue.cost_involved && (
                              <MultiUploadButton
                                url={"ticket-imageupload"}
                                onSuccess={(files) => {
                                  form.setFieldsValue({
                                    new_photo:
                                      files?.map?.(
                                        (file) =>
                                          JSON.parse(
                                            file?.response?.filename ?? "['']"
                                          )?.[0] ?? ""
                                      ) ?? "",
                                  });
                                }}
                              />
                            )}
                          </Col>
                          <Col>
                            <Button
                              type="link"
                              color="primary"
                              onClick={() =>
                                openModal(
                                  "New Spare Photo",
                                  typeof defaultValue.new_photo !== "string"
                                    ? defaultValue?.new_photo
                                    : []
                                )
                              }>
                              View
                            </Button>
                          </Col>
                        </Row>
                      </Form.Item>
                    </Col>

                    {/* Document Copy */}
                    <Col md={{ span: 6 }} xs={{ span: 24 }}>
                      <Form.Item name="document_copy" label="Document Copy">
                        <Row>
                          <Col>
                            {!OHStatus && !defaultValue.cost_involved && (
                              <MultiUploadButton
                                url={"ticket-imageupload"}
                                onSuccess={(files) => {
                                  form.setFieldsValue({
                                    document_copy:
                                      files?.map?.(
                                        (file) =>
                                          JSON.parse(
                                            file?.response?.filename ?? "['']"
                                          )?.[0] ?? ""
                                      ) ?? "",
                                  });
                                }}
                              />
                            )}
                          </Col>
                          <Col>
                            <Button
                              type="link"
                              color="primary"
                              onClick={() =>
                                openModal(
                                  "New Spare Photo",
                                  typeof defaultValue.document_copy !== "string"
                                    ? defaultValue?.document_copy
                                    : []
                                )
                              }>
                              View
                            </Button>
                          </Col>
                        </Row>
                      </Form.Item>
                    </Col>

                    {/* Tentative Date */}
                    <Col md={{ span: 6 }} xs={{ span: 24 }}>
                      <Form.Item name="tentative_date" label="Tentative Date">
                        <Input
                          disabled={OHStatus || defaultValue.cost_involved}
                          type="date"
                          placeholder="Select"
                          name="tentative_date"
                        />
                      </Form.Item>
                    </Col>
                  </>
                )}

                {/* Cost Involved */}
                {defaultValue.service_for !== "POS" && (
                  <Col md={{ span: 6 }} xs={{ span: 24 }}>
                    <Form.Item name="cost_involved" label="Cost Involved">
                      <Select
                        allowClear
                        disabled={OHStatus || defaultValue.cost_involved}
                        placeholder="Select"
                        options={OPTIONS.costInvolved}
                      />
                    </Form.Item>
                  </Col>
                )}

                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item name="issues_solved" label="Issue Resolved">
                    <Select
                      disabled={OHStatus || defaultValue.cost_involved}
                      // disabled={true}
                      allowClear
                      placeholder="Select"
                      options={OPTIONS.issueResolved}
                    />
                  </Form.Item>
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item name="remarks" label="Remarks">
                        <TextArea
                          disabled={OHStatus || defaultValue.cost_involved}
                          type="text"
                          placeholder="Enter Remarks"
                          name="remarks"
                        />
                  </Form.Item>
                </Col>

                {/* If Cost Involved is Yes */}
                {costInvolved === OPTIONS.costInvolved[0].value && (
                  <>
                    {/* Mode of Payment */}
                    <Col md={{ span: 6 }} xs={{ span: 24 }}>
                      <Form.Item name="payment_mode" label="Mode of Payment">
                        <Select
                          allowClear
                          disabled={OHStatus}
                          placeholder="Select"
                          options={OPTIONS.paymentMode}
                        />
                      </Form.Item>
                    </Col>

                    {/* Quotation */}
                    {paymentMode && (
                      <>
                        <Col md={{ span: 6 }} xs={{ span: 24 }}>
                          <Form.Item name="quotation" label="Quotation">
                            <Select
                              allowClear
                              disabled={OHStatus}
                              placeholder="Select"
                              options={OPTIONS.quotation}
                            />
                          </Form.Item>
                        </Col>

                        {/* Estimated Amount */}
                        <Col md={{ span: 6 }} xs={{ span: 24 }}>
                          <Form.Item
                            name="spend_amount"
                            label="Estimated Amount Rs"
                            rules={[
                              {
                                required: true,
                                message: "Please enter Estimated Amount rupees",
                              },
                            ]}>
                            <Input
                              min={0}
                              disabled={OHStatus && !OHRejected}
                              type="number"
                              placeholder="Enter"
                              name="spend_amount"
                            />
                          </Form.Item>
                        </Col>
                      </>
                    )}

                    {/* If Mode of Payment is Pettycash */}
                    {paymentMode && (
                      <>
                        {/* If Quotation is Yes */}
                        {quotation === OPTIONS.quotation[0].value && (
                          <>
                            {/* Quotation Number */}
                            <Col
                              md={{ span: 6 }}
                              xs={{ span: 24 }}
                              rules={[
                                {
                                  required: true,
                                  message: "Please enter quotation number",
                                },
                              ]}>
                              <Form.Item
                                name="quotation_no"
                                label="Quotation No">
                                <Input
                                  disabled={OHStatus && !OHRejected}
                                  placeholder="Enter"
                                  name="quotation_no"
                                />
                              </Form.Item>
                            </Col>

                            {/* Quotation Copy */}
                            <Col md={{ span: 6 }} xs={{ span: 24 }}>
                              <Form.Item
                                name="quotation_copy"
                                label="Quotation Copy">
                                {!OHStatus || OHRejected ? (
                                  <MultiUploadButton
                                    url={"ticket-imageupload"}
                                    onSuccess={(files) => {
                                      form.setFieldsValue({
                                        quotation_copy:
                                          files?.map?.(
                                            (file) =>
                                              JSON.parse(
                                                file?.response?.filename ??
                                                  "['']"
                                              )?.[0] ?? ""
                                          ) ?? "",
                                      });
                                    }}
                                  />
                                ) : (
                                  <></>
                                )}
                                <Image.PreviewGroup>
                                  {form
                                    .getFieldValue("quotation_copy")
                                    ?.map((_) => (
                                      <Image
                                        key=""
                                        width={200}
                                        src={`${defaultValue.pathfor_attachments}/${_}`}
                                      />
                                    ))}
                                </Image.PreviewGroup>
                              </Form.Item>
                            </Col>
                          </>
                        )}
                      </>
                    )}

                    {/* If Mode of Payment is Online */}
                    {paymentMode === OPTIONS.paymentMode[1].value && (
                      <>
                        {/* Advance */}
                        <Col md={{ span: 6 }} xs={{ span: 24 }}>
                          <Form.Item name="advance" label="Advance">
                            <Select
                              allowClear
                              disabled={OHStatus}
                              placeholder="Select"
                              options={OPTIONS.advance}
                            />
                          </Form.Item>
                        </Col>

                        {/* If Advance is yes */}
                        {advance === OPTIONS.advance[0].value && (
                          <>
                            {/* Advance Percentage */}
                            <Col md={{ span: 6 }} xs={{ span: 24 }}>
                              <Form.Item
                                name="advance_percentage"
                                label="Advance Percentage">
                                <Input
                                  min={0}
                                  type="number"
                                  disabled={OHStatus}
                                  placeholder="Enter"
                                  name="advance_percentage"
                                />
                              </Form.Item>
                            </Col>

                            {/* Advance Amount */}
                            <Col md={{ span: 6 }} xs={{ span: 24 }}>
                              <Form.Item
                                name="advance_amount"
                                label="Advance Amount">
                                <Input
                                  min={0}
                                  type="number"
                                  disabled
                                  placeholder="Enter"
                                  name="advance_amount"
                                />
                              </Form.Item>
                            </Col>
                          </>
                        )}
                      </>
                    )}
                  </>
                )}

                {/* PO Details */}
               
                 {((OHStatus && !OHRejected) || defaultValue?.po_no) &&
                  ((defaultValue.service_for !== "POS") && (defaultValue?.payment_mode !== "Pettycash") 
                  && (defaultValue.cost_involved !== "No")) ? (
                  <>
                    {/* PO No */}
                    <Col
                      md={{ span: 6 }}
                      xs={{ span: 24 }}
                      className="po_number">
                      <Form.Item name="po_no" label="PO No">
                        <Input
                          placeholder="Enter"
                          disabled={
                            defaultValue.ticket_status ===
                            "Ticket Closed ORL" &&
                          defaultValue.payment_status != "Waiting @ PO No"
                          }
                          onChange={(e) => {
                            setPoNumber(e?.target?.value);
                          }}
                          name="po_no"
                          value={defaultValue?.po_no || poNumber}
                        />
                        {!defaultValue?.po_no ? (
                          <div
                            className="btnverify"
                            onClick={() => verifyPoNumber()}>
                            Verify
                          </div>
                        ) : (
                          <></>
                        )}
                        {/* <div
                          className="btnverify"
                          onClick={() => verifyPoNumber()}>
                          Verify
                        </div> */}
                      </Form.Item>
                    </Col>

                    {/* Vendor Name */}
                    <Col md={{ span: 6 }} xs={{ span: 24 }}>
                      <Form.Item name="vendor_name_po" label="Vendor Name">
                        <Input
                          placeholder="Enter"
                          disabled={
                            defaultValue.ticket_status ===
                            "Ticket Closed ORL" &&
                          defaultValue.payment_status != "Waiting @ PO No"
                          }
                          name="vendor_name_po"
                        />
                      </Form.Item>
                    </Col>

                    {/* PO Value */}
                    <Col md={{ span: 6 }} xs={{ span: 24 }}>
                      <Form.Item name="po_value" label="PO Value">
                        <Input
                          min={0}
                          step="any"
                          type="number"
                          disabled={
                            defaultValue.ticket_status ===
                            "Ticket Closed ORL" &&
                          defaultValue.payment_status != "Waiting @ PO No"
                         
                          }
                          placeholder="Enter"
                          name="po_value"
                        />
                      </Form.Item>
                    </Col>

                    {/* Advance Paid */}
                    {defaultValue.advance === OPTIONS.advance[0].value && (
                      <Col md={{ span: 6 }} xs={{ span: 24 }}>
                        <Form.Item name="advance_paid" label="Advance Paid">
                          <Select
                            allowClear
                            placeholder="Select"
                            options={OPTIONS.issueClosed}
                          />
                        </Form.Item>
                      </Col>
                    )}

                    {/* PO Copy */}
                    <Col md={{ span: 6 }} xs={{ span: 24 }}>
                      <Form.Item name="po_copy" label="PO Copy">
                        <Row>
                          <Col>
                            {defaultValue.ticket_status ===
                            "Ticket Closed ORL" &&
                            defaultValue.payment_status != "Waiting @ PO No" && (
                              <MultiUploadButton
                                url={"ticket-imageupload"}
                                onSuccess={(files) => {
                                  form.setFieldsValue({
                                    po_copy:
                                      files?.map?.(
                                        (file) =>
                                          JSON.parse(
                                            file?.response?.filename ?? "['']"
                                          )?.[0] ?? ""
                                      ) ?? "",
                                  });
                                }}
                              />
                            )}
                          </Col>
                          <Col>
                            <Button
                              type="link"
                              color="primary"
                              onClick={() =>
                                openModal(
                                  "Document Copy",
                                  typeof defaultValue.po_copy !== "string"
                                    ? defaultValue?.po_copy
                                    : []
                                )
                              }>
                              View
                            </Button>
                          </Col>
                        </Row>
                      </Form.Item>
                    </Col>
                  </>
                ):(
                  <></>
                )}

                {/* Issue Closed */}
                {/* {canIshowIssueClosed() && false && (
                  <Col md={{ span: 6 }} xs={{ span: 24 }}>
                    <Form.Item name="issue_closed" label="Issue Closed">
                      <Select
                        allowClear
                        placeholder="Select"
                        options={OPTIONS.issueClosed}
                      />
                    </Form.Item>
                  </Col>
                )} */}

            {defaultValue?.fi_expense_no && (
                  <Col md={{ span: 6 }} xs={{ span: 24 }}>
                    <Form.Item name="fi_expense_no" label="Fi Expense_no">
                      <Input
                        type="text"
                        disabled={true}
                        //placeholder="Enter"
                        //name="po_value"
                        value={defaultValue?.fi_expense_no}
                      />
                    </Form.Item>
                  </Col>
                )}
                {defaultValue?.fi_payment_no && (
                  <Col md={{ span: 6 }} xs={{ span: 24 }}>
                    <Form.Item name="fi_payment_no" label="Fi Expense_no">
                      <Input
                        type="text"
                        disabled={true}
                        //placeholder="Enter"
                        //name="po_value"
                        value={defaultValue?.fi_payment_no}
                      />
                    </Form.Item>
                  </Col>
                )}             
               

            {defaultValue?.payment_status == "PO Processed" ||
                defaultValue?.payment_status == "FI Entry Processed" ? (
                  <Col md={{ span: 6 }} xs={{ span: 24 }}>
                    <Form.Item name="issue_closed" label="Ticket Closed">
                      <Select
                        allowClear
                        placeholder="Select"
                        options={OPTIONS.issueClosed}
                      />
                    </Form.Item>
                  </Col>
                ) : (
                  <></>)}

                {/* Issue Resolved */}
                {/* {canIshowIssueResolved() && (
                  <Col md={{ span: 6 }} xs={{ span: 24 }}>
                    <Form.Item name="issues_solved" label="Issue Resolved">
                      <Select
                        allowClear
                        placeholder="Select"
                        options={OPTIONS.issueResolved}
                      />
                    </Form.Item>
                  </Col>
                )} */}
              </Row>
              <Row gutter={[15, 0]}>
                <Col span={24}>
                  <Row gutter={[15, 15]} style={{ justifyContent: "end" }}>
                    <Col
                      span={12}
                      style={{ textAlign: "right" }}
                      className="d-flex align-items-center justify-content-end mt-3">
                      {
                      // ((defaultValue.ticket_status == "Waiting @ Vendor Assignment")||(defaultValue.ticket_status == "Ticket Closed ORL") || (defaultValue.ticket_status == "Issue Resolved MS")) && 
                      //  ((defaultValue.payment_status !="Ticket Closed") || (defaultValue.payment_status == "Waiting @ PO No")) 
                      //  && ((defaultValue.payment_status =="PO Processed") || (defaultValue.payment_status =="FI Entry Processed")) &&                       
                      //  (
                        ((defaultValue.ticket_status !== "Ticket Closed ORL" || defaultValue.payment_status !== "Ticket Closed") &&
                        defaultValue.payment_status != "Waiting @ OH Approval" )&& (defaultValue?.payment_status != "Waiting @ FI Doc No") &&
                        defaultValue.payment_status !== "Ticket Closed" && (defaultValue.cost_involved !== "No") &&(
                        <Form.Item className="mx-2">
                          <Button
                            loading={updatingTicketHandling}
                            disabled={updatingTicketHandling}
                            className="orangeFactory"
                            type="primary"
                            htmlType="submit">
                            {"Update"}
                          </Button>
                        </Form.Item>
                      )}

                      <Form.Item>
                        <Button
                          disabled={updatingTicketHandling}
                          onClick={handleClickBack}>
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

      <Modal
        title={state.title}
        open={state.isOpen}
        footer={null}
        onCancel={() => updateState({ ...state, isOpen: false })}>
        <Image.PreviewGroup>
          {state.images.map((_) => (
            <Image
            key="id"
              width={100}
              src={`${defaultValue.pathfor_attachments.replace(
                /\\/g,
                ""
              )}/${_}`}
            />
          ))}
        </Image.PreviewGroup>
      </Modal>
    </>
  );
}

export default memo(TicketHandlingForm);