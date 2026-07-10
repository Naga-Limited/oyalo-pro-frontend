import React, { useEffect, useState } from "react";
import {
  Card,
  Modal
  //Form,Col
} from "antd";
import Container from "react-bootstrap/Container";
import InputAdornment from "@mui/material/InputAdornment";
import { SearchOutlined } from "@ant-design/icons/lib/icons";
import { OutlinedInput, Stack, Tooltip } from "@mui/material";
import { BsPlusLg } from "react-icons/bs";
import { AiOutlineDownload, AiOutlineImport } from "react-icons/ai";
import Button from "react-bootstrap/Button";
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton
} from "@mui/x-data-grid";
import { FaEye, FaUserEdit } from "react-icons/fa";
import ViewCard from "../viewCard/ViewCard";
import { useNavigate } from "react-router";
import { useDebounce } from "../../customHooks/useDebouce";
import CustomPagination from "./customPagination";
import { isEmpty } from "ramda";
import messageToast from "../messageToast/messageToast";

const customHeaderDesign = {
  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: "#494b4d",
    color: "#F4A50D"
  },
  ".MuiDataGrid-sortIcon": {
    fill: "white"
  },
  ".MuiIconButton-sizeSmall": {
    color: "white"
  }
};

const customMobileFilterDesign = {
  "& .MuiDataGrid-filterForm": {
    flexDirection: {
      xs: "column",
      sm: "row"
    }
  },
  "& .MuiDataGrid-paper": {
    minWidth: {
      xs: "0"
    }
  }
};

export default function CustomTable({
  dataSource,
  column,
  onClickAdd,
  handleDownload,
  onClickUpdateCsv,
  title,
  loading = false,
  handleEditClick,
  handleViewClick,
  addButtonStatus = false,
  returnData = {},
  hideActionBtn = false,
  onClickhandleApproval,
  onClickhandleReject,
  handleCancelRequest,
  setYear = {},
  setMonth = {},
  year = "",
  month = "",
  handleSubmit = {},

  handleCashReceive = {}
}) {
  const data = (dataSource ?? []).map((data, index) => {
    if (title == "Create List") {
      return {
        "S.No": index + 1,
        id: index + 1,
        ...data,
        status: Number(data.status) ? "Active" : "In Active"
      };
    } else {
      return {
        "S.No": index + 1,
        id: index + 1,
        ...data,
        status: Number(data.status) ? "Active" : "In Active"
      };
    }
  });

  const [searchText, setSearchText] = useState("");
  const [tableData, setTableData] = useState(data);
  const navigate = useNavigate();
  const query = useDebounce(searchText, 600);

  useEffect(() => {
    const text = query.replace(/^\s+/g, "");
    const newData = data.filter((obj) =>
      Object.keys(obj)
        .map((o) => String(obj[o]).toLowerCase())
        .some((v) => v.includes(text.toLowerCase()))
    );
    setTableData(newData);
  }, [query, title, searchText]);

  const columns = [...column].filter((e) => !e.hide);

  if (!hideActionBtn) {
    title !== "User Report" && title != "User Rank" ? (
      columns.push({
        field: "action",
        headerName: "Action",
        width: 250,
        sortable: false,
        disableClickEventBubbling: true,
        renderCell: (params) => {
          const view = () => {
            if (title === "CAPA Submission List") {
              navigate("/capaView", {
                state: params.row
              });
            } else if (title === "Entry List") {
              navigate("/auditEntry/auditView", {
                state: params.row
              });
            } else if (title !== "Approval List") {
              Modal.info({
                title: <div className="align-self-center">{title}</div>,
                width: "50%",
                content: <ViewCard data={params.row} column={column} />,
                icon: <></>,
                onOk() {}
              });
            } else {
              navigate("/approvalView", {
                state: params.row
              });
            }
          };

          return (
            <Stack direction="row" spacing={3} style={{ maxWidth: "300px" }}>
              {(title === "Payment Create List" &&
                params.row.Petty_Cash_Request_Status == "OH Rejected") ||
              params.row.Petty_Cash_Request_Status == "AH Rejected" ? (
                <>
                  <Button
                    variant="outlined"
                    onClick={
                      handleEditClick ? () => handleEditClick(params.row) : ""
                    }
                    color="warning"
                    style={{ backgroundColor: "#ffaf00" }}
                    size="sm"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={
                      handleCancelRequest
                        ? () => handleCancelRequest(params.row)
                        : ""
                    }
                    color="warning"
                    style={{ backgroundColor: "#ffaf00" }}
                    size="sm"
                  >
                    Cancel Request
                  </Button>
                </>
              ) : (
                <></>
              )}
              {title === "Payment Create List" &&
              params.row.Petty_Cash_Request_Status == "Approved" ? (
                <>
                  <Button
                    variant="outlined"
                    onClick={
                      handleCashReceive
                        ? () => handleCashReceive(params.row)
                        : ""
                    }
                    color="warning"
                    style={{ backgroundColor: "#ffaf00" }}
                    size="sm"
                  >
                    Cash Received
                  </Button>
                </>
              ) : (
                <></>
              )}

              {title === "Payment_request_ah" ? (
                <>
                  <Button
                    variant="outlined"
                    onClick={
                      handleEditClick ? () => handleEditClick(params.row) : ""
                    }
                    color="warning"
                    style={{ backgroundColor: "#ffaf00" }}
                    size="sm"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={
                      onClickhandleApproval
                        ? () => onClickhandleApproval(params.row)
                        : ""
                    }
                    color="warning"
                    style={{ backgroundColor: "#ffaf00" }}
                    size="sm"
                  >
                    Approve
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={
                      onClickhandleReject
                        ? () => onClickhandleReject(params.row)
                        : ""
                    }
                    color="warning"
                    style={{ backgroundColor: "#ffaf00" }}
                    size="sm"
                  >
                    Reject
                  </Button>
                </>
              ) : (
                ""
              )}
              {title === "Payment_request_oh" ? (
                <>
                  <Button
                    variant="outlined"
                    onClick={
                      onClickhandleApproval
                        ? () => onClickhandleApproval(params.row)
                        : ""
                    }
                    color="warning"
                    style={{ backgroundColor: "#ffaf00" }}
                    size="sm"
                  >
                    Approved
                  </Button>

                  <Button
                    variant="outlined"
                    onClick={() => onClickhandleReject(params.row)}
                    color="error"
                    style={{ backgroundColor: "#ffaf00" }}
                    size="sm"
                  >
                    Reject
                  </Button>
                </>
              ) : (
                <></>
              )}
              {title !== "Create Ticket List" &&
              title !== "Payment_request_oh" &&
              title !== "Payment_request_oh" &&
              title !== "Payment_request_ah" &&
              title !== "Payment Create List" &&
              title !== "EDC Payment Vs Bank" &&
              title !== "Rista Sales Data" &&
              title !== "Swiggy Payment Vs Sales" &&
              title !== "MagicPin Payment Vs Sales" &&
              title !== "Overall Payment Vs Bank" &&
              title !== "User Report" ? (
                <Tooltip placement="bottom" title={"View"}>
                  <Button
                    variant="outlined"
                    onClick={
                      handleViewClick ? () => handleViewClick(params.row) : view
                    }
                    color="warning"
                    style={{ backgroundColor: "#1f3bb3", width: "50px" }}
                    size="sm"
                  >
                    <FaEye color="#fff" />
                  </Button>
                </Tooltip>
              ) : (
                <></>
              )}
              {title !== "Role Master" &&
              title !== "Audit Report" &&
              title !== "CAPA Submission List" &&
              title !== "Approval List" &&
              title !== "FI Entry List" &&
              title !== "ORL FI Entry List" &&
              title !== 'License Report'&&
              title !== 'Audit Entry List' &&
              title !== 'Audit Outlet CAPA List' &&
              title !== 'Audit Outlet Approval List' &&
              title !== 'Audit Department CAPA' && 
              title !== 'Audit 2.0 Report' && 
              title !== 'Audit Categorywise Report' &&
              title !== 'Call Back Entry Report List'&&
              title !== 'Call Back Entry Approval List' &&
              title !== 'Deviation Report' &&
              title !== "Payment_request_ah" &&
              title !== "Create Ticket List" &&
              title !== "Payment_request_oh" &&
              title !== "Payment Create List" &&
              title !== "EB Reading Approval List" &&
              title !== "EBReading Report" &&
              title !== "Overall Payment Vs Bank" &&
              title !== "User Report" ? (
                <Tooltip placement="bottom" title={"Edit"}>
                  <Button
                    variant="outlined"
                    onClick={() => handleEditClick(params.row)}
                    color="error"
                    style={{ backgroundColor: "#ffaf00", width: "50px" }}
                    size="sm"
                  >
                    <FaUserEdit color="#fff" />
                  </Button>
                </Tooltip>
              ) : (
                <></>
              )}
              {title === "Create Ticket List" &&
              title != "Outltet_Asset_Master" ? (
                <>
                  <div dangerouslySetInnerHTML={{ __html: params.value }}></div>
                  <button
                    className="orangeFactory btn"
                    onClick={() => handleEditClick(params.row)}
                  >
                    Update
                  </button>
                </>
              ) : (
                <></>
              )}
            </Stack>
          );
        }
      })
    ) : (
      <></>
    );
  }

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport
          csvOptions={{
            fileName: title.replace(/ +/g, ""),
            // delimiter: ';',
            utf8WithBom: true
          }}
          printOptions={{
            hideToolbar: true
          }}
        />
      </GridToolbarContainer>
    );
  }

  const handleFormSubmit = () => {
    if (!year) {     
      // api.open({
      //   message: "Please choose Year",
      //   type: "error",
      // });
      messageToast({
        message: "Please Choose Year",
        status: 400,
        title: ""
      });
      return false;
    }
    if (!month) {
      messageToast({
        message: "Please Choose Month",
        status: 400,
        title: ""
      });
      return false;
    }
    handleSubmit();
  };

  return (
    <Container style={{ width: "100%" }}>
      {/* title={<h3>{title}</h3>} */}
      <Card style={{ height: "100%" }} bordered={true}>
        <div
          className="row align-items-center"
          style={{ paddingLeft: "11px", paddingTop: "4px" }}
        >
          {title == "User Rank" && title == "ORL FI Entry List" ? (
            <>
              <div className="d-flex row">
                <div className="col-lg-4 col-md-3 col-sm-12 mt-2 pb-4 row align-items-center">
                  <OutlinedInput
                    className="align-items-center ml-sm-2 mr-sm-2 shadow-sm"
                    id="input-with-icon-adornment"
                    placeholder="Search Here"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    size="small"
                    startAdornment={
                      <InputAdornment position="start">
                        <SearchOutlined />
                      </InputAdornment>
                    }
                  />
                </div>
                <div className="col-lg-8 col-md-8 col-sm-12 mt-2 pb-4 align-items-center d-flex justify-content-end gap-4">
                  {/* <div className="col-lg-8  col-md-8 col-sm-8 mt-2 gap-2 flex-row py-4 w-auto "> */}
                  <div className="d-flex row gap-3 align-items-center ">
                    <div className="col-lg-4 col-md-4 col-sm-5 row gap-2  px-2">
                      <label className="col-md-6">Year</label>
                      <select
                        className="col-md-12"
                        onChange={(e) => setYear(e?.target.value)}
                      >
                        <option value={""}>Select Year</option>
                        <option value={"2022"}>2022</option>
                        <option value={"2023"}>2023</option>
                        <option value={"2024"}>2024</option>
                        <option value={"2025"}>2025</option>
                        <option value={"2026"}>2026</option>
                        <option value={"2027"}>2027</option>
                        <option value={"2028"}>2028</option>
                        <option value={"2029"}>2029</option>
                        <option value={"2030"}>2030</option>
                      </select>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-5 row gap-2 px-2">
                      <label className="col-md-6">Month</label>
                      <select
                        className="col-md-12"
                        onChange={(e) => setMonth(e?.target.value)}
                      >
                        <option value={""}>Select Month</option>
                        <option value={"01"}>01</option>
                        <option value={"02"}>02</option>
                        <option value={"03"}>03</option>
                        <option value={"04"}>04</option>
                        <option value={"05"}>05</option>
                        <option value={"06"}>06</option>
                        <option value={"07"}>07</option>
                        <option value={"08"}>08</option>
                        <option value={"09"}>09</option>
                        <option value={"10"}>10</option>
                        <option value={"11"}>11</option>
                        <option value={"12"}>12</option>
                      </select>
                    </div>
                    {/* </div> */}
                    {/* <div className=" col-lg-4 col-md-4   col-sm-4py-4"> */}
                    <button
                      onClick={handleFormSubmit}
                      className="btn btn-primary col-lg-2 col-m-2 col-sm-2 h-100 w-auto align-items-center"
                    >
                      {" "}
                      Submit
                    </button>
                  </div>
                  {/* </div> */}
                </div>
              </div>
            </>
          ) : title !== "Payment_request_oh" &&
            title !== "Payment_request_ah" ? (
            <div className="col-lg-4 col-md-3 col-sm-12 mt-2 pb-4 row align-items-center">
              <OutlinedInput
                className="align-items-center ml-sm-2 mr-sm-2 shadow-sm"
                id="input-with-icon-adornment"
                placeholder="Search Here"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                size="small"
                startAdornment={
                  <InputAdornment position="start">
                    <SearchOutlined />
                  </InputAdornment>
                }
              />
            </div>
          ) : (
            <></>
          )}
          {title !== "Approval List" &&
          title !== "Audit Report" &&
          title !== "CAPA Submission List" &&
          title !== 'License Report' && 
          title !== 'License Renewal' && 
          title !== 'Approve License' && 
          title !== 'Edit License Details'&& 
          title !== 'Audit Outlet CAPA List' && 
          title !== 'Audit Outlet Approval List' && 
          title !== 'Audit Department CAPA' && 
          title !== 'Audit 2.0 Report' && 
          title !== 'Call Back Entry Approval List' && 
          title !== 'Audit Categorywise Report' && 
          title !== 'Call Back Entry Report List' && 
          title !== 'Cash Handling Report' && 
          title !== 'Edit Call Back Entry List' && 
          title !== 'Deviation Report' && 
          title !== 'Deep Cleaning List' && 
          title !== 'Edit Deep Cleaning Entry' &&
          title !== "Payment_request_oh" &&
          title !== "Payment_request_ah" &&
          title !== "User Report" &&
          title !== "EB Reading Entry List" &&
          title !== "EB Reading Approval List" &&
          title !== "EBReading Report" &&
          title !== "Rista Sales Data" &&
          title !== "EDC Payment Vs Bank" &&
          title !== "Swiggy Payment Vs Sales" &&
          title !== "MagicPin Payment Vs Sales" &&
          title !== "Overall Payment Vs Bank" &&
          title !== "Stock Details" &&
          title !== "Consumable Entry Details" &&
          title !== "Consumable Report Details" &&
          title !== "Low Consumable Report" &&
          title != "User Rank" ? (
            <div className="col-lg-8 mt-2 col-md-9 col-sm-12 text-md-end text-lg-end text-center  mt-sm-2">
              <div className="btn-group pb-2">
                {title == "Outltet_Asset_Master" ? (
                  <>
                    {/* <Tooltip placement="bottom" title={"update"}>
                      <Button
                        onClick={() => {
                          onClickUpdate();
                        }}
                        className="btn btn-primary me-2 px-md-3 px-sm-4">
                        Update
                      </Button>
                    </Tooltip> */}
                  </>
                ) : (
                  <></>
                )}
                <Tooltip placement="bottom" title={"Add"}>
                  <Button
                    disabled={addButtonStatus}
                    onClick={() => {
                      onClickAdd();
                    }}
                    className="btn btn-primary me-2 px-md-3 px-sm-4"
                  >
                    <BsPlusLg size={12} />
                  </Button>
                </Tooltip>

                {title !== "Entry List" ? (
                  title !== 'Equipment Master List' &&
                  title !== 'Day Plan Mapping Master List' &&
                  title !== "Asset Group Issue" &&
                  title !== "Asset Group Spare" &&
                  title !== "Payment_request_oh" &&
                  title !== "Budget Master List" &&
                  title !== "Outlet Bank Details" &&
                  title !== "EDC Payment Vs Bank" &&
                  title !== "Rista Sales Data" &&
                  title !== "Payment_request_ah" &&               
                  title !== "Consumable Entry Details" &&
                  title !== "Consumable Report Details" &&
                  title !== "Low Consumable Report"
                   ? (
                    <>
                      <Tooltip
                        placement="bottom"
                        title={"Upload"}
                        onClick={() => {
                          onClickUpdateCsv();
                        }}
                      >
                        <div className="btn btn-primary me-2 px-md-3 px-sm-4">
                          <AiOutlineImport size={20} />
                        </div>
                      </Tooltip>
                      <Tooltip
                        placement="bottom"
                        title={"Download"}
                        onClick={() => {
                          handleDownload();
                        }}
                      >
                        <div className="btn btn-primary me-2 px-md-3 px-sm-4">
                          <AiOutlineDownload size={20} />
                        </div>
                      </Tooltip>
                    </>
                  ) : (
                    <></>
                  )
                ) : (
                  <></>
                )}
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div>
          <div style={{ height: 520, width: "100%" }}>
            <div style={{ display: "flex", height: "100%" }}>
              <div style={{ flexGrow: 1, fontSize: "25px" }}>
                <DataGrid
                  // rowSelection='multiple'
                  density="compact"
                  loading={loading}
                  columns={columns}
                  onSelectionModelChange={(ids) => {
                    //const selectedIDs = new Set(ids);
                    let selectedRowData;

                    if (isEmpty(searchText)) {
                      selectedRowData = data.filter((row) => {
                        return ids[0] == row.id.toString()[0];
                      });
                    } else {
                      selectedRowData = tableData.filter((row) => {
                        return ids[0] == row?.id?.toString()[0];
                      });
                    }
                    if (returnData && typeof returnData === "function") {
                      returnData(selectedRowData);
                    }
                  }}
                  // columns={columns}
                  rows={isEmpty(searchText) ? data : tableData}
                  hideFooterSelectedRowCount
                  components={{
                    Toolbar: CustomToolbar
                  }}
                  componentsProps={{
                    pagination: {
                      ActionsComponent: CustomPagination
                    },
                    panel: {
                      sx: customMobileFilterDesign
                    }
                  }}
                  sx={customHeaderDesign}
                />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Container>
  );
}
