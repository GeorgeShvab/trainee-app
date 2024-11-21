export type WeatherDescription = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

export type OptionalRain = Partial<{
  "1h": number;
}>;

export type WeatherMainData = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level?: number;
  grnd_level?: number;
};

export type WindData = {
  speed: number;
  deg: number;
};

export type CloudsData = {
  all: number;
};

export type CoordData = {
  lat: number;
  lon: number;
};

export type CityDataType = {
  id: number;
  name: string;
  coord: CoordData;
  main: WeatherMainData;
  dt: number;
  wind: WindData;
  sys: { country: string };
  visibility: number;
  rain?: OptionalRain | null;
  snow?: OptionalRain | null;
  clouds: CloudsData;
  weather: WeatherDescription[];
};

export interface WeatherCardProps {
  cityData: CityDataType;
}

export interface CityItem {
  id: number;
  name: string;
  coord: CoordData;
  sys: { country: string };
}

export type DropdownItemProps = {
  city: string;
  onSelect: (city: string) => void;
};

export type WeatherSearchDropdownProps = {
  isLoading: boolean;
  isError: boolean;
  searchResults: string[] | undefined;
  handleSelect: (city: string) => void;
};
