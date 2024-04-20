import MicroblogFeed from "@/app/_components/microblog/MicroblogFeed";
import { lora } from "@/app/_fonts/fonts";
import {
   ArchiveBoxIcon,
   GlobeAltIcon,
   RssIcon,
} from "@heroicons/react/24/outline";
import Breadcrumb from "@/app/_components/breadcrumb";

export default function Blog() {
   return (
      <div>
         <Breadcrumb
            items={[
               { type: "link", text: "Jade", href: "/" },
               { type: "separator" },
               { type: "text", text: "Microblog" },
            ]}
            className="px-4 pb-5"
         />
         <main id="microblog" className="h-dvh overflow-auto px-4 pb-36">
            <h1
               className={`${lora.className} mb-3.5 text-[1.5em] font-normal-mid`}
            >
               Microblog
            </h1>
            <h2>
               Welcome to my microblog where I publish short, tweet-like posts. I
               don't take my microblog too seriously, nor should you. By default,
               only posts within the last day are visible.
            </h2>

            <div className="my-4 flex flex-wrap items-center gap-2">
               <a href="/microblog/archive" className="btn-sm">
                  <ArchiveBoxIcon className="h-4 w-4" />
                  Archive
               </a>
               <a href="" className="btn-sm">
                  <RssIcon className="h-4 w-4" />
                  JSON
               </a>

               <a href="" className="btn-sm">
                  <GlobeAltIcon className="h-4 w-4" />
                  ActivityPub
               </a>
            </div>

            <MicroblogFeed
               feedUrl="https://jade.van-dorsten.net/api/recent.json"
               cutoffInHours={24}
               className="mt-9"
            />
         </main>
      </div>
   );
}
