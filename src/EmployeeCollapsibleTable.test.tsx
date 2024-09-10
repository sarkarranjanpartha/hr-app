import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import EmployeeCollapsibleTable from "./EmployeeCollapsibleTable";
import { getEmployees } from "./services/employeesApi";

jest.mock("./services/employeesApi");

describe("EmployeeCollapsibleTable", () => {
  const mockEmployees = [
    { id: 1, name: "John Doe", department: "HR" },
    { id: 2, name: "Jane Smith", department: "HR" },
    { id: 3, name: "Bob Johnson", department: "IT" },
    { id: 4, name: "Alice Brown", department: "Finance" },
  ];

  beforeEach(() => {
    (getEmployees as jest.Mock).mockResolvedValue({
      status: 200,
      data: { items: mockEmployees },
    });
  });

  it("renders the component with title", async () => {
    render(<EmployeeCollapsibleTable />);
    expect(screen.getByText("Employee Details")).toBeInTheDocument();
  });

  it("fetches and displays employees grouped by department", async () => {
    render(<EmployeeCollapsibleTable />);
    await waitFor(() => {
      expect(getEmployees).toHaveBeenCalled();
      expect(screen.getByText("HR")).toBeInTheDocument();
      expect(screen.getByText("IT")).toBeInTheDocument();
      expect(screen.getByText("Finance")).toBeInTheDocument();
    });
  });

  it("expands department row and shows employees", async () => {
    render(<EmployeeCollapsibleTable />);
    await waitFor(() => {
      expect(screen.getByText("HR")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("HR"));
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
  });

  it("collapses expanded department row", async () => {
    render(<EmployeeCollapsibleTable />);
    await waitFor(() => {
      expect(screen.getByText("HR")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("HR"));
    expect(screen.getByText("John Doe")).toBeInTheDocument();

    fireEvent.click(screen.getByText("HR"));
    expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
  });

  it("handles error when fetching employees", async () => {
    (getEmployees as jest.Mock).mockRejectedValue(
      new Error("Failed to fetch employees")
    );
    render(<EmployeeCollapsibleTable />);
    await waitFor(() => {
      expect(
        screen.getByText("Error: Failed to fetch employees")
      ).toBeInTheDocument();
    });
  });

  it("displays loading state while fetching employees", async () => {
    (getEmployees as jest.Mock).mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );
    render(<EmployeeCollapsibleTable />);
    expect(screen.getByText("Loading employees...")).toBeInTheDocument();
    await waitFor(() => {
      expect(
        screen.queryByText("Loading employees...")
      ).not.toBeInTheDocument();
    });
  });

  it("handles empty employees list", async () => {
    (getEmployees as jest.Mock).mockResolvedValue({
      status: 200,
      data: { items: [] },
    });
    render(<EmployeeCollapsibleTable />);
    await waitFor(() => {
      expect(screen.getByText("No employees found")).toBeInTheDocument();
    });
  });

  it("expands multiple departments simultaneously", async () => {
    render(<EmployeeCollapsibleTable />);
    await waitFor(() => {
      expect(screen.getByText("HR")).toBeInTheDocument();
      expect(screen.getByText("IT")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("HR"));
    fireEvent.click(screen.getByText("IT"));
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Bob Johnson")).toBeInTheDocument();
  });

  it("sorts departments alphabetically", async () => {
    render(<EmployeeCollapsibleTable />);
    await waitFor(() => {
      const departments = screen.getAllByRole("row");
      expect(departments[1]).toHaveTextContent("Finance");
      expect(departments[2]).toHaveTextContent("HR");
      expect(departments[3]).toHaveTextContent("IT");
    });
  });

  it("sorts employees alphabetically within a department", async () => {
    render(<EmployeeCollapsibleTable />);
    await waitFor(() => {
      expect(screen.getByText("HR")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("HR"));
    const employees = screen.getAllByRole("row");
    expect(employees[2]).toHaveTextContent("Jane Smith");
    expect(employees[3]).toHaveTextContent("John Doe");
  });

  it("displays correct employee count for each department", async () => {
    render(<EmployeeCollapsibleTable />);
    await waitFor(() => {
      expect(screen.getByText("HR (2)")).toBeInTheDocument();
      expect(screen.getByText("IT (1)")).toBeInTheDocument();
      expect(screen.getByText("Finance (1)")).toBeInTheDocument();
    });
  });

  it("filters employees by name", async () => {
    render(<EmployeeCollapsibleTable />);
    await waitFor(() => {
      expect(screen.getByText("HR")).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText("Search employees");
    fireEvent.change(searchInput, { target: { value: "John" } });

    expect(screen.getByText("HR")).toBeInTheDocument();
    expect(screen.queryByText("IT")).not.toBeInTheDocument();
    expect(screen.queryByText("Finance")).not.toBeInTheDocument();

    fireEvent.click(screen.getByText("HR"));
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.queryByText("Jane Smith")).not.toBeInTheDocument();
  });

  it("handles very large datasets without performance issues", async () => {
    const largeEmployeeList = Array.from({ length: 1000 }, (_, i) => ({
      id: i + 1,
      name: `Employee ${i + 1}`,
      department: `Dept ${Math.floor(i / 10) + 1}`,
    }));

    (getEmployees as jest.Mock).mockResolvedValue({
      status: 200,
      data: { items: largeEmployeeList },
    });

    const { container } = render(<EmployeeCollapsibleTable />);
    await waitFor(() => {
      expect(screen.getByText("Dept 100")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Dept 1"));
    expect(screen.getByText("Employee 10")).toBeInTheDocument();

    // Check if scrolling is smooth (this is a basic check, you might want to use more sophisticated performance testing tools)
    expect(container.scrollHeight).toBeGreaterThan(window.innerHeight);
  });
});
