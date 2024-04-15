import type { NextPage } from "next";
import type { Microblog, MicroblogFeed } from "./definitions";
import Link from "next/link";
import { ArrowLongRightIcon, ChevronDoubleRightIcon } from "@heroicons/react/24/outline";
import { formatTimeRelatively } from "@/app/lib/relativeTime";
import { commit_mono } from "@/app/ui/fonts";

export const runtime = "edge";

async function getFeed() {
   const res = await fetch("https://jade.van-dorsten.net/api/recent.json");

   if (!res.ok) {
      throw new Error("Failed to fetch microblog feed");
   }

   return res.json();
}

type MicroblogProps = {
   className?: string;
};

const MicroblogFeed: NextPage<MicroblogProps> = async ({ className }) => {
   const feed: MicroblogFeed = await getFeed();

   return (
      <div id="microblog-feed" className={`h-feed ${className}`}>
         {feed.items.map((microblog) => (
            <Microblog key={microblog.id} {...microblog} />
         ))}
      </div>
   );
};

export default MicroblogFeed;

const Microblog = (Microblog: Microblog) => {
   return (
      <article className="h-entry">
         <header className="flex items-center gap-2">
            <Link
               href={`/microblog/${Microblog.id}`}
               className="u-url mr-1 rounded-full bg-blue-50 px-1.5 hover:underline"
            >
               <ArrowLongRightIcon className="h-3.5 w-3.5 text-blue-500" />
            </Link>
            <time className={`${commit_mono.className} text-[calc(1em-2px)] text-gray-500`}>
               {formatTimeRelatively(new Date(Microblog.date_published))}
            </time>
            {Microblog.date_modified && Microblog.categories.includes("show_updated") ?
               <>
                  <ChevronDoubleRightIcon className="h-3 w-3 text-gray-400" />
                  <time className={`${commit_mono.className} text-[calc(1em-2px)] text-gray-500`}>
                     {formatTimeRelatively(new Date(Microblog.date_modified))}
                  </time>
               </>
            :  ""}
         </header>
         <div className="e-content" dangerouslySetInnerHTML={{ __html: Microblog.content_html }} />
      </article>
   );
};
