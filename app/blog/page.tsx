import { PostMatter, PostReturn } from "@/app/_lib/blog/definitions";
import { getPosts } from "@/app/_lib/blog/getPosts";
import Link from "next/link";
import { lora } from "@/app/_fonts/fonts";
import { commit_mono } from "@/app/_fonts/fonts";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Breadcrumb from "@/app/_components/breadcrumb";

export default async function Blog() {
   const posts = [] as PostMatter[];
   //const posts = (await getPosts(PostReturn.MATTER_ONLY)) as PostMatter[];

   return (
      <div>
         <header className="z-40">
            <div className="pb-4">
               <Breadcrumb
                  items={[
                     { type: "link", text: "Jade", href: "/" },
                     { type: "separator" },
                     { type: "text", text: "Blog" },
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
         <main id="blog">
            <h1
               className={`${lora.className} mb-3.5 text-[1.5em] font-normal-mid`}
            >
               Blog
            </h1>
            <h2>
               Welcome to my blog where I post extended or more evergreen content
               compared to my microblog.
            </h2>

            <ul className="mt-9">
               {posts.length > 0 ?
                  posts
                     .sort((a, b) => (a.date > b.date ? -1 : 1))
                     .map((post) => (
                        <li key={post.slug} className="mb-3.5">
                           <div className="flex items-center gap-[0.25em] leading-none">
                              <time
                                 dateTime={post.date}
                                 className={`${commit_mono.className} text-[1em - 1px] block self-start text-nowrap text-[calc(1em-1px)] text-stone-500`}
                              >
                                 {new Date(
                                    post.date + "T00:00:00",
                                 ).toLocaleString("default", {
                                    month: "short",
                                    day: "numeric",
                                 })}
                              </time>
                              <ChevronRightIcon className="block h-3 w-3 self-start text-nowrap text-stone-400" />
                              <Link
                                 href={`/blog/${post.slug}`}
                                 className="dark:text-forest-300block self-start text-forest-600 hover:underline"
                              >
                                 {post.title}
                              </Link>
                           </div>
                        </li>
                     ))
               :  <p className="text-stone-500 dark:text-stone-300">
                     No posts yet.
                  </p>
               }
            </ul>
         </main>
      </div>
   );
}
