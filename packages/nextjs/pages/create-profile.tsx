import React, { useEffect } from "react";
import { useState } from "react";
import Button from "../components/Button";
import Forms from "../components/Forms";
import SelectForms from "../components/SelectForm";
import FhirEditor from "../components/fhir-editor/FhirEditor";
import resorse from "../data/fhir/profiles-resources.json";
import { makeStorageClient } from "../hooks/useIpfs";
import { FHIRPatient } from "../types/abitype/fhir";
import createFHIRPatient from "../utils/scaffold-eth/createJson";
import { v4 } from "uuid";

const IdentifierOption = [
  { label: "license", value: "license" },
  { label: "ssn", value: "ssn" },
  { label: "passport", value: "passport" },
];
const GenderOption = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
  { label: "Unknown", value: "unknown" },
];
const TelecomSystemOption = [
  { label: "phone", value: "phone" },
  { label: "email", value: "email" },
];
function CreateProfile() {
  const [patient, setPatient] = useState<FHIRPatient | null>(
    createFHIRPatient(
      "Smith",
      "John",
      ["123 Main St"],
      "CityName",
      "StateName",
      "12345",
      "CountryName",
      "john.smith@example.com",
      "123-456-7890",
      "ID12345",
      "M",
      "male",
      // "Caucasian",
      "1990-01-01",
    ),
  );

  const handleStateChange = (fieldName: string, nestedField?: string, index?: number) => (e: any) => {
    console.log(e.target);

    let value = e.target?.value;

    setPatient(prev => {
      if (!prev) return prev; // Return null or initial state if the previous state is not set

      // Create a shallow copy
      let newState: any = { ...prev };

      // Handle nested fields and arrays
      if (nestedField) {
        if (typeof index === "number") {
          // For nested arrays
          newState[fieldName][index] = {
            ...newState[fieldName][index],
            [nestedField]: value,
          };
        } else {
          // For nested objects
          newState[fieldName] = {
            ...newState[fieldName],
            [nestedField]: value,
          };
        }
      } else {
        // For top-level fields
        newState[fieldName] = value;
      }

      return newState;
    });
  };
  const downloadJson = (object: any, filename: string) => {
    const blob = new Blob([JSON.stringify(object)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("patient:", patient);
    const PatientJson = createFHIRPatient(
      patient?.name?.[0].family ?? "",
      patient?.name?.[0].given ?? "",
      patient?.address?.[0].line?.map(line => line ?? "") ?? [""],
      patient?.address?.[0].city ?? "",
      patient?.address?.[0].state ?? "",
      patient?.address?.[0].postalCode ?? "",
      patient?.address?.[0].country ?? "",
      patient?.telecom?.[0].value ?? "",
      "123-456-7890",
      patient?.identifier?.[0].value ?? "",
      "M",
      patient?.gender ?? "unknown", // Add null check for patient?.gender
      patient?.birthDate ?? "",
    );
    downloadJson(PatientJson, "patient.json");
    const blob = new Blob([JSON.stringify(PatientJson)], { type: "application/json" });
    const files = [new File([blob], "plain-utf8.txt)"), new File([blob], "patient.json")];
    console.log("files:", files);

    const client = makeStorageClient();
    const cid = await client.put(files);
    console.log("stored files with cid:", cid);
    return cid;
  };

  return (
    <div className="flex items-center justify-center p-12">
      <div className="bg-white flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4 md:w-3/4">
        {/* {isLoading && <Loader />} */}
        <p className="font-bold font-epilogue text-[32px]">Create Profile</p>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-[30px]">
          <div className="flex flex-wrap gap-[40px]">
            <Forms
              labelName="First Name"
              inputType="text"
              placeholder="First Name"
              handleChange={e => handleStateChange("name", "given", 0)(e)}
              value={patient?.name?.[0].given}
            />

            <Forms
              labelName="Last Name"
              inputType="text"
              placeholder="Last Name"
              handleChange={e => handleStateChange("name", "family", 0)(e)}
              value={patient?.name?.[0].family}
            />
            <SelectForms
              options={GenderOption}
              labelName="Gender"
              placeholder="Select gender"
              onChange={handleStateChange("gender")}
              selectedValue={patient?.gender}
            />
          </div>
          <div className="flex flex-wrap gap-[40px]">
            <SelectForms
              options={IdentifierOption}
              labelName="Identifier Type"
              placeholder="Select identifier Type"
              onChange={e => handleStateChange("identifier", "system", 0)(e)}
              selectedValue={patient?.identifier?.[0].system}
            />
            <Forms
              labelName="Identifier Value"
              inputType="text"
              placeholder="Type your identifier number"
              handleChange={e => handleStateChange("identifier", "value", 0)(e)}
              value={patient?.identifier?.[0].value}
            />
          </div>
          <div className="flex flex-wrap gap-[40px]">
            <SelectForms
              options={TelecomSystemOption}
              labelName="Telecom System"
              placeholder="Select Telecom Type"
              onChange={e => handleStateChange("telecom", "system", 0)(e)}
              selectedValue={patient?.telecom?.[0].system}
            />
            <Forms
              labelName="Telecom Value"
              inputType="text"
              placeholder="Type your Telecom Value"
              handleChange={e => handleStateChange("telecom", "value", 0)(e)}
              value={patient?.telecom?.[0].value}
            />
          </div>
          <div className="flex justify-center items-center">
            <Button
              btnType="submit"
              title="Create a Profile"
              styles="bg-[#3a3a43] text-white"
              handleClick={() => {
                handleSubmit;
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProfile;
