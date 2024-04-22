import { PostMatter, PostReturn } from "@/app/_lib/blog/definitions";
import { getPosts } from "@/app/_lib/blog/getPosts";
import Link from "next/link";
import { lora } from "@/app/_fonts/fonts";
import { commit_mono } from "@/app/_fonts/fonts";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Breadcrumb from "@/app/_components/breadcrumb";

export default async function Blog() {
   const posts = (await getPosts(PostReturn.MATTER_ONLY)) as PostMatter[];

   return (
      <div>
         <header className="sticky top-0 z-50 px-4">
            <div className="bg-white pt-7 md:pt-[44px] lg:pt-[60px]">
               <Breadcrumb
                  items={[
                     { type: "link", text: "Jade", href: "/" },
                     { type: "separator" },
                     { type: "text", text: "Blog" },
                  ]}
               />
            </div>
            <div className="bg-gradient-to-b from-white pb-5"></div>
         </header>
         <main id="blog" className="px-4">
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
               {posts
                  .sort((a, b) => (a.date > b.date ? -1 : 1))
                  .map((post) => (
                     <li key={post.slug} className="mb-3.5">
                        <div className="flex items-center gap-[0.25em] leading-none">
                           <time
                              dateTime={post.date}
                              className={`${commit_mono.className} text-[1em - 1px] block self-start text-nowrap text-[calc(1em-1px)] text-gray-500`}
                           >
                              {new Date(post.date).toLocaleDateString("en-US", {
                                 month: "short",
                                 day: "2-digit",
                              })}
                           </time>
                           <ChevronRightIcon className="block h-3 w-3 self-start text-nowrap text-gray-400" />
                           <Link
                              href={`/blog/${post.slug}`}
                              className="block self-start text-blue-500 hover:underline"
                           >
                              {post.title}
                           </Link>
                        </div>
                     </li>
                  ))}
            </ul>
         </main>
      </div>
   );
}
