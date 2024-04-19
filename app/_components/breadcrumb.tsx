import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { ArrowUpRightIcon } from "@heroicons/react/24/solid";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

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
   return (
      <div className={`${className} flex flex-wrap items-center gap-2`}>
         {items.map((item, index) => {
            switch (item.type) {
               case "link":
                  return (
                     <Link
                        key={index}
                        href={item.href}
                        className="py-0.75 rounded-lg-half flex items-center gap-1 bg-gray-100 px-2 text-gray-700 transition-transform ease-out hover:scale-103"
                     >
                        {index === 0 && (
                           <ArrowLeftIcon className="h-3.5 w-3.5" />
                        )}
                        <span>{item.text}</span>
                     </Link>
                  );
               case "text":
                  return (
                     <span
                        key={index}
                        className="rounded-lg-half py-0.75 border border-gray-200 px-2 text-gray-500"
                     >
                        {item.text}
                     </span>
                  );
               case "external-link":
                  return (
                     <Link
                        key={index}
                        href={item.href}
                        className="rounded-lg-half py-0.75 ml-auto flex items-center gap-1 bg-blue-50 px-2 text-blue-500 transition-transform ease-out hover:scale-103"
                     >
                        <span>{item.text}</span>
                        <ArrowUpRightIcon className="h-3 w-3" />
                     </Link>
                  );
               case "separator":
                  return (
                     <ChevronRightIcon
                        key={index}
                        className="h-3 w-3 text-gray-400"
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
