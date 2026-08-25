import AmplifyConfigInit from "@/components/AmplifyConfig";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins'
})

export const metadata: Metadata = {
  title: "PDrive",
  description: "PDrive - Google Drive but make it personalized.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={cn("font-poppins", "antialiased", poppins.variable, "font-sans", inter.variable)}>
      <body className="min-h-full flex flex-col">
        <AmplifyConfigInit />
        {children}
      </body>
    </html>
  );
}