import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate,
  //useLocation
 } from "react-router";
import { getEquipmentMaster } from "../../../@app/subMaster/subMasterSlice";
import CustomTable from "../../../components/CustomTable";
import { column } from "./column";

export default function equipmentMasterForm({ setTopTitle }) {
  setTopTitle("Check List Master");
 
  // const { state } = useLocation();
  const { type, userData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    getEquipmentMasterResponse: { data: dataSource },
    gettingEquipmentMaster
  } = useSelector((state) => state.subMaster);

  const empId = userData.data?.id;

  const handleEditClick = (data) => {
     navigate('/equipmentMaster/view', {
      state: {...data, edit: true}
    });
  };

  const gridData = (dataSource ?? []).map((e) => {
    return {
      ...e
    };
  });

 
  const onClickAdd = () => {
    navigate('/equipmentMaster/addForm', {
      state: {}
    });
  };

  useEffect(() => {
    if (type === 1)
      dispatch(
        getEquipmentMaster({ path: "get-EquipmentMaster", data: {} })
      );
    else
      dispatch(
        getEquipmentMaster({
          path: "get-EquipmentMaster",
          data: { employee: empId }
        })
      );
  }, []);

  return (
    <>
      <CustomTable
       loading={gettingEquipmentMaster}
        dataSource={gridData}
        handleEditClick={handleEditClick}
        onClickAdd={onClickAdd}
        column={column}
        title={"Equipment Master List"}
      />
      ;
    </>
  );
}
