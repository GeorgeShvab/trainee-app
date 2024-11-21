import { useIntl } from "react-intl";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import WbSunnyIcon from "@mui/icons-material/WbSunny";

import PageWrapper from "@/layouts/page-wrapper/PageWrapper";
import WeatherSearchDropdown from "@/layouts/weather/weather-search-dropdown/WeatherSearchDropdown";

import AppBox from "@/components/app-box/AppBox";
import AppSearchInput from "@/components/app-search-input/AppSearchInput";
import AppTypography from "@/components/app-typography/AppTypography";

import useWeatherSearch from "@/hooks/use-weather-search/useWeatherSearch";
import WeatherCard from "@/pages/weather/components/weather-card/WeatherCard";

import "@/pages/weather/WeatherPage.scss";

const WeatherPage = () => {
  const {
    city,
    selectedCity,
    cityData,
    error,
    searchResults,
    isSearching,
    isDropdownOpened,
    searchInputRef,
    handleSearchChange,
    handleClearInput,
    handleSelectCity
  } = useWeatherSearch();

  const { formatMessage } = useIntl();

  const isDropdownContent = isDropdownOpened && (
    <WeatherSearchDropdown
      isLoading={isSearching}
      isError={!!error}
      searchResults={searchResults}
      handleSelect={handleSelectCity}
    />
  );

  const isLocationIcon = selectedCity && cityData && (
    <LocationOnIcon className="spa-weather-page__location-icon" />
  );

  const isLocationCity =
    selectedCity && cityData
      ? `${selectedCity}, ${cityData?.sys?.country}`
      : null;

  const inputPlaceholder = formatMessage({
    id: "header.searchInputPlaceholder"
  });

  const isCityValueMessage = !selectedCity &&
    !searchResults?.length &&
    !isSearching && (
      <AppTypography
        className="spa-weather-page__search-message"
        translationKey="weather.inputSearch"
      />
    );

  const isWeatherCard = selectedCity && cityData && (
    <WeatherCard cityData={cityData} />
  );

  return (
    <PageWrapper>
      <AppBox
        className="spa-weather-page"
        data-cy="weather-page"
        ref={searchInputRef}
      >
        <AppBox className="spa-weather-page__header" data-cy="weather-header">
          <AppBox className="spa-weather-page__centered-icon-text">
            <AppTypography
              variant="h3"
              translationKey="weather.title"
              fontWeight="extra-bold"
              data-cy="weather-title"
              className="spa-weather-page__text"
            />
            <WbSunnyIcon className="spa-weather-page__icon" />
          </AppBox>
          <AppBox className="spa-weather-page__location">
            <AppTypography
              component="span"
              className="spa-weather-page__location-text"
            >
              {isLocationIcon}
            </AppTypography>
            <AppTypography
              component="span"
              className="spa-weather-page__location-text"
            >
              {isLocationCity}
            </AppTypography>
          </AppBox>
          <AppBox className="spa-weather-page__search-input">
            <AppSearchInput
              value={city}
              onChange={handleSearchChange}
              onClear={handleClearInput}
              placeholder={inputPlaceholder}
              data-cy="app-search-input"
            />
            {isDropdownContent}
          </AppBox>
        </AppBox>
        {isCityValueMessage}
        {isWeatherCard}
      </AppBox>
    </PageWrapper>
  );
};

export default WeatherPage;
