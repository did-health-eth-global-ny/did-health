export type FHIRPatient = {
  id: string;
  did: string;
  resourceType: "Patient";
  identifier?: {
    use?: "usual" | "official" | "temp" | "secondary" | string;
    system?: string;
    value: string;
  }[];
  name?: {
    family: string;
    given: string;
  }[];
  telecom?: {
    system: "phone" | "email" | string;
    value: string;
    use?: "home" | "work" | "temp" | "old" | string;
  }[];
  address?: {
    line?: string[];
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  }[];
  birthDate?: string;
  gender?: "male" | "female" | "other" | "unknown";
  extension?: {
    url: string;
    valueString?: string;
  }[]; // Used to capture extra fields like birthsex and ethnicity
};
