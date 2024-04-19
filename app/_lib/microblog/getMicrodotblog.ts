const getMicrodotblog = async (permalink: string) => {
   const response: Response = await fetch(
      `https://micro.blog/conversation.js?url=${permalink}&format=jsonfeed`,
      {
         cache: "no-store",
      },
   );

   if (!response.ok) {
      throw new Error("Failed to fetch microblog feed");
   }

   const res = await response.json();
   return res;
};

export default getMicrodotblog;
