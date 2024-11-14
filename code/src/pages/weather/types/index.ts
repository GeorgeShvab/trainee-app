export type WeatherDescription = {
  description: string;
  icon: string;
};

export type OptionalRain = Partial<{
  "1h": number;
}>;

export type WeatherMainData = {
  temp: number;
  feels_like: number;
  humidity: number;
  pressure: number;
};

export type WindData = {
  speed: number;
};

export type CloudsData = {
  all: number;
};

export type CityDataType = {
  name: string;
  main: WeatherMainData;
  weather: WeatherDescription[];
  wind: WindData;
  clouds: CloudsData;
  visibility: number;
  rain?: OptionalRain;
};

export interface WeatherCardProps {
  cityData: CityDataType;
}
