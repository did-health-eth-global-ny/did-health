import { FHIRPatient } from "../../types/abitype/fhir";

const createFHIRPatient = (
  familyName: string,
  givenName: string,
  addressLine: string[],
  city: string,
  state: string,
  postalCode: string,
  country: string,
  email: string,
  phone: string,
  identifierValue: string,
  birthsex: string,
  gender: "male" | "female" | "other" | "unknown",

  birthdate: string,
): FHIRPatient => {
  return {
    resourceType: "Patient",
    identifier: [{ value: identifierValue }],
    name: [{ family: familyName, given: [givenName] }],
    telecom: [
      { system: "email", value: email },
      { system: "phone", value: phone },
    ],
    address: [
      {
        line: addressLine,
        city: city,
        state: state,
        postalCode: postalCode,
        country: country,
      },
    ],
    birthDate: birthdate,
    gender: gender,
    extension: [{ url: "http://example.org/birthsex", valueString: birthsex }],
  };
};
export default createFHIRPatient;
