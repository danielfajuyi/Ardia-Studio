import React, { useState, forwardRef } from "react";

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "dbvupguis";

export const getCloudinaryVideoUrl = (localSrc) => {
  if (!localSrc) return "";
  if (localSrc.startsWith("http") || localSrc.startsWith("data:"))
    return localSrc; // Already absolute URL or base64

  // Clean leading slash
  const cleanSrc = localSrc.startsWith("/") ? localSrc.slice(1) : localSrc;

  // Remove file extension
  const withoutExt = cleanSrc.replace(/\.[^/.]+$/, "");

  // Construct the Cloudinary URL mapped exactly to how the migration script structures them.
  // We use f_auto,q_auto to optimize size/format lazily based on the browser without breaking synchronous uploads.
  return `https://res.cloudinary.com/${cloudName}/video/upload/f_auto,q_auto/ardai/${withoutExt}.mp4`;
};

const CloudinaryVideo = forwardRef(({ src, ...props }, ref) => {
  const [error, setError] = useState(false);

  // Attempt to use Cloudinary URL; if it errors out (e.g. not uploaded yet), fall back to exact local src
  const videoSrc = error ? src : getCloudinaryVideoUrl(src);

  return (
    <video
      ref={ref}
      src={videoSrc}
      onError={(e) => {
        if (!error && src) {
          console.warn(
            `Failed to load Cloudinary video: ${src}, falling back to local.`,
          );
          setError(true);
        }
        // Call user's onError handler if one was passed in
        if (props.onError) {
          props.onError(e);
        }
      }}
      {...props}
    />
  );
});

CloudinaryVideo.displayName = "CloudinaryVideo";

export default CloudinaryVideo;
