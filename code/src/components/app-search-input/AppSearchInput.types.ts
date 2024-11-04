import { InputBaseProps } from "@mui/material/InputBase";

import { AppIconButtonProps } from "@/components/app-icon-button/AppIconButton.types";

export type AppSearchInputProps = InputBaseProps & {
  onSearch?: () => void;
  onClear?: () => void;
  submitButtonProps?: AppIconButtonProps;
  clearButtonProps?: AppIconButtonProps;
};
