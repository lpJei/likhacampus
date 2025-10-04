import axios from "axios";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const Login = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Sending login data:", data);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        data,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setUser(response.data.user); // update context
        console.log(
          "✅ About to navigate to:",
          response.data.user.role === "admin" ? "/admin/analytics" : "/home"
        );
        if (response.data.user.role === "admin") {
          navigate("/admin/analytics");
        } else {
          navigate("/home");
        }
      }
    } catch (errors) {
      console.error(errors);
      console.error("Login error:", errors.response?.data);
    }
  };

  return (
    <>
      <div className="card w-full max-w-sm bg-white shadow-md">
        <div className="card-body">
          <h2 className="mt-3 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>

          {/* EMAIL */}
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              className="space-y-6"
              method="POST"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    {...register("email", {
                      pattern: {
                        required: "Email is required",
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Invalid email address",
                      },
                    })}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                  {errors.email && (
                    <div className="text-red-600">{errors.email.message}</div>
                  )}
                </div>
              </div>

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
                    autoComplete="current-password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Invalid password",
                      },
                    })}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                  {errors.password && (
                    <div className="text-red-600">
                      {errors.password.message}
                    </div>
                  )}
                </div>
                {/*
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </a>
                  </div>
                */}
              </div>

              {/* BUTTON */}
              <div>
                <button
                  type="submit"
                  className="btn btn-primary inline-flex gap-2 text-xs w-full justify-center"
                >
                  Sign in
                </button>
              </div>
              <p className="text-center text-sm/6 text-gray-400">
                Don't have an account?{" "}
                <Link to={"/register"} className="link link-primary">
                  Register here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
