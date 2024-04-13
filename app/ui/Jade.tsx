import { inter, lora } from "@/app/ui/fonts";
import Link from "next/link";
import { DocumentTextIcon } from "@heroicons/react/24/outline";

type JadeProps = {
   className?: string;
};

const Jade: React.FC<JadeProps> = ({ className }) => {
   return (
      <div id="Jade" className={className}>
         <h1 className={`${lora.className} text-[1.5em] font-normal-mid italic`}>Jade van Dorsten</h1>
         <p className="my-3.5">
            <span className="italic">long story short</span>, I'm a human and a netizen.
         </p>

         <p className="mb-1.75 mt-3.5">A few things about me:</p>
         <ul className="mb-3.5 ml-4 mt-1.75 list-inside list-disc">
            <li className="text-gray-900">20, he/him</li>
            <li className="text-gray-900">Web developer, mainly front-end</li>
            <li className="text-gray-900">Digital privacy & security enthusiast</li>
            <li className="text-gray-900">Based in Madison, WI</li>
         </ul>

         <p className="my-3.5">Where I publish:</p>
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

         <p className="mb-1.75 mt-3.5">Contact me:</p>
         <ul className="mb-3.5 ml-4 mt-1.75 list-inside list-disc">
            <li>
               <a
                  className="text-blue-500 hover:underline"
                  href="https://signal.me/#eu/Ny71Ts3RZ685pJjTlOfJbxO9IZKNSqaGYAkdRLjTEsvKlSA3fv9MOr8LHLQOurlR"
               >
                  jade.07
               </a>
            </li>
            <li>
               <a className="text-blue-500 hover:underline" href="mailto:jade@van-dorsten.net">
                  jade@van-dorsten.net
               </a>
            </li>
            <li>
               <a
                  className="text-blue-500 hover:underline"
                  href="https://matrix.to/#/@typejade:matrix.org"
               >
                  @typejade:matrix.org
               </a>
            </li>
         </ul>

         <p className="mb-1.75 mt-3.5">Web presence:</p>
         <ul className="mb-3.5 ml-4 mt-1.75 list-inside list-disc">
            <li>
               <a className="text-blue-500 hover:underline" href="https://github.com/typejade">
                  github.com/typejade
               </a>
            </li>
            <li>
               <a className="text-blue-500 hover:underline" href="https://micro.blog/typejade">
                  micro.blog/typejade
               </a>
            </li>
            <li>
               <a className="text-blue-500 hover:underline" href="https://www.threads.net/@typejade_">
                  threads.net/@typejade_
               </a>
            </li>
            <li>
               <a className="text-blue-500 hover:underline" href="https://x.com/@typejade_">
                  x.com/@typejade_
               </a>
            </li>
         </ul>
      </div>
   );
};

export default Jade;
