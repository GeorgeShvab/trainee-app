import { render, screen } from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import DropdownItem from "@/pages/weather/components/dropdown-item/DropdownItem";
import { DropdownItemProps } from "@/pages/weather/types";

const mockCity = "Los Angeles";
const mockOnSelect = jest.fn();

const renderDropdownItem = (props: DropdownItemProps) => {
  render(<DropdownItem {...props} />);
};

describe("DropdownItem", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the city name", () => {
    renderDropdownItem({ city: mockCity, onSelect: mockOnSelect });

    const cityNameElement = screen.getByText(mockCity);

    expect(cityNameElement).toBeInTheDocument();
  });

  test("calls onSelect with the city name when clicked", async () => {
    renderDropdownItem({ city: mockCity, onSelect: mockOnSelect });

    const dropdownItem = screen.getByRole("button", { name: mockCity });

    await userEvent.click(dropdownItem);

    expect(mockOnSelect).toHaveBeenCalledTimes(1);
    expect(mockOnSelect).toHaveBeenCalledWith(mockCity);
  });

  test("calls onSelect with the city name when pressed with Enter key", async () => {
    renderDropdownItem({ city: mockCity, onSelect: mockOnSelect });

    const dropdownItem = screen.getByRole("button", { name: mockCity });

    await userEvent.type(dropdownItem, "{enter}");

    expect(mockOnSelect).toHaveBeenCalledTimes(1);
    expect(mockOnSelect).toHaveBeenCalledWith(mockCity);
  });
});
