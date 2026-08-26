"use client";
import { LucideIcon } from "lucide-react";

type CategoryCardProps = {
  icon: LucideIcon;
  sizeLabel: string;
  label: string;
  date: string;
};

export default function CategoryCard({ icon: Icon, sizeLabel, label, date }: CategoryCardProps) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm relative">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center absolute left-5 bg-brand`}>
        <Icon className="text-white" size={18} />
      </div>
      <p className="text-right text-lg font-semibold text-brand-dark mb-2">{sizeLabel}</p>
      <p className="font-bold text-brand-dark pt-4">{label}</p>
      <hr className="my-2 border-peanut/20" />
      <p className="text-xs text-peanut">{date}</p>
    </div>
  );
}