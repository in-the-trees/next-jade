export const runtime = "edge";

import type { MicroblogFeed } from "@/app/_lib/microblog/definitions";

export default async function fetchFeed(feedUrl: string) {
   const response: Response = await fetch(feedUrl, {
      cache: "no-store",
   });

   if (!response.ok) {
      throw new Error("Failed to fetch microblog feed");
   }

   const res: Promise<MicroblogFeed> = await response.json();
   return res;
}
