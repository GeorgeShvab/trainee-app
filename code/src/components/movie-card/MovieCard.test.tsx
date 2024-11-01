import { render, screen } from "@testing-library/react";

import MovieCard from "@/components/movie-card/MovieCard";
import { movieFallbackImage } from "@/components/movie-card/MovieCard.constants";

const mockEnvs = {
  MOVIES_IMAGES_BASE_PATH: "https://mock-path"
};

const testData = {
  original_title: "Cool Movie",
  release_date: "2005-06-26",
  poster_path: "/some-path.jpg",
  vote_average: 8.96
};

describe("Test MovieCard component", () => {
  const initialEnvs = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = mockEnvs;
  });

  afterEach(() => {
    process.env = initialEnvs;
  });

  test("Should display title, year, image and stars", () => {
    render(<MovieCard movie={testData} />);

    const releaseYear = new Date(testData.release_date).getFullYear();

    const title = screen.getByText(testData.original_title);
    const year = screen.getByText(releaseYear);
    const image = screen.getByRole("img");

    expect(title).toBeInTheDocument();
    expect(year).toBeInTheDocument();
    expect(image).toBeInTheDocument();

    const stars = screen.getAllByTestId("StarIcon");
    expect(stars).toHaveLength(5);
  });

  test("Should display title, year, image and stars", () => {
    render(<MovieCard movie={testData} />);

    const releaseYear = new Date(testData.release_date).getFullYear();

    const title = screen.getByText(testData.original_title);
    const year = screen.getByText(releaseYear);
    const image = screen.getByRole("img");

    expect(title).toBeInTheDocument();
    expect(year).toBeInTheDocument();
    expect(image).toBeInTheDocument();

    const stars = screen.getAllByTestId("StarIcon");
    expect(stars).toHaveLength(5);
  });

  test("Should display corrent src when there is image", () => {
    render(<MovieCard movie={testData} />);

    const image = screen.getByRole("img");

    const expectedSrc = mockEnvs.MOVIES_IMAGES_BASE_PATH + testData.poster_path;

    expect(image).toHaveAttribute("src", expectedSrc);
  });

  test("Should display not found image if there is no image", () => {
    render(<MovieCard movie={{ ...testData, poster_path: null }} />);

    const img = screen.getByRole("img");

    expect(img).toHaveAttribute("src", movieFallbackImage);
  });

  test("Should render 4 filled stars for movie with 8.96 rating", () => {
    render(<MovieCard movie={testData} />);

    const stars = screen.getAllByTestId("StarIcon");

    const expectedStars = stars.filter((item) =>
      item.classList.contains("movie-card__star-icon--filled")
    );

    expect(expectedStars).toHaveLength(4);
  });

  test("Should render 2 filled stars for movie with 4.68 rating", () => {
    render(<MovieCard movie={{ ...testData, vote_average: 4.68 }} />);

    const stars = screen.getAllByTestId("StarIcon");

    const expectedStars = stars.filter((item) =>
      item.classList.contains("movie-card__star-icon--filled")
    );

    expect(expectedStars).toHaveLength(2);
  });

  test("Should not display any date if there is no date", () => {
    render(
      <MovieCard
        movie={{ ...testData, release_date: null, vote_average: 4.68 }}
      />
    );

    const dateEl = screen.getByTestId("movie-card-release-date");

    expect(dateEl).toHaveTextContent("");
  });
});
