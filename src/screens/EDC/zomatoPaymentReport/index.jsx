import React, {useEffect,useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router';
import CustomTable from '../../../components/CustomTable';
import {getZomatoPaymentVsSales} from '../../../@app/master/masterSlice';
import { Row, Col, Form, DatePicker,Card,Select} from "antd";
import { useForm, Controller } from "react-hook-form";
import { getAllMappedOutlet } from "../../../@app/subMaster/subMasterSlice";

export default function zomatoDetails({setTopTitle}) {
  setTopTitle('Zomato Payment Vs Sales');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { Option } = Select;
  const { control } = useForm();
  
  const { handleSubmit } = useForm();

  const handleEditClick = async (data) => {
    navigate("/zomatoPaymentReport/addForm", {
          state: { data, ...data }
      });   
  };

  const column = [
    { key: '1', headerName: 'S.No', field: 'id', hide: false, width: 80 },
    { key: '2', headerName: 'Outlet Code', field: 'outlet_code', hide: false, width: 120 },
    { key: '3', headerName: 'Outlet Name', field: 'outlet_name', hide: false, width: 250 }, 
    { key: '4', headerName: 'Sale Date', field: 'date', hide: false, width: 130 }, 
    { key: '5', headerName: 'Payment Date', field: 'payment_date', hide: false, width: 130 },  
    { key: '6', headerName: 'Mode', field: 'mode', hide: false, width: 120 },    
    { key: '7', headerName: 'UTR', field: 'utr', hide: false, width: 180 },  
    { key: '8', headerName: 'Service Fees', field: 'service_fees', hide: false, width: 180 },
    { key: '9', headerName: 'Taxes on Service Payment_mechanisum_fees', field: 'taxes_on_service_payment_mechanisum_fees', hide: false, width: 180 },
    { key: '10', headerName: 'TCS Amt', field: 'tcs_amt', hide: false, width: 90 },
    { key: '11', headerName: 'TDS Amt', field: 'tds_amt', hide: false, width: 90 },
    { key: '12', headerName: 'Zomato Amt', field: 'bank_gross_amt', hide: false, width: 160 },
    { key: '13', headerName: 'Rista Sale Amt', field: 'rista_payment_amt', hide: false, width: 180 },  
    { key: '14', headerName: 'Diff', field: 'diff', hide: false, width: 100 },  
    { key: '15', headerName: 'Remarks', field: 'remarks', hide: false, width: 110 },  
  ];

  const [selectedOutlets, setselectedOutlets] = useState([]);
  const [dropdownoutlet, setdropdownoutlet] = useState([]);
  const [Daterange, setDaterange] = useState([]);
  const { gettingAllMappedOutlet } = useSelector((state) => state.subMaster);
  const {
    gettingZomatoPaymentVsSales,
    getZomatoPaymentVsSalesResponse: {data: dataSource}
  } = useSelector((state) => {
    return state.master;
  });

  const { type, userData } = useSelector((state) => state.auth);

  const empId = userData.data?.id;

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
        getZomatoPaymentVsSales({
          path: "get-Zomato-Payment-Sales",
          data: { outletid: selectedOutlets, daterange: Daterange
          }
        })
      );
    else
      dispatch(
        getZomatoPaymentVsSales({
          path: "get-Zomato-Payment-Sales",
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

  useEffect(() => {
    if (type == 1)
    dispatch(
      getZomatoPaymentVsSales({
        path: "get-Zomato-Payment-Sales",
        data: { outletid: selectedOutlets, daterange: Daterange
        }
      })
    );
  else
    dispatch(
      getZomatoPaymentVsSales({
        path: "get-Zomato-Payment-Sales",
        data: {
          employee: empId,
          outletid: selectedOutlets, daterange: Daterange
        }
      })
    );  
  }, [dispatch]);

  return (
    <>  
      <Card> <Row gutter={[25, 0]}>      
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
      </Row></Card>
      {showAlert && <div style={{ color: 'red', fontWeight: 'bold', textAlign: 'center' }}><span>{'Please Select Outlet & Date Fields'}</span></div>}
       <CustomTable
        loading={gettingZomatoPaymentVsSales}
        dataSource={dataSource}
        column={column}
        handleEditClick={handleEditClick}
        // onClickAdd={onClickAdd}    
        title={"EDC Payment Vs Bank"}   
      />   
    </>
   
  );
}
