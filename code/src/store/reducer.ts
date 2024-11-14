import { combineReducers } from "@reduxjs/toolkit";

import { appApi } from "@/store/api/appApi";
import { weatherApi } from "@/store/api/weatherApi";
import localCart from "@/store/slices/localCart";
import snackbarReducer from "@/store/slices/snackbarSlice";
import userReducer from "@/store/slices/userSlice";

export const reducer = combineReducers({
  snackbar: snackbarReducer,
  user: userReducer,
  localCart: localCart,
  [appApi.reducerPath]: appApi.reducer,
  [weatherApi.reducerPath]: weatherApi.reducer
});
