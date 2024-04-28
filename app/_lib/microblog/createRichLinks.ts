"use server";

import * as cheerio from "cheerio";

const createRichLinks = (content_html: string): string => {
   const $ = cheerio.load(`<div class="content-wrapper">${content_html}</div>`);
   const richLinkContainers = $(".rl-container");

   richLinkContainers.each(function () {
      const richLink = $(this).find("blockquote");

      const url = richLink.attr("cite") || "";
      const title = richLink.find(".rl-title").text() || "";
      const snippet = richLink.find(".rl-snippet").text() || "";

      const niceUrl = url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "");
      const isLocalUrl = "inthetrees.me" === new URL(url).hostname;

      let innerHTML = "";
      if (snippet.length > 0) {
         innerHTML += `
                <p class="rl-snippet">${snippet}</p>
            `;
      }
      innerHTML += `
            <div class="rl-metadata">
                <footer>
                    ${title ? `<span class="rl-title">${title}</span>` : ""}
                    <div class="rl-url-container">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                        </svg>
                        <cite class="rl-url">${niceUrl}</cite>
                    </div>
                </footer>
                ${
                   !isLocalUrl ?
                      `
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                 </svg>
              `
                   :  `
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                 </svg>
              `
                }
            </div>
        `;

      const a = $("<a></a>").attr("href", url);
      if (!isLocalUrl) {
         a.attr("target", "_blank");
         a.attr("rel", "noopener noreferrer");
      }

      richLink.html(innerHTML);
      a.append(richLink);
      $(this).append(a);
   });

   return $(".content-wrapper").html() || "";
};

export default createRichLinks;
