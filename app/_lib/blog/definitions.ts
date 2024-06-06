export type PostCategories = "tech" | "life";

export enum PostReturn {
   FULL,
   MATTER_ONLY,
}

export interface PostMatter {
   draft?: boolean;
   slug: string;
   category: PostCategories;
   title: string;
   date: string;
   description?: string;
   tags?: string[];
}

export interface Post {
   postMatter: PostMatter;
   content: string;
}
