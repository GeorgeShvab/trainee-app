import { act, renderHook } from "@testing-library/react";
import { ChangeEvent } from "react";
import { useIntl } from "react-intl";
import { useNavigate, useSearchParams } from "react-router-dom";

import userEvent from "@testing-library/user-event";

import { useOnClickOutside } from "@/hooks/use-on-click-outside/useOnClickOutside";
import useWeatherSearch from "@/hooks/use-weather-search/useWeatherSearch";
import {
  useGetWeatherByCityQuery,
  useSearchCityByNameQuery
} from "@/store/api/weatherApi";

jest.mock("react-router-dom", () => ({
  useSearchParams: jest.fn(),
  useNavigate: jest.fn()
}));

jest.mock("react-intl", () => ({
  useIntl: jest.fn()
}));

jest.mock("@/store/api/weatherApi", () => ({
  useGetWeatherByCityQuery: jest.fn(),
  useSearchCityByNameQuery: jest.fn()
}));

jest.mock("@/hooks/use-on-click-outside/useOnClickOutside", () => ({
  useOnClickOutside: jest.fn()
}));

const mockSetSearchParams = jest.fn();
const mockNavigate = jest.fn();
const mockFormatMessage = jest.fn((obj) => obj.id);

const mockCityData = {
  main: { temp: 25 },
  weather: [{ description: "clear" }],
  sys: { country: "US" }
};

const mockSearchResultsData = {
  list: [{ name: "New York", sys: { country: "US" } }]
};

const mockList = [
  { name: "London", sys: { country: "UK" } },
  { name: "Tokyo", sys: { country: "JP" } }
];

const mockUseGetWeatherByCityQuery = useGetWeatherByCityQuery as jest.Mock;
const mockUseSearchCityByNameQuery = useSearchCityByNameQuery as jest.Mock;
const mockUseOnClickOutside = useOnClickOutside as jest.Mock;

(useSearchParams as jest.Mock).mockReturnValue([
  new URLSearchParams("query=Kyiv"),
  mockSetSearchParams
]);

(useNavigate as jest.Mock).mockReturnValue(mockNavigate);

(useIntl as jest.Mock).mockReturnValue({
  formatMessage: mockFormatMessage
});

mockUseGetWeatherByCityQuery.mockReturnValue({
  data: mockCityData,
  error: null,
  isLoading: false
});

mockUseSearchCityByNameQuery.mockReturnValue({
  data: mockSearchResultsData,
  isLoading: false
});

mockUseOnClickOutside.mockImplementation(() => jest.fn());

describe("useWeatherSearch", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should initialize with default state", () => {
    const { result } = renderHook(() => useWeatherSearch());

    expect(result.current.city).toBe("");
    expect(result.current.cityLoading).toBe(false);
    expect(result.current.cityData).toEqual(mockCityData);
    expect(result.current.isDropdownOpened).toBe(false);
  });

  test("should set searchCity from searchParams if query is present", () => {
    (useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams("query=Paris"),
      mockSetSearchParams
    ]);

    const { result } = renderHook(() => useWeatherSearch());

    expect(result.current.selectedCity).toBe("Paris");
  });

  test("should set searchCity as an empty string if query is not present", () => {
    (useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams(""),
      mockSetSearchParams
    ]);

    const { result } = renderHook(() => useWeatherSearch());

    expect(result.current.selectedCity).toBe("");
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

  test("should close dropdown if city length is less than minimum query length", () => {
    const { result } = renderHook(() => useWeatherSearch());

    act(() => {
      result.current.handleSearchChange({
        target: { value: "Lo" }
      } as ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.isDropdownOpened).toBe(false);
  });

  test("should clear search params and city when handleClearSearch is called", () => {
    const { result } = renderHook(() => useWeatherSearch());

    act(() => {
      result.current.handleClearSearch();
    });

    expect(result.current.city).toBe("");
    expect(mockSetSearchParams).toHaveBeenCalledWith({});
  });

  test("should clear input and navigate when handleClearInput is called", () => {
    const { result } = renderHook(() => useWeatherSearch());

    act(() => {
      result.current.handleClearInput();
    });

    expect(result.current.city).toBe("");
    expect(mockNavigate).toHaveBeenCalledWith("/weather", { replace: true });
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

  test("should fetch search results when city length is valid", () => {
    const { result } = renderHook(() => useWeatherSearch());

    act(() => {
      result.current.handleSearchChange({
        target: { value: "Lon" }
      } as ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.isDropdownOpened).toBe(true);
  });

  test("should call useOnClickOutside to close dropdown on outside click", () => {
    renderHook(() => useWeatherSearch());

    expect(mockUseOnClickOutside).toHaveBeenCalled();
  });

  test("should not call handler when clicking inside the search input element", async () => {
    const ref = { current: document.createElement("div") };

    document.body.appendChild(ref.current);

    const handler = jest.fn();

    renderHook(() => useOnClickOutside(ref, handler));

    await userEvent.click(ref.current);

    expect(handler).not.toHaveBeenCalled();
  });

  test("should handle error state from useGetWeatherByCityQuery", () => {
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

  test("should open dropdown when handleSearchChange is called with a valid city", () => {
    const { result } = renderHook(() => useWeatherSearch());

    act(() => {
      result.current.handleSearchChange({
        target: { value: "Berlin" }
      } as ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.isDropdownOpened).toBe(true);
  });

  test("should close dropdown when handleSearchChange is called with an empty value", () => {
    const { result } = renderHook(() => useWeatherSearch());

    act(() => {
      result.current.handleSearchChange({
        target: { value: "" }
      } as ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.isDropdownOpened).toBe(false);
  });

  test("should call handleSearch and update selectedCity", () => {
    const { result } = renderHook(() => useWeatherSearch());

    act(() => {
      result.current.handleSearchChange({
        target: { value: "Tokyo" }
      } as ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.handleSearch();
    });

    expect(result.current.selectedCity).toBe("Tokyo");
    expect(mockSetSearchParams).toHaveBeenCalledWith({ query: "Tokyo" });
  });

  test("should update city and close dropdown when handleSelectCity is called", () => {
    const { result } = renderHook(() => useWeatherSearch());

    act(() => {
      result.current.handleSelectCity("Madrid");
    });

    expect(result.current.city).toBe("Madrid");
    expect(result.current.isDropdownOpened).toBe(false);
  });

  test("should return an empty array if searchResultsData is null", () => {
    mockUseSearchCityByNameQuery.mockReturnValue({
      data: null,
      isLoading: false
    });

    const { result } = renderHook(() => useWeatherSearch());
    expect(result.current.searchResults).toEqual([]);
  });

  test("should return an empty array if searchResultsData.list is undefined", () => {
    mockUseSearchCityByNameQuery.mockReturnValue({
      data: {},
      isLoading: false
    });

    const { result } = renderHook(() => useWeatherSearch());
    expect(result.current.searchResults).toEqual([]);
  });

  test("should map searchResultsData.list to formatted strings when data is present", () => {
    mockUseSearchCityByNameQuery.mockReturnValue({
      data: { list: mockList },
      isLoading: false
    });

    const { result } = renderHook(() => useWeatherSearch());
    expect(result.current.searchResults).toEqual(["London, UK", "Tokyo, JP"]);
  });
});
