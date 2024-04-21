export enum PostReturn {
   FULL,
   MATTER_ONLY,
}

export interface PostMatter {
   filename?: string;
   slug: string;
   date: string;
   title: string;
   description?: string;
}

export interface Post {
   postMatter: PostMatter;
   content: string;
}
