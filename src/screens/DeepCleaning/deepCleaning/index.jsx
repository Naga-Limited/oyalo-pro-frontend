import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useNavigate
} from "react-router";
import { getDeepCleaning } from "../../../@app/subMaster/subMasterSlice";
import CustomTable from "../../../components/CustomTable";
import { column } from "./column";

export default function DeepCleaning({ setTopTitle }) {
  setTopTitle("Opening and Closing Check List");

  const { type, userData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    getDeepCleaningResponse: { data: dataSource },
    gettingDeepCleaning
  } = useSelector((state) => state.subMaster);

  const gridData = (dataSource ?? []).map((e) => {
    return {
      ...e
    };
  });

  const handleEditClick = async (data) => {
      navigate("/deepCleaning/addForm", {
            state: { data, ...data }
        });   
};

  useEffect(() => {
    if (type === 1)
      dispatch(getDeepCleaning({ path: "get-deep-cleaning", data: {} }));
    else
      dispatch(
        getDeepCleaning({
          path: "get-deep-cleaning",
          data: { employee: userData.data?.id }
        })
      );
  }, []);

  return (
    <>
      <CustomTable
        loading={gettingDeepCleaning}
        dataSource={gridData}
        handleEditClick={handleEditClick}
        column={column}
        title={"Deep Cleaning List"}
      />
      ;
    </>
  );
}
