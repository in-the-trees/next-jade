import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/app/_fonts/fonts";

export const metadata: Metadata = {
   metadataBase: new URL("https://jade.van-dorsten.net"),
   title: "Jade van Dorsten",
   description:
      "My personal website. long story short, I'm a human and a netizen.",
   authors: [{ name: "Jade van Dorsten", url: "https://jade.van-dorsten.net" }],
   creator: "Jade van Dorsten",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <body
            className={`${inter.className} mx-[calc(1.75rem-1rem)] mb-7 overflow-x-hidden overflow-y-visible text-sm md:mx-7 md:mb-7`}
         >
            {children}
         </body>
      </html>
   );
}
