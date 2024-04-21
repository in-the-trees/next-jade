export const runtime = "edge";
export const revalidate = 0;

import { Metadata } from "next";
import getPostById from "@/app/_lib/microblog/getPostById";
import { notFound } from "next/navigation";
import Microblog from "@/app/_components/microblog/Microblog";
const { convert } = require("html-to-text");

type Props = {
   params: {
      slug: string[];
   };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
   const slugArray = params.slug;
   const idFromSlug = slugArray[slugArray.length - 1];
   const isValidId = /^\d{7}$/.test(idFromSlug);

   if (!isValidId) {
      return {
         title: "Invalid post id",
      };
   }

   const post = await getPostById(idFromSlug);

   if (slugArray.length === 1) {
      const date = new Date(post.date_published).toLocaleDateString("en-US", {
         year: "numeric",
         month: "long",
         day: "numeric",
      });
      if (post) {
         return {
            title: `Jade's microblog on ${date}`,
            description: convert(post.content_html),
         };
      }
   } else if (
      slugArray.length === 4 &&
      /^\d{4}$/.test(slugArray[0]) &&
      /^[1-9]\d?$/.test(slugArray[1]) &&
      /^[1-9]\d?$/.test(slugArray[2])
   ) {
      const year = Number(slugArray[0]);
      const month = Number(slugArray[1]);
      const day = Number(slugArray[2]);
      const date = new Date(year, month - 1, day).toLocaleDateString("en-US", {
         year: "numeric",
         month: "long",
         day: "numeric",
      });

      return {
         title: `Jade's microblog on ${date}`,
         description: convert(post.content_html),
      };
   }

   return {
      title: "Microblog not found",
   };
}

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
            <Microblog Microblog={post} location="source" />
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
            <Microblog Microblog={post} location="source" />
         </div>
      );
   } else {
      notFound();
   }
}
