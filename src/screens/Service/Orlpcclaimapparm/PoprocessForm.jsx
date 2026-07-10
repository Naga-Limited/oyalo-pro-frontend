/* eslint-disable no-unused-vars */
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Input,
  Card,
  DatePicker,
  Button,
  Col,
  Row,
  Form,
  Radio,
  Select,
  Image,
  Modal,
} from "antd";
import {
  saveOutletMaster,
  getStates,
  getSubZonal,
  getZonal,
  updateOutletMaster,
  getCity,
} from "../../../@app/master/masterSlice";
// import {map} from 'ramda';
import { useLocation, useNavigate } from "react-router";
import CustomTable from "../../../components/CustomTable";
import favicon from "../../../asset/favicon.ico";

// import dayjs from 'dayjs';
import messageToast from "../../../components/messageToast/messageToast";
import { transStatus } from "../../../util/transStatus";
import apis from "../../../api/stateAPI";
import { useCallbackPrompt } from "../../../customHooks/useCallbackPrompt";
// import { Input } from 'antd';
// import {CREATE_TICKET_FORM_DATA} from './createTicket.constants';
const { TextArea } = Input;

const { Option } = Select;

function OrlpcclaimapparmForm() {
  //console.log(state, "state");
  const { state } = useLocation();

  const [reason, setReason] = useState("");

  const [showModel, setShowModel] = useState(false);

  // const [showPrompt, confirmNavigation, cancelNavigation] =
  //   useCallbackPrompt(showModel);

  const cancelNavigation = () => {
    setShowModel(false);
  };
  const confirmNavigation = () => {
    navigate("/orlpcclaimapparm");
  };

  const dateToYMD = (date) => {
    var strArray = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var d = date.getDate();
    var m = strArray[date.getMonth()];
    var y = date.getFullYear();
    return "" + (d <= 9 ? "0" + d : d) + "-" + m + "-" + y;
  };
  let url = process.env.REACT_APP_API_BASE_URL;
  url = url.replace("api/", "");
  const data =
    state?.expense_data?.length > 0
      ? (state?.expense_data ?? []).map((e) => {
          let unixtime = new Date(e.expense_date);

          var time = dateToYMD(unixtime);

          let S_No = e.id;
          let Expense_Date = time;
          let Expense_Type = e.expense_type;
          let Request_Amount = e?.amount;
          let Reason = e?.remark;
          let select = '<input type="checkbox" name="vehicle1" value="Bike">';
          let bill_copy = "";
          if (e?.bill_copy) {
            var array = JSON.parse(e?.bill_copy);
            if (array?.length > 0) {
              array.forEach(function (item, index) {

                let imgeURl =
                  url + `public/storage/app/public/tickets/` + item?.toString();
                bill_copy +=
                  imgeURl
                ;
              }
              );
            }
          }
          let Bill_Copy = bill_copy ? bill_copy : "-";
          return {
            ...e,
            S_No,
            Expense_Date,
            Expense_Type,
            Request_Amount,
            Reason,
            Bill_Copy,
            select,
          };
        })
      : [];


  const navigate = useNavigate();

  const onClickAdd = () => {
    navigate("/orlpcclaimapparmForm");
  };

  const handleViewClick = (rowInfo) => {
    navigate("/orlpcclaimapparmForm", {
      state: rowInfo,
    });
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
  const SelectedAll = () => {
    if (state && state.expense_data) {
        updateSelected([...state.expense_data.map((_) => _.id)]);
    }
};
  const handleApprovel = () => {
    let data = {
      id: state?.id,
      status:
        state?.ticketstatus == "Waiting @ Back Office"
          ? "Waiting @ AH Approval"
          : "Waiting @ Back Office",
    };

    apis.updatePettyCashRequestData(data).then((res) => {
      if (res.data?.status === 200) {

        // setInHand(res.data.balance_amount);
        // setYetConfirm(res.data.yet_confirm);
        // setReceiptConfirm(res.data.receipt_confirm);
        // dispatch(getPaymentRequest());
        messageToast({
          message: res?.data?.statusText,
          status: res?.data?.status,
          title: "Payment Request",
        });
        if (state?.ticketstatus == "Waiting @ Back Office") {
          navigate("/orlpcclaimappbo");
        } else {
          navigate("/orlpcclaimapparm");
        }
      } else {
        // messageToast({
        //   message: res?.data?.message ?? "Something went wrong",
        //   status: res?.data.status,
        //   title: "Payment Request",
        // });
      }
    });
  };
  const handleReject = () => {
       if (reason) {
      let data = {
        id: state?.id,
        status:
          state?.ticketstatus == "Waiting @ Back Office"
            ? "Waiting @ ARM"
            : "rejected",
        rejected_reason: reason,
        rejected_by:
          state?.ticketstatus == "Waiting @ Back Office"
            ? "Back Office"
            : "ARM",
      };

      apis.updatePettyCashRequestData(data).then((res) => {
        if (res.data?.status === 200) {
           messageToast({
            message: res?.data?.statusText,
            status: res?.data?.status,
            title: "Payment Request",
          });
          if (state?.ticketstatus == "Waiting @ Back Office") {
            navigate("/orlpcclaimappbo");
          } else {
            navigate("/orlpcclaimapparm");
          }
          // setInHand(res.data.balance_amount);
          // setYetConfirm(res.data.yet_confirm);
          // setReceiptConfirm(res.data.receipt_confirm);
          // dispatch(getPaymentRequest());
          // messageToast({
          //   message: res?.data?.statusText,
          //   status: res?.data?.status,
          //   title: "Payment Request",
          // });
        } else {
          // messageToast({
          //   message: res?.data?.message ?? "Something went wrong",
          //   status: res?.data.status,
          //   title: "Payment Request",
          // });
        }
      });
    } else {
      messageToast({
        message: "Please Enter the Reason",
        status: 400,
        title: "Payment Request",
      });
    }
  };

  const handleOnChange = () => {
    // eslint-disable-next-line no-console

  };

  const onFinish = (values) => {
    let data = {
      zone: values.zone,
      subZone: values.subZone,
      outlet: values.outlet,
      serviceFor: values.serviceFor,
      assetGroup: values.assetGroup,
      ticketStatus: values.ticketStatus,
      waitingAt: values.waitingAt,
      assignedTo: values.assignedTo,
      fromDate: values["fromDate"]?.format("YYYY-MM-DD"),
      toDate: values["toDate"]?.format("YYYY-MM-DD"),
    };
  };

  const {
    gettingOutletMaster,
    getOutletMasterResponse: { data: dataSource },
  } = useSelector((state) => {
    return state.master;
  });

  const onSelectChange = () => {
    // eslint-disable-next-line no-console

  };

  const dateFormat = ["DD/MM/YYYY", "DD/MM/YY"];

  //   useEffect( () => {
  //     dispatch( getOutletMaster() );
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [] );
  let column = [
    { key: "1", headerName: "S.No", field: "S.No", hide: false, width: 70 },
    {
      key: "2",
      headerName: "Expense Date",
      field: "Expense_Date",
      hide: false,
      width: 300,
    },
    {
      key: "3",
      headerName: "Expense Type",
      field: "Expense_Type",
      hide: false,
      width: 180,
    },
    {
      key: "4",
      headerName: "Reason",
      field: "Reason",
      hide: false,
      width: 250,
    },
    {
      key: "5",
      headerName: "Request Amount",
      field: "Request_Amount",
      hide: false,
      width: 200,
    },
    {
      key: "6",
      headerName: "Bill Copy",
      field: "Bill_Copy",
      hide: false,
      width: 180,
      renderCell: (params) => {
         return <>
           <Image
           style={{ paddingLeft: "10px" }}
           width={50}
           src={params.value} />
      </>
      },
    },
   ];
  return (
    <>
      <div className="h-screen apphide lasthide">
        <Card>
          <Row>
            <Col span={24}>
              <Form
                name="basic"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                onValuesChange={onSelectChange}
                onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                autoComplete="off"
                // form={form}
              >
                <Row gutter={[15, 0]}>
                </Row>
              </Form>
            </Col>
          </Row>
        </Card>
        <CustomTable
          showHeader={false}
          showEdit={false}
          dataSource={data}
          column={column}
          hideActionBtn={true}
          handleViewClick={handleViewClick}
          onClickAdd={onClickAdd}
          title={"Approval List"}
        />
        {state?.ticketstatus != "Waiting @ AH Approval" && (
          <Col
            span={12}
            style={{ textAlign: "center" }}
            className="d-flex align-items-center justify-content-end mt-3">
            <Form.Item className="mx-2">
              <Button
                className="orangeFactory"
                type="primary"
                htmlType="submit"
                onClick={() => {
                  handleApprovel();
                }}>
                Approved
              </Button>
            </Form.Item>
            {/* </Col>
                    <Col span={12}> */}
            <Form.Item>
              <Button
                onClick={() => {
                  setShowModel(true);
                }}>
                Reject
              </Button>
            </Form.Item>
          </Col>
        )}
      </div>

      <Modal
        open={showModel}
        width="40%"
        onOk={handleReject}
        okButtonProps={{ danger: "danger" }}
        onCancel={cancelNavigation}
        title={<span className="text-2xl text-red-600">Reject Reason?</span>}>
        <div className="text-lg text-gray-600">
          <input
            className="col-md-6"
            type="text"
            value={reason}
            onChange={(e) => {
              setReason(e?.target?.value);
            }}
            placeholder="reason"
          />
          {/* <button
            htmlType="submit"
            type="primary"
            onClick={() => {
              handleReject();
            }}></button> */}
        </div>
      </Modal>
    </>
  );
}

export default memo(OrlpcclaimapparmForm);
