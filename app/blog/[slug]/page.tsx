export const dynamicParams = false;

import { Post, PostMatter, PostReturn } from "@/app/_lib/blog/definitions";
import { getPostBySlug } from "@/app/_lib/blog/getPostBySlug";
import { getPosts } from "@/app/_lib/blog/getPosts";
import { MDXRemote } from "next-mdx-remote/rsc";
import { lora, commit_mono } from "@/app/_fonts/fonts";
import Breadcrumb from "@/app/_components/breadcrumb";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
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
         <header className="sticky top-0 z-50 px-4">
            <div className="-mx-4 bg-white px-4 pb-1 pt-7 md:pt-[44px] lg:pt-[60px]">
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
         <main className="px-4">
            <article>
               <header>
                  <div className="mb-3 flex items-center gap-2 text-gray-500">
                     <DocumentTextIcon className="h-4 w-4" />
                     <time
                        dateTime={
                           new Date(post.postMatter.date)
                              .toISOString()
                              .split("T")[0]
                        }
                        className={`${commit_mono.className} text-[1em - 1px] block self-start text-nowrap text-[calc(1em-1px)] text-gray-500`}
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
               <div className="prose-sm prose-a:text-blue-500 hover:prose-a:underline prose-img:max-h-64 prose-img:max-w-full prose-img:rounded-xl prose-img:border prose-img:transition-transform prose-img:ease-out hover:prose-img:scale-103">
                  <MDXRemote source={post.content} />
               </div>
            </article>
         </main>
      </div>
   );
}
