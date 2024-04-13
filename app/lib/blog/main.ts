import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export enum PostReturn {
   FULL,
   MATTER_ONLY
}

export interface PostMatter {
   filename?: string;
   id: string;
   slug: string;
   title: string;
   date: string;
}

export interface Post {
   postMatter: PostMatter;
   content: string;
}

const postsDirectory = path.join(process.cwd(), 'content/blog');

const getPostsFiles = () => {
   try {
      return fs.readdirSync(postsDirectory);
   } catch (error) {
      console.error(`Failed to read directory: ${postsDirectory}`);
      throw error;
   }
};

export const getPost = async (postFile: string, postReturn: PostReturn) => {
   try {
      const fullPostPath = path.join(postsDirectory, postFile);
      const fileContents = fs.readFileSync(fullPostPath, 'utf8');

      const postRaw = matter(fileContents);
      const postMatter = postRaw.data as PostMatter;
      postMatter.filename = postFile;

      if (postReturn === PostReturn.MATTER_ONLY) {
         return postMatter;
      } else if (postReturn === PostReturn.FULL) {
         const postHTML = (await remark().use(html).process(postRaw.content)).toString();
         const post: Post = {
            postMatter,
            content: postHTML
         };
         return post;
      } else {
         throw new Error('Invalid post return amount');
      }
   } catch (error) {
      console.error(`Failed to get post data for file: ${postFile}`);
      throw error;
   }
};

export const getPosts = async (postReturn: PostReturn) => {
   const postsFiles = getPostsFiles();
   
   if (postReturn === PostReturn.MATTER_ONLY) {
      const posts: PostMatter[] = await Promise.all(postsFiles.map((postFile) => getPost(postFile, PostReturn.MATTER_ONLY))) as PostMatter[];
      return posts;
   } else if (postReturn === PostReturn.FULL) {
      const posts: Post[] = await Promise.all(postsFiles.map((postFile) => getPost(postFile, PostReturn.FULL))) as Post[];
      return posts;
   } else {
      throw new Error('Invalid post return amount');
   }
};