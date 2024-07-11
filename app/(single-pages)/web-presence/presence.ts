type PresenceGroup = {
   group: string;
   platforms: {
      name: string;
      username: string;
      url: string;
      description?: string;
   }[];
};

export const presence: PresenceGroup[] = [
   {
      group: "Developer",
      platforms: [
         {
            name: "GitHub",
            username: "in-the-trees",
            url: "https://github.com/in-the-trees",
         },
      ],
   },
   {
      group: "Microblogging",
      platforms: [
         {
            name: "Micro.blog",
            username: "jade",
            url: "https://micro.blog/jade",
         },
         {
            name: "Bluesky",
            username: "inthetrees.me",
            url: "https://bsky.app/profile/inthetrees.me",
         },
         {
            name: "Threads",
            username: "inthetrees.me",
            url: "https://www.threads.net/@inthetrees.me",
         },
         {
            name: "X",
            username: "@inthetrees_7",
            url: "https://x.com/@inthetrees_7",
         },
      ],
   },
   {
      group: "Forums",
      platforms: [
         {
            name: "Techlore Discussions",
            username: "inthetrees",
            url: "https://discuss.techlore.tech/u/inthetrees",
         },
      ],
   },
];
