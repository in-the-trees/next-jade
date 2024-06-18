import Link from "next/link";
import Jade from "@/app/_components/Jade";
import Breadcrumb from "@/app/_components/breadcrumb";
import { lora } from "@/app/_fonts/fonts";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: "Page not found (404)",
   description: "",
};

export default function NotFound() {
   return (
      <div className="flex w-full justify-center">
         <div className="flex w-full max-w-[70rem] flex-row-reverse gap-2 md:h-full">
            <div className="w-full px-4 pt-[24px] md:w-2/3 md:pt-[40px] lg:pt-[56px]">
               <div>
                  <header className="z-40">
                     <div className="pb-4">
                        <Breadcrumb
                           items={[
                              { type: "link", text: "Jade", href: "/" },
                              { type: "separator" },
                              { type: "text", text: "404" },
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
                        404
                     </h1>
                     <h2 className="text-stone-500">Page not found</h2>
                  </main>
               </div>
            </div>
            <aside className="sticky top-0 hidden w-1/3 self-start overflow-y-scroll md:block md:pt-[44px] lg:pt-[60px]">
               <Jade className="max-h-screen overflow-auto px-4" />
            </aside>
         </div>
      </div>
   );
}
