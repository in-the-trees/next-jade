const getMicrodotblog = async (permalink: string) => {
   const conversationUrl = `https://micro.blog/conversation.js?url=${permalink}&format=jsonfeed&nocache=${new Date().getTime()}`;

   const response: Response = await fetch(conversationUrl);
   if (!response.ok) {
   } else {
      const res = await response.json();
      return res;
   }
};

export default getMicrodotblog;
