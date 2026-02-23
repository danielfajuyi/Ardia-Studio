import React, { useState, forwardRef } from "react";

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "dbvupguis";

export const getCloudinaryImageUrl = (localSrc) => {
  if (!localSrc) return "";
  if (localSrc.startsWith("http") || localSrc.startsWith("data:"))
    return localSrc;

  const cleanSrc = localSrc.startsWith("/") ? localSrc.slice(1) : localSrc;
  const withoutExt = cleanSrc.replace(/\.[^/.]+$/, "");

  return `https://res.cloudinary.com/${cloudName}/image/upload/q_auto/ardai/${withoutExt}.webp`;
};

const CloudinaryImage = forwardRef(({ src, alt, ...props }, ref) => {
  const [error, setError] = useState(false);

  const imgSrc = error ? src : getCloudinaryImageUrl(src);

  return (
    <img
      ref={ref}
      src={imgSrc}
      alt={alt || ""}
      onError={(e) => {
        if (!error && src) {
          console.warn(
            `Failed to load Cloudinary image: ${src}, falling back to local.`,
          );
          setError(true);
        }
        if (props.onError) {
          props.onError(e);
        }
      }}
      {...props}
    />
  );
});

CloudinaryImage.displayName = "CloudinaryImage";

export default CloudinaryImage;
