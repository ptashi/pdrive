"use client"

import { RadiusIcon } from "lucide-react";

type StorageCardProps = {
    usedMB: number;
    totalMB: number;
}

export default function StorageCard({ usedMB, totalMB }: StorageCardProps) {
    const percentUsed = (usedMB / totalMB) * 100

    const radius = 70
    const circumference = 2 * Math.PI * radius
    const dashOffset = circumference - (percentUsed / 100) * circumference

    const totalLabel = totalMB >= 1000 ? `${(totalMB/1000).toFixed(0)}GB` : `${totalMB}MB`

    return (
        <div className="bg-brand rounded-4xl p-8 flex items-center gap-8">
            <div className="relative w-40 h-40 shrink-0">
            <svg viewBox="0 0 160 160" className="w-full h-full -rotate-90">
                {/* background track */}
                <circle
                    cx="80"
                    cy="80"
                    r={radius}
                    fill="none"
                    stroke="white"
                    strokeOpacity="0.25"
                    strokeWidth="14"
                />
                {/* progress arc */}
                <circle
                    cx="80"
                    cy="80"
                    r={radius}
                    fill="none"
                    stroke="white"
                    strokeWidth="14"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
                />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <span className="text-2xl font-bold">{percentUsed.toFixed(2)}%</span>
                    <span className="text-xs opacity-80">Space used</span>
                </div>
            </div>

            <div className="text-white">
                <p className="text-xl font-bold mb-1">Available Storage</p>
                <p className="opacity-90 text-sm">
                    {usedMB.toFixed(1)} MB / {totalLabel}
                </p>
            </div>
        </div>
    )

}