import { TextField } from "@mui/material";
import React from "react";

type Props = {
  name: string;
  label: string;
  value: string | number;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onBlur: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  error?: boolean;
  helperText?: string | boolean;
  disabled?: boolean;
  enablePaste?: boolean;
  autoComplete?: string;
};
const MuiTextField = ({
  name,
  label,
  value,
  error,
  helperText,
  onBlur,
  disabled,
  onChange,
  enablePaste = true,
  autoComplete = "off"
}: Props) => {
  
  const handlePaste = (event: any) => {
    if (!enablePaste) {
      event.preventDefault();
    }
  };

  return (
    <TextField
      fullWidth
      id={name}
      name={name}
      label={label}
      value={value}
      variant="outlined"
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      helperText={helperText}
      disabled={disabled}
      autoComplete={autoComplete}
      onPaste={handlePaste}
    />
  );
};

export default MuiTextField;
