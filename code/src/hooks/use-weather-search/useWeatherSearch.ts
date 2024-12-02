import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import useDropdown from "@/hooks/use-dropdown/useDropdown";
import { useOnClickOutside } from "@/hooks/use-on-click-outside/useOnClickOutside";
import { CityItem } from "@/pages/weather/types";
import {
  useGetWeatherByCityQuery,
  useSearchCityByNameQuery
} from "@/store/api/weatherApi";

const MIN_SEARCH_QUERY_LENGTH = 3;

const useWeatherSearch = () => {
  const [city, setCity] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const searchInputRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchCity = searchParams.get("query") || "";

  const { handleCloseDropdown, handleOpenDropdown, isDropdownOpened } =
    useDropdown();

  useOnClickOutside(searchInputRef, handleCloseDropdown);

  const {
    data: cityData,
    error,
    isLoading: cityLoading
  } = useGetWeatherByCityQuery(searchCity, { skip: !searchCity });

  const { data: searchResultsData, isLoading: isSearching } =
    useSearchCityByNameQuery(city, { skip: !city });

  const searchResults = searchResultsData?.list
    ? searchResultsData.list.map(
        (item: CityItem) => `${item.name}, ${item.sys.country}`
      )
    : [];

  useEffect(() => {
    if (searchCity) {
      setSelectedCity(searchCity);
    }
  }, [searchCity]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCity(value);

    if (value.length >= MIN_SEARCH_QUERY_LENGTH) {
      handleOpenDropdown();
    } else {
      handleCloseDropdown();
    }

    if (value.trim() === "") {
      handleClearSearch();
    }
  };

  const handleClearInput = () => {
    handleClearSearch();
    navigate("/weather", { replace: true });
  };

  const handleClearSearch = () => {
    setCity("");
    setSelectedCity("");
    setSearchParams({});
    handleCloseDropdown();
  };

  const handleSearch = () => {
    if (city.trim()) {
      setSelectedCity(city);
      setSearchParams({ query: city });
      handleCloseDropdown();
    }
  };

  const handleSelectCity = (selectedCity: string) => {
    setCity(selectedCity);
    handleSearch();
  };

  return {
    city,
    selectedCity,
    cityData,
    error,
    cityLoading,
    searchResults,
    isSearching,
    isDropdownOpened,
    searchInputRef,
    handleSearchChange,
    handleClearSearch,
    handleSearch,
    handleSelectCity,
    handleClearInput
  };
};

export default useWeatherSearch;
