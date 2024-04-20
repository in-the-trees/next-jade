import type { Microblog, Microdotblog } from "@/app/_lib/microblog/definitions";
import Link from "next/link";
import {
   ArrowLongRightIcon,
   ChatBubbleOvalLeftEllipsisIcon,
   ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";
import { formatTimeRelatively } from "@/app/_lib/relativeTime";
import { commit_mono, lora } from "@/app/_fonts/fonts";
import clsx from "clsx";
import Breadcrumb from "@/app/_components/breadcrumb";
import getMicrodotblog from "@/app/_lib/microblog/getMicrodotblog";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import { CheckBadgeIcon } from "@heroicons/react/20/solid";
import parse from "html-react-parser";
import createRichLinks from "@/app/_lib/microblog/createRichLinks";

interface MicroblogProps {
   className?: string;
   Microblog: Microblog;
   inFeed?: boolean;
}

const Microblog = async ({ className, Microblog, inFeed }: MicroblogProps) => {
   const content_html = parse(createRichLinks(Microblog.content_html));

   const microdotblog: Microdotblog | null =
      !inFeed ? await getMicrodotblog(Microblog.url) : null;
   const myMicroblogUsername = "jade";

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
               dateTime={Microblog.date_published}
               className={clsx(
                  `${commit_mono.className} text-[calc(1em-1px)] text-gray-500`,
                  {
                     "text-[calc(1em-2px)]": inFeed,
                  },
               )}
               title={new Date(Microblog.date_published).toLocaleString()}
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
                     dateTime={Microblog.date_modified}
                     className={clsx(
                        `${commit_mono.className} text-[calc(1em-1px)] text-gray-500`,
                        {
                           "text-[calc(1em-2px)]": inFeed,
                        },
                     )}
                     title={new Date(Microblog.date_modified).toLocaleString()}
                  >
                     {formatTimeRelatively(new Date(Microblog.date_modified))}
                  </time>
               </>
            :  ""}
         </header>
         <div className="e-content">{content_html}</div>
      </article>
   );

   const Conversation = () => {
      if (!inFeed && microdotblog && microdotblog.items.length > 0) {
         let previousReplyAuthor = "";

         return (
            <section className="mt-4 text-[calc(1em-1px)]">
               <ul className="flex flex-col gap-4">
                  {microdotblog.items.map((reply) => {
                     const currentReplyAuthor =
                        reply.author._microblog.username || "";
                     const replyingToMatch = reply.content_html.match(/@(\w+)</);
                     const replyingTo =
                        replyingToMatch ? replyingToMatch[1] : "";
                     const isNested = replyingTo === previousReplyAuthor;
                     previousReplyAuthor = currentReplyAuthor; // Update for next iteration

                     return (
                        <li
                           key={reply.id}
                           className={clsx(``, {
                              "ml-5 border-l pl-5": isNested,
                           })}
                        >
                           <div>
                              <div className="flex items-center gap-1">
                                 <span
                                    className={`${lora.className} text-[calc(1em+1px)] font-normal-mid italic`}
                                 >
                                    {reply.author.name}
                                 </span>
                                 {reply.author._microblog.username ===
                                    myMicroblogUsername && (
                                    <CheckBadgeIcon className="h-[1em] w-[1em] text-blue-400" />
                                 )}
                              </div>
                              <div className="flex items-center gap-2 text-[calc(1em-1px)]">
                                 <a
                                    href={reply.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                 >
                                    <ArrowTopRightOnSquareIcon className="h-3 w-3 text-blue-500 hover:text-blue-400" />
                                 </a>
                                 <time
                                    dateTime={reply.date_published}
                                    className={`${commit_mono.className} text-gray-500`}
                                    title={new Date(
                                       reply.date_published,
                                    ).toLocaleString()}
                                 >
                                    {formatTimeRelatively(
                                       new Date(reply.date_published),
                                    )}
                                 </time>
                              </div>
                           </div>
                           <div
                              dangerouslySetInnerHTML={{
                                 __html: reply.content_html,
                              }}
                              className={`${className} h-entry prose-convo border-b last:border-0 prose-a:text-blue-500 hover:prose-a:underline prose-img:max-h-64 prose-img:max-w-full prose-img:rounded-xl prose-img:border prose-img:transition-transform prose-img:ease-out hover:prose-img:scale-103`}
                           />
                        </li>
                     );
                  })}
               </ul>
            </section>
         );
      }

      return null;
   };

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
               {Conversation()}
            </div>
         )}

         {inFeed && MicroblogArticle}
      </>
   );
};

export default Microblog;
