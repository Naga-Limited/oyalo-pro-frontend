import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useNavigate
  //useLocation
} from "react-router";
import { getRistaCustomerSale } from "../../../@app/subMaster/subMasterSlice";
import { getAllMappedOutlet } from "../../../@app/subMaster/subMasterSlice";
import CustomTable from "../../../components/CustomTableReport";
import { column } from "./column";
import { Card, Row, Col, Form, DatePicker, Select } from "antd";
import apis from "../../../api/entryApis";
import { useForm } from "react-hook-form";

export default function CallEntry({ setTopTitle }) {
  setTopTitle("Customer Call Back Info List");
  const { handleSubmit } = useForm();
  //const { state } = useLocation();
  const { Option } = Select;
  const { type, userData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    getRistaCustomerResponse: { data: dataSource },
    gettingRistaCustomer
  } = useSelector((state) => state.subMaster);
  const empId = userData.data?.id;
  const [selectedOutlets, setselectedOutlets] = useState([]);
  const [dropdownoutlet, setdropdownoutlet] = useState([]);

  const { gettingAllMappedOutlet } = useSelector((state) => state.subMaster);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let result;

        if (type == 1) {
          result = await dispatch(getAllMappedOutlet({
            path: "get-all-mapped-outlet",
            data: {}
          }));
        } else {
          result = await dispatch(
            getAllMappedOutlet({
              path: "get-all-mapped-outlet",
              data: {
                employee: empId,
              }
            ,})
          );
        }
        if (result) {
          const options = result.data.map((item) => ({
            key: item.outlet_code,
            value: item.outlet_code,
            label: `${item.outlet_code}-${item.name}`
          }));

          // Add "Select All" and "Unselect All" options
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
      // If dropdownoutlet is empty or undefined, setselectedOutlets to an empty array
      setselectedOutlets([]);
    } else {
      // Otherwise, select all options (excluding "Select All" and "Unselect All")
      const allValuesExceptSpecial = dropdownoutlet
        .filter(
          (option) =>
            option.value !== "select_all" && option.value !== "unselect_all"
        )
        .map((option) => option.value);
      setselectedOutlets(allValuesExceptSpecial);
    }
  };

  const isSixDigits = (customerId) => /^\d{6}$/.test(customerId);
  const getRowStyle = (params) => {
    if (isSixDigits(params.data.customer_id)) {
      return { backgroundColor: "green" };
    }
    return null;
  };

  const [startDate, setStartDate] = useState(
    useState(new Date().getMonth() + 1)
  );

  const handleFormSubmit = () => {
    const stDate = startDate.toLocaleString({ date: "DD/MM/YYYY" });
    var arr1 = stDate.split(",");
    const startSelectedDate = arr1[1];
    const endSelectedDate = arr1[3];
    if (startDate) {
      if (type === 1)
        dispatch(
          getRistaCustomerSale({
            path: "get-sales-call-entry",
            data: {
              startDate: startSelectedDate,
              endDate: endSelectedDate,
              outletid: selectedOutlets
            }
          })
        );
      else
        dispatch(
          getRistaCustomerSale({
            path: "get-sales-call-entry",
            data: {
              employee: empId,
              startDate: startSelectedDate,
              endDate: endSelectedDate,
              outletid: selectedOutlets
            }
          })
        );
    } else {
      apis.open({ message: "Please choose and Month", type: "error" });
    }
    handleSubmit();
  };

  const handleEditClick = (e) => {
    navigate("/CallEntry/addForm", {
      state: e
    });
  };

  const gridData = (dataSource ?? []).map((e) => {
    return {
      ...e
    };
  });

  useEffect(() => {
    if (type === 1)
      dispatch(
        getRistaCustomerSale({ path: "get-sales-call-entry", data: {} })
      );
    else
      dispatch(
        getRistaCustomerSale({
          path: "get-sales-call-entry",
          data: { employee: empId }
        })
      );
  }, []);

  return (
    <>
      <Card>
        <Form
          name="basic"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          autoComplete="off"
        >
          <Row gutter={[15, 0]}>
            <Col md={{ span: 6 }} xs={{ span: 24 }}>
              <Form.Item name="month" label="Date Filter">
                <DatePicker.RangePicker
                  format="DD-MM-YYYY"
                  value={startDate}
                  onChange={(e) => setStartDate(e)}
                  dateFormat="MMMM d, yyyy"
                />
              </Form.Item>
            </Col>
            <Col md={6} xs={24}>
              <Form.Item label="Outlet Code">
                <Select
                  placeholder="Select"
                  name="status"
                  loading={gettingAllMappedOutlet}
                  maxTagCount={0}
                  label="Waiting At"
                  disabled={false}
                  showSearch
                  mode="multiple"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  value={selectedOutlets}
                  onChange={(newSelectedValues) => {
                    // Handle "Select All" and "Unselect All"
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
        </Form>
      </Card>
      <CustomTable
        loading={gettingRistaCustomer}
        dataSource={gridData}
        handleEditClick={handleEditClick}
        column={column}
        getRowStyle={getRowStyle}
        title={"Call Back Entry List"}
      />
      ;
    </>
  );
}
