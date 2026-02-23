import { v2 as cloudinary } from "cloudinary";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function testUpload() {
  const filePath = path.resolve(
    __dirname,
    "../../client/public/asset/video/ai-ad-videos/KCT.mp4",
  );
  console.log("Testing upload for:", filePath);

  const uploadOptions = {
    folder: "ardai/asset/video/ai-ad-videos",
    public_id: "KCT",
    resource_type: "video",
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    format: "webm",
    video_codec: "auto",
  };

  try {
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_large(
        filePath,
        uploadOptions,
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        },
      );
    });
    console.log("Success:", result.secure_url);
  } catch (error) {
    console.error("Error Detail inside catch:");
    console.error(JSON.stringify(error, null, 2));
    console.error(error.message);
  }
}

testUpload();
