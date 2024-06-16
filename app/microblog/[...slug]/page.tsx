import { Microdotblog } from "@/app/_lib/microblog/definitions";
import { Metadata } from "next";
import Breadcrumb from "@/app/_components/breadcrumb";
import getMicroblog from "@/app/_lib/microblog/getMicroblog";
import getMicrodotblog from "@/app/_lib/microblog/getMicrodotblog";
import MicroblogPost from "@/app/_components/microblog/post";
import ReplyArea from "@/app/_components/microblog/replyArea";
import PADropdown from "@/app/_components/microblog/misc/pa-dropdown";

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
         <header className="z-40">
            <div className="pb-4 dark:bg-stone-900">
               {microdotblog && microdotblog.home_page_url ?
                  <div className="max-w flex flex-row items-center justify-between gap-2 py-[-.rem]">
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
                        ]}
                     />
                     <PADropdown
                        postUrl={post.url}
                        homePageUrl={microdotblog.home_page_url}
                     />
                  </div>
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
         </header>
         <div className="gradient-blur">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
         </div>
         <main>
            <MicroblogPost post={post} dynamic_time={true} />
            <ReplyArea post={post} microdotblog={microdotblog} />
         </main>
      </div>
   );
}
