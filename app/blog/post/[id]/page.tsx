import { Metadata } from 'next';
import { getPostByIdData } from '@/app/lib/loadData';
import Link from 'next/link';

interface PostProps {
  params: {
    userId: number;
    id: string;
    title: string;
    body: string;
  };
}

export async function generateMetadata({ params: { id } }: PostProps): Promise<Metadata> {
  const post = await getPostByIdData(id);
  if (!post.title) throw new Error('Not found post');
  return {
    title: post.title,
  };
}

export default async function Post({ params: { id } }: PostProps) {
  const post = await getPostByIdData(id);
  return (
    <>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <Link href={'/blog'}>Back to all posts</Link>
    </>
  );
}
