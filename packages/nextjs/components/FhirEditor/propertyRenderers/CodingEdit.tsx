import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import CodingDisplay from "./CodingDisplay";
import ListStyleWrapper from "../ListStyleWrapper";
import AddIcon from "@mui/icons-material/Add";

type CodeableConceptProps = {
  initCoding: fhir4.Coding;
  onConfirmCoding: (val: fhir4.Coding) => void;
  onCancel: () => void;
  isUpdating?: boolean;
};

export default function CodeableConcept({
  initCoding,
  onConfirmCoding,
  onCancel,
  isUpdating,
}: CodeableConceptProps) {
  const [coding, setCoding] = useState(initCoding);

  const handleCodeChange = (e: any) => {
    const val = e.target.value;
    setCoding({
      ...coding,
      code: val,
    });
  };

  const handleSystemChange = (e: any) => {
    const val = e.target.value;
    setCoding({
      ...coding,
      system: val,
    });
  };

  const handleDisplayChange = (e: any) => {
    const val = e.target.value;
    setCoding({
      ...coding,
      display: val,
    });
  };

  const onAddCode = () => {
    // setIsAdding(true);
    // setNextCoding({
    //   code: "",
    //   display: "",
    //   system: "",
    // });
    onConfirmCoding(coding);
  };

  useEffect(() => {
    // if (!value || !value.coding || value.coding.length === 0) {
    //   onAddCode();
    // }
  }, []);

  // const onCancel = () => {
  //   // setIsAdding(false);
  //   // setNextCoding(null);
  // };

  return (
    <Box
      sx={{
        borderRadius: "5px",
        padding: "7px",
        border: "1px solid rgb(230,230,230)",
      }}
    >
      <Box>
        <TextField
          size="small"
          value={coding.code}
          onChange={handleCodeChange}
          label="Code"
          fullWidth
          sx={{ fontSize: "13px" }}
        />
      </Box>
      <Box sx={{ paddingTop: "7px" }}>
        <TextField
          size="small"
          value={coding.system}
          onChange={handleSystemChange}
          label="System"
          fullWidth
          sx={{ fontSize: "13px" }}
        />
      </Box>
      <Box sx={{ paddingTop: "7px" }}>
        <TextField
          size="small"
          value={coding.display}
          onChange={handleDisplayChange}
          label="Display"
          fullWidth
          sx={{ fontSize: "13px" }}
        />
      </Box>
      <Button
        onClick={onAddCode}
        size="small"
        variant="contained"
        sx={{ marginTop: "5px", textTransform: "none" }}
      >
        {isUpdating ? "Update Code" : "Create Code"}
      </Button>

      <Button
        onClick={onCancel}
        size="small"
        sx={{ marginTop: "5px", marginLeft: "5px", textTransform: "none" }}
      >
        Cancel
      </Button>
    </Box>
  );
}
