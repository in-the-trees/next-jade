import MicroblogFeed from "@/app/_components/microblog/MicroblogFeed";
import { lora } from "@/app/_fonts/fonts";
import { GlobeAltIcon, RssIcon } from "@heroicons/react/24/outline";

export default function Blog() {
   return (
      <main id="microblog">
         <h1 className={`${lora.className} mb-3.5 text-[1.5em] font-normal-mid`}>
            Microblog archive
         </h1>
         <h2>
            Welcome to my microblog where I publish short, tweet-like posts. I
            don't take my microblog too seriously, nor should you. By default,
            only posts within the last day are visible, however, here—in the
            archive—all public posts are displayed.
         </h2>

         <div className="my-4 flex flex-wrap items-center gap-2">
            <a
               href=""
               className="flex w-max items-center justify-between gap-2 rounded-lg border px-2 py-1 text-sm shadow-sm transition-transform ease-out hover:scale-103"
            >
               <RssIcon className="h-4 w-4" />
               JSON
            </a>

            <a
               href=""
               className="flex w-max items-center justify-between gap-2 rounded-lg border px-2 py-1 text-sm shadow-sm transition-transform ease-out hover:scale-103"
            >
               <GlobeAltIcon className="h-4 w-4" />
               ActivityPub
            </a>
         </div>

         <MicroblogFeed
            feedUrl="https://jade.van-dorsten.net/api/all.json"
            className="mt-9"
         />
      </main>
   );
}
