import { Suspense } from "react";
import MicroblogFeed from "@/app/ui/microblog/MicroblogFeed";
import { lora } from "@/app/ui/fonts";

export default function Blog() {
   return (
      <main id="microblog">
         <h1 className={`${lora.className} mb-1.75 text-[1.5em] font-normal-mid`}>Microblog</h1>
         <h2>
            Welcome to my microblog where I publish short, tweet-like posts. I don't take my microblog
            too seriously, nor should you. By default, only posts within the last day are visible.
         </h2>

         <MicroblogFeed className="mt-9 flex flex-col gap-7" />
      </main>
   );
}
