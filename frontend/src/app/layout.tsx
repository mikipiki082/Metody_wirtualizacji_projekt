import type { Metadata } from "next";
import { Geist } from "next/font/google";
import localFont from "next/font/local";
import { Backdrop } from "@/components/backdrop";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const geist = Geist({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
});

const aveDisplay = localFont({
  src: "../fonts/AveDisplay-Regular.woff2",
  variable: "--font-ave",
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Redline Rent - wypożyczalnia sportowych aut i rowerów",
  description:
    "Wypożyczalnia sportowych i tuningowanych samochodów oraz rowerów premium.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pl"
      className={`${geist.variable} ${aveDisplay.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Backdrop />
        <SiteHeader />
        <main className="flex flex-1 flex-col">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
