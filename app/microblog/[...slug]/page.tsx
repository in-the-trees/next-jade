export const runtime = "edge";
export const revalidate = 0;

import { Metadata } from "next";
import getPostById from "@/app/_lib/microblog/getPostById";
import { notFound } from "next/navigation";
import Microblog from "@/app/_components/microblog/Microblog";
const { convert } = require("html-to-text");
import fetchFeed from "@/app/_lib/microblog/fetchFeed";
import { MicroblogFeed } from "@/app/_lib/microblog/definitions";

const feedUrl = `https://${process.env.MICROBLOG_BASE_URL}/api/all.json`;

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

   let feed: MicroblogFeed | null;
   try {
      feed = await fetchFeed(feedUrl);
   } catch (error) {
      console.error(error);
      return {
         title: "Micro.blog currently unreachable",
      };
   }

   let post: Microblog | null;
   let postDate: Date | null;
   if (feed) {
      post = await getPostById(idFromSlug, undefined, feed);
      if (slugArray.length === 1) {
         const date = new Date(post.date_published).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
         });
         if (post) {
            postDate = new Date(post.date_published.split("T")[0]);
            return {
               title: `Jade's microblog on ${date}`,
               description: convert(post.content_html),
               alternates: {
                  canonical: `/microblog/${postDate.getUTCFullYear()}/${postDate.getUTCMonth() + 1}/${postDate.getUTCDate()}/${post.id}`,
               },
            };
         }
      } else if (
         slugArray.length === 4 &&
         /^\d{4}$/.test(slugArray[0]) &&
         /^[1-9]\d?$/.test(slugArray[1]) &&
         /^[1-9]\d?$/.test(slugArray[2])
      ) {
         postDate = new Date(post.date_published.split("T")[0]);
         const year = Number(slugArray[0]);
         const month = Number(slugArray[1]);
         const day = Number(slugArray[2]);
         const date = new Date(year, month - 1, day).toLocaleDateString(
            "en-US",
            {
               year: "numeric",
               month: "long",
               day: "numeric",
            },
         );

         return {
            title: `Jade's microblog on ${date}`,
            description: convert(post.content_html),
            alternates: {
               canonical: `/microblog/${postDate.getUTCFullYear()}/${postDate.getUTCMonth() + 1}/${postDate.getUTCDate()}/${post.id}`,
            },
         };
      }

      return {
         title: "Microblog not found",
      };
   } else {
      return {
         title: "Micro.blog currently unreachable",
      };
   }
}

export default async function MicroblogPost({
   params,
}: {
   params: { slug: string[] };
}) {
   const slugArray = params.slug;
   const idFromSlug = params.slug[params.slug.length - 1];
   const isValidId = /^\d{7}$/.test(idFromSlug);

   let feed: MicroblogFeed | null;
   try {
      feed = await fetchFeed(feedUrl);
   } catch (error) {
      console.error(error);
      feed = null;
   }

   if (!isValidId) {
      notFound();
   }

   if (slugArray.length === 1) {
      let post: Microblog | null;

      if (feed) {
         post = await getPostById(idFromSlug, undefined, feed);
         return (
            <div className="px-4">
               <Microblog Microblog={post} location="source" />
            </div>
         );
      } else {
         return (
            <div className="px-4">
               <Microblog location="source" />
            </div>
         );
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

      if (feed) {
         let post: Microblog | null;

         try {
            post = await getPostById(
               idFromSlug,
               {
                  year,
                  month,
                  day,
               },
               feed,
            );
         } catch (error) {
            console.error(error);
            post = null;
         }

         if (!post) {
            notFound();
         }

         return (
            <div className="px-4">
               <Microblog Microblog={post} location="source" />
            </div>
         );
      } else {
         return (
            <div className="px-4">
               <Microblog location="source" />
            </div>
         );
      }
   } else {
      notFound();
   }
}
