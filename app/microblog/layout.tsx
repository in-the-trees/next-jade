import Jade from "@/app/_components/Jade";

export default function Layout({ children }: { children: React.ReactNode }) {
   return (
      <div className="flex w-full justify-center pt-2 md:pt-4 lg:pt-8">
         <div className="flex h-dvh w-full max-w-[64rem] gap-14">
            <aside className="w-1/3">
               <Jade />
            </aside>
            <div className="w-2/3 overflow-y-auto px-4">{children}</div>
         </div>
      </div>
   );
}
