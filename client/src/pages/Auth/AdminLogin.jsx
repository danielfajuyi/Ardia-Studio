import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";
import { ShieldAlert } from "lucide-react";

const AdminLogin = () => {
  const { loginWithGoogle, loginWithEmail, user, logout } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ email: "", password: "" });

  // If already logged in and admin, go to dashboard
  if (user && user.role === "admin") {
    return <Navigate to="/dashboard/admin" replace />;
  }

  const handleSuccess = async (credentialResponse) => {
    try {
      setError("");
      const loggedInUser = await loginWithGoogle(credentialResponse);

      if (loggedInUser.role !== "admin") {
        await logout();
        setError("Access Denied: You do not have administrator privileges.");
      } else {
        navigate("/dashboard/admin");
      }
    } catch (error) {
      console.error("Login Error", error);
      setError("An error occurred during login.");
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const loggedInUser = await loginWithEmail(
        formData.email,
        formData.password,
      );
      if (loggedInUser.role !== "admin") {
        await logout();
        setError("Access Denied: You do not have administrator privileges.");
      } else {
        navigate("/dashboard/admin");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Authentication failed");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white relative overflow-hidden">
      {/* Background hint effectively telling this is admin area */}
      <div className="absolute inset-0 bg-blue-900/10 z-0 pointer-events-none" />

      <div className="bg-zinc-900/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md text-center border border-blue-500/30 z-10 relative">
        <div className="flex justify-center mb-4">
          <div className="bg-blue-500/20 p-3 rounded-full">
            <ShieldAlert className="w-8 h-8 text-blue-400" />
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-2 text-blue-100">Admin Portal</h1>
        <p className="text-gray-400 mb-8">Authorized personnel only</p>

        {error && (
          <div className="mb-6 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
            {error}
          </div>
        )}

        <div className="flex justify-center mb-6">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => setError("Google Sign-In Failed")}
            theme="filled_black"
            shape="pill"
          />
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-zinc-900 text-gray-500">
              Or sign in with email
            </span>
          </div>
        </div>

        <form onSubmit={handleEmailLogin} className="space-y-4 text-left">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/10">
          <a
            href="/login"
            className="text-sm text-gray-500 hover:text-white transition-colors"
          >
            Go to Student Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
