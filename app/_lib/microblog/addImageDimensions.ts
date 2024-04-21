"use server";

import * as cheerio from "cheerio";
import type { MicroblogPhoto } from "@/app/_lib/microblog/definitions";

const addImageDimensions = (
   content_html: string,
   photos: MicroblogPhoto[],
): string => {
   const $ = cheerio.load(`<div class="html-wrapper">${content_html}</div>`);
   const images = $("img");

   images.each(function () {
      const img = $(this);
      const src = img.attr("src") || "";
      const imgData = photos.find((photo) => photo.url === src);

      if (imgData) {
         img.attr("width", imgData.width.toString());
         img.attr("height", imgData.height.toString());
      }
   });

   return $(".html-wrapper").html() || "";
};

export default addImageDimensions;
