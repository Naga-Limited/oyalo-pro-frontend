/* eslint-disable no-unused-vars */
import axios from "axios";
import * as XLSX from "xlsx";

import React, { useEffect, useState } from "react";
import {
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Input,
  Card,
  Select,
  Button,
  Radio,
  Col,
  Row,
  Form,
  Space,
  DatePicker,
  Upload,
} from "antd";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { transStatus } from "../../../util/transStatus";
import {
  addAuditSubCategory,
  getAuditCategory,
  getOutletMaster,
  updateAuditSubCategory,
} from "../../../@app/master/masterSlice";
import { map } from "ramda";
import {
  getAssetGroup,
  getAssetMaster,
  saveAssetMaster,
  saveNewAssetMaster,
  updateAssetMaster,
  updateNewAssetMaster,
  uploadCsvFile,
  saveUploadNewAssetMaster,
} from "../../../@app/service/serviceSlice";
import dayjs from "dayjs";
import ConfirmOnExit from "../../../components/confirmOnExit/ConfirmOnExit";
import messageToast from "../../../components/messageToast/messageToast";

const { Option } = Select;

function NewAssetMasterUpdateFormCsv() {
  const {
    state: { data: defaultValue = {}, isEdit = false },
  } = useLocation();

  const [status, setStatus] = useState(defaultValue?.status ?? 1);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [array, setArray] = useState({});

  const [form] = Form.useForm();

  const [showDialog, setShowDialog] = useState(false);
  const [selectedOutlet, setSelectedOutlet] = useState();

  const [data, setData] = useState({});

  const {
    gettingAssetGroup,
    savingAssetMaster,
    getAssetGroupResponse: { data: assetGroups },
  } = useSelector((state) => {
    return state.service;
  });

  const {
    getOutletMasterResponse: { data: outletData },
  } = useSelector((state) => {
    return state.master;
  });

  const outletList = outletData?.map((o) => ({
    ...o,
    outlet_code: `${o?.outlet_code} - ${o?.name}`,
  }));

  useEffect(() => {
    dispatch(getAssetGroup());
    dispatch(getOutletMaster());
  }, [dispatch]);

  const handleClickBack = () => {
    navigate("/assetMaster");
  };
  const dateFormat = ["DD/MM/YYYY", "DD/MM/YY"];
  const onFinish = () => {
    try {
      let i = 0;
      let payload = [];
      // let innerdata
      // let payload = {
      // assets: data?.map((_) => ({
      //   company_code: data.company_code,
      //   plant_code: data.plant_code,
      //   outlet_code: outletCode,
      //   asset_warranty_end_date,
      //   spares_list,
      //   asset_group: data?.asset_group,
      //   ..._,
      // })),
     
      data?.map((e) => {
        let innerdata = {};
        if (i != 0) {
          if (e && e.length > 0) {
              innerdata = {
              company_name: e[1],
              Plant_code: e[2],
              Asset_Group: e[3],
              Asset_No_in_SAP: e[4],
              Asset_Name_in_SAP: e[5],
              Status: e[6],
            };
            //console.log(innerdata, "innerdata");
            payload.push(innerdata);
          }
        }
        i++;
      });
      // console.log(payload, "payload");

      dispatch(saveUploadNewAssetMaster({ data: payload })).then(
        ({ message, status, statusText }) => {
          if (status === 200) {
            navigate("/assetMaster");
            messageToast({
              message: message ?? statusText,
              status,
              title: "Asset group Master",
            });
          } else {
            messageToast({
              message:
                message || statusText
                  ? message ?? statusText
                  : "something went wrong",
              status: 400,
              title: "Asset group Master Upload",
            });
          }
        }
      );
      //let payload = {
      // assets: data?.map((_) => ({
      //   company_code: data.company_code,
      //   plant_code: data.plant_code,
      //   outlet_code: outletCode,
      //   asset_warranty_end_date,
      //   spares_list,
      //   asset_group: data?.asset_group,
      //   ..._,
      // })),
      //};
    } catch (err) {
      messageToast({
        message: "something went wrong",
        status: 400,
        title: "Asset group Master Upload",
      });
    }
    // if (data?.asset_file) {
    //   fileReader.onload = function (event) {
    //     const text = data?.asset_file;
    //     /// csvFileToArray(text);
    //   };
    //   fileReader.readAsText(data?.asset_file);
    // }
    // setShowDialog(false);
    // console.log(data, ":data");
    // const outletCode = defaultValue?.id
    //   ? defaultValue.outlet_code
    //   : (outletData ?? []).find(
    //       (outletData) => outletData?.id === selectedOutlet
    //     )?.outlet_code;
    // const asset_warranty_end_date =
    //   data["asset_warranty_end_date"]?.format("YYYY-MM-DD");
    // const spares_list = (data.spares_list ?? []).map((spares_list) => {
    //   return {
    //     ...spares_list,
    //     spare_warranty_end_date:
    //       spares_list.spare_warranty_end_date?.format("YYYY-MM-DD"),
    //   };
    // });
    // let payload = {
    //   assets: data.assets?.map((_) => ({
    //     company_code: data.company_code,
    //     plant_code: data.plant_code,
    //     outlet_code: outletCode,
    //     asset_warranty_end_date,
    //     spares_list,
    //     asset_group: data?.asset_group,
    //     ..._,
    //   })),
    // };
    // dispatch(
    //   defaultValue?.id
    //     ? updateNewAssetMaster({
    //         data: {
    //           ...payload,
    //           id: defaultValue.id,
    //         },
    //       })
    //     : saveNewAssetMaster({
    //         data: payload,
    //       })
    // ).then(({ message, status, statusText }) => {
    //   if (status === 200) {
    //     form.resetFields();
    //     navigate("/assetMaster");
    //     messageToast({
    //       message: message ?? statusText,
    //       status,
    //       title: "Asset group Master",
    //     });
    //   } else {
    //     messageToast({ message: message, status, title: "Asset Group Master" });
    //   }
    // });
  };

  // const csvFileToArray = (string) => {
  //   const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
  //   const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

  //   const array = csvRows.map((i) => {
  //     const values = i.split(",");
  //     const obj = csvHeader.reduce((object, header, index) => {
  //       object[header] = values[index];
  //       return object;
  //     }, {});
  //     return obj;
  //   });

  //   setArray(array);
  // };

  ///const headerKeys = Object.keys(Object.assign({}, ...array));

  return (
    <>
      <Card>
        <ConfirmOnExit showModel={showDialog} />
        <Row style={{ justifyContent: "center" }}>
          <Col span={24}>
            <Form
              name="basic"
              onFieldsChange={() => setShowDialog(true)}
              labelCol={{ span: 24 }}
              form={form}
              disabled={savingAssetMaster}
              wrapperCol={{ span: 24 }}
              onFinish={onFinish}
              autoComplete="off">
              <Row gutter={[25, 0]}>
                <Col md={{ span: 4 }} xs={{ span: 16 }}>
                  <Upload
                    beforeUpload={() => false}
                    // accept=".xlsx, .xls"
                    name="logo"
                    multiple=""
                    showUploadList={{ showPreviewIcon: false }}
                    //action="https://mobile.wowschoolbell.in/api/upload-new-asset-master"
                    onChange={async (filesData) => {
                      let fileList = [];

                      try {
                        var file = filesData?.file;

                        const data = await file.arrayBuffer();
                        const workbook = XLSX.read(data);
                        const worksheet =
                          workbook.Sheets[workbook.SheetNames[0]];
                        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
                          header: 1,
                        });
                        setData(jsonData);
                        return false;
                      } catch (err) {
                        // console.log(err, "err");
                      }
                      // reader.onload = function (e) {
                      //   var data = filesData?.file?.originFileObj;
                      //   let readedData = XLSX.read(data, { type: "binary" });
                      //   const wsname = readedData.SheetNames[0];
                      //   const ws = readedData.Sheets[wsname];

                      //   /* Convert array to json*/
                      //   const dataParse = XLSX.utils.sheet_to_json(ws, {
                      //     header: 1,
                      //   });

                      //   console.log("dataParse");
                      //   //setFileUploaded(dataParse);
                      // };
                      //reader.readAsBinaryString(filesData?.file?.originFileObj);
                      //foreach files in filelist from antd upload
                      // filesData.fileList.forEach((file) => {
                      //   fileList.push(file.originFileObj); //pushing File object
                      //});
                      //console.log(fileList, "fileList");
                      //setArray(filesData);

                      //set value to formik
                      //setFieldValue("design_images", fileList);
                    }}
                    listType="xlsx"
                    maxCount={1}
                    withCredentials //this is what limits the number of files uploaded
                  >
                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                  </Upload>
                </Col>
                {/* <Form.Item
                    name="asset_file"
                    label="Asset file"
                    rules={[
                      // {
                      //   pattern: /^[a-zA-Z0-9' '  ]*$/,
                      //   message: "Invalid value",
                      // },
                      { required: true, message: "Please enter CSV File " },
                    ]}
                    disabled={savingAssetMaster}>
                    <Input
                      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                      type="file"
                      name="asset_file"
                      placeholder="Asset No in SAP"
                    />
                  </Form.Item>
                </Col> */}

                <Col span={24}>
                  <Row gutter={[15, 15]} style={{ justifyContent: "end" }}>
                    <Col
                      span={12}
                      className="d-flex justify-content-end align-items-center">
                      <Form.Item className="mx-2">
                        <Button
                          className="orangeFactory"
                          type="primary"
                          htmlType="submit"
                          loading={savingAssetMaster}
                          disabled={savingAssetMaster}>
                          {isEdit ? "Update" : "Add"}
                        </Button>
                      </Form.Item>

                      <Form.Item>
                        <Button
                          disabled={savingAssetMaster}
                          onClick={handleClickBack}>
                          Back
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Card>
    </>
  );
}

export default NewAssetMasterUpdateFormCsv;
