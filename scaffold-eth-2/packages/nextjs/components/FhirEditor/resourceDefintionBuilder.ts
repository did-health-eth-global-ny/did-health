// import profileTypes from "./profile-types.json";
import flatten from "lodash/flatten";

import {
  ResourceProperty,
  PropertyTypesEnum,
  ResourceDefinitions,
  ResourceDefintion,
} from "./types";

export function makeResourcePath(name: string): string {
  return `#/${name}`;
}

export function getNameFromPath(path: string): string {
  const items = path.split("/");
  const name = items[items.length - 1];
  return name;
}

function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function isArrayDef(elementDef: fhir4.ElementDefinition): boolean {
  if (!elementDef.max) {
    return false;
  }
  if (elementDef.max === "0" || elementDef.max === "1") {
    return false;
  }
  return true;
}

export function getResourceDefintionAtPath(
  path: string,
  resourceDefinitions: ResourceDefinitions
): ResourceDefintion {
  const name = getNameFromPath(path);
  return resourceDefinitions[name];
}

function parseDefinition(
  structureDefinition: fhir4.StructureDefinition,
  resourceDefinitions: ResourceDefinitions,
  depth: number,
  structureDefinitionReferncesBundle: fhir4.Bundle
): ResourceDefinitions {
  let nextResourceDefinitions = { ...resourceDefinitions };

  // const resourcePath = makeResourcePath(structureDefinition.name)
  const resourceName = structureDefinition.name;

  // Return if resource has already been added
  if (resourceDefinitions[resourceName] || depth > 5) {
    return nextResourceDefinitions;
  }

  function collectNestedElements(
    path: string,
    structureDefinition: fhir4.StructureDefinition
  ): fhir4.ElementDefinition[] {
    const pathLen = path.split(".");

    return (
      structureDefinition.snapshot?.element?.filter((element) => {
        const elementPath = element.path.split(".");
        return (
          pathLen.length + 1 === elementPath.length &&
          element.path.startsWith(path)
        );
      }) || []
    );
  }

  function getPropertyFromCode(
    propertyName: string,
    elementType: fhir4.ElementDefinitionType,
    definition: fhir4.ElementDefinition,
    isInNestedArray: boolean
  ): ResourceProperty {
    if (!isInNestedArray && isArrayDef(definition)) {
      const nestedProperty = getPropertyFromCode(
        propertyName,
        elementType,
        definition,
        true
      );

      return {
        propertyType: PropertyTypesEnum.Array,
        propertyName: propertyName,
        definition: definition,
        items: nestedProperty,
      };
    }

    const elementCode = elementType.code;

    let newProperty: ResourceProperty | null = null;

    if (
      elementCode === "http://hl7.org/fhirpath/System.String" ||
      elementCode === "string"
    ) {
      newProperty = {
        propertyType: PropertyTypesEnum.String,
        propertyName: propertyName,
        definition: definition,
      };
    } else if (elementCode === "boolean") {
      newProperty = {
        propertyType: PropertyTypesEnum.Boolean,
        propertyName: propertyName,
        definition: definition,
      };
    } else if (elementCode === "dateTime") {
      newProperty = {
        propertyType: PropertyTypesEnum.DateTime,
        propertyName: propertyName,
        definition: definition,
      };
    } else if (elementCode === "uri") {
      newProperty = {
        propertyType: PropertyTypesEnum.Uri,
        propertyName: propertyName,
        definition: definition,
      };
    } else if (elementCode === "decimal") {
      newProperty = {
        propertyType: PropertyTypesEnum.Decimal,
        propertyName: propertyName,
        definition: definition,
      };
    } else if (elementCode === "code") {
      newProperty = {
        propertyType: PropertyTypesEnum.String,
        propertyName: propertyName,
        definition: definition,
      };
    } else if (elementCode === "canonical") {
      newProperty = {
        propertyType: PropertyTypesEnum.String,
        propertyName: propertyName,
        definition: definition,
      };
    } else if (elementCode === "Extension") {
      console.log("FIX ME: Skipping Extension");
    } else if (elementCode === "BackboneElement") {
      const nestedElementDefinitions = collectNestedElements(
        definition.path,
        structureDefinition
      );

      const properties = flatten(
        nestedElementDefinitions.map(transformElementDefinitionToProperty)
      );

      newProperty = {
        propertyType: PropertyTypesEnum.NestedElement,
        propertyName: propertyName,
        definition: definition,
        properties: properties,
      };
    } else {
      const foundDef = structureDefinitionReferncesBundle.entry?.find((res) => {
        return res.resource?.id === elementCode;
      });

      if (!foundDef) {
        console.warn(
          `unable to find defintion for elementCode: ${elementCode}`
        );
        // else {
        //   if (elementCode === "Resource") {
        //   } else {
        //     // console.log('NOT found', elementCode)
        //   }
        // }
      } else {
        const foundDefintion = foundDef.resource as fhir4.StructureDefinition;

        const linkedDefintions = parseDefinition(
          foundDefintion,
          nextResourceDefinitions,
          depth + 1,
          structureDefinitionReferncesBundle
        );

        nextResourceDefinitions = {
          ...nextResourceDefinitions,
          ...linkedDefintions,
        };

        // For references
        //   "targetProfile": [
        //     "http://hl7.org/fhir/us/qicore/StructureDefinition/qicore-encounter"
        // ]

        newProperty = {
          propertyType: PropertyTypesEnum.Element,
          propertyName: propertyName,
          referencePath: makeResourcePath(elementCode),
          definition: definition,
        };
      }
    }

    if (!newProperty) {
      newProperty = {
        propertyType: PropertyTypesEnum.NotFound,
        propertyName: propertyName,
        errorMessage: `Unable to resolve property "${propertyName}" of type: ${elementCode}`,
        definition: definition,
      };
    }

    return newProperty;
  }

  function transformElementDefinitionToProperty(
    element: fhir4.ElementDefinition
  ): ResourceProperty[] {
    const properties: ResourceProperty[] = [];

    const paths = element.path.split(".");
    const propertyName = paths[paths.length - 1];

    if (!element.type || element.type.length === 0) {
      console.warn('Expected a "type" property on element', element);
    } else if (element.type.length === 1) {
      let elementType = element.type[0];

      const property = getPropertyFromCode(
        propertyName,
        elementType,
        element,
        false
      );
      if (property) {
        properties.push(property);
      }

      // if (paths.length !== 2) {
      //   console.warn("Expected element property path with length 2");
      // } else {

      // }
    }
    // ChoiceType element with multiple types
    else {
      if (!element.id?.endsWith("[x]")) {
        console.warn(`expected a [x] modifier for id: ${element.id}`);
      } else {
        // let elementCode = element.type[0].code;

        // const paths = element.path.split(".");
        // const lastPath = paths[paths.length - 1];
        const slicedPropertyName = propertyName.slice(0, -3);

        element.type.forEach((typeElement) => {
          // const propertyName = paths[1];
          const nestedPropertyName = `${slicedPropertyName}${capitalizeFirstLetter(
            typeElement.code
          )}`;
          const property = getPropertyFromCode(
            nestedPropertyName,
            typeElement,
            element,
            false
          );
          if (property) {
            properties.push({
              ...property,
              baseChoiceType: slicedPropertyName,
            });
          }
        });
      }
    }

    return properties;
  }

  const firstTierElementDefinitions =
    structureDefinition.snapshot?.element.filter((element) => {
      const paths = element.path.split(".");
      return paths.length === 2;
    }) || [];

  const properties = flatten(
    firstTierElementDefinitions.map(transformElementDefinitionToProperty)
  );

  // structureDefinition.snapshot?.element.forEach((element) => {
  //   if (!element.type || element.type.length === 0) {
  //     console.warn('Expected a "type" property on element', element);
  //   } else if (element.type.length === 1) {
  //     let elementType = element.type[0];
  //     const paths = element.path.split(".");

  //     if (paths.length !== 2) {
  //       console.warn("Expected element property path with length 2");
  //     } else {
  //       const propertyName = paths[1];
  //       const property = getPropertyFromCode(
  //         propertyName,
  //         elementType,
  //         element,
  //         false
  //       );
  //       if (property) {
  //         properties.push(property);
  //       }
  //     }
  //   }
  //   // ChoiceType element with multiple types
  //   else {
  //     if (!element.id?.endsWith("[x]")) {
  //       console.warn(`expected a [x] modifier for id: ${element.id}`);
  //     } else {
  //       // let elementCode = element.type[0].code;

  //       const paths = element.path.split(".");
  //       const lastPath = paths[paths.length - 1];
  //       const propertyName = lastPath.slice(0, -3);

  //       element.type.forEach((typeElement) => {
  //         // const propertyName = paths[1];
  //         const nestedPropertyName = `${propertyName}${capitalizeFirstLetter(
  //           typeElement.code
  //         )}`;
  //         const property = getPropertyFromCode(
  //           nestedPropertyName,
  //           typeElement,
  //           element,
  //           false
  //         );
  //         if (property) {
  //           properties.push({
  //             ...property,
  //             baseChoiceType: propertyName,
  //           });
  //         }
  //       });
  //     }
  //   }
  // });

  nextResourceDefinitions[resourceName] = {
    properties: properties,
  };
  // return { properties: properties, elements: nextResourceDefinitions }

  return nextResourceDefinitions;
}

export function buildResourceDefintions(
  structureDefinitionId: string,
  structureDefinitionBundle: fhir4.Bundle
): {
  rootPath: string;
  resourceDefinitions: ResourceDefinitions;
} {
  const foundResource = structureDefinitionBundle.entry?.find((entry) => {
    return entry.resource?.id === structureDefinitionId;
  });

  if (
    !foundResource ||
    foundResource.resource?.resourceType !== "StructureDefinition"
  ) {
    throw new Error(
      `Unable to find structure definition with id '${structureDefinitionId}' in bundle`
    );
  }

  const structureDefinition =
    foundResource.resource as fhir4.StructureDefinition;

  return {
    rootPath: makeResourcePath(structureDefinition.name),
    resourceDefinitions: parseDefinition(
      structureDefinition,
      {},
      0,
      structureDefinitionBundle
    ),
  };
}
