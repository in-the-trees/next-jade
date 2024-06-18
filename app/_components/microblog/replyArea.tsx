"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { clsx } from "clsx";
import { Microblog, Microdotblog } from "@/app/_lib/microblog/definitions";
import getMicrodotblog from "@/app/_lib/microblog/getMicrodotblog";
import Conversation from "@/app/_components/microblog/conversation";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

type ReplyAreaProps = {
   post: Microblog | null;
   microdotblog: Microdotblog | null;
};

export default function ReplyArea({ post, microdotblog }: ReplyAreaProps) {
   const [token, setToken] = useState<string | null>(null);
   const [username, setUsername] = useState<string | null>(null);
   const [tokenized, setTokenized] = useState(false);

   useEffect(() => {
      if (token && username) {
         setTokenized(true);
      } else {
         setTokenized(false);
      }
   }, [token, username]);

   const searchParams = useSearchParams();
   useEffect(() => {
      setToken(searchParams.get("token"));
      setUsername(searchParams.get("username"));

      return () => {
         setToken(null);
         setUsername(null);
      };
   }, []);

   const pathname = usePathname();
   const router = useRouter();
   useEffect(() => {
      router.push(pathname, undefined);
   }, [pathname, router]);

   const [mdb, setMdb] = useState<Microdotblog | null>(microdotblog);
   const [refreshMdb, toggleRefreshMdb] = useState(false);
   useEffect(() => {
      if (refreshMdb && post && post.url) {
         const fetchMdb = async () => {
            let retries = 0;
            let newMdb: Microdotblog | null = null;

            do {
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

   const [id] =
      microdotblog ? microdotblog.home_page_url.match(/(\d+)$/) || [] : [];

   function postReply(formData: FormData) {
      if (!token || !username) return;
      if (!post) return;

      const text = formData.get("text") as string;
      if (!text) return;

      const body = new URLSearchParams();
      body.append("token", token);
      body.append("username", username);
      body.append("url", post.url);
      body.append("text", text);

      setToken(null);
      setUsername(null);

      fetch(`https://micro.blog/account/comments/${id}/post`, {
         method: "POST",
         mode: "no-cors",
         headers: {
            "Content-Type": "application/x-www-form-urlencoded",
         },
         body: body.toString(),
      }).then(() => {
         toggleRefreshMdb(true);
      });
   }

   return (
      <div
         className={clsx(
            "mt-7 rounded-lg border-transparent bg-stone-50 dark:bg-stone-600/30",
            {
               border: tokenized || (mdb && mdb.items.length > 0),
            },
         )}
      >
         {tokenized && (
            <form
               action={postReply}
               className={clsx(
                  "mt-3.5 flex max-w-full flex-col gap-2 border-stone-100 px-4 pb-4 dark:border-stone-500/50",
                  {
                     "border-b": mdb && mdb.items.length > 0,
                  },
               )}
            >
               <textarea
                  name="text"
                  placeholder="Some nice words..."
                  cols={37}
                  rows={3}
                  className="w-full min-w-full max-w-full resize-y rounded-lg-half border border-stone-200 bg-stone-100 p-2 placeholder:text-forest-900/30 dark:border-stone-600/80 dark:bg-stone-600/60 dark:placeholder:text-stone-400/80"
               />
               <div className="flex items-start justify-between gap-2 px-0.5">
                  <span className="text-[calc(1em-1px)] text-stone-500 dark:text-stone-300">
                     Replying as <em>@{username}</em>
                  </span>
                  <button
                     type="submit"
                     className="flex w-max items-center justify-between gap-2 rounded-full border border-stone-200 bg-stone-100 p-[6px] text-[calc(1em-1px)] transition-transform ease-out hover:border-forest-200 hover:bg-forest-100 active:scale-[0.95] dark:border-stone-600/80 dark:bg-stone-600/60 dark:hover:border-forest-400 dark:hover:bg-forest-200 dark:hover:text-forest-800"
                  >
                     <PaperAirplaneIcon className="h-3.5 w-3.5 stroke-2" />
                  </button>
               </div>
            </form>
         )}
         {mdb && mdb.items.length > 0 && (
            <Conversation microdotblog={mdb} className="p-4" />
         )}
      </div>
   );
}
