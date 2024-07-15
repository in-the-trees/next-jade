export const runtime = "edge";

import type { Metadata, Viewport } from "next";
import "@/app/_styles/globals.css";
import { inter } from "@/app/_fonts/fonts";
import PathTracker from "@/app/_components/PathTracker";

export const metadata: Metadata = {
   metadataBase: new URL("https://inthetrees.me"),
   title: "Jade van Dorsten",
   description:
      "My personal website. long story short, I'm a human and a netizen.",
   authors: [{ name: "Jade van Dorsten", url: "https://inthetrees.me" }],
   creator: "Jade van Dorsten",
};

export const viewport: Viewport = {
   themeColor: [
      { media: "(prefers-color-scheme: light)", color: "#f5f5f4" },
      { media: "(prefers-color-scheme: dark)", color: "#1c1917" },
   ],
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <body
            className={`${inter.className} mx-[calc(1.75rem-1rem)] mb-7 overflow-x-hidden overflow-y-visible bg-stone-100 text-sm text-forest-950 md:mx-7 md:mb-7 dark:bg-stone-900 dark:text-stone-50 dark:antialiased`}
         >
            <PathTracker>{children}</PathTracker>
         </body>
      </html>
   );
}
