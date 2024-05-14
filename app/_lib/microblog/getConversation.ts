import { revalidatePath } from "next/cache";

const getConversation = async (permalink: string) => {
   const conversationUrl = `https://micro.blog/conversation.js?url=${permalink}&format=jsonfeed`;
   revalidatePath(conversationUrl);
   const res: Response = await fetch(conversationUrl);

   if (!res.ok) {
      throw new Error("Failed to fetch conversation");
   } else {
      const json = await res.json();
      return json.items;
   }
};

export default getConversation;
