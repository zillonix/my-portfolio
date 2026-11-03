import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { OceanWavesBackground } from "@/components/OceanWavesBackground";
import { profile } from "@/data/profile";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

const SITE_URL = "https://zulhusni.org";
const SITE_TITLE = "Zulhusni Irfan | Software Developer";
const SITE_DESCRIPTION =
  "Portfolio of Zulhusni Irfan - Full-Stack Web Developer specializing in web applications, IT infrastructure, and AI solutions.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: [
    "portfolio",
    "web developer",
    "software engineer",
    "full-stack developer",
    "Malaysia",
    "Next.js",
    "Laravel",
    "TypeScript",
    "Zulhusni Irfan",
  ],
  authors: [{ name: profile.name }],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_TITLE,
    type: "website",
  },
};

// Applied synchronously in <head> before React hydrates, preventing any flash
// of the wrong theme (FOUC). Resolution order: stored choice → OS preference →
// dark default. An explicit OS *light* preference only wins when nothing is
// stored; otherwise dark is the default. `color-scheme` is set so native UI
// (scrollbars, form controls) matches immediately too.
const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':!window.matchMedia('(prefers-color-scheme: light)').matches;var r=document.documentElement;r.classList.toggle('dark',d);r.style.colorScheme=d?'dark':'light';}catch(e){document.documentElement.classList.add('dark');}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={`${inter.variable} font-sans`}>
        <OceanWavesBackground />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-foreground"
        >
          Skip to content
        </a>
        <div id="top" />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
