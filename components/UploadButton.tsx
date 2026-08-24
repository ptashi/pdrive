"use client";
import { useState } from "react";

export default function UploadButton() {
  const [status, setStatus] = useState("");

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setStatus("Getting upload URL...");
    const res = await fetch("/api/upload-url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filename: file.name, contentType: file.type }),
    });
    const { uploadUrl, key } = await res.json();

    setStatus("Uploading...");
    await fetch(uploadUrl, {
      method: "PUT",
      headers: { "Content-Type": file.type },
      body: file,
    });

    setStatus(`Uploaded! S3 key: ${key}`);
    // Next: POST { key, filename, size } to your own /api/files route
    // to save metadata in your database
  }

  return (
    <div>
      <input type="file" onChange={handleUpload} />
      <p>{status}</p>
    </div>
  );
}