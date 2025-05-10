import { useState } from "react";
// import { useFile } from "./useFile";

export const useForm = (onSubmit) => {
  const [formValues, setFormValues] = useState({});
  // const [errors, setErrors] = useState({});

  //   const {
  //     getRootProps,
  //     getInputProps,
  //     files,
  //     setFiles,
  //     isDragActive,
  //     deleteFile,
  //   } = useFile();

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  //   const validate = () => {
  //     let newErrors = {};
  //     Object.keys(formValues).forEach((key) => {
  //       // Check if the input field is empty
  //       if (
  //         !formValues[key] ||
  //         (Array.isArray(formValues[key]) && formValues[key].length === 0)
  //       ) {
  //         newErrors[key] = `${key} is required`;
  //       }
  //     });
  //     setErrors(newErrors);
  //     return Object.keys(newErrors).length === 0;
  //   };

  //   useEffect(() => {
  //     if (files.length > 0) {
  //       const base64Files = files.map((file) => file.base64);

  //       setFormValues((prevValues) => ({
  //         ...prevValues,
  //         uploadedFiles: base64Files,
  //       }));
  //     }
  //   }, [files]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValues);
    setFormValues({});
    // setFiles([]);
  };

  return {
    setFormValues,
    formValues,
    // errors,
    // getRootProps,
    // getInputProps,
    // files,
    // isDragActive,
    // deleteFile,
    handleChange,
    handleSubmit,
  };
};
