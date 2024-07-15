"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function PathTracker({
   children,
}: {
   children: React.ReactNode;
}) {
   const pathname = usePathname();
   useEffect(() => {
      const currentPath = sessionStorage.getItem("current-path");

      if (currentPath && currentPath !== pathname) {
         sessionStorage.setItem("previous-path", currentPath);
      }
      sessionStorage.setItem("current-path", pathname);
   }, [pathname]);

   return children;
}
