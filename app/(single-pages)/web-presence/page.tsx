import type { Metadata } from "next";
import Breadcrumb from "@/app/_components/breadcrumb";
import { lora } from "@/app/_fonts/fonts";

export const metadata: Metadata = {
   title: "Jade's web presence",
   description: "List of my web presence links.",
};

const presence: {
   platform: string;
   username: string;
   url: string;
   description?: string;
}[] = [
   {
      platform: "GitHub",
      username: "in-the-trees",
      url: "https://github.com/in-the-trees",
   },
   {
      platform: "Micro.blog",
      username: "jade",
      url: "https://micro.blog/jade",
   },
   {
      platform: "Bluesky",
      username: "inthetrees.me",
      url: "https://bsky.app/profile/inthetrees.me",
   },
   {
      platform: "Threads",
      username: "inthetrees.me",
      url: "https://www.threads.net/@inthetrees.me",
   },
   {
      platform: "X",
      username: "inthetrees_7",
      url: "https://x.com/@inthetrees_7",
   },
];

export default function WebPresence() {
   return (
      <div>
         <header className="z-40">
            <div className="pb-4">
               <Breadcrumb
                  items={[
                     { type: "link", text: "Jade", href: "/" },
                     { type: "separator" },
                     { type: "text", text: "Web presence" },
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
               Web presence
            </h1>
            <h2 className="text-pretty">
               <span className="sm:block">
                  Where I link to my online presence.
               </span>
            </h2>

            <section className="mt-9">
               <dl>
                  {presence.map((presence) => (
                     <div key={presence.username}>
                        <dt className="mt-1.5">{presence.platform}</dt>
                        <dd className="ml-3.5">
                           <a
                              href={presence.url}
                              target="_blank"
                              className="text-forest-600 hover:underline dark:text-betty-300"
                           >
                              {presence.username}
                           </a>
                        </dd>
                        {presence.description && (
                           <dd className="ml-4">{presence.description}</dd>
                        )}
                     </div>
                  ))}
               </dl>
            </section>
         </main>
      </div>
   );
}
