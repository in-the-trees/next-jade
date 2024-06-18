"use client";

import {
   ArrowLeftRegular14Icon,
   ChevronRightMedium8Icon,
} from "@/app/_components/icons";
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

   const firstItemIsIndex = items[0].type === "link" && items[0].href === "/";
   const hideFirstItem = firstItemIsIndex && items.length > 3;

   return (
      <div className={`${className} flex flex-wrap items-center gap-2 py-1`}>
         {items.map((item, index) => {
            switch (item.type) {
               case "link":
                  return (
                     <Link
                        key={index}
                        href={item.href}
                        className={clsx(
                           "flex items-center gap-1 rounded-lg-half bg-stone-200 px-2 py-0.75 text-stone-900 transition-transform ease-out hover:scale-[1.02] dark:bg-stone-600 dark:text-stone-300",
                           {
                              "hidden min-[380px]:flex":
                                 index === 0 && hideFirstItem,
                           },
                        )}
                        prefetch={index === 0 ? true : undefined}
                        onClick={() => {
                           if (previousPath === item.href) {
                              router.back();
                           }

                           if (
                              previousPath === "/microblog/archive" &&
                              item.href === "/microblog"
                           ) {
                              router.back();
                           }
                        }}
                     >
                        {index === 0 && item.href === "/" && (
                           <ArrowLeftRegular14Icon className="mr-1 h-3.5 w-3.5" />
                        )}
                        <span>{item.text}</span>
                     </Link>
                  );
               case "text":
                  return (
                     <span
                        key={index}
                        className="box-border rounded-lg-half border border-stone-200 px-2 py-0.75 text-stone-500 dark:border-stone-400/40 dark:text-stone-300/90"
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
                           className="dark:text-forest-300ml-0 flex w-fit items-center gap-1 rounded-lg-half bg-blue-50 px-2 py-0.75 text-forest-600 transition-transform ease-out hover:scale-[1.02] md:ml-auto"
                        >
                           <span>{item.text}</span>
                        </a>
                     </div>
                  );
               case "separator":
                  return (
                     <ChevronRightMedium8Icon
                        key={index}
                        className={clsx("h-2 w-2 text-stone-400", {
                           "hidden min-[380px]:flex":
                              index === 1 && hideFirstItem,
                        })}
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
