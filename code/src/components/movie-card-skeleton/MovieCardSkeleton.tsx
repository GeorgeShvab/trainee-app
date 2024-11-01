import AppBox from "@/components/app-box/AppBox";
import AppSkeleton from "@/components/app-skeleton/AppSkeleton";

import "@/components/movie-card-skeleton/MovieCardSkeleton.scss";

const MovieCardSkeleton = () => {
  return (
    <AppBox className="movie-card-skeleton">
      <AppSkeleton
        className="movie-card-skeleton__element"
        variant="rectangular"
        data-testid="movie-card-skeleton"
        width="100%"
        height="100%"
        animation="pulse"
      />
    </AppBox>
  );
};

export default MovieCardSkeleton;
