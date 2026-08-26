"use client";
import { MoreVertical, FileText, Music, Video, Image as ImageIcon } from "lucide-react";

type RecentFile = {
  id: string; // add this
  name: string;
  date: string;
  type: "pdf" | "audio" | "video" | "image";
  thumbnailUrl?: string;
};

const iconByType = { pdf: FileText, audio: Music, video: Video, image: ImageIcon };

export default function RecentFilesList({ files }: { files: RecentFile[] }) {
  return (
    <div className="bg-white rounded-3xl p-5">
      <h2 className="text-lg font-bold text-brand-dark mb-3">Recent files uploaded</h2>
      {files.map((file) => {
        const Icon = iconByType[file.type];
        return (
          <div key={file.id} className="flex items-center justify-between py-2.5">
              <div className="flex items-center gap-2.5">
                {file.thumbnailUrl ? (
                  <img
                    src={file.thumbnailUrl}
                    alt={file.name}
                    className="w-8 h-8 rounded-md object-cover shrink-0"
                  />
                ) : (
                  <Icon className="text-brand shrink-0" size={16} />
                )}
                <div>
                  <p className="text-sm font-medium text-brand-dark truncate max-w-[180px]">{file.name}</p>
                  <p className="text-xs text-accent">{file.date}</p>
                </div>
              </div>
              <button className="text-accent hover:text-brand shrink-0">
                <MoreVertical size={14} />
              </button>
          </div>
          );
        })}
      </div>
  );
}