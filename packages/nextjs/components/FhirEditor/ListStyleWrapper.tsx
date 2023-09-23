import React, { ReactNode } from "react";
import Box from "@mui/material/Box";

type ListStyleWrapperProps = {
  children: ReactNode;
  borderColor?: string;
};

export default function ListStyleWrapper({
  children,
  borderColor = "rgb(230,230,230)",
}: ListStyleWrapperProps) {
  const primaryColor = "#FFD54F";
  const accentColor = "#90CAF9";

  return (
    <Box
      component="ul"
      sx={{
        padding: 0,
        margin: 0,
        listStyleType: "none",
        "& li": {
          position: "relative",
          paddingBottom: "0px",
          marginLeft: "15px",
          paddingLeft: "15px",
        },

        "& li:before": {
          position: "absolute",
          height: "100%",
          left: 0,
          width: 0,
          content: "''",
          borderBottom: 1,
          borderLeft: 1,
          borderColor: primaryColor,
        },
        "& .dark:before": {
          borderColor: accentColor,
        },

        "& li:last-child:before": {
          height: "18px",
          width: "13px",
          borderBottom: 0,
          borderColor: primaryColor,
        },
        "& .dark:last-child:before": {
          borderColor: accentColor,
          height: "9px",
        },

        "& li:after": {
          position: "absolute",
          top: "0px",
          height: "18px",
          left: 0,
          width: "13px",
          content: "''",
          borderBottom: 1,
          borderColor: primaryColor,
        },
        "& .dark:after": {
          borderColor: accentColor,
          height: "9px",
        },
        "& li:last-child:after": {
          borderBottom: 1,
          borderColor: primaryColor,
        },
        "& .dark:last-child:after": {
          borderColor: accentColor,
        },
      }}
    >
      {children}
    </Box>
  );
}
