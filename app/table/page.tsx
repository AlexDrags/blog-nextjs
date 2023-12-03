import { getDbData } from '@/app/lib/dbData';
import clas from '@/styles/buttonCreate.module.scss';
import Link from 'next/link';
import clasDesk from '@/styles/deskPosts.module.scss';
interface DB {
  db: any;
}
interface PostProps {
  id: number;
  postname: string;
  posttext: string;
  date: string;
  time: string;
}
export default async function Page() {
  const db: any = await getDbData();
  //console.log(db);

  return (
    <>
      <div className={clasDesk.wrapper}>
        <h2>Posts list:</h2>
        <Link className={clas.buttonCreate} href={`/newPosts`}>
          Create new post
        </Link>
      </div>
      <ul>
        {db &&
          db.map((item: PostProps) => {
            const { id, postname, date, time } = item;
            return (
              <li className={clasDesk.itemList} key={id}>
                <Link href={`/table/${id}`}>{postname}</Link>
                <p>
                  {date} {time}
                </p>
              </li>
            );
          })}
      </ul>
    </>
  );
}
