import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getDayPlanMapping } from "../../../@app/subMaster/subMasterSlice";
import CustomTable from "../../../components/CustomTable";
import { column } from "./column";

export default function dayPlanMappingMaster({ setTopTitle }) {

  useEffect(() => {
    setTopTitle("Day Plan Mapping Master List");
  }, [setTopTitle]);
  const { type, userData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    getdayPlanMappingResponse: { data: dataSource },
    gettingdayPlanMapping
  } = useSelector((state) => state.subMaster);
  const empId = userData.data?.id;
 
 
  const isSixDigits = (customerId) => /^\d{6}$/.test(customerId);
  const getRowStyle = (params) => {
    if (isSixDigits(params.data.customer_id)) {
      return { backgroundColor: "green" };
    }
    return null;
  };

  const onClickAdd = () => {
    navigate('/dayPlanMappingMaster/addForm', {
      state: {}
    });
  };

  const handleEditClick = (data) => {
    navigate('/dayPlanMappingMaster/View', {
     state: {...data, edit: true}
   });
 };

  const gridData = (dataSource ?? []).map((e) => {
    return {
      ...e
    };
  });

  useEffect(() => {
    if (type === 1)
      dispatch(
        getDayPlanMapping({ path: "get-DayPlan-mapping", data: {} })
      );
    else
      dispatch(
        getDayPlanMapping({
          path: "get-DayPlan-mapping",
          data: { employee: empId }
        })
      );
  }, []);

  return (
    <>           
      <CustomTable
        loading={gettingdayPlanMapping}
        dataSource={gridData}
        handleEditClick={handleEditClick}
        onClickAdd={onClickAdd}
        column={column}
        getRowStyle={getRowStyle}
        title={"Day Plan Mapping Master List"}
      />
      ;
    </>
  );
}
