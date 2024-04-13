"use client";

import { useState, useEffect } from 'react';
import { fetchFeed } from '@/app/lib/microblog/fetchFeed';

type MicroblogProps = {
   className?: string;
};

const Microblog: React.FC<MicroblogProps> = ({ className }) => {
   const [feed, setFeed] = useState<JSON | null>(null);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const data = await fetchFeed('https://jade.van-dorsten.net/microblog/feed.json');
            setFeed(data);
         } catch (error) {
            console.error('Error fetching feed:', error);
         }
      };

      fetchData();
   }, []);

   return (
      <div className={className}>
         {feed ? (
            <pre>{JSON.stringify(feed, null, 3)}</pre>
         ) : (
            <p>Loading...</p>
         )}
      </div>
   );
};

export default Microblog;