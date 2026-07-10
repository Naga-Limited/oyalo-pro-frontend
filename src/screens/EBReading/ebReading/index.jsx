import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getEBReadingEntry } from "../../../@app/subMaster/subMasterSlice";
import CustomTable from "../../../components/CustomTable";
import { message } from "antd";
import { column } from "./column";


export default function EBReading({ setTopTitle }) {
  setTopTitle("EB Reading Entry List");
  const { type, userData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const {
    getEBReadingEntryResponse: { data: dataSource },
    gettingEBReadingEntry
  } = useSelector((state) => state.subMaster);

  const gridData = (dataSource ?? []).map((e) => {
    return {
      ...e
    };
  });

  const uniqueDates = new Set(gridData.map((item) => item.created_at));
  const uniqueDatesArray = [...uniqueDates].sort(
    (a, b) => new Date(a) - new Date(b)
  );

  function getStatusByDate( date) {  
    const item = gridData.find((item) =>  item.created_at === date);   
    return item ? item.Status : undefined;
  }

  function getPreviousDate(uniqueDatesArray, targetDate) {
    for (let i = 0; i < uniqueDatesArray.length; i++) {
      if (uniqueDatesArray[i] === targetDate) {
        if (i > 0) {
          return uniqueDatesArray[i - 1];
        }
      }
    }
    return null; 
  }

  const handleEditClick = async (data) => {
    data.chkdate = data.created_at;   
    const previousDate = getPreviousDate(uniqueDatesArray, data.chkdate);
    const status = getStatusByDate(previousDate);  
    if (previousDate ) {     
      if(status != 7)
          messageApi.open({
            type: "warning",
            content: "Please do entry for the previous day",
            className: "custom-class",
            style: {
              marginTop: "28vh",
              color: "#d91616",
              fontWeight: "bold"
            }
          });      
    } else {
      navigate("/ebReading/addForm", {
        state: { data, ...data }
      });
      return;
    }
  };

  useEffect(() => {
    if (type === 1)
      dispatch(getEBReadingEntry({ path: "get-EBReadingEntry", data: {} }));
    else
      dispatch(
        getEBReadingEntry({
          path: "get-EBReadingEntry",
          data: { employee: userData.data?.id }
        })
      );
  }, []);

  return (
    <>
      {contextHolder}
      <CustomTable
        loading={gettingEBReadingEntry}
        dataSource={gridData}
        handleEditClick={handleEditClick}
        column={column}
        title={"EB Reading Entry List"}
      />
      ;
    </>
  );
}
