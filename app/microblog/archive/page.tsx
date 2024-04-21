export const runtime = "edge";

import type { Metadata } from "next";
import MicroblogFeed from "@/app/_components/microblog/MicroblogFeed";
import { lora } from "@/app/_fonts/fonts";
import { GlobeAltIcon, RssIcon } from "@heroicons/react/24/outline";
import Breadcrumb from "@/app/_components/breadcrumb";

export const metadata: Metadata = {
   metadataBase: new URL("https://jade.van-dorsten.net"),
   title: "Jade's microblog (archive)",
   description: "Archive of my microblog posts.",
};

export default async function Blog() {
   return (
      <div>
         <Breadcrumb
            items={[
               { type: "link", text: "Jade", href: "/" },
               { type: "separator" },
               { type: "link", text: "Microblog", href: "/microblog" },
               { type: "separator" },
               { type: "text", text: "Archive" },
            ]}
            className="px-4 pb-5"
         />
         <main id="microblog" className="h-dvh overflow-auto px-4 pb-36">
            <h1
               className={`${lora.className} mb-3.5 text-[1.5em] font-normal-mid`}
            >
               Microblog archive
            </h1>
            <h2 className="text-pretty">
               Welcome to my microblog where I publish short, tweet-like posts. I
               don't take my microblog too seriously, nor should you. By default,
               only posts within the last day are visible, however, here—in the
               archive—all public posts are displayed.
            </h2>

            <div className="my-4 flex flex-wrap items-center gap-2">
               <a href="" className="btn-sm">
                  <RssIcon className="h-4 w-4" />
                  JSON
               </a>

               <a
                  href="https://micro.blog/jade?remote_follow=1"
                  className="btn-sm"
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
      </div>
   );
}
