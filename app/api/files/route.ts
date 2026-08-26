import { S3Client, ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function GET() {
  const command = new ListObjectsV2Command({
    Bucket: process.env.S3_BUCKET_NAME,
  });

  const result = await s3.send(command);

  const files = await Promise.all(
    (result.Contents ?? []).map(async (obj) => {
      const key = obj.Key ?? "";
      const filename = key.substring(37);
      const extension = filename.split(".").pop()?.toLowerCase() ?? "";

      let type: "pdf" | "image" | "video" | "audio" | "other" = "other";
      if (extension === "pdf") type = "pdf";
      else if (["png", "jpg", "jpeg", "gif", "webp"].includes(extension)) type = "image";
      else if (["mp4", "mov", "avi"].includes(extension)) type = "video";
      else if (["mp3", "wav", "m4a"].includes(extension)) type = "audio";

      // Only bother generating a preview URL for images — no need for pdfs/video/audio
      let thumbnailUrl: string | undefined;
      if (type === "image") {
        const getCommand = new GetObjectCommand({
          Bucket: process.env.S3_BUCKET_NAME,
          Key: key,
        });
        thumbnailUrl = await getSignedUrl(s3, getCommand, { expiresIn: 3600 }); // 1 hour
      }

      return {
        key,
        filename,
        type,
        sizeBytes: obj.Size ?? 0,
        lastModified: obj.LastModified,
        thumbnailUrl,
      };
    })
  );

  return NextResponse.json({ files });
}