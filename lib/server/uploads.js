import fs from "node:fs/promises";
import path from "node:path";
import { v2 as cloudinary } from "cloudinary";
import { allowedUploadTypes, maxUploadSize } from "@/lib/validation";

function sanitizeFileName(name) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "-").slice(0, 96);
}

export async function handleUpload(file, reference) {
  if (!file || file.size === 0) return undefined;
  if (!allowedUploadTypes.includes(file.type)) throw new Error("Unsupported file type.");
  if (file.size > maxUploadSize) throw new Error("File must be 8 MB or less.");

  const buffer = Buffer.from(await file.arrayBuffer());
  const base = {
    originalName: file.name,
    contentType: file.type,
    size: file.size,
  };

  if (
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  ) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });

    const uploaded = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: process.env.CLOUDINARY_FOLDER || "aayat-requirements",
          resource_type: "auto",
          public_id: `${reference}-${sanitizeFileName(file.name)}`,
        },
        (error, result) => {
          if (error || !result) reject(error || new Error("Cloudinary upload failed."));
          else resolve({ secure_url: result.secure_url });
        }
      );
      stream.end(buffer);
    });
    return { ...base, secureUrl: uploaded.secure_url, storage: "cloudinary" };
  }

  if (process.env.NODE_ENV !== "production") {
    const uploadDir = path.join(process.cwd(), "work", "uploads");
    await fs.mkdir(uploadDir, { recursive: true });
    const filePath = path.join(uploadDir, `${reference}-${sanitizeFileName(file.name)}`);
    await fs.writeFile(filePath, buffer);
    return { ...base, secureUrl: filePath, storage: "local-dev" };
  }

  return { ...base, storage: "metadata-only" };
}
