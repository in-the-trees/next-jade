import { Post } from "@/app/_lib/microblog/definitions";

type TimelineProps = {
   className?: string;
   posts: Post[];
};

export default function Timeline({ className, posts }: TimelineProps) {
   return (
      <div className={`${className} flex flex-col gap-4`}>
         {posts.map((post) => (
            <div key={post.cid}>
               <p>{post.cid}</p>
            </div>
         ))}
      </div>
   );
}
