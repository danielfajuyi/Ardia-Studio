import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainLayout from "./components/layouts/MainLayout";
import Home from "./pages/Agency/Home";
import AcademyHome from "./pages/Academy/AcademyHome";
import StudentDashboard from "./pages/Academy/StudentDashboard";
import AdminDashboard from "./pages/Academy/AdminDashboard";
import Login from "./pages/Auth/Login";
import AdminLogin from "./pages/Auth/AdminLogin";
import AdminRegister from "./pages/Auth/AdminRegister";
import ContentDashboard from "./pages/CMS/ContentDashboard";
import ContentDashboardLayout from "./components/layouts/ContentDashboardLayout";
import { ReactLenis } from "@studio-freight/react-lenis";
import DashboardLayout from "./components/layouts/DashboardLayout";
import { useAuth } from "./context/AuthContext";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading)
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

// Admin Route Component
const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user || user.role !== "admin")
    return <Navigate to="/dashboard/student" replace />;
  return children;
};

function App() {
  return (
    <Router>
      <ReactLenis
        root
        options={{ lerp: 0.05, duration: 1.5, smoothWheel: true }}
      >
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminRegister />} />

          {/* Academy Routes */}
          <Route path="/academy" element={<MainLayout />}>
            <Route index element={<AcademyHome />} />
          </Route>

          {/* Dashboard Routes with Sidebar Layout */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="student" element={<StudentDashboard />} />
            <Route
              path="admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            {/* Add Admin Upload route here later */}
          </Route>

          {/* CMS Content Routes */}
          <Route
            path="/dashboard/content"
            element={
              <AdminRoute>
                <ContentDashboardLayout />
              </AdminRoute>
            }
          >
            <Route index element={<ContentDashboard />} />
          </Route>

          {/* Catch all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ReactLenis>
    </Router>
  );
}

export default App;
