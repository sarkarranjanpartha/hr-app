import { useState } from "react";
import ClickOnTheReportYouWantToView from "./ClickOnTheReportYouWantToView";
import DepartmentCollapsibleTable from "./DepartmentCollapsibleTable";
import EmployeeCollapsibleTable from "./EmployeeCollapsibleTable";

function App() {
  const [open, setOpen] = useState(true);
  const [openReportToView, setOpenReportToView] = useState("");

  const handleClose = (value: string) => {
    setOpen(false);
    setOpenReportToView(value);
  };
  return (
    <div className="App">
      {openReportToView === "EmployeeCollapsibleTable" && (
        <EmployeeCollapsibleTable />
      )}

      {openReportToView === "DepartmentCollapsibleTable" && (
        <DepartmentCollapsibleTable />
      )}
      <ClickOnTheReportYouWantToView
        selectedValue={openReportToView}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}

export default App;
