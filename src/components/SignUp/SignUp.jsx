import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance"; // Ensure you have a configured axios instance

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "", // Initialize as an empty string
    occupation: "",
    major: "",
    graduationYear: "",
    interests: "",
<<<<<<< Updated upstream
=======
    university: "", // University name field
    imageUploadUrl: "", // Image upload URL field
    role_id: "", // Role ID based on the user's occupation
>>>>>>> Stashed changes
  });

  const [formErrors, setFormErrors] = useState({});
  const [isRegistered, setIsRegistered] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleTogglePassword = () => setShowPassword(!showPassword);
  const handleToggleConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.firstName) errors.firstName = "First Name is required";
    if (!formData.lastName) errors.lastName = "Last Name is required";
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
    if (!formData.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    if (!formData.phone) errors.phone = "Phone number is required";
    if (!formData.occupation) errors.occupation = "Occupation is required";
    if (!formData.major) errors.major = "Major is required";
    if (!formData.graduationYear)
      errors.graduationYear = "Graduation year is required";
    if (!formData.interests) errors.interests = "Interests are required";

    // Optional fields: Add validation if provided
    if (formData.university && formData.university.length < 3) {
      errors.university = "University name must be at least 3 characters long";
    }
    if (
      formData.imageUploadUrl &&
      !/^https?:\/\//.test(formData.imageUploadUrl)
    ) {
      errors.imageUploadUrl = "Image URL must be a valid URL";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      try {
        // Send a POST request to the backend API
        const response = await axiosInstance.post("/users/register", {
          f_name: formData.firstName,
          l_name: formData.lastName,
          email: formData.email,
<<<<<<< Updated upstream
          password: formData.password, // Assuming backend will hash the password
          phone_number: formData.phone.toString(), // Convert to string if needed
          image_url: "https://example.com/static-image.jpg", // Static image URL
          occupation: formData.occupation,
=======
          password_hash: formData.password, // Password hashing will be done on the backend
          phone_number: formData.phone,
          image_url: formData.imageUploadUrl || "https://example.com/static-image.jpg", // Default image if not provided
          role_id: parseInt(formData.role_id), // Role ID (1: Student, 2: Mentor, 3: Alumni)
>>>>>>> Stashed changes
          major: formData.major,
          graduation_year: formData.graduationYear,
          interests: formData.interests,
<<<<<<< Updated upstream
        });
=======
          university: formData.university || "", // Optional field
        };

        const response = await axiosInstance.post(
          "/users/register",
          requestData
        );
>>>>>>> Stashed changes
        console.log("Registration successful:", response.data);
        setIsRegistered(true);
      } catch (error) {
        console.error(
          "Registration failed:",
          error.response?.data || error.message
        );
      }
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 border border-gray-300 rounded-md">
      <h2 className="text-2xl font-bold mb-6">Register</h2>
      {isRegistered ? (
        <p className="text-green-500">
          Registration successful! You can now log in.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
              {formErrors.firstName && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.firstName}
                </p>
              )}
            </div>
            <div>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
              {formErrors.lastName && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.lastName}
                </p>
              )}
            </div>
          </div>

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

          <div className="grid grid-cols-2 gap-4">
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
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.password}
                </p>
              )}
            </div>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password*"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
              <button
                type="button"
                onClick={handleToggleConfirmPassword}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                👁️
              </button>
              {formErrors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
          {formErrors.phone && (
            <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
          )}

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="major"
              placeholder="Major"
              value={formData.major}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            />
            {formErrors.major && (
              <p className="text-red-500 text-sm mt-1">{formErrors.major}</p>
            )}
            <input
              type="text"
              name="graduationYear"
              placeholder="Graduation Year"
              value={formData.graduationYear}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            />
            {formErrors.graduationYear && (
              <p className="text-red-500 text-sm mt-1">
                {formErrors.graduationYear}
              </p>
            )}
          </div>

          <select
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          >
<<<<<<< Updated upstream
            <option value="">Occupation</option>
            <option value="Student">Student</option>
            <option value="Professional">Professional</option>
            <option value="Other">Other</option>
=======
            <option value="" disabled>
              Select Role
            </option>
            <option value="1">Student</option>
            <option value="2">Mentor</option>
            <option value="3">Alumni</option>
>>>>>>> Stashed changes
          </select>
          {formErrors.occupation && (
            <p className="text-red-500 text-sm mt-1">{formErrors.occupation}</p>
          )}

          <select
            name="interests"
            value={formData.interests}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="" disabled>
              Select Interest
            </option>
            <option value="Front End">Front End</option>
            <option value="Back End">Back End</option>
            <option value="Full Stack">Full Stack</option>
            <option value="AI/ML">AI/ML</option>
            <option value="Data Science">Data Science</option>
          </select>
          {formErrors.interests && (
            <p className="text-red-500 text-sm mt-1">{formErrors.interests}</p>
          )}

          <input
            type="text"
            name="university"
            placeholder="University Name (Optional)"
            value={formData.university}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
          {formErrors.university && (
            <p className="text-red-500 text-sm mt-1">{formErrors.university}</p>
          )}

          <input
            type="text"
            name="imageUploadUrl"
            placeholder="Image Upload URL (Optional)"
            value={formData.imageUploadUrl}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
          {formErrors.imageUploadUrl && (
            <p className="text-red-500 text-sm mt-1">
              {formErrors.imageUploadUrl}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-black text-white px-4 py-2 rounded-md"
          >
            Register
          </button>
        </form>
      )}
    </div>
  );
};

export default SignUpForm;
