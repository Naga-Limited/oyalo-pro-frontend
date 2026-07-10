import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from "react-hook-form";
// import { useNavigate, } from 'react-router';
import { getOutletMasternotsubzone, get_DayClosure_Status_Name, } from '../../../@app/master/masterSlice';
import { getBackOfficeReport } from '../../../@app/entry/entrySlice';
import CustomTable from '../../../components/CustomTable';
import { Card, Col, Row, Form, DatePicker, Button, Select,  } from "antd";
// import { CashHandlingStatus } from '../../../components/formComponents/CommonFunctions';


export default function CashHandlingReport({ setTopTitle }) {

  setTopTitle('Cash Handling Report');
  // const navigate = useNavigate();
  const { handleSubmit } = useForm();
  const dispatch = useDispatch();
  const { control, } = useForm();
  const { Option } = Select;


  //these all for oulet dropdown **********************************************************************

  const [dropdownoutlet, setdropdownoutlet] = useState([]);
  const [selectedOutlets, setselectedOutlets] = useState([]);

  const userData = useSelector((state) => state.auth);
  let logtype = userData.type;

  useEffect(() => {
    dispatch(getOutletMasternotsubzone()).then((result) => {
      if (result) {
        let options;

        if (logtype === 2) {
          const idArray = userData.userData.data.employee_mapping.outlet.map(item => parseInt(item.id));
          options = result.data
            .filter(item => idArray.includes(parseInt(item.id))) // Filter based on idArray
            .map(item => ({
              id: item.id,
              key: item.outlet_code,
              value: item.outlet_code,
              label: `${item.outlet_code}-${item.name}`,
            }));
        } else {
          options = result.data.map(item => ({
            key: item.outlet_code,
            value: item.outlet_code,
            label: `${item.outlet_code}-${item.name}`,
          }));
        }

        // Add "Select All" and "Unselect All" options
        const selectAllOption = {
          key: "select_all",
          value: "select_all",
          label: "Select All",
        };
        const unselectAllOption = {
          key: "unselect_all",
          value: "unselect_all",
          label: "Unselect All",
        };

        options.unshift(selectAllOption, unselectAllOption);
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
    gettingBackOfficeReport,
    getBackOfficeReportResponse: { data: dataSource }
  } = useSelector((state) => { return state.entry; });

  const gridData = (dataSource ?? []).map((e) => {
    return {
      ...e,
    };
  });

  // this is for restriction if day clsoure means it won't allow for day closure
  // const filteredArray = gridData.filter((item) => item.waiting_at === 8);
  // const count = filteredArray.length;
  // const handleEditClick = (data) => {
  //   // navigate('/backoffice/edit', {
  //   //   state: { ...data, entryId: data?.id, edit: true }
  //   // });

  //   const PendingAlert = count > 0 && data.waiting_at === 7;
  //   PendingAlert
  //     ? (message.warning({ content: 'Please Complete Revision ', }), navigate('/backoffice'))
  //     : navigate('/backoffice/edit', {
  //       state: { ...data, name: data.outletnameres, entryId: '15', edit: true, status: data.waiting_at }
  //     });
  // };
 
  //this is for on submit event
  const [showAlert, setShowAlert] = useState(false);
  const handleFormSubmit = () => {
    if (selectedOutlets.length != 0 && selectedStatus.length != 0) {
      setShowAlert(false);
      dispatch(getBackOfficeReport({ path: 'get-BackOffice-Report', data: { status: selectedStatus, outletid: selectedOutlets, daterange: Daterange } }));
    }
    else {
      setShowAlert(true);
    }
    handleSubmit();
  };


  const column = [
    { key: '1', headerName: 'S.No', field: 'S.No', hide: false, width: 10, },
    { key: '2', headerName: 'Outlet Code', field: 'outlet_code', hide: false, width: 100, },
    { key: '2', headerName: 'Outlet Name', field: 'name', hide: false, width: 220, },
    {
      key: '3', headerName: ' Closure Date', field: 'sales_closure_date', hide: false, width: 120, renderCell: (params) => {
        const dateParts = params.value.split('-');
        const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0].substring(2)}`;
        return (
          <span>{formattedDate}</span>
        );
      },
    },
    { key: '4', headerName: 'Closure On', field: 'act_sales_closure', hide: false, width: 140, },
    { key: '5', headerName: 'Open Balance', field: 'open_balance', hide: false, width: 120, },
    { key: '6', headerName: 'Cash Sales', field: 'sales_amount', hide: false, width: 120, },
    { key: '7', headerName: 'Closure Value', field: 'closure_amount', hide: false, width: 120, },
    { key: '8', headerName: 'Closure By', field: 'closurename', hide: false, width: 250, },
    {
      key: '9', 
      headerName: 'Deposit Date', 
      field: 'deposit_date', 
      hide: false, 
      width: 120, 
      renderCell: (params) => {
        if (params.value) {  // Check if params.value is not null or undefined
          const dateParts = params.value.split('-');
          const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
          return (
            <span>{formattedDate}</span>
          );
        } else {
          return (
            <span>No Deposit</span>
          );
        }
      },
    },
    { key: '10', headerName: 'Deposit Amount', field: 'deposit_amount', hide: false, width: 120, },
    { key: '11', headerName: 'Cash Balance', field: 'balance_amount', hide: false, width: 120, },
    { key: '12', headerName: 'Deposit Mode', field: 'deposit_mode', hide: false, width: 160, },
    { key: '13', headerName: 'Refer No', field: 'referencenum', hide: false, width: 180, },
    { key: '14', headerName: 'Deposit Skip', field: 'SkipReasonName', hide: false, width: 160, },
    { key: '15', headerName: 'Deposit By', field: 'depositByName', hide: false, width: 180, },
    { key: '17', headerName: 'UTR No', field: 'utr_num', hide: false, width: 180, },
    { key: '18', headerName: 'AOV', field: 'aov', hide: false, width: 180, },
    { key: '19', headerName: 'ABC', field: 'abc', hide: false, width: 180, },
    { key: '20', headerName: 'Gen Remarks', field: 'genRemarks', hide: false, width: 180, },
    { key: '21', headerName: 'Outlet Remarks', field: 'remarks', hide: false, width: 180, },
    { key: '22', headerName: 'Backoffice Remarks', field: 'verification_remarks', hide: false, width: 180, },
    { key: '23', headerName: 'Waiting At', field: 'waitingStatus', hide: false, width: 180, },
    { key: '24', headerName: 'Verified By', field: 'verifiedEmp', hide: false, width: 180, },
    { key: '25', headerName: 'Reject', field: 'rejectfor', hide: false, width: 180, },
    { key: '26', headerName: 'Reject By', field: 'rejectbyEmp', hide: false, width: 180, },

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
              <Form.Item
                label="Waiting At"
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
        {showAlert && <div style={{ color: 'red', fontWeight: 'bold', textAlign: 'center' }}><span>{'Please Select Outlet, Status & Date Fields'}</span></div>}
      </Card>

      <CustomTable
        dataSource={gridData}
        loading={gettingBackOfficeReport}
        column={column}
        hideActionBtn={true}
        // handleEditClick={handleEditClick}
        title={'Cash Handling Report'}

      />
    </>
  );
}
