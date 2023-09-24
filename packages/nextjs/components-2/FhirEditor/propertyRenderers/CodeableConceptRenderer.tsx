import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import CodingDisplay from "./CodingDisplay";
import CodingEdit from "./CodingEdit";
import ListStyleWrapper from "../ListStyleWrapper";
import AddIcon from "@mui/icons-material/Add";

type CodeableConceptProps = {
  value?: fhir4.CodeableConcept;
  updateValue: (val: fhir4.CodeableConcept) => void;
};

export default function CodeableConcept({
  value,
  updateValue,
}: CodeableConceptProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const startEditing = (index: number) => {
    setEditIndex(index);
  };

  const startAddingNew = () => setIsAdding(true);
  const onCancelAdding = () => setIsAdding(false);

  const coding = value?.coding || [];

  const onAddCoding = (nextCoding: fhir4.Coding) => {
    const nextCodingArr = [...(value?.coding || [])];
    nextCodingArr.push(nextCoding);
    updateValue({
      ...(value || {}),
      coding: nextCodingArr,
    });
    onCancelAdding();
  };

  const onUpdateEditCoding = (nextCoding: fhir4.Coding) => {
    const nextCodingArr = [...coding];
    if (Number.isInteger(editIndex) && editIndex !== null) {
      nextCodingArr[editIndex] = nextCoding;
      updateValue({
        ...value,
        coding: nextCodingArr,
      });
    }
    setEditIndex(null);
  };

  useEffect(() => {
    if (!value || !value.coding || value.coding.length === 0) {
      startAddingNew();
    }
  }, []);

  return (
    <Box>
      <ListStyleWrapper>
        {coding.map((codingRow, index) => (
          <Box component="li" className="dark">
            <Box sx={{ paddingBottom: "4px" }}>
              {editIndex === index ? (
                <CodingEdit
                  initCoding={codingRow}
                  onConfirmCoding={onUpdateEditCoding}
                  isUpdating
                  onCancel={() => setEditIndex(null)}
                />
              ) : (
                <CodingDisplay
                  coding={codingRow}
                  onEdit={() => startEditing(index)}
                />
              )}
            </Box>
          </Box>
        ))}

        {isAdding && (
          <Box component="li" className="dark">
            <CodingEdit
              initCoding={{}}
              onConfirmCoding={onAddCoding}
              onCancel={onCancelAdding}
            />
          </Box>
        )}

        {!isAdding && !Number.isInteger(editIndex) && (
          <Box
            component="li"
            className="dark"
            sx={{
              fontSize: "13px",
              color: "rgb(130,130,130)",
              // paddingTop: "5px",
            }}
          >
            <Chip
              label="Add Code"
              size="small"
              onClick={startAddingNew}
              sx={{
                marginTop: "5px",
                background: "#BBDEFB",
                fontSize: "11px",
                color: "#0D47A1",
              }}
              icon={<AddIcon sx={{ fontSize: "20px" }} />}
            />
          </Box>
        )}
      </ListStyleWrapper>
    </Box>
  );
}
