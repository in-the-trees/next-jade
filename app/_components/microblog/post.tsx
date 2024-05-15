import createRichLinks from "@/app/_lib/microblog/createRichLinks";
import { Microblog } from "@/app/_lib/microblog/definitions";
import transformImage from "@/app/_lib/microblog/transformImage";
import Header from "@/app/_components/microblog/header";
import { formatTimeRelatively } from "@/app/_lib/relativeTime";

export const proseStyling = `
   prose-sm prose-a:text-blue-500 hover:prose-a:underline dark:prose-a:text-violet-400
   prose-img:max-h-64 prose-img:max-w-full prose-img:max-h-64 prose-img:object-contain prose-img:h-[auto] prose-img:w-[auto]
   prose-img:bg-gray-50 dark:prose-img:bg-stone-800 prose-img:rounded-xl prose-img:border dark:prose-img:border-stone-700 prose-img:transition-transform prose-img:ease-out hover:prose-img:scale-103
   prose-ul:list-disc prose-ul:ml-4 prose-ul:p-0 prose-ul:list-inside prose-li:p-0 prose-li:m-0
   prose-blockquote:border-l-2 dark:prose-blockquote:border-stone-800
`;

type MicroblogPostProps = {
   post: Microblog;
   inFeed?: boolean;
   preload?: boolean;
   dynamic_time?: boolean;
   className?: string;
};

export default async function MicroblogPost({
   post,
   inFeed,
   preload,
   dynamic_time,
   className,
}: MicroblogPostProps) {
   let content_html = post.content_html;
   content_html = createRichLinks(content_html);
   if (preload) {
      content_html = transformImage(content_html, post.photos);
   } else {
      content_html = transformImage(content_html, post.photos, "lazy");
   }

   let show_updated = false;
   if (post.categories?.includes("show_updated")) {
      show_updated = true;
   }

   const init_rel_date_published = formatTimeRelatively(
      post.date_published,
      dynamic_time,
   );
   const init_rel_date_modified =
      post.date_modified ?
         formatTimeRelatively(post.date_modified, dynamic_time)
      :  null;

   return (
      <article className={`${className} h-entry ${proseStyling}`}>
         <Header
            inFeed={inFeed}
            preload={preload}
            show_updated={show_updated}
            dynamic_time={dynamic_time}
            post_id={post.id}
            date_published={post.date_published}
            date_modified={post.date_modified}
            init_rel_date_published={init_rel_date_published}
            init_rel_date_modified={init_rel_date_modified}
         />
         <div
            className="e-content break-words"
            dangerouslySetInnerHTML={{ __html: content_html }}
         />
      </article>
   );
}
