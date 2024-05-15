import { revalidatePath } from "next/cache";

type DateParams = {
   year: string;
   month: string;
   day: string;
};

type IdData = {
   ids: [
      {
         url: string;
         id: string;
         date_published: string;
         date_modified?: string;
      },
   ];
};

const getPost = async (id: string, dateParams?: DateParams) => {
   const id_data_url = `https://${process.env.NEXT_PUBLIC_MICROBLOG_BASE_URL}/api/ids.json`;
   revalidatePath(id_data_url);
   const id_data_res = await fetch(id_data_url);

   if (!id_data_res.ok) {
      throw new Error("Failed to fetch id data");
   } else {
      const id_data: IdData = await id_data_res.json();

      let post_url: string | undefined = undefined;
      if (
         dateParams &&
         dateParams.year &&
         dateParams.month &&
         dateParams.day &&
         id
      ) {
         for (const item of id_data.ids) {
            const postDate = new Date(item.date_published.split("T")[0]);
            if (
               item.id === id &&
               postDate.getUTCFullYear() === parseInt(dateParams.year) &&
               postDate.getUTCMonth() + 1 === parseInt(dateParams.month) &&
               postDate.getUTCDate() === parseInt(dateParams.day)
            ) {
               post_url = item.url;
               break;
            }
         }
      } else {
         post_url = id_data.ids.find((item) => item.id === id)?.url;
      }

      if (!post_url) {
         throw new Error(`Failed to find post with id: ${id}`);
      } else {
         let urlParts = new URL(post_url);
         urlParts.pathname = "/api" + urlParts.pathname;
         const api_url = urlParts.toString();

         revalidatePath(api_url);
         const res = await fetch(api_url);
         if (!res.ok) {
            throw new Error(`Failed to fetch post from ${api_url}`);
         } else {
            const json = await res.json();
            return json;
         }
      }
   }
};

export default getPost;
