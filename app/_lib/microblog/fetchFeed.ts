export const runtime = "edge";

import type { MicroblogFeed } from "@/app/_lib/microblog/definitions";
import { revalidatePath } from "next/cache";

export default async function fetchFeed(feedUrl: string) {
   revalidatePath(feedUrl);
   const response: Response = await fetch(feedUrl);

   if (!response.ok) {
      throw new Error(`Failed to fetch feed from ${feedUrl}`);
      return null;
   }

   const res: Promise<MicroblogFeed> = await response.json();
   return res;
}
