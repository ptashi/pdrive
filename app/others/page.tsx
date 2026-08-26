"use client";
import DashboardShell from "@/components/dashboard/DashboardShell";

export default function OthersPage() {
  return (
    <DashboardShell active="Others" onUploadComplete={() => console.log("open upload flow")}>
      <h1 className="text-2xl font-bold text-brand-dark mb-1">Others</h1>
      <p className="text-accent text-sm mb-6">Total: 0 Bytes</p>

      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-brand-dark font-medium mb-1">No other files yet</p>
        <p className="text-accent text-sm">Files that don't fit other categories will show up here.</p>
      </div>
    </DashboardShell>
  );
}