import { FC } from "react";

import { MoviesContainerProps } from "@/containers/movies-container/MoviesContainer.types";
import MoviesPageFallback from "@/containers/movies-page-fallback/MoviesPageFallback";

import AppBox from "@/components/app-box/AppBox";
import MovieCardSkeleton from "@/components/movie-card-skeleton/MovieCardSkeleton";
import MovieCard from "@/components/movie-card/MovieCard";

import repeatComponent from "@/utils/repeat-component/repeatComponent";

const MoviesContainer: FC<MoviesContainerProps> = ({
  data,
  isLoading,
  isError
}) => {
  if (isError) {
    return (
      <MoviesPageFallback translationKey="moviesContainer.errorFallback" />
    );
  }

  if (data?.length === 0) {
    return (
      <MoviesPageFallback translationKey="moviesContainer.notFoundFallback" />
    );
  }

  const content = isLoading
    ? repeatComponent(<MovieCardSkeleton />, 10)
    : data?.map((item) => <MovieCard key={item.id} movie={item} />);

  return <AppBox className="movies-page__movies-list">{content}</AppBox>;
};

export default MoviesContainer;
