import {
  EmployeeProps,
  EmployeesHistoryWithDepartmentProps,
} from "../types/employee";
import { DepartmentProps } from "../types/department";

const employeesWithDepartmentHistory = (
  empsData: EmployeeProps[],
  deptsData: DepartmentProps[]
) => {
  let employeesWithDepartmentsHistoryRows: EmployeesHistoryWithDepartmentProps =
    empsData.map((item) => ({
      ...item,
      history: deptsData.filter((f) => f.department_id === item.department_id),
    }));

  return employeesWithDepartmentsHistoryRows;
};
export default employeesWithDepartmentHistory;
