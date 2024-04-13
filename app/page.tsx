import Jade from '@/app/ui/Jade';

export default function Home() {
   return (
      <main id="home">
         <div className="flex justify-center items-center">
            <Jade
               className="
                  pt-2
                  md:pt-4
                  lg:pt-8
                  w-full max-w-2xl
               "
            />
         </div>
      </main>
   );
}
