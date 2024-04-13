import { Post, PostMatter, PostReturn } from "@/app/lib/blog/definitions";
import { getPostBySlug } from "@/app/lib/blog/getPostBySlug";
import { getPosts } from "@/app/lib/blog/getPosts";
import { MDXRemote } from "next-mdx-remote/rsc";

const posts = (await getPosts(PostReturn.MATTER_ONLY)) as PostMatter[];

export async function generateStaticParams() {
   return posts.map((post) => ({
      slug: post.slug,
   }));
}

export default async function Page({ params }: { params: { slug: string } }) {
   const post = (await getPostBySlug(posts, params.slug, PostReturn.FULL)) as Post;
   return (
      <main>
         <h1 className="text-2xl font-bold">{post.postMatter.title}</h1>
         <MDXRemote source={post.content} />
      </main>
   );
}
