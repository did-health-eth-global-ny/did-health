import React from "react";
import Box from "@mui/material/Box";
import { NestedElementProperty, ResourceDefinitions } from "../types";
import { getResourceDefintionAtPath } from "../resourceDefintionBuilder";
import PropertyListRenderer from "../PropertyListRenderer";

type NestedElementRendererProps = {
  property: NestedElementProperty;
  fhirData: any;
  updateFhirData: (value: any) => void;
};

export default function NestedElementRenderer({
  property,
  fhirData,
  updateFhirData,
}: NestedElementRendererProps) {
  return (
    <Box>
      <PropertyListRenderer
        properties={property.properties}
        fhirData={fhirData}
        updateFhirData={updateFhirData}
      />
    </Box>
  );
}
