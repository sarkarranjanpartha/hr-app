import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

interface Employee {
  id?: number;
  name: string;
  position: string;
  department: string;
}

interface EmployeeModalFormProps {
  open: boolean;
  selectDepartmentId: number;
  selectDepartmentName: string;
  onClose: () => void;
  //   onSubmit: (employee: Employee) => void;
  //   employee?: Employee;
}

const EmployeeModalForm: React.FC<EmployeeModalFormProps> = ({
  open,
  selectDepartmentId,
  selectDepartmentName,
  onClose,
  //   onSubmit,
  //   employee,
}) => {
  //   const [formData, setFormData] = useState<Employee>(
  //     employee || { name: "", position: "", department: "" }
  //   );

  //   const handleChange = (
  //     e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  //   ) => {
  //     const { name, value } = e.target;
  //     setFormData((prev) => ({ ...prev, [name as string]: value }));
  //   };

  //   const handleSubmit = (e: React.FormEvent) => {
  //     e.preventDefault();
  //     onSubmit(formData);
  //     handleClose();
  //   };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2">
          {selectDepartmentId && selectDepartmentName
            ? `Add new employee into ${selectDepartmentName.toLowerCase()}`
            : "Edit employee"}
        </Typography>
        <form
        // onSubmit={handleSubmit}
        >
          <TextField
            fullWidth
            margin="normal"
            name="name"
            label="Name"
            // value={formData.name}
            // onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            name="position"
            label="Position"
            // value={formData.position}
            // onChange={handleChange}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Department</InputLabel>
            <Select
              name="department"
              //   value={formData.department}
              //   onChange={handleChange}
            >
              <MenuItem value="HR">HR</MenuItem>
              <MenuItem value="IT">IT</MenuItem>
              <MenuItem value="Finance">Finance</MenuItem>
            </Select>
          </FormControl>
          {/* <Button
            size="sm"
            variant="soft"
            color="success"
            onClick={() => {
                onClose();
            }}
          >
            Cancel
          </Button> */}
          {/* <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            {selectDepartmentId && selectDepartmentName
              ? "Add Employee"
              : "Edit Employee"}
          </Button> */}
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            {selectDepartmentId && selectDepartmentName
              ? "Add Employee"
              : "Edit Employee"}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default EmployeeModalForm;
