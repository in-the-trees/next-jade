import { revalidatePath } from "next/cache";

export default async function getPosts(feed: string) {
   revalidatePath(feed.toString());
   const res = await fetch(feed);
   if (!res.ok) {
      throw new Error("Failed to fetch feed");
   } else {
      const json = await res.json();
      return json.items;
   }
}
