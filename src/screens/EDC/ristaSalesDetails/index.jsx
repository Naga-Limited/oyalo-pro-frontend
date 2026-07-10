import React, { useState } from "react";

import CustomTable from "../../../components/CustomTable";
import { column } from "./column";
import { getRistaSalesData } from "../../../@app/master/masterSlice";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {Row, Col, Button, Card, Form, DatePicker} from "antd";

export default function ristaSalesDetails({ setTopTitle }) {
  setTopTitle("Rista Sales Data");
 
  const dispatch = useDispatch();
  const { control } = useForm();

  const { type, userData } = useSelector((state) => state.auth);
  const { handleSubmit } = useForm();
  const empId = userData.data?.id;

  const {
    gettingRistaSalesData,
    getRistaSalesDataResponse: { data: dataSource }
  } = useSelector((state) => {
    return state.master;
  });

  const [Daterange, setDaterange] = useState([]);
 
  const formatDate = (date) => {
    return date.format('YYYY-MM-DD');
  };

  const handleDateRangeChange = (dates) => {    
    setDaterange(dates.map(formatDate));
  };

  const disabledFutureDates = (current) => {
       const today = new Date();
    return current && current > today;
  };

  const handleFormSubmit = () => {
    if (type === 1) {     
      dispatch(getRistaSalesData({ path: 'get-rista-sales-data', data: {daterange: Daterange } }));
    }
    else {
      dispatch(
        getRistaSalesData({
          path: "get-rista-sales-data",
          data: { employee: empId,
            daterange: Daterange  }
        })
      );
    }
    handleSubmit();
  };

  return (
    <>
      {" "}
      <Card>
        <Row style={{ margin: "3px" }} gutter={[5, 0]}>
          <Col md={{ span: 8 }} xs={{ span: 24 }}>
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
          <Col
            md={{ span: 3 }}
            xs={{ span: 24 }}
            style={{ textAlign: "center", paddingTop: "25px" }}
          >
            <Form.Item
              labelCol={{ md: { span: 24 }, xs: { span: 24 } }}
              name="submit"
            >
              <Button
                onClick={handleFormSubmit}
                type="primary"
                style={{ background: "#34b1aa", color: "#ffffff" }}
                className="btn btn col-lg-2 col-m-2 col-sm-2 h-100 w-auto align-items-center"
              >
                {"Submit"}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Card>
      <CustomTable
        loading={gettingRistaSalesData}
        dataSource={dataSource}
        column={column}
        hideActionBtn={true}
        title={"Rista Sales Data"}
      />{" "}
    </>
  );
}
