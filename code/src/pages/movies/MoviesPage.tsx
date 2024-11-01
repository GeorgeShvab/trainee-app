import { useSearchParams } from "react-router-dom";

import PageWrapper from "@/layouts/page-wrapper/PageWrapper";

import MoviesContainer from "@/containers/movies-container/MoviesContainer";
import MoviesPageFallback from "@/containers/movies-page-fallback/MoviesPageFallback";
import MoviesSearchbar from "@/containers/movies-searchbar/MoviesSearchbar";

import AppBox from "@/components/app-box/AppBox";
import AppTypography from "@/components/app-typography/AppTypography";

import { useSearchQuery } from "@/store/movieApi/movieApi";

import "@/pages/movies/MoviesPage.scss";

const MoviesPage = () => {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("query") ?? "";

  const { data, isError, isLoading } = useSearchQuery(query, {
    skip: !query
  });

  const countElement = (
    <AppBox component="strong" className="movies-page__results-counter">
      {data?.total_results}
    </AppBox>
  );

  const content = !query ? (
    <MoviesPageFallback translationKey="moviesPage.emptyQueryFallback" />
  ) : (
    <>
      <AppTypography
        translationKey={isLoading ? "" : "moviesPage.resultsCount"}
        translationProps={{
          values: {
            count: countElement
          }
        }}
      />
      <MoviesContainer
        data={data?.results}
        isLoading={isLoading}
        isError={isError}
      />
    </>
  );

  return (
    <PageWrapper>
      <AppBox className="movies-page">
        <AppTypography
          variant="h3"
          translationKey="moviesPage.title"
          component="h1"
        />
        <MoviesSearchbar />
        {content}
      </AppBox>
    </PageWrapper>
  );
};

export default MoviesPage;
