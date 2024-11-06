import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useSearchParams } from "react-router-dom";

import PageWrapper from "@/layouts/page-wrapper/PageWrapper";

import PageLoadingFallback from "@/containers/page-loading-fallback/PageLoadingFallback";

import AppBox from "@/components/app-box/AppBox";
import AppSearchInput from "@/components/app-search-input/AppSearchInput";
import AppTypography from "@/components/app-typography/AppTypography";

import WeatherCard from "@/pages/weather/components/weather-card/WeatherCard";
import { useGetWeatherByCityQuery } from "@/store/api/weatherApi";

import "@/pages/weather/WeatherPage.scss";

const WeatherPage = () => {
  const [city, setCity] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const searchCity = searchParams.get("query") || "";
  const { formatMessage } = useIntl();

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

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  if (cityLoading) {
    return <PageLoadingFallback />;
  }

  if (error) {
    return (
      <AppTypography
        variant="h3"
        component="h1"
        textAlign="center"
        translationKey="errors.somethingWentWrong"
        data-cy="weather-error-message"
      />
    );
  }

  return (
    <PageWrapper>
      <AppBox className="spa-weather-page" data-cy="weather-page">
        <AppBox className="spa-weather-header" data-cy="weather-header">
          <AppTypography
            variant="h3"
            translationKey="weather.title"
            fontWeight="extra-bold"
            data-cy="weather-title"
          />
          <AppSearchInput
            value={city}
            onChange={handleSearchChange}
            onClear={handleClearSearch}
            onSearch={handleSearch}
            onKeyPress={handleKeyPress}
            placeholder={formatMessage({ id: "header.searchInputPlaceholder" })}
            data-cy="app-search-input"
          />
        </AppBox>
        {city === "" && (
          <p className="spa-search-message" data-cy="empty-search-message">
            Please type the input search
          </p>
        )}
        {cityData && searchCity && (
          <WeatherCard cityData={cityData} data-cy="weather-card" />
        )}
      </AppBox>
    </PageWrapper>
  );
};

export default WeatherPage;
