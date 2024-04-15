import { PostMatter, PostReturn } from "@/app/lib/blog/definitions";
import { getPosts } from "@/app/lib/blog/getPosts";
import Link from "next/link";
import { lora } from "@/app/ui/fonts";
import { commit_mono } from "@/app/ui/fonts";
import { ChevronRightIcon, RssIcon } from "@heroicons/react/24/outline";

export default async function Blog() {
   const posts = (await getPosts(PostReturn.MATTER_ONLY)) as PostMatter[];

   return (
      <main id="blog">
         <h1 className={`${lora.className} mb-1.75 text-[1.5em] font-normal-mid`}>Blog</h1>
         <h2>
            Welcome to my blog where I post extended or more evergreen content compared to my
            microblog.
         </h2>

         <div className="my-4 flex flex-wrap items-center gap-2">
            <a
               href="/blog"
               className="hover:scale-103 flex w-max items-center justify-between gap-2 rounded-lg border px-2 py-1 text-sm shadow-sm transition-transform ease-out"
            >
               <RssIcon className="h-4 w-4" />
               JSON
            </a>
         </div>

         <ul className="mt-9">
            {posts
               .sort((a, b) => (a.date > b.date ? -1 : 1))
               .map((post) => (
                  <li key={post.id} className="mb-3.5">
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
   );
}
