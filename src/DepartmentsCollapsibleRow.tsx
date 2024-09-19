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
import ImageModal from "./ImageModal";

function Row(props: {
  row: DepartmentHistoryProps;
  updateDepartmentsByCollectionID: (
    collectionID: number,
    bodyData: any
  ) => void;
  callRefreshFunction: () => void;
}) {
  const { row, updateDepartmentsByCollectionID, callRefreshFunction } = props;

  const [openExpandRow, setOpenExpandRow] = React.useState(false);
  const [openConfirmationDepartmentModal, setOpenConfirmationDepartmentModal] =
    React.useState<boolean>(false);
  const [isReadOnlyDepartmentModal, setIsReadOnlyDepartmentModal] =
    React.useState<boolean>(false);
  const [isNewDepartmentCreation, setIsNewDepartmentCreation] =
    React.useState(false);
  const [callType, setCallType] = React.useState("");
  const [selectedRow, setSelectedRow] = React.useState<DepartmentProps>();
  const [openImageModal, setOpenImageModal] = React.useState(false);
  const [selectedMediaUrl, setSelectedMediaUrl] = React.useState("");
  const [selectedMediaTitle, setSelectedMediaTitle] = React.useState("");

  const handleCloseConfirmationDepartmentModal = () =>
    setOpenConfirmationDepartmentModal(() => false);
  const handleOpenImageModal = (mediaUrl: string, mediaTitle: string) => {
    setSelectedMediaUrl(mediaUrl);
    setSelectedMediaTitle(mediaTitle);
    setOpenImageModal(true);
  };
  const handleCloseImageModal = () => setOpenImageModal(false);

  return (
    <>
      <React.Fragment>
        <TableRow>
          <TableCell align="center">
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => {
                setOpenExpandRow((prevOpenExpandRow) => !prevOpenExpandRow);
                setSelectedRow(() => row);
              }}
            >
              {openExpandRow ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}
            </IconButton>
          </TableCell>
          <TableCell component="td" scope="row" align="right">
            {row.collection_id}
          </TableCell>
          <TableCell align="right">{row.department_id}</TableCell>
          <TableCell>{row.department_name}</TableCell>
          <TableCell>{row.location}</TableCell>
          <TableCell>
            <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
              <Button
                size="sm"
                variant="plain"
                color="neutral"
                onClick={() => {
                  setOpenConfirmationDepartmentModal(() => true);
                  setIsReadOnlyDepartmentModal(() => true);
                  setIsNewDepartmentCreation(() => false);
                  setCallType(() => "view");
                  setSelectedRow(() => row);
                }}
              >
                View
              </Button>
              <Button
                size="sm"
                variant="soft"
                color="danger"
                onClick={() => {
                  setOpenConfirmationDepartmentModal(() => true);
                  setIsReadOnlyDepartmentModal(() => false);
                  setIsNewDepartmentCreation(() => false);
                  setCallType(() => "edit");
                  setSelectedRow(() => row);
                }}
              >
                Edit
              </Button>
              <Button
                size="sm"
                variant="solid"
                color="danger"
                onClick={() => {
                  console.log("Clicked on delete!");
                }}
              >
                Delete
              </Button>
              <Button
                size="sm"
                variant="outlined"
                color="primary"
                onClick={() => {
                  console.log(`Add Employee to ${row.department_name}`);
                }}
              >
                Add Employee to {row.department_id}
              </Button>
            </Box>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
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
                      <TableCell>Salary</TableCell>
                      <TableCell>Commision</TableCell>
                      <TableCell>Department ID#</TableCell>
                      <TableCell>Image</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.history.map((historyRow) => (
                      <TableRow key={historyRow.collection_id}>
                        <TableCell component="td" scope="row" align="right">
                          {historyRow.collection_id}
                        </TableCell>
                        <TableCell align="right">
                          {historyRow.employee_id}
                        </TableCell>
                        <TableCell>{historyRow.employee_name}</TableCell>
                        <TableCell>{historyRow.job}</TableCell>
                        <TableCell>{historyRow.manager_id ?? "-"}</TableCell>
                        <TableCell>{historyRow.hiredate}</TableCell>
                        <TableCell align="right">{historyRow.salary}</TableCell>
                        <TableCell align="right">
                          {historyRow.commision ?? "-"}
                        </TableCell>
                        <TableCell align="right">
                          {historyRow.department_id}
                        </TableCell>
                        <TableCell>
                          {historyRow.media_url ? (
                            <Button
                              size="sm"
                              variant="outlined"
                              color="primary"
                              onClick={() =>
                                handleOpenImageModal(
                                  historyRow.media_url as string,
                                  historyRow.media_title as string
                                )
                              }
                            >
                              Open Modal
                            </Button>
                          ) : (
                            "-"
                          )}
                        </TableCell>
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
        callRefreshFunction={callRefreshFunction}
      />
      <ImageModal
        open={openImageModal}
        onClose={handleCloseImageModal}
        mediaUrl={selectedMediaUrl}
        mediaTitle={selectedMediaTitle}
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
  callRefreshFunction: () => void;
}
const DepartmentsCollapsibleRow = (props: DepartmentsCollapsibleRowProps) => {
  const {
    departmentsRows,
    updateDepartmentsByCollectionID,
    callRefreshFunction,
  } = props;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const currentRows: DepartmentWithEmployeesHistoryProps =
    departmentsRows.filter((r, ind) => {
      return ind >= rowsPerPage * page && ind < rowsPerPage * (page + 1);
    });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(() => newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(() => parseInt(event.target.value, 10));
    setPage(() => 0);
  };

  const [openConfirmationDepartmentModal, setOpenConfirmationDepartmentModal] =
    React.useState<boolean>(false);
  const [isReadOnlyDepartmentModal, setIsReadOnlyDepartmentModal] =
    React.useState<boolean>(false);
  const [isNewDepartmentCreation, setIsNewDepartmentCreation] =
    React.useState(false);
  const [callType, setCallType] = React.useState("");

  const handleCloseConfirmationDepartmentModal = () =>
    setOpenConfirmationDepartmentModal(() => false);

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
              <TableCell>
                <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                  <Button
                    size="sm"
                    variant="soft"
                    color="success"
                    onClick={() => {
                      setOpenConfirmationDepartmentModal(() => true);
                      setIsReadOnlyDepartmentModal(() => false);
                      setIsNewDepartmentCreation(() => true);
                      setCallType(() => "create-new-department");
                    }}
                  >
                    Create New Department
                  </Button>
                  <Button
                    size="sm"
                    variant="outlined"
                    color="warning"
                    onClick={() => {
                      console.log("Clicked on Show All Employees");
                    }}
                  >
                    Show All Employees
                  </Button>
                  <Button
                    size="sm"
                    variant="outlined"
                    color="warning"
                    onClick={() => {
                      console.log("Create New Employees");
                    }}
                  >
                    Create New Employees
                  </Button>
                </Box>
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
                    callRefreshFunction={callRefreshFunction}
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
        updateDepartmentsByCollectionID={updateDepartmentsByCollectionID}
        callRefreshFunction={callRefreshFunction}
      />
    </>
  );
};

export default DepartmentsCollapsibleRow;
