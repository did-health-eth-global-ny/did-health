import React, { useState } from "react";
import { isArrayDef } from "./resourceDefintionBuilder";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

const labelSx = {
  fontWeight: "bold",
  paddingTop: "15px",
  paddingBottom: "3px",
};

type PropertyMetaDialogProps = {
  isOpen: boolean;
  onToggleOpen: () => void;
  elementDefinition: fhir4.ElementDefinition;
};

export default function PropertyMetaDialog({ isOpen, onToggleOpen, elementDefinition }: PropertyMetaDialogProps) {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  const onChangeTab = (e: any, tab: number) => {
    setSelectedTabIndex(tab);
  };

  // const handleConfirm = () => {
  //   onConfirm();
  //   onToggleOpen();
  // };

  // const handleSelectTemplateId = (templateId: string) => {
  //   onToggleOpen();
  // };

  return (
    <Dialog open={isOpen} fullWidth maxWidth="md" onClose={onToggleOpen} keepMounted={false}>
      <DialogTitle>Property Info</DialogTitle>
      <DialogContent sx={{ padding: 0, margin: 0 }}>
        <Tabs
          value={selectedTabIndex}
          onChange={onChangeTab}
          indicatorColor="secondary"
          textColor="inherit"
          sx={{ borderBottom: "1px solid rgb(230,230,230)" }}
        >
          <Tab label="Summary" sx={{ color: "text.primary" }} />
          <Tab label="Full Definition" sx={{ color: "text.primary" }} />
        </Tabs>

        {selectedTabIndex === 0 && (
          <Box sx={{ padding: "0 15px" }}>
            <Box sx={{ ...labelSx, marginTop: 0 }}>Path</Box>
            {elementDefinition.path}

            <Box sx={labelSx}>Data Type</Box>
            <Box sx={{ color: "secondary.main" }}>{elementDefinition.type?.map(t => t.code).join(", ")}</Box>

            <Box sx={labelSx}>Is Array</Box>
            {isArrayDef(elementDefinition) ? "Yes" : "No"}

            <Box sx={labelSx}>Note</Box>
            {elementDefinition.short}

            <Box sx={labelSx}>Description</Box>
            {elementDefinition.definition}

            <Box sx={labelSx}>Comment</Box>
            {elementDefinition.comment}
          </Box>
        )}

        {selectedTabIndex === 1 && (
          <Box component="pre" sx={{ padding: "5px", margin: 0, background: "rgb(240,240,240)" }}>
            {JSON.stringify(elementDefinition, null, 2)}
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onToggleOpen} color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
