"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { clsx } from "clsx";
import { Microblog, Microdotblog } from "@/app/_lib/microblog/definitions";
import getMicrodotblog from "@/app/_lib/microblog/getMicrodotblog";
import Conversation from "@/app/_components/microblog/conversation";

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
            "mt-7 rounded-lg border-transparent bg-stone-50 dark:bg-stone-800/50",
            {
               border: tokenized || (mdb && mdb.items.length > 0),
            },
         )}
      >
         {tokenized && (
            <form
               action={postReply}
               className={clsx(
                  "mt-3.5 flex max-w-full flex-col gap-2 border-stone-100 px-4 pb-4 dark:border-stone-900",
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
                  className="w-full min-w-full max-w-full resize-y rounded-lg-half border border-stone-200 bg-stone-100 p-2 placeholder:text-forest-900/30 dark:border-stone-800 dark:bg-stone-900 dark:placeholder:text-stone-700"
               />
               <div className="flex items-start justify-between gap-2 px-0.5">
                  <span className="text-[calc(1em-1px)] text-stone-500 dark:text-stone-400">
                     Replying as <em>@{username}</em>
                  </span>
                  <button
                     type="submit"
                     id="submit-reply"
                     className="transition-transform ease-out active:scale-[0.95]"
                  >
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        className="mr-0.5 h-5 w-5"
                     >
                        <g fill="none" fill-rule="nonzero">
                           <path
                              id="submit-reply-bg"
                              fill="inherit"
                              d="M10 20a9.592 9.592 0 0 1-3.858-.784 10.222 10.222 0 0 1-3.191-2.167 10.222 10.222 0 0 1-2.167-3.191A9.592 9.592 0 0 1 0 10c0-1.366.261-2.652.784-3.858A10.264 10.264 0 0 1 6.132.784 9.592 9.592 0 0 1 9.99 0c1.366 0 2.654.261 3.863.784a10.206 10.206 0 0 1 3.196 2.167 10.222 10.222 0 0 1 2.167 3.191A9.592 9.592 0 0 1 20 10a9.592 9.592 0 0 1-.784 3.858 10.222 10.222 0 0 1-2.167 3.191 10.222 10.222 0 0 1-3.191 2.167A9.592 9.592 0 0 1 10 20Z"
                           />
                           <path
                              id="submit-reply-fg"
                              fill="inherit"
                              d="M10.02 15.049c.222 0 .403-.07.544-.21.14-.141.21-.326.21-.555v-5.03l-.078-2.156 1.02 1.226 1.186 1.205c.137.15.317.226.54.226a.728.728 0 0 0 .744-.735.738.738 0 0 0-.206-.53l-3.372-3.353c-.19-.196-.386-.294-.588-.294-.203 0-.4.098-.589.294L6.06 8.49a.717.717 0 0 0-.206.53c0 .209.07.384.21.524.141.14.316.21.525.21.21 0 .39-.074.54-.225l1.196-1.205 1.01-1.216-.08 2.147v5.03a.74.74 0 0 0 .217.553c.143.14.326.211.549.211Z"
                           />
                        </g>
                     </svg>
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
