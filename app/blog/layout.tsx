import Jade from "@/app/_components/Jade";
import type { Metadata } from "next";

export const metadata: Metadata = {
   title: "Jade's blog",
   description:
      "Where I post extended or more evergreen content compared to my microblog.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
   return (
      <div className="flex w-full justify-center">
         <div className="flex w-full max-w-[70rem] flex-row-reverse gap-2 md:h-full">
            <div className="w-full px-4 pt-[24px] md:w-2/3 md:pt-[40px] lg:pt-[56px]">
               {children}
            </div>
            <aside className="sticky top-0 hidden w-1/3 self-start overflow-y-scroll md:block md:pt-[44px] lg:pt-[60px]">
               <Jade className="max-h-screen overflow-auto px-4" />
            </aside>
         </div>
      </div>
   );
}
