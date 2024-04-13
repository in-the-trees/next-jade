import Jade from '@/app/ui/Jade';

export default function Home() {
   return (
      <main id="home">
         <div className="w-full flex justify-center items-center pt-2 md:pt-4 lg:pt-8">
            <Jade className="w-full max-w-2xl" />
         </div>
      </main>
   );
}
