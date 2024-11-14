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
      value={value}
      placeholder={formatMessage({ id: "moviesSearchbar.searchPlaceholder" })}
      name="query"
      data-cy="app-search-input"
    />
  );
};

export default MoviesSearchbar;
