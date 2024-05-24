import { Post, PostMatter, PostReturn } from "@/app/_lib/blog/definitions";
import { getPostsFiles } from "@/app/_lib/blog/getPostsFiles";
import { getPost } from "@/app/_lib/blog/getPost";

export const getPosts = async (postReturn: PostReturn) => {
   const postsFiles = getPostsFiles();

   if (postReturn === PostReturn.MATTER_ONLY) {
      const posts: PostMatter[] = (await Promise.all(
         postsFiles.map((postFile) => getPost(postFile, PostReturn.MATTER_ONLY)),
      )) as PostMatter[];
      return posts.filter((post) => !post.draft);
   } else if (postReturn === PostReturn.FULL) {
      const posts: Post[] = (await Promise.all(
         postsFiles.map((postFile) => getPost(postFile, PostReturn.FULL)),
      )) as Post[];
      return posts.filter((post) => !post.postMatter.draft);
   } else {
      throw new Error("Invalid post return amount");
   }
};
