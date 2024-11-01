import { render, screen } from "@testing-library/react";

import MovieCardSkeleton from "./MovieCardSkeleton";

describe("Test MovieCardSkeleton", () => {
  test("Should render skeleton", () => {
    render(<MovieCardSkeleton />);

    const skeletonEl = screen.getByTestId("movie-card-skeleton");

    expect(skeletonEl).toBeInTheDocument();
  });
});
