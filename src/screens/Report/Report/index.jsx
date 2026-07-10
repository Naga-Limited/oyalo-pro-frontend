// import { differenceInDays, format } from "date-fns";
// import { flatten } from "ramda";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { getApprovalReport } from "../../../@app/entry/entrySlice";
import CustomTable from "../../../components/CustomTable";
import { column } from "./column";
import { getUserReportData } from "../../../@app/master/masterSlice";
import { format } from "date-fns";
export default function Report({ setTopTitle }) {
  setTopTitle("Report");

  const {
    gettingUserReport,
    getUserReporResponse: { data: dataSource = [] },
  } = useSelector((state) => {
    return state.master;
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
    // console.log(login, "login");
    // console.log(newLogin, "newLogin");

    // const stateValue = (state ?? []).map((e) => e.name);
    // const subzoneValue = (subzone ?? []).map((e) => e.name);
    // const outletValue = (outlet ?? []).map((e) => e.name);
    // const moduleValue = (module ?? []).map((e) => e.name);
    // const modulescreenValue = (module_Screen ?? []).map((e) => e.name);
    // const reportValue = (report ?? []).map((e) => e.name);
    // const zoneValue = (zone ?? []).map((e) => e.name);
    // const submoduleValue = (submodule ?? []).map((e) => e.name);
    // const roleValue = (role ?? []).map((e) => e.name);
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
  //   const gridData = flatten(dataSource ?? []).map((e) => {
  //     const agingDays = `${
  //       differenceInDays(
  //         new Date(),
  //         new Date(e?.created_ate?.created_at ?? new Date())
  //       ) ?? 0
  //     } day(s)`;
  //     // const auditType = e?.audit_type === "1" ? "Full Audit" : "Category Wise";
  //     const Status = "Reported";
  //     return {
  //       ...e,
  //       employee_code,
  //       name,
  //       division_name,
  //       agentName: "Admin",
  //       created_at: format(new Date(e?.created_at ?? new Date()), "dd/MM/yyyy"),
  //     };
  //   });

  useEffect(() => {
    dispatch(getUserReportData());
  }, []);

  return (
    <>
      <CustomTable
        loading={gettingUserReport}
        dataSource={gritData}
        column={column}
        title={"User Report"}
      />
    </>
  );
}
