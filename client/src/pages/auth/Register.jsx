import axios from "axios";
import { UserCircle } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import TermsNConditionsModal from "../../components/User/TermsNConditionsModal";

const Register = () => {
  const modalRef = useRef();
  const [previewUrl, setPreviewUrl] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [idPhoto, setIdPhoto] = useState(null);
  const [idPhotoError, setIdPhotoError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setIdPhoto(selectedFile);
      setFileName(selectedFile.name);
      setIdPhotoError("");

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const removeFile = () => {
    setIdPhoto(null);
    setFileName(null);
    setPreviewUrl(null);
    // Reset file input
    document.getElementById("idPhoto").value = "";
  };

  const openFileDialog = () => {
    document.getElementById("idPhoto").click();
  };

  const onSubmit = async (data) => {
    console.log(data); // Will be changed later to secure user input, use the one below (remove console.log)

    if (!idPhoto) {
      setIdPhotoError("Student ID photo is required");
      return;
    }

    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("studentNumber", String(data.studentNumber));
    formData.append("yearLevel", data.yearLevel);
    formData.append("password", data.password);
    formData.append("idPhoto", idPhoto);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      if (response.status == 201) {
        alert("Registration successful!");
      }
    } catch (errors) {
      console.error("Frontend error:", errors.response?.data);
      alert("Registration failed: " + errors.response?.data?.message);
    }
  };

  return (
    <>
      <div className="card w-full max-w-sm bg-white shadow-md">
        <div className="card-body">
          <h2 className="mt-3 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Create an account
          </h2>

          {/* Username, first name, last name, school email, gender */}
          {/* Dropdown for year and section */}

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              method="POST"
              className="space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex gap-4">
                {/* FIRST NAME */}
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    First Name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="firstName"
                      {...register("firstName", {
                        required: "First name is required",
                        pattern: {
                          value: /^[A-Za-z]+$/i,
                          message:
                            "Only letters, spaces, hyphens, and apostrophes allowed",
                        },
                        minLength: 2,
                        message: "First name must be at least 2 characters", // Change to a generic message
                      })}
                      placeholder="Enter your first name"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                    {errors.firstName && (
                      <div className="text-red-600">
                        {errors.firstName.message}
                      </div>
                    )}
                  </div>
                </div>

                {/* LAST NAME */}
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Last Name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="lastName"
                      {...register("lastName", {
                        required: "Last name is required",
                        pattern: {
                          value: /^[A-Za-z]+$/i,
                          message:
                            "Only letters, spaces, hyphens, and apostrophes allowed",
                        },
                        minLength: 2,
                        message: "Last name must be at least 2 characters", // Change to a generic message
                      })}
                      placeholder="Enter your last name"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                    {errors.lastName && (
                      <div className="text-red-600">
                        {errors.lastName.message}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* USERNAME */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Username
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="username"
                    {...register("username", {
                      required: "Username is required",
                      pattern: {
                        value: /^[a-z0-9]+$/i,
                        message: "Only letters and numbers allowed",
                      },
                      minLength: 2,
                      message: "Username must be at least 2 characters", // Change to a generic message
                    })}
                    placeholder="Enter your username"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                  {errors.username && (
                    <div className="text-red-600">
                      {errors.username.message}
                    </div>
                  )}
                </div>
              </div>
              {/* EMAIL -- add validation later, like "rc.firstName.lastName@cvsu.edu.ph"*/}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    id="email"
                    {...register("email", {
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Invalid email address",
                      },
                    })}
                    placeholder="Enter valid email address"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                  {errors.email && (
                    <div className="text-red-600">{errors.email.message}</div>
                  )}
                </div>
              </div>
              {/* STUDENT NUMBER*/}
              <div>
                <label
                  htmlFor="studentNumber"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Student Number
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    id="studentNumber"
                    {...register("studentNumber", {
                      required: "Student number is required",
                      pattern: {
                        value: /^\d{9}$/,
                        message: "Invalid student number",
                      },
                      minLength: {
                        value: 9,
                      },
                    })}
                    placeholder="Enter student number"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                  {errors.studentNumber && (
                    <div className="text-red-600">
                      {errors.studentNumber.message}
                    </div>
                  )}
                </div>
              </div>
              {/* SELECT YEAR DROPDOWN */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Year level</legend>
                <select
                  defaultValue="Select year level"
                  className="select"
                  {...register("yearLevel", {
                    required: "Please select your year level",
                  })}
                >
                  <option disabled={true} value="">
                    Choose a year level
                  </option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                </select>
                {errors.yearLevel && (
                  <div className="text-red-600">{errors.yearLevel.message}</div>
                )}
              </fieldset>
              {/* PASSWORD */}
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                    })}
                    placeholder="Enter your password"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                  {errors.password && (
                    <div className="text-red-600">
                      {errors.password.message}
                    </div>
                  )}
                </div>
              </div>
              {/* ID UPLOADER */}
              <div>
                <label className="block text-sm/6 font-medium text-gray-900 mb-2">
                  Student ID Photo
                </label>
                <div className="flex flex-col items-center gap-2 p-4 border border-gray-300 rounded-md">
                  <div className="inline-flex items-center gap-3">
                    {/* Preview Avatar */}
                    <div
                      className="relative flex w-12 h-12 shrink-0 items-center justify-center overflow-hidden rounded-md border border-gray-300"
                      aria-label={
                        previewUrl
                          ? "Preview of uploaded ID"
                          : "Default ID icon"
                      }
                    >
                      {previewUrl ? (
                        <img
                          className="w-full h-full object-cover"
                          src={previewUrl}
                          alt="Preview of ID"
                        />
                      ) : (
                        <UserCircle className="opacity-60" size={20} />
                      )}
                    </div>

                    {/* Upload Button */}
                    <button
                      onClick={openFileDialog}
                      className="btn btn-sm btn-outline"
                      type="button"
                    >
                      {fileName ? "Change ID" : "Upload ID"}
                    </button>
                    <input
                      id="idPhoto"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      aria-label="Upload ID photo"
                    />
                  </div>

                  {/* File Name & Remove Button */}
                  {fileName && (
                    <div className="inline-flex gap-2 text-xs w-full justify-center">
                      <p className="text-gray-600 truncate max-w-[150px]">
                        {fileName}
                      </p>
                      <button
                        onClick={removeFile}
                        className="text-red-600 font-medium hover:underline"
                        type="button"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                  <p className="text-gray-500 text-xs text-center">
                    Upload your student ID for verification
                  </p>
                </div>
                {idPhotoError && (
                  <div className="text-red-600 text-sm mt-2">
                    {idPhotoError}
                  </div>
                )}
              </div>
              {/* TERMS AND CONDITIONS*/}
              <div className="flex items-center gap-2">
                <div className="text-sm text-gray-600">
                  By checking this box, you confirm that you have read and
                  agreed to the{" "}
                  <span
                    className="link link-primary cursor-pointer"
                    onClick={() => modalRef.current.open()}
                  >
                    LikhaCampus Terms and Conditions and User Policy Agreement
                  </span>
                </div>
              </div>

              {/* REGISTER BUTTON */}
              <div>
                <button
                  type="submit"
                  className="btn btn-primary inline-flex gap-2 text-xs w-full justify-center"
                >
                  Register
                </button>
              </div>
              <label className="block text-center text-sm/6 text-gray-400">
                Already have an account?{" "}
                <Link to={"/login"} className="link link-primary">
                  Login here
                </Link>
              </label>
            </form>
          </div>
        </div>
      </div>

      <TermsNConditionsModal ref={modalRef} />
    </>
  );
};

export default Register;
