import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ImageModal from "./ImageModal";

describe("ImageModal", () => {
  const mockProps = {
    open: true,
    onClose: jest.fn(),
    mediaUrl: "https://example.com/image.jpg",
    mediaTitle: "Test Image",
  };

  it("renders correctly when open", () => {
    render(<ImageModal {...mockProps} />);

    expect(screen.getByText("Test Image")).toBeInTheDocument();
    expect(screen.getByAltText("Test Image")).toHaveAttribute(
      "src",
      "https://example.com/image.jpg"
    );
  });

  it("calls onClose when clicking outside the modal", () => {
    render(<ImageModal {...mockProps} />);

    fireEvent.click(document.body);
    expect(mockProps.onClose).toHaveBeenCalled();
  });

  it("opens image in new tab when clicked", () => {
    const openSpy = jest.spyOn(window, "open").mockImplementation(() => null);
    render(<ImageModal {...mockProps} />);

    fireEvent.click(screen.getByAltText("Test Image"));
    expect(openSpy).toHaveBeenCalledWith(
      "https://example.com/image.jpg",
      "_blank"
    );

    openSpy.mockRestore();
  });
});
