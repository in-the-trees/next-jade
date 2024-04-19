export type Microblog = {
   id: string;
   date_published: string;
   date_modified?: string;
   categories?: string[];
   photos?: {
      url: string;
      width: number;
      height: number;
   }[];
   url: string;
   content_html: string;
};

export type MicroblogFeed = {
   version: string;
   title: string;
   icon: string;
   home_page_url: string;
   feed_url: string;
   authors: [
      {
         url: string;
         name: string;
      },
   ];
   language: string;
   items: Microblog[];
};
