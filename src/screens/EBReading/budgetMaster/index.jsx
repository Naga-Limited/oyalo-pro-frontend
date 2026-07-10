import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useNavigate
} from "react-router";
import { getBudgetMaster } from "../../../@app/subMaster/subMasterSlice";
import CustomTable from "../../../components/CustomTable";
import { column } from "./column";

export default function EBReading({ setTopTitle }) {
  setTopTitle("Budget Master List");

  const { type, userData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    getBudgetMasterResponse: { data: dataSource },
    gettingBudgetMaster
  } = useSelector((state) => state.subMaster);

  const gridData = (dataSource ?? []).map((e) => {
    return {
      ...e
    };
  });

  const onClickAdd = () => {
    navigate('/budgetMaster/addForm', {
      state: {}
    });
  };
  const handleEditClick = async (data) => {
      navigate("/budgetMaster/editForm", {
            state: { data, ...data }
        });   
};

  useEffect(() => {
    if (type === 1)
      dispatch(getBudgetMaster({ path: "get-BudgetMaster", data: {} }));
    else
      dispatch(
        getBudgetMaster({
          path: "get-BudgetMaster",
          data: { employee: userData.data?.id }
        })
      );
  }, []);

  return (
    <>
      <CustomTable
        loading={gettingBudgetMaster}
        dataSource={gridData}
        onClickAdd={onClickAdd} 
        handleEditClick={handleEditClick}
        column={column}
        title={"Budget Master List"}
      />
      ;
    </>
  );
}
