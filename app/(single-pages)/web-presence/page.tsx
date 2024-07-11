import type { Metadata } from "next";
import Breadcrumb from "@/app/_components/breadcrumb";
import { lora } from "@/app/_fonts/fonts";

export const metadata: Metadata = {
   title: "Jade's web presence",
   description: "Links to various platforms I have accounts on.",
};

type PresenceGroup = {
   group: string;
   platforms: {
      name: string;
      username: string;
      url: string;
      description?: string;
   }[];
};

const presence: PresenceGroup[] = [
   {
      group: "Developer",
      platforms: [
         {
            name: "GitHub",
            username: "in-the-trees",
            url: "https://github.com/in-the-trees",
         },
      ],
   },
   {
      group: "Microblogging",
      platforms: [
         {
            name: "Micro.blog",
            username: "jade",
            url: "https://micro.blog/jade",
         },
         {
            name: "Bluesky",
            username: "inthetrees.me",
            url: "https://bsky.app/profile/inthetrees.me",
         },
         {
            name: "Threads",
            username: "inthetrees.me",
            url: "https://www.threads.net/@inthetrees.me",
         },
         {
            name: "X",
            username: "@inthetrees_7",
            url: "https://x.com/@inthetrees_7",
         },
      ],
   },
   {
      group: "Forums",
      platforms: [
         {
            name: "Techlore Discussions",
            username: "inthetrees",
            url: "https://discuss.techlore.tech/u/inthetrees",
         },
      ],
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
                  Links to various platforms I have accounts on.{" "}
               </span>
               This is not a comprehensive list.
            </h2>

            <section className="mt-5">
               {presence.map((presenceGroup) => (
                  <div key={presenceGroup.group} className="mt-3.5">
                     <h3>{presenceGroup.group}:</h3>
                     <dl className="mb-3.5 ml-4 mt-1.75">
                        {presenceGroup.platforms.map((presence) => (
                           <div key={presence.name} className="ml-3.5 list-item">
                              <div className="ml-1">
                                 <dt className="mt-1.5">{presence.name}</dt>
                                 <dd>
                                    <a
                                       className="text-forest-600 hover:underline dark:text-betty-300"
                                       href={presence.url}
                                       target="_blank"
                                    >
                                       {presence.username}
                                    </a>
                                 </dd>
                              </div>
                           </div>
                        ))}
                     </dl>
                  </div>
               ))}
            </section>
         </main>
      </div>
   );
}
