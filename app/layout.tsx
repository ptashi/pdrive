import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: [
    '100', '200', '300', '400', '500', '600', '700', '800', '900'
  ],
  variable: '--font-poppins'
})

export const metadata: Metadata = {
  title: "PDrive",
  description: "PDrive - Google Drive but make it personalized.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} font-poppins antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
