import React, { ReactNode } from "react";
import ElementPropertyPicker from "./ElementPropertyPicker";
import ListStyleWrapper from "./ListStyleWrapper";
import PropertyRenderer from "./PropertyRenderer";
import { buildResourceDefintions, getResourceDefintionAtPath, makeResourcePath } from "./resourceDefintionBuilder";
import { ResourceProperty } from "./types";
import Box from "@mui/material/Box";

type PropertyListRendererProps = {
  fhirData: any;
  updateFhirData: (value: any) => void;
  properties: ResourceProperty[];
};

export default function PropertyListRenderer({ fhirData, updateFhirData, properties }: PropertyListRendererProps) {
  const existingKeys = new Set(Object.keys(fhirData || {}));

  const propertyViews = properties.map((property, index) => {
    if (!existingKeys.has(property.propertyName)) {
      return null;
    }

    const propertyFhir = fhirData[property.propertyName];

    /* eslint-disable */
    const updateInnerProperty = (value: any) => {
      const nextFhirData = { ...fhirData };
      if (value === undefined) {
        delete nextFhirData[property.propertyName];
      } else {
        nextFhirData[property.propertyName] = value;
      }
      updateFhirData(nextFhirData);
    };

    return (
      <li key={property.propertyName}>
        <PropertyRenderer property={property} fhirData={propertyFhir} updateFhirData={updateInnerProperty} />
      </li>
    );
  });
}

/* eslint-disable */
