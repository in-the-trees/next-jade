import { lora } from "@/app/_fonts/fonts";
import {
   ArchiveBoxIcon,
   GlobeAltIcon,
   RssIcon,
} from "@heroicons/react/24/outline";
import Breadcrumb from "@/app/_components/breadcrumb";
import MicroblogFeed from "@/app/_components/microblog/feed";

export default function MicroblogPage() {
   return (
      <div>
         <header className="fixed top-0 z-30 w-full px-4">
            <div className="-mx-4 bg-white px-4 pb-1 pt-7 md:pt-[44px] lg:pt-[60px] dark:bg-stone-900">
               <Breadcrumb
                  items={[
                     { type: "link", text: "Jade", href: "/" },
                     { type: "separator" },
                     { type: "text", text: "Microblog" },
                  ]}
               />
            </div>
            <div className="-mx-4 bg-gradient-to-b from-white px-4 pb-4 dark:from-stone-900"></div>
         </header>
         <main id="microblog" className="mt-[4.75rem] px-4 md:mt-[6.75rem]">
            <h1
               className={`${lora.className} mb-3.5 text-[1.5em] font-normal-mid`}
            >
               Microblog
            </h1>
            <h2 className="text-pretty">
               <span className="sm:block">
                  Welcome to my microblog where I publish short, tweet-like
                  posts.{" "}
               </span>
               By default, only posts within the last day are visible.
            </h2>

            <div className="my-4 flex flex-wrap items-center gap-2">
               <a href="/microblog/archive" className="btn-sm">
                  <ArchiveBoxIcon className="h-4 w-4" />
                  Archive
               </a>
               <a
                  href={`https://${process.env.NEXT_PUBLIC_MICROBLOG_BASE_URL}/feed.json`}
                  className="btn-sm"
                  target="_blank"
                  rel="noopener noreferrer"
               >
                  <RssIcon className="h-4 w-4" />
                  JSON
               </a>

               <a
                  href="https://micro.blog/jade?remote_follow=1"
                  className="btn-sm"
                  target="_blank"
                  rel="noopener noreferrer"
               >
                  <GlobeAltIcon className="h-4 w-4" />
                  ActivityPub
               </a>
            </div>

            <MicroblogFeed
               url={`https://${process.env.NEXT_PUBLIC_MICROBLOG_BASE_URL}/api/recent.json`}
               cutoff={24}
               className="mt-9"
               preloadPosts={true}
               dynamic_time
            />
         </main>
      </div>
   );
}
