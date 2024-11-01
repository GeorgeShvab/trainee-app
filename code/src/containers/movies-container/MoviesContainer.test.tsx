import { render, screen } from "@testing-library/react";

import MoviesContainer from "@/containers/movies-container/MoviesContainer";
import { MoviesContainerProps } from "@/containers/movies-container/MoviesContainer.types";

import { Movie } from "@/types/movie";

const testMovies = [
  {
    id: 2,
    original_title: "Cool Movie",
    release_date: "2005-06-26",
    poster_path: "/some-path.jpg",
    vote_average: 8.96
  },
  {
    id: 5,
    original_title: "Cool Movie",
    release_date: "2005-06-26",
    poster_path: "/some-path.jpg",
    vote_average: 8.96
  }
] as Movie[];

const defaultProps = {
  isError: false,
  isLoading: false
};

const renderComponent = ({
  data,
  isError = false,
  isLoading = false
}: Partial<MoviesContainerProps> = defaultProps) => {
  render(
    <MoviesContainer data={data} isError={isError} isLoading={isLoading} />
  );
};

describe("Test MoviesContainer component", () => {
  test("Should render 10 loading cards if passed isLoading equals true", () => {
    renderComponent({ isLoading: true });

    const skeletons = screen.getAllByTestId("movie-card-skeleton");

    expect(skeletons).toHaveLength(10);
  });

  test("Should render not found fallback when nothing is found", () => {
    renderComponent({ data: [] });

    const fallbackMsg = screen.getByText("moviesContainer.notFoundFallback");

    expect(fallbackMsg).toBeInTheDocument();
  });

  test("Should render error fallback if error occured", () => {
    renderComponent({ isError: true });

    const fallbackMsg = screen.getByText("moviesContainer.errorFallback");

    expect(fallbackMsg).toBeInTheDocument();
  });

  test("Should render movie cards according to passed data", () => {
    renderComponent({ data: testMovies });

    const movieCards = screen.getAllByTestId("movie-card");

    expect(movieCards).toHaveLength(2);
  });
});
