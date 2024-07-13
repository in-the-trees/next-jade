export const runtime = "nodejs";

import { promises as fs } from "fs";
import path from "path";
import { MDXRemote } from "next-mdx-remote/rsc";

import type { Metadata } from "next";
import Breadcrumb from "@/app/_components/breadcrumb";
import { lora, commit_mono } from "@/app/_fonts/fonts";

export const metadata: Metadata = {
   title: "Colophon",
   description:
      "Colophon for inthetrees.me describing how the site is made, with what tools, supporting what technologies, etc.",
};

async function getColophonContent() {
   const filePath = path.join(
      process.cwd(),
      "app",
      "(single-pages)",
      "colophon",
      "colophon.md",
   );
   return fs.readFile(filePath, "utf8");
}

export default async function ColophonPage() {
   const colophonContent = await getColophonContent();

   return (
      <div>
         <header className="z-40">
            <div className="pb-4">
               <Breadcrumb
                  items={[
                     { type: "link", text: "Jade", href: "/" },
                     { type: "separator" },
                     { type: "text", text: "Colophon" },
                  ]}
               />
            </div>
         </header>
         <div className="gradient-blur">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
         </div>
         <main>
            <h1
               className={`${lora.className} mb-3.5 text-[1.5em] font-normal-mid`}
            >
               Colophon
            </h1>

            <section className="mt-9">
               <div
                  className={`proseStyling prose-sm ${lora.variable} ${commit_mono.variable}`}
               >
                  <MDXRemote source={colophonContent} />
               </div>
            </section>
         </main>
      </div>
   );
}
