"use client";
import { FileText, Music, Video, MoreVertical } from "lucide-react";

type FileItem = {
  name: string;
  sizeLabel: string;
  date: string;
  owner: string;
  type: "pdf" | "audio" | "video" | "image";
  thumbnailUrl?: string;
};

const typeConfig = {
  pdf: { icon: FileText, bg: "bg-accent/20", fg: "text-brand" },
  audio: { icon: Music, bg: "bg-accent/15", fg: "text-brand" },
  video: { icon: Video, bg: "bg-accent/20", fg: "text-brand" },
  image: { icon: null, bg: "", fg: "" },
};

export default function FileCard({ file }: { file: FileItem }) {
  const config = typeConfig[file.type];

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        {file.type === "image" && file.thumbnailUrl ? (
          <img
            src={file.thumbnailUrl}
            alt={file.name}
            className="w-14 h-14 rounded-full object-cover"
          />
        ) : (
          <div className={`w-14 h-14 rounded-full flex items-center justify-center ${config.bg}`}>
            {config.icon && <config.icon className={config.fg} size={24} />}
          </div>
        )}
        <button className="text-accent hover:text-brand">
          <MoreVertical size={18} />
        </button>
      <p className="text-xs text-peanut text-right mb-2">{file.sizeLabel}</p>
      </div>

      <p className="font-medium text-brand-dark text-sm truncate mb-1">{file.name}</p>
      <p className="text-xs text-peanut/40">{file.date}</p>
      <p className="text-xs text-peanut/40">By: {file.owner}</p>
    </div>
  );
}