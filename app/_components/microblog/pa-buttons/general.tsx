"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
   EllipsisCircleRegular20Icon,
   ArrowUpRightCircleMedium16Icon,
   LinkMedium16Icon,
} from "@/app/_components/icons";

type PADropdownProps = {
   homePageUrl?: string | null;
};

export const GeneralPA = ({ homePageUrl }: PADropdownProps) => {
   const [isOpen, setIsOpen] = useState(false);
   const generalRef = useRef<HTMLDivElement>(null);
   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (
            generalRef.current &&
            !generalRef.current.contains(event.target as Node)
         ) {
            setIsOpen(false);
         }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, []);

   return (
      <div ref={generalRef} className="relative">
         <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-full transition-transform ease-out hover:opacity-70 active:scale-[0.95]"
         >
            <EllipsisCircleRegular20Icon className="h-5 w-5 text-stone-500 dark:text-stone-300/70" />
         </button>
         {isOpen && (
            <div className="absolute right-0 z-10 mt-2 w-[12rem] rounded-2xl border border-stone-200 bg-stone-100 text-forest-950 shadow-xl shadow-stone-400/10 dark:border-stone-400/40 dark:bg-stone-500 dark:text-stone-50 dark:shadow-stone-700/10">
               <div className="p-2">
                  {homePageUrl && (
                     <Link
                        href={homePageUrl}
                        prefetch={false}
                        target="_blank"
                        className="mb-1 flex w-full items-center justify-between rounded-xl bg-forest-100 px-4 py-2 text-left text-sm font-normal-mid text-forest-700 transition-transform ease-out hover:scale-[1.01] hover:bg-forest-200 active:scale-[1.0] dark:bg-forest-200 dark:text-forest-800 dark:hover:bg-forest-300"
                     >
                        Micro.blog
                        <ArrowUpRightCircleMedium16Icon className="h-4 w-4 fill-forest-700 dark:fill-forest-800" />
                     </Link>
                  )}
                  <button
                     className="flex w-full items-center justify-between rounded-xl px-4 py-2 text-left text-sm font-normal-mid transition-transform ease-out hover:bg-stone-200 active:scale-[0.99] dark:hover:bg-stone-600/30"
                     onClick={() => {
                        navigator.clipboard.writeText(
                           window.location.toString(),
                        );
                     }}
                  >
                     Copy link
                     <LinkMedium16Icon className="h-4 w-4 fill-forest-950 dark:fill-stone-50" />
                  </button>
               </div>
            </div>
         )}
      </div>
   );
};
