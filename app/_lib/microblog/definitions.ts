export type Post = {
   uri: string;
   cid: string;
   record: {
      $type: string;
      createdAt: string;
      reply?: {
         parent: {
            cid: string;
            uri: string;
         };
         root: {
            cid: string;
            uri: string;
         };
      };
      images?: [
         {
            alt?: string;
            aspectRatio: {
               height: number;
               width: number;
            };
            image: {
               ref: {
                  $link: string;
               };
            };
         },
      ];
      external?: {
         description?: string;
         thumb?: {
            ref: {
               $link: string;
            };
         };
      };
      text: string;
   };
   embed?: {
      images?: [
         {
            thumb: string;
            fullsize: string;
            alt?: string;
            aspectRatio: {
               height: number;
               width: number;
            };
         },
      ];
      external?: {
         uri: string;
         title?: string;
         description?: string;
         thumb: string;
      };
   };
   replyCount: number;
   repostCount: number;
   likeCount: number;
};
