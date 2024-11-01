import { Movie } from "@/types/movie";

export interface MovieCardProps {
  movie: Pick<
    Movie,
    "original_title" | "release_date" | "poster_path" | "vote_average"
  >;
}
