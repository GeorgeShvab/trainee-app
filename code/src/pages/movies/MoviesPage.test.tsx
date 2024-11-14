import { screen } from "@testing-library/react";
import { useSearchParams } from "react-router-dom";

import { MoviesContainerProps } from "@/containers/movies-container/MoviesContainer.types";

import MoviesPage from "@/pages/movies/MoviesPage";
import { useSearchQuery } from "@/store/movieApi/movieApi";
import { Movie, MovieApiPageable } from "@/types/movie";
import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

interface MockQueryResult {
  data?: MovieApiPageable<Movie>;
  isError?: boolean;
  isLoading?: boolean;
}

const initialQueryResult = {
  isError: false,
  isLoading: true
};

const successResult = {
  total_results: 50,
  results: [],
  total_pages: 3,
  page: 1
};

const mockMoviesContainer = jest.fn();

jest.mock("@/containers/movies-container/MoviesContainer", () => ({
  __esModule: true,
  default: (args: MoviesContainerProps) => mockMoviesContainer(args)
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useSearchParams: jest.fn()
}));

jest.mock("@/store/movieApi/movieApi", () => ({
  ...jest.requireActual("@/store/movieApi/movieApi"),
  useSearchQuery: jest.fn()
}));

const mockAndRender = (
  {
    data,
    isLoading = false,
    isError = false
  }: MockQueryResult = initialQueryResult,
  query: Record<string, string> = {}
) => {
  (useSearchQuery as jest.Mock).mockReturnValue({ data, isError, isLoading });
  (useSearchParams as jest.Mock).mockReturnValue([new URLSearchParams(query)]);

  renderWithProviders(<MoviesPage />);
};

describe("Test MoviesPage component", () => {
  test("Should render no query", () => {
    mockAndRender();

    const fallbackMessage = screen.getByText("moviesPage.emptyQueryFallback");

    expect(fallbackMessage).toBeInTheDocument();
  });

  test("Should render results counter and movies container with right props if there are results", () => {
    mockAndRender(
      {
        data: successResult
      },
      { query: "star wars" }
    );

    const resultsCounter = screen.getByText(/moviesPage.resultsCount\/count/);

    expect(mockMoviesContainer).toHaveBeenCalledWith({
      data: [],
      isLoading: false,
      isError: false
    });

    expect(resultsCounter).toBeInTheDocument();
  });

  test("Should not render results counter if data is loading", () => {
    mockAndRender(
      {
        isLoading: true
      },
      { query: "star wars" }
    );

    const resultsCounter = screen.queryByText(/moviesPage.resultsCount\/count/);

    expect(resultsCounter).not.toBeInTheDocument();
  });
});
