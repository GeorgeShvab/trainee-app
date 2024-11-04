import { ChangeEvent, useState } from "react";
import { useIntl } from "react-intl";
import { useNavigate, useSearchParams } from "react-router-dom";

import AppSearchInput from "@/components/app-search-input/AppSearchInput";

import "@/containers/movies-searchbar/MoviesSearchbar.scss";

const MoviesSearchbar = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("query") ?? "";

  const [value, setValue] = useState(initialQuery);

  const { formatMessage } = useIntl();

  const handleSearch = () => navigate(`?query=${value}`);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setValue(value);
  };

  return (
    <AppSearchInput
      onChange={handleChange}
      onSearch={handleSearch}
      data-cy="movie-search-input"
      value={value}
      placeholder={formatMessage({ id: "moviesSearchbar.searchPlaceholder" })}
      name="query"
      clearButtonProps={{ "data-cy": "movie-search-clear-button" }}
      submitButtonProps={{ "data-cy": "movie-search-submit-button" }}
    />
  );
};

export default MoviesSearchbar;
