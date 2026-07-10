import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router";
import CustomTable from "../../../components/CustomTable";
import { column } from "./column";
import { getUploadedRistaStock } from "../../../@app/subMaster/subMasterSlice";
import { get_Outlet_Name} from "../../../@app/master/masterSlice";
import { useDispatch, useSelector } from "react-redux";
import { PDFViewer, Document, Page, Text, View } from "@react-pdf/renderer";
import { Row, Col, Form, DatePicker, Card,Select } from "antd";
import { useForm, Controller } from "react-hook-form";
import { getAllMappedOutlet } from "../../../@app/subMaster/subMasterSlice";

export default function edcDetails({ setTopTitle }) {
  setTopTitle("Rista Stock Upload Details");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { control } = useForm();
  const handleDownload = () => {
    window.open(
      process.env.REACT_APP_API_BASE_URL + "download-stock-upload",
      "_blank"
    );
  };
  const { handleSubmit } = useForm();
  const { type, userData } = useSelector((state) => state.auth);

  const empId = userData.data?.id;
 
  const { Option } = Select;
  const [showPDF, setShowPDF] = useState(false);

  const togglePDF = () => {
    setShowPDF(!showPDF);
  };

  
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
  const formatDate = (date) => {
    return date.format("YYYY-MM-DD");
  };

  const handleDateRangeChange = (dates) => {
    // Format both start and end dates
    setDaterange(dates.map(formatDate));
  };

  const [showAlert, setShowAlert] = useState(false);
  const handleFormSubmit = () => {   
    if (Daterange.length != 0) {   
      setShowAlert(false);
      if (type == 1)
        dispatch(
          getUploadedRistaStock({
            path: "get-Uploaded-Rista-Stock",
            data: { daterange: Daterange,outlet_id:selectedOutlets }
           })
        );
      else
        dispatch(
          getUploadedRistaStock({
            path: "get-Uploaded-Rista-Stock",
            data: {
              employee:  empId,   
              daterange: Daterange,
              outlet_id:selectedOutlets
            }
          })
        );
    } else {
      setShowAlert(true);
    }
    handleSubmit();
  };

  useEffect(() => {
    if (type === 1)
      dispatch(getUploadedRistaStock({ path: "get-Uploaded-Rista-Stock", data: {} }));
    else
      dispatch(
        getUploadedRistaStock({
          path: "get-Uploaded-Rista-Stock",
          data: { employee: userData.data?.id }
        })
      );
  }, []);

  const [Daterange, setDaterange] = useState([]);

  const {
    gettingUploadedRistaStock,
    getUploadedRistaStockResponse: { data: dataSource }
  } = useSelector((state) => {
    return state.subMaster;
  });

  const onClickUpdateCsv = () => {
    navigate("/stockUploadDetails/csvUpdate", {
      state: {}
    });
  };

  function useMapping(dispatch, getDataFunction, id) {
    const [mapping, setMapping] = useState({});
    useEffect(() => {
      dispatch(getDataFunction()).then((result) => {
        const data = result.data;
        if (typeof data === "object" && Object.keys(data).length > 0) {
          const formattedData = {};
          for (const key in data) {
            if (data[key] !== undefined) {
              formattedData[key] = data[key].name;
            }
          }
          setMapping(formattedData);
        }
      });
    }, [dispatch]);
    return mapping[id];
  }
  const OutletName = useMapping(dispatch, get_Outlet_Name, selectedOutlets);

  const RenderPDF = () => {
    const groupedData = dataSource.reduce((acc, curr) => {
      const key = curr[Object.keys(curr)[0]]; // Assuming the first column is the grouping column
      if (!acc[key]) {
        acc[key] = [curr];
      } else {
        acc[key].push(curr);
      }
      return acc;
    }, {});

    return (     
      <PDFViewer style={{ width: "100%", height: "100vh" }}>
        <Document>      
          <Page size="A7" style={{ padding: "3px", border: 1 }}>
            <Text style={{ fontSize: 7 }}>
              {selectedOutlets} - {OutletName}
            </Text>
            <View
              style={{
                fontSize: 6,
                flexDirection: "row",
                width: "500px",
                border: 1
              }}
            >
              {[
                 "S.No",
                "Product",
                "Qty",
                "Exp_Date",
                ...column.map((col) => col.title),
                "Actual" // Adding the header for the new column
              ].map((header, index) => (
                <Text
                  key={index}
                  style={{
                    width:
                      index === 0
                        ? "30px"
                        : index === 1
                        ? "110px"
                        : index === 2
                        ? "140px"
                        : index === column.length + 3
                        ? "240px"
                        : "90px", // Adjust width for the new column
                    padding: "2px",
                    textAlign:
                      index === 0
                        ? "center"
                        : index === 1
                        ? "center"
                        : index === 2
                        ? "right"
                        : "right"
                  }}
                >
                  {header}
                </Text>
              ))}
            </View>
            {Object.entries(groupedData).map(
              ([groupKey, groupData], groupIndex) => {           
                return (
                  <View key={groupIndex} style={{ width: "260px", border: 1 }}>
                    <Text
                      style={{
                        textAlign: "left",
                        backgroundColor: "#b6d197",
                        fontSize: 6,
                        rowGap: 1
                      }}
                    >
                      {groupKey}
                    </Text>
                    {groupData.map((row, rowIndex) => (
                      <View
                        key={rowIndex}
                        style={{ flexDirection: "row", alignItems: "left" }}
                      >
                        {Object.keys(row)
                          .concat(["actual"])
                          .map(
                            (
                              rowKey,
                              index // Concatenate 'actual' key for the new column
                            ) => (
                              <Text
                                key={index}
                                style={{
                                  width:
                                    index === 0
                                      ? "30px"
                                      : index === 1
                                      ? "170px"
                                      : index === 2
                                      ? "30px"
                                      : index === column.length + 3
                                      ? "90px"
                                      : "90px", // Adjust width for the new column
                                  fontSize: 6,
                                  borderRight: 1,
                                  padding: "2px",
                                  textAlign:
                                    index === 0
                                      ? "center"
                                      : index === 1
                                      ? "left"
                                      : index === 2
                                      ? "center"
                                      : "left"
                                }}
                              >
                                {index === 0 ? rowIndex + 1 : row[rowKey] || ""}{" "}
                                {/* Handle the 'actual' key */}
                              </Text>
                            )
                          )}
                      </View>
                    ))}                   
                  </View>
                );
              }
            )}         
          </Page>
        </Document>
      </PDFViewer>
    );
  };


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
          <button
            style={{
              background: "#4C3566",
              color: "#ffffff",
              margin: "15px"
            }}
            className="btn btn col-lg-2 col-m-2 col-sm-2 h-100 w-auto align-items-center"
            onClick={togglePDF}
          >
            PDF Print
          </button>
        </Row>
      </Card>
      {showAlert && (
        <div style={{ color: "red", fontWeight: "bold", textAlign: "center" }}>
          <span>{"Please Select Outlet & Date Fields"}</span>
        </div>
      )}
       {showPDF && <RenderPDF />}
      <CustomTable
        loading={gettingUploadedRistaStock}
        dataSource={dataSource}
        column={column}
        hideActionBtn={true}
        title={"Rista Stock"}
        handleDownload={handleDownload}
        onClickUpdateCsv={onClickUpdateCsv}
      />
    </>
  );
}
