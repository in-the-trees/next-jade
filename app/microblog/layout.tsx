import Jade from "@/app/_components/Jade";
import type { Metadata } from "next";

export const metadata: Metadata = {
   title: "Jade's microblog",
   description: "Where I publish short, tweet-like posts.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
   return (
      <div className="flex w-full justify-center pt-2 md:pt-4 lg:pt-8">
         <div className="flex h-dvh w-full max-w-[70rem] gap-2">
            <aside className="hidden w-1/3 md:block">
               <Jade className="h-dvh overflow-auto px-4 pb-20" />
            </aside>
            <div className="w-full md:w-2/3">{children}</div>
         </div>
      </div>
   );
}
