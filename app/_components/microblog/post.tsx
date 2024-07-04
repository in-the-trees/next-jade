import { Post as PostType } from "@/app/_lib/microblog/definitions";
import PostHeader from "@/app/_components/microblog/post/header";
import { bskyImg, getLinkFromUrl } from "@/app/_lib/microblog/bskyImg";
import { LinkMedium14Icon } from "@/app/_components/icons";

type PostProps = {
   className?: string;
   post: PostType;
   timelined?: boolean;
};

function PostImages({ post }: { post: PostType }) {
   if (!post.embed || !post.embed.images) return null;

   return (
      <div>
         {post.embed.images.map((i) => (
            <div key={i.thumb} className="my-3.5">
               <a
                  href={bskyImg(
                     post.author.did,
                     getLinkFromUrl(i.thumb),
                     bskyImg.Format.AVIF,
                     bskyImg.Size.FULL,
                  )}
                  target="_blank"
               >
                  <picture>
                     <source
                        srcSet={bskyImg(
                           post.author.did,
                           getLinkFromUrl(i.thumb),
                           bskyImg.Format.AVIF,
                           bskyImg.Size.THUMB,
                        )}
                        type="image/avif"
                     />
                     <source
                        srcSet={bskyImg(
                           post.author.did,
                           getLinkFromUrl(i.thumb),
                           bskyImg.Format.WEBP,
                           bskyImg.Size.THUMB,
                        )}
                        type="image/webp"
                     />
                     <img
                        src={bskyImg(
                           post.author.did,
                           getLinkFromUrl(i.thumb),
                           bskyImg.Format.JPEG,
                           bskyImg.Size.THUMB,
                        )}
                        alt={i.alt}
                        height={i.aspectRatio ? i.aspectRatio.height : undefined}
                        width={i.aspectRatio ? i.aspectRatio.width : undefined}
                        className="inline-block max-w-72 rounded-xl bg-stone-200 transition-transform ease-out hover:scale-[1.01] dark:bg-stone-600"
                     />
                  </picture>
               </a>
            </div>
         ))}
      </div>
   );
}

function PostOG({ post }: { post: PostType }) {
   if (!post.embed || !post.embed.external) return null;

   return (
      <div>
         <a href={post.embed.external.uri} target="_blank">
            <blockquote
               cite={post.embed.external.uri}
               className="my-3.5 flex flex-col-reverse gap-3 rounded-xl bg-stone-200 p-4 leading-5 text-stone-900 transition-transform ease-out hover:scale-[1.01] dark:bg-stone-600 dark:text-stone-100"
            >
               <div className="flex flex-col gap-1">
                  <span className="font-normal-mid">
                     {post.embed.external.title}
                  </span>
                  <div className="flex w-full flex-row items-center gap-2 text-stone-700 dark:text-stone-300">
                     <LinkMedium14Icon className="h-3.5 w-3.5" />
                     <cite className="truncate not-italic">
                        {post.embed.external.uri}
                     </cite>
                  </div>
               </div>
               {post.embed.external.description && (
                  <p className="text-stone-500 dark:text-stone-400">
                     {post.embed.external.description}
                  </p>
               )}
            </blockquote>
         </a>
      </div>
   );
}

function PostContent({
   post,
   timelined,
}: {
   post: PostType;
   timelined?: boolean;
}) {
   return (
      <>
         {/* <pre className="my-1 text-[9px] leading-tight">
            {JSON.stringify(post, null, 2)}
         </pre> */}
         <PostHeader createdAt={post.record.createdAt} timelined={timelined} />
         <div className="e-content proseStyling prose-sm my-3.5 whitespace-pre-wrap break-words">
            {post.record.text}
         </div>
         <PostImages post={post} />
         <PostOG post={post} />
      </>
   );
}

export default function PostComponent({
   className,
   post,
   timelined,
}: PostProps) {
   return (
      <article className={`${className} h-entry`}>
         <PostContent post={post} timelined={timelined} />
         {post.threadReplies && post.threadReplies.length > 0 && (
            <ul>
               {post.threadReplies.map((reply) => (
                  <li key={reply.cid} className="ml-3">
                     <PostContent post={reply} />
                  </li>
               ))}
            </ul>
         )}
      </article>
   );
}
