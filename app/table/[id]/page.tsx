import clas from '@/styles/buttonCreate.module.scss';
import clasDesk from '@/styles/deskPosts.module.scss';
import Link from 'next/link';
import RemoveButton from '@/app/ui/removePostButton';
import { getPostByIdDb } from '@/app/lib/dbData';

export default async function Page({ params }: { params: { id: string } }) {
  const post = await getPostByIdDb(params.id);
  return (
    <>
      <h1>{post.postname}</h1>
      <p>{post.posttext}</p>
      <p>
        {post.date} {post.time}
      </p>
      <div className={clasDesk.wrapper}>
        <RemoveButton removeId={params.id} />
        <Link className={clas.buttonCreate} href={'/table'}>
          Back to all posts
        </Link>
      </div>
    </>
  );
}
