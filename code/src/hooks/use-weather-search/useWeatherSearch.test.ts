import { act, renderHook } from "@testing-library/react";
import { ChangeEvent } from "react";
import { useIntl } from "react-intl";
import { useSearchParams } from "react-router-dom";

import useWeatherSearch from "@/hooks/use-weather-search/useWeatherSearch";
import { useGetWeatherByCityQuery } from "@/store/api/weatherApi";

jest.mock("react-router-dom", () => ({
  useSearchParams: jest.fn()
}));

jest.mock("react-intl", () => ({
  useIntl: jest.fn()
}));

jest.mock("@/store/api/weatherApi", () => ({
  useGetWeatherByCityQuery: jest.fn()
}));

const mockSetSearchParams = jest.fn();
const mockFormatMessage = jest.fn((obj) => obj.id);

const mockCityData = {
  main: { temp: 25 },
  weather: [{ description: "clear" }]
};
const mockUseGetWeatherByCityQuery = useGetWeatherByCityQuery as jest.Mock;

describe("useWeatherSearch", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams(),
      mockSetSearchParams
    ]);

    (useIntl as jest.Mock).mockReturnValue({
      formatMessage: mockFormatMessage
    });
  });

  test("should initialize with default state", () => {
    mockUseGetWeatherByCityQuery.mockReturnValue({
      data: null,
      error: null,
      isLoading: false
    });

    const { result } = renderHook(() => useWeatherSearch());

    expect(result.current.city).toBe("");
    expect(result.current.cityLoading).toBe(false);
    expect(result.current.cityData).toBeNull();
  });

  test("should set city from searchParams on initial render", () => {
    const searchParams = new URLSearchParams("query=Kyiv");

    (useSearchParams as jest.Mock).mockReturnValue([
      searchParams,
      mockSetSearchParams
    ]);

    mockUseGetWeatherByCityQuery.mockReturnValue({
      data: null,
      error: null,
      isLoading: false
    });

    const { result } = renderHook(() => useWeatherSearch());

    expect(result.current.city).toBe("Kyiv");
  });

  test("should update city state when handleSearchChange is called", () => {
    const { result } = renderHook(() => useWeatherSearch());

    act(() => {
      result.current.handleSearchChange({
        target: { value: "London" }
      } as ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.city).toBe("London");
  });

  test("should clear search params and city when handleClearSearch is called", () => {
    const { result } = renderHook(() => useWeatherSearch());

    act(() => {
      result.current.handleClearSearch();
    });

    expect(result.current.city).toBe("");
    expect(mockSetSearchParams).toHaveBeenCalledWith({});
  });

  test("should not update search params when handleSearch is called with empty city", () => {
    const { result } = renderHook(() => useWeatherSearch());

    act(() => {
      result.current.handleSearch();
    });

    expect(mockSetSearchParams).not.toHaveBeenCalled();
  });

  test("should update search params when handleSearch is called with a non-empty city", () => {
    const { result } = renderHook(() => useWeatherSearch());

    act(() => {
      result.current.handleSearchChange({
        target: { value: "Paris" }
      } as ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.handleSearch();
    });

    expect(mockSetSearchParams).toHaveBeenCalledWith({ query: "Paris" });
  });

  test("should skip fetching weather data when searchCity is empty", () => {
    (useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams(),
      mockSetSearchParams
    ]);

    mockUseGetWeatherByCityQuery.mockReturnValue({
      data: null,
      error: null,
      isLoading: false
    });

    renderHook(() => useWeatherSearch());
    expect(mockUseGetWeatherByCityQuery).toHaveBeenCalledWith("", {
      skip: true
    });
  });

  test("should return loading state from useGetWeatherByCityQuery", () => {
    mockUseGetWeatherByCityQuery.mockReturnValue({
      data: null,
      error: null,
      isLoading: true
    });

    const { result } = renderHook(() => useWeatherSearch());
    expect(result.current.cityLoading).toBe(true);
  });

  test("should return error state from useGetWeatherByCityQuery", () => {
    mockUseGetWeatherByCityQuery.mockReturnValue({
      data: null,
      error: new Error("Failed to fetch weather data"),
      isLoading: false
    });

    const { result } = renderHook(() => useWeatherSearch());

    expect(result.current.error).toEqual(
      new Error("Failed to fetch weather data")
    );
  });

  test("should return cityData when useGetWeatherByCityQuery fetches successfully", () => {
    mockUseGetWeatherByCityQuery.mockReturnValue({
      data: mockCityData,
      error: null,
      isLoading: false
    });

    const { result } = renderHook(() => useWeatherSearch());

    expect(result.current.cityData).toEqual(mockCityData);
  });
});
