"use client";

import { useState, useEffect } from "react";
import { formatTimeRelatively } from "@/app/_lib/relativeTime";

type TimestampProps = {
   className?: string;
   createdAt: string;
   initRelativeTime: string;
};

export default function Timestamp({
   className,
   createdAt,
   initRelativeTime,
}: TimestampProps) {
   const [relativeTime, setRelativeTime] = useState(initRelativeTime);

   useEffect(() => {
      setRelativeTime(formatTimeRelatively(createdAt, true));
      const interval = setInterval(() => {
         setRelativeTime(formatTimeRelatively(createdAt, true));
      }, 1000);

      return () => clearInterval(interval);
   }, [createdAt]);

   return (
      <time className={className} dateTime={createdAt} title={createdAt}>
         {relativeTime}
      </time>
   );
}
