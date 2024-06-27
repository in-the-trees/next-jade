import { Post as PostType } from "@/app/_lib/microblog/definitions";
import PostHeader from "@/app/_components/microblog/post/header";
import { bskyImg, getLinkFromUrl } from "@/app/_lib/microblog/bskyImg";

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
            <picture key={i.thumb}>
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
               />
            </picture>
         ))}
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
         <pre className="my-1 text-[9px] leading-tight">
            {JSON.stringify(post, null, 2)}
         </pre>
         <PostHeader createdAt={post.record.createdAt} timelined={timelined} />
         <div className="e-content proseStyling prose-sm my-3.5 whitespace-pre-wrap break-words">
            {post.record.text}
         </div>
         <PostImages post={post} />
      </>
   );
}

export default function PostComponent({
   className,
   post,
   timelined,
}: PostProps) {
   return (
      <article className={`${className} h-entry bg-stone-200`}>
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
