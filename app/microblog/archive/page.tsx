import type { Metadata } from "next";
import { Suspense } from "react";
import MicroblogFeed from "@/app/_components/microblog/feed";
import FeedSkeleton from "@/app/_components/microblog/skeletons/feed";
import { lora } from "@/app/_fonts/fonts";
import {
   JSONfeedMedium18Icon,
   RadiowavesLeftRightMedium16Icon,
} from "@/app/_components/icons";
import Breadcrumb from "@/app/_components/breadcrumb";

export const metadata: Metadata = {
   metadataBase: new URL("https://inthetrees.me"),
   title: "Jade's microblog (archive)",
   description: "Archive of my microblog posts.",
};

export default async function MBArchive() {
   return (
      <div>
         <header className="z-40">
            <div className="pb-4">
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
         </header>
         <div className="gradient-blur">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
         </div>
         <main id="microblog">
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
                  className="btn-sm-alt btm-sm-alt-gap-1"
                  target="_blank"
                  rel="noopener noreferrer"
               >
                  <JSONfeedMedium18Icon className="h-[18px] w-[18px]" />
                  JSON
               </a>

               <a
                  href="https://micro.blog/jade?remote_follow=1"
                  className="btn-sm-alt"
                  target="_blank"
                  rel="noopener noreferrer"
               >
                  <RadiowavesLeftRightMedium16Icon className="h-4 w-4" />
                  ActivityPub
               </a>
            </div>

            <Suspense
               fallback={
                  <FeedSkeleton postCount={27} className="mt-9 animate-pulse" />
               }
            >
               <MicroblogFeed
                  url={`https://${process.env.NEXT_PUBLIC_MICROBLOG_BASE_URL}/api/all.json`}
                  className="mt-9"
               />
            </Suspense>
         </main>
      </div>
   );
}
