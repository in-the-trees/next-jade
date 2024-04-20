import { PostMatter, PostReturn } from "@/app/_lib/blog/definitions";
import { getPost } from "@/app/_lib/blog/getPost";
import { getPosts } from "@/app/_lib/blog/getPosts";

const posts = (await getPosts(PostReturn.MATTER_ONLY)) as PostMatter[];

export const getPostBySlug = (slug: string, postReturn: PostReturn) => {
   const postFileName = posts.find((post) => post.slug === slug)?.filename;
   if (!postFileName) {
      throw new Error(`Failed to find post with id: ${slug}`);
   }
   return getPost(postFileName, postReturn);
};
