import clas from '@/styles/buttonCreate.module.scss';
import clasDesk from '@/styles/deskPosts.module.scss';
import Link from 'next/link';
import RemoveButton from '@/app/ui/removePostButton';
import { getPostByIdDb } from '@/app/lib/dbData';
import Image from 'next/image';

export default async function Page({ params }: { params: { id: string } }) {
  const post = await getPostByIdDb(params.id);
  const { post_author, post_title, post_message, image, date, time }: any = post;
  //console.log(post);

  return (
    <>
      <div className={clasDesk.pre}>
        <h1>{post_title}</h1>
        <p>{post_message}</p>
      </div>
      <div className={clasDesk.wrapper}>
        <div className={clasDesk.wrapperAvatar}>
          {image && <Image className={clasDesk.avatar} src={image} width={80} height={80} alt='alt.' />}
          <cite>{`${post_author}`}</cite>
        </div>
        <p>
          {`${date}`.split(' ').slice(0, 3).join(' ')} {`${time}`.split(' ').slice(4, 5).join(' ')}
        </p>
      </div>
      <div className={clasDesk.wrapper}>
        <RemoveButton removeId={params.id} />
        <Link className={clas.buttonCreate} href={'/table'}>
          Back to all posts
        </Link>
      </div>
    </>
  );
}
