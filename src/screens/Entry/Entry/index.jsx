import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getEntryForm } from "../../../@app/entry/entrySlice";
import CustomTable from "../../../components/CustomTable";
import { column } from "./column";
import { useForm, Controller } from "react-hook-form";
import {Row, Col, Button, Card, Form, DatePicker} from "antd";

export default function dayPlanMappingMaster({ setTopTitle }) {
  setTopTitle("NAGA FOODS Export Inquiry Form");
  const { type, userData } = useSelector((state) => state.auth);
 const dispatch = useDispatch();
 const { handleSubmit } = useForm();
  const navigate = useNavigate();
  const { control } = useForm();
  const {
    getEntryFormResponse: { data: dataSource },
    gettingEntryForm
  } = useSelector((state) => state.entry);
 const empId = userData.data?.id;
 
 
  const isSixDigits = (customerId) => /^\d{6}$/.test(customerId);
  const getRowStyle = (params) => {
    if (isSixDigits(params.data.customer_id)) {
      return { backgroundColor: "green" };
    }
    return null;
  };

  const onClickAdd = () => {
    navigate('/entry/addForm', {
      state: {}
    });
  };

  const handleEditClick = (data) => {
    navigate('/entry/editForm', {
     state: {...data, edit: true}
   });
 };

  const gridData = (dataSource ?? []).map((e) => {
    return {
      ...e
    };
  });

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

  useEffect(() => {
    if (type === 1)
      dispatch(
        getEntryForm({ path: "get-Entry-Form", data: {daterange: Daterange } })
      );
    else
      dispatch(
        getEntryForm({
          path: "get-Entry-Form",
          data: { employee: empId,
            daterange: Daterange  }
        })
      );
  }, []);

  const handleFormSubmit = () => {
    if (type === 1) {     
      dispatch(getEntryForm({ path: 'get-Entry-Form', data: {daterange: Daterange } }));
    }
    else {
      dispatch(
        getEntryForm({
          path: "get-Entry-Form",
          data: { employee: empId,
            daterange: Daterange  }
        })
      );
    }
    handleSubmit();
  };

  return (
    <>    
    <Card>
    <Row style={{margin:'3px'}} gutter={[5, 0]}>     
      <Col md={{span: 8}} xs={{span: 24}} >
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
                  style={{background:'#34b1aa',color: "#ffffff"}}
                  className="btn btn col-lg-2 col-m-2 col-sm-2 h-100 w-auto align-items-center"
                >
                  {"Submit"}
                </Button>
              </Form.Item>
            </Col>
            </Row>
      </Card>       
      <CustomTable
        loading={gettingEntryForm}
        dataSource={gridData}
        handleEditClick={handleEditClick}
        onClickAdd={onClickAdd}
        column={column}
        getRowStyle={getRowStyle}
        title={"Entry Form List"}
      />
      ;
    </>
  );
}
