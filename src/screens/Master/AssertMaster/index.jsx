import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getAssetMaster } from "../../../@app/service/serviceSlice";
import CustomTable from "../../../components/CustomTable";
import { column } from "./column";
import { filter, head } from "ramda";

export default function AssetMaster() {
  const navigate = useNavigate();

  const onClickAdd = () => {
    navigate("/outletAssetGroupMapping/addForm", {
      state: {},
    });
  };
  const onClickUpdate = () => {
    navigate("/outletAssetGroupMapping/updateForm", {
      state: {},
    });
  };

  const {
    gettingAssetMaster,
    getAssetMasterResponse: { data: dataSource },
  } = useSelector((state) => {
    return state.service;
  });

  const gridData = (dataSource ?? []).map((data) => {
    const { spares_list, ...restOfData } = data;
    const x = (spares_list ?? [])?.map((n) => {
      return " " + n.spare + " , " + n.spare_warranty_end_date + " ";
    });
    return { spares_list: x, ...restOfData };
  });

  const handleEditClick = (data) => {
    const editingData = filter(
      (e) => e?.asset_group_id === data?.asset_group_id,
      dataSource ?? []
    );
    const { spares_list } = head(editingData);
    const processedSpareList = (spares_list ?? [])?.map((e) => {
      return {
        spare: e.spare,
        spare_warranty_end_date: e.spare_warranty_end_date,
      };
    });
    navigate("/outletAssetGroupMapping/addForm", {
      state: { data: { ...data, spares_list: processedSpareList } },
    });
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAssetMaster());
  }, [dispatch]);

  return (
    <CustomTable
      handleEditClick={handleEditClick}
      loading={gettingAssetMaster}
      dataSource={gridData}
      column={column}
      onClickAdd={onClickAdd}
      onClickUpdate={onClickUpdate}
      title={"Outltet_Asset_Master"}
    />
  );
}
