import React, { useState } from "react";
import Popover from "@mui/material/Popover";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import AddIcon from "@mui/icons-material/Add";
// import { useAppDispatch, useAppSelector } from "@cqworkspace/data/store";
// import { v4 as uuidv4 } from "uuid";
// import { FhirRendererConfig } from './FhirSchemaRenderer';
// import { Property } from "@cqlabio/shared/structure-definition-ui-parser";
import { ResourceProperty, PropertyTypesEnum } from "./types";

type NextPropertyPickerProps = {
  properties: ResourceProperty[];
  // onSelectPropertyConfig: (config: FhirRendererConfig) => void;
  existingKeys: Set<string>;
  isSmall?: boolean;
  fhirData: any;
  updateFhirData: (value: any) => void;
};

export default function NextPropertyPicker({
  properties,
  // onSelectPropertyConfig,
  existingKeys,
  isSmall,
  updateFhirData,
  fhirData,
}: NextPropertyPickerProps) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectProperty = (property: ResourceProperty) => {
    // onSelectPropertyConfig(config);
    const value =
      property.propertyType === PropertyTypesEnum.Element ? {} : null;

    // console.log("tupe", property.propertyName);

    // updateFhirProperty(, value);
    updateFhirData({
      ...fhirData,
      [property.propertyName]: value,
    });

    handleClose();
  };

  const actions = [
    {
      sectionHeader: "Property",
      children: properties.map((property) => ({
        label: property.propertyName,
        disabled: existingKeys.has(property.propertyName),
        onClick: () => handleSelectProperty(property),
        unsupported: property.propertyType === PropertyTypesEnum.NotFound,
        baseChoiceType: property.baseChoiceType,
      })),
    },
  ];

  return (
    <>
      <Chip
        onClick={handleClick}
        label="Add Property"
        icon={<AddIcon sx={{ fontSize: "20px" }} />}
        size={isSmall ? "small" : undefined}
        sx={{ background: "#FFECB3", color: "#BF360C", fontSize: "11px" }}
      />

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box sx={{ padding: "10px 5px", minWidth: "300px" }}>
          {actions.map((section) => (
            <Box key={section.sectionHeader}>
              <Box
                sx={{
                  fontWeight: "bold",
                  paddingLeft: "5px",
                  fontSize: "12px",
                  textTransform: "uppercase",
                  paddingTop: "5px",
                }}
              >
                {section.sectionHeader}
              </Box>
              {section.children.map((action) => (
                <Box
                  key={action.label}
                  onClick={!action.disabled ? action.onClick : undefined}
                  sx={{
                    fontSize: "13px",
                    padding: "2px 0 2px 5px",
                    display: "flex",
                    color: action.disabled ? "rgb(130,130,130)" : "inherit",
                    cursor: action.disabled ? undefined : "pointer",
                    ":hover": {
                      background: !action.disabled
                        ? "rgb(240,240,240)"
                        : undefined,
                    },
                  }}
                >
                  <Box sx={{ display: "flex", flexGrow: 1 }}>
                    {action.label}
                  </Box>

                  {action.unsupported && (
                    <Box sx={{ color: "rgb(150,150,150)", fontSize: "12px" }}>
                      Unsupported
                    </Box>
                  )}

                  {action.baseChoiceType && (
                    <Box sx={{ color: "rgb(150,150,150)", fontSize: "12px" }}>
                      {action.baseChoiceType}
                    </Box>
                  )}
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Popover>
    </>
  );
}
