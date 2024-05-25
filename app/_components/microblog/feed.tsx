import getPosts from "@/app/_lib/microblog/getPosts";
import { Microblog as MicroblogType } from "@/app/_lib/microblog/definitions";
import MicroblogPost from "@/app/_components/microblog/post";

const FeedWrapper = ({
   children,
   className,
}: {
   children: React.ReactNode;
   className?: string;
}) => (
   <div
      id="microblog-feed"
      className={`${className} h-feed flex flex-col gap-4`}
   >
      {children}
   </div>
);

type MicroblogFeedProps = {
   className?: string;
   url: string;
   cutoff?: number;
   preloadPosts?: boolean;
   dynamic_time?: boolean;
};

export default async function MicroblogFeed({
   className,
   url,
   cutoff,
   preloadPosts,
   dynamic_time,
}: MicroblogFeedProps) {
   let posts: MicroblogType[] = [];
   try {
      posts = await getPosts(url);
   } catch (error) {
      console.error(error);
      return (
         <FeedWrapper className={className}>
            <p className="text-gray-400 dark:text-stone-500">
               Something went wrong :-(
            </p>
         </FeedWrapper>
      );
   } finally {
      if (!posts.length) {
         return (
            <FeedWrapper className={className}>
               <p className="text-gray-400 dark:text-stone-500">
                  No posts within the last day — check back later.
               </p>
            </FeedWrapper>
         );
      } else {
         const now = new Date();

         if (cutoff) {
            posts = posts.filter((post) => {
               const dateToCompare =
                  post.date_modified ?
                     new Date(post.date_modified)
                  :  new Date(post.date_published);
               const timeDiff = now.getTime() - dateToCompare.getTime();
               const hoursDiff = timeDiff / (1000 * 3600);
               return hoursDiff <= cutoff;
            });
         }

         return (
            <FeedWrapper className={className}>
               {!posts.length && (
                  <p className="text-gray-400 dark:text-stone-500">
                     No posts within the last day — check back later.
                  </p>
               )}

               {posts.map((post) => (
                  <MicroblogPost
                     key={post.id}
                     post={post}
                     inFeed={true}
                     preload={preloadPosts}
                     dynamic_time={dynamic_time}
                  />
               ))}
            </FeedWrapper>
         );
      }
   }
}
