"use server";

import * as cheerio from "cheerio";
import type { MicroblogPhoto } from "@/app/_lib/microblog/definitions";

const transformImage = (
   content_html: string,
   photos?: MicroblogPhoto[],
   lazy?: "lazy",
): string => {
   const $ = cheerio.load(`<div class="html-wrapper">${content_html}</div>`);
   const images = $("img");

   images.each(function () {
      const img = $(this);
      const src = img.attr("src") || "";
      const initialSrc = src.toString();

      // Check if image is hosted via Micro.blog
      const isMicroblogPhoto = src.startsWith(
         `https://${process.env.NEXT_PUBLIC_MICROBLOG_BASE_URL}/uploads`,
      );

      // Optimize image if hosted via Micro.blog
      if (isMicroblogPhoto) {
         const optimizedSrc = `https://micro.blog/photos/800x/${encodeURIComponent(src)}`;
         img.attr("src", optimizedSrc);
      }

      // Apply width & height attributes
      let imgData;
      if (photos) {
         imgData = photos.find((photo) => photo.url === src);
      }
      if (imgData && imgData.width > 0 && imgData.height > 0) {
         const aspectRatio = imgData.width / imgData.height;

         // Set width & height attributes
         if (isMicroblogPhoto) {
            const newWidth = Math.min(imgData.width, 800);
            const newHeight = Math.round(newWidth / aspectRatio);

            img.attr("width", newWidth.toString());
            img.attr("height", newHeight.toString());
         } else {
            img.attr("width", imgData.width.toString());
            img.attr("height", imgData.height.toString());
         }

         if (lazy) {
            img.attr("loading", "lazy");
         }
      }

      // Remove parent <p> tag if it exists
      const parentP = img.parent("p");
      if (parentP.length) {
         img.unwrap();
         parentP.remove();
      }

      // Wrap image in a link
      const a = $("<a>")
         .attr("class", "image-link")
         .attr("href", initialSrc)
         .attr("target", "_blank")
         .attr("rel", "noopener noreferrer");
      img.wrap(a);

      // Wrap in a div
      const div = $("<div>").attr("class", "image-wrapper");
      a.wrap(div);
   });

   return $(".html-wrapper").html() || "";
};

export default transformImage;
