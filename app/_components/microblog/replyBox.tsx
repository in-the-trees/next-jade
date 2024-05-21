import { Microdotblog } from "@/app/_lib/microblog/definitions";
import Link from "next/link";

type ReplyBoxProps = {
   postUrl: string;
   microdotblog: Microdotblog;
   className?: string;
};

export default function ReplyBox({
   postUrl,
   microdotblog,
   className,
}: ReplyBoxProps) {
   const [id] = microdotblog.home_page_url.match(/(\d+)$/) || [];

   return (
   );
}
