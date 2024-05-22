export const revalidate = 0;

import { Microblog, Microdotblog } from "@/app/_lib/microblog/definitions";
import { Metadata } from "next";
import Breadcrumb from "@/app/_components/breadcrumb";
import getPost from "@/app/_lib/microblog/getPost";
import getMicrodotblog from "@/app/_lib/microblog/getMicrodotblog";
import { notFound } from "next/navigation";
import MicroblogPost from "@/app/_components/microblog/post";
import ReplyArea from "@/app/_components/microblog/replyArea";

type Props = {
   params: {
      slug: string[];
   };
};

async function getMicroblog({ params }: Props) {
   const slugArray = params.slug;
   const idFromSlug = params.slug[params.slug.length - 1];

   const isValidId = /^\d{7}$/.test(idFromSlug);
   if (!isValidId) {
      notFound();
   }

   let post: Microblog;

   if (slugArray.length === 1) {
      try {
         post = await getPost(idFromSlug);
      } catch {
         notFound();
      }
   } else if (
      slugArray.length === 4 &&
      /^\d{4}$/.test(slugArray[0]) &&
      /^[1-9]\d?$/.test(slugArray[1]) &&
      /^[1-9]\d?$/.test(slugArray[2])
   ) {
      const year = slugArray[0];
      const month = slugArray[1];
      const day = slugArray[2];

      try {
         post = await getPost(idFromSlug, { year, month, day });
      } catch {
         notFound();
      }
   } else {
      notFound();
   }

   return post;
}

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
