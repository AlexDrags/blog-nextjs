import { Metadata } from 'next';
import { getAllPostsData } from '@/app/lib/loadData';
import clas from '@/styles/buttonCreate.module.scss';
import clasWrapper from '@/styles/search.module.scss';

import Link from 'next/link';
import Search from '@/components/Search';

interface PostProps {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface PostsProps {
  posts: [];
}

export const metadata: Metadata = {
  title: 'Blog page',
  description: 'This is blog page...',
  keywords: 'blog, page',
};

export default async function Blog() {
  const posts = await getAllPostsData();
  return (
    <>
      <h1>Posts title:</h1>
      <div className={clasWrapper.searchWrapper}>
        <Search />
        <Link className={clas.buttonCreate} href={`/newPosts`}>
          Create post
        </Link>
      </div>
      <ul>
        {posts.map((post: PostProps) => (
          <li key={post.id}>
            <Link href={`/blog/post/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
