import fs from "fs";
import path from "path";

export const postsDirectory = path.join(process.cwd(), "content/blog");

export const getPostsFiles = () => {
   try {
      const files = fs.readdirSync(postsDirectory);
      const mdxFiles = files.filter(
         (file) => file.endsWith(".mdx") || file.endsWith(".md"),
      );
      return mdxFiles;
   } catch (error) {
      console.error(`Failed to read directory: ${postsDirectory}`);
      throw error;
   }
};
