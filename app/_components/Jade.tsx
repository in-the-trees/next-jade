import { lora } from "@/app/_fonts/fonts";
import Link from "next/link";
import {
   DocumentTextIcon,
   ChatBubbleOvalLeftEllipsisIcon,
} from "@heroicons/react/24/outline";

type JadeProps = {
   className?: string;
   home?: boolean;
};

const Jade: React.FC<JadeProps> = ({ className, home }) => {
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
            <ul className="mb-3.5 ml-4 mt-1.75 list-inside list-disc">
               <li>20, he/him</li>
               <li>Web developer, mainly front-end</li>
               <li>Digital privacy & security enthusiast</li>
               <li>Based in Madison, WI</li>
            </ul>
         </section>

         <section>
            <p className="my-3.5">Where I publish:</p>
            <div className="mb-5 mt-3.5 flex flex-wrap items-center gap-2">
               <Link href="/microblog" className="btn-sm">
                  <ChatBubbleOvalLeftEllipsisIcon className="h-4 w-4" />
                  My microblog
               </Link>
               <Link href="/blog" className="btn-sm">
                  <DocumentTextIcon className="h-4 w-4" />
                  My blog
               </Link>
            </div>
         </section>

         <section>
            <p className="mb-1.75 mt-3.5">Contact me:</p>
            <ul className="mb-3.5 ml-4 mt-1.75 list-inside list-disc">
               <li>
                  <a
                     className="text-blue-500 hover:underline dark:text-violet-400"
                     href="https://signal.me/#eu/U23Og9rvFD3KcSEVVoiiJCS6MmxRamzQWyVaaleTYCPzH272GeJMo5eQ-gstLIK2"
                  >
                     inthetrees.07
                  </a>
               </li>
               <li>
                  <a
                     className="text-blue-500 hover:underline dark:text-violet-400"
                     href="mailto:jade@inthetrees.me"
                  >
                     jade@inthetrees.me
                  </a>
               </li>
               <li>
                  <a
                     className="text-blue-500 hover:underline dark:text-violet-400"
                     href="https://matrix.to/#/@inthetrees:matrix.org"
                  >
                     @inthetrees:matrix.org
                  </a>
               </li>
            </ul>
         </section>

         <section>
            <p className="mb-1.75 mt-3.5">Web presence:</p>
            <ul className="mb-3.5 ml-4 mt-1.75 list-inside list-disc">
               <li>
                  <a
                     className="text-blue-500 hover:underline dark:text-violet-400"
                     href="https://github.com/in-the-trees"
                  >
                     github.com/in-the-trees
                  </a>
               </li>
               <li>
                  <a
                     className="text-blue-500 hover:underline dark:text-violet-400"
                     href="https://micro.blog/jade"
                     rel="me"
                  >
                     micro.blog/jade
                  </a>
               </li>
               <li className="list-none">
                  <details className="inline-block text-gray-400 dark:text-stone-500">
                     <summary
                        className="details-dropdown"
                        aria-label="Less important web presence links"
                     >
                        ...
                     </summary>
                     <ul className="list-inside list-[circle]">
                        <li className="mt-1">
                           <a
                              className="text-blue-500/70 hover:underline dark:text-violet-400/70"
                              href="https://www.threads.net/@inthetrees.me"
                           >
                              threads.net/@inthetrees.me
                           </a>
                        </li>
                        <li>
                           <a
                              className="text-blue-500/70 hover:underline dark:text-violet-400/70"
                              href="https://x.com/@inthetrees_7"
                           >
                              x.com/inthetrees_7
                           </a>
                        </li>
                     </ul>
                  </details>
               </li>
            </ul>
         </section>
      </div>
   );
};

export default Jade;
