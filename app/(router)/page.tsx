export const dynamicParams = false;

import Jade from "@/app/_components/Jade";

export async function generateStaticParams() {
   return [{ slug: "colophon" }, { slug: "web-presence" }];
}

export default function Index() {
   return (
      <main id="home">
         <div className="flex w-full pt-9 md:justify-center md:pt-[44px] lg:pt-[60px]">
            <Jade className="w-full max-w-[27rem] px-4" home />
         </div>
      </main>
   );
}
