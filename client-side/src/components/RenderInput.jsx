import {
  Autocomplete,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { BiHide, BiShow } from "react-icons/bi";

const RenderInput = ({ field, control, errors = {} }) => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const error = errors?.[field.name]?.message;

  switch (field.type) {
    case "text":
    case "email":
    case "number":
    case "date":
      return (
        <Controller
          name={field.name}
          control={control}
          defaultValue=""
          render={({ field: controllerField }) => {
            return (
              <FormControl variant="outlined" fullWidth error={!!error}>
                <InputLabel>{field.label}</InputLabel>
                <OutlinedInput
                  {...controllerField}
                  fullWidth
                  type={field.type}
                  label={field.label}
                  sx={{
                    backgroundColor: theme.palette.background.alt,
                  }}
                  placeholder={field.placeholder}
                  disabled={field.disabled}
                />
                {error && (
                  <span
                    style={{
                      color: "red",
                      fontSize: "0.75rem",
                      marginTop: "4px",
                    }}
                  >
                    {error}
                  </span>
                )}
              </FormControl>
            );
          }}
        />
      );

    case "password":
      return (
        <Controller
          name={field.name}
          control={control}
          defaultValue=""
          render={({ field: controllerField }) => (
            <FormControl variant="outlined" fullWidth error={!!error}>
              <InputLabel>{field.label}</InputLabel>
              <OutlinedInput
                disabled={field.disabled}
                {...controllerField}
                type={showPassword ? "text" : "password"}
                placeholder={field.placeholder}
                endAdornment={
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <BiHide /> : <BiShow />}
                  </IconButton>
                }
                label={field.label}
                sx={{
                  backgroundColor: theme.palette.background.alt,
                }}
              />

              {/* Optional: Display error message below the input */}
              {error && (
                <span
                  style={{
                    color: "red",
                    fontSize: "0.75rem",
                    marginTop: "4px",
                  }}
                >
                  {error}
                </span>
              )}
            </FormControl>
          )}
        />
      );

    case "checkbox":
      return (
        <Controller
          name={field.name}
          control={control}
          defaultValue={false}
          render={({ field: controllerField }) => (
            <FormControlLabel
              sx={{ width: "100%", color: "white" }}
              control={
                <Checkbox
                  {...controllerField}
                  disabled={field.disabled}
                  checked={controllerField.value}
                  sx={{ color: "white" }}
                />
              }
              label={field.label}
            />
          )}
        />
      );

    case "textarea":
      return (
        <Controller
          name={field.name}
          control={control}
          defaultValue=""
          render={({ field: controllerField }) => (
            <FormControl fullWidth sx={{ mb: 2 }} error={!!error}>
              {field.label && <InputLabel shrink>{field.label}</InputLabel>}
              <TextareaAutosize
                {...controllerField}
                placeholder={field.placeholder}
                minRows={6}
                disabled={field.disabled}
                style={{
                  width: "100%",
                  padding: "1rem",
                  backgroundColor: theme.palette.background.alt,
                  color: "white",
                  borderRadius: "4px",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                }}
              />
              {error && (
                <span
                  style={{
                    color: "red",
                    fontSize: "0.75rem",
                    marginTop: "4px",
                  }}
                >
                  {error}
                </span>
              )}
            </FormControl>
          )}
        />
      );

    case "select":
      return (
        <Controller
          name={field.name}
          control={control}
          defaultValue=""
          render={({ field: controllerField }) => (
            <FormControl fullWidth error={!!error}>
              <InputLabel>{field.label}</InputLabel>
              <Select
                {...controllerField}
                disabled={field.disabled}
                displayEmpty
                sx={{
                  backgroundColor: theme.palette.background.alt,
                }}
              >
                {field.options.map((option, index) => (
                  <MenuItem key={index} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              {error && (
                <span
                  style={{
                    color: "red",
                    fontSize: "0.75rem",
                    marginTop: "4px",
                  }}
                >
                  {error}
                </span>
              )}
            </FormControl>
          )}
        />
      );

    case "autocomplete":
      return (
        <Controller
          name={field.name}
          control={control}
          defaultValue=""
          render={({ field: controllerField }) => (
            <Autocomplete
              fullWidth
              options={field.options || []}
              disabled={field.disabled}
              getOptionLabel={(option) =>
                typeof option === "string" ? option : option.label
              }
              value={
                field.options?.find(
                  (opt) => opt.value === controllerField.value
                ) || null
              }
              onChange={(_, newValue) =>
                controllerField.onChange(newValue?.value || "")
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={field.label}
                  placeholder={field.placeholder}
                  error={!!error}
                  helperText={error}
                  InputLabelProps={{ shrink: true }}
                />
              )}
              sx={{
                "& .MuiInputBase-root": {
                  backgroundColor: theme.palette.background.alt,
                },
              }}
            />
          )}
        />
      );

    default:
      return null;
  }
};

export default RenderInput;
