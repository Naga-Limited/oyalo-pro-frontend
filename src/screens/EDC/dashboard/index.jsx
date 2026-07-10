import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import { useDispatch, useSelector } from "react-redux";
import { getDashboard } from "../../../@app/subMaster/subMasterSlice";
import { getAllMappedOutlet } from "../../../@app/subMaster/subMasterSlice";
import { Row, Col, Form, DatePicker, Card, Select, Spin } from "antd";
import { useForm } from "react-hook-form";

const ColumnChart = ({ setTopTitle }) => {
  const dispatch = useDispatch();
  const { MonthPicker } = DatePicker;
  const {
    getDashboardResponse: { data: dataSource },
  } = useSelector((state) => state.subMaster);
  const { type, userData } = useSelector((state) => state.auth);
  const { Option } = Select;
  const empId = userData.data?.id;
  const { handleSubmit } = useForm();

  const [selectedOutlets, setSelectedOutlets] = useState([]);
  const [dropdownOutlet, setDropdownOutlet] = useState([]);
  const { gettingAllMappedOutlet } = useSelector((state) => state.subMaster);

  const [startDate, setStartDate] = useState(new Date().getMonth() + 1);

  function getNumericMonth(startDate) {
    return (
      String(
        ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].indexOf(startDate) + 1
      ).padStart(1, "0")
    );
  }
  const monthNewOne = startDate.toLocaleString({ month: "numeric" });
  var arr1 = monthNewOne.split(" ");
  const monthValue = getNumericMonth(arr1[2]);
  const yearValue = arr1[3];

  useEffect(() => {
    const fetchData = async () => {
      try {
        let result;

        if (type === 1) {
          result = await dispatch(
            getAllMappedOutlet({
              path: "get-all-mapped-outlet",
              data: {},
            })
          );
        } else {
          result = await dispatch(
            getAllMappedOutlet({
              path: "get-all-mapped-outlet",
              data: {
                employee: empId,
              },
            })
          );
        }
        if (result) {
          const options = result.data.map((item) => ({
            key: item.outlet_code,
            value: item.outlet_code,
            label: `${item.outlet_code}-${item.name}`,
          }));

          // Add "Select All" and "Unselect All" options
          options.unshift({
            key: "select_all",
            value: "select_all",
            label: "Select All",
          });
          options.unshift({
            key: "unselect_all",
            value: "unselect_all",
            label: "Unselect All",
          });

          setDropdownOutlet(options);
        }
      } catch (error) {
        // Handle errors if necessary
      }
    };

    fetchData();
  }, [type, empId, dispatch]);

  const selectAllOutlets = () => {
    if (!dropdownOutlet || dropdownOutlet.length === 0) {
      setSelectedOutlets([]);
    } else {
      const allValuesExceptSpecial = dropdownOutlet
        .filter(
          (option) => option.value !== "select_all" && option.value !== "unselect_all"
        )
        .map((option) => option.value);
      setSelectedOutlets(allValuesExceptSpecial);
    }
  };

  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleFormSubmit = () => {
    if (selectedOutlets.length !== 0) {
      setShowAlert(false);
      setLoading(true);
      if (type === 1)
        dispatch(
          getDashboard({
            path: "get-dashboard",
            data: { outletid: selectedOutlets, month: monthValue, year: yearValue },
          })
        ).finally(() => setLoading(false));
      else
        dispatch(
          getDashboard({
            path: "get-dashboard",
            data: {
              employee: empId,
              outletid: selectedOutlets,
              month: monthValue,
              year: yearValue,
            },
          })
        ).finally(() => setLoading(false));
    } else {
      setShowAlert(true);
      setLoading(false);
    }
    handleSubmit();
  };

  useEffect(() => {
    setTopTitle("Payment Vs Sales Dashboard");
  }, [setTopTitle]);

  useEffect(() => {
    if (!loading && dataSource && dataSource.length > 0) {
      const chartData = dataSource.map((item) => ({
        name: item.outlet_name,
        y: parseFloat(item.bank_gross_amt),
        rista_payment_amt: parseFloat(item.rista_payment_amt),
        bank_gross_amt: parseFloat(item.bank_gross_amt),
        mode: item.mode ? item.mode : "",
      }));
      Highcharts.chart("container", {
        chart: {
          type: "column",
          width: 1560,
          height: 400,
          responsive: true,
        },
        title: {
          align: "left",
          text: "Payment Status",
        },
        xAxis: {
          type: "category",
        },
        yAxis: {
          title: {
            width: 1560,
            height: 600,
            text: "Amount",
          },
        },
        legend: {
          enabled: false,
        },
        tooltip: {
          headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          pointFormat:
            '<span style="color:{point.color}">{point.name}</span></b><br>' +
            "Rista Payment Amount: <b>{point.rista_payment_amt}</b><br>" +
            "Bank Payment: <b>{point.bank_gross_amt}</b><br>" +
            "Mode: <b>{point.mode}</b><br>",
        },
        series: [
          {
            name: "Mode",
            colorByPoint: true,
            data: chartData,
          },
        ],
      });
    }
  }, [dataSource, loading]);

  return (
    <div>
      <Card>
        {" "}
        <Row gutter={[25, 0]}>
          <Col md={5} xs={24} span={24}>
            <Form.Item
              label="Outlet Code"
              labelCol={{
                md: { span: 24 },
                xs: { span: 24 },
                style: { textAlign: "left" },
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
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                value={selectedOutlets}
                onChange={(newSelectedValues) => {
                  if (newSelectedValues.includes("select_all")) {
                    selectAllOutlets();
                  } else if (newSelectedValues.includes("unselect_all")) {
                    setSelectedOutlets([]);
                  } else {
                    setSelectedOutlets(newSelectedValues);
                  }
                }}
              >
                {dropdownOutlet.map((item) => (
                  <Option key={item.key} value={item.value}>
                    {item.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col md={5} xs={14} span={14}>
            <Form.Item
              name="month"
              label="Month"
              labelCol={{
                md: { span: 14 },
                xs: { span: 14 },
                style: { textAlign: "left" },
              }}
            >
              <MonthPicker
                loading={(e) => e.monthvalue}
                selected={startDate}
                onChange={(e) => (e ? setStartDate(e) : null)}
                monthFormat="MMMM/YYYY"
                format="MMMM-YYYY"
                required
                form="external-form"
                showMonthYearPicker
              />
            </Form.Item>
          </Col>
          <Col md={{ span: 4 }} xs={{ span: 14 }}>
            <Form.Item name="submit">
              <button
                onClick={handleFormSubmit}
                style={{
                  background: "#34b1aa",
                  color: "#ffffff",
                  margin: "15px",
                }}
                className="btn btn col-lg-2 col-m-2 col-sm-2 h-100 w-auto align-items-center"
              >
                Filter
              </button>
            </Form.Item>
          </Col>
        </Row>
        {showAlert && (
          <div style={{ color: "red", fontWeight: "bold", textAlign: "center" }}>
            <span>{"Please Select Outlet & Date Fields"}</span>
          </div>
        )}
      </Card>
      {loading ? (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <Spin size="large" />
        </div>
      ) : (
        <div id="container" style={{ height: "400px", width: "100%" }}></div>
      )}
    </div>
  );
};

export default ColumnChart;
