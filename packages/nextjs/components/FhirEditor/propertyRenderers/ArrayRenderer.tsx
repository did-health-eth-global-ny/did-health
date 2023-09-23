import React, { useState } from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import compact from "lodash/compact";

// import Button from "@mui/material/Button";
// import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
// import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { ArrayProperty } from "../types";
import PropertyValueRenderer from "../PropertyValueRenderer";
import ListStyleWrapper from "../ListStyleWrapper";

type ArrayRendererProps = {
  property: ArrayProperty;
  value?: any[];
  updateValue: (val: any[]) => void;
};

export default function ArrayRenderer({
  value,
  updateValue,
  property,
}: ArrayRendererProps) {
  const values = value || [];

  const onUpdateIndex = (index: number, value: any) => {
    const nextVals = [...values];
    nextVals[index] = value;
    updateValue(nextVals);
  };

  const addEmptyValue = () => {
    const nextVals = [...values];
    nextVals.push(null);
    updateValue(nextVals);
  };

  const onDeleteVal = (index: number) => {
    const nextVals = [...values];
    nextVals[index] = null;
    updateValue(compact(nextVals));
  };

  return (
    <Box>
      <ListStyleWrapper>
        {values.map((value: any, index) => (
          <Box component="li" className="dark" sx={{}}>
            <Box
              sx={{
                paddingLeft: "7px",
                paddingBottom: "4px",
                color: "rgb(100,100,100)",
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                ":hover": {
                  ".array-row-icon": {
                    display: "unset",
                  },
                },
              }}
            >
              <Box sx={{}}>{index + 1})</Box>

              <DeleteOutlineIcon
                className="array-row-icon"
                onClick={() => onDeleteVal(index)}
                sx={{
                  paddingLeft: "5px",
                  cursor: "pointer",
                  fontSize: "14px",
                  color: "rgb(130,130,130)",
                  display: "none",
                  ":hover": {
                    color: "#EF5350",
                  },
                }}
              />
            </Box>

            <PropertyValueRenderer
              property={property.items}
              fhirData={value}
              updateFhirData={(nextVal) => onUpdateIndex(index, nextVal)}
            />
          </Box>
        ))}
        <Box component="li" className="dark">
          <Chip
            label="Add Array Value"
            size="small"
            onClick={addEmptyValue}
            sx={{
              marginTop: "5px",
              background: "#BBDEFB",
              fontSize: "11px",
              color: "#0D47A1",
            }}
            icon={<AddIcon sx={{ fontSize: "20px" }} />}
          />
        </Box>
      </ListStyleWrapper>
    </Box>
  );
}
