import { EmployeeProps } from "../types/employee";
import {
  DepartmentProps,
  DepartmentWithEmployeesHistoryProps,
} from "../types/department";

const departmentWithEmployeesHistory = (
  empsData: EmployeeProps[],
  deptsData: DepartmentProps[]
) => {
  let departmentsWithEmployeesHistoryRows: DepartmentWithEmployeesHistoryProps =
    deptsData.map((item) => ({
      ...item,
      history: empsData.filter((f) => f.department_id === item.department_id),
    }));
  return departmentsWithEmployeesHistoryRows;
};
export default departmentWithEmployeesHistory;
