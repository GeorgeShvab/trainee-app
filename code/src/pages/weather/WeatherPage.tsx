import PageWrapper from "@/layouts/page-wrapper/PageWrapper";

import PageLoadingFallback from "@/containers/page-loading-fallback/PageLoadingFallback";

import AppBox from "@/components/app-box/AppBox";
import AppSearchInput from "@/components/app-search-input/AppSearchInput";
import AppTypography from "@/components/app-typography/AppTypography";

import useWeatherSearch from "@/hooks/use-weather-search/useWeatherSearch";
import WeatherCard from "@/pages/weather/components/weather-card/WeatherCard";

import "@/pages/weather/WeatherPage.scss";

const WeatherPage = () => {
  const {
    city,
    cityData,
    error,
    cityLoading,
    formatMessage,
    handleSearchChange,
    handleClearSearch,
    handleSearch
  } = useWeatherSearch();

  if (cityLoading) return <PageLoadingFallback />;

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

  const isCityEmpty = city === "" && (
    <AppTypography
      variant="caption-small"
      component="p"
      translationKey="weather.empty"
      className="spa-search-message"
      data-cy="empty-search-message"
    />
  );

  const isShowCityCard = cityData && (
    <WeatherCard cityData={cityData} data-cy="weather-card" />
  );

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
            placeholder={formatMessage({ id: "header.searchInputPlaceholder" })}
            data-cy="app-search-input"
          />
        </AppBox>
        {isCityEmpty}
        {isShowCityCard}
      </AppBox>
    </PageWrapper>
  );
};

export default WeatherPage;
