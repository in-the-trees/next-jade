import { Lora } from "next/font/google";
import localFont from "next/font/local";

export const inter = localFont({
   src: [
      {
         path: "./InterVariable.woff2",
         style: "normal",
      },
      {
         path: "./InterVariable-Italic.woff2",
         style: "italic",
      },
   ],
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
