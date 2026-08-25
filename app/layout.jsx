import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { CursorGlow } from "@/components/cursor-glow";
import { SITE } from "@/lib/data";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(SITE.site),
  title: {
    default: `${SITE.name} - Developer`,
    template: `%s - ${SITE.name}`,
  },
  description:
    "Portfolio of Ahmad Hafizh: web apps, bots, and automation projects from Indonesia.",
  openGraph: {
    type: "website",
    url: SITE.site,
    title: `${SITE.name} - Developer`,
    description:
      "Web apps, bots, and automation projects from Indonesia.",
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#16171d" },
  ],
};

const noFlashScript = `(function(){try{var m=localStorage.getItem("pf-mode");var t=localStorage.getItem("pf-theme")||"modern";if(!m){m=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";}document.documentElement.dataset.mode=m;document.documentElement.dataset.theme=t;}catch(e){}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="modern" data-mode="dark" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${jetbrains.variable} font-sans antialiased`}
      >
        <script dangerouslySetInnerHTML={{ __html: noFlashScript }} />
        <ThemeProvider>
          <CursorGlow />
          <Navbar />
          <main className="relative z-10">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
