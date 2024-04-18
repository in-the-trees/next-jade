import { PostMatter, PostReturn } from "@/app/lib/blog/definitions";
import { getPost } from "@/app/lib/blog/getPost";

export const getPostBySlug = (
   posts: PostMatter[],
   slug: string,
   postReturn: PostReturn,
) => {
   const postFileName = posts.find((post) => post.slug === slug)?.filename;
   if (!postFileName) {
      throw new Error(`Failed to find post with id: ${slug}`);
   }
   return getPost(postFileName, postReturn);
};
