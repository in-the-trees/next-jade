"use client";

import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { ArrowUpRightIcon } from "@heroicons/react/24/solid";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type BreadcrumbItem =
   | { type: "link"; text: string; href: string }
   | { type: "text"; text: string }
   | { type: "external-link"; text: string; href: string }
   | { type: "separator" };

type BreadcrumbProps = {
   className?: string;
   items: BreadcrumbItem[];
};

const Breadcrumb = ({ className, items }: BreadcrumbProps) => {
   const router = useRouter();

   const [previousPath, setPreviousPath] = useState<string | null>(null);
   useEffect(() => {
      setPreviousPath(sessionStorage.getItem("previous-path"));
   }, [previousPath]);

   return (
      <div className={`${className} flex flex-wrap items-center gap-2`}>
         {items.map((item, index) => {
            switch (item.type) {
               case "link":
                  return previousPath !== item.href ?
                        <Link
                           key={index}
                           href={item.href}
                           className="flex items-center gap-1 rounded-lg-half bg-gray-100 px-2 py-0.75 text-gray-700 transition-transform ease-out hover:scale-103 dark:bg-stone-800 dark:text-stone-400"
                           prefetch={index === 0 ? true : undefined}
                        >
                           {index === 0 && (
                              <ArrowLeftIcon className="h-3.5 w-3.5" />
                           )}
                           <span>{item.text}</span>
                        </Link>
                     :  <button
                           key={index}
                           onClick={() => {
                              router.back();
                           }}
                           className="flex items-center gap-1 rounded-lg-half bg-gray-100 px-2 py-0.75 text-gray-700 transition-transform ease-out hover:scale-103 dark:bg-stone-800 dark:text-stone-400"
                        >
                           {index === 0 && (
                              <ArrowLeftIcon className="h-3.5 w-3.5" />
                           )}
                           <span>{item.text}</span>
                        </button>;
               case "text":
                  return (
                     <span
                        key={index}
                        className="rounded-lg-half border border-gray-200 px-2 py-0.75 text-gray-500 dark:border-stone-800 dark:text-stone-500"
                     >
                        {item.text}
                     </span>
                  );
               case "external-link":
                  return (
                     <div
                        key={index}
                        className={clsx("ml-0 basis-0", {
                           "max-[500px]:basis-full": item.text === "Micro.blog",
                           "min-[500px]:ml-auto": item.text === "Micro.blog",
                        })}
                     >
                        <a
                           href={item.href}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="ml-0 flex w-fit items-center gap-1 rounded-lg-half bg-blue-50 px-2 py-0.75 text-blue-500 transition-transform ease-out hover:scale-103 md:ml-auto dark:bg-violet-500 dark:bg-opacity-20 dark:text-violet-400"
                        >
                           <span>{item.text}</span>
                           <ArrowUpRightIcon className="h-3 w-3" />
                        </a>
                     </div>
                  );
               case "separator":
                  return (
                     <ChevronRightIcon
                        key={index}
                        className="h-3 w-3 text-gray-400 dark:text-stone-600"
                     />
                  );
               default:
                  return null;
            }
         })}
      </div>
   );
};

export default Breadcrumb;
