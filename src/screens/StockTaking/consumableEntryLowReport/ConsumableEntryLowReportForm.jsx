import React, { useEffect, useState } from "react";
import { Card, Button, Col, Row, Form, Collapse, Input } from "antd";
import { useNavigate } from "react-router-dom";
import apis from "../../../api/stateAPI";
import { useLocation } from "react-router-dom";
import ConfirmOnExit from "../../../components/confirmOnExit/ConfirmOnExit";
import { DoubleRightOutlined } from "@ant-design/icons";

function ConsumableEntryLowReportForm() {
  const { state } = useLocation();
  const { Panel } = Collapse;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    material_group: [],
  });
  const [showDialog, setShowDialog] = useState(false);
  const [form] = Form.useForm();

  const handleClickBack = () => {
    navigate("/consumableEntryLowReport");
  };

  useEffect(() => {
    if (state?.data) {
      setFormData(state.data);
    } else if (state?.outlet_id) {
      apis.getLowConsumableReport({ id: state.id, outlet_id: state.outlet_id }).then((res) => {
        if (res.data.status === 200) {
          const data = res.data.data || [];
          const material_group = Object.values(data[0].material_group || {}).map(group => ({
            ...group,
            description: group.description || []
          }));
          setFormData({ material_group });
          console.log(material_group, 'material_group');
        }
      });
    }
  }, [state?.data, state?.outlet_id]);

  const handleScoreChange = (i, j, event) => {
    const { name, value } = event.target;
    let data = [...formData.material_group];
    if (data[i] && data[i].description[j]) {
      data[i].description[j][name] = value;
      setFormData((fd) => ({ ...fd, material_group: data }));
    }
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
                          accordion
                          key={i}
                          style={{
                            width: "700px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            background: "#73716d",
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
                            header={
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  color: "#FFFFFF",
                                  justifyContent: "space-between",
                                }}
                              >
                                <label>{cat.material_group_id}</label>
                              </div>
                            }
                            key={i}
                          >
                            {cat.description &&
                              cat.description.map((desc, j) => (
                                <div
                                  style={{
                                    display: "flex",
                                    padding: "2px",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                  }}
                                  key={j}
                                >
                                  <span>{desc.material_description}</span>
                                  <Form.Item
                                    style={{ height: "2px" }}
                                    name={`stock_qty_${i}_${j}`}
                                    rules={[
                                      {
                                        pattern: /^[0-9]+$/g,
                                        message: "Invalid quantity",
                                      },
                                    ]}
                                  >
                                    <Input
                                      className="mx-1 my-1"
                                      required="required"
                                      type="number"
                                      min="0"
                                      style={{
                                        width: "70px",
                                      }}
                                      defaultValue={desc.stock_qty}
                                      onChange={(e) => handleScoreChange(i, j, e)}
                                      name="stock_qty"
                                      placeholder=""
                                    />
                                  </Form.Item>
                                </div>
                              ))}
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

export default ConsumableEntryLowReportForm;
