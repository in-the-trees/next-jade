import Jade from "@/app/ui/Jade";

export default function Layout({ children }: { children: React.ReactNode }) {
   return (
      <div className="flex w-full justify-center pt-2 md:pt-4 lg:pt-8">
         <div className="flex w-full max-w-[64rem] gap-20">
            <aside className="w-1/3">
               <Jade />
            </aside>
            <div className="w-2/3">{children}</div>
         </div>
      </div>
   );
}
