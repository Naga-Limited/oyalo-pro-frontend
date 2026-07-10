import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getEBReadingEditEntry } from "../../../@app/subMaster/subMasterSlice";
import CustomTable from "../../../components/CustomTable";
import { column } from "./column";

export default function EBReadingEdit({ setTopTitle })
{
  setTopTitle("EB Reading Edit Entry List");
  const { type, userData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    getEBReadingEditEntryResponse: { data: dataSource },
    gettingEBReadingEditEntry
  } = useSelector((state) => state.subMaster);

  const gridData = (dataSource ?? []).map((e) => {
    return {
      ...e
    };
  });


  const handleEditClick = async (data) => {   
      navigate("/ebReadingEdit/editForm", {
            state: { data, ...data }
        });   
  };

  useEffect(() => {
    if (type === 1)
      dispatch(getEBReadingEditEntry({ path: "get-EBReading-EditEntry", data: {} }));
    else
      dispatch(
        getEBReadingEditEntry({
          path: "get-EBReading-EditEntry",
          data: { employee: userData.data?.id }
        })
      );
  }, []);

  return (
    <>
      <CustomTable
        loading={gettingEBReadingEditEntry}
        dataSource={gridData}      
        handleEditClick={handleEditClick}
        column={column}
        title={"EB Reading Entry List"}
      />
      ;
    </>
  );
}
