import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCallBackEntryReport,
  getDefinitionsFilter,
  getAllMappedOutlet
} from "../../../@app/subMaster/subMasterSlice";
import CustomTable from "../../../components/CustomTable";
import dayjs from "dayjs";
import { callEntryStatus } from "../../../components/formComponents/CommonFunctions";
import {
  Badge, 
  Tooltip,
  Col,
  Form,
  Card,
  Row,
  DatePicker,
  Select
} from "antd";
import apis from "../../../api/entryApis";
import { useForm } from "react-hook-form";
import { format } from "date-fns";

export default function CallBackApproval() {
 const { handleSubmit } = useForm();
 const { Option } = Select;
  const {
    gettingCallBackEntryReport,
    getCallBackEntryReportResponse: {data: dataSource}
  } = useSelector((state) => {
    return state.subMaster;
  });

  const [startDate, setStartDate] = useState(
    useState(new Date().getMonth() + 1)
  );

  const gridData = Array.isArray(dataSource)
    ? dataSource.map((e) => ({ ...e }))
    : [];

  useEffect(() => {
    if (type === 1)
      dispatch(
        getDefinitionsFilter({ path: "get-definitions-filter", data: {} })
      );
    else
      dispatch(
        getDefinitionsFilter({
          path: "get-definitions-filter",
          data: { employee: empId }
        })
      );
  }, []);

 
  const handleFormSubmit = () => {
    const stDate = startDate.toLocaleString({ date: "DD/MM/YYYY" });
    var arr1 = stDate.split(",");
    const startSelectedDate = arr1[1];
    const endSelectedDate = arr1[3];
    if (startDate) {
      if (type === 1)
        dispatch(
          getCallBackEntryReport({
            path: "get-call-entry-report",
            data: {
              startDate: startSelectedDate,
              endDate: endSelectedDate,
            //  callStatus: callStatus,
              outletid: selectedOutlets
            }
          })
        );
      else
        dispatch(
          getCallBackEntryReport({
            path: "get-call-entry-report",
            data: {
              employee: empId,
              startDate: startSelectedDate,
              endDate: endSelectedDate,
             // callStatus: callStatus,
              outletid: selectedOutlets
            }
          })
        );
    } else {
      apis.open({ message: "Please choose and Month", type: "error" });
    }
    handleSubmit();
  };

  const {type, userData} = useSelector((state) => state.auth);
  const empId = userData.data?.id;

  const dispatch = useDispatch();

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

  useEffect(() => {
    if (type === 1)
      dispatch(
        getCallBackEntryReport({ path: "get-call-entry-report", data: {} })
      );
    else
      dispatch(
        getCallBackEntryReport({
          path: "get-call-entry-report",
          data: { employee: empId }
        })
      );
  }, []);


// Utility function to convert a string to Title Case

  function getDOBDate(params) {
    if (params.row.dob != null) {
      return `${format(new Date(params.row.dob), "dd-MMM-yy")}`;
    } else {
      return "-";
    }
  }

  function getAnniDate(params) {
    if (params.row.anniversary != null) {
      return `${format(new Date(params.row.anniversary), "dd-MMM-yy")}`;
    } else {
      return "-";
    }
  }

  const column = [
    { key: "1", headerName: "S.No", field: "S.No", hide: false, width: 50 },
    {
      key: "2",
      headerName: "Called By",
      field: "call_make_by",
      hide: false,
      width: 130,
      renderCell: (params) => {
        if (params.row.call_make_by == 0) return "Admin";
      }
    },
    {
      key: "3",
      headerName: "Outlet Code",
      field: "outlet_code",
      hide: false,
      width: 100
    },
    {
      key: "4",
      headerName: "Outlet Name",
      field: "outlet_name",
      hide: false,
      width: 220
    },
    {
      key: "5",
      headerName: "Date of Calling",
      field: "date_of_calling",
      hide: false,
      width: 100
    },
    {
      key: "6",
      headerName: "Customer Name",
      field: "customer_name",
      hide: false,
      width: 130
    },
    {
      key: "7",
      headerName: "Bill Date",
      field: "invoice_date",
      hide: false,
      width: 120,
      valueGetter: (params) => {
        const shortdate = dayjs(params.row.invoice_date).format("DD-MM-YYYY");
        return shortdate;
      }
    },
    {
      key: "8",
      headerName: "FeedBack",
      field: "feedback",
      hide: false,
      width: 120,
      renderCell: (params) => {
        const feedbackValue = params.row.feedback;
        // Check if feedback value is 'Negative'
        const isNegativeFeedback = feedbackValue == "Negative";

        return (
          <span style={{ backgroundColor: isNegativeFeedback ? "red" : "" }}>
            {feedbackValue}
          </span>
        );
      }
    },
    {
      key: "8",
      headerName: "Remarks",
      field: "remarks",
      hide: false,
      width: 150,
      renderCell: (params) => {
        return (
          <Tooltip title={params.row.remarks}>{params.row.remarks}</Tooltip>
        );
      }
    },
    {
      key: "9",
      headerName: "Rating",
      field: "rating",
      hide: false,
      width: 80,    
    },
    {
      key: "10",
      headerName: "Service Rating",
      field: "service_rating",
      hide: false,
      width: 120,    
    },
    {
      key: "11",
      headerName: "Product Rating",
      field: "product_rating",
      hide: false,
      width: 120,     
    },
    {
      key: "12",
      headerName: "Price Rating",
      field: "price_rating",
      hide: false,
      width: 110,    
    },
    {
      key: "13",
      headerName: "DOB",
      field: "dob",
      hide: false,
      width: 100,
      valueGetter: getDOBDate
    },
    {
      key: "14",
      headerName: "Anniversary",
      field: "anniversary",
      hide: false,
      width: 100,
      valueGetter: getAnniDate
    },
    {
      key: "15",
      headerName: "Bill_Value",
      field: "billing_value",
      hide: false,
      width: 100
    },
    {
      key: "16",
      headerName: "Phone Number",
      field: "phone_number",
      hide: false,
      width: 130
    },
    {
      key: "17",
      headerName: "Call Status",
      field: "def_title_name",
      hide: false,
      width: 130
    },
    {
      key: "18",
      headerName: "Approve Remarks",
      field: "approve_remarks",
      hide: false,
      width: 150,
      renderCell: (params) => {
        return (
          <Tooltip title={params.row.approve_remarks}>
            {params.row.approve_remarks}
          </Tooltip>
        );
      }
    },
    {
      key: "19",
      headerName: "Status",
      field: "call_status",
      hide: false,
      width: 170,
      renderCell: (params) => {
        return (
          <Badge
            style={{ backgroundColor: callEntryStatus(params.row.call_status) }}
            count={params.row.call_status}
          ></Badge>
        );
      }
    }
  ];

  return (
    <>
      <Card>
        <Row style={{ margin: "3px" }} gutter={[5, 0]}>
          <Col md={{ span: 1 }} xs={{ span: 24 }}></Col>
          <Col md={{ span: 7 }} xs={{ span: 24 }}>
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
            <Form.Item name="submit">
              <button
                onClick={handleFormSubmit}
                style={{ background: "#34b1aa", color: "#ffffff" }}
                className="btn btn col-lg-2 col-m-2 col-sm-2 h-100 w-auto align-items-center"
              >
                {" "}
                Filter
              </button>
            </Form.Item>
          </Col>
        </Row>
      </Card>
      {/* {contextHolder} */}
      <CustomTable
        dataSource={gridData}
        loading={gettingCallBackEntryReport}
        column={column}
        // handleViewClick={handleViewClick}
        title={"Call Back Entry Report List"}
      />
    </>
  );
}
