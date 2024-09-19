import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import DepartmentCollapsibleTable from "./DepartmentCollapsibleTable";
import { getDepartments } from "./services/departmentsApi";
import { getEmployees } from "./services/employeesApi";

// Mock the API services
jest.mock("./services/departmentsApi");
jest.mock("./services/employeesApi");

describe("DepartmentCollapsibleTable", () => {
  const mockDepartments = [
    { department_id: 1, name: "HR" },
    { department_id: 2, name: "IT" },
  ];
  const mockEmployees = [
    { id: 1, name: "John Doe", department_id: 1 },
    { id: 2, name: "Jane Smith", department_id: 1 },
    { id: 3, name: "Bob Johnson", department_id: 2 },
  ];

  beforeEach(() => {
    // Mock API responses
    (getDepartments as jest.Mock).mockResolvedValue({
      status: 200,
      data: { items: mockDepartments },
    });
    (getEmployees as jest.Mock).mockResolvedValue({
      status: 200,
      data: { items: mockEmployees },
    });
  });

  it("renders the component with title", async () => {
    render(<DepartmentCollapsibleTable />);
    expect(screen.getByText("Department Details")).toBeInTheDocument();
  });

  it("fetches and displays departments", async () => {
    render(<DepartmentCollapsibleTable />);
    await waitFor(() => {
      expect(getDepartments).toHaveBeenCalled();
      expect(screen.getByText("HR")).toBeInTheDocument();
      expect(screen.getByText("IT")).toBeInTheDocument();
    });
  });

  it("expands department row and shows employees", async () => {
    render(<DepartmentCollapsibleTable />);
    await waitFor(() => {
      expect(screen.getByText("HR")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("HR"));
    await waitFor(() => {
      expect(getEmployees).toHaveBeenCalled();
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    });
  });

  it("collapses expanded department row", async () => {
    render(<DepartmentCollapsibleTable />);
    await waitFor(() => {
      expect(screen.getByText("HR")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("HR"));
    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("HR"));
    await waitFor(() => {
      expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
    });
  });

  it("handles error when fetching departments", async () => {
    (getDepartments as jest.Mock).mockRejectedValue(
      new Error("Failed to fetch departments")
    );
    render(<DepartmentCollapsibleTable />);
    await waitFor(() => {
      expect(
        screen.getByText("Error: Failed to fetch departments")
      ).toBeInTheDocument();
    });
  });

  it("handles error when fetching employees", async () => {
    (getEmployees as jest.Mock).mockRejectedValue(
      new Error("Failed to fetch employees")
    );
    render(<DepartmentCollapsibleTable />);
    await waitFor(() => {
      expect(screen.getByText("HR")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("HR"));
    await waitFor(() => {
      expect(
        screen.getByText("Error: Failed to fetch employees")
      ).toBeInTheDocument();
    });
  });

  it("displays loading state while fetching departments", async () => {
    (getDepartments as jest.Mock).mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );
    render(<DepartmentCollapsibleTable />);
    expect(screen.getByText("Loading departments...")).toBeInTheDocument();
    await waitFor(() => {
      expect(
        screen.queryByText("Loading departments...")
      ).not.toBeInTheDocument();
    });
  });

  it("displays loading state while fetching employees", async () => {
    (getEmployees as jest.Mock).mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );
    render(<DepartmentCollapsibleTable />);
    await waitFor(() => {
      expect(screen.getByText("HR")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("HR"));
    expect(screen.getByText("Loading employees...")).toBeInTheDocument();
    await waitFor(() => {
      expect(
        screen.queryByText("Loading employees...")
      ).not.toBeInTheDocument();
    });
  });
});
