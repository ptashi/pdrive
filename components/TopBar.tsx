"use client";
import { Search, Upload, LogOut } from "lucide-react";
import { useRef, useState } from "react";

type TopBarProps = {
  onUploadComplete?: () => void; // called after a successful upload, e.g. to refresh the file list
};

export default function TopBar({ onUploadComplete }: TopBarProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [status, setStatus] = useState("");

    function handleUploadClick() {
        fileInputRef.current?.click(); // programmatically "clicks" the hidden file input
    }

    async function handleFileSelected(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (!file) return

        setStatus("Getting upload URL....")
        const res = await fetch("/api/upload-url", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ filename: file.name, contentType: file.type }),
        })

        const { uploadURL, key } = await res.json();

        setStatus("Uploading...")

        await fetch(uploadURL, {
            method: "PUT",
            headers: { "Content-Type": file.type },
            body: file,
        })

        setStatus(`Uploaded: ${key}`)
        onUploadComplete?.();

        e.target.value = ""
    }
   
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="relative w-80">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-accent" size={18} />
        <input
          type="text"
          placeholder="Search"
          className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-accent/30 text-sm text-brand-dark placeholder:text-accent focus:outline-none focus:ring-2 focus:ring-brand/40"
        />
      </div>

      <div className="flex items-center gap-3">
        {/* Hidden file input — never shown, just triggered programmatically */}
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileSelected}
        />

        <button
          onClick={handleUploadClick}
          className="flex items-center gap-2 bg-brand hover:bg-brand-dark text-white px-5 py-2.5 rounded-full text-sm font-medium transition-colors"
        >
          <Upload size={16} />
          {status || "Upload"}
        </button>

        <button className="w-10 h-10 rounded-full bg-accent/15 flex items-center justify-center text-brand hover:bg-accent/25">
          <LogOut size={16} />
        </button>
      </div>
    </div>
  );
}