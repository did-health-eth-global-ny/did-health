import React, { useCallback, useState } from "react";
import { ResourceProperty } from "./types";
import Box from "@mui/material/Box";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PropertyValueRenderer from "./PropertyValueRenderer";
import PropertyDialog from "./PropertyDialog";

type PropertyRendererProps = {
  property: ResourceProperty;
  fhirData: any;
  updateFhirData: (value: any) => void;
};

export default function PropertyRenderer({
  property,
  fhirData,
  updateFhirData,
}: PropertyRendererProps) {
  const [metaDialogOpen, setMetaDialogOpen] = useState(false);

  const toggleMetaDialog = () => setMetaDialogOpen(!metaDialogOpen);

  const deleteProperty = useCallback(() => {
    updateFhirData(undefined);
  }, [updateFhirData]);

  return (
    <Box>
      <Box
        sx={{
          fontWeight: "bold",
          fontSize: "14px",
          paddingTop: "10px",
          paddingBottom: "2px",
          display: "flex",
          ":hover": {
            ".property-icon": {
              display: "unset",
            },
          },
        }}
      >
        {property.propertyName}

        <InfoOutlinedIcon
          onClick={toggleMetaDialog}
          className="property-icon"
          sx={{
            paddingLeft: "5px",
            fontWeight: 300,
            cursor: "pointer",
            fontSize: "15px",
            color: "rgb(160,160,160)",
            display: "none",
            ":hover": {
              color: "#2196F3",
            },
          }}
        />
        <DeleteOutlineIcon
          onClick={deleteProperty}
          className="property-icon"
          sx={{
            paddingLeft: "5px",
            fontWeight: 300,
            cursor: "pointer",
            fontSize: "15px",
            color: "rgb(160,160,160)",
            display: "none",
            ":hover": {
              color: "#EF5350",
            },
          }}
        />
      </Box>

      <PropertyValueRenderer
        property={property}
        fhirData={fhirData}
        updateFhirData={updateFhirData}
      />
      <PropertyDialog
        isOpen={metaDialogOpen}
        onToggleOpen={toggleMetaDialog}
        elementDefinition={property.definition}
      />
    </Box>
  );
}
