import React, { useState, useEffect } from "react";
import CustomTable from "../../../components/CustomTable";
import { column } from "./column";
import {
  getCalendarEventReport
} from "../../../@app/subMaster/subMasterSlice";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Form, DatePicker, Card, Select } from "antd";
import { useForm, Controller } from "react-hook-form";
import { getAllMappedOutlet } from "../../../@app/subMaster/subMasterSlice";

export default function calendarDetails({ setTopTitle }) {
  setTopTitle("Calendar Event Details");
  const { Option } = Select;

  const dispatch = useDispatch();
  const { control } = useForm();

  const { handleSubmit } = useForm();
  const { type, userData } = useSelector((state) => state.auth);

  const empId = userData.data?.id;

  const [selectedOutlets, setselectedOutlets] = useState([]);
  const [dropdownoutlet, setdropdownoutlet] = useState([]);
  const { gettingAllMappedOutlet } = useSelector((state) => state.subMaster);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let result;
        if (type == 1) {
          result = await dispatch(
            getAllMappedOutlet({
              path: "get-all-mapped-outlet",
              data: {}
            })
          );
        } else {
          result = await dispatch(
            getAllMappedOutlet({
              path: "get-all-mapped-outlet",
              data: {
                employee: empId
              }
            })
          );
        }
        if (result) {
          const options = result.data.map((item) => ({
            key: item.outlet_code,
            value: item.outlet_code,
            label: `${item.outlet_code}-${item.name}`
          }));
          options.unshift({
            key: "select_all",
            value: "select_all",
            label: "Select All"
          });
          options.unshift({
            key: "unselect_all",
            value: "unselect_all",
            label: "Unselect All"
          });
          setdropdownoutlet(options);
        }
      } catch (error) {
        // Handle errors if necessary
      }
    };

    fetchData();
  }, [type, empId, dispatch]);

  const SelectAllOutlets = () => {
    if (!dropdownoutlet || dropdownoutlet.length === 0) {
      setselectedOutlets([]);
    } else {
      const allValuesExceptSpecial = dropdownoutlet
        .filter(
          (option) =>
            option.value !== "select_all" && option.value !== "unselect_all"
        )
        .map((option) => option.value);
      setselectedOutlets(allValuesExceptSpecial);
    }
  };

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
          getCalendarEventReport({
            path: "get-Calendar-Event-Report",
            data: { outlet_id: selectedOutlets, daterange: Daterange }
          })
        );
      else
        dispatch(
          getCalendarEventReport({
            path: "get-Calendar-Event-Report",
            data: {
              employee: empId,
              outlet_id: selectedOutlets,
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

  const {
    gettingCalendarEventReport,
    getCalendarEventReportResponse: { data: dataSource }
  } = useSelector((state) => {
    return state.subMaster;
  });

  return (
    <>
      {" "}
      <Card>
        {" "}
        <Row gutter={[25, 0]}>
          <Col md={5} xs={24} span={24}>
            <Form.Item
              label="Outlet Code"
              labelCol={{
                md: { span: 24 },
                xs: { span: 24 },
                style: { textAlign: "left" }
              }}
            >
              <Select
                placeholder="Select"
                loading={gettingAllMappedOutlet}
                maxTagCount={0}
                label="Outlet Code"
                disabled={false}
                showSearch
                mode="multiple"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                value={selectedOutlets}
                onChange={(newSelectedValues) => {
                  if (newSelectedValues.includes("select_all")) {
                    SelectAllOutlets();
                  } else if (newSelectedValues.includes("unselect_all")) {
                    setselectedOutlets([]);
                  } else {
                    setselectedOutlets(newSelectedValues);
                  }
                }}
              >
                {dropdownoutlet.map((item) => (
                  <Option key={item.key} value={item.value}>
                    {item.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
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
     
      <CustomTable
        loading={gettingCalendarEventReport}
        dataSource={dataSource}
        column={column}
        hideActionBtn={true}
        title={"Calendar Event Report"}
      />
    </>
  );
}
