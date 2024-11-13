"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSignIn } from "../../app/redux/slices/authSlice"; // Adjust the path
import { useRouter } from "next/navigation";
import axiosInstance from "../../utils/axiosInstance"; // Ensure axiosInstance is imported

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [userNot, setUserNot] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  const handleTogglePassword = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }
    return errors;
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      try {
        console.log(formData);
        // Use axiosInstance to post credentials to the backend
        const response = await axiosInstance.post("/login", formData);
        const user = response.data;

        console.log(response.data);

        // Store user role in Redux for authentication
        dispatch(
          setSignIn({
            role: user.role_id,
            user, // Pass the entire user object
          })
        );

        // Redirect to homepage or dashboard
        router.push("/");
      } catch (error) {
        setIsInvalid(true); // Show invalid credentials message
        setUserNot(error.response?.data?.message || error.message);
        console.error("Error:", error.response?.data?.message || error.message);
      }
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 border border-gray-300 rounded-md">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      <form onSubmit={handleOnSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email*"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
          {formErrors.email && (
            <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
          )}
        </div>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password*"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
          <button
            type="button"
            onClick={handleTogglePassword}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            👁️
          </button>
          {formErrors.password && (
            <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white px-4 py-2 rounded-md"
        >
          Login
        </button>
        {isInvalid && <p className="text-red-500 mt-2">{userNot}</p>}
      </form>
    </div>
  );
}
