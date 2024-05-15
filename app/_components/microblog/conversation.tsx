export const revalidate = 0;

import { Microdotblog } from "@/app/_lib/microblog/definitions";
import clsx from "clsx";
import { lora } from "@/app/_fonts/fonts";
import { CheckBadgeIcon } from "@heroicons/react/20/solid";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import { formatTimeRelatively } from "@/app/_lib/relativeTime";
import { proseStyling } from "@/app/_components/microblog/post";
import sanitizeHtml from "sanitize-html";
import ConversationTime from "./misc/conversationTime";

type ConversationProps = {
   microdotblog: Microdotblog;
   className?: string;
};

export default function Conversation({
   microdotblog,
   className,
}: ConversationProps) {
   const myMicroblogUsername = "jade";
   let previousReplyAuthor = "";

   return (
      <section className={`${className} text-[calc(1em-1px)]`}>
         <ul className="flex flex-col gap-4">
            {microdotblog.items.map((reply) => {
               const currentReplyAuthor = reply.author._microblog.username || "";
               const replyingToMatch = reply.content_html.match(/@(\w+)</);
               const replyingTo = replyingToMatch ? replyingToMatch[1] : "";
               const isNested = replyingTo === previousReplyAuthor;
               previousReplyAuthor = currentReplyAuthor; // Update for next iteration

               const init_rel_date_published = formatTimeRelatively(
                  reply.date_published,
                  true,
               );

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
                              <CheckBadgeIcon className="h-[1em] w-[1em] text-blue-400 dark:text-violet-300" />
                           )}
                        </div>
                        <div className="flex items-center gap-2 text-[calc(1em-1px)]">
                           <a
                              href={reply.url}
                              target="_blank"
                              rel="noopener noreferrer"
                           >
                              <ArrowTopRightOnSquareIcon className="h-3 w-3 text-blue-500 hover:text-blue-400 dark:text-violet-400 dark:hover:text-violet-300" />
                           </a>
                           <ConversationTime
                              date_published={reply.date_published}
                              init_rel_date_published={init_rel_date_published}
                           />
                        </div>
                     </div>
                     <div className={`prose-convo ${proseStyling}`}>
                        <div
                           dangerouslySetInnerHTML={{
                              __html: sanitizeHtml(reply.content_html),
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
