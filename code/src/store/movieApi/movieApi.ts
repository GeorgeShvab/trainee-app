import { baseMovieApi } from "@/store/movieApi/baseMovieApi";
import { Movie, MovieApiPageable } from "@/types/movie";

type SearchQueryParams = {
  page: number;
  query: string;
};

const movieApi = baseMovieApi.injectEndpoints({
  endpoints: (builder) => ({
    search: builder.query<MovieApiPageable<Movie>, SearchQueryParams>({
      query: (params) => ({
        url: "/search/movie",
        params: params
      })
    })
  })
});

export const { useSearchQuery } = movieApi;
