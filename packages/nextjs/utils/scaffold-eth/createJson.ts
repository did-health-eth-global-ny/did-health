import { FHIRPatient } from "../../types/abitype/fhir";

export function createFHIRPatient(
  id: string,
  givenNames: string[],
  familyName: string,
  addressLines: string[],
  city: string,
  state: string,
  postalCode: string,
  country: string,
  emails: string[],
  phones: string[],
  gender: string,
  birthDate: string,
  identifierSystems: string[],
  identifierValues: string[]
): FHIRPatient {
  const identifier = identifierSystems.map((system, index) => ({
    system,
    value: identifierValues[index],
  }));

  const name = [
    {
      given: givenNames,
      family: familyName,
    },
  ];

  const address = [
    {
      line: addressLines,
      city,
      state,
      postalCode,
      country,
    },
  ];

  const telecom = [
    ...emails.map(email => ({
      system: "email",
      value: email,
    })),
    ...phones.map(phone => ({
      system: "phone",
      value: phone,
    })),
  ];

  const patient: FHIRPatient = {
    resourceType: "Patient",
    id,
    identifier,
    name,
    address,
    telecom,
    gender,
    birthDate,
  };

  return patient;
}


export default createFHIRPatient;
