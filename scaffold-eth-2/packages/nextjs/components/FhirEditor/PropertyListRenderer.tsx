import React, { ReactNode } from "react";
import Box from "@mui/material/Box";
import ListStyleWrapper from "./ListStyleWrapper";
import {
  buildResourceDefintions,
  getResourceDefintionAtPath,
  makeResourcePath,
} from "./resourceDefintionBuilder";
import ElementPropertyPicker from "./ElementPropertyPicker";
import PropertyRenderer from "./PropertyRenderer";
import { ResourceProperty } from "./types";

type PropertyListRendererProps = {
  fhirData: any;
  updateFhirData: (value: any) => void;
  properties: ResourceProperty[];
};

export default function PropertyListRenderer({
  fhirData,
  updateFhirData,
  properties,
}: PropertyListRendererProps) {
  const existingKeys = new Set(Object.keys(fhirData || {}));

  const propertyViews = properties.map((property, index) => {
    if (!existingKeys.has(property.propertyName)) {
      return null;
    }

    const propertyFhir = fhirData[property.propertyName];

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
      <li>
        <PropertyRenderer
          key={property.propertyName}
          property={property}
          fhirData={propertyFhir}
          updateFhirData={updateInnerProperty}
        />
      </li>
    );
  });

  return (
    <Box>
      <ListStyleWrapper>
        {propertyViews}

        <Box component="li">
          <Box sx={{ paddingTop: "7px" }}>
            <ElementPropertyPicker
              properties={properties}
              existingKeys={existingKeys}
              updateFhirData={updateFhirData}
              fhirData={fhirData}
              isSmall
            />
          </Box>
        </Box>
      </ListStyleWrapper>
    </Box>
  );
}
