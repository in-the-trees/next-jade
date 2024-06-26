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

export default function PostComponent({
   className,
   post,
   timelined,
}: PostProps) {
   const initRelativeTime = formatTimeRelatively(post.record.createdAt, true);

   return (
      <article className={`${className} h-entry proseStyling prose-sm`}>
         <header className="flex items-center gap-2">
            <EllipsisMessageMedium14Icon className="h-3.5 w-3.5 text-stone-500 dark:text-stone-400" />
            <Timestamp
               createdAt={post.record.createdAt}
               initRelativeTime={initRelativeTime}
               className={clsx(
                  `${commit_mono.className} text-[calc(1em-1px)] text-stone-500 dark:text-stone-400`,
                  {
                     "text-[calc(1em-2px)]": timelined,
                  },
               )}
            />
         </header>
         <div className="e-content break-words">{post.record.text}</div>
      </article>
   );
}
