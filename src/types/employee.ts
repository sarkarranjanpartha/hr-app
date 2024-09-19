import { DepartmentProps } from "./department";

export interface Uri {
  $ref: string;
}

export interface EmployeeProps {
  uri: Uri;
  collection_id: number;
  employee_id: number;
  employee_name: string;
  job: string;
  manager_id: number | null;
  hiredate: string;
  salary: number;
  commision: number | null;
  department_id: number;
  media_type: string | null;
  media_title: string | null;
  media_url: Uri;
}

// export interface DepartmentsHistoryProps {
//   history: DepartmentProps[];
// }

// export interface EmployeeHistoryProps
//   extends EmployeeProps,
//     DepartmentsHistoryProps {}

export interface EmployeeHistoryProps {
  uri: Uri;
  collection_id: number;
  employee_id: number;
  employee_name: string;
  job: string;
  manager_id: number | null;
  hiredate: string;
  salary: number;
  commision: number | null;
  department_id: number;
  history: DepartmentProps[];
}

export type EmployeesHistoryWithDepartmentProps = EmployeeHistoryProps[];
