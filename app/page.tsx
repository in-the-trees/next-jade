import Jade from "@/app/_components/Jade";

export default function Home() {
   return (
      <main id="home">
         <div className="flex w-full justify-center pt-2 md:pt-4 lg:pt-8">
            <Jade className="w-full max-w-xl px-4" />
         </div>
      </main>
   );
}
