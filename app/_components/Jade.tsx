import { inter, lora } from "@/app/_fonts/fonts";
import Link from "next/link";
import { DocumentTextIcon } from "@heroicons/react/24/outline";

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
               <h2 className="my-3.5 text-pretty">
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
               <p className="my-3.5 text-pretty">
                  <span className="italic">long story short</span>, I'm a human
                  and a netizen.
               </p>
            </section>
         }

         <section>
            <p className="mb-1.75 mt-3.5 text-pretty">A few things about me:</p>
            <ul className="mb-3.5 ml-4 mt-1.75 list-inside list-disc">
               <li className="text-pretty text-gray-900">20, he/him</li>
               <li className="text-pretty text-gray-900">
                  Web developer, mainly front-end
               </li>
               <li className="text-pretty text-gray-900">
                  Digital privacy & security enthusiast
               </li>
               <li className="text-pretty text-gray-900">
                  Based in Madison, WI
               </li>
            </ul>
         </section>

         <section>
            <p className="my-3.5 text-pretty">Where I publish:</p>
            <div className="mb-5 mt-3.5 flex flex-wrap items-center gap-2">
               <Link href="/microblog" className="btn-sm">
                  <DocumentTextIcon className="h-4 w-4" />
                  My microblog
               </Link>
               <Link href="/blog" className="btn-sm">
                  <DocumentTextIcon className="h-4 w-4" />
                  My blog
               </Link>
            </div>
         </section>

         <section>
            <p className="mb-1.75 mt-3.5 text-pretty">Contact me:</p>
            <ul className="mb-3.5 ml-4 mt-1.75 list-inside list-disc">
               <li className="text-pretty">
                  <a
                     className="text-blue-500 hover:underline"
                     href="https://signal.me/#eu/Ny71Ts3RZ685pJjTlOfJbxO9IZKNSqaGYAkdRLjTEsvKlSA3fv9MOr8LHLQOurlR"
                  >
                     jade.07
                  </a>
               </li>
               <li className="text-pretty">
                  <a
                     className="text-blue-500 hover:underline"
                     href="mailto:jade@van-dorsten.net"
                  >
                     jade@van-dorsten.net
                  </a>
               </li>
               <li className="text-pretty">
                  <a
                     className="text-blue-500 hover:underline"
                     href="https://matrix.to/#/@typejade:matrix.org"
                  >
                     @typejade:matrix.org
                  </a>
               </li>
            </ul>
         </section>

         <section>
            <p className="mb-1.75 mt-3.5 text-pretty">Web presence:</p>
            <ul className="mb-3.5 ml-4 mt-1.75 list-inside list-disc">
               <li className="text-pretty">
                  <a
                     className="text-blue-500 hover:underline"
                     href="https://github.com/typejade"
                  >
                     github.com/typejade
                  </a>
               </li>
               <li className="text-pretty">
                  <a
                     className="text-blue-500 hover:underline"
                     href="https://micro.blog/jade"
                  >
                     micro.blog/jade
                  </a>
               </li>
               <li className="text-pretty">
                  <a
                     className="text-blue-500 hover:underline"
                     href="https://www.threads.net/@typejade_"
                  >
                     threads.net/@typejade_
                  </a>
               </li>
               <li className="text-pretty">
                  <a
                     className="text-blue-500 hover:underline"
                     href="https://x.com/@typejade_"
                  >
                     x.com/@typejade_
                  </a>
               </li>
            </ul>
         </section>
      </div>
   );
};

export default Jade;
