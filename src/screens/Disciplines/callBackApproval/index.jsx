import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getCallBackEntryApproval,getDefinitionsFilter,getAllMappedOutlet } from "../../../@app/subMaster/subMasterSlice";
import CustomTable from "../../../components/CustomTable";
import dayjs from "dayjs";
import { callEntryStatus } from "../../../components/formComponents/CommonFunctions";
import ConfirmOnExit from "../../../components/confirmOnExit/ConfirmOnExit";
import {
  Badge,
  Rate,
  Form,
  Button,
  Tooltip,
  Card,
  Row,
  Col,
  DatePicker,
  Select,
  Modal,
  Input
} from "antd";
import messageToast from "../../../components/messageToast/messageToast";
import apis from "../../../api/stateAPI";
import { useForm } from "react-hook-form";
import { map } from "ramda";

export default function CallBackApproval() {

  const { Option } = Select;
  const navigate = useNavigate();
  const { handleSubmit } = useForm();
  const [form] = Form.useForm();
  const { type, userData } = useSelector((state) => state.auth);
  const empId = userData.data?.id;
  const [approveModal, setApproveModal] = useState({});
  const [showDialog, setShowDialog] = useState(false);
  const dispatch = useDispatch();
  const { TextArea } = Input;
  const {
    gettingCallBackEntryApproval,
    getCallBackEntryApprovalResponse: { data: dataSource }
  } = useSelector((state) => {
    return state.subMaster;
  });

  const [startDate, setStartDate] = useState(
    useState(new Date().getMonth() + 1)
  );

  const gridData = Array.isArray(dataSource) ? dataSource.map((e) => ({ ...e })) : [];

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
  useEffect(() => {
    if (type === 1)
      dispatch(
        getDefinitionsFilter({ path: "get-definitions-filter", data: {} })
      );
    else
      dispatch(
        getDefinitionsFilter({
          path: "get-definitions-filter",
          data: { employee: empId }
        })
      );
  }, []);

  const {
    gettingDefinitionsFilter,
    getDefinitionsFilterResponse: {data: status}
  } = useSelector((state) => {
    return state.subMaster;
  });
  const [callStatus, setCallStatus] = useState();
  const [loading, setLoading] = useState(false);
  const onFinish = () => {
    let approve_callEntry = gridData.filter((value) =>
      selected.includes(value.id)
    );
    // Extract "id" values from the approve_callEntry array
    let callIds = approve_callEntry.map((item) => item.id);
    let submitted = {
      call_id: callIds, // Use the extracted "id" values
      approve_remarks:approveModal.data
    };
    setLoading(true);
    setApproveModal(false);
    apis.addCallEntryApprove(submitted).then((res) => {
      if (res.data.status === 200) {
        setTimeout(() => {
          messageToast({
            message: res.data.statusText,
            statusText: res.data.statusText,
            title: "Call Back Approval Status"
          });
          setLoading(false);
          if (type === 1)
          dispatch(
            getCallBackEntryApproval({
              path: "get-call-entry-approval",
              data: {}
            })
          );
        else
          dispatch(
            getCallBackEntryApproval({
              path: "get-call-entry-approval",
              data: {
                employee: empId,
             
              }
            })
          );
          navigate("/callBackApproval");          
        }, 1000);
        //setGridLoading(false);
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

  const handleFormSubmit = () => {
    const stDate = startDate.toLocaleString({ date: "DD/MM/YYYY" });
    var arr1 = stDate.split(",");
    const startSelectedDate = arr1[1];
    const endSelectedDate = arr1[3];
    if (startDate) {
      if (type === 1)
        dispatch(
          getCallBackEntryApproval({
            path: "get-call-entry-approval",
            data: { startDate: startSelectedDate, endDate: endSelectedDate, callStatus:callStatus, 
             outletid:selectedOutlets 
            }
          })
        );
      else
        dispatch(
          getCallBackEntryApproval({
            path: "get-call-entry-approval",
            data: {
              employee: empId,
              startDate: startSelectedDate,
              endDate: endSelectedDate,
              callStatus:callStatus,
              outletid:selectedOutlets
            }
          })
        );
    } else {
      apis.open({ message: "Please choose and Month", type: "error" });
    }
    handleSubmit();
  };



  useEffect(() => {
    if (type === 1)
      dispatch(
        getCallBackEntryApproval({ path: "get-call-entry-approval", data: {} })
      );
    else
      dispatch(
        getCallBackEntryApproval({
          path: "get-call-entry-approval",
          data: { employee: empId }
        })
      );
  }, []);

  const [selected, updateSelected] = useState([]);

  const onChecked = (isChecked, audit_id) => {
    if (!isChecked) {
      selected.splice(selected.indexOf(audit_id), 1);
    } else {
      selected.push(audit_id);
    }
    updateSelected([...selected]);
  };

  // Utility function to convert a string to Title Case

  const column = [
    {
      key: "1",
      headerName: "Select",
      field: "select",
      hide: false,
      width: 90,
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
      headerName: "Called By",
      field: "call_make_by",
      hide: false,
      width: 130,
      renderCell: (params) => {
        if (params.row.call_make_by == 0) return "Admin";
      }
    },
    {
      key: "3",
      headerName: "Outlet Code",
      field: "outlet_code",
      hide: false,
      width: 100
    },
    {
      key: "4",
      headerName: "Outlet Name",
      field: "outlet_name",
      hide: false,
      width: 220
    },
    {
      key: "5",
      headerName: "Customer Name",
      field: "customer_name",
      hide: false,
      width: 120
    },
    {
      key: "6",
      headerName: "Bill Date",
      field: "invoice_date",
      hide: false,
      width: 120,
      valueGetter: (params) => {
        const shortdate = dayjs(params.row.invoice_date).format("DD-MM-YYYY");
        return shortdate;
      }
    },
    {
      key: '7',
      headerName: 'FeedBack',
      field: 'feedback',
      hide: false,
      width: 120,
      renderCell: (params) => {
        const feedbackValue = params.row.feedback;
        // Check if feedback value is 'Negative'
        const isNegativeFeedback = feedbackValue == 'Negative';
    
        return (
          <span style={{ backgroundColor: isNegativeFeedback ? 'red' : '' }}>
            {feedbackValue}
          </span>
        );
      },
    },
    {
      key: "8",
      headerName: "Remarks",
      field: "remarks",
      hide: false,
      width: 150,
      renderCell: (params) => {
        return (
          <Tooltip title={params.row.remarks}>{params.row.remarks}</Tooltip>
        );
      }
    },
    {
      key: "9",
      headerName: "Rating",
      field: "rating",
      hide: false,
      width: 170,
      renderCell: (params) => {
        return <Rate allowHalf defaultValue={params.row.rating} disabled />;
      }
    },

    {
      key: "10",
      headerName: "Bill_Value",
      field: "billing_value",
      hide: false,
      width: 150
    },
    {
      key: "11",
      headerName: "Phone Number",
      field: "phone_number",
      hide: false,
      width: 130
    },
    {
      key: "12",
      headerName: "Status",
      field: "call_status",
      hide: false,
      width: 170,
      renderCell: (params) => {
        return (
          <Badge
            style={{ backgroundColor: callEntryStatus(params.row.call_status) }}
            count={params.row.call_status}
          ></Badge>
        );
      }
    }
  ];

  return (
    <>
      <ConfirmOnExit showModel={showDialog} />
      <Card>
        <Row style={{ margin: "3px" }} gutter={[5, 0]}>
          <Col md={{ span: 1 }} xs={{ span: 24 }}></Col>
          <Col md={{ span: 8 }} xs={{ span: 24 }}>
            <Form.Item name="month" label="Date Filter">
              <DatePicker.RangePicker
                format="DD-MM-YYYY"
                value={startDate}
                onChange={(e) => setStartDate(e)}
                dateFormat="MMMM d, yyyy"
              />
            </Form.Item>
          </Col>
          <Col md={5} xs={24}>
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
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
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

          <Col md={{span:5}} xs={{span:24}}>
            <Form.Item name='status' label="Status">
            <Select
                      placeholder="Select"
                      name="definition_list"
                      loading={gettingDefinitionsFilter}
                      onChange={(e) => setCallStatus(e)}                    
                      showSearch
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {map(
                        (state) => {
                          return (
                            <Option key={state.id} value={state.id}>
                              {state.def_title}
                            </Option>
                          );
                        },
                       status ? status?.filter((e) => e.status == '1') : []
                      )}
                    </Select>
            </Form.Item>
          </Col>
          <Col md={{ span: 4 }} xs={{ span: 24 }}>
            <Form.Item name="submit">
              <button
                onClick={handleFormSubmit}
                style={{ background: "#34b1aa", color: "#ffffff" }}
                className="btn btn col-lg-2 col-m-2 col-sm-2 h-100 w-auto align-items-center"
              >
                {" "}
                Filter
              </button>
            </Form.Item>
          </Col>
        </Row>
      </Card>

      <CustomTable
        dataSource={gridData}
        loading={gettingCallBackEntryApproval}
        column={column}      
        title={"Call Back Entry Approval List"}
      />
     <div
        className="d-flex justify-content-center align-items-center "
        style={{ width: "100%", padding: "1px" }}
      >
        <Form.Item>       
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
            onFinish={onFinish}
            autoComplete="off"
            form={form}
          >
            <Col md={{ span: 23 }} xs={{ span: 24 }}>
              <Form.Item
                name="approve_remarks"            
                rules={[{ required: true, message: "Select Remarks" }]}
              ></Form.Item>
            </Col>
          </Form>
   
          <TextArea
            rows={4}
            style={{ resize: "none" }}
            value={approveModal?.data || ""}
            onChange={(e) =>
              setApproveModal({ ...approveModal, data: e.target.value })
            }
          />
        </Modal>
      )}

    </>
  );
}
