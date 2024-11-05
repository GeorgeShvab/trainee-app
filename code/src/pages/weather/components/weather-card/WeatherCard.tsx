import { FC } from "react";

import AppBox from "@/components/app-box/AppBox";
import AppTypography from "@/components/app-typography/AppTypography";

import { WeatherCardProps } from "@/pages/weather/types";

import "@/pages/weather/components/weather-card/WeatherCard.scss";

const WeatherCard: FC<WeatherCardProps> = ({ cityData }) => (
  <AppBox className="spa-weather-card__container">
    <AppBox className="spa-weather-card__left">
      <AppBox className="spa-weather-card__icon-container">
        <img
          src={`https://openweathermap.org/img/wn/${cityData.weather[0].icon}@2x.png`}
          alt="Weather Icon"
          className="spa-weather-card__icon"
        />
      </AppBox>
      <AppBox className="spa-weather-card__main-info">
        <AppTypography variant="h2" component="h2">
          {`${cityData.main.temp.toFixed(1)}°C`}
        </AppTypography>
        <AppTypography variant="body" component="span">
          <AppTypography translationKey="weather.feel" component="span" />{" "}
          {cityData.main.feels_like.toFixed(1)}°C
        </AppTypography>
        <br />
        <AppTypography variant="body" component="span">
          {cityData.weather[0].description}
        </AppTypography>
      </AppBox>
    </AppBox>

    <AppBox className="spa-weather-card__right">
      <AppBox className="spa-weather-card__detail">
        🌧️
        <AppTypography
          variant="body"
          component="span"
          translationKey="weather.precipitation"
        />
        <AppTypography variant="body" component="span">
          {cityData.rain?.["1h"] || 0} mm/h
        </AppTypography>
      </AppBox>
      <AppBox className="spa-weather-card__detail">
        💨
        <AppTypography
          variant="body"
          component="span"
          translationKey="weather.wind"
        />
        <AppTypography variant="body" component="span">
          {cityData.wind.speed.toFixed(2)} mph
        </AppTypography>
      </AppBox>
      <AppBox className="spa-weather-card__detail">
        💧
        <AppTypography
          variant="body"
          component="span"
          translationKey="weather.humidity"
        />
        <AppTypography variant="body" component="span">
          {cityData.main.humidity}%
        </AppTypography>
      </AppBox>
      <AppBox className="spa-weather-card__detail">
        ☁️
        <AppTypography
          variant="body"
          component="span"
          translationKey="weather.cloudsCover"
        />
        <AppTypography variant="body" component="span">
          {cityData.clouds.all}%
        </AppTypography>
      </AppBox>
      <AppBox className="spa-weather-card__detail">
        🌡️
        <AppTypography
          variant="body"
          component="span"
          translationKey="weather.pressure"
        />
        <AppTypography variant="body" component="span">
          {cityData.main.pressure} hPa
        </AppTypography>
      </AppBox>
      <AppBox className="spa-weather-card__detail">
        👁️
        <AppTypography
          variant="body"
          component="span"
          translationKey="weather.visibillity"
        />
        <AppTypography variant="body" component="span">
          {(cityData.visibility / 1609).toFixed(1)} mi
        </AppTypography>
      </AppBox>
    </AppBox>
  </AppBox>
);

export default WeatherCard;
