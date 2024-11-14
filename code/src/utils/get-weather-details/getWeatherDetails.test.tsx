import { CityDataType } from "@/pages/weather/types";
import { getWeatherDetails } from "@/utils/get-weather-details/getWeatherDetails";

const cityData: CityDataType = {
  name: "Test City",
  main: {
    temp: 20.0,
    feels_like: 19.5,
    humidity: 75,
    pressure: 1008
  },
  weather: [
    {
      description: "moderate rain",
      icon: "09d"
    }
  ],
  wind: {
    speed: 4.567
  },
  clouds: {
    all: 85
  },
  visibility: 9000,
  rain: {
    "1h": 1.2
  }
};

const expectedDetails = [
  { icon: "🌧️", label: "weather.precipitation", value: "1.2 mm/h" },
  { icon: "💨", label: "weather.wind", value: "4.57 mph" },
  { icon: "💧", label: "weather.humidity", value: "75%" },
  { icon: "☁️", label: "weather.cloudsCover", value: "85%" },
  { icon: "🌡️", label: "weather.pressure", value: "1008 hPa" },
  { icon: "👁️", label: "weather.visibility", value: "5.6 mi" }
];

describe("getWeatherDetails", () => {
  test("should return correct weather details with provided data", () => {
    expect(getWeatherDetails(cityData)).toEqual(expectedDetails);
  });
});
