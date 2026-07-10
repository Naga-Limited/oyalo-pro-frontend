import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import messageToast from "../../../components/messageToast/messageToast";
import { useLocation, useNavigate } from "react-router";
import {
  addConsumableMaster,
  updateConsumableMaster
} from "../../../@app/subMaster/subMasterSlice";
import {
  getStates,
  getSubZonal,
  EmployeeZone
} from "../../../@app/master/masterSlice";
import { getOutlet } from "../../../@app/subMaster/subMasterSlice";
import { map } from "ramda";
import {
  Input,
  Card,
  Button,
  Radio,
  Col,
  Row,
  Form,
  Descriptions,
  message,
  Select
} from "antd";
import { getDefinitionsList } from "../../../@app/subMaster/subMasterSlice";
import { useForm, Controller } from "react-hook-form";
import { transStatus } from "../../../util/transStatus";

function ConsumableMasterForm(mode) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { Option } = Select;

  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(true);
  }, []);

  const {
    register,
    control,
    formState: { errors }
  } = useForm();

  const [messageApi, contextHolder] = message.useMessage();

  const navigate = useNavigate();

  const [materialGroup, setMaterialGroup] = useState();

  useEffect(() => {
    dispatch(getDefinitionsList());
  }, []);

  const {
    gettingDefinitionsList,
    getDefinitionsListResponse: { data: def }
  } = useSelector((state) => {
    return state.subMaster;
  });

  const onClickBack = () => {
    navigate("/consumableMaster");
  };

  
  const { state } = useLocation();
  const isEdit = state?.isEdit || false;
  let defaultValue = state?.data;

  if (defaultValue?.id) {
    form.setFieldsValue({ employee_image: defaultValue?.image ?? "No image" });
  }

  let newMaterialCode;
  const [materialCode, setMaterialCode] = useState("");
  const onChangeMaterialCode = (e) => {
    newMaterialCode = e.target.value;
    setMaterialCode(newMaterialCode);
  };

  let newMaterialDes;
  const [materialDes, setMaterialDes] = useState("");
  const onChangeMaterialDes = (e) => {
    newMaterialDes = e.target.value;
    setMaterialDes(newMaterialDes);
  };

  let newMaterialUom;
  const [materialUom, setMaterialUom] = useState("");
  const onChangeMaterialUom = (e) => {
    newMaterialUom = e.target.value;
    setMaterialUom(newMaterialUom);
  };

  let newMaterialMoq;
  const [materialMoq, setMaterialMoq] = useState("");
  const onChangeMaterialMoq = (e) => {
    newMaterialMoq = e.target.value;
    setMaterialMoq(newMaterialMoq);
  };

  let newStockQty;
  const [stockQty, setStockQty] = useState("");
  const onChangeStockQty = (e) => {
    newStockQty = e.target.value;
    setStockQty(newStockQty);
  };

  
  useEffect(() => {
    dispatch(getStates());
  }, [dispatch]);

  const {
    getStatesResponse: { data: states },
    zoneEmp: { data: Zonals },
    getSubZonalResponse: { data: SubZonals }
  } = useSelector((state) => {
    return state.master;
  });

  const stateID = Form.useWatch("state_id", form);
  const zoneID = Form.useWatch("zone_id", form);
  const subZoneID = Form.useWatch("subzone_id", form);
  useEffect(() => {
    dispatch(EmployeeZone(stateID));
  }, [dispatch, stateID]);

  const [selectedOutlets, setselectedOutlets] = useState([]);

  useEffect(() => {
    dispatch(getSubZonal(zoneID));
  }, [dispatch, zoneID]);

  useEffect(() => {
    dispatch(getOutlet(subZoneID));
  }, [dispatch, subZoneID]);

  useEffect(() => {
    dispatch(getOutlet());
  }, []);

  const {
    getOutletResponse: { data: outletMasterList }
  } = useSelector((state) => {
    return state.subMaster;
  });

  const outletList = outletMasterList?.map((o) => ({
    ...o,
    outlet_code: `${o?.outlet_code} - ${o?.name}`
  }));

  const [status, setStatus] = useState(defaultValue?.status ?? 1);

  const loginType = useSelector((state) => state.auth.type);
  const emp_map = useSelector(
    (state) =>
      state.auth.userData.data && state.auth.userData.data.employee_mapping
  );

  const onFinish = (data) => {
    const outlet = selectedOutlets;
    let id;
    if (defaultValue?.id) {
      id = defaultValue?.id;
    }
    dispatch(
      defaultValue?.id
        ? updateConsumableMaster({
            data: {
              ...data,
              status: transStatus({ status }),
              material_group: materialGroup ? materialGroup : state?.material_group_id,
              material_code: materialCode ? materialCode : state?.material_code,
              material_description: materialDes ? materialDes : state?.material_description,
              material_uom: materialUom ? materialUom : state?.uom,
              material_moq: materialMoq ? materialMoq : state?.moq,
              outlet_id: outlet,
              stock_qty: stockQty ? stockQty : state?.qty,
              id: id ? id : state?.id
            }
          })
        : addConsumableMaster({
            data: {
              ...data,
              outlet_id: outlet,
              material_group: materialGroup,
              material_code: materialCode,
              material_description: materialDes,
              material_uom: materialUom,
              material_moq: materialMoq,
              stock_qty: stockQty,
              status: transStatus({ status })
            }
          })
    ).then(({ message, status, statusText }) => {
      if (status === 200) {
        messageToast({
          message: message ?? statusText,
          status,
          title: "Consumable Master Status"
        });
        navigate("/consumableMaster");
        form.resetFields();
      }
      if (status == 400) {
        messageApi.open({
          type: "warning",
          content: "Consumable Master already exists",
          className: "custom-class",
          style: {
            marginTop: "28vh",
            color: "#d91616",
            fontWeight: "bold"
          }
        });
        return false;
      }
    });
  };

  const { savingConsumableMaster } = useSelector((state) => {
    return state.subMaster;
  });

  return (
    <>
      <Card>
        {contextHolder}
        <Row style={{ justifyContent: "center" }}>
          <Col span={24}>
            <Form
              name="basic"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              initialValues={{
                status: defaultValue?.status === "Active" ? "1" : "0"
              }}
              onFinish={onFinish}
              form={form}
              autoComplete="off"
            >
              <Row gutter={[15, 0]}>
                <Descriptions bordered size="small">
                <Descriptions.Item
                    label={"State"}
                    style={{ width: "150px" }}
                    className={`custom-background ${show ? "show" : ""}`}
                  >
                    <Col>
                      <Form.Item name="state_id">
                        <Select                          
                          mode="multiple"
                          placeholder="select"
                          showSearch
                          filterOption={(input, option) =>
                            option.children
                              .toString()
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {map(
                            (state) => {
                              return (
                                <Option key={state.id} value={state.id}>
                                  {state.name}
                                </Option>
                              );
                            },
                            states
                              ? states?.filter((e) => e.status === "1")
                              : []
                          )}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={"Zone"}
                    style={{ width: "150px" }}
                    className={`custom-background ${show ? "show" : ""}`}
                  >
                    <Col>
                      <Form.Item name="zone_id">
                        <Select
                          placeholder="select"
                          //  disabled={!roleSelected.includes('Zone')}
                          mode="multiple"
                          showSearch
                          // onChange={(e) => setZone(e)}
                          filterOption={(input, option) =>
                            option.children
                              .toString()
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {map(
                            (Zonal) => {
                              return (
                                <Option key={Zonal.id} value={Zonal.id}>
                                  {Zonal.zonal_name}
                                </Option>
                              );
                            },
                            Zonals
                              ? Zonals?.filter((e) => e.status === "1")
                              : []
                          )}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={"Sub Zone"}
                    style={{ width: "150px" }}
                    className={`custom-background ${show ? "show" : ""}`}
                  >
                    <Col>
                      <Form.Item name="subzone_id">
                        <Select
                          placeholder="select"
                          //  disabled={!roleSelected.includes('Sub Zone')}
                          mode="multiple"
                          showSearch
                          //  onChange={(e) => setSubzone(e)}
                          filterOption={(input, option) =>
                            option.children
                              .toString()
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
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
                  </Descriptions.Item>

                  <Descriptions.Item
                    label={"Outlet Name"}
                  //  style={{ width: "150px" }}
                    //className={`custom-background ${show ? "show" : ""}`}
                  >
                    <Col>
                      <Form.Item name="outlet_id">
                        <Controller
                          control={control}
                          name="outlet_id"
                          render={({ field }) => (
                            <Select
                            style={{ paddingTop:'16px',width: "290px" }}
                              {...register("outlet_id", {
                                required: mode === "add"
                              })}
                              disabled={mode === "edit"}
                              mode="multiple"
                              placeholder="Select"
                              maxTagCount={0}
                             // style={{ width: "250px" }}
                              showSearch
                              value={selectedOutlets}
                              {...field}
                              onChange={(selectedOutlets) => {
                                if (selectedOutlets.includes("select_all")) {
                                  // Select All logic
                                  field.onChange(
                                    outletList.map((outlet) => outlet.id)
                                  );
                                  //  field.onChange(selectedOutlets);
                                  setselectedOutlets(
                                    outletList.map((outlet) => outlet.id)
                                  );
                                } else if (
                                  selectedOutlets.includes("unselect_all")
                                ) {
                                  // Unselect All logic
                                  field.onChange([]);
                                } else {
                                  // Regular selection logic
                                  field.onChange(selectedOutlets);
                                  setselectedOutlets(selectedOutlets);
                                }
                              }}
                              filterOption={(input, option) =>
                                option.children
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0
                              }
                            >
                              {/* Add "Select All" and "Unselect All" options */}
                              <Option key="select_all" value="select_all">
                                Select All
                              </Option>
                              <Option key="unselect_all" value="unselect_all">
                                Unselect All
                              </Option>
                              {outletList &&
                                outletList
                                  .filter((e) => {
                                    if (loginType === 2) {
                                      let fid =
                                        emp_map &&
                                        emp_map.outlet.findIndex(
                                          (x) => Number(x.id) === Number(e.id)
                                        );
                                      return fid !== -1;
                                    } else {
                                      return true;
                                    }
                                  })
                                  .map((outlet) => (
                                    <Option key={outlet?.id} value={outlet?.id}>
                                      {outlet?.outlet_code}
                                    </Option>
                                  ))}
                            </Select>
                          )}
                        />
                      </Form.Item>
                    </Col>
                    {errors?.outlet_id && (
                      <p style={{ color: "red" }}>Please select Outlet</p>
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={"Material Group"}
                    className={`custom-background ${show ? "show" : ""}`}
                    style={{ width: "150px" }}
                  >
                    <Select
                      placeholder="Select"
                      style={{
                      width: "290px",
                      //  height: "34px",
                        border: "2px solid #f5a60b",
                        borderRadius: "10px"
                      }}
                      name="definition_list"
                      loading={gettingDefinitionsList}
                      onChange={(e) => setMaterialGroup(e)}
                      defaultValue={defaultValue?.material_group}
                      showSearch
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {map(
                        (state) => {
                          return (
                            <Option key={state.id} value={state.id}>
                              {state.def_list_name}
                            </Option>
                          );
                        },
                        def
                          ? def?.filter((e) => e.def_title == "Material Group")
                          : []
                      )}
                    </Select>
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={"Material Code"}
                    className={`custom-background ${show ? "show" : ""}`}
                  >
                    <Input
                      name="material_code"
                      onChange={onChangeMaterialCode}
                      defaultValue={defaultValue?.material_code}
                      style={{ width: "300px" }}
                    />
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={"Material Description"}
                    className={`custom-background ${show ? "show" : ""}`}
                  >
                    <Input
                      name="material_des"
                      onChange={onChangeMaterialDes}
                      defaultValue={defaultValue?.material_description}
                      style={{ width: "300px" }}
                    />
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={"Unit of Measurement - UOM"}
                    className={`custom-background ${show ? "show" : ""}`}
                  >
                    <Input
                      name="material_uom"
                      onChange={onChangeMaterialUom}
                      defaultValue={defaultValue?.uom}
                      style={{ width: "180px" }}
                    />
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={"Minimum Order Quantity - MOQ(30 Days)"}
                    className={`custom-background ${show ? "show" : ""}`}
                  >
                    <Input
                      name="material_moq"
                      onChange={onChangeMaterialMoq}
                      defaultValue={defaultValue?.moq}
                      style={{ width: "180px" }}
                    />
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={"Stock Minimum Qty 7 days"}
                    className={`custom-background ${show ? "show" : ""}`}
                  >
                    <Input
                      name="stock_qty"
                      onChange={onChangeStockQty}
                      defaultValue={defaultValue?.qty}
                      style={{ width: "180px" }}
                    />
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={"* Status"}
                    className={`custom-background ${show ? "show" : ""}`}
                    style={{ width: "120px", color: "#f70707" }}
                    name="status"
                  >
                    <Radio.Group
                      buttonStyle="solid"
                      onChange={(e) => {
                        setStatus(e?.target?.value);
                      }}
                      size="small"
                      defaultValue={
                        defaultValue?.status === "In Active" ? 0 : 1
                      }
                    >
                      <Radio.Button className="active" value={1}>
                        Active
                      </Radio.Button>
                      <Radio.Button className="in-active" value={0}>
                        In-Active
                      </Radio.Button>
                    </Radio.Group>
                  </Descriptions.Item>
                </Descriptions>
                <Col span={24}>
                  <Row gutter={[15, 15]} style={{ justifyContent: "end" }}>
                    <Col
                      span={12}
                      style={{ textAlign: "right" }}
                      className="d-flex align-items-center justify-content-end mt-3"
                    >
                      <Form.Item className="mx-2">
                        <Button
                          loading={savingConsumableMaster}
                          className="orangeFactory"
                          type="primary"
                          htmlType="submit"
                        >
                          {isEdit ? "Update" : "Add"}
                        </Button>
                      </Form.Item>
                      {/* </Col>
                    <Col span={12}> */}
                      <Form.Item>
                        <Button onClick={onClickBack}>Back</Button>
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

export default ConsumableMasterForm;
