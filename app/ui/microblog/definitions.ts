export type Microblog = {
   id: string;
   content_html: string;
   date_published: string;
   date_modified?: string;
   categories: string[];
   url: string;
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