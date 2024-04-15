import { Suspense } from "react";
import MicroblogFeed from "@/app/ui/microblog/MicroblogFeed";
import { lora } from "@/app/ui/fonts";
import { GlobeAltIcon, RssIcon } from "@heroicons/react/24/outline";

export default function Blog() {
   return (
      <main id="microblog">
         <h1 className={`${lora.className} mb-1.75 text-[1.5em] font-normal-mid`}>Microblog</h1>
         <h2>
            Welcome to my microblog where I publish short, tweet-like posts. I don't take my microblog
            too seriously, nor should you. By default, only posts within the last day are visible.
         </h2>

         <div className="my-4 flex flex-wrap items-center gap-2">
            <a href="" className="btn-sm">
               <RssIcon className="h-4 w-4" />
               JSON
            </a>

            <a href="" className="btn-sm">
               <GlobeAltIcon className="h-4 w-4" />
               ActivityPub
            </a>
         </div>

         <MicroblogFeed />
      </main>
   );
}
