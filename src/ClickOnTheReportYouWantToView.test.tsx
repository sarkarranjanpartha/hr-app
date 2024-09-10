import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ClickOnTheReportYouWantToView from "./ClickOnTheReportYouWantToView";

describe("ClickOnTheReportYouWantToView", () => {
  const mockOnClose = jest.fn();

  it("renders correctly and handles item selection", () => {
    render(
      <ClickOnTheReportYouWantToView
        open={true}
        selectedValue=""
        onClose={mockOnClose}
      />
    );

    expect(
      screen.getByText("Set report you want to view.")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Department Collapsible Report")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Employees Collapsible Report")
    ).toBeInTheDocument();

    fireEvent.click(screen.getByText("Department Collapsible Report"));
    expect(mockOnClose).toHaveBeenCalledWith("DepartmentCollapsibleTable");

    fireEvent.click(screen.getByText("Employee Collapsible Report"));
    expect(mockOnClose).toHaveBeenCalledWith("EmployeeCollapsibleTable");
  });
});
