import { Movie } from "@/types/movie";

export interface MoviesContainerProps {
  isLoading: boolean;
  isError: boolean;
  data: undefined | Movie[];
}
