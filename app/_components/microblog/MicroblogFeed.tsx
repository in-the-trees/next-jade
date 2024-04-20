import type { NextPage } from "next";
import type { MicroblogFeed } from "@/app/_lib/microblog/definitions";
import fetchFeed from "@/app/_lib/microblog/fetchFeed";
import Microblog from "@/app/_components/microblog/Microblog";

export const runtime = "edge";

type MicroblogProps = {
   className?: string;
   feedUrl: string;
   cutoffInHours?: number;
};

const MicroblogFeed: NextPage<MicroblogProps> = async ({
   className,
   feedUrl,
   cutoffInHours,
}) => {
   const feed: MicroblogFeed = await fetchFeed(feedUrl);

   const now = new Date();

   return (
      <div
         id="microblog-feed"
         className={`${className} h-feed flex flex-col gap-4`}
      >
         {feed.items.map((microblog) => {
            if (cutoffInHours) {
               const dateToCompare =
                  microblog.date_modified ?
                     new Date(microblog.date_modified)
                  :  new Date(microblog.date_published);
               const timeDifference = now.getTime() - dateToCompare.getTime();
               const hoursDifference = timeDifference / (1000 * 3600);

               if (hoursDifference <= cutoffInHours) {
                  return (
                     <Microblog
                        key={microblog.id}
                        Microblog={microblog}
                        location="feed"
                     />
                  );
               }
            } else {
               return (
                  <Microblog
                     key={microblog.id}
                     Microblog={microblog}
                     location="feed-archive"
                  />
               );
            }
         })}
      </div>
   );
};

export default MicroblogFeed;
