import React from "react";
import CustomButton from "./CustomButton";
import RenderInput from "./RenderInput";
const RenderFormField = ({
  field,
  index,
  handleChange,
  formValues,
  files,
  defaultValue,
  getRootProps,
  getInputProps,
  isDragActive,
  deleteFile,
  onClick,
  sx,
  color,
  control,
  errors,
}) => {
  if (field.type === "button") {
    return (
      <CustomButton
        onClick={onClick}
        key={index}
        size="large"
        sx={sx}
        color={color}
        type="submit"
      >
        {field.text}
      </CustomButton>
    );
  }

  return (
    <RenderInput
      defaultValue={defaultValue}
      key={index}
      field={field}
      formValues={formValues}
      handleChange={handleChange}
      files={files}
      getRootProps={getRootProps}
      getInputProps={getInputProps}
      isDragActive={isDragActive}
      deleteFile={deleteFile}
      control={control}
      errors={errors}
    />
  );
};

export default RenderFormField;
