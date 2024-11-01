import { baseMovieApi } from "@/store/movieApi/baseMovieApi";
import { Movie, MovieApiPageable } from "@/types/movie";

const movieApi = baseMovieApi.injectEndpoints({
  endpoints: (builder) => ({
    search: builder.query<MovieApiPageable<Movie>, string>({
      query: (query: string) => ({
        url: "/search/movie",
        params: { query }
      })
    })
  })
});

export const { useSearchQuery } = movieApi;
