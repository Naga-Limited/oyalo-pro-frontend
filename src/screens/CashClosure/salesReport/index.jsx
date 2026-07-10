// import { isPast, isFuture } from 'date-fns';
// import { differenceInDays } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useLocation } from 'react-router';
import { getOutletMasternotsubzone, get_Outlet_Name, } from '../../../@app/master/masterSlice';
import { getSalesReport } from '../../../@app/entry/entrySlice';
import CustomTable from '../../../components/CashHandlingTable';
import { map, } from 'ramda';
import { Card, Col, Row, Form, Select, Button, message, DatePicker } from "antd";

// const currentDate = new Date().toLocaleDateString('en-IN').replace(/\//g, '-');

export default function AccountClosure({ setTopTitle }) {
  setTopTitle('Sales Report');
  const navigate = useNavigate();
  const { control, } = useForm();
  const { Option } = Select;
  const { state } = useLocation();
  const { handleSubmit } = useForm();
  const dispatch = useDispatch();


  //these all for oulet dropdown 
  const [selectedOutlets, setSelectedOutlets] = useState('');
  // Event handler for handling changes in selected values
  const handleOutletChange = (selectedValues) => {
    setSelectedOutlets(selectedValues);
  };

  const loginType = useSelector((state) => state.auth.type);


  const emp_map = useSelector(
    (state) =>
      state.auth.userData.data && state.auth.userData.data.employee_mapping
  );

  useEffect(() => {
    dispatch(getOutletMasternotsubzone());
  }, [dispatch]);

  const {
    getOutletMasterResponse: { data: outletData }
  } = useSelector((state) => {
    return state.master;
  });
  const outletList = outletData?.map((o) => ({
    ...o,
    outlet_Res: `${o?.outlet_code} - ${o?.name}`
  }));

  //these all for table index
  const {
    gettingSalesReport,
    getSalesReportResponse: { data: dataSource }
  } = useSelector((state) => { return state.entry; });

  const gridData = (dataSource ?? []).map((e) => {
    return {
      ...e,
    };
  });


  const disabledFutureDates = (current) => {
    // Create a Date object for today
    const today = new Date();

    // If a date is after today, disable it
    return current && current > today;
  };

  // this is for restriction if day clsoure means it won't allow for day closure
  const uniqueDates = new Set(gridData.map((item) => item.sales_closure_date));
  const uniqueDatesArray = [...uniqueDates].sort((a, b) => new Date(a) - new Date(b));

  const handleEditClick = (data) => {
    data.chkdate = data.sales_closure_date;
    const previousDate = getPreviousDate(uniqueDatesArray, data.chkdate);
    const waitingAt = getWaitingAtByDate(previousDate);
    if (waitingAt === 2 || waitingAt === 5 || waitingAt === 7 || waitingAt === 8 || waitingAt === 9 || waitingAt === 10) {
      navigate('/cashHandling/edit', {
        state: { ...data, name: data.outletnameres, status: data.waiting_at }
      });
    } else if (waitingAt === 1 || waitingAt === 3 || waitingAt === 6 || waitingAt === 4) {
      message.error({ content: 'Please Completed Your Previous Day Process ' }, navigate('/cashHandling'))
    } else {
      navigate('/cashHandling/edit', {
        state: { ...data, name: data.outletnameres, status: data.waiting_at, depositby: data.depositby, skipreason: data.skipreason }
      });
    }
  };


  function getPreviousDate(uniqueDatesArray, targetDate) {
    for (let i = 0; i < uniqueDatesArray.length; i++) {
      if (uniqueDatesArray[i] === targetDate) {
        if (i > 0) {
          return uniqueDatesArray[i - 1]; // Return the date just before the target date
        }
      }
    }
    return null; // If the target date is not found or it's the earliest date in the array
  }

  function getWaitingAtByDate(date) {
    const item = gridData.find((item) => item.sales_closure_date === date);
    return item ? item.waiting_at : undefined;
  }

  const [Saledate, setSaledate] = useState();
  const onChange = (date, dateString) => {
    // Handle the date change if needed
    setSaledate(dateString);
  };

  const handleFormSubmit = () => {
    const outletCode = selectedOutlets;
    const sale_date = Saledate; // Make sure 'SaleDate' is defined in the scope where it's used
    dispatch(getSalesReport({ path: 'get-Salesdata-Details', data: { outletCode: outletCode, sale_date: sale_date } }));
    handleSubmit();
  };


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
  const [outletMapping, setOutletMapping] = useState({});

  useEffect(() => {
    fetchDataAndFormat(dispatch, get_Outlet_Name, setOutletMapping);
  }, [dispatch]);

  const column = [
    { key: '1', headerName: 'S.No', field: 'S.No', hide: false, width: 10, },
    {
      key: '2', headerName: 'Outlet', field: 'outlet_code', hide: false, width: 175,
      renderCell: (params) => {
        const outletName = outletMapping[params.value] || 'Unknown Outlet';
        return (
          <span>{outletName}</span>
        );
      },
    },
    {
      key: '3', headerName: 'Sales Date', field: 'sale_date', hide: false, width: 105, renderCell: (params) => {
        // Assuming params.value contains the date in 'yyyy-mm-dd' format
        const dateParts = params.value.split('-');
        const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0].substring(2)}`;
        return (
          <span>{formattedDate}</span>
        );
      },
    },
    { key: '4', headerName: 'Sale Amount', field: 'payment_amount', hide: false, width: 120, },
    { key: '5', headerName: 'Invoice Number', field: 'invoice_number', hide: false, width: 210, },

  ];

  return (
    <>
      <Card>
        <div>
          <Row gutter={[20, 0]}>
            <Col md={{ span: 8 }} xs={{ span: 24 }}>
              <Form.Item
                name="outlet_id"
                label="Outlet Code"
                rules={[
                  { required: true, message: "Select Outlet" }
                ]}
              >
                <Select
                  defaultValue={state?.outlet_id}
                  placeholder="Select"
                  showSearch
                  maxTagCount={0}
                  onChange={handleOutletChange}
                  // onSelect={handleSelectOutlet}
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                  value={selectedOutlets}
                  style={{ color: 'orange' }} // Style for the select box itself
                  optionLabelProp="label" // Define the label property for the options
                >
                  {map(
                    (outlet) => {
                      return (
                        <Option
                          key={outlet?.outlet_code}
                          value={outlet?.outlet_code}
                          label={outlet?.outlet_Res}
                        >
                          {outlet?.outlet_Res}
                        </Option>
                      );
                    },
                    outletList
                      ? outletList.filter((e) => {
                        if (loginType === 2) {
                          let fid =
                            emp_map &&
                            emp_map.outlet.findIndex(
                              (x) => Number(x.id) === Number(e.id)
                            );
                          if (fid !== -1 && e.status == '1') return true;
                          else return false;
                        } else return e.status == '1';
                      })
                      : []
                  )}
                </Select>
              </Form.Item>
            </Col>

            <Col md={{ span: 8 }} xs={{ span: 24 }}>
              <Form.Item name="datePicker" label="Date">
                <Controller
                  control={control}
                  name="datePicker"
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
                      picker="date"
                      onChange={onChange}
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
      </Card>

      <CustomTable
        dataSource={gridData}
        loading={gettingSalesReport}
        column={column}
        handleEditClick={handleEditClick}
        title={'Sales Report'}
      />
    </>
  );
}
