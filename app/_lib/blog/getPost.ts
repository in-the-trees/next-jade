export const runtime = "edge";

import fs from "fs";
import path from "path";
import matter from "gray-matter";

import { Post, PostMatter, PostReturn } from "@/app/_lib/blog/definitions";
import { postsDirectory } from "@/app/_lib/blog/getPostsFiles";

export const getPost = async (postFile: string, postReturn: PostReturn) => {
   try {
      const fullPostPath = path.join(postsDirectory, postFile);
      const fileContents = fs.readFileSync(fullPostPath, "utf8");

      const postRaw = matter(fileContents);
      const postMatter = postRaw.data as PostMatter;
      postMatter.filename = postFile;

      if (postReturn === PostReturn.MATTER_ONLY) {
         return postMatter;
      } else if (postReturn === PostReturn.FULL) {
         const content = postRaw.content;
         const post: Post = {
            postMatter,
            content,
         };
         return post;
      } else {
         throw new Error("Invalid post return amount");
      }
   } catch (error) {
      console.error(`Failed to get post data for file: ${postFile}`);
      throw error;
   }
};
