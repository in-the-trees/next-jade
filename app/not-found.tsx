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
         <div className="flex w-full max-w-[70rem] gap-2 md:h-full">
            <aside className="sticky top-0 hidden w-1/3 self-start overflow-y-scroll md:block md:pt-[44px] lg:pt-[60px]">
               <Jade className="max-h-screen overflow-auto px-4" />
            </aside>
            <div className="w-full md:w-2/3">
               <div>
                  <header className="fixed top-0 z-30 w-full px-4">
                     <div className="-mx-4 bg-white px-4 pb-1 pt-[24px] md:pt-[40px] lg:pt-[56px] dark:bg-stone-900">
                        <Breadcrumb
                           items={[
                              { type: "link", text: "Jade", href: "/" },
                              { type: "separator" },
                              { type: "text", text: "404" },
                           ]}
                        />
                     </div>
                     <div className="-mx-4 bg-gradient-to-b from-white px-4 pb-4 dark:from-stone-900"></div>
                  </header>
                  <main className="mt-[4.75rem] px-4 md:mt-[6.75rem]">
                     <h1
                        className={`${lora.className} mb-3.5 text-[1.5em] font-normal-mid`}
                     >
                        404
                     </h1>
                     <h2 className="text-gray-500 dark:text-stone-400">
                        Page not found
                     </h2>
                  </main>
               </div>
            </div>
         </div>
      </div>
   );
}
