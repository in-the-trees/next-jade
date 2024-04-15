import { Inter } from "next/font/google";
import { Lora } from "next/font/google";
import localFont from "next/font/local";

export const inter = Inter({
   subsets: ["latin"],
});
export const lora = Lora({
   subsets: ["latin"],
   style: ["normal", "italic"],
});

export const commit_mono = localFont({
   src: "./CommitMonoVariable.woff2",
});
