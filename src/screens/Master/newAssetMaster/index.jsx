/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  getNewAssetMaster,
  getNewAssetMasterDownload,
} from "../../../@app/service/serviceSlice";
import CustomTable from "../../../components/CustomTable";
import { column } from "./column";

export default function NewAssetMaster() {
  const navigate = useNavigate();

  const onClickAdd = () => {
    navigate("/assetMaster/addForm", {
      state: {},
    });
  };

  const {
    gettingNewAssetMaster,
    getNewAssetMasterResponse: { data: dataSource },
  } = useSelector((state) => {
    return state.service;
  });

  const handleEditClick = (data) => {
    navigate("/assetMaster/addForm", {
      state: { data: { ...data }, isEdit: true },
    });
  };

  const onClickUpdate = () => {
    navigate("/assetMaster/updateForm", {
      state: {},
    });
  };
  const onClickUpdateCsv = () => {
    navigate("/assetMaster/csvUpdate", {
      state: {},
    });
  };

  const handleDownload = () => {
    window.open(
      process.env.REACT_APP_API_BASE_URL + "download-new-asset-master",
      "_blank"
    );
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNewAssetMaster());
  }, [dispatch]);

  return (
    <CustomTable
      handleEditClick={handleEditClick}
      handleDownload={handleDownload}
      onClickUpdateCsv={onClickUpdateCsv}
      loading={gettingNewAssetMaster}
      dataSource={dataSource}
      column={column}
      onClickAdd={onClickAdd}
      onClickUpdate={onClickUpdate}
      title={"Asset Master"}
    />
  );
}
