import { FC } from "react";

import StarIcon from "@mui/icons-material/Star";

import AppBox from "@/components/app-box/AppBox";
import AppTypography from "@/components/app-typography/AppTypography";
import { movieFallbackImage } from "@/components/movie-card/MovieCard.constants";
import { MovieCardProps } from "@/components/movie-card/MovieCard.type";

import cn from "@/utils/cn/cn";

import "@/components/movie-card/MovieCard.scss";

const MovieCard: FC<MovieCardProps> = ({
  movie: { poster_path, vote_average, release_date, original_title }
}) => {
  const imgBasePath = process.env.MOVIES_IMAGES_BASE_PATH;

  const imgUrl = poster_path ? imgBasePath! + poster_path : movieFallbackImage;

  const releaseYear = release_date ? new Date(release_date).getFullYear() : "";

  const normalizedRating = Math.round(vote_average / 2);

  const stars = Array.from({ length: 5 }, (_, index) => (
    <StarIcon
      key={index}
      className={cn(
        "movie-card__star-icon",
        index + 1 <= normalizedRating && "movie-card__star-icon--filled"
      )}
    />
  ));

  return (
    <AppBox className="movie-card" data-testid="movie-card">
      <AppBox
        component="img"
        className="movie-card__img"
        src={imgUrl}
        alt={original_title}
      />
      <AppBox className="movie-card__footer">
        <AppTypography className="movie-card__title">
          {original_title}
        </AppTypography>
        <AppBox className="movie-card__additional-info">
          <AppTypography
            className="movie-card__release-date"
            data-testid="movie-card-release-date"
          >
            {releaseYear}
          </AppTypography>
          <AppBox className="movie-card__rating">{stars}</AppBox>
        </AppBox>
      </AppBox>
    </AppBox>
  );
};

export default MovieCard;
