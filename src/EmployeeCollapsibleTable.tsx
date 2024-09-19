import EmployeesCollapsibleRow from "./EmployeesCollapsibleRow";
import "../src/index.css";

const EmployeeCollapsibleTable = () => {
  return (
    <>
      <div className="CollapsibleTextAlignCss">
        <h1>Employee Details</h1>
      </div>
      <EmployeesCollapsibleRow />
    </>
  );
};

export default EmployeeCollapsibleTable;
