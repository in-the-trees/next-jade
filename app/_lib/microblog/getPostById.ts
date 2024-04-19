import { Microblog, MicroblogFeed } from "@/app/_lib/microblog/definitions";
import fetchFeed from "@/app/_lib/microblog/fetchFeed";

const feedUrl = "https://jade.van-dorsten.net/api/all.json";
const feed: MicroblogFeed = await fetchFeed(feedUrl);

const getPostById = async (id: string): Promise<Microblog> => {
   const post = feed.items?.find((post) => post.id === id);

   if (!post) {
      throw new Error(`Failed to find post with id: ${id}`);
   } else {
      return post;
   }
};

export default getPostById;
