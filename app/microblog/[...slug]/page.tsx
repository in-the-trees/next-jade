export const runtime = "edge";

import { Microdotblog } from "@/app/_lib/microblog/definitions";
import { Metadata } from "next";
import Breadcrumb from "@/app/_components/breadcrumb";
import getMicroblog from "@/app/_lib/microblog/getMicroblog";
import getMicrodotblog from "@/app/_lib/microblog/getMicrodotblog";
import MicroblogPost from "@/app/_components/microblog/post";
import ReplyArea from "@/app/_components/microblog/replyArea";

type Props = {
   params: {
      slug: string[];
   };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
   const post = await getMicroblog({ params });
   const urlDate = new Date(post.date_published.split("T")[0]);

   return {
      title: post!.title,
      description: post!.description,
      alternates: {
         canonical: `/microblog/${urlDate.getUTCFullYear()}/${urlDate.getUTCMonth() + 1}/${urlDate.getUTCDate()}/${post.id}`,
      },
   };
}

export default async function Post({ params }: { params: { slug: string[] } }) {
   const post = await getMicroblog({ params });

   let microdotblog: Microdotblog | null = await getMicrodotblog(post.url);

   return (
      <div>
         <header className="sticky top-0 z-50">
            <div className="bg-white px-4 pb-1 pt-7 md:pt-[44px] lg:pt-[60px] dark:bg-stone-900">
               {microdotblog && microdotblog.home_page_url ?
                  <Breadcrumb
                     items={[
                        { type: "link", text: "Jade", href: "/" },
                        { type: "separator" },
                        {
                           type: "link",
                           text: "Microblog",
                           href: "/microblog",
                        },
                        { type: "separator" },
                        { type: "text", text: "This post" },
                        {
                           type: "external-link",
                           text: "Micro.blog",
                           href: microdotblog.home_page_url,
                        },
                     ]}
                  />
               :  <Breadcrumb
                     items={[
                        { type: "link", text: "Jade", href: "/" },
                        { type: "separator" },
                        {
                           type: "link",
                           text: "Microblog",
                           href: "/microblog",
                        },
                        { type: "separator" },
                        { type: "text", text: "This post" },
                     ]}
                  />
               }
            </div>
            <div className="bg-gradient-to-b from-white px-4 pb-4 dark:from-stone-900"></div>
         </header>
         <main className="px-4">
            <MicroblogPost post={post} dynamic_time={true} />
            <ReplyArea post={post} microdotblog={microdotblog} />
         </main>
      </div>
   );
}
