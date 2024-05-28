import { Microblog } from "@/app/_lib/microblog/definitions";
import getPost from "@/app/_lib/microblog/getPost";
import { notFound } from "next/navigation";

type Props = {
   params: {
      slug: string[];
   };
};

export default async function getMicroblog({ params }: Props) {
   const slugArray = params.slug;
   const idFromSlug = params.slug[params.slug.length - 1];

   const isValidId = /^\d{7}$/.test(idFromSlug);
   if (!isValidId) {
      notFound();
   }

   let post: Microblog;

   if (slugArray.length === 1) {
      try {
         post = await getPost(idFromSlug);
      } catch {
         notFound();
      }
   } else if (
      slugArray.length === 4 &&
      /^\d{4}$/.test(slugArray[0]) &&
      /^[1-9]\d?$/.test(slugArray[1]) &&
      /^[1-9]\d?$/.test(slugArray[2])
   ) {
      const year = slugArray[0];
      const month = slugArray[1];
      const day = slugArray[2];

      try {
         post = await getPost(idFromSlug, { year, month, day });
      } catch {
         notFound();
      }
   } else {
      notFound();
   }

   return post;
}
