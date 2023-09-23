import React from "react";
import ResourceRenderer from "../ResourceRenderer";
import { getResourceDefintionAtPath } from "../resourceDefintionBuilder";
import { ElementProperty, ResourceDefinitions } from "../types";
import Box from "@mui/material/Box";

type ElementRendererProps = {
  property: ElementProperty;
  resourceDefinitions: ResourceDefinitions;
  fhirData: any;
  updateFhirData: (value: any) => void;
};

export default function ElementRenderer({
  property,
  resourceDefinitions,
  fhirData,
  updateFhirData,
}: ElementRendererProps) {
  const definition = getResourceDefintionAtPath(property.referencePath, resourceDefinitions);

  if (!definition) {
    return <Box>Unable to resolve Strucutre Definition for: {property.referencePath}</Box>;
  }

  return (
    <Box>
      <ResourceRenderer
        resourcePath={property.referencePath}
        resourceDefinitions={resourceDefinitions}
        fhirData={fhirData}
        updateFhirData={updateFhirData}
      />
    </Box>
  );
}
