"use client";

import { useState } from "react";
import { EllipsisHorizontalCircleIcon } from "@heroicons/react/24/outline";

const MBDropdown = () => {
   const [isOpen, setIsOpen] = useState(false);

   return (
      <div>
         <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-full p-1 hover:bg-gray-100"
         >
            <EllipsisHorizontalCircleIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
         </button>
         {isOpen && (
            <div className="absolute mt-2 rounded-lg border bg-white shadow-xl">
               <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
               >
                  Item 1
               </a>
               <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
               >
                  Item 2
               </a>
               <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
               >
                  Item 3
               </a>
            </div>
         )}
      </div>
   );
};

export default MBDropdown;
