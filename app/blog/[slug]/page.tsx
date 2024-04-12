import {
   getPosts,
   PostReturn,
   PostMatter,
   Post,
   getPost
} from '@/app/blog/lib/main';

const posts = await getPosts(PostReturn.MATTER_ONLY) as PostMatter[];

const getPostBySlug = (posts: PostMatter[], slug: string, postReturn: PostReturn) => {
   const postFile = posts.find((post) => post.slug === slug)?.filename;
   if (!postFile) {
      throw new Error(`Failed to find post with id: ${slug}`);
   }
   return getPost(postFile, postReturn);
};

export async function generateStaticParams() {
   return posts.map((post) => ({
      slug: post.slug,
   }))
}

export default async function Page({ params }: { params: { slug: string } }) {
   const post = await getPostBySlug(posts, params.slug, PostReturn.FULL) as Post;
   return (
      <main>
         <h1 className="text-2xl font-bold">{post.postMatter.title}</h1>
         <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </main>
   );
}