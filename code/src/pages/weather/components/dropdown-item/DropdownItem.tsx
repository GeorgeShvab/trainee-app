import { FC } from "react";

import AppBox from "@/components/app-box/AppBox";
import AppTypography from "@/components/app-typography/AppTypography";

import { DropdownItemProps } from "@/pages/weather/types";

import "@/pages/weather/components/dropdown-item/DropdownItem.scss";

const DropdownItem: FC<DropdownItemProps> = ({ city, onSelect }) => {
  return (
    <AppBox
      className="weather-search-dropdown__item"
      onClick={() => onSelect(city)}
      role="button"
      tabIndex={0}
    >
      <AppTypography>{city}</AppTypography>
    </AppBox>
  );
};

export default DropdownItem;
