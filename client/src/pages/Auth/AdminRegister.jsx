import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

const AdminRegister = () => {
  const { registerWithEmail } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    stack: "",
    jobTitle: "", // "Role" from prompt
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await registerWithEmail(
        formData.name,
        formData.email,
        formData.password,
        {
          phone: formData.phone,
          stack: formData.stack,
          jobTitle: formData.jobTitle,
          role: "admin", // Force admin role
        },
      );
      navigate("/dashboard/admin");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background hint */}
      <div className="absolute inset-0 bg-blue-900/10 z-0 pointer-events-none" />

      <div className="max-w-md w-full space-y-8 bg-zinc-900/80 backdrop-blur-md p-8 rounded-2xl border border-blue-500/30 z-10">
        <div className="text-center">
          <div className="mx-auto bg-blue-500/20 p-3 rounded-full w-fit mb-4">
            <ShieldCheck className="h-8 w-8 text-blue-400" />
          </div>
          <h2 className="text-3xl font-extrabold text-blue-100">
            Admin Registration
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Create your administrator account
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
                Full Name
              </label>
              <input
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                placeholder="John Doe"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
                  Stack / Tech
                </label>
                <input
                  name="stack"
                  type="text"
                  required
                  value={formData.stack}
                  onChange={handleChange}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                  placeholder="MERN, DevOps..."
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
                  Role / Title
                </label>
                <input
                  name="jobTitle"
                  type="text"
                  required
                  value={formData.jobTitle}
                  onChange={handleChange}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                  placeholder="CTO, Lead Dev..."
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                placeholder="admin@ardiastudio.com"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
                Phone Number
              </label>
              <input
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                placeholder="+1 (555) 000-0000"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-400 text-sm text-center bg-red-500/10 p-2 rounded">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? "Creating Admin..." : "Register Admin"}
            </button>
          </div>

          <div className="text-center text-sm">
            <span className="text-gray-400">
              Already have an admin account?{" "}
            </span>
            <Link
              to="/admin/login"
              className="font-medium text-blue-400 hover:text-blue-300"
            >
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminRegister;
