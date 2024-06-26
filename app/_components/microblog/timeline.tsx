import { Post as PostType } from "@/app/_lib/microblog/definitions";
import Post from "@/app/_components/microblog/post";

type TimelineProps = {
   className?: string;
   posts: PostType[];
};

export default function Timeline({ className, posts }: TimelineProps) {
   return (
      <div className={`${className} flex flex-col gap-4`}>
         {posts.map((post) => (
            <Post key={post.cid} post={post} timelined />
         ))}
      </div>
   );
}
