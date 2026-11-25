import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Logo from "@/components/ui/Logo";
import ThemeToggle, { themeScript } from "@/components/ui/ThemeToggle";
import { getComponentDocs, registryInfo } from "@/lib/registry";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KAI UI",
  description: "Copy-paste React components, installable with the shadcn CLI.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const first = getComponentDocs()[0];
  const homeHref = first ? `/components/${first.name}` : "/";

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full">
        <header className="sticky top-0 z-30 bg-paper/90 backdrop-blur-md">
          <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:px-6">
            <Link href={homeHref} className="flex items-center gap-3">
              <Logo />
              <span className="text-[15px]">KAI UI</span>
            </Link>

            <nav className="flex items-center gap-6 text-sm">
              {registryInfo.homepage && (
                <a
                  href={registryInfo.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden transition-colors hover:text-blue sm:block"
                >
                  GitHub
                </a>
              )}
              <ThemeToggle />
            </nav>
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}
