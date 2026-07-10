// import { differenceInDays, format } from "date-fns";
// import { flatten } from "ramda";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { getApprovalReport } from "../../../@app/entry/entrySlice";
import CustomTable from "../../../components/CustomTable";
import { column } from "./column";
import { getModuleUpdateLogs } from "../../../@app/subMaster/subMasterSlice";
import { format } from "date-fns";
export default function Report({ setTopTitle }) {
  setTopTitle("Log Report");

  const {
    gettingModuleUpdateLogs,
    getModuleUpdateLogsResponse: { data: dataSource = [] },
  } = useSelector((state) => {
    return state.subMaster;
  });
  //const { userData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  //const empId = userData.data?.id;

  const gritData = (dataSource ?? []).map((e) => {
    const {
      employee_code,
      name,
      division_name,
      location,
      email,
      contact,
      status,
      logindatetime,
      loginstatus,
      login,

      ...rest
    } = e;

    let newLogin = login ? login?.slice(-1)[0]?.indatetime : "";
   
    return {
      ...rest,
      employee_code: employee_code,
      name: name,
      division_name: division_name,
      location: location,
      email: email,
      contact: contact,
      Status: status ? "Active" : "In-Active",
      created_at: logindatetime
        ? format(new Date(logindatetime), "dd/MM/yyyy")
        : "",
      logindate: newLogin,
      loginstatus: loginstatus,
    };
  });
  
  useEffect(() => {
    dispatch(getModuleUpdateLogs());
  }, []);

  return (
    <>
      <CustomTable
        loading={gettingModuleUpdateLogs}
        dataSource={gritData}
        column={column}
        title={"User Report"}
      />
    </>
  );
}
