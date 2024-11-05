import { fireEvent, screen } from "@testing-library/react";
import { useSearchParams } from "react-router-dom";

import WeatherPage from "@/pages/weather/WeatherPage";
import { useGetWeatherByCityQuery } from "@/store/api/weatherApi";
import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

jest.mock("@/store/api/weatherApi", () => ({
  useGetWeatherByCityQuery: jest.fn(),
  weatherApi: {
    reducerPath: "weatherApi",
    reducer: jest.fn(() => ({}))
  }
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useSearchParams: jest.fn()
}));

jest.mock("@/pages/weather/components/weather-card/WeatherCard", () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="weather-card" />)
}));

const mockSetSearchParams = jest.fn();

const mockCityData = {
  name: "Chicago",
  main: { temp: 295.15 },
  weather: [{ description: "clear sky" }]
};

const renderAndMock = (mockResponse = {}, initialQuery = "") => {
  (useGetWeatherByCityQuery as jest.Mock).mockReturnValue({
    isLoading: false,
    isError: false,
    isSuccess: true,
    error: null,
    ...mockResponse
  });

  (useSearchParams as jest.Mock).mockReturnValue([
    new URLSearchParams(initialQuery),
    mockSetSearchParams
  ]);

  renderWithProviders(<WeatherPage />);
};

describe("WeatherPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the search input and allows typing", () => {
    renderAndMock();

    const searchInput = screen.getByPlaceholderText(
      /header.searchInputPlaceholder/i
    );

    fireEvent.change(searchInput, { target: { value: "New York" } });

    expect(searchInput).toHaveValue("New York");
  });

  test("clears the search input when handleClearSearch is called", () => {
    renderAndMock();

    const searchInput = screen.getByPlaceholderText(
      /header.searchInputPlaceholder/i
    );

    fireEvent.change(searchInput, { target: { value: "New York" } });

    const clearButton = screen.getByRole("button", { name: /clear/i });

    fireEvent.click(clearButton);

    expect(searchInput).toHaveValue("");
    expect(mockSetSearchParams).toHaveBeenCalledWith({});
  });

  test("displays loading fallback when cityLoading is true", () => {
    renderAndMock({ isLoading: true });

    const loadingFallback = screen.getByTestId("page-loading-fallback");

    expect(loadingFallback).toBeInTheDocument();
  });

  test("displays error message when there is an error", () => {
    renderAndMock({ error: new Error("Failed to load data") });

    const errorMessage = screen.getByText(/errors.somethingWentWrong/i);

    expect(errorMessage).toBeInTheDocument();
  });

  test("maintains the previous search city on page load if search query is present", () => {
    renderAndMock({}, "?query=Chicago");

    const searchInput = screen.getByPlaceholderText(
      /header.searchInputPlaceholder/i
    );

    expect(searchInput).toHaveValue("Chicago");
  });

  test("displays a message prompting input when search is empty", () => {
    renderAndMock();

    const promptMessage = screen.getByText("Please type the input search");

    expect(promptMessage).toBeInTheDocument();
  });

  test("does not set search parameters when handleSearch is called with empty input", () => {
    renderAndMock();

    const searchInput = screen.getByPlaceholderText(
      /header.searchInputPlaceholder/i
    );

    fireEvent.change(searchInput, { target: { value: " " } });

    const searchButton = screen.getByRole("button", { name: /search/i });

    fireEvent.click(searchButton);

    expect(mockSetSearchParams).not.toHaveBeenCalled();
  });

  test("sets search parameters when handleSearch is called with non-empty input", () => {
    renderAndMock();

    const searchInput = screen.getByPlaceholderText(
      /header.searchInputPlaceholder/i
    );

    fireEvent.change(searchInput, { target: { value: "New York" } });

    const searchButton = screen.getByRole("button", { name: /search/i });

    fireEvent.click(searchButton);

    expect(mockSetSearchParams).toHaveBeenCalledWith({ query: "New York" });
  });

  test("triggers search when Enter key is pressed", () => {
    renderAndMock();

    const searchInput = screen.getByPlaceholderText(
      /header.searchInputPlaceholder/i
    );

    fireEvent.change(searchInput, { target: { value: "San Francisco" } });

    fireEvent.keyPress(searchInput, {
      key: "Enter",
      code: "Enter",
      charCode: 13
    });

    expect(mockSetSearchParams).toHaveBeenCalledWith({
      query: "San Francisco"
    });
  });

  test("does not trigger search on non-Enter key press", () => {
    renderAndMock();

    const searchInput = screen.getByPlaceholderText(
      /header.searchInputPlaceholder/i
    );

    fireEvent.change(searchInput, { target: { value: "Los Angeles" } });

    fireEvent.keyPress(searchInput, { key: "a", code: "KeyA", charCode: 65 });

    expect(mockSetSearchParams).not.toHaveBeenCalled();
  });

  test("renders WeatherCard when cityData and searchCity are available", () => {
    renderAndMock({ data: mockCityData }, "?query=Chicago");

    const weatherCard = screen.getByTestId("weather-card");

    expect(weatherCard).toBeInTheDocument();
  });
});
