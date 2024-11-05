import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { apiNames } from "@/store/constants";

export const weatherApi = createApi({
  reducerPath: apiNames.weather,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.API_BASE_PATH_WEATHER
  }),
  endpoints: (build) => ({
    getWeatherByCity: build.query({
      query: (city) =>
        `weather?q=${city}&appid=${process.env.APP_WEATHER_API_KEY}&units=metric`
    })
  })
});

export const { useGetWeatherByCityQuery } = weatherApi;
