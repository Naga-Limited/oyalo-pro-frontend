import { differenceInDays, format } from "date-fns";
import { flatten } from "ramda";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApprovalReport } from "../../../@app/entry/entrySlice";
import CustomTable from "../../../components/CustomTable";
import { notification } from "antd";
import { column } from "./column";

export default function AuditReport({ setTopTitle }) {
  setTopTitle("Rank");
  const {
    gettingApprovalReport,
    getApprovalReport: { data: dataSource },
  } = useSelector((state) => state.entry);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [api] = notification.useNotification();
  //const { userData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  //const empId = userData.data?.id;

  const gridData = flatten(dataSource ?? []).map((e) => {
    const agingDays = `${
      differenceInDays(
        new Date(),
        new Date(e?.created_ate?.created_at ?? new Date())
      ) ?? 0
    } day(s)`;
    const auditType = e?.audit_type === "1" ? "Full Audit" : "Category Wise";
    const Status = "Reported";
    return {
      ...e,
      auditType,
      agingDays,
      Status,
      agentName: e?.agent_name ? e?.agent_name : "Admin",
      created_at: format(new Date(e?.created_at ?? new Date()), "dd/MM/yyyy"),
    };
  });

  const handleSubmit = () => {
    if (month && year) {
      dispatch(
        getApprovalReport({
          path: "ranks",
          data: { year: parseInt(year), month: parseInt(month) },
        })
      );
    } else {
      api.open({
        message: "Please choose Year and Month",
        type: "error",
      });
    }
  };

  useEffect(() => {
    dispatch(
      getApprovalReport({
        path: "ranks",
        data: {
          year: new Date().getFullYear(),
          month: parseInt(new Date().getMonth()) + 1,
        },
      })
    );
  }, []);

  return (
    <CustomTable
      loading={gettingApprovalReport}
      dataSource={gridData}
      column={column}
      title={"User Rank"}
      year={year}
      setYear={setYear}
      month={month}
      setMonth={setMonth}
      handleSubmit={handleSubmit}
    />
  );
}
