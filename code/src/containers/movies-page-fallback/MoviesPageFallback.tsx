import { FC } from "react";

import { MoviesPageFallbackProps } from "@/containers/movies-page-fallback/MoviesPageFallback.types";

import AppBox from "@/components/app-box/AppBox";
import AppTypography from "@/components/app-typography/AppTypography";

import "@/containers/movies-page-fallback/MoviesPageFallback.scss";

const MoviesPageFallback: FC<MoviesPageFallbackProps> = ({
  translationKey
}) => {
  return (
    <AppBox className="movies-page-fallback">
      <AppTypography
        className="movies-page-fallback__text"
        translationKey={translationKey}
      />
    </AppBox>
  );
};

export default MoviesPageFallback;
