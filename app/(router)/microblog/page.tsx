import Link from "next/link";
import { lora } from "@/app/_fonts/fonts";
import {
   ArchiveboxMedium14Icon,
   JSONfeedMedium18Icon,
   RadiowavesLeftRightMedium16Icon,
} from "@/app/_components/icons";
import Breadcrumb from "@/app/_components/breadcrumb";
import MicroblogFeed from "@/app/_components/microblog/feed";
import ProgressiveBlur from "@/app/_components/ProgressiveBlur";

export default function MicroblogPage() {
   return (
      <div>
         <header className="z-40">
            <div className="pb-4">
               <Breadcrumb
                  items={[
                     { type: "link", text: "Jade", href: "/" },
                     { type: "separator" },
                     { type: "text", text: "Microblog" },
                  ]}
               />
            </div>
         </header>
         <ProgressiveBlur />
         <main id="microblog">
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
               <Link
                  href="/microblog/archive"
                  className="btn-sm"
                  prefetch={true}
               >
                  <ArchiveboxMedium14Icon className="h-3.5 w-3.5" />
                  Archive
               </Link>
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
