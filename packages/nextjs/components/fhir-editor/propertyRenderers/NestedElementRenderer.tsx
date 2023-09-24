import React from "react";
import PropertyListRenderer from "../PropertyListRenderer.1";
// import { getResourceDefintionAtPath } from "../resourceDefintionBuilder";
import { NestedElementProperty } from "../types";
import Box from "@mui/material/Box";

type NestedElementRendererProps = {
  property: NestedElementProperty;
  fhirData: any;
  updateFhirData: (value: any) => void;
};

export default function NestedElementRenderer({ property, fhirData, updateFhirData }: NestedElementRendererProps) {
  return (
    <Box>
      <PropertyListRenderer properties={property.properties} fhirData={fhirData} updateFhirData={updateFhirData} />
    </Box>
  );
}
