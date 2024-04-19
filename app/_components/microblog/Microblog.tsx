import type { Microblog } from "@/app/_lib/microblog/definitions";
import Link from "next/link";
import {
   ArrowLongRightIcon,
   ChatBubbleOvalLeftEllipsisIcon,
   ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";
import { formatTimeRelatively } from "@/app/_lib/relativeTime";
import { commit_mono } from "@/app/_fonts/fonts";
import clsx from "clsx";

interface MicroblogProps {
   Microblog: Microblog;
   inFeed?: boolean;
}

const Microblog = ({ Microblog, inFeed }: MicroblogProps) => {
   return (
      <article className="h-entry prose-sm border-b last:border-0 prose-a:text-blue-500 hover:prose-a:underline prose-img:max-h-64 prose-img:max-w-full prose-img:rounded-xl prose-img:border prose-img:transition-transform prose-img:ease-out hover:prose-img:scale-103">
         <header className="flex items-center gap-2">
            {inFeed ?
               <Link
                  href={`/microblog/${Microblog.id}`}
                  className="u-url mr-1 rounded-full bg-blue-50 px-1.5 transition-all ease-out hover:scale-105 hover:bg-blue-100"
               >
                  <ArrowLongRightIcon className="h-3.5 w-3.5 text-blue-500" />
               </Link>
            :  <ChatBubbleOvalLeftEllipsisIcon className="h-3.5 w-3.5 text-gray-500" />
            }
            <time
               className={clsx(
                  `${commit_mono.className} text-[calc(1em-1px)] text-gray-500`,
                  {
                     "text-[calc(1em-2px)]": inFeed,
                  },
               )}
            >
               {formatTimeRelatively(new Date(Microblog.date_published))}
            </time>
            {(
               Microblog.date_modified &&
               Microblog.categories?.includes("show_updated")
            ) ?
               <>
                  <ChevronDoubleRightIcon
                     className={clsx("h-3.5 w-3.5 text-gray-400", {
                        "h-3 w-3": inFeed,
                     })}
                  />
                  <time
                     className={clsx(
                        `${commit_mono.className} text-[calc(1em-1px)] text-gray-500`,
                        {
                           "text-[calc(1em-2px)]": inFeed,
                        },
                     )}
                  >
                     {formatTimeRelatively(new Date(Microblog.date_modified))}
                  </time>
               </>
            :  ""}
         </header>
         <div
            className="e-content"
            dangerouslySetInnerHTML={{ __html: Microblog.content_html }}
         />
      </article>
   );
};

export default Microblog;
