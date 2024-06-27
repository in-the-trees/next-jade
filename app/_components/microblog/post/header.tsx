import { formatTimeRelatively } from "@/app/_lib/relativeTime";
import Timestamp from "@/app/_components/microblog/timestamp";
import { EllipsisMessageMedium14Icon } from "@/app/_components/icons";
import { commit_mono } from "@/app/_fonts/fonts";
import clsx from "clsx";

export default function PostHeader({
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
