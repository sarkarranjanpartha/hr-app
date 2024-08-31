import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import TablePagination from "@mui/material/TablePagination";
import { Button } from "@mui/joy";
import {
  DepartmentHistoryProps,
  DepartmentProps,
  DepartmentWithEmployeesHistoryProps,
} from "./types/department";
import DepartmentModal from "./DepartmentModal";
import TableSkeleton from "./TableSkeleton";

function Row(props: {
  row: DepartmentHistoryProps;
  updateDepartmentsByCollectionID: (
    collectionID: number,
    bodyData: any
  ) => void;
}) {
  const { row, updateDepartmentsByCollectionID } = props;
  const [openExpandRow, setOpenExpandRow] = React.useState(false);
  const [openConfirmationDepartmentModal, setOpenConfirmationDepartmentModal] =
    React.useState<boolean>(false);
  // const handleOpenConfirmationDepartmentModal = () =>
  //   setOpenConfirmationDepartmentModal(true);
  const handleCloseConfirmationDepartmentModal = () =>
    setOpenConfirmationDepartmentModal(false);
  const [isReadOnlyDepartmentModal, setIsReadOnlyDepartmentModal] =
    React.useState<boolean>(false);
  const [isNewDepartmentCreation, setIsNewDepartmentCreation] =
    React.useState(false);
  const [callType, setCallType] = React.useState("");
  const [selectedRow, setSelectedRow] = React.useState<DepartmentProps>();
  console.log("selectedRow 1", selectedRow);
  return (
    <>
      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell align="center">
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => {
                setOpenExpandRow(!openExpandRow);
                setSelectedRow(row);
              }}
            >
              {openExpandRow ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}
            </IconButton>
          </TableCell>
          <TableCell component="td" scope="row" align="center">
            {row.collection_id}
          </TableCell>
          <TableCell align="center">{row.department_id}</TableCell>
          <TableCell>{row.department_name}</TableCell>
          <TableCell>{row.location}</TableCell>
          <TableCell sx={{ display: "flex", justifyContent: "space-around" }}>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                size="sm"
                variant="plain"
                color="neutral"
                onClick={() => {
                  console.log("Clicked on View");
                  setOpenConfirmationDepartmentModal(true);
                  setIsReadOnlyDepartmentModal(true);
                  setIsNewDepartmentCreation(false);
                  setCallType("view");
                  setSelectedRow(row);
                }}
              >
                View
              </Button>
              <Button
                size="sm"
                variant="soft"
                color="danger"
                onClick={() => {
                  console.log("Clicked on Edit");
                  setOpenConfirmationDepartmentModal(true);
                  setIsReadOnlyDepartmentModal(false);
                  setIsNewDepartmentCreation(false);
                  setCallType("edit");
                  setSelectedRow(row);
                }}
              >
                Edit
              </Button>
            </Box>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
            <Collapse in={openExpandRow} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  History
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Collection ID#</TableCell>
                      <TableCell>Employee ID#</TableCell>
                      <TableCell>Employee Name</TableCell>
                      <TableCell>Job</TableCell>
                      <TableCell>Manager ID#</TableCell>
                      <TableCell>Hire Date</TableCell>
                      <TableCell align="right">Salary</TableCell>
                      <TableCell align="right">Commision</TableCell>
                      <TableCell>Department ID#</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.history.map((historyRow) => (
                      <TableRow key={historyRow.collection_id}>
                        <TableCell component="th" scope="row">
                          {historyRow.collection_id}
                        </TableCell>
                        <TableCell>{historyRow.employee_id}</TableCell>
                        <TableCell>{historyRow.employee_name}</TableCell>
                        <TableCell>{historyRow.job}</TableCell>
                        <TableCell>{historyRow.manager_id ?? "-"}</TableCell>
                        <TableCell>{historyRow.hiredate}</TableCell>
                        <TableCell align="right">{historyRow.salary}</TableCell>
                        <TableCell align="right">
                          {historyRow.commision ?? "-"}
                        </TableCell>
                        <TableCell>{historyRow.department_id}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
      <DepartmentModal
        openConfirmationDepartmentModal={openConfirmationDepartmentModal}
        handleCloseConfirmationDepartmentModal={
          handleCloseConfirmationDepartmentModal
        }
        isReadOnlyDepartmentModal={isReadOnlyDepartmentModal}
        isNewDepartmentCreation={isNewDepartmentCreation}
        callType={callType}
        selectedRow={selectedRow}
        updateDepartmentsByCollectionID={updateDepartmentsByCollectionID}
      />
    </>
  );
}

export interface DepartmentsCollapsibleRowProps {
  departmentsRows: DepartmentWithEmployeesHistoryProps;
  updateDepartmentsByCollectionID: (
    collectionID: number,
    bodyData: any
  ) => void;
}
const DepartmentsCollapsibleRow = (props: DepartmentsCollapsibleRowProps) => {
  console.log("DepartmentsCollapsibleRowProps partha", props);
  const { departmentsRows, updateDepartmentsByCollectionID } = props;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(3);

  const currentRows: DepartmentWithEmployeesHistoryProps =
    departmentsRows.filter((r, ind) => {
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

  const [openConfirmationDepartmentModal, setOpenConfirmationDepartmentModal] =
    React.useState<boolean>(false);
  // const handleOpenConfirmationDepartmentModal = () =>
  //   setOpenConfirmationDepartmentModal(true);
  const handleCloseConfirmationDepartmentModal = () =>
    setOpenConfirmationDepartmentModal(false);
  const [isReadOnlyDepartmentModal, setIsReadOnlyDepartmentModal] =
    React.useState<boolean>(false);
  const [isNewDepartmentCreation, setIsNewDepartmentCreation] =
    React.useState(false);
  const [callType, setCallType] = React.useState("");
  // const [selectedRow, setSelectedRow] = React.useState<DepartmentProps>();

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Collection ID#</TableCell>
              <TableCell>Department ID#</TableCell>
              <TableCell>Department Name</TableCell>
              <TableCell>Location</TableCell>
              <TableCell
                sx={{ display: "flex", justifyContent: "space-around" }}
              >
                <Button
                  size="sm"
                  variant="soft"
                  color="success"
                  onClick={() => {
                    console.log("Clicked on Create New Department");
                    setOpenConfirmationDepartmentModal(true);
                    setIsReadOnlyDepartmentModal(false);
                    setIsNewDepartmentCreation(true);
                    setCallType("create-new-department");
                  }}
                >
                  Create New Department
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentRows.length > 0
              ? currentRows.map((row: DepartmentHistoryProps) => (
                  <Row
                    key={row.collection_id}
                    row={row}
                    updateDepartmentsByCollectionID={
                      updateDepartmentsByCollectionID
                    }
                  />
                ))
              : Array.from(Array(rowsPerPage).keys()).map((x) => (
                  <TableRow key={x}>
                    <TableCell colSpan={6}>
                      <TableSkeleton />
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[1, 2, 3, 5, 10, 25]}
          component="div"
          count={departmentsRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      <DepartmentModal
        openConfirmationDepartmentModal={openConfirmationDepartmentModal}
        handleCloseConfirmationDepartmentModal={
          handleCloseConfirmationDepartmentModal
        }
        isReadOnlyDepartmentModal={isReadOnlyDepartmentModal}
        isNewDepartmentCreation={isNewDepartmentCreation}
        callType={callType}
        // selectedRow={selectedRow}
        updateDepartmentsByCollectionID={updateDepartmentsByCollectionID}
      />
    </>
  );
};

export default DepartmentsCollapsibleRow;
