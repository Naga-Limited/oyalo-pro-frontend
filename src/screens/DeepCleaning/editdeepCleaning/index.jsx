import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate} from "react-router";
import { getEditDeepCleaningEntry } from "../../../@app/subMaster/subMasterSlice";
import CustomTable from "../../../components/CustomTable";
import { column } from "./column";
import { Row, Col, Form, DatePicker,Card,Select } from "antd";
import apis from "../../../api/entryApis";
import { useForm} from "react-hook-form";
import { getAllMappedOutlet } from "../../../@app/subMaster/subMasterSlice";

export default function EditDeepCleaning({ setTopTitle }) {
  setTopTitle("Edit Opening and Closing Check List Entry");
  const { Option } = Select;
  const { handleSubmit } = useForm();
  const { type, userData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    getEditDeepCleaningEntryResponse: { data: dataSource },
    gettingEditDeepCleaningEntry
  } = useSelector((state) => state.subMaster);
  const empId = userData.data?.id;

  const handleEditClick = (data) => {
    navigate("/editdeepCleaning/editForm", {
      state: {...data, edit: true}
    });
  };

  const [selectedOutlets, setselectedOutlets] = useState([]);
  const [dropdownoutlet, setdropdownoutlet] = useState([]);

  const { gettingAllMappedOutlet } = useSelector((state) => state.subMaster);

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

  const handleFormSubmit = () => {
    const stDate = startDate.toLocaleString({ date: "DD/MM/YYYY" });
    var arr1 = stDate.split(",");
    const startSelectedDate = arr1[1];
    const endSelectedDate = arr1[3];
    if (startDate) {
      if (type === 1)
        dispatch(
          getEditDeepCleaningEntry({
            path: "get-edit-Deep-Cleaning-entry",
            data: {
              startDate: startSelectedDate,
              endDate: endSelectedDate,
              outletid: selectedOutlets           
            }
          })
        );
      else
        dispatch(
          getEditDeepCleaningEntry({
            path: "get-edit-Deep-Cleaning-entry",
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

  const gridData = (dataSource ?? []).map((e) => {
    return {
      ...e
    };
  });

  const [startDate, setStartDate] = useState(
    useState(new Date().getMonth()+1)
  );

  return (
    <>
    <Card>
      <Row gutter={[25, 0]}>
      
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
            <Col md={{ span: 4 }} xs={{ span: 24 }}>
              <Form.Item name="month" label="Date Filter">
                <DatePicker.RangePicker
                  format="DD-MM-YYYY"
                  value={startDate}
                  onChange={(e) => setStartDate(e)}
                  dateFormat="MMMM d, yyyy"
                  style={{                  
                    width:"300px",                    
                  }}
                />
              </Form.Item>
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
      <CustomTable
        loading={gettingEditDeepCleaningEntry}
        dataSource={gridData}
        handleEditClick={handleEditClick}
        column={column}
        title={"Edit Deep Cleaning Entry"}
      />
      ;
    </>
  );
}

