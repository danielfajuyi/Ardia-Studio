import { useState } from "react";
import axios from "axios";
import Button from "../ui/Button";
import { Upload, CheckCircle, AlertCircle, Loader } from "lucide-react";

const AdminUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState(null);

  const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:5000";

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage(null);
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setMessage(null);

    const formData = new FormData();
    formData.append("video", file);

    try {
      const { data } = await axios.post(
        `${SERVER_URL}/api/admin/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        },
      );
      setMessage({ type: "success", text: "Upload Successful!" });
      setUploadedUrl(data.url);
      setFile(null);
    } catch (error) {
      console.error(error);
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Upload failed",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-zinc-900 border border-white/10 p-6 rounded-2xl max-w-xl">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Upload className="w-5 h-5 text-blue-400" />
        Upload New Video
      </h2>

      <div className="space-y-4">
        <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-blue-400/50 transition-colors">
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="hidden"
            id="video-upload"
          />
          <label htmlFor="video-upload" className="cursor-pointer block">
            {file ? (
              <div className="text-green-400 font-medium truncate">
                {file.name}
              </div>
            ) : (
              <div className="text-gray-400">
                <span className="text-blue-400 font-semibold">
                  Click to browse
                </span>{" "}
                or drag video here
              </div>
            )}
          </label>
        </div>

        {message && (
          <div
            className={`p-3 rounded-lg flex items-center gap-2 text-sm ${
              message.type === "success"
                ? "bg-green-500/10 text-green-400"
                : "bg-red-500/10 text-red-400"
            }`}
          >
            {message.type === "success" ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <AlertCircle className="w-4 h-4" />
            )}
            {message.text}
          </div>
        )}

        {uploadedUrl && (
          <div className="text-sm text-gray-400 break-all p-3 bg-black/30 rounded-lg">
            <p className="font-mono text-xs text-blue-300">
              URL: {uploadedUrl}
            </p>
          </div>
        )}

        <Button
          variant="primary"
          className="w-full"
          onClick={handleUpload}
          disabled={!file || uploading}
        >
          {uploading ? (
            <span className="flex items-center gap-2">
              <Loader className="w-4 h-4 animate-spin" /> Uploading...
            </span>
          ) : (
            "Start Upload"
          )}
        </Button>
      </div>
    </div>
  );
};

export default AdminUpload;
