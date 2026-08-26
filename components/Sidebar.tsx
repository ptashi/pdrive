"use client"

import { LayoutGrid, FileText, Image as ImageIcon, Video, MoreHorizontal } from "lucide-react"
import Image from "next/image"
import Link from "next/link"


const navItems = [
    {name: "Dashboard", icon: LayoutGrid, href: "/dashboard"},
    { name: "Documents", icon: FileText, href: "/documents" },
    { name: "Images", icon: ImageIcon, href: "/images" },
    { name: "Media", icon: Video, href: "/media" },
    { name: "Others", icon: MoreHorizontal, href: "/others" },
]

export default function Sidebar({ active="Dashboard" }: { active?: string }) {
    return (
        <aside className="w-64 h-screen flex flex-col justify-between p-6 border-r border-accent/20">
            <div>
                <div className="flex items-center gap-2 mb-10">
                    <Image src="/favicon.ico" alt="Logo P" width={50} height={50} />
                    <span className="text-3xl font-semibold text-brand mx-2">P-Drive</span>
                </div>

                <nav className="flex flex-col gap-2">
                    {navItems.map(({ name, icon: Icon, href}) => {
                        const isActive = name === active;
                        return (
                            <Link key={name} href={href} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${isActive ? "bg-brand text-white" : "text-brand-dark hover:bg-accent/15"}`}>
                                <Icon size={18} />
                                {name}
                            </Link>
                        )
                    })}
                </nav>
            </div>

            <div className="flex items-center gap-3 pt-6 border-t border-accent/20">
                <div className="w-9 h-9 rounded-full bg-accent/30">
                    <div className="tesxt-sm">
                        <p className="font-medium text-brand-dark">Your Name</p>
                        <p className="text-accent text-xs">you@email.com</p>
                    </div>
                </div>
            </div>
        </aside>
    )
}