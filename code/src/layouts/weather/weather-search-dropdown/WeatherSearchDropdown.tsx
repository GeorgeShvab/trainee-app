import { FC } from "react";

import PageLoadingFallback from "@/containers/page-loading-fallback/PageLoadingFallback";

import AppBox from "@/components/app-box/AppBox";
import AppTypography from "@/components/app-typography/AppTypography";

import DropdownItem from "@/pages/weather/components/dropdown-item/DropdownItem";
import { WeatherSearchDropdownProps } from "@/pages/weather/types";

import "@/layouts/weather/weather-search-dropdown/WeatherSearchDropdown.scss";

const WeatherSearchDropdown: FC<WeatherSearchDropdownProps> = ({
  isLoading,
  isError,
  searchResults,
  handleSelect
}) => {
  if (isError) {
    return (
      <AppBox className="weather-search-dropdown__error">
        <AppTypography
          variant="body"
          component="span"
          translationKey="weather.error"
        />
      </AppBox>
    );
  }

  if (isLoading) {
    return <PageLoadingFallback />;
  }

  if (!searchResults || searchResults.length === 0) {
    return null;
  }

  return (
    <AppBox className="weather-search-dropdown">
      {searchResults.map((city) => (
        <DropdownItem key={city} city={city} onSelect={handleSelect} />
      ))}
    </AppBox>
  );
};

export default WeatherSearchDropdown;
