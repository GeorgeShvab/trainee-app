import { render, screen } from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import WeatherSearchDropdown from "@/layouts/weather/weather-search-dropdown/WeatherSearchDropdown";

const mockHandleSelect = jest.fn();

describe("WeatherSearchDropdown", () => {
  test("should render error state when isError is true", () => {
    render(
      <WeatherSearchDropdown
        isLoading={false}
        isError={true}
        searchResults={[]}
        handleSelect={mockHandleSelect}
      />
    );

    expect(screen.getByText(/weather.error/i)).toBeInTheDocument();
  });

  test("should render loading state when isLoading is true", () => {
    render(
      <WeatherSearchDropdown
        isLoading={true}
        isError={false}
        searchResults={[]}
        handleSelect={mockHandleSelect}
      />
    );

    expect(screen.getByTestId("page-loading-fallback")).toBeInTheDocument();
  });

  test("should render search results when they are available", () => {
    const searchResults = ["New York", "Los Angeles", "Chicago"];

    render(
      <WeatherSearchDropdown
        isLoading={false}
        isError={false}
        searchResults={searchResults}
        handleSelect={mockHandleSelect}
      />
    );

    searchResults.forEach((city) => {
      expect(screen.getByText(city)).toBeInTheDocument();
    });
  });

  test("should not render anything when searchResults is empty", () => {
    const { container } = render(
      <WeatherSearchDropdown
        isLoading={false}
        isError={false}
        searchResults={[]}
        handleSelect={mockHandleSelect}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  test("should call handleSelect when a dropdown item is clicked", async () => {
    const searchResults = ["New York"];
    render(
      <WeatherSearchDropdown
        isLoading={false}
        isError={false}
        searchResults={searchResults}
        handleSelect={mockHandleSelect}
      />
    );

    const user = userEvent.setup();

    await user.click(screen.getByText("New York"));

    expect(mockHandleSelect).toHaveBeenCalledWith("New York");
  });
});
