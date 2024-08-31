import * as React from "react";
import IconButton from "@mui/joy/IconButton";
import Table from "@mui/joy/Table";
import Typography from "@mui/joy/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Collapse from "@mui/material/Collapse";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import {
  EmployeeHistoryProps,
  EmployeeProps,
  EmployeesHistoryWithDepartmentProps,
} from "./types/employee";
import employeesWithDepartmentHistory from "./utils/hrAppEmpDeptHistory";
import employeesData from "../src/mockdata/employeesData.json";
import departmentsData from "../src/mockdata/departmentsData.json";
import { DepartmentProps } from "./types/department";

function Row(props: { row: EmployeeHistoryProps; initialOpen?: boolean }) {
  const { row } = props;
  const [open, setOpen] = React.useState(props.initialOpen || false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton aria-label="expand row" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.collection_id}
        </TableCell>
        <TableCell>{row.employee_id}</TableCell>
        <TableCell>{row.employee_name}</TableCell>
        <TableCell>{row.job}</TableCell>
        <TableCell>{row.manager_id ?? "-"}</TableCell>
        <TableCell>{row.hiredate}</TableCell>
        <TableCell>{row.salary}</TableCell>
        <TableCell>{row.commision ?? "-"}</TableCell>
        <TableCell>{row.department_id}</TableCell>
        <TableCell>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button size="sm" variant="plain" color="neutral">
              View
            </Button>
            <Button size="sm" variant="soft" color="danger">
              Edit
            </Button>
          </Box>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ height: 0, padding: 0 }} colSpan={10}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography gutterBottom component="div">
                History
              </Typography>
              <Table borderAxis="bothBetween" size="sm" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Collection ID#</TableCell>
                    <TableCell>Department ID#</TableCell>
                    <TableCell>Department Name</TableCell>
                    <TableCell>Location</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.collection_id}>
                      <TableCell component="th" scope="row">
                        {historyRow.collection_id}
                      </TableCell>
                      <TableCell>{historyRow.department_id}</TableCell>
                      <TableCell>{historyRow.department_name}</TableCell>
                      <TableCell>{historyRow.location}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const EmployeesCollapsibleRow = () => {
  const empsData: EmployeeProps[] = employeesData.data.items;
  const deptsData: DepartmentProps[] = departmentsData.data.items;
  let employeesRows: EmployeesHistoryWithDepartmentProps =
    employeesWithDepartmentHistory(empsData, deptsData);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const currentRows = employeesRows.filter((r, ind) => {
    return ind >= rowsPerPage * page && ind < rowsPerPage * (page + 1);
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Collection ID#</TableCell>
            <TableCell>Employee ID#</TableCell>
            <TableCell>Employee Name</TableCell>
            <TableCell>Job</TableCell>
            <TableCell>Manager ID#</TableCell>
            <TableCell>Hire Date</TableCell>
            <TableCell>Salary</TableCell>
            <TableCell>Commision</TableCell>
            <TableCell>Department ID#</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentRows.map((row: EmployeeHistoryProps, index) => (
            <Row key={row.employee_name} row={row} initialOpen={index === 0} />
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={employeesRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default EmployeesCollapsibleRow;
