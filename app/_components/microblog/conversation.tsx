import { Microdotblog } from "@/app/_lib/microblog/definitions";
import { CheckmarkMessageFillMedium13Icon } from "@/app/_components/icons";
import { formatTimeRelatively } from "@/app/_lib/relativeTime";
import sanitizeHtml from "sanitize-html";
import ConversationTime from "@/app/_components/microblog/misc/conversationTime";

type ConversationProps = {
   microdotblog: Microdotblog;
   className?: string;
};

export default function Conversation({
   microdotblog,
   className,
}: ConversationProps) {
   const myMicroblogUsername = "jade";
   // let previousReplyAuthor = "";

   return (
      <section className={`${className} text-[calc(1em-1px)]`}>
         <ul className="flex flex-col gap-3">
            {microdotblog.items.map((reply) => {
               // const currentReplyAuthor = reply.author._microblog.username || "";
               // const replyingToMatch = reply.content_html.match(/@(\w+)</);
               // const replyingTo = replyingToMatch ? replyingToMatch[1] : "";
               // const isNested = replyingTo === previousReplyAuthor;
               // previousReplyAuthor = currentReplyAuthor; // Update for next iteration

               const init_rel_date_published = formatTimeRelatively(
                  reply.date_published,
                  true,
               );

               return (
                  <li
                     key={reply.id}
                     // className={clsx(``, {
                     //    "ml-5 border-l pl-5": isNested,
                     // })}
                  >
                     <div>
                        <div className="flex items-center gap-1">
                           <span className={`text-[calc(1em)] font-normal-mid`}>
                              <span className="mr-[1px] text-[calc(1em-2px)]">
                                 @
                              </span>
                              {reply.author._microblog.username}
                           </span>
                           {reply.author._microblog.username ===
                              myMicroblogUsername && (
                              <CheckmarkMessageFillMedium13Icon className="h-[1em] w-[1em] text-forest-600 dark:text-betty-300" />
                           )}
                        </div>
                        <div className="flex items-center gap-2 text-[calc(1em-1px)]">
                           <ConversationTime
                              date_published={reply.date_published}
                              init_rel_date_published={init_rel_date_published}
                              href={reply.url}
                           />
                        </div>
                     </div>
                     <div className={`prose-convo proseStyling prose-sm`}>
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
