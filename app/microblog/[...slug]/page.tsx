// app/blog/[...slug]/page.tsx
import getPostById from "@/app/_lib/microblog/getPostById";
import { notFound } from "next/navigation";

export default async function MicroblogPost({
   params,
}: {
   params: { slug: string[] };
}) {
   const slugArray = params.slug;
   const idFromSlug = params.slug[params.slug.length - 1];
   const isValidId = /^\d{7}$/.test(idFromSlug);

   console.log(idFromSlug);
   console.log(isValidId);

   if (!isValidId) {
      notFound();
   }

   if (slugArray.length === 1) {
      const post = await getPostById(idFromSlug);

      return (
         <div>
            <p>{post.id}</p>
            <p>{post.date_published}</p>
         </div>
      );
   }

   if (
      slugArray.length === 4 &&
      slugArray[0].length === 4 &&
      slugArray[1].length === 2 &&
      slugArray[2].length === 2
   ) {
      const id = slugArray[slugArray.length - 1];
      const post = await getBlogPostById(id);

      return (
         <div>
            <h1>{post.title}</h1>
            <p>{post.date}</p>
            <div>{post.content}</div>
         </div>
      );
   }
}
