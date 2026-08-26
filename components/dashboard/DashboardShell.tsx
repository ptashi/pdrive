"use client";
import { ReactNode } from "react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";


type DashboardShellProps = {
  active: string;
  onUploadComplete?: () => void;
  children: ReactNode;
};

export default function DashboardShell({ active, onUploadComplete, children }: DashboardShellProps) {
  return (
    <div className="flex bg-white min-h-screen">
      <Sidebar active={active} />
      <main className="flex-1 p-8 bg-white">
        <TopBar onUploadComplete={onUploadComplete} />
        <div className="bg-accent rounded-3xl p-6 h-9/10">{children}</div>
      </main>
    </div>
  );
}