import React, { useState } from "react";
import Box from "@mui/material/Box";
// import last from 'lodash/last'
import {
  buildResourceDefintions,
  getResourceDefintionAtPath,
  makeResourcePath,
} from "./resourceDefintionBuilder";
import ElementPropertyPicker from "./ElementPropertyPicker";
import PropertyRenderer from "./PropertyRenderer";
import { ResourceDefinitions } from "./types";
import PropertyListRenderer from "./PropertyListRenderer";

type ResourceRendererProps = {
  resourcePath: string;
  fhirData: any;
  resourceDefinitions: ResourceDefinitions;
  updateFhirData: (value: any) => void;
};

export default function ResourceRenderer({
  resourcePath,
  fhirData,
  updateFhirData,
  resourceDefinitions,
}: ResourceRendererProps) {
  const [isOpen, setIsOpen] = useState(true);

  const resourceDefinition = getResourceDefintionAtPath(
    resourcePath,
    resourceDefinitions
  );

  if (!resourceDefinition) {
    return <div>Resouce Definition Not Found: {resourcePath}</div>;
  }

  return (
    <PropertyListRenderer
      fhirData={fhirData}
      updateFhirData={updateFhirData}
      properties={resourceDefinition.properties}
    />
  );
}
