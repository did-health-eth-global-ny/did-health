import React, { useEffect } from "react";
import { useState } from "react";
import Button from "../components/Button";
import Forms from "../components/Forms";
import FhirEditor from "../components/fhir-editor/FhirEditor";
import resorse from "../data/fhir/profiles-resources.json";

function CreateProfile() {
  const [data, setData] = useState({});
  const [formState, setFormState] = useState({
    FirstName: "",
    LastName: "",
    Gender: "",
    Language: "",
    Telecom: "",
    TelecomValue: "",
    Links: [""],
  });

  const handleChange = (fieldName: string, e: any) => {
    setFormState({
      ...formState,
      [fieldName]: e.target.value,
    });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(formState);
  };
  const addLink = () => {
    setFormState((prevState: any) => ({
      ...prevState,
      Links: [...prevState.Links, ""],
    }));
  };

  const removeLink = (index: number) => {
    const updatedLinks = formState.Links.filter((_, i) => i !== index);
    setFormState(prevState => ({ ...prevState, Links: updatedLinks }));
  };

  const updateLink = (index: number, value: string) => {
    const updatedLinks: any = [...formState.Links];
    updatedLinks[index] = value;
    setFormState(prevState => ({ ...prevState, Links: updatedLinks }));
  };
  const bundle = resorse as fhir4.Bundle;

  const [StructureDefinition, setStructureDefinition] = useState<any>(null);
  useEffect(() => {
    const parseData = async () => {
      try {
        const entry: any = bundle.entry;
        if (entry.length === 0) return;
        if (!bundle.hasOwnProperty("entry")) return;
        // const patientStructureDefinition = bundle.hasOwnProperty("entry");
        const patientStructureDefinition = entry.filter(
          (item: any) =>
            item.resource && item.resource.resourceType === "StructureDefinition" && item.resource.id === "Patient",
        );

        setStructureDefinition(patientStructureDefinition);
        console.log("patientStructureDefinition:", patientStructureDefinition);
        console.log("structureDefinition:", StructureDefinition);
      } catch (e) {
        console.log(e);
      }
    };
    parseData();
  }, [bundle]);

  return (
    <div className="flex items-center justify-center p-12">
      <div className="bg-white flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4 md:w-3/4">
        {/* {isLoading && <Loader />} */}
        <p className="font-bold font-epilogue text-[32px]">Create Profile</p>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-[30px]">
          <div className="flex flex-wrap gap-[40px]">
            <Forms
              labelName="FirstName"
              inputType="text"
              placeholder="Enter FirstName"
              handleChange={e => handleChange("", e)}
              value={formState.FirstName}
            />

            <Forms
              labelName="Last Name"
              inputType="text"
              placeholder="Enter Last Name"
              handleChange={e => handleChange("", e)}
              value={formState.LastName}
            />
          </div>

          <div>
            <p className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">
              Add related links
            </p>
            {formState.Links.map((link, index) => (
              <div key={index} className="flex items-center space-x-2 mb-4">
                <Forms
                  inputType="url"
                  placeholder="Enter link URL"
                  handleChange={e => updateLink(index, e.target.value)}
                  value={link}
                />
                <Button
                  btnType="button"
                  title="Remove"
                  styles="bg-red-500 text-white"
                  handleClick={() => removeLink(index)}
                >
                  Remove
                </Button>
              </div>
            ))}

            <Button btnType="button" title="Add Link" styles="bg-[#3a3a43] text-white" handleClick={addLink}>
              Add Link
            </Button>
          </div>
          <div>
            {/* {StructureDefinition && (
              <FhirEditor
                structureDefinitionId="Patient"
                structureDefinitionBundle={StructureDefinition}
                data={data}
                updateData={setData}
              />
            )} */}
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
