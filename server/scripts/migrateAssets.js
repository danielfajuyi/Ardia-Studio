import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ASSETS_DIR = path.resolve(__dirname, "../../client/public/asset");

const BASE_CLOUDINARY_FOLDER = "ardai/asset";

function getFilesRecursively(dir) {
  let files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    // Skip hidden files or specific system files
    if (
      entry.name.startsWith(".") ||
      entry.name.endsWith(".docx") ||
      entry.name.endsWith(".pdf")
    ) {
      continue;
    }

    if (entry.isDirectory()) {
      files = files.concat(getFilesRecursively(fullPath));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

function formatBytes(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

async function uploadFile(filePath, cloudinaryFolder, fileName) {
  try {
    const isVideo = filePath.match(/\.(mp4|webm|mov|avi)$/i);
    const resourceType = isVideo ? "video" : "image";

    const uploadOptions = {
      folder: cloudinaryFolder,
      public_id: fileName,
      resource_type: resourceType,
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };

    if (resourceType === "video") {
      // Lazy encoding
    } else {
      uploadOptions.quality = "auto";
      uploadOptions.fetch_format = "auto";
    }

    if (isVideo) {
      return await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_large(
          filePath,
          uploadOptions,
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        );
      });
    } else {
      return await cloudinary.uploader.upload(filePath, uploadOptions);
    }
  } catch (error) {
    console.error(`\n❌ Failed to upload ${filePath}:`);
    console.error(error.message || error);
    return null;
  }
}

async function runUpload() {
  console.log(`\nScanning directory: ${ASSETS_DIR}...`);
  if (!fs.existsSync(ASSETS_DIR)) {
    console.error(`Error: Assets directory not found`);
    return;
  }

  const allFiles = getFilesRecursively(ASSETS_DIR);
  console.log(`Found ${allFiles.length} media files to upload.\n`);

  let completed = 0;

  for (const filePath of allFiles) {
    const stats = fs.statSync(filePath);
    const fileSize = formatBytes(stats.size);
    const parsedPath = path.parse(filePath);

    // Determine the relative path to figure out the right folder
    const relativeDir = path.dirname(path.relative(ASSETS_DIR, filePath));
    const cloudinaryFolder =
      relativeDir === "."
        ? BASE_CLOUDINARY_FOLDER
        : `${BASE_CLOUDINARY_FOLDER}/${relativeDir.replace(/\\/g, "/")}`;

    completed++;
    const progressPercent = Math.round((completed / allFiles.length) * 100);
    const bar =
      "█".repeat(Math.round(progressPercent / 5)) +
      "-".repeat(20 - Math.round(progressPercent / 5));

    console.log(`\n======================================================`);
    console.log(
      `[${bar}] ${progressPercent}% | File ${completed} of ${allFiles.length}`,
    );
    console.log(`Uploading: ${parsedPath.base} (${fileSize})`);
    console.log(`To: ${cloudinaryFolder}`);

    // Start upload
    const startTime = Date.now();
    const result = await uploadFile(
      filePath,
      cloudinaryFolder,
      parsedPath.name,
    );
    const duration = ((Date.now() - startTime) / 1000).toFixed(1);

    if (result) {
      console.log(`✅ Success in ${duration}s -> ${result.secure_url}`);
    }
  }

  console.log(
    `\n🎉 Migration complete! All ${allFiles.length} files processed.`,
  );
}

runUpload();
