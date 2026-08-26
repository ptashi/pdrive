"use client";
import { useEffect, useState } from "react";
import DashboardShell from "@/components/dashboard/DashboardShell";
import FileCard from "@/components/dashboard/FileCard";

type ApiFile = {
  key: string;
  filename: string;
  type: "pdf" | "image" | "video" | "audio" | "other";
  sizeBytes: number;
  lastModified: string;
};

function formatDate(isoString: string) {
  const date = new Date(isoString);
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  if (hours === 0) hours = 12;
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  return `${hours}:${minutes}${ampm}, ${day} ${month}`;
}

function formatSize(bytes: number) {
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function ImagesPage() {
  const [files, setFiles] = useState<ApiFile[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadFiles() {
    setLoading(true);
    const res = await fetch("/api/files");
    const data = await res.json();
    setFiles(data.files);
    setLoading(false);
  }

  useEffect(() => {
    loadFiles();
  }, []);

  const images = files.filter((f) => f.type === "image");
  const totalBytes = images.reduce((sum, f) => sum + f.sizeBytes, 0);

  return (
    <DashboardShell active="Images" onUploadComplete={loadFiles}>
      <h1 className="text-2xl font-bold text-brand-dark mb-1">Images</h1>
      <p className="text-accent text-sm mb-6">Total: {formatSize(totalBytes)}</p>

      {loading ? (
        <p className="text-brand-dark">Loading...</p>
      ) : images.length === 0 ? (
        <p className="text-accent">No images uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {images.map((file) => (
            <FileCard
              key={file.key}
              file={{
                name: file.filename,
                sizeLabel: formatSize(file.sizeBytes),
                date: formatDate(file.lastModified),
                owner: "You",
                type: "image",
                thumbnailUrl: file.thumbnailUrl, // add this line
              }}
            />
          ))}
        </div>
      )}
    </DashboardShell>
  );
}