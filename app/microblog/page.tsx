import { agent } from "@/app/_lib/microblog/api";
import { AppBskyFeedDefs, AppBskyFeedPost } from "@atproto/api";
import Breadcrumb from "@/app/_components/breadcrumb";
import { lora } from "@/app/_fonts/fonts";

const EXAMPLE_POST =
   "at://did:plc:vwzwgnygau7ed7b7wt5ux7y2/app.bsky.feed.post/3karfx5vrvv23";

export default async function BlueskyPage() {
   const thread = await agent.app.bsky.feed.getPostThread({
      uri: EXAMPLE_POST,
   });

   if (!AppBskyFeedDefs.isThreadViewPost(thread.data.thread)) {
      throw new Error("Expected a thread view post");
   }

   const post = thread.data.thread.post;

   if (!AppBskyFeedPost.isRecord(post.record)) {
      throw new Error("Expected a post with a record");
   }

   return (
      <div>
         <header className="z-40">
            <div className="pb-4">
               <Breadcrumb
                  items={[
                     { type: "link", text: "Jade", href: "/" },
                     { type: "separator" },
                     { type: "text", text: "Bluesky" },
                  ]}
               />
            </div>
         </header>
         <div className="gradient-blur">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
         </div>
         <main id="microblog">
            <h1
               className={`${lora.className} mb-3.5 text-[1.5em] font-normal-mid`}
            >
               Bluesky
            </h1>
            <h2 className="text-pretty">Experimenting with the Bluesky API.</h2>

            <div className="my-4 flex flex-wrap items-center gap-2">
               <div className="mt-9">
                  <p className="font-medium">
                     {thread.data.thread.post.author.displayName}
                  </p>
                  <p>{post.record.text}</p>
               </div>
            </div>
         </main>
      </div>
   );
}
