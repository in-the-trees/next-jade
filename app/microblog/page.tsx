import { agent } from "@/app/_lib/microblog/api";
import Breadcrumb from "@/app/_components/breadcrumb";
import { lora } from "@/app/_fonts/fonts";

const ACTOR = `${process.env.NEXT_PUBLIC_BSKY_HANDLE}`;

export default async function BlueskyPage() {
   const profile = await agent.app.bsky.actor.getProfile({
      actor: ACTOR,
   });

   const posts = await agent.app.bsky.feed.getAuthorFeed({
      actor: ACTOR,
      filter: "posts_and_author_threads",
   });

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
                  <h3 className="text-2xl font-medium-mid">Profile</h3>
                  <pre>{JSON.stringify(profile.data, null, 2)}</pre>
                  <h3 className="text-2xl font-medium-mid">Posts</h3>
                  <pre>{JSON.stringify(posts.data, null, 2)}</pre>
               </div>
            </div>
         </main>
      </div>
   );
}
