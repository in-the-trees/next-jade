export const runtime = "edge";

import type { Metadata } from "next";
import MicroblogFeed from "@/app/_components/microblog/MicroblogFeed";
import { lora } from "@/app/_fonts/fonts";
import { GlobeAltIcon, RssIcon } from "@heroicons/react/24/outline";
import Breadcrumb from "@/app/_components/breadcrumb";

export const metadata: Metadata = {
   metadataBase: new URL("https://inthetrees.me"),
   title: "Jade's microblog (archive)",
   description: "Archive of my microblog posts.",
};

export default async function Blog() {
   return (
      <div>
         <header className="sticky top-0 z-50 px-4">
            <div className="-mx-4 bg-white px-4 pb-1 pt-7 md:pt-[44px]  lg:pt-[60px] dark:bg-stone-900">
               <Breadcrumb
                  items={[
                     { type: "link", text: "Jade", href: "/" },
                     { type: "separator" },
                     { type: "link", text: "Microblog", href: "/microblog" },
                     { type: "separator" },
                     { type: "text", text: "Archive" },
                  ]}
               />
            </div>
            <div className="-mx-4 bg-gradient-to-b from-white px-4 pb-4 dark:from-stone-900"></div>
         </header>
         <main id="microblog" className="px-4">
            <h1
               className={`${lora.className} mb-3.5 text-[1.5em] font-normal-mid`}
            >
               Microblog archive
            </h1>
            <h2 className="text-pretty">
               <span className="sm:block">
                  Welcome to my microblog where I publish short, tweet-like
                  posts.{" "}
               </span>
               By default, only posts within the last day are visible, however,
               here—in the archive—all public posts are displayed.
            </h2>

            <div className="my-4 flex flex-wrap items-center gap-2">
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
               feedUrl={`https://${process.env.NEXT_PUBLIC_MICROBLOG_BASE_URL}/api/all.json`}
               className="mt-9"
            />
         </main>
      </div>
   );
}
