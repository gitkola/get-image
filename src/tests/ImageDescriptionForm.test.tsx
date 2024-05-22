import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ImageDescriptionForm from "../components/ImageDescriptionForm";

const mockOnSubmit = jest.fn();
const mockSetPrompt = jest.fn();

const defaultProps = {
  prompt: "",
  setPrompt: mockSetPrompt,
  isSubmitting: false,
  onSubmit: mockOnSubmit,
};

describe("ImageDescriptionForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the form elements correctly", () => {
    render(<ImageDescriptionForm {...defaultProps} />);

    expect(
      screen.getByLabelText(/введіть опис зображення/i)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/опишіть зображення.../i)
    ).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("calls setPrompt on input change", () => {
    render(<ImageDescriptionForm {...defaultProps} />);

    const textarea = screen.getByPlaceholderText(/опишіть зображення.../i);
    fireEvent.change(textarea, { target: { value: "Test prompt" } });

    expect(mockSetPrompt).toHaveBeenCalledWith("Test prompt");
  });

  it("calls onSubmit when form is submitted with valid prompt", () => {
    const validProps = {
      ...defaultProps,
      prompt: "Valid prompt",
    };

    render(<ImageDescriptionForm {...validProps} />);

    const form = screen.getByTestId("form");
    fireEvent.submit(form);

    expect(mockOnSubmit).toHaveBeenCalled();
  });

  it("does not call onSubmit when form is submitted with invalid prompt", () => {
    render(<ImageDescriptionForm {...defaultProps} />);

    const form = screen.getByTestId("form");
    fireEvent.submit(form);

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("shows character count correctly", () => {
    const propsWithText = {
      ...defaultProps,
      prompt: "Test prompt",
    };

    render(<ImageDescriptionForm {...propsWithText} />);

    expect(screen.getByText(/11\/1000 символів/i)).toBeInTheDocument();
  });

  it("disables the submit button when isSubmitting is true", () => {
    const submittingProps = {
      ...defaultProps,
      isSubmitting: true,
    };

    render(<ImageDescriptionForm {...submittingProps} />);

    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("calls onSubmit on Enter key press when prompt is valid", () => {
    const validProps = {
      ...defaultProps,
      prompt: "Valid prompt",
    };

    render(<ImageDescriptionForm {...validProps} />);

    const textarea = screen.getByRole("textbox");
    fireEvent.keyDown(textarea, { key: "Enter", shiftKey: false });

    expect(mockOnSubmit).toHaveBeenCalled();
  });

  it("does not call onSubmit on Enter key press when prompt is invalid", () => {
    render(<ImageDescriptionForm {...defaultProps} />);

    const textarea = screen.getByRole("textbox");
    fireEvent.keyDown(textarea, { key: "Enter", shiftKey: false });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
});
