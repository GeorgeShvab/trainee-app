import { screen } from "@testing-library/react";
import { useSearchParams } from "react-router-dom";

import userEvent from "@testing-library/user-event";

import WeatherPage from "@/pages/weather/WeatherPage";
import {
  useGetWeatherByCityQuery,
  useSearchCityByNameQuery
} from "@/store/api/weatherApi";
import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

jest.mock("@/store/api/weatherApi", () => ({
  useGetWeatherByCityQuery: jest.fn(),
  useSearchCityByNameQuery: jest.fn(),
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

  (useSearchCityByNameQuery as jest.Mock).mockReturnValue({
    isLoading: false,
    isError: false,
    isSuccess: true,
    data: { list: [] },
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

  test("renders the search input and allows typing", async () => {
    renderAndMock();

    const searchInput = screen.getByPlaceholderText(
      /header.searchInputPlaceholder/i
    );

    await userEvent.type(searchInput, "New York");

    expect(searchInput).toHaveValue("New York");
  });

  test("clears the search input when handleClearSearch is called", async () => {
    renderAndMock();

    const searchInput = screen.getByPlaceholderText(
      /header.searchInputPlaceholder/i
    );

    await userEvent.type(searchInput, "New York");

    const clearButton = screen.getByRole("button", { name: /clear/i });

    await userEvent.click(clearButton);

    expect(searchInput).toHaveValue("");
    expect(mockSetSearchParams).toHaveBeenCalledWith({});
  });

  test("does not trigger search on non-Enter key press", async () => {
    renderAndMock();

    const searchInput = screen.getByPlaceholderText(
      /header.searchInputPlaceholder/i
    );

    await userEvent.type(searchInput, "Los Angeles");

    await userEvent.keyboard("a");

    expect(mockSetSearchParams).not.toHaveBeenCalled();
  });

  test("renders WeatherCard when cityData and searchCity are available", () => {
    renderAndMock({ data: mockCityData }, "?query=Chicago");

    const weatherCard = screen.getByTestId("weather-card");

    expect(weatherCard).toBeInTheDocument();
  });
});
