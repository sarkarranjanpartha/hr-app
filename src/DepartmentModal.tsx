import * as React from "react";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DepartmentForm from "./DepartmentForm";
import { DepartmentProps } from "./types/department";

export interface DepartmentModalProps {
  openConfirmationDepartmentModal: boolean;
  handleCloseConfirmationDepartmentModal: () => void;
  isReadOnlyDepartmentModal: boolean;
  isNewDepartmentCreation: boolean;
  callType: string;
  selectedRow?: DepartmentProps;
  updateDepartmentsByCollectionID: (
    collectionID: number,
    bodyData: any
  ) => void;
  callRefreshFunction: () => void;
}

const DepartmentModal = (props: DepartmentModalProps) => {
  const {
    openConfirmationDepartmentModal,
    handleCloseConfirmationDepartmentModal,
    isReadOnlyDepartmentModal,
    isNewDepartmentCreation,
    callType,
    selectedRow,
    updateDepartmentsByCollectionID,
    callRefreshFunction,
  } = props;

  return (
    <React.Fragment>
      <Dialog
        fullWidth={false}
        maxWidth={"lg"}
        open={openConfirmationDepartmentModal}
        // onClose={handleCloseConfirmationDepartmentModal}
      >
        <DialogTitle>Department Details</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloseConfirmationDepartmentModal}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <DepartmentForm
            isReadOnlyDepartmentModal={isReadOnlyDepartmentModal}
            isNewDepartmentCreation={isNewDepartmentCreation}
            callType={callType}
            handleCloseConfirmationDepartmentModal={
              handleCloseConfirmationDepartmentModal
            }
            selectedRow={selectedRow}
            updateDepartmentsByCollectionID={updateDepartmentsByCollectionID}
            callRefreshFunction={callRefreshFunction}
          />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default DepartmentModal;
