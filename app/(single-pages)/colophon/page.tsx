import type { Metadata } from "next";
import Breadcrumb from "@/app/_components/breadcrumb";
import { lora } from "@/app/_fonts/fonts";

export const metadata: Metadata = {
   title: "inthetrees.me colophon",
   description: "Links to various platforms I have accounts on.",
};

export default function WebPresencePage() {
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

            <section className="mt-9">...</section>
         </main>
      </div>
   );
}
