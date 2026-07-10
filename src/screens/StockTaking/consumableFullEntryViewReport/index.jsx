import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import CustomTable from "../../../components/CustomTable";
import { generateColumns } from "./column";
import { getConsumableFullViewReport } from "../../../@app/subMaster/subMasterSlice";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Form, DatePicker, Card } from "antd";
import { useForm, Controller } from "react-hook-form";

export default function ConsumableEntryReport({ setTopTitle }) {
  setTopTitle("Consumable Report Details");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { control } = useForm();
  const handleEditClick = (data) => {
    navigate("/consumableEntryReport/addForm", {
      state: { ...data, outlet_id: data?.outlet_id, id: data?.id }
    });
  };
  const { type, userData } = useSelector((state) => state.auth);

  useEffect(() => {
    if (type === 1)
      dispatch(
        getConsumableFullViewReport({ path: "get-Consumable-Fullview-Report", data: {} })
      );
    else
      dispatch(
        getConsumableFullViewReport({
          path: "get-Consumable-Fullview-Report",
          data: { employee: userData.data?.id }
        })
      );
  }, [dispatch, type, userData]);

  const {
    gettingConsumableFullViewReport,
    getConsumableFullViewReportResponse: { data: dataSource }
  } = useSelector((state) => {
    return state.subMaster;
  });

  
  const columns = generateColumns(dataSource);

  const { handleSubmit } = useForm();

  const empId = userData.data?.id;

 
  const disabledFutureDates = (current) => {
    const today = new Date();
    return current && current > today;
  };

  const formatDate = (date) => {
    return date.format("YYYY-MM-DD");
  };

  const handleDateRangeChange = (dates) => {
    setDaterange(dates.map(formatDate));
  };

  const [showAlert, setShowAlert] = useState(false);
  const handleFormSubmit = () => {
    if (Daterange.length != 0) {
      setShowAlert(false);
      if (type == 1)
        dispatch(
          getConsumableFullViewReport({
            path: "get-Consumable-Fullview-Report",
            data: { daterange: Daterange }
          })
        );
      else
        dispatch(
          getConsumableFullViewReport({
            path: "get-Consumable-Fullview-Report",
            data: {
              employee: empId,            
              daterange: Daterange
            }
          })
        );
    } else {
      setShowAlert(true);    
    }
    handleSubmit();
  };
 

  const [Daterange, setDaterange] = useState([]);

  // Add serial number to rows
  const rowsWithSerialNumbers = dataSource ? dataSource.map((row, index) => ({
    ...row,
    "S.No": index + 1
  })) : [];

  // Render only when dataSource has data
  if (!dataSource) return null;

  return (
    <>  
      <Card>
        {" "}
        <Row gutter={[25, 0]}>
          
          <Col md={{ span: 6 }} xs={{ span: 24 }}>
            <Form.Item
              name="dateRange"
              label="Date Range"
              labelCol={{
                md: { span: 24 },
                xs: { span: 24 },
                style: { textAlign: "left" }
              }}
            >
              <Controller
                control={control}
                name="dateRange"
                render={() => (
                  <DatePicker.RangePicker
                    style={{
                      color: "#f5a60b",
                      fontWeight: "bold",
                      boxShadow: "none",
                      textAlign: "center"
                    }}
                    onChange={handleDateRangeChange}
                    disabledDate={disabledFutureDates}
                  />
                )}
              />
            </Form.Item>
          </Col>
          <Col md={{ span: 4 }} xs={{ span: 24 }}>
            <Form.Item name="submit">
              <button
                onClick={handleFormSubmit}
                style={{
                  background: "#34b1aa",
                  color: "#ffffff",
                  margin: "15px"
                }}
                className="btn btn col-lg-2 col-m-2 col-sm-2 h-100 w-auto align-items-center"
              >
                Filter
              </button>
            </Form.Item>
          </Col>
        </Row>
      </Card>
      {showAlert && (
        <div style={{ color: "red", fontWeight: "bold", textAlign: "center" }}>
          <span>{"Please Select Outlet & Date Fields"}</span>
        </div>
      )}
      {/* Render CustomTable only when dataSource has data */}
      {dataSource && (
        <CustomTable
          loading={gettingConsumableFullViewReport}
          dataSource={rowsWithSerialNumbers}
          column={columns}
          handleEditClick={handleEditClick}
          title={"Consumable Report Details"}
        />
      )}
    </>
  );
}
