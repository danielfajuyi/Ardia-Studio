import { useState, useEffect } from "react";
import axios from "axios";
import Button from "../../components/ui/Button";
import { Save, RefreshCw } from "lucide-react";

const ContentDashboard = () => {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Local state for edits before saving
  // Structure: { hero: { title: "New Title" } }
  const [edits, setEdits] = useState({});

  const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:5000";

  const fetchContent = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${SERVER_URL}/api/cms`);
      setContent(data);
      setEdits(data); // Initialize edits with current data
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleChange = (section, key, value) => {
    setEdits((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const handleSave = async (section, key) => {
    setSaving(true);
    try {
      const value = edits[section][key];
      await axios.post(
        `${SERVER_URL}/api/cms`,
        {
          section,
          key,
          value,
        },
        { withCredentials: true },
      );

      // Update "official" content state
      setContent((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [key]: value,
        },
      }));
      alert("Saved!");
    } catch (error) {
      console.error(error);
      alert("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  // Helper to render an input field for a specific content key
  const renderField = (section, key, label) => {
    const value = edits[section]?.[key] || "";

    return (
      <div className="mb-4">
        <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
          {label}
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={value}
            onChange={(e) => handleChange(section, key, e.target.value)}
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
          />
          <Button
            onClick={() => handleSave(section, key)}
            variant="secondary"
            className="p-2"
            disabled={saving}
          >
            <Save className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  };

  if (loading) return <div className="text-white">Loading Content...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">Content Management</h1>
        <Button variant="glow" onClick={fetchContent}>
          <RefreshCw className="w-4 h-4 mr-2" /> Refresh
        </Button>
      </div>

      {/* Sections */}
      <div className="space-y-8">
        {/* Hero Section Card */}
        <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-blue-400 mb-6 border-b border-white/5 pb-2">
            Hero Section
          </h2>
          {renderField("hero", "title", "Main Title")}
          {renderField("hero", "subtitle", "Subtitle Text")}
          {renderField("hero", "cta_text", "Button Text")}
        </div>

        {/* About Section Card (Example) */}
        <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-blue-400 mb-6 border-b border-white/5 pb-2">
            About Section
          </h2>
          {renderField("about", "description", "Description Paragraph")}
        </div>
      </div>
    </div>
  );
};

export default ContentDashboard;
