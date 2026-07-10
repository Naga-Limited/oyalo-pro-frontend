/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Card, Select, Button, Col, Row, Form, Radio } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
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

function EmployeeMappingForm() {
  const {
    state: { data: defaultValue = [], isEdit = false },
  } = useLocation();

  const [newEmployee, setNewEmployee] = useState("");
  const [subModuleName, setSubModuleName] = useState("");
  const [departMentDetails, setDepartMentDetails] = useState("");
  const [reportingto, setDeportingTo] = useState("");

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
    navigate("/employeeMapping");
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

  // console.log(subModules, "subModules");

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

  const { userData } = useSelector((state) => state.auth);

  const onFinish = (data) => {
    setShowDialog(false);
    dispatch(
      defaultValue?.employee_id
        ? UpdateEmployeeMapping({
            data: {
              ...data,
              status: transStatus({ status: data.status }),
              department_id: [data.department_id],
              updated_by: userData.data?.id ?? "0",
            },
          })
        : addEmployeeMapping({
            data: { ...data, department_id: [data.department_id],
               created_by: userData.data?.id ?? "0"
             },
          })
    ).then(({ message, status, statusText }) => {
      if (status === 200) {
        form.resetFields();
      }
      if (
        statusText === "Employee mapped successfully." ||
        statusText === "Employee mapping updated successfully."
      ) {
        messageToast({
          message: message ?? statusText,
          status,
          title: "Successfully",
        });
        navigate("/employeeMapping");
      } else {
        messageToast({
          message: message ?? statusText,
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

  useEffect(() => {
    if (defaultValue?.module_id && subModules) {
      let moduleList = Object.values(subModules);
       if (defaultValue?.module_id?.includes(2)) {
        let data = [...moduleList, ...serviceFor];     
        setSubModuleList(data);
      } else {
        setSubModuleList(moduleList);
      }
    }
    if (defaultValue?.department) {
      setDepartMentDetails(defaultValue?.department[0]?.id);
      form.setFieldValue(
        "department_id",
        parseInt(defaultValue?.department[0]?.id)
      );
      form.setFieldValue("report_to", parseInt(defaultValue?.report_to));
      // console.log(defaultValue?.department_id, "defaultValue?.departmen");
    }
  }, [defaultValue]);

  const [fieldValue, setFieldValue] = useState(defaultValue?.zone_id);

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
                ///sub_module_id: defaultValue && defaultValue?.submodule[0],
                //zone_id: defaultValue?.zone_id,
                // department_id: defaultValue?.department[0]?.id,
                //report_to: defaultValue?.report_id,
                status: defaultValue?.status ?? 1,
              }}
              onFinish={onFinish}
              form={form}
              autoComplete="off">
              <Row gutter={[15, 0]}>
                <Col span={6}>
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
                    name="role_id"
                    label="Role"
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
                      {map(
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
                      )}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="state_id" label="State">
                    <Select
                      // disabled={!roleSelected.includes("State")}
                      mode="multiple"
                      placeholder="select"
                      showSearch
                      filterOption={(input, option) =>
                        option.children
                          .toString()
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }>
                      {map(
                        (state) => {
                          return (
                            <Option key={state.id} value={state.id}>
                              {state.name}
                            </Option>
                          );
                        },
                        states ? states?.filter((e) => e.status === "1") : []
                      )}
                    </Select>
                  </Form.Item>
                </Col>
            
                <Col span={6}>
                  <Form.Item name="zone_id" label="Zone">
                    <Select
                      placeholder="select"
                      // disabled={!roleSelected.includes("Zone")}
                      defaultValue={fieldValue}
                      mode="multiple"
                      showSearch
                      filterOption={(input, option) =>
                        option.children
                          .toString()
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }>
                      {map(
                        (Zonal) => {
                          return (
                            <Option key={Zonal.id} value={Zonal.id}>
                              {Zonal.zonal_name}
                            </Option>
                          );
                        },
                        Zonals ? Zonals?.filter((e) => e.status === "1") : []
                      )}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="subzone_id" label="Sub Zone">
                    <Select
                      placeholder="select"
                      //disabled={!roleSelected.includes("Sub Zone")}
                      mode="multiple"
                      showSearch
                      filterOption={(input, option) =>
                        option.children
                          .toString()
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }>
                      {map(
                        (SubZonal) => {
                          return (
                            <Option key={SubZonal.id} value={SubZonal.id}>
                              {SubZonal.name}
                            </Option>
                          );
                        },
                        SubZonals
                          ? SubZonals?.filter((e) => e.status === "1")
                          : []
                      )}
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={6}>
                  <Form.Item name="outlet_id" label="Outlet">
                    <Select
                      placeholder="select"
                      //disabled={!roleSelected.includes("Outlet")}
                      mode="multiple"
                      showSearch
                      filterOption={(input, option) =>
                        option.children
                          .toString()
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }>
                      {map(
                        (outletMaster) => {
                          return (
                            <Option
                              key={outletMaster.id}
                              value={outletMaster.id}>
                              {outletMaster.name}
                            </Option>
                          );
                        },
                        outletMasterList ? outletMasterList : []
                      )}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="module_id" label="Module">
                    <Select
                      placeholder="select"
                      //disabled={!roleSelected.includes("Models")}
                      onChange={(e) => {
                        // console.log(e.includes(2), "e.includes(2)");
                        // console.log(subModules, "subModules");
                        // console.log(Object.values(subModules), "value");
                        // console.log(serviceFor, "serviceFor");
                      
                        let moduleList = [];
                        if (
                          subModules &&
                          Object.values(subModules)?.length > 0
                        ) {
                          moduleList = Object.values(subModules);
                        }
                      
                        if (e.includes(2)) {
                          // console.log(subModules, "subModules");
                          let data = [...moduleList, ...serviceFor];                       
                          setSubModuleList(data);
                        } else {
                          setSubModuleList(moduleList);
                        }
                      }}
                      mode="multiple"
                      showSearch
                      filterOption={(input, option) =>
                        option.children
                          .toString()
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }>
                      {map(
                        (module) => {
                          return (
                            <Option key={module.id} value={module.id}>
                              {module.name}
                            </Option>
                          );
                        },
                        modulesList
                          ? modulesList?.filter((e) => e.status === "1")
                          : []
                      )}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="sub_module_id" label="Sub Module">
                    <Select
                      placeholder="select"
                      //disabled={!roleSelected.includes("Sub Models")}
                      mode="multiple"
                      showSearch
                      filterOption={(input, option) =>
                        option.children
                          .toString()
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }>
                      {map(
                        (subModule) => {
                          return (
                            <Option
                              key={subModule.custom_id || subModule.id}
                              value={subModule?.custom_id}>
                              {subModule?.name ?? subModule}
                            </Option>
                          );
                        },
                        subModuleList ? subModuleList : []
                      )}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item name="module_screen_id" label="Module Screen">
                    <Select
                      placeholder="select"
                      mode="multiple"
                      showSearch
                      filterOption={(input, option) =>
                        option.children
                          .toString()
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }>
                      {map(
                        (moduleScreen) => {
                          return (
                            <Option
                              key={moduleScreen.id}
                              value={moduleScreen.id}>
                              {moduleScreen.name}
                            </Option>
                          );
                        },
                        modulesScreen
                          ? modulesScreen?.filter((e) => e.status === "1")
                          : []
                      )}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name="department_id"
                    label="Department"
                    rules={[
                      { required: true, message: "Please select Department" },
                    ]}>
                    <Select
                      placeholder="select"
                      showSearch
                      filterOption={(input, option) =>
                        option.children
                          .toString()
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }>
                      {map(
                        (departs) => {
                          return (
                            <Option key={departs.id} value={departs.id}>
                              {departs.name}
                            </Option>
                          );
                        },
                        Depart ? Depart?.filter((e) => e.status === "1") : []
                      )}
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={6}>
                  <Form.Item
                    name="report_to"
                    label="Reporting To"
                    rules={[
                      { required: true, message: "Please select reporting to" },
                    ]}>
                    <Select
                      placeholder="select"
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
                          ? EmployeeList?.filter(
                              (e) =>
                                e?.id !== newEmployee &&
                                e?.department_id === department_id
                            )
                          : []
                      )}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name="report_id"
                    label="Module Report"
                    rules={[
                      { required: true, message: "Please select report" },
                    ]}>
                    <Select
                      placeholder="select"
                      mode="multiple"
                      showSearch
                      filterOption={(input, option) =>
                        option.children
                          .toString()
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }>
                      {map(
                        (Report) => {
                          return (
                            <Option key={Report.id} value={Report.id}>
                              {Report.name}
                            </Option>
                          );
                        },
                        Reports ? Reports?.filter((e) => e.status === "1") : []
                      )}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name={"status"}
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

export default EmployeeMappingForm;
