import { Post as PostType } from "@/app/_lib/microblog/definitions";
import { formatTimeRelatively } from "@/app/_lib/relativeTime";
import Timestamp from "@/app/_components/microblog/timestamp";
import { EllipsisMessageMedium14Icon } from "@/app/_components/icons";
import { commit_mono } from "@/app/_fonts/fonts";
import clsx from "clsx";

type PostProps = {
   className?: string;
   post: PostType;
   timelined?: boolean;
};

function PostHeader({
   createdAt,
   timelined,
   thread,
}: {
   createdAt: string;
   timelined?: boolean;
   thread?: boolean;
}) {
   const initRelativeTime = formatTimeRelatively(createdAt, true);

   return (
      <header className="flex items-center gap-2">
         <EllipsisMessageMedium14Icon className="h-3.5 w-3.5 text-stone-500 dark:text-stone-400" />
         <Timestamp
            createdAt={createdAt}
            initRelativeTime={initRelativeTime}
            className={clsx(
               `${commit_mono.className} text-[calc(1em-1px)] text-stone-500 dark:text-stone-400`,
               {
                  "text-[calc(1em-2px)]": timelined,
               },
            )}
         />
      </header>
   );
}

function PostContent({
   post,
   timelined,
}: {
   post: PostType;
   timelined?: boolean;
}) {
   return (
      <>
         <PostHeader createdAt={post.record.createdAt} timelined={timelined} />
         <div className="e-content proseStyling prose-sm my-3.5 whitespace-pre-wrap break-words">
            {post.record.text}
         </div>
      </>
   );
}

export default function PostComponent({
   className,
   post,
   timelined,
}: PostProps) {
   return (
      <article className={`${className} h-entry`}>
         <PostContent post={post} timelined={timelined} />
         {post.threadReplies && post.threadReplies.length > 0 && (
            <ul>
               {post.threadReplies.map((reply) => (
                  <li key={reply.cid} className="ml-3">
                     <PostContent post={reply} />
                  </li>
               ))}
            </ul>
         )}
      </article>
   );
}
