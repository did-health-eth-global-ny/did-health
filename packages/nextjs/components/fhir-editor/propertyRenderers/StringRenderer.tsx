import React from "react";
import { StringProperty } from "../types";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

type StringRendererProps = {
  // property: StringProperty;
  value: any;
  updateValue: (val: string | number) => void;
  isNumber?: boolean;
};

export default function StringRenderer({ value, updateValue, isNumber }: StringRendererProps) {
  const handleValueChange = (e: any) => {
    const val = e.target.value;
    if (isNumber) {
      updateValue(parseFloat(val));
    } else {
      updateValue(val);
      // if (pattern) {
      //   console.log(pattern)
      // }
    }
  };

  return (
    <Box>
      <TextField
        type={isNumber ? "number" : undefined}
        size="small"
        value={value || ""}
        onChange={handleValueChange}
        fullWidth
      />
    </Box>
  );
}
