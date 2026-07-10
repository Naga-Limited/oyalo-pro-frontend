import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router';
import CustomTable from '../../../components/CustomTable';
import {column} from './column';
import {getConsumableReport} from '../../../@app/subMaster/subMasterSlice';
 import {useDispatch, useSelector } from 'react-redux';
 import { Col,Form,Card,Row,DatePicker,Select } from "antd";
import { getAllMappedOutlet } from "../../../@app/subMaster/subMasterSlice";
import apis from "../../../api/entryApis";
import { useForm } from "react-hook-form";

export default function ConsumableEntryReport({setTopTitle}) {
  setTopTitle('Consumable Report Details');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { handleSubmit } = useForm();
  const { Option } = Select;
  
  const handleEditClick = (data) => {  
     navigate('/consumableEntryReport/addForm', {
      state: {...data,outlet_id:data?.outlet_id,
        id:data?.id,
      },      
    });
  };

  const [startDate, setStartDate] = useState(
    useState(new Date().getMonth() + 1)
  );

  const { type, userData } = useSelector((state) => state.auth);
  const empId = userData.data?.id;
  
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
      setselectedOutlets([]);
    } else {   
      const allValuesExceptSpecial = dropdownoutlet
        .filter(
          (option) =>
            option.value !== "select_all" && option.value !== "unselect_all"
        )
        .map((option) => option.value);
      setselectedOutlets(allValuesExceptSpecial);
    }
  };

  const handleFormSubmit = () => {
    const stDate = startDate.toLocaleString({ date:"DD/MM/YYYY" }); 
    var arr1 = stDate.split(",");   
    const startSelectedDate = arr1[1];  
    const endSelectedDate = arr1[3]; 
    if (startDate) {
      if (type === 1)
        dispatch(
          getConsumableReport({
            path: "get-Consumable-Report",
            data: {
              startDate: startSelectedDate,
              endDate: endSelectedDate,          
              outletid: selectedOutlets
            }
          })
        );
      else
        dispatch(
          getConsumableReport({
            path: "get-Consumable-Report",
            data: {
              employee: empId,
              startDate: startSelectedDate,
              endDate: endSelectedDate,         
              outletid: selectedOutlets
            }
          })
        );
    } else {
      apis.open({ message: "Please choose and Month", type: "error" });
    }
    handleSubmit();
  };

  const {
    gettingConsumableReport,
    getConsumableReportResponse: {data: dataSource}
  } = useSelector((state) => {
    return state.subMaster;
  });


  return (
  <>
    <Card>
    <Form
          name="basic"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          autoComplete="off"
        >
        <Row style={{ margin: "3px" }} gutter={[9, 0]}>         
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
          <Col md={{ span: 7 }} xs={{ span: 22 }}>
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
          <Col md={{ span: 7 }} xs={{ span: 24 }}>
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
                {" "}
                Filter
              </button>
            </Form.Item>
          </Col>
        </Row>
        </Form>
      </Card>
    <CustomTable
      loading={gettingConsumableReport}
      dataSource={dataSource}
      column={column}    
      handleEditClick={handleEditClick}   
      title={"Consumable Report Details"}         
    />
    </>
  );
}
