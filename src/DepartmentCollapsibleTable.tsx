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

const DepartmentCollapsibleTable = () => {
  const [empsData, setEmpsData] = useState<EmployeeProps[]>([]);
  const [deptsData, setDeptsData] = useState<DepartmentProps[]>([]);

  const departmentsData = () => {
    const getAllDepartmentArgs: apiParamsProps = {
      url: "deptinfo",
    };
    getDepartments(getAllDepartmentArgs)
      .then((deptsResponse) => {
        if (deptsResponse.status === 200) {
          setDeptsData(deptsResponse?.data?.items);
          console.log(deptsResponse);
        } else {
          console.log(deptsResponse);
        }
      })
      .catch((deptsError) => console.log(deptsError));
  };

  const employeesData = () => {
    const getAllEmployeeArgs: apiParamsProps = {
      url: "employeesfeed",
    };
    getEmployees(getAllEmployeeArgs)
      .then((empsResponse) => {
        if (empsResponse.status === 200) {
          setEmpsData(empsResponse?.data?.items);
          // console.log(empsResponse);
        } else {
          console.log(empsResponse);
        }
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
        if (updtDeptResponse.status === 200)
          console.log(
            "updateDepartmentsByCollectionID success",
            updtDeptResponse
          );
        else {
          console.log(
            "updateDepartmentsByCollectionID success",
            updtDeptResponse
          );
        }
      })
      .catch((updtDeptError) => console.log(updtDeptError));
  };

  //this runs the getData trigger function as useEffect
  React.useEffect(() => {
    departmentsData();
    employeesData();
  }, []);
  // console.log("first empsData", empsData);
  // console.log("first deptsData", deptsData);
  // items.sort((a, b) => a.value - b.value);
  const departmentsRows: DepartmentWithEmployeesHistoryProps =
    departmentWithEmployeesHistory(
      empsData,
      deptsData.sort((a, b) => a.department_id - b.department_id)
    );
  return (
    <>
      <div>Department Collapsible Table</div>
      <DepartmentsCollapsibleRow
        departmentsRows={departmentsRows}
        updateDepartmentsByCollectionID={updateDepartmentsByCollectionID}
      />
    </>
  );
};

export default DepartmentCollapsibleTable;
