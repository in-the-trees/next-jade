import Jade from "@/app/ui/Jade";

export default function Layout({ children }: { children: React.ReactNode }) {
   return (
      <div>
         <Jade className="" />
         <div className="">{children}</div>
      </div>
   );
}
