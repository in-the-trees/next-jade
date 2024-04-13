import { Suspense } from "react";
import Microblog from "@/app/ui/microblog/main";
import { lora } from "@/app/ui/fonts";

export default function Blog() {
   return (
      <main id="microblog">
         <h1 className={`${lora.className} text-[1.5em] font-normal-mid`}>Microblog</h1>
         <Microblog />
      </main>
   );
}
