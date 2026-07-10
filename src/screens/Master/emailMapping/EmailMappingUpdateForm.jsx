/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Card, Select, Button, Col, Row, Form, Radio } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  addEmailMapping,
  addEmployeeMapping,
  EmployeeZone,
  getDepartment,
  getEmployeeMaster,
  getModuleScreensList,
  getModulesList,
  getOutletMaster,
  getReport,
  getRoleMaster,
  getStates,
  UpdateEmaileMapping,
  getSubModulesList,
  getSubZonal,
  UpdateEmployeeMapping,
} from "../../../@app/master/masterSlice";
import { flatten, map } from "ramda";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import messageToast from "../../../components/messageToast/messageToast";
import { transStatus } from "../../../util/transStatus";
import ConfirmOnExit from "../../../components/confirmOnExit/ConfirmOnExit";
import { getServiceFor } from "../../../@app/service/serviceSlice";
const { Option } = Select;

function EmailMappingUpdateForm() {
  const {
    state: { data: defaultValue = [], isEdit = false },
  } = useLocation();

  const [newEmployee, setNewEmployee] = useState("");
  const [subModuleName, setSubModuleName] = useState("");

  const [roleSelected, setRoleSelected] = useState("");
  const navigate = useNavigate();

  const {
    getStatesResponse: { data: states },
    zoneEmp: { data: Zonals },
    getSubZonalResponse: { data: SubZonals },
    getEmployeeMasterResponse: { data: EmployeeList },
    getRoleMasterResponse: { data: roleList },
    getOutletMasterResponse: { data: outletMasterList },
    getModulesListResponse: { data: modulesList },
    getSubModulesListResponse: { data: subModules },
    getModulesScreenListResponse: { data: modulesScreen },
    getReportResponse: { data: Reports },
    getDepartmentResponse: { data: Depart },
  } = useSelector((state) => {
    return state.master;
  });

  const [subModuleList, setSubModuleList] = useState([]);
  const {
    getServiceForResponse: { data: serviceFor },
  } = useSelector((state) => {
    return state.service;
  });

  const handleClickBack = () => {
    navigate("/emailMapping");
  };

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const stateID = Form.useWatch("state_id", form);
  const EmpId = Form.useWatch("employee_id", form);
  const department_id = Form.useWatch("department_id", form);
  const zoneID = Form.useWatch("zone_id", form);
  const subZoneID = Form.useWatch("subzone_id", form);
  const moduleID = Form.useWatch("module_id", form);
  const subModule = Form.useWatch("sub_module_id", form);

  useEffect(() => {
    dispatch(getStates());
    dispatch(getDepartment());
    dispatch(getServiceFor());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getEmployeeMaster());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getRoleMaster());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getOutletMaster(subZoneID));
  }, [dispatch, subZoneID]);

  useEffect(() => {
    dispatch(getModulesList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getSubModulesList(moduleID));
  }, [dispatch, moduleID]);

  useEffect(() => {
    dispatch(getModuleScreensList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getReport());
  }, [dispatch]);

  useEffect(() => {
    dispatch(EmployeeZone(stateID));
  }, [dispatch, stateID]);

  useEffect(() => {
    dispatch(getSubZonal(zoneID));
  }, [dispatch, zoneID]);

  useEffect(() => {
    dispatch(getEmployeeMaster());
  }, [dispatch, zoneID]);

  useEffect(() => {
    setNewEmployee(EmpId);
  }, [EmpId]);

  const onFinish = (data) => {
    setShowDialog(false);
    dispatch(
      defaultValue?.employee_id
         ? UpdateEmaileMapping({
          data: {
            ...data,
            id: defaultValue?.id,
            employee_code:
              defaultValue?.employee_name == data.employee_code
                ? defaultValue?.employee_code
                : data.employee_code,
            status: data.status,
            permissions: data.permissions,
          },
        })
        : addEmailMapping({
            data: { ...data },
          })
    ).then(({ message, status, statusText }) => {
      if (status === 200) {
        form.resetFields();
        messageToast({
          message: message,
          status,
          title: "Successfully",
        });
        navigate("/emailMapping");
      } else {
        messageToast({
          message: message,
          status,
          title: "",
        });
      }
    });
  };

  const handleOnChange = (ids) => {
    const roleSelect = (
      flatten(
        (roleList ?? [])
          .map((x) => (ids.includes(x.id) ? x?.role_response : null))
          .filter((e) => e)
      ) ?? []
    ).map((e) => e.name);
    setRoleSelected(roleSelect);
  };
  const [showDialog, setShowDialog] = useState(false);
  return (
    <>
      <Card>
        <ConfirmOnExit showModel={showDialog} />
        <Row style={{ justifyContent: "center" }}>
          <Col span={24}>
            <Form
              onFieldsChange={() => setShowDialog(true)}
              name="basic"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              initialValues={{
                ...defaultValue,
                status: defaultValue?.status ?? 1,
              }}
              onFinish={onFinish}
              form={form}
              autoComplete="off">
              <Row gutter={[15, 0]}>
                <Col span={6}>
                  <Form.Item
                    name="employee_code"
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
                                ({Employee.employee_code})
                              </span>
                            </Option>
                          );
                        },
                        EmployeeList
                          ? EmployeeList?.filter((e) => e.status === "1")
                          : []
                      )}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name="permissions"
                    label="permissions"
                    rules={[{ required: true, message: "Please select role" }]}>
                    <Select
                      placeholder="select"
                      mode="multiple"
                      onChange={handleOnChange}
                      defaultValue={defaultValue?.role_id}
                      showSearch
                      filterOption={(input, option) =>
                        option.children
                          .toString()
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }>
                      {/* {map(
                        (role) => {
                          return (
                            <Option key={role.id} value={role.id}>
                              {role.name}
                            </Option>
                          );
                        },
                        roleList
                          ? roleList?.filter((e) => e.status === "1")
                          : []
                      )} */}
                      <Option key={"WIP"} value={"WIP"}>
                        WIP
                      </Option>
                      <Option key={"PO processed"} value={"PO processed"}>
                        PO processed
                      </Option>
                      <Option key={"Waiting @ PO No"} value={"Waiting @ PO No"}>
                        Waiting @ PO No
                      </Option>
                    </Select>
                  </Form.Item>
                </Col>
                <br />
                <Col span={6}>
                  <Form.Item
                    name={"status"}
                    label={"status"}
                    rules={[
                      {
                        required: true,
                        message: "Missing Status",
                      },
                    ]}>
                    <Radio.Group
                      buttonStyle="solid"
                      style={{
                        display: "flex",
                      }}>
                      <Radio.Button value={1} className="active">
                        Active
                      </Radio.Button>
                      <Radio.Button value={0} className="in-active">
                        InActive
                      </Radio.Button>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Row gutter={[15, 15]} style={{ justifyContent: "çenter" }}>
                    <Col span={12} style={{ textAlign: "right" }}>
                      <Form.Item>
                        <Button
                          className="orangeFactory"
                          type="primary"
                          htmlType="submit">
                          {isEdit ? "Update" : "Add"}
                        </Button>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item>
                        <Button onClick={handleClickBack}>Back</Button>
                      </Form.Item>
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
}

export default EmailMappingUpdateForm;
