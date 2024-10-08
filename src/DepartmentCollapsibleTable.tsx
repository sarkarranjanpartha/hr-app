import React, { useState } from "react";
import { EmployeeProps } from "./types/employee";
import {
  DepartmentProps,
  DepartmentWithEmployeesHistoryProps,
} from "./types/department";
import DepartmentsCollapsibleRow from "./DepartmentsCollapsibleRow";
import departmentWithEmployeesHistory from "./utils/hrAppDeptEmpHistory";
import { getDepartments, putDepartmentsById } from "./services/departmentsApi";
import { getEmployees } from "./services/employeesApi";
import { apiParamsProps } from "./types/servicesType";
import "../src/index.css";

const DepartmentCollapsibleTable = () => {
  const [empsData, setEmpsData] = useState<EmployeeProps[]>([]);
  const [deptsData, setDeptsData] = useState<DepartmentProps[]>([]);
  const [dataChanged, setDataChanged] = useState(false);

  const departmentsData = () => {
    const getAllDepartmentArgs: apiParamsProps = {
      url: "deptinfo",
    };
    getDepartments(getAllDepartmentArgs)
      .then((deptsResponse) => {
        if (deptsResponse.status === 200)
          setDeptsData(() => deptsResponse?.data?.items);
        else console.log("getDepartments !== 200", deptsResponse);
      })
      .catch((deptsError) => console.log(deptsError));
  };

  const callRefreshFunction = () => {
    setDataChanged((prevDataChanged) => !prevDataChanged);
  };

  const employeesData = () => {
    const getAllEmployeeArgs: apiParamsProps = {
      url: "employeesfeed",
    };
    getEmployees(getAllEmployeeArgs)
      .then((empsResponse) => {
        if (empsResponse.status === 200)
          setEmpsData(() => empsResponse?.data?.items);
        else console.log("getEmployees !== 200", empsResponse);
      })
      .catch((empsError) => console.log(empsError));
  };

  const updateDepartmentsByCollectionID = (
    collectionID: number,
    bodyData: any
  ) => {
    const putDepartmentArgs: apiParamsProps = {
      url: `deptinfo/${collectionID}`,
      data: bodyData,
    };

    putDepartmentsById(putDepartmentArgs)
      .then((updtDeptResponse) => {
        if (updtDeptResponse.status === 200) callRefreshFunction();
        else console.log("putDepartmentsById !== 200", updtDeptResponse);
      })
      .catch((updtDeptError) => console.log(updtDeptError));
  };

  //this runs the getData trigger function as useEffect
  React.useEffect(() => {
    departmentsData();
    employeesData();
  }, [dataChanged]);
  const departmentsRows: DepartmentWithEmployeesHistoryProps =
    departmentWithEmployeesHistory(
      empsData,
      deptsData.sort((a, b) => a.department_id - b.department_id)
    );

  return (
    <>
      <div className="CollapsibleTextAlignCss">
        <h1>Department Details</h1>
      </div>
      <DepartmentsCollapsibleRow
        departmentsRows={departmentsRows}
        updateDepartmentsByCollectionID={updateDepartmentsByCollectionID}
        callRefreshFunction={callRefreshFunction}
      />
    </>
  );
};

export default DepartmentCollapsibleTable;
