import EmployeesCollapsibleTable from "./EmployeeCollapsibleTable";
import DepartmentCollapsibleTable from "./DepartmentCollapsibleTable";
import { Divider } from "@mui/material";

function App() {
  return (
    <div className="App">
      <EmployeesCollapsibleTable />
      <Divider />
      <DepartmentCollapsibleTable />
    </div>
  );
}

export default App;
