import { Suspense } from 'react';
import Microblog from '@/app/ui/microblog/main';

export default function Blog() {
   return (
      <main id="microblog">
         Microblog
         <Suspense fallback={<p>loading...</p>}>
            <Microblog />
         </Suspense>
      </main>
   );
}