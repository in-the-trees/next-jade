type FeedSkeletonProps = {
   postCount: number;
   className?: string;
};

export default function FeedSkeleton({
   postCount,
   className,
}: FeedSkeletonProps) {
   const firstTextLineOptions = ["w-[600px]", "w-[550px]", "w-[500px]"];
   const secondTextLineOptions = ["w-[500px]", "w-[450px]", "w-[400px]"];
   const thirdTextLineOptions = ["w-[400px]", "w-[350px]", "w-[300px]"];

   function numberOfTextLines() {
      const weights = [
         { value: 1, weight: 1 },
         { value: 2, weight: 2 },
         { value: 3, weight: 3 },
      ];

      const totalWeight = weights.reduce(
         (sum, current) => sum + current.weight,
         0,
      );

      let random = Math.random() * totalWeight;

      for (let i = 0; i < weights.length; i++) {
         if (random < weights[i].weight) {
            return weights[i].value;
         }
         random -= weights[i].weight;
      }
   }

   return (
      <div className={`${className} flex flex-col gap-4`}>
         {Array.from({ length: postCount }).map((_, index) => {
            const lines = numberOfTextLines();
            if (!lines) {
               return;
            }

            const firstTextLineWidth =
               firstTextLineOptions[
                  Math.floor(Math.random() * firstTextLineOptions.length)
               ];
            const secondTextLineWidth =
               secondTextLineOptions[
                  Math.floor(Math.random() * secondTextLineOptions.length)
               ];
            const thirdTextLineWidth =
               thirdTextLineOptions[
                  Math.floor(Math.random() * thirdTextLineOptions.length)
               ];

            return (
               <div key={index}>
                  <div className="flex items-center gap-2">
                     <div className="mr-1 h-[16px] w-[32px] rounded-full bg-stone-200/70 dark:bg-stone-800/30"></div>
                     <div className="h-[10px] w-[80px] rounded-full bg-stone-200/70 dark:bg-stone-800/30"></div>
                  </div>
                  <div>
                     {lines >= 1 && (
                        <div
                           className={`my-3.5 h-[12px] max-w-full rounded-full ${firstTextLineWidth} bg-stone-200/70 dark:bg-stone-800/30`}
                        ></div>
                     )}

                     {lines >= 2 && (
                        <div
                           className={`my-3.5 h-[12px] ${secondTextLineWidth} max-w-full rounded-full bg-stone-200/70 dark:bg-stone-800/30`}
                        ></div>
                     )}

                     {lines >= 3 && (
                        <div
                           className={`my-3.5 h-[12px] ${thirdTextLineWidth} max-w-full rounded-full bg-stone-200/70 dark:bg-stone-800/30`}
                        ></div>
                     )}
                  </div>
               </div>
            );
         })}
      </div>
   );
}
