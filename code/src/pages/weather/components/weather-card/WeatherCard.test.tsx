import { render, screen } from "@testing-library/react";

import WeatherCard from "@/pages/weather/components/weather-card/WeatherCard";
import { WeatherCardProps } from "@/pages/weather/types";

const mockCityData: WeatherCardProps["cityData"] = {
  name: "Test City",
  weather: [
    {
      id: 800,
      main: "Clear",
      icon: "01d",
      description: "clear sky"
    }
  ],
  main: {
    temp: 23.5,
    feels_like: 22.0,
    humidity: 60,
    pressure: 1012,
    temp_min: 20.0,
    temp_max: 25.0
  },
  wind: {
    speed: 5.5,
    deg: 200
  },
  rain: {
    "1h": 0.5
  },
  clouds: {
    all: 20
  },
  visibility: 10000,
  id: 123456,
  coord: { lat: 0, lon: 0 },
  dt: 0,
  sys: { country: "IN" },
  snow: null
};

describe("WeatherCard", () => {
  beforeEach(() => {
    render(<WeatherCard cityData={mockCityData} />);
  });

  test("renders the weather icon", () => {
    const weatherIcon = screen.getByAltText("clear sky icon");

    expect(weatherIcon).toHaveAttribute(
      "src",
      "https://openweathermap.org/img/wn/01d@2x.png"
    );
  });

  test("displays the main temperature", () => {
    const temp = screen.getByText("23.5°C");

    expect(temp).toBeInTheDocument();
  });

  test("displays the feels-like temperature", () => {
    const feelsLikeTemp = screen.getByText("22.0°C");

    expect(feelsLikeTemp).toBeInTheDocument();
  });

  test("displays the weather description", () => {
    const description = screen.getByText("clear sky");

    expect(description).toBeInTheDocument();
  });

  test("displays the precipitation data", () => {
    const precipitation = screen.getByText("0.5 mm/h");

    expect(precipitation).toBeInTheDocument();
  });

  test("displays the wind speed", () => {
    const windSpeed = screen.getByText("5.50 mph");

    expect(windSpeed).toBeInTheDocument();
  });

  test("displays the humidity level", () => {
    const humidity = screen.getByText("60%");

    expect(humidity).toBeInTheDocument();
  });

  test("displays the cloud coverage", () => {
    const cloudCover = screen.getByText("20%");

    expect(cloudCover).toBeInTheDocument();
  });

  test("displays the pressure", () => {
    const pressure = screen.getByText("1012 hPa");

    expect(pressure).toBeInTheDocument();
  });

  test("displays the visibility in miles", () => {
    const visibility = screen.getByText("6.2 mi");

    expect(visibility).toBeInTheDocument();
  });
});
