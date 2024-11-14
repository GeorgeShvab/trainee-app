import { setupListeners } from "@reduxjs/toolkit/query/react";

import { configureStore } from "@reduxjs/toolkit";
import { GetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";

import { appApi } from "@/store/api/appApi";
import { weatherApi } from "@/store/api/weatherApi";
import cartLocalSavingMiddleware from "@/store/cartLocalSavingMiddleware";
import { errorMiddleware } from "@/store/errorMiddleware";
import { baseMovieApi } from "@/store/movieApi/baseMovieApi";
import { reducer } from "@/store/reducer";

const middleware = <State>(
  getDefaultMiddleware: GetDefaultMiddleware<State>
) => {
  return getDefaultMiddleware()
    .concat(appApi.middleware)
    .concat(baseMovieApi.middleware)
    .concat(weatherApi.middleware)
    .concat(errorMiddleware)
    .concat(cartLocalSavingMiddleware);
};

export const store = configureStore({
  reducer,
  middleware
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
