import { Inter } from "next/font/google";
import { Lora } from "next/font/google";
import localFont from "next/font/local";

export const inter = Inter({
   subsets: ["latin"],
   variable: "--font-inter",
});
export const lora = Lora({
   subsets: ["latin"],
   style: ["normal", "italic"],
   variable: "--font-lora",
});

export const commit_mono = localFont({
   src: "./CommitMonoVariable.woff2",
   variable: "--font-commit-mono",
});
