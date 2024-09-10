import React from "react";
import {
  render,
  screen,
  waitFor,
  fireEvent,
  within,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import DepartmentCollapsibleTable from "./DepartmentCollapsibleTable";
import { getDepartments } from "./services/departmentsApi";
import { getEmployees } from "./services/employeesApi";

jest.mock("./services/departmentsApi");
jest.mock("./services/employeesApi");

describe("DepartmentCollapsibleTable", () => {
  const mockDepartments = [
    { department_id: 1, name: "HR" },
    { department_id: 2, name: "IT" },
    { department_id: 3, name: "Finance" },
  ];
  const mockEmployees = [
    { id: 1, name: "John Doe", department_id: 1 },
    { id: 2, name: "Jane Smith", department_id: 1 },
    { id: 3, name: "Bob Johnson", department_id: 2 },
    { id: 4, name: "Alice Brown", department_id: 3 },
  ];

  beforeEach(() => {
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
      mockDepartments.forEach((dept) => {
        expect(screen.getByText(dept.name)).toBeInTheDocument();
      });
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

  it("handles empty departments list", async () => {
    (getDepartments as jest.Mock).mockResolvedValue({
      status: 200,
      data: { items: [] },
    });
    render(<DepartmentCollapsibleTable />);
    await waitFor(() => {
      expect(screen.getByText("No departments found")).toBeInTheDocument();
    });
  });

  it("handles department with no employees", async () => {
    (getEmployees as jest.Mock).mockResolvedValue({
      status: 200,
      data: { items: [] },
    });
    render(<DepartmentCollapsibleTable />);
    await waitFor(() => {
      expect(screen.getByText("HR")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("HR"));
    await waitFor(() => {
      expect(
        screen.getByText("No employees found in this department")
      ).toBeInTheDocument();
    });
  });

  it("expands multiple departments simultaneously", async () => {
    render(<DepartmentCollapsibleTable />);
    await waitFor(() => {
      expect(screen.getByText("HR")).toBeInTheDocument();
      expect(screen.getByText("IT")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("HR"));
    fireEvent.click(screen.getByText("IT"));
    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("Bob Johnson")).toBeInTheDocument();
    });
  });

  it("sorts departments alphabetically", async () => {
    render(<DepartmentCollapsibleTable />);
    await waitFor(() => {
      const departments = screen.getAllByRole("row");
      expect(departments[1]).toHaveTextContent("Finance");
      expect(departments[2]).toHaveTextContent("HR");
      expect(departments[3]).toHaveTextContent("IT");
    });
  });

  it("sorts employees alphabetically within a department", async () => {
    render(<DepartmentCollapsibleTable />);
    await waitFor(() => {
      expect(screen.getByText("HR")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("HR"));
    await waitFor(() => {
      const employees = screen.getAllByRole("row");
      expect(employees[2]).toHaveTextContent("Jane Smith");
      expect(employees[3]).toHaveTextContent("John Doe");
    });
  });

  it("displays correct employee count for each department", async () => {
    render(<DepartmentCollapsibleTable />);
    await waitFor(() => {
      const hrRow = screen.getByText("HR").closest("tr");
      const itRow = screen.getByText("IT").closest("tr");
      const financeRow = screen.getByText("Finance").closest("tr");

      expect(within(hrRow!).getByText("2")).toBeInTheDocument();
      expect(within(itRow!).getByText("1")).toBeInTheDocument();
      expect(within(financeRow!).getByText("1")).toBeInTheDocument();
    });
  });

  it("handles very large datasets without performance issues", async () => {
    const largeDepartmentList = Array.from({ length: 1000 }, (_, i) => ({
      department_id: i + 1,
      name: `Dept ${i + 1}`,
    }));
    const largeEmployeeList = Array.from({ length: 10000 }, (_, i) => ({
      id: i + 1,
      name: `Employee ${i + 1}`,
      department_id: Math.floor(i / 10) + 1,
    }));

    (getDepartments as jest.Mock).mockResolvedValue({
      status: 200,
      data: { items: largeDepartmentList },
    });
    (getEmployees as jest.Mock).mockResolvedValue({
      status: 200,
      data: { items: largeEmployeeList },
    });

    const { container } = render(<DepartmentCollapsibleTable />);
    await waitFor(() => {
      expect(screen.getByText("Dept 1000")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Dept 1"));
    await waitFor(() => {
      expect(screen.getByText("Employee 10")).toBeInTheDocument();
    });

    // Check if scrolling is smooth (this is a basic check, you might want to use more sophisticated performance testing tools)
    expect(container.scrollHeight).toBeGreaterThan(window.innerHeight);
  });
});
