import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { apiNames } from "@/store/constants";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.API_MOVIES_BASE_PATH,
  paramsSerializer: (params) =>
    new URLSearchParams({
      ...params,
      api_key: process.env.API_MOVIES_API_KEY!
    }).toString()
});

export const baseMovieApi = createApi({
  baseQuery,
  reducerPath: apiNames.movie,
  endpoints: () => ({})
});
