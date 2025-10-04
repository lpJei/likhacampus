import axios from "axios";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const UserNavbar = () => {
  const navigate = useNavigate();

  const logoutUser = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      navigate("/login"); // Navigate to login page
    } catch (error) {
      console.error("Logout failed: ", error);
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <div className="navbar bg-base-100 shadow-sm px-4">
          {/* LEFT LOGO W/ HAMBRGR */}
          <div className="navbar-start">
            {/* HAMBRGR TOGGLE on mobile */}
            <div className="dropdown">
              <button tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>
                <li>
                  <NavLink to="/forum">LikHow</NavLink>
                </li>
                <li>
                  <NavLink to="/projects">Projects</NavLink>
                </li>
                <li>
                  <NavLink to="/skills">Skills</NavLink>
                </li>
              </ul>
            </div>

            <NavLink to="/" className="btn btn-ghost font-bold text-lg">
              LikhaCampus
            </NavLink>
          </div>

          {/* CENTER */}
          <div className="navbar-center hidden lg:flex">
            <ul className="flex gap-4">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `px-4 py-2 rounded hover:bg-gray-100 transition-colors ${
                      isActive
                        ? "bg-gray-200 font-semibold text-gray-800"
                        : "text-gray-700"
                    }`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/forum"
                  className={({ isActive }) =>
                    `px-4 py-2 rounded hover:bg-gray-100 transition-colors ${
                      isActive
                        ? "bg-gray-200 font-semibold text-gray-800"
                        : "text-gray-700"
                    }`
                  }
                >
                  LikHow
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/projects"
                  className={({ isActive }) =>
                    `px-4 py-2 rounded hover:bg-gray-100 transition-colors ${
                      isActive
                        ? "bg-gray-200 font-semibold text-gray-800"
                        : "text-gray-700"
                    }`
                  }
                >
                  Projects
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/skills"
                  className={({ isActive }) =>
                    `px-4 py-2 rounded hover:bg-gray-100 transition-colors ${
                      isActive
                        ? "bg-gray-200 font-semibold text-gray-800"
                        : "text-gray-700"
                    }`
                  }
                >
                  Skills
                </NavLink>
              </li>
            </ul>
          </div>

          {/* RIGHT */}
          <div className="navbar-end gap-5">
            {/* FOR NOTIFICATIONS -- populate with notifications */}
            <button className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />{" "}
                </svg>
                <span className="badge badge-xs badge-primary indicator-item"></span>
              </div>
            </button>
            {/* FOR PROFILE -- able to change the pic to the user's pref, also */}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="user avatar"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <NavLink to="/profile" className="justify-between">
                    Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/settings" className="justify-between">
                    Settings
                  </NavLink>
                </li>
                <li>
                  <a onClick={logoutUser}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CONTENT AREA */}
        <div className="flex-1 flex flex-col items-center px-4 py-6 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default UserNavbar;
