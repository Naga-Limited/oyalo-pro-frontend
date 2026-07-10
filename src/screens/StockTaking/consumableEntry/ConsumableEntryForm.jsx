import React, { useEffect, useState } from "react";
import { Card, Button, Col, Row, Form, Collapse, Input } from "antd";
import { useNavigate } from "react-router-dom";
import apis from "../../../api/stateAPI";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import ConfirmOnExit from "../../../components/confirmOnExit/ConfirmOnExit";
import messageToast from "../../../components/messageToast/messageToast";
import { DoubleRightOutlined } from "@ant-design/icons";

function ConsumableEntryForm() {
  const { state } = useLocation();
  const { Panel } = Collapse;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    material_group: [],
  });
  const [showDialog, setShowDialog] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const userData = useSelector((state) => state.auth);
  const handleClickBack = () => {
    navigate("/consumableEntry");
  };

  const { handleSubmit } = useForm();

  useEffect(() => {
    if (state?.data) {
      setFormData(state.data);
    } else {
      apis.getConsumableAll({ outlet_id: state?.outlet_id }).then((res) => {
        if (res.data.status === 200) {
          const data = res.data.data || [];
          const material_group = Object.values(data)
            .filter((group) =>
              group.some(
                (item) =>
                  item.description !== undefined && item.description.length > 0
              )
            )
            .flat();
          setFormData({ ...state, material_group });
        }
      });
    }
  }, [state?.data, state?.outlet_id]);

  const handleScoreChange = (i, j, event) => {
    const { name, value } = event.target;
    let data = [...formData.material_group];
    data[i].description[j][name] = value;
    setFormData((fd) => ({ ...fd, material_group: data }));
  };

  const onFinish = () => {
    let outlet_id = state?.outlet_id;
    setShowDialog(false);
    setApiError("");   
    let submitted = {
      ...formData,
      created_by: userData.userData.data?.id ?? "0",
      outlet_id: outlet_id
    };
    setLoading(true);
    apis.addConsumableEntry(submitted).then((res) => {
      if (res.data.status === 200) {
        setTimeout(() => {
          messageToast({
            message: res.data.statusText,
            statusText: res.data.statusText,
            title: "Consumable Entry Submitted"
          });
          navigate("/consumableEntry");
        }, 2000);
      } else if (res.data.status === 300) {
        messageToast({
          message: res.data.statusText,
          statusText: res.data.statusText,
          title: "Consumable"
        });
        setLoading(false);
      } else {
        setApiError(res?.data?.message ?? "Something went wrong");
        setLoading(false);
      }     
    })
      .catch((error) => {
        console.error("Error submitting consumable entry:", error);
        setApiError("Failed to submit. Please try again.");
        setLoading(false);
      });
  };

  return (
    <>
      <Card>
        <ConfirmOnExit showModel={showDialog} />
        <Row style={{ justifyContent: "center" }}>
          <Col span={24}>
            <Form
              onFieldsChange={() => setShowDialog(true)}
              name="basic"
              form={form}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              autoComplete="off"
            >
              <Row gutter={[15, 0]}>
                <Col span={24}>
                  {formData.material_group.length > 0
                    ? formData.material_group.map((cat, i) => (
                      <Collapse
                      defaultActiveKey={i}
                      accordion
                      key={i}
                        style={{
                          width: "700px",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          background: "#73716d"
                        }}
                        expandIcon={({ isActive }) => (
                          <DoubleRightOutlined
                            style={{ color: "#F08000" }}
                            rotate={isActive ? 90 : 0}
                          />
                        )}
                        className="d-flex flex-column"
                      >
                        <Panel
                        defaultActiveKey={i}
                        accordion                     
                          header={
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                color: "#FFFFFF",
                                fontWeight:"bold",
                                justifyContent: "space-between"
                              }}
                            >
                              <label>{cat.material_group}</label>
                            </div>
                          }
                          key={i}
                        >
                          {cat.description !== undefined
                            ? cat.description.map((item, j) => (
                              <div
                                style={{
                                  display: "flex",
                                  padding: "2px",
                                  flexDirection: "row",
                                  justifyContent: "space-between"
                                }}
                                key={j}
                              >
                                <span 
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    color: "#98086C",
                                    fontWeight:"bold",
                                    justifyContent: "space-between",                               
                                  }}>{item.material_description}</span>
                           

                             
                                <Form.Item
                                  style={{ height: "2px" }}
                                  name={`stock_qty_${i}_${j}`}
                                  rules={[
                                    {
                                      pattern: /^[0-9]+$/g,
                                      message: "Invalid quantity"
                                    }
                                  ]}
                                >   
                                 <span 
                                  style={{                                   
                                    color: "#98086C",
                                    fontWeight:"bold",                                                                 
                                  }}>{item.uom}</span>
                                  <Input
                                    className="mx-1 my-1"
                                    required="required"
                                    type="number"
                                    min="0"
                                    style={{
                                      width: "70px"
                                    }}
                                    onChange={(e) => handleScoreChange(i, j, e)}
                                    name="stock_qty"
                                    placeholder=""
                                  />
                                </Form.Item>
                              </div>
                            ))
                            : null}
                        </Panel>
                      </Collapse>
                    ))
                    : "No Data"}
                </Col>
                <Col span={24}>
                  <Row
                    gutter={[15, 15]}
                    style={{ justifyContent: "center", marginTop: "20px" }}
                  >
                    <Col span={12} style={{ textAlign: "right" }}>
                      <Form.Item
                        wrapperCol={{ offset: 8, span: 16, padding: "15px" }}
                      >
                        <Button
                          style={{ backgroundColor: "#34b1aa" }}
                          type="primary"
                          onClick={handleSubmit(onFinish)}
                          loading={loading}
                        >
                          {"Submit"}
                        </Button>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item>
                        <Button onClick={handleClickBack}>Back</Button>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={[15, 15]} style={{ justifyContent: "center" }}>
                    <Col span={12} style={{ textAlign: "right" }}>
                      {typeof apiError === "object" ? (
                        Object?.values(apiError)?.map((e) => (
                          <div key={e?.[0]} className="text-danger">
                            {e?.[0]}
                          </div>
                        ))
                      ) : (
                        <div className="text-danger">{apiError}</div>
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
}

export default ConsumableEntryForm;
