import { render, screen } from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import AppSearchInput from "@/components/app-search-input/AppSearchInput";
import { AppSearchInputProps } from "@/components/app-search-input/AppSearchInput.types";

const handleClear = jest.fn();
const handleSearch = jest.fn();
const placeholder = "Search...";

const mockProps = { value: "Some value" };

const renderComponent = (props: Partial<AppSearchInputProps> = mockProps) => {
  render(
    <AppSearchInput
      placeholder={placeholder}
      onClear={handleClear}
      onSearch={handleSearch}
      {...props}
    />
  );
};

describe("AppSearchInput ", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Should render search input field", () => {
    renderComponent();

    const searchInputField = screen.getByPlaceholderText(placeholder);
    expect(searchInputField).toBeInTheDocument();
  });

  test("Should render search icon button", () => {
    renderComponent();

    const searchButton = screen.getByTestId(/SearchIcon/);
    expect(searchButton).toBeInTheDocument();
  });

  test("Should render search icon button when there is value", () => {
    renderComponent();

    const clearButton = screen.getByTestId(/ClearIcon/);
    expect(clearButton).toBeInTheDocument();
  });

  test("Should not render search icon button when there is no value", () => {
    renderComponent({ value: "" });

    const clearButton = screen.queryByTestId(/ClearIcon/);
    expect(clearButton).not.toBeInTheDocument();
  });

  test("Should call onSearch when search button is clicked", async () => {
    renderComponent();

    const searchButton = screen.getByTestId(/SearchIcon/);
    await userEvent.click(searchButton);

    expect(handleSearch).toHaveBeenCalled();
  });

  test("Should call onSearch when enter is clicked", async () => {
    renderComponent();

    const inputElement = screen.getByPlaceholderText(placeholder);

    await userEvent.type(inputElement, "{enter}");

    expect(handleSearch).toHaveBeenCalled();
  });

  test("Should not call onSearch when enter is clicked if there is no onSearch", async () => {
    renderComponent({ onSearch: undefined });

    const inputElement = screen.getByPlaceholderText(placeholder);

    await userEvent.type(inputElement, "{enter}");

    expect(handleSearch).not.toHaveBeenCalled();
  });

  test("Should call onClear when clear button is clicked", async () => {
    renderComponent();

    const clearButton = screen.getByTestId(/ClearIcon/i);
    await userEvent.click(clearButton);

    expect(handleClear).toHaveBeenCalled();
  });
});
