export const dynamicParams = false;

import { Post, PostMatter, PostReturn } from "@/app/_lib/blog/definitions";
import { getPostBySlug } from "@/app/_lib/blog/getPostBySlug";
import { getPosts } from "@/app/_lib/blog/getPosts";
import { MDXRemote } from "next-mdx-remote/rsc";
import { lora, commit_mono } from "@/app/_fonts/fonts";
import Breadcrumb from "@/app/_components/breadcrumb";
import { DocTextMedium14Icon } from "@/app/_components/icons";
import { Metadata } from "next";

type Props = {
   params: {
      slug: string;
   };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
   const post = (await getPostBySlug(params.slug, PostReturn.FULL)) as Post;
   return {
      title: post.postMatter.title,
      description: post.postMatter.description,
      alternates: {
         canonical: `/blog/${params.slug}`,
      },
   };
}

export async function generateStaticParams() {
   const posts = (await getPosts(PostReturn.MATTER_ONLY)) as PostMatter[];
   return posts.map((post) => ({
      slug: post.slug,
   }));
}

export default async function BlogPost({
   params,
}: {
   params: { slug: string };
}) {
   const post = (await getPostBySlug(params.slug, PostReturn.FULL)) as Post;

   return (
      <div>
         <header className="fixed top-0 z-30 w-full px-4">
            <div className="-mx-4 bg-stone-100 px-4 pb-1 pt-[24px] md:pt-[40px] lg:pt-[56px]">
               <Breadcrumb
                  items={[
                     { type: "link", text: "Jade", href: "/" },
                     { type: "separator" },
                     { type: "link", text: "Blog", href: "/blog" },
                     { type: "separator" },
                     { type: "text", text: "This post" },
                  ]}
               />
            </div>
            <div className="-mx-4 bg-gradient-to-b from-white px-4 pb-4"></div>
         </header>
         <main className="mt-[4.75rem] px-4 md:mt-[6.75rem]">
            <article>
               <header className="mb-4">
                  <div className="mb-3.5 flex items-center gap-2 text-stone-500">
                     <DocTextMedium14Icon className="h-4 w-4" />
                     <time
                        dateTime={
                           new Date(post.postMatter.date)
                              .toISOString()
                              .split("T")[0]
                        }
                        className={`${commit_mono.className} text-[1em - 1px] block self-start text-nowrap text-[calc(1em-1px)] text-stone-500`}
                     >
                        {new Date(
                           post.postMatter.date + "T00:00:00",
                        ).toLocaleString("default", {
                           month: "long",
                           day: "numeric",
                        })}
                     </time>
                  </div>
                  <h1
                     className={`${lora.className} text-[1.5em] font-normal-mid`}
                  >
                     {post.postMatter.title}
                  </h1>
               </header>
               <div
                  className={`proseStyling prose-sm ${lora.variable} ${commit_mono.variable}`}
               >
                  <MDXRemote source={post.content} />
               </div>
            </article>
         </main>
      </div>
   );
}
