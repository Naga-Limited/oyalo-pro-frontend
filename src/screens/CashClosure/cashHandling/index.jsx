// import { isPast, isFuture } from 'date-fns';
// import { differenceInDays } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useForm,  } from "react-hook-form";
import { useNavigate, useLocation } from 'react-router';
import { getOutletMasternotsubzone, get_Outlet_Name, get_DayClosure_Status_Name, } from '../../../@app/master/masterSlice';
import { getOutletDayClosureDetails } from '../../../@app/entry/entrySlice';
import CustomTable from '../../../components/CashHandlingTable';
import { map, } from 'ramda';
import { format } from 'date-fns';
import { Card, Col, Row, Form, Select, Badge, Tooltip, Typography, message, notification } from "antd";
import { CashHandlingStatus } from '../../../components/formComponents/CommonFunctions';

// const currentDate = new Date().toLocaleDateString('en-IN').replace(/\//g, '-');

export default function AccountClosure({ setTopTitle }) {
  setTopTitle('CASH HANDLING');
  const navigate = useNavigate();
  // const { control, } = useForm();
  const { Option } = Select;
  const { state } = useLocation();
  const dispatch = useDispatch();



  //these all for oulet dropdown 
  // Define a state variable to store the selected outlet IDs
  const [selectedOutlets, setSelectedOutlets] = useState('');
  // Event handler for handling changes in selected values
  const handleOutletChange = (selectedValues) => {
    setSelectedOutlets(selectedValues);

  };

  const loginType = useSelector((state) => state.auth.type);
  const userData = useSelector((state) => state.auth);

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
    gettingOutletSalesClosure,
    getOutletSalesClosureResponse: { data: dataSource }
  } = useSelector((state) => { return state.entry; });

  const gridData = (dataSource ?? []).map((e) => {
    return {
      ...e,
    };
  });


  // this is for restriction if day clsoure means it won't allow for day closure
  const uniqueDates = new Set(gridData.map((item) => item.sales_closure_date));
  const uniqueDatesArray = [...uniqueDates].sort((a, b) => new Date(a) - new Date(b));

  const handleEditClick = (data) => {
    const currentTime = new Date();
    const currentDate = new Date();
    const targetTime = new Date();
    targetTime.setHours(22, 0, 0, 0); // Set the target time (23:00:00) for restriction
    const formattedDate = format(currentDate, 'yyyy-MM-dd');

    data.chkdate = data.sales_closure_date;
    const previousDate = getPreviousDate(uniqueDatesArray, data.chkdate);
    const waitingAt = getWaitingAtByDate(previousDate);
    if (waitingAt === 5 || waitingAt === 7 || waitingAt === 8 || waitingAt === 9 || waitingAt === 10) {
      if (data.waiting_at === 1 && data.sales_closure_date === formattedDate) {
        if (currentTime < targetTime) {
          message.warning({ content: 'Please Make Day Closure After 11:00 PM' });
        } else {
          navigate('/cashHandling/edit', {
            state: { ...data, name: data.outletnameres, status: data.waiting_at }
          });
        }
      } else {
        navigate('/cashHandling/edit', {
          state: { ...data, name: data.outletnameres, status: data.waiting_at }
        });
      }
    } else if (waitingAt === 1 || waitingAt === 2 || waitingAt === 3 || waitingAt === 6 || waitingAt === 4) {
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


  //for to set status name 
  const [statusMapping, setStatusMapping] = useState({}); // Initialize it in state
  useEffect(() => {
    dispatch(get_DayClosure_Status_Name())
      .then((result) => {
        const data = result.data;
        const statusData = {};
        if (typeof data === 'object' && Object.keys(data).length > 0) {
          for (const key in data) {
            if (data[key] !== undefined) {
              statusData[data[key].def_list_code] = data[key].def_list_name;
            }
          }
          setStatusMapping(statusData);
        } else {
          // Display an error notification to the user
          notification.error({
            message: 'Error',
            description: 'Invalid or empty data received from the API.',
          });
        }
      })
      .catch(() => {
        // Display an error notification for API request failures
        notification.error({
          message: 'API Request Error',
          description: 'An error occurred while fetching data from the API.',
        });
      });
  }, [dispatch]);



  useEffect(() => {
    dispatch(
      getOutletDayClosureDetails({
        path: "get-Outlet-Dayclosure-Details",
        data: { outletid: selectedOutlets, salesClosure_id: state?.closure_id }
      })
    );
  }, [selectedOutlets, dispatch]);


  const column = [
    { key: '1', headerName: 'S.No', field: 'S.No', hide: false, width: 10, },
    {
      key: '2', headerName: 'Outlet', field: 'outlet_code', hide: false, width: 195,
      renderCell: (params) => {
        const outletName = outletMapping[params.value] || 'Unknown Outlet';
        const dateParts = params.row.sales_closure_date.split('-');
        const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0].substring(2)}`;
        return (
          <Tooltip title={`Closure Date: ${formattedDate}`}>
            <span>{outletName}</span>
          </Tooltip>
        );
      },
    },
    {
      key: '2', headerName: ' Closure Date', field: 'sales_closure_date', hide: false, width: 110, renderCell: (params) => {
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

    { key: '6', headerName: 'Deposit Value', field: 'deposit_amount', hide: false, width: 130, },
    {
      key: '5',
      headerName: 'Difference',
      field: 'difference',
      hide: false,
      width: 90,
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
      width: 180,
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

              <Form.Item name='agent_name' label='Agent Name'>
                {userData.type == 2 ? (
                  <Typography>
                    <Card style={{ fontWeight: 'bold', width: '180px', height: '40px', background: '#34b1aa', color: "#ffffff" }}>
                      {userData.userData.data?.name}</Card>
                  </Typography>
                ) : (
                  <Typography>
                    <Card style={{ fontWeight: 'bold', width: '180px', height: '40px', background: '#34b1aa', color: "#ffffff" }}>
                      Admin</Card>
                  </Typography>
                )}

              </Form.Item>
            </Col>
          </Row>

        </div>
      </Card>

      <CustomTable
        dataSource={gridData}
        loading={gettingOutletSalesClosure}
        column={column}
        handleEditClick={handleEditClick}
        title={'CASH HANDLING'}
      />
    </>
  );
}
