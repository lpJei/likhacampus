import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRouter from "../../client/src/components/Shared/ProtectedRouter.jsx";
import { UserContext } from "./context/UserContext.js";
import "./index.css";
import "./styles/custom.css";

// Starting pages
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import LandingNavbar from "./pages/navbars/LandingNavbar.jsx";

// User pages
import Profile from "./components/User/ProfileCard.jsx";
import QuizModal from "./components/User/QuizModal.jsx";
import UserNavbar from "./pages/navbars/UserNavbar.jsx";
import Archives from "./pages/users/Archives.jsx";
import Forum from "./pages/users/Forum.jsx";
import Home from "./pages/users/Home.jsx";
import Projects from "./pages/users/Projects.jsx";
import Settings from "./pages/users/Settings.jsx";
import Skills from "./pages/users/Skills.jsx";
import UserNotification from "./pages/users/UserNotification.jsx";
import ViewProject from "./pages/users/ViewProject.jsx";

// Admin pages
import Analytics from "./pages/admin/Analytics.jsx";
import AnnouncementPanel from "./pages/admin/AnnouncementPanel.jsx";
import LikHowDiscussions from "./pages/admin/LikHowDiscussions.jsx";
import UploadedProjects from "./pages/admin/UploadedProjects.jsx";
import UserAccounts from "./pages/admin/UserAccounts.jsx";
import AdminNavbar from "./pages/navbars/AdminNavbar.jsx";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/user/me")
      .then((response) => {
        setUser(response.data.user);
        setLoading(false);
      })
      .catch(() => {
        setUser(null);
        setLoading(false);
      });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Routes>
        {/* STARTING ROUTES */}
        <Route path="/" element={<LandingNavbar />}>
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        {/* USER ROUTES */}
        <Route
          element={
            <ProtectedRouter
              user={user}
              role="user"
              loading={loading}
              redirectTo="/login"
            />
          }
        >
          <Route path="/" element={<UserNavbar />}>
            <Route path="home" element={<Home />} />
            <Route path="forum" element={<Forum />} />
            <Route path="projects" element={<Projects />} />
            <Route path="skills" element={<Skills />} />
            <Route path="skills/quiz" element={<QuizModal />} />
            <Route path="profile/:username" element={<Profile />} />
            <Route path="userNotification" element={<UserNotification />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
            <Route path="projects/:id" element={<ViewProject />} />
            <Route path="archives" element={<Archives />} />
          </Route>
        </Route>

        {/* ADMIN ROUTES */}
        <Route
          element={
            <ProtectedRouter
              user={user}
              role="admin"
              loading={loading}
              redirectTo="/login"
            />
          }
        >
          <Route path="/admin" element={<AdminNavbar />}>
            <Route path="analytics" element={<Analytics />} />
            <Route path="announcements" element={<AnnouncementPanel />} />
            <Route path="forum" element={<LikHowDiscussions />} />
            <Route path="projects" element={<UploadedProjects />} />
            <Route path="users" element={<UserAccounts />} />
          </Route>
        </Route>

        {/* FALLBACK - Redirect to appropriate page based on role */}
        <Route
          path="*"
          element={
            loading ? (
              <div>Loading...</div>
            ) : user ? (
              user.role === "admin" ? (
                <Navigate to="/admin" />
              ) : (
                <Navigate to="/home" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </UserContext.Provider>
  );
}
