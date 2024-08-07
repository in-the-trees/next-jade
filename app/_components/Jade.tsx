import { lora } from "@/app/_fonts/fonts";
import Link from "next/link";
import {
   EllipsisMessageMedium16Icon,
   DocTextMedium16Icon,
} from "@/app/_components/icons";

const Jade = ({ className, home }: { className?: string; home?: boolean }) => {
   return (
      <div id="Jade" className={className}>
         {home ?
            <div>
               <h1
                  className={`${lora.className} text-[1.5em] font-normal-mid italic`}
               >
                  Jade van Dorsten
               </h1>
               <h2 className="my-3.5">
                  <span className="italic">long story short</span>, I'm a human
                  and a netizen.
               </h2>
            </div>
         :  <section>
               <p
                  className={`${lora.className} text-[1.5em] font-normal-mid italic`}
               >
                  Jade van Dorsten
               </p>
               <p className="my-3.5">
                  <span className="italic">long story short</span>, I'm a human
                  and a netizen.
               </p>
            </section>
         }

         <section>
            <p className="mb-1.75 mt-3.5">A few things about me:</p>
            <ul className="mb-3.5 ml-3.5 mt-1.75 list-outside list-disc">
               <li className="ml-4">
                  <span className="ml-1">20, he/him</span>
               </li>
               <li className="ml-4">
                  <span className="ml-1">Web developer, mainly front-end</span>
               </li>
               <li className="ml-4">
                  <span className="ml-1">Based in Madison, WI</span>
               </li>
               <li className="ml-4">
                  <span className="ml-1">In the trees</span>
               </li>
            </ul>
         </section>

         <section>
            <p className="my-3.5">Where I publish:</p>
            <div className="mb-5 mt-3.5 flex flex-wrap items-center gap-2">
               <Link href={`/microblog`} className="btn-sm" prefetch={true}>
                  <EllipsisMessageMedium16Icon className="h-4 w-4" />
                  My microblog
               </Link>
               <Link href={`/blog`} className="btn-sm" prefetch={true}>
                  <DocTextMedium16Icon className="h-4 w-4" />
                  My blog
               </Link>
            </div>
         </section>

         <section>
            <p className="mb-1.75 mt-3.5">Contact me:</p>
            <dl className="mb-3.5 ml-3.5 mt-1.75">
               <div className="ml-3.5 list-item list-outside">
                  <div className="ml-0.5">
                     <dt className="mt-1">Signal</dt>
                     <dd>
                        <a
                           className="text-forest-600 hover:underline dark:text-betty-300"
                           href="https://signal.me/#eu/U23Og9rvFD3KcSEVVoiiJCS6MmxRamzQWyVaaleTYCPzH272GeJMo5eQ-gstLIK2"
                        >
                           inthetrees.07
                        </a>
                     </dd>
                  </div>
               </div>
               <div className="ml-3.5 list-item">
                  <div className="ml-0.5">
                     <dt className="mt-1">Email</dt>
                     <dd>
                        <a
                           className="text-forest-600 hover:underline dark:text-betty-300"
                           href="mailto:jade@inthetrees.me"
                        >
                           jade@inthetrees.me
                        </a>
                     </dd>
                  </div>
               </div>
               <div className="ml-3.5 list-item">
                  <div className="ml-0.5">
                     <dt className="mt-1">Matrix</dt>
                     <dd>
                        <a
                           className="text-forest-600 hover:underline dark:text-betty-300"
                           href="https://matrix.to/#/@inthetrees:matrix.org"
                        >
                           @inthetrees:matrix.org
                        </a>
                     </dd>
                  </div>
               </div>
            </dl>
         </section>

         <section>
            <p className="mb-1.75 mt-3.5">Pages:</p>
            <ul className="mb-3.5 mt-1.75">
               <li>
                  <Link
                     href="/web-presence"
                     className="ml-1 text-forest-600 hover:underline dark:text-betty-300"
                  >
                     /web-presence
                  </Link>
               </li>
               <li>
                  <Link
                     href="/colophon"
                     className="ml-1 text-forest-600 hover:underline dark:text-betty-300"
                  >
                     /colophon
                  </Link>
               </li>
            </ul>
         </section>
      </div>
   );
};

export default Jade;
