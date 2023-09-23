export enum PropertyTypesEnum {
  // Date = 'Date',
  Element = "Element",
  NestedElement = "NestedElement",
  String = "String",
  Boolean = "Boolean",
  DateTime = "DateTime",
  Decimal = "Decimal",
  Uri = "Uri",
  Choice = "Choice",
  NotFound = "NotFound",
  Array = "Array",
  // Boolean = 'Boolean',
  // Instant = 'Instant',
  // TextDisplay = 'TextDisplay',
  // Duration = 'Duration',
  // Period = 'Period',
  // TextEdit = 'TextEdit',
  // Enum = 'Enum',
}

interface BaseProperty {
  propertyType: PropertyTypesEnum;
  propertyName: string;
  baseChoiceType?: string;
  definition: fhir4.ElementDefinition;
}

export interface ArrayProperty extends BaseProperty {
  propertyType: PropertyTypesEnum.Array;
  items: ResourceProperty;
}

export interface ElementProperty extends BaseProperty {
  propertyType: PropertyTypesEnum.Element;
  referencePath: string;
}

export interface NestedElementProperty extends BaseProperty {
  propertyType: PropertyTypesEnum.NestedElement;
  properties: ResourceProperty[];
}

export interface StringProperty extends BaseProperty {
  propertyType: PropertyTypesEnum.String;
}

export interface BooleanProperty extends BaseProperty {
  propertyType: PropertyTypesEnum.Boolean;
}

export interface DecimalProperty extends BaseProperty {
  propertyType: PropertyTypesEnum.Decimal;
}

export interface UriProperty extends BaseProperty {
  propertyType: PropertyTypesEnum.Uri;
}

export interface DateTimeProperty extends BaseProperty {
  propertyType: PropertyTypesEnum.DateTime;
}

export interface ChoiceTypeProperty extends BaseProperty {
  propertyType: PropertyTypesEnum.Choice;
  choices: ResourceProperty[];
}

export interface NotFoundProperty extends BaseProperty {
  propertyType: PropertyTypesEnum.NotFound;
  errorMessage: string;
}

// export interface ResourceProperty {
//   viewType: PropertyTypesEnum;
//   dataType: string;
//   multiType: boolean;
//   propertyName: string;
//   reference?: string;
// }

export type ResourceProperty =
  | ArrayProperty
  | ElementProperty
  | NestedElementProperty
  | StringProperty
  | BooleanProperty
  | DecimalProperty
  | UriProperty
  | DateTimeProperty
  | ChoiceTypeProperty
  | NotFoundProperty;

export interface ResourceDefintion {
  properties: ResourceProperty[];
}

export type ResourceDefinitions = Record<string, ResourceDefintion>;

// export interface ResourceDefinition {
//   properties: StructureProperty[],
//   elements: Record<string, ResourceElement>
// }
