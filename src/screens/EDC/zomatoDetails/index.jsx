import React ,{useState} from 'react';
import {useNavigate} from 'react-router';
import CustomTable from '../../../components/CustomTable';
import {column} from './column';
import {getUploadedZomato} from '../../../@app/master/masterSlice';
 import {useDispatch, useSelector } from 'react-redux';
 import { Row, Col, Form, DatePicker,Card} from "antd";
import { useForm, Controller } from "react-hook-form";


export default function edcDetails({setTopTitle}) {
  setTopTitle('Zomato Details');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { control } = useForm();
  const handleDownload = () => {
    window.open(
      process.env.REACT_APP_API_BASE_URL + "download-zomato",
      "_blank"
    );
  };

  const { handleSubmit } = useForm();
  const { type, userData } = useSelector((state) => state.auth);

  const empId = userData.data?.id;

 
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
    if (Daterange.length != 0) {
      setShowAlert(false);     
      if (type == 1)
      dispatch(
        getUploadedZomato({
          path: "get-Uploaded-Zomato-Trans",
          data: { daterange: Daterange
          }
        })
      );
    else
      dispatch(
        getUploadedZomato({
          path: "get-Uploaded-Zomato-Trans",
          data: {
            employee: empId,
            daterange: Daterange
          }
        })
      );
    }
    else {
      setShowAlert(true);
    }
    handleSubmit();
  };

  const [Daterange, setDaterange] = useState([]);

  const {
    gettingUploadedZomato,
    getUploadedZomatoResponse: {data: dataSource}
  } = useSelector((state) => {
    return state.master;
  });

  const onClickUpdateCsv = () => {
    navigate("/zomatoDetails/csvUpdate", {
      state: {},
    });
  };
  
  return (
    <><Card>
    {" "}
    <Row gutter={[25, 0]}>        
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
    </Row>
  </Card>
  {showAlert && (
    <div style={{ color: "red", fontWeight: "bold", textAlign: "center" }}>
      <span>{"Please Select Outlet & Date Fields"}</span>
    </div>
  )}
    <CustomTable
      loading={gettingUploadedZomato}
      dataSource={dataSource}
      column={column}
      hideActionBtn={true}    
      title={"Zomato Details"}
      handleDownload={handleDownload}
      onClickUpdateCsv={onClickUpdateCsv}
    />
    </>
  );
}
