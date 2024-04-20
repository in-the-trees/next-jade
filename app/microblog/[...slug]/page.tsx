export const runtime = "edge";
import getPostById from "@/app/_lib/microblog/getPostById";
import { notFound } from "next/navigation";
import Microblog from "@/app/_components/microblog/Microblog";

export default async function MicroblogPost({
   params,
}: {
   params: { slug: string[] };
}) {
   const slugArray = params.slug;
   const idFromSlug = params.slug[params.slug.length - 1];
   const isValidId = /^\d{7}$/.test(idFromSlug);

   if (!isValidId) {
      notFound();
   }

   if (slugArray.length === 1) {
      const post = await getPostById(idFromSlug);

      return (
         <div className="px-4">
            <Microblog Microblog={post} />
         </div>
      );
   } else if (
      slugArray.length === 4 &&
      /^\d{4}$/.test(slugArray[0]) &&
      /^[1-9]\d?$/.test(slugArray[1]) &&
      /^[1-9]\d?$/.test(slugArray[2])
   ) {
      const year = slugArray[0];
      const month = slugArray[1];
      const day = slugArray[2];

      const post = await getPostById(idFromSlug, {
         year,
         month,
         day,
      });

      if (!post) {
         notFound();
      }

      return (
         <div className="px-4">
            <Microblog Microblog={post} />
         </div>
      );
   } else {
      notFound();
   }
}
