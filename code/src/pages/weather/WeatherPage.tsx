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
      />
    );
  }

  return (
    <PageWrapper>
      <AppBox className="spa-weather-page">
        <AppBox className="spa-weather-header">
          <AppTypography
            variant="h3"
            translationKey="weather.title"
            fontWeight="extra-bold"
          />
          <AppSearchInput
            value={city}
            onChange={handleSearchChange}
            onClear={handleClearSearch}
            onSearch={handleSearch}
            onKeyPress={handleKeyPress}
            placeholder={formatMessage({ id: "header.searchInputPlaceholder" })}
          />
        </AppBox>
        {city === "" && (
          <p className="spa-search-message">Please type the input search</p>
        )}
        {cityData && searchCity && <WeatherCard cityData={cityData} />}
      </AppBox>
    </PageWrapper>
  );
};

export default WeatherPage;
