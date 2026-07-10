/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  getEmailMapping,
  getEmployeeMapping,
} from "../../../@app/master/masterSlice";
import CustomTable from "../../../components/CustomTable";
import { column } from "./column";

export default function EmailMapping({ setTopTitle }) {
  setTopTitle("Email Mapping");
  const navigate = useNavigate();

  const {
    gettingEmailMapping,
    getEmailMappingResponse: { data: dataSource = [] },
  } = useSelector((state) => {
    return state.master;
  });

  const dispatch = useDispatch();

  const gritData = (dataSource ?? []).map((e) => {
    const {
      state,
      zone,
      role,
      subzone,
      outlet,
      module,
      submodule,
      module_Screen,
      report,
      ...rest
    } = e;
    const employee_name = e?.employee_name?.name;
    const stateValue = (state ?? []).map((e) => e.name);
    const subzoneValue = (subzone ?? []).map((e) => e.name);
    const outletValue = (outlet ?? []).map((e) => e.name);
    const moduleValue = (module ?? []).map((e) => e.name);
    const modulescreenValue = (module_Screen ?? []).map((e) => e.name);
    const reportValue = (report ?? []).map((e) => e.name);
    const zoneValue = (zone ?? []).map((e) => e.name);
    const submoduleValue = (submodule ?? []).map((e) => e.name);
    const roleValue = (role ?? []).map((e) => e.name);
    return {
      ...rest,
      state: stateValue,
      subzone: subzoneValue,
      outlet: outletValue,
      module: moduleValue,
      module_Screen: modulescreenValue,
      report: reportValue,
      zone: zoneValue,
      submodule: submoduleValue,
      role: roleValue,
      employee_name: employee_name,
      //status: e?.status == 1 ? "Active" : "In-active",
    };
  });

  const onClickAdd = () => {
    navigate("/emailMapping/addForm", { state: {} });
  };
  const onClickUpdate = (data) => {
     //navigate("/emailMapping/updateForm", { state: {} });
  };

  const handleEditClick = (data) => {
    const dF = dataSource.find((li) => li.employee_id === data.employee_id);
    const customEntry = ([dF] ?? []).map((e) => {
      const {
        state,
        zone,
        role,
        subzone,
        outlet,
        module,
        submodule,
        module_Screen,
        report,
        report_to,
        status,
        ...rest
      } = e;
      const stateValue = (state ?? []).map((e) => parseInt(e.id));
      const subzoneValue = (subzone ?? []).map((e) => parseInt(e.id));
      const outletValue = (outlet ?? []).map((e) => parseInt(e.id));
      const moduleValue = (module ?? []).map((e) => parseInt(e.id));
      const modulescreenValue = (module_Screen ?? []).map((e) =>
        parseInt(e.id)
      );
      const reportValue = (report ?? []).map((e) => parseInt(e.id));
      const zoneValue = (zone ?? []).map((e) => parseInt(e.id));
      const submoduleValue = (submodule ?? []).map((e) => parseInt(e.id));
      const roleValue = (role ?? []).map((e) => parseInt(e.id));
      return {
        ...rest,
        state_id: stateValue,
        subzone_id: subzoneValue,
        outlet_id: outletValue,
        module_id: moduleValue,
        module_screen_id: modulescreenValue,
        report_id: reportValue,
        zone_id: zoneValue,
        sub_module_id: submoduleValue,
        role_id: roleValue,
        report_to: parseInt(report_to),
        status: parseInt(status),
        employee_name: e?.employee_name?.name,
      };
    });

    let dataNew = { ...data, status: data.status == "Active" ? 1 : 0 };

   // return false;
    navigate("/emailMapping/addForm", {
      state: { data: dataNew, isEdit: true },
    });
  };

  useEffect(() => {
    dispatch(getEmailMapping());
  }, [dispatch]);

  return (
    <CustomTable
      handleEditClick={handleEditClick}
      loading={gettingEmailMapping}
      dataSource={gritData}
      onClickUpdate={onClickUpdate}
      column={column}
      onClickAdd={onClickAdd}
      title={"Employee Mapping"}
    />
  );
}
