import React, { useCallback, useContext } from "react";
import {
  PropertyTypesEnum,
  ResourceProperty,
  ResourceDefinitions,
} from "./types";
import Box from "@mui/material/Box";
import StringRenderer from "./propertyRenderers/StringRenderer";
import ElementRenderer from "./propertyRenderers/ElementRenderer";
import DateTimeRenderer from "./propertyRenderers/DateTimeRenderer";
import CodeableConceptRenderer from "./propertyRenderers/CodeableConceptRenderer";
import ArrayRenderer from "./propertyRenderers/ArrayRenderer";
import NestedElementRenderer from "./propertyRenderers/NestedElementRenderer";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { FhirEditorContext } from "./FhirEditor";
import { getNameFromPath } from "./resourceDefintionBuilder";

type PropertyValueRendererProps = {
  property: ResourceProperty;
  fhirData: any;
  updateFhirData: (value: any) => void;
};

export default function PropertyValueRenderer({
  property,
  fhirData,
  updateFhirData,
}: PropertyValueRendererProps) {
  const { componentOverrides, resourceDefinitions } =
    useContext(FhirEditorContext);

  if (property.propertyType === PropertyTypesEnum.Array) {
    return (
      <ArrayRenderer
        property={property}
        value={fhirData}
        updateValue={updateFhirData}
      />
    );
  }

  if (property.propertyType === PropertyTypesEnum.String) {
    return (
      <StringRenderer
        // property={property}
        value={fhirData}
        updateValue={updateFhirData}
      />
    );
  }
  if (property.propertyType === PropertyTypesEnum.Decimal) {
    return (
      <StringRenderer
        // property={property}
        value={fhirData}
        updateValue={updateFhirData}
        isNumber
      />
    );
  }

  if (property.propertyType === PropertyTypesEnum.Uri) {
    return (
      <StringRenderer
        // property={property}
        value={fhirData}
        updateValue={updateFhirData}
      />
    );
  }

  if (property.propertyType === PropertyTypesEnum.DateTime) {
    return <DateTimeRenderer value={fhirData} updateValue={updateFhirData} />;
  }

  if (property.propertyType === PropertyTypesEnum.NestedElement) {
    return (
      <NestedElementRenderer
        property={property}
        fhirData={fhirData}
        updateFhirData={updateFhirData}
      />
    );
  }

  if (property.propertyType === PropertyTypesEnum.Element) {
    if (componentOverrides) {
      const componentName = getNameFromPath(property.referencePath);

      if (componentName in componentOverrides) {
        return (
          <>{componentOverrides[componentName](fhirData, updateFhirData)}</>
        );
      }
    }

    if (property.referencePath === "#/CodeableConcept") {
      return (
        <CodeableConceptRenderer
          value={fhirData}
          updateValue={updateFhirData}
        />
      );
    }

    return (
      <ElementRenderer
        property={property}
        resourceDefinitions={resourceDefinitions}
        fhirData={fhirData}
        updateFhirData={updateFhirData}
      />
    );
  }

  return (
    <Box>
      Not Configured: {property.propertyName} with type: {property.propertyType}
    </Box>
  );
}
