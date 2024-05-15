"use client";

import { useState, useEffect } from "react";
import { formatTimeRelatively } from "@/app/_lib/relativeTime";
import { commit_mono } from "@/app/_fonts/fonts";

type ConversationTimeProps = {
   date_published: string;
   init_rel_date_published: string;
};

export default function ConversationTime({
   date_published,
   init_rel_date_published,
}: ConversationTimeProps) {
   const [relativeTimePublished, setRelativeTimePublished] = useState(
      init_rel_date_published,
   );

   useEffect(() => {
      setRelativeTimePublished(formatTimeRelatively(date_published, true));

      const interval = setInterval(() => {
         setRelativeTimePublished(formatTimeRelatively(date_published, true));
      }, 1000);

      return () => clearInterval(interval);
   }, [date_published]);

   return (
      <time
         dateTime={date_published}
         className={`${commit_mono.className} text-gray-500 dark:text-stone-400`}
         title={new Date(date_published).toLocaleString()}
      >
         {relativeTimePublished}
      </time>
   );
}
