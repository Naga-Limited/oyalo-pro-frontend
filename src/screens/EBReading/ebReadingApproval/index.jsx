import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate} from "react-router";
import { getEBReadingApprovalEntry } from "../../../@app/subMaster/subMasterSlice";
import CustomTable from "../../../components/CustomTable";
import { Row, Col, Form, DatePicker,Card,Select,Image,Button } from "antd";
import messageToast from "../../../components/messageToast/messageToast";
import apis from "../../../api/stateAPI";
import { useForm,Controller } from "react-hook-form";
import { getAllMappedOutlet } from "../../../@app/subMaster/subMasterSlice";
import { ebReadingStatus } from "../../../components/formComponents/CommonFunctions";
import { format } from 'date-fns';
import { Badge, Modal, 
//  Input
 } from "antd";
import ConfirmOnExit from "../../../components/confirmOnExit/ConfirmOnExit";
import { map } from "ramda";
import { getDefinitionsList } from "../../../@app/subMaster/subMasterSlice";

export default function EBReadingApproval({ setTopTitle }) {
  setTopTitle("EB Reading Approval List");
  const { Option } = Select;
  const [form] = Form.useForm();

  const { handleSubmit } = useForm();
  const { type, userData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [status, setStatus] = useState();
  // const { TextArea } = Input;
  const { control } = useForm();
  const navigate = useNavigate();
  const [approveModal, setApproveModal] = useState({});
  const [showDialog, setShowDialog] = useState(false);
  const {
    getEBReadingApprovalEntryResponse: { data: dataSource },
    gettingEBReadingApprovalEntry
  } = useSelector((state) => state.subMaster);

  const empId = userData.data?.id;
  const [loading, setLoading] = useState(false);
  //const myArray = [];
  const [Daterange, setDaterange] = useState([]);

  const [selectedOutlets, setselectedOutlets] = useState([]);
  const [dropdownoutlet, setdropdownoutlet] = useState([]);

  const { gettingAllMappedOutlet } = useSelector((state) => state.subMaster);

  useEffect(() => {
    dispatch(getDefinitionsList());
  }, []);
  
  const {
    gettingDefinitionsList,
    getDefinitionsListResponse: { data: def }
  } = useSelector((state) => {
    return state.subMaster;
  });

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
    return date.format("YYYY-MM-DD");
  };

  const handleDateRangeChange = (dates) => {
    // Format both start and end dates
    setDaterange(dates.map(formatDate));
  };

  const [showAlert, setShowAlert] = useState(false);
  const handleFormSubmit = () => {
    if (selectedOutlets.length != 0) {
      setShowAlert(false);
      dispatch(
        getEBReadingApprovalEntry({
          path: "get-EBReading-ApprovalEntry",
          data: { outletid: selectedOutlets, daterange: Daterange }
        })
      );
    } else {
      setShowAlert(true);
    }
    handleSubmit();
  };
  const [selected, updateSelected] = useState([]);


  const onChecked = (isChecked, id) => {
    if (!isChecked) {
      selected.splice(selected.indexOf(id), 1);
    } else {
      selected.push(id);
    }
    updateSelected([...selected]);
  };

  const gridData = Array.isArray(dataSource)
    ? dataSource.map((e) => ({ ...e }))
    : [];

  const onFinish = () => {
    let approve_ebReading = gridData.filter((value) =>
      selected.includes(value.id)
    );
    // Extract "id" values from the approve_ebReading array
    let entryIds = approve_ebReading.map((item) => item.id);
    let submitted = {
      ebEntry_id: entryIds, // Use the extracted "id" values
      approve_remarks: status,     
    };

    setLoading(true);
    setApproveModal(false);
    apis.addEBReadingapprove(submitted).then((res) => {
      if (res.data.status === 200) {
        setTimeout(() => {
          messageToast({
            message: res.data.message,
            statusText: res.data.statusText,
            title: "EB Reading Approval Status"
          });
          setLoading(false);
          if (type === 1)
            dispatch(
              getEBReadingApprovalEntry({
                path: "get-EBReading-ApprovalEntry",
                data: {}
              })
            );
          else
            dispatch(
              getEBReadingApprovalEntry({
                path: "get-EBReading-ApprovalEntry",
                data: {
                  employee: empId
                }
              })
            );
          navigate("/ebReadingApproval");
        }, 1000);
       } else if (res.data.status === 300) {
        messageToast({
          message: res.data.statusText,
          statusText: res.data.statusText,
          title: "Not Approve"
        });
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    if (type === 1)
      dispatch(
        getEBReadingApprovalEntry({ path: "get-EBReading-ApprovalEntry", data: {} })
      );
    else
      dispatch(
        getEBReadingApprovalEntry({
          path: "get-EBReading-ApprovalEntry",
          data: { employee: empId }
        })
      );
  }, []);

  function getEntryDate(params) {
    if(params.row.entry_date != null){
      return `${format(new Date(params.row.entry_date), 'dd-MMM-yy') }`;
      }
      else{
        return "-";
      }
  }

  function getDate(params) {
    return `${format(new Date(params.row.created_at), 'dd-MMM-yy') }`;
  }

  const column = [
    {
      key: "1",
      headerName: "Select",
      field: "select",
      hide: false,
      width: 90,
      renderCell: (params) => {
        return (
          <input
            type="checkbox"
            className="ms-2 mt-1"
            checked={selected.toString().includes(params.row.id)}
            onClick={(e) => onChecked(e.target.checked, params.row.id)}
          />
        );
      },
      renderHeader: () => {
        return (
          <div>
            <input
              type="checkbox"
              checked={gridData?.length === selected.length}
              className="ms-2 mt-1"
              onClick={(e) => {
                if (e.target.checked) {
                  const selectedRowID = [...gridData.map((e) => e.id)];
                  updateSelected(
                    selectedRowID || [gridData?.push((e) => e.id)]
                  );
                  selected.push(e.id);
                 } else {
                  updateSelected([]);
                }
              }}
            />
          </div>
        );
      }
    },
    {
      key: "2",
      headerName: "Outlet Code", // Keep the original header name
      field: "outlet_code",
      hide: false,
      width: 100,   
    },
    {
      key: "3",
      headerName: "Outlet Name", // Keep the original header name
      field: "outlet_name",
      hide: false,
      width: 250,   
    },
   
    {
      key: "4",
      headerName: "Entry Date", // Keep the original header name
      field: "entry_date",
      hide: false,
      width: 100,  
      valueGetter:getEntryDate 
    },
    {
      key: "5",
      headerName: "Date", // Keep the original header name
      field: "created_at",
      hide: false,
      width: 100,  
      valueGetter:getDate 
    },
    {
      key: "6",
      headerName: "Lean",
      field: "lean_actual",
      width: 100,
      renderCell: (params) => {
        const actual = params.row.lean_actual;
        const budget = params.row.lean_budget;
        let formattedValue = '';
        let textColor = 'inherit';      
        if (actual !== undefined && budget !== undefined) {
          formattedValue = `${actual}`;
          if (actual > budget) {
            textColor = 'red';
          } else if (actual < budget) {
            textColor = 'green';
          }
          else if (actual == budget) {
            textColor = 'orange';
          }
        } else if (budget !== undefined) {
          formattedValue = `/ ${budget}`;
        }      
        return <span style={{ color: textColor }}>{formattedValue} / {budget}</span>;
      }
    },
  
    {
      key: "7",
      headerName: "Lean Image",
      field: "lean_image",
      hide: false,
      width: 120,
      renderCell: (params) => (
        <Image
          style={{ paddingLeft: "10px" }}
          width={50}
          src={params?.row?.lean_image ?? ""}
          alt="No Image"
        />
      )
    },   
    {
      key: "8",
      headerName: "Peak",
      field: "peak_actual",
      width: 100,
      renderCell: (params) => {
        const actual = params.row.peak_actual;
        const budget = params.row.peak_budget;
        let formattedValue = '';
        let textColor = 'inherit';      
        if (actual !== undefined && budget !== undefined) {
          formattedValue = `${actual}`;
          if (actual > budget) {
            textColor = 'red';
          } else if (actual < budget) {
            textColor = 'green';
          }
          else if (actual == budget) {
            textColor = 'orange';
          }
        } else if (budget !== undefined) {
          formattedValue = `/ ${budget}`;
        }      
        return <span style={{ color: textColor }}>{formattedValue} / {budget}</span>;
      }
    },
    {
      key: "9",
      headerName: "Peak Image",
      field: "peak_image",
      hide: false,
      width: 120,
      renderCell: (params) => (
        <Image
          style={{ paddingLeft: "10px" }}
          width={50}
          src={params?.row?.peak_image ?? ""}
          alt="No Image"
        />
      )
    },  
    {
      key: "10",
      headerName: "Closed",
      field: "close_actual",
      width: 100,
      renderCell: (params) => {
        const actual = params.row.close_actual;
        const budget = params.row.closed_budget;
        let formattedValue = '';
        let textColor = 'inherit';      
        if (actual !== undefined && budget !== undefined) {
          formattedValue = `${actual}`;
          if (actual > budget) {
            textColor = 'red';
          } else if (actual < budget) {
            textColor = 'green';
          }
          else if (actual == budget) {
            textColor = 'orange';
          }
        } else if (budget !== undefined) {
          formattedValue = `/ ${budget}`;
        }      
        return <span style={{ color: textColor }}>{formattedValue} / {budget}</span>;
      }
    }, 
    {
      key: "11",
      headerName: "Close Image",
      field: "close_image",
      hide: false,
      width: 120,
      renderCell: (params) => (
        <Image
          style={{ paddingLeft: "10px" }}
          width={50}
          src={params?.row?.close_image ?? ""}
          alt="No Image"
        />
      )
    },  
    {
      key: "12",
      headerName: "Actual / Budget",
      field: "total_actual",
      width: 140,
      renderCell: (params) => {
        const actual = params.row.total_actual;
        const budget = params.row.total_budget;
        let formattedValue = '';
        let textColor = 'inherit';      
        if (actual !== undefined && budget !== undefined) {
          formattedValue = `${actual}`;
          if (actual > budget) {
            textColor = 'red';
          } else if (actual < budget) {
            textColor = 'green';
          }
          else if (actual == budget) {
            textColor = 'orange';
          }
        } else if (budget !== undefined) {
          formattedValue = `/ ${budget}`;
        }      
        return <span style={{ color: textColor }}>{formattedValue} / {budget}</span>;
      }
    },
    {
      key: "13",
      headerName: "Status", // Keep the original header name
      field: "entry_status",
      hide: false,
      width: 150,
      renderCell: (params) => {
        return (
          <Badge
            style={{ backgroundColor: ebReadingStatus(params.row.entry_status) }}
            count={params.row.entry_status}
          ></Badge>
        );
      }
     
    },
  ];

  return (
    <>
      <ConfirmOnExit showModel={showDialog} />
      <Card>
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
              <Form.Item
                name="dateRange"
                label="Date "
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
                    <DatePicker
                      style={{
                        color: "#f5a60b",
                        fontWeight: "bold",
                       // borderColor: "black",
                        boxShadow: "none",
                        textAlign: "center",
                        width: "100%"
                      }}
                      picker="date"
                      onChange={(date) => {
                        // Format the date to 'yyyy-mm-dd' format
                        const dateValue = date.format("YYYY-MM-DD");
                        myArray[0] = dateValue;
                        myArray[1] = dateValue;
                        setDaterange(myArray);
                      }}
                      disabledDate={disabledFutureDates} // Pass the disabled date function here
                    />
                  )}
                />
              </Form.Item> */}
           {/* // ) : ( */}
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
                       // borderColor: "black",
                        boxShadow: "none",
                        textAlign: "center"
                      }}
                      onChange={handleDateRangeChange}
                      disabledDate={disabledFutureDates}
                    />
                  )}
                />
              </Form.Item>
           {/* // )} */}
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
        loading={gettingEBReadingApprovalEntry}
        dataSource={gridData}
       // handleEditClick={handleEditClick}
        column={column}
        title={"EB Reading Approval List"}
      />
        <div
        className="d-flex justify-content-center align-items-center "
        style={{ width: "100%", padding: "1px" }}
      >
        <Form.Item>
          {/* <Button
            onClick={onFinish}
            loading={loading}
            style={{
              backgroundColor: "#34b1aa",
              colsetYearor: "white",
              marginRight: "6px",
              fontWeight: "bold"
            }}
            type="info"
            htmlType="button"
          >
            Approve
          </Button> */}
          <Button
            onClick={() => setApproveModal({ ...approveModal, show: true })}
            loading={loading}
            style={{
              backgroundColor: "#34b1aa",
              color: "white",
              marginRight: "6px",
              fontWeight: "bold"
            }}
            type="info"
            htmlType="button"
          >
            Approve
          </Button>
        </Form.Item>
      </div>
      ;
      {approveModal?.show && (
        <Modal
          title="Approve Remarks"
          open={approveModal?.show}
          onOk={handleSubmit(onFinish)}
          loading={loading}
          onCancel={() => setApproveModal({ ...approveModal, show: false })}
        >
          <Form
            onFieldsChange={() => setShowDialog(true)}
            name="basic"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            initialValues={
              {
                //approve_remarks: defaultValue?.approve_remarks
              }
            }
            onFinish={onFinish}
            autoComplete="off"
            form={form}
          >
          </Form>
          <Select
            placeholder="Select"
            style={{
              width: "250px",
              height: "34px",
              border: "2px solid #f5a60b",
              borderRadius: "10px"
            }}
            name="definition_list"
            loading={gettingDefinitionsList}
            onChange={(e) => setStatus(e)}
            showSearch
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
              def ? def?.filter((e) => e.def_title == "EB Reading Approve") : []
            )}
          </Select>
          {/* <TextArea
            rows={4}
            style={{ resize: "none" }}
            value={approveModal?.data || ""}
            onChange={(e) =>
              setApproveModal({ ...approveModal, data: e.target.value })
            }
          /> */}
        </Modal>
      )}
    </>
  );
}
