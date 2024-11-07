import { KeyboardEvent } from "react";

import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import Paper from "@mui/material/Paper";

import AppIconButton from "@/components/app-icon-button/AppIconButton";
import AppInputBase from "@/components/app-input-base/AppInputBase";
import { AppSearchInputProps } from "@/components/app-search-input/AppSearchInput.types";

import "@/components/app-search-input/AppSearchInput.scss";

const AppSearchInput = ({
  onSearch,
  onClear,
  value,
  placeholder,
  ...props
}: AppSearchInputProps) => {
  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.code === "Enter" && onSearch) {
      onSearch();
    }
  };

  const clearButton = value ? (
    <AppIconButton
      aria-label="clear"
      onClick={onClear}
      data-cy="app-search-input-clear"
    >
      <ClearIcon fontSize="small" />
    </AppIconButton>
  ) : null;

  return (
    <Paper className="spa-search-input-field">
      <AppInputBase
        className="spa-search-input-field__input-base"
        placeholder={placeholder}
        value={value}
        onKeyUp={handleKeyUp}
        {...props}
      />
      {clearButton}
      <AppIconButton
        aria-label="search"
        onClick={onSearch}
        className="spa-search-input-field__search-icon"
        data-cy="app-search-input-submit"
      >
        <SearchIcon />
      </AppIconButton>
    </Paper>
  );
};

export default AppSearchInput;
