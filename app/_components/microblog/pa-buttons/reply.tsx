"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { clsx } from "clsx";
import { ArrowshapeRightRegular20Icon } from "@/app/_components/icons";

type PADropdownProps = {
   postUrl: string;
   homePageUrl?: string | null;
};

export const ReplyPA = ({ postUrl, homePageUrl }: PADropdownProps) => {
   const [id] = homePageUrl ? homePageUrl.match(/(\d+)$/) || [] : [];

   const [isOpen, setIsOpen] = useState(false);
   const replyRef = useRef<HTMLDivElement>(null);
   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (
            replyRef.current &&
            !replyRef.current.contains(event.target as Node)
         ) {
            setIsOpen(false);
         }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, []);

   if (!homePageUrl && !id) {
      return null;
   }
   return (
      <div ref={replyRef} className="relative">
         <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-full transition-transform ease-out hover:opacity-70 active:scale-[0.95]"
         >
            <ArrowshapeRightRegular20Icon className="h-5 w-5 text-stone-500 dark:text-stone-300/70" />
         </button>
         {isOpen && (
            <div className="absolute right-0 z-10 mt-2 w-[12rem] rounded-2xl border border-stone-200 bg-stone-100 text-forest-950 shadow-xl shadow-stone-400/10 dark:border-stone-400/40 dark:bg-stone-500 dark:text-stone-50 dark:shadow-stone-700/10">
               <div className="p-2">
                  <span className="block p-2 font-light-mid italic text-stone-500 dark:text-stone-300">
                     Reply with
                  </span>
                  <Link
                     href={`https://micro.blog/account/comments/${id}/mb?url=${postUrl}`}
                     prefetch={false}
                     className="flex w-full items-center justify-between rounded-xl px-4 py-2 text-left text-sm font-normal-mid hover:bg-stone-200 dark:hover:bg-stone-600/30"
                  >
                     Micro.blog
                     <svg
                        className="h-4 w-4 fill-forest-950 dark:fill-stone-50"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        aria-hidden="true"
                     >
                        <path d="M399.4 362.2c29.5-34.7 47.1-78.3 47.1-125.8C446.5 123.5 346.9 32 224 32S1.5 123.5 1.5 236.4 101.1 440.9 224 440.9a239.3 239.3 0 0 0 79.4-13.4 7.2 7.2 0 0 1 8.1 2.6c18.6 25.1 47.6 42.7 79.9 49.9a4.4 4.4 0 0 0 5.2-3.4 4.4 4.4 0 0 0 -.9-3.6 87 87 0 0 1 3.7-110.7zM329.5 212.4l-57.3 43.5L293 324.8a6.5 6.5 0 0 1 -9.9 7.2L224 290.9 164.9 332a6.5 6.5 0 0 1 -10-7.2l20.8-68.9-57.3-43.5a6.5 6.5 0 0 1 3.8-11.7l71.9-1.5 23.7-67.9a6.5 6.5 0 0 1 12.3 0l23.7 67.9 71.9 1.5a6.5 6.5 0 0 1 3.9 11.7z" />
                     </svg>
                  </Link>
                  <Link
                     href={`https://micro.blog/account/comments/${id}/bluesky?url=${postUrl}`}
                     prefetch={false}
                     className="flex w-full items-center justify-between rounded-xl px-4 py-2 text-left text-sm font-normal-mid hover:bg-stone-200 dark:hover:bg-stone-600/30"
                  >
                     Bluesky
                     <svg
                        className="h-4 w-4 fill-forest-950 dark:fill-stone-50"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                        aria-hidden="true"
                     >
                        <path d="M407.8 294.7c-3.3-.4-6.7-.8-10-1.3c3.4 .4 6.7 .9 10 1.3zM288 227.1C261.9 176.4 190.9 81.9 124.9 35.3C61.6-9.4 37.5-1.7 21.6 5.5C3.3 13.8 0 41.9 0 58.4S9.1 194 15 213.9c19.5 65.7 89.1 87.9 153.2 80.7c3.3-.5 6.6-.9 10-1.4c-3.3 .5-6.6 1-10 1.4C74.3 308.6-9.1 342.8 100.3 464.5C220.6 589.1 265.1 437.8 288 361.1c22.9 76.7 49.2 222.5 185.6 103.4c102.4-103.4 28.1-156-65.8-169.9c-3.3-.4-6.7-.8-10-1.3c3.4 .4 6.7 .9 10 1.3c64.1 7.1 133.6-15.1 153.2-80.7C566.9 194 576 75 576 58.4s-3.3-44.7-21.6-52.9c-15.8-7.1-40-14.9-103.2 29.8C385.1 81.9 314.1 176.4 288 227.1z" />
                     </svg>
                  </Link>
                  <Link
                     href={`https://micro.blog/account/comments/${id}/mastodon?url=${postUrl}`}
                     prefetch={false}
                     className="flex w-full items-center justify-between rounded-xl px-4 py-2 text-left text-sm font-normal-mid hover:bg-stone-200 dark:hover:bg-stone-600/30"
                  >
                     Mastodon
                     <svg
                        className="h-4 w-4 fill-forest-950 dark:fill-stone-50"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        aria-hidden="true"
                     >
                        <path d="M433 179.1c0-97.2-63.7-125.7-63.7-125.7-62.5-28.7-228.6-28.4-290.5 0 0 0-63.7 28.5-63.7 125.7 0 115.7-6.6 259.4 105.6 289.1 40.5 10.7 75.3 13 103.3 11.4 50.8-2.8 79.3-18.1 79.3-18.1l-1.7-36.9s-36.3 11.4-77.1 10.1c-40.4-1.4-83-4.4-89.6-54a102.5 102.5 0 0 1 -.9-13.9c85.6 20.9 158.7 9.1 178.8 6.7 56.1-6.7 105-41.3 111.2-72.9 9.8-49.8 9-121.5 9-121.5zm-75.1 125.2h-46.6v-114.2c0-49.7-64-51.6-64 6.9v62.5h-46.3V197c0-58.5-64-56.6-64-6.9v114.2H90.2c0-122.1-5.2-147.9 18.4-175 25.9-28.9 79.8-30.8 103.8 6.1l11.6 19.5 11.6-19.5c24.1-37.1 78.1-34.8 103.8-6.1 23.7 27.3 18.4 53 18.4 175z" />
                     </svg>
                  </Link>
               </div>
            </div>
         )}
      </div>
   );
};
