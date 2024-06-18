"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import clsx from "clsx";
import {
   EllipsisMessageMedium14Icon,
   ArrowRightMedium12Icon,
   ChevronDoubleRight10Icon,
   ChevronDoubleRight12Icon,
} from "@/app/_components/icons";
import { formatTimeRelatively } from "@/app/_lib/relativeTime";
import { commit_mono } from "@/app/_fonts/fonts";

type HeaderProps = {
   inFeed?: boolean;
   preload?: boolean;
   show_updated?: boolean;
   dynamic_time?: boolean;
   post_id?: string;
   date_published: string;
   date_modified?: string;
   init_rel_date_published: string;
   init_rel_date_modified?: string | null;
};

export default function Header({
   inFeed,
   preload,
   show_updated,
   dynamic_time,
   post_id,
   date_published,
   date_modified,
   init_rel_date_published,
   init_rel_date_modified,
}: HeaderProps) {
   const date = date_published ? new Date(date_published.split("T")[0]) : null;
   const year = date ? date.getUTCFullYear() : null;
   const month = date ? date.getUTCMonth() + 1 : null;
   const day = date ? date.getUTCDate() : null;
   const dynamic_time_bool = dynamic_time ? true : false;

   const [relativeTimePublished, setRelativeTimePublished] = useState(
      init_rel_date_published,
   );
   const [relativeTimeModified, setRelativeTimeModified] = useState(
      init_rel_date_modified || null,
   );
   useEffect(() => {
      setRelativeTimePublished(
         formatTimeRelatively(date_published, dynamic_time_bool),
      );
      if (date_modified) {
         setRelativeTimeModified(
            formatTimeRelatively(date_modified, dynamic_time_bool),
         );
      }

      if (!dynamic_time_bool) return;

      const interval = setInterval(() => {
         setRelativeTimePublished(
            formatTimeRelatively(date_published, dynamic_time_bool),
         );
         if (date_modified) {
            setRelativeTimeModified(
               formatTimeRelatively(date_modified, dynamic_time_bool),
            );
         }
      }, 1000);

      return () => clearInterval(interval);
   }, [date_published, date_modified, dynamic_time_bool]);

   return (
      <header className="flex items-center gap-2">
         {inFeed && year && month && day && post_id ?
            <Link
               href={`/microblog/${year}/${month}/${day}/${post_id}`}
               className="u-url mr-1 rounded-full bg-forest-100 px-[10px] py-[2px] transition-all ease-out hover:scale-103 hover:bg-forest-200 dark:bg-forest-200 dark:hover:bg-forest-300"
               aria-label="Open post"
               prefetch={preload}
            >
               <ArrowRightMedium12Icon className="h-3 w-3 text-forest-700 dark:text-forest-800" />
            </Link>
         :  <EllipsisMessageMedium14Icon className="h-3.5 w-3.5 text-stone-500 dark:text-stone-300" />
         }

         <time
            dateTime={date_published}
            className={clsx(
               `${commit_mono.className} text-[calc(1em-1px)] text-stone-500 dark:text-stone-300`,
               {
                  "text-[calc(1em-2px)]": inFeed,
               },
            )}
            title={date_published}
         >
            {relativeTimePublished}
         </time>
         {date_modified && show_updated ?
            <>
               {inFeed ?
                  <ChevronDoubleRight10Icon className="h-[10px] w-[10px] text-stone-400/80 dark:text-stone-400" />
               :  <ChevronDoubleRight12Icon className="h-3 w-3 text-stone-400/80 dark:text-stone-400" />
               }
               <time
                  dateTime={date_modified}
                  className={clsx(
                     `${commit_mono.className} text-[calc(1em-1px)] text-stone-500 dark:text-stone-300`,
                     {
                        "text-[calc(1em-2px)]": inFeed,
                     },
                  )}
                  title={date_modified}
               >
                  {relativeTimeModified}
               </time>
            </>
         :  ""}
      </header>
   );
}
