// src/pages/Profile.jsx
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { jwtDecode } from "jwt-decode"; // Correct import
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import RenderFormField from "../components/RenderFormField";
import { getUsers } from "../store/user/action";
const userFields = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Enter user name",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter Email",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter password",
  },
];
// Validation schema with Zod
const profileSchema = z.object({
  username: z.string().min(4, "Username must be at least 4 characters."),
  email: z.string().email("Invalid email address."),
});

const Profile = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.usersReducer);
  const fetchUsers = useCallback(async () => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    fetchUsers();
  }, [dispatch, fetchUsers]);

  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState({});
  // const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    const token = window.localStorage.getItem("authToken");
    console.log("Token:", token); // Debug log

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log("Decoded Token:", decodedToken); // Debug log
        setUserId(decodedToken.id);
      } catch (error) {
        console.error("Invalid token:", error.message);
        // Redirect to login if the token is invalid
        window.location.href = "/login";
      }
    } else {
      console.error("No token found");
      // Redirect to login if no token is found
      window.location.href = "/login";
    }
  }, []);

  // Initialize form with your hook

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(profileSchema),
  });

  // Pre-fill user data
  useEffect(() => {
    if (data.length) {
      const user = data.find((item) => item.id === userId);
      setUser(user);
      if (user) {
        setValue("name", user.name);
        setValue("email", user.email);
      }
    }
  }, [data, userId, setValue]);

  // Handle profile image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // const reader = new FileReader();
      // reader.onload = () => {
      //   setProfileImage(reader.result); // Set the image preview
      // };
      // reader.readAsDataURL(file);
    }
  };

  // if (!userId || !data.length) {
  //   return <div>Loading...</div>; // Fallback while loading user data
  // }

  return (
    <div className="flex flex-col gap-10">
      <Typography variant="h3" width={"80%"}>
        Personal Intraining
      </Typography>
      <Box
        sx={{
          minHeight: "75vh",
          bgcolor: theme.palette.background.alt,
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 6,
          p: 2,
          borderRadius: 2,
        }}
      >
        <div className="w-4/5">
          <Box display="flex" alignItems="center" mb={4} gap={2}>
            {/* <Avatar src={profileImage} sx={{ width: 100, height: 100 }} /> */}
            <Typography fontWeight="bold" variant="h3">
              {user.name}
            </Typography>
          </Box>
          <Button variant="contained" component="label">
            Upload Profile Image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageUpload}
            />
          </Button>

          <div className="flex flex-col items-center justify-center gap-8 mt-4">
            {userFields.map((field, index) => (
              <RenderFormField
                key={index}
                index={index}
                field={field}
                control={control}
                errors={errors}
              />
            ))}
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Update Profile
            </Button>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default Profile;
