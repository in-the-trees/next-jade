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

export interface Microdotblog {
   version: string;
   title: string;
   home_page_url: string;
   feed_url: string;
   items: [
      {
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
      },
   ];
}
