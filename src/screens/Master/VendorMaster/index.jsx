/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router";
import { getVendorMaster } from "../../../@app/service/serviceSlice";

import CustomTable from "../../../components/CustomTable";
import { column } from "./column";

export default function VendorMaster() {
  const navigate = useNavigate();

  const onClickAdd = () => {
    navigate("/VendorMaster/addForm", {
      state: {},
    });
  };

  const {
    gettingVendorMaster,
    getVendorMasterResponse: { data: dataSource },
  } = useSelector((state) => {
    return state.service;
  });

  const handleEditClick = (data) => {
    navigate("/VendorMaster/addForm", {
      state: { data: { ...data, mode: "edit" } },
    });
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getVendorMaster());
  }, [dispatch]);

  const onClickUpdateCsv = (data) => {
    navigate("/VendorMaster/uploadcsv", {
      state: {},
    });
  };

  const handleDownload = () => {
    window.open(
      process.env.REACT_APP_API_BASE_URL + "download-vendor-master",
      "_blank"
    );
  };

  // eslint-disable-next-line no-unused-vars

  return (
    <CustomTable
      handleEditClick={handleEditClick}
      loading={gettingVendorMaster}
      dataSource={dataSource}
      column={column}
      onClickAdd={onClickAdd}
      handleDownload={handleDownload}
      title={"Vendor Master"}
      onClickUpdateCsv={onClickUpdateCsv}
    />
  );
}
