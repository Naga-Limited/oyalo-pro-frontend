/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getEmployeeMapping } from "../../../@app/master/masterSlice";
import CustomTable from "../../../components/CustomTable";
import { column } from "./column";

export default function EmployeeMaping({ setTopTitle }) {
  setTopTitle("Employee Mapping");
  const navigate = useNavigate();

  const {
    gettingEmployeeMapping,
    getEmployeeMappingResponse: { data: dataSource = [] },
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
      submoduleData,
      module_Screen,
      report,
      ...rest
    } = e;

    const stateValue = (state ?? []).map((e) => e.name);
    const subzoneValue = (subzone ?? []).map((e) => e.name);
    const outletValue = (outlet ?? []).map((e) => e.name);
    const moduleValue = (module ?? []).map((e) => e.name);
    const modulescreenValue = (module_Screen ?? []).map((e) => e.name);
    const reportValue = (report ?? []).map((e) => e.name);
    const zoneValue = (zone ?? []).map((e) => e.name);
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
      submodule: submoduleData?.toString(),
      role: roleValue,
    };
  });
  const onClickAdd = () => {
    navigate("/employeeMapping/addForm", { state: {} });
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
        submoduleData,
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
      const submoduleValue = submodule;
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
        submodule: submoduleData?.toString(),
        status: parseInt(status),
      };
    });

    navigate("/employeeMapping/addForm", {
      state: { data: customEntry[0], isEdit: true },
    });
  };

  useEffect(() => {
    dispatch(getEmployeeMapping());
  }, [dispatch]);

  return (
    <CustomTable
      handleEditClick={handleEditClick}
      loading={gettingEmployeeMapping}
      dataSource={gritData}
      column={column}
      onClickAdd={onClickAdd}
      title={"Employee Mapping"}
    />
  );
}
