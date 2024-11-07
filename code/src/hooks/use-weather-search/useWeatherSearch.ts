import { ChangeEvent, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useSearchParams } from "react-router-dom";

import { useGetWeatherByCityQuery } from "@/store/api/weatherApi";

const useWeatherSearch = () => {
  const [city, setCity] = useState("");
  const { formatMessage } = useIntl();

  const [searchParams, setSearchParams] = useSearchParams();
  const searchCity = searchParams.get("query") || "";

  const {
    data: cityData,
    error,
    isLoading: cityLoading
  } = useGetWeatherByCityQuery(searchCity, {
    skip: !searchCity
  });

  useEffect(() => {
    if (searchCity) {
      setCity(searchCity);
    }
  }, [searchCity]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCity(value);
  };

  const handleClearSearch = () => {
    setCity("");
    setSearchParams({});
  };

  const handleSearch = () => {
    if (city.trim()) {
      setSearchParams({ query: city });
    }
  };

  return {
    city,
    cityData,
    error,
    cityLoading,
    formatMessage,
    handleSearchChange,
    handleClearSearch,
    handleSearch
  };
};

export default useWeatherSearch;
