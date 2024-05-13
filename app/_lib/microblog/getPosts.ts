export default async function getPosts(feed: URL) {
   const res = await fetch(feed);
   if (!res.ok) {
      throw new Error('Failed to fetch feed');
   } else {
      const json = await res.json();
      return json.items;
   }
}
