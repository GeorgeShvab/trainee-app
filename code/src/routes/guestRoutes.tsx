import { lazy } from "react";
import { RouteObject } from "react-router-dom";

import routePaths from "@/constants/routes";
import MoviesPage from "@/pages/movies/MoviesPage";

const HomePage = lazy(() => import("@/pages/home/HomePage"));
const ProductsPage = lazy(() => import("@/pages/products/ProductsPage"));
const WeatherPage = lazy(() => import("@/pages/weather/WeatherPage"));
const ProductDetailsPage = lazy(
  () => import("@/pages/product-details/ProductDetailsPage")
);

const guestRoutes: RouteObject[] = [
  { index: true, element: <HomePage /> },
  { path: routePaths.products.path, element: <ProductsPage /> },
  { path: routePaths.movies.path, element: <MoviesPage /> },
  { path: routePaths.weather.path, element: <WeatherPage /> },
  { path: routePaths.productDetails.path(), element: <ProductDetailsPage /> }
];

export default guestRoutes;
