import type { Metadata, Viewport } from "next";
import "./globals.css";
import { inter } from "@/app/_fonts/fonts";

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
      { media: "(prefers-color-scheme: dark)", color: "#f5f5f4" },
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
            className={`${inter.className} text-forest-950 mx-[calc(1.75rem-1rem)] mb-7 overflow-x-hidden overflow-y-visible bg-stone-100 text-sm md:mx-7 md:mb-7`}
         >
            {children}
         </body>
      </html>
   );
}
