import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEBReadingReport } from "../../../@app/subMaster/subMasterSlice";
import CustomTable from "../../../components/CustomTable";
import { column } from "./column";
import { Row, Col, Form, DatePicker,Card,Select } from "antd";
//import apis from "../../../api/entryApis";
import { useForm,Controller } from "react-hook-form";
import { getAllMappedOutlet } from "../../../@app/subMaster/subMasterSlice";

export default function EBReadingReport({ setTopTitle }) {
  setTopTitle("EBReading Report");
  const { Option } = Select;
  //const { state } = useLocation();
  const { handleSubmit } = useForm();
  const { type, userData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { control } = useForm();
  
  const {
    getEBReadingReportResponse: { data: dataSource },
    gettingEBReadingReport
  } = useSelector((state) => state.subMaster);
  const empId = userData.data?.id;

  //const myArray = [];
  const [Daterange, setDaterange] = useState([]);
  // 

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

  const disabledFutureDates = (current) => {
    // Create a Date object for today
    const today = new Date();

    // If a date is after today, disable it
    return current && current > today;
  };

  const formatDate = (date) => {
    return date.format('YYYY-MM-DD');
  };


  const handleDateRangeChange = (dates) => {
    // Format both start and end dates
    setDaterange(dates.map(formatDate));

  };
  
  const [showAlert, setShowAlert] = useState(false);
  const handleFormSubmit = () => {
    if (selectedOutlets.length != 0) {
      setShowAlert(false);     
      if (type == 1)
      dispatch(
        getEBReadingReport({
          path: "get-EBReading-report",
          data: { outletid: selectedOutlets, daterange: Daterange
          }
        })
      );
    else
      dispatch(
        getEBReadingReport({
          path: "get-EBReading-report",
          data: {
            employee: empId,
            outletid: selectedOutlets, daterange: Daterange
          }
        })
      );
    }
    else {
      setShowAlert(true);
    }
    handleSubmit();
  };


  const gridData = (dataSource ?? []).map((e) => {
    return {
      ...e
    };
  });

  useEffect(() => {
    if (type === 1)
      dispatch(
        getEBReadingReport({ path: "get-EBReading-report", data: {} })
      );
    else
      dispatch(
        getEBReadingReport({
          path: "get-EBReading-report",
          data: { employee: empId }
        })
      );
  }, []);

  return (
    <>
    <Card>
      <Row gutter={[25, 0]}>
      
        <Col md={5} xs={24} span={24} >
              <Form.Item
                label="Outlet Code"
                labelCol={{ md: { span: 24 }, xs: { span: 24 }, style: { textAlign: 'left' } }}
              >
                <Select
                  placeholder="Select"
                  loading={gettingAllMappedOutlet}
                  maxTagCount={0}
                  label='Outlet Code'
                  disabled={false}
                  showSearch
                  mode="multiple"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
        
           <Col md={{ span: 6 }} xs={{ span: 24 }}>

            {/* {selectedOutlets.length > 3 ? (
              <Form.Item name="dateRange" label="Date "
                labelCol={{ md: { span: 24 }, xs: { span: 24 }, style: { textAlign: 'left' } }}>
                <Controller
                  control={control}
                  name="dateRange"
                  render={() => (
                    <DatePicker
                      style={{
                        color: "#f5a60b",
                        fontWeight: "bold",
                       // borderColor: "black",
                        boxShadow: "none",
                        textAlign: "center",
                        width: "100%"
                      }}
                      picker='date'
                      onChange={(date) => {
                        // Format the date to 'yyyy-mm-dd' format
                        const dateValue = date.format('YYYY-MM-DD');
                        myArray[0] = dateValue;
                        myArray[1] = dateValue;
                        setDaterange(myArray);
                      }}
                      disabledDate={disabledFutureDates} // Pass the disabled date function here
                    />
                  )}
                />
              </Form.Item>
            ) : ( */}
              <Form.Item
                name="dateRange"
                label="Date Range"
                labelCol={{ md: { span: 24 }, xs: { span: 24 }, style: { textAlign: 'left' } }}
              >
                <Controller
                  control={control}
                  name="dateRange"
                  render={() => (
                    <DatePicker.RangePicker
                      style={{
                        color: "#f5a60b",
                        fontWeight: "bold",
                       // borderColor: "black",
                        boxShadow: "none",
                        textAlign: "center",
                      }}
                      onChange={handleDateRangeChange}
                      disabledDate={disabledFutureDates}
                    />
                  )}
                />
              </Form.Item>
            {/* )} */}
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
      {showAlert && <div style={{ color: 'red', fontWeight: 'bold', textAlign: 'center' }}><span>{'Please Select Outlet & Date Fields'}</span></div>}
      <CustomTable
        loading={gettingEBReadingReport}
        dataSource={gridData}
       // handleEditClick={handleEditClick}
        column={column}
        title={"EBReading Report"}
      />
      ;
    </>
  );
}
