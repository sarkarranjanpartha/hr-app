import { EmployeeProps } from "./employee";

export interface DepartmentProps {
  collection_id: number;
  department_id: number;
  department_name: string;
  location: string;
}

// export interface EmployeesHistoryProps {
//   history: EmployeeProps[];
// }

// export interface DepartmentHistoryProps
//   extends DepartmentProps,
//     EmployeesHistoryProps {}

export interface DepartmentHistoryProps {
  collection_id: number;
  department_id: number;
  department_name: string;
  location: string;
  history: EmployeeProps[];
}

export type DepartmentWithEmployeesHistoryProps = DepartmentHistoryProps[];
