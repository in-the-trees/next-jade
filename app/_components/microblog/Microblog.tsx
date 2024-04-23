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
import createRichLinks from "@/app/_lib/microblog/createRichLinks";
import transformImage from "@/app/_lib/microblog/transformImage";

interface MicroblogProps {
   className?: string;
   Microblog?: Microblog;
   location: "feed" | "feed-archive" | "source";
}

const Microblog = async ({ className, Microblog, location }: MicroblogProps) => {
   const inFeed =
      location === "feed" || location === "feed-archive" ? true : false;

   if (!Microblog) {
      return (
         <div>
            <header className="sticky top-0 z-50">
               <div className="bg-white pb-1 pt-7 md:pt-[44px] lg:pt-[60px]">
                  <Breadcrumb
                     items={[
                        { type: "link", text: "Jade", href: "/" },
                        { type: "separator" },
                        {
                           type: "link",
                           text: "Microblog",
                           href: "/microblog",
                        },
                        { type: "separator" },
                        { type: "text", text: "This post" },
                     ]}
                  />
               </div>
               <div className="bg-gradient-to-b from-white pb-4"></div>
            </header>
            <main>
               <p className="text-gray-400">
                  Micro.blog currently unreachable :-(
               </p>
            </main>
         </div>
      );
   }

   let content_html = Microblog.content_html;
   content_html = createRichLinks(content_html);
   content_html = transformImage(content_html, Microblog.photos);

   const microdotblog: Microdotblog | null =
      location === "source" ? await getMicrodotblog(Microblog.url) : null;
   const myMicroblogUsername = "jade";

   const date = inFeed ? new Date(Microblog.date_published) : null;
   const year = date ? date.getFullYear() : null;
   const month = date ? date.getMonth() + 1 : null;
   const day = date ? date.getDate() : null;

   const MicroblogLink = () => {
      if (!inFeed) {
         return (
            <ChatBubbleOvalLeftEllipsisIcon className="h-3.5 w-3.5 text-gray-500" />
         );
      } else if (location === "feed") {
         return (
            <Link
               href={`/microblog/${year}/${month}/${day}/${Microblog.id}`}
               className="u-url mr-1 rounded-full bg-blue-50 px-1.5 transition-all ease-out hover:scale-105 hover:bg-blue-100"
            >
               <ArrowLongRightIcon className="h-3.5 w-3.5 text-blue-500" />
            </Link>
         );
      } else if (location === "feed-archive") {
         return (
            <a
               href={`/microblog/${year}/${month}/${day}/${Microblog.id}`}
               className="u-url mr-1 rounded-full bg-blue-50 px-1.5 transition-all ease-out hover:scale-105 hover:bg-blue-100"
            >
               <ArrowLongRightIcon className="h-3.5 w-3.5 text-blue-500" />
            </a>
         );
      }
   };

   const proseStyling = `
      prose-sm prose-a:text-blue-500 hover:prose-a:underline
      prose-img:max-h-64 prose-img:max-w-full prose-img:max-h-64 prose-img:object-contain prose-img:h-[auto] prose-img:w-[auto]
      prose-img:bg-gray-50 prose-img:rounded-xl prose-img:border prose-img:transition-transform prose-img:ease-out hover:prose-img:scale-103
      prose-ul:list-disc prose-ul:ml-4 prose-ul:p-0 prose-ul:list-inside prose-li:p-0 prose-li:m-0
   `;

   const MicroblogArticle = (
      <article className={`${className} h-entry ${proseStyling}`}>
         <header className="flex items-center gap-2">
            {MicroblogLink()}
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
         <div
            className="e-content"
            dangerouslySetInnerHTML={{ __html: content_html }}
         />
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
                              className={`${className} prose-convo ${proseStyling}`}
                           >
                              <div
                                 dangerouslySetInnerHTML={{
                                    __html: reply.content_html,
                                 }}
                              />
                           </div>
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
                  <header className="sticky top-0 z-50">
                     <div className="bg-white pb-1 pt-7 md:pt-[44px] lg:pt-[60px]">
                        <Breadcrumb
                           items={[
                              { type: "link", text: "Jade", href: "/" },
                              { type: "separator" },
                              {
                                 type: "link",
                                 text: "Microblog",
                                 href: "/microblog",
                              },
                              { type: "separator" },
                              { type: "text", text: "This post" },
                              {
                                 type: "external-link",
                                 text: "Micro.blog",
                                 href: microdotblog.home_page_url,
                              },
                           ]}
                        />
                     </div>
                     <div className="bg-gradient-to-b from-white pb-4"></div>
                  </header>
               :  <header className="sticky top-0 z-50">
                     <div className="bg-white pb-1 pt-7 md:pt-[44px] lg:pt-[60px]">
                        <Breadcrumb
                           items={[
                              { type: "link", text: "Jade", href: "/" },
                              { type: "separator" },
                              {
                                 type: "link",
                                 text: "Microblog",
                                 href: "/microblog",
                              },
                              { type: "separator" },
                              { type: "text", text: "This post" },
                           ]}
                        />
                     </div>
                     <div className="bg-gradient-to-b from-white pb-4"></div>
                  </header>
               }

               <main className="">
                  {MicroblogArticle}
                  {Conversation()}
               </main>
            </div>
         )}

         {inFeed && MicroblogArticle}
      </>
   );
};

export default Microblog;
