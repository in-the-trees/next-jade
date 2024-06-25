import { agent } from "@/app/_lib/microblog/api";
import { Post } from "@/app/_lib/microblog/definitions";
import Breadcrumb from "@/app/_components/breadcrumb";
import { lora } from "@/app/_fonts/fonts";
import Timeline from "@/app/_components/microblog/timeline";

const ACTOR = `${process.env.NEXT_PUBLIC_BSKY_HANDLE}`;

export default async function BlueskyPage() {
   const { data: profile } = await agent.app.bsky.actor.getProfile({
      actor: ACTOR,
   });

   const {
      data: { feed: bskyPosts },
   } = await agent.app.bsky.feed.getAuthorFeed({
      actor: ACTOR,
      filter: "posts_and_author_threads",
   });

   const organizedThreads = (() => {
      const posts = bskyPosts.flatMap(
         (item) =>
            ({
               ...item.post,
            }) as unknown,
      ) as Post[];

      const threadMap = new Map();

      posts.forEach((post) => {
         threadMap.set(post.cid, { ...post, replies: [] });
      });

      posts.forEach((post) => {
         if (post.record.reply) {
            const parentCid = post.record.reply.root.cid;
            const parent = threadMap.get(parentCid);
            if (parent) {
               parent.replies.push(threadMap.get(post.cid));
            }
         }
      });

      return Array.from(threadMap.values()).filter((post) => !post.record.reply);
   })();

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
                  <h3 className="my-4 text-2xl font-medium-mid">Profile</h3>
                  <pre>{JSON.stringify(profile, null, 2)}</pre>
                  <h3 className="my-4 text-2xl font-medium-mid">Feed</h3>
                  <Timeline posts={organizedThreads} />
               </div>
            </div>
         </main>
      </div>
   );
}
