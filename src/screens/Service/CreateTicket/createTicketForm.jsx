/* eslint-disable no-unused-vars */

import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Image,
  Modal,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getEmployeeMapping,
  getEmployeeMaster,
  getOutletMaster,
  getOutletMasterWithEmployee,
} from "../../../@app/master/masterSlice";
// import {map} from 'ramda';
import { useLocation, useNavigate } from "react-router";
// import dayjs from 'dayjs';
import messageToast from "../../../components/messageToast/messageToast";
// import { Input } from 'antd';
import { map } from "ramda";
import {
  getAssetGroup,
  getAssetGroupIssue,
  getAssetMaster,
  getAssetBasedOnORLMaster,
  getPriority,
  getServiceFor,
  getTypeOfService,
  saveTickets,
  updateTickets,
  closeTickets,
} from "../../../@app/service/serviceSlice";
import { MultiUploadButton } from "../../../components/multiUploadButton/MultiUploadButton";
import typesOfIssue from "./typesOfIssue.constant";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { OPTIONS } from "../TicketHandling/TicketHandlingForm";
import { stringToBoolean } from "../../../util";
const { TextArea } = Input;

const { confirm } = Modal;

const { Option } = Select;
const CreateTicketForm = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const {
    state: { data: defaultValue, isEdit },
  } = useLocation();

  let userData = JSON.parse(localStorage.getItem("userData"));
  let type = JSON.parse(localStorage.getItem("type"));
  const submoduleListData = userData?.data?.employee_mapping?.submodule ?? [];
  const report_toData = userData?.data?.employee_mapping?.report_to ?? [];

  const {
    getOutletMasterResponse: { data: outletData },
    getEmployeeMappingResponse: { data: employeeMapping = [] },
    getEmployeeMasterResponse: { data: Employees },
  } = useSelector((state) => {
    return state.master;
  });

  const outletList = outletData?.map((o) => ({
    ...o,
    outlet_code: `${o?.outlet_code} - ${o?.name}`,
  }));

  const {
    savingTickets,
    gettingPriority,
    getPriorityResponse: { data: priorityData },
    gettingServiceFor,
    getServiceForResponse: { data: getServiceForData },
    getAssetGroupResponse: { data: assetGroups },
    getAssetMasterResponse: { data: assetMasters },
    getTypeOfServiceResponse: { data: typeOfServices },
    getAssetGroupIssueResponse: { data: typesOfAssetGroupIssue },
    getAssetBaseOnORLResponse: { data: assetsByORLs },
  } = useSelector((state) => {
    return state.service;
  });

  let allAssets = assetsByORLs?.map((_) => _.asset?.[0]) ?? [];
  let serviceFor = Form.useWatch("service_for", form);
  let assetGroup = Form.useWatch("asset_group", form);
  let selectedOutlet = Form.useWatch("outlet_code", form);
  let selectedAssignedTo = Form.useWatch("assigned_to", form);

  if (isEdit) {
    serviceFor = parseInt(defaultValue.service_for_id);
    assetGroup = parseInt(defaultValue.asset_group_id);

    if (defaultValue.ticket_status === "Issue Not Resolved ORL") {
      defaultValue.ticket_closed = OPTIONS.issueClosed[1];
    }

    if (defaultValue.ticket_status === "Ticket Closed ORL") {
      defaultValue.ticket_closed = OPTIONS.issueClosed[0];
    }
  }

  const [serviceDetails, setServiceDetails] = useState({});

  const service = isEdit
    ? defaultValue.service_for
    : (getServiceForData ?? []).find(
        (ServiceFor) => ServiceFor?.id === serviceFor
      )?.name;

  const assignedTo = employeeMapping?.filter((e) => {
    if (service === "POS" || service === "Equipment" || service === "IT") {
      return true;
      // if (e?.submoduleData?.includes(service)) {
      //   return true;
      // }
    }
    return true;
  });

  useEffect(() => {
    dispatch(getEmployeeMaster());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getPriority());
    dispatch(getServiceFor());
    dispatch(getAssetGroup());
    dispatch(getAssetMaster());
    dispatch(getTypeOfService());
    dispatch(getEmployeeMapping());

    dispatch(getAssetGroupIssue());
  }, [dispatch]);

  const empCode = localStorage.getItem("emp_code");

  useEffect(() => {
    const empId = Employees?.find((e) => {
      return e?.employee_code === empCode;
    });   
    if (empId) {
      dispatch(getOutletMasterWithEmployee(empId?.id));
    } else {
      dispatch(getOutletMaster());
    }
  }, [Employees]);

  useEffect(() => {
    if (!isEdit) {
      form.setFieldsValue({
        orl_name: (outletData ?? []).find(
          (outletData) => outletData?.id === selectedOutlet
        )?.orl_name,
        contact_no: (outletData ?? []).find(
          (outletData) => outletData?.id === selectedOutlet
        )?.orl_cug_no,
      });
    }
  }, [selectedOutlet]);

  useEffect(() => {
    if (!isEdit) {
      form.setFieldsValue({
        phone_no:
          (Employees ?? []).find((eM) => eM?.id === selectedAssignedTo)
            ?.contact ?? "",
      });
    }
  }, [selectedAssignedTo]);

  const handleClickBack = () => {
    navigate("/createTicket");
  };

  const handleDeleteBtn = () => {
    confirm({
      title: "Are you sure?",
      icon: <ExclamationCircleFilled />,
      content: "Do you want to delete this ticket?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        onDeleteTickets();
      },
      onCancel() {
       },
    });
  };


  const onFinish = (data) => {
    const outletCode = defaultValue?.id
      ? defaultValue.outlet_code
      : (outletData ?? []).find(
          (outletData) => outletData?.id === selectedOutlet
        )?.outlet_code;
    dispatch(
      isEdit
        ? updateTickets({
            data: {
              asset: data.asset,
              ticket_status: defaultValue.ticket_status,
              issue_resolved: data.issue_resolved,
              ticket_closed: data.ticket_closed,
              id: defaultValue?.id,
              updated_by: userData.data?.id ?? "0",
            },
          })
        : saveTickets({
            data: {
              ...data,
              attachments: JSON.stringify(data?.attachments ?? "[]"),
              outlet_code: outletCode,
              created_by: userData.data?.id ?? "0",
            },
          })
    ).then(({ message, status, statusText }) => {
      messageToast({
        message: message ?? statusText,
        status,
        title: isEdit ? "Ticket Updated" : "Ticket creation",
      });
      if (status === 200) {
        form.resetFields();
        navigate("/createTicket");
      }
    });
  };

  const onDeleteTickets = () => {
    dispatch(closeTickets({ data: { id: defaultValue?.id } })).then(
      ({ message, status, statusText }) => {
        messageToast({
          message: message ?? statusText,
          status,
          title: "Ticket Deleted",
        });
        if (status === 200) {
          form.resetFields();
          navigate("/createTicket");
        }
      }
    );
  };

  useEffect(() => {
    if (isEdit) {
      form.setFieldsValue({
        orl_name: defaultValue.orl_name,
        contact_no: defaultValue.contact_no,
        phone_no: defaultValue.phone_no,
        service_for: defaultValue.service_for,
        asset_group: defaultValue.asset_group,
        outlet_code: defaultValue.outlet_code,
        assigned_to: defaultValue.assigned_to,
        service_type: defaultValue.type_of_service,
        types_of_issue: defaultValue.types_of_issue_id,
      });

      props.setTopTitle("Edit Ticket");
    } else {
      props.setTopTitle("Create Ticket");
    }
  }, [isEdit]);

  useEffect(() => {
    if (parseInt(type) == 2 && !isEdit && outletList?.length > 0)
      form.setFieldsValue({
        outlet_code: outletList[0]?.id,
      });
  }, [outletList]);

   useEffect(() => {
    if (assetGroup) {
      dispatch(
        getAssetBasedOnORLMaster({
          asset_groupid: assetGroup,
          outlet_code: isEdit
            ? selectedOutlet?.split(" - ")?.[0]
            : (outletData ?? []).find(
                (outletData) => outletData?.id === selectedOutlet
              )?.outlet_code,
        })
      );
    }
  }, [assetGroup, isEdit, selectedOutlet]);

  return (
    <>
      <Card>
        <Row>
          <Col span={24}>
            <Form
              disabled={savingTickets}
              name="basic"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              onFinish={onFinish}
              autoComplete="off"
              form={form}
              initialValues={{
                ...defaultValue,
              }}>
              <Row gutter={[15, 0]}>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item
                    name="outlet_code"
                    label="Outlet Name"
                    rules={[
                      {
                        required: !isEdit,
                        message: "Please select Outlet code",
                      },
                    ]}>
                    <Select
                      allowClear
                      disabled={isEdit}
                      placeholder="select Outlet Name"
                      showSearch
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }>
                      {map(
                        (outlet) => {
                          return (
                            <Option key={outlet?.id} value={outlet?.id}>
                              {outlet?.outlet_code}
                            </Option>
                          );
                        },
                        outletList ? outletList : []
                      )}
                    </Select>
                  </Form.Item>
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item name="orl_name" label="ORL Name">
                    <Input
                      disabled
                      placeholder="Enter ORL Name"
                      name="orl_name"
                    />
                  </Form.Item>
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item name="contact_no" label="Contact No">
                    <Input
                      disabled
                      placeholder="Enter Contact No"
                      name="contact_no"
                    />
                  </Form.Item>
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item
                    name="priority"
                    label="Priority"
                    rules={[
                      { required: !isEdit, message: "Please select Priority" },
                    ]}>
                    <Select
                      allowClear
                      disabled={isEdit}
                      placeholder="Select"
                      loading={gettingPriority}
                      showSearch>
                      filterOption=
                      {(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      {map(
                        (priority) => {
                          if(priority.status == '1'){
                          return (
                            <Option key={priority?.id} value={priority?.id}>
                              {priority?.name}
                            </Option>
                          );
                          }
                        },
                        priorityData ? priorityData : []
                      )}
                    </Select>
                  </Form.Item>
                </Col>
                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item
                    name="service_for"
                    label="Service For"
                    rules={[
                      {
                        required: !isEdit,
                        message: "Please select Service for",
                      },
                    ]}>
                    <Select
                      allowClear
                      disabled={isEdit}
                      placeholder="Select"
                      loading={gettingServiceFor}
                      onChange={(e) => {
                        let assigned_toData = undefined;
                        let serviceDetails = getServiceForData.find(
                          (el) => el?.id == e
                        );
                        setServiceDetails(serviceDetails);
                        // if (serviceDetails?.name == "IT") {
                        //   assigned_toData = Employees.find(
                        //     (e1) => e1.employee_ce == 90062
                        //   );
                        // }
                        // if (serviceDetails?.name == "Equipment") {
                        //   assigned_toData = Employees.find(
                        //     (e1) => e1.employee_code == 90090
                        //   );
                        // }
                        // if (serviceDetails?.name == "POS") {
                        //   assigned_toData = Employees.find(
                        //     (e1) => e1.employee_code == 20803
                        //   );
                        // }

                        form.setFieldsValue({
                          assigned_to: assigned_toData,
                          asset_group: undefined,
                          asset: undefined,
                        });
                      }}
                      showSearch
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }>
                      {map(
                        (getServiceFor) => {
                          if (getServiceFor?.status == '1') {
                            return (
                              <Option
                                key={getServiceFor?.id}
                                value={getServiceFor?.id}>
                                {getServiceFor?.name}
                              </Option>
                            );
                          }
                        },
                        getServiceForData ? getServiceForData : []
                      )}
                    </Select>
                  </Form.Item>
                </Col>
                {["POS"].includes(service) && (
                  <Col md={{ span: 6 }} xs={{ span: 24 }}>
                    <Form.Item
                      name="types_of_issue"
                      label="Types of Issues"
                      rules={[
                        {
                          required: !isEdit,
                          message: "Please select Types of Issue",
                        },
                      ]}>
                      <Select
                        allowClear
                        disabled={isEdit}
                        placeholder="Select"
                        //   loading={gettingState}
                        showSearch
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }>
                        {map(
                          (typesOfIssue) => {
                            // if (typesOfIssue.asset_group_id === assetGroup) {
                            //  // console.log(typesOfIssue)
                            // let issues=typesOfIssue.groupissues;
                            // // console.log(j)
                            // console.log(issues)
                            // // console.log(assetGroup)
                            // issues.map((data,i)=>{
                            //   console.log("i",data)
                            //   return (
                            //     <Option key={i} value={i}>
                            //       {data?.name}
                            //     </Option>
                            //   );
                            // })

                            // }
                            // if (parseInt(typesOfIssue?.status)) {
                            return (
                              <Option
                                key={typesOfIssue?.id}
                                value={typesOfIssue?.id}>
                                {typesOfIssue?.name}
                              </Option>
                            );
                            //}
                          },
                          typesOfIssue ? typesOfIssue : []
                        )}
                      </Select>
                    </Form.Item>
                  </Col>
                )}
                {["Equipment", "IT"].includes(service) && (
                  <>
                    <Col md={{ span: 6 }} xs={{ span: 24 }}>
                      <Form.Item name="asset_group" label="Asset Group">
                        <Select
                          allowClear
                          placeholder="Select"
                          disabled={isEdit}
                          //   loading={gettingState}
                          onChange={() => {
                            form.setFieldsValue({
                              asset: undefined,
                            });
                          }}
                          showSearch
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }>
                          {map(
                            (assetGroup) => {
                              if (assetGroup?.status) {
                                if (assetGroup.servicefor_id === serviceFor) {
                                  return (
                                    <Option
                                      key={assetGroup?.id}
                                      value={assetGroup?.id}>
                                      {assetGroup?.name}
                                    </Option>
                                  );
                                }
                              }
                            },
                            assetGroups ? assetGroups : []
                          )}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col md={{ span: 6 }} xs={{ span: 24 }}>
                      <Form.Item name="asset" label="Asset">
                        <Select
                          allowClear
                          placeholder="Select"
                          //   loading={gettingState}
                          disabled={
                            isEdit &&
                            defaultValue.ticket_status !==
                              "Waiting @ Vendor Assignment"
                          }
                          showSearch
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }>
                          {allAssets?.map((_) => {
                            //console.log("_", _);

                            if (parseInt(_?.status)) {
                              return (
                                <Option key={_?.id} value={_?.id}>
                                  {_?.asset}
                                </Option>
                              );
                            }
                          })}
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col md={{ span: 6 }} xs={{ span: 24 }}>
                      <Form.Item
                        name="types_of_issue"
                        label="Types of Issues"
                        rules={[
                          {
                            required: !isEdit,
                            message: "Please select Types of Issue",
                          },
                        ]}>
                        <Select
                          allowClear
                          placeholder="Select"
                          disabled={isEdit}
                          //   loading={gettingState}
                          showSearch
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }>
                          {map(
                            (typesOfAssetGroupIssue) => {
                              if (assetGroup) {
                                let selectedName = assetGroups?.filter(
                                  (el) => el.id === assetGroup
                                )[0]?.name;
                                if (
                                  typesOfAssetGroupIssue.asset_group_name ===
                                  selectedName
                                ) {
                                  return typesOfAssetGroupIssue.groupissues.map(
                                    (data, i) => {
                                      if (parseInt(data?.status)) {
                                        return (
                                          <Option key={i} value={data?.name}>
                                            {data?.name}
                                          </Option>
                                        );
                                      }
                                    }
                                  );
                                }
                                //   let selectSpare=  typesOfAssetGroupIssue.filter(el=>el.asset_group_name===selectedName)

                                //console.log("heell",typesOfAssetGroupIssue)
                                // if (typesOfAssetGroupIssue.asset_group_id === assetGroup) {
                                //  // console.log(typesOfIssue)
                                // let issues=typesOfIssue.groupissues;
                                // // console.log(j)
                                // console.log(issues)
                                // // console.log(assetGroup)
                                // issues.map((data,i)=>{
                                //   console.log("i",data)
                                //   return (
                                //     <Option key={i} value={i}>
                                //       {data?.name}
                                //     </Option>
                                //   );
                                // })
                              }

                              // return (
                              //   <Option key={typesOfAssetGroupIssue?.id} value={typesOfAssetGroupIssue?.id}>
                              //     {typesOfAssetGroupIssue?.name}
                              //   </Option>
                              // );
                            },
                            typesOfAssetGroupIssue ? typesOfAssetGroupIssue : []
                          )}
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col md={{ span: 6 }} xs={{ span: 24 }}>
                      <Form.Item
                        name="service_type"
                        label="Type Of Services"
                        rules={[
                          {
                            required: isEdit
                              ? false
                              : ["Equipment", "IT"].includes(service),
                            message: "Please select Type Of Services",
                          },
                        ]}>
                        <Select
                          allowClear
                          placeholder="Select"
                          disabled={isEdit}
                          //   loading={gettingState}
                          typeOfServices
                          showSearch
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }>
                          {map(
                            (typeOfService) => {
                              if (parseInt(typeOfService?.status)) {
                                return (
                                  <Option
                                    key={typeOfService?.id}
                                    value={typeOfService?.id}>
                                    {typeOfService?.name}
                                  </Option>
                                );
                              }
                            },
                            typeOfServices ? typeOfServices : []
                          )}
                        </Select>
                      </Form.Item>
                    </Col>
                  </>
                )}

                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item
                    name="assigned_to"
                    label="Assigned To"
                    rules={[
                      {
                        required: !isEdit,
                        message: "Please select Service for",
                      },
                    ]}>
                    <Select
                      allowClear
                      placeholder="Select"
                      disabled={isEdit}
                      //   loading={gettingState}
                      showSearch
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }>
                      {map(
                        (assigned) => {
                          //if (parseInt(type) == 2) {
                            if (
                              serviceDetails?.name == "IT" &&
                              assigned?.employee_code == 90062
                            ) {
                              return (
                                <Option
                                  key={assigned?.employee_id}
                                  value={assigned?.employee_id}>
                                  {assigned?.name}
                                </Option>
                              );
                            }
                            if (
                              serviceDetails?.name == "Equipment" &&
                              assigned?.employee_code == 90090
                            ) {
                              return (
                                <Option
                                  key={assigned?.employee_id}
                                  value={assigned?.employee_id}>
                                  {assigned?.name}
                                </Option>
                              );
                            }
                            if (
                              serviceDetails?.name == "POS" &&
                              assigned?.employee_code == 20803
                            ) {
                              return (
                                <Option
                                  key={assigned?.employee_id}
                                  value={assigned?.employee_id}>
                                  {assigned?.name}
                                </Option>
                              );
                            }
                            // return (
                            //   <Option
                            //     key={assigned?.employee_id}
                            //     value={assigned?.employee_id}>
                            //     {assigned?.name}
                            //   </Option>
                            // );
                          // } else {
                          //   if (parseInt(assigned?.status)) {
                          //     return (
                          //       <Option
                          //         key={assigned?.employee_id}
                          //         value={assigned?.employee_id}>
                          //         {assigned?.name}
                          //       </Option>
                          //     );
                          //   }
                          // }
                        },
                        assignedTo ? assignedTo : []
                      )}
                    </Select>
                  </Form.Item>
                </Col>

                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item
                    name="phone_no"
                    label="Phone No"
                    rules={[
                      { required: !isEdit, message: "Please select Phone No" },
                    ]}>
                    <Input
                      name="phone_no"
                      placeholder="Enter Phone No"
                      disabled
                    />
                  </Form.Item>
                </Col>

                <Col md={{ span: 6 }} xs={{ span: 24 }}>
                  <Form.Item
                    name="problem_description"
                    label="Problem Description">
                    <TextArea disabled={isEdit} rows={4} placeholder="" />
                  </Form.Item>
                </Col>

                {/* Issue Resolved */}
                {false &&
                  defaultValue?.ticket_status === "Issue Resolved MS" && (
                    <Col md={{ span: 6 }} xs={{ span: 24 }}>
                      <Form.Item name="issue_resolved" label="Issue Resolved">
                        <Select
                          allowClear
                          placeholder="Select"
                          options={OPTIONS.issueResolved}
                        />
                      </Form.Item>
                    </Col>
                  )}

                {/* Issue Closed */}
                {["Issue Resolved MS", "Issue Not Resolved ORL"].includes(
                  defaultValue?.ticket_status ?? ""
                ) && (
                  <Col md={{ span: 6 }} xs={{ span: 24 }}>
                    <Form.Item name="ticket_closed" label="Issue Closed">
                      <Select
                        allowClear
                        placeholder="Select"
                        options={OPTIONS.issueClosed}
                      />
                    </Form.Item>
                  </Col>
                )}

                <Col md={{ span: 24 }} xs={{ span: 24 }}>
                  <Form.Item name="attachments" label="Attachment">
                    {!isEdit && (
                      <MultiUploadButton
                        url={"ticket-imageupload"}
                        onSuccess={(files) => {
                          form.setFieldsValue({
                            attachments:
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
                    {isEdit && (
                      <Image.PreviewGroup>
                        {typeof defaultValue.attachments !== "string" &&
                          defaultValue.attachments?.map((attach) => (
                            <Image key=""
                              width={200}
                              src={`${defaultValue.pathfor_attachments}/${attach}`}
                            />
                          ))}
                      </Image.PreviewGroup>
                    )}
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
                          loading={savingTickets}
                          disabled={
                            savingTickets ||
                            (isEdit &&
                              ![
                                "Waiting @ Vendor Assignment",
                                "Issue Resolved MS",
                                "Issue Not Resolved ORL",
                                "Issue Resolved ORL",
                              ].includes(defaultValue?.ticket_status))
                          }
                          className="orangeFactory"
                          type="primary"
                          htmlType="submit">
                          {isEdit ? "Update" : "Create"}
                        </Button>
                      </Form.Item>

                      <Form.Item>
                        <Button
                          disabled={savingTickets}
                          onClick={handleClickBack}>
                          Back
                        </Button>
                      </Form.Item>

                      {isEdit &&
                        defaultValue.ticket_status ===
                          "Waiting @ Vendor Assignment" && (
                          <Form.Item className="mx-2">
                            <Button
                              danger
                              disabled={savingTickets}
                              onClick={handleDeleteBtn}>
                              Delete
                            </Button>
                          </Form.Item>
                        )}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default CreateTicketForm;
