export type FHIRPatient = {
  resourceType: "Patient";
  id?: string;
  identifier?: Array<{
    system?: string;
    value?: string;
  }>;
  active?: boolean;
  name?: Array<{
    use?: string;
    family?: string;
    given?: Array<string>;
    prefix?: Array<string>;
    suffix?: Array<string>;
  }>;
  telecom?: Array<{
    system?: string;
    value?: string;
    use?: string;
    rank?: number;
  }>;
  gender?: string;
  birthDate?: string;
  deceasedBoolean?: boolean;
  address?: Array<{
    use?: string;
    type?: string;
    text?: string;
    line?: Array<string>;
    city?: string;
    district?: string;
    state?: string;
    postalCode?: string;
    country?: string;
    period?: {
      start?: string;
      end?: string;
    };
  }>;
  maritalStatus?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
    text?: string;
  };
  multipleBirthBoolean?: boolean;
  photo?: Array<{
    contentType?: string;
    data?: string;
  }>;
  contact?: Array<{
    relationship?: Array<{
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
      text?: string;
    }>;
    name?: {
      use?: string;
      family?: string;
      given?: Array<string>;
      prefix?: Array<string>;
      suffix?: Array<string>;
    };
    telecom?: Array<{
      system?: string;
      value?: string;
      use?: string;
      rank?: number;
    }>;
    address?: {
      use?: string;
      type?: string;
      text?: string;
      line?: Array<string>;
      city?: string;
      district?: string;
      state?: string;
      postalCode?: string;
      country?: string;
      period?: {
        start?: string;
        end?: string;
      };
    };
    gender?: string;
    organization?: {
      reference?: string;
      display?: string;
    };
    period?: {
      start?: string;
      end?: string;
    };
  }>;
  communication?: Array<{
    language?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
      text?: string;
    };
    preferred?: boolean;
  }>;
  generalPractitioner?: Array<{
    reference?: string;
    display?: string;
  }>;
  managingOrganization?: {
    reference?: string;
    display?: string;
  };
  link?: Array<{
    other?: {
      reference?: string;
      display?: string;
    };
    type?: string;
  }>;
};
