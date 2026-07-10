// import { isPast, isFuture } from 'date-fns';
// import { differenceInDays } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from "react-hook-form";
import { useNavigate, } from 'react-router';
import { getOutletMasternotsubzone, get_Outlet_Name, get_DayClosure_Status_Name, } from '../../../@app/master/masterSlice';
import { getBackOfficeclosureDetails } from '../../../@app/entry/entrySlice';
import CustomTable from '../../../components/CashHandlingTable';
import { Card, Col, Row, Form, DatePicker, Button, Select, Badge, message } from "antd";
import { CashHandlingStatus } from '../../../components/formComponents/CommonFunctions';


export default function BackOffice({ setTopTitle }) {

  setTopTitle('CASH HANDLING CONFIRMATION');
  const navigate = useNavigate();
  const { handleSubmit } = useForm();
  const dispatch = useDispatch();
  const { control, } = useForm();
  const { Option } = Select;


  //these all for oulet dropdown **********************************************************************

  const [dropdownoutlet, setdropdownoutlet] = useState([]);
  const [selectedOutlets, setselectedOutlets] = useState([]);

  useEffect(() => {
    dispatch(getOutletMasternotsubzone()).then((result) => {
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
        setdropdownoutlet(options);
      }
    });
  }, [dispatch]);


  // Function to handle "Select All" and "Unselect All"
  const SelectAllOutlets = () => {
    if (selectedStatus.length === dropdownoutlet.length - 2) {
      // If all options (excluding "Select All" and "Unselect All") are selected, unselect all
      setselectedOutlets([]);
    } else {
      // Otherwise, select all options (excluding "Select All" and "Unselect All")
      const allValuesExceptSpecial = dropdownoutlet
        .filter((option) => option.value !== "select_all" && option.value !== "unselect_all")
        .map((option) => option.value);
      setselectedOutlets(allValuesExceptSpecial);
    }
  };
  //********************************************************************************************* */
  //these all for status dropdown *********************************************************************

  const [dropdownStatus, setdropdownStatus] = useState([]);
  const [selectedStatus, setselectedStatus] = useState([]);

  useEffect(() => {
    dispatch(get_DayClosure_Status_Name()).then((result) => {
      if (result) {
        const options = result.data.map((item) => ({
          key: item.def_list_code,
          value: item.def_list_code,
          label: item.def_list_name,
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
        setdropdownStatus(options);
      }
    });
  }, [dispatch]);


  // Function to handle "Select All" and "Unselect All"
  const SelectAllStatus = () => {
    if (selectedStatus.length === dropdownStatus.length - 2) {
      // If all options (excluding "Select All" and "Unselect All") are selected, unselect all
      setselectedStatus([]);
    } else {
      // Otherwise, select all options (excluding "Select All" and "Unselect All")
      const allValuesExceptSpecial = dropdownStatus
        .filter((option) => option.value !== "select_all" && option.value !== "unselect_all")
        .map((option) => option.value);
      setselectedStatus(allValuesExceptSpecial);
    }
  };

  const {
    gettingClosureStatusName,
  } = useSelector((state) => {
    return state.subMaster;
  });

  //*********************************************************************************
  const myArray = [];
  const [Daterange, setDaterange] = useState([]);
  // Function to format a date as 'yyyy-mm-dd'
  const formatDate = (date) => {
    return date.format('YYYY-MM-DD');
  };

  // Handle changes in the date range picker
  const handleDateRangeChange = (dates) => {
    // Format both start and end dates
    setDaterange(dates.map(formatDate));

  };
  // Define a function to disable future dates
  const disabledFutureDates = (current) => {
    // Create a Date object for today
    const today = new Date();

    // If a date is after today, disable it
    return current && current > today;
  };

  //these all for table index
  const {
    gettingBackOfficeclosure,
    getBackOfficeclosureResponse: { data: dataSource }
  } = useSelector((state) => { return state.entry; });

  const gridData = (dataSource ?? []).map((e) => {
    return {
      ...e,
    };
  });


  // this is for restriction if day clsoure means it won't allow for day closure
  const filteredArray = gridData.filter((item) => item.waiting_at === 8);
  const count = filteredArray.length;
  const handleEditClick = (data) => {
    // navigate('/backoffice/edit', {
    //   state: { ...data, entryId: data?.id, edit: true }
    // });

    const PendingAlert = count > 0 && data.waiting_at === 7;
    PendingAlert
      ? (message.warning({ content: 'Please Complete Revision ', }), navigate('/backoffice'))
      : navigate('/backoffice/edit', {
        state: { ...data, name: data.outletnameres, entryId: '15', edit: true, status: data.waiting_at }
      });
  };




  //for to set outlet name 
  const [outletMapping, setOutletMapping] = useState({}); // Initialize it in state

  const fetchDataAndFormat = async (dispatch, actionCreator, setMappingState) => {

      const result = await dispatch(actionCreator());
      const data = result.data;

      if (typeof data === 'object' && Object.keys(data).length > 0) {
        const formattedData = {};
        for (const key in data) {
          if (data[key] !== undefined) {
            formattedData[key] = data[key].name;
          }
        }
        setMappingState(formattedData);
      } 

  };

  useEffect(() => {
    fetchDataAndFormat(dispatch, get_Outlet_Name, setOutletMapping);
  }, [dispatch]);


  //for to set status name 
  const [statusMapping, setStatusMapping] = useState({}); // Initialize it in state


  useEffect(() => {
    dispatch(get_DayClosure_Status_Name())
      .then((result) => {
        if (result) {
          const data = result.data;
          const statusData = {};
          // Check if data is an object and not empty
          if (typeof data === 'object' && Object.keys(data).length > 0) {
            for (const key in data) {
              if (data[key] !== undefined) {
                statusData[data[key].def_list_code] = data[key].def_list_name;
              }
            }
            // Set the formatted data in state
            setStatusMapping(statusData);
          }
        }
      });
  }, [dispatch]);


  useEffect(() => {
    dispatch(
      getBackOfficeclosureDetails({
        path: "get-Backoffice-Dayclosure-Details",
        data: { status: selectedStatus, outletid: selectedOutlets }
      })
    );
  }, [dispatch]);


  //this is for on submit event
  const [showAlert, setShowAlert] = useState(false);
  const handleFormSubmit = () => {
    if (selectedOutlets.length != 0 && selectedStatus.length != 0) {
      setShowAlert(false);
      dispatch(getBackOfficeclosureDetails({ path: 'get-Backoffice-Dayclosure-Details', data: { status: selectedStatus, outletid: selectedOutlets, daterange: Daterange } }));
    }
    else {
      setShowAlert(true);
    }
    handleSubmit();
  };


  const column = [
    { key: '1', headerName: 'S.No', field: 'S.No', hide: false, width: 10, },
    {
      key: '2', headerName: 'Outlet', field: 'outlet_code', hide: false, width: 250,
      renderCell: (params) => {
        const outletName = outletMapping[params.value] || 'Unknown Outlet';
        return (
            <span>{outletName}</span>
        );
      },
    },
    {
      key: '7', headerName: ' Closure Date', field: 'sales_closure_date', hide: false, width: 105, renderCell: (params) => {
        // Assuming params.value contains the date in 'yyyy-mm-dd' format
        const dateParts = params.value.split('-');
        const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0].substring(2)}`;
        return (
          <span>{formattedDate}</span>
        );
      },
    },
    {
      key: '3',
      headerName: 'Closure On',
      field: 'act_sales_closure',
      hide: false,
      width: 140,
    },
    { key: '4', headerName: 'Closure Value', field: 'closure_amount', hide: false, width: 130, },
    { key: '6', headerName: 'Deposit Value', field: 'deposit_amount', hide: false, width: 120, },
    {
      key: '5',
      headerName: 'Difference',
      field: 'difference',
      hide: false,
      width: 150,
      renderCell: (params) => {
        const closureAmount = params.row.closure_amount || 0;
        const depositAmount = params.row.deposit_amount || 0;
        const difference = closureAmount - depositAmount;
        const formattedDifference = difference.toFixed(2); // Format to two decimal places
        return <span>{formattedDifference}</span>;
      },
    },
    {
      key: '8',
      headerName: 'Waiting At',
      field: 'waiting_at',
      hide: false,
      width: 160,
      renderCell: (params) => {
        const ClosureStatus = statusMapping[params.value] || 'Unknown Status';
        return (
          <Badge
            style={{ backgroundColor: CashHandlingStatus(params.row.waiting_at) }} count={ClosureStatus}>
          </Badge>
        );
      },
    }
  ];




  return (
    <>
      <Card>
        <div>
          <Row gutter={[24, 0]}>
            <Col md={6} xs={24} span={24} >
              <Form.Item
                label="Outlet Code"
                labelCol={{ md: { span: 24 }, xs: { span: 24 }, style: { textAlign: 'left' } }}
              >
                <Select
                  placeholder="Select"
                  loading={gettingClosureStatusName}
                  maxTagCount={0}
                  label='Waiting At'
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
              <Form.Item
                label="Waiting At"
                labelCol={{ md: { span: 24 }, xs: { span: 24 }, style: { textAlign: 'left' } }}
              >
                <Select
                  placeholder="Select"
                  name="status"
                  loading={gettingClosureStatusName}
                  maxTagCount={0}
                  label='Waiting At'
                  disabled={false}
                  showSearch
                  mode="multiple"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  value={selectedStatus}
                  onChange={(newSelectedValues) => {
                    // Handle "Select All" and "Unselect All"
                    if (newSelectedValues.includes("select_all")) {
                      SelectAllStatus();
                    } else if (newSelectedValues.includes("unselect_all")) {
                      setselectedStatus([]);
                    } else {
                      setselectedStatus(newSelectedValues);
                    }
                  }}

                >
                  {dropdownStatus.map((item) => (
                    <Option key={item.key} value={item.value}>
                      {item.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col md={{ span: 6 }} xs={{ span: 24 }}>

              {selectedOutlets.length > 3 ? (
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
                          borderColor: "black",
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
              ) : (
                <Form.Item
                  name="dateRange"
                  label="Cash Sales Date Range"
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
                          borderColor: "black",
                          boxShadow: "none",
                          textAlign: "center",
                        }}
                        onChange={handleDateRangeChange}
                        disabledDate={disabledFutureDates}
                      />
                    )}
                  />
                </Form.Item>
              )}
            </Col>
            <Col md={{ span: 3 }} xs={{ span: 24 }} style={{ textAlign: 'center', paddingTop: '25px' }}>
              <Form.Item labelCol={{ md: { span: 24 }, xs: { span: 24 } }} name='submit'>
                <Button
                  onClick={handleFormSubmit}
                  type="primary"
                  style={{ backgroundColor: "green", textAlign: 'center', }}
                >
                  {"Submit"}
                </Button>
              </Form.Item>
            </Col>

          </Row>


        </div>
        {showAlert && <div style={{ color: 'red', fontWeight: 'bold', textAlign: 'center' }}><span>{'Please Select Outlet Code and Status'}</span></div>}
      </Card>

      <CustomTable
        dataSource={gridData}
        loading={gettingBackOfficeclosure}
        column={column}
        handleEditClick={handleEditClick}
        title={'CASH HANDLING CONFIRMATION'}

      />
    </>
  );
}
