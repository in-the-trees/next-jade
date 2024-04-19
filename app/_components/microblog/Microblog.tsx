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
import Breadcrumb from "@/app/_components/breadcrumb";
import getMicrodotblog from "@/app/_lib/microblog/getMicrodotblog";

interface MicroblogProps {
   className?: string;
   Microblog: Microblog;
   inFeed?: boolean;
}

const Microblog = async ({ className, Microblog, inFeed }: MicroblogProps) => {
   const microdotblog = !inFeed ? await getMicrodotblog(Microblog.url) : null;

   const date = inFeed ? new Date(Microblog.date_published) : null;
   const year = date ? date.getFullYear() : null;
   const month = date ? date.getMonth() + 1 : null;
   const day = date ? date.getDate() : null;

   const MicroblogArticle = (
      <article
         className={`${className} h-entry prose-sm border-b last:border-0 prose-a:text-blue-500 hover:prose-a:underline prose-img:max-h-64 prose-img:max-w-full prose-img:rounded-xl prose-img:border prose-img:transition-transform prose-img:ease-out hover:prose-img:scale-103`}
      >
         <header className="flex items-center gap-2">
            {inFeed && year && month && day ?
               <Link
                  href={`/microblog/${year}/${month}/${day}/${Microblog.id}`}
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

   return (
      <>
         {!inFeed && (
            <div>
               {microdotblog && microdotblog.home_page_url ?
                  <Breadcrumb
                     items={[
                        { type: "link", text: "Jade", href: "/" },
                        { type: "separator" },
                        { type: "link", text: "Microblog", href: "/microblog" },
                        { type: "separator" },
                        { type: "text", text: "This post" },
                        {
                           type: "external-link",
                           text: "Micro.blog",
                           href: microdotblog.home_page_url,
                        },
                     ]}
                     className="mb-5"
                  />
               :  <Breadcrumb
                     items={[
                        { type: "link", text: "Jade", href: "/" },
                        { type: "separator" },
                        { type: "link", text: "Microblog", href: "/microblog" },
                        { type: "separator" },
                        { type: "text", text: "This post" },
                     ]}
                     className="mb-5"
                  />
               }

               {MicroblogArticle}
            </div>
         )}

         {inFeed && MicroblogArticle}
      </>
   );
};

export default Microblog;
