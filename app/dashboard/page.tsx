"use client";
import { useEffect, useState } from "react";
import DashboardShell from "@/components/dashboard/DashboardShell";
import StorageCard from "@/components/dashboard/StorageCard";
import CategoryCard from "@/components/dashboard/CategoryCard";
import RecentFilesList from "@/components/dashboard/RecentFilesList";
import { FileText, Image as ImageIcon, Video, PieChart } from "lucide-react";

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

export default function DashboardPage() {
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

    const totalBytes = files.reduce((sum, f) => sum + f.sizeBytes, 0);
    const totalMB = totalBytes / (1024 * 1024);

      // Helper: sum up bytes for files matching a given type, convert to a readable label
     function sizeLabelFor(type: ApiFile["type"]) {
        const bytes = files
        .filter((f) => f.type === type)
        .reduce((sum, f) => sum + f.sizeBytes, 0);
        if (bytes === 0) return "0 Bytes";
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
     }

  // "pdf" files count as Documents; everything else maps to its own category or "Others"
    const categories = [
        { icon: FileText, iconBg: "bg-brand", sizeLabel: sizeLabelFor("pdf"), label: "Documents", date: "" },
        { icon: ImageIcon, iconBg: "bg-blue-400", sizeLabel: sizeLabelFor("image"), label: "Images", date: "" },
        { icon: Video, iconBg: "bg-emerald-400", sizeLabel: sizeLabelFor("video"), label: "Media", date: "" },
        { icon: PieChart, iconBg: "bg-purple-400", sizeLabel: sizeLabelFor("other"), label: "Others", date: "" },
    ];

    const recentFiles = [...files]
        .sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime())
        .slice(0, 5)
        .map((f) => ({
            id: f.key, // add this — the real unique identifier
            name: f.filename,
            date: formatDate(f.lastModified),
            type: f.type === "other" ? ("pdf" as const) : f.type,
            thumbnailUrl: f.thumbnailUrl,
    }));

    return (
        <DashboardShell active="Dashboard" onUploadComplete={loadFiles}>
        {loading ? (
            <p className="text-brand-dark">Loading your files...</p>
        ) : (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
            <div>
                <StorageCard usedMB={totalMB} totalMB={2000} />
                <div className="grid grid-cols-2 gap-4 mt-6">
                {categories.map((cat) => (
                    <CategoryCard key={cat.label} {...cat} />
                ))}
                </div>
            </div>
            <RecentFilesList files={recentFiles} />
            </div>
        )}
        </DashboardShell>
    );
}