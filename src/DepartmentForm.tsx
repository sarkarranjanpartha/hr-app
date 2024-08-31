import { useState } from "react";
import { DialogActions, DialogContent, TextField } from "@mui/material";
import "./DepartmentFormCss.css";
import { Button } from "@mui/joy";
import { DepartmentProps } from "./types/department";
import postDepartment from "./services/postDepartment";

export interface DepartmentFormProps {
  isReadOnlyDepartmentModal: boolean;
  isNewDepartmentCreation: boolean;
  callType: string;
  handleCloseConfirmationDepartmentModal: () => void;
  selectedRow?: DepartmentProps;
  updateDepartmentsByCollectionID: (
    collectionID: number,
    bodyData: any
  ) => void;
}

const DepartmentForm = (props: DepartmentFormProps) => {
  // console.log("DepartmentFormProps", props);
  const {
    isReadOnlyDepartmentModal,
    isNewDepartmentCreation,
    callType,
    handleCloseConfirmationDepartmentModal,
    selectedRow,
    updateDepartmentsByCollectionID,
  } = props;

  const [collectionId, setCollectionId] = useState(
    selectedRow?.collection_id ?? ""
  );
  const [departmentId, setDepartmentId] = useState(
    selectedRow?.department_id ?? ""
  );
  const [departmentName, setDepartmentName] = useState(
    selectedRow?.department_name ?? ""
  );
  const [location, setLocation] = useState(selectedRow?.location ?? "");

  const setCollectionIdChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | any>
  ) => {
    setCollectionId(event.target.value);
  };

  const departmentIdChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | any>
  ) => {
    setDepartmentId(event.target.value);
  };

  const departmentNameChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDepartmentName(event.target.value);
  };

  const locationChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLocation(event.target.value);
  };

  const submitHandler = (event: any) => {
    // console.log("Call submitHandler");
    event.preventDefault();
    const deptmentData = {
      deptno: departmentId,
      dname: departmentName,
      loc: location,
    };
    console.log("deptmentData", deptmentData);
    if (callType === "edit") {
      props.updateDepartmentsByCollectionID(
        selectedRow?.collection_id as number,
        deptmentData
      );
      handleCloseConfirmationDepartmentModal();
    }
    if (callType === "create-new-department")
      postDepartment("deptinfo/", deptmentData);
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="department__controls">
        <DialogContent dividers>
          <div
            style={{ display: isNewDepartmentCreation ? "none" : "block" }}
            className="department__div__control"
          >
            <TextField
              type="number"
              InputProps={{
                readOnly:
                  callType === "edit"
                    ? !isReadOnlyDepartmentModal
                    : isReadOnlyDepartmentModal,
              }}
              fullWidth
              id="collection-id"
              label="Collection ID#"
              variant="outlined"
              value={collectionId}
            />
          </div>
          <div className="department__div__control">
            <TextField
              InputProps={{
                readOnly:
                  callType === "edit"
                    ? !isReadOnlyDepartmentModal
                    : isReadOnlyDepartmentModal,
              }}
              fullWidth
              id="department-id"
              label="Department ID#"
              variant="outlined"
              onChange={departmentIdChangeHandler}
              value={departmentId}
            />
          </div>
          <div className="department__div__control">
            <TextField
              InputProps={{
                readOnly: isReadOnlyDepartmentModal,
              }}
              fullWidth
              id="department-name"
              label="Department Name"
              variant="outlined"
              onChange={departmentNameChangeHandler}
              value={departmentName}
            />
          </div>
          <div className="department__div__control">
            <TextField
              InputProps={{
                readOnly: isReadOnlyDepartmentModal,
              }}
              fullWidth
              id="location"
              label="Location"
              variant="outlined"
              onChange={locationChangeHandler}
              value={location}
            />
          </div>
        </DialogContent>
      </div>
      <div>
        <DialogActions sx={{ justifyContent: "space-between" }}>
          <Button
            size="sm"
            variant="soft"
            color="success"
            onClick={() => {
              // console.log("Clicked on Cancel");
              handleCloseConfirmationDepartmentModal();
            }}
          >
            Cancel
          </Button>
          <Button
            style={{ display: callType === "view" ? "none" : "flax" }}
            size="sm"
            variant="soft"
            color="success"
            // onClick={() => {
            //   console.log(
            //     `Clicked on ${
            //       callType === "edit" ? "Apply Changes" : "Add Department"
            //     }`
            //   );
            // }}
            type="submit"
          >
            {callType === "edit" ? "Apply Changes" : "Add Department"}
          </Button>
        </DialogActions>
      </div>
    </form>
  );
};
export default DepartmentForm;
