import { useState } from "react";
import ClickOnTheReportYouWantToView from "./ClickOnTheReportYouWantToView";
import DepartmentCollapsibleTable from "./DepartmentCollapsibleTable";
import EmployeesCollapsibleTable from "./EmployeeCollapsibleTable";

function App() {
  const [open, setOpen] = useState(true);
  const [onenReportToView, setOnenReportToView] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (value: string) => {
    setOpen(false);
    setOnenReportToView(value);
  };
  return (
    <div className="App">
      {onenReportToView === "EmployeesCollapsibleTable" && (
        <EmployeesCollapsibleTable />
      )}

      {onenReportToView === "DepartmentCollapsibleTable" && (
        <DepartmentCollapsibleTable />
      )}
      <ClickOnTheReportYouWantToView
        selectedValue={onenReportToView}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}

export default App;
