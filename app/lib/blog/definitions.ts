export enum PostReturn {
   FULL,
   MATTER_ONLY,
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
