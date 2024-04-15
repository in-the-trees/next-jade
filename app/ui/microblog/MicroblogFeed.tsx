import type { NextPage } from "next";
import type { Microblog, MicroblogFeed } from "./definitions";
import Link from "next/link";
import { ArrowLongRightIcon, ChevronDoubleRightIcon } from "@heroicons/react/24/outline";
import { formatTimeRelatively } from "@/app/lib/relativeTime";
import { commit_mono } from "@/app/ui/fonts";

export const runtime = "edge";

async function getFeed() {
   const res = await fetch("https://jade.van-dorsten.net/api/all.json");

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
      <div id="microblog-feed" className={`${className} h-feed mt-9 flex flex-col gap-4`}>
         {feed.items.map((microblog) => (
            <Microblog key={microblog.id} {...microblog} />
         ))}
      </div>
   );
};

export default MicroblogFeed;

const Microblog = (Microblog: Microblog) => {
   return (
      <article className="h-entry prose-sm prose-a:text-blue-500 hover:prose-a:underline prose-img:rounded-xl hover:prose-img:scale-103 prose-img:transition-transform prose-img:ease-out prose-img:max-w-full prose-img:max-h-64 prose-img:border border-b last:border-0">
         <header className="flex items-center gap-2">
            <Link
               href={`/microblog/${Microblog.id}`}
               className="u-url mr-1 rounded-full bg-blue-50 px-1.5 transition-all ease-out hover:scale-105 hover:bg-blue-100"
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
