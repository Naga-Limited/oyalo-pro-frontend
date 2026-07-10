import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate} from "react-router";
import { getDeepCleanApproval } from "../../../@app/subMaster/subMasterSlice";
import CustomTable from "../../../components/CustomTable";
import { Row, Col, Form, DatePicker,Card,Select,Image,Button } from "antd";
import messageToast from "../../../components/messageToast/messageToast";
import apis from "../../../api/stateAPI";
import { useForm } from "react-hook-form";
import { getAllMappedOutlet } from "../../../@app/subMaster/subMasterSlice";
import { deepCleanStatus } from "../../../components/formComponents/CommonFunctions";
import { format } from "date-fns";
import {
  Badge,
  Modal
  //  Input
} from "antd";
import ConfirmOnExit from "../../../components/confirmOnExit/ConfirmOnExit";
import { map } from "ramda";
import { getDefinitionsList } from "../../../@app/subMaster/subMasterSlice";

export default function DeepCleaningApproval({ setTopTitle }) {
  setTopTitle("Opening and Closing Check List Approval");
  const { Option } = Select;
  const [form] = Form.useForm();

  const { handleSubmit } = useForm();
  const { type, userData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [status, setStatus] = useState();
  // const { TextArea } = Input;
  const navigate = useNavigate();
  const [approveModal, setApproveModal] = useState({});
  const [showDialog, setShowDialog] = useState(false);
  const {
    getDeepCleanApprovalResponse: { data: dataSource },
    gettingDeepCleanApproval
  } = useSelector((state) => state.subMaster);
  const empId = userData.data?.id;
  const [loading, setLoading] = useState(false);

  const [selectedOutlets, setselectedOutlets] = useState([]);
  const [dropdownoutlet, setdropdownoutlet] = useState([]);

  const { gettingAllMappedOutlet } = useSelector((state) => state.subMaster);

  useEffect(() => {
    dispatch(getDefinitionsList());
  }, []);
  
  const {
    gettingDefinitionsList,
    getDefinitionsListResponse: { data: def }
  } = useSelector((state) => {
    return state.subMaster;
  });

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
 
  
  const [startDate, setStartDate] = useState(
    useState(new Date().getMonth()+1)
  );

  const handleFormSubmit = () => {
    const stDate = startDate.toLocaleString({ date: "DD/MM/YYYY" });
    var arr1 = stDate.split(",");
    const startSelectedDate = arr1[1];
    const endSelectedDate = arr1[3];
    if (startDate) {
      if (type === 1)
        dispatch(
          getDeepCleanApproval({
            path: "get-deepclean-approval",
            data: {
              startDate: startSelectedDate,
              endDate: endSelectedDate,
              outletid: selectedOutlets           
            }
          })
        );
      else
        dispatch(
          getDeepCleanApproval({
            path: "get-deepclean-approval",
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
  const [selected, updateSelected] = useState([]);


  const onChecked = (isChecked, id) => {
    if (!isChecked) {
      selected.splice(selected.indexOf(id), 1);
    } else {
      selected.push(id);
    }
    updateSelected([...selected]);
  };

  const gridData = Array.isArray(dataSource)
    ? dataSource.map((e) => ({ ...e }))
    : [];

  const onFinish = () => {
    let approve_deepClean = gridData.filter((value) =>
      selected.includes(value.id)
    );
    // Extract "id" values from the approve_deepClean array
    let entryIds = approve_deepClean.map((item) => item.id);
    let submitted = {
      deep_id: entryIds, // Use the extracted "id" values
      approve_remarks: status,     
    };
    setLoading(true);
    setApproveModal(false);
    apis.addDeepCleanEntryApprove(submitted).then((res) => {

      if (res.data.status === 200) {
        setTimeout(() => {
          messageToast({
            message: res.data.message,
            statusText: res.data.statusText,
            title: "Deep Clean Approval Status"
          });
          setLoading(false);
          if (type === 1)
            dispatch(
              getDeepCleanApproval({
                path: "get-deepclean-approval",
                data: {}
              })
            );
          else
            dispatch(
              getDeepCleanApproval({
                path: "get-deepclean-approval",
                data: {
                  employee: empId
                }
              })
            );
          navigate("/deepCleaningApproval");
        }, 1000);
       } else if (res.data.status === 300) {
        messageToast({
          message: res.data.statusText,
          statusText: res.data.statusText,
          title: "Not Approve"
        });
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    if (type === 1)
      dispatch(
        getDeepCleanApproval({ path: "get-deepclean-approval", data: {} })
      );
    else
      dispatch(
        getDeepCleanApproval({
          path: "get-deepclean-approval",
          data: { employee: empId }
        })
      );
  }, []);

  function getEntryDate(params) {
    return `${format(new Date(params.row.created_at), 'dd-MM-yyyy') }`;
  }

  const column = [
    {
      key: "1",
      headerName: "Select",
      field: "select",
      hide: false,
      width: 100,
      renderCell: (params) => {
        return (
          <input
            type="checkbox"
            className="ms-2 mt-1"
            checked={selected.toString().includes(params.row.id)}
            onClick={(e) => onChecked(e.target.checked, params.row.id)}
          />
        );
      },
      renderHeader: () => {
        return (
          <div>
            <input
              type="checkbox"
              checked={gridData?.length === selected.length}
              className="ms-2 mt-1"
              onClick={(e) => {
                if (e.target.checked) {
                  const selectedRowID = [...gridData.map((e) => e.id)];
                  updateSelected(
                    selectedRowID || [gridData?.push((e) => e.id)]
                  );
                  selected.push(e.id);
                 } else {
                  updateSelected([]);
                }
              }}
            />
          </div>
        );
      }
    },


    {
      key: "2",
      headerName: "Outlet Code",
      field: "outlet_code",
      hide: false,
      width: 100
    },

    {
      key: "3",
      headerName: "Outlet Name",
      field: "outlet_name",
      hide: false,
      width: 250
    },

    {
      key: "4",
      headerName: "Date", // Keep the original header name
      field: "created_at",
      hide: false,
      width: 100,
      valueGetter: getEntryDate
    },
    {
      key: "5",
      headerName: "Equipment",
      field: "equipment_name",
      hide: false,
      width: 150,
      valueGetter: (params) => {
        const value = params.value;
        if (typeof value === "string") {
          const values = value.split(",").map((item) => item.trim());
          return values.join("\n");
        } else if (Array.isArray(value)) {
          return value.join("\n");
        }
        return value;
      }
    },

    {
      key: "6",
      headerName: "Remarks",
      field: "remarks_name",
      hide: false,
      width: 200
    },
    {
      key: "7",
      headerName: "Schedule Time",
      field: "schedule_time",
      hide: false,
      width: 200
    },

    {
      key: "8",
      headerName: "Clean Time",
      field: "clean_time",
      hide: false,
      width: 200
    },

    {
      key: "9",
      headerName: "Deviation Time",
      field: "time_difference",
      hide: false,
      width: 200
    },

    {
      key: "10",
      headerName: "Image",
      field: "image",
      hide: false,
      width: 120,
      renderCell: (params) => (
        <Image
          style={{ paddingLeft: "10px" }}
          width={50}
          src={params?.row?.image ?? ""}
          alt="No Image"
        />
      )
    },
    {
      key: "11",
      headerName: "Status",
      field: "deep_clean_status",
      hide: false,
      width: 230,
      renderCell: (params) => {
        return (
          <Badge
            style={{
              backgroundColor: deepCleanStatus(params.row.deep_clean_status)
            }}
            count={params.row.deep_clean_status}
          ></Badge>
        );
      }
    }
  ];

  return (
    <>
      <ConfirmOnExit showModel={showDialog} />
      <Card>
        <Row gutter={[25, 0]}>
          <Col md={5} xs={24} span={24}>
            <Form.Item
              label="Outlet Code"
              labelCol={{
                md: { span: 24 },
                xs: { span: 24 },
                style: { textAlign: "left" }
              }}
            >
              <Select
                placeholder="Select"
                loading={gettingAllMappedOutlet}
                maxTagCount={0}
                label="Outlet Code"
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
        loading={gettingDeepCleanApproval}
        dataSource={gridData}
        // handleEditClick={handleEditClick}
        column={column}
        title={"Deviation Report"}
      />
      <div
        className="d-flex justify-content-center align-items-center "
        style={{ width: "100%", padding: "1px" }}
      >
        <Form.Item>
          {/* <Button
            onClick={onFinish}
            loading={loading}
            style={{
              backgroundColor: "#34b1aa",
              colsetYearor: "white",
              marginRight: "6px",
              fontWeight: "bold"
            }}
            type="info"
            htmlType="button"
          >
            Approve
          </Button> */}
          <Button
            onClick={() => setApproveModal({ ...approveModal, show: true })}
            loading={loading}
            style={{
              backgroundColor: "#34b1aa",
              color: "white",
              marginRight: "6px",
              fontWeight: "bold"
            }}
            type="info"
            htmlType="button"
          >
            Approve
          </Button>
        </Form.Item>
      </div>
      ;
      {approveModal?.show && (
        <Modal
          title="Approve Remarks"
          open={approveModal?.show}
          onOk={handleSubmit(onFinish)}
          loading={loading}
          onCancel={() => setApproveModal({ ...approveModal, show: false })}
        >
          <Form
            onFieldsChange={() => setShowDialog(true)}
            name="basic"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            initialValues={
              {
                //approve_remarks: defaultValue?.approve_remarks
              }
            }
            onFinish={onFinish}
            autoComplete="off"
            form={form}
          >
            {/* <Col md={{ span: 23 }} xs={{ span: 24 }}>
              <Form.Item
                name="approve_remarks"
               // label="Remarks"
                rules={[{ required: true, message: "Select Remarks" }]}
              ></Form.Item>
            </Col> */}
          </Form>
          <Select
            placeholder="Select"
            style={{
              width: "250px",
              height: "34px",
              border: "2px solid #f5a60b",
              borderRadius: "10px"
            }}
            name="definition_list"
            loading={gettingDefinitionsList}
            onChange={(e) => setStatus(e)}
           // defaultValue={defaultValue?.definition_list}
            showSearch
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {map(
              (state) => {
                return (
                  <Option key={state.id} value={state.id}>
                    {state.def_list_name}
                  </Option>
                );
              },
              def ? def?.filter((e) => e.def_title == "Approve Remarks") : []
            )}
          </Select>
          {/* <TextArea
            rows={4}
            style={{ resize: "none" }}
            value={approveModal?.data || ""}
            onChange={(e) =>
              setApproveModal({ ...approveModal, data: e.target.value })
            }
          /> */}
        </Modal>
      )}
    </>
  );
}
