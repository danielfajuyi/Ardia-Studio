import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";

const Login = () => {
  const { loginWithGoogle, loginWithEmail, registerWithEmail, user } =
    useAuth();
  const navigate = useNavigate();

  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  if (user) {
    return (
      <Navigate
        to={user.role === "admin" ? "/dashboard/admin" : "/dashboard/student"}
        replace
      />
    );
  }

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const loggedInUser = await loginWithGoogle(credentialResponse);
      if (loggedInUser.role === "admin") {
        navigate("/dashboard/admin");
      } else {
        navigate("/dashboard/student");
      }
    } catch (error) {
      console.error("Login Error", error);
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isRegistering) {
        await registerWithEmail(
          formData.name,
          formData.email,
          formData.password,
        );
      } else {
        await loginWithEmail(formData.email, formData.password);
      }
      // The useEffect or Navigate component above will handle redirect
    } catch (err) {
      setError(err.response?.data?.message || "Authentication failed");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
      <div className="bg-zinc-900 p-8 rounded-2xl shadow-xl w-full max-w-md text-center border border-white/10">
        <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
        <p className="text-gray-400 mb-8">Sign in to access your dashboard</p>

        <div className="flex justify-center mb-6">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => console.log("Login Failed")}
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
              Or continue with email
            </span>
          </div>
        </div>

        <form onSubmit={handleEmailAuth} className="space-y-4 text-left">
          {isRegistering && (
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 transition-colors"
                required
              />
            </div>
          )}
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
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 transition-colors"
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
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 transition-colors"
              required
            />
          </div>

          {error && <div className="text-red-400 text-sm">{error}</div>}

          <button
            type="submit"
            className="w-full bg-white text-black font-bold py-2 rounded-lg hover:bg-gray-200 transition-colors"
          >
            {isRegistering ? "Create Account" : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-500">
          {isRegistering
            ? "Already have an account?"
            : "Don't have an account?"}
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className="ml-2 text-purple-400 hover:text-purple-300 font-medium"
          >
            {isRegistering ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
