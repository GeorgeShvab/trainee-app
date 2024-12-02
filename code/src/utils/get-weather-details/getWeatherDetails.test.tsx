import { CityDataType } from "@/pages/weather/types";
import { getWeatherDetails } from "@/utils/get-weather-details/getWeatherDetails";

const baseCityData: CityDataType = {
  id: 12345,
  name: "Test City",
  coord: { lat: 0, lon: 0 },
  main: {
    temp: 20.0,
    feels_like: 19.5,
    temp_min: 18.0,
    temp_max: 22.0,
    humidity: 75,
    pressure: 1008
  },
  dt: 0,
  wind: {
    speed: 4.567,
    deg: 180
  },
  sys: { country: "IN" },
  visibility: 9000,
  clouds: {
    all: 85
  },
  weather: [
    {
      id: 800,
      main: "Clear",
      description: "clear sky",
      icon: "01d"
    }
  ],
  snow: null
};
describe("getWeatherDetails - Rain Data", () => {
  test("should return '0 mm/h' when rain data is not present", () => {
    const cityDataWithoutRain = { ...baseCityData, rain: undefined };

    const details = getWeatherDetails(cityDataWithoutRain);

    expect(details[0].value).toBe("0 mm/h");
  });

  test("should return '0 mm/h' when rain['1h'] data is not present", () => {
    const cityDataWithoutRain1h = { ...baseCityData, rain: {} };

    const details = getWeatherDetails(cityDataWithoutRain1h);

    expect(details[0].value).toBe("0 mm/h");
  });

  test("should return the correct rain value when rain['1h'] is present", () => {
    const cityDataWithRain = { ...baseCityData, rain: { "1h": 1.5 } };

    const details = getWeatherDetails(cityDataWithRain);

    expect(details[0].value).toBe("1.5 mm/h");
  });
});
