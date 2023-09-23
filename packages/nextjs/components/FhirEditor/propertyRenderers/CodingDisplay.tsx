import React, { useState } from "react";
import Box from "@mui/material/Box";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

type CodeableConceptProps = {
  coding: fhir4.Coding;
  onEdit: () => void;
};

export default function CodeableConcept({
  coding,
  onEdit,
}: CodeableConceptProps) {
  const onDelete = () => {
    console.log("onDelete");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          fontSize: "15px",
          alignItems: "center",
        }}
      >
        <Box sx={{ color: "#0D47A1", paddingRight: "5px" }}>{coding.code}</Box>
        {coding.display && (
          <Box sx={{ paddingRight: "5px" }}>{coding.display}</Box>
        )}
        <Box
          sx={{
            color: "rgb(130,130,130)",
            paddingRight: "5px",
            fontSize: "13px",
          }}
        >
          [{coding.system}]
        </Box>
      </Box>

      <Box>
        <EditOutlinedIcon
          onClick={onEdit}
          sx={{
            paddingLeft: "5px",
            fontWeight: 300,
            cursor: "pointer",
            fontSize: "15px",
            color: "rgb(160,160,160)",
            ":hover": {
              color: "#FFA726",
            },
          }}
        />
        <DeleteOutlineIcon
          onClick={onDelete}
          sx={{
            paddingLeft: "5px",
            fontWeight: 300,
            cursor: "pointer",
            fontSize: "15px",
            color: "rgb(160,160,160)",
            ":hover": {
              color: "#EF5350",
            },
          }}
        />
      </Box>
    </Box>
  );
}
