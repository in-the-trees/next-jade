"use client";

import { Microblog, Microdotblog } from "@/app/_lib/microblog/definitions";
import Conversation from "@/app/_components/microblog/conversation";
import ReplyBox from "@/app/_components/microblog/replyBox";

type ReplyAreaProps = {
   post: Microblog | null;
   microdotblog: Microdotblog | null;
};

export default function ReplyArea({ post, microdotblog }: ReplyAreaProps) {
   return (
      <>
         {post && post.url && microdotblog && (
            <ReplyBox
               postUrl={post.url}
               microdotblog={microdotblog}
               className="mt-7 border-t-[.5px] dark:border-stone-700"
            />
         )}
         {microdotblog && microdotblog.items.length > 0 && (
            <Conversation
               microdotblog={microdotblog}
               className="mt-7 rounded-lg border border-gray-100 bg-gray-100/50 p-4 dark:border-stone-800 dark:bg-stone-800/50"
            />
         )}
      </>
   );
}
