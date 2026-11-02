import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
import { profile } from "@/data/profile";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

export const metadata: Metadata = {
  title: `${profile.name} — Full-Stack Developer`,
  description:
    "Portfolio of Muhammad Zulhusni Irfan Bin Md Zulkfili: full-stack web development with Laravel and modern TypeScript, IT systems and networking, and AI logic programming.",
  keywords: [
    "Full-Stack Developer",
    "Laravel",
    "Next.js",
    "TypeScript",
    "IT Support",
    "Networking",
    "Prolog",
    "Malaysia",
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} — Full-Stack Developer`,
    description:
      "Full-stack web development, IT systems, and AI logic — projects, experience, and case studies.",
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
        <AnimatedBackground />
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
