import { FC } from "react";

import AppBox from "@/components/app-box/AppBox";
import AppTypography from "@/components/app-typography/AppTypography";

import { WeatherCardProps } from "@/pages/weather/types";
import { getWeatherDetails } from "@/utils/get-weather-details/getWeatherDetails";

import "@/pages/weather/components/weather-card/WeatherCard.scss";

const WeatherCard: FC<WeatherCardProps> = ({ cityData }) => {
  const weatherDetails = getWeatherDetails(cityData);

  return (
    <AppBox className="spa-weather-card">
      <AppBox className="spa-weather-card__section spa-weather-card__section--left">
        <AppBox className="spa-weather-card__icon-container">
          <img
            src={`https://openweathermap.org/img/wn/${cityData.weather[0].icon}@2x.png`}
            alt={`${cityData.weather[0].description} icon`}
            className="spa-weather-card__icon"
          />
        </AppBox>
        <AppBox className="spa-weather-card__info">
          <AppTypography variant="h2" component="h2">
            {`${cityData.main.temp.toFixed(1)}°C`}
          </AppTypography>
          <AppTypography variant="body" component="span">
            <AppTypography translationKey="weather.feel" component="span" />{" "}
            {`${cityData.main.feels_like.toFixed(1)}°C`}
          </AppTypography>
          <br />
          <AppTypography variant="body" component="span">
            {cityData.weather[0].description}
          </AppTypography>
        </AppBox>
      </AppBox>
      <AppBox className="spa-weather-card__section spa-weather-card__section--right">
        {weatherDetails.map((detail, index) => (
          <AppBox key={index} className="spa-weather-card__detail">
            {detail.icon}
            <AppTypography
              variant="body"
              component="span"
              translationKey={detail.label}
            />
            <AppTypography variant="body" component="span">
              {detail.value}
            </AppTypography>
          </AppBox>
        ))}
      </AppBox>
    </AppBox>
  );
};

export default WeatherCard;
