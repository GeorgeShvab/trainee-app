import { CityDataType } from "@/pages/weather/types";

export const getWeatherDetails = (cityData: CityDataType) => [
  {
    icon: "🌧️",
    label: "weather.precipitation",
    value: `${cityData.rain?.["1h"] || 0} mm/h`
  },
  {
    icon: "💨",
    label: "weather.wind",
    value: `${cityData.wind.speed.toFixed(2)} mph`
  },
  {
    icon: "💧",
    label: "weather.humidity",
    value: `${cityData.main.humidity}%`
  },
  {
    icon: "☁️",
    label: "weather.cloudsCover",
    value: `${cityData.clouds.all}%`
  },
  {
    icon: "🌡️",
    label: "weather.pressure",
    value: `${cityData.main.pressure} hPa`
  },
  {
    icon: "👁️",
    label: "weather.visibility",
    value: `${(cityData.visibility / 1609).toFixed(1)} mi`
  }
];
