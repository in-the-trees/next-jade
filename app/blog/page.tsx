import {
   PostReturn,
   PostMatter,
   getPosts
} from '@/app/lib/blog/main';
import Link from 'next/link'

export default async function Blog() {
   const posts = await getPosts(PostReturn.MATTER_ONLY) as PostMatter[];
   
   return (
      <main id="blog">
         <h1 className="text-2xl font-bold">Blog</h1>
         <ul>
            {posts.sort((a, b) => (a.date > b.date ? -1 : 1)).map((post) => (
               <li key={post.id}>
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
               </li>
            ))}
         </ul>
      </main>
   );
}