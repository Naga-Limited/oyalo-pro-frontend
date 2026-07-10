import React, { useState, useEffect } from "react";
import { PDFViewer, Document, Page, Text, View } from "@react-pdf/renderer";
import CustomTable from "../../../components/CustomTable";
import { column } from "./column";
import {
  getStockDetails,
  get_Outlet_Name
} from "../../../@app/master/masterSlice";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Form, DatePicker, Card, Select } from "antd";
import { useForm, Controller } from "react-hook-form";
import { getAllMappedOutlet } from "../../../@app/subMaster/subMasterSlice";

export default function stockDetails({ setTopTitle }) {
  setTopTitle("Stock Details");
  const { Option } = Select;

  const dispatch = useDispatch();
  const [showPDF, setShowPDF] = useState(false);
  const { control } = useForm();

  const togglePDF = () => {
    setShowPDF(!showPDF);
  };
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
          getStockDetails({
            path: "get-stock-taking",
            data: { outletid: selectedOutlets, daterange: Daterange }
          })
        );
      else
        dispatch(
          getStockDetails({
            path: "get-stock-taking",
            data: {
              employee: empId,
              outletid: selectedOutlets,
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
    gettingStockTaking,
    getStockTakingResponse: { data: dataSource }
  } = useSelector((state) => {
    return state.master;
  });

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
      // <PDFViewer style={{ width: "100%", height: "100vh" }}>
      //   <Document>
      //     <Page size="A4">
      //       <Text>
      //         {selectedOutlets} - {OutletName}
      //       </Text>
      //       <View
      //         style={{
      //           fontSize: 10,
      //           flexDirection: "row",
      //           alignItems: "center",
      //           borderWidth: 1
      //         }}
      //       >
      //         {[
      //           "S.No",
      //           "------",
      //           "Product",
      //           "----------",
      //           "Quantity",
      //           ...column.map((col) => col.title)
      //         ].map((header, index) => (
      //           <Text
      //             key={index}
      //             style={{ width: "120px", padding: "5px", textAlign: "right" }}
      //           >
      //             {header}
      //           </Text>
      //         ))}
      //       </View>
      //       {Object.entries(groupedData).map(
      //         ([groupKey, groupData], groupIndex) => {
      //           const groupGrandTotal = groupData.reduce(
      //             (total, currentRow) => total + currentRow[column[3].field],
      //             0
      //           );
      //           return (
      //             <View key={groupIndex}>
      //               <Text
      //                 style={{
      //                   textAlign: "left",
      //                   paddingLeft: "50px",
      //                   backgroundColor: "#b6d197",
      //                   fontSize: 10
      //                 }}
      //               >
      //                 {groupKey}
      //               </Text>
      //               {groupData.map((row, rowIndex) => (
      //                 <View
      //                   key={rowIndex}
      //                   style={{ flexDirection: "row", alignItems: "left" }}
      //                 >
      //                   {Object.keys(row).map((rowKey, index) => (
      //                     <Text
      //                       key={index}
      //                       style={{
      //                         width: "120px",
      //                         fontSize: 8,
      //                         padding: "3px",
      //                         textAlign: "center"
      //                       }}
      //                     >
      //                       {index === 0 ? rowIndex + 1 : row[rowKey]}
      //                     </Text>
      //                   ))}
      //                 </View>
      //               ))}
      //               <Text
      //                 style={{
      //                   textAlign: "left",
      //                   paddingLeft: "50px",
      //                   backgroundColor: "#cfd5e5",
      //                   fontSize: 10
      //                 }}
      //               >
      //                  {groupKey} Total
      //                 -----------------------------------------------------{" "}
      //                 {groupGrandTotal}
      //               </Text>
      //             </View>
      //           );
      //         }
      //       )}
      //       <Text
      //         style={{
      //           textAlign: "left",
      //           paddingLeft: "50px",
      //           backgroundColor: "#b0d8e3",
      //           fontSize: 10
      //         }}
      //       >
      //         Grand Total
      //         -------------------------------------------------------{" "}
      //         {Object.values(groupedData).reduce(
      //           (total, group) =>
      //             total +
      //             group.reduce(
      //               (groupTotal, row) => groupTotal + row[column[3].field],
      //               0
      //             ),
      //           0
      //         )}
      //       </Text>
      //     </Page>
      //   </Document>
      // </PDFViewer>

      <PDFViewer style={{ width: "100%", height: "100vh" }}>
        <Document>
          {/* <Page size="A4">
      <Text>
        {selectedOutlets} - {OutletName}
      </Text>
      <View
        style={{
          fontSize: 8,
          flexDirection: "row",
          alignItems: "left",
          borderWidth: 1,
          fontWeight : "bold",
          border: 1,
        }}
      >
        {[
          "S.No", 
          "    ",        
          "Product", 
          "    ",
          "Quantity",
          ...column.map((col) => col.title),
        ].map((header, index) => (
          <Text
            key={index}
            style={{
              width: index === 0 ? "80px" : "120px" & index === 3 ? "280px" : "120px", // Adjust width for S.No
              padding: "5px",              
              textAlign: index === 0 ? "center" : index === 2 ? "left" : "right" & index === 3 ? "center":"center", // Align S.No in center, Product in left, and Quantity in right
            }}
          >
            {header}
          </Text>
        ))}
      </View>
      {Object.entries(groupedData).map(([groupKey, groupData], groupIndex) => {
        const groupGrandTotal = groupData.reduce(
          (total, currentRow) => total + currentRow[column[3].field],
          0
        );
        return (
          <View key={groupIndex}>
            <Text
              style={{
                textAlign: "left",
                paddingLeft: "50px",
                backgroundColor: "#b6d197",
                fontSize: 8,
                
              }}
            >
              {groupKey}
            </Text>
            {groupData.map((row, rowIndex) => (
              <View
                key={rowIndex}
                style={{ flexDirection: "row", alignItems: "left" }}
              >
                {Object.keys(row).map((rowKey, index) => (
                  <Text
                    key={index}
                    style={{
                      width: index === 0 ? "80px" : index === 1 ? "200px" : index == 2 ? "130px" : "90px" , // Adjust width for S.No
                      fontSize: 8,
                      padding: "3px",
                      textAlign: index === 0 ? "center" : index === 2 ? "left" : index === 2 ? "right" : "left" , 
                    }}
                  >
                    {index === 0 ? rowIndex + 1 : row[rowKey]}
                  </Text>
                ))}
              </View>
            ))}
             <Text
              style={{
                textAlign: "center",
                width : "600px",
                paddingRight: "25px",
                backgroundColor: "#cfd5e5",
                fontSize: 8,
                textWeight :'bold'
              }}
            >             
               {groupGrandTotal}
            </Text>
            <Text
              style={{
                textAlign: "left",
                width : "720px",
                paddingLeft: "50px",
                backgroundColor: "#cfd5e5",
                fontSize: 10,
                rowGap:2,
              }}
            >
               {groupKey} Total              
            </Text>
          </View>
        );
      })}
      <Text
        style={{
          textAlign: "left",
          paddingLeft: "50px",
          backgroundColor: "#b0d8e3",
          fontSize: 10,
        }}
      >
        Grand Total      
       </Text>
      <Text
              style={{
                textAlign: "center",
                width : "600px",
                paddingRight: "25px",
                backgroundColor: "#b0d8e3",
                fontSize: 8,
                textWeight :'bold'
              }}
            >             
               {Object.values(groupedData).reduce(
          (total, group) =>
            total +
            group.reduce(
              (groupTotal, row) => groupTotal + row[column[3].field],
              0
            ),
          0
        )}
            </Text>
    </Page> */}
          {/* <Page size="A8"   
    style={{
        padding:'3px'
        }}>
      <Text  style={{
          fontSize: 6,         
        }}>
        {selectedOutlets} - {OutletName}
      </Text>
      <View
        style={{
          fontSize: 5,
          flexDirection: "row",         
          width:"300px"        
        }}
      >
        {[
          "S.No",         
          "Product",         
          "Quantity",
          ...column.map((col) => col.title),
        ].map((header, index) => (
          <Text
            key={index}
            style={{
              width: index === 0 ? "380px" : index === 1 ? "400px" : index === 2 ? " 400px" : index === 3 ? "480px" : "320px", // Adjust width for S.No
              padding: "2px",              
              textAlign: index === 0 ? "left" : index === 1 ? "right" : index === 2 ? "right" : index === 3 ? "right":"right", // Align S.No in center, Product in left, and Quantity in right
            }}
          >
            {header}
          </Text>
        ))}
      </View>
      {Object.entries(groupedData).map(([groupKey, groupData], groupIndex) => {
        const groupGrandTotal = groupData.reduce(
          (total, currentRow) => total + currentRow[column[3].field],
          0
        );
        return (
          <View key={groupIndex}>
            <Text
              style={{
                textAlign: "left",               
                backgroundColor: "#b6d197",
                fontSize: 5,
                rowGap :1,
              }}
            >
              {groupKey}
            </Text>
            {groupData.map((row, rowIndex) => (
              <View
                key={rowIndex}
                style={{ flexDirection: "row", alignItems: "left" }}
              >
                {Object.keys(row).map((rowKey, index) => (
                  <Text
                    key={index}
                    style={{
                      width: index === 0 ? "80px" : index === 1 ? "600px" : index == 2 ? "100px" : "90px" , // Adjust width for S.No
                      fontSize: 5,                      
                      padding: "1px",
                      textAlign: index === 0 ? "center" : index === 2 ? "right" : index === 2 ? "center" : "left" , 
                    }}
                  >
                    {index === 0 ? rowIndex + 1 : row[rowKey]}
                  </Text>
                ))}
              </View>
            ))}
          
            <Text
              style={{
                textAlign: "right",
                width : "140px",               
                backgroundColor: "#cfd5e5",
                fontSize: 5,              
              }}
            >
               {groupKey} Total                                                           {groupGrandTotal}        
            </Text>
          </View>
        );
      })}
    
       <Text
              style={{
                textAlign: "right",
                width : "140px",              
                backgroundColor: "#b0d8e3",
                fontSize: 5,              
              }}
            >
        Grand Total                                                                                  {Object.values(groupedData).reduce(
          (total, group) =>
            total +
            group.reduce(
              (groupTotal, row) => groupTotal + row[column[3].field],
              0
            ),
          0
        )}    
       </Text>
    
    </Page> */}
          {/* <Page size="C8"   
    style={{
        padding:'3px'
        }}>
      <Text  style={{
          fontSize: 6,         
        }}>
        {selectedOutlets} - {OutletName}
      </Text>
      <View
        style={{
          fontSize: 5,
          flexDirection: "row",         
          width:"350px"        
        }}
      >
        {[
          "S.No",         
          "Product",         
          "Quantity",
          ...column.map((col) => col.title),
        ].map((header, index) => (
          <Text
            key={index}
            style={{
              width: index === 0 ? "380px" : index === 1 ? "400px" : index === 2 ? " 400px" : index === 3 ? "500px" : "320px", // Adjust width for S.No
              padding: "2px",              
              textAlign: index === 0 ? "left" : index === 1 ? "right" : index === 2 ? "right" : index === 3 ? "right":"right", // Align S.No in center, Product in left, and Quantity in right
            }}
          >
            {header}
          </Text>
        ))}
      </View>
      {Object.entries(groupedData).map(([groupKey, groupData], groupIndex) => {
        const groupGrandTotal = groupData.reduce(
          (total, currentRow) => total + currentRow[column[3].field],
          0
        );
        return (
          <View key={groupIndex}>
            <Text
              style={{
                textAlign: "left",               
                backgroundColor: "#b6d197",
                fontSize: 5,
                rowGap :1,
              }}
            >
              {groupKey}
            </Text>
            {groupData.map((row, rowIndex) => (
              <View
                key={rowIndex}
                style={{ flexDirection: "row", alignItems: "left" }}
              >
                {Object.keys(row).map((rowKey, index) => (
                  <Text
                    key={index}
                    style={{
                      width: index === 0 ? "80px" : index === 1 ? "600px" : index == 2 ? "100px" : "90px" , // Adjust width for S.No
                      fontSize: 5,                      
                      padding: "1px",
                      textAlign: index === 0 ? "center" : index === 2 ? "right" : index === 2 ? "center" : "left" , 
                    }}
                  >
                    {index === 0 ? rowIndex + 1 : row[rowKey]}
                  </Text>
                ))}
              </View>
            ))}
          
            <Text
              style={{
                textAlign: "left",
                width : "155px",               
                backgroundColor: "#cfd5e5",
                fontSize: 5,              
              }}
            >
               {groupKey} Total                                                                                              {groupGrandTotal}        
            </Text>
          </View>
        );
      })}
    
       <Text
              style={{
                textAlign: "left",
                width : "160px",              
                backgroundColor: "#b0d8e3",
                fontSize: 5,              
              }}
            >
        Grand Total                                                                                     {Object.values(groupedData).reduce(
          (total, group) =>
            total +
            group.reduce(
              (groupTotal, row) => groupTotal + row[column[3].field],
              0
            ),
          0
        )}    
       </Text>
    
    </Page> */}
          {/* <Page size="A7"   
    style={{
        padding:'3px',
        border: 1
        }}>
      <Text  style={{
          fontSize: 7,         
        }}>
        {selectedOutlets} - {OutletName}
      </Text>
      <View
        style={{
          fontSize: 6,
          flexDirection: "row",         
          width:"500px" ,
          border: 1       
        }}
      >
        {[
          "S.No",         
          "Product",         
          "Quantity",       
          ...column.map((col) => col.title),
        ].map((header, index) => (
          <Text
            key={index}
            style={{
              width: index === 0 ? "300px" : index === 1 ? "300px" : index === 2 ? "100px" : index === 3 ? "200px" : "320px", // Adjust width for S.No
              padding: "2px",              
              textAlign: index === 0 ? "left" : index === 1 ? "center" : index === 2 ? "left" : index === 3 ? "right":"right", // Align S.No in center, Product in left, and Quantity in right              
            }}
          >
            {header}
          </Text>
        ))}
      </View>
      {Object.entries(groupedData).map(([groupKey, groupData], groupIndex) => {
        const groupGrandTotal = groupData.reduce(
          (total, currentRow) => total + currentRow[column[3].field],
          0
        );
        return (
          <View key={groupIndex} style={{width:"200px",border: 1}}>
            <Text
              style={{
                textAlign: "left",               
                backgroundColor: "#b6d197",
                fontSize: 6,              
                rowGap :1,
              }}
            >
              {groupKey}
            </Text>
            {groupData.map((row, rowIndex) => (
              <View
                key={rowIndex}
                style={{ flexDirection: "row", alignItems: "left", }}
              >
                {Object.keys(row).map((rowKey, index) => (
                  <Text
                    key={index}
                    style={{
                      width: index === 0 ? "30px" : index === 1 ? "160px" : index == 2 ? "50px" : "90px" , // Adjust width for S.No
                      fontSize: 6,       
                     // border:1, 
                      borderRight: 1 ,                               
                      padding: "1px",
                      textAlign: index === 0 ? "center" : index === 1 ? "left":index === 2 ? "center" : "left" , 
                    }}
                  >
                    {index === 0 ? rowIndex + 1 : row[rowKey]}
                  </Text>
                ))}
              </View>
            ))}
          
            <Text
              style={{
                textAlign: "left",
                width : "180px",                  
                backgroundColor: "#cfd5e5",
                fontSize: 6,              
              }}
            >
               {groupKey} Total                                                                                                 {groupGrandTotal}        
            </Text>
          </View>
        );
      })}
    
       <Text
              style={{
                textAlign: "left",
                //paddingLeft: "19px",
                width : "100px",              
                backgroundColor: "#b0d8e3",
                fontSize: 6,              
              }}
            >
        Grand Total                                                                                             {Object.values(groupedData).reduce(
          (total, group) =>
            total +
            group.reduce(
              (groupTotal, row) => groupTotal + row[column[3].field],
              0
            ),
          0
        )}    
       </Text>
    
    </Page> */}
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
                        ? "170px"
                        : index === 2
                        ? "40px"
                        : index === column.length + 3
                        ? "80px"
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
                const groupGrandTotal = groupData.reduce(
                  (total, currentRow) => total + currentRow[column[3].field],
                  0
                );
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
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        backgroundColor: "#cfd5e5",
                        fontSize: 6,
                        padding: "2px"
                      }}
                    >
                      <Text style={{ textAlign: "left", width: "90px" }}>
                        {groupKey} Total
                      </Text>
                      <Text style={{ textAlign: "center", width: "185px" }}>
                        {groupGrandTotal}
                      </Text>
                    </View>
                  </View>
                );
              }
            )}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor: "#b0d8e3",
                fontSize: 6,
                padding: "2px"
                // width: '260px',
              }}
            >
              <Text
                style={{ textAlign: "left", width: "150px", borderBottom: 1 }}
              >
                Grand Total
              </Text>
              <Text
                style={{ textAlign: "center", width: "50px", borderBottom: 1 }}
              >
                {Object.values(groupedData).reduce(
                  (total, group) =>
                    total +
                    group.reduce(
                      (groupTotal, row) => groupTotal + row[column[3].field],
                      0
                    ),
                  0
                )}
              </Text>
            </View>
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
        loading={gettingStockTaking}
        dataSource={dataSource}
        column={column}
        hideActionBtn={true}
        title={"Stock Details"}
      />
    </>
  );
}
