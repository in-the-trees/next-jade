"use client";

import { useState, useEffect } from "react";
import { Microblog, Microdotblog } from "@/app/_lib/microblog/definitions";
import getMicrodotblog from "@/app/_lib/microblog/getMicrodotblog";
import Conversation from "@/app/_components/microblog/conversation";
import ReplyBox from "@/app/_components/microblog/replyBox";

type ReplyAreaProps = {
   post: Microblog | null;
   microdotblog: Microdotblog | null;
};

export default function ReplyArea({ post, microdotblog }: ReplyAreaProps) {
   const [mdb, setMdb] = useState<Microdotblog | null>(microdotblog); // mdb is microdotblog hooked with useState
   const [refreshMdb, toggleRefreshMdb] = useState(false); // when set to true, mdb will be updated

   useEffect(() => {
      // Update conversation when a reply is submitted
      if (refreshMdb && post && post.url) {
         const fetchMdb = async () => {
            let retries = 0;
            let newMdb: Microdotblog | null = null;

            // Retry up to 5 times if the conversation is not updated or found
            do {
               // Wait a bit before retrying
               if (retries !== 0) {
                  await new Promise((resolve) => setTimeout(resolve, 250));
               }

               newMdb = await getMicrodotblog(post.url);
               retries++;
            } while (
               (JSON.stringify(newMdb) === JSON.stringify(mdb) || !newMdb) &&
               retries < 5
            );

            setMdb(newMdb);
         };

         toggleRefreshMdb(false);
         fetchMdb();
      }
   }, [refreshMdb, post, mdb]);

   return (
      <>
         {post && post.url && microdotblog && (
            <ReplyBox
               postUrl={post.url}
               microdotblog={microdotblog}
               className="mt-7 border-t-[.5px] dark:border-stone-700"
               refresh={() => toggleRefreshMdb(!refreshMdb)}
            />
         )}
         {mdb && mdb.items.length > 0 && (
            <Conversation
               microdotblog={mdb}
               className="mt-7 rounded-lg border border-gray-100 bg-gray-100/50 p-4 dark:border-stone-800 dark:bg-stone-800/50"
            />
         )}
      </>
   );
}
