export const runtime = "edge";

import { Microblog, MicroblogFeed } from "@/app/_lib/microblog/definitions";
import fetchFeed from "@/app/_lib/microblog/fetchFeed";

const feedUrl = "https://van-dorsten.micro.blog/api/all.json";

type DateParams = {
   year: string;
   month: string;
   day: string;
};

const getPostById = async (
   id: string,
   dateParams?: DateParams,
   customFeed?: MicroblogFeed,
): Promise<Microblog> => {
   if (dateParams && dateParams.year && dateParams.month && dateParams.day) {
      let feed: MicroblogFeed | null = null;
      if (customFeed) {
         feed = customFeed;
      } else {
         try {
            feed = await fetchFeed(feedUrl);
         } catch (error) {
            throw new Error(`Failed to fetch feed from ${feedUrl}`);
         }
      }

      let post: Microblog | undefined;

      if (feed) {
         post = feed.items?.find((post) => {
            const postDate = new Date(post.date_published);
            return (
               post.id === id &&
               postDate.getFullYear() === parseInt(dateParams.year) &&
               postDate.getMonth() + 1 === parseInt(dateParams.month) &&
               postDate.getDate() === parseInt(dateParams.day)
            );
         });
      }

      if (!post) {
         throw new Error(
            `Failed to find post with id, year, month, day: ${id}, ${dateParams.year}, ${dateParams.month}, ${dateParams.day}`,
         );
      } else {
         return post;
      }
   } else {
      let feed: MicroblogFeed | null = null;
      if (customFeed) {
         feed = customFeed;
      } else {
         try {
            feed = await fetchFeed(feedUrl);
         } catch (error) {
            throw new Error(`Failed to fetch feed from ${feedUrl}`);
         }
      }

      let post: Microblog | undefined;
      if (feed) {
         post = feed.items?.find((post) => post.id === id);
      }

      if (!post) {
         throw new Error(`Failed to find post with id: ${id}`);
      } else {
         return post;
      }
   }
};

export default getPostById;
