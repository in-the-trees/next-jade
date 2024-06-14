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
         <header className="so_header sticky top-0 z-30 w-full px-4">
            <div className="-mx-4 bg-white px-4 pb-1 pt-[24px] md:pt-[40px] lg:pt-[56px] dark:bg-stone-900">
               <Breadcrumb
                  items={[
                     { type: "link", text: "Jade", href: "/" },
                     { type: "separator" },
                     { type: "text", text: "Blog" },
                  ]}
               />
            </div>
            <div className="-mx-4 bg-gradient-to-b from-white px-4 pb-4 dark:from-stone-900"></div>
         </header>
         <main id="blog" className="so_main px-4">
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
                                 className={`${commit_mono.className} text-[1em - 1px] block self-start text-nowrap text-[calc(1em-1px)] text-gray-500 dark:text-stone-400`}
                              >
                                 {new Date(
                                    post.date + "T00:00:00",
                                 ).toLocaleString("default", {
                                    month: "short",
                                    day: "numeric",
                                 })}
                              </time>
                              <ChevronRightIcon className="block h-3 w-3 self-start text-nowrap text-gray-400 dark:text-stone-500" />
                              <Link
                                 href={`/blog/${post.slug}`}
                                 className="block self-start text-blue-500 hover:underline dark:text-violet-400"
                              >
                                 {post.title}
                              </Link>
                           </div>
                        </li>
                     ))
               :  <p className="text-gray-400 dark:text-stone-500">
                     No posts yet.
                  </p>
               }
            </ul>
         </main>
      </div>
   );
}
