export interface MicrodotblogReply {
   id: string;
   content_html: string;
   url: string;
   date_published: string;
   author: {
      name: string;
      url: string;
      avatar: string;
      _microblog: {
         username: string;
      };
   };
}

export type MicroblogPhoto = {
   url: string;
   width: number;
   height: number;
};

export type Microblog = {
   id: string;
   date_published: string;
   date_modified?: string;
   categories?: string[];
   photos?: MicroblogPhoto[];
   url: string;
   content_html: string;
   title?: string;
   description?: string;
};
