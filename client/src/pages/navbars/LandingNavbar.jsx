import { NavLink, Outlet } from "react-router-dom";

const LandingNavbar = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-100">
        {/* NAVBAR */}
        <div className="navbar bg-base-100 shadow-sm px-4">
          <div className="flex-1">
            <NavLink to="/" className="btn btn-ghost text-xl">
              LikhaCampus
            </NavLink>
          </div>

          {/* MOBILE DROPDOWN */}
          <div className="navbar-end lg:hidden">
            <div className="dropdown dropdown-end">
              <div tabIndex={0} className="btn btn-ghost">
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
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-40 p-2 shadow"
              >
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
                <li>
                  <NavLink to="/register">Register</NavLink>
                </li>
              </ul>
            </div>
          </div>

          {/* DESKTOP BUTTONS */}
          <div className="navbar-end hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/register">Register</NavLink>
              </li>
            </ul>
          </div>
        </div>

        {/* CONTENT AREA */}
        <div className="flex-1 flex flex-col justify-center items-center px-4 py-6 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default LandingNavbar;
