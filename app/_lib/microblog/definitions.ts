interface Author {
   did: string;
   handle: string;
   displayName: string;
   avatar: string;
   associated: {
      chat: {
         allowIncoming: string;
      };
   };
   labels: any[];
   createdAt: string;
}

interface ReplyReference {
   cid: string;
   uri: string;
}

interface ImageReference {
   $type: string;
   ref: {
      $link: string;
   };
   mimeType: string;
   size: number;
}

interface RecordEmbed {
   $type: string;
   images?: {
      alt: string;
      image: ImageReference;
      aspectRatio?: {
         height: number;
         width: number;
      };
   }[];
   external?: {
      description?: string;
      thumb?: ImageReference;
      title: string;
      uri: string;
   };
}

interface Record {
   $type: string;
   createdAt: string;
   reply?: {
      parent: ReplyReference;
      root: ReplyReference;
   };
   embed?: RecordEmbed;
   text: string;
}

interface PostEmbed {
   $type: string;
   images?: {
      thumb: string;
      fullsize: string;
      alt?: string;
      aspectRatio?: {
         height: number;
         width: number;
      };
   }[];
   external?: {
      $type: string;
      uri: string;
      title: string;
      description?: string;
      thumb?: string;
   };
}

export interface BskyPost {
   uri: string;
   cid: string;
   author: Author;
   record: Record;
   embed?: PostEmbed;
   replyCount: number;
   repostCount: number;
   likeCount: number;
   indexedAt: string;
   labels: any[];
}

export interface Post extends BskyPost {
   threadReplies?: BskyPost[];
}
